# FilingControl PRO — Production Bring-up Runbook

## 1. Required Vercel Environment Variables

Set all of these in **Vercel → Project Settings → Environment Variables** for the `production` environment.

| Variable | Example | Description |
|----------|---------|-------------|
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe secret key (live mode) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Signing secret for the FC webhook endpoint |
| `FC_STRIPE_PRICE_PRO` | `price_...` | Stripe Price ID for the FilingControl PRO recurring plan |
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://echo-legal.com` | Public site origin (used by `absoluteUrl()`) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Supabase service role key (server-side only) |

Optional overrides:

| Variable | Default | Description |
|----------|---------|-------------|
| `FC_STRIPE_SUCCESS_URL` | `${SITE_ORIGIN}/filingcontrol/dashboard?upgraded=1` | Checkout success redirect |
| `FC_STRIPE_CANCEL_URL` | `${SITE_ORIGIN}/filingcontrol/dashboard?upgrade=cancel` | Checkout cancel redirect |
| `ECHO_DEBUG_KEY` | *(none — endpoint locked)* | Secret for `GET /api/debug/nav` (header: `x-echo-debug-key`) |

## 2. Stripe Dashboard Setup

### 2a. Create the Product + Price

1. Go to **Stripe Dashboard → Products → Add product**
2. Name: `FilingControl PRO`
3. Pricing: **Recurring**, set your price (e.g. $29/mo)
4. Copy the **Price ID** (`price_...`) → set as `FC_STRIPE_PRICE_PRO`

### 2b. Create the Webhook Endpoint

1. Go to **Stripe Dashboard → Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://echo-legal.com/api/filingcontrol/billing/webhook`
3. Listen to these events (exactly):

```
checkout.session.completed
customer.subscription.updated
customer.subscription.deleted
invoice.payment_failed
```

4. Copy the **Signing secret** (`whsec_...`) → set as `STRIPE_WEBHOOK_SECRET`

### 2c. Enable Customer Portal

1. Go to **Stripe Dashboard → Settings → Billing → Customer Portal**
2. Enable: Cancel subscription, Update payment method
3. Save

## 3. Supabase SQL Migration

Run **once** in the Supabase SQL Editor:

**File:** `lib/db/fc-production-migration.sql`

This creates:
- `fc_users` table (plan, Stripe fields, calendar_token, indexes, RLS, updated_at trigger)
- `fc_stripe_events` table (webhook idempotency)
- `fc_auth_user_id_by_email()` RPC function (bridges fc_users ↔ fc_entities)

If tables already exist from prior dev schemas (`lib/db/fc-users-schema.sql`), the migration is idempotent (`IF NOT EXISTS` / `CREATE OR REPLACE`).

## 4. Endpoint Inventory

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/filingcontrol/billing/create-checkout` | None | Create Stripe Checkout Session |
| POST | `/api/filingcontrol/billing/webhook` | Stripe signature | Subscription lifecycle events |
| POST | `/api/filingcontrol/billing/create-portal-session` | None | Open Stripe Customer Portal |
| GET | `/api/filingcontrol/billing/user-plan?email=...` | None | Fetch user plan + calendar_token |
| GET | `/api/filingcontrol/calendar/[token]` | Token-based | ICS calendar feed (PRO only) |
| POST | `/api/filingcontrol/entities` | Bearer (Supabase JWT) | Create entity (402 at FREE limit) |
| GET | `/api/filingcontrol/entities` | Bearer (Supabase JWT) | List user entities |

## 5. Verification Steps

Run these after deployment to confirm everything is wired up.

### 5a. Env vars loaded

```bash
# Should return { plan: "FREE" } or 404 — not a 500
curl -s https://echo-legal.com/api/filingcontrol/billing/user-plan?email=test@example.com
```

If you get a 500 with "Missing SUPABASE..." → env vars not set.

### 5b. Checkout flow

1. Open `/filingcontrol/dashboard` in browser
2. Click the upgrade button, enter a test email
3. Should redirect to Stripe Checkout
4. Complete with Stripe test card `4242 4242 4242 4242`
5. Should redirect back to dashboard with `?upgraded=1`

### 5c. Webhook delivery

1. In Stripe Dashboard → Developers → Webhooks → your endpoint
2. Check "Recent deliveries" — `checkout.session.completed` should show 200
3. In Supabase: `SELECT * FROM fc_users WHERE email = '...'` — plan should be `PRO`
4. In Supabase: `SELECT * FROM fc_stripe_events` — event ID should appear

### 5d. Customer Portal

```bash
curl -s -X POST https://echo-legal.com/api/filingcontrol/billing/create-portal-session \
  -H 'Content-Type: application/json' \
  -d '{"email":"YOUR_TEST_EMAIL"}'
# Should return { url: "https://billing.stripe.com/..." }
```

### 5e. Calendar feed (PRO only)

```bash
# Get the calendar_token from user-plan endpoint
TOKEN=$(curl -s 'https://echo-legal.com/api/filingcontrol/billing/user-plan?email=YOUR_PRO_EMAIL' | jq -r '.calendar_token')

# Fetch the calendar
curl -s "https://echo-legal.com/api/filingcontrol/calendar/$TOKEN" -D-
# Should return Content-Type: text/calendar and BEGIN:VCALENDAR body
```

### 5f. Entity limit (FREE plan)

```bash
# As a FREE user, creating a second entity should return 402
# (Requires a valid Supabase JWT — test via the dashboard UI)
```

### 5g. Smoke-test script

```bash
node scripts/test-fc-smoke.mjs
```

Generates curl commands for all endpoints. See script for details.

## 6. Stripe Webhook Events Required

Exactly these four events must be enabled on the webhook endpoint:

| Event | Handler action |
|-------|---------------|
| `checkout.session.completed` | Activates PRO, sets Stripe IDs, generates calendar_token |
| `customer.subscription.updated` | Refreshes plan/status, generates calendar_token if upgrading to PRO |
| `customer.subscription.deleted` | Sets plan=FREE, status=canceled |
| `invoice.payment_failed` | Sets plan=FREE, status=past_due |

## 7. Debug: Verify Deployed Nav

Production-guarded. Requires `ECHO_DEBUG_KEY` env var set on Vercel and the
matching header on the request. Without it, returns 404.

```bash
# Prod — unauthorized (should 404):
curl -I https://echo-legal.com/api/debug/nav

# Prod — authorized:
curl -s -H "x-echo-debug-key: YOUR_KEY" https://echo-legal.com/api/debug/nav | python3 -m json.tool

# Local dev (no header needed):
curl -s http://localhost:3000/api/debug/nav | python3 -m json.tool
```

Returns `{ ok, ts, env, keys, hasCompliance, count }`. If `hasCompliance` is `false`, the deployment is stale or built from the wrong branch.

## 8. Troubleshooting

| Symptom | Likely cause |
|---------|-------------|
| 500 on any billing endpoint | Missing env var — check Vercel logs |
| Webhook returns 400 "Invalid signature" | `STRIPE_WEBHOOK_SECRET` mismatch or wrong endpoint URL |
| User stays FREE after checkout | Webhook not firing — check Stripe webhook logs |
| Calendar returns 404 | Token invalid or user not found — check `fc_users.calendar_token` |
| Calendar returns 403 | User is FREE — webhook didn't update plan |
| Entity creation returns 500 | `fc_entities` table missing — run migration |
