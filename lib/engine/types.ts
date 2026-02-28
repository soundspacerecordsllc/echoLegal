// lib/engine/types.ts
// Core type definitions for the FilingControl compliance engine.

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH'

/**
 * Input profile describing a foreign-owned U.S. LLC entity.
 * Each field maps to a questionnaire question.
 */
export interface EntityProfile {
  foreignOwner: boolean
  singleMember: boolean
  hasEIN: boolean
  hasRelatedPartyTransactions: boolean
  hasRevenue: boolean
  prior5472Filed: boolean
}

/**
 * A single penalty entry in the compliance result.
 */
export interface PenaltyEntry {
  code: string
  amount: number
  currency: string
  description: string
  citation: string
}

/**
 * Deterministic compliance evaluation result.
 */
export interface ComplianceResult {
  entityClassification: string
  requiredForms: string[]
  riskScore: number
  riskLevel: RiskLevel
  penalties: PenaltyEntry[]
  legalBasis: string[]
  version: string
}
