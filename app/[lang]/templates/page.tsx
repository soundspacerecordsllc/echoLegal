// app/[lang]/templates/page.tsx
// Templates library index page with search and filters

import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import {
  getTemplatesByLang,
  categoryLabels,
  docTypeLabels,
  jurisdictionLabels,
  getAllCategories,
  TemplateCategory,
  Template,
} from '@/lib/templates-registry'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Free Legal Templates & Document Library | EchoLegal'
      : 'Ücretsiz Hukuki Şablon ve Belge Kütüphanesi | EchoLegal',
    description: isEnglish
      ? 'Browse 50+ free legal templates: contracts, business forms, immigration letters, tax checklists. Bilingual (EN/TR) for Turkish entrepreneurs.'
      : 'Sözleşmeler, iş formları, göç mektupları, vergi kontrol listeleri dahil 50+ ücretsiz hukuki şablon. Türk girişimciler için iki dilli (EN/TR).',
    alternates: {
      canonical: `https://echo-legal.com/${lang}/templates`,
      languages: {
        en: 'https://echo-legal.com/en/templates',
        tr: 'https://echo-legal.com/tr/templates',
      },
    },
    openGraph: {
      title: isEnglish
        ? 'Free Legal Templates & Document Library'
        : 'Ücretsiz Hukuki Şablon Kütüphanesi',
      description: isEnglish
        ? '50+ bilingual legal templates for contracts, immigration, tax, and business documents.'
        : '50+ iki dilli hukuki şablon: sözleşmeler, göç, vergi ve iş belgeleri.',
      type: 'website',
    },
  }
}

export default async function TemplatesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const templates = getTemplatesByLang(lang)
  const categories = getAllCategories()

  // Group templates by category for display
  const templatesByCategory = categories.reduce((acc, category) => {
    const categoryTemplates = templates.filter(t => t.category === category)
    if (categoryTemplates.length > 0) {
      acc[category] = categoryTemplates
    }
    return acc
  }, {} as Record<TemplateCategory, Template[]>)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEnglish
      ? 'Legal Templates & Document Library'
      : 'Hukuki Şablon ve Belge Kütüphanesi',
    description: isEnglish
      ? 'Free legal templates for contracts, business documents, immigration letters, and tax forms.'
      : 'Sözleşmeler, iş belgeleri, göç mektupları ve vergi formları için ücretsiz hukuki şablonlar.',
    url: `https://echo-legal.com/${lang}/templates`,
    inLanguage: lang === 'en' ? 'en-US' : 'tr-TR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    numberOfItems: templates.length,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: templates.length,
      itemListElement: templates.slice(0, 10).map((template, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DigitalDocument',
          name: template.title,
          description: template.shortDescription,
          url: `https://echo-legal.com/${lang}/templates/${template.slug}`,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            {isEnglish ? 'Document Library' : 'Belge Kütüphanesi'}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Templates' : 'Şablonlar'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? `${templates.length}+ legal document templates. Professionally drafted contracts, forms, and reference documents.`
              : `${templates.length}+ hukuki belge şablonu. Profesyonelce hazırlanmış sözleşmeler, formlar ve referans belgeleri.`}
          </p>
        </header>

        {/* Search hint */}
        <div className="mb-10 text-sm text-gray-500">
          {isEnglish
            ? 'Press ⌘K to search all templates and guides.'
            : 'Tüm şablon ve rehberlerde aramak için ⌘K tuşuna basın.'}
        </div>

        {/* Category Quick Links */}
        <nav className="mb-12 pb-8 border-b border-gray-200">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {categories.map((category) => {
              const count = templatesByCategory[category]?.length || 0
              if (count === 0) return null
              return (
                <a
                  key={category}
                  href={`#${category}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {categoryLabels[category][lang]} ({count})
                </a>
              )
            })}
          </div>
        </nav>

        {/* Templates by Category */}
        {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
          <section key={category} id={category} className="mb-12 scroll-mt-20">
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-6">
              {categoryLabels[category as TemplateCategory][lang]}
            </h2>

            <div className="divide-y divide-gray-100">
              {categoryTemplates.map((template) => (
                <Link
                  key={template.id}
                  href={`/${lang}/templates/${template.slug}`}
                  className="block py-4 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                          {template.title}
                        </h3>
                        {template.jurisdiction !== 'General' && (
                          <span className="text-xs text-gray-400">
                            {jurisdictionLabels[template.jurisdiction][lang]}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {template.shortDescription}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 mt-1">
                      {docTypeLabels[template.docType][lang]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Related Resources */}
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/contracts`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Contracts →' : 'Sözleşmeler →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/legal-kits`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Legal Kits →' : 'Hukuki Kitler →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/checklists`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Checklists →' : 'Kontrol Listeleri →'}
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
