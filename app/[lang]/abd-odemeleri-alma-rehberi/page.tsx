// app/[lang]/abd-odemeleri-alma-rehberi/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'abd-odemeleri-alma-rehberi',
  datePublished: '2026-01-25',
  dateModified: '2026-02-17',
  version: '1.0',
  citationKey: 'ecl-gde-00014',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Receiving US Payments as Turkish Freelancer: Stripe, PayPal, Wise | EchoLegal'
    : 'ABD\'den Ödeme Alma Rehberi: Stripe, PayPal, Wise | EchoLegal'

  const description = isEnglish
    ? 'Complete guide to receiving payments from US clients. Stripe, PayPal, Wise comparison. W-8BEN requirements, withholding taxes, and best practices for Turkish freelancers.'
    : 'ABD müşterilerinden ödeme alma rehberi. Stripe, PayPal, Wise karşılaştırması. W-8BEN gereksinimleri, stopaj vergileri ve Türk serbest çalışanlar için en iyi uygulamalar.'

  const url = `${SITE_URL}/${lang}/${PAGE_META.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Receiving US Payments Guide' : 'ABD\'den Ödeme Alma Rehberi',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2026/01/25',
      'citation_lastmod': '2026/02/17',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function PaymentPlatformsGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'genel-bakis', label: isEnglish ? 'Overview: Receiving US Payments' : 'Genel Bakış: ABD Ödemeleri Alma' },
    { id: 'stripe', label: isEnglish ? 'Stripe for International Freelancers' : 'Uluslararası Freelancerlar için Stripe' },
    { id: 'paypal', label: isEnglish ? 'PayPal Business' : 'PayPal Business' },
    { id: 'wise', label: isEnglish ? 'Wise (TransferWise)' : 'Wise (TransferWise)' },
    { id: 'karsilastirma', label: isEnglish ? 'Platform Comparison' : 'Platform Karşılaştırması' },
    { id: 'w8ben', label: isEnglish ? 'W-8BEN Requirements' : 'W-8BEN Gereksinimleri' },
    { id: 'stopaj', label: isEnglish ? 'Withholding Tax Rules' : 'Stopaj Vergi Kuralları' },
    { id: 'fatura', label: isEnglish ? 'Invoicing US Clients' : 'ABD Müşterilerine Fatura Kesme' },
    { id: 'turkiye-vergi', label: isEnglish ? 'Turkey Tax Obligations' : 'Türkiye Vergi Yükümlülükleri' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
  ]

  const pageUrl = `${SITE_URL}/${lang}/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Receiving US Payments Guide' : 'ABD\'den Ödeme Alma Rehberi'

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Complete guide to receiving payments from US clients. Stripe, PayPal, Wise comparison.'
      : 'ABD müşterilerinden ödeme alma rehberi. Stripe, PayPal, Wise karşılaştırması.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['stripe', 'paypal', 'wise', 'w-8ben', 'withholding', 'payments'],
    section: 'jurisdictional-guide',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Tax & ID Guide' : 'Vergi ve Kimlik Rehberi', url: `${SITE_URL}/${lang}/vergi-kimlik-rehberi` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <>
      <JsonLdScript data={[articleSchema, breadcrumbSchema]} />

      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'US Payment Platforms' : 'ABD Ödeme Platformları'}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-green-50 text-green-800 rounded-full text-sm font-semibold mb-4">
              {isEnglish ? 'Payment Guide' : 'Ödeme Rehberi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
              {isEnglish
                ? 'Receiving US Payments'
                : 'ABD\'den Ödeme Alma'}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {isEnglish
                ? 'A comprehensive guide to receiving payments from US clients as a Turkish freelancer or business. Compare Stripe, PayPal, and Wise, understand tax requirements, and learn best practices.'
                : 'Türk bir serbest çalışan veya işletme olarak ABD müşterilerinden ödeme alma rehberi. Stripe, PayPal ve Wise\'ı karşılaştırın, vergi gereksinimlerini anlayın ve en iyi uygulamaları öğrenin.'}
            </p>

            <InstitutionalBadge
              lang={lang}
              jurisdictions={['US']}
              lastReviewedAt={PAGE_META.dateModified}
              className="mb-8"
            />
          </div>

          {/* Key Points */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <span></span>
              {isEnglish ? 'Key Points' : 'Önemli Noktalar'}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-amber-800">
              <li>{isEnglish ? 'You need W-8BEN form to avoid 30% US withholding tax' : '30% ABD stopaj vergisini önlemek için W-8BEN formu gereklidir'}</li>
              <li>{isEnglish ? 'Turkey has a tax treaty with the US - often reducing withholding to 0-15%' : 'Türkiye\'nin ABD ile vergi anlaşması vardır - stopajı genellikle %0-15\'e düşürür'}</li>
              <li>{isEnglish ? 'Each platform has different fees and Turkey availability' : 'Her platformun farklı ücretleri ve Türkiye erişilebilirliği vardır'}</li>
              <li>{isEnglish ? 'You must still report income in Turkey' : 'Geliri Türkiye\'de beyan etmeniz gerekir'}</li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Contents' : 'İçindekiler'}</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tocItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-gray-600 hover:text-black flex items-center gap-2"
                >
                  <span className="text-gray-400">{index + 1}.</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {/* Genel Bakış */}
            <section id="genel-bakis" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Overview: Receiving Payments from US Clients' : 'Genel Bakış: ABD Müşterilerinden Ödeme Alma'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'As a Turkish freelancer or business working with US clients, you have several options for receiving payments. Each platform has different fee structures, verification requirements, and tax implications.'
                  : 'ABD müşterileriyle çalışan bir Türk serbest çalışan veya işletme olarak, ödeme almak için birkaç seçeneğiniz var. Her platformun farklı ücret yapıları, doğrulama gereksinimleri ve vergi etkileri bulunur.'}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm text-blue-800">
                  <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                  {isEnglish
                    ? 'Before receiving any payments, you should complete W-8BEN form to establish your tax status as a non-US person. Without this, US payers may withhold 30% of your payment.'
                    : 'Herhangi bir ödeme almadan önce, ABD dışı kişi olarak vergi statünüzü belirlemek için W-8BEN formunu doldurmalısınız. Bu olmadan, ABD ödeme yapanlar ödemenizin %30\'unu kesebilir.'}
                </p>
              </div>
            </section>

            {/* Stripe */}
            <section id="stripe" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Stripe for International Freelancers' : 'Uluslararası Freelancerlar için Stripe'}
              </h2>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Standard Stripe Account (Turkey)' : 'Standart Stripe Hesabı (Türkiye)'}</h4>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Stripe is available in Turkey with some limitations. You can accept card payments and have funds deposited to a Turkish bank account.'
                  : 'Stripe, bazı kısıtlamalarla Türkiye\'de mevcuttur. Kart ödemelerini kabul edebilir ve fonları Türk banka hesabına yatırabilirsiniz.'}
              </p>

              <div className="bg-gray-50 rounded-lg p-5 my-6">
                <h5 className="font-semibold text-black mb-3">{isEnglish ? 'Turkey Stripe Features' : 'Türkiye Stripe Özellikleri'}</h5>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>{isEnglish ? 'Accept payments in USD, EUR, and other currencies' : 'USD, EUR ve diğer para birimlerinde ödeme kabul etme'}</li>
                  <li>{isEnglish ? 'Payout to Turkish bank accounts in TRY' : 'Türk banka hesaplarına TRY cinsinden ödeme'}</li>
                  <li>{isEnglish ? 'Processing fee: 2.9% + $0.30 per transaction' : 'İşlem ücreti: işlem başına %2,9 + 0,30$'}</li>
                  <li>{isEnglish ? 'Payout timing: 7 days standard' : 'Ödeme süresi: standart 7 gün'}</li>
                </ul>
              </div>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Stripe Atlas (US LLC)' : 'Stripe Atlas (ABD LLC)'}</h4>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'If you form a US LLC, you can use Stripe Atlas which provides a US bank account and full Stripe functionality. This is often preferred for significant US business.'
                  : 'Bir ABD LLC\'si kurarsanız, ABD banka hesabı ve tam Stripe işlevselliği sağlayan Stripe Atlas\'ı kullanabilirsiniz. Bu, önemli ABD işleri için genellikle tercih edilir.'}
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                <p className="text-sm text-green-800">
                  <strong>{isEnglish ? 'Stripe Atlas Includes:' : 'Stripe Atlas İçerir:'}</strong>{' '}
                  {isEnglish
                    ? 'Delaware LLC formation, US bank account (Mercury or Silicon Valley Bank), EIN acquisition, and registered agent for one year. Cost: $500 one-time.'
                    : 'Delaware LLC kurulumu, ABD banka hesabı (Mercury veya Silicon Valley Bank), EIN edinimi ve bir yıllık kayıtlı acente. Maliyet: tek seferlik 500$.'}
                </p>
              </div>
            </section>

            {/* PayPal */}
            <section id="paypal" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'PayPal Business' : 'PayPal Business'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'PayPal is widely used and trusted by US clients. Turkish residents can open PayPal accounts and receive international payments.'
                  : 'PayPal, ABD müşterileri tarafından yaygın olarak kullanılır ve güvenilir. Türkiye\'de ikamet edenler PayPal hesabı açabilir ve uluslararası ödeme alabilir.'}
              </p>

              <div className="bg-gray-50 rounded-lg p-5 my-6">
                <h5 className="font-semibold text-black mb-3">{isEnglish ? 'PayPal Turkey Fees' : 'PayPal Türkiye Ücretleri'}</h5>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>{isEnglish ? 'Receiving payments: 3.4% + fixed fee' : 'Ödeme alma: %3,4 + sabit ücret'}</li>
                  <li>{isEnglish ? 'Currency conversion: 3-4% above mid-market rate' : 'Döviz çevirimi: orta piyasa kurunun %3-4 üzerinde'}</li>
                  <li>{isEnglish ? 'Withdrawal to Turkish bank: varies' : 'Türk bankasına çekme: değişken'}</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                <p className="text-sm text-amber-800">
                  <strong>{isEnglish ? 'Limitation:' : 'Kısıtlama:'}</strong>{' '}
                  {isEnglish
                    ? 'PayPal Turkey has limited functionality compared to US/EU accounts. Some features like PayPal Credit and certain business tools may not be available.'
                    : 'PayPal Türkiye, ABD/AB hesaplarına kıyasla sınırlı işlevselliğe sahiptir. PayPal Credit ve bazı iş araçları gibi özellikler mevcut olmayabilir.'}
                </p>
              </div>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'PayPal Invoicing' : 'PayPal Faturalama'}</h4>
              <p className="text-gray-700">
                {isEnglish
                  ? 'PayPal offers free invoicing tools that are useful for freelancers. Clients can pay invoices with their PayPal account or credit card.'
                  : 'PayPal, serbest çalışanlar için yararlı olan ücretsiz faturalama araçları sunar. Müşteriler faturaları PayPal hesapları veya kredi kartı ile ödeyebilir.'}
              </p>
            </section>

            {/* Wise */}
            <section id="wise" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Wise (formerly TransferWise)' : 'Wise (eski adıyla TransferWise)'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Wise offers multi-currency accounts with local account details in multiple countries. This allows US clients to pay you via local US bank transfer.'
                  : 'Wise, birden fazla ülkede yerel hesap detaylarıyla çoklu para birimi hesapları sunar. Bu, ABD müşterilerinin size yerel ABD banka transferi ile ödeme yapmasını sağlar.'}
              </p>

              <div className="bg-green-50 rounded-lg p-5 my-6">
                <h5 className="font-semibold text-green-900 mb-3">{isEnglish ? 'Wise Advantages' : 'Wise Avantajları'}</h5>
                <ul className="list-disc list-inside space-y-2 text-sm text-green-800">
                  <li>{isEnglish ? 'US account details (routing + account number) for ACH transfers' : 'ACH transferleri için ABD hesap detayları (routing + hesap numarası)'}</li>
                  <li>{isEnglish ? 'No fees to receive USD' : 'USD almak için ücret yok'}</li>
                  <li>{isEnglish ? 'Mid-market exchange rates with transparent fee (0.4-1%)' : 'Şeffaf ücretle orta piyasa döviz kurları (%0,4-1)'}</li>
                  <li>{isEnglish ? 'Hold balances in multiple currencies' : 'Birden fazla para biriminde bakiye tutma'}</li>
                  <li>{isEnglish ? 'Debit card available in some regions' : 'Bazı bölgelerde banka kartı mevcut'}</li>
                </ul>
              </div>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'How US Clients Pay You via Wise' : 'ABD Müşterileri Wise ile Nasıl Ödeme Yapar'}</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>{isEnglish ? 'You open Wise account and get US account details' : 'Wise hesabı açarsınız ve ABD hesap detayları alırsınız'}</li>
                <li>{isEnglish ? 'Share your US account details with the client' : 'ABD hesap detaylarınızı müşteriyle paylaşırsınız'}</li>
                <li>{isEnglish ? 'Client sends ACH or wire transfer (domestic US transfer)' : 'Müşteri ACH veya havale gönderir (yurt içi ABD transferi)'}</li>
                <li>{isEnglish ? 'Funds arrive in your Wise USD balance (1-3 days)' : 'Fonlar Wise USD bakiyenize ulaşır (1-3 gün)'}</li>
                <li>{isEnglish ? 'Convert to TRY and transfer to Turkish bank' : 'TRY\'ye çevirin ve Türk bankasına aktarın'}</li>
              </ol>
            </section>

            {/* Platform Comparison */}
            <section id="karsilastirma" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Platform Comparison' : 'Platform Karşılaştırması'}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 my-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Feature' : 'Özellik'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Stripe</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">PayPal</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Wise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b font-medium">{isEnglish ? 'Receiving Fee' : 'Alma Ücreti'}</td>
                      <td className="px-4 py-3 text-sm border-b">2.9% + $0.30</td>
                      <td className="px-4 py-3 text-sm border-b">3.4% + {isEnglish ? 'fixed' : 'sabit'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Free (ACH)' : 'Ücretsiz (ACH)'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b font-medium">{isEnglish ? 'FX Rate' : 'Döviz Kuru'}</td>
                      <td className="px-4 py-3 text-sm border-b">~1% {isEnglish ? 'markup' : 'fark'}</td>
                      <td className="px-4 py-3 text-sm border-b">3-4% {isEnglish ? 'markup' : 'fark'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Mid-market' : 'Orta piyasa'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b font-medium">{isEnglish ? 'Speed' : 'Hız'}</td>
                      <td className="px-4 py-3 text-sm border-b">7 {isEnglish ? 'days' : 'gün'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Instant' : 'Anında'}</td>
                      <td className="px-4 py-3 text-sm border-b">1-3 {isEnglish ? 'days' : 'gün'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b font-medium">{isEnglish ? 'Client Experience' : 'Müşteri Deneyimi'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Card payment' : 'Kart ödemesi'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'PayPal/Card' : 'PayPal/Kart'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Bank transfer' : 'Banka transferi'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">{isEnglish ? 'Best For' : 'En İyi Kullanım'}</td>
                      <td className="px-4 py-3 text-sm">{isEnglish ? 'SaaS, e-commerce' : 'SaaS, e-ticaret'}</td>
                      <td className="px-4 py-3 text-sm">{isEnglish ? 'Quick payments' : 'Hızlı ödemeler'}</td>
                      <td className="px-4 py-3 text-sm">{isEnglish ? 'Large invoices' : 'Büyük faturalar'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm text-blue-800">
                  <strong>{isEnglish ? 'Recommendation:' : 'Öneri:'}</strong>{' '}
                  {isEnglish
                    ? 'For large invoices ($1,000+), Wise typically offers the best value. For smaller recurring payments, Stripe or PayPal may be more convenient for clients.'
                    : 'Büyük faturalar (1.000$+) için Wise genellikle en iyi değeri sunar. Daha küçük tekrarlayan ödemeler için Stripe veya PayPal müşteriler için daha uygun olabilir.'}
                </p>
              </div>
            </section>

            {/* W-8BEN */}
            <section id="w8ben" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'W-8BEN Requirements' : 'W-8BEN Gereksinimleri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'The W-8BEN form certifies that you are not a US person for tax purposes. This is essential to avoid automatic 30% withholding on US-source income.'
                  : 'W-8BEN formu, vergi amaçları için ABD kişisi olmadığınızı onaylar. Bu, ABD kaynaklı gelir üzerindeki otomatik %30 stopajı önlemek için gereklidir.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Who Needs W-8BEN?' : 'W-8BEN Kime Gerekli?'}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>{isEnglish ? 'Individuals:' : 'Bireyler:'}</strong> {isEnglish ? 'W-8BEN (individual version)' : 'W-8BEN (bireysel versiyon)'}</li>
                <li><strong>{isEnglish ? 'Companies/LLCs:' : 'Şirketler/LLC\'ler:'}</strong> {isEnglish ? 'W-8BEN-E (entity version)' : 'W-8BEN-E (kuruluş versiyonu)'}</li>
              </ul>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Key Information Needed' : 'Gerekli Temel Bilgiler'}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{isEnglish ? 'Full legal name (as on passport)' : 'Tam yasal ad (pasaporttaki gibi)'}</li>
                <li>{isEnglish ? 'Country of citizenship: Turkey' : 'Vatandaşlık ülkesi: Türkiye'}</li>
                <li>{isEnglish ? 'Permanent residence address in Turkey' : 'Türkiye\'deki daimi ikamet adresi'}</li>
                <li>{isEnglish ? 'Turkish tax ID number (TC Kimlik No or Vergi Kimlik No)' : 'Türk vergi kimlik numarası (TC Kimlik No veya Vergi Kimlik No)'}</li>
                <li>{isEnglish ? 'Signature and date' : 'İmza ve tarih'}</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                <p className="text-sm text-green-800">
                  <strong>{isEnglish ? 'Turkey Tax Treaty Benefit:' : 'Türkiye Vergi Anlaşması Avantajı:'}</strong>{' '}
                  {isEnglish
                    ? 'Turkey has a tax treaty with the US. For most service income, this reduces withholding to 0%. Claim this benefit in Part II of W-8BEN by citing the US-Turkey treaty.'
                    : 'Türkiye\'nin ABD ile vergi anlaşması vardır. Çoğu hizmet geliri için bu, stopajı %0\'a düşürür. W-8BEN\'in Bölüm II\'sinde ABD-Türkiye anlaşmasına atıfta bulunarak bu avantajı talep edin.'}
                </p>
              </div>
            </section>

            {/* Stopaj */}
            <section id="stopaj" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Withholding Tax Rules' : 'Stopaj Vergi Kuralları'}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 my-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Income Type' : 'Gelir Türü'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Without Treaty' : 'Anlaşma Olmadan'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'With Turkey Treaty' : 'Türkiye Anlaşmasıyla'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Service fees (freelance)' : 'Hizmet ücretleri (serbest)'}</td>
                      <td className="px-4 py-3 text-sm border-b">30%</td>
                      <td className="px-4 py-3 text-sm border-b text-green-700 font-medium">0%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Royalties' : 'Telif hakları'}</td>
                      <td className="px-4 py-3 text-sm border-b">30%</td>
                      <td className="px-4 py-3 text-sm border-b">10%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Dividends' : 'Temettüler'}</td>
                      <td className="px-4 py-3 text-sm border-b">30%</td>
                      <td className="px-4 py-3 text-sm border-b">15%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">{isEnglish ? 'Interest' : 'Faiz'}</td>
                      <td className="px-4 py-3 text-sm">30%</td>
                      <td className="px-4 py-3 text-sm">10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                <p className="text-sm text-amber-800">
                  <strong>{isEnglish ? 'Note:' : 'Not:'}</strong>{' '}
                  {isEnglish
                    ? 'The 0% rate for service fees applies when you are providing services from Turkey and don\'t have a "permanent establishment" in the US. If you have a US office or spend significant time working in the US, different rules may apply.'
                    : '%0 oranı, Türkiye\'den hizmet sağladığınızda ve ABD\'de "daimi işyeriniz" olmadığında geçerlidir. ABD\'de bir ofisiniz varsa veya ABD\'de çalışarak önemli zaman geçiriyorsanız, farklı kurallar uygulanabilir.'}
                </p>
              </div>
            </section>

            {/* Fatura */}
            <section id="fatura" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Invoicing US Clients' : 'ABD Müşterilerine Fatura Kesme'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Professional invoices help establish credibility and ensure smooth payments. Include these elements:'
                  : 'Profesyonel faturalar güvenilirlik oluşturmaya ve sorunsuz ödemelere yardımcı olur. Şu unsurları ekleyin:'}
              </p>

              <div className="bg-gray-50 rounded-lg p-5 my-6">
                <h5 className="font-semibold text-black mb-3">{isEnglish ? 'Invoice Elements' : 'Fatura Unsurları'}</h5>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>{isEnglish ? 'Your business name and address (Turkey)' : 'İşletme adınız ve adresiniz (Türkiye)'}</li>
                  <li>{isEnglish ? 'Client name and address' : 'Müşteri adı ve adresi'}</li>
                  <li>{isEnglish ? 'Invoice number and date' : 'Fatura numarası ve tarihi'}</li>
                  <li>{isEnglish ? 'Detailed description of services' : 'Hizmetlerin detaylı açıklaması'}</li>
                  <li>{isEnglish ? 'Amount in USD' : 'USD cinsinden tutar'}</li>
                  <li>{isEnglish ? 'Payment terms (Net 15, Net 30, etc.)' : 'Ödeme koşulları (Net 15, Net 30, vb.)'}</li>
                  <li>{isEnglish ? 'Payment instructions (bank details, PayPal, etc.)' : 'Ödeme talimatları (banka detayları, PayPal, vb.)'}</li>
                  <li>{isEnglish ? 'Note: "W-8BEN on file - 0% withholding per US-Turkey treaty"' : 'Not: "W-8BEN dosyada - ABD-Türkiye anlaşması gereği %0 stopaj"'}</li>
                </ul>
              </div>
            </section>

            {/* Türkiye Vergi */}
            <section id="turkiye-vergi" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Turkey Tax Obligations' : 'Türkiye Vergi Yükümlülükleri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Income earned from US clients is still taxable in Turkey. As a Turkish tax resident, you must report worldwide income.'
                  : 'ABD müşterilerinden kazanılan gelir Türkiye\'de hâlâ vergiye tabidir. Türkiye\'de vergi mükellefi olarak, dünya genelindeki gelirinizi beyan etmelisiniz.'}
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
                <p className="text-sm text-red-800">
                  <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                  {isEnglish
                    ? 'Not reporting foreign income is tax evasion and can result in significant penalties. Work with a Turkish accountant (SMMM) to properly declare your income.'
                    : 'Yabancı geliri beyan etmemek vergi kaçırma olup önemli cezalarla sonuçlanabilir. Gelirinizi düzgün bir şekilde beyan etmek için bir Türk muhasebecisi (SMMM) ile çalışın.'}
                </p>
              </div>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Key Points for Turkey' : 'Türkiye için Önemli Noktalar'}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{isEnglish ? 'Report all USD income converted to TRY at transaction date rates' : 'Tüm USD gelirini işlem tarihi kurlarıyla TRY\'ye çevirerek beyan edin'}</li>
                <li>{isEnglish ? 'Quarterly advance tax payments may be required' : 'Üç aylık avans vergi ödemeleri gerekebilir'}</li>
                <li>{isEnglish ? 'Annual tax return deadline: March 31' : 'Yıllık vergi beyannamesi son tarihi: 31 Mart'}</li>
                <li>{isEnglish ? 'Keep all invoices and payment records for 5 years' : 'Tüm faturaları ve ödeme kayıtlarını 5 yıl saklayın'}</li>
              </ul>
            </section>

            {/* FAQ */}
            <section id="sss" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                {isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'Do I need a US LLC to receive US payments?' : 'ABD ödemeleri almak için ABD LLC\'sine ihtiyacım var mı?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'No. You can receive US payments as an individual Turkish freelancer using Wise, PayPal, or Stripe Turkey. A US LLC provides some advantages (US bank account, credibility) but is not required.'
                      : 'Hayır. Wise, PayPal veya Stripe Türkiye kullanarak bireysel Türk serbest çalışan olarak ABD ödemeleri alabilirsiniz. ABD LLC\'si bazı avantajlar sağlar (ABD banka hesabı, güvenilirlik) ancak zorunlu değildir.'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'What if my client doesn\'t accept W-8BEN?' : 'Müşterim W-8BEN\'i kabul etmezse ne olur?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Most US companies are legally required to collect W-8BEN from foreign contractors. If a client is unfamiliar with the form, explain that it\'s a standard IRS requirement. Without it, they should withhold 30%.'
                      : 'Çoğu ABD şirketi, yabancı yüklenicilerden yasal olarak W-8BEN toplamak zorundadır. Müşteri formu bilmiyorsa, bunun standart bir IRS gereksinimi olduğunu açıklayın. Bu olmadan %30 kesinti yapmalıdırlar.'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'Which platform has the lowest fees for $5,000 payment?' : 'Hangi platform 5.000$ ödeme için en düşük ücrete sahip?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Wise: $0 to receive + ~$35 (0.7%) to convert = ~$35 total. Stripe: $145 (2.9%) + ~$35 FX = ~$180 total. PayPal: $170 (3.4%) + ~$175 FX (3.5%) = ~$345 total. For large invoices, Wise is usually best.'
                      : 'Wise: Almak için 0$ + çevirmek için ~35$ (%0,7) = toplam ~35$. Stripe: 145$ (%2,9) + ~35$ döviz = toplam ~180$. PayPal: 170$ (%3,4) + ~175$ döviz (%3,5) = toplam ~345$. Büyük faturalar için Wise genellikle en iyisidir.'}
                  </p>
                </div>

                <div className="pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'Can I hold USD instead of converting to TRY?' : 'TRY\'ye çevirmek yerine USD tutabilir miyim?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Yes, with Wise you can hold USD balance indefinitely. This can be useful for hedging against TRY depreciation or paying USD expenses. However, for Turkish tax purposes, you must still report the income when earned (at that day\'s exchange rate).'
                      : 'Evet, Wise ile USD bakiyesini süresiz olarak tutabilirsiniz. Bu, TRY değer kaybına karşı korunmak veya USD giderleri ödemek için yararlı olabilir. Ancak Türkiye vergi amaçları için, geliri kazanıldığında (o günün döviz kuruyla) beyan etmeniz gerekir.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Related Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Related Guides' : 'İlgili Rehberler'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-black">{isEnglish ? 'IRS & W-8/W-9 Guide' : 'IRS ve W-8/W-9 Rehberi'}</span>
                  <span className="block text-sm text-gray-600 mt-1">{isEnglish ? 'Tax forms explained in detail' : 'Vergi formları detaylı açıklandı'}</span>
                </Link>
                <Link
                  href={`/${lang}/abdde-banka-hesabi-acmak`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-black">{isEnglish ? 'US Bank Account Guide' : 'ABD Banka Hesabı Rehberi'}</span>
                  <span className="block text-sm text-gray-600 mt-1">{isEnglish ? 'Opening accounts as non-resident' : 'Yabancı olarak hesap açma'}</span>
                </Link>
                <Link
                  href={`/${lang}/legal-kits/business-starter`}
                  className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors border border-amber-200"
                >
                  <span className="font-medium text-black">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</span>
                  <span className="block text-sm text-gray-600 mt-1">{isEnglish ? '5 essential contract templates' : '5 temel sözleşme şablonu'}</span>
                </Link>
                <Link
                  href={`/${lang}/ein-itin-ssn-farki`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-black">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</span>
                  <span className="block text-sm text-gray-600 mt-1">{isEnglish ? 'Tax ID numbers explained' : 'Vergi kimlik numaraları açıklandı'}</span>
                </Link>
              </div>
            </section>

            {/* Cite This Entry */}
            <CiteThisEntry
              lang={lang}
              title={pageTitle}
              url={pageUrl}
              dateModified={PAGE_META.dateModified}
              version={PAGE_META.version}
              citationKey={PAGE_META.citationKey}
              contentType="jurisdictional-guide"
              className="mb-8"
            />

            {/* Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Disclaimer' : 'Yasal Uyarı'}</p>
              <p>
                {isEnglish
                  ? 'This guide is for informational purposes only and does not constitute tax, legal, or financial advice. Payment platform terms and fees may change. Consult with qualified professionals for your specific situation.'
                  : 'Bu rehber yalnızca bilgilendirme amaçlıdır ve vergi, hukuki veya mali tavsiye niteliği taşımaz. Ödeme platformu koşulları ve ücretleri değişebilir. Özel durumunuz için nitelikli profesyonellere danışın.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
