// app/[lang]/foreign-owned-single-member-llc-reporting/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'
import JudicialInterpretation from '@/components/JudicialInterpretation'
import type { JudicialEntry, InterpretiveNote, ResolutionBullet } from '@/components/JudicialInterpretation'
import ConflictPrecedence from '@/components/ConflictPrecedence'
import type { CaseIllustration, UnresolvedItem } from '@/components/ConflictPrecedence'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const ENTRY_SLUG = 'foreign-owned-single-member-llc-reporting'

const PAGE_META = {
  slug: 'foreign-owned-single-member-llc-reporting',
  datePublished: '2025-06-01',
  dateModified: '2026-02-18',
  version: '1.0',
  citationKey: 'ecl-enc-00011',
}

const ENTRY_META = {
  version: '1.0',
  lastReviewed: '2026-02-16',
  reviewStatus: 'Attorney Reviewed',
  jurisdiction: 'US Federal',
  authorityLayersUsed: true,
  citationKey: 'ecl-enc-00201',
  contentType: 'encyclopedia-entry' as const,
  category: 'tax' as const,
  revisionHistory: [
    { date: '2026-02-17', note: 'Initial scaffold with authority stack, filing mechanics, and penalty framework' },
    { date: '2026-02-18', note: 'Classification framework and § 6038A statutory authority layer' },
    { date: '2026-02-18', note: 'Regulatory implementation, filing mechanics expansion, and reasonable cause' },
    { date: '2026-02-18', note: 'Cornerstone doctrinal expansion – deference, timeline, and risk framework integration' },
  ],
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
      'citation_title': isEnglish ? 'Foreign-Owned Single-Member LLC Reporting' : 'Yabancı Sahipli Tek Üyeli LLC Raporlama Yükümlülükleri',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
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
    { id: 'judicial-interpretation', label: isEnglish ? 'Judicial Interpretation (Selected)' : 'Yargısal Yorum (Seçilmiş)' },
    { id: 'interpretive-notes', label: isEnglish ? 'Interpretive Notes' : 'Yorum Notları' },
    { id: 'conflict-precedence', label: isEnglish ? 'Conflict Resolution & Authority Precedence' : 'Çatışma Çözümü ve Yetki Önceliği' },
    { id: 'illustrative-judicial-treatment', label: isEnglish ? 'Illustrative Judicial Treatment' : 'Seçilmiş Yargısal Yaklaşım Örnekleri' },
    { id: 'cross-references', label: isEnglish ? 'Cross-References' : 'Çapraz Referanslar' },
    { id: 'legal-classification-framework', label: 'Legal Classification Framework' },
    { id: 'statutory-authority', label: 'Statutory Authority' },
    { id: 'regulatory-implementation', label: 'Regulatory Implementation' },
    { id: 'judicial-deference-framework', label: 'Judicial Deference Framework' },
    { id: 'compliance-timeline', label: 'Compliance Timeline' },
    { id: 'common-misinterpretations', label: 'Common Misinterpretations' },
    { id: 'risk-matrix', label: 'Risk Matrix' },
  ]

  const primarySources = getPrimarySources(ENTRY_SLUG, isEnglish ? 'en' : 'tr')

  const judicialEntries: JudicialEntry[] = [
    {
      citation: '26 U.S.C. § 6038A',
      summary: {
        en: 'Establishes the mandatory information reporting obligation for 25%-or-more foreign-owned domestic corporations. Statute controls; no agency guidance can narrow or expand this obligation.',
        tr: 'Yüzde 25 veya daha fazla yabancı sermayeli yerli şirketler için zorunlu bilgi raporlama yükümlülüğünü oluşturur. Kanun belirleyicidir; hiçbir kurum rehberliği bu yükümlülüğü daraltamaz veya genişletemez.',
      },
      weight: 'binding',
    },
    {
      citation: '26 C.F.R. § 1.6038A-1 (T.D. 9796, 2016)',
      summary: {
        en: 'Treasury regulation extending § 6038A to foreign-owned disregarded entities. Issued under notice-and-comment rulemaking; has the force and effect of law.',
        tr: 'Hazine yönetmeliği, § 6038A kapsamını yabancı sermayeli dikkate alınmayan varlıklara genişletir. Bildirim ve yorum yöntemiyle çıkarılmıştır; kanun hükmünde ve etkisindedir.',
      },
      weight: 'binding',
    },
    {
      citation: 'IRS Form 5472 Instructions (Rev. 2024)',
      summary: {
        en: 'IRS administrative guidance detailing reportable transaction categories, line-by-line procedures, and the pro forma 1120 requirement. Persuasive but does not override statute or regulation.',
        tr: 'IRS idari rehberliği; raporlanabilir işlem kategorilerini, satır satır prosedürleri ve pro forma 1120 gereksinimini detaylandırır. İkna edicidir ancak kanun veya yönetmeliği geçersiz kılmaz.',
      },
      weight: 'persuasive',
    },
  ]

  const conflictNotes: InterpretiveNote[] = [
    {
      en: 'Statutes enacted by Congress are the highest domestic authority. If a Treasury regulation conflicts with the statute it purports to implement, the statute prevails.',
      tr: 'Kongre tarafından çıkarılan kanunlar en yüksek iç hukuk otoritesidir. Bir Hazine yönetmeliği, uygulamayı amaçladığı kanunla çatışırsa kanun geçerlidir.',
    },
    {
      en: 'Regulations issued through notice-and-comment rulemaking (such as T.D. 9796) carry the force of law. Courts accord them Chevron deference where the statute is ambiguous.',
      tr: 'Bildirim ve yorum yöntemiyle çıkarılan yönetmelikler (T.D. 9796 gibi) kanun hükmündedir. Kanunun belirsiz olduğu durumlarda mahkemeler Chevron saygısı gösterir.',
    },
    {
      en: 'IRS instructions and publications are informal guidance. Courts may consider them but are not bound by them. Where instructions conflict with the Code or regulations, the higher-tier source controls.',
      tr: 'IRS talimatları ve yayınları gayri resmi rehberliktir. Mahkemeler bunları değerlendirebilir ancak bağlı değildir. Talimatlar Kanun veya yönetmeliklerle çatıştığında üst kademe kaynak geçerlidir.',
    },
  ]

  const resolves: ResolutionBullet[] = [
    {
      en: 'Whether a foreign-owned single-member LLC must file Form 5472 (yes, per statute and regulation).',
      tr: 'Yabancı sermayeli tek üyeli LLC\'nin Form 5472 dosyalaması gerekip gerekmediği (kanun ve yönetmelik gereği evet).',
    },
    {
      en: 'Whether the filing obligation exists absent taxable income (yes; it is an information return).',
      tr: 'Vergiye tabi gelir olmaksızın dosyalama yükümlülüğünün var olup olmadığı (evet; bu bir bilgi beyannamesidir).',
    },
    {
      en: 'The base penalty amount for non-compliance ($25,000 per return per year, per statute).',
      tr: 'Uyumsuzluk için taban ceza tutarı (kanun gereği yıllık beyanname başına 25.000 dolar).',
    },
  ]

  const doesNotResolve: ResolutionBullet[] = [
    {
      en: 'Whether reasonable cause relief is available for late-filed Forms 5472 (fact-specific; see IRS procedures).',
      tr: 'Geç dosyalanan Form 5472 için makul neden muafiyetinin mevcut olup olmadığı (duruma bağlı; IRS prosedürlerine bakınız).',
    },
    {
      en: 'State-level reporting obligations that may apply independently of federal requirements.',
      tr: 'Federal gereksinimlerden bağımsız olarak uygulanabilecek eyalet düzeyinde raporlama yükümlülükleri.',
    },
    {
      en: 'Transfer pricing implications for transactions reported on Form 5472.',
      tr: 'Form 5472\'de raporlanan işlemler için transfer fiyatlandırması etkileri.',
    },
  ]

  const caseIllustrations: CaseIllustration[] = [
    {
      citation: 'Chevron U.S.A., Inc. v. Natural Resources Defense Council, Inc., 467 U.S. 837 (1984)',
      principle: {
        en: 'Where a statute is ambiguous and the implementing agency has issued a regulation through notice-and-comment rulemaking, courts defer to the agency\'s reasonable interpretation. Treasury regulations issued under § 6038A receive this deference.',
        tr: 'Kanun belirsiz olduğunda ve uygulayıcı kurum bildirim ve yorum yöntemiyle yönetmelik çıkardığında, mahkemeler kurumun makul yorumuna saygı gösterir. § 6038A kapsamında çıkarılan Hazine yönetmelikleri bu saygıyı alır.',
      },
    },
    {
      citation: 'Mayo Foundation for Medical Education & Research v. United States, 562 U.S. 44 (2011)',
      principle: {
        en: 'Treasury regulations promulgated through notice-and-comment procedures are entitled to judicial deference under the same standard as other agency regulations, regardless of whether the authorizing statute uses general or specific rulemaking language.',
        tr: 'Bildirim ve yorum prosedürleriyle çıkarılan Hazine yönetmelikleri, yetkilendiren kanunun genel veya özel düzenleme dili kullanıp kullanmadığına bakılmaksızın, diğer kurum yönetmelikleriyle aynı standart kapsamında yargısal saygıya tabidir.',
      },
    },
  ]

  const unresolvedItems: UnresolvedItem[] = [
    {
      en: 'Factual disputes regarding whether a specific transaction qualifies as "reportable" under the Form 5472 Instructions.',
      tr: 'Belirli bir işlemin Form 5472 Talimatları kapsamında "raporlanabilir" niteliğinde olup olmadığına ilişkin olgusal uyuşmazlıklar.',
    },
    {
      en: 'Procedural posture and burden-of-proof allocation in penalty abatement proceedings.',
      tr: 'Ceza indirimi işlemlerinde usul durumu ve ispat yükü dağılımı.',
    },
    {
      en: 'Evidentiary standards for establishing "reasonable cause" to avoid § 6038A(d) penalties.',
      tr: '§ 6038A(d) cezalarından kaçınmak için "makul neden" ispatına ilişkin delil standartları.',
    },
    {
      en: 'Foreign-law characterisation of entities that may affect US classification under the check-the-box regulations.',
      tr: 'Check-the-box düzenlemeleri kapsamında ABD sınıflandırmasını etkileyebilecek yabancı hukuk kapsamında tüzel kişilik nitelendirmesi.',
    },
  ]

  const pageUrl = `${SITE_URL}/${lang}/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Foreign-Owned Single-Member LLC Reporting' : 'Yabancı Sahipli Tek Üyeli LLC Raporlama Yükümlülükleri'

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Reporting obligations under 26 U.S.C. § 6038A for foreign-owned disregarded entities.'
      : '26 U.S.C. § 6038A kapsamında yabancı sermayeli disregarded entity raporlama yükümlülükleri.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['form-5472', 'foreign-owned-llc', 'smllc', 'irs-reporting'],
    section: 'encyclopedia-entry',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <>
      <div className="bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <JsonLdScript data={[articleSchema, breadcrumbSchema]} />
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

              <InstitutionalBadge
                lang={lang}
                jurisdictions={['US']}
                lastReviewedAt={PAGE_META.dateModified}
                className="mb-8"
              />

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

            {/* Authority Signal Block */}
            <div className="border border-gray-200 rounded-lg px-5 py-4 mb-10 text-sm text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                    {isEnglish ? 'Authority Level' : 'Otorite Seviyesi'}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {isEnglish
                      ? 'Statutory & Regulatory Integrated Analysis'
                      : 'Kanuni ve Düzenleyici Entegre Analiz'}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                    {isEnglish ? 'Primary Sources' : 'Birincil Kaynaklar'}
                  </span>
                  <span className="text-gray-800 font-medium font-mono text-xs">
                    IRC §6038A; 26 C.F.R. §§1.6038A-1–7; T.D. 9796
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wide mb-1">
                    {isEnglish ? 'Jurisdiction' : 'Yargı Alanı'}
                  </span>
                  <span className="text-gray-800 font-medium">
                    {isEnglish ? 'United States (Federal Tax)' : 'Amerika Birleşik Devletleri (Federal Vergi)'}
                  </span>
                </div>
              </div>
            </div>

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
                      A foreign-owned single-member LLC that is classified as a disregarded entity must file Form 5472 (Information Return of a 25% Foreign-Owned U.S. Corporation or a Foreign Corporation Engaged in a U.S. Trade or Business) for each taxable year in which a reportable transaction occurs with a related party. The form is not filed on its own; it must be attached to a pro forma Form 1120, which serves as the transmittal return. This filing obligation exists regardless of whether the LLC earned income, engaged in a trade or business, or has any federal income tax liability. The obligation arises from entity structure and ownership, not from the presence of taxable activity.
                    </p>
                    <p>
                      The filing mechanism involves three components:
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Dikkate alınmayan varlık olarak sınıflandırılan yabancı sermayeli tek üyeli bir LLC, ilişkili bir tarafla raporlanabilir bir işlemin gerçekleştiği her vergi yılı için Form 5472 (Yüzde 25 Yabancı Sermayeli ABD Şirketi veya ABD Ticareti veya İşi ile Uğraşan Yabancı Şirket Bilgi Beyannamesi) dosyalamalıdır. Form tek başına dosyalanmaz; iletim beyannamesi işlevi gören pro forma Form 1120&apos;ye eklenmelidir. Bu dosyalama yükümlülüğü, LLC&apos;nin gelir elde edip etmediğine, bir ticaret veya işle uğraşıp uğraşmadığına veya herhangi bir federal gelir vergisi borcunun olup olmadığına bakılmaksızın mevcuttur. Yükümlülük, vergiye tabi faaliyetin varlığından değil, kuruluş yapısı ve sahiplikten kaynaklanmaktadır.
                    </p>
                    <p>
                      Dosyalama mekanizması üç bileşenden oluşur:
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-900">
                  <strong>{isEnglish ? 'Critical clarification:' : 'Kritik açıklama:'}</strong>{' '}
                  {isEnglish
                    ? 'The § 6038A(d) penalty is triggered by failure to file the required information return. It is not contingent on the existence of income, tax liability, or any underlying tax obligation. An entity with zero revenue and no US-source income is subject to the same penalty as one with substantial operations.'
                    : '§ 6038A(d) cezası, gerekli bilgi beyannamesinin dosyalanmamasından kaynaklanır. Gelirin, vergi borcunun veya herhangi bir temel vergi yükümlülüğünün varlığına bağlı değildir. Sıfır geliri ve ABD kaynaklı geliri olmayan bir varlık, önemli operasyonları olan bir varlıkla aynı cezaya tabidir.'}
                </p>
              </div>

              {/* Reasonable cause */}
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <h3 className="font-bold text-black text-sm">{isEnglish ? 'Reasonable cause' : 'Makul neden'}</h3>
                <p className="text-gray-700 text-sm mt-1">
                  {isEnglish
                    ? 'The Internal Revenue Code provides that penalties under § 6038A(d) may be waived if the reporting entity establishes that the failure was due to reasonable cause and not willful neglect. The reasonable cause standard is fact-specific: the IRS evaluates the totality of the circumstances, including the entity\'s efforts to determine its filing obligations, reliance on professional advice, and the promptness of any corrective filing. Reasonable cause is an affirmative defense — the burden of demonstrating it rests on the taxpayer, not the IRS. The availability and application of this relief are beyond the scope of this entry.'
                    : 'Internal Revenue Code, raporlayan kuruluşun, uyumsuzluğun makul nedenden kaynaklandığını ve kasıtlı ihmal olmadığını kanıtlaması halinde § 6038A(d) kapsamındaki cezaların kaldırılabileceğini öngörmektedir. Makul neden standardı olguya bağlıdır: IRS, kuruluşun dosyalama yükümlülüklerini belirleme çabalarını, profesyonel tavsiyeye güvenmeyi ve düzeltici dosyalamanın hızını dahil olmak üzere koşulların tamamını değerlendirir. Makul neden olumlu bir savunmadır — bunu kanıtlama yükü IRS\'e değil, vergi mükellefine aittir. Bu muafiyetin mevcudiyeti ve uygulanması bu maddenin kapsamı dışındadır.'}
                </p>
              </div>
            </section>

            {/* ================================================================
                SECTIONS 8–9: JUDICIAL INTERPRETATION & INTERPRETIVE NOTES
                ================================================================ */}
            <JudicialInterpretation
              lang={isEnglish ? 'en' : 'tr'}
              entries={judicialEntries}
              conflictNotes={conflictNotes}
              resolves={resolves}
              doesNotResolve={doesNotResolve}
              sectionNumber="8"
            />

            {/* ================================================================
                SECTIONS 10–11: CONFLICT PRECEDENCE & CASE ILLUSTRATIONS
                ================================================================ */}
            <ConflictPrecedence
              lang={isEnglish ? 'en' : 'tr'}
              caseIllustrations={caseIllustrations}
              unresolvedItems={unresolvedItems}
              sectionNumber="10"
            />

            {/* ================================================================
                SECTION 12: CROSS-REFERENCES
                ================================================================ */}
            <section id="cross-references" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '12. Cross-References' : '12. Çapraz Referanslar'}
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

            {/* ================================================================
                SECTION 13: LEGAL CLASSIFICATION FRAMEWORK
                ================================================================ */}
            <section id="legal-classification-framework" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '13. Legal Classification Framework' : '13. Hukuki Sınıflandırma Çerçevesi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The federal tax treatment of any business entity begins with the classification framework established by 26 U.S.C. § 7701(a). This provision defines the foundational categories — corporation, partnership, and trust — and distinguishes between domestic and foreign status based on where the entity is created or organized. An entity formed under the laws of a US state is domestic; an entity formed under foreign law is foreign. These definitions are statutory and do not depend on the entity&apos;s operating location, the nationality of its owners, or the source of its income.
                    </p>
                    <p>
                      The Treasury Regulations at 26 C.F.R. §§ 301.7701-1 through 301.7701-3 — commonly known as the &quot;check-the-box&quot; regulations — implement the statutory framework by providing default classification rules and an elective regime. Under these regulations, a domestic eligible entity with a single owner is classified by default as a <em>disregarded entity</em>: an entity that is not recognized as separate from its owner for federal income tax purposes. The entity&apos;s income, deductions, and credits are reported on the owner&apos;s return. An eligible entity may elect a different classification by filing Form 8832 (Entity Classification Election), but absent such election, the default governs.
                    </p>
                    <p>
                      For a single-member LLC formed in a US state and wholly owned by a foreign person, the default classification under the check-the-box regulations is disregarded entity. This means the LLC has no obligation to file a separate federal income tax return (e.g., Form 1120 or Form 1065) solely by virtue of its classification. However, the disregarded-entity classification does not eliminate all federal filing obligations. Separate statutory and regulatory regimes — including information reporting requirements — may attach to the entity based on its ownership structure rather than its income tax classification. The reporting obligation under 26 U.S.C. § 6038A, addressed in the next section, is the principal example.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Herhangi bir ticari kuruluşun federal vergi uygulaması, 26 U.S.C. § 7701(a) tarafından oluşturulan sınıflandırma çerçevesiyle başlar. Bu hüküm temel kategorileri — şirket (corporation), ortaklık (partnership) ve tröst (trust) — tanımlar ve kuruluşun oluşturulduğu veya organize edildiği yere göre yerli ile yabancı statüsünü birbirinden ayırır. Bir ABD eyaletinin yasaları kapsamında kurulan kuruluş yerlidir; yabancı hukuk kapsamında kurulan kuruluş yabancıdır. Bu tanımlar kanuni olup kuruluşun faaliyet yeri, sahiplerinin uyruğu veya gelir kaynağına bağlı değildir.
                    </p>
                    <p>
                      26 C.F.R. §§ 301.7701-1 ila 301.7701-3 kapsamındaki Hazine Düzenlemeleri — yaygın olarak &quot;check-the-box&quot; düzenlemeleri olarak bilinen — varsayılan sınıflandırma kuralları ve seçimli bir rejim sağlayarak kanuni çerçeveyi uygular. Bu düzenlemelere göre, tek bir sahibi olan yerli uygun bir kuruluş, varsayılan olarak <em>dikkate alınmayan varlık</em> (disregarded entity) olarak sınıflandırılır: federal gelir vergisi amaçları için sahibinden ayrı olarak tanınmayan bir kuruluş. Kuruluşun geliri, kesintileri ve kredileri sahibin beyannamesinde raporlanır. Uygun bir kuruluş, Form 8832 (Kuruluş Sınıflandırma Seçimi) dosyalayarak farklı bir sınıflandırma seçebilir; ancak böyle bir seçim yapılmadığında varsayılan kural geçerlidir.
                    </p>
                    <p>
                      Bir ABD eyaletinde kurulan ve tamamen yabancı bir kişiye ait olan tek üyeli bir LLC için, check-the-box düzenlemeleri kapsamındaki varsayılan sınıflandırma dikkate alınmayan varlıktır. Bu, LLC&apos;nin yalnızca sınıflandırması nedeniyle ayrı bir federal gelir vergisi beyannamesi (örn. Form 1120 veya Form 1065) verme yükümlülüğü olmadığı anlamına gelir. Ancak dikkate alınmayan varlık sınıflandırması tüm federal dosyalama yükümlülüklerini ortadan kaldırmaz. Ayrı kanuni ve düzenleyici rejimler — bilgi raporlama gereksinimleri dahil — kuruluşun gelir vergisi sınıflandırmasından ziyade sahiplik yapısına bağlı olarak uygulanabilir. Bir sonraki bölümde ele alınan 26 U.S.C. § 6038A kapsamındaki raporlama yükümlülüğü bunun başlıca örneğidir.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 14: STATUTORY AUTHORITY
                ================================================================ */}
            <section id="statutory-authority" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '14. Statutory Authority' : '14. Yasal Dayanak'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The statutory foundation for the Form 5472 reporting regime is 26 U.S.C. § 6038A. Enacted as part of the information reporting provisions of the Internal Revenue Code, § 6038A imposes an annual information return requirement on any domestic corporation that is 25 percent or more foreign-owned. The statute&apos;s operative term is &quot;reporting corporation,&quot; defined as a domestic corporation for which a foreign person owns, directly or indirectly, at least 25 percent of the total voting power or total value of all classes of stock.
                    </p>
                    <p>
                      Section 6038A requires the reporting corporation to furnish information regarding transactions between the corporation and any &quot;related party&quot; as defined in § 6038A(c). The scope of reportable transactions is broad: it encompasses any transaction of the type listed in the regulations that occurs between the reporting corporation and a related foreign party during the taxable year. The statute does not condition the filing obligation on the existence of income, gain, loss, or any tax liability. The obligation is informational — it exists to give the IRS visibility into cross-border related-party dealings.
                    </p>
                    <p>
                      Critically, § 6038A grants the Secretary of the Treasury authority to prescribe regulations necessary to carry out the statute&apos;s purpose. It is under this delegation that the Treasury Department, through T.D. 9796 (2016), extended the § 6038A reporting obligation to foreign-owned disregarded entities — including single-member LLCs. The statutory authority itself does not mention disregarded entities; the extension was accomplished through the regulatory power delegated by the statute. The interaction between § 6038A and the entity-classification framework of § 7701 is therefore mediated by Treasury regulations, which are addressed in the Regulatory Implementation section of this entry.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Form 5472 raporlama rejiminin kanuni temeli 26 U.S.C. § 6038A&apos;dır. Internal Revenue Code&apos;un bilgi raporlama hükümleri kapsamında çıkarılan § 6038A, yüzde 25 veya daha fazla yabancı sermayeli herhangi bir yerli şirkete yıllık bilgi beyannamesi verme yükümlülüğü getirmektedir. Kanunun işlevsel terimi &quot;raporlayan şirket&quot; (reporting corporation) olup, bir yabancı kişinin doğrudan veya dolaylı olarak toplam oy gücünün veya tüm hisse sınıflarının toplam değerinin en az yüzde 25&apos;ine sahip olduğu yerli şirket olarak tanımlanmaktadır.
                    </p>
                    <p>
                      Bölüm 6038A, raporlayan şirketin, şirket ile § 6038A(c)&apos;de tanımlanan herhangi bir &quot;ilişkili taraf&quot; arasındaki işlemlere ilişkin bilgi sunmasını gerektirmektedir. Raporlanabilir işlemlerin kapsamı geniştir: vergi yılı boyunca raporlayan şirket ile ilişkili yabancı taraf arasında gerçekleşen, düzenlemelerde listelenen türdeki tüm işlemleri kapsar. Kanun, dosyalama yükümlülüğünü gelir, kazanç, kayıp veya herhangi bir vergi borcunun varlığına bağlamamaktadır. Yükümlülük bilgilendirme amaçlıdır — IRS&apos;e sınır ötesi ilişkili taraf işlemleri hakkında görünürlük sağlamak için mevcuttur.
                    </p>
                    <p>
                      Kritik olarak, § 6038A Hazine Sekreterine kanunun amacını gerçekleştirmek için gerekli düzenlemeleri çıkarma yetkisi vermektedir. Bu yetki devri kapsamında Hazine Bakanlığı, T.D. 9796 (2016) aracılığıyla § 6038A raporlama yükümlülüğünü tek üyeli LLC&apos;ler dahil olmak üzere yabancı sermayeli dikkate alınmayan varlıklara genişletmiştir. Kanuni yetki metninin kendisi dikkate alınmayan varlıklardan söz etmez; genişletme, kanun tarafından devredilen düzenleme yetkisi aracılığıyla gerçekleştirilmiştir. Bu nedenle § 6038A ile § 7701&apos;in kuruluş sınıflandırma çerçevesi arasındaki etkileşim, bu maddenin Düzenleyici Uygulama bölümünde ele alınan Hazine düzenlemeleri aracılığıyla sağlanmaktadır.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 15: REGULATORY IMPLEMENTATION
                ================================================================ */}
            <section id="regulatory-implementation" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '15. Regulatory Implementation' : '15. Düzenleyici Uygulama'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The implementing regulations for 26 U.S.C. § 6038A are found at 26 C.F.R. § 1.6038A-1 through § 1.6038A-7. These regulations define the operative terms of the statute — including &quot;reporting corporation,&quot; &quot;related party,&quot; and &quot;reportable transaction&quot; — and prescribe the procedural requirements for compliance. The regulations were issued through notice-and-comment rulemaking, which means they carry the force and effect of law and are entitled to judicial deference under applicable administrative law standards.
                    </p>
                    <p>
                      The most significant regulatory development for foreign-owned single-member LLCs is Treasury Decision 9796, published in the Federal Register on December 13, 2016 (81 Fed. Reg. 89,852). T.D. 9796 amended 26 C.F.R. § 1.6038A-1 to expand the definition of &quot;reporting corporation&quot; to include a domestic disregarded entity that is wholly owned by a foreign person. For this purpose only, the regulation treats the disregarded entity as a corporation — a limited reclassification that does not affect the entity&apos;s income tax status, its state-law liability protection, or any other federal tax attribute.
                    </p>
                    <p>
                      This distinction between statute and regulation is material. The statute, § 6038A, applies by its terms to &quot;domestic corporations.&quot; A disregarded entity is not a corporation under the entity-classification rules of 26 C.F.R. § 301.7701-3. The extension of § 6038A to disregarded entities was therefore accomplished not by Congress amending the statute, but by Treasury exercising its delegated regulatory authority to redefine the regulatory scope. The validity of this extension rests on the rulemaking authority granted by § 6038A(a) and on the procedural regularity of the notice-and-comment process through which T.D. 9796 was promulgated. Regulations issued through this process are presumed valid absent a successful challenge.
                    </p>
                    <p>
                      The effective date of the regulatory expansion is taxable years beginning after December 31, 2016. Foreign-owned single-member LLCs in existence before that date became subject to the reporting obligation starting with their first taxable year beginning on or after January 1, 2017.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      26 U.S.C. § 6038A&apos;nın uygulama yönetmelikleri 26 C.F.R. § 1.6038A-1 ile § 1.6038A-7 arasında yer almaktadır. Bu yönetmelikler kanunun işlevsel terimlerini — &quot;raporlayan şirket,&quot; &quot;ilişkili taraf&quot; ve &quot;raporlanabilir işlem&quot; dahil — tanımlar ve uyum için usul gereksinimlerini belirler. Yönetmelikler bildirim ve yorum süreciyle çıkarılmıştır; bu, kanun hükmünde ve etkisinde oldukları ve geçerli idare hukuku standartları kapsamında yargısal saygıya tabi oldukları anlamına gelir.
                    </p>
                    <p>
                      Yabancı sermayeli tek üyeli LLC&apos;ler için en önemli düzenleyici gelişme, 13 Aralık 2016&apos;da Federal Register&apos;da yayımlanan Hazine Kararı 9796&apos;dır (81 Fed. Reg. 89.852). T.D. 9796, &quot;raporlayan şirket&quot; tanımını tamamen yabancı bir kişiye ait yerli dikkate alınmayan varlığı kapsayacak şekilde genişletmek üzere 26 C.F.R. § 1.6038A-1&apos;i değiştirmiştir. Yalnızca bu amaçla yönetmelik, dikkate alınmayan varlığı bir şirket olarak işlem görür — bu, kuruluşun gelir vergisi statüsünü, eyalet hukuku kapsamındaki sorumluluk korumasını veya diğer herhangi bir federal vergi niteliğini etkilemeyen sınırlı bir yeniden sınıflandırmadır.
                    </p>
                    <p>
                      Kanun ile yönetmelik arasındaki bu ayrım önemlidir. Kanun, § 6038A, kendi hükümleri gereği &quot;yerli şirketlere&quot; uygulanmaktadır. Dikkate alınmayan bir varlık, 26 C.F.R. § 301.7701-3&apos;ün kuruluş sınıflandırma kuralları kapsamında bir şirket değildir. Bu nedenle § 6038A&apos;nın dikkate alınmayan varlıklara genişletilmesi, Kongre&apos;nin kanunu değiştirmesiyle değil, Hazine&apos;nin devredilen düzenleme yetkisini kullanarak düzenleyici kapsamı yeniden tanımlamasıyla gerçekleştirilmiştir. Bu genişletmenin geçerliliği, § 6038A(a) tarafından verilen düzenleme yetkisine ve T.D. 9796&apos;nın çıkarıldığı bildirim ve yorum sürecinin usul düzenliliğine dayanmaktadır. Bu süreçle çıkarılan yönetmelikler, başarılı bir itiraz olmadıkça geçerli kabul edilir.
                    </p>
                    <p>
                      Düzenleyici genişletmenin yürürlük tarihi 31 Aralık 2016 sonrasında başlayan vergi yıllarıdır. Bu tarihten önce var olan yabancı sermayeli tek üyeli LLC&apos;ler, 1 Ocak 2017 tarihinde veya sonrasında başlayan ilk vergi yıllarından itibaren raporlama yükümlülüğüne tabi hale gelmiştir.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 16: JUDICIAL DEFERENCE FRAMEWORK
                ================================================================ */}
            <section id="judicial-deference-framework" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '16. Judicial Deference Framework' : '16. Yargısal Saygı Çerçevesi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The extension of § 6038A to foreign-owned disregarded entities is a regulatory act, not a statutory one. This distinction raises the question of how courts evaluate the validity and interpretive weight of Treasury regulations in this area. Two doctrinal frameworks are relevant.
                    </p>
                    <p>
                      <strong>Chevron deference.</strong> Under <em>Chevron U.S.A., Inc. v. Natural Resources Defense Council, Inc.</em>, 467 U.S. 837 (1984), courts apply a two-step analysis to agency regulations interpreting ambiguous statutes. First, the court asks whether Congress has directly spoken to the precise question at issue. If the statute is silent or ambiguous, the court proceeds to step two: whether the agency&apos;s interpretation is a permissible construction. Treasury regulations issued through notice-and-comment rulemaking — including T.D. 9796 — have historically received Chevron deference when the authorizing statute delegates interpretive authority to the agency. Under this framework, the regulatory reclassification of disregarded entities as corporations for § 6038A purposes would be sustained so long as it represents a reasonable reading of the statutory delegation.
                    </p>
                    <p>
                      <strong>Skidmore weight.</strong> Where an agency interpretation is set forth in less formal guidance — such as revenue rulings, notices, or form instructions — courts apply the standard from <em>Skidmore v. Swift &amp; Co.</em>, 323 U.S. 134 (1944). Under Skidmore, the weight given to an agency&apos;s interpretation depends on the thoroughness of its reasoning, its consistency with earlier and later pronouncements, and its persuasive power. IRS form instructions and publications concerning Form 5472 fall within this tier: they inform compliance but do not carry the force of law.
                    </p>
                    <p>
                      For practitioners, the practical significance is that the core reporting obligation for foreign-owned disregarded entities rests on a regulation that was promulgated through formal procedures and is presumed valid. Challenges to this regulatory framework would need to demonstrate that Treasury exceeded its delegated authority or that the regulation is arbitrary — a burden that has not been met in reported decisions to date.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      § 6038A&apos;nın yabancı sermayeli dikkate alınmayan varlıklara genişletilmesi kanuni değil, düzenleyici bir eylemdir. Bu ayrım, mahkemelerin bu alandaki Hazine yönetmeliklerinin geçerliliğini ve yorumlayıcı ağırlığını nasıl değerlendirdiği sorusunu gündeme getirir. İki doktrinel çerçeve ilgilidir.
                    </p>
                    <p>
                      <strong>Chevron saygısı.</strong> <em>Chevron U.S.A., Inc. v. Natural Resources Defense Council, Inc.</em>, 467 U.S. 837 (1984) kararı kapsamında mahkemeler, belirsiz kanunları yorumlayan kurum yönetmeliklerine iki aşamalı bir analiz uygular. İlk olarak mahkeme, Kongre&apos;nin söz konusu meseleye doğrudan değinip değinmediğini sorar. Kanun sessiz veya belirsizse mahkeme ikinci aşamaya geçer: kurumun yorumunun kabul edilebilir bir yorum olup olmadığı. Bildirim ve yorum süreciyle çıkarılan Hazine yönetmelikleri — T.D. 9796 dahil — yetkilendiren kanunun kuruma yorumlama yetkisi devrettiği durumlarda tarihsel olarak Chevron saygısı görmüştür. Bu çerçevede, § 6038A amaçları için dikkate alınmayan varlıkların şirket olarak düzenleyici yeniden sınıflandırılması, kanuni yetki devrinin makul bir okumasını temsil ettiği sürece geçerli kabul edilecektir.
                    </p>
                    <p>
                      <strong>Skidmore ağırlığı.</strong> Bir kurum yorumu daha az resmi rehberlikte — gelir kararları, bildirimler veya form talimatları gibi — ortaya konulduğunda, mahkemeler <em>Skidmore v. Swift &amp; Co.</em>, 323 U.S. 134 (1944) kararındaki standardı uygular. Skidmore kapsamında, bir kurum yorumuna verilen ağırlık, muhakemesinin kapsamlılığına, önceki ve sonraki açıklamalarla tutarlılığına ve ikna gücüne bağlıdır. Form 5472&apos;ye ilişkin IRS form talimatları ve yayınları bu kademeye girer: uyumu bilgilendirir ancak kanun hükmünde değildir.
                    </p>
                    <p>
                      Uygulayıcılar için pratik önem şudur: yabancı sermayeli dikkate alınmayan varlıklar için temel raporlama yükümlülüğü, resmi prosedürlerle çıkarılmış ve geçerli kabul edilen bir yönetmeliğe dayanmaktadır. Bu düzenleyici çerçeveye yönelik itirazların, Hazine&apos;nin devredilen yetkisini aştığını veya yönetmeliğin keyfi olduğunu göstermesi gerekir — bugüne kadar raporlanan kararlarda karşılanmamış bir yüktür.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 17: COMPLIANCE TIMELINE
                ================================================================ */}
            <section id="compliance-timeline" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '17. Compliance Timeline' : '17. Uyum Zaman Çizelgesi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    The following timeline illustrates the standard compliance sequence for a foreign-owned single-member LLC formed in a US state and classified as a disregarded entity.
                  </p>
                ) : (
                  <p>
                    Aşağıdaki zaman çizelgesi, bir ABD eyaletinde kurulan ve dikkate alınmayan varlık olarak sınıflandırılan yabancı sermayeli tek üyeli bir LLC için standart uyum sürecini göstermektedir.
                  </p>
                )}
              </div>
              <div className="mt-6 space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="font-bold text-black text-sm">{isEnglish ? 'Formation year' : 'Kuruluş yılı'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'Upon formation under state law, the LLC should obtain an Employer Identification Number (EIN) from the IRS using Form SS-4. Even if the LLC has no employees and no US trade or business, the EIN is required for information return filing. The formation year is also the first year in which reportable transactions — including the initial capital contribution — may occur.'
                      : 'Eyalet hukuku kapsamında kuruluş üzerine, LLC Form SS-4 kullanarak IRS\'ten bir İşveren Kimlik Numarası (EIN) almalıdır. LLC\'nin çalışanı olmasa ve ABD ticareti veya işi bulunmasa dahi, bilgi beyannamesi dosyalaması için EIN gereklidir. Kuruluş yılı aynı zamanda ilk sermaye katkısı dahil raporlanabilir işlemlerin gerçekleşebileceği ilk yıldır.'}
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="font-bold text-black text-sm">{isEnglish ? 'First reporting year' : 'İlk raporlama yılı'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'The first Form 5472 is due for the taxable year in which the LLC first has a reportable transaction with a related party. For most foreign-owned single-member LLCs, this is the formation year itself, because the initial capitalization constitutes a reportable transaction. The form is filed with a pro forma Form 1120 for that taxable year.'
                      : 'İlk Form 5472, LLC\'nin ilişkili bir tarafla ilk raporlanabilir işlemi gerçekleştirdiği vergi yılı için verilir. Çoğu yabancı sermayeli tek üyeli LLC için bu kuruluş yılının kendisidir, çünkü ilk sermaye katkısı raporlanabilir bir işlem oluşturur. Form, o vergi yılı için pro forma Form 1120 ile birlikte dosyalanır.'}
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="font-bold text-black text-sm">{isEnglish ? 'Due date' : 'Son tarih'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'The pro forma Form 1120 with attached Form 5472 follows the corporate return due date: April 15 following the close of a calendar tax year. A six-month automatic extension to October 15 is available by filing Form 7004 before the original due date. The extension extends the filing deadline but does not extend the time for any other compliance obligation.'
                      : 'Ekli Form 5472 ile pro forma Form 1120, kurumsal beyanname son tarihini takip eder: takvim vergi yılının kapanışını izleyen 15 Nisan. Orijinal son tarihten önce Form 7004 dosyalanarak 15 Ekim\'e kadar altı aylık otomatik uzatma mevcuttur. Uzatma dosyalama süresini uzatır ancak diğer uyum yükümlülükleri için süreyi uzatmaz.'}
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="font-bold text-black text-sm">{isEnglish ? 'Late filing' : 'Geç dosyalama'}</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'If the return is not filed by the due date (including extensions), the $25,000 base penalty under § 6038A(d) attaches automatically. The IRS may issue a notice of failure, after which continuation penalties of $25,000 per 30-day period begin to accrue. Delinquent returns should be filed as soon as practicable; voluntary late filing may be relevant to a reasonable cause determination, though it does not guarantee penalty relief.'
                      : 'Beyanname son tarihe (uzatmalar dahil) kadar dosyalanmazsa, § 6038A(d) kapsamındaki 25.000 dolar taban ceza otomatik olarak uygulanır. IRS bir uyumsuzluk bildirimi gönderebilir ve bundan sonra 30 günlük dönem başına 25.000 dolar devam cezaları tahakkuk etmeye başlar. Gecikmiş beyannameler mümkün olan en kısa sürede dosyalanmalıdır; gönüllü geç dosyalama makul neden değerlendirmesiyle ilgili olabilir, ancak ceza muafiyetini garanti etmez.'}
                  </p>
                </div>
              </div>
            </section>

            {/* ================================================================
                SECTION 18: COMMON MISINTERPRETATIONS
                ================================================================ */}
            <section id="common-misinterpretations" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '18. Common Misinterpretations' : '18. Yaygın Yanlış Yorumlar'}
              </h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-black text-sm mb-2">
                    {isEnglish
                      ? '"No US income means no filing obligation."'
                      : '"ABD geliri yok = dosyalama yükümlülüğü yok."'}
                  </h3>
                  <div className="prose prose-gray prose-sm max-w-none">
                    {isEnglish ? (
                      <p>
                        This is the most prevalent misunderstanding. The Form 5472 filing obligation is an information return requirement, not an income tax return. It is triggered by the occurrence of a reportable transaction between the entity and a related party — not by the existence of income, gain, or US-source revenue. Capital contributions, use of property, and payment of organizational expenses are reportable transactions that commonly arise even in years with zero income. The statute and regulations impose the obligation based on entity structure and ownership, not on the presence of taxable activity.
                      </p>
                    ) : (
                      <p>
                        Bu en yaygın yanlış anlamadır. Form 5472 dosyalama yükümlülüğü bir bilgi beyannamesi gereksinimidir, gelir vergisi beyannamesi değildir. Kuruluş ile ilişkili taraf arasında raporlanabilir bir işlemin gerçekleşmesiyle tetiklenir — gelir, kazanç veya ABD kaynaklı gelirin varlığıyla değil. Sermaye katkıları, mülk kullanımı ve kuruluş giderlerinin ödenmesi, sıfır gelirli yıllarda bile yaygın olarak ortaya çıkan raporlanabilir işlemlerdir. Kanun ve yönetmelikler yükümlülüğü vergiye tabi faaliyetin varlığına değil, kuruluş yapısı ve sahipliğe dayandırır.
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-black text-sm mb-2">
                    {isEnglish
                      ? '"A disregarded entity has no federal obligations."'
                      : '"Dikkate alınmayan varlığın federal yükümlülüğü yoktur."'}
                  </h3>
                  <div className="prose prose-gray prose-sm max-w-none">
                    {isEnglish ? (
                      <p>
                        Disregarded-entity classification under the check-the-box regulations eliminates the entity&apos;s separate federal <em>income tax</em> return obligation. It does not eliminate all federal filing obligations. The Treasury regulations at 26 C.F.R. § 1.6038A-1, as amended by T.D. 9796, specifically reclassify a foreign-owned disregarded entity as a corporation for purposes of § 6038A information reporting. The disregarded-entity label describes the entity&apos;s income tax treatment; it does not create a blanket exemption from information return requirements or other regulatory regimes.
                      </p>
                    ) : (
                      <p>
                        Check-the-box düzenlemeleri kapsamındaki dikkate alınmayan varlık sınıflandırması, kuruluşun ayrı federal <em>gelir vergisi</em> beyannamesi verme yükümlülüğünü ortadan kaldırır. Tüm federal dosyalama yükümlülüklerini ortadan kaldırmaz. T.D. 9796 ile değiştirilen 26 C.F.R. § 1.6038A-1 kapsamındaki Hazine yönetmelikleri, yabancı sermayeli dikkate alınmayan bir varlığı § 6038A bilgi raporlaması amaçları için özel olarak şirket olarak yeniden sınıflandırır. Dikkate alınmayan varlık etiketi kuruluşun gelir vergisi uygulamasını tanımlar; bilgi beyannamesi gereksinimlerinden veya diğer düzenleyici rejimlerden genel bir muafiyet oluşturmaz.
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-black text-sm mb-2">
                    {isEnglish
                      ? '"No US bank account means no reporting."'
                      : '"ABD banka hesabı yok = raporlama yok."'}
                  </h3>
                  <div className="prose prose-gray prose-sm max-w-none">
                    {isEnglish ? (
                      <p>
                        The Form 5472 obligation is not conditioned on the existence of a US bank account. The reportable transaction categories defined in the regulations and form instructions extend well beyond financial account activity. Transactions such as capital contributions from the foreign owner, payment of formation or registered agent fees, use of the owner&apos;s personal assets for entity purposes, and intercompany loans are all reportable regardless of whether the LLC maintains a US bank account. The absence of a bank account does not eliminate the entity&apos;s reporting obligation.
                      </p>
                    ) : (
                      <p>
                        Form 5472 yükümlülüğü ABD banka hesabının varlığına bağlı değildir. Yönetmeliklerde ve form talimatlarında tanımlanan raporlanabilir işlem kategorileri, finansal hesap faaliyetinin çok ötesine geçmektedir. Yabancı sahipten sermaye katkıları, kuruluş veya kayıtlı temsilci ücretlerinin ödenmesi, sahibin kişisel varlıklarının kuruluş amaçları için kullanımı ve şirketler arası krediler gibi işlemler, LLC&apos;nin ABD banka hesabı bulunup bulunmadığına bakılmaksızın raporlanabilir niteliktedir. Banka hesabı bulunmaması kuruluşun raporlama yükümlülüğünü ortadan kaldırmaz.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                SECTION 19: RISK MATRIX
                ================================================================ */}
            <section id="risk-matrix" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '19. Risk Matrix' : '19. Risk Matrisi'}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Scenario' : 'Senaryo'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Risk Level' : 'Risk Seviyesi'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Legal Basis' : 'Yasal Dayanak'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Practical Consequence' : 'Pratik Sonuç'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Failure to file Form 5472 for any taxable year'
                          : 'Herhangi bir vergi yılı için Form 5472 dosyalamamak'}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                          {isEnglish ? 'High' : 'Yüksek'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">§ 6038A(d)(1)</td>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? '$25,000 base penalty per return, per year. Additional continuation penalties accrue after IRS notice.'
                          : 'Beyanname başına, yıl başına 25.000 dolar taban ceza. IRS bildiriminden sonra ek devam cezaları tahakkuk eder.'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Failure to obtain EIN before filing deadline'
                          : 'Dosyalama son tarihinden önce EIN almamak'}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                          {isEnglish ? 'High' : 'Yüksek'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">26 C.F.R. § 1.6038A-1</td>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Cannot file pro forma Form 1120 or Form 5472 without an EIN. Delays trigger late-filing penalties.'
                          : 'EIN olmadan pro forma Form 1120 veya Form 5472 dosyalanamaz. Gecikmeler geç dosyalama cezalarını tetikler.'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Omitting reportable transactions (e.g., initial capital contribution)'
                          : 'Raporlanabilir işlemleri atlamak (örn. ilk sermaye katkısı)'}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                          {isEnglish ? 'Medium' : 'Orta'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">§ 6038A(a)–(b)</td>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Incomplete return may be treated as failure to file. IRS may assert penalties or request amended filing.'
                          : 'Eksik beyanname dosyalamamış olarak değerlendirilebilir. IRS ceza uygulayabilir veya düzeltilmiş dosyalama talep edebilir.'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Failure to maintain records of reportable transactions'
                          : 'Raporlanabilir işlemlerin kayıtlarını tutmamak'}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                          {isEnglish ? 'Medium' : 'Orta'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">§ 6038A(a), (d)</td>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Independent penalty basis under § 6038A(d). Recordkeeping failure is separately sanctionable from filing failure.'
                          : '§ 6038A(d) kapsamında bağımsız ceza dayanağı. Kayıt tutmama başarısızlığı, dosyalama başarısızlığından ayrı olarak cezalandırılabilir.'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Assuming disregarded-entity status eliminates all filing obligations'
                          : 'Dikkate alınmayan varlık statüsünün tüm dosyalama yükümlülüklerini kaldırdığını varsaymak'}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                          {isEnglish ? 'High' : 'Yüksek'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">T.D. 9796; § 1.6038A-1</td>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Regulatory reclassification creates reporting obligation independent of income tax classification. Multi-year non-filing exposure compounds penalties.'
                          : 'Düzenleyici yeniden sınıflandırma, gelir vergisi sınıflandırmasından bağımsız raporlama yükümlülüğü oluşturur. Çok yıllı dosyalama yapılmaması cezaları birleştirir.'}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Relying solely on IRS form instructions without reviewing statute and regulations'
                          : 'Kanun ve yönetmelikleri incelemeden yalnızca IRS form talimatlarına güvenmek'}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          {isEnglish ? 'Low' : 'Düşük'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-gray-500 font-mono text-xs">{isEnglish ? 'Skidmore v. Swift' : 'Skidmore v. Swift'}</td>
                      <td className="border border-gray-200 px-4 py-3">
                        {isEnglish
                          ? 'Form instructions are persuasive but not binding. Where instructions diverge from the Code or regulations, the higher-authority source controls.'
                          : 'Form talimatları ikna edicidir ancak bağlayıcı değildir. Talimatlar Kanun veya yönetmeliklerden ayrıldığında, üst otorite kaynağı geçerlidir.'}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
