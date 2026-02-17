// app/[lang]/ein-itin-ssn-farki/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { getArticleMetadata } from '@/lib/article-metadata'
import { getFeaturedSnippet } from '@/components/FeaturedSnippet'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const ARTICLE_SLUG = 'ein-itin-ssn-farki'

const PAGE_META = {
  slug: 'ein-itin-ssn-farki',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-enc-00010',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'EIN vs ITIN vs SSN: Which Tax ID Do You Need? | EchoLegal'
    : 'EIN, ITIN ve SSN Farkları: Hangi Vergi Kimliğine İhtiyacınız Var? | EchoLegal'

  const description = isEnglish
    ? 'Complete guide to US tax identification numbers for Turkish entrepreneurs. EIN for businesses, ITIN for individuals without SSN eligibility, SSN for authorized workers.'
    : 'Türk girişimciler için ABD vergi kimlik numaralarına kapsamlı rehber. İşletmeler için EIN, SSN alamayanlar için ITIN, çalışma izni olanlar için SSN.'

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
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/${PAGE_META.slug}`,
        'x-default': `${SITE_URL}/en/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN ve SSN Farkı',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
      'citation_lastmod': '2026/01/25',
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

export default async function EinItinSsnPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN ve SSN Farkı'

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Complete guide to US tax identification numbers for Turkish entrepreneurs.'
      : 'Türk girişimciler için ABD vergi kimlik numaralarına kapsamlı rehber.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['ein', 'itin', 'ssn', 'tax-identification'],
    section: 'encyclopedia-entry',
  })

  const breadcrumbSchemaNew = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Tax & ID Hub' : 'Vergi ve Kimlik', url: `${SITE_URL}/${lang}/vergi-kimlik-rehberi` },
    { name: pageTitle, url: pageUrl },
  ])

  const tocItems = [
    { id: 'genel-bakis', label: isEnglish ? 'Overview: Three Numbers, Three Purposes' : 'Genel Bakış: Üç Numara, Üç Amaç' },
    { id: 'ssn', label: isEnglish ? 'SSN (Social Security Number)' : 'SSN (Sosyal Güvenlik Numarası)' },
    { id: 'ein', label: isEnglish ? 'EIN (Employer Identification Number)' : 'EIN (İşveren Kimlik Numarası)' },
    { id: 'itin', label: isEnglish ? 'ITIN (Individual Taxpayer Identification Number)' : 'ITIN (Bireysel Vergi Mükellefi Kimlik Numarası)' },
    { id: 'karsilastirma', label: isEnglish ? 'Comparison Table' : 'Karşılaştırma Tablosu' },
    { id: 'senaryolar', label: isEnglish ? 'Common Scenarios' : 'Yaygın Senaryolar' },
    { id: 'basvuru', label: isEnglish ? 'How to Apply' : 'Nasıl Başvurulur' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
    { id: 'kaynaklar', label: isEnglish ? 'Sources' : 'Kaynaklar' },
  ]

  const articleMeta = getArticleMetadata(ARTICLE_SLUG)
  const featuredSnippet = getFeaturedSnippet(ARTICLE_SLUG)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'EIN vs ITIN vs SSN: Which Tax ID Do You Need?'
      : 'EIN, ITIN ve SSN Farkları',
    author: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: articleMeta?.datePublished || '2025-08-20',
    dateModified: articleMeta?.dateModified || '2026-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/ein-itin-ssn-farki`,
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
        name: isEnglish ? 'Tax & ID Guide' : 'Vergi ve Kimlik Rehberi',
        item: `https://echo-legal.com/${lang}/vergi-kimlik-rehberi`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları',
        item: `https://echo-legal.com/${lang}/ein-itin-ssn-farki`,
      },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isEnglish ? 'Can I get an EIN without an SSN?' : 'SSN olmadan EIN alabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'Yes. Non-US persons can obtain an EIN for their US business without having an SSN. You can apply by mail or fax using Form SS-4.'
            : 'Evet. ABD vatandaşı olmayanlar, SSN olmadan ABD işletmeleri için EIN alabilir. Form SS-4 kullanarak posta veya faks ile başvurabilirsiniz.',
        },
      },
      {
        '@type': 'Question',
        name: isEnglish ? 'Do I need an ITIN if my LLC has an EIN?' : 'LLC\'min EIN\'i varsa ITIN\'e ihtiyacım var mı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'Not necessarily. The EIN is for your LLC. You may need an ITIN personally only if you have individual US tax filing obligations, such as filing Form 1040-NR.'
            : 'Zorunlu değil. EIN, LLC\'niz içindir. ITIN\'e kişisel olarak yalnızca Form 1040-NR gibi bireysel ABD vergi beyannamesi yükümlülükleriniz varsa ihtiyacınız olabilir.',
        },
      },
    ],
  }

  const primarySources = getPrimarySources(ARTICLE_SLUG, isEnglish ? 'en' : 'tr')

  return (
    <>
      <div className="bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <JsonLdScript data={[articleSchema, breadcrumbSchemaNew, jsonLd, breadcrumbJsonLd, faqJsonLd]} />
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/vergi-kimlik-rehberi`} className="hover:text-black">{isEnglish ? 'Tax & ID Hub' : 'Vergi ve Kimlik'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Tax ID Guide' : 'Vergi Kimlik Rehberi'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
                {isEnglish
                  ? 'EIN vs ITIN vs SSN: Which Tax ID Do You Need?'
                  : 'EIN, ITIN ve SSN Farkları: Hangisine İhtiyacınız Var?'}
              </h1>

              {/* Authority signals */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  EchoLegal
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Updated: January 25, 2026' : 'Güncellendi: 25 Ocak 2026'}
                </span>
                <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Reviewed by a licensed attorney' : 'Lisanslı avukat tarafından incelendi'}
                </span>
              </div>

              {/* Featured snippet block */}
              {featuredSnippet && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed">
                    {featuredSnippet[lang]}
                  </p>
                </div>
              )}

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'The IRS uses different identification numbers for different purposes. Understanding which one applies to your situation is essential for compliance and opening business accounts.'
                  : 'IRS, farklı amaçlar için farklı kimlik numaraları kullanır. Hangisinin durumunuza uygun olduğunu anlamak, uyumluluk ve iş hesabı açmak için önemlidir.'}
              </p>

              <InstitutionalBadge
                lang={lang}
                jurisdictions={['US']}
                lastReviewedAt={PAGE_META.dateModified}
                className="mb-8"
              />
            </header>

            {/* Key Takeaway Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-10">
              <h2 className="font-bold text-gray-900 mb-2">{isEnglish ? 'Quick Summary' : 'Hızlı Özet'}</h2>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>SSN</strong> – {isEnglish ? 'For US citizens and work-authorized individuals' : 'ABD vatandaşları ve çalışma izni olanlar için'}</li>
                <li>• <strong>EIN</strong> – {isEnglish ? 'For businesses (LLC, Corp) — you can get this without an SSN' : 'İşletmeler için (LLC, Corp) — SSN olmadan alınabilir'}</li>
                <li>• <strong>ITIN</strong> – {isEnglish ? 'For individuals with US tax obligations but no SSN eligibility' : 'ABD vergi yükümlülüğü olan ancak SSN alamayan bireyler için'}</li>
              </ul>
            </div>

            {/* Table of Contents */}
            <nav className="bg-gray-50 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
              <ol className="space-y-2">
                {tocItems.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-black hover:underline">
                      {index + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1: Overview */}
            <section id="genel-bakis" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '1. Overview: Three Numbers, Three Purposes' : '1. Genel Bakış: Üç Numara, Üç Amaç'}
              </h2>

              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>The US tax system relies on identification numbers to track taxpayers and their obligations. For Turkish entrepreneurs, understanding these numbers is crucial because:</p>
                    <ul>
                      <li>US clients may ask you for a tax ID before they can pay you</li>
                      <li>Banks require a tax ID to open business accounts</li>
                      <li>Payment processors (Stripe, PayPal) require tax identification</li>
                      <li>Filing requirements depend on having the correct ID type</li>
                    </ul>
                    <p>The three main numbers — SSN, EIN, and ITIN — serve distinct purposes and have different eligibility requirements.</p>
                  </>
                ) : (
                  <>
                    <p>ABD vergi sistemi, mükellefleri ve yükümlülüklerini takip etmek için kimlik numaralarına dayanır. Türk girişimciler için bu numaraları anlamak önemlidir çünkü:</p>
                    <ul>
                      <li>ABD müşterileri size ödeme yapmadan önce vergi kimliği isteyebilir</li>
                      <li>Bankalar iş hesabı açmak için vergi kimliği gerektirir</li>
                      <li>Ödeme işlemcileri (Stripe, PayPal) vergi kimliği gerektirir</li>
                      <li>Beyanname gereksinimleri doğru kimlik türüne sahip olmaya bağlıdır</li>
                    </ul>
                    <p>Üç ana numara — SSN, EIN ve ITIN — farklı amaçlara hizmet eder ve farklı uygunluk gereksinimleri vardır.</p>
                  </>
                )}
              </div>
            </section>

            {/* Section 2: SSN */}
            <section id="ssn" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. SSN (Social Security Number)' : '2. SSN (Sosyal Güvenlik Numarası)'}
              </h2>

              <div className="border-l-4 border-blue-500 pl-4 py-2 mb-6">
                <p className="font-bold text-black">{isEnglish ? 'Format:' : 'Format:'} XXX-XX-XXXX (9 digits)</p>
                <p className="text-gray-600 text-sm">{isEnglish ? 'Issued by: Social Security Administration (SSA)' : 'Veren kurum: Sosyal Güvenlik İdaresi (SSA)'}</p>
              </div>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'Who Can Get an SSN?' : 'Kim SSN Alabilir?'}</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>{isEnglish ? 'US citizens (by birth or naturalization)' : 'ABD vatandaşları (doğum veya vatandaşlığa alınma yoluyla)'}</li>
                <li>{isEnglish ? 'Permanent residents (green card holders)' : 'Sürekli oturum izni olanlar (yeşil kart sahipleri)'}</li>
                <li>{isEnglish ? 'Temporary workers with valid work authorization (H-1B, L-1, O-1, etc.)' : 'Geçerli çalışma izni olan geçici işçiler (H-1B, L-1, O-1 vb.)'}</li>
                <li>{isEnglish ? 'Students with work authorization (F-1 OPT, CPT)' : 'Çalışma izni olan öğrenciler (F-1 OPT, CPT)'}</li>
              </ul>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'What SSN Is Used For' : 'SSN Ne İçin Kullanılır'}</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>{isEnglish ? 'Employment and payroll reporting' : 'İstihdam ve bordro raporlaması'}</li>
                <li>{isEnglish ? 'Personal income tax filing (Form 1040)' : 'Kişisel gelir vergisi beyannamesi (Form 1040)'}</li>
                <li>{isEnglish ? 'Opening personal bank accounts and credit applications' : 'Kişisel banka hesabı açma ve kredi başvuruları'}</li>
                <li>{isEnglish ? 'Social Security benefits eligibility' : 'Sosyal Güvenlik yardımları uygunluğu'}</li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                  {isEnglish
                    ? 'You cannot obtain an SSN without work authorization in the US. Tourist visas (B-1/B-2) do not provide work authorization, so visitors cannot get an SSN.'
                    : 'ABD\'de çalışma izni olmadan SSN alamazsınız. Turist vizeleri (B-1/B-2) çalışma izni sağlamaz, bu nedenle ziyaretçiler SSN alamaz.'}
                </p>
              </div>
            </section>

            {/* Section 3: EIN */}
            <section id="ein" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. EIN (Employer Identification Number)' : '3. EIN (İşveren Kimlik Numarası)'}
              </h2>

              <div className="border-l-4 border-green-500 pl-4 py-2 mb-6">
                <p className="font-bold text-black">{isEnglish ? 'Format:' : 'Format:'} XX-XXXXXXX (9 digits)</p>
                <p className="text-gray-600 text-sm">{isEnglish ? 'Issued by: Internal Revenue Service (IRS)' : 'Veren kurum: İç Gelir Servisi (IRS)'}</p>
              </div>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'Who Needs an EIN?' : 'Kim EIN\'e İhtiyaç Duyar?'}</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>{isEnglish ? 'LLCs (single-member or multi-member)' : 'LLC\'ler (tek üyeli veya çok üyeli)'}</li>
                <li>{isEnglish ? 'Corporations (C-Corp, S-Corp)' : 'Şirketler (C-Corp, S-Corp)'}</li>
                <li>{isEnglish ? 'Partnerships' : 'Ortaklıklar'}</li>
                <li>{isEnglish ? 'Any business that will hire employees' : 'Çalışan işe alacak herhangi bir işletme'}</li>
                <li>{isEnglish ? 'Businesses opening a bank account' : 'Banka hesabı açacak işletmeler'}</li>
              </ul>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'Key Benefits for Non-Residents' : 'Yabancılar İçin Temel Avantajlar'}</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <ul className="text-sm text-green-800 space-y-2">
                  <li>✓ {isEnglish ? 'Can be obtained without an SSN or ITIN' : 'SSN veya ITIN olmadan alınabilir'}</li>
                  <li>✓ {isEnglish ? 'Required to open a US business bank account' : 'ABD iş banka hesabı açmak için gerekli'}</li>
                  <li>✓ {isEnglish ? 'Needed for payment processors (Stripe, PayPal Business)' : 'Ödeme işlemcileri için gerekli (Stripe, PayPal Business)'}</li>
                  <li>✓ {isEnglish ? 'Used on W-9 forms when your LLC receives payments' : 'LLC\'niz ödeme aldığında W-9 formlarında kullanılır'}</li>
                </ul>
              </div>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'What EIN Cannot Do' : 'EIN Ne Yapamaz'}</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>{isEnglish ? 'Cannot be used for personal tax filing (you need SSN or ITIN)' : 'Kişisel vergi beyannamesi için kullanılamaz (SSN veya ITIN gerekir)'}</li>
                <li>{isEnglish ? 'Does not provide work authorization' : 'Çalışma izni sağlamaz'}</li>
                <li>{isEnglish ? 'Cannot be used to open personal bank accounts' : 'Kişisel banka hesabı açmak için kullanılamaz'}</li>
              </ul>
            </section>

            {/* Section 4: ITIN */}
            <section id="itin" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '4. ITIN (Individual Taxpayer Identification Number)' : '4. ITIN (Bireysel Vergi Mükellefi Kimlik Numarası)'}
              </h2>

              <div className="border-l-4 border-purple-500 pl-4 py-2 mb-6">
                <p className="font-bold text-black">{isEnglish ? 'Format:' : 'Format:'} 9XX-XX-XXXX (always starts with 9)</p>
                <p className="text-gray-600 text-sm">{isEnglish ? 'Issued by: Internal Revenue Service (IRS)' : 'Veren kurum: İç Gelir Servisi (IRS)'}</p>
              </div>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'Who Needs an ITIN?' : 'Kim ITIN\'e İhtiyaç Duyar?'}</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>{isEnglish ? 'Foreign nationals who have US tax filing obligations but are not eligible for an SSN' : 'ABD vergi beyannamesi yükümlülüğü olan ancak SSN almaya uygun olmayan yabancı uyruklu kişiler'}</li>
                <li>{isEnglish ? 'Non-resident aliens required to file a US tax return' : 'ABD vergi beyannamesi vermesi gereken yerleşik olmayan yabancılar'}</li>
                <li>{isEnglish ? 'Dependents or spouses of US citizens/residents who cannot get SSN' : 'SSN alamayan ABD vatandaşlarının/mukimlerinin bağımlıları veya eşleri'}</li>
              </ul>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'When Do You Actually Need an ITIN?' : 'Gerçekte Ne Zaman ITIN\'e İhtiyacınız Var?'}</h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-purple-800 mb-2">
                  {isEnglish
                    ? 'Not everyone with a US LLC needs an ITIN. You typically need one when:'
                    : 'ABD LLC\'si olan herkesin ITIN\'e ihtiyacı yoktur. Genellikle şu durumlarda ihtiyacınız olur:'}
                </p>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• {isEnglish ? 'You must file a personal US tax return (Form 1040-NR)' : 'Kişisel ABD vergi beyannamesi vermeniz gerekiyorsa (Form 1040-NR)'}</li>
                  <li>• {isEnglish ? 'You\'re claiming tax treaty benefits that require individual identification' : 'Bireysel kimlik gerektiren vergi anlaşması avantajları talep ediyorsanız'}</li>
                  <li>• {isEnglish ? 'You need to file Form 8833 (treaty-based return position)' : 'Form 8833 dosyalamanız gerekiyorsa (anlaşmaya dayalı beyanname pozisyonu)'}</li>
                </ul>
              </div>

              <h3 className="font-bold text-black mb-2">{isEnglish ? 'What ITIN Cannot Do' : 'ITIN Ne Yapamaz'}</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>{isEnglish ? 'Does not authorize work in the US' : 'ABD\'de çalışma izni vermez'}</li>
                <li>{isEnglish ? 'Does not provide eligibility for Social Security benefits' : 'Sosyal Güvenlik yardımları için uygunluk sağlamaz'}</li>
                <li>{isEnglish ? 'Does not change your immigration status' : 'Göçmenlik statünüzü değiştirmez'}</li>
              </ul>
            </section>

            {/* Section 5: Comparison Table */}
            <section id="karsilastirma" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '5. Comparison Table' : '5. Karşılaştırma Tablosu'}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Feature' : 'Özellik'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-center bg-blue-50">SSN</th>
                      <th className="border border-gray-200 px-4 py-3 text-center bg-green-50">EIN</th>
                      <th className="border border-gray-200 px-4 py-3 text-center bg-purple-50">ITIN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'Issued to' : 'Kime verilir'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{isEnglish ? 'Individuals (with work auth)' : 'Bireyler (çalışma izni ile)'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{isEnglish ? 'Businesses' : 'İşletmeler'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{isEnglish ? 'Individuals (no SSN eligible)' : 'Bireyler (SSN alamayanlar)'}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'Issuing agency' : 'Veren kurum'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">SSA</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">IRS</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">IRS</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'Requires US presence?' : 'ABD\'de bulunma gerekir mi?'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{isEnglish ? 'Yes' : 'Evet'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{isEnglish ? 'No' : 'Hayır'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">{isEnglish ? 'No*' : 'Hayır*'}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'Authorizes work?' : 'Çalışma izni verir mi?'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-green-600">✓</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-red-600">✕</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-red-600">✕</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'For business bank account?' : 'İş banka hesabı için?'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-red-600">✕</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-green-600">✓</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-red-600">✕</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'For personal tax filing?' : 'Kişisel vergi beyanı için?'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-green-600">✓</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-red-600">✕</td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-green-600">✓</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'Application form' : 'Başvuru formu'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">SS-5</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">SS-4</td>
                      <td className="border border-gray-200 px-4 py-3 text-center">W-7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {isEnglish
                  ? '* ITIN can be applied for by mail, but may require certified document copies or in-person verification through an IRS Acceptance Agent.'
                  : '* ITIN posta ile başvurulabilir, ancak onaylı belge kopyaları veya IRS Kabul Acentesi aracılığıyla yüz yüze doğrulama gerektirebilir.'}
              </p>
            </section>

            {/* Section 6: Scenarios */}
            <section id="senaryolar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Common Scenarios' : '6. Yaygın Senaryolar'}
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4">
                    <h3 className="font-bold text-black">
                      {isEnglish
                        ? 'Scenario 1: Turkish freelancer in Turkey, no US entity'
                        : 'Senaryo 1: Türkiye\'deki Türk serbest çalışan, ABD şirketi yok'}
                    </h3>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>{isEnglish ? 'Need:' : 'İhtiyaç:'}</strong>{' '}
                      {isEnglish
                        ? 'W-8BEN form to provide to US clients. No US tax ID typically required unless you have US filing obligations.'
                        : 'ABD müşterilerine sağlamak için W-8BEN formu. ABD beyanname yükümlülüğünüz olmadıkça genellikle ABD vergi kimliği gerekmez.'}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>{isEnglish ? 'Numbers needed:' : 'Gereken numaralar:'}</strong>{' '}
                      {isEnglish ? 'None (use Turkish tax ID on W-8BEN)' : 'Yok (W-8BEN\'de Türk vergi kimliğini kullanın)'}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4">
                    <h3 className="font-bold text-black">
                      {isEnglish
                        ? 'Scenario 2: Turkish entrepreneur forms US LLC (from Turkey)'
                        : 'Senaryo 2: Türk girişimci ABD LLC kuruyor (Türkiye\'den)'}
                    </h3>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>{isEnglish ? 'Need:' : 'İhtiyaç:'}</strong>{' '}
                      {isEnglish
                        ? 'EIN for the LLC to open bank accounts and receive payments.'
                        : 'Banka hesabı açmak ve ödeme almak için LLC için EIN.'}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>{isEnglish ? 'Numbers needed:' : 'Gereken numaralar:'}</strong>{' '}
                      {isEnglish ? 'EIN (can apply without SSN)' : 'EIN (SSN olmadan başvurulabilir)'}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>{isEnglish ? 'ITIN?' : 'ITIN?'}</strong>{' '}
                      {isEnglish
                        ? 'Not necessarily — only if you have personal US tax filing obligations.'
                        : 'Zorunlu değil — yalnızca kişisel ABD vergi beyannamesi yükümlülüğünüz varsa.'}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4">
                    <h3 className="font-bold text-black">
                      {isEnglish
                        ? 'Scenario 3: Turkish national on H-1B visa working in US'
                        : 'Senaryo 3: ABD\'de H-1B vizesiyle çalışan Türk vatandaşı'}
                    </h3>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>{isEnglish ? 'Need:' : 'İhtiyaç:'}</strong>{' '}
                      {isEnglish
                        ? 'SSN for employment and personal tax filing.'
                        : 'İstihdam ve kişisel vergi beyannamesi için SSN.'}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>{isEnglish ? 'Numbers needed:' : 'Gereken numaralar:'}</strong>{' '}
                      {isEnglish ? 'SSN (eligible due to work authorization)' : 'SSN (çalışma izni nedeniyle uygun)'}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4">
                    <h3 className="font-bold text-black">
                      {isEnglish
                        ? 'Scenario 4: Turkish entrepreneur with US LLC, needs to file 1040-NR'
                        : 'Senaryo 4: ABD LLC\'li Türk girişimci, 1040-NR vermesi gerekiyor'}
                    </h3>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>{isEnglish ? 'Need:' : 'İhtiyaç:'}</strong>{' '}
                      {isEnglish
                        ? 'ITIN for personal tax filing since no SSN eligibility.'
                        : 'SSN uygunluğu olmadığı için kişisel vergi beyannamesi için ITIN.'}
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>{isEnglish ? 'Numbers needed:' : 'Gereken numaralar:'}</strong>{' '}
                      {isEnglish ? 'EIN (for LLC) + ITIN (for personal filing)' : 'EIN (LLC için) + ITIN (kişisel beyanname için)'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: How to Apply */}
            <section id="basvuru" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. How to Apply' : '7. Nasıl Başvurulur'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black mb-2">{isEnglish ? 'Applying for EIN' : 'EIN Başvurusu'}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li><strong>{isEnglish ? 'Form:' : 'Form:'}</strong> SS-4</li>
                      <li><strong>{isEnglish ? 'Method:' : 'Yöntem:'}</strong> {isEnglish ? 'Online (if you have SSN/ITIN), by fax, or by mail' : 'Online (SSN/ITIN varsa), faks veya posta ile'}</li>
                      <li><strong>{isEnglish ? 'For non-residents:' : 'Yabancılar için:'}</strong> {isEnglish ? 'Apply by fax to (855) 641-6935 or mail to IRS' : 'Faks ile (855) 641-6935 veya IRS\'e posta ile başvurun'}</li>
                      <li><strong>{isEnglish ? 'Processing time:' : 'İşlem süresi:'}</strong> {isEnglish ? '4-6 weeks by mail, 4-5 business days by fax' : 'Posta ile 4-6 hafta, faks ile 4-5 iş günü'}</li>
                      <li><strong>{isEnglish ? 'Cost:' : 'Maliyet:'}</strong> {isEnglish ? 'Free' : 'Ücretsiz'}</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-black mb-2">{isEnglish ? 'Applying for ITIN' : 'ITIN Başvurusu'}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li><strong>{isEnglish ? 'Form:' : 'Form:'}</strong> W-7</li>
                      <li><strong>{isEnglish ? 'Requirements:' : 'Gereksinimler:'}</strong> {isEnglish ? 'Must attach a valid federal tax return (unless exception applies)' : 'Geçerli federal vergi beyannamesi eklenmeli (istisna yoksa)'}</li>
                      <li><strong>{isEnglish ? 'Documents:' : 'Belgeler:'}</strong> {isEnglish ? 'Passport or combination of identity documents' : 'Pasaport veya kimlik belgelerinin kombinasyonu'}</li>
                      <li><strong>{isEnglish ? 'Method:' : 'Yöntem:'}</strong> {isEnglish ? 'Mail to IRS ITIN Operation, or through Certified Acceptance Agent (CAA)' : 'IRS ITIN Operasyonuna posta veya Sertifikalı Kabul Acentesi (CAA) aracılığıyla'}</li>
                      <li><strong>{isEnglish ? 'Processing time:' : 'İşlem süresi:'}</strong> {isEnglish ? '7-11 weeks' : '7-11 hafta'}</li>
                      <li><strong>{isEnglish ? 'Cost:' : 'Maliyet:'}</strong> {isEnglish ? 'Free (CAAs may charge service fees)' : 'Ücretsiz (CAA\'lar hizmet ücreti alabilir)'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: FAQ */}
            <section id="sss" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '8. Frequently Asked Questions' : '8. Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    q: 'Can I get an EIN without an SSN?',
                    a: 'Yes. Non-US persons can obtain an EIN for their US business without having an SSN. You apply by mail or fax using Form SS-4. The form asks for a "responsible party" — you can use your name and foreign address.',
                  },
                  {
                    q: 'Do I need an ITIN if my LLC has an EIN?',
                    a: 'Not necessarily. The EIN is for your LLC. You may need an ITIN personally only if you have individual US tax filing obligations, such as filing Form 1040-NR.',
                  },
                  {
                    q: 'Can I use my EIN to open a personal bank account?',
                    a: 'No. EIN is for business accounts only. For personal accounts, you need an SSN or ITIN (though many banks won\'t accept ITIN-only).',
                  },
                  {
                    q: 'Does having an EIN give me work authorization?',
                    a: 'No. An EIN is a tax identification number only. It does not authorize you to work in the US or change your immigration status.',
                  },
                  {
                    q: 'My ITIN expired. What do I do?',
                    a: 'ITINs that haven\'t been used on a tax return for 3 consecutive years expire. You\'ll need to renew by submitting Form W-7 with required documentation.',
                  },
                ] : [
                  {
                    q: 'SSN olmadan EIN alabilir miyim?',
                    a: 'Evet. ABD vatandaşı olmayanlar, SSN olmadan ABD işletmeleri için EIN alabilir. Form SS-4 kullanarak posta veya faks ile başvurursunuz. Formda "sorumlu taraf" istenir — kendi adınızı ve yabancı adresinizi kullanabilirsiniz.',
                  },
                  {
                    q: 'LLC\'min EIN\'i varsa ITIN\'e ihtiyacım var mı?',
                    a: 'Zorunlu değil. EIN, LLC\'niz içindir. ITIN\'e kişisel olarak yalnızca Form 1040-NR gibi bireysel ABD vergi beyannamesi yükümlülükleriniz varsa ihtiyacınız olabilir.',
                  },
                  {
                    q: 'EIN\'imi kişisel banka hesabı açmak için kullanabilir miyim?',
                    a: 'Hayır. EIN yalnızca iş hesapları içindir. Kişisel hesaplar için SSN veya ITIN gerekir (ancak birçok banka yalnızca ITIN kabul etmez).',
                  },
                  {
                    q: 'EIN\'e sahip olmak bana çalışma izni verir mi?',
                    a: 'Hayır. EIN yalnızca bir vergi kimlik numarasıdır. ABD\'de çalışma izni vermez veya göçmenlik statünüzü değiştirmez.',
                  },
                  {
                    q: 'ITIN\'im süresi doldu. Ne yapmalıyım?',
                    a: 'Art arda 3 yıl vergi beyannamesinde kullanılmayan ITIN\'lerin süresi dolar. Gerekli belgelerle Form W-7 göndererek yenilemeniz gerekir.',
                  },
                ]).map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4">
                      <h3 className="font-semibold text-black">{faq.q}</h3>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-gray-700 text-sm">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Sources */}
            <section id="kaynaklar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '9. Sources & Official Links' : '9. Kaynaklar ve Resmi Bağlantılar'}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/individuals/international-taxpayers/taxpayer-identification-numbers-tin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Taxpayer Identification Numbers (TIN)
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Official overview of all tax ID types' : 'Tüm vergi kimlik türlerinin resmi genel bakışı'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Apply for EIN
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'EIN application instructions' : 'EIN başvuru talimatları'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/individuals/individual-taxpayer-identification-number" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Individual Taxpayer Identification Number (ITIN)
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'ITIN requirements and application' : 'ITIN gereksinimleri ve başvurusu'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.ssa.gov/ssnumber/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      SSA – Social Security Number
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'SSN eligibility and application' : 'SSN uygunluğu ve başvurusu'}</p>
                  </div>
                </div>
              </div>
            </section>

            <PrimarySources sources={primarySources} lang={isEnglish ? 'en' : 'tr'} />

            {/* Related Resources */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'W-8/W-9 Tax Guide' : 'W-8/W-9 Vergi Rehberi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Which tax form to sign' : 'Hangi vergi formunu imzalamalı'}</p>
                </Link>
                <Link href={`/${lang}/1099-vergi-belgeleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? '1099 & Tax Documents' : '1099 ve Vergi Belgeleri'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Understanding US tax forms' : 'ABD vergi formlarını anlama'}</p>
                </Link>
                <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates in one bundle' : 'Tek pakette 5 temel sözleşme şablonu'}</p>
                </Link>
                <Link href={`/${lang}/abdde-banka-hesabi-acmak`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'US Bank Account' : 'ABD Banka Hesabı'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Opening business banking' : 'İş banka hesabı açma'}</p>
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
              contentType="encyclopedia-entry"
              className="mb-8"
            />

            {/* Final Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute tax, legal, or immigration advice. Tax ID requirements depend on your specific situation. Always consult a qualified CPA or tax attorney for advice specific to your circumstances. EchoLegal is not a law firm, accounting firm, or tax advisory service.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi, hukuki veya göçmenlik danışmanlığı teşkil etmez. Vergi kimlik gereksinimleri durumunuza bağlıdır. Kendi durumunuza özgü tavsiye için mutlaka uzman bir mali müşavir veya vergi avukatına danışın. EchoLegal bir hukuk bürosu, muhasebe firması veya vergi danışmanlık hizmeti değildir.'}
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
