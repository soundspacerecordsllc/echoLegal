// lib/engine/evaluate.ts
// Main compliance evaluation entry point.
// Composes risk scoring and rule evaluation into a single ComplianceResult.

import type { EntityProfile, ComplianceResult } from './types'
import { calculateRisk } from './risk'
import { applyRules } from './rules'

/** Engine version. Increment on rule changes. */
const ENGINE_VERSION = 'v1.0.0'

/**
 * Evaluate compliance obligations for an entity profile.
 *
 * Deterministic: identical input always produces identical output.
 * No side effects, no external calls, no randomness.
 */
export function evaluateCompliance(profile: EntityProfile): ComplianceResult {
  const risk = calculateRisk(profile)
  const rules = applyRules(profile)

  return {
    entityClassification: rules.entityClassification,
    requiredForms: rules.requiredForms,
    riskScore: risk.score,
    riskLevel: risk.level,
    penalties: rules.penalties,
    legalBasis: rules.legalBasis,
    version: ENGINE_VERSION,
  }
}
