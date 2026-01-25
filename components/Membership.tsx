'use client'

/**
 * Membership Components
 * Pricing tables, premium content gates, and member management
 */

import { useState } from 'react'
import { membershipTiers, type MembershipTier } from '@/lib/membership'

interface MembershipPricingProps {
  lang: 'en' | 'tr'
  showAnnual?: boolean
}

interface PremiumGateProps {
  lang: 'en' | 'tr'
  contentTitle: string
  contentTitleTr: string
  requiredTier?: 'supporter' | 'professional'
}

interface MemberBadgeProps {
  tier: string
  lang: 'en' | 'tr'
}

/**
 * Membership pricing table
 */
export function MembershipPricing({ lang, showAnnual = false }: MembershipPricingProps) {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month')
  const isEnglish = lang === 'en'

  const displayTiers = membershipTiers.filter((tier) => {
    if (tier.id === 'free') return true
    if (billingInterval === 'year') {
      return tier.interval === 'year' || (tier.interval === 'month' && !tier.id.includes('annual'))
    }
    return tier.interval === 'month' && !tier.id.includes('annual')
  })

  const handleSubscribe = async (tier: MembershipTier) => {
    if (tier.price === 0) {
      // Free tier - just redirect to signup
      window.location.href = `/${lang}/signup`
      return
    }

    try {
      const response = await fetch('/api/membership/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: tier.id,
          priceId: tier.stripePriceId,
          lang,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert(isEnglish ? 'Failed to start subscription.' : 'Abonelik başlatılamadı.')
    }
  }

  return (
    <div>
      {/* Billing Toggle */}
      {showAnnual && (
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setBillingInterval('month')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingInterval === 'month'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isEnglish ? 'Monthly' : 'Aylık'}
            </button>
            <button
              onClick={() => setBillingInterval('year')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingInterval === 'year'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isEnglish ? 'Annual' : 'Yıllık'}
              <span className="ml-1 text-green-600 text-xs">
                {isEnglish ? 'Save 20%' : '%20 Tasarruf'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {displayTiers.slice(0, 3).map((tier) => (
          <div
            key={tier.id}
            className={`bg-white rounded-xl border ${
              tier.popular
                ? 'border-[#C9A227] ring-2 ring-[#C9A227]'
                : 'border-gray-200'
            } p-6 relative`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A227] text-white text-xs font-bold px-3 py-1 rounded-full">
                {isEnglish ? 'MOST POPULAR' : 'EN POPÜLER'}
              </span>
            )}

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {isEnglish ? tier.name : tier.nameTr}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {isEnglish ? tier.description : tier.descriptionTr}
            </p>

            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900">
                ${tier.price}
              </span>
              {tier.price > 0 && (
                <span className="text-gray-500 ml-1">
                  /{tier.interval === 'month'
                    ? (isEnglish ? 'mo' : 'ay')
                    : (isEnglish ? 'yr' : 'yıl')}
                </span>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {(isEnglish ? tier.features : tier.featuresTr).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(tier)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                tier.popular
                  ? 'bg-[#C9A227] text-white hover:bg-[#B8922A]'
                  : tier.price === 0
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {tier.price === 0
                ? (isEnglish ? 'Get Started' : 'Başlayın')
                : tier.trialDays
                ? (isEnglish ? `Start ${tier.trialDays}-Day Trial` : `${tier.trialDays} Gün Deneme Başlat`)
                : (isEnglish ? 'Subscribe' : 'Abone Ol')}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Premium content gate
 */
export function PremiumGate({
  lang,
  contentTitle,
  contentTitleTr,
  requiredTier = 'supporter',
}: PremiumGateProps) {
  const isEnglish = lang === 'en'

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-8 text-center">
      <div className="text-4xl mb-4">🔒</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {isEnglish ? 'Premium Content' : 'Premium İçerik'}
      </h3>
      <p className="text-gray-600 mb-4">
        {isEnglish
          ? `"${contentTitle}" is available to ${requiredTier === 'professional' ? 'Professional' : 'Supporter'} members.`
          : `"${contentTitleTr}" ${requiredTier === 'professional' ? 'Profesyonel' : 'Destekçi'} üyelere açıktır.`}
      </p>
      <div className="space-y-2">
        <a
          href={`/${lang}/membership`}
          className="inline-block bg-[#C9A227] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
        >
          {isEnglish ? 'Become a Member' : 'Üye Olun'}
        </a>
        <p className="text-sm text-gray-500">
          {isEnglish
            ? 'Already a member? '
            : 'Zaten üye misiniz? '}
          <a href={`/${lang}/login`} className="text-[#C9A227] hover:underline">
            {isEnglish ? 'Log in' : 'Giriş yapın'}
          </a>
        </p>
      </div>
    </div>
  )
}

/**
 * Member badge component
 */
export function MemberBadge({ tier, lang }: MemberBadgeProps) {
  const isEnglish = lang === 'en'

  const badgeStyles: Record<string, { bg: string; text: string; label: string; labelTr: string }> = {
    supporter: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      label: 'Supporter',
      labelTr: 'Destekçi',
    },
    professional: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      label: 'Professional',
      labelTr: 'Profesyonel',
    },
    'supporter-annual': {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      label: 'Supporter',
      labelTr: 'Destekçi',
    },
  }

  const style = badgeStyles[tier] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Free', labelTr: 'Ücretsiz' }

  return (
    <span className={`inline-flex items-center gap-1 ${style.bg} ${style.text} text-xs font-semibold px-2 py-1 rounded-full`}>
      <span>⭐</span>
      {isEnglish ? style.label : style.labelTr}
    </span>
  )
}

/**
 * Member dashboard component
 */
export function MemberDashboard({
  member,
  lang,
}: {
  member: {
    email: string
    tier: string
    status: string
    currentPeriodEnd: string
  }
  lang: 'en' | 'tr'
}) {
  const isEnglish = lang === 'en'

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/membership/portal', {
        method: 'POST',
      })
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Portal error:', error)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isEnglish ? 'Membership' : 'Üyelik'}
        </h2>
        <MemberBadge tier={member.tier} lang={lang} />
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <span className="text-sm text-gray-500">{isEnglish ? 'Email' : 'E-posta'}</span>
          <p className="text-gray-900">{member.email}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">{isEnglish ? 'Status' : 'Durum'}</span>
          <p className="text-gray-900 capitalize">{member.status}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">
            {isEnglish ? 'Current Period Ends' : 'Mevcut Dönem Bitiş'}
          </span>
          <p className="text-gray-900">
            {new Date(member.currentPeriodEnd).toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR')}
          </p>
        </div>
      </div>

      <button
        onClick={handleManageSubscription}
        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
      >
        {isEnglish ? 'Manage Subscription' : 'Aboneliği Yönet'}
      </button>
    </div>
  )
}
