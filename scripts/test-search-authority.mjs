/**
 * Unit test: Deterministic authority + jurisdiction weighted search ordering.
 *
 * Validates that sort comparator always ranks by:
 *   1. authority weight (desc)
 *   2. jurisdiction weight (desc)
 *   3. relevance score (desc)
 *   4. lastUpdated (desc)
 *
 * Run: node --test scripts/test-search-authority.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

// ---- Constants (mirror lib/search-index.ts) ----

const SearchAuthorityLevel = {
  PRIMARY_LAW: 'primary_law',
  REGULATION: 'regulation',
  CASE_LAW: 'case_law',
  OFFICIAL_GUIDANCE: 'official_guidance',
  SECONDARY_ANALYSIS: 'secondary_analysis',
  TEMPLATE: 'template',
}

const SEARCH_AUTHORITY_WEIGHT = {
  [SearchAuthorityLevel.PRIMARY_LAW]: 100,
  [SearchAuthorityLevel.REGULATION]: 80,
  [SearchAuthorityLevel.CASE_LAW]: 70,
  [SearchAuthorityLevel.OFFICIAL_GUIDANCE]: 60,
  [SearchAuthorityLevel.SECONDARY_ANALYSIS]: 40,
  [SearchAuthorityLevel.TEMPLATE]: 20,
}

const JURISDICTION_WEIGHT = {
  US: 50,
  'US-NY': 45,
  'US-DE': 45,
  'US-WY': 45,
  'US-CA': 45,
  'US-TX': 45,
  'US-FL': 45,
  EU: 30,
  TR: 25,
  UK: 20,
  DE: 20,
  FR: 20,
  INTL: 15,
  GENERAL: 10,
  _DEFAULT: 10,
}

function getJurisdictionWeight(code) {
  return JURISDICTION_WEIGHT[code] ?? JURISDICTION_WEIGHT._DEFAULT
}

// ---- Sort comparator (mirrors lib/search-index.ts searchIndex()) ----

function authoritySort(a, b) {
  const authA = SEARCH_AUTHORITY_WEIGHT[a.item.authorityLevel]
  const authB = SEARCH_AUTHORITY_WEIGHT[b.item.authorityLevel]
  if (authA !== authB) return authB - authA
  const jurA = getJurisdictionWeight(a.item.jurisdiction)
  const jurB = getJurisdictionWeight(b.item.jurisdiction)
  if (jurA !== jurB) return jurB - jurA
  if (a.score !== b.score) return b.score - a.score
  return b.item.updatedAt.localeCompare(a.item.updatedAt)
}

// ---- Helpers ----

function makeItem(id, authorityLevel, jurisdiction = 'US', updatedAt = '2025-01-01') {
  return { id, authorityLevel, jurisdiction, updatedAt }
}

function sortItems(scoredItems) {
  return [...scoredItems].sort(authoritySort)
}

function idsOf(sorted) {
  return sorted.map((s) => s.item.id)
}

// ---- Tests: Authority weights ----

describe('SEARCH_AUTHORITY_WEIGHT values', () => {
  it('has correct weight for each authority level', () => {
    assert.equal(SEARCH_AUTHORITY_WEIGHT.primary_law, 100)
    assert.equal(SEARCH_AUTHORITY_WEIGHT.regulation, 80)
    assert.equal(SEARCH_AUTHORITY_WEIGHT.case_law, 70)
    assert.equal(SEARCH_AUTHORITY_WEIGHT.official_guidance, 60)
    assert.equal(SEARCH_AUTHORITY_WEIGHT.secondary_analysis, 40)
    assert.equal(SEARCH_AUTHORITY_WEIGHT.template, 20)
  })

  it('covers all authority levels', () => {
    const levels = Object.values(SearchAuthorityLevel)
    for (const level of levels) {
      assert.ok(
        SEARCH_AUTHORITY_WEIGHT[level] !== undefined,
        `Missing weight for ${level}`
      )
    }
  })
})

// ---- Tests: Jurisdiction weights ----

describe('JURISDICTION_WEIGHT values', () => {
  it('has correct weight hierarchy', () => {
    assert.ok(JURISDICTION_WEIGHT.US > JURISDICTION_WEIGHT['US-NY'])
    assert.ok(JURISDICTION_WEIGHT['US-NY'] > JURISDICTION_WEIGHT.EU)
    assert.ok(JURISDICTION_WEIGHT.EU > JURISDICTION_WEIGHT.TR)
    assert.ok(JURISDICTION_WEIGHT.TR > JURISDICTION_WEIGHT.GENERAL)
  })

  it('US state-level codes all share the same weight', () => {
    const states = ['US-NY', 'US-DE', 'US-WY', 'US-CA', 'US-TX', 'US-FL']
    const weights = new Set(states.map((s) => JURISDICTION_WEIGHT[s]))
    assert.equal(weights.size, 1, 'All US state weights should be equal')
  })

  it('_DEFAULT fallback returns 10', () => {
    assert.equal(getJurisdictionWeight('UNKNOWN_CODE'), 10)
  })
})

// ---- Tests: Authority-first invariant ----

describe('Authority-weighted sort ordering', () => {
  it('higher authority always beats lower authority, regardless of score', () => {
    const items = [
      { item: makeItem('template-high-score', 'template'), score: 999 },
      { item: makeItem('statute-low-score', 'primary_law'), score: 1 },
    ]
    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), ['statute-low-score', 'template-high-score'])
  })

  it('sorts all six authority levels in correct descending order', () => {
    const items = [
      { item: makeItem('tmpl', 'template'), score: 50 },
      { item: makeItem('analysis', 'secondary_analysis'), score: 50 },
      { item: makeItem('guidance', 'official_guidance'), score: 50 },
      { item: makeItem('case', 'case_law'), score: 50 },
      { item: makeItem('reg', 'regulation'), score: 50 },
      { item: makeItem('law', 'primary_law'), score: 50 },
    ]
    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), [
      'law', 'reg', 'case', 'guidance', 'analysis', 'tmpl',
    ])
  })

  it('authority-first invariant: jurisdiction never outranks higher authority', () => {
    // Template with US (highest jurisdiction) vs Regulation with GENERAL (lowest)
    const items = [
      { item: makeItem('tmpl-us', 'template', 'US'), score: 999 },
      { item: makeItem('reg-general', 'regulation', 'GENERAL'), score: 1 },
    ]
    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), ['reg-general', 'tmpl-us'],
      'Regulation must come before Template regardless of jurisdiction or score')
  })

  it('extreme score + jurisdiction variance does not override authority ordering', () => {
    const items = [
      { item: makeItem('tmpl', 'template', 'US'), score: 10000 },
      { item: makeItem('analysis', 'secondary_analysis', 'US'), score: 5000 },
      { item: makeItem('guidance', 'official_guidance', 'GENERAL'), score: 1 },
      { item: makeItem('case', 'case_law', 'GENERAL'), score: 0.1 },
      { item: makeItem('reg', 'regulation', 'GENERAL'), score: 0.01 },
      { item: makeItem('law', 'primary_law', 'GENERAL'), score: 0.001 },
    ]
    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), [
      'law', 'reg', 'case', 'guidance', 'analysis', 'tmpl',
    ])
  })
})

// ---- Tests: Jurisdiction secondary sort ----

describe('Jurisdiction-aware secondary sorting', () => {
  it('within same authority, higher jurisdiction weight wins', () => {
    const items = [
      { item: makeItem('reg-general', 'regulation', 'GENERAL'), score: 50 },
      { item: makeItem('reg-us', 'regulation', 'US'), score: 50 },
      { item: makeItem('reg-tr', 'regulation', 'TR'), score: 50 },
      { item: makeItem('reg-eu', 'regulation', 'EU'), score: 50 },
    ]
    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), [
      'reg-us',      // 50
      'reg-eu',      // 30
      'reg-tr',      // 25
      'reg-general', // 10
    ])
  })

  it('US Federal outranks US state-level within same authority', () => {
    const items = [
      { item: makeItem('ny', 'regulation', 'US-NY', '2025-01-02'), score: 50 },
      { item: makeItem('fed', 'regulation', 'US'), score: 50 },
      { item: makeItem('fl', 'regulation', 'US-FL', '2025-01-01'), score: 50 },
    ]
    const sorted = sortItems(items)
    // Fed (50) > NY/FL (45); NY and FL same jur weight, same score, differ by updatedAt
    assert.deepEqual(idsOf(sorted), ['fed', 'ny', 'fl'])
  })

  it('jurisdiction weight breaks tie, then score breaks further tie', () => {
    const items = [
      { item: makeItem('a', 'official_guidance', 'TR'), score: 80 },
      { item: makeItem('b', 'official_guidance', 'US'), score: 20 },
      { item: makeItem('c', 'official_guidance', 'US'), score: 60 },
    ]
    const sorted = sortItems(items)
    // b and c both US (jur 50), a is TR (jur 25)
    // US items first, then within US: c (60) > b (20), then TR: a
    assert.deepEqual(idsOf(sorted), ['c', 'b', 'a'])
  })

  it('within same authority, jurisdiction, and score, newer lastUpdated wins', () => {
    const items = [
      { item: makeItem('old', 'case_law', 'US', '2024-01-01'), score: 10 },
      { item: makeItem('new', 'case_law', 'US', '2025-06-15'), score: 10 },
      { item: makeItem('mid', 'case_law', 'US', '2024-09-01'), score: 10 },
    ]
    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), ['new', 'mid', 'old'])
  })
})

// ---- Tests: Determinism ----

describe('Deterministic ordering', () => {
  it('produces deterministic order on repeated shuffled runs', () => {
    const items = [
      { item: makeItem('tmpl-us', 'template', 'US'), score: 80 },
      { item: makeItem('law-gen', 'primary_law', 'GENERAL'), score: 10 },
      { item: makeItem('reg-eu', 'regulation', 'EU'), score: 50 },
      { item: makeItem('case-tr', 'case_law', 'TR'), score: 90 },
      { item: makeItem('guid-us', 'official_guidance', 'US'), score: 30 },
      { item: makeItem('anal-ny', 'secondary_analysis', 'US-NY'), score: 60 },
    ]

    const expected = ['law-gen', 'reg-eu', 'case-tr', 'guid-us', 'anal-ny', 'tmpl-us']

    for (let i = 0; i < 10; i++) {
      const shuffled = [...items].sort(() => Math.random() - 0.5)
      const sorted = sortItems(shuffled)
      assert.deepEqual(
        idsOf(sorted),
        expected,
        `Run ${i + 1}: order was not deterministic`
      )
    }
  })

  it('full 4-layer sort is deterministic across mixed data', () => {
    const items = [
      { item: makeItem('a', 'regulation', 'US', '2025-01-02'), score: 50 },
      { item: makeItem('b', 'regulation', 'TR', '2025-01-01'), score: 80 },
      { item: makeItem('c', 'regulation', 'US', '2025-01-01'), score: 50 },
      { item: makeItem('d', 'primary_law', 'GENERAL', '2025-01-01'), score: 10 },
      { item: makeItem('e', 'template', 'US', '2025-01-01'), score: 100 },
    ]

    // d: auth=100 (first)
    // a,b,c: auth=80
    //   a: jur=50 score=50 updatedAt=01-02, c: jur=50 score=50 updatedAt=01-01 → a before c
    //   b: jur=25 score=80
    //   US (a,c) before TR (b)
    // e: auth=20 (last)
    const expected = ['d', 'a', 'c', 'b', 'e']
    for (let i = 0; i < 10; i++) {
      const shuffled = [...items].sort(() => Math.random() - 0.5)
      assert.deepEqual(idsOf(sortItems(shuffled)), expected,
        `Run ${i + 1}: not deterministic`)
    }
  })
})
