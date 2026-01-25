import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import productsData from '@/data/products.json'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, priceId, customAmount, lang = 'en' } = body

    // Find the product
    const product = productsData.products.find((p) => p.id === productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Build URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://echo-legal.com'
    const successUrl = `${baseUrl}/${lang}/checkout/success`
    const cancelUrl = `${baseUrl}/${lang}/legal-kits/${product.slug}`

    // Create checkout session
    const { url } = await createCheckoutSession(
      product.stripeProductId,
      priceId || product.stripePriceId,
      successUrl,
      cancelUrl,
      undefined,
      !!customAmount,
      customAmount
    )

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
