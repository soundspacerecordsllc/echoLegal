'use client'

/**
 * Affiliate Link Components
 * Reusable components for embedding affiliate links with proper tracking and disclosure
 */

import { getAffiliateLink, generateTrackingUrl, type AffiliateLink as AffiliateLinkType } from '@/lib/affiliate'

interface AffiliateLinkProps {
  id: string
  lang: 'en' | 'tr'
  source?: string
  className?: string
  children?: React.ReactNode
  variant?: 'text' | 'button' | 'card'
}

interface AffiliateCardProps {
  id: string
  lang: 'en' | 'tr'
  source?: string
  showDescription?: boolean
}

interface AffiliateButtonProps {
  id: string
  lang: 'en' | 'tr'
  source?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Basic affiliate text link
 */
export function AffiliateTextLink({
  id,
  lang,
  source = 'content',
  className = '',
  children,
}: AffiliateLinkProps) {
  const link = getAffiliateLink(id)
  if (!link) return null

  const isEnglish = lang === 'en'
  const trackingUrl = generateTrackingUrl(link, source)

  return (
    <a
      href={trackingUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`text-blue-600 hover:text-blue-800 underline ${className}`}
      data-affiliate={id}
    >
      {children || (isEnglish ? link.name : link.nameTr)}
    </a>
  )
}

/**
 * Affiliate button link
 */
export function AffiliateButton({
  id,
  lang,
  source = 'button',
  className = '',
  children,
}: AffiliateButtonProps) {
  const link = getAffiliateLink(id)
  if (!link) return null

  const isEnglish = lang === 'en'
  const trackingUrl = generateTrackingUrl(link, source)

  return (
    <a
      href={trackingUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-block bg-[#C9A227] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors ${className}`}
      data-affiliate={id}
    >
      {children || (isEnglish ? `Get ${link.name}` : `${link.nameTr} Edinin`)}
    </a>
  )
}

/**
 * Affiliate card with full details
 */
export function AffiliateCard({
  id,
  lang,
  source = 'card',
  showDescription = true,
}: AffiliateCardProps) {
  const link = getAffiliateLink(id)
  if (!link) return null

  const isEnglish = lang === 'en'
  const trackingUrl = generateTrackingUrl(link, source)

  return (
    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {isEnglish ? link.name : link.nameTr}
        </h3>
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
          {isEnglish ? 'Partner' : 'Ortak'}
        </span>
      </div>

      {showDescription && (
        <p className="text-gray-600 text-sm mb-4">
          {isEnglish ? link.description : link.descriptionTr}
        </p>
      )}

      <a
        href={trackingUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block bg-[#C9A227] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B8922A] transition-colors"
        data-affiliate={id}
      >
        {isEnglish ? 'Learn More' : 'Daha Fazla Bilgi'} →
      </a>
    </div>
  )
}

/**
 * Affiliate cards grid
 */
export function AffiliateCardsGrid({
  ids,
  lang,
  source = 'grid',
}: {
  ids: string[]
  lang: 'en' | 'tr'
  source?: string
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ids.map((id) => (
        <AffiliateCard key={id} id={id} lang={lang} source={source} />
      ))}
    </div>
  )
}

/**
 * Inline affiliate recommendation
 */
export function AffiliateRecommendation({
  id,
  lang,
  source = 'recommendation',
}: {
  id: string
  lang: 'en' | 'tr'
  source?: string
}) {
  const link = getAffiliateLink(id)
  if (!link) return null

  const isEnglish = lang === 'en'
  const trackingUrl = generateTrackingUrl(link, source)

  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4 my-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-600">💡</span>
        <span className="text-sm font-semibold text-amber-800">
          {isEnglish ? 'Recommended' : 'Önerilen'}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-3">
        {isEnglish ? link.description : link.descriptionTr}
      </p>
      <a
        href={trackingUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="text-sm font-semibold text-amber-700 hover:text-amber-900 underline"
        data-affiliate={id}
      >
        {isEnglish ? `Try ${link.name}` : `${link.nameTr}'i Deneyin`} →
      </a>
    </div>
  )
}
