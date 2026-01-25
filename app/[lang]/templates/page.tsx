// app/[lang]/templates/page.tsx
// Templates library index page with search and filters

import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/get-dictionary'
import {
  getTemplatesByLang,
  categoryLabels,
  docTypeLabels,
  jurisdictionLabels,
  getAllCategories,
  getAllDocTypes,
  getAllJurisdictions,
  TemplateCategory,
  DocType,
  Jurisdiction,
  Template,
} from '@/lib/templates-registry'
import Header from '@/components/Header'
import { TemplatesGrid } from '@/components/TemplatesGrid'

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
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const templates = getTemplatesByLang(lang)
  const categories = getAllCategories()
  const docTypes = getAllDocTypes()
  const jurisdictions = getAllJurisdictions()

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
    <div className="min-h-screen bg-white">
      <Header lang={lang} dict={dict} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-black mb-4">
            {isEnglish ? 'Templates' : 'Şablonlar'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {isEnglish
              ? `Browse ${templates.length}+ free legal templates. Contracts, forms, letters, checklists, and document samples for Turkish entrepreneurs.`
              : `${templates.length}+ ücretsiz hukuki şablon. Türk girişimciler için sözleşmeler, formlar, mektuplar, kontrol listeleri ve belge örnekleri.`}
          </p>
        </div>

        {/* Search prompt */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              {isEnglish ? 'Tip:' : 'İpucu:'}
            </span>{' '}
            {isEnglish
              ? 'Press Ctrl+K (or ⌘+K on Mac) anytime to search all templates and guides.'
              : 'Tüm şablon ve rehberlerde arama yapmak için istediğiniz zaman Ctrl+K (veya Mac\'te ⌘+K) tuşlarına basın.'}
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
        {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
          <section key={category} id={category} className="mb-12 scroll-mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">
                {categoryLabels[category as TemplateCategory][lang]}
              </h2>
              <span className="text-sm text-gray-500">
                {categoryTemplates.length} {isEnglish ? 'templates' : 'şablon'}
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTemplates.map((template) => (
                <Link
                  key={template.id}
                  href={`/${lang}/templates/${template.slug}`}
                  className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all"
                >
                  {/* Doc type & jurisdiction badges */}
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
                        {isEnglish ? 'Sample' : 'Örnek'}
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
                    {isEnglish ? 'View Template' : 'Şablonu Görüntüle'}
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
        ))}

        {/* Support CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isEnglish
                ? 'Find these templates useful?'
                : 'Bu şablonları faydalı buldunuz mu?'}
            </h2>
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'EchoLegal is free to use. If these resources save you time or money, consider supporting our work.'
                : 'EchoLegal kullanımı ücretsizdir. Bu kaynaklar size zaman veya para kazandırıyorsa, çalışmalarımızı desteklemeyi düşünün.'}
            </p>
            <Link
              href={`/${lang}/support`}
              className="inline-flex items-center px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              {isEnglish ? 'Support EchoLegal' : 'EchoLegal\'i Destekle'}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {isEnglish
              ? 'LEGAL DISCLAIMER: EchoLegal provides educational legal information and document templates for general informational purposes only. Nothing on this website constitutes legal advice, nor does use of this website create an attorney-client relationship.'
              : 'HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme amaçlı eğitici hukuki bilgiler ve belge şablonları sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez.'}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
