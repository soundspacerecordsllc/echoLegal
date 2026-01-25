/**
 * Structured Data Schemas for EchoLegal
 * Implements Organization, Person (Author), WebSite, and Article schemas
 */

export const SITE_URL = 'https://echo-legal.com'

// Organization Schema - EchoLegal
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'EchoLegal',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 200,
    height: 60,
  },
  description: 'Bilingual legal encyclopedia providing professionally drafted contracts and legal guides in English and Turkish.',
  foundingDate: '2024',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${SITE_URL}/en/support`,
    availableLanguage: ['English', 'Turkish'],
  },
}

// Person Schema - Primary Author
export const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#author`,
  name: 'Zeynep Ruziye Moore',
  jobTitle: 'Attorney at Law',
  description: 'New York Bar No: 5552336',
  affiliation: {
    '@type': 'Organization',
    name: 'EchoLegal',
    url: SITE_URL,
  },
  knowsAbout: [
    'US Immigration Law',
    'Corporate Law',
    'Contract Law',
    'Turkish-American Legal Relations',
  ],
}

// WebSite Schema with SearchAction
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'EchoLegal',
  description: 'Bilingual legal encyclopedia for Turkish entrepreneurs',
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

// Generate Article schema for content pages
export function generateArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  lang,
  section,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  lang: 'en' | 'tr'
  section?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    inLanguage: lang,
    author: {
      '@id': `${SITE_URL}/#author`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(section && { articleSection: section }),
  }
}

// Generate BreadcrumbList schema
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

// Generate FAQPage schema
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

// Combined schema for layout (global schemas)
export function getGlobalSchemas() {
  return [organizationSchema, authorSchema, websiteSchema]
}
