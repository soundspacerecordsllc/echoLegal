import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const contracts = [
  {
    slug: 'nda',
    titleEn: 'Non-Disclosure Agreement (NDA)',
    titleTr: 'Gizlilik Sözleşmesi (NDA)',
    descEn: 'Protect confidential business information in partnerships and negotiations.',
    descTr: 'Ortaklıklarda ve müzakerelerde gizli iş bilgilerini koruyun.',
    available: true,
  },
  {
    slug: 'service-agreement',
    titleEn: 'Service Agreement',
    titleTr: 'Hizmet Sözleşmesi',
    descEn: 'Define clear terms for service-based relationships.',
    descTr: 'Hizmet tabanlı ilişkiler için net şartlar tanımlayın.',
    available: true,
  },
  {
    slug: 'contractor-agreement',
    titleEn: 'Independent Contractor Agreement',
    titleTr: 'Bağımsız Yüklenici Sözleşmesi',
    descEn: 'Establish terms for contractor relationships.',
    descTr: 'Yüklenici ilişkileri için şartları belirleyin.',
    available: false,
  },
  {
    slug: 'employment-agreement',
    titleEn: 'Employment Agreement',
    titleTr: 'İş Sözleşmesi',
    descEn: 'Formalize employment relationships with clear terms.',
    descTr: 'İş ilişkilerini net şartlarla resmileştirin.',
    available: false,
  },
]

export default async function ContractsPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <>
      <Header lang={lang} dict={dict} />
      
      <main className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-navy mb-4">
            {dict.nav.contracts}
          </h1>
          <p className="text-xl text-legal-gray mb-12">
            {isEnglish 
              ? 'Professional legal templates for everyday business needs. Pay what you can, or download for free.'
              : 'Günlük iş ihtiyaçları için profesyonel yasal şablonlar. Ödeyebileceğiniz kadar ödeyin veya ücretsiz indirin.'
            }
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {contracts.map((contract) => (
              <div
                key={contract.slug}
                className={`p-8 rounded-lg border-2 ${
                  contract.available
                    ? 'bg-white border-legal-gray-light hover:border-legal-gold'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="mb-4">
                  {contract.available ? (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                      {isEnglish ? 'Available' : 'Mevcut'}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 bg-gray-200 text-gray-600 text-sm font-semibold rounded-full">
                      {isEnglish ? 'Coming Soon' : 'Yakında'}
                    </span>
                  )}
                </div>
                
                <h2 className="font-serif text-2xl font-bold text-legal-navy mb-3">
                  {isEnglish ? contract.titleEn : contract.titleTr}
                </h2>
                
                <p className="text-legal-gray mb-6">
                  {isEnglish ? contract.descEn : contract.descTr}
                </p>

                {contract.available ? (
                  <Link
                    href={`/${lang}/contracts/${contract.slug}`}
                    className="inline-block px-6 py-3 bg-legal-gold text-white font-semibold rounded-lg hover:bg-legal-gold-light transition-colors"
                  >
                    {isEnglish ? 'View Template' : 'Şablonu Görüntüle'} →
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                  >
                    {isEnglish ? 'Coming Soon' : 'Yakında'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict} />
    </>
  )
}
