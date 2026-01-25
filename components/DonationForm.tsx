'use client'

/**
 * Donation Form Component
 * Allows users to support EchoLegal with one-time or recurring donations
 */

import { useState } from 'react'

interface DonationFormProps {
  lang: 'en' | 'tr'
  variant?: 'full' | 'compact' | 'inline'
  suggestedAmounts?: number[]
  defaultAmount?: number
}

const defaultSuggestedAmounts = [5, 10, 20, 50]

/**
 * Full donation form with all options
 */
export function DonationForm({
  lang,
  variant = 'full',
  suggestedAmounts = defaultSuggestedAmounts,
  defaultAmount = 20,
}: DonationFormProps) {
  const [amount, setAmount] = useState(defaultAmount)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isEnglish = lang === 'en'

  const handleAmountSelect = (amt: number) => {
    setAmount(amt)
    setIsCustom(false)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setIsCustom(true)
    const parsed = parseFloat(value)
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed)
    }
  }

  const handleDonate = async () => {
    if (amount <= 0) {
      alert(isEnglish ? 'Please enter a valid amount.' : 'Lütfen geçerli bir tutar girin.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email: email || undefined,
          message: message || undefined,
          recurring: isRecurring,
          lang,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Donation error:', error)
      alert(isEnglish ? 'Failed to process donation.' : 'Bağış işlenemedi.')
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <span className="text-2xl">💝</span>
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            {isEnglish
              ? 'Support free legal education'
              : 'Ücretsiz hukuki eğitimi destekleyin'}
          </p>
        </div>
        <a
          href={`/${lang}/donate`}
          className="bg-[#C9A227] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8922A] transition-colors"
        >
          {isEnglish ? 'Donate' : 'Bağış Yap'}
        </a>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>💝</span>
          {isEnglish ? 'Support EchoLegal' : 'EchoLegal\'i Destekleyin'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {isEnglish
            ? 'Help us keep legal resources free and accessible.'
            : 'Hukuki kaynakları ücretsiz ve erişilebilir tutmamıza yardımcı olun.'}
        </p>

        <div className="flex gap-2 mb-4">
          {suggestedAmounts.slice(0, 3).map((amt) => (
            <button
              key={amt}
              onClick={() => handleAmountSelect(amt)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                amount === amt && !isCustom
                  ? 'bg-[#C9A227] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        <button
          onClick={handleDonate}
          disabled={isLoading}
          className="w-full bg-[#C9A227] text-white py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors disabled:opacity-50"
        >
          {isLoading
            ? '...'
            : (isEnglish ? `Donate $${amount}` : `$${amount} Bağışla`)}
        </button>
      </div>
    )
  }

  // Full variant
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <span className="text-5xl mb-4 block">💝</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isEnglish ? 'Support EchoLegal' : 'EchoLegal\'i Destekleyin'}
        </h2>
        <p className="text-gray-600">
          {isEnglish
            ? 'Your donation helps us provide free legal resources to everyone.'
            : 'Bağışınız, herkese ücretsiz hukuki kaynaklar sunmamıza yardımcı olur.'}
        </p>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isEnglish ? 'Select Amount' : 'Tutar Seçin'}
        </label>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {suggestedAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => handleAmountSelect(amt)}
              className={`py-3 rounded-lg font-medium transition-colors ${
                amount === amt && !isCustom
                  ? 'bg-[#C9A227] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            min="1"
            step="1"
            placeholder={isEnglish ? 'Custom amount' : 'Özel tutar'}
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent ${
              isCustom ? 'border-[#C9A227]' : 'border-gray-300'
            }`}
          />
        </div>
      </div>

      {/* Recurring Option */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-[#C9A227] focus:ring-[#C9A227]"
          />
          <span className="text-sm text-gray-700">
            {isEnglish
              ? 'Make this a monthly donation'
              : 'Bunu aylık bağış yapın'}
          </span>
        </label>
      </div>

      {/* Optional Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isEnglish ? 'Email (optional)' : 'E-posta (isteğe bağlı)'}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isEnglish ? 'For receipt' : 'Makbuz için'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
        />
      </div>

      {/* Optional Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isEnglish ? 'Message (optional)' : 'Mesaj (isteğe bağlı)'}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isEnglish ? 'Leave a note...' : 'Bir not bırakın...'}
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent resize-none"
        />
      </div>

      {/* Donate Button */}
      <button
        onClick={handleDonate}
        disabled={isLoading || amount <= 0}
        className="w-full bg-[#C9A227] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#B8922A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading
          ? (isEnglish ? 'Processing...' : 'İşleniyor...')
          : isRecurring
          ? (isEnglish ? `Donate $${amount}/month` : `Aylık $${amount} Bağışla`)
          : (isEnglish ? `Donate $${amount}` : `$${amount} Bağışla`)}
      </button>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-4 text-xs text-gray-500">
        <span>🔒 {isEnglish ? 'Secure' : 'Güvenli'}</span>
        <span>💳 Stripe</span>
        <span>🌍 {isEnglish ? 'Tax info available' : 'Vergi bilgisi mevcut'}</span>
      </div>

      {/* Free Access Note */}
      <p className="text-center text-sm text-gray-500 mt-4">
        {isEnglish
          ? 'All content remains free. Donations are entirely optional.'
          : 'Tüm içerik ücretsiz kalır. Bağışlar tamamen isteğe bağlıdır.'}
      </p>
    </div>
  )
}

/**
 * Donation CTA Banner for pages
 */
export function DonationBanner({ lang }: { lang: 'en' | 'tr' }) {
  const isEnglish = lang === 'en'

  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-6 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl">💝</span>
          <div>
            <h3 className="font-bold text-lg">
              {isEnglish ? 'Support Free Legal Education' : 'Ücretsiz Hukuki Eğitimi Destekleyin'}
            </h3>
            <p className="text-amber-100 text-sm">
              {isEnglish
                ? 'Help us keep EchoLegal free and accessible to everyone.'
                : 'EchoLegal\'in herkes için ücretsiz ve erişilebilir kalmasına yardımcı olun.'}
            </p>
          </div>
        </div>
        <a
          href={`/${lang}/donate`}
          className="bg-white text-amber-600 px-6 py-3 rounded-lg font-bold hover:bg-amber-50 transition-colors flex-shrink-0"
        >
          {isEnglish ? 'Make a Donation' : 'Bağış Yapın'}
        </a>
      </div>
    </div>
  )
}

/**
 * Thank You component for successful donations
 */
export function DonationThankYou({
  lang,
  amount,
  isRecurring,
}: {
  lang: 'en' | 'tr'
  amount: number
  isRecurring: boolean
}) {
  const isEnglish = lang === 'en'

  return (
    <div className="text-center py-16 px-8">
      <span className="text-6xl block mb-6">🎉</span>
      <h1 className="text-4xl font-black text-gray-900 mb-4">
        {isEnglish ? 'Thank You!' : 'Teşekkürler!'}
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        {isRecurring
          ? (isEnglish
            ? `Your monthly donation of $${amount} helps us continue our mission.`
            : `Aylık $${amount} bağışınız misyonumuza devam etmemize yardımcı oluyor.`)
          : (isEnglish
            ? `Your donation of $${amount} makes a real difference.`
            : `$${amount} bağışınız gerçek bir fark yaratıyor.`)}
      </p>
      <a
        href={`/${lang}`}
        className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#B8922A] transition-colors"
      >
        {isEnglish ? 'Return to EchoLegal' : 'EchoLegal\'e Dön'}
      </a>
    </div>
  )
}
