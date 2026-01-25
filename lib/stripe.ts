/**
 * Stripe Integration for Digital Products
 * Handles checkout sessions, webhooks, and product delivery
 */

import Stripe from 'stripe'

// Initialize Stripe with API key
// IMPORTANT: Set STRIPE_SECRET_KEY in your environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export interface CheckoutSession {
  sessionId: string
  url: string
}

export interface Product {
  id: string
  name: string
  price: number
  stripePriceId: string
  downloadUrl: string
}

/**
 * Create a Stripe checkout session for a product
 */
export async function createCheckoutSession(
  productId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string,
  allowPayWhatYouWant: boolean = false,
  customAmount?: number
): Promise<CheckoutSession> {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = allowPayWhatYouWant && customAmount
    ? [
        {
          price_data: {
            currency: 'usd',
            product: productId,
            unit_amount: Math.round(customAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ]
    : [
        {
          price: priceId,
          quantity: 1,
        },
      ]

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
    metadata: {
      productId,
    },
    // Enable automatic tax calculation if needed
    // automatic_tax: { enabled: true },
  })

  return {
    sessionId: session.id,
    url: session.url || '',
  }
}

/**
 * Create a subscription checkout session for memberships
 */
export async function createSubscriptionSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string,
  trialDays?: number
): Promise<CheckoutSession> {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
  }

  if (trialDays) {
    sessionParams.subscription_data = {
      trial_period_days: trialDays,
    }
  }

  const session = await stripe.checkout.sessions.create(sessionParams)

  return {
    sessionId: session.id,
    url: session.url || '',
  }
}

/**
 * Create a donation session (one-time payment with custom amount)
 */
export async function createDonationSession(
  amount: number,
  successUrl: string,
  cancelUrl: string,
  donorEmail?: string,
  message?: string
): Promise<CheckoutSession> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Support EchoLegal',
            description: 'Thank you for supporting free legal education!',
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    customer_email: donorEmail,
    metadata: {
      type: 'donation',
      message: message || '',
    },
    submit_type: 'donate',
  })

  return {
    sessionId: session.id,
    url: session.url || '',
  }
}

/**
 * Retrieve checkout session details
 */
export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer'],
  })
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}

/**
 * Handle successful payment webhook
 */
export async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const productId = session.metadata?.productId
  const customerEmail = session.customer_email || session.customer_details?.email

  if (!productId || !customerEmail) {
    throw new Error('Missing product ID or customer email')
  }

  // TODO: Implement your delivery logic here
  // Options:
  // 1. Send email with download link
  // 2. Grant access in database
  // 3. Generate secure download token

  console.log(`Delivering product ${productId} to ${customerEmail}`)

  return {
    productId,
    customerEmail,
    delivered: true,
  }
}

/**
 * Create a customer portal session for subscription management
 */
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session.url
}

export { stripe }
