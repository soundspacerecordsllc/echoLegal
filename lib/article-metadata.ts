// lib/article-metadata.ts
// Article metadata for authority signals and E-E-A-T compliance
// Tracks publication dates, review dates, and attribution

import { Contributor, getCanonicalAuthor } from './contributors'

/**
 * CitationIdentity — the single source of truth for identifying an editorial entry.
 * Every cornerstone page must derive its citation metadata from one canonical identity.
 * No secondary or conflicting citation keys should exist elsewhere in the same entry.
 */
export type CitationIdentity = {
  citationKey: string
  dateModified: string
  canonicalUrl: string
  datePublished?: string
}

export type ArticleMetadata = {
  slug: string
  datePublished: string // ISO format: YYYY-MM-DD
  dateModified: string // ISO format: YYYY-MM-DD
  dateReviewed?: string // ISO format: YYYY-MM-DD
  author: string // contributor ID
  reviewedBy?: string // contributor ID (attorney)
  category: 'guide' | 'checklist' | 'hub' | 'legal' | 'contract'
  tags: string[]
  relatedSlugs: string[] // for "See Also" logic
}

// Article metadata registry
// High-intent pages with full metadata
export const articleMetadata: Record<string, ArticleMetadata> = {
  'abd-de-llc-kurmak-turkler-icin-adim-adim': {
    slug: 'abd-de-llc-kurmak-turkler-icin-adim-adim',
    datePublished: '2025-06-15',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['llc', 'formation', 'business', 'state-selection', 'ein'],
    relatedSlugs: ['ein-itin-ssn-farki', 'llc-mi-corporation-mi', 'abdde-banka-hesabi-acmak', 'checklists/llc-checklist'],
  },
  'ein-itin-ssn-farki': {
    slug: 'ein-itin-ssn-farki',
    datePublished: '2025-08-20',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['tax-id', 'ein', 'itin', 'ssn', 'irs'],
    relatedSlugs: ['irs-vergiler-ve-w8-w9-gercekleri', '1099-vergi-belgeleri', 'abd-de-llc-kurmak-turkler-icin-adim-adim'],
  },
  'irs-vergiler-ve-w8-w9-gercekleri': {
    slug: 'irs-vergiler-ve-w8-w9-gercekleri',
    datePublished: '2025-07-10',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['tax', 'w-8', 'w-9', 'irs', 'withholding', 'treaty'],
    relatedSlugs: ['ein-itin-ssn-farki', '1099-vergi-belgeleri', 'abd-odemeleri-alma-rehberi'],
  },
  'abdde-banka-hesabi-acmak': {
    slug: 'abdde-banka-hesabi-acmak',
    datePublished: '2025-09-05',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['banking', 'mercury', 'relay', 'ein', 'llc'],
    relatedSlugs: ['abd-de-llc-kurmak-turkler-icin-adim-adim', 'abd-odemeleri-alma-rehberi', 'checklists/bank-account-checklist'],
  },
  'abd-satis-vergisi-rehberi': {
    slug: 'abd-satis-vergisi-rehberi',
    datePublished: '2025-10-12',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['sales-tax', 'nexus', 'wayfair', 'state-tax'],
    relatedSlugs: ['abd-de-llc-kurmak-turkler-icin-adim-adim', 'irs-vergiler-ve-w8-w9-gercekleri'],
  },
  'abd-odemeleri-alma-rehberi': {
    slug: 'abd-odemeleri-alma-rehberi',
    datePublished: '2025-08-01',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['payments', 'stripe', 'paypal', 'wise', 'w-8'],
    relatedSlugs: ['irs-vergiler-ve-w8-w9-gercekleri', 'abdde-banka-hesabi-acmak', 'ein-itin-ssn-farki'],
  },
  'llc-mi-corporation-mi': {
    slug: 'llc-mi-corporation-mi',
    datePublished: '2025-07-25',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['llc', 'corporation', 'c-corp', 's-corp', 'entity-selection'],
    relatedSlugs: ['abd-de-llc-kurmak-turkler-icin-adim-adim', 'ein-itin-ssn-farki'],
  },
  'ds-160-rehberi': {
    slug: 'ds-160-rehberi',
    datePublished: '2025-11-01',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['visa', 'ds-160', 'immigration', 'b1-b2', 'consulate'],
    relatedSlugs: ['amerika/abdye-gelme-yollari'],
  },
  '1099-vergi-belgeleri': {
    slug: '1099-vergi-belgeleri',
    datePublished: '2025-12-10',
    dateModified: '2026-01-25',
    dateReviewed: '2026-01-25',
    author: 'zeynep-yilmaz',
    reviewedBy: 'zeynep-yilmaz',
    category: 'guide',
    tags: ['tax', '1099', '1099-nec', '1099-k', 'irs'],
    relatedSlugs: ['irs-vergiler-ve-w8-w9-gercekleri', 'ein-itin-ssn-farki', 'checklists/tax-documents-checklist'],
  },
}

export function getArticleMetadata(slug: string): ArticleMetadata | undefined {
  return articleMetadata[slug]
}

export function formatDate(isoDate: string, lang: 'en' | 'tr'): string {
  const date = new Date(isoDate)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', options)
}

export function getRelatedArticles(slug: string): string[] {
  const metadata = articleMetadata[slug]
  if (!metadata) return []
  return metadata.relatedSlugs
}

// Generate authority badge text
export function getAuthorityBadge(lang: 'en' | 'tr', metadata?: ArticleMetadata): {
  text: string
  reviewDate: string | null
} {
  if (!metadata?.dateReviewed) {
    return {
      text: lang === 'en'
        ? 'Reviewed for accuracy'
        : 'Doğruluk için incelendi',
      reviewDate: null,
    }
  }

  return {
    text: lang === 'en'
      ? 'Reviewed by a licensed attorney'
      : 'Lisanslı avukat tarafından incelendi',
    reviewDate: formatDate(metadata.dateReviewed, lang),
  }
}
