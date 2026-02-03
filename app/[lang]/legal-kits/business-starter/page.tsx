// app/[lang]/legal-kits/business-starter/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'ABD Business Starter Legal Kit | EchoLegal'
    : 'ABD Business Starter Legal Kit | EchoLegal'

  const description = isEnglish
    ? 'Three foundational legal document templates for Turkish entrepreneurs forming a US-based business: Operating Agreement, Service Agreement, and NDA. Bilingual (EN/TR).'
    : 'ABD merkezli iş kuran Türk girişimciler için üç temel hukuki belge şablonu: Operating Agreement, Hizmet Sözleşmesi ve NDA. İki dilli (EN/TR).'

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
      title: isEnglish ? 'Operating Agreement (EN + TR)' : 'Operating Agreement (EN + TR)',
      description: isEnglish
        ? 'Internal governance document for your LLC. Defines ownership structure, profit distribution, and management authority. Required by most US banks for account opening.'
        : 'LLC\'nizin iç yönetim belgesi. Ortaklık yapısını, kâr dağılımını ve yönetim yetkisini tanımlar. Çoğu ABD bankası hesap açılışında bu belgeyi talep eder.',
      link: `/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim#adim-adim-surecler`
    },
    {
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      description: isEnglish
        ? 'Defines the scope, payment terms, deliverables, and liability limits for client work under US commercial practice.'
        : 'ABD ticari uygulamaları çerçevesinde müşteri işleri için kapsamı, ödeme koşullarını, teslim edilecekleri ve sorumluluk sınırlarını belirler.',
      link: `/${lang}/contracts/service-agreement`
    },
    {
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      description: isEnglish
        ? 'Protects confidential information shared between parties before or during a business relationship.'
        : 'İş ilişkisi öncesinde veya sırasında taraflar arasında paylaşılan gizli bilgileri korur.',
      link: `/${lang}/contracts/nda`
    },
  ]

  const whoIsThisFor = isEnglish ? [
    'Turkish entrepreneurs forming or operating a US-based LLC',
    'Freelancers and service providers working with US clients who need standard commercial agreements',
    'Founders who need bilingual (EN/TR) legal documents reflecting US commercial practice',
  ] : [
    'ABD merkezli LLC kuran veya işleten Türk girişimciler',
    'ABD\'li müşterilerle çalışan ve standart ticari sözleşmelere ihtiyaç duyan serbest çalışanlar ve hizmet sağlayıcılar',
    'ABD ticari uygulamalarını yansıtan iki dilli (EN/TR) hukuki belgelere ihtiyaç duyan kurucular',
  ]

  const whoIsThisNotFor = isEnglish ? [
    'Individuals seeking personalized legal advice for a specific dispute or transaction',
    'Businesses in regulated industries (healthcare, finance, securities) requiring specialized compliance documentation',
  ] : [
    'Belirli bir uyuşmazlık veya işlem için kişiye özel hukuki danışmanlık arayanlar',
    'Düzenlemeye tabi sektörlerde (sağlık, finans, menkul kıymetler) özel uyum belgelerine ihtiyaç duyan işletmeler',
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
      price: '49',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `https://echo-legal.com/${lang}/legal-kits/business-starter`,
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
    <div className="bg-white">
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

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            ABD Business Starter<br />Legal Kit
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Three legal document templates that cover the most common needs of a Turkish entrepreneur forming a US-based LLC. Each template is drafted in both English and Turkish, reflecting standard US commercial practice.'
              : 'ABD merkezli LLC kuran bir Türk girişimcinin en yaygın ihtiyaçlarını karşılayan üç hukuki belge şablonu. Her şablon, standart ABD ticari uygulamalarını yansıtacak şekilde hem İngilizce hem Türkçe olarak hazırlanmıştır.'}
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'These are starting-point templates, not finished legal instruments. They are designed to give you a structurally sound foundation that a licensed attorney can then tailor to your specific situation.'
              : 'Bunlar bitmiş hukuki belgeler değil, başlangıç noktası niteliğinde şablonlardır. Yapısal olarak sağlam bir temel sunmak üzere tasarlanmıştır; lisanslı bir avukat bunları sizin durumunuza uyarlayabilir.'}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">{isEnglish ? 'US Jurisdiction' : 'ABD Yargı Yetkisi'}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">{isEnglish ? 'Bilingual (EN/TR)' : 'İki Dilli (EN/TR)'}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">{isEnglish ? '3 Documents' : '3 Belge'}</span>
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
                    <h3 className="text-sm font-semibold text-black mb-1">{doc.title}</h3>
                    <p className="text-gray-600 text-sm">{doc.description}</p>
                  </div>
                  <Link
                    href={doc.link}
                    className="text-sm text-gray-500 hover:text-black whitespace-nowrap ml-4"
                  >
                    {isEnglish ? 'Preview' : 'Önizle'}
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

        {/* Pricing Section */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-4">
            {isEnglish ? 'Get This Kit' : 'Bu Kiti Edinin'}
          </h2>

          <p className="text-gray-700 mb-6">
            {isEnglish
              ? '$49 — one-time purchase. Includes all three templates in both English and Turkish.'
              : '$49 — tek seferlik ödeme. Üç şablonun tamamını İngilizce ve Türkçe olarak içerir.'}
          </p>

          <a
            href="https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01"
            className="inline-block px-6 py-3 border border-black text-black font-medium rounded hover:bg-gray-50 transition-colors"
          >
            {isEnglish ? 'Access the Legal Kit' : 'Legal Kit\'e Eriş'}
          </a>
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
              <h3 className="text-sm font-semibold text-black mb-1">
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
              <h3 className="text-sm font-semibold text-black mb-1">
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
              <h3 className="text-sm font-semibold text-black mb-1">
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
              <h3 className="text-sm font-semibold text-black mb-1">
                {isEnglish ? 'All Contract Templates' : 'Tüm Sözleşme Şablonları'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish ? 'Browse our full library of legal templates.' : 'Hukuki şablon kütüphanemizin tamamına göz atın.'}
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}
