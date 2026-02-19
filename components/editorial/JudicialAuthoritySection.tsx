/**
 * JudicialAuthoritySection — institutional version-traceability wrapper.
 *
 * Renders a titled section with a small metadata bar showing:
 *   - Version identifier (e.g. "v1.0")
 *   - Last-reviewed ISO date
 *   - Review status (foundational | under expansion | periodic review)
 *
 * Optionally renders a collapsible "Recent Update" note when a
 * `changeNote` prop is provided.
 *
 * This component does NOT modify or depend on AuthorityLevel,
 * AUTHORITY_LEVEL_WEIGHT, or any middleware. It is a pure
 * presentational wrapper for judicial/authority content sections.
 */

// ── types ──────────────────────────────────────────────────────────────────

export type ReviewStatus = 'foundational' | 'under expansion' | 'periodic review'

export interface JudicialAuthoritySectionProps {
  lang: 'en' | 'tr'
  /** Section title rendered as an <h2> */
  title: { en: string; tr: string }
  /** HTML id for anchor linking */
  id?: string
  /** Version identifier, e.g. "v1.0" */
  version: string
  /** ISO date string of last review, e.g. "2026-02-19" */
  lastReviewed: string
  /** Current editorial review status */
  reviewStatus: ReviewStatus
  /** Optional micro-change log note; renders as a collapsible element */
  changeNote?: string
  /** Section content */
  children: React.ReactNode
  className?: string
}

// ── helpers ─────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<ReviewStatus, { en: string; tr: string }> = {
  foundational: { en: 'Foundational', tr: 'Temel' },
  'under expansion': { en: 'Under Expansion', tr: 'Genişletilme Aşamasında' },
  'periodic review': { en: 'Periodic Review', tr: 'Periyodik İnceleme' },
}

const STATUS_COLORS: Record<ReviewStatus, string> = {
  foundational: 'bg-emerald-50 text-emerald-800',
  'under expansion': 'bg-amber-50 text-amber-800',
  'periodic review': 'bg-blue-50 text-blue-800',
}

// ── component ──────────────────────────────────────────────────────────────

export default function JudicialAuthoritySection({
  lang,
  title,
  id,
  version,
  lastReviewed,
  reviewStatus,
  changeNote,
  children,
  className = '',
}: JudicialAuthoritySectionProps) {
  const isEnglish = lang === 'en'
  const statusLabel = STATUS_LABELS[reviewStatus]
  const statusColor = STATUS_COLORS[reviewStatus]

  return (
    <section id={id} className={`mb-12 ${className}`}>
      <h2 className="text-2xl font-bold text-black mb-3">
        {isEnglish ? title.en : title.tr}
      </h2>

      {/* ── Institutional metadata bar ─────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-3">
        <span>
          <span className="font-medium text-gray-600">
            {isEnglish ? 'Version' : 'Sürüm'}:
          </span>{' '}
          {version}
        </span>
        <span>
          <span className="font-medium text-gray-600">
            {isEnglish ? 'Last Reviewed' : 'Son İnceleme'}:
          </span>{' '}
          {lastReviewed}
        </span>
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColor}`}
        >
          {isEnglish ? statusLabel.en : statusLabel.tr}
        </span>
      </div>

      {/* ── Collapsible change note (micro-change log) ─────────────────── */}
      {changeNote && (
        <details className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <summary className="cursor-pointer select-none bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            {isEnglish ? 'Recent Update' : 'Son Güncelleme'}
          </summary>
          <div className="px-4 py-3 text-sm text-gray-600 leading-relaxed">
            {changeNote}
          </div>
        </details>
      )}

      {/* ── Section content ────────────────────────────────────────────── */}
      {children}
    </section>
  )
}
