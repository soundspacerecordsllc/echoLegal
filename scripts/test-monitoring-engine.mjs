/**
 * Unit tests: FilingControl monitoring engine — deterministic compliance state computation.
 *
 * Validates:
 *   1. days_remaining calculation with fixed "now"
 *   2. Status boundary tests at 91, 90, 30, 0, -1
 *   3. Urgency boundary tests at 91, 90, 31, 30, 0, -1
 *   4. Earliest-deadline selection from multiple deadlines
 *   5. null/empty deadlines returns null
 *   6. Engine version passthrough
 *
 * Run: node --test scripts/test-monitoring-engine.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

// ── Inline the pure computation function (no TS imports in .mjs) ────
// Mirrors lib/filingcontrol/monitoring.ts exactly.

function computeComplianceState({ deadlineResult, engineVersion, now }) {
  if (!deadlineResult?.deadlines || deadlineResult.deadlines.length === 0) {
    return null
  }

  const sorted = [...deadlineResult.deadlines].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  const earliest = sorted[0]
  const deadlineDate = new Date(earliest.dueDate)

  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const deadlineDateOnly = new Date(
    deadlineDate.getFullYear(),
    deadlineDate.getMonth(),
    deadlineDate.getDate()
  )
  const diffMs = deadlineDateOnly.getTime() - nowDate.getTime()
  const daysRemaining = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  let status
  if (daysRemaining > 90) {
    status = 'CURRENT'
  } else if (daysRemaining >= 0) {
    status = 'DUE_SOON'
  } else {
    status = 'OVERDUE'
  }

  let urgency
  if (daysRemaining > 90) {
    urgency = 'NONE'
  } else if (daysRemaining >= 31) {
    urgency = 'AMBER'
  } else {
    urgency = 'RED'
  }

  return {
    next_deadline_form: earliest.form,
    next_deadline_date: earliest.dueDate,
    days_remaining: daysRemaining,
    status,
    urgency,
    engine_version: engineVersion,
  }
}

// ── Helpers ────────────────────────────────────────────────────────────

/** Create a date N days from the fixed "now". */
function dateOffsetDays(now, days) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

const FIXED_NOW = new Date(2025, 5, 15) // June 15, 2025
const ENGINE = 'v1.0.0'

// ── Tests: days_remaining determinism ──────────────────────────────────

describe('Monitoring: days_remaining calculation', () => {
  it('computes exact days for future deadline', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 45)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form X', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.days_remaining, 45)
  })

  it('computes 0 days when deadline is today', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 0)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form X', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.days_remaining, 0)
  })

  it('computes negative days for past deadline', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, -10)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form X', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.days_remaining, -10)
  })
})

// ── Tests: status boundaries ──────────────────────────────────────────

describe('Monitoring: status boundaries', () => {
  it('91 days => CURRENT', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 91)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.status, 'CURRENT')
  })

  it('90 days => DUE_SOON (boundary)', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 90)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.status, 'DUE_SOON')
  })

  it('30 days => DUE_SOON', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 30)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.status, 'DUE_SOON')
  })

  it('0 days => DUE_SOON', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 0)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.status, 'DUE_SOON')
  })

  it('-1 day => OVERDUE', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, -1)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.status, 'OVERDUE')
  })
})

// ── Tests: urgency boundaries ─────────────────────────────────────────

describe('Monitoring: urgency boundaries', () => {
  it('91 days => NONE', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 91)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.urgency, 'NONE')
  })

  it('90 days => AMBER (boundary)', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 90)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.urgency, 'AMBER')
  })

  it('31 days => AMBER', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 31)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.urgency, 'AMBER')
  })

  it('30 days => RED (boundary)', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 30)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.urgency, 'RED')
  })

  it('0 days => RED', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 0)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.urgency, 'RED')
  })

  it('-1 day => RED', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, -1)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form A', dueDate }] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.urgency, 'RED')
  })
})

// ── Tests: earliest deadline selection ────────────────────────────────

describe('Monitoring: earliest deadline selection', () => {
  it('selects the earliest deadline from multiple', () => {
    const result = computeComplianceState({
      deadlineResult: {
        deadlines: [
          { form: 'Form B', dueDate: '2025-12-01' },
          { form: 'Form A', dueDate: '2025-07-01' },
          { form: 'Form C', dueDate: '2026-01-15' },
        ],
      },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.next_deadline_form, 'Form A')
    assert.equal(result.next_deadline_date, '2025-07-01')
  })

  it('returns correct form for single deadline', () => {
    const result = computeComplianceState({
      deadlineResult: {
        deadlines: [{ form: 'Form 5472', dueDate: '2025-09-15' }],
      },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result.next_deadline_form, 'Form 5472')
    assert.equal(result.next_deadline_date, '2025-09-15')
  })
})

// ── Tests: null/empty deadlines ───────────────────────────────────────

describe('Monitoring: null/empty deadline handling', () => {
  it('returns null for null deadlineResult', () => {
    const result = computeComplianceState({
      deadlineResult: null,
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result, null)
  })

  it('returns null for undefined deadlineResult', () => {
    const result = computeComplianceState({
      deadlineResult: undefined,
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result, null)
  })

  it('returns null for empty deadlines array', () => {
    const result = computeComplianceState({
      deadlineResult: { deadlines: [] },
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result, null)
  })

  it('returns null for deadlineResult with no deadlines key', () => {
    const result = computeComplianceState({
      deadlineResult: {},
      engineVersion: ENGINE,
      now: FIXED_NOW,
    })
    assert.equal(result, null)
  })
})

// ── Tests: engine version passthrough ─────────────────────────────────

describe('Monitoring: engine version', () => {
  it('passes through engine_version unchanged', () => {
    const dueDate = dateOffsetDays(FIXED_NOW, 60)
    const result = computeComplianceState({
      deadlineResult: { deadlines: [{ form: 'Form X', dueDate }] },
      engineVersion: 'v2.3.1-beta',
      now: FIXED_NOW,
    })
    assert.equal(result.engine_version, 'v2.3.1-beta')
  })
})
