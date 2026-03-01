// lib/filingcontrol/monitoring.ts
// Deterministic compliance-state computation from assessment deadlines.
// Pure function — no DB, no side effects.

export type DeadlineEntry = {
  form: string
  dueDate: string // ISO date string (YYYY-MM-DD)
}

export type DeadlineResult = {
  deadlines: DeadlineEntry[]
}

export type ComplianceState = {
  next_deadline_form: string
  next_deadline_date: string // ISO date (YYYY-MM-DD)
  days_remaining: number
  status: 'CURRENT' | 'DUE_SOON' | 'OVERDUE'
  urgency: 'NONE' | 'AMBER' | 'RED'
}

/**
 * Compute compliance state from an assessment's deadline result.
 * Returns null if no deadlines exist (caller should skip the entity).
 */
export function computeComplianceState({
  deadlineResult,
  engineVersion,
  now,
}: {
  deadlineResult: DeadlineResult | null | undefined
  engineVersion: string
  now: Date
}): (ComplianceState & { engine_version: string }) | null {
  if (!deadlineResult?.deadlines || deadlineResult.deadlines.length === 0) {
    return null
  }

  // Select the earliest deadline by dueDate
  const sorted = [...deadlineResult.deadlines].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  const earliest = sorted[0]
  const deadlineDate = new Date(earliest.dueDate)

  // Compute days remaining using date-only comparison (no time component)
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const deadlineDateOnly = new Date(
    deadlineDate.getFullYear(),
    deadlineDate.getMonth(),
    deadlineDate.getDate()
  )
  const diffMs = deadlineDateOnly.getTime() - nowDate.getTime()
  const daysRemaining = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // Status: > 90 CURRENT, 0..90 DUE_SOON, < 0 OVERDUE
  let status: ComplianceState['status']
  if (daysRemaining > 90) {
    status = 'CURRENT'
  } else if (daysRemaining >= 0) {
    status = 'DUE_SOON'
  } else {
    status = 'OVERDUE'
  }

  // Urgency: > 90 NONE, 31..90 AMBER, 0..30 RED, < 0 RED
  let urgency: ComplianceState['urgency']
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
