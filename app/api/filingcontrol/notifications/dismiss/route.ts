// app/api/filingcontrol/notifications/dismiss/route.ts
// POST: marks a notification event as CANCELLED (dismissed).
// Body: { eventId: string, userId: string }

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventId = body.eventId as string
  const userId = body.userId as string

  if (!eventId || !UUID_PATTERN.test(eventId)) {
    return NextResponse.json(
      { error: 'Missing or invalid eventId' },
      { status: 400 }
    )
  }

  if (!userId || !UUID_PATTERN.test(userId)) {
    return NextResponse.json(
      { error: 'Missing or invalid userId' },
      { status: 400 }
    )
  }

  const supabase = getServiceClient()

  // Verify ownership: event must belong to an entity owned by this user
  const { data: event, error: lookupError } = await supabase
    .from('fc_notification_events')
    .select(
      `
      id,
      status,
      fc_entities!inner (
        user_id
      )
    `
    )
    .eq('id', eventId)
    .eq('fc_entities.user_id', userId)
    .single()

  if (lookupError || !event) {
    return NextResponse.json(
      { error: 'Event not found or not owned by user' },
      { status: 404 }
    )
  }

  // Update status to CANCELLED
  const { error: updateError } = await supabase
    .from('fc_notification_events')
    .update({ status: 'CANCELLED' })
    .eq('id', eventId)

  if (updateError) {
    console.error('[notifications/dismiss] Update error:', updateError)
    return NextResponse.json(
      { error: 'Failed to dismiss event' },
      { status: 500 }
    )
  }

  return NextResponse.json({ dismissed: true })
}
