// lib/filingcontrol/billing/plan.ts
// Pure plan computation from Stripe subscription status.
// No side effects, no DB calls.

export type Plan = 'FREE' | 'PRO'

export type SubscriptionStatus =
  | 'none'
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'incomplete'

/**
 * Derive the plan from a Stripe subscription status.
 * Only 'active' grants PRO; everything else is FREE.
 */
export function computePlanFromStatus(status: SubscriptionStatus): Plan {
  return status === 'active' ? 'PRO' : 'FREE'
}

/**
 * Map a raw Stripe subscription status string to our normalized status.
 * Stripe may send statuses like 'trialing', 'unpaid', etc.
 * We collapse anything unrecognized to 'none'.
 */
export function normalizeStripeStatus(raw: string): SubscriptionStatus {
  const valid: SubscriptionStatus[] = [
    'none',
    'active',
    'canceled',
    'past_due',
    'incomplete',
  ]
  if (valid.includes(raw as SubscriptionStatus)) {
    return raw as SubscriptionStatus
  }
  // Stripe 'trialing' maps to 'active' for our purposes
  if (raw === 'trialing') return 'active'
  return 'none'
}

/**
 * Given a user row (or partial), compute the plan patch that should be applied.
 * Returns an object suitable for Supabase .update().
 */
export function applyPlanToUserRow(userRow: {
  subscription_status: string
}): { plan: Plan } {
  const status = normalizeStripeStatus(userRow.subscription_status)
  return { plan: computePlanFromStatus(status) }
}

/**
 * Build the full update patch from a Stripe subscription object.
 * Used by webhook handlers to update the user row atomically.
 */
export function buildSubscriptionPatch(sub: {
  id: string
  status: string
  items?: { data?: Array<{ price?: { id?: string } }> }
  current_period_end?: number
}): {
  stripe_subscription_id: string
  stripe_price_id: string | null
  subscription_status: SubscriptionStatus
  current_period_end: string | null
  plan: Plan
} {
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
