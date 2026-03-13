// app/api/cron/filingcontrol-reminders/route.ts
// Cron endpoint: processes pending FilingControl notification events and sends
// reminder emails via Resend. Runs daily via Vercel Cron or external scheduler.
//
// Pipeline:
//   fc_notification_events (PENDING, sent_at IS NULL)
//   → resolve entity + user
//   → check PRO plan
//   → send email via lib/filingcontrol/email-sender.ts
//   → mark sent_at = now()
//
// Secured via x-cron-secret header.

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { sendFilingControlReminder } from '@/lib/filingcontrol/email-sender'

// ─── Auth ───────────────────────────────────────────────────────────

function verifyCronAuth(request: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') return true

  const secret = request.headers.get('x-cron-secret')
  const expected = process.env.CRON_SECRET

  if (!expected) return false
  return secret === expected
}

// ─── Event types eligible for email delivery ────────────────────────

const EMAILABLE_EVENT_TYPES = [
  'DUE_SOON_30',
  'DUE_SOON_7',
  'DUE_TODAY',
  'OVERDUE_1',
] as const

// ─── Severity classification ────────────────────────────────────────
// Only obligations with high or critical severity trigger reminder emails.
// Forms not listed here are treated as "standard" and do not receive emails.

type Severity = 'critical' | 'high' | 'standard'

const FORM_SEVERITY: Record<string, Severity> = {
  'Form 5472': 'critical',
  'Pro Forma 1120': 'critical',
  'Form 1120-F': 'high',
  'BOI Report': 'high',
  'BOI Report (FinCEN)': 'high',
  'Form 5472 + pro forma Form 1120': 'critical',
}

function getFormSeverity(form: string): Severity {
  // Exact match first
  if (FORM_SEVERITY[form]) return FORM_SEVERITY[form]
  // Partial match (handles variations like "Form 5472 + Pro Forma 1120")
  for (const [key, severity] of Object.entries(FORM_SEVERITY)) {
    if (form.toLowerCase().includes(key.toLowerCase())) return severity
  }
  return 'standard'
}

function isHighSeverity(form: string): boolean {
  const severity = getFormSeverity(form)
  return severity === 'high' || severity === 'critical'
}

// ─── Handler ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceClient()
  const now = new Date()

  // 1. Query pending notification events that have not been sent
  const { data: pendingEvents, error: eventsError } = await supabase
    .from('fc_notification_events')
    .select('id, entity_id, event_type, event_key, payload, created_at')
    .eq('status', 'PENDING')
    .is('sent_at', null)
    .in('event_type', [...EMAILABLE_EVENT_TYPES])
    .order('created_at', { ascending: true })

  if (eventsError) {
    console.error('[fc-cron] Failed to query events:', eventsError)
    return NextResponse.json(
      { error: 'Failed to query notification events' },
      { status: 500 }
    )
  }

  if (!pendingEvents || pendingEvents.length === 0) {
    return NextResponse.json({
      sent: 0,
      skipped: 0,
      failed: 0,
      message: 'No pending reminder events',
      timestamp: now.toISOString(),
    })
  }

  // 2. Collect unique entity IDs to batch-resolve entities + users
  const entityIds = Array.from(new Set(pendingEvents.map((e: any) => e.entity_id)))

  const { data: entities, error: entitiesError } = await supabase
    .from('fc_entities')
    .select('id, user_id, company_name')
    .in('id', entityIds)

  if (entitiesError || !entities) {
    console.error('[fc-cron] Failed to resolve entities:', entitiesError)
    return NextResponse.json(
      { error: 'Failed to resolve entities' },
      { status: 500 }
    )
  }

  const entityMap = new Map(entities.map((e: any) => [e.id, e]))

  // 3. Collect unique user IDs and resolve plans + emails
  const userIds = Array.from(new Set(entities.map((e: any) => e.user_id)))

  const { data: users, error: usersError } = await supabase
    .from('fc_users')
    .select('id, email, plan')
    .in('id', userIds)

  if (usersError || !users) {
    console.error('[fc-cron] Failed to resolve users:', usersError)
    return NextResponse.json(
      { error: 'Failed to resolve users' },
      { status: 500 }
    )
  }

  const userMap = new Map(users.map((u: any) => [u.id, u]))

  // 4. Process each event
  let sent = 0
  let skipped = 0
  let failed = 0

  for (const event of pendingEvents) {
    const entity = entityMap.get(event.entity_id)
    if (!entity) {
      console.warn(`[fc-cron] Entity not found for event ${event.id}`)
      skipped++
      continue
    }

    const user = userMap.get(entity.user_id)
    if (!user) {
      console.warn(`[fc-cron] User not found for entity ${entity.id}`)
      skipped++
      continue
    }

    // 5. Enforce PRO plan — do NOT send emails to FREE tier users
    if (user.plan !== 'PRO') {
      skipped++
      continue
    }

    // 6. Severity filter — only send for high/critical severity obligations
    const eventPayload = event.payload as {
      form: string
      dueDate: string
      daysRemaining: number
    }

    if (!isHighSeverity(eventPayload.form)) {
      skipped++
      continue
    }

    // 7. Resolve user email — prefer fc_users.email, fall back to auth
    let userEmail = user.email
    if (!userEmail) {
      const { data: authUser } = await supabase.auth.admin.getUserById(
        user.id
      )
      userEmail = authUser?.user?.email ?? null
    }

    if (!userEmail) {
      console.warn(`[fc-cron] No email for user ${user.id}`)
      skipped++
      continue
    }

    // 8. Build payload and send
    const success = await sendFilingControlReminder({
      user_email: userEmail,
      entity_name: entity.company_name,
      obligation_name: eventPayload.form,
      due_date: eventPayload.dueDate,
    })

    if (success) {
      // 9. Mark event as sent (idempotent — only updates if still PENDING)
      const { error: updateError } = await supabase
        .from('fc_notification_events')
        .update({ sent_at: now.toISOString(), status: 'SENT' })
        .eq('id', event.id)
        .eq('status', 'PENDING')
        .is('sent_at', null)

      if (updateError) {
        console.error(
          `[fc-cron] Failed to mark event ${event.id} as sent:`,
          updateError
        )
        failed++
      } else {
        sent++
        console.log(
          `[fc-cron] sent reminder email for entity ${entity.company_name} obligation ${eventPayload.form}`
        )
      }
    } else {
      failed++
      console.error(
        `[fc-cron] Email send failed for event ${event.id} (entity: ${entity.company_name})`
      )
    }
  }

  return NextResponse.json({
    sent,
    skipped,
    failed,
    total_events: pendingEvents.length,
    timestamp: now.toISOString(),
  })
}
