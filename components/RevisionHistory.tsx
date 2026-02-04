// components/RevisionHistory.tsx
// Revision history timeline for content pages.
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 2.5 and Section 4.3:
// Every content entry tracks revisionHistory. Version history is publicly
// accessible. Renders as an expandable section on content pages.

'use client'

import { useState } from 'react'
import { RevisionEntry, RevisionType } from '@/lib/content-schema'

// ============================================
// TYPES
// ============================================

type RevisionHistoryProps = {
  lang: 'en' | 'tr'
  revisionHistory: RevisionEntry[]
  currentVersion?: string
  className?: string
  defaultExpanded?: boolean
  maxCollapsedEntries?: number    // Show this many when collapsed (default: 3)
}

// ============================================
// LABELS
// ============================================

const REVISION_TYPE_LABELS: Record<RevisionType, { en: string; tr: string }> = {
  substantive: { en: 'Substantive revision', tr: 'Esasl\u0131 revizyon' },
  correction: { en: 'Correction', tr: 'D\u00FCzeltme' },
  editorial: { en: 'Editorial update', tr: 'Edit\u00F6ryal g\u00FCncelleme' },
  'translation-update': { en: 'Translation update', tr: '\u00C7eviri g\u00FCncellemesi' },
}

const REVISION_TYPE_COLORS: Record<RevisionType, string> = {
  substantive: 'bg-blue-100 text-blue-700',
  correction: 'bg-amber-100 text-amber-700',
  editorial: 'bg-gray-100 text-gray-600',
  'translation-update': 'bg-green-100 text-green-700',
}

// ============================================
// HELPERS
// ============================================

function formatDate(dateString: string, lang: 'en' | 'tr'): string {
  return new Date(dateString).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function sortByDateDesc(entries: RevisionEntry[]): RevisionEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

// ============================================
// COMPONENT
// ============================================

export default function RevisionHistory({
  lang,
  revisionHistory,
  currentVersion,
  className = '',
  defaultExpanded = false,
  maxCollapsedEntries = 3,
}: RevisionHistoryProps) {
  const isEnglish = lang === 'en'
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  if (revisionHistory.length === 0) return null

  const sorted = sortByDateDesc(revisionHistory)
  const hasMore = sorted.length > maxCollapsedEntries
  const displayed = isExpanded ? sorted : sorted.slice(0, maxCollapsedEntries)

  return (
    <section
      className={`${className}`}
      aria-label={isEnglish ? 'Revision history' : 'Revizyon ge\u00E7mi\u015Fi'}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          {isEnglish ? 'Revision History' : 'Revizyon Ge\u00E7mi\u015Fi'}
        </h3>
        {currentVersion && (
          <span className="font-mono text-xs text-gray-400">
            v{currentVersion}
          </span>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200"
          aria-hidden="true"
        />

        <ul className="space-y-4">
          {displayed.map((entry, index) => (
            <li key={`${entry.version}-${entry.date}`} className="relative pl-6">
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                  index === 0
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white'
                }`}
                aria-hidden="true"
              />

              {/* Entry content */}
              <div>
                {/* Version and type badge */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-gray-500">
                    v{entry.version}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs font-medium ${REVISION_TYPE_COLORS[entry.type]}`}
                  >
                    {REVISION_TYPE_LABELS[entry.type][lang]}
                  </span>
                </div>

                {/* Date */}
                <p className="text-sm text-gray-500 mb-0.5">
                  {formatDate(entry.date, lang)}
                </p>

                {/* Summary */}
                {entry.summary && (
                  <p className="text-sm text-gray-700">
                    {entry.summary}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Show more / less toggle */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isExpanded
            ? (isEnglish ? 'Show less' : 'Daha az g\u00F6ster')
            : (isEnglish
                ? `Show all ${sorted.length} revisions`
                : `T\u00FCm ${sorted.length} revizyonu g\u00F6ster`)}
        </button>
      )}
    </section>
  )
}

// ============================================
// COMPACT VARIANT
// ============================================

/**
 * Single-line revision summary for content cards.
 * Shows the latest revision type and date.
 */
export function RevisionHistoryCompact({
  lang,
  revisionHistory,
  className = '',
}: {
  lang: 'en' | 'tr'
  revisionHistory: RevisionEntry[]
  className?: string
}) {
  if (revisionHistory.length === 0) return null

  const latest = sortByDateDesc(revisionHistory)[0]

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-gray-400 ${className}`}>
      <span
        className={`px-1 py-0.5 rounded text-xs ${REVISION_TYPE_COLORS[latest.type]}`}
      >
        {REVISION_TYPE_LABELS[latest.type][lang]}
      </span>
      <span>{formatDate(latest.date, lang)}</span>
    </span>
  )
}

// ============================================
// FULL PAGE VARIANT
// ============================================

/**
 * Full revision history page component.
 * Renders a complete timeline with all entries expanded.
 * Suitable for a dedicated /history route.
 */
export function RevisionHistoryPage({
  lang,
  title,
  revisionHistory,
  currentVersion,
  className = '',
}: {
  lang: 'en' | 'tr'
  title: string
  revisionHistory: RevisionEntry[]
  currentVersion?: string
  className?: string
}) {
  const isEnglish = lang === 'en'

  if (revisionHistory.length === 0) {
    return (
      <div className={`max-w-2xl mx-auto ${className}`}>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isEnglish ? 'Revision History' : 'Revizyon Ge\u00E7mi\u015Fi'}
        </h1>
        <p className="text-gray-500 mb-8">{title}</p>
        <p className="text-gray-400">
          {isEnglish
            ? 'No revision history available for this entry.'
            : 'Bu madde i\u00E7in revizyon ge\u00E7mi\u015Fi bulunmamaktad\u0131r.'}
        </p>
      </div>
    )
  }

  const sorted = sortByDateDesc(revisionHistory)

  // Count by type
  const counts: Record<string, number> = {}
  sorted.forEach(entry => {
    counts[entry.type] = (counts[entry.type] || 0) + 1
  })

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Page header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {isEnglish ? 'Revision History' : 'Revizyon Ge\u00E7mi\u015Fi'}
      </h1>
      <p className="text-gray-500 mb-2">{title}</p>

      {/* Summary stats */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
        {currentVersion && (
          <span className="font-mono text-xs text-gray-400">
            {isEnglish ? 'Current version:' : 'Mevcut s\u00FCr\u00FCm:'} v{currentVersion}
          </span>
        )}
        <span className="text-gray-300 hidden sm:inline" aria-hidden="true">\u00B7</span>
        <span>
          {sorted.length} {isEnglish ? 'revisions' : 'revizyon'}
        </span>
        {counts.substantive && counts.substantive > 0 && (
          <>
            <span className="text-gray-300 hidden sm:inline" aria-hidden="true">\u00B7</span>
            <span>
              {counts.substantive} {isEnglish ? 'substantive' : 'esasl\u0131'}
            </span>
          </>
        )}
      </div>

      {/* Full timeline */}
      <RevisionHistory
        lang={lang}
        revisionHistory={revisionHistory}
        currentVersion={currentVersion}
        defaultExpanded={true}
        maxCollapsedEntries={sorted.length}
      />
    </div>
  )
}
