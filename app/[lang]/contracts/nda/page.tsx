import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DownloadSection from '@/components/DownloadSection'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  
  return {
    title: isEnglish 
      ? 'Non-Disclosure Agreement (NDA) Template | Free Download | EchoLegal'
      : 'Gizlilik Sözleşmesi (NDA) Şablonu | Ücretsiz İndirme | EchoLegal',
    description: isEnglish
      ? 'Professional NDA template to protect confidential business information. Available in English & Turkish. Pay what you can ($20 recommended) or download free.'
      : 'Gizli iş bilgilerinizi korumak için profesyonel NDA şablonu. İngilizce ve Türkçe. Ödeyebileceğiniz kadar ödeyebilir veya ücretsiz indirebilirsiniz.',
    openGraph: {
      title: 'Non-Disclosure Agreement (NDA) Template',
      description: 'Professional NDA template for protecting confidential information',
      url: `https://echo-legal.com/${params.lang}/contracts/nda`,
      type: 'website',
    },
  }
}

export default async function NDAPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  // Stripe payment link and document URLs
  const stripePaymentLink = 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'
  const documentUrl = isEnglish 
    ? '/documents/FreelanceServiceAgreement-Modern-EN.docx'
    : '/documents/SerbestCalisanHizmetSozlesmesi-Modern-TR.docx'

  const content = isEnglish ? {
    title: 'Non-Disclosure Agreement (NDA)',
    jurisdiction: 'United States (General)',
    intro: 'A Non-Disclosure Agreement (NDA), also known as a confidentiality agreement, is a legal contract between parties agreeing not to disclose certain confidential information. NDAs are essential tools for protecting sensitive business information, trade secrets, and proprietary data.',
    whenToUse: [
      'Starting a new business partnership or joint venture',
      'Hiring employees or contractors who will access sensitive information',
      'Sharing business plans or trade secrets with potential investors',
      'Engaging in merger and acquisition discussions',
      'Working with vendors or suppliers who need access to proprietary information',
      'Protecting confidential information during contract negotiations'
    ],
    clauses: [
      {
        title: 'Definition of Confidential Information',
        description: 'Clearly specifies what information is considered confidential. This may include trade secrets, business plans, customer lists, financial information, technical data, and any other proprietary information. The definition should be specific enough to be enforceable but broad enough to cover all necessary information.'
      },
      {
        title: 'Obligations of Receiving Party',
        description: 'Details the responsibilities of the party receiving confidential information. Typically includes requirements to keep information secret, use it only for specified purposes, and protect it with the same care used for their own confidential information.'
      },
      {
        title: 'Exclusions from Confidentiality',
        description: 'Lists information that is not considered confidential, such as publicly available information, information independently developed, or information already known before disclosure.'
      },
      {
        title: 'Term and Termination',
        description: 'Specifies how long the NDA remains in effect and the conditions for termination. Confidentiality obligations often survive termination for a specified period.'
      },
      {
        title: 'Return of Materials',
        description: 'Requires the receiving party to return or destroy all confidential materials upon request or at the end of the relationship.'
      }
    ],
    related: [
      { title: 'Service Agreement', url: '/contracts/service-agreement' },
      { title: 'Employment Contract', url: '/contracts/employment' },
      { title: 'Understanding Trade Secrets', url: '/encyclopedia/trade-secrets' }
    ]
  } : {
    title: 'Gizlilik Sözleşmesi (NDA)',
    jurisdiction: 'Genel (Türkiye Uyarlaması Gerekli)',
    intro: 'Gizlilik Sözleşmesi (NDA), gizlilik anlaşması olarak da bilinir ve taraflar arasında belirli gizli bilgileri ifşa etmeme konusunda anlaşmaya varılan yasal bir sözleşmedir. NDA\'lar, hassas iş bilgilerini, ticari sırları ve özel verileri korumak için temel araçlardır.',
    whenToUse: [
      'Yeni bir iş ortaklığı veya ortak girişim başlatırken',
      'Hassas bilgilere erişecek çalışanları veya yüklenicileri işe alırken',
      'Potansiyel yatırımcılarla iş planlarını veya ticari sırları paylaşırken',
      'Birleşme ve satın alma görüşmeleri yürütürken',
      'Özel bilgilere erişmesi gereken satıcılar veya tedarikçilerle çalışırken',
      'Sözleşme müzakereleri sırasında gizli bilgileri korurken'
    ],
    clauses: [
      {
        title: 'Gizli Bilgi Tanımı',
        description: 'Hangi bilgilerin gizli kabul edildiğini açıkça belirtir. Bu, ticari sırları, iş planlarını, müşteri listelerini, finansal bilgileri, teknik verileri ve diğer özel bilgileri içerebilir.'
      },
      {
        title: 'Alıcı Tarafın Yükümlülükleri',
        description: 'Gizli bilgileri alan tarafın sorumluluklarını detaylandırır. Genellikle bilgileri gizli tutma, yalnızca belirtilen amaçlar için kullanma ve kendi gizli bilgileri için kullanılan özenle koruma gereksinimlerini içerir.'
      },
      {
        title: 'Gizlilik Dışındaki Durumlar',
        description: 'Kamuya açık bilgiler, bağımsız olarak geliştirilen bilgiler veya ifşadan önce bilinen bilgiler gibi gizli kabul edilmeyen bilgileri listeler.'
      },
      {
        title: 'Süre ve Fesih',
        description: 'NDA\'nın ne kadar süreyle yürürlükte kalacağını ve fesih koşullarını belirtir. Gizlilik yükümlülükleri genellikle fesihten sonra belirli bir süre devam eder.'
      },
      {
        title: 'Malzemelerin İadesi',
        description: 'Alıcı tarafın talep üzerine veya ilişki sonunda tüm gizli malzemeleri iade etmesini veya imha etmesini gerektirir.'
      }
    ],
    related: [
      { title: 'Hizmet Sözleşmesi', url: '/contracts/service-agreement' },
      { title: 'İş Sözleşmesi', url: '/contracts/employment' },
      { title: 'Ticari Sırları Anlamak', url: '/encyclopedia/trade-secrets' }
    ]
  }

  return (
    <>
      <Header lang={lang} dict={dict} />
      
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-legal-gray">
          <Link href={`/${lang}`} className="hover:text-legal-gold">
            {dict.nav.home}
          </Link>
          {' → '}
          <Link href={`/${lang}/contracts`} className="hover:text-legal-gold">
            {dict.nav.contracts}
          </Link>
          {' → '}
          <span className="text-legal-navy font-medium">NDA</span>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Jurisdiction Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-legal-gray-light text-legal-navy font-semibold rounded-full text-sm">
              📍 {dict.contract.jurisdiction}: {content.jurisdiction}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-navy mb-4">
            {content.title}
          </h1>

          {/* Last Updated */}
          <p className="text-sm text-legal-gray mb-8">
            {dict.contract.lastUpdated}: January 21, 2026
          </p>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
              {dict.contract.whatIs} {isEnglish ? 'an' : 'bir'} NDA?
            </h2>
            <p className="text-lg text-legal-gray leading-relaxed">
              {content.intro}
            </p>
          </section>

          {/* When to Use */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
              {dict.contract.whenToUse}
            </h2>
            <ul className="space-y-3">
              {content.whenToUse.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-legal-gold mr-3 mt-1">✓</span>
                  <span className="text-legal-gray">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Key Clauses */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-legal-navy mb-6">
              {dict.contract.keyClauses}
            </h2>
            <div className="space-y-6">
              {content.clauses.map((clause, index) => (
                <div key={index}>
                  <h3 className="font-serif text-xl font-semibold text-legal-navy mb-2">
                    {index + 1}. {clause.title}
                  </h3>
                  <p className="text-legal-gray leading-relaxed">
                    {clause.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Disclaimer */}
          <div className="disclaimer-box">
            <h3 className="font-semibold text-legal-navy mb-3 flex items-center">
              <span className="mr-2">⚖️</span>
              {dict.disclaimer.title}
            </h3>
            <div className="space-y-2 text-sm text-legal-gray">
              <p><strong>{isEnglish ? 'No Legal Advice' : 'Hukuki Tavsiye Değildir'}:</strong> {dict.disclaimer.noAdvice}</p>
              <p><strong>{isEnglish ? 'No Attorney-Client Relationship' : 'Avukat-Müvekkil İlişkisi Yoktur'}:</strong> {dict.disclaimer.noRelationship}</p>
              <p><strong>{dict.contract.jurisdiction}:</strong> {dict.disclaimer.jurisdictionWarning}</p>
              <p><strong>{isEnglish ? 'Disclaimer of Warranties' : 'Garanti Reddi'}:</strong> {dict.disclaimer.warranty}</p>
            </div>
          </div>

          {/* Download Section */}
          <DownloadSection 
            lang={lang}
            dict={dict}
            stripePaymentLink={stripePaymentLink}
            documentUrl={documentUrl}
          />

          {/* Related Resources */}
          <section className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
              {dict.contract.relatedResources}
            </h2>
            <ul className="space-y-2">
              {content.related.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${lang}${item.url}`}
                    className="text-legal-gold hover:text-legal-gold-light font-medium"
                  >
                    {item.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>

      <Footer lang={lang} dict={dict} />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DigitalDocument',
            name: content.title,
            description: content.intro,
            author: {
              '@type': 'Organization',
              name: 'EchoLegal',
            },
            datePublished: '2025-01-15',
            dateModified: '2026-01-21',
            inLanguage: lang,
            isAccessibleForFree: true,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </>
  )
}
