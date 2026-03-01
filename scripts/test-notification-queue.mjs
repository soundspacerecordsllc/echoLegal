/**
 * Unit tests: FilingControl notification event queue — deterministic event computation.
 *
 * Validates:
 *   1. Threshold crossing emits exactly one event per threshold
 *   2. Repeated runs do not duplicate (event_key is stable/deterministic)
 *   3. Status change emits STATUS_CHANGED
 *   4. No events when thresholds are not crossed
 *   5. First evaluation (no prev state) emits appropriate events
 *   6. buildEventKey determinism
 *
 * Run: node --test scripts/test-notification-queue.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

// ── Inline pure functions (no TS imports in .mjs) ─────────────────────
// Mirrors lib/filingcontrol/notifications.ts exactly.

function buildEventKey(entityId, eventType, form, date) {
  return `${entityId}:${eventType}:${form}:${date}`
}

const THRESHOLDS = [
  { days: 90, event: 'DUE_SOON_90' },
  { days: 30, event: 'DUE_SOON_30' },
  { days: 7, event: 'DUE_SOON_7' },
  { days: 0, event: 'DUE_TODAY' },
  { days: -1, event: 'OVERDUE_1' },
]

function computeNotificationEvents(prevState, nextState, entityId) {
  const events = []

  const prevDays = prevState?.days_remaining ?? Infinity
  const nextDays = nextState.days_remaining

  const form = nextState.next_deadline_form
  const date = nextState.next_deadline_date

  function makePayload(previousStatus) {
    const p = {
      form,
      dueDate: date,
      daysRemaining: nextDays,
      status: nextState.status,
      urgency: nextState.urgency,
      engineVersion: nextState.engine_version,
    }
    if (previousStatus !== undefined) {
      p.previousStatus = previousStatus
    }
    return p
  }

  // A) Threshold events
  for (const { days, event } of THRESHOLDS) {
    if (days >= 0) {
      if (prevDays > days && nextDays <= days) {
        events.push({
          event_type: event,
          event_key: buildEventKey(entityId, event, form, date),
          payload: makePayload(),
        })
      }
    } else {
      // OVERDUE_1: prev >= 0, next < 0
      if (prevDays >= 0 && nextDays < 0) {
        events.push({
          event_type: event,
          event_key: buildEventKey(entityId, event, form, date),
          payload: makePayload(),
        })
      }
    }
  }

  // B) Status transition
  if (prevState && prevState.status !== nextState.status) {
    events.push({
      event_type: 'STATUS_CHANGED',
      event_key: buildEventKey(entityId, 'STATUS_CHANGED', form, date),
      payload: makePayload(prevState.status),
    })
  }

  return events
}

// ── Helpers ──────────────────────────────────────────────────────────

const ENTITY_ID = '00000000-0000-0000-0000-000000000001'
const ENGINE = 'v1.0.0'

function makeState(daysRemaining, form = 'Form 5472', date = '2025-09-15') {
  let status
  if (daysRemaining > 90) status = 'CURRENT'
  else if (daysRemaining >= 0) status = 'DUE_SOON'
  else status = 'OVERDUE'

  let urgency
  if (daysRemaining > 90) urgency = 'NONE'
  else if (daysRemaining >= 31) urgency = 'AMBER'
  else urgency = 'RED'

  return {
    next_deadline_form: form,
    next_deadline_date: date,
    days_remaining: daysRemaining,
    status,
    urgency,
    engine_version: ENGINE,
  }
}

function eventTypes(events) {
  return events.map((e) => e.event_type)
}

// ── Tests: threshold crossing ────────────────────────────────────────

describe('Notifications: 90-day threshold', () => {
  it('emits DUE_SOON_90 when crossing from 91 to 90', () => {
    const prev = makeState(91)
    const next = makeState(90)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(eventTypes(events).includes('DUE_SOON_90'))
  })

  it('emits DUE_SOON_90 when crossing from 100 to 85', () => {
    const prev = makeState(100)
    const next = makeState(85)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(eventTypes(events).includes('DUE_SOON_90'))
  })

  it('does NOT emit DUE_SOON_90 when staying above 90', () => {
    const prev = makeState(95)
    const next = makeState(91)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('DUE_SOON_90'))
  })

  it('does NOT emit DUE_SOON_90 when already below 90', () => {
    const prev = makeState(85)
    const next = makeState(80)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('DUE_SOON_90'))
  })
})

describe('Notifications: 30-day threshold', () => {
  it('emits DUE_SOON_30 when crossing from 31 to 30', () => {
    const prev = makeState(31)
    const next = makeState(30)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(eventTypes(events).includes('DUE_SOON_30'))
  })

  it('does NOT emit DUE_SOON_30 when already at 29', () => {
    const prev = makeState(29)
    const next = makeState(28)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('DUE_SOON_30'))
  })
})

describe('Notifications: 7-day threshold', () => {
  it('emits DUE_SOON_7 when crossing from 8 to 7', () => {
    const prev = makeState(8)
    const next = makeState(7)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(eventTypes(events).includes('DUE_SOON_7'))
  })

  it('does NOT emit DUE_SOON_7 when going from 7 to 6', () => {
    const prev = makeState(7)
    const next = makeState(6)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('DUE_SOON_7'))
  })
})

describe('Notifications: DUE_TODAY threshold', () => {
  it('emits DUE_TODAY when crossing from 1 to 0', () => {
    const prev = makeState(1)
    const next = makeState(0)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(eventTypes(events).includes('DUE_TODAY'))
  })

  it('does NOT emit DUE_TODAY when already past due', () => {
    const prev = makeState(-1)
    const next = makeState(-2)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('DUE_TODAY'))
  })
})

describe('Notifications: OVERDUE_1 threshold', () => {
  it('emits OVERDUE_1 when crossing from 0 to -1', () => {
    const prev = makeState(0)
    const next = makeState(-1)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(eventTypes(events).includes('OVERDUE_1'))
  })

  it('does NOT emit OVERDUE_1 when already overdue', () => {
    const prev = makeState(-2)
    const next = makeState(-3)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('OVERDUE_1'))
  })
})

// ── Tests: multiple thresholds crossed at once ───────────────────────

describe('Notifications: multiple threshold crossing', () => {
  it('emits multiple events when jumping across several thresholds', () => {
    const prev = makeState(100) // above all thresholds
    const next = makeState(5) // below 90, 30, 7
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    const types = eventTypes(events)
    assert.ok(types.includes('DUE_SOON_90'))
    assert.ok(types.includes('DUE_SOON_30'))
    assert.ok(types.includes('DUE_SOON_7'))
    assert.ok(!types.includes('DUE_TODAY'))
    assert.ok(!types.includes('OVERDUE_1'))
  })

  it('emits all threshold events when jumping from far future to overdue', () => {
    const prev = makeState(200)
    const next = makeState(-1)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    const types = eventTypes(events)
    assert.ok(types.includes('DUE_SOON_90'))
    assert.ok(types.includes('DUE_SOON_30'))
    assert.ok(types.includes('DUE_SOON_7'))
    assert.ok(types.includes('DUE_TODAY'))
    assert.ok(types.includes('OVERDUE_1'))
    // 5 threshold events + 1 STATUS_CHANGED (CURRENT -> OVERDUE)
    assert.equal(events.length, 6)
  })
})

// ── Tests: event_key determinism (idempotency) ───────────────────────

describe('Notifications: event_key determinism', () => {
  it('produces identical event_key for same inputs', () => {
    const key1 = buildEventKey(ENTITY_ID, 'DUE_SOON_30', 'Form 5472', '2025-09-15')
    const key2 = buildEventKey(ENTITY_ID, 'DUE_SOON_30', 'Form 5472', '2025-09-15')
    assert.equal(key1, key2)
  })

  it('produces different event_key for different entity', () => {
    const key1 = buildEventKey(ENTITY_ID, 'DUE_SOON_30', 'Form 5472', '2025-09-15')
    const key2 = buildEventKey('00000000-0000-0000-0000-000000000002', 'DUE_SOON_30', 'Form 5472', '2025-09-15')
    assert.notEqual(key1, key2)
  })

  it('produces different event_key for different event_type', () => {
    const key1 = buildEventKey(ENTITY_ID, 'DUE_SOON_30', 'Form 5472', '2025-09-15')
    const key2 = buildEventKey(ENTITY_ID, 'DUE_SOON_7', 'Form 5472', '2025-09-15')
    assert.notEqual(key1, key2)
  })

  it('repeated computeNotificationEvents produce same event_keys', () => {
    const prev = makeState(31)
    const next = makeState(30)
    const events1 = computeNotificationEvents(prev, next, ENTITY_ID)
    const events2 = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.equal(events1.length, events2.length)
    for (let i = 0; i < events1.length; i++) {
      assert.equal(events1[i].event_key, events2[i].event_key)
    }
  })

  it('event_key format matches expected pattern', () => {
    const key = buildEventKey(ENTITY_ID, 'DUE_SOON_30', 'Form 5472', '2025-09-15')
    assert.equal(key, `${ENTITY_ID}:DUE_SOON_30:Form 5472:2025-09-15`)
  })
})

// ── Tests: STATUS_CHANGED ────────────────────────────────────────────

describe('Notifications: STATUS_CHANGED', () => {
  it('emits STATUS_CHANGED when status changes CURRENT -> DUE_SOON', () => {
    const prev = makeState(91) // CURRENT
    const next = makeState(90) // DUE_SOON
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    const statusEvent = events.find((e) => e.event_type === 'STATUS_CHANGED')
    assert.ok(statusEvent)
    assert.equal(statusEvent.payload.previousStatus, 'CURRENT')
    assert.equal(statusEvent.payload.status, 'DUE_SOON')
  })

  it('emits STATUS_CHANGED when status changes DUE_SOON -> OVERDUE', () => {
    const prev = makeState(0) // DUE_SOON
    const next = makeState(-1) // OVERDUE
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    const statusEvent = events.find((e) => e.event_type === 'STATUS_CHANGED')
    assert.ok(statusEvent)
    assert.equal(statusEvent.payload.previousStatus, 'DUE_SOON')
    assert.equal(statusEvent.payload.status, 'OVERDUE')
  })

  it('does NOT emit STATUS_CHANGED when status stays the same', () => {
    const prev = makeState(50) // DUE_SOON
    const next = makeState(45) // DUE_SOON
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('STATUS_CHANGED'))
  })

  it('includes previousStatus in STATUS_CHANGED payload', () => {
    const prev = makeState(91) // CURRENT
    const next = makeState(85) // DUE_SOON
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    const statusEvent = events.find((e) => e.event_type === 'STATUS_CHANGED')
    assert.ok(statusEvent)
    assert.equal(statusEvent.payload.previousStatus, 'CURRENT')
  })
})

// ── Tests: no events when no crossing ────────────────────────────────

describe('Notifications: no events when no crossing', () => {
  it('emits nothing when days tick down within same band (50 -> 49)', () => {
    const prev = makeState(50)
    const next = makeState(49)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.equal(events.length, 0)
  })

  it('emits nothing when days stay the same', () => {
    const prev = makeState(60)
    const next = makeState(60)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.equal(events.length, 0)
  })

  it('emits nothing when deeply overdue and getting more overdue', () => {
    const prev = makeState(-10)
    const next = makeState(-11)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.equal(events.length, 0)
  })
})

// ── Tests: first evaluation (no previous state) ─────────────────────

describe('Notifications: first evaluation (prevState=null)', () => {
  it('emits threshold events when first seen at 85 days', () => {
    const next = makeState(85)
    const events = computeNotificationEvents(null, next, ENTITY_ID)
    const types = eventTypes(events)
    // prevDays = Infinity, next = 85 => crossed 90
    assert.ok(types.includes('DUE_SOON_90'))
    assert.ok(!types.includes('DUE_SOON_30'))
    assert.equal(events.length, 1)
  })

  it('emits multiple threshold events when first seen at 5 days', () => {
    const next = makeState(5)
    const events = computeNotificationEvents(null, next, ENTITY_ID)
    const types = eventTypes(events)
    assert.ok(types.includes('DUE_SOON_90'))
    assert.ok(types.includes('DUE_SOON_30'))
    assert.ok(types.includes('DUE_SOON_7'))
    assert.ok(!types.includes('DUE_TODAY'))
    // No STATUS_CHANGED because prevState is null
    assert.ok(!types.includes('STATUS_CHANGED'))
    assert.equal(events.length, 3)
  })

  it('does NOT emit STATUS_CHANGED when prevState is null', () => {
    const next = makeState(50)
    const events = computeNotificationEvents(null, next, ENTITY_ID)
    assert.ok(!eventTypes(events).includes('STATUS_CHANGED'))
  })

  it('emits no events when first seen at 200 days (well above all thresholds)', () => {
    const next = makeState(200)
    const events = computeNotificationEvents(null, next, ENTITY_ID)
    assert.equal(events.length, 0)
  })
})

// ── Tests: payload correctness ───────────────────────────────────────

describe('Notifications: payload correctness', () => {
  it('includes correct form, dueDate, daysRemaining in payload', () => {
    const prev = makeState(91, 'Form 1120-F', '2025-10-15')
    const next = makeState(89, 'Form 1120-F', '2025-10-15')
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    assert.ok(events.length > 0)
    const event = events[0]
    assert.equal(event.payload.form, 'Form 1120-F')
    assert.equal(event.payload.dueDate, '2025-10-15')
    assert.equal(event.payload.daysRemaining, 89)
    assert.equal(event.payload.engineVersion, ENGINE)
  })

  it('does NOT include previousStatus in threshold events', () => {
    const prev = makeState(31)
    const next = makeState(29)
    const events = computeNotificationEvents(prev, next, ENTITY_ID)
    const thresholdEvent = events.find((e) => e.event_type === 'DUE_SOON_30')
    assert.ok(thresholdEvent)
    assert.equal(thresholdEvent.payload.previousStatus, undefined)
  })
})
