// app/[lang]/amerika/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import Script from 'next/script'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'US Business & Legal Guide for Turkish Entrepreneurs | EchoLegal'
      : "Türk Girişimciler İçin ABD Hukuk Rehberi | EchoLegal",
    description: isEnglish
      ? 'Comprehensive legal reference hub for Turkish entrepreneurs doing business in the United States. LLC formation, tax facts, common misconceptions, and essential documents.'
      : "ABD'de iş kurmak isteyen Türk girişimcilere yönelik kapsamlı hukuki başvuru kaynağı. LLC kurulumu, vergi esasları, yaygın yanılgılar ve temel belgeler.",
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function AmerikaHubPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const coveredTopics = isEnglish ? [
    'LLC formation basics and state selection',
    'Tax framework fundamentals for non-residents',
    'Common mistakes and practical risks',
    'Essential business documents and contracts',
  ] : [
    'LLC kurulumu ve eyalet seçiminin esasları',
    'ABD mukimi olmayanlar için vergi çerçevesi',
    'Sık yapılan hatalar ve pratik riskler',
    'Temel ticari belgeler ve sözleşmeler',
  ]

  const canonicalUrl = `https://echo-legal.com/${lang}/amerika`
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEnglish ? 'Home' : 'Ana Sayfa',
        item: `https://echo-legal.com/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEnglish ? 'US Business Hub' : 'ABD Ticaret Rehberi',
        item: canonicalUrl,
      },
    ],
  }
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: isEnglish
      ? 'US Business & Legal Guide for Turkish Entrepreneurs | EchoLegal'
      : 'Türk Girişimciler İçin ABD Hukuk Rehberi | EchoLegal',
    inLanguage: lang,
    isPartOf: {
      '@type': 'WebSite',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
  }

  return (
    <>
      <Script
        id="ld-webpage-amerika"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Script
        id="ld-breadcrumbs-amerika"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold mb-4">
            {isEnglish ? 'US Business Hub' : 'ABD Ticaret Rehberi'}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            {isEnglish
              ? 'US Business & Legal Guide'
              : "Türk Girişimciler İçin ABD Hukuk Rehberi"}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'Clear, factual guides for Turkish entrepreneurs navigating US business, taxes, and legal requirements.'
              : 'ABD\'de iş kurmak, vergi yükümlülüklerini anlamak ve hukuki gereklilikleri karşılamak isteyen Türk girişimcilere yönelik net ve olgulara dayalı rehberler.'}
          </p>
        </div>

        {/* Covered Topics */}
        <section className="mb-12">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-green-900 mb-4">
              {isEnglish ? 'What This Section Covers' : 'Kapsanan Konular'}
            </h2>
            <ul className="space-y-2">
              {coveredTopics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3 text-green-800">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Scope Note */}
        <p className="text-sm text-gray-500 mb-12 leading-relaxed">
          {isEnglish
            ? 'This section provides general legal frameworks and structural information. It does not address individual cases or provide personalized legal guidance.'
            : 'Bu bölüm genel hukuki çerçeveyi ve yapısal bilgileri aktarır. Bireysel dosyalara veya kişiye özel hukuki yönlendirmeye yer vermez.'}
        </p>

        {/* Featured Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-6">
            {isEnglish ? 'Pillar Guides' : 'Ana Rehberler'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link
              href={`/${lang}/amerika/abdde-llc-kurmak`}
              className="card-elevated rounded-lg group"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {isEnglish ? 'Pillar Guide' : 'Ana Rehber'}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'LLC Formation in the US' : "ABD'de LLC Kurmak"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'Entity types, state selection, formation steps, compliance, and post-formation requirements.'
                  : 'Tüzel kişilik türleri, eyalet seçimi, kuruluş adımları, uyum gereksinimleri ve kuruluş sonrası yükümlülükler.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`}
              className="card-elevated rounded-lg group"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {isEnglish ? 'Pillar Guide' : 'Ana Rehber'}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'Essential Contracts' : 'Temel Sözleşmeler'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'Contract types, key elements, red flags, international enforcement, and when to get legal review.'
                  : 'Sözleşme türleri, temel unsurlar, tehlike işaretleri, uluslararası tenfiz ve avukat incelemesi gerektiren durumlar.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/amerika/irs-vergi-gercekleri`}
              className="card-elevated rounded-lg group"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {isEnglish ? 'Pillar Guide' : 'Ana Rehber'}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'IRS, Taxes & W-8/W-9' : 'IRS, Vergi ve W-8/W-9'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'Tax residency, FATCA/FBAR, treaty benefits, US-source income, and common misconceptions.'
                  : 'Vergi mukimliği, FATCA/FBAR, anlaşma hakları, ABD kaynaklı gelir ve yaygın yanılgılar.'}
              </p>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/${lang}/library/hukuki-yanilgilar`}
              className="card-link rounded-lg group"
            >
              <h3 className="font-semibold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'Common Misconceptions' : 'Sık Yapılan Hukuki Hatalar'}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {isEnglish
                  ? 'Myths vs. facts about doing business in the US.'
                  : "ABD'de iş yapma konusunda doğru bilinen yanlışlar."}
              </p>
            </Link>

            <Link
              href={`/${lang}/library/llc-vize-yanilgisi`}
              className="card-link rounded-lg group"
            >
              <h3 className="font-semibold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {isEnglish
                  ? 'Understanding the immigration realities.'
                  : 'LLC ile vize arasındaki ilişkinin gerçek yüzü.'}
              </p>
            </Link>
          </div>
        </section>

        {/* Quick Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Quick Reference Tools' : 'Hızlı Referans Araçları'}
          </h2>

          <div className="space-y-3">
            <Link
              href={`/${lang}/checklists/llc-kontrol-listesi`}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-black">
                {isEnglish ? 'LLC Pre-Formation Checklist' : "ABD'de LLC Kurmadan Önce: Kontrol Listesi"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>

            <Link
              href={`/${lang}/checklists/w8-w9-karar-haritasi`}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-black">
                {isEnglish ? 'W-8 or W-9 Decision Map' : 'W-8 mi W-9 mu? Karar Haritası'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>

            <Link
              href={`/${lang}/checklists/irs-mektup-rehberi`}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-black">
                {isEnglish ? 'IRS Letter Guide' : "IRS'ten Mektup Geldiyse: İlk 7 Gerçek"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* Editorial Resource Reference */}
        <section className="border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-700 mb-4">
            {isEnglish
              ? 'Common starter documents for US business operations:'
              : 'ABD\'de ticari faaliyete başlarken sıklıkla ihtiyaç duyulan belgeler:'}
          </p>
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            <li>• {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</li>
            <li>• {isEnglish ? 'NDA (Non-Disclosure Agreement)' : 'Gizlilik Sözleşmesi (NDA)'}</li>
            <li>• {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}</li>
            <li>• {isEnglish ? 'Privacy Policy & Terms of Service' : 'Gizlilik Politikası & Kullanım Koşulları'}</li>
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link
              href={`/${lang}/legal-kits/business-starter`}
              className="text-[#C9A227] font-medium hover:underline text-sm"
            >
              {isEnglish ? 'US Business Starter Legal Kit →' : 'ABD Ticaret Başlangıç Hukuk Paketi →'}
            </Link>
            <span className="text-xs text-gray-500">
              {isEnglish ? 'I support EchoLegal – $49 recommended' : 'EchoLegal\'e destek olun – önerilen tutar 49 $'}
            </span>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}
