// lib/filingcontrol/billing/stripe.ts
// Stripe client and checkout helpers for FilingControl.
// Separate from the EchoLegal control-panel Stripe integration.

import Stripe from 'stripe'
import { absoluteUrl } from '@/lib/site'

// ─── Client ─────────────────────────────────────────────────────────

let client: Stripe | null = null

export function getStripeClient(): Stripe {
  if (client) return client

  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
  }

  client = new Stripe(key, { apiVersion: '2023-10-16' })
  return client
}

// ─── Configuration ──────────────────────────────────────────────────

export function getStripePriceId(): string {
  const id = process.env.FC_STRIPE_PRICE_PRO
  if (!id) {
    throw new Error('Missing FC_STRIPE_PRICE_PRO environment variable')
  }
  return id
}

export function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
  }
  return secret
}

export function getSuccessUrl(): string {
  return (
    process.env.FC_STRIPE_SUCCESS_URL ??
    absoluteUrl('/filingcontrol/dashboard?upgraded=1')
  )
}

export function getCancelUrl(): string {
  return (
    process.env.FC_STRIPE_CANCEL_URL ??
    absoluteUrl('/filingcontrol/dashboard?upgrade=cancel')
  )
}
