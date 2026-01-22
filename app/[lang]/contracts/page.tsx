import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  return {
    title: isEnglish ? 'Legal Contract Templates | EchoLegal' : 'Hukuki Sözleşme Şablonları | EchoLegal',
    description: isEnglish
      ? 'Professional legal contract templates. Pay what you can or download free.'
      : 'Profesyonel hukuki sözleşme şablonları. Ödeyebildiğiniz kadar ödeyin veya ücretsiz indirin.',
  }
}

export default async function ContractsPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const contracts = [
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      description: isEnglish 
        ? 'Protect confidential business information in partnerships and negotiations.'
        : 'Ortaklıklarda ve müzakerelerde gizli iş bilgilerini koruyun.',
      available: true,
    },
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
      description: isEnglish 
        ? 'Professional contract for freelancers and their clients.'
        : 'Serbest çalışanlar ve müşterileri için profesyonel sözleşme.',
      available: true,
    },
    {
      slug: 'influencer-agreement',
      title: isEnglish ? 'Influencer / Brand Agreement' : 'Influencer / Marka Sözleşmesi',
      description: isEnglish 
        ? 'Collaboration agreement between content creators and brands.'
        : 'İçerik üreticileri ve markalar arasında işbirliği sözleşmesi.',
      available: true,
    },
    {
      slug: 'independent-contractor',
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      description: isEnglish 
        ? 'Establish clear terms for contractor relationships.'
        : 'Yüklenici ilişkileri için net şartlar belirleyin.',
      available: true,
    },
    {
      slug: 'privacy-policy',
      title: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
      description: isEnglish 
        ? 'GDPR and CCPA compliant privacy policy for websites and apps.'
        : 'Web siteleri ve uygulamalar için KVKK uyumlu gizlilik politikası.',
      available: true,
    },
    {
      slug: 'terms-of-service',
      title: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları',
      description: isEnglish 
        ? 'Terms and conditions for websites, apps, and online services.'
        : 'Web siteleri, uygulamalar ve online hizmetler için kullanım şartları.',
      available: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black text-black">
            EchoLegal
          </Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link href={`/${lang}/encyclopedia`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
            </Link>
            <Link href={`/${lang}/support`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Support' : 'Destek'}
            </Link>
            <Link 
              href={`/${lang === 'en' ? 'tr' : 'en'}/contracts`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-black mb-4">
          {isEnglish ? 'Contracts' : 'Sözleşmeler'}
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {isEnglish 
            ? 'Professional legal templates for everyday business needs. Pay what you can, or download for free.'
            : 'Günlük iş ihtiyaçları için profesyonel hukuki şablonlar. Ödeyebildiğiniz kadar ödeyin veya ücretsiz indirin.'}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract) => (
            <div 
              key={contract.slug}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                contract.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {contract.available 
                  ? (isEnglish ? 'Available' : 'Mevcut') 
                  : (isEnglish ? 'Coming Soon' : 'Yakında')}
              </span>
              
              <h2 className="text-xl font-bold text-black mb-2">
                {contract.title}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {contract.description}
              </p>
              
              {contract.available ? (
                <Link
                  href={`/${lang}/contracts/${contract.slug}`}
                  className="inline-block bg-[#C9A227] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
                >
                  {isEnglish ? 'View Template →' : 'Şablonu Gör →'}
                </Link>
              ) : (
                <span className="inline-block bg-gray-200 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                  {isEnglish ? 'Coming Soon' : 'Yakında'}
                </span>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {isEnglish 
              ? 'LEGAL DISCLAIMER: EchoLegal provides educational legal information and document templates for general informational purposes only. Nothing on this website constitutes legal advice, nor does use of this website create an attorney-client relationship.'
              : 'HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme amaçlı eğitici hukuki bilgiler ve belge şablonları sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez.'}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
