/**
 * Unit test: Deterministic authority-weighted search ordering.
 *
 * Validates that SEARCH_AUTHORITY_WEIGHT values are correct and that
 * the sort comparator always ranks by authority weight (desc), then
 * relevance score (desc), then lastUpdated (desc) — regardless of
 * search score variance.
 *
 * Run: node scripts/test-search-authority.mjs
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

// ---- Sort comparator (mirrors lib/search-index.ts searchIndex()) ----

function authoritySort(a, b) {
  const weightA = SEARCH_AUTHORITY_WEIGHT[a.item.authorityLevel]
  const weightB = SEARCH_AUTHORITY_WEIGHT[b.item.authorityLevel]
  if (weightA !== weightB) return weightB - weightA
  if (a.score !== b.score) return b.score - a.score
  return b.item.updatedAt.localeCompare(a.item.updatedAt)
}

// ---- Helpers ----

function makeItem(id, authorityLevel, updatedAt = '2025-01-01') {
  return { id, authorityLevel, updatedAt }
}

function sortItems(scoredItems) {
  return [...scoredItems].sort(authoritySort)
}

function idsOf(sorted) {
  return sorted.map((s) => s.item.id)
}

// ---- Tests ----

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
    // All items have the same relevance score
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
      'law',       // 100
      'reg',       // 80
      'case',      // 70
      'guidance',  // 60
      'analysis',  // 40
      'tmpl',      // 20
    ])
  })

  it('within same authority level, higher relevance score wins', () => {
    const items = [
      { item: makeItem('reg-low', 'regulation'), score: 5 },
      { item: makeItem('reg-high', 'regulation'), score: 50 },
      { item: makeItem('reg-mid', 'regulation'), score: 25 },
    ]

    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), ['reg-high', 'reg-mid', 'reg-low'])
  })

  it('within same authority and score, newer lastUpdated wins', () => {
    const items = [
      { item: makeItem('old', 'case_law', '2024-01-01'), score: 10 },
      { item: makeItem('new', 'case_law', '2025-06-15'), score: 10 },
      { item: makeItem('mid', 'case_law', '2024-09-01'), score: 10 },
    ]

    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), ['new', 'mid', 'old'])
  })

  it('produces deterministic order on repeated runs', () => {
    const items = [
      { item: makeItem('tmpl', 'template'), score: 80 },
      { item: makeItem('law', 'primary_law'), score: 10 },
      { item: makeItem('reg', 'regulation'), score: 50 },
      { item: makeItem('case', 'case_law'), score: 90 },
      { item: makeItem('guidance', 'official_guidance'), score: 30 },
      { item: makeItem('analysis', 'secondary_analysis'), score: 60 },
    ]

    const expected = ['law', 'reg', 'case', 'guidance', 'analysis', 'tmpl']

    // Run sort 10 times — must produce identical order every time
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

  it('extreme score variance does not override authority ordering', () => {
    const items = [
      { item: makeItem('tmpl', 'template'), score: 10000 },
      { item: makeItem('analysis', 'secondary_analysis'), score: 5000 },
      { item: makeItem('guidance', 'official_guidance'), score: 1 },
      { item: makeItem('case', 'case_law'), score: 0.1 },
      { item: makeItem('reg', 'regulation'), score: 0.01 },
      { item: makeItem('law', 'primary_law'), score: 0.001 },
    ]

    const sorted = sortItems(items)
    assert.deepEqual(idsOf(sorted), [
      'law', 'reg', 'case', 'guidance', 'analysis', 'tmpl',
    ])
  })
})
