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
      <span className="font-medium text-muted">
        {isEnglish ? 'Attorney-Reviewed' : 'Avukat İncelemesinden Geçmiş'}
      </span>

      {primaryJurisdictionName && (
        <>
          <span className="text-stone-300 hidden sm:inline" aria-hidden="true">&middot;</span>
          <span className="text-muted">
            {primaryJurisdictionName}
          </span>
        </>
      )}

      {lastReviewedAt && (
        <>
          <span className="text-stone-300 hidden sm:inline" aria-hidden="true">&middot;</span>
          <span className="text-muted">
            {isEnglish ? 'Updated' : 'Güncellendi'} {formatDate(lastReviewedAt)}
          </span>
        </>
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
      <span className="text-muted font-medium">
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
