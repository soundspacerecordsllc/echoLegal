// lib/control-panel/subscription.ts
// Stripe subscription management for the Control Panel.
// Handles subscription gating, customer creation, and status checks.

import Stripe from 'stripe'
import { getServiceClient } from './db'
import { Subscription, SubscriptionStatus } from './types'

// ─── Stripe client ──────────────────────────────────────────────────

let stripeClient: Stripe | null = null

function getStripe(): Stripe {
  if (stripeClient) return stripeClient

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
  }

  stripeClient = new Stripe(key, { apiVersion: '2024-12-18.acacia' })
  return stripeClient
}

// ─── Configuration ──────────────────────────────────────────────────

// Set in environment. Single plan for MVP.
export const PLAN_PRICE_ID = process.env.STRIPE_PRICE_ID || ''

// Features available at each tier. MVP has one tier: "pro".
export const GATED_FEATURES = {
  free: ['onboarding', 'checklist_preview'] as const,
  pro: ['onboarding', 'checklist_full', 'calendar', 'email_reminders', 'export'] as const,
} as const

export type Feature = typeof GATED_FEATURES.pro[number]

// ─── Access Control ─────────────────────────────────────────────────

/**
 * Check if a user has an active subscription.
 * Returns the subscription record or null.
 */
export async function getActiveSubscription(
  userId: string
): Promise<Subscription | null> {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('cp_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single()

  if (error || !data) return null
  return data as Subscription
}

/**
 * Check if a user can access a specific feature.
 */
export async function canAccessFeature(
  userId: string,
  feature: Feature
): Promise<boolean> {
  // Free features are always accessible
  if ((GATED_FEATURES.free as readonly string[]).includes(feature)) {
    return true
  }

  const sub = await getActiveSubscription(userId)
  return sub !== null
}

// ─── Checkout ───────────────────────────────────────────────────────

/**
 * Create a Stripe Checkout Session for subscription.
 */
export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  returnUrl: string
): Promise<string> {
  const stripe = getStripe()

  // Check for existing Stripe customer
  const supabase = getServiceClient()
  const { data: existingSub } = await supabase
    .from('cp_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  let customerId = existingSub?.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userEmail,
      metadata: { user_id: userId },
    })
    customerId = customer.id
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: PLAN_PRICE_ID, quantity: 1 }],
    success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: returnUrl,
    subscription_data: {
      metadata: { user_id: userId },
    },
  })

  return session.url || ''
}

/**
 * Create a Stripe Billing Portal session for managing subscriptions.
 */
export async function createBillingPortalSession(
  userId: string,
  returnUrl: string
): Promise<string> {
  const stripe = getStripe()
  const supabase = getServiceClient()

  const { data: sub } = await supabase
    .from('cp_subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()

  if (!sub?.stripe_customer_id) {
    throw new Error('No subscription found for user')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: returnUrl,
  })

  return session.url
}

// ─── Webhook Handlers ───────────────────────────────────────────────

/**
 * Sync subscription state from a Stripe event.
 * Called from the webhook endpoint.
 */
export async function syncSubscriptionFromStripe(
  stripeSubscription: Stripe.Subscription
): Promise<void> {
  const supabase = getServiceClient()
  const userId = stripeSubscription.metadata.user_id

  if (!userId) {
    console.error('Stripe subscription missing user_id metadata:', stripeSubscription.id)
    return
  }

  const status = mapStripeStatus(stripeSubscription.status)

  const record = {
    user_id: userId,
    stripe_customer_id: stripeSubscription.customer as string,
    stripe_subscription_id: stripeSubscription.id,
    status,
    plan_id: stripeSubscription.items.data[0]?.price.id || '',
    current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: stripeSubscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('cp_subscriptions')
    .upsert(record, { onConflict: 'stripe_subscription_id' })

  if (error) {
    console.error('Failed to sync subscription:', error)
  }
}

function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  const map: Record<string, SubscriptionStatus> = {
    trialing: 'trialing',
    active: 'active',
    past_due: 'past_due',
    canceled: 'canceled',
    unpaid: 'unpaid',
    incomplete: 'unpaid',
    incomplete_expired: 'canceled',
    paused: 'canceled',
  }
  return map[status] || 'canceled'
}
