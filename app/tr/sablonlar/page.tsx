// app/tr/sablonlar/page.tsx
// Turkish-specific templates library route

import { Metadata } from 'next'
import Link from 'next/link'
import JsonLdScript from '@/components/JsonLdScript'
import {
  getTemplatesByLang,
  categoryLabels,
  docTypeLabels,
  jurisdictionLabels,
  getAllCategories,
  TemplateCategory,
  Template,
} from '@/lib/templates-registry'

export const metadata: Metadata = {
  title: 'Hukuki Belge Şablonları — Tamamlayıcı Materyaller | EchoLegal',
  description:
    'Yargı alanı etiketli hukuki belge şablonları: sözleşmeler, düzenleyici formlar, konsolosluk yazışmaları ve uyum kontrol listeleri. İngilizce ve Türkçe yayımlanan tamamlayıcı referans materyalleri.',
  openGraph: {
    title: 'Hukuki Belge Şablonları — Tamamlayıcı Materyaller',
    description:
      'İngilizce ve Türkçe yargı alanı etiketli hukuki belge şablonları. Birincil hukuk kaynaklarından ayrı olarak sürdürülen tamamlayıcı materyaller.',
    type: 'website',
    url: 'https://echo-legal.com/tr/sablonlar',
  },
}

export default async function SablonlarPage() {
  const lang = 'tr'

  const templates = getTemplatesByLang(lang)
  const categories = getAllCategories()

  // Group templates by category
  const templatesByCategory = categories.reduce(
    (acc, category) => {
      const categoryTemplates = templates.filter((t) => t.category === category)
      if (categoryTemplates.length > 0) {
        acc[category] = categoryTemplates
      }
      return acc
    },
    {} as Record<TemplateCategory, Template[]>
  )

  // JSON-LD: CollectionPage + WebPage authority signal (merged)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://echo-legal.com/tr/sablonlar#breadcrumbs',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://echo-legal.com/tr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Şablonlar',
        item: 'https://echo-legal.com/tr/sablonlar',
      },
    ],
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://echo-legal.com/tr/sablonlar#webpage',
    name: 'Hukuki Belge Şablonları — Tamamlayıcı Materyaller | EchoLegal',
    description:
      'Yargı alanı etiketli hukuki belge şablonları: sözleşmeler, düzenleyici formlar, konsolosluk yazışmaları ve uyum kontrol listeleri.',
    url: 'https://echo-legal.com/tr/sablonlar',
    inLanguage: 'tr',
    isPartOf: { '@id': 'https://echo-legal.com/#website' },
    publisher: { '@id': 'https://echo-legal.com/#organization' },
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
          url: `https://echo-legal.com/tr/sablonlar/${template.slug}`,
        },
      })),
    },
  }

  return (
    <>
      <JsonLdScript data={[jsonLd, breadcrumbJsonLd]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-black mb-4">Şablonlar</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Yargı alanı etiketli {templates.length} hukuki belge şablonu.
            Sözleşmeler, düzenleyici formlar, konsolosluk yazışmaları ve uyum
            kontrol listeleri — birincil hukuk kaynaklarından ayrı olarak
            sürdürülen tamamlayıcı referans materyalleri.
          </p>
        </div>

        {/* Search prompt */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">İpucu:</span> Tüm şablon
            ve rehberlerde arama yapmak için istediğiniz zaman Ctrl+K (veya
            Mac&apos;te ⌘+K) tuşlarına basın.
          </p>
        </div>

        {/* Category Quick Links */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count = templatesByCategory[category]?.length || 0
              if (count === 0) return null
              return (
                <a
                  key={category}
                  href={`#${category}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  {categoryLabels[category][lang]}
                  <span className="text-gray-400 text-xs">({count})</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Templates by Category */}
        {Object.entries(templatesByCategory).map(
          ([category, categoryTemplates]) => (
            <section key={category} id={category} className="mb-12 scroll-mt-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">
                  {categoryLabels[category as TemplateCategory][lang]}
                </h2>
                <span className="text-sm text-gray-500">
                  {categoryTemplates.length} şablon
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTemplates.map((template) => (
                  <Link
                    key={template.id}
                    href={`/tr/sablonlar/${template.slug}`}
                    className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all"
                  >
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {docTypeLabels[template.docType][lang]}
                      </span>
                      {template.jurisdiction !== 'General' && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                          {jurisdictionLabels[template.jurisdiction][lang]}
                        </span>
                      )}
                      {template.isSample && (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded">
                          Örnek
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black mb-2">
                      {template.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {template.shortDescription}
                    </p>

                    {/* View link */}
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
                      Şablonu Görüntüle
                      <svg
                        className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )
        )}

        {/* Support CTA */}
        <div className="mt-16 p-8 bg-stone-50 border border-stone-200 rounded-xl">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Sürdürülebilirlik Katkısı
            </h2>
            <p className="text-gray-700 mb-4">
              Bu referans materyalleri bağımsız olarak sürdürülmektedir.
              Kaynağın devamlılığına katkıda bulunmak için destek sayfasını
              inceleyebilirsiniz.
            </p>
            <Link
              href="/tr/support"
              className="inline-flex items-center px-5 py-2.5 bg-stone-700 text-white font-semibold rounded-lg hover:bg-stone-800 transition-colors"
            >
              Destek Bilgileri
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
