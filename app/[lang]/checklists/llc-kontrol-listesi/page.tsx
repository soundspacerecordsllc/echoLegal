// app/[lang]/checklists/llc-kontrol-listesi/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'llc-kontrol-listesi',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-chk-00002',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/checklists/${PAGE_META.slug}`

  return {
    title: isEnglish
      ? 'Before Forming a US LLC: Checklist | EchoLegal'
      : 'ABD\'de LLC Kurmadan Önce: Kontrol Listesi | EchoLegal',
    description: isEnglish
      ? 'Key questions to consider before starting the LLC formation process. A reference checklist for international entrepreneurs.'
      : 'LLC kurulum sürecini başlatmadan önce düşünülmesi gereken temel sorular. Uluslararası girişimciler için referans kontrol listesi.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/checklists/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/checklists/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'LLC Control List' : 'LLC Kontrol Listesi',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
      'citation_lastmod': '2026/01/25',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
      'citation_keywords': 'llc, kontrol-listesi, kuruluş',
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCChecklistPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/checklists/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'LLC Control List' : 'LLC Kontrol Listesi'

  const articleJsonLd = generateArticleSchema({
    title: isEnglish ? 'Before Forming a US LLC' : "ABD'de LLC Kurmadan Önce",
    description: isEnglish
      ? 'Key questions to consider before starting the LLC formation process'
      : 'LLC kurulum sürecini başlatmadan önce düşünülmesi gereken temel sorular',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['llc', 'kontrol-listesi', 'kuruluş', 'pre-formation'],
  })

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Checklists' : 'Kontrol Listeleri', url: `${SITE_URL}/${lang}/checklists` },
    { name: isEnglish ? 'LLC Checklist' : 'LLC Kontrol Listesi', url: `${SITE_URL}/${lang}/checklists/llc-kontrol-listesi` },
  ])

  const checklistItems = [
    {
      question: isEnglish
        ? 'Do I actually need a US LLC for what I\'m doing?'
        : 'Yaptığım iş için gerçekten ABD LLC\'ye ihtiyacım var mı?',
      consideration: isEnglish
        ? 'You can often work with US clients without forming a US entity. Consider whether your situation specifically requires one.'
        : 'ABD müşterileriyle genellikle ABD tüzel kişiliği kurmadan çalışabilirsiniz. Durumunuzun özellikle bunu gerektirip gerektirmediğini değerlendirin.',
    },
    {
      question: isEnglish
        ? 'Do I understand the ongoing compliance requirements?'
        : 'Süregelen uyum gereksinimlerini anlıyor muyum?',
      consideration: isEnglish
        ? 'LLCs have annual reports, potential franchise taxes, registered agent requirements, and other ongoing obligations depending on the state.'
        : 'LLC\'lerin yıllık raporları, potansiyel franchise vergileri, kayıtlı temsilci gereksinimleri ve eyalete bağlı olarak diğer süregelen yükümlülükleri vardır.',
    },
    {
      question: isEnglish
        ? 'Have I researched the tax implications for my situation?'
        : 'Durumum için vergi etkilerini araştırdım mı?',
      consideration: isEnglish
        ? 'Tax obligations depend on where you live, the type of income, tax treaties, and more. This area requires professional guidance.'
        : 'Vergi yükümlülükleri nerede yaşadığınıza, gelir türüne, vergi anlaşmalarına ve daha fazlasına bağlıdır. Bu alan profesyonel rehberlik gerektirir.',
    },
    {
      question: isEnglish
        ? 'Do I know which state to form in and why?'
        : 'Hangi eyalette kuracağımı ve nedenini biliyor muyum?',
      consideration: isEnglish
        ? 'Each state has different laws, fees, and requirements. Popular choices (Delaware, Wyoming) aren\'t always the best for every situation.'
        : 'Her eyaletin farklı yasaları, ücretleri ve gereksinimleri vardır. Popüler tercihler (Delaware, Wyoming) her durum için en iyisi olmayabilir.',
    },
    {
      question: isEnglish
        ? 'Do I have a plan for a US registered agent?'
        : 'ABD kayıtlı temsilcisi için bir planım var mı?',
      consideration: isEnglish
        ? 'You need a registered agent with a physical address in your formation state. This is usually a paid service if you\'re not in the US.'
        : 'Kuruluş eyaletinizde fiziksel adresi olan bir kayıtlı temsilciye ihtiyacınız var. ABD\'de değilseniz bu genellikle ücretli bir hizmettir.',
    },
    {
      question: isEnglish
        ? 'Do I understand how I\'ll get an EIN?'
        : 'EIN\'i nasıl alacağımı anlıyor muyum?',
      consideration: isEnglish
        ? 'Non-US persons can apply for an EIN, but the process is different (no SSN). You may need to apply by fax or mail.'
        : 'ABD dışından kişiler EIN başvurusunda bulunabilir, ancak süreç farklıdır (SSN yok). Faks veya posta ile başvurmanız gerekebilir.',
    },
    {
      question: isEnglish
        ? 'Do I have a plan for US banking?'
        : 'ABD bankacılığı için bir planım var mı?',
      consideration: isEnglish
        ? 'Opening a US bank account as a non-resident can be challenging. Research your options before forming the LLC.'
        : 'Yerleşik olmayan biri olarak ABD banka hesabı açmak zor olabilir. LLC kurmadan önce seçeneklerinizi araştırın.',
    },
    {
      question: isEnglish
        ? 'Do I understand this does NOT affect my immigration status?'
        : 'Bunun göçmenlik statümü ETKİLEMEDİĞİNİ anlıyor muyum?',
      consideration: isEnglish
        ? 'Forming an LLC provides no visa or immigration benefit whatsoever. These are completely separate processes.'
        : 'LLC kurmak hiçbir vize veya göçmenlik avantajı sağlamaz. Bunlar tamamen ayrı süreçlerdir.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JsonLdScript data={[articleJsonLd, breadcrumbJsonLd]} />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/checklists`} className="hover:text-black">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'LLC Checklist' : 'LLC Kontrol Listesi'}</span>
        </nav>

        <article>
          <header className="mb-10">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Reference Checklist' : 'Referans Kontrol Listesi'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {isEnglish ? 'Before Forming a US LLC' : 'ABD\'de LLC Kurmadan Önce'}
            </h1>
            <p className="text-lg text-gray-600">
              {isEnglish
                ? 'Questions to consider before starting the LLC formation process. This is a reference tool, not advice.'
                : 'LLC kurulum sürecini başlatmadan önce düşünülmesi gereken sorular. Bu bir referans aracıdır, tavsiye değildir.'}
            </p>
          </header>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
            <p className="text-sm text-amber-900">
              <strong>{isEnglish ? 'This checklist does not provide:' : 'Bu kontrol listesi şunları sağlamaz:'}</strong>{' '}
              {isEnglish
                ? 'Legal, tax, or business advice. It organizes common considerations. Your situation may have unique factors. Consult licensed professionals.'
                : 'Hukuki, vergi veya iş tavsiyesi. Yaygın değerlendirmeleri düzenler. Durumunuzun benzersiz faktörleri olabilir. Lisanslı profesyonellere danışın.'}
            </p>
          </div>

          <InstitutionalBadge lang={lang} jurisdictions={['US']} lastReviewedAt="2026-01-20" className="mb-10" />

          {/* Checklist */}
          <div className="space-y-6 mb-12">
            {checklistItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">{item.question}</h3>
                    <p className="text-sm text-gray-600">{item.consideration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CiteThisEntry
            lang={lang}
            title={pageTitle}
            url={pageUrl}
            dateModified={PAGE_META.dateModified}
            version={PAGE_META.version}
            citationKey={PAGE_META.citationKey}
            contentType="checklist"
            className="mb-8"
          />

          {/* Related Resources */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4">
              {isEnglish ? 'Related resources on this topic' : 'Bu konuyla bağlantılı hukuki kaynaklar'}
            </h2>
            <div className="space-y-3">
              <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
              <Link href={`/${lang}/library/llc-vize-yanilgisi`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'LLC ≠ Visa: Immigration Realities' : 'LLC Kurmak Vize Vermez'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
              <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'Business Starter Legal Kit' : 'Business Starter Legal Kit'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
            </div>
          </section>
        </article>
    </div>
  )
}
