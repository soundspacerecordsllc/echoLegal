// app/[lang]/foreign-owned-single-member-llc-reporting/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import PrimarySources from '@/components/PrimarySources'
import type { PrimarySourceEntry } from '@/lib/content-schema'

const ENTRY_SLUG = 'foreign-owned-single-member-llc-reporting'

const ENTRY_META = {
  version: '1.0',
  lastReviewed: '2026-02-16',
  reviewStatus: 'Attorney Reviewed',
  jurisdiction: 'US Federal',
  authorityLayersUsed: true,
  citationKey: 'ecl-enc-00201',
  contentType: 'encyclopedia-entry' as const,
  category: 'tax' as const,
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Foreign-Owned Single-Member LLC Reporting (Form 5472 + Pro Forma 1120) | EchoLegal'
    : 'Yabancı Sermayeli Tek Üyeli LLC Raporlaması (Form 5472 + Pro Forma 1120) | EchoLegal'

  const description = isEnglish
    ? 'Reporting obligations under 26 U.S.C. § 6038A for foreign-owned disregarded entities. Form 5472 filing requirements, pro forma Form 1120 attachment, penalty framework, and regulatory reclassification analysis.'
    : '26 U.S.C. § 6038A kapsamında yabancı sermayeli disregarded entity raporlama yükümlülükleri. Form 5472 beyan gereksinimleri, pro forma Form 1120 eki, ceza çerçevesi ve düzenleyici yeniden sınıflandırma analizi.'

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
      canonical: `https://echo-legal.com/${lang}/${ENTRY_SLUG}`,
      languages: {
        'en': `https://echo-legal.com/en/${ENTRY_SLUG}`,
        'tr': `https://echo-legal.com/tr/${ENTRY_SLUG}`,
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ForeignOwnedSMLLCReportingPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'normative-question', label: isEnglish ? 'Normative Question' : 'Normatif Soru' },
    { id: 'short-answer', label: isEnglish ? 'Short Answer' : 'Kısa Cevap' },
    { id: 'authority-stack', label: isEnglish ? 'Authority Stack' : 'Otorite Yığını' },
    { id: 'disregarded-entity-reclassification', label: isEnglish ? 'Disregarded Entity Reclassification for Reporting Purposes' : 'Raporlama Amaçlı Dikkate Alınmayan Varlık Yeniden Sınıflandırması' },
    { id: 'reporting-independent-of-income', label: isEnglish ? 'Reporting Obligation Independent of Income' : 'Gelirden Bağımsız Raporlama Yükümlülüğü' },
    { id: 'filing-mechanics', label: isEnglish ? 'Filing Mechanics' : 'Beyanname Mekaniği' },
    { id: 'penalty-framework', label: isEnglish ? 'Penalty Framework' : 'Ceza Çerçevesi' },
    { id: 'cross-references', label: isEnglish ? 'Cross-References' : 'Çapraz Referanslar' },
  ]

  const primarySources: PrimarySourceEntry[] = [
    {
      type: 'USC',
      citation: '26 U.S.C. § 6038A',
      label: isEnglish
        ? 'Information with respect to certain foreign-owned corporations'
        : 'Belirli yabancı sermayeli şirketlere ilişkin bilgi',
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6038A&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-6038A',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.6038A-1',
      label: isEnglish
        ? 'General requirements and definitions for information reporting'
        : 'Bilgi raporlaması için genel gereksinimler ve tanımlar',
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRd277d0563e9069f/section-1.6038A-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-1.6038A-1',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 6038A(d)',
      label: isEnglish
        ? 'Penalty for failure to furnish information or maintain records'
        : 'Bilgi sağlama veya kayıt tutma başarısızlığı cezası',
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6038A&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-6038A-d',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form 5472',
      label: isEnglish
        ? 'Information Return of a 25% Foreign-Owned U.S. Corporation or a Foreign Corporation Engaged in a U.S. Trade or Business'
        : 'Yüzde 25 yabancı sermayeli ABD şirketi veya ABD ticareti veya işiyle uğraşan yabancı şirket bilgi beyannamesi',
      url: 'https://www.irs.gov/forms-pubs/about-form-5472',
      authorityLevel: 'form_instruction',
      canonicalId: 'US-IRS-FORM-5472-INSTR',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'Foreign-Owned Single-Member LLC Reporting (Form 5472 + Pro Forma 1120)'
      : 'Yabancı Sermayeli Tek Üyeli LLC Raporlaması (Form 5472 + Pro Forma 1120)',
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
    datePublished: '2026-02-16',
    dateModified: '2026-02-16',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/${ENTRY_SLUG}`,
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
        name: isEnglish ? 'Library' : 'Kütüphane',
        item: `https://echo-legal.com/${lang}/library`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish
          ? 'Foreign-Owned Single-Member LLC Reporting'
          : 'Yabancı Sermayeli Tek Üyeli LLC Raporlaması',
        item: `https://echo-legal.com/${lang}/${ENTRY_SLUG}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <span className="mx-2">&rarr;</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">&rarr;</span>
            <span className="text-black">{isEnglish ? 'Form 5472 Reporting' : 'Form 5472 Raporlaması'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Encyclopedia Entry' : 'Ansiklopedi Maddesi'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                {isEnglish
                  ? 'Foreign-Owned Single-Member LLC Reporting'
                  : 'Yabancı Sermayeli Tek Üyeli LLC Raporlaması'}
              </h1>
              <p className="text-lg text-gray-500 mb-4">
                {isEnglish
                  ? 'Form 5472 + Pro Forma 1120'
                  : 'Form 5472 + Pro Forma 1120'}
              </p>

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
                  {isEnglish ? 'Last reviewed: February 16, 2026' : 'Son inceleme: 16 Şubat 2026'}
                </span>
                <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Attorney Reviewed' : 'Avukat Tarafından İncelendi'}
                </span>
                <span className="text-xs text-gray-400">
                  {ENTRY_META.citationKey} &middot; v{ENTRY_META.version}
                </span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'Jurisdiction: US Federal. This entry addresses the annual information reporting obligation imposed on foreign-owned single-member LLCs classified as disregarded entities for federal tax purposes.'
                  : 'Yargı alanı: ABD Federal. Bu madde, federal vergi amaçları için dikkate alınmayan varlık olarak sınıflandırılan yabancı sermayeli tek üyeli LLC\'lere yüklenen yıllık bilgi raporlama yükümlülüğünü ele almaktadır.'}
              </p>
            </header>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-10">
              <p className="text-sm text-red-900 leading-relaxed">
                <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute tax or legal advice. Tax laws are complex and change frequently. Consult a qualified CPA or tax attorney for advice specific to your situation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi veya hukuki danışmanlık teşkil etmez. Vergi yasaları karmaşıktır ve sık sık değişir. Durumunuza özgü tavsiye için uzman bir mali müşavir veya vergi avukatına danışın.'}
              </p>
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

            {/* ================================================================
                SECTION 1: NORMATIVE QUESTION
                ================================================================ */}
            <section id="normative-question" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '1. Normative Question' : '1. Normatif Soru'}
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-5">
                <p className="text-gray-800 leading-relaxed italic">
                  {isEnglish
                    ? 'Under what statutory and regulatory authority is a foreign-owned domestic single-member LLC, classified as a disregarded entity under 26 C.F.R. § 301.7701-3, required to file an annual information return, and what are the consequences of non-compliance?'
                    : '26 C.F.R. § 301.7701-3 kapsamında dikkate alınmayan varlık olarak sınıflandırılan, yabancı sermayeli yerli tek üyeli bir LLC, hangi yasal ve düzenleyici otorite altında yıllık bilgi beyannamesi vermekle yükümlüdür ve uyumsuzluğun sonuçları nelerdir?'}
                </p>
              </div>
            </section>

            {/* ================================================================
                SECTION 2: SHORT ANSWER
                ================================================================ */}
            <section id="short-answer" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. Short Answer' : '2. Kısa Cevap'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      Section 6038A of the Internal Revenue Code requires any domestic corporation that is 25% or more foreign-owned to file Form 5472, reporting certain transactions with related parties. Effective for tax years beginning after December 31, 2016, Treasury Regulations extended this obligation to foreign-owned disregarded entities, including single-member LLCs wholly owned by a foreign person. The filing must be submitted with a pro forma Form 1120 even if the entity has no taxable income. Failure to file carries a statutory base penalty of $25,000 per return per year under 26 U.S.C. § 6038A(d), with additional $25,000 penalties for each 30-day period of continued non-compliance after IRS notification.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Internal Revenue Code&apos;un 6038A maddesi, yüzde 25 veya daha fazla yabancı sermayeli herhangi bir yerli şirketin, ilgili taraflarla yapılan belirli işlemleri bildiren Form 5472&apos;yi dosyalamasını gerektirmektedir. 31 Aralık 2016 sonrasında başlayan vergi yılları için geçerli olmak üzere, Hazine Düzenlemeleri bu yükümlülüğü yabancı bir kişi tarafından tamamen sahip olunan tek üyeli LLC&apos;ler dahil olmak üzere yabancı sermayeli dikkate alınmayan varlıklara genişletmiştir. Beyanname, varlığın vergiye tabi geliri olmasa dahi pro forma Form 1120 ile birlikte sunulmalıdır. Beyanname vermeme, 26 U.S.C. § 6038A(d) kapsamında yıllık beyanname başına 25.000 dolar yasal taban cezası taşımaktadır; IRS bildiriminden sonra devam eden her 30 günlük uyumsuzluk dönemi için ek 25.000 dolar ceza uygulanmaktadır.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 3: AUTHORITY STACK
                ================================================================ */}
            <section id="authority-stack" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. Authority Stack' : '3. Otorite Yığını'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {isEnglish
                  ? 'Listed in hierarchical order of legal precedence.'
                  : 'Hukuki öncelik sırasına göre listelenmiştir.'}
              </p>

              <div className="space-y-4">
                {/* Authority A: § 6038A */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-indigo-50 px-5 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-black">26 U.S.C. § 6038A</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">federal_statute</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Binding</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">US-26USC-6038A</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {isEnglish
                        ? 'Primary statutory authority imposing information reporting requirements on foreign-owned domestic corporations. Establishes the filing obligation, defines "reporting corporation," and prescribes the penalty for non-compliance.'
                        : 'Yabancı sermayeli yerli şirketlere bilgi raporlama gereksinimlerini yükleyen birincil yasal otorite. Dosyalama yükümlülüğünü belirler, "raporlayan şirket" tanımını yapar ve uyumsuzluk cezasını öngörür.'}
                    </p>
                  </div>
                </div>

                {/* Authority B: § 1.6038A-1 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-sky-50 px-5 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-black">26 C.F.R. § 1.6038A-1</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">federal_regulation</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Binding</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">US-26CFR-1.6038A-1</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {isEnglish
                        ? 'Implementing regulation providing general requirements and definitions. Extends the reporting obligation to foreign-owned disregarded entities effective for tax years beginning after December 31, 2016, treating them as corporations solely for purposes of § 6038A compliance.'
                        : 'Genel gereksinimleri ve tanımları sağlayan uygulama yönetmeliği. Raporlama yükümlülüğünü, 31 Aralık 2016 sonrasında başlayan vergi yılları için geçerli olmak üzere, yabancı sermayeli dikkate alınmayan varlıklara genişletir ve bunları yalnızca § 6038A uyumu amacıyla şirket olarak değerlendirir.'}
                    </p>
                  </div>
                </div>

                {/* Authority C: § 6038A(d) Penalty */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-red-50 px-5 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-black">26 U.S.C. § 6038A(d)</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">federal_statute</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Binding</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">US-26USC-6038A-d</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {isEnglish
                        ? 'Penalty subsection prescribing a $25,000 monetary penalty for each taxable year of non-compliance, with continuation penalties of $25,000 per 30-day period following IRS notice of failure to comply.'
                        : 'Her uyumsuz vergi yılı için 25.000 dolar parasal ceza öngören ceza alt bölümü; IRS uyumsuzluk bildiriminin ardından her 30 günlük dönem için 25.000 dolar devam cezası uygulanır.'}
                    </p>
                  </div>
                </div>

                {/* Authority D: Form 5472 Instructions */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-amber-50 px-5 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-bold text-black">{isEnglish ? 'IRS Form 5472 Instructions' : 'IRS Form 5472 Talimatları'}</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">form_instruction</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Interpretive</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">US-IRS-FORM-5472-INSTR</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {isEnglish
                        ? 'Agency-issued guidance detailing line-by-line filing procedures, reportable transaction categories, related-party definitions, and the required attachment of a pro forma Form 1120 for disregarded entities. Interpretive, not binding, but represents the IRS\'s administrative position.'
                        : 'Satır satır beyanname prosedürlerini, raporlanabilir işlem kategorilerini, ilişkili taraf tanımlarını ve dikkate alınmayan varlıklar için gerekli pro forma Form 1120 ekini ayrıntılandıran ajans rehberliği. Yorumlayıcıdır, bağlayıcı değildir, ancak IRS\'in idari pozisyonunu temsil eder.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                SECTION 4.1: DISREGARDED ENTITY RECLASSIFICATION
                ================================================================ */}
            <section id="disregarded-entity-reclassification" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish
                  ? '4. Disregarded Entity Reclassification for Reporting Purposes'
                  : '4. Raporlama Amaçlı Dikkate Alınmayan Varlık Yeniden Sınıflandırması'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      Under the check-the-box regulations at 26 C.F.R. § 301.7701-3, a domestic single-member LLC with a single foreign owner is by default classified as a disregarded entity for federal income tax purposes. The entity&apos;s activities are treated as those of its owner; the LLC itself has no separate federal income tax return filing obligation.
                    </p>
                    <p>
                      However, for purposes of 26 U.S.C. § 6038A information reporting, the Treasury Regulations reclassify this otherwise disregarded entity as a corporation. This is a limited-purpose reclassification: it does not alter the entity&apos;s income tax treatment, its liability shield under state law, or its classification for any other federal tax purpose. The sole effect is to bring the entity within the reporting framework of § 6038A and its implementing regulations.
                    </p>
                    <p>
                      This regulatory reclassification creates a reporting obligation that exists independently of the entity&apos;s income tax posture.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      26 C.F.R. § 301.7701-3 kapsamındaki check-the-box düzenlemelerine göre, tek bir yabancı sahibi olan yerli tek üyeli bir LLC, federal gelir vergisi amaçları için varsayılan olarak dikkate alınmayan varlık olarak sınıflandırılır. Varlığın faaliyetleri sahibinin faaliyetleri olarak değerlendirilir; LLC&apos;nin kendisinin ayrı bir federal gelir vergisi beyannamesi verme yükümlülüğü yoktur.
                    </p>
                    <p>
                      Ancak 26 U.S.C. § 6038A bilgi raporlaması amacıyla, Hazine Düzenlemeleri bu aksi takdirde dikkate alınmayan varlığı bir şirket olarak yeniden sınıflandırır. Bu sınırlı amaçlı bir yeniden sınıflandırmadır: varlığın gelir vergisi uygulamasını, eyalet hukuku kapsamındaki sorumluluk kalkanını veya diğer herhangi bir federal vergi amacı için sınıflandırmasını değiştirmez. Tek etkisi, varlığı § 6038A ve uygulama yönetmeliklerinin raporlama çerçevesi kapsamına almaktır.
                    </p>
                    <p>
                      Bu düzenleyici yeniden sınıflandırma, varlığın gelir vergisi durumundan bağımsız olarak var olan bir raporlama yükümlülüğü oluşturur.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 4.2: REPORTING OBLIGATION INDEPENDENT OF INCOME
                ================================================================ */}
            <section id="reporting-independent-of-income" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish
                  ? '5. Reporting Obligation Independent of Income'
                  : '5. Gelirden Bağımsız Raporlama Yükümlülüğü'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The Form 5472 reporting obligation is an information return requirement, not an income tax return. It is triggered by entity structure and ownership, not by the existence of taxable income. A foreign-owned single-member LLC must file Form 5472 attached to a pro forma Form 1120 even if:
                    </p>
                    <ul>
                      <li>The LLC had no revenue during the tax year.</li>
                      <li>The LLC engaged in no US trade or business.</li>
                      <li>The LLC had no effectively connected income.</li>
                    </ul>
                    <p>
                      The reporting obligation arises from the occurrence of any &quot;reportable transaction&quot; between the LLC and its foreign owner (or other related parties). Capital contributions, loans, payment of organizational expenses, and use of property are all potentially reportable transactions, even in a year with zero income.
                    </p>
                    <p>
                      This is the most common point of non-compliance: foreign owners who form a US LLC but do not file because they incorrectly believe no filing is required absent income.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Form 5472 raporlama yükümlülüğü bir bilgi beyannamesi gereksinimidir, gelir vergisi beyannamesi değildir. Varlık yapısı ve sahiplikten kaynaklanır, vergiye tabi gelirin varlığından değil. Yabancı sermayeli tek üyeli bir LLC, aşağıdaki durumlar söz konusu olsa bile pro forma Form 1120 ekinde Form 5472 dosyalamalıdır:
                    </p>
                    <ul>
                      <li>LLC&apos;nin vergi yılı boyunca geliri olmamışsa.</li>
                      <li>LLC herhangi bir ABD ticareti veya işle uğraşmamışsa.</li>
                      <li>LLC&apos;nin etkin olarak bağlı geliri yoksa.</li>
                    </ul>
                    <p>
                      Raporlama yükümlülüğü, LLC ile yabancı sahibi (veya diğer ilişkili taraflar) arasında herhangi bir &quot;raporlanabilir işlem&quot;in gerçekleşmesinden doğar. Sermaye katkıları, krediler, kuruluş giderlerinin ödenmesi ve mülk kullanımının tümü, sıfır gelirli bir yılda bile potansiyel olarak raporlanabilir işlemlerdir.
                    </p>
                    <p>
                      Bu en yaygın uyumsuzluk noktasıdır: ABD LLC&apos;si kuran ancak gelir yokluğunda beyanname gerekmediğine yanlış şekilde inanan yabancı sahipler dosyalama yapmamaktadır.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 4.3: FILING MECHANICS
                ================================================================ */}
            <section id="filing-mechanics" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Filing Mechanics' : '6. Beyanname Mekaniği'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The filing mechanism for a foreign-owned disregarded entity involves three components:
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Yabancı sermayeli bir dikkate alınmayan varlık için dosyalama mekanizması üç bileşenden oluşur:
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-bold text-black">{isEnglish ? 'Employer Identification Number (EIN)' : 'İşveren Kimlik Numarası (EIN)'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'The disregarded entity must obtain its own EIN. This is required irrespective of whether the entity has employees or engages in a US trade or business. The EIN is used solely for identifying the entity on its information return filings.'
                      : 'Dikkate alınmayan varlık kendi EIN\'ini almalıdır. Bu, varlığın çalışanları olup olmadığına veya ABD ticareti veya işiyle uğraşıp uğraşmadığına bakılmaksızın gereklidir. EIN, yalnızca bilgi beyannamesi dosyalamalarında varlığı tanımlamak için kullanılır.'}
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-bold text-black">{isEnglish ? 'Pro Forma Form 1120' : 'Pro Forma Form 1120'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'The entity files a pro forma Form 1120 (US Corporation Income Tax Return). Only the identifying information fields on the first page are completed. No financial data, schedules, or tax computation is required. The word "Foreign-Owned U.S. DE" is written across the top. This serves as the transmittal vehicle for the attached Form 5472.'
                      : 'Varlık, bir pro forma Form 1120 (ABD Şirket Gelir Vergisi Beyannamesi) dosyalar. Yalnızca ilk sayfadaki tanımlayıcı bilgi alanları doldurulur. Mali veri, çizelge veya vergi hesaplaması gerekmez. Üste "Foreign-Owned U.S. DE" yazılır. Bu, ekli Form 5472 için iletim aracı olarak hizmet eder.'}
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-bold text-black">{isEnglish ? 'Due Date' : 'Son Tarih'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'The pro forma Form 1120 with attached Form 5472 is due on April 15 following the close of the calendar tax year (or the 15th day of the 4th month after the close of a fiscal year). A 6-month automatic extension is available by filing Form 7004, extending the deadline to October 15 for calendar-year filers.'
                      : 'Ekli Form 5472 ile pro forma Form 1120, takvim vergi yılının kapanışını takip eden 15 Nisan\'a (veya mali yılın kapanışından sonraki 4. ayın 15. gününe) kadar verilmelidir. Form 7004 dosyalayarak 6 aylık otomatik uzatma mevcuttur; bu, takvim yılı dosyalayıcıları için son tarihi 15 Ekim\'e uzatır.'}
                  </p>
                </div>
              </div>
            </section>

            {/* ================================================================
                SECTION 4.4: PENALTY FRAMEWORK
                ================================================================ */}
            <section id="penalty-framework" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. Penalty Framework' : '7. Ceza Çerçevesi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The penalty regime under § 6038A(d) operates in two tiers:
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      § 6038A(d) kapsamındaki ceza rejimi iki katmandan oluşur:
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Penalty Component' : 'Ceza Bileşeni'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Amount' : 'Tutar'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Trigger' : 'Tetikleyici'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Base penalty' : 'Taban ceza'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">$25,000</td>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Per Form 5472 not timely filed for each taxable year' : 'Zamanında dosyalanmayan her vergi yılı için Form 5472 başına'}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Continuation penalty' : 'Devam cezası'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? '$25,000 per 30-day period' : '30 günlük dönem başına 25.000 $'}</td>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Each 30-day period (or fraction thereof) after IRS notice of failure, with no statutory cap' : 'IRS uyumsuzluk bildiriminden sonraki her 30 günlük dönem (veya kesri), yasal tavan olmaksızın'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-amber-900">
                  {isEnglish
                    ? 'The penalty accrues per unfiled form. An entity that fails to file for multiple years faces compounding exposure: three missed years produce a minimum of $75,000 in base penalties alone, before continuation penalties. There is no statutory maximum for continuation penalties.'
                    : 'Ceza dosyalanmayan form başına tahakkuk eder. Birden fazla yıl boyunca dosyalama yapmayan bir varlık, bileşik maruziyetle karşı karşıyadır: üç kaçırılan yıl, devam cezalarından önce yalnızca taban cezalarda minimum 75.000 dolar üretir. Devam cezaları için yasal azami sınır yoktur.'}
                </p>
              </div>
            </section>

            {/* ================================================================
                SECTION 5: CROSS-REFERENCES
                ================================================================ */}
            <section id="cross-references" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '8. Cross-References' : '8. Çapraz Referanslar'}
              </h2>
              <div className="bg-gray-50 rounded-lg p-5">
                <ul className="space-y-2 text-sm text-gray-700 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 select-none">&ndash;</span>
                    <span>US-26CFR-301.7701</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 select-none">&ndash;</span>
                    <span>US-ECI-CONCEPT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 select-none">&ndash;</span>
                    <span>US-TREATY-TIEBREAKER</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 select-none">&ndash;</span>
                    <span>US-W8BEN-W9-DISTINCTION</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Primary Sources Disclosure */}
            <PrimarySources sources={primarySources} lang={isEnglish ? 'en' : 'tr'} />

            {/* Metadata Block (visible as structured data) */}
            <section className="mb-12">
              <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Entry Metadata' : 'Madde Meta Verileri'}</h2>
              <div className="bg-gray-50 rounded-lg p-5 text-sm font-mono text-gray-700">
                <div className="space-y-1">
                  <div><span className="text-gray-500">version:</span> {ENTRY_META.version}</div>
                  <div><span className="text-gray-500">lastReviewed:</span> {ENTRY_META.lastReviewed}</div>
                  <div><span className="text-gray-500">reviewStatus:</span> {ENTRY_META.reviewStatus}</div>
                  <div><span className="text-gray-500">jurisdiction:</span> {ENTRY_META.jurisdiction}</div>
                  <div><span className="text-gray-500">authorityLayersUsed:</span> {String(ENTRY_META.authorityLayersUsed)}</div>
                  <div><span className="text-gray-500">citationKey:</span> {ENTRY_META.citationKey}</div>
                  <div><span className="text-gray-500">contentType:</span> {ENTRY_META.contentType}</div>
                  <div><span className="text-gray-500">category:</span> {ENTRY_META.category}</div>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Entries' : 'İlgili Maddeler'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Step-by-step guide to forming a US LLC' : 'ABD\'de LLC kurma adım adım rehberi'}</p>
                </Link>
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'IRS & Tax Guide' : 'IRS ve Vergi Rehberi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'W-8/W-9 forms, withholding, and treaty basics' : 'W-8/W-9 formları, stopaj ve anlaşma temelleri'}</p>
                </Link>
                <Link href={`/${lang}/ein-itin-ssn-farki`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'EIN / ITIN / SSN Distinction' : 'EIN / ITIN / SSN Farkı'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Tax identification numbers explained' : 'Vergi kimlik numaraları açıklaması'}</p>
                </Link>
                <Link href={`/${lang}/library`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Legal Library' : 'Hukuk Kütüphanesi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Browse all entries and resources' : 'Tüm madde ve kaynaklara göz atın'}</p>
                </Link>
              </div>
            </section>

            {/* Final Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute tax, legal, or financial advice. Tax laws are complex and change frequently. The information provided may not reflect current law or IRS guidance. Always consult a qualified CPA, tax attorney, or enrolled agent for advice specific to your situation. EchoLegal is not a law firm, accounting firm, or tax advisory service.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi, hukuki veya mali danışmanlık teşkil etmez. Vergi yasaları karmaşıktır ve sık sık değişir. Sağlanan bilgiler güncel yasayı veya IRS rehberliğini yansıtmayabilir. Kendi durumunuza özgü tavsiye için mutlaka uzman bir mali müşavir veya vergi avukatına danışın. EchoLegal bir hukuk bürosu, muhasebe firması veya vergi danışmanlık hizmeti değildir.'}
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
