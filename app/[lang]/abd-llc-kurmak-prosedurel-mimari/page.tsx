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
                  <p>
                    Determines the entity type selection (LLC vs. Corporation) and the federal tax classification (disregarded entity, partnership, or C-Corp election) based on the founder&apos;s residency status, business model, and treaty position. This layer must be resolved before any state filing occurs.
                  </p>
                ) : (
                  <p>
                    Kurucunun ikamet durumu, iş modeli ve vergi anlaşması pozisyonuna göre tüzel kişilik türü seçimini (LLC vs. Corporation) ve federal vergi sınıflandırmasını (disregarded entity, ortaklık veya C-Corp seçimi) belirler. Bu katman, herhangi bir eyalet başvurusu yapılmadan önce çözülmelidir.
                  </p>
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
                  <p>
                    Evaluates jurisdictional risk factors before committing to a formation state. Covers nexus exposure, state tax obligations, registered agent requirements, and Turkish cross-border reporting implications that must be mapped prior to filing Articles of Organization.
                  </p>
                ) : (
                  <p>
                    Kuruluş eyaletine karar vermeden önce yargı alanı risk faktörlerini değerlendirir. Nexus maruziyeti, eyalet vergi yükümlülükleri, registered agent gereksinimleri ve Articles of Organization dosyalanmadan önce haritalanması gereken Türkiye sınır ötesi raporlama etkilerini kapsar.
                  </p>
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
                  <p>
                    Documents the mechanical steps of LLC formation: Articles of Organization filing, Operating Agreement execution, registered agent designation, and the state-specific timeline from submission to certificate issuance. Identifies the exact moment the entity acquires legal existence.
                  </p>
                ) : (
                  <p>
                    LLC kuruluşunun mekanik adımlarını belgeler: Articles of Organization dosyalama, Operating Agreement imzalama, registered agent atama ve başvurudan sertifika düzenlenmesine kadar eyalete özgü zaman çizelgesi. Tüzel kişiliğin yasal varlık kazandığı kesin anı tanımlar.
                  </p>
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
