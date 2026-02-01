// components/ArticleAuthority.tsx
// Authority/credentials are intentionally hidden (service-first). Do not render in UI.
// This component retains date display only; no personal credit or review badges.

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

  const dateModified = metadata?.dateModified
    ? formatDate(metadata.dateModified, lang)
    : null

  if (!dateModified) return null

  // Service-first: show only date, no personal attribution
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 ${className}`}>
      {dateModified && (
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isEnglish ? 'Updated' : 'Güncellendi'}: {dateModified}
        </span>
      )}
    </div>
  )
}

// Inline version for compact display — date only, no personal credit
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
    </p>
  )
}
