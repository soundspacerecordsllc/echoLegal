// app/api/filingcontrol/calendar/[token]/route.ts
// GET: Returns an ICS calendar feed for a PRO user's filing deadlines.
// Token-based access — no auth required.
// Returns text/calendar (RFC 5545).

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { generateICS, type CalendarDeadline } from '@/lib/filingcontrol/calendar/ics'

export async function GET(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  if (!token) {
    return new NextResponse('Not found', { status: 404 })
  }

  const supabase = getServiceClient()

  // 1. Look up user by calendar_token
  const { data: user, error: userError } = await supabase
    .from('fc_users')
    .select('id, email, plan, calendar_token')
    .eq('calendar_token', token)
    .single()

  if (userError || !user) {
    return new NextResponse('Not found', { status: 404 })
  }

  // 2. Require PRO plan
  if (user.plan !== 'PRO') {
    return new NextResponse('PRO plan required', { status: 403 })
  }

  // 3. Resolve auth user ID from fc_users email, then fetch that user's entities
  const { data: authUserId } = await supabase.rpc('fc_auth_user_id_by_email', {
    p_email: user.email,
  })

  if (!authUserId) {
    // No auth.users row for this email — return empty calendar
    const ics = generateICS({ entities: [], now: new Date() })
    return new NextResponse(ics, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'private, max-age=300',
      },
    })
  }

  const { data: entities } = await supabase
    .from('fc_entities')
    .select('id, user_id, company_name')
    .eq('user_id', authUserId)

  if (!entities || entities.length === 0) {
    // Return empty calendar
    const ics = generateICS({ entities: [], now: new Date() })
    return new NextResponse(ics, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'private, max-age=300',
      },
    })
  }

  // 4. For each entity, fetch latest assessment and extract deadlines
  const calendarEntities: Array<{
    entity: { id: string; company_name: string }
    deadlines: CalendarDeadline[]
  }> = []

  for (const entity of entities) {
    const { data: assessment } = await supabase
      .from('fc_assessments')
      .select('deadlines_json')
      .eq('user_id', entity.user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!assessment?.deadlines_json) continue

    // deadlines_json is a DeadlineResult: { deadlines: Deadline[], ... }
    const deadlinesJson = assessment.deadlines_json as {
      deadlines?: Array<{ form: string; dueDate: string; basis?: string }>
    }

    const deadlines: CalendarDeadline[] = (deadlinesJson.deadlines ?? []).map(
      (dl) => ({
        form: dl.form,
        dueDate: dl.dueDate,
        basis: dl.basis,
      })
    )

    if (deadlines.length > 0) {
      calendarEntities.push({
        entity: { id: entity.id, company_name: entity.company_name },
        deadlines,
      })
    }
  }

  // 5. Generate ICS
  const ics = generateICS({ entities: calendarEntities, now: new Date() })

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'private, max-age=300',
    },
  })
}
