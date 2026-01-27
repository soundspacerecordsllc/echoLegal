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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            {isEnglish ? 'Templates' : 'Şablonlar'}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Contracts' : 'Sözleşmeler'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'Professionally drafted contract templates for common business relationships. Available in English and Turkish.'
              : 'Yaygın iş ilişkileri için profesyonelce hazırlanmış sözleşme şablonları. İngilizce ve Türkçe olarak mevcuttur.'}
          </p>
        </header>

        {/* Contracts List */}
        <div className="divide-y divide-gray-200">
          {contracts.map((contract) => (
            <div key={contract.slug} className="py-6">
              {contract.available ? (
                <Link
                  href={`/${lang}/contracts/${contract.slug}`}
                  className="block group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                        {contract.title}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {contract.description}
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1">
                      →
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="opacity-60">
                  <h2 className="font-medium text-gray-700 mb-1">
                    {contract.title}
                    <span className="ml-2 text-sm text-gray-400">
                      {isEnglish ? '(Coming)' : '(Yakında)'}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500">{contract.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Related Resources */}
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'All Templates →' : 'Tüm Şablonlar →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/legal-kits`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Legal Kits →' : 'Hukuki Kitler →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/library`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Reference Library →' : 'Referans Kütüphanesi →'}
            </Link>
          </div>
        </nav>
      </main>
    </div>
  )
}
