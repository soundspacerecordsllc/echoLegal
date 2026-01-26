// app/[lang]/contracts/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish 
      ? 'Free Legal Contract Templates (English & Turkish) | EchoLegal' 
      : 'Ücretsiz Hukuki Sözleşme Şablonları (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Download free bilingual legal templates. I support EchoLegal ($20 recommended) or download free. NDA, Privacy Policy, Terms of Service & more.'
      : 'Ücretsiz iki dilli hukuki şablonlar indirin. EchoLegal\'i destekliyorum (20$ önerilir) veya ücretsiz indirin. NDA, Gizlilik Politikası ve daha fazlası.',
  }
}

export default async function ContractsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
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
      slug: 'service-agreement',
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      description: isEnglish 
        ? 'Professional contract for service providers and clients. Define scope, payment, and deliverables.'
        : 'Hizmet sağlayıcılar ve müşteriler için profesyonel sözleşme. Kapsam, ödeme ve teslimatları tanımlayın.',
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
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-black mb-4">
          {isEnglish ? 'Contracts' : 'Sözleşmeler'}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {isEnglish
            ? 'Professional legal templates for everyday business needs.'
            : 'Günlük iş ihtiyaçları için profesyonel hukuki şablonlar.'}
        </p>
        <p className="text-base text-gray-500 mb-12">
          {isEnglish
            ? 'I support EchoLegal – $20 recommended. Download for free.'
            : 'EchoLegal\'e destek olmak ister misiniz? 20 $ önerilir; isterseniz ücretsiz indirebilirsiniz.'}
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
                <div className="space-y-2">
                  <Link
                    href={`/${lang}/contracts/${contract.slug}`}
                    className="inline-block bg-[#C9A227] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
                  >
                    {isEnglish ? 'View & Download →' : 'Görüntüle & İndir →'}
                  </Link>
                  <div>
                    <Link
                      href={`/${lang}/support`}
                      className="text-sm text-gray-500 hover:text-[#C9A227] transition-colors"
                    >
                      {isEnglish ? 'Why support EchoLegal?' : 'Neden EchoLegal\'i desteklemeliyim?'}
                    </Link>
                  </div>
                </div>
              ) : (
                <span className="inline-block bg-gray-200 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                  {isEnglish ? 'Coming Soon' : 'Yakında'}
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
