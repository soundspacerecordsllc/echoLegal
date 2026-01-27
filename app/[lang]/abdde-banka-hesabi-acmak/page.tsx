// app/[lang]/abdde-banka-hesabi-acmak/page.tsx
// DRAFT PAGE - Content outline only

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How to Open a US Bank Account as a Non-Resident | EchoLegal'
    : 'ABD\'de Banka Hesabı Açmak: Türkler İçin Rehber | EchoLegal'

  const description = isEnglish
    ? 'Guide for Turkish entrepreneurs on opening a US bank account without US residency. Options, requirements, and step-by-step process.'
    : 'Türk girişimciler için ABD mukimliği olmadan ABD banka hesabı açma rehberi. Seçenekler, gereksinimler ve adım adım süreç.'

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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abdde-banka-hesabi-acmak`,
      languages: {
        'en': 'https://echo-legal.com/en/abdde-banka-hesabi-acmak',
        'tr': 'https://echo-legal.com/tr/abdde-banka-hesabi-acmak',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function BankAccountGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const outlineItems = isEnglish ? [
    'Why You Need a US Bank Account',
    'Requirements for Non-Residents',
    'Traditional Banks vs. Neobanks',
    'Banks That Accept Non-Residents (Mercury, Relay, Wise, etc.)',
    'Documents You\'ll Need',
    'Step-by-Step Application Process',
    'Common Rejection Reasons & How to Avoid Them',
    'Maintaining Your Account from Abroad',
    'FAQ',
    'Sources',
  ] : [
    'Neden ABD Banka Hesabına İhtiyacınız Var',
    'Yabancılar İçin Gereksinimler',
    'Geleneksel Bankalar ve Neobank\'lar',
    'Yabancı Kabul Eden Bankalar (Mercury, Relay, Wise vb.)',
    'Gerekli Belgeler',
    'Adım Adım Başvuru Süreci',
    'Yaygın Red Nedenleri ve Bunlardan Kaçınma',
    'Yurtdışından Hesabınızı Yönetme',
    'Sık Sorulan Sorular',
    'Kaynaklar',
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'How to Open a US Bank Account as a Non-Resident'
      : 'ABD\'de Banka Hesabı Açmak: Türkler İçin Rehber',
    author: {
      '@type': 'Person',
      name: 'Zeynep Ruziye Moore',
      jobTitle: 'Attorney at Law',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: '2025-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/abdde-banka-hesabi-acmak`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'US Bank Account Guide' : 'ABD Banka Hesabı Rehberi'}</span>
          </nav>

          <article>
            {/* Draft Notice */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-800 font-medium">
                {isEnglish
                  ? '🚧 This page is under development. Full content coming soon.'
                  : '🚧 Bu sayfa geliştirme aşamasındadır. Tam içerik yakında eklenecektir.'}
              </p>
            </div>

            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Banking Guide' : 'Bankacılık Rehberi'}
              </span>

              <h1 className="text-3xl md:text-4xl font-black text-black mb-6 leading-tight">
                {isEnglish
                  ? 'How to Open a US Bank Account as a Non-Resident'
                  : 'ABD\'de Banka Hesabı Açmak: Türkler İçin Rehber'}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'A practical guide for Turkish entrepreneurs on opening and maintaining a US bank account for your LLC or business operations.'
                  : 'Türk girişimciler için LLC veya iş operasyonlarınız için ABD banka hesabı açma ve yönetme rehberi.'}
              </p>
            </header>

            {/* Content Outline */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">
                {isEnglish ? 'Planned Content Outline' : 'Planlanan İçerik Taslağı'}
              </h2>

              <div className="bg-gray-50 rounded-lg p-6">
                <ol className="space-y-3">
                  {outlineItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Step-by-step guide to forming a US LLC' : 'ABD\'de LLC kurma adım adım rehberi'}</p>
                </Link>
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'IRS & Tax Realities' : 'IRS ve Vergi Gerçekleri'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'W-8, W-9, and tax obligations' : 'W-8, W-9 ve vergi yükümlülükleri'}</p>
                </Link>
                <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates' : '5 temel sözleşme şablonu'}</p>
                </Link>
                <Link href={`/${lang}/abd-odemeleri-alma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'US Payments Guide' : 'ABD Ödeme Rehberi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Stripe, PayPal, Wise explained' : 'Stripe, PayPal, Wise açıklandı'}</p>
                </Link>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal or financial advice. Banking requirements change frequently. Verify current requirements with the financial institution directly.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; hukuki veya mali danışmanlık teşkil etmez. Bankacılık gereksinimleri sık sık değişir. Güncel gereksinimleri doğrudan finans kurumuyla doğrulayın.'}
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
