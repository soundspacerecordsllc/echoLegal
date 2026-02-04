// components/InstitutionalBadge.tsx
// Compact institutional trust signal for all content pages
// Replaces personal attribution with institutional authority signals

import { JurisdictionCode, getJurisdiction, LanguageCode } from '@/lib/jurisdictions'

type InstitutionalBadgeProps = {
  lang: 'en' | 'tr'
  jurisdictions?: JurisdictionCode[]
  lastReviewedAt?: string
  reviewerJurisdiction?: string // e.g., "New York" — displayed abstractly
  className?: string
}

export default function InstitutionalBadge({
  lang,
  jurisdictions = [],
  lastReviewedAt,
  reviewerJurisdiction,
  className = '',
}: InstitutionalBadgeProps) {
  const isEnglish = lang === 'en'

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Determine the primary jurisdiction name for display
  const primaryJurisdictionName = (() => {
    if (reviewerJurisdiction) return reviewerJurisdiction
    if (jurisdictions.length === 0) return null
    const primary = jurisdictions[0]
    const j = getJurisdiction(primary)
    if (!j) return null
    return j.name[lang as LanguageCode] || j.name.en
  })()

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-gray-600 ${className}`}
      role="status"
      aria-label={isEnglish ? 'Content authority information' : 'İçerik otorite bilgisi'}
    >
      {/* Attorney-Reviewed signal */}
      <span className="inline-flex items-center gap-1.5">
        <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-green-700 font-medium">
          {isEnglish ? 'Attorney-Reviewed' : 'Avukat İncelemesinden Geçmiş'}
        </span>
      </span>

      {/* Separator */}
      <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>

      {/* Jurisdiction */}
      {primaryJurisdictionName && (
        <>
          <span className="text-gray-600">
            {primaryJurisdictionName}
          </span>
          <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>
        </>
      )}

      {/* Last Updated */}
      {lastReviewedAt && (
        <span className="text-gray-500">
          {isEnglish ? 'Updated' : 'Güncellendi'} {formatDate(lastReviewedAt)}
        </span>
      )}
    </div>
  )
}

/**
 * Inline variant for use in article headers or compact spaces.
 */
export function InstitutionalBadgeInline({
  lang,
  lastReviewedAt,
  className = '',
}: {
  lang: 'en' | 'tr'
  lastReviewedAt?: string
  className?: string
}) {
  const isEnglish = lang === 'en'

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      <span className="text-green-700">
        {isEnglish
          ? 'Reviewed by a licensed attorney'
          : 'Lisanslı avukat tarafından incelendi'}
      </span>
      {lastReviewedAt && (
        <>
          {' · '}
          {isEnglish ? 'Last updated' : 'Son güncelleme'} {formatDate(lastReviewedAt)}
        </>
      )}
    </p>
  )
}
