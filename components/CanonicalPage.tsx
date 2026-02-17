// components/CanonicalPage.tsx
// Shared canonical page layout for legal encyclopedia content
// Renders consistent structure: title, jurisdiction chips, attribution, disclaimers, TOC

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ContentType,
  DisclaimerType,
  getDisclaimerText,
  getDefaultDisclaimers,
} from '@/lib/content-schema'
import { JurisdictionCode, LanguageCode, getJurisdiction, getLanguageName } from '@/lib/jurisdictions'
import { getContributor, Contributor } from '@/lib/contributors'
import ContributorAttribution from './ContributorAttribution'
import InstitutionalBadge from './InstitutionalBadge'
import ContentVersionBanner from './ContentVersionBanner'
import CiteThisEntry from './CiteThisEntry'
import { type RevisionEntry, type ContentTypeKey } from '@/lib/content-schema'

// ============================================
// TYPES
// ============================================

export type TableOfContentsItem = {
  id: string
  title: string
  level: number
}

export type CanonicalPageProps = {
  // Required metadata
  title: string
  summary: string
  contentType: ContentType
  lang: LanguageCode

  // Scope
  jurisdictions: JurisdictionCode[]
  primaryJurisdiction: JurisdictionCode
  availableLanguages?: LanguageCode[]

  // Authorship
  authorId: string
  reviewerId?: string
  lastReviewedAt?: string

  // Timestamps
  updatedAt: string
  publishedAt?: string

  // Content
  children: React.ReactNode

  // Optional
  tableOfContents?: TableOfContentsItem[]
  disclaimers?: DisclaimerType[]
  customDisclaimer?: string
  relatedContent?: {
    title: string
    href: string
    type?: ContentType
  }[]

  // Version & citation
  version?: string
  revisionHistory?: RevisionEntry[]
  citationKey?: string
  canonicalContentType?: ContentTypeKey
  pageUrl?: string

  // Display options
  showToc?: boolean
  showAttribution?: boolean
  showDisclaimers?: boolean
  showJurisdictionChips?: boolean
  showLanguageChips?: boolean
  showLastReviewed?: boolean
  showVersionBanner?: boolean
  showCitation?: boolean
  className?: string
}

// ============================================
// COMPONENT
// ============================================

export default function CanonicalPage({
  title,
  summary,
  contentType,
  lang,
  jurisdictions,
  primaryJurisdiction,
  availableLanguages = [],
  authorId,
  reviewerId,
  lastReviewedAt,
  updatedAt,
  publishedAt,
  children,
  tableOfContents = [],
  disclaimers,
  customDisclaimer,
  relatedContent = [],
  version,
  revisionHistory = [],
  citationKey,
  canonicalContentType,
  pageUrl,
  showToc = true,
  showAttribution = true,
  showDisclaimers = true,
  showJurisdictionChips = true,
  showLanguageChips = true,
  showLastReviewed = true,
  showVersionBanner = true,
  showCitation = true,
  className = '',
}: CanonicalPageProps) {
  const isEnglish = lang === 'en'
  const [activeTocId, setActiveTocId] = useState<string | null>(null)

  // Get contributors
  const author = getContributor(authorId)
  const reviewer = reviewerId ? getContributor(reviewerId) : undefined

  // Get applicable disclaimers
  const applicableDisclaimers = disclaimers || getDefaultDisclaimers(contentType)

  // Track active TOC section on scroll
  useEffect(() => {
    if (!showToc || tableOfContents.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tableOfContents, showToc])

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get content type label (with fallback to English for unsupported languages)
  const contentTypeLabels: Record<ContentType, Record<string, string>> = {
    Article: { en: 'Article', tr: 'Makale' },
    Contract: { en: 'Contract', tr: 'Sözleşme' },
    Kit: { en: 'Document Kit', tr: 'Belge Kiti' },
    Checklist: { en: 'Checklist', tr: 'Kontrol Listesi' },
    Guide: { en: 'Guide', tr: 'Rehber' },
    Form: { en: 'Form', tr: 'Form' },
    Letter: { en: 'Letter', tr: 'Mektup' },
    Sample: { en: 'Sample', tr: 'Örnek' },
    Policy: { en: 'Policy', tr: 'Politika' },
  }
  const getContentTypeLabel = (type: ContentType): string => {
    return contentTypeLabels[type][lang] || contentTypeLabels[type]['en']
  }

  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      {/* Page Header */}
      <header className="mb-8">
        {/* Content type badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
            {getContentTypeLabel(contentType)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* Summary */}
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          {summary}
        </p>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t border-b border-gray-200 py-4">
          {/* Jurisdiction chips */}
          {showJurisdictionChips && jurisdictions.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                {isEnglish ? 'Jurisdiction:' : 'Yetki Alanı:'}
              </span>
              <div className="flex flex-wrap gap-1">
                {jurisdictions.map((code) => {
                  const jurisdiction = getJurisdiction(code)
                  return (
                    <span
                      key={code}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        code === primaryJurisdiction
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {jurisdiction?.name[lang] || code}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Language chips */}
          {showLanguageChips && availableLanguages.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                {isEnglish ? 'Languages:' : 'Diller:'}
              </span>
              <div className="flex gap-1">
                {availableLanguages.map((langCode) => (
                  <span
                    key={langCode}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      langCode === lang
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {getLanguageName(langCode, lang)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Last reviewed */}
          {showLastReviewed && lastReviewedAt && (
            <div className="flex items-center gap-1">
              <span className="text-gray-400">
                {isEnglish ? 'Reviewed:' : 'İncelendi:'}
              </span>
              <span>{formatDate(lastReviewedAt)}</span>
            </div>
          )}

          {/* Updated */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400">
              {isEnglish ? 'Updated:' : 'Güncellendi:'}
            </span>
            <span>{formatDate(updatedAt)}</span>
          </div>
        </div>

        {/* Institutional trust signal */}
        <InstitutionalBadge
          lang={isEnglish ? 'en' : 'tr'}
          jurisdictions={jurisdictions}
          lastReviewedAt={lastReviewedAt || updatedAt}
          className="mt-4"
        />

        {/* Version and revision metadata */}
        {showVersionBanner && (version || updatedAt) && (
          <ContentVersionBanner
            lang={isEnglish ? 'en' : 'tr'}
            version={version}
            revisionHistory={revisionHistory}
            lastModifiedAt={updatedAt}
            lastReviewedAt={lastReviewedAt}
            firstPublishedAt={publishedAt}
            primaryJurisdiction={primaryJurisdiction}
            contentType={canonicalContentType}
            isReviewed={!!lastReviewedAt}
            className="mt-3"
          />
        )}
      </header>

      {/* Main content area with optional sidebar */}
      <div className={`${showToc && tableOfContents.length > 0 ? 'lg:grid lg:grid-cols-[1fr_200px] lg:gap-8' : ''}`}>
        {/* Main content */}
        <div className="prose prose-gray max-w-none">
          {children}
        </div>

        {/* Table of Contents sidebar */}
        {showToc && tableOfContents.length > 0 && (
          <aside className="hidden lg:block">
            <nav className="sticky top-20">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                {isEnglish ? 'Contents' : 'İçindekiler'}
              </h2>
              <ul className="space-y-2 text-sm">
                {tableOfContents.map((item) => (
                  <li
                    key={item.id}
                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                  >
                    <a
                      href={`#${item.id}`}
                      className={`block py-1 transition-colors ${
                        activeTocId === item.id
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {/* Cite This Entry */}
      {showCitation && pageUrl && (
        <CiteThisEntry
          lang={isEnglish ? 'en' : 'tr'}
          title={title}
          url={pageUrl}
          dateModified={updatedAt}
          version={version}
          citationKey={citationKey}
          contentType={canonicalContentType}
          className="mt-12"
        />
      )}

      {/* Disclaimers */}
      {showDisclaimers && applicableDisclaimers.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Important Notice' : 'Önemli Uyarı'}
          </h2>
          <div className="space-y-3">
            {applicableDisclaimers.map((type) => (
              <p key={type} className="text-sm text-gray-500 leading-relaxed">
                {getDisclaimerText(type, lang)}
              </p>
            ))}
            {customDisclaimer && (
              <p className="text-sm text-gray-500 leading-relaxed">
                {customDisclaimer}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Author/Reviewer Attribution */}
      {showAttribution && (author || reviewer) && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {isEnglish ? 'About This Content' : 'Bu İçerik Hakkında'}
          </h2>

          <div className="space-y-4">
            {/* Author */}
            {author && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {isEnglish ? 'Author' : 'Yazar'}
                </h3>
                <ContributorAttribution
                  contributor={author}
                  lang={lang}
                  variant="compact"
                />
              </div>
            )}

            {/* Reviewer (if different from author) */}
            {reviewer && reviewer.id !== author?.id && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {isEnglish ? 'Legal Reviewer' : 'Hukuki İnceleyici'}
                </h3>
                <ContributorAttribution
                  contributor={reviewer}
                  lang={lang}
                  variant="compact"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Content */}
      {relatedContent.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h2>
          <div className="grid gap-3">
            {relatedContent.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">{item.title}</span>
                {item.type && (
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    {getContentTypeLabel(item.type)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

// ============================================
// HELPER COMPONENTS
// ============================================

/**
 * Wrapper for content that automatically generates TOC from headings.
 * Use this when you want automatic TOC generation from markdown/MDX content.
 */
export function CanonicalPageWithAutoToc(
  props: Omit<CanonicalPageProps, 'tableOfContents'> & {
    contentRef?: React.RefObject<HTMLDivElement | null>
  }
) {
  const [toc, setToc] = useState<TableOfContentsItem[]>([])
  const { contentRef, children, ...rest } = props

  useEffect(() => {
    const container = contentRef?.current || document.querySelector('article')
    if (!container) return

    const headings = container.querySelectorAll('h2, h3')
    const tocItems: TableOfContentsItem[] = []

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`
      if (!heading.id) heading.id = id

      tocItems.push({
        id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      })
    })

    setToc(tocItems)
  }, [contentRef, children])

  return (
    <CanonicalPage {...rest} tableOfContents={toc}>
      {children}
    </CanonicalPage>
  )
}

/**
 * Minimal disclaimer section for embedding in other components.
 */
export function DisclaimerSection({
  lang,
  disclaimers,
  customDisclaimer,
  className = '',
}: {
  lang: LanguageCode
  disclaimers?: DisclaimerType[]
  customDisclaimer?: string
  className?: string
}) {
  const isEnglish = lang === 'en'
  const applicableDisclaimers = disclaimers || ['general']

  return (
    <div className={`text-xs text-gray-500 leading-relaxed ${className}`}>
      {applicableDisclaimers.map((type) => (
        <p key={type} className="mb-2 last:mb-0">
          {getDisclaimerText(type, lang)}
        </p>
      ))}
      {customDisclaimer && <p>{customDisclaimer}</p>}
    </div>
  )
}

/**
 * Jurisdiction badge for inline use.
 */
export function JurisdictionBadge({
  code,
  lang,
  isPrimary = false,
}: {
  code: JurisdictionCode
  lang: LanguageCode
  isPrimary?: boolean
}) {
  const jurisdiction = getJurisdiction(code)
  if (!jurisdiction) return null

  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
        isPrimary ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
      }`}
    >
      {jurisdiction.name[lang]}
    </span>
  )
}
