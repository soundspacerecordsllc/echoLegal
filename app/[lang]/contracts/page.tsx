// app/[lang]/contracts/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import SearchButton from '@/components/SearchButton'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish 
      ? 'Free Legal Contract Templates (English & Turkish) | EchoLegal' 
      : 'Ücretsiz Hukuki Sözleşme Şablonları (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Download free bilingual legal templates. Pay what you can ($20 recommended) or download free. NDA, Privacy Policy, Terms of Service & more.'
      : 'Ücretsiz iki dilli hukuki şablonlar indirin. Gücünüz kadar ödeyin (20$ önerilir) veya ücretsiz indirin. NDA, Gizlilik Politikası ve daha fazlası.',
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
            <SearchButton lang={lang} />
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
        <p className="text-lg text-gray-600 mb-2">
          {isEnglish 
            ? 'Professional legal templates for everyday business needs. Pay what you can, or download for free.'
            : 'Günlük iş ihtiyaçları için profesyonel hukuki şablonlar. Ödeyebildiğiniz kadar ödeyin veya ücretsiz indirin.'}
        </p>
        {/* New subtitle line for Pay What You Can */}
        <p className="text-base text-gray-500 mb-12">
          {isEnglish 
            ? 'Download free, or pay what you can — $20 recommended.'
            : 'Ücretsiz indir, ya da gücün kadar öde — önerilen 20$.'}
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
                      {isEnglish ? 'Why Pay What You Can?' : "Neden 'Gücün Kadar Öde'?"}
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
