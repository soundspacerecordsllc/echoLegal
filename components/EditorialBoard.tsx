// components/EditorialBoard.tsx
// Editorial Board component displaying reviewing attorneys and review dates
// Designed to meet Big Law / Legal Encyclopedia credibility standards

import { getCanonicalAuthor, getEditorialTeam, Contributor } from '@/lib/contributors'

type EditorialBoardProps = {
  lang: 'en' | 'tr'
  lastReviewed?: string // ISO date string
  nextReview?: string // ISO date string
  className?: string
  variant?: 'full' | 'compact' | 'inline'
}

/**
 * EditorialBoard Component
 *
 * Displays the editorial board and review dates for content credibility.
 * Follows big-law firm and legal publisher standards.
 */
export default function EditorialBoard({
  lang,
  lastReviewed,
  nextReview,
  className = '',
  variant = 'full',
}: EditorialBoardProps) {
  const author = getCanonicalAuthor()
  const team = getEditorialTeam()
  const isEnglish = lang === 'en'

  if (variant === 'inline') {
    return (
      <EditorialBoardInline
        author={author}
        team={team}
        lang={lang}
        lastReviewed={lastReviewed}
        className={className}
      />
    )
  }

  if (variant === 'compact') {
    return (
      <EditorialBoardCompact
        author={author}
        team={team}
        lang={lang}
        lastReviewed={lastReviewed}
        className={className}
      />
    )
  }

  return (
    <EditorialBoardFull
      author={author}
      team={team}
      lang={lang}
      lastReviewed={lastReviewed}
      nextReview={nextReview}
      className={className}
    />
  )
}

/**
 * Full Editorial Board - For about pages and detailed attribution
 */
function EditorialBoardFull({
  author,
  team,
  lang,
  lastReviewed,
  nextReview,
  className,
}: {
  author: Contributor
  team: Contributor
  lang: 'en' | 'tr'
  lastReviewed?: string
  nextReview?: string
  className: string
}) {
  const isEnglish = lang === 'en'

  return (
    <section className={`bg-gray-50 rounded-lg p-6 md:p-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-gray-900" />
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {isEnglish ? 'Editorial Board' : 'Yayın Kurulu'}
        </h2>
      </div>

      {/* Board Members */}
      <div className="space-y-6">
        {/* Primary Reviewing Attorney */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-900 text-white rounded flex items-center justify-center text-lg font-semibold flex-shrink-0">
            {author.initials}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {author.name[lang]}
              {author.isAttorney && ', Esq.'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish ? 'Reviewing Attorney' : 'İnceleme Avukatı'}
            </p>
            {author.barAdmissions && author.barAdmissions.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {isEnglish
                  ? `Admitted in ${author.barAdmissions[0].jurisdictionName}`
                  : `${author.barAdmissions[0].jurisdictionName} Barosu`}
              </p>
            )}
          </div>
        </div>

        {/* Editorial Team */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-200 text-gray-700 rounded flex items-center justify-center text-lg font-semibold flex-shrink-0">
            {team.initials}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{team.name[lang]}</h3>
            <p className="text-sm text-gray-600">
              {isEnglish ? 'Content Research & Drafting' : 'İçerik Araştırma ve Hazırlık'}
            </p>
          </div>
        </div>
      </div>

      {/* Review Dates */}
      {(lastReviewed || nextReview) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {lastReviewed && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  {isEnglish ? 'Last Reviewed' : 'Son İnceleme'}
                </p>
                <p className="text-gray-900">{formatDate(lastReviewed, lang)}</p>
              </div>
            )}
            {nextReview && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  {isEnglish ? 'Next Scheduled Review' : 'Sonraki Planlı İnceleme'}
                </p>
                <p className="text-gray-900">{formatDate(nextReview, lang)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Editorial Standards Note */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          {isEnglish
            ? 'All substantive legal content on EchoLegal is reviewed by licensed attorneys. Content is updated periodically to reflect changes in law and practice. Review dates indicate when content was last verified for accuracy.'
            : 'EchoLegal\'daki tüm esaslı hukuki içerikler lisanslı avukatlar tarafından incelenir. İçerikler, hukuk ve uygulamadaki değişiklikleri yansıtacak şekilde periyodik olarak güncellenir. İnceleme tarihleri, içeriğin doğruluğunun en son ne zaman doğrulandığını gösterir.'}
        </p>
      </div>
    </section>
  )
}

/**
 * Compact Editorial Board - For sidebar or article footer
 */
function EditorialBoardCompact({
  author,
  team,
  lang,
  lastReviewed,
  className,
}: {
  author: Contributor
  team: Contributor
  lang: 'en' | 'tr'
  lastReviewed?: string
  className: string
}) {
  const isEnglish = lang === 'en'

  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {isEnglish ? 'Editorial Review' : 'Editöryal İnceleme'}
      </h3>

      <div className="space-y-3">
        {/* Reviewing Attorney */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 text-white rounded flex items-center justify-center text-xs font-semibold flex-shrink-0">
            {author.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {author.name[lang]}
            </p>
            <p className="text-xs text-gray-500">
              {isEnglish ? 'Reviewing Attorney' : 'İnceleme Avukatı'}
            </p>
          </div>
        </div>

        {/* Review Date */}
        {lastReviewed && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isEnglish ? 'Reviewed' : 'İncelendi'}: {formatDate(lastReviewed, lang)}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Inline Editorial Board - For article headers
 */
function EditorialBoardInline({
  author,
  team,
  lang,
  lastReviewed,
  className,
}: {
  author: Contributor
  team: Contributor
  lang: 'en' | 'tr'
  lastReviewed?: string
  className: string
}) {
  const isEnglish = lang === 'en'

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 ${className}`}>
      {/* Reviewed by */}
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {isEnglish ? 'Reviewed by' : 'İnceleyen'}:{' '}
        <span className="font-medium text-gray-900">{author.name[lang]}</span>
        {author.barAdmissions && author.barAdmissions.length > 0 && (
          <span className="text-xs text-gray-400">
            ({author.barAdmissions[0].jurisdictionName} Bar)
          </span>
        )}
      </span>

      {/* Last updated */}
      {lastReviewed && (
        <span className="flex items-center gap-1.5 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(lastReviewed, lang)}
        </span>
      )}
    </div>
  )
}

/**
 * Format date for display
 */
function formatDate(dateString: string, lang: 'en' | 'tr'): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', options)
}

/**
 * ReviewBadge - Small badge showing review status
 */
export function ReviewBadge({
  lang,
  lastReviewed,
  className = '',
}: {
  lang: 'en' | 'tr'
  lastReviewed: string
  className?: string
}) {
  const isEnglish = lang === 'en'

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 ${className}`}>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {isEnglish ? 'Attorney Reviewed' : 'Avukat İncelemeli'}
    </span>
  )
}
