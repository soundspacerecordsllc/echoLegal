// app/[lang]/amerika/llc-eyalet/florida/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { getStateData } from '@/lib/state-llc-data'

const stateSlug = 'florida'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const state = getStateData(stateSlug)!

  const title = isEnglish
    ? `How to Form an LLC in ${state.name.en}: Guide for Turkish Entrepreneurs | EchoLegal`
    : `ABD'de ${state.name.tr}'da LLC Kurmak: Türk Girişimciler İçin Rehber | EchoLegal`

  const description = isEnglish
    ? `Complete guide to forming an LLC in ${state.name.en}. Formation fees, requirements, advantages, and step-by-step process for Turkish entrepreneurs.`
    : `${state.name.tr}'da LLC kurma rehberi. Kuruluş ücretleri, gereksinimler, avantajlar ve Türk girişimciler için adım adım süreç.`

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
    alternates: {
      canonical: `https://echo-legal.com/${lang}/amerika/llc-eyalet/${stateSlug}`,
      languages: {
        'en': `https://echo-legal.com/en/amerika/llc-eyalet/${stateSlug}`,
        'tr': `https://echo-legal.com/tr/amerika/llc-eyalet/${stateSlug}`,
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function FloridaLLCPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const state = getStateData(stateSlug)!

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? `How to Form an LLC in ${state.name.en}`
      : `${state.name.tr}'da LLC Kurmak`,
    author: {
      '@type': 'Organization',
      name: 'EchoLegal',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: '2026-01-25',
    dateModified: '2026-01-25',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEnglish ? 'Home' : 'Ana Sayfa',
        item: `https://echo-legal.com/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEnglish ? 'US Immigration & Business' : 'ABD Göçmenlik ve İş',
        item: `https://echo-legal.com/${lang}/amerika`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `LLC in ${state.name.en}`,
        item: `https://echo-legal.com/${lang}/amerika/llc-eyalet/${stateSlug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/amerika`} className="hover:text-black">{isEnglish ? 'US Business' : 'ABD İş'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{state.name[lang as 'en' | 'tr']}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'State Guide' : 'Eyalet Rehberi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
              {isEnglish
                ? `How to Form an LLC in ${state.name.en}`
                : `ABD'de ${state.name.tr}'da LLC Kurmak`}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {isEnglish
                ? `Everything you need to know about forming and operating an LLC in ${state.name.en} as a Turkish entrepreneur.`
                : `Türk girişimci olarak ${state.name.tr}'da LLC kurma ve işletme hakkında bilmeniz gereken her şey.`}
            </p>
          </div>

          {/* Quick Facts */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              {isEnglish ? 'Quick Facts' : 'Hızlı Bilgiler'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">{isEnglish ? 'Formation Fee' : 'Kuruluş Ücreti'}</div>
                <div className="text-xl font-bold text-black">{state.formationFee}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">{isEnglish ? 'Annual Fee' : 'Yıllık Ücret'}</div>
                <div className="text-xl font-bold text-black">{state.annualFee}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">{isEnglish ? 'Processing Time' : 'İşlem Süresi'}</div>
                <div className="text-xl font-bold text-black">{state.processingTime}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">{isEnglish ? 'Official Website' : 'Resmi Website'}</div>
                <a href={state.sosWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                  {isEnglish ? 'Secretary of State' : 'Eyalet Sekreterliği'} ↗
                </a>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              {isEnglish ? 'Formation Requirements' : 'Kuruluş Gereksinimleri'}
            </h2>
            <ul className="space-y-3">
              {state.requirements[lang as 'en' | 'tr'].map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pros and Cons */}
          <section className="mb-10 grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-4 flex items-center gap-2">
                <span className="text-green-600">✓</span>
                {isEnglish ? 'Advantages' : 'Avantajlar'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {state.advantages[lang as 'en' | 'tr'].map((adv, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-4 flex items-center gap-2">
                <span className="text-red-500">✕</span>
                {isEnglish ? 'Disadvantages' : 'Dezavantajlar'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {state.disadvantages[lang as 'en' | 'tr'].map((dis, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {dis}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Tax Info */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              {isEnglish ? 'Tax Information' : 'Vergi Bilgileri'}
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-gray-700">{state.taxInfo[lang as 'en' | 'tr']}</p>
            </div>
          </section>

          {/* Notes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              {isEnglish ? 'Important Notes' : 'Önemli Notlar'}
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
              <p className="text-gray-700">{state.notes[lang as 'en' | 'tr']}</p>
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Complete LLC Guide' : 'Tam LLC Rehberi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Step-by-step formation guide' : 'Adım adım kurulum rehberi'}</p>
              </Link>
              <Link href={`/${lang}/checklists/llc-checklist`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Checklist' : 'LLC Kurma Kontrol Listesi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Pre-formation checklist' : 'Kuruluş öncesi kontrol listesi'}</p>
              </Link>
              <Link href={`/${lang}/ein-itin-ssn-farki`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Tax ID numbers explained' : 'Vergi kimlik numaraları'}</p>
              </Link>
              <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates' : '5 temel sözleşme şablonu'}</p>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded-lg p-5">
            <p className="text-xs text-gray-600 leading-relaxed">
              {isEnglish
                ? `This guide is for informational purposes only and does not constitute legal advice. ${state.name.en} LLC requirements may change. Verify current requirements with the ${state.name.en} Division of Corporations or a qualified attorney.`
                : `Bu rehber yalnızca bilgilendirme amaçlıdır; hukuki tavsiye niteliği taşımaz. ${state.name.tr} LLC gereksinimleri değişebilir. Güncel gereksinimleri ${state.name.tr} Division of Corporations veya nitelikli bir avukatla doğrulayın.`}
            </p>
          </div>
      </main>
    </>
  )
}
