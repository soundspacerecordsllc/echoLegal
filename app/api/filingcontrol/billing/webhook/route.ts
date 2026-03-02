// app/api/filingcontrol/billing/webhook/route.ts
// Stripe webhook for FilingControl subscription lifecycle.
// Idempotent: uses fc_stripe_events table to deduplicate.
// Returns 200 for all handled + ignored events after signature verification.

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { getStripeClient, getWebhookSecret } from '@/lib/filingcontrol/billing/stripe'
import {
  buildSubscriptionPatch,
  normalizeStripeStatus,
  computePlanFromStatus,
} from '@/lib/filingcontrol/billing/plan'
import { ensureCalendarToken } from '@/lib/filingcontrol/calendar/token'
import type Stripe from 'stripe'

// Events we handle
const HANDLED_EVENTS = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_failed',
])

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const stripe = getStripeClient()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, getWebhookSecret())
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[fc/webhook] Signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Idempotency: check if we've already processed this event
  const supabase = getServiceClient()

  const { error: dedupeError } = await supabase
    .from('fc_stripe_events')
    .insert({ id: event.id, type: event.type })

  if (dedupeError) {
    // 23505 = unique violation = already processed
    if (dedupeError.code === '23505') {
      return NextResponse.json({ received: true, deduplicated: true })
    }
    console.error('[fc/webhook] Dedupe insert error:', dedupeError)
    // Continue processing anyway — better to double-process than lose an event
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true, ignored: true })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
    } else if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      await handleSubscriptionChange(
        event.data.object as Stripe.Subscription,
        event.type
      )
    } else if (event.type === 'invoice.payment_failed') {
      await handlePaymentFailed(event.data.object as Stripe.Invoice)
    }

    // Mark as processed
    await supabase
      .from('fc_stripe_events')
      .update({ processed: true })
      .eq('id', event.id)
  } catch (err) {
    console.error(`[fc/webhook] Error processing ${event.type}:`, err)
    // Still return 200 — retrying won't help if our logic is broken
  }

  return NextResponse.json({ received: true })
}

// ─── Handlers ─────────────────────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const stripe = getStripeClient()
  const supabase = getServiceClient()

  const subscriptionId = session.subscription as string
  if (!subscriptionId) return

  // Fetch full subscription with items
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['items.data.price'],
  })

  const patch = buildSubscriptionPatch(subscription)

  // Locate user: prefer metadata, then customer, then email
  const userId = await resolveUserId(
    session.metadata?.fc_user_id ?? null,
    session.customer as string,
    session.customer_email ?? null
  )

  if (!userId) {
    console.error('[fc/webhook] Cannot resolve user for checkout session:', session.id)
    return
  }

  // Build update, ensuring calendar token for PRO users
  const updateData: Record<string, unknown> = {
    stripe_customer_id: session.customer as string,
    ...patch,
  }

  if (patch.plan === 'PRO') {
    // Fetch current row to check if token already exists
    const { data: currentUser } = await supabase
      .from('fc_users')
      .select('calendar_token')
      .eq('id', userId)
      .single()

    const { calendar_token, needsUpdate } = ensureCalendarToken(currentUser ?? {})
    if (needsUpdate) {
      updateData.calendar_token = calendar_token
    }
  }

  await supabase
    .from('fc_users')
    .update(updateData)
    .eq('id', userId)
}

async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  eventType: string
) {
  const supabase = getServiceClient()

  if (eventType === 'customer.subscription.deleted') {
    // Subscription canceled
    const userId = await resolveUserId(
      subscription.metadata?.fc_user_id ?? null,
      subscription.customer as string,
      null
    )
    if (!userId) return

    await supabase
      .from('fc_users')
      .update({
        subscription_status: 'canceled',
        plan: 'FREE',
      })
      .eq('id', userId)
    return
  }

  // subscription.updated — refresh full state
  const patch = buildSubscriptionPatch(subscription)
  const userId = await resolveUserId(
    subscription.metadata?.fc_user_id ?? null,
    subscription.customer as string,
    null
  )
  if (!userId) return

  const updateData: Record<string, unknown> = { ...patch }

  if (patch.plan === 'PRO') {
    const { data: currentUser } = await supabase
      .from('fc_users')
      .select('calendar_token')
      .eq('id', userId)
      .single()

    const { calendar_token, needsUpdate } = ensureCalendarToken(currentUser ?? {})
    if (needsUpdate) {
      updateData.calendar_token = calendar_token
    }
  }

  await supabase.from('fc_users').update(updateData).eq('id', userId)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const supabase = getServiceClient()
  const customerId = invoice.customer as string
  if (!customerId) return

  const userId = await resolveUserId(null, customerId, null)
  if (!userId) return

  await supabase
    .from('fc_users')
    .update({
      subscription_status: 'past_due',
      plan: 'FREE',
    })
    .eq('id', userId)
}

// ─── User resolution ──────────────────────────────────────────────────

async function resolveUserId(
  fcUserId: string | null,
  stripeCustomerId: string | null,
  email: string | null
): Promise<string | null> {
  const supabase = getServiceClient()

  // 1. By fc_user_id from metadata
  if (fcUserId) {
    const { data } = await supabase
      .from('fc_users')
      .select('id')
      .eq('id', fcUserId)
      .single()
    if (data) return data.id
  }

  // 2. By stripe_customer_id
  if (stripeCustomerId) {
    const { data } = await supabase
      .from('fc_users')
      .select('id')
      .eq('stripe_customer_id', stripeCustomerId)
      .single()
    if (data) return data.id
  }

  // 3. By email
  if (email) {
    const { data } = await supabase
      .from('fc_users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()
    if (data) return data.id
  }

  return null
}
