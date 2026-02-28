// lib/engine/rules.ts
// Compliance rule evaluation layer.
// Determines entity classification, required forms, and applicable penalties/citations.

import type { EntityProfile, PenaltyEntry } from './types'
import { PENALTIES } from './penalties'
import { CITATIONS } from './citations'

export interface RuleResult {
  entityClassification: string
  requiredForms: string[]
  penalties: PenaltyEntry[]
  legalBasis: string[]
}

/**
 * Apply compliance rules to an entity profile.
 * Deterministic: same input always produces same output.
 */
export function applyRules(profile: EntityProfile): RuleResult {
  let entityClassification = 'U.S. LLC'
  const requiredForms: string[] = []
  const penalties: PenaltyEntry[] = []
  const legalBasis: string[] = []

  // Classification
  if (profile.foreignOwner && profile.singleMember) {
    entityClassification = 'Foreign-Owned Single-Member U.S. LLC'
  }

  // Form 5472 — required when related-party transactions exist
  if (profile.hasRelatedPartyTransactions) {
    requiredForms.push('Form 5472')
    legalBasis.push(CITATIONS.FORM_5472.short)

    // Penalty for failure to file
    penalties.push({
      code: 'FORM_5472_FAILURE',
      amount: PENALTIES.FORM_5472_FAILURE.amount,
      currency: PENALTIES.FORM_5472_FAILURE.currency,
      description: PENALTIES.FORM_5472_FAILURE.description,
      citation: PENALTIES.FORM_5472_FAILURE.citation,
    })
  }

  // Pro Forma Form 1120 — required for foreign-owned single-member LLCs
  if (profile.foreignOwner && profile.singleMember) {
    requiredForms.push('Pro Forma Form 1120')
    legalBasis.push(CITATIONS.FORM_1120.short)
  }

  // EIN requirement
  if (!profile.hasEIN) {
    legalBasis.push(CITATIONS.EIN_REQUIREMENT.short)
  }

  return {
    entityClassification,
    requiredForms,
    penalties,
    legalBasis,
  }
}
