// app/api/cron/filingcontrol-reminders/route.ts
// Cron endpoint: processes pending fc_notification_events and sends reminder emails.
// Secured via x-cron-secret header. Safe to run multiple times — idempotent.
//
// Flow:
//   1. Query PENDING events where sent_at IS NULL
//   2. For each event, resolve entity → user → fc_users (plan check)
//   3. Only send if user.plan === 'PRO'
//   4. Send email via FC email sender
//   5. Mark event as SENT with sent_at timestamp

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import {
  sendFCReminder,
  getDefaultPenaltyWarning,
} from '@/lib/filingcontrol/email-sender'
import { absoluteUrl } from '@/lib/site'

// ─── Auth ───────────────────────────────────────────────────────────

function verifyCronAuth(request: NextRequest): boolean {
  const secret = request.headers.get('x-cron-secret')
  const expected = process.env.FC_CRON_SECRET

  // Fail closed: if no secret is configured, reject all requests
  if (!expected) return false
  return secret === expected
}

// ─── Types ──────────────────────────────────────────────────────────

type PendingEvent = {
  id: string
  entity_id: string
  event_type: string
  event_key: string
  payload: {
    form: string
    dueDate: string
    daysRemaining: number
    status: string
    urgency: string
    engineVersion: string
    previousStatus?: string
  }
  status: string
  created_at: string
  sent_at: string | null
}

// ─── Handler ────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceClient()
  const now = new Date()

  // 1. Fetch all PENDING events that have not been sent
  const { data: events, error: eventsError } = await supabase
    .from('fc_notification_events')
    .select('id, entity_id, event_type, event_key, payload, status, created_at, sent_at')
    .eq('status', 'PENDING')
    .is('sent_at', null)
    .order('created_at', { ascending: true })
    .limit(100) // Process in batches to avoid timeout

  if (eventsError) {
    console.error('[cron/reminders] Failed to fetch events:', eventsError)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }

  if (!events || events.length === 0) {
    return NextResponse.json({
      processed: 0,
      sent: 0,
      skipped_free: 0,
      skipped_no_user: 0,
      errors: 0,
      timestamp: now.toISOString(),
    })
  }

  // 2. Batch-resolve all unique entity IDs to their user_id + company_name
  const entityIds = [...new Set(events.map((e: PendingEvent) => e.entity_id))]

  const { data: entities } = await supabase
    .from('fc_entities')
    .select('id, user_id, company_name')
    .in('id', entityIds)

  const entityMap = new Map<string, { user_id: string; company_name: string }>()
  for (const ent of entities ?? []) {
    entityMap.set(ent.id, { user_id: ent.user_id, company_name: ent.company_name })
  }

  // 3. Batch-resolve all unique user_ids to their email + plan via auth.users + fc_users
  //    fc_entities.user_id references auth.users(id)
  //    fc_users stores email + plan
  const userIds = [...new Set([...entityMap.values()].map((e) => e.user_id))]

  // We need email from fc_users (keyed by email) but we only have user_id (auth.users.id).
  // Strategy: query fc_entities to get user_id, then use the helper function or
  // query auth.users via service role to get email, then look up fc_users.
  // Simpler: query fc_users joined through fc_entities.
  const { data: fcUserRows } = await supabase
    .from('fc_entities')
    .select('user_id, fc_users:user_id(email, plan)')
    .in('user_id', userIds)

  // Build a user map: user_id → { email, plan }
  // Note: The above join might not work if fc_users doesn't have a FK to auth.users.
  // Fallback: query auth.users directly via service role, then fc_users by email.

  // Direct approach: use the service client to query auth.users
  const userMap = new Map<string, { email: string; plan: string }>()

  // Get emails from auth.users (service role can access auth schema)
  const { data: authUsers } = await supabase.auth.admin.listUsers()

  if (authUsers?.users) {
    const authEmailMap = new Map<string, string>()
    for (const u of authUsers.users) {
      if (u.email) authEmailMap.set(u.id, u.email)
    }

    // Get plan info from fc_users for these emails
    const emails = userIds
      .map((uid) => authEmailMap.get(uid))
      .filter((e): e is string => !!e)

    if (emails.length > 0) {
      const { data: fcUsers } = await supabase
        .from('fc_users')
        .select('email, plan')
        .in('email', emails)

      const planMap = new Map<string, string>()
      for (const fu of fcUsers ?? []) {
        planMap.set(fu.email, fu.plan)
      }

      for (const uid of userIds) {
        const email = authEmailMap.get(uid)
        if (email) {
          userMap.set(uid, {
            email,
            plan: planMap.get(email) || 'FREE',
          })
        }
      }
    }
  }

  // 4. Process each event
  let sentCount = 0
  let skippedFree = 0
  let skippedNoUser = 0
  let errorCount = 0

  const dashboardUrl = absoluteUrl('/filingcontrol/dashboard')

  for (const event of events as PendingEvent[]) {
    const entity = entityMap.get(event.entity_id)
    if (!entity) {
      skippedNoUser++
      continue
    }

    const user = userMap.get(entity.user_id)
    if (!user) {
      skippedNoUser++
      continue
    }

    // 5. Respect subscription state — only PRO users get emails
    if (user.plan !== 'PRO') {
      skippedFree++

      // Mark as SENT to avoid re-processing (event existed, user just isn't PRO)
      // Use a distinct approach: don't mark as SENT, leave PENDING so it sends
      // if user upgrades later. But to prevent infinite re-processing, skip silently.
      continue
    }

    // 6. Build penalty warning
    const penaltyWarning =
      getDefaultPenaltyWarning(event.payload.form) ??
      event.payload.form // no specific warning

    // 7. Send email
    const result = await sendFCReminder({
      to: user.email,
      entity_name: entity.company_name,
      obligation_name: event.payload.form,
      due_date: event.payload.dueDate,
      days_remaining: event.payload.daysRemaining,
      penalty_warning:
        getDefaultPenaltyWarning(event.payload.form) || null,
      event_type: event.event_type,
      dashboard_url: dashboardUrl,
    })

    if (result.sent) {
      // 8. Mark event as SENT
      const { error: updateError } = await supabase
        .from('fc_notification_events')
        .update({
          status: 'SENT',
          sent_at: now.toISOString(),
        })
        .eq('id', event.id)
        .eq('status', 'PENDING') // Optimistic lock: only update if still PENDING
        .is('sent_at', null) // Double-check idempotency

      if (updateError) {
        console.error(
          `[cron/reminders] Failed to mark event ${event.id} as sent:`,
          updateError
        )
        errorCount++
      } else {
        sentCount++
        console.log(
          `[cron/reminders] Sent reminder email for entity ${entity.company_name} obligation ${event.payload.form}`
        )
      }
    } else {
      console.error(
        `[cron/reminders] Failed to send email for event ${event.id}:`,
        result.error
      )
      errorCount++
    }
  }

  return NextResponse.json({
    processed: events.length,
    sent: sentCount,
    skipped_free: skippedFree,
    skipped_no_user: skippedNoUser,
    errors: errorCount,
    timestamp: now.toISOString(),
  })
}
