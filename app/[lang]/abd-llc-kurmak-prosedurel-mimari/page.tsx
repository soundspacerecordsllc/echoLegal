// app/[lang]/abd-llc-kurmak-prosedurel-mimari/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const ENTRY_SLUG = 'abd-llc-kurmak-prosedurel-mimari'

const PAGE_META = {
  slug: 'abd-llc-kurmak-prosedurel-mimari',
  datePublished: '2026-02-18',
  dateModified: '2026-02-18',
  version: '1.0',
  citationKey: 'ecl-enc-00012',
}

const ENTRY_META = {
  version: '1.0',
  lastReviewed: '2026-02-18',
  reviewStatus: 'Draft',
  jurisdiction: 'US Federal / State',
  authorityLayersUsed: false,
  citationKey: 'ecl-enc-00202',
  contentType: 'encyclopedia-entry' as const,
  category: 'formation' as const,
  revisionHistory: [
    { date: '2026-02-18', note: 'Initial scaffold – 10-section procedural architecture' },
    { date: '2026-02-18', note: 'Foundational layers – classification, pre-formation risk, and formation event (Pass 2)' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Forming an LLC in the US – Procedural Architecture for Turkish Founders | EchoLegal'
    : 'ABD\'de LLC Kurmak – Türk Kurucular İçin Prosedürel Mimari | EchoLegal'

  const description = isEnglish
    ? 'End-to-end procedural reference for Turkish entrepreneurs forming a US LLC. Covers classification, formation, EIN, banking, federal reporting, platform integration, and ongoing compliance.'
    : 'Türk girişimciler için ABD\'de LLC kurma sürecinin uçtan uca prosedürel referansı. Sınıflandırma, kuruluş, EIN, bankacılık, federal raporlama, platform entegrasyonu ve sürekli uyum konularını kapsar.'

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
      'citation_title': isEnglish
        ? 'Forming an LLC in the US – Procedural Architecture for Turkish Founders'
        : 'ABD\'de LLC Kurmak – Türk Kurucular İçin Prosedürel Mimari',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2026/02/18',
      'citation_lastmod': '2026/02/18',
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

export default async function ABDLLCProsedurelMimariPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'classification-decision-layer', label: isEnglish ? 'Classification Decision Layer' : 'Sınıflandırma Karar Katmanı' },
    { id: 'pre-formation-risk-assessment', label: isEnglish ? 'Pre-Formation Risk Assessment' : 'Kuruluş Öncesi Risk Değerlendirmesi' },
    { id: 'formation-event', label: isEnglish ? 'Formation Event' : 'Kuruluş Olayı' },
    { id: 'ein-acquisition-strategy', label: isEnglish ? 'EIN Acquisition Strategy' : 'EIN Edinme Stratejisi' },
    { id: 'banking-infrastructure-layer', label: isEnglish ? 'Banking Infrastructure Layer' : 'Bankacılık Altyapı Katmanı' },
    { id: 'federal-reporting-trigger-map', label: isEnglish ? 'Federal Reporting Trigger Map' : 'Federal Raporlama Tetik Haritası' },
    { id: 'platform-payment-integration', label: isEnglish ? 'Platform & Payment Integration' : 'Platform ve Ödeme Entegrasyonu' },
    { id: 'ongoing-compliance-calendar', label: isEnglish ? 'Ongoing Compliance Calendar' : 'Sürekli Uyum Takvimi' },
    { id: 'procedural-error-matrix', label: isEnglish ? 'Procedural Error Matrix' : 'Prosedürel Hata Matrisi' },
    { id: 'strategic-sequencing-blueprint', label: isEnglish ? 'Strategic Sequencing Blueprint (Executive Summary)' : 'Stratejik Sıralama Planı (Yönetici Özeti)' },
  ]

  const primarySources = getPrimarySources(ENTRY_SLUG, isEnglish ? 'en' : 'tr')

  const pageUrl = `${SITE_URL}/${lang}/${PAGE_META.slug}`
  const pageTitle = isEnglish
    ? 'Forming an LLC in the US – Procedural Architecture for Turkish Founders'
    : 'ABD\'de LLC Kurmak – Türk Kurucular İçin Prosedürel Mimari'

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'End-to-end procedural reference for Turkish entrepreneurs forming a US LLC.'
      : 'Türk girişimciler için ABD\'de LLC kurma sürecinin uçtan uca prosedürel referansı.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['llc-formation', 'turkish-founders', 'us-llc', 'ein', 'compliance'],
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
            <span className="text-black">{isEnglish ? 'LLC Procedural Architecture' : 'LLC Prosedürel Mimari'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Cornerstone Procedural Reference' : 'Temel Prosedürel Referans'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                {isEnglish
                  ? 'Forming an LLC in the US'
                  : 'ABD\'de LLC Kurmak'}
              </h1>
              <p className="text-lg text-gray-500 mb-4">
                {isEnglish
                  ? 'Procedural Architecture for Turkish Founders'
                  : 'Türk Kurucular İçin Prosedürel Mimari'}
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
                  {isEnglish ? 'Last reviewed: February 18, 2026' : 'Son inceleme: 18 Şubat 2026'}
                </span>
                <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {isEnglish ? 'Draft' : 'Taslak'}
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
                  ? 'Jurisdiction: US Federal / State. This cornerstone entry maps the full procedural sequence for a Turkish entrepreneur forming and operating a US LLC — from entity classification through ongoing compliance.'
                  : 'Yargı alanı: ABD Federal / Eyalet. Bu temel madde, bir Türk girişimcinin ABD LLC kurma ve işletme sürecinin tüm prosedürel dizisini — tüzel kişilik sınıflandırmasından sürekli uyuma kadar — haritalamaktadır.'}
              </p>
            </header>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-10">
              <p className="text-sm text-red-900 leading-relaxed">
                <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal, tax, or business advice. Laws and regulations vary by state and change frequently. Consult a qualified attorney or CPA for advice specific to your situation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; hukuki, vergisel veya ticari danışmanlık teşkil etmez. Yasalar ve düzenlemeler eyalete göre değişir ve sık sık güncellenir. Durumunuza özgü tavsiye için uzman bir avukat veya mali müşavire danışın.'}
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
                SECTION 1: CLASSIFICATION DECISION LAYER
                ================================================================ */}
            <section id="classification-decision-layer" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '1. Classification Decision Layer' : '1. Sınıflandırma Karar Katmanı'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The classification decision is the structural foundation upon which every subsequent procedural step depends. Before a Turkish founder files Articles of Organization with any US state, the federal tax classification of the intended entity must be determined — not as a formality, but as a controlling variable that shapes reporting obligations, penalty exposure, and treaty eligibility for the life of the business. The Internal Revenue Code does not impose a single classification on LLCs. Instead, the check-the-box regulations under 26 C.F.R. §§ 301.7701-1 through 301.7701-3 establish a default classification regime that varies based on the number of members and the domestic or foreign character of the entity.
                    </p>
                    <p>
                      A single-member LLC owned by one foreign natural person is classified by default as a <strong>disregarded entity</strong> for federal tax purposes. This classification does not eliminate the entity&apos;s legal existence under state law — the LLC remains a juridical person capable of holding property, entering contracts, and maintaining a separate liability shield. What disregarded status does eliminate is the entity&apos;s independent federal tax identity: for income tax purposes, the LLC&apos;s activities are attributed directly to its owner. The practical consequence for a Turkish founder is that the LLC itself does not file a federal income tax return under its own employer identification number in the manner a corporation would. However — and this is the critical distinction that drives much of the compliance architecture in subsequent sections — the disregarded entity classification does <em>not</em> exempt the LLC from information reporting. Since the 2017 tax year, Treasury regulations have required foreign-owned disregarded entities to file Form 5472 attached to a pro forma Form 1120, treating the entity as a corporation solely for that reporting purpose.
                    </p>
                    <p>
                      Where two or more members exist, the default classification shifts to <strong>partnership</strong>, triggering an entirely different reporting regime: Form 1065, Schedule K-1 allocations, and potential withholding obligations under 26 U.S.C. § 1446 for foreign partners. The multi-member structure also introduces transfer pricing scrutiny on inter-member transactions and creates additional complexity under the US-Turkey income tax treaty. Alternatively, any LLC — whether single-member or multi-member — may affirmatively elect to be treated as a <strong>C-Corporation</strong> by filing Form 8832. This election is irrevocable for sixty months and subjects the entity to corporate income tax at the entity level, fundamentally altering the economic and compliance profile.
                    </p>
                    <p>
                      The classification decision is not merely a tax-planning exercise. It determines which federal forms must be filed, which penalties attach to non-compliance, whether treaty benefits can be claimed at the entity or owner level, and how downstream banking and platform onboarding will interpret the entity&apos;s structure. For a Turkish founder operating without a Social Security Number and potentially without US physical presence, the classification choice interacts directly with EIN acquisition pathways, ITIN eligibility, and the feasibility of specific banking relationships. This decision must therefore be resolved with full awareness of its cascading procedural effects before any state formation filing is initiated.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Sınıflandırma kararı, sonraki her prosedürel adımın üzerine inşa edildiği yapısal temeldir. Bir Türk kurucu herhangi bir ABD eyaletine Articles of Organization dosyalamadan önce, hedeflenen tüzel kişiliğin federal vergi sınıflandırması belirlenmelidir — bir formalite olarak değil, işletmenin ömrü boyunca raporlama yükümlülüklerini, ceza maruziyetini ve anlaşma uygunluğunu şekillendiren kontrol edici bir değişken olarak. Internal Revenue Code, LLC&apos;lere tek bir sınıflandırma dayatmaz. Bunun yerine, 26 C.F.R. §§ 301.7701-1 ila 301.7701-3 kapsamındaki check-the-box düzenlemeleri, üye sayısına ve tüzel kişiliğin yerli veya yabancı niteliğine göre değişen bir varsayılan sınıflandırma rejimi oluşturur.
                    </p>
                    <p>
                      Bir yabancı gerçek kişiye ait tek üyeli LLC, federal vergi amaçları için varsayılan olarak <strong>disregarded entity</strong> (dikkate alınmayan varlık) olarak sınıflandırılır. Bu sınıflandırma, tüzel kişiliğin eyalet hukuku kapsamındaki yasal varlığını ortadan kaldırmaz — LLC, mülk sahibi olabilen, sözleşme yapabilen ve ayrı bir sorumluluk kalkanı sürdürebilen bir tüzel kişi olarak varlığını korur. Disregarded statüsünün ortadan kaldırdığı şey, tüzel kişiliğin bağımsız federal vergi kimliğidir: gelir vergisi amaçları için LLC&apos;nin faaliyetleri doğrudan sahibine atfedilir. Türk kurucu için pratik sonuç şudur: LLC, bir şirketin yapacağı şekilde kendi işveren kimlik numarası altında federal gelir vergisi beyannamesi vermez. Ancak — ve bu, sonraki bölümlerdeki uyum mimarisinin büyük bölümünü yönlendiren kritik ayrımdır — disregarded entity sınıflandırması LLC&apos;yi bilgi raporlamasından <em>muaf tutmaz</em>. 2017 vergi yılından itibaren Hazine düzenlemeleri, yabancı sermayeli disregarded entity&apos;lerin tüzel kişiliği yalnızca bu raporlama amacıyla şirket olarak ele alarak pro forma Form 1120&apos;ye ekli Form 5472 dosyalamasını zorunlu kılmaktadır.
                    </p>
                    <p>
                      İki veya daha fazla üyenin bulunduğu durumda, varsayılan sınıflandırma <strong>ortaklığa</strong> (partnership) kayar ve tamamen farklı bir raporlama rejimini tetikler: Form 1065, Schedule K-1 dağılımları ve yabancı ortaklar için 26 U.S.C. § 1446 kapsamında potansiyel stopaj yükümlülükleri. Çok üyeli yapı aynı zamanda üyeler arası işlemlerde transfer fiyatlandırması incelemesini beraberinde getirir ve ABD-Türkiye gelir vergisi anlaşması kapsamında ek karmaşıklık yaratır. Alternatif olarak, tek üyeli veya çok üyeli herhangi bir LLC, Form 8832 dosyalayarak açık bir şekilde <strong>C-Corporation</strong> olarak muamele edilmeyi seçebilir. Bu seçim altmış ay boyunca geri alınamaz ve tüzel kişiliği kurum düzeyinde kurumlar vergisine tabi kılarak ekonomik ve uyum profilini temelden değiştirir.
                    </p>
                    <p>
                      Sınıflandırma kararı salt bir vergi planlama egzersizi değildir. Hangi federal formların dosyalanması gerektiğini, uyumsuzluğa hangi cezaların bağlandığını, anlaşma avantajlarının tüzel kişilik düzeyinde mi yoksa sahip düzeyinde mi talep edilebileceğini ve bankacılık ile platform entegrasyon süreçlerinin tüzel kişiliğin yapısını nasıl yorumlayacağını belirler. Sosyal Güvenlik Numarası olmadan ve potansiyel olarak ABD&apos;de fiziksel varlığı bulunmadan faaliyet gösteren bir Türk kurucu için sınıflandırma tercihi, EIN edinme yolları, ITIN uygunluğu ve belirli bankacılık ilişkilerinin fizibilitesi ile doğrudan etkileşim halindedir. Bu nedenle bu karar, herhangi bir eyalet kuruluş başvurusu başlatılmadan önce zincirleme prosedürel etkilerinin tam farkındalığıyla çözülmelidir.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 2: PRE-FORMATION RISK ASSESSMENT
                ================================================================ */}
            <section id="pre-formation-risk-assessment" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. Pre-Formation Risk Assessment' : '2. Kuruluş Öncesi Risk Değerlendirmesi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      Formation of a US LLC is an irreversible jurisdictional commitment that triggers reporting obligations, penalty exposure, and ongoing compliance costs from the date of filing. For a Turkish founder, the pre-formation window is the only phase in which certain structural constraints can be identified and addressed without incurring legal or financial consequences. Once Articles of Organization are accepted by a state filing office, the entity exists — and with it, the full apparatus of federal and state obligations comes into effect regardless of whether the founder has obtained an EIN, opened a bank account, or commenced business activity.
                    </p>
                    <p>
                      <strong>Immigration status interaction.</strong> The relationship between LLC formation and US immigration status is widely misunderstood. Forming a US LLC does not confer, imply, or advance any immigration benefit. A Turkish citizen may legally own a US LLC regardless of visa status — including from outside the United States — but ownership does not authorize the individual to perform work within the United States. A founder holding a B-1/B-2 tourist visa, or no US visa at all, may own and receive distributions from a US LLC but may not engage in day-to-day operational management while physically present in the US without appropriate work authorization. The distinction between passive ownership and active management is not merely theoretical: violations of immigration status can result in visa revocation, bars to reentry, and collateral consequences that extend far beyond the business itself. This boundary must be understood before formation, not retroactively.
                    </p>
                    <p>
                      <strong>ITIN/EIN pathway considerations.</strong> The Employer Identification Number is the entity&apos;s federal tax identifier and is required for virtually every downstream compliance and banking step. For a US citizen or resident alien, EIN acquisition is immediate through the IRS online portal. For a Turkish founder without a Social Security Number, the pathway diverges significantly: the SS-4 application must be submitted by fax or mail, processing times extend to several weeks, and the IRS may request supplemental documentation before issuance. Separately, the founder&apos;s personal tax identifier — an Individual Taxpayer Identification Number (ITIN) — may be required for treaty benefit claims, certain withholding elections, and some banking relationships. However, ITIN issuance requires filing a federal tax return or meeting a specific exception, creating a sequencing dependency that must be mapped before formation. Founders who assume that both identifiers can be obtained simultaneously or on demand after formation frequently encounter multi-week delays that cascade into banking failures and missed compliance deadlines.
                    </p>
                    <p>
                      <strong>Banking feasibility analysis.</strong> The availability of US business banking for a foreign-owned LLC cannot be assumed. Traditional banks impose in-person identity verification requirements that necessitate US physical presence. Fintech alternatives (Mercury, Relay, and similar platforms) have periodically accepted remote applications from foreign founders but maintain the right to alter onboarding policies without notice. Compliance-driven account closures — where a bank terminates a relationship after onboarding due to updated risk assessments — represent a material operational risk for entities that lack alternative banking infrastructure. The feasibility of securing a functional bank account should be evaluated before formation, not after, because an LLC that exists legally but cannot receive or disburse funds is operationally inert while still accumulating reporting obligations.
                    </p>
                    <p>
                      <strong>Cross-border reporting exposure.</strong> Turkish tax law imposes independent reporting obligations on Turkish residents who hold foreign assets or control foreign entities. The formation of a US LLC by a Turkish tax resident may trigger disclosure requirements under Turkish regulations irrespective of whether the US entity generates income. These parallel obligations must be identified during the pre-formation phase so that the founder enters the US compliance environment with a complete picture of the bilateral reporting landscape, not a unilateral one.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      ABD LLC kuruluşu, dosyalama tarihinden itibaren raporlama yükümlülüklerini, ceza maruziyetini ve süregelen uyum maliyetlerini tetikleyen geri dönüşü olmayan bir yargı alanı taahhüdüdür. Bir Türk kurucu için kuruluş öncesi dönem, belirli yapısal kısıtlamaların yasal veya mali sonuçlara maruz kalmadan tespit edilip ele alınabileceği tek aşamadır. Articles of Organization bir eyalet dosyalama ofisi tarafından kabul edildiğinde tüzel kişilik var olur — ve beraberinde, kurucunun EIN alıp almadığına, banka hesabı açıp açmadığına veya ticari faaliyete başlayıp başlamadığına bakılmaksızın federal ve eyalet yükümlülüklerinin tüm mekanizması yürürlüğe girer.
                    </p>
                    <p>
                      <strong>Göçmenlik statüsü etkileşimi.</strong> LLC kuruluşu ile ABD göçmenlik statüsü arasındaki ilişki yaygın olarak yanlış anlaşılmaktadır. ABD LLC kurmak herhangi bir göçmenlik avantajı sağlamaz, ima etmez veya ilerletmez. Bir Türk vatandaşı, vize durumundan bağımsız olarak — ABD dışından dahil — yasal olarak bir ABD LLC&apos;ye sahip olabilir, ancak sahiplik bireye uygun çalışma izni olmadan ABD sınırları içinde çalışma yetkisi vermez. B-1/B-2 turist vizesi taşıyan veya hiçbir ABD vizesi bulunmayan bir kurucu, ABD LLC&apos;sine sahip olabilir ve dağıtımlar alabilir, ancak ABD&apos;de fiziksel olarak bulunurken uygun çalışma izni olmaksızın günlük operasyonel yönetime katılamaz. Pasif sahiplik ile aktif yönetim arasındaki ayrım salt teorik değildir: göçmenlik statüsü ihlalleri vize iptali, yeniden giriş yasakları ve işletmenin çok ötesine uzanan tali sonuçlara yol açabilir. Bu sınır, kuruluş sonrasında değil, kuruluştan önce anlaşılmalıdır.
                    </p>
                    <p>
                      <strong>ITIN/EIN yol değerlendirmesi.</strong> Employer Identification Number (EIN), tüzel kişiliğin federal vergi kimliğidir ve sonraki hemen hemen her uyum ve bankacılık adımı için gereklidir. ABD vatandaşı veya yerleşik yabancı için EIN edinimi IRS çevrimiçi portalı üzerinden anlıktır. Sosyal Güvenlik Numarası bulunmayan bir Türk kurucu için yol önemli ölçüde ayrılır: SS-4 başvurusu faks veya posta ile gönderilmelidir, işlem süreleri birkaç haftaya uzar ve IRS düzenlemeden önce ek belgeler talep edebilir. Ayrıca, kurucunun kişisel vergi kimliği — Individual Taxpayer Identification Number (ITIN) — anlaşma avantajı talepleri, belirli stopaj seçimleri ve bazı bankacılık ilişkileri için gerekli olabilir. Ancak ITIN düzenlenmesi federal vergi beyannamesi verilmesini veya belirli bir istisnanın karşılanmasını gerektirir ve kuruluş öncesinde haritalanması gereken bir sıralama bağımlılığı yaratır. Her iki kimliğin kuruluş sonrasında eş zamanlı olarak veya talep üzerine edinilebileceğini varsayan kurucular, bankacılık başarısızlıklarına ve kaçırılan uyum son tarihlerine zincirleme şekilde yayılan haftalarca süren gecikmelerle sıkça karşılaşmaktadır.
                    </p>
                    <p>
                      <strong>Bankacılık fizibilite analizi.</strong> Yabancı sermayeli bir LLC için ABD ticari bankacılık erişimi varsayılamaz. Geleneksel bankalar, ABD&apos;de fiziksel mevcudiyet gerektiren yüz yüze kimlik doğrulama şartları uygular. Fintech alternatifleri (Mercury, Relay ve benzeri platformlar) periyodik olarak yabancı kuruculardan uzaktan başvurular kabul etmiştir ancak onboarding politikalarını önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar. Uyumluluk kaynaklı hesap kapatmaları — bir bankanın güncellenmiş risk değerlendirmeleri nedeniyle onboarding sonrasında ilişkiyi sonlandırması — alternatif bankacılık altyapısı bulunmayan tüzel kişilikler için önemli bir operasyonel risk temsil eder. İşlevsel bir banka hesabı güvence altına alma fizibilitesi kuruluş sonrasında değil, kuruluştan önce değerlendirilmelidir; çünkü yasal olarak var olan ancak fon alıp dağıtamayan bir LLC, raporlama yükümlülükleri biriktirmeye devam ederken operasyonel olarak atıldır.
                    </p>
                    <p>
                      <strong>Sınır ötesi raporlama maruziyeti.</strong> Türk vergi hukuku, yabancı varlıklara sahip olan veya yabancı tüzel kişilikleri kontrol eden Türkiye mukimlerine bağımsız raporlama yükümlülükleri yüklemektedir. Bir Türkiye vergi mukimi tarafından ABD LLC kurulması, ABD tüzel kişiliğinin gelir üretip üretmediğine bakılmaksızın Türk düzenlemeleri kapsamında açıklama gereksinimlerini tetikleyebilir. Bu paralel yükümlülükler, kurucunun ABD uyum ortamına tek taraflı değil, ikili raporlama manzarasının tam bir resmiyle girmesi için kuruluş öncesi aşamada tespit edilmelidir.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 3: FORMATION EVENT
                ================================================================ */}
            <section id="formation-event" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. Formation Event' : '3. Kuruluş Olayı'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>
                      The formation event is the discrete legal act that brings the LLC into existence under state law. It is not a gradual process or an administrative convenience — it is a jurisdictional trigger with immediate and compounding consequences. The moment a state filing office accepts the Articles of Organization (or Certificate of Formation, depending on the jurisdiction&apos;s terminology), the entity acquires legal personhood. From that point forward, federal reporting obligations begin accruing, state compliance clocks start running, and the founder is responsible for the entity&apos;s regulatory posture regardless of whether any commercial activity has occurred.
                    </p>
                    <p>
                      <strong>Articles of Organization as legal birth.</strong> The Articles of Organization is the constitutive document filed with the Secretary of State (or equivalent office) of the chosen formation jurisdiction. In most states, this filing requires minimal information: the entity name, the name and address of the registered agent, the principal office address, and the organizer&apos;s identity. Some states require a statement of purpose or the designation of a manager-managed versus member-managed structure. The filing fee, processing time, and acceptance procedure vary by state — Wyoming and Delaware typically process within one to two business days for standard filings, while other states may require longer periods. The date of acceptance, not the date of mailing or the date of payment, establishes the entity&apos;s legal existence and sets the baseline for all subsequent compliance deadlines. For a Turkish founder, precision on this date is essential because it controls the start of the first tax year and the first Form 5472 filing obligation.
                    </p>
                    <p>
                      <strong>Registered agent necessity.</strong> Every US state requires an LLC to maintain a registered agent — a person or entity authorized to receive service of process and official government correspondence on the LLC&apos;s behalf. The registered agent must have a physical street address (not a post office box) in the state of formation and must be available during normal business hours. For a Turkish founder who does not reside in the United States, this requirement effectively mandates engagement of a commercial registered agent service. The registered agent is not a legal representative and does not act for the entity in any substantive capacity; the role is purely that of a designated point of contact for official service. Failure to maintain a registered agent can result in administrative dissolution of the LLC, loss of good standing, and the inability to defend litigation because service of process cannot be completed.
                    </p>
                    <p>
                      <strong>Operating Agreement timing.</strong> The Operating Agreement is the internal governance document that defines the rights, obligations, and economic arrangements among the LLC&apos;s members (or, in the single-member context, between the sole member and the entity). Unlike the Articles of Organization, the Operating Agreement is not filed with the state — it is a private document. However, its absence creates significant legal and practical vulnerabilities. Without an Operating Agreement, the LLC&apos;s governance defaults to the state&apos;s LLC statute, which may impose provisions that do not reflect the founder&apos;s intent. More consequentially for a foreign founder, banks, payment processors, and institutional counterparties routinely require a copy of the Operating Agreement during onboarding. An LLC that presents itself without this document signals organizational immaturity and may face account opening delays or denials. The Operating Agreement should be executed contemporaneously with or immediately following the acceptance of the Articles of Organization — not deferred to a later date as a task of secondary importance.
                    </p>
                    <p>
                      <strong>Formation as a reporting trigger.</strong> The formation event is the point at which the LLC transitions from a conceptual plan to a legal entity with federal obligations. For a foreign-owned single-member LLC classified as a disregarded entity, the acceptance of the Articles of Organization initiates the reporting clock under 26 C.F.R. § 1.6038A-1: the entity is now required to file Form 5472 with a pro forma Form 1120 for every tax year in which it exists, regardless of whether reportable transactions have occurred. The Beneficial Ownership Information report under the Corporate Transparency Act must be filed within prescribed timeframes from the formation date. These obligations arise from the act of formation itself — not from the first commercial transaction, not from the receipt of revenue, and not from the opening of a bank account. Understanding formation as a trigger, rather than as a mere administrative step, is essential to avoiding the penalty exposure that results from treating post-formation compliance as optional or deferrable.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Kuruluş olayı, LLC&apos;yi eyalet hukuku kapsamında varlığa getiren ayrık hukuki eylemdir. Kademeli bir süreç veya idari bir kolaylık değildir — anlık ve bileşik sonuçları olan bir yargı alanı tetikleyicisidir. Eyalet dosyalama ofisi Articles of Organization&apos;ı (veya yargı alanının terminolojisine bağlı olarak Certificate of Formation) kabul ettiği anda tüzel kişilik yasal kişilik kazanır. Bu noktadan itibaren federal raporlama yükümlülükleri işlemeye başlar, eyalet uyum süreleri çalışmaya başlar ve kurucu, herhangi bir ticari faaliyet gerçekleşip gerçekleşmediğine bakılmaksızın tüzel kişiliğin düzenleyici duruşundan sorumlu olur.
                    </p>
                    <p>
                      <strong>Yasal doğum belgesi olarak Articles of Organization.</strong> Articles of Organization, seçilen kuruluş yargı alanının Sekreterliği&apos;ne (veya muadil ofise) dosyalanan kurucu belgedir. Çoğu eyalette bu dosyalama minimum bilgi gerektirir: tüzel kişilik adı, registered agent&apos;ın adı ve adresi, ana ofis adresi ve organizatörün kimliği. Bazı eyaletler amaç beyanı veya yönetici yönetimli ile üye yönetimli yapı belirlenmesini gerektirir. Dosyalama ücreti, işlem süresi ve kabul prosedürü eyalete göre değişir — Wyoming ve Delaware standart dosyalamalar için genellikle bir ila iki iş günü içinde işlem yapar, diğer eyaletler daha uzun süreler gerektirebilir. Kabul tarihi — posta tarihi veya ödeme tarihi değil — tüzel kişiliğin yasal varlığını oluşturur ve sonraki tüm uyum son tarihleri için temel çizgiyi belirler. Türk kurucu için bu tarihteki hassasiyet önemlidir çünkü ilk vergi yılının ve ilk Form 5472 dosyalama yükümlülüğünün başlangıcını kontrol eder.
                    </p>
                    <p>
                      <strong>Registered agent gerekliliği.</strong> Her ABD eyaleti, LLC&apos;nin bir registered agent — LLC adına dava tebligatı ve resmi devlet yazışmalarını almaya yetkili bir kişi veya tüzel kişilik — bulundurmasını zorunlu kılar. Registered agent, kuruluş eyaletinde fiziksel bir sokak adresine (posta kutusu değil) sahip olmalı ve normal mesai saatlerinde ulaşılabilir olmalıdır. ABD&apos;de ikamet etmeyen bir Türk kurucu için bu gereklilik, fiilen ticari bir registered agent hizmetinin kullanılmasını zorunlu kılmaktadır. Registered agent yasal bir temsilci değildir ve tüzel kişilik adına herhangi bir esaslı kapasitede hareket etmez; rolü tamamen resmi tebligat için belirlenmiş bir iletişim noktası olmaktır. Registered agent bulundurulmaması LLC&apos;nin idari feshiyle, iyi duruş kaybıyla ve dava tebligatının tamamlanamaması nedeniyle dava savunma yapılamamasıyla sonuçlanabilir.
                    </p>
                    <p>
                      <strong>Operating Agreement zamanlaması.</strong> Operating Agreement, LLC üyeleri arasındaki (veya tek üyeli bağlamda tek üye ile tüzel kişilik arasındaki) hakları, yükümlülükleri ve ekonomik düzenlemeleri tanımlayan iç yönetim belgesidir. Articles of Organization&apos;dan farklı olarak Operating Agreement eyalete dosyalanmaz — özel bir belgedir. Ancak yokluğu önemli hukuki ve pratik açıklıklar yaratır. Operating Agreement olmaksızın LLC&apos;nin yönetimi eyaletin LLC yasasına varsayılan olarak bağlanır ve bu, kurucunun niyetini yansıtmayan hükümler dayatabilir. Yabancı kurucu için daha belirleyici olarak, bankalar, ödeme işlemcileri ve kurumsal karşı taraflar onboarding sırasında rutin olarak Operating Agreement kopyası talep eder. Bu belge olmadan kendini sunan bir LLC, organizasyonel olgunluk eksikliği sinyali verir ve hesap açma gecikmeleri veya retleriyle karşılaşabilir. Operating Agreement, Articles of Organization&apos;ın kabulüyle eş zamanlı olarak veya hemen ardından imzalanmalıdır — ikincil önemde bir görev olarak ileri bir tarihe ertelenmemelidir.
                    </p>
                    <p>
                      <strong>Raporlama tetikleyicisi olarak kuruluş.</strong> Kuruluş olayı, LLC&apos;nin kavramsal bir plandan federal yükümlülükleri olan bir tüzel kişiliğe geçiş yaptığı noktadır. Disregarded entity olarak sınıflandırılan yabancı sermayeli tek üyeli bir LLC için Articles of Organization&apos;ın kabulü, 26 C.F.R. § 1.6038A-1 kapsamındaki raporlama saatini başlatır: tüzel kişilik artık var olduğu her vergi yılı için, raporlanabilir işlemlerin gerçekleşip gerçekleşmediğine bakılmaksızın pro forma Form 1120&apos;ye ekli Form 5472 dosyalamakla yükümlüdür. Corporate Transparency Act kapsamındaki Beneficial Ownership Information raporu, kuruluş tarihinden itibaren belirlenmiş süreler içinde dosyalanmalıdır. Bu yükümlülükler kuruluş eyleminin kendisinden doğar — ilk ticari işlemden değil, gelir elde edilmesinden değil ve banka hesabı açılmasından değil. Kuruluşu salt bir idari adım olarak değil, bir tetikleyici olarak anlamak, kuruluş sonrası uyumu isteğe bağlı veya ertelenebilir olarak ele almanın yarattığı ceza maruziyetinden kaçınmak için esastır.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 4: EIN ACQUISITION STRATEGY
                ================================================================ */}
            <section id="ein-acquisition-strategy" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '4. EIN Acquisition Strategy' : '4. EIN Edinme Stratejisi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    Maps the Employer Identification Number acquisition pathway for non-resident founders. Covers the SS-4 application process, the foreign applicant fax procedure (absent an SSN/ITIN), expected processing timelines, and common rejection triggers that delay downstream banking and compliance steps.
                  </p>
                ) : (
                  <p>
                    Yerleşik olmayan kurucular için Employer Identification Number (EIN) edinme yolunu haritalandırır. SS-4 başvuru sürecini, yabancı başvuru sahibi faks prosedürünü (SSN/ITIN olmadan), beklenen işlem sürelerini ve bankacılık ile uyum adımlarını geciktiren yaygın ret nedenlerini kapsar.
                  </p>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 5: BANKING INFRASTRUCTURE LAYER
                ================================================================ */}
            <section id="banking-infrastructure-layer" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '5. Banking Infrastructure Layer' : '5. Bankacılık Altyapı Katmanı'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    Addresses US business bank account opening for foreign-owned LLCs — including remote-open options, in-person requirements, KYC/AML documentation standards, and the Mercury/Relay/traditional bank decision matrix. Identifies the dependency chain between EIN issuance and account activation.
                  </p>
                ) : (
                  <p>
                    Yabancı sermayeli LLC&apos;ler için ABD ticari banka hesabı açılışını ele alır — uzaktan açma seçenekleri, yüz yüze gereksinimler, KYC/AML belgelendirme standartları ve Mercury/Relay/geleneksel banka karar matrisi dahil. EIN düzenlenmesi ile hesap aktivasyonu arasındaki bağımlılık zincirini tanımlar.
                  </p>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 6: FEDERAL REPORTING TRIGGER MAP
                ================================================================ */}
            <section id="federal-reporting-trigger-map" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Federal Reporting Trigger Map' : '6. Federal Raporlama Tetik Haritası'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    Catalogs every federal reporting obligation triggered by LLC formation and operation by a foreign person. Covers Form 5472 + pro forma 1120, FBAR (FinCEN 114), FATCA implications, and BOI reporting under the Corporate Transparency Act. Each trigger is mapped to its statutory basis and filing deadline.
                  </p>
                ) : (
                  <p>
                    Yabancı bir kişi tarafından LLC kurulması ve işletilmesiyle tetiklenen her federal raporlama yükümlülüğünü kataloglar. Form 5472 + pro forma 1120, FBAR (FinCEN 114), FATCA etkileri ve Corporate Transparency Act kapsamında BOI raporlamasını kapsar. Her tetikleyici, yasal dayanağı ve dosyalama son tarihiyle eşleştirilir.
                  </p>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 7: PLATFORM & PAYMENT INTEGRATION
                ================================================================ */}
            <section id="platform-payment-integration" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. Platform & Payment Integration' : '7. Platform ve Ödeme Entegrasyonu'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    Covers the integration of the LLC with payment processors (Stripe, PayPal), marketplace platforms, and SaaS billing infrastructure. Addresses W-8BEN-E submission, 1099 reporting thresholds, and the tax information interview workflows required by major platforms for foreign-owned entities.
                  </p>
                ) : (
                  <p>
                    LLC&apos;nin ödeme işlemcileri (Stripe, PayPal), pazar yeri platformları ve SaaS faturalama altyapısıyla entegrasyonunu kapsar. W-8BEN-E sunumu, 1099 raporlama eşikleri ve büyük platformların yabancı sermayeli tüzel kişilikler için gerektirdiği vergi bilgi görüşmesi iş akışlarını ele alır.
                  </p>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 8: ONGOING COMPLIANCE CALENDAR
                ================================================================ */}
            <section id="ongoing-compliance-calendar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '8. Ongoing Compliance Calendar' : '8. Sürekli Uyum Takvimi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    Provides the annual and periodic compliance calendar for a foreign-owned US LLC. Includes federal filing deadlines (Form 5472, BOI updates), state annual report and franchise tax dates, registered agent renewal windows, and Turkish-side reporting obligations that run in parallel.
                  </p>
                ) : (
                  <p>
                    Yabancı sermayeli bir ABD LLC için yıllık ve periyodik uyum takvimini sunar. Federal dosyalama son tarihlerini (Form 5472, BOI güncellemeleri), eyalet yıllık rapor ve franchise vergi tarihlerini, registered agent yenileme pencerelerini ve paralel yürüyen Türkiye tarafı raporlama yükümlülüklerini içerir.
                  </p>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 9: PROCEDURAL ERROR MATRIX
                ================================================================ */}
            <section id="procedural-error-matrix" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '9. Procedural Error Matrix' : '9. Prosedürel Hata Matrisi'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    Identifies the most common procedural errors made by Turkish founders during and after LLC formation. Each error is mapped to its downstream consequence (penalty exposure, banking delays, compliance gaps) and the corrective action required. Designed as a diagnostic reference for practitioners.
                  </p>
                ) : (
                  <p>
                    Türk kurucuların LLC kuruluşu sırasında ve sonrasında yaptığı en yaygın prosedürel hataları tanımlar. Her hata, sonraki aşamadaki sonucuna (ceza maruziyeti, bankacılık gecikmeleri, uyum boşlukları) ve gerekli düzeltici eyleme eşleştirilir. Uygulayıcılar için tanısal bir referans olarak tasarlanmıştır.
                  </p>
                )}
              </div>
            </section>

            {/* ================================================================
                SECTION 10: STRATEGIC SEQUENCING BLUEPRINT (EXECUTIVE SUMMARY)
                ================================================================ */}
            <section id="strategic-sequencing-blueprint" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '10. Strategic Sequencing Blueprint (Executive Summary)' : '10. Stratejik Sıralama Planı (Yönetici Özeti)'}
              </h2>
              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <p>
                    Synthesizes the preceding nine sections into an optimal execution sequence. Presents the recommended order of operations from pre-formation analysis through first-year compliance, highlighting critical-path dependencies where misordering creates compounding delays or penalty exposure.
                  </p>
                ) : (
                  <p>
                    Önceki dokuz bölümü optimal bir yürütme dizisinde sentezler. Kuruluş öncesi analizden ilk yıl uyumuna kadar önerilen işlem sırasını sunar; yanlış sıralamanın bileşik gecikmelere veya ceza maruziyetine yol açtığı kritik yol bağımlılıklarını vurgular.
                  </p>
                )}
              </div>
            </section>

            {/* Primary Sources */}
            <PrimarySources sources={primarySources} lang={lang} />

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
          </article>
        </main>
      </div>
    </>
  )
}
