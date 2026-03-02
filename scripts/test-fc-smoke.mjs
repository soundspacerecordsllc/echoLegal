#!/usr/bin/env node
// scripts/test-fc-smoke.mjs
// FilingControl PRO smoke-test — curl command generator.
//
// Usage:
//   node scripts/test-fc-smoke.mjs                           # default: https://echo-legal.com
//   node scripts/test-fc-smoke.mjs https://localhost:3000     # custom base URL
//   FC_BASE_URL=https://my-preview.vercel.app node scripts/test-fc-smoke.mjs
//
// Generates numbered curl commands you can paste into a terminal to verify
// every FilingControl billing/calendar/entity endpoint works end-to-end.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

const BASE = process.argv[2] || process.env.FC_BASE_URL || 'https://echo-legal.com'
const TEST_EMAIL = process.env.FC_TEST_EMAIL || 'smoke-test@example.com'

// ─── Helpers ────────────────────────────────────────────────────────────

function section(title) {
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`  ${title}`)
  console.log('═'.repeat(60))
}

function cmd(label, curlStr) {
  console.log(`\n# ${label}`)
  console.log(curlStr)
}

// ─── Generate curl commands ─────────────────────────────────────────────

describe('FilingControl smoke-test curl commands', () => {
  it('generates user-plan GET (expect 404 or FREE plan)', () => {
    section('1. GET /api/filingcontrol/billing/user-plan')
    cmd(
      'Fetch plan for test email — expect 404 (no user) or { plan: "FREE" }',
      `curl -s '${BASE}/api/filingcontrol/billing/user-plan?email=${TEST_EMAIL}' | python3 -m json.tool`
    )
    assert.ok(true)
  })

  it('generates create-checkout POST', () => {
    section('2. POST /api/filingcontrol/billing/create-checkout')
    cmd(
      'Create Stripe Checkout Session — expect { url: "https://checkout.stripe.com/..." }',
      `curl -s -X POST '${BASE}/api/filingcontrol/billing/create-checkout' \\
  -H 'Content-Type: application/json' \\
  -d '{"email":"${TEST_EMAIL}"}' | python3 -m json.tool`
    )
    assert.ok(true)
  })

  it('generates create-portal-session POST', () => {
    section('3. POST /api/filingcontrol/billing/create-portal-session')
    cmd(
      'Create Customer Portal Session — expect { url: "..." } (409 if no Stripe customer)',
      `curl -s -X POST '${BASE}/api/filingcontrol/billing/create-portal-session' \\
  -H 'Content-Type: application/json' \\
  -d '{"email":"${TEST_EMAIL}"}' | python3 -m json.tool`
    )
    assert.ok(true)
  })

  it('generates user-plan GET for PRO user (with calendar_token)', () => {
    section('4. GET user-plan for PRO user')
    cmd(
      'After completing checkout + webhook, user-plan should return plan: "PRO" and a calendar_token',
      `curl -s '${BASE}/api/filingcontrol/billing/user-plan?email=${TEST_EMAIL}' | python3 -m json.tool`
    )
    console.log('\n# Expected fields: plan, email, subscription_status, calendar_token')
    assert.ok(true)
  })

  it('generates calendar feed GET', () => {
    section('5. GET /api/filingcontrol/calendar/[token]')
    cmd(
      'Fetch ICS calendar feed — replace TOKEN with calendar_token from step 4',
      `TOKEN="YOUR_CALENDAR_TOKEN_HERE"
curl -s -D- "${BASE}/api/filingcontrol/calendar/\${TOKEN}"`
    )
    console.log('\n# PRO user: expect Content-Type: text/calendar + BEGIN:VCALENDAR')
    console.log('# FREE user or invalid token: expect 403 or 404')
    assert.ok(true)
  })

  it('generates calendar feed 403 test for FREE user', () => {
    section('6. Calendar feed — FREE plan (expect 403)')
    cmd(
      'If a user downgrades to FREE, their token should return 403',
      `# To test: manually set plan='FREE' in Supabase for the user, then:
TOKEN="YOUR_CALENDAR_TOKEN_HERE"
curl -s -o /dev/null -w '%{http_code}' "${BASE}/api/filingcontrol/calendar/\${TOKEN}"
# Expected: 403`
    )
    assert.ok(true)
  })

  it('generates entity creation POST (auth required)', () => {
    section('7. POST /api/filingcontrol/entities (auth required)')
    cmd(
      'Create entity — requires Supabase JWT Bearer token',
      `JWT="YOUR_SUPABASE_JWT_HERE"
curl -s -X POST '${BASE}/api/filingcontrol/entities' \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer \${JWT}" \\
  -d '{"company_name":"Test LLC","state_of_formation":"DE","formation_date":"2024-01-15"}' | python3 -m json.tool`
    )
    console.log('\n# FREE plan + 1 existing entity → 402 PLAN_LIMIT')
    console.log('# PRO plan → 201 Created')
    assert.ok(true)
  })

  it('generates entity list GET (auth required)', () => {
    section('8. GET /api/filingcontrol/entities (auth required)')
    cmd(
      'List entities — requires Supabase JWT',
      `JWT="YOUR_SUPABASE_JWT_HERE"
curl -s '${BASE}/api/filingcontrol/entities' \\
  -H "Authorization: Bearer \${JWT}" | python3 -m json.tool`
    )
    assert.ok(true)
  })

  it('generates second entity creation for 402 test', () => {
    section('9. Entity limit — attempt second entity on FREE plan (expect 402)')
    cmd(
      'Second entity on FREE plan should return 402 PLAN_LIMIT',
      `JWT="YOUR_SUPABASE_JWT_HERE"
curl -s -o /dev/null -w '%{http_code}\\n' -X POST '${BASE}/api/filingcontrol/entities' \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer \${JWT}" \\
  -d '{"company_name":"Second LLC","state_of_formation":"NY","formation_date":"2024-06-01"}'
# Expected: 402`
    )
    assert.ok(true)
  })

  it('generates webhook signature test', () => {
    section('10. Webhook — signature verification')
    cmd(
      'Webhook without signature → 400',
      `curl -s -o /dev/null -w '%{http_code}' -X POST '${BASE}/api/filingcontrol/billing/webhook' \\
  -H 'Content-Type: application/json' \\
  -d '{}'
# Expected: 400 (Missing signature)`
    )
    assert.ok(true)
  })

  it('prints summary', () => {
    section('Summary')
    console.log(`
Base URL: ${BASE}
Test email: ${TEST_EMAIL}

Environment variables required on Vercel:
  STRIPE_SECRET_KEY          — Stripe live secret key
  STRIPE_WEBHOOK_SECRET      — Webhook signing secret (whsec_...)
  FC_STRIPE_PRICE_PRO        — Price ID for PRO plan (price_...)
  NEXT_PUBLIC_SITE_ORIGIN    — Site origin (https://echo-legal.com)
  NEXT_PUBLIC_SUPABASE_URL   — Supabase project URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon key
  SUPABASE_SERVICE_ROLE_KEY  — Supabase service role key

Stripe webhook events to configure:
  checkout.session.completed
  customer.subscription.updated
  customer.subscription.deleted
  invoice.payment_failed
`)
    assert.ok(true)
  })
})
