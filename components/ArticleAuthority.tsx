// components/ArticleAuthority.tsx
// Authority signals component for article pages
// Displays review date, author attribution, and E-E-A-T signals

import { getArticleMetadata, formatDate, getAuthorityBadge } from '@/lib/article-metadata'
import { getContributor, getCanonicalAuthor, Contributor } from '@/lib/contributors'

type Props = {
  slug: string
  lang: 'en' | 'tr'
  className?: string
}

export function ArticleAuthority({ slug, lang, className = '' }: Props) {
  const metadata = getArticleMetadata(slug)
  const isEnglish = lang === 'en'

  // Use canonical author if no specific metadata
  const author: Contributor | undefined = metadata?.author
    ? getContributor(metadata.author)
    : getCanonicalAuthor()

  const authorityBadge = getAuthorityBadge(lang, metadata)

  const datePublished = metadata?.datePublished
    ? formatDate(metadata.datePublished, lang)
    : null

  const dateModified = metadata?.dateModified
    ? formatDate(metadata.dateModified, lang)
    : null

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 ${className}`}>
      {/* Author */}
      {author && (
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {author.name[lang]}
          {author.isAttorney && ', Esq.'}
        </span>
      )}

      {/* Bar admission badge for attorneys */}
      {author?.isAttorney && author.barAdmission && (
        <span className="flex items-center gap-1 text-blue-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {author.barAdmission.jurisdiction} Bar #{author.barAdmission.number}
        </span>
      )}

      {/* Last updated */}
      {dateModified && (
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isEnglish ? 'Updated' : 'Güncellendi'}: {dateModified}
        </span>
      )}

      {/* Attorney review badge */}
      {metadata?.reviewedBy && (
        <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {authorityBadge.text}
        </span>
      )}
    </div>
  )
}

// Inline version for compact display
export function ArticleAuthorityInline({ slug, lang }: Props) {
  const metadata = getArticleMetadata(slug)
  const isEnglish = lang === 'en'

  const dateModified = metadata?.dateModified
    ? formatDate(metadata.dateModified, lang)
    : null

  if (!dateModified) return null

  return (
    <p className="text-sm text-gray-500 mb-4">
      {isEnglish
        ? `Last reviewed: ${dateModified}`
        : `Son inceleme: ${dateModified}`}
      {metadata?.reviewedBy && (
        <span className="text-green-700">
          {' '}&bull;{' '}
          {isEnglish
            ? 'Reviewed by a licensed attorney'
            : 'Lisanslı avukat tarafından incelendi'}
        </span>
      )}
    </p>
  )
}
