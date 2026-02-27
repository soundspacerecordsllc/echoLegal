import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateDigitalDocumentSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'terms-of-service',
  datePublished: '2025-08-15',
  dateModified: '2026-01-20',
  version: '1.0',
  citationKey: 'ecl-ctr-00007',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/contracts/${PAGE_META.slug}`

  return {
    title: isEnglish
      ? 'Free Terms of Service Template (English & Turkish) | EchoLegal'
      : 'Ücretsiz Kullanım Koşulları Şablonu (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Free bilingual Terms of Service template. I support EchoLegal ($49 recommended) or download free. Protect your website or app.'
      : 'Ücretsiz iki dilli Kullanım Koşulları şablonu. Gücünüz kadar ödeyin (49$ önerilir) veya ücretsiz indirin.',
    other: {
      'citation_title': isEnglish ? 'Terms of Service Template' : 'Kullanım Koşulları Şablonu',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/08/15',
      'citation_lastmod': '2026/01/20',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/dRm3cv9163Xp7wCdCnd7q02'
  const documentUrl = isEnglish
    ? '/documents/TermsOfService-EN.docx'
    : '/documents/KullanimKosullari-TR.docx'

  // Cross-sell related contracts
  const relatedContracts = [
    {
      slug: 'privacy-policy',
      title: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
    },
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
    },
  ]

  const pageUrl = `${SITE_URL}/${lang}/contracts/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Terms of Service Template' : 'Kullanım Koşulları Şablonu'

  const documentSchema = generateDigitalDocumentSchema({
    title: isEnglish ? 'Terms of Service Template' : 'Kullanım Koşulları Şablonu',
    description: isEnglish
      ? 'Terms of Service (also called Terms and Conditions or Terms of Use) is a legal agreement between you and your users that establishes the rules for using your website, app, or service. It protects your business by limiting liability, establishing user conduct rules, and defining intellectual property rights.'
      : 'Kullanım Koşulları (Hizmet Şartları veya Kullanım Şartları olarak da bilinir), web sitenizi, uygulamanızı veya hizmetinizi kullanma kurallarını belirleyen sizinle kullanıcılarınız arasındaki yasal bir anlaşmadır. Sorumluluğu sınırlayarak, kullanıcı davranış kuralları oluşturarak ve fikri mülkiyet haklarını tanımlayarak işletmenizi korur.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['terms-of-service', 'terms-and-conditions', 'website-legal', 'contract-template'],
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
          <span className="text-black font-medium">{isEnglish ? 'Terms of Service' : 'Kullanım Koşulları'}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Terms of Service Template' : 'Kullanım Koşulları Şablonu'}
        </h1>

        <InstitutionalBadge
          lang={lang}
          jurisdictions={['US']}
          lastReviewedAt={PAGE_META.dateModified}
          className="mb-8"
        />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is This Document?' : 'Bu Belge Nedir?'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'Terms of Service (also called Terms and Conditions or Terms of Use) is a legal agreement between you and your users that establishes the rules for using your website, app, or service. It protects your business by limiting liability, establishing user conduct rules, and defining intellectual property rights.'
              : 'Kullanım Koşulları (Hizmet Şartları veya Kullanım Şartları olarak da bilinir), web sitenizi, uygulamanızı veya hizmetinizi kullanma kurallarını belirleyen sizinle kullanıcılarınız arasındaki yasal bir anlaşmadır. Sorumluluğu sınırlayarak, kullanıcı davranış kuralları oluşturarak ve fikri mülkiyet haklarını tanımlayarak işletmenizi korur.'}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When You Need This' : 'Ne Zaman Gerekli'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Any website or web application',
              'SaaS products and online services',
              'E-commerce stores',
              'Mobile applications',
              'Online communities or forums',
              'Subscription-based services'
            ] : [
              'Herhangi bir web sitesi veya web uygulaması',
              'SaaS ürünleri ve online hizmetler',
              'E-ticaret mağazaları',
              'Mobil uygulamalar',
              'Online topluluklar veya forumlar',
              'Abonelik tabanlı hizmetler'
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
              'Website operators',
              'SaaS companies',
              'Marketplace platforms',
              'Mobile app publishers',
              'Any digital service provider'
            ] : [
              'Web sitesi işletmecileri',
              'SaaS şirketleri',
              'Pazar yeri platformları',
              'Mobil uygulama yayıncıları',
              'Tüm dijital hizmet sağlayıcıları'
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
              'Without ToS: no limitation of liability for platform issues',
              'Missing dispute resolution: expensive litigation',
              'No content moderation terms: liability for user-generated content',
              'Missing IP protection: users may claim rights to platform features',
              'No account termination clause: difficulty removing abusive users'
            ] : [
              'Kullanım Koşulları olmadan: platform sorunları için sorumluluk sınırlaması yok',
              'Uyuşmazlık çözüm mekanizması eksikse: maliyetli davalar',
              'İçerik moderasyon şartları yoksa: kullanıcı tarafından oluşturulan içerikten doğan sorumluluk',
              'Fikri mülkiyet koruması eksikse: kullanıcılar platform özellikleri üzerinde hak iddia edebilir',
              'Hesap fesih maddesi yoksa: kötüye kullanan kullanıcıların kaldırılmasında zorluk'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-red-500 mr-3">✗</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-3">{isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'This template is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before use.'
              : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Kullanmadan önce lisanslı bir avukata danışın.'}
          </p>
        </div>

        {/* Download Section - Updated */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">{isEnglish ? 'Download This Template' : 'Bu Şablonu İndirin'}</h2>
          <p className="text-center text-gray-600 mb-6">{isEnglish ? 'I support EchoLegal – $49 recommended.' : 'EchoLegal\'i destekliyorum – $49 önerilir.'}</p>

          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-3">
            {isEnglish ? 'I CAN Afford It — $49 (Recommended)' : 'Ödeyebilirim — $49 (Önerilen)'}
          </a>

          <a href={documentUrl} download className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 mb-4">
            {isEnglish ? 'I CANNOT Afford It — Download Free' : 'Ödeyemiyorum — Ücretsiz İndir'}
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
