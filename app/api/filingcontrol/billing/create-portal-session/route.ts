// app/api/filingcontrol/billing/create-portal-session/route.ts
// POST: Creates a Stripe Customer Portal session for an existing PRO user.
// Input: { email: string }
// Returns: { url: string }

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { getStripeClient } from '@/lib/filingcontrol/billing/stripe'
import { absoluteUrl } from '@/lib/site'

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

  // Look up user by email
  const { data: user, error: lookupError } = await supabase
    .from('fc_users')
    .select('id, stripe_customer_id')
    .eq('email', email)
    .single()

  if (lookupError || !user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  if (!user.stripe_customer_id) {
    return NextResponse.json(
      { error: 'No Stripe customer on file' },
      { status: 409 }
    )
  }

  const stripe = getStripeClient()

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripe_customer_id,
    return_url: absoluteUrl('/filingcontrol/dashboard'),
  })

  return NextResponse.json({ url: session.url })
}
