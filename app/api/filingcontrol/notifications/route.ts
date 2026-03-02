// app/api/filingcontrol/notifications/route.ts
// GET: returns notification events for a user's entities.
// GET /api/filingcontrol/notifications?userId=<uuid>

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing required parameter: userId' },
      { status: 400 }
    )
  }

  if (!UUID_PATTERN.test(userId)) {
    return NextResponse.json(
      { error: 'Invalid userId format' },
      { status: 400 }
    )
  }

  const supabase = getServiceClient()

  // Join through fc_entities to enforce ownership
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
    .eq('fc_entities.user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[notifications] Query error:', error)
    return NextResponse.json({ error: 'Query failed' }, { status: 500 })
  }

  return NextResponse.json({ events: data ?? [] })
}
