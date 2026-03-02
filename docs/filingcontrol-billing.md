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
| POST | `/api/filingcontrol/billing/webhook` | Stripe signature | Subscription lifecycle events |

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
```
