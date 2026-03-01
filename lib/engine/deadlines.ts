// lib/engine/deadlines.ts
// Deterministic deadline computation layer.
// Takes an entity profile and an assessment result (list of obligations)
// and returns statutory filing deadlines. Pure function, no DB, no auth.

export const DEADLINE_ENGINE_VERSION = '1.0.0'

export type EntityProfile = {
  entityType: string
  foreignOwned: boolean
  taxYear: number
  state: string
  fiscalYearEndMonth?: number // 1-12, defaults to 12 (calendar year)
}

export type AssessmentObligation = {
  title: string
  form: string | null
  authority: string
  explanation: string
}

export type Deadline = {
  form: string
  dueDate: string // ISO date (YYYY-MM-DD)
  basis: string
}

export type DeadlineResult = {
  engineVersion: string
  computedAt: string // ISO datetime
  taxYear: number
  deadlines: Deadline[]
}

/**
 * Compute statutory filing deadlines from an assessment result.
 *
 * Deterministic: same inputs always produce same outputs
 * (computedAt is passed in for testability).
 */
export function computeDeadlines(
  entityProfile: EntityProfile,
  assessmentResult: AssessmentObligation[],
  now?: Date
): DeadlineResult {
  const referenceDate = now ?? new Date()
  const taxYear = entityProfile.taxYear
  const deadlines: Deadline[] = []

  // Calendar year assumption: fiscal year ends Dec 31
  // April 15 of the following year is the due date
  const aprilDeadline = `${taxYear + 1}-04-15`

  for (const obligation of assessmentResult) {
    const formLower = (obligation.form ?? '').toLowerCase()

    // Form 5472 required → due April 15 following tax year
    if (formLower.includes('5472')) {
      deadlines.push({
        form: 'Form 5472',
        dueDate: aprilDeadline,
        basis: 'IRC §6038A reporting due with Form 1120',
      })
    }

    // Pro Forma 1120 required → same date as Form 5472
    if (
      formLower.includes('1120') &&
      !formLower.includes('1120-f') &&
      formLower.includes('pro forma')
    ) {
      deadlines.push({
        form: 'Pro Forma 1120',
        dueDate: aprilDeadline,
        basis: 'Pro forma return due with Form 5472 (IRC §6038A)',
      })
    }
  }

  // Deduplicate by form name (in case both triggers match the same combined obligation)
  const seen = new Set<string>()
  const unique: Deadline[] = []
  for (const d of deadlines) {
    if (!seen.has(d.form)) {
      seen.add(d.form)
      unique.push(d)
    }
  }

  return {
    engineVersion: DEADLINE_ENGINE_VERSION,
    computedAt: referenceDate.toISOString(),
    taxYear,
    deadlines: unique,
  }
}
