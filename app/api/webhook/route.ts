import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, handleSuccessfulPayment } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = verifyWebhookSignature(body, signature)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Handle one-time payment (product purchase or donation)
      if (session.mode === 'payment') {
        try {
          await handleSuccessfulPayment(session)
          console.log('Payment successful:', session.id)
        } catch (error) {
          console.error('Error handling payment:', error)
        }
      }

      // Handle subscription
      if (session.mode === 'subscription') {
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string
        console.log('Subscription created:', { customerId, subscriptionId })

        // TODO: Store subscription details in your database
        // Grant premium access to the customer
      }

      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      console.log('Subscription updated:', subscription.id)

      // TODO: Update subscription status in your database
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      console.log('Subscription cancelled:', subscription.id)

      // TODO: Remove premium access from the customer
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      console.log('Payment failed:', invoice.id)

      // TODO: Notify customer of failed payment
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// Note: In App Router, request body is not automatically parsed,
// so we don't need to disable body parsing for webhook signature verification.
