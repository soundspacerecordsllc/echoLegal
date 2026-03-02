#!/usr/bin/env node
// scripts/test-entity-limit.mjs
// Tests for entity-limit gating logic.
// Run: node scripts/test-entity-limit.mjs

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

// ─── Inline pure functions from lib/filingcontrol/entity-limit.ts ────

const FREE_ENTITY_LIMIT = 1

function isProUser(userRow) {
  return userRow?.plan === 'PRO'
}

function canCreateEntity(plan, currentEntityCount) {
  if (plan === 'PRO') {
    return { allowed: true }
  }
  if (currentEntityCount >= FREE_ENTITY_LIMIT) {
    return {
      allowed: false,
      reason: 'PLAN_LIMIT',
      limit: FREE_ENTITY_LIMIT,
    }
  }
  return { allowed: true }
}

// ─── isProUser ───────────────────────────────────────────────────────

describe('isProUser', () => {
  it('returns true for PRO plan', () => {
    assert.equal(isProUser({ plan: 'PRO' }), true)
  })

  it('returns false for FREE plan', () => {
    assert.equal(isProUser({ plan: 'FREE' }), false)
  })

  it('returns false for null', () => {
    assert.equal(isProUser(null), false)
  })

  it('returns false for undefined', () => {
    assert.equal(isProUser(undefined), false)
  })

  it('returns false for empty object', () => {
    assert.equal(isProUser({}), false)
  })

  it('returns false for unknown plan string', () => {
    assert.equal(isProUser({ plan: 'ENTERPRISE' }), false)
  })

  it('is case-sensitive (lowercase pro is false)', () => {
    assert.equal(isProUser({ plan: 'pro' }), false)
  })
})

// ─── canCreateEntity ─────────────────────────────────────────────────

describe('canCreateEntity', () => {
  // ── FREE plan scenarios ──
  describe('FREE plan', () => {
    it('allows creation when user has 0 entities', () => {
      const result = canCreateEntity('FREE', 0)
      assert.equal(result.allowed, true)
    })

    it('blocks creation when user has 1 entity (at limit)', () => {
      const result = canCreateEntity('FREE', 1)
      assert.equal(result.allowed, false)
      assert.equal(result.reason, 'PLAN_LIMIT')
      assert.equal(result.limit, 1)
    })

    it('blocks creation when user has 2 entities (over limit)', () => {
      const result = canCreateEntity('FREE', 2)
      assert.equal(result.allowed, false)
      assert.equal(result.reason, 'PLAN_LIMIT')
      assert.equal(result.limit, 1)
    })

    it('blocks creation when user has 10 entities', () => {
      const result = canCreateEntity('FREE', 10)
      assert.equal(result.allowed, false)
    })
  })

  // ── PRO plan scenarios ──
  describe('PRO plan', () => {
    it('allows creation when user has 0 entities', () => {
      const result = canCreateEntity('PRO', 0)
      assert.equal(result.allowed, true)
    })

    it('allows creation when user has 1 entity', () => {
      const result = canCreateEntity('PRO', 1)
      assert.equal(result.allowed, true)
    })

    it('allows creation when user has 5 entities', () => {
      const result = canCreateEntity('PRO', 5)
      assert.equal(result.allowed, true)
    })

    it('allows creation when user has 100 entities', () => {
      const result = canCreateEntity('PRO', 100)
      assert.equal(result.allowed, true)
    })
  })

  // ── Edge cases ──
  describe('edge cases', () => {
    it('FREE with exactly FREE_ENTITY_LIMIT is blocked', () => {
      const result = canCreateEntity('FREE', FREE_ENTITY_LIMIT)
      assert.equal(result.allowed, false)
    })

    it('FREE with FREE_ENTITY_LIMIT - 1 is allowed', () => {
      const result = canCreateEntity('FREE', FREE_ENTITY_LIMIT - 1)
      assert.equal(result.allowed, true)
    })

    it('returns correct limit value in blocked result', () => {
      const result = canCreateEntity('FREE', 1)
      assert.equal(result.allowed, false)
      assert.equal(result.limit, FREE_ENTITY_LIMIT)
    })
  })
})

// ─── FREE_ENTITY_LIMIT constant ─────────────────────────────────────

describe('FREE_ENTITY_LIMIT', () => {
  it('is 1', () => {
    assert.equal(FREE_ENTITY_LIMIT, 1)
  })

  it('is a positive integer', () => {
    assert.equal(typeof FREE_ENTITY_LIMIT, 'number')
    assert.ok(FREE_ENTITY_LIMIT > 0)
    assert.equal(FREE_ENTITY_LIMIT, Math.floor(FREE_ENTITY_LIMIT))
  })
})

// ─── API response shape tests ────────────────────────────────────────

describe('402 response shape', () => {
  it('blocked result has required fields for API response', () => {
    const result = canCreateEntity('FREE', 1)
    assert.equal(result.allowed, false)
    // These fields are used in the 402 JSON response:
    assert.ok('reason' in result)
    assert.ok('limit' in result)
    assert.equal(result.reason, 'PLAN_LIMIT')
    assert.equal(typeof result.limit, 'number')
  })

  it('allowed result has no extra fields', () => {
    const result = canCreateEntity('FREE', 0)
    assert.deepEqual(result, { allowed: true })
  })

  it('PRO allowed result has no extra fields', () => {
    const result = canCreateEntity('PRO', 0)
    assert.deepEqual(result, { allowed: true })
  })
})

// ─── Integration-style: full flow simulation ─────────────────────────

describe('entity creation flow simulation', () => {
  it('FREE user: first entity succeeds, second is blocked', () => {
    // First entity
    const first = canCreateEntity('FREE', 0)
    assert.equal(first.allowed, true)

    // Second entity (count is now 1)
    const second = canCreateEntity('FREE', 1)
    assert.equal(second.allowed, false)
    assert.equal(second.reason, 'PLAN_LIMIT')
  })

  it('PRO user: can create many entities', () => {
    for (let i = 0; i < 20; i++) {
      const result = canCreateEntity('PRO', i)
      assert.equal(result.allowed, true, `PRO should be allowed at count ${i}`)
    }
  })

  it('user upgrades from FREE to PRO: second entity now allowed', () => {
    // Blocked as FREE
    const blocked = canCreateEntity('FREE', 1)
    assert.equal(blocked.allowed, false)

    // Same count but now PRO
    const allowed = canCreateEntity('PRO', 1)
    assert.equal(allowed.allowed, true)
  })

  it('user downgrades from PRO to FREE with 3 entities: no new entity', () => {
    // Existing entities remain (no deletion), but cannot create more
    const result = canCreateEntity('FREE', 3)
    assert.equal(result.allowed, false)
    assert.equal(result.reason, 'PLAN_LIMIT')
  })

  it('fc_users row missing (null): isProUser returns false', () => {
    // When no fc_users row, user defaults to FREE
    assert.equal(isProUser(null), false)
    // And with 1 entity, they are blocked
    const result = canCreateEntity('FREE', 1)
    assert.equal(result.allowed, false)
  })
})
