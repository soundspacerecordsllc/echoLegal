// lib/control-panel/__tests__/compliance-rules.test.ts
// Deterministic test harness for the compliance rules engine.
// Pins Date to 2026-02-24 so all recurring-item due dates are stable.
// Run: npx tsx --test lib/control-panel/__tests__/compliance-rules.test.ts

import { describe, it, mock, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { generateComplianceItems, COMPLIANCE_ITEMS } from '../compliance-rules'
import type { LLCProfile } from '../types'

// ─── Fixed clock ────────────────────────────────────────────────────
// Pin "now" so every recurring-item calculation is reproducible.
const FIXED_NOW = new Date('2026-02-24T12:00:00Z')

// ─── Test profile factory ───────────────────────────────────────────
function makeProfile(overrides: Partial<LLCProfile> = {}): LLCProfile {
  return {
    id: 'test-id',
    user_id: 'test-user',
    company_name: 'Test LLC',
    state_of_formation: 'FL',
    formation_date: '2024-01-15',
    ein_status: 'not_applied',
    tax_classification: 'disregarded_entity',
    foreign_owner: true,
    fiscal_year_end_month: 12,
    has_us_bank_account: false,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    ...overrides,
  }
}

// ─── Helpers ────────────────────────────────────────────────────────
function findByKey(items: ReturnType<typeof generateComplianceItems>, key: string) {
  return items.find(i => i.compliance_item.key === key)
}

function keysOf(items: ReturnType<typeof generateComplianceItems>): string[] {
  return items.map(i => i.compliance_item.key)
}

// ─── Scenario 1: Florida ────────────────────────────────────────────

describe('Scenario 1 — FL LLC, formed Jan 15, 2024', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'], now: FIXED_NOW.getTime() })
  })
  afterEach(() => {
    mock.timers.reset()
  })

  const profile = makeProfile({
    state_of_formation: 'FL',
    formation_date: '2024-01-15',
    ein_status: 'not_applied',
    fiscal_year_end_month: 12,
  })

  it('generates exactly 7 items (no franchise tax for FL)', () => {
    const items = generateComplianceItems(profile)
    assert.equal(items.length, 7, `Expected 7 items, got ${items.length}: ${keysOf(items).join(', ')}`)
  })

  it('includes BOI report due 2024-04-14 (formation + 90d)', () => {
    const items = generateComplianceItems(profile)
    const boi = findByKey(items, 'fincen_boi')
    assert.ok(boi, 'BOI item must exist')
    assert.equal(boi.due_date, '2024-04-14')
  })

  it('FL annual report due 2026-05-01', () => {
    const items = generateComplianceItems(profile)
    const ar = findByKey(items, 'state_annual_report')
    assert.ok(ar, 'Annual report must exist')
    assert.equal(ar.due_date, '2026-05-01')
    assert.equal(ar.compliance_item.jurisdiction, 'FL')
  })

  it('Form 5472 present, due 2027-04-15 (FY2026 ending Dec 31 + 105d)', () => {
    const items = generateComplianceItems(profile)
    const f5472 = findByKey(items, 'irs_form_5472')
    assert.ok(f5472, 'Form 5472 must exist')
    assert.equal(f5472.due_date, '2027-04-15')
  })

  it('EIN application due 2024-02-14 (formation + 30d)', () => {
    const items = generateComplianceItems(profile)
    const ein = findByKey(items, 'irs_ein_application')
    assert.ok(ein, 'EIN item must exist')
    assert.equal(ein.due_date, '2024-02-14')
  })

  it('does NOT include franchise tax', () => {
    const items = generateComplianceItems(profile)
    const ft = findByKey(items, 'state_franchise_tax')
    assert.equal(ft, undefined, 'FL must not have franchise tax')
  })

  it('skips EIN if already received', () => {
    const received = makeProfile({
      state_of_formation: 'FL',
      formation_date: '2024-01-15',
      ein_status: 'received',
    })
    const items = generateComplianceItems(received)
    const ein = findByKey(items, 'irs_ein_application')
    assert.equal(ein, undefined, 'EIN must be excluded when status is received')
    assert.equal(items.length, 6)
  })

  it('items are sorted by due_date ascending', () => {
    const items = generateComplianceItems(profile)
    for (let i = 1; i < items.length; i++) {
      assert.ok(
        items[i].due_date >= items[i - 1].due_date,
        `Sort violation at index ${i}: ${items[i - 1].due_date} > ${items[i].due_date}`
      )
    }
  })
})

// ─── Scenario 2: Wyoming ────────────────────────────────────────────

describe('Scenario 2 — WY LLC, formed Nov 20, 2024', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'], now: FIXED_NOW.getTime() })
  })
  afterEach(() => {
    mock.timers.reset()
  })

  const profile = makeProfile({
    state_of_formation: 'WY',
    formation_date: '2024-11-20',
    fiscal_year_end_month: 12,
  })

  it('generates exactly 7 items (no franchise tax for WY)', () => {
    const items = generateComplianceItems(profile)
    assert.equal(items.length, 7, `Expected 7, got ${items.length}: ${keysOf(items).join(', ')}`)
  })

  it('WY annual report uses formation anniversary month (Nov 1)', () => {
    const items = generateComplianceItems(profile)
    const ar = findByKey(items, 'state_annual_report')
    assert.ok(ar, 'Annual report must exist')
    // WY override: month=undefined → falls back to formation month (Nov=11), day=1
    assert.equal(ar.due_date, '2026-11-01')
    assert.equal(ar.compliance_item.jurisdiction, 'WY')
  })

  it('includes BOI report due 2025-02-18 (formation + 90d)', () => {
    const items = generateComplianceItems(profile)
    const boi = findByKey(items, 'fincen_boi')
    assert.ok(boi, 'BOI item must exist')
    assert.equal(boi.due_date, '2025-02-18')
  })

  it('EIN due 2024-12-20 (formation + 30d)', () => {
    const items = generateComplianceItems(profile)
    const ein = findByKey(items, 'irs_ein_application')
    assert.ok(ein)
    assert.equal(ein.due_date, '2024-12-20')
  })

  it('items are sorted by due_date ascending', () => {
    const items = generateComplianceItems(profile)
    for (let i = 1; i < items.length; i++) {
      assert.ok(items[i].due_date >= items[i - 1].due_date)
    }
  })
})

// ─── Scenario 3: Delaware ───────────────────────────────────────────

describe('Scenario 3 — DE LLC, formed Dec 30, 2024', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'], now: FIXED_NOW.getTime() })
  })
  afterEach(() => {
    mock.timers.reset()
  })

  const profile = makeProfile({
    state_of_formation: 'DE',
    formation_date: '2024-12-30',
    fiscal_year_end_month: 12,
  })

  it('generates exactly 8 items (DE has franchise tax)', () => {
    const items = generateComplianceItems(profile)
    assert.equal(items.length, 8, `Expected 8, got ${items.length}: ${keysOf(items).join(', ')}`)
  })

  it('includes franchise tax due 2026-06-01', () => {
    const items = generateComplianceItems(profile)
    const ft = findByKey(items, 'state_franchise_tax')
    assert.ok(ft, 'Franchise tax must exist for DE')
    assert.equal(ft.due_date, '2026-06-01')
    assert.equal(ft.compliance_item.jurisdiction, 'DE')
  })

  it('DE annual report due 2026-06-01', () => {
    const items = generateComplianceItems(profile)
    const ar = findByKey(items, 'state_annual_report')
    assert.ok(ar)
    assert.equal(ar.due_date, '2026-06-01')
  })

  it('BOI due 2025-03-30 (formation + 90d)', () => {
    const items = generateComplianceItems(profile)
    const boi = findByKey(items, 'fincen_boi')
    assert.ok(boi)
    assert.equal(boi.due_date, '2025-03-30')
  })

  it('EIN due 2025-01-29 (formation + 30d)', () => {
    const items = generateComplianceItems(profile)
    const ein = findByKey(items, 'irs_ein_application')
    assert.ok(ein)
    assert.equal(ein.due_date, '2025-01-29')
  })
})

// ─── Scenario 4: Idempotency ────────────────────────────────────────

describe('Scenario 4 — Idempotent generation', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'], now: FIXED_NOW.getTime() })
  })
  afterEach(() => {
    mock.timers.reset()
  })

  it('two calls produce identical results', () => {
    const profile = makeProfile({
      state_of_formation: 'TX',
      formation_date: '2024-06-01',
    })
    const first = generateComplianceItems(profile)
    const second = generateComplianceItems(profile)

    assert.equal(first.length, second.length, 'Item counts must match')
    for (let i = 0; i < first.length; i++) {
      assert.equal(first[i].compliance_item.key, second[i].compliance_item.key,
        `Key mismatch at index ${i}`)
      assert.equal(first[i].due_date, second[i].due_date,
        `Due date mismatch at index ${i}: ${first[i].compliance_item.key}`)
    }
  })

  it('no duplicate keys within a single run', () => {
    const profile = makeProfile({ state_of_formation: 'DE', formation_date: '2024-03-01' })
    const items = generateComplianceItems(profile)
    const keys = keysOf(items)
    const unique = new Set(keys)
    assert.equal(keys.length, unique.size, `Duplicate keys found: ${keys.join(', ')}`)
  })
})

// ─── NM special case (no annual report) ─────────────────────────────

describe('NM — no annual report required', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'], now: FIXED_NOW.getTime() })
  })
  afterEach(() => {
    mock.timers.reset()
  })

  it('NM does not include state_annual_report', () => {
    const profile = makeProfile({
      state_of_formation: 'NM',
      formation_date: '2024-07-01',
    })
    const items = generateComplianceItems(profile)
    const ar = findByKey(items, 'state_annual_report')
    assert.equal(ar, undefined, 'NM must not have an annual report')
  })

  it('NM does not include franchise tax', () => {
    const profile = makeProfile({
      state_of_formation: 'NM',
      formation_date: '2024-07-01',
    })
    const items = generateComplianceItems(profile)
    const ft = findByKey(items, 'state_franchise_tax')
    assert.equal(ft, undefined, 'NM must not have franchise tax')
    assert.equal(items.length, 6, 'NM should have 6 items (federal only + registered agent)')
  })
})

// ─── TX special case (has franchise tax) ────────────────────────────

describe('TX — franchise tax included', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'], now: FIXED_NOW.getTime() })
  })
  afterEach(() => {
    mock.timers.reset()
  })

  it('TX includes franchise tax due May 15', () => {
    const profile = makeProfile({
      state_of_formation: 'TX',
      formation_date: '2024-03-01',
    })
    const items = generateComplianceItems(profile)
    const ft = findByKey(items, 'state_franchise_tax')
    assert.ok(ft, 'TX must have franchise tax')
    assert.equal(ft.due_date, '2026-05-15')
  })

  it('TX annual report due May 15', () => {
    const profile = makeProfile({
      state_of_formation: 'TX',
      formation_date: '2024-03-01',
    })
    const items = generateComplianceItems(profile)
    const ar = findByKey(items, 'state_annual_report')
    assert.ok(ar)
    assert.equal(ar.due_date, '2026-05-15')
  })

  it('TX generates 8 items total', () => {
    const profile = makeProfile({
      state_of_formation: 'TX',
      formation_date: '2024-03-01',
    })
    const items = generateComplianceItems(profile)
    assert.equal(items.length, 8)
  })
})

// ─── Console summary ────────────────────────────────────────────────

describe('Console summary', () => {
  beforeEach(() => {
    mock.timers.enable({ apis: ['Date'], now: FIXED_NOW.getTime() })
  })
  afterEach(() => {
    mock.timers.reset()
  })

  it('prints summary for all five supported states', () => {
    const states = ['FL', 'WY', 'DE', 'NM', 'TX'] as const

    console.log('\n╔══════════════════════════════════════════════════════════════╗')
    console.log('║         COMPLIANCE RULES ENGINE — TEST SUMMARY             ║')
    console.log('║         Pinned date: 2026-02-24T12:00:00Z                  ║')
    console.log('╠══════════════════════════════════════════════════════════════╣')

    for (const state of states) {
      const profile = makeProfile({
        state_of_formation: state,
        formation_date: '2024-06-15',
      })
      const items = generateComplianceItems(profile)

      console.log(`║  ${state}: ${items.length} items`)
      for (const item of items) {
        const pad = item.compliance_item.title.substring(0, 42).padEnd(42)
        console.log(`║    ${item.due_date}  ${pad}  [${item.compliance_item.jurisdiction}]`)
      }
      console.log('║')
    }

    console.log('╚══════════════════════════════════════════════════════════════╝')
    assert.ok(true)
  })
})
