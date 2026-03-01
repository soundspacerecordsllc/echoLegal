// lib/filingcontrol/notifications.ts
// Deterministic notification event computation from compliance state transitions.
// Pure functions — no DB, no side effects.

import type { ComplianceState } from './monitoring'

export type EventType =
  | 'DUE_SOON_90'
  | 'DUE_SOON_30'
  | 'DUE_SOON_7'
  | 'DUE_TODAY'
  | 'OVERDUE_1'
  | 'STATUS_CHANGED'

export type EventSpec = {
  event_type: EventType
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
}

/**
 * Build a deterministic dedupe key for an event.
 * Same entity + type + form + date always produces the same key.
 */
export function buildEventKey(
  entityId: string,
  eventType: EventType,
  form: string,
  date: string
): string {
  return `${entityId}:${eventType}:${form}:${date}`
}

type StateWithEngine = ComplianceState & { engine_version: string }

// Threshold boundaries: days_remaining value that triggers each event
const THRESHOLDS: { days: number; event: EventType }[] = [
  { days: 90, event: 'DUE_SOON_90' },
  { days: 30, event: 'DUE_SOON_30' },
  { days: 7, event: 'DUE_SOON_7' },
  { days: 0, event: 'DUE_TODAY' },
  { days: -1, event: 'OVERDUE_1' },
]

/**
 * Compute notification events from a state transition.
 *
 * prevState: previous compliance state (null if first evaluation)
 * nextState: newly computed compliance state
 * entityId:  the entity UUID (used in event keys)
 *
 * Returns an array of events to insert. Idempotency is enforced at
 * the DB layer via the UNIQUE event_key constraint.
 */
export function computeNotificationEvents(
  prevState: StateWithEngine | null,
  nextState: StateWithEngine,
  entityId: string
): EventSpec[] {
  const events: EventSpec[] = []

  const prevDays = prevState?.days_remaining ?? Infinity
  const nextDays = nextState.days_remaining

  const form = nextState.next_deadline_form
  const date = nextState.next_deadline_date

  function makePayload(previousStatus?: string): EventSpec['payload'] {
    return {
      form,
      dueDate: date,
      daysRemaining: nextDays,
      status: nextState.status,
      urgency: nextState.urgency,
      engineVersion: nextState.engine_version,
      ...(previousStatus !== undefined ? { previousStatus } : {}),
    }
  }

  // A) Threshold events — emit when crossing into/at the threshold
  for (const { days, event } of THRESHOLDS) {
    if (days >= 0) {
      // Positive thresholds: prev was above, next is at or below
      if (prevDays > days && nextDays <= days) {
        events.push({
          event_type: event,
          event_key: buildEventKey(entityId, event, form, date),
          payload: makePayload(),
        })
      }
    } else {
      // OVERDUE_1: first day past due — prev >= 0, next < 0
      if (prevDays >= 0 && nextDays < 0) {
        events.push({
          event_type: event,
          event_key: buildEventKey(entityId, event, form, date),
          payload: makePayload(),
        })
      }
    }
  }

  // B) Status transition event
  if (prevState && prevState.status !== nextState.status) {
    events.push({
      event_type: 'STATUS_CHANGED',
      event_key: buildEventKey(entityId, 'STATUS_CHANGED', form, date),
      payload: makePayload(prevState.status),
    })
  }

  return events
}
