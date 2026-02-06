import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateDigitalDocumentSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'service-agreement',
  datePublished: '2025-07-01',
  dateModified: '2026-01-20',
  version: '1.0',
  citationKey: 'ecl-ctr-00002',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/contracts/${PAGE_META.slug}`

  return {
    title: isEnglish
      ? 'Free Service Agreement Template (English & Turkish) | EchoLegal'
      : 'Ücretsiz Hizmet Sözleşmesi Şablonu (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Free bilingual service agreement template. I support EchoLegal ($49 recommended) or download free. Define scope, payment, and deliverables.'
      : 'Ücretsiz iki dilli hizmet sözleşmesi şablonu. Gücünüz kadar ödeyin (49$ önerilir) veya ücretsiz indirin.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/contracts/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/contracts/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/07/01',
      'citation_lastmod': '2026/01/20',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export default async function ServiceAgreementPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03'
  const documentUrl = isEnglish
    ? '/documents/Service-Agreement-EN.docx'
    : '/documents/Service-Agreement-TR.docx'

  // Cross-sell related contracts
  const relatedContracts = [
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
    },
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
    },
  ]

  const pageUrl = `${SITE_URL}/${lang}/contracts/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'

  const documentSchema = generateDigitalDocumentSchema({
    title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
    description: isEnglish
      ? 'A Service Agreement is a legally binding contract between a service provider and a client that outlines the scope of services, compensation, timelines, deliverables, intellectual property rights, and termination conditions. It protects both parties by establishing clear expectations and legal recourse.'
      : 'Hizmet Sözleşmesi, hizmet sağlayıcı ile müşteri arasında hizmet kapsamını, ücretlendirmeyi, zaman çizelgelerini, teslimatları, fikri mülkiyet haklarını ve fesih koşullarını belirleyen yasal olarak bağlayıcı bir sözleşmedir. Net beklentiler ve yasal başvuru yolları oluşturarak her iki tarafı da korur.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['service-agreement', 'contract-template', 'professional-services'],
    encodingFormats: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    citationKey: PAGE_META.citationKey,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Contracts' : 'Sözleşmeler', url: `${SITE_URL}/${lang}/contracts` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <div className="bg-white">
      <JsonLdScript data={[documentSchema, breadcrumbSchema]} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <Link href={`/${lang}/contracts`} className="hover:text-black">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}
        </h1>

        <InstitutionalBadge
          lang={lang}
          jurisdictions={['US']}
          lastReviewedAt={PAGE_META.dateModified}
          className="mb-8"
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is This Agreement?' : 'Bu Sözleşme Nedir?'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'A Service Agreement is a legally binding contract between a service provider and a client that outlines the scope of services, compensation, timelines, deliverables, intellectual property rights, and termination conditions. It protects both parties by establishing clear expectations and legal recourse.'
              : 'Hizmet Sözleşmesi, hizmet sağlayıcı ile müşteri arasında hizmet kapsamını, ücretlendirmeyi, zaman çizelgelerini, teslimatları, fikri mülkiyet haklarını ve fesih koşullarını belirleyen yasal olarak bağlayıcı bir sözleşmedir. Net beklentiler ve yasal başvuru yolları oluşturarak her iki tarafı da korur.'}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Providing professional services to clients',
              'Hiring consultants or agencies',
              'Establishing ongoing service relationships',
              'Defining project scope and deliverables',
              'Setting payment terms and schedules',
              'Protecting intellectual property created during engagement'
            ] : [
              'Müşterilere profesyonel hizmet sağlarken',
              'Danışman veya ajans işe alırken',
              'Devam eden hizmet ilişkileri kurarken',
              'Proje kapsamı ve teslimatları tanımlarken',
              'Ödeme koşulları ve takvimlerini belirlerken',
              'Çalışma sırasında oluşturulan fikri mülkiyeti korurken'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{isEnglish ? 'Who Uses This?' : 'Kimler Kullanır?'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Small business owners hiring service providers',
              'Agencies contracting with clients',
              'Consultants formalizing engagements',
              'SaaS companies with enterprise clients',
              'Marketing agencies with corporate clients'
            ] : [
              'Hizmet sağlayıcı kiralayan küçük işletme sahipleri',
              'Müşterileriyle sözleşme yapan ajanslar',
              'Çalışmalarını resmileştiren danışmanlar',
              'Kurumsal müşterilere sahip SaaS şirketleri',
              'Kurumsal müşterilere sahip pazarlama ajansları'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            {isEnglish
              ? <>Browse all contract templates on our <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] hover:underline">Contracts for Doing Business in the US</Link> guide.</>
              : <>Tüm sözleşme şablonlarını <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] hover:underline">ABD&apos;de İş Yapanlar İçin Sözleşmeler</Link> rehberimizde inceleyin.</>}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{isEnglish ? 'What Happens If Misused or Missing?' : 'Yanlış veya Eksik Kullanılırsa Ne Olur?'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Without agreement: scope disputes, payment conflicts, unclear deliverable ownership',
              'Missing payment terms: cash flow disputes, collection difficulties',
              'No termination clause: parties trapped in unfavorable arrangements',
              'Vague scope: scope creep without compensation'
            ] : [
              'Sözleşme olmadan: kapsam anlaşmazlıkları, ödeme çatışmaları, belirsiz teslimat sahipliği',
              'Ödeme koşulları eksikse: nakit akışı anlaşmazlıkları, tahsilat güçlükleri',
              'Fesih maddesi yoksa: taraflar olumsuz düzenlemelerde sıkışır',
              'Belirsiz kapsam: tazminatsız iş kapsamı genişlemesi'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-red-500 mr-3">✗</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-3">⚖️ {isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'This template is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before use.'
              : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Kullanmadan önce lisanslı bir avukata danışın.'}
          </p>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">{isEnglish ? 'Download This Template' : 'Bu Şablonu İndirin'}</h2>
          <p className="text-center text-gray-600 mb-6">{isEnglish ? 'I support EchoLegal – $49 recommended.' : 'EchoLegal\'i destekliyorum – $49 önerilir.'}</p>

          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-3">
            💳 {isEnglish ? 'I CAN Afford It — $49 (Recommended)' : 'Ödeyebilirim — $49 (Önerilen)'}
          </a>

          <a href={documentUrl} download className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 mb-4">
            📄 {isEnglish ? 'I CANNOT Afford It — Download Free' : 'Ödeyemiyorum — Ücretsiz İndir'}
          </a>

          {/* Microcopy */}
          <p className="text-center text-sm text-gray-500">
            {isEnglish
              ? 'Most users choose $49 to support ongoing updates and bilingual access.'
              : 'Çoğu kullanıcı, sürekli güncellemeleri ve iki dilli erişimi desteklemek için 49$ seçiyor.'}
          </p>
        </div>

        <CiteThisEntry
          lang={lang}
          title={pageTitle}
          url={pageUrl}
          dateModified={PAGE_META.dateModified}
          version={PAGE_META.version}
          citationKey={PAGE_META.citationKey}
          contentType="contract-template"
          className="mb-12"
        />

        {/* Cross-sell: People also download */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'People Also Download' : 'Bunlar da İndiriliyor'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedContracts.map((contract) => (
              <Link
                key={contract.slug}
                href={`/${lang}/contracts/${contract.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">{contract.title}</span>
                <span className="text-[#C9A227]">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
