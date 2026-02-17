// app/[lang]/foreign-owned-single-member-llc-reporting/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'
import JudicialDeference from '@/components/JudicialDeference'
import type { DeferenceCase } from '@/components/JudicialDeference'

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
    { id: 'judicial-deference', label: isEnglish ? 'Judicial Deference Framework' : 'Yargısal İtibar (Deference) Çerçevesi' },
    { id: 'doctrinal-references', label: isEnglish ? 'Representative Doctrinal References' : 'Temsili Doktrinel Referanslar' },
    { id: 'cross-references', label: isEnglish ? 'Cross-References' : 'Çapraz Referanslar' },
  ]

  const primarySources = getPrimarySources(ENTRY_SLUG, isEnglish ? 'en' : 'tr')

  const deferenceCases: DeferenceCase[] = [
    {
      citation: 'Chevron U.S.A., Inc. v. Natural Resources Defense Council, Inc., 467 U.S. 837 (1984)',
      principle: {
        en: 'Where a statute is ambiguous, courts defer to a reasonable agency interpretation embodied in a regulation promulgated through notice-and-comment rulemaking. Treasury regulations under § 6038A receive this deference.',
        tr: 'Kanun belirsiz olduğunda, mahkemeler bildirim ve yorum yöntemiyle çıkarılan bir yönetmelikte somutlaşan makul kurum yorumuna saygı gösterir. § 6038A kapsamındaki Hazine yönetmelikleri bu saygıyı alır.',
      },
    },
    {
      citation: 'Skidmore v. Swift & Co., 323 U.S. 134 (1944)',
      principle: {
        en: 'Informal agency interpretations (revenue rulings, IRS notices, guidance letters) are not entitled to Chevron deference but may be given weight proportional to the thoroughness of their reasoning, consistency with earlier pronouncements, and all factors giving them the power to persuade.',
        tr: 'Gayri resmi kurum yorumları (gelir kararları, IRS bildirimleri, rehberlik mektupları) Chevron saygısına tabi değildir ancak muhakemelerinin kapsamlılığı, önceki beyanlarla tutarlılığı ve ikna gücü veren tüm faktörlerle orantılı ağırlık verilebilir.',
      },
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
                  ? 'Arranged by normative hierarchy. Statutes bind; regulations implement; administrative instruments operationalize.'
                  : 'Normatif hiyerarşiye göre düzenlenmiştir. Kanunlar bağlayıcıdır; yönetmelikler uygular; idari araçlar işlevselleştirir.'}
              </p>

              <div className="space-y-6">
                {/* Tier I: Statutory Basis */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {isEnglish ? 'I. Statutory Basis' : 'I. Yasal Dayanak'}
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-indigo-50 px-5 py-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-black">26 U.S.C. § 6038A</h4>
                        <div className="flex gap-2">
                          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">federal_statute</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{isEnglish ? 'Binding' : 'Bağlayıcı'}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-mono">US-26USC-6038A</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-800">{isEnglish ? 'Function:' : 'İşlev:'}</span>{' '}
                        {isEnglish
                          ? 'Creates the reporting obligation. Requires any 25%-or-more foreign-owned domestic corporation to file an annual information return disclosing transactions with related foreign parties.'
                          : 'Raporlama yükümlülüğünü oluşturur. Yüzde 25 veya daha fazla yabancı sermayeli herhangi bir yerli şirketin, ilişkili yabancı taraflarla yapılan işlemleri açıklayan yıllık bilgi beyannamesi vermesini zorunlu kılar.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tier II: Implementing Regulations */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {isEnglish ? 'II. Implementing Regulations' : 'II. Uygulama Yönetmelikleri'}
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-sky-50 px-5 py-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-black">26 C.F.R. § 1.6038A-1</h4>
                        <div className="flex gap-2">
                          <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">federal_regulation</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{isEnglish ? 'Binding' : 'Bağlayıcı'}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-mono">US-26CFR-1.6038A-1</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-800">{isEnglish ? 'Function:' : 'İşlev:'}</span>{' '}
                        {isEnglish
                          ? 'Extends § 6038A to foreign-owned disregarded entities (effective for tax years beginning after December 31, 2016). Reclassifies a single-member LLC as a corporation solely for purposes of this reporting obligation.'
                          : '§ 6038A\'yı yabancı sermayeli dikkate alınmayan varlıklara genişletir (31 Aralık 2016 sonrasında başlayan vergi yılları için geçerli). Tek üyeli bir LLC\'yi yalnızca bu raporlama yükümlülüğü amacıyla şirket olarak yeniden sınıflandırır.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tier III: Administrative Instrument */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {isEnglish ? 'III. Administrative Instrument' : 'III. İdari Araç'}
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-amber-50 px-5 py-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-black">{isEnglish ? 'Form 5472 + Instructions' : 'Form 5472 + Talimatlar'}</h4>
                        <div className="flex gap-2">
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">form_instruction</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{isEnglish ? 'Interpretive' : 'Yorumlayıcı'}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-mono">US-IRS-FORM-5472-INSTR</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-800">{isEnglish ? 'Function:' : 'İşlev:'}</span>{' '}
                        {isEnglish
                          ? 'Operationalizes the statutory and regulatory requirements. Specifies reportable transaction categories, related-party definitions, line-by-line filing procedures, and the pro forma Form 1120 attachment requirement for disregarded entities. Not law; represents the IRS\'s administrative position.'
                          : 'Yasal ve düzenleyici gereksinimleri işlevsel hale getirir. Raporlanabilir işlem kategorilerini, ilişkili taraf tanımlarını, satır satır dosyalama prosedürlerini ve dikkate alınmayan varlıklar için pro forma Form 1120 ek gereksinimini belirler. Kanun değildir; IRS\'in idari pozisyonunu temsil eder.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tier IV: Penalty Mechanism */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {isEnglish ? 'IV. Penalty Mechanism' : 'IV. Ceza Mekanizması'}
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-red-50 px-5 py-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-bold text-black">26 U.S.C. § 6038A(d)</h4>
                        <div className="flex gap-2">
                          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">federal_statute</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{isEnglish ? 'Binding' : 'Bağlayıcı'}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-mono">US-26USC-6038A-d</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-800">{isEnglish ? 'Function:' : 'İşlev:'}</span>{' '}
                        {isEnglish
                          ? 'Enforcement backstop. Prescribes the civil monetary penalty for failure to file or maintain required records: $25,000 base penalty per return, plus $25,000 for each 30-day period of continued non-compliance after IRS notice. See Section 7 for full analysis.'
                          : 'Yaptırım mekanizması. Beyanname vermeme veya gerekli kayıtları tutmama durumunda medeni para cezasını öngörür: beyanname başına 25.000 dolar taban ceza, artı IRS bildiriminden sonra devam eden her 30 günlük uyumsuzluk dönemi için 25.000 dolar. Tam analiz için Bölüm 7\'ye bakınız.'}
                      </p>
                    </div>
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
              <p className="text-sm text-gray-500 mb-4">
                {isEnglish
                  ? 'Statutory authority: 26 U.S.C. § 6038A(d). Penalties are civil; no criminal exposure arises from this section alone.'
                  : 'Yasal dayanak: 26 U.S.C. § 6038A(d). Cezalar medenidir; yalnızca bu bölümden cezai sorumluluk doğmaz.'}
              </p>

              <div className="space-y-3 mb-6">
                <div className="border-l-4 border-red-400 pl-4 py-2">
                  <h3 className="font-bold text-black text-sm">{isEnglish ? 'Base civil penalty' : 'Taban medeni ceza'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? '$25,000 per Form 5472 not timely filed for each taxable year. The penalty attaches per form, per year — an entity required to file multiple Forms 5472 (e.g., transactions with multiple related parties) faces separate penalties for each unfiled form.'
                      : 'Zamanında dosyalanmayan her vergi yılı için Form 5472 başına 25.000 dolar. Ceza form başına, yıl başına uygulanır — birden fazla Form 5472 dosyalaması gereken bir varlık (örn. birden fazla ilişkili tarafla işlemler), dosyalanmayan her form için ayrı cezayla karşı karşıyadır.'}
                  </p>
                </div>

                <div className="border-l-4 border-red-400 pl-4 py-2">
                  <h3 className="font-bold text-black text-sm">{isEnglish ? 'Continuation penalty after IRS notice' : 'IRS bildiriminden sonra devam cezası'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'If non-compliance continues after the IRS mails a notice of failure, an additional $25,000 accrues for each 30-day period (or fraction thereof) during which the failure persists. There is no statutory cap on continuation penalties.'
                      : 'IRS uyumsuzluk bildirimini gönderdikten sonra uyumsuzluk devam ederse, başarısızlığın sürdüğü her 30 günlük dönem (veya kesri) için ek 25.000 dolar tahakkuk eder. Devam cezaları için yasal tavan yoktur.'}
                  </p>
                </div>

                <div className="border-l-4 border-red-400 pl-4 py-2">
                  <h3 className="font-bold text-black text-sm">{isEnglish ? 'Recordkeeping exposure' : 'Kayıt tutma maruziyeti'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'Section 6038A(a) and the Form 5472 Instructions require the reporting entity to maintain records of reportable transactions. Failure to maintain records constitutes an independent basis for penalty under § 6038A(d), separate from failure to file.'
                      : 'Bölüm 6038A(a) ve Form 5472 Talimatları, raporlayan varlığın raporlanabilir işlemlerin kayıtlarını tutmasını gerektirir. Kayıtları tutmama, § 6038A(d) kapsamında dosyalama başarısızlığından bağımsız bir ceza dayanağı oluşturur.'}
                  </p>
                </div>
              </div>

              {/* Penalty table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Component' : 'Bileşen'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Amount' : 'Tutar'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Authority' : 'Dayanak'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Base penalty' : 'Taban ceza'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">$25,000</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">§ 6038A(d)(1)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Continuation (per 30-day period)' : 'Devam (30 günlük dönem başına)'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">$25,000</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">§ 6038A(d)(2)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Statutory cap' : 'Yasal tavan'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{isEnglish ? 'None' : 'Yok'}</td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Critical clarification */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900">
                  <strong>{isEnglish ? 'Critical clarification:' : 'Kritik açıklama:'}</strong>{' '}
                  {isEnglish
                    ? 'The § 6038A(d) penalty is triggered by failure to file the required information return. It is not contingent on the existence of income, tax liability, or any underlying tax obligation. An entity with zero revenue and no US-source income is subject to the same penalty as one with substantial operations.'
                    : '§ 6038A(d) cezası, gerekli bilgi beyannamesinin dosyalanmamasından kaynaklanır. Gelirin, vergi borcunun veya herhangi bir temel vergi yükümlülüğünün varlığına bağlı değildir. Sıfır geliri ve ABD kaynaklı geliri olmayan bir varlık, önemli operasyonları olan bir varlıkla aynı cezaya tabidir.'}
                </p>
              </div>
            </section>

            {/* ================================================================
                SECTIONS 8–9: JUDICIAL DEFERENCE FRAMEWORK
                ================================================================ */}
            <JudicialDeference
              lang={isEnglish ? 'en' : 'tr'}
              cases={deferenceCases}
              sectionNumber="8"
            />

            {/* ================================================================
                SECTION 10: CROSS-REFERENCES
                ================================================================ */}
            <section id="cross-references" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '10. Cross-References' : '10. Çapraz Referanslar'}
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
