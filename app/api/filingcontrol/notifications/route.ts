// app/api/filingcontrol/notifications/route.ts
// Authenticated endpoint: returns notification events for the current user's entities.
// GET /api/filingcontrol/notifications

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { getApiUser, getApiSessionUser } from '@/lib/filingcontrol/auth'

export async function GET(request: NextRequest) {
  // Try Bearer token first, then fall back to cookie session
  const user =
    (await getApiUser(request.headers.get('authorization'))) ??
    (await getApiSessionUser())

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceClient()

  // Join through fc_entities to enforce ownership via authenticated user ID
  const { data, error } = await supabase
    .from('fc_notification_events')
    .select(
      `
      id,
      entity_id,
      event_type,
      event_key,
      payload,
      status,
      created_at,
      sent_at,
      fc_entities!inner (
        user_id
      )
    `
    )
    .eq('fc_entities.user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[notifications] Query error:', error)
    return NextResponse.json({ error: 'Query failed' }, { status: 500 })
  }

  return NextResponse.json({ events: data ?? [] })
}
