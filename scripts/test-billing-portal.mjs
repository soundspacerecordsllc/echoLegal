/**
 * Unit tests: FilingControl Customer Portal session creation.
 *
 * Validates:
 *   1. Email validation (missing, invalid, valid)
 *   2. User lookup outcomes (not found, found without stripe_customer_id, found with)
 *   3. Portal session creation arguments (customer, return_url)
 *   4. return_url uses SITE_ORIGIN via absoluteUrl (no hardcoded domains)
 *   5. Route source correctness checks
 *
 * Run: node --test scripts/test-billing-portal.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// ── Inline the absoluteUrl function (mirrors lib/site.ts) ─────────────

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://echo-legal.com'

function absoluteUrl(pathOrUrl) {
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  const base = SITE_ORIGIN.replace(/\/+$/, '')
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${base}${path}`
}

// ── Simulate the route handler decision logic ─────────────────────────

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Simulates the portal route validation + decision pipeline.
 * Returns { status, body } mirroring the HTTP response.
 *
 * mockDb: Map<email, { id, stripe_customer_id }>
 * mockStripePortalCreate: (args) => { url }
 */
function simulatePortalRequest(body, mockDb, mockStripePortalCreate) {
  // Parse email
  const email = body?.email?.trim?.()?.toLowerCase?.()
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { error: 'Valid email is required' } }
  }

  // Lookup user
  const user = mockDb.get(email)
  if (!user) {
    return { status: 404, body: { error: 'User not found' } }
  }

  // Require stripe_customer_id
  if (!user.stripe_customer_id) {
    return { status: 409, body: { error: 'No Stripe customer on file' } }
  }

  // Create portal session
  const returnUrl = absoluteUrl('/filingcontrol/dashboard')
  const session = mockStripePortalCreate({
    customer: user.stripe_customer_id,
    return_url: returnUrl,
  })

  return { status: 200, body: { url: session.url } }
}

// ── Test helpers ──────────────────────────────────────────────────────

function makeDb(entries) {
  const map = new Map()
  for (const [email, row] of entries) {
    map.set(email, row)
  }
  return map
}

function noopPortal() {
  return { url: 'https://billing.stripe.com/session/test_123' }
}

// ── Tests: email validation ──────────────────────────────────────────

describe('Portal: email validation', () => {
  const db = makeDb([])

  it('rejects missing email with 400', () => {
    const result = simulatePortalRequest({}, db, noopPortal)
    assert.equal(result.status, 400)
    assert.ok(result.body.error.includes('email'))
  })

  it('rejects null email with 400', () => {
    const result = simulatePortalRequest({ email: null }, db, noopPortal)
    assert.equal(result.status, 400)
  })

  it('rejects empty string email with 400', () => {
    const result = simulatePortalRequest({ email: '' }, db, noopPortal)
    assert.equal(result.status, 400)
  })

  it('rejects invalid email format with 400', () => {
    const result = simulatePortalRequest({ email: 'not-an-email' }, db, noopPortal)
    assert.equal(result.status, 400)
  })

  it('accepts valid email format', () => {
    const db2 = makeDb([['user@example.com', { id: 'u1', stripe_customer_id: 'cus_1' }]])
    const result = simulatePortalRequest({ email: 'user@example.com' }, db2, noopPortal)
    assert.equal(result.status, 200)
  })

  it('normalizes email to lowercase', () => {
    const db2 = makeDb([['user@example.com', { id: 'u1', stripe_customer_id: 'cus_1' }]])
    const result = simulatePortalRequest({ email: 'User@Example.COM' }, db2, noopPortal)
    assert.equal(result.status, 200)
  })
})

// ── Tests: user not found ────────────────────────────────────────────

describe('Portal: unknown email', () => {
  const db = makeDb([['existing@test.com', { id: 'u1', stripe_customer_id: 'cus_1' }]])

  it('returns 404 for unknown email', () => {
    const result = simulatePortalRequest({ email: 'nobody@test.com' }, db, noopPortal)
    assert.equal(result.status, 404)
    assert.equal(result.body.error, 'User not found')
  })
})

// ── Tests: user without stripe_customer_id ───────────────────────────

describe('Portal: user without stripe_customer_id', () => {
  const db = makeDb([
    ['free@test.com', { id: 'u1', stripe_customer_id: null }],
    ['nostripe@test.com', { id: 'u2', stripe_customer_id: '' }],
  ])

  it('returns 409 when stripe_customer_id is null', () => {
    const result = simulatePortalRequest({ email: 'free@test.com' }, db, noopPortal)
    assert.equal(result.status, 409)
    assert.equal(result.body.error, 'No Stripe customer on file')
  })

  it('returns 409 when stripe_customer_id is empty string', () => {
    const result = simulatePortalRequest({ email: 'nostripe@test.com' }, db, noopPortal)
    assert.equal(result.status, 409)
    assert.equal(result.body.error, 'No Stripe customer on file')
  })
})

// ── Tests: successful portal creation ────────────────────────────────

describe('Portal: successful session creation', () => {
  const db = makeDb([
    ['pro@test.com', { id: 'u1', stripe_customer_id: 'cus_pro_123' }],
  ])

  it('returns 200 with url', () => {
    const result = simulatePortalRequest({ email: 'pro@test.com' }, db, noopPortal)
    assert.equal(result.status, 200)
    assert.ok(result.body.url)
  })

  it('passes correct customer id to Stripe', () => {
    let calledArgs = null
    const mockCreate = (args) => {
      calledArgs = args
      return { url: 'https://billing.stripe.com/portal/test' }
    }

    simulatePortalRequest({ email: 'pro@test.com' }, db, mockCreate)
    assert.equal(calledArgs.customer, 'cus_pro_123')
  })

  it('passes return_url using absoluteUrl (SITE_ORIGIN)', () => {
    let calledArgs = null
    const mockCreate = (args) => {
      calledArgs = args
      return { url: 'https://billing.stripe.com/portal/test' }
    }

    simulatePortalRequest({ email: 'pro@test.com' }, db, mockCreate)
    const expected = absoluteUrl('/filingcontrol/dashboard')
    assert.equal(calledArgs.return_url, expected)
    assert.ok(calledArgs.return_url.startsWith(SITE_ORIGIN))
    assert.ok(calledArgs.return_url.endsWith('/filingcontrol/dashboard'))
  })

  it('return_url does not contain hardcoded domains', () => {
    let calledArgs = null
    const mockCreate = (args) => {
      calledArgs = args
      return { url: 'https://billing.stripe.com/portal/test' }
    }

    simulatePortalRequest({ email: 'pro@test.com' }, db, mockCreate)
    // Should use SITE_ORIGIN, not hardcoded localhost or other domains
    assert.ok(!calledArgs.return_url.includes('localhost'))
  })

  it('returns the url from Stripe session', () => {
    const mockCreate = () => ({ url: 'https://billing.stripe.com/portal/specific_id' })
    const result = simulatePortalRequest({ email: 'pro@test.com' }, db, mockCreate)
    assert.equal(result.body.url, 'https://billing.stripe.com/portal/specific_id')
  })
})

// ── Tests: determinism ───────────────────────────────────────────────

describe('Portal: determinism', () => {
  const db = makeDb([
    ['pro@test.com', { id: 'u1', stripe_customer_id: 'cus_123' }],
  ])

  it('same inputs produce identical outputs', () => {
    const result1 = simulatePortalRequest({ email: 'pro@test.com' }, db, noopPortal)
    const result2 = simulatePortalRequest({ email: 'pro@test.com' }, db, noopPortal)
    assert.deepEqual(result1, result2)
  })

  it('error responses are deterministic', () => {
    const emptyDb = makeDb([])
    const r1 = simulatePortalRequest({ email: 'x@y.com' }, emptyDb, noopPortal)
    const r2 = simulatePortalRequest({ email: 'x@y.com' }, emptyDb, noopPortal)
    assert.deepEqual(r1, r2)
  })
})

// ── Tests: route source checks ───────────────────────────────────────

describe('Portal: route source correctness', () => {
  let routeSrc

  try {
    routeSrc = readFileSync(
      resolve(process.cwd(), 'app/api/filingcontrol/billing/create-portal-session/route.ts'),
      'utf-8'
    )
  } catch {
    routeSrc = ''
  }

  it('uses billingPortal.sessions.create (not checkout)', () => {
    assert.ok(routeSrc.includes('billingPortal.sessions.create'))
    assert.ok(!routeSrc.includes('checkout.sessions.create'))
  })

  it('imports absoluteUrl from lib/site', () => {
    assert.ok(routeSrc.includes("from '@/lib/site'"))
    assert.ok(routeSrc.includes('absoluteUrl'))
  })

  it('uses getStripeClient from billing/stripe', () => {
    assert.ok(routeSrc.includes('getStripeClient'))
  })

  it('does not hardcode any origins', () => {
    assert.ok(!routeSrc.includes('echo-legal.com'))
    assert.ok(!routeSrc.includes('localhost'))
  })

  it('returns 404 for missing user', () => {
    assert.ok(routeSrc.includes('404'))
    assert.ok(routeSrc.includes('User not found'))
  })

  it('returns 409 for missing stripe_customer_id', () => {
    assert.ok(routeSrc.includes('409'))
    assert.ok(routeSrc.includes('No Stripe customer on file'))
  })

  it('uses POST method', () => {
    assert.ok(routeSrc.includes('export async function POST'))
  })
})
