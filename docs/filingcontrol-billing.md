# FilingControl Stripe Billing

## Environment Variables

Required:

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret API key (shared with EchoLegal control-panel) |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for the FC webhook endpoint |
| `FC_STRIPE_PRICE_PRO` | Stripe Price ID for the FilingControl PRO plan |

Optional:

| Variable | Default |
|----------|---------|
| `FC_STRIPE_SUCCESS_URL` | `${SITE_ORIGIN}/filingcontrol/dashboard?upgraded=1` |
| `FC_STRIPE_CANCEL_URL` | `${SITE_ORIGIN}/filingcontrol/dashboard?upgrade=cancel` |

`SITE_ORIGIN` is derived from `NEXT_PUBLIC_SITE_ORIGIN` (see `lib/site.ts`).

## Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/filingcontrol/billing/create-checkout` | None (dashboard use) | Create Stripe Checkout Session |
| POST | `/api/filingcontrol/billing/create-portal-session` | None (dashboard use) | Open Stripe Customer Portal |
| GET | `/api/filingcontrol/billing/user-plan?email=...` | None (dashboard use) | Fetch user plan status |
| POST | `/api/filingcontrol/billing/webhook` | Stripe signature | Subscription lifecycle events |

## Customer Portal

PRO users can manage their subscription (cancel, update payment method) via
Stripe's hosted Customer Portal.

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/filingcontrol/billing/create-portal-session` | None (dashboard use) | Open Stripe Customer Portal |

**Request:** `{ email: string }`
**Response:** `{ url: string }` — redirect the user to this URL.

The `return_url` is set to `${SITE_ORIGIN}/filingcontrol/dashboard` (via `absoluteUrl()`).

**Prerequisite:** The Customer Portal must be enabled in the Stripe Dashboard
under Settings > Billing > Customer Portal. Configure which actions customers
can take (cancel subscription, update payment method, etc.).

## Database Tables

- `fc_users` — user rows with plan + Stripe fields
- `fc_stripe_events` — webhook event idempotency (dedupe by Stripe event ID)

Schema: `lib/db/fc-users-schema.sql`

## Plan Truth Mapping

```
subscription_status = 'active' => plan = 'PRO'
anything else                  => plan = 'FREE'
```

Logic: `lib/filingcontrol/billing/plan.ts`

## Webhook Events Handled

- `checkout.session.completed` — initial subscription activation
- `customer.subscription.updated` — status changes (upgrade, downgrade, renewal)
- `customer.subscription.deleted` — cancellation
- `invoice.payment_failed` — sets `past_due`, downgrades to FREE

All events are deduplicated via `fc_stripe_events` table.

## Local Webhook Testing

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/filingcontrol/billing/webhook

# Copy the webhook signing secret from the CLI output and set:
# STRIPE_WEBHOOK_SECRET=whsec_...

# Trigger test events:
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted
stripe trigger invoice.payment_failed
```

## Tests

```bash
node --test scripts/test-billing-plan.mjs
node --test scripts/test-billing-portal.mjs
```
