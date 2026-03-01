// app/api/filingcontrol/internal/monitor/route.ts
// Internal monitoring job: computes and upserts compliance state per entity.
// POST only. Secured via X-FC-MONITOR-SECRET header.
// Safe to run multiple times a day — output is idempotent.

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { computeComplianceState } from '@/lib/filingcontrol/monitoring'
import {
  upsertComplianceState,
  getComplianceStateForEntity,
} from '@/lib/filingcontrol/compliance-state-db'
import { computeNotificationEvents } from '@/lib/filingcontrol/notifications'

function verifyMonitorAuth(request: NextRequest): boolean {
  const secret = request.headers.get('x-fc-monitor-secret')
  const expected = process.env.FC_MONITOR_SECRET

  if (!expected) return false
  return secret === expected
}

export async function POST(request: NextRequest) {
  if (!verifyMonitorAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceClient()
  const now = new Date()

  // 1. List all entities (need user_id to join to assessments)
  const { data: entities, error: entitiesError } = await supabase
    .from('fc_entities')
    .select('id, user_id')

  if (entitiesError) {
    console.error('[monitor] Failed to list entities:', entitiesError)
    return NextResponse.json(
      { error: 'Failed to list entities' },
      { status: 500 }
    )
  }

  if (!entities || entities.length === 0) {
    return NextResponse.json({
      processedEntities: 0,
      updatedStates: 0,
      skippedNoDeadlines: 0,
    })
  }

  let updatedStates = 0
  let skippedNoDeadlines = 0
  let createdEvents = 0
  let skippedDuplicates = 0

  for (const entity of entities) {
    // 2. Fetch latest assessment for this entity's user (newest created_at)
    //    fc_assessments uses user_id (see fc-assessments-schema.sql)
    const { data: assessment, error: assessmentError } = await supabase
      .from('fc_assessments')
      .select('deadlines_json, engine_version')
      .eq('user_id', entity.user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (assessmentError || !assessment) {
      skippedNoDeadlines++
      continue
    }

    // 3. Load previous compliance state (before computing new one)
    const prevState = await getComplianceStateForEntity(entity.id)

    // 4. Compute next state
    const nextState = computeComplianceState({
      deadlineResult: assessment.deadlines_json as any,
      engineVersion: assessment.engine_version,
      now,
    })

    if (!nextState) {
      skippedNoDeadlines++
      continue
    }

    // 5. Upsert into fc_compliance_state
    const { error: upsertError } = await upsertComplianceState(
      entity.id,
      nextState
    )

    if (upsertError) {
      console.error(
        `[monitor] Upsert failed for entity ${entity.id}:`,
        upsertError
      )
      continue
    }

    updatedStates++

    // 6. Compute and insert notification events
    const events = computeNotificationEvents(prevState, nextState, entity.id)

    // Get the compliance_state_id for linking
    const freshState = await getComplianceStateForEntity(entity.id)
    const complianceStateId = freshState?.id ?? null

    for (const event of events) {
      const { error: insertError } = await supabase
        .from('fc_notification_events')
        .insert({
          entity_id: entity.id,
          compliance_state_id: complianceStateId,
          event_type: event.event_type,
          event_key: event.event_key,
          payload: event.payload,
        })

      if (insertError) {
        // UNIQUE constraint violation = duplicate, expected for idempotency
        if (insertError.code === '23505') {
          skippedDuplicates++
        } else {
          console.error(
            `[monitor] Event insert failed for entity ${entity.id}:`,
            insertError
          )
        }
      } else {
        createdEvents++
      }
    }
  }

  return NextResponse.json({
    processedEntities: entities.length,
    updatedStates,
    skippedNoDeadlines,
    createdEvents,
    skippedDuplicates,
    timestamp: now.toISOString(),
  })
}
