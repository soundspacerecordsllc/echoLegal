// app/api/filingcontrol/billing/create-checkout/route.ts
// POST: Creates a Stripe Checkout Session for FilingControl PRO subscription.
// Input: { email: string }
// Returns: { url: string }

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import {
  getStripeClient,
  getStripePriceId,
  getSuccessUrl,
  getCancelUrl,
} from '@/lib/filingcontrol/billing/stripe'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email as string)?.trim().toLowerCase()
  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: 'Valid email is required' },
      { status: 400 }
    )
  }

  const supabase = getServiceClient()

  // Find or create fc_users row
  let userId: string
  let stripeCustomerId: string | null = null

  const { data: existing } = await supabase
    .from('fc_users')
    .select('id, stripe_customer_id')
    .eq('email', email)
    .single()

  if (existing) {
    userId = existing.id
    stripeCustomerId = existing.stripe_customer_id
  } else {
    const { data: created, error: createError } = await supabase
      .from('fc_users')
      .insert({ email })
      .select('id')
      .single()

    if (createError || !created) {
      console.error('[create-checkout] Failed to create user:', createError)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }
    userId = created.id
  }

  const stripe = getStripeClient()

  // Create Stripe customer if missing
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { fc_user_id: userId },
    })
    stripeCustomerId = customer.id

    await supabase
      .from('fc_users')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', userId)
  }

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: 'subscription',
    line_items: [{ price: getStripePriceId(), quantity: 1 }],
    success_url: getSuccessUrl(),
    cancel_url: getCancelUrl(),
    client_reference_id: userId,
    metadata: { fc_user_id: userId },
    subscription_data: {
      metadata: { fc_user_id: userId },
    },
  })

  return NextResponse.json({ url: session.url })
}
