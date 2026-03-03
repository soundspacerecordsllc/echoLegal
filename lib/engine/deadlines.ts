// lib/engine/deadlines.ts
// Deterministic deadline computation layer.
// Takes an entity profile and an assessment result (list of obligations)
// and returns statutory filing deadlines. Pure function, no DB, no auth.

export const DEADLINE_ENGINE_VERSION = '2.0.0'

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

  // 5472 deadline: 15th day of 4th month after fiscal year end
  const fyEndMonth = entityProfile.fiscalYearEndMonth ?? 12
  const fyEnd = new Date(taxYear, fyEndMonth, 0) // last day of FY end month
  const deadlineDate = new Date(fyEnd)
  deadlineDate.setDate(deadlineDate.getDate() + 105) // ~15th day of 4th month
  const form5472Deadline = deadlineDate.toISOString().split('T')[0]

  for (const obligation of assessmentResult) {
    const formLower = (obligation.form ?? '').toLowerCase()

    // Form 5472 + Pro Forma 1120 (combined obligation)
    if (formLower.includes('5472')) {
      deadlines.push({
        form: 'Form 5472 + Pro Forma 1120',
        dueDate: form5472Deadline,
        basis: `IRC §6038A — 15th day of 4th month after FY end (${fyEndMonth === 12 ? 'Calendar Year' : 'Month ' + fyEndMonth}). $25,000 penalty for non-filing.`,
      })
    }

    // BOI Report — 90 days from formation for new entities
    if (formLower.includes('boi')) {
      deadlines.push({
        form: 'BOI Report (FinCEN)',
        dueDate: form5472Deadline, // uses same fiscal deadline as placeholder; real date from formation
        basis: 'FinCEN 31 USC §5336 — 90 days from formation (post-2024 entities).',
      })
    }

    // FBAR
    if (formLower.includes('fbar') || formLower.includes('form 114')) {
      deadlines.push({
        form: 'FBAR (Form 114)',
        dueDate: `${taxYear + 1}-04-15`,
        basis: 'Due April 15, automatic extension to October 15. Required if foreign accounts > $10,000.',
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
