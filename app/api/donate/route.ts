import { NextRequest, NextResponse } from 'next/server'
import { createDonationSession, createSubscriptionSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, email, message, recurring, lang = 'en' } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://echo-legal.com'
    const successUrl = `${baseUrl}/${lang}/donate/thank-you`
    const cancelUrl = `${baseUrl}/${lang}/donate`

    let checkoutUrl: string

    if (recurring) {
      // Create a recurring donation (subscription)
      // You'll need to create a Stripe Price for recurring donations
      const monthlyDonationPriceId = process.env.STRIPE_MONTHLY_DONATION_PRICE_ID || ''

      const { url } = await createSubscriptionSession(
        monthlyDonationPriceId,
        successUrl,
        cancelUrl,
        email
      )
      checkoutUrl = url
    } else {
      // One-time donation
      const { url } = await createDonationSession(
        amount,
        successUrl,
        cancelUrl,
        email,
        message
      )
      checkoutUrl = url
    }

    return NextResponse.json({ url: checkoutUrl })
  } catch (error) {
    console.error('Donation error:', error)
    return NextResponse.json(
      { error: 'Failed to create donation session' },
      { status: 500 }
    )
  }
}
