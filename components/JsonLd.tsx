/**
 * JSON-LD Schema Components for SEO
 * Implements structured data for Article, Product, Organization, and FAQ schemas
 */

interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
  lang: 'en' | 'tr'
}

interface ProductSchemaProps {
  name: string
  description: string
  url: string
  image?: string
  price: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  lang: 'en' | 'tr'
}

interface FAQSchemaProps {
  questions: Array<{
    question: string
    answer: string
  }>
  lang: 'en' | 'tr'
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

/**
 * Organization schema for the website
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EchoLegal',
    url: 'https://echo-legal.com',
    logo: 'https://echo-legal.com/logo.png',
    description: 'Bilingual legal encyclopedia providing professionally drafted contracts and legal guides in English and Turkish.',
    sameAs: [
      'https://twitter.com/echolegal',
      'https://linkedin.com/company/echolegal',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Turkish'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Article schema for legal guides and blog posts
 */
export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = 'EchoLegal',
  lang,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: image || 'https://echo-legal.com/og-default.png',
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://echo-legal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      logo: {
        '@type': 'ImageObject',
        url: 'https://echo-legal.com/logo.png',
      },
    },
    inLanguage: lang === 'en' ? 'en-US' : 'tr-TR',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Product schema for legal kits and digital products
 */
export function ProductSchema({
  name,
  description,
  url,
  image,
  price,
  currency = 'USD',
  availability = 'InStock',
  lang,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    image: image || 'https://echo-legal.com/og-default.png',
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url,
      seller: {
        '@type': 'Organization',
        name: 'EchoLegal',
      },
    },
    brand: {
      '@type': 'Organization',
      name: 'EchoLegal',
    },
    inLanguage: lang === 'en' ? 'en-US' : 'tr-TR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * FAQ schema for pages with frequently asked questions
 */
export function FAQSchema({ questions, lang }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
    inLanguage: lang === 'en' ? 'en-US' : 'tr-TR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Breadcrumb schema for navigation
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Legal Service schema for the overall website
 */
export function LegalServiceSchema({ lang }: { lang: 'en' | 'tr' }) {
  const isEnglish = lang === 'en'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'EchoLegal',
    description: isEnglish
      ? 'Educational legal information and document templates for entrepreneurs'
      : 'Girişimciler için eğitim amaçlı hukuki bilgi ve belge şablonları',
    url: `https://echo-legal.com/${lang}`,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: isEnglish
      ? 'Legal Information & Document Templates'
      : 'Hukuki Bilgi ve Belge Şablonları',
    provider: {
      '@type': 'Organization',
      name: 'EchoLegal',
    },
    availableLanguage: ['English', 'Turkish'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
