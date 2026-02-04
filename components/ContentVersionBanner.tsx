// components/ContentVersionBanner.tsx
// Displays version, revision status, jurisdiction, and review metadata
// for editorial content. Institutional minimalism — no decoration.
//
// Specified in GOVERNANCE_EXECUTION_PLAN.md Section 1.2.3 and Section 4.3.

'use client'

import { JurisdictionCode, LanguageCode, getJurisdiction } from '@/lib/jurisdictions'
import { RevisionEntry, RevisionType, ContentTypeKey, CANONICAL_TYPE_LABELS } from '@/lib/content-schema'

// ============================================
// TYPES
// ============================================

type ContentVersionBannerProps = {
  lang: 'en' | 'tr'

  // Version & revision
  version?: string
  revisionHistory?: RevisionEntry[]
  lastSubstantiveRevision?: RevisionEntry

  // Dates
  lastModifiedAt?: string             // ISO date
  lastReviewedAt?: string             // ISO date
  firstPublishedAt?: string           // ISO date

  // Scope
  primaryJurisdiction?: JurisdictionCode
  contentType?: ContentTypeKey

  // Review status
  isReviewed?: boolean

  // Display
  className?: string
  showRevisionNotice?: boolean        // Show substantive revision banner (default: true)
  showMetadataRow?: boolean           // Show version/date/jurisdiction row (default: true)
}

// ============================================
// HELPERS
// ============================================

const REVISION_TYPE_LABELS: Record<RevisionType, { en: string; tr: string }> = {
  substantive: { en: 'Substantive revision', tr: 'Esaslı revizyon' },
  correction: { en: 'Correction', tr: 'Düzeltme' },
  editorial: { en: 'Editorial update', tr: 'Editöryal güncelleme' },
  'translation-update': { en: 'Translation update', tr: 'Çeviri güncellemesi' },
}

function formatDate(dateString: string, lang: 'en' | 'tr'): string {
  return new Date(dateString).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatDateShort(dateString: string, lang: 'en' | 'tr'): string {
  return new Date(dateString).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Find the most recent substantive or correction revision.
 */
function findLastSubstantiveRevision(
  history: RevisionEntry[]
): RevisionEntry | undefined {
  const sorted = [...history].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return sorted.find(r => r.type === 'substantive' || r.type === 'correction')
}

// ============================================
// COMPONENT
// ============================================

export default function ContentVersionBanner({
  lang,
  version,
  revisionHistory = [],
  lastSubstantiveRevision,
  lastModifiedAt,
  lastReviewedAt,
  firstPublishedAt,
  primaryJurisdiction,
  contentType,
  isReviewed,
  className = '',
  showRevisionNotice = true,
  showMetadataRow = true,
}: ContentVersionBannerProps) {
  const isEnglish = lang === 'en'

  // Resolve the most recent substantive revision
  const substantiveRevision =
    lastSubstantiveRevision || findLastSubstantiveRevision(revisionHistory)

  // Determine if the content has been revised at all (version > 1.0)
  const isRevised = substantiveRevision != null || (version != null && version !== '1.0')

  // Jurisdiction display name
  const jurisdictionName = (() => {
    if (!primaryJurisdiction) return null
    const j = getJurisdiction(primaryJurisdiction)
    if (!j) return null
    return j.name[lang as LanguageCode] || j.name.en
  })()

  // Content type label
  const typeLabel = contentType
    ? CANONICAL_TYPE_LABELS[contentType]?.[lang] || null
    : null

  // Nothing to show
  if (!showRevisionNotice && !showMetadataRow) return null
  if (!version && !lastModifiedAt && !lastReviewedAt && !firstPublishedAt) return null

  return (
    <div className={`text-sm ${className}`}>
      {/* Substantive revision notice */}
      {showRevisionNotice && isRevised && substantiveRevision && (
        <div
          className="border border-gray-200 rounded px-4 py-3 mb-3 bg-gray-50"
          role="status"
          aria-label={
            isEnglish
              ? 'Content revision notice'
              : 'İçerik revizyon bildirimi'
          }
        >
          <p className="text-gray-700">
            {isEnglish ? (
              <>
                This entry was last substantively revised on{' '}
                <span className="font-medium">
                  {formatDate(substantiveRevision.date, lang)}
                </span>
                .
              </>
            ) : (
              <>
                Bu madde en son{' '}
                <span className="font-medium">
                  {formatDate(substantiveRevision.date, lang)}
                </span>
                {' '}tarihinde esaslı olarak revize edilmiştir.
              </>
            )}
          </p>
          {substantiveRevision.summary && (
            <p className="text-gray-500 mt-1">
              {REVISION_TYPE_LABELS[substantiveRevision.type]?.[lang]}
              {': '}
              {substantiveRevision.summary}
            </p>
          )}
        </div>
      )}

      {/* Metadata row: version · type · jurisdiction · dates · review status */}
      {showMetadataRow && (
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500"
          role="status"
          aria-label={
            isEnglish
              ? 'Content version information'
              : 'İçerik sürüm bilgisi'
          }
        >
          {/* Version */}
          {version && (
            <span className="font-mono text-xs text-gray-400">
              v{version}
            </span>
          )}

          {/* Content type */}
          {typeLabel && (
            <>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>
              <span>{typeLabel}</span>
            </>
          )}

          {/* Jurisdiction */}
          {jurisdictionName && (
            <>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>
              <span>{jurisdictionName}</span>
            </>
          )}

          {/* Published date */}
          {firstPublishedAt && (
            <>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>
              <span>
                {isEnglish ? 'Published' : 'Yayınlandı'}{' '}
                {formatDateShort(firstPublishedAt, lang)}
              </span>
            </>
          )}

          {/* Last modified */}
          {lastModifiedAt && (
            <>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>
              <span>
                {isEnglish ? 'Updated' : 'Güncellendi'}{' '}
                {formatDateShort(lastModifiedAt, lang)}
              </span>
            </>
          )}

          {/* Review status */}
          {isReviewed && lastReviewedAt && (
            <>
              <span className="text-gray-300 hidden sm:inline" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-green-700">
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {isEnglish ? 'Reviewed' : 'İncelendi'}{' '}
                {formatDateShort(lastReviewedAt, lang)}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================
// COMPACT VARIANT
// ============================================

/**
 * Compact single-line version banner for use in content cards or lists.
 * Shows version and last modified date only.
 */
export function ContentVersionBannerCompact({
  lang,
  version,
  lastModifiedAt,
  className = '',
}: {
  lang: 'en' | 'tr'
  version?: string
  lastModifiedAt?: string
  className?: string
}) {
  if (!version && !lastModifiedAt) return null

  return (
    <span className={`inline-flex items-center gap-2 text-xs text-gray-400 ${className}`}>
      {version && (
        <span className="font-mono">v{version}</span>
      )}
      {lastModifiedAt && (
        <span>
          {formatDateShort(lastModifiedAt, lang)}
        </span>
      )}
    </span>
  )
}

// ============================================
// RETRACTION BANNER
// ============================================

/**
 * Banner for retracted or archived content.
 * Displayed prominently at the top of the page.
 */
export function ContentRetractionBanner({
  lang,
  status,
  reason,
  replacementUrl,
  correctionUrl,
  className = '',
}: {
  lang: 'en' | 'tr'
  status: 'archived' | 'retracted'
  reason?: string
  replacementUrl?: string
  correctionUrl?: string
  className?: string
}) {
  const isEnglish = lang === 'en'
  const isRetracted = status === 'retracted'

  return (
    <div
      className={`border rounded px-4 py-3 ${
        isRetracted
          ? 'border-red-200 bg-red-50'
          : 'border-amber-200 bg-amber-50'
      } ${className}`}
      role="alert"
    >
      <p className={`font-medium ${isRetracted ? 'text-red-800' : 'text-amber-800'}`}>
        {isRetracted
          ? isEnglish
            ? 'This entry has been retracted.'
            : 'Bu madde geri çekilmiştir.'
          : isEnglish
            ? 'This entry has been archived.'
            : 'Bu madde arşivlenmiştir.'}
      </p>
      {reason && (
        <p className={`mt-1 text-sm ${isRetracted ? 'text-red-700' : 'text-amber-700'}`}>
          {reason}
        </p>
      )}
      {correctionUrl && (
        <p className="mt-2 text-sm">
          <a
            href={correctionUrl}
            className={`underline ${isRetracted ? 'text-red-700' : 'text-amber-700'}`}
          >
            {isEnglish ? 'View correction notice' : 'Düzeltme bildirimini görüntüle'}
          </a>
        </p>
      )}
      {replacementUrl && (
        <p className="mt-2 text-sm">
          <a
            href={replacementUrl}
            className={`underline ${isRetracted ? 'text-red-700' : 'text-amber-700'}`}
          >
            {isEnglish ? 'View current version' : 'Güncel sürümü görüntüle'}
          </a>
        </p>
      )}
    </div>
  )
}
