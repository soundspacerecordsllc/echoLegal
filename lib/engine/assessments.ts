// lib/engine/assessments.ts
// Creates and persists assessment snapshots with computed deadlines.
// Uses the obligations engine + deadline engine together.

import { computeObligations, type FilingInput, type Obligation } from '@/app/filingcontrol/lib/obligations'
import {
  computeDeadlines,
  DEADLINE_ENGINE_VERSION,
  type EntityProfile,
  type DeadlineResult,
} from './deadlines'

export type AssessmentSnapshot = {
  entityProfile: EntityProfile
  obligations: Obligation[]
  deadlines: DeadlineResult
}

/**
 * Run the full assessment pipeline:
 * 1. Compute filing obligations from input
 * 2. Compute statutory deadlines from obligations
 * 3. Return the complete snapshot (ready for persistence)
 */
export function createAssessmentSnapshot(
  input: FilingInput,
  now?: Date
): AssessmentSnapshot {
  const obligations = computeObligations(input)

  const entityProfile: EntityProfile = {
    entityType: input.entityType,
    foreignOwned: input.foreignOwned,
    taxYear: input.taxYear,
    state: input.state,
    fiscalYearEndMonth: 12, // calendar year assumption
  }

  const deadlines = computeDeadlines(entityProfile, obligations, now)

  return {
    entityProfile,
    obligations,
    deadlines,
  }
}
