// lib/engine/risk.ts
// Deterministic risk scoring for foreign-owned U.S. LLC compliance.
// No randomness. Additive point system with fixed thresholds.

import type { EntityProfile, RiskLevel } from './types'

export interface RiskAssessment {
  score: number
  level: RiskLevel
}

/**
 * Calculate compliance risk score and level from an entity profile.
 *
 * Scoring:
 *   foreignOwner && singleMember  → +30
 *   hasRelatedPartyTransactions   → +30
 *   !prior5472Filed               → +40
 *   hasRevenue                    → +10
 *   !hasEIN                       → +20
 *
 * Thresholds:
 *   0–39  → LOW
 *   40–79 → MODERATE
 *   80+   → HIGH
 */
export function calculateRisk(profile: EntityProfile): RiskAssessment {
  let score = 0

  if (profile.foreignOwner && profile.singleMember) score += 30
  if (profile.hasRelatedPartyTransactions) score += 30
  if (!profile.prior5472Filed) score += 40
  if (profile.hasRevenue) score += 10
  if (!profile.hasEIN) score += 20

  let level: RiskLevel
  if (score >= 80) {
    level = 'HIGH'
  } else if (score >= 40) {
    level = 'MODERATE'
  } else {
    level = 'LOW'
  }

  return { score, level }
}
