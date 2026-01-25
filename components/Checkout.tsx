'use client'

/**
 * Checkout Components for Digital Products
 * Handles product purchase, pay-what-you-want, and free access
 */

import { useState } from 'react'

interface CheckoutButtonProps {
  productId: string
  priceId: string
  price: number
  allowFreeAccess?: boolean
  lang: 'en' | 'tr'
  className?: string
}

interface PayWhatYouWantProps {
  productId: string
  priceId: string
  suggestedPrice: number
  minPrice?: number
  allowFreeAccess?: boolean
  lang: 'en' | 'tr'
}

/**
 * Simple checkout button
 */
export function CheckoutButton({
  productId,
  priceId,
  price,
  allowFreeAccess = false,
  lang,
  className = '',
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEnglish = lang === 'en'

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          priceId,
          lang,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(isEnglish ? 'Checkout failed. Please try again.' : 'Ödeme başarısız. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full bg-[#C9A227] text-white py-4 px-6 rounded-lg font-bold hover:bg-[#B8922A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading
          ? (isEnglish ? 'Processing...' : 'İşleniyor...')
          : (isEnglish ? `Buy Now - $${price}` : `Şimdi Satın Al - $${price}`)}
      </button>

      {allowFreeAccess && (
        <a
          href={`/${lang}/free-access?product=${productId}`}
          className="block text-center text-sm text-gray-600 hover:text-gray-800 underline"
        >
          {isEnglish ? 'Or access for free' : 'Veya ücretsiz erişin'}
        </a>
      )}
    </div>
  )
}

/**
 * Pay-what-you-want checkout component
 */
export function PayWhatYouWant({
  productId,
  priceId,
  suggestedPrice,
  minPrice = 0,
  allowFreeAccess = true,
  lang,
}: PayWhatYouWantProps) {
  const [amount, setAmount] = useState(suggestedPrice)
  const [isLoading, setIsLoading] = useState(false)
  const isEnglish = lang === 'en'

  const presetAmounts = [0, Math.round(suggestedPrice / 2), suggestedPrice, suggestedPrice * 2]

  const handleCheckout = async () => {
    if (amount === 0 && allowFreeAccess) {
      // Redirect to free access
      window.location.href = `/${lang}/free-access?product=${productId}`
      return
    }

    if (amount < minPrice) {
      alert(isEnglish ? `Minimum amount is $${minPrice}` : `Minimum tutar $${minPrice}`)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          priceId,
          customAmount: amount,
          lang,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(isEnglish ? 'Checkout failed. Please try again.' : 'Ödeme başarısız. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {isEnglish ? 'Choose Your Price' : 'Fiyatınızı Seçin'}
      </h3>

      {/* Preset amounts */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {presetAmounts.map((preset) => (
          <button
            key={preset}
            onClick={() => setAmount(preset)}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              amount === preset
                ? 'bg-[#C9A227] text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {preset === 0 ? (isEnglish ? 'Free' : 'Ücretsiz') : `$${preset}`}
          </button>
        ))}
      </div>

      {/* Custom amount input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isEnglish ? 'Or enter custom amount' : 'Veya özel tutar girin'}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            min={minPrice}
            step="1"
            value={amount}
            onChange={(e) => setAmount(Math.max(minPrice, Number(e.target.value)))}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
          />
        </div>
      </div>

      {/* Suggested price note */}
      <p className="text-sm text-gray-500 mb-4">
        {isEnglish
          ? `Suggested: $${suggestedPrice}. Pay what you can afford.`
          : `Önerilen: $${suggestedPrice}. Ödeyebileceğiniz kadar ödeyin.`}
      </p>

      {/* Checkout button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-[#C9A227] text-white py-4 px-6 rounded-lg font-bold hover:bg-[#B8922A] transition-colors disabled:opacity-50"
      >
        {isLoading
          ? (isEnglish ? 'Processing...' : 'İşleniyor...')
          : amount === 0
          ? (isEnglish ? 'Get Free Access' : 'Ücretsiz Erişin')
          : (isEnglish ? `Pay $${amount}` : `$${amount} Öde`)}
      </button>
    </div>
  )
}

/**
 * Product card with checkout
 */
export function ProductCard({
  product,
  lang,
}: {
  product: {
    id: string
    slug: string
    name: { en: string; tr: string }
    description: { en: string; tr: string }
    price: number
    stripePriceId: string
    allowFreeAccess: boolean
    features: { en: string[]; tr: string[] }
    popular?: boolean
  }
  lang: 'en' | 'tr'
}) {
  const isEnglish = lang === 'en'

  return (
    <div className={`bg-white rounded-xl border ${product.popular ? 'border-[#C9A227] ring-2 ring-[#C9A227]' : 'border-gray-200'} p-6 relative`}>
      {product.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A227] text-white text-xs font-bold px-3 py-1 rounded-full">
          {isEnglish ? 'POPULAR' : 'POPÜLER'}
        </span>
      )}

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {isEnglish ? product.name.en : product.name.tr}
      </h3>

      <p className="text-gray-600 text-sm mb-4">
        {isEnglish ? product.description.en : product.description.tr}
      </p>

      <ul className="space-y-2 mb-6">
        {(isEnglish ? product.features.en : product.features.tr).map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-green-500 mt-0.5">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="text-2xl font-bold text-gray-900 mb-4">
        ${product.price}
        {product.allowFreeAccess && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            {isEnglish ? 'or free' : 'veya ücretsiz'}
          </span>
        )}
      </div>

      <CheckoutButton
        productId={product.id}
        priceId={product.stripePriceId}
        price={product.price}
        allowFreeAccess={product.allowFreeAccess}
        lang={lang}
      />
    </div>
  )
}
