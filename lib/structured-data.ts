// lib/structured-data.ts
// Structured Data Schemas for EchoLegal
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 4.1:
// Full schema.org type coverage for AI citation and machine-readable reference.
//
// Schema types implemented:
//   Organization, WebSite, ScholarlyArticle, Article, DigitalDocument,
//   HowTo, LegalService, BreadcrumbList, FAQPage, ItemList

import { ContentTypeKey, ContentStatus, type UniversalMeta } from './content-schema'
import { LanguageCode } from './jurisdictions'

// ============================================
// CONSTANTS
// ============================================

export const SITE_URL = 'https://echo-legal.com'
export const SITE_NAME = 'EchoLegal'

// ============================================
// GLOBAL SCHEMAS
// ============================================

/** Organization schema — EchoLegal as publisher. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 200,
    height: 60,
  },
  description: 'Global legal encyclopedia providing professionally drafted contracts and legal guides. Attorney-reviewed, multilingual.',
  foundingDate: '2024',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${SITE_URL}/en/support`,
    availableLanguage: ['English', 'Turkish'],
  },
}

/** Author schema — always Organization, never Person (governance rule). */
export const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#author`,
  name: SITE_NAME,
  url: SITE_URL,
}

/** WebSite schema with SearchAction. */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: 'Global legal encyclopedia — attorney-reviewed legal reference and contract templates.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: ['en', 'tr'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/en/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

/** LegalService schema — organizational classification (Section 4.1.1). */
export const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${SITE_URL}/#legalservice`,
  name: SITE_NAME,
  description: 'Open-access legal encyclopedia and contract template library. Attorney-reviewed content for international professionals.',
  url: SITE_URL,
  provider: {
    '@id': `${SITE_URL}/#organization`,
  },
  serviceType: 'Legal Information Service',
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Turkey' },
  ],
  availableLanguage: ['English', 'Turkish'],
}

/** Combined global schemas for layout. */
export function getGlobalSchemas() {
  return [organizationSchema, authorSchema, websiteSchema, legalServiceSchema]
}

// ============================================
// CONTENT SCHEMA GENERATORS
// ============================================

/**
 * Article schema — for guides, updates, and non-encyclopedic editorial content.
 * Retained from existing implementation with expanded field support.
 */
export function generateArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  lang,
  section,
  version,
  keywords,
  wordCount,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  lang: 'en' | 'tr'
  section?: string
  version?: string
  keywords?: string[]
  wordCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    inLanguage: lang,
    author: { '@id': `${SITE_URL}/#author` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    copyrightHolder: { '@id': `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
    ...(section && { articleSection: section }),
    ...(version && { version }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    ...(wordCount && { wordCount }),
  }
}

/**
 * ScholarlyArticle schema — for encyclopedia entries (Section 4.1.2).
 *
 * Replaces generic Article for encyclopedic content.
 * Designed for Google Scholar indexing and academic citation.
 */
export function generateScholarlyArticleSchema({
  title,
  alternativeHeadline,
  abstractText,
  url,
  datePublished,
  dateModified,
  dateCreated,
  lang,
  version,
  keywords,
  wordCount,
  citationKey,
  aboutTopics,
  citations,
}: {
  title: string
  alternativeHeadline?: string
  abstractText?: string
  url: string
  datePublished: string
  dateModified: string
  dateCreated?: string
  lang: 'en' | 'tr'
  version?: string
  keywords?: string[]
  wordCount?: number
  citationKey?: string
  aboutTopics?: string[]
  citations?: { name: string; url?: string; type?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': `${url}#article`,
    headline: title,
    ...(alternativeHeadline && { alternativeHeadline }),
    ...(abstractText && { abstract: abstractText }),
    datePublished,
    dateModified,
    ...(dateCreated && { dateCreated }),
    ...(version && { version }),
    inLanguage: lang,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntityOfPage: url,
    ...(aboutTopics && aboutTopics.length > 0 && {
      about: aboutTopics.map(name => ({ '@type': 'Thing', name })),
    }),
    ...(citations && citations.length > 0 && {
      citation: citations.map(c => ({
        '@type': c.type === 'statute' ? 'Legislation' : 'CreativeWork',
        name: c.name,
        ...(c.url && { url: c.url }),
      })),
    }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    ...(wordCount && { wordCount }),
    copyrightHolder: { '@id': `${SITE_URL}/#organization` },
    license: `${SITE_URL}/en/legal/terms`,
    isAccessibleForFree: true,
    ...(citationKey && { identifier: citationKey }),
  }
}

/**
 * DigitalDocument schema — for contract templates, forms, samples (Section 4.1.2).
 */
export function generateDigitalDocumentSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  lang,
  version,
  keywords,
  encodingFormats,
  citationKey,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  lang: 'en' | 'tr'
  version?: string
  keywords?: string[]
  encodingFormats?: string[]
  citationKey?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    '@id': `${url}#document`,
    name: title,
    description,
    datePublished,
    dateModified,
    ...(version && { version }),
    inLanguage: lang,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    hasDigitalDocumentPermission: {
      '@type': 'DigitalDocumentPermission',
      permissionType: 'https://schema.org/ReadPermission',
    },
    ...(encodingFormats && encodingFormats.length > 0 && {
      encodingFormat: encodingFormats,
    }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    isAccessibleForFree: true,
    ...(citationKey && { identifier: citationKey }),
  }
}

/**
 * HowTo schema — for checklists and procedural guides (Section 4.1.1).
 */
export function generateHowToSchema({
  title,
  description,
  url,
  lang,
  steps,
  totalTime,
  keywords,
}: {
  title: string
  description: string
  url: string
  lang: 'en' | 'tr'
  steps: { name: string; text: string; position: number }[]
  totalTime?: string    // ISO 8601 duration (e.g., 'PT30M')
  keywords?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    url,
    inLanguage: lang,
    ...(totalTime && { totalTime }),
    step: steps.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      position: step.position,
    })),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

/**
 * ItemList schema — for jurisdiction registry, template collections (Section 4.1.1).
 */
export function generateItemListSchema({
  name,
  description,
  url,
  items,
}: {
  name: string
  description: string
  url: string
  items: { name: string; url: string; position: number }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  }
}

// ============================================
// EXISTING SCHEMA GENERATORS (preserved)
// ============================================

/** BreadcrumbList schema. */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** FAQPage schema. */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ============================================
// UNIFIED SCHEMA GENERATOR (Section 4.1)
// ============================================

/**
 * Content type to schema.org @type mapping.
 */
const CONTENT_TYPE_SCHEMA_MAP: Record<ContentTypeKey, string> = {
  'encyclopedia-entry': 'ScholarlyArticle',
  'jurisdictional-guide': 'HowTo',
  'comparative-analysis': 'ScholarlyArticle',
  'legal-update': 'Article',
  'checklist': 'HowTo',
  'contract-template': 'DigitalDocument',
  'legal-form': 'DigitalDocument',
  'sample-document': 'DigitalDocument',
  'letter-template': 'DigitalDocument',
  'document-kit': 'CreativeWork',
}

/**
 * Generate the appropriate schema.org JSON-LD for any content type.
 *
 * Dispatches to the correct schema generator based on content type.
 * Use this as the primary entry point for content page structured data.
 */
export function generateContentSchema(meta: {
  contentType: ContentTypeKey
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  dateCreated?: string
  lang: 'en' | 'tr'
  version?: string
  keywords?: string[]
  wordCount?: number
  citationKey?: string
  aboutTopics?: string[]
  citations?: { name: string; url?: string; type?: string }[]
  steps?: { name: string; text: string; position: number }[]
  totalTime?: string
  encodingFormats?: string[]
  alternativeHeadline?: string
  abstractText?: string
}) {
  const schemaType = CONTENT_TYPE_SCHEMA_MAP[meta.contentType]

  switch (schemaType) {
    case 'ScholarlyArticle':
      return generateScholarlyArticleSchema({
        title: meta.title,
        alternativeHeadline: meta.alternativeHeadline,
        abstractText: meta.abstractText,
        url: meta.url,
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        dateCreated: meta.dateCreated,
        lang: meta.lang,
        version: meta.version,
        keywords: meta.keywords,
        wordCount: meta.wordCount,
        citationKey: meta.citationKey,
        aboutTopics: meta.aboutTopics,
        citations: meta.citations,
      })

    case 'HowTo':
      return generateHowToSchema({
        title: meta.title,
        description: meta.description,
        url: meta.url,
        lang: meta.lang,
        steps: meta.steps || [],
        totalTime: meta.totalTime,
        keywords: meta.keywords,
      })

    case 'DigitalDocument':
      return generateDigitalDocumentSchema({
        title: meta.title,
        description: meta.description,
        url: meta.url,
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        lang: meta.lang,
        version: meta.version,
        keywords: meta.keywords,
        encodingFormats: meta.encodingFormats,
        citationKey: meta.citationKey,
      })

    case 'CreativeWork':
      // Document kit — use base CreativeWork
      return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: meta.title,
        description: meta.description,
        url: meta.url,
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        ...(meta.version && { version: meta.version }),
        inLanguage: meta.lang,
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        isAccessibleForFree: true,
        ...(meta.keywords && meta.keywords.length > 0 && {
          keywords: meta.keywords.join(', '),
        }),
      }

    default:
      // Fallback to Article
      return generateArticleSchema({
        title: meta.title,
        description: meta.description,
        url: meta.url,
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        lang: meta.lang,
        version: meta.version,
        keywords: meta.keywords,
        wordCount: meta.wordCount,
      })
  }
}

// ============================================
// CITATION META TAGS (Section 4.2.1)
// ============================================

/**
 * Citation metadata for Google Scholar and academic indexing.
 *
 * Returns key-value pairs suitable for <meta> tags:
 *   <meta name="citation_title" content="...">
 *   <meta name="citation_publisher" content="...">
 *   etc.
 */
export type CitationMetaTag = {
  name: string
  content: string
}

export function generateCitationMetaTags(meta: {
  title: string
  datePublished?: string
  dateModified: string
  version?: string
  lang: string
  url: string
  citationKey?: string
}): CitationMetaTag[] {
  const tags: CitationMetaTag[] = [
    { name: 'citation_title', content: meta.title },
    { name: 'citation_publisher', content: SITE_NAME },
    { name: 'citation_language', content: meta.lang },
    { name: 'citation_fulltext_html_url', content: meta.url },
  ]

  if (meta.datePublished) {
    // Google Scholar expects YYYY/MM/DD format
    tags.push({
      name: 'citation_publication_date',
      content: formatCitationDate(meta.datePublished),
    })
  }

  tags.push({
    name: 'citation_lastmod',
    content: formatCitationDate(meta.dateModified),
  })

  if (meta.version) {
    tags.push({ name: 'citation_version', content: meta.version })
  }

  if (meta.citationKey) {
    tags.push({ name: 'citation_id', content: meta.citationKey })
  }

  return tags
}

/**
 * Format an ISO date to Google Scholar citation date format (YYYY/MM/DD).
 */
function formatCitationDate(isoDate: string): string {
  const d = new Date(isoDate)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}

// ============================================
// HUMAN-READABLE CITATION (Section 4.2.2)
// ============================================

/**
 * Generate human-readable citation text for a content entry.
 *
 * Standard format:
 *   EchoLegal, "[Title]," EchoLegal Legal Encyclopedia, v[X.Y]
 *   (last updated [Date]), [URL].
 *
 * Bluebook format:
 *   [Title], EchoLegal Legal Encyclopedia (last updated [Date]), [URL].
 */
export function generateCitationText(meta: {
  title: string
  version?: string
  dateModified: string
  url: string
  lang: 'en' | 'tr'
  contentType?: ContentTypeKey
}): { standard: string; bluebook: string } {
  const isEnglish = meta.lang === 'en'
  const dateFormatted = formatCitationDisplayDate(meta.dateModified, meta.lang)
  const versionStr = meta.version ? `, v${meta.version}` : ''

  const collectionName = isEnglish
    ? 'EchoLegal Legal Encyclopedia'
    : 'EchoLegal Hukuk Ansiklopedisi'

  const lastUpdated = isEnglish
    ? `last updated ${dateFormatted}`
    : `son g\u00FCncelleme ${dateFormatted}`

  const standard = `${SITE_NAME}, \u201C${meta.title},\u201D ${collectionName}${versionStr} (${lastUpdated}), ${meta.url}.`

  const bluebook = `${meta.title}, ${collectionName} (${lastUpdated}), ${meta.url}.`

  return { standard, bluebook }
}

/**
 * Format date for display in citation text.
 */
function formatCitationDisplayDate(isoDate: string, lang: 'en' | 'tr'): string {
  return new Date(isoDate).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
