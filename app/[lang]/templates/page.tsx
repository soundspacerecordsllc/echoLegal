// app/[lang]/templates/page.tsx
// Templates library index page

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

  const activeCategories = categories.filter(
    (c) => (templatesByCategory[c]?.length || 0) > 0
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-8">
            <p className="text-xs font-semibold text-[#C9A227] uppercase tracking-[0.2em] mb-3">
              {isEnglish ? 'Document Library' : 'Belge Kütüphanesi'}
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {isEnglish ? 'Templates' : 'Şablonlar'}
            </h1>
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
              {isEnglish
                ? `${templates.length} professionally drafted legal documents. Contracts, regulatory forms, consular correspondence, and compliance checklists — available in English and Turkish.`
                : `Profesyonel olarak hazırlanmış ${templates.length} hukuki belge. Sözleşmeler, düzenleyici formlar, konsolosluk yazışmaları ve uyum kontrol listeleri — İngilizce ve Türkçe olarak sunulmaktadır.`}
            </p>
          </div>

          {/* Category Navigation */}
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <nav className="flex gap-1 overflow-x-auto pb-px -mb-px" aria-label={isEnglish ? 'Document categories' : 'Belge kategorileri'}>
              {activeCategories.map((category) => {
                const count = templatesByCategory[category]?.length || 0
                return (
                  <a
                    key={category}
                    href={`#${category}`}
                    className="flex-shrink-0 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-colors whitespace-nowrap"
                  >
                    {categoryLabels[category][lang]}
                    <span className="ml-1.5 text-xs text-gray-400">{count}</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Document Sections */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="space-y-12">
            {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
              <section key={category} id={category} className="scroll-mt-24">
                {/* Section Header */}
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    {categoryLabels[category as TemplateCategory][lang]}
                  </h2>
                  <span className="text-xs text-gray-400 tabular-nums">
                    {categoryTemplates.length} {isEnglish ? (categoryTemplates.length === 1 ? 'document' : 'documents') : 'belge'}
                  </span>
                </div>

                {/* Document Rows */}
                <div className="space-y-2">
                  {categoryTemplates.map((template) => (
                    <Link
                      key={template.id}
                      href={`/${lang}/templates/${template.slug}`}
                      className="group flex items-center gap-4 p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all duration-150"
                    >
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-1.5">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                            {template.title}
                          </h3>
                          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-gray-100 text-gray-500">
                            {docTypeLabels[template.docType][lang]}
                          </span>
                          {template.jurisdiction !== 'General' && (
                            <span className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-blue-50 text-blue-600">
                              {jurisdictionLabels[template.jurisdiction][lang]}
                            </span>
                          )}
                          {template.isSample && (
                            <span className="inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-amber-50 text-amber-600">
                              {isEnglish ? 'Sample' : 'Örnek'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {template.shortDescription}
                        </p>
                      </div>

                      {/* Open Affordance */}
                      <div className="flex-shrink-0 flex items-center gap-1.5 text-sm font-medium text-gray-400 group-hover:text-[#C9A227] transition-colors">
                        <span className="hidden sm:inline">{isEnglish ? 'Open' : 'Aç'}</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Related Resources */}
          <nav className="mt-16 pt-8 border-t border-gray-200" aria-label={isEnglish ? 'Related resources' : 'İlgili kaynaklar'}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.15em] mb-4">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href={`/${lang}/contracts`}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
              >
                <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</span>
                <span className="text-gray-400 text-sm">→</span>
              </Link>
              <Link
                href={`/${lang}/legal-kits`}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
              >
                <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}</span>
                <span className="text-gray-400 text-sm">→</span>
              </Link>
              <Link
                href={`/${lang}/checklists`}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
              >
                <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</span>
                <span className="text-gray-400 text-sm">→</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
