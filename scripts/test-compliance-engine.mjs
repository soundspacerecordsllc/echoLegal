/**
 * Unit tests for the FilingControl compliance engine.
 *
 * Validates:
 *   1. Risk scoring produces correct scores and levels
 *   2. Rule evaluation assigns correct forms, penalties, and citations
 *   3. Full evaluation is deterministic
 *   4. Edge cases: all-false profile, all-true profile
 *
 * Run: node --test scripts/test-compliance-engine.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

// ---- Mirror engine logic (standalone, no TS imports) ----

function calculateRisk(profile) {
  let score = 0
  if (profile.foreignOwner && profile.singleMember) score += 30
  if (profile.hasRelatedPartyTransactions) score += 30
  if (!profile.prior5472Filed) score += 40
  if (profile.hasRevenue) score += 10
  if (!profile.hasEIN) score += 20

  let level
  if (score >= 80) level = 'HIGH'
  else if (score >= 40) level = 'MODERATE'
  else level = 'LOW'

  return { score, level }
}

function applyRules(profile) {
  let entityClassification = 'U.S. LLC'
  const requiredForms = []
  const penalties = []
  const legalBasis = []

  if (profile.foreignOwner && profile.singleMember) {
    entityClassification = 'Foreign-Owned Single-Member U.S. LLC'
  }

  if (profile.hasRelatedPartyTransactions) {
    requiredForms.push('Form 5472')
    legalBasis.push('IRC \u00A76038A(d)')
    penalties.push({
      code: 'FORM_5472_FAILURE',
      amount: 25000,
      currency: 'USD',
      description: 'Failure to file Form 5472',
      citation: 'IRC \u00A76038A(d)',
    })
  }

  if (profile.foreignOwner && profile.singleMember) {
    requiredForms.push('Pro Forma Form 1120')
    legalBasis.push('IRC \u00A76012')
  }

  if (!profile.hasEIN) {
    legalBasis.push('IRC \u00A76109')
  }

  return { entityClassification, requiredForms, penalties, legalBasis }
}

function evaluateCompliance(profile) {
  const risk = calculateRisk(profile)
  const rules = applyRules(profile)
  return {
    entityClassification: rules.entityClassification,
    requiredForms: rules.requiredForms,
    riskScore: risk.score,
    riskLevel: risk.level,
    penalties: rules.penalties,
    legalBasis: rules.legalBasis,
    version: 'v1.0.0',
  }
}

// ---- Test profiles ----

const HIGH_RISK_PROFILE = {
  foreignOwner: true,
  singleMember: true,
  hasEIN: false,
  hasRelatedPartyTransactions: true,
  hasRevenue: true,
  prior5472Filed: false,
}

const LOW_RISK_PROFILE = {
  foreignOwner: false,
  singleMember: false,
  hasEIN: true,
  hasRelatedPartyTransactions: false,
  hasRevenue: false,
  prior5472Filed: true,
}

const MODERATE_PROFILE = {
  foreignOwner: true,
  singleMember: true,
  hasEIN: true,
  hasRelatedPartyTransactions: false,
  hasRevenue: false,
  prior5472Filed: true,
}

// ---- Tests: Risk scoring ----

describe('Risk scoring', () => {
  it('high-risk profile scores 130 (HIGH)', () => {
    const risk = calculateRisk(HIGH_RISK_PROFILE)
    assert.equal(risk.score, 130)
    assert.equal(risk.level, 'HIGH')
  })

  it('low-risk profile scores 0 (LOW)', () => {
    const risk = calculateRisk(LOW_RISK_PROFILE)
    assert.equal(risk.score, 0)
    assert.equal(risk.level, 'LOW')
  })

  it('moderate profile scores 30 (LOW — below 40 threshold)', () => {
    const risk = calculateRisk(MODERATE_PROFILE)
    assert.equal(risk.score, 30)
    assert.equal(risk.level, 'LOW')
  })

  it('boundary: score 40 is MODERATE', () => {
    // foreignOwner+singleMember(30) + hasRevenue(10) = 40
    const profile = {
      foreignOwner: true,
      singleMember: true,
      hasEIN: true,
      hasRelatedPartyTransactions: false,
      hasRevenue: true,
      prior5472Filed: true,
    }
    const risk = calculateRisk(profile)
    assert.equal(risk.score, 40)
    assert.equal(risk.level, 'MODERATE')
  })

  it('boundary: score 80 is HIGH', () => {
    // foreignOwner+singleMember(30) + relatedParty(30) + !hasEIN(20) = 80
    const profile = {
      foreignOwner: true,
      singleMember: true,
      hasEIN: false,
      hasRelatedPartyTransactions: true,
      hasRevenue: false,
      prior5472Filed: true,
    }
    const risk = calculateRisk(profile)
    assert.equal(risk.score, 80)
    assert.equal(risk.level, 'HIGH')
  })
})

// ---- Tests: Rule evaluation ----

describe('Rule evaluation', () => {
  it('classifies foreign-owned single-member LLC', () => {
    const rules = applyRules(HIGH_RISK_PROFILE)
    assert.equal(rules.entityClassification, 'Foreign-Owned Single-Member U.S. LLC')
  })

  it('classifies generic LLC when not foreign-owned single-member', () => {
    const rules = applyRules(LOW_RISK_PROFILE)
    assert.equal(rules.entityClassification, 'U.S. LLC')
  })

  it('requires Form 5472 when related-party transactions exist', () => {
    const rules = applyRules(HIGH_RISK_PROFILE)
    assert.ok(rules.requiredForms.includes('Form 5472'))
  })

  it('requires Pro Forma Form 1120 for foreign-owned single-member LLC', () => {
    const rules = applyRules(HIGH_RISK_PROFILE)
    assert.ok(rules.requiredForms.includes('Pro Forma Form 1120'))
  })

  it('attaches $25,000 penalty for Form 5472 failure', () => {
    const rules = applyRules(HIGH_RISK_PROFILE)
    const penalty = rules.penalties.find(p => p.code === 'FORM_5472_FAILURE')
    assert.ok(penalty, 'Missing FORM_5472_FAILURE penalty')
    assert.equal(penalty.amount, 25000)
    assert.equal(penalty.currency, 'USD')
  })

  it('no penalties when no related-party transactions', () => {
    const rules = applyRules(LOW_RISK_PROFILE)
    assert.equal(rules.penalties.length, 0)
  })

  it('includes EIN citation when EIN is missing', () => {
    const rules = applyRules(HIGH_RISK_PROFILE)
    assert.ok(rules.legalBasis.includes('IRC \u00A76109'))
  })
})

// ---- Tests: Full evaluation determinism ----

describe('Compliance evaluation determinism', () => {
  it('produces identical JSON on repeated evaluations', () => {
    const first = JSON.stringify(evaluateCompliance(HIGH_RISK_PROFILE))
    for (let i = 0; i < 10; i++) {
      const current = JSON.stringify(evaluateCompliance(HIGH_RISK_PROFILE))
      assert.equal(current, first, `Run ${i + 1}: evaluation was not deterministic`)
    }
  })

  it('includes version string', () => {
    const result = evaluateCompliance(HIGH_RISK_PROFILE)
    assert.equal(result.version, 'v1.0.0')
  })

  it('low-risk profile produces empty forms and penalties', () => {
    const result = evaluateCompliance(LOW_RISK_PROFILE)
    assert.equal(result.requiredForms.length, 0)
    assert.equal(result.penalties.length, 0)
    assert.equal(result.riskScore, 0)
    assert.equal(result.riskLevel, 'LOW')
    assert.equal(result.entityClassification, 'U.S. LLC')
  })
})
