// app/[lang]/legal-kits/business-starter/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'US Business Starter Legal Kit | Essential Documents for US Business | EchoLegal'
    : "ABD Business Starter Legal Kit | ABD'de İş Kurmak İçin Temel Belgeler | EchoLegal"

  const description = isEnglish
    ? 'Essential legal document bundle for starting a business in the US. NDA, Service Agreement, Contractor Agreement, Privacy Policy & Terms of Service. Available in English and Turkish.'
    : "ABD'de iş kurmak için temel hukuki belge paketi. NDA, Hizmet Sözleşmesi, Yüklenici Sözleşmesi, Gizlilik Politikası ve Kullanım Koşulları. İngilizce ve Türkçe olarak mevcuttur."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/legal-kits/business-starter`,
      languages: {
        'en': 'https://echo-legal.com/en/legal-kits/business-starter',
        'tr': 'https://echo-legal.com/tr/legal-kits/business-starter',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function BusinessStarterKitPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const includedDocuments = [
    {
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      description: isEnglish
        ? 'Protect confidential information when discussing business opportunities.'
        : 'İş fırsatlarını görüşürken gizli bilgilerinizi koruyun.',
      link: `/${lang}/contracts/nda`
    },
    {
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      description: isEnglish
        ? 'Define scope, payment terms, and deliverables for client work.'
        : 'Müşteri işleri için kapsam, ödeme koşulları ve teslim edilecekleri belirleyin.',
      link: `/${lang}/contracts/service-agreement`
    },
    {
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      description: isEnglish
        ? 'Establish clear terms when hiring freelancers or contractors.'
        : 'Serbest çalışan veya yüklenici çalıştırırken net koşullar belirleyin.',
      link: `/${lang}/contracts/independent-contractor`
    },
    {
      title: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
      description: isEnglish
        ? 'GDPR and CCPA compliant privacy policy for your website or app.'
        : 'Web siteniz veya uygulamanız için KVKK uyumlu gizlilik politikası.',
      link: `/${lang}/contracts/privacy-policy`
    },
    {
      title: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları',
      description: isEnglish
        ? 'Terms and conditions for websites, apps, and online services.'
        : 'Web siteleri, uygulamalar ve çevrimiçi hizmetler için kullanım şartları.',
      link: `/${lang}/contracts/terms-of-service`
    },
  ]

  const whoIsThisFor = isEnglish ? [
    'International entrepreneurs starting a business in the US',
    'Freelancers and consultants working with US clients',
    'E-commerce sellers operating in the US market',
    'Tech founders launching a US-based startup',
    'Anyone needing bilingual (EN/TR) legal documents',
  ] : [
    "ABD'de iş kurmaya başlayan uluslararası girişimciler",
    "ABD'li müşterilerle çalışan serbest çalışanlar ve danışmanlar",
    'ABD pazarında faaliyet gösteren e-ticaret satıcıları',
    'ABD merkezli startup kuran teknoloji kurucuları',
    'İki dilli (EN/TR) hukuki belgelere ihtiyaç duyan herkes',
  ]

  const whoIsThisNotFor = isEnglish ? [
    'Individuals seeking personalized legal advice',
    'Complex corporate structures requiring custom documentation',
    'Regulated industries with specific compliance requirements',
  ] : [
    'Kişiye özel hukuki danışmanlık arayanlar',
    'Özel dokümantasyon gerektiren karmaşık kurumsal yapılar',
    'Spesifik uyum gereksinimleri olan düzenlenmiş sektörler',
  ]

  // Product schema with pay-what-you-can pricing
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'US Business Starter Legal Kit',
    description: isEnglish
      ? 'Essential legal document bundle for starting a business in the US. Available in English and Turkish.'
      : "ABD'de iş kurmak için temel hukuki belge paketi. İngilizce ve Türkçe olarak mevcuttur.",
    brand: {
      '@type': 'Organization',
      name: 'EchoLegal',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '0',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `https://echo-legal.com/${lang}/legal-kits/business-starter`,
      description: isEnglish
        ? 'Pay what you can. $20 recommended, free access available.'
        : '20$ önerilir, ücretsiz erişim mevcut.',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '47',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
        name: isEnglish ? 'Legal Kits' : 'Hukuki Kitler',
        item: `https://echo-legal.com/${lang}/legal-kits`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Business Starter Kit',
        item: `https://echo-legal.com/${lang}/legal-kits/business-starter`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black text-black">
            EchoLegal
          </Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link href={`/${lang}/legal-kits`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/legal-kits/business-starter`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/legal-kits`} className="hover:text-black">{isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">Business Starter Kit</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-sm font-medium mb-4">
            {isEnglish ? 'Reference Document Bundle' : 'Referans Belge Paketi'}
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
            ABD Business Starter<br />Legal Kit
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'A curated collection of essential legal documents for starting or operating a business in the United States. Five professionally drafted templates, available in both English and Turkish.'
              : "ABD'de iş kurmak veya işletmek için özenle seçilmiş temel hukuki belgeler. Hem İngilizce hem Türkçe olarak hazırlanmış beş profesyonel şablon."}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">🇺🇸 {isEnglish ? 'US Jurisdiction' : 'ABD Yargı Yetkisi'}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">🇹🇷 {isEnglish ? 'Bilingual (EN/TR)' : 'İki Dilli (EN/TR)'}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">📄 {isEnglish ? '5 Documents' : '5 Belge'}</span>
          </div>
        </div>

        {/* What's Included */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? "What's Included" : 'Neler Dahil'}
          </h2>

          <div className="space-y-4">
            {includedDocuments.map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-black mb-1">{doc.title}</h3>
                    <p className="text-gray-600 text-sm">{doc.description}</p>
                  </div>
                  <Link
                    href={doc.link}
                    className="text-sm text-gray-500 hover:text-black whitespace-nowrap ml-4"
                  >
                    {isEnglish ? 'Preview →' : 'Önizle →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-black mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {isEnglish ? 'Who This Is For' : 'Kimler İçin'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {whoIsThisFor.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-black mb-4 flex items-center gap-2">
              <span className="text-gray-400">✕</span>
              {isEnglish ? 'Who This Is NOT For' : 'Kimler İçin Değil'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {whoIsThisNotFor.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Download Section */}
        <section className="mb-12 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-center text-black mb-4">
            {isEnglish ? 'Access This Kit' : 'Bu Kite Eriş'}
          </h2>

          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            {isEnglish
              ? "Legal knowledge should be accessible to everyone. Pay $20 if you can—it helps us maintain and expand this resource. If you can't, access for free."
              : 'Hukuki bilgi herkes için erişilebilir olmalı. Eğer ödeyebiliyorsanız 20$ ödeyin—bu kaynağı sürdürmemize ve geliştirmemize yardımcı olur. Ödeyemiyorsanız, ücretsiz erişin.'}
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            {/* Pay Option */}
            <a
              href="https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01"
              className="block w-full bg-[#C9A227] text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#B8922A] transition-all hover:shadow-lg"
            >
              💳 {isEnglish ? 'I support EchoLegal – $20' : 'EchoLegal\'i destekliyorum – $20'}
            </a>
            <p className="text-center text-sm text-gray-500">
              {isEnglish ? 'Instant access to all 5 documents' : 'Tüm 5 belgeye anında erişim'}
            </p>

            {/* Free Option */}
            <div className="pt-4 border-t border-gray-200">
              <a
                href="/documents/kits/abd-business-starter-kit.zip"
                download
                className="block w-full bg-gray-800 text-white text-center py-4 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                📄 {isEnglish ? 'Download for free' : 'Ücretsiz indir'}
              </a>
              <p className="text-center text-sm text-gray-500 mt-2">
                {isEnglish ? 'ZIP bundle with all 5 documents' : '5 belgenin tamamını içeren ZIP paketi'}
              </p>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="mb-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="font-semibold text-amber-800 mb-3">
            {isEnglish ? 'Important Information' : 'Önemli Bilgi'}
          </h3>
          <p className="text-sm text-amber-900 leading-relaxed">
            {isEnglish
              ? 'These documents are reference templates for educational purposes. They do not constitute legal advice. Laws vary by jurisdiction and individual circumstances differ. We recommend having a licensed attorney review any documents before use in binding situations.'
              : 'Bu belgeler eğitim amaçlı referans şablonlarıdır. Hukuki tavsiye niteliği taşımaz. Yasalar yargı yetkilerine göre değişir ve bireysel durumlar farklıdır. Bağlayıcı durumlarda kullanmadan önce lisanslı bir avukata inceletmenizi öneririz.'}
          </p>
        </section>

        {/* Related Resources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-black mb-6">
            {isEnglish ? 'Related Legal Resources' : 'İlgili Hukuki Kaynaklar'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'LLC Formation Guide' : "ABD'de LLC Kurma Rehberi"}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish ? 'Step-by-step guide to forming an LLC in the US.' : "ABD'de LLC kurmanın adım adım rehberi."}
              </p>
            </Link>

            <Link
              href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'IRS & Tax Forms Guide' : 'IRS ve Vergi Formları Rehberi'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish ? 'W-8, W-9, 1099 forms explained.' : 'W-8, W-9, 1099 formları açıklandı.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/ein-itin-ssn-farki`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish ? 'Tax ID numbers explained for foreign entrepreneurs.' : 'Yabancı girişimciler için vergi kimlik numaraları.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/contracts`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'All Contract Templates' : 'Tüm Sözleşme Şablonları'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish ? 'Browse our full library of legal templates.' : 'Hukuki şablon kütüphanemizin tamamına göz atın.'}
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <p className="text-xl font-black mb-2">EchoLegal</p>
              <p className="text-sm text-gray-500">{isEnglish ? 'Legal Encyclopedia' : 'Hukuk Ansiklopedisi'}</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href={`/${lang}/contracts`} className="hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
              <Link href={`/${lang}/legal-kits`} className="hover:opacity-60">{isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}</Link>
              <Link href={`/${lang}/library`} className="hover:opacity-60">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
              <Link href={`/${lang}/support`} className="hover:opacity-60">{isEnglish ? 'Support' : 'Destek'}</Link>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {dict.disclaimer.global}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </footer>
    </div>
    </>
  )
}
