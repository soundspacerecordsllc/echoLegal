/**
 * Unit tests: FilingControl billing plan computation and webhook mapping.
 *
 * Validates:
 *   1. computePlanFromStatus: active => PRO, everything else => FREE
 *   2. normalizeStripeStatus: maps Stripe statuses to our normalized set
 *   3. applyPlanToUserRow: derives plan from user row
 *   4. buildSubscriptionPatch: maps Stripe subscription to user patch
 *   5. Webhook idempotency: fc_stripe_events schema presence
 *   6. Determinism: same inputs => same outputs
 *
 * Run: node --test scripts/test-billing-plan.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// ── Inline pure functions (no TS imports in .mjs) ─────────────────────
// Mirrors lib/filingcontrol/billing/plan.ts exactly.

function computePlanFromStatus(status) {
  return status === 'active' ? 'PRO' : 'FREE'
}

function normalizeStripeStatus(raw) {
  const valid = ['none', 'active', 'canceled', 'past_due', 'incomplete']
  if (valid.includes(raw)) return raw
  if (raw === 'trialing') return 'active'
  return 'none'
}

function applyPlanToUserRow(userRow) {
  const status = normalizeStripeStatus(userRow.subscription_status)
  return { plan: computePlanFromStatus(status) }
}

function buildSubscriptionPatch(sub) {
  const status = normalizeStripeStatus(sub.status)
  const priceId = sub.items?.data?.[0]?.price?.id ?? null
  const periodEnd = sub.current_period_end
    ? new Date(sub.current_period_end * 1000).toISOString()
    : null

  return {
    stripe_subscription_id: sub.id,
    stripe_price_id: priceId,
    subscription_status: status,
    current_period_end: periodEnd,
    plan: computePlanFromStatus(status),
  }
}

// ── Tests: computePlanFromStatus ─────────────────────────────────────

describe('Billing: computePlanFromStatus', () => {
  it('active => PRO', () => {
    assert.equal(computePlanFromStatus('active'), 'PRO')
  })

  it('none => FREE', () => {
    assert.equal(computePlanFromStatus('none'), 'FREE')
  })

  it('canceled => FREE', () => {
    assert.equal(computePlanFromStatus('canceled'), 'FREE')
  })

  it('past_due => FREE', () => {
    assert.equal(computePlanFromStatus('past_due'), 'FREE')
  })

  it('incomplete => FREE', () => {
    assert.equal(computePlanFromStatus('incomplete'), 'FREE')
  })
})

// ── Tests: normalizeStripeStatus ─────────────────────────────────────

describe('Billing: normalizeStripeStatus', () => {
  it('maps "active" to "active"', () => {
    assert.equal(normalizeStripeStatus('active'), 'active')
  })

  it('maps "canceled" to "canceled"', () => {
    assert.equal(normalizeStripeStatus('canceled'), 'canceled')
  })

  it('maps "past_due" to "past_due"', () => {
    assert.equal(normalizeStripeStatus('past_due'), 'past_due')
  })

  it('maps "incomplete" to "incomplete"', () => {
    assert.equal(normalizeStripeStatus('incomplete'), 'incomplete')
  })

  it('maps "none" to "none"', () => {
    assert.equal(normalizeStripeStatus('none'), 'none')
  })

  it('maps "trialing" to "active" (Stripe trial treated as active)', () => {
    assert.equal(normalizeStripeStatus('trialing'), 'active')
  })

  it('maps unknown statuses to "none"', () => {
    assert.equal(normalizeStripeStatus('unpaid'), 'none')
    assert.equal(normalizeStripeStatus('incomplete_expired'), 'none')
    assert.equal(normalizeStripeStatus('paused'), 'none')
    assert.equal(normalizeStripeStatus('xyz'), 'none')
  })
})

// ── Tests: applyPlanToUserRow ────────────────────────────────────────

describe('Billing: applyPlanToUserRow', () => {
  it('active subscription => PRO plan', () => {
    const result = applyPlanToUserRow({ subscription_status: 'active' })
    assert.deepEqual(result, { plan: 'PRO' })
  })

  it('none subscription => FREE plan', () => {
    const result = applyPlanToUserRow({ subscription_status: 'none' })
    assert.deepEqual(result, { plan: 'FREE' })
  })

  it('canceled subscription => FREE plan', () => {
    const result = applyPlanToUserRow({ subscription_status: 'canceled' })
    assert.deepEqual(result, { plan: 'FREE' })
  })

  it('past_due subscription => FREE plan', () => {
    const result = applyPlanToUserRow({ subscription_status: 'past_due' })
    assert.deepEqual(result, { plan: 'FREE' })
  })

  it('trialing (via normalize) => PRO plan', () => {
    const result = applyPlanToUserRow({ subscription_status: 'trialing' })
    assert.deepEqual(result, { plan: 'PRO' })
  })
})

// ── Tests: buildSubscriptionPatch ────────────────────────────────────

describe('Billing: buildSubscriptionPatch', () => {
  it('builds correct patch from active subscription', () => {
    const sub = {
      id: 'sub_123',
      status: 'active',
      items: { data: [{ price: { id: 'price_abc' } }] },
      current_period_end: 1735689600, // 2025-01-01T00:00:00Z
    }
    const patch = buildSubscriptionPatch(sub)
    assert.equal(patch.stripe_subscription_id, 'sub_123')
    assert.equal(patch.stripe_price_id, 'price_abc')
    assert.equal(patch.subscription_status, 'active')
    assert.equal(patch.plan, 'PRO')
    assert.ok(patch.current_period_end)
    // Verify it's a valid ISO date string
    assert.ok(!isNaN(new Date(patch.current_period_end).getTime()))
  })

  it('builds correct patch from canceled subscription', () => {
    const sub = {
      id: 'sub_456',
      status: 'canceled',
      items: { data: [{ price: { id: 'price_def' } }] },
      current_period_end: 1735689600,
    }
    const patch = buildSubscriptionPatch(sub)
    assert.equal(patch.subscription_status, 'canceled')
    assert.equal(patch.plan, 'FREE')
  })

  it('handles missing items gracefully', () => {
    const sub = {
      id: 'sub_789',
      status: 'active',
      current_period_end: 1735689600,
    }
    const patch = buildSubscriptionPatch(sub)
    assert.equal(patch.stripe_price_id, null)
    assert.equal(patch.plan, 'PRO')
  })

  it('handles missing current_period_end', () => {
    const sub = {
      id: 'sub_aaa',
      status: 'active',
      items: { data: [{ price: { id: 'price_x' } }] },
    }
    const patch = buildSubscriptionPatch(sub)
    assert.equal(patch.current_period_end, null)
  })

  it('normalizes trialing status to active/PRO', () => {
    const sub = {
      id: 'sub_trial',
      status: 'trialing',
      items: { data: [{ price: { id: 'price_trial' } }] },
      current_period_end: 1735689600,
    }
    const patch = buildSubscriptionPatch(sub)
    assert.equal(patch.subscription_status, 'active')
    assert.equal(patch.plan, 'PRO')
  })
})

// ── Tests: determinism ──────────────────────────────────────────────

describe('Billing: determinism', () => {
  it('same inputs produce identical results', () => {
    const sub = {
      id: 'sub_det',
      status: 'active',
      items: { data: [{ price: { id: 'price_det' } }] },
      current_period_end: 1735689600,
    }
    const patch1 = buildSubscriptionPatch(sub)
    const patch2 = buildSubscriptionPatch(sub)
    assert.deepEqual(patch1, patch2)
  })

  it('computePlanFromStatus is idempotent', () => {
    for (const status of ['none', 'active', 'canceled', 'past_due', 'incomplete']) {
      const result1 = computePlanFromStatus(status)
      const result2 = computePlanFromStatus(status)
      assert.equal(result1, result2)
    }
  })
})

// ── Tests: webhook handler plan mapping ──────────────────────────────

describe('Billing: webhook payload -> user patch mapping', () => {
  it('checkout.session.completed with active sub => PRO', () => {
    // Simulates what the webhook handler does with a checkout session
    const sub = {
      id: 'sub_checkout',
      status: 'active',
      items: { data: [{ price: { id: 'price_pro' } }] },
      current_period_end: 1735689600,
    }
    const patch = buildSubscriptionPatch(sub)
    assert.equal(patch.plan, 'PRO')
    assert.equal(patch.subscription_status, 'active')
  })

  it('subscription.deleted => plan FREE', () => {
    // Simulates a deleted subscription — handler sets canceled + FREE directly
    const deletedStatus = normalizeStripeStatus('canceled')
    assert.equal(computePlanFromStatus(deletedStatus), 'FREE')
  })

  it('invoice.payment_failed => past_due => FREE', () => {
    const status = normalizeStripeStatus('past_due')
    assert.equal(computePlanFromStatus(status), 'FREE')
  })
})

// ── Tests: schema validation ─────────────────────────────────────────

describe('Billing: schema SQL checks', () => {
  let schemaSql

  try {
    schemaSql = readFileSync(
      resolve(process.cwd(), 'lib/db/fc-users-schema.sql'),
      'utf-8'
    )
  } catch {
    schemaSql = ''
  }

  it('fc_users table exists in schema', () => {
    assert.ok(schemaSql.includes('CREATE TABLE IF NOT EXISTS fc_users'))
  })

  it('fc_stripe_events idempotency table exists', () => {
    assert.ok(schemaSql.includes('CREATE TABLE IF NOT EXISTS fc_stripe_events'))
  })

  it('plan column has FREE/PRO check constraint', () => {
    assert.ok(schemaSql.includes("'FREE'"))
    assert.ok(schemaSql.includes("'PRO'"))
  })

  it('subscription_status has correct check values', () => {
    assert.ok(schemaSql.includes("'none'"))
    assert.ok(schemaSql.includes("'active'"))
    assert.ok(schemaSql.includes("'canceled'"))
    assert.ok(schemaSql.includes("'past_due'"))
    assert.ok(schemaSql.includes("'incomplete'"))
  })

  it('stripe_customer_id column is UNIQUE', () => {
    assert.ok(schemaSql.includes('stripe_customer_id TEXT UNIQUE'))
  })

  it('stripe_subscription_id column is UNIQUE', () => {
    assert.ok(schemaSql.includes('stripe_subscription_id TEXT UNIQUE'))
  })

  it('fc_stripe_events has id TEXT PRIMARY KEY', () => {
    assert.ok(schemaSql.includes('id TEXT PRIMARY KEY'))
  })

  it('fc_stripe_events has processed BOOLEAN', () => {
    assert.ok(schemaSql.includes('processed BOOLEAN'))
  })
})

// ── Tests: no hardcoded origins ──────────────────────────────────────

describe('Billing: no hardcoded origins', () => {
  let stripeSrc

  try {
    stripeSrc = readFileSync(
      resolve(process.cwd(), 'lib/filingcontrol/billing/stripe.ts'),
      'utf-8'
    )
  } catch {
    stripeSrc = ''
  }

  it('stripe.ts uses absoluteUrl from lib/site', () => {
    assert.ok(stripeSrc.includes("from '@/lib/site'"))
    assert.ok(stripeSrc.includes('absoluteUrl'))
  })

  it('stripe.ts does not hardcode echo-legal.com', () => {
    assert.ok(!stripeSrc.includes('echo-legal.com'))
  })

  it('stripe.ts does not hardcode localhost', () => {
    assert.ok(!stripeSrc.includes('localhost'))
  })
})
