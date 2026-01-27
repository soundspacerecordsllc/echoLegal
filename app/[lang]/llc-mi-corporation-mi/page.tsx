// app/[lang]/llc-mi-corporation-mi/page.tsx
// DRAFT PAGE - Content outline only

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'LLC vs Corporation: Which is Right for Your US Business? | EchoLegal'
    : 'LLC mi Corporation mı: Hangisi Sizin İçin Doğru? | EchoLegal'

  const description = isEnglish
    ? 'Compare LLC and Corporation structures for your US business. Tax implications, liability protection, management flexibility, and which is better for Turkish entrepreneurs.'
    : 'ABD işiniz için LLC ve Corporation yapılarını karşılaştırın. Vergi etkileri, sorumluluk koruması, yönetim esnekliği ve Türk girişimciler için hangisi daha iyi.'

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
      canonical: `https://echo-legal.com/${lang}/llc-mi-corporation-mi`,
      languages: {
        'en': 'https://echo-legal.com/en/llc-mi-corporation-mi',
        'tr': 'https://echo-legal.com/tr/llc-mi-corporation-mi',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCvsCorporationPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const outlineItems = isEnglish ? [
    'Overview: LLC vs Corporation at a Glance',
    'Formation Requirements & Costs',
    'Liability Protection Comparison',
    'Tax Treatment Differences',
    'Management & Ownership Flexibility',
    'Raising Investment: Which Structure Do VCs Prefer?',
    'Ongoing Compliance Requirements',
    'Converting Between Structures',
    'Special Considerations for Non-Residents',
    'Decision Framework: Which Should You Choose?',
    'FAQ',
    'Sources',
  ] : [
    'Genel Bakış: LLC ve Corporation Bir Bakışta',
    'Kuruluş Gereksinimleri ve Maliyetler',
    'Sorumluluk Koruması Karşılaştırması',
    'Vergi Muamelesi Farklılıkları',
    'Yönetim ve Ortaklık Esnekliği',
    'Yatırım Alma: Risk Sermayesi Hangi Yapıyı Tercih Eder?',
    'Süregelen Uyum Gereksinimleri',
    'Yapılar Arası Dönüşüm',
    'Yabancılar İçin Özel Hususlar',
    'Karar Çerçevesi: Hangisini Seçmelisiniz?',
    'Sık Sorulan Sorular',
    'Kaynaklar',
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'LLC vs Corporation: Which is Right for Your US Business?'
      : 'LLC mi Corporation mı: Hangisi Sizin İçin Doğru?',
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
      '@id': `https://echo-legal.com/${lang}/llc-mi-corporation-mi`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'LLC vs Corporation' : 'LLC mi Corporation mı'}</span>
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
            <span className="inline-block px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Business Structure Guide' : 'İş Yapısı Rehberi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-black mb-6 leading-tight">
              {isEnglish
                ? 'LLC vs Corporation: Which is Right for Your US Business?'
                : 'LLC mi Corporation mı: Hangisi Sizin İçin Doğru?'}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {isEnglish
                ? 'A comprehensive comparison of LLC and Corporation structures to help you choose the right entity type for your US business venture.'
                : 'ABD iş girişiminiz için doğru şirket türünü seçmenize yardımcı olacak kapsamlı bir LLC ve Corporation karşılaştırması.'}
            </p>
          </header>

          {/* Quick Comparison Preview */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-black mb-4">
              {isEnglish ? 'Quick Comparison' : 'Hızlı Karşılaştırma'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Feature' : 'Özellik'}</th>
                    <th className="border border-gray-200 px-4 py-3 text-left">LLC</th>
                    <th className="border border-gray-200 px-4 py-3 text-left">Corporation</th>
                  </tr>
                </thead>
                <tbody>
                  {(isEnglish ? [
                    ['Default taxation', 'Pass-through', 'Double taxation (C-Corp)'],
                    ['Management flexibility', 'High', 'Structured'],
                    ['Ownership types', 'Flexible', 'Shares only'],
                    ['VC investment friendly', 'Less common', 'Preferred'],
                    ['Formalities', 'Minimal', 'More required'],
                  ] : [
                    ['Varsayılan vergilendirme', 'Geçişli (pass-through)', 'Çifte vergilendirme (C-Corp)'],
                    ['Yönetim esnekliği', 'Yüksek', 'Yapılandırılmış'],
                    ['Ortaklık türleri', 'Esnek', 'Yalnızca hisse'],
                    ['Risk sermayesi dostu', 'Daha az yaygın', 'Tercih edilen'],
                    ['Biçimsel gereklilikler', 'Minimal', 'Daha fazla gerekli'],
                  ]).map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{row[0]}</td>
                      <td className="border border-gray-200 px-4 py-3">{row[1]}</td>
                      <td className="border border-gray-200 px-4 py-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

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
                <p className="text-sm text-gray-600">{isEnglish ? 'Tax considerations for your business structure' : 'İş yapınız için vergi hususları'}</p>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded-lg p-5">
            <p className="text-xs text-gray-600 leading-relaxed">
              {isEnglish
                ? 'This content is for informational purposes only and does not constitute legal or tax advice. Business structure decisions depend on many individual factors. Consult qualified professionals for your specific situation.'
                : 'Bu içerik yalnızca bilgilendirme amaçlıdır; hukuki veya vergi danışmanlığı teşkil etmez. İş yapısı kararları birçok bireysel faktöre bağlıdır. Kendi durumunuz için uzman profesyonellere danışın.'}
            </p>
          </div>
        </article>
      </main>
    </>
  )
}
