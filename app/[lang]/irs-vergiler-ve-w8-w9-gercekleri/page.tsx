// app/[lang]/irs-vergiler-ve-w8-w9-gercekleri/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { getArticleMetadata } from '@/lib/article-metadata'
import { getFeaturedSnippet } from '@/components/FeaturedSnippet'
import AuthorBox from '@/components/AuthorBox'

const ARTICLE_SLUG = 'irs-vergiler-ve-w8-w9-gercekleri'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'IRS, Taxes & W-8/W-9 Realities for Turkish Entrepreneurs | EchoLegal'
    : 'IRS, Vergi ve W-8/W-9 Gerçekleri | EchoLegal'

  const description = isEnglish
    ? 'Understanding US tax obligations for Turkish entrepreneurs. W-8BEN, W-8BEN-E, W-9 forms explained. EIN, ITIN, 1099s, and withholding basics.'
    : 'Türk girişimciler için ABD vergi yükümlülüklerini anlama. W-8BEN, W-8BEN-E, W-9 formları açıklandı. EIN, ITIN, 1099 ve stopaj temelleri.'

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
      canonical: `https://echo-legal.com/${lang}/irs-vergiler-ve-w8-w9-gercekleri`,
      languages: {
        'en': 'https://echo-legal.com/en/irs-vergiler-ve-w8-w9-gercekleri',
        'tr': 'https://echo-legal.com/tr/irs-vergiler-ve-w8-w9-gercekleri',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function TaxGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'w8-w9-farki', label: isEnglish ? 'W-8 vs W-9: Who Signs What?' : 'W-8 ve W-9: Kim Hangisini İmzalar?' },
    { id: 'ein-ssn-itin', label: isEnglish ? 'EIN vs SSN vs ITIN' : 'EIN, SSN ve ITIN Ayrımı' },
    { id: '1099-stopaj', label: isEnglish ? '1099s and Backup Withholding' : '1099 ve Yedek Stopaj' },
    { id: 'vergi-mukellefiyeti', label: isEnglish ? 'Tax Filing Triggers for Non-Residents' : 'Yabancılar İçin Vergi Beyannamesi Gereklilikleri' },
    { id: 'yanlis-bilinenler', label: isEnglish ? 'Common Misconceptions' : 'Yaygın Yanlış Bilinenler' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
    { id: 'kaynaklar', label: isEnglish ? 'Sources' : 'Kaynaklar' },
  ]

  const articleMeta = getArticleMetadata(ARTICLE_SLUG)
  const featuredSnippet = getFeaturedSnippet(ARTICLE_SLUG)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'IRS, Taxes & W-8/W-9 Realities for Turkish Entrepreneurs'
      : 'IRS, Vergi ve W-8/W-9 Gerçekleri',
    author: {
      '@type': 'Person',
      name: 'Zeynep Ruziye Moore',
      jobTitle: 'Licensed in New York',
      affiliation: { '@type': 'Organization', name: 'EchoLegal' },
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: '2025-01-25',
    dateModified: '2025-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/irs-vergiler-ve-w8-w9-gercekleri`,
    },
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
        name: isEnglish ? 'Guides' : 'Rehberler',
        item: `https://echo-legal.com/${lang}/library`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish ? 'IRS & Tax Guide' : 'IRS ve Vergi Rehberi',
        item: `https://echo-legal.com/${lang}/irs-vergiler-ve-w8-w9-gercekleri`,
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

      <div className="bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'IRS & Tax Guide' : 'IRS ve Vergi Rehberi'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Tax Guide' : 'Vergi Rehberi'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                {isEnglish
                  ? 'IRS, Taxes & W-8/W-9 Realities'
                  : 'IRS, Vergi ve W-8/W-9 Gerçekleri'}
              </h1>

              {/* Authority signals */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Zeynep Ruziye Moore
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Updated: January 25, 2026' : 'Güncellendi: 25 Ocak 2026'}
                </span>
                <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Reviewed by a licensed attorney' : 'Lisanslı avukat tarafından incelendi'}
                </span>
              </div>

              {/* Featured snippet block */}
              {featuredSnippet && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed">
                    {featuredSnippet[lang]}
                  </p>
                </div>
              )}

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This guide provides an overview of common US tax forms and concepts relevant to Turkish entrepreneurs working with US clients or operating US entities. This is not tax advice—consult a qualified tax professional for your specific situation.'
                  : 'Bu rehber, ABD\'li müşterilerle çalışan veya ABD şirketleri işleten Türk girişimciler için geçerli olan yaygın ABD vergi formları ve kavramlarına genel bir bakış sunmaktadır. Bu bir vergi danışmanlığı değildir—kendi durumunuz için uzman bir vergi danışmanına başvurun.'}
              </p>
            </header>

            {/* Critical Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-10">
              <p className="text-sm text-red-900 leading-relaxed">
                <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute tax, legal, or financial advice. Tax laws are complex and change frequently. Always consult a qualified CPA, tax attorney, or enrolled agent for advice specific to your situation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi, hukuki veya mali danışmanlık teşkil etmez. Vergi yasaları karmaşıktır ve sık sık değişir. Kendi durumunuza özgü tavsiye için mutlaka uzman bir mali müşavir veya vergi avukatına danışın.'}
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-gray-50 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
              <ol className="space-y-2">
                {tocItems.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-black hover:underline">
                      {index + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1: W-8 vs W-9 */}
            <section id="w8-w9-farki" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '1. W-8 vs W-9: Who Signs What?' : '1. W-8 ve W-9: Kim Hangisini İmzalar?'}
              </h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <p>When you receive payment from a US company, they typically need to collect tax documentation from you. The form you sign depends on your tax status.</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <p>ABD şirketinden ödeme aldığınızda, genellikle sizden vergi belgesi toplamaları gerekir. İmzalayacağınız form vergi durumunuza bağlıdır.</p>
                </div>
              )}

              <div className="mt-6 space-y-4">
                {/* W-9 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-blue-50 px-5 py-4">
                    <h3 className="font-bold text-black">W-9</h3>
                    <p className="text-sm text-blue-800">{isEnglish ? 'Request for Taxpayer Identification Number' : 'Vergi Kimlik Numarası Talebi'}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>{isEnglish ? 'Who signs:' : 'Kim imzalar:'}</strong>{' '}
                      {isEnglish
                        ? 'US persons (citizens, residents, US entities)'
                        : 'ABD kişileri (vatandaşlar, mukimler, ABD şirketleri)'}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>{isEnglish ? 'When:' : 'Ne zaman:'}</strong>{' '}
                      {isEnglish
                        ? 'Before receiving payment from a US payer. The payer uses this to report payments to the IRS.'
                        : 'ABD\'li bir ödeyiciden ödeme almadan önce. Ödeyici bunu IRS\'e ödemeleri bildirmek için kullanır.'}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>{isEnglish ? 'Key info provided:' : 'Verilen temel bilgiler:'}</strong>{' '}
                      {isEnglish
                        ? 'Name, address, TIN (SSN or EIN), entity type, certification'
                        : 'İsim, adres, TIN (SSN veya EIN), şirket türü, onay'}
                    </p>
                  </div>
                </div>

                {/* W-8BEN */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-green-50 px-5 py-4">
                    <h3 className="font-bold text-black">W-8BEN</h3>
                    <p className="text-sm text-green-800">{isEnglish ? 'Certificate of Foreign Status (Individuals)' : 'Yabancı Statüsü Belgesi (Bireyler)'}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>{isEnglish ? 'Who signs:' : 'Kim imzalar:'}</strong>{' '}
                      {isEnglish
                        ? 'Foreign individuals (non-US persons)'
                        : 'Yabancı bireyler (ABD kişisi olmayanlar)'}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>{isEnglish ? 'When:' : 'Ne zaman:'}</strong>{' '}
                      {isEnglish
                        ? 'To claim foreign status and potentially reduced withholding under a tax treaty.'
                        : 'Yabancı statüsünü beyan etmek ve potansiyel olarak vergi anlaşması kapsamında indirimli stopaj talep etmek için.'}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>{isEnglish ? 'Key info provided:' : 'Verilen temel bilgiler:'}</strong>{' '}
                      {isEnglish
                        ? 'Name, country of citizenship, foreign TIN, treaty claim (if applicable)'
                        : 'İsim, vatandaşlık ülkesi, yabancı vergi kimlik no, anlaşma talebi (varsa)'}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>{isEnglish ? 'Validity:' : 'Geçerlilik:'}</strong>{' '}
                      {isEnglish
                        ? 'Generally valid for 3 years from signing date'
                        : 'Genellikle imza tarihinden itibaren 3 yıl geçerli'}
                    </p>
                  </div>
                </div>

                {/* W-8BEN-E */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-purple-50 px-5 py-4">
                    <h3 className="font-bold text-black">W-8BEN-E</h3>
                    <p className="text-sm text-purple-800">{isEnglish ? 'Certificate of Foreign Status (Entities)' : 'Yabancı Statüsü Belgesi (Şirketler)'}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>{isEnglish ? 'Who signs:' : 'Kim imzalar:'}</strong>{' '}
                      {isEnglish
                        ? 'Foreign entities (non-US corporations, partnerships, etc.)'
                        : 'Yabancı şirketler (ABD dışı şirketler, ortaklıklar vb.)'}
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>{isEnglish ? 'When:' : 'Ne zaman:'}</strong>{' '}
                      {isEnglish
                        ? 'Same as W-8BEN, but for entities. More complex due to FATCA requirements.'
                        : 'W-8BEN ile aynı, ancak şirketler için. FATCA gereksinimleri nedeniyle daha karmaşık.'}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>{isEnglish ? 'Note:' : 'Not:'}</strong>{' '}
                      {isEnglish
                        ? 'This form is significantly longer and requires entity classification under Chapter 3 and Chapter 4 (FATCA) status.'
                        : 'Bu form önemli ölçüde daha uzundur ve Bölüm 3 ile Bölüm 4 (FATCA) statüsü altında şirket sınıflandırması gerektirir.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Reference Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Your Status' : 'Durumunuz'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left">{isEnglish ? 'Form' : 'Form'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'US citizen or resident' : 'ABD vatandaşı veya mukimi'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">W-9</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'US LLC (domestic)' : 'ABD LLC (yerli)'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">W-9</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Foreign individual (e.g., Turkish citizen in Turkey)' : 'Yabancı birey (örn. Türkiye\'deki Türk vatandaşı)'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">W-8BEN</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-3">{isEnglish ? 'Foreign entity (e.g., Turkish company)' : 'Yabancı şirket (örn. Türk şirketi)'}</td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">W-8BEN-E</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: EIN vs SSN vs ITIN */}
            <section id="ein-ssn-itin" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. EIN vs SSN vs ITIN' : '2. EIN, SSN ve ITIN Ayrımı'}
              </h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <p>The IRS uses different identification numbers for different purposes. Understanding which one you need is essential.</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <p>IRS, farklı amaçlar için farklı kimlik numaraları kullanır. Hangisine ihtiyacınız olduğunu anlamak esastır.</p>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-bold text-black">SSN (Social Security Number)</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'Issued to US citizens and individuals authorized to work in the US. Used for personal tax filing and employment. You cannot obtain an SSN without work authorization.'
                      : 'ABD vatandaşlarına ve ABD\'de çalışma izni olan bireylere verilir. Kişisel vergi beyannamesi ve istihdam için kullanılır. Çalışma izni olmadan SSN alamazsınız.'}
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-bold text-black">EIN (Employer Identification Number)</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'Issued to businesses, including LLCs and corporations. Required for opening business bank accounts, hiring employees, and filing business tax returns. Non-residents can obtain an EIN for their US LLC without an SSN.'
                      : 'LLC ve corporation dahil işletmelere verilir. İş banka hesabı açmak, çalışan istihdam etmek ve iş vergi beyannamesi vermek için gereklidir. Yabancılar, SSN olmadan ABD LLC\'leri için EIN alabilir.'}
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-bold text-black">ITIN (Individual Taxpayer Identification Number)</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {isEnglish
                      ? 'Issued to individuals who have US tax filing obligations but are not eligible for an SSN. This includes foreign nationals with US-source income. Application requires Form W-7 and supporting documentation.'
                      : 'ABD vergi beyannamesi yükümlülüğü olan ancak SSN almaya uygun olmayan bireylere verilir. Bu, ABD kaynaklı geliri olan yabancı uyrukluları içerir. Başvuru için W-7 Formu ve destekleyici belgeler gereklidir.'}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-amber-900">
                  <strong>{isEnglish ? 'Common scenario:' : 'Yaygın senaryo:'}</strong>{' '}
                  {isEnglish
                    ? 'A Turkish entrepreneur forms a US LLC. The LLC gets an EIN. The individual owner may need an ITIN if they have personal US tax obligations, but the EIN alone is sufficient for many business purposes.'
                    : 'Bir Türk girişimci ABD LLC\'si kurar. LLC bir EIN alır. Bireysel sahibin kişisel ABD vergi yükümlülükleri varsa ITIN\'e ihtiyacı olabilir, ancak birçok iş amacı için yalnızca EIN yeterlidir.'}
                </p>
              </div>
            </section>

            {/* Section 3: 1099 and Withholding */}
            <section id="1099-stopaj" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. 1099s and Backup Withholding' : '3. 1099 ve Yedek Stopaj'}
              </h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <h3>What is a 1099?</h3>
                  <p>Form 1099 is used by US payers to report various types of income paid to recipients. The most common for contractors is 1099-NEC (Non-Employee Compensation). If you provide services to a US company as a contractor, they may issue you a 1099 at year-end.</p>

                  <h3>Do foreign persons receive 1099s?</h3>
                  <p>Generally, no. If you properly submitted a W-8BEN or W-8BEN-E certifying foreign status, you should not receive a 1099. Instead, the payer may report payments to you on Form 1042-S if withholding applies.</p>

                  <h3>What is backup withholding?</h3>
                  <p>If a US payer cannot verify your tax status (you didn&apos;t provide a valid W-9 or W-8), they may be required to withhold 24% of payments as &quot;backup withholding.&quot; This is sent to the IRS. You can potentially recover it by filing a US tax return.</p>

                  <h3>Withholding on foreign persons</h3>
                  <p>Different from backup withholding, certain payments to foreign persons are subject to 30% withholding (or a reduced rate under a tax treaty). This commonly applies to dividends, interest, royalties, and certain service fees. The US-Turkey tax treaty may reduce these rates for specific income types.</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <h3>1099 Nedir?</h3>
                  <p>Form 1099, ABD ödeyicileri tarafından alıcılara ödenen çeşitli gelir türlerini bildirmek için kullanılır. Yükleniciler için en yaygın olanı 1099-NEC&apos;dir (Çalışan Olmayan Tazminat). Bir ABD şirketine yüklenici olarak hizmet veriyorsanız, yıl sonunda size 1099 düzenleyebilirler.</p>

                  <h3>Yabancılar 1099 alır mı?</h3>
                  <p>Genellikle hayır. Yabancı statüsünü belgeleyen W-8BEN veya W-8BEN-E&apos;yi usulüne uygun şekilde sunduysan, 1099 almamanız gerekir. Bunun yerine, stopaj uygulanıyorsa ödeyici size yapılan ödemeleri Form 1042-S&apos;de bildirebilir.</p>

                  <h3>Yedek stopaj (backup withholding) nedir?</h3>
                  <p>ABD ödeyicisi vergi durumunuzu doğrulayamıyorsa (geçerli W-9 veya W-8 sağlamadıysanız), ödemelerin %24&apos;ünü &quot;yedek stopaj&quot; olarak kesmek zorunda kalabilir. Bu IRS&apos;e gönderilir. ABD vergi beyannamesi vererek potansiyel olarak geri alabilirsiniz.</p>

                  <h3>Yabancılara yapılan ödemelerden stopaj</h3>
                  <p>Yedek stopajdan farklı olarak, yabancılara yapılan belirli ödemeler %30 stopaja tabidir (veya vergi anlaşması kapsamında indirimli oran). Bu genellikle temettüler, faizler, telif hakları ve belirli hizmet ücretlerine uygulanır. ABD-Türkiye vergi anlaşması, belirli gelir türleri için bu oranları azaltabilir.</p>
                </div>
              )}
            </section>

            {/* Section 4: Tax Filing Triggers */}
            <section id="vergi-mukellefiyeti" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '4. Tax Filing Triggers for Non-Residents' : '4. Yabancılar İçin Vergi Beyannamesi Gereklilikleri'}
              </h2>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-900">
                  {isEnglish
                    ? '⚠️ This is a high-level overview only. Tax obligations depend on many factors including income type, amount, treaty benefits, and your specific circumstances. Consult a qualified tax professional.'
                    : '⚠️ Bu yalnızca üst düzey bir genel bakıştır. Vergi yükümlülükleri gelir türü, tutarı, anlaşma avantajları ve özel koşullarınız dahil birçok faktöre bağlıdır. Uzman bir vergi danışmanına başvurun.'}
                </p>
              </div>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <h3>When might a non-resident have US filing obligations?</h3>
                  <p>Common triggers include:</p>
                  <ul>
                    <li><strong>US-source income:</strong> Income earned from US sources (US clients, services performed in the US, US real estate, etc.)</li>
                    <li><strong>Trade or business in the US:</strong> Having a &quot;trade or business&quot; in the US can create filing obligations, even without physical presence</li>
                    <li><strong>US LLC ownership:</strong> Depending on the LLC&apos;s activities and structure, filing may be required</li>
                    <li><strong>FIRPTA:</strong> Sale of US real property interests</li>
                  </ul>

                  <h3>Common forms for non-residents</h3>
                  <ul>
                    <li><strong>Form 1040-NR:</strong> US Nonresident Alien Income Tax Return</li>
                    <li><strong>Form 5472:</strong> Information return for 25% foreign-owned US corporations or foreign-owned disregarded entities</li>
                    <li><strong>Form 1120:</strong> If the LLC elected corporate taxation</li>
                  </ul>

                  <h3>US-Turkey Tax Treaty</h3>
                  <p>The US and Turkey have a tax treaty that may affect your obligations. Common benefits include:</p>
                  <ul>
                    <li>Reduced withholding rates on dividends, interest, and royalties</li>
                    <li>Exemptions for certain business profits if you don&apos;t have a &quot;permanent establishment&quot; in the US</li>
                    <li>Rules to prevent double taxation</li>
                  </ul>
                  <p>Treaty benefits often require proper documentation and may need to be claimed on tax returns.</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <h3>Yabancıların ne zaman ABD beyanname yükümlülüğü olabilir?</h3>
                  <p>Yaygın tetikleyiciler:</p>
                  <ul>
                    <li><strong>ABD kaynaklı gelir:</strong> ABD kaynaklarından elde edilen gelir (ABD müşterileri, ABD&apos;de gerçekleştirilen hizmetler, ABD gayrimenkulü vb.)</li>
                    <li><strong>ABD&apos;de ticaret veya iş:</strong> ABD&apos;de &quot;ticaret veya iş&quot; yürütmek, fiziksel varlık olmasa bile beyanname yükümlülüğü oluşturabilir</li>
                    <li><strong>ABD LLC sahipliği:</strong> LLC&apos;nin faaliyetlerine ve yapısına bağlı olarak beyanname gerekebilir</li>
                    <li><strong>FIRPTA:</strong> ABD gayrimenkul varlıklarının satışı</li>
                  </ul>

                  <h3>Yabancılar için yaygın formlar</h3>
                  <ul>
                    <li><strong>Form 1040-NR:</strong> ABD Yerleşik Olmayan Yabancı Gelir Vergisi Beyannamesi</li>
                    <li><strong>Form 5472:</strong> %25 yabancı sermayeli ABD şirketleri veya yabancı sermayeli disregarded entity&apos;ler için bilgi beyannamesi</li>
                    <li><strong>Form 1120:</strong> LLC kurumsal vergilendirme seçtiyse</li>
                  </ul>

                  <h3>ABD-Türkiye Vergi Anlaşması</h3>
                  <p>ABD ve Türkiye arasında yükümlülüklerinizi etkileyebilecek bir vergi anlaşması bulunmaktadır. Yaygın avantajlar:</p>
                  <ul>
                    <li>Temettüler, faiz ve telif haklarından indirimli stopaj oranları</li>
                    <li>ABD&apos;de &quot;daimi işyeri&quot;niz yoksa belirli ticari kârlar için muafiyetler</li>
                    <li>Çifte vergilendirmeyi önleme kuralları</li>
                  </ul>
                  <p>Anlaşma avantajları genellikle uygun belgelendirme gerektirir ve vergi beyannamelerinde talep edilmesi gerekebilir.</p>
                </div>
              )}
            </section>

            {/* Section 5: Common Misconceptions */}
            <section id="yanlis-bilinenler" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '5. Common Misconceptions' : '5. Yaygın Yanlış Bilinenler'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    myth: '"I don\'t need to file anything if I\'m not in the US"',
                    reality: 'Physical presence is not the only trigger. US-source income, US business activities, or US entity ownership can create filing obligations regardless of where you are.',
                  },
                  {
                    myth: '"An LLC means no taxes"',
                    reality: 'An LLC is a legal structure, not a tax exemption. Depending on how it\'s taxed (disregarded entity, partnership, or corporation), and the nature of income, taxes may be owed.',
                  },
                  {
                    myth: '"The tax treaty eliminates all US taxes"',
                    reality: 'Tax treaties reduce or modify tax obligations—they don\'t eliminate them entirely. Proper documentation and filings may still be required.',
                  },
                  {
                    myth: '"W-8BEN means no withholding"',
                    reality: 'W-8BEN establishes foreign status and may allow reduced treaty rates, but some income types still have withholding. The form itself doesn\'t eliminate all withholding.',
                  },
                  {
                    myth: '"I can ignore the IRS if I\'m overseas"',
                    reality: 'The IRS has international enforcement mechanisms. Unfiled returns can result in penalties, and certain banks report account holder information under FATCA.',
                  },
                ] : [
                  {
                    myth: '"ABD\'de değilsem hiçbir şey beyan etmem gerekmez"',
                    reality: 'Fiziksel varlık tek tetikleyici değildir. ABD kaynaklı gelir, ABD iş faaliyetleri veya ABD şirket sahipliği, nerede olursanız olun beyanname yükümlülüğü oluşturabilir.',
                  },
                  {
                    myth: '"LLC vergi yok demek"',
                    reality: 'LLC bir hukuki yapıdır, vergi muafiyeti değildir. Nasıl vergilendirildiğine (disregarded entity, ortaklık veya şirket) ve gelirin niteliğine bağlı olarak vergi borcu doğabilir.',
                  },
                  {
                    myth: '"Vergi anlaşması tüm ABD vergilerini ortadan kaldırır"',
                    reality: 'Vergi anlaşmaları vergi yükümlülüklerini azaltır veya değiştirir—tamamen ortadan kaldırmaz. Uygun belgelendirme ve beyannameler hâlâ gerekebilir.',
                  },
                  {
                    myth: '"W-8BEN stopaj yok demek"',
                    reality: 'W-8BEN yabancı statüsünü belirler ve indirimli anlaşma oranlarına izin verebilir, ancak bazı gelir türlerinde hâlâ stopaj vardır. Formun kendisi tüm stopajı ortadan kaldırmaz.',
                  },
                  {
                    myth: '"Yurtdışındaysam IRS\'i görmezden gelebilirim"',
                    reality: 'IRS\'in uluslararası uygulama mekanizmaları vardır. Verilmeyen beyannameler cezalara yol açabilir ve belirli bankalar FATCA kapsamında hesap sahibi bilgilerini bildirir.',
                  },
                ]).map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-red-700 mb-2">❌ {item.myth}</h3>
                    <p className="text-gray-700 text-sm">
                      <strong className="text-green-700">✓ {isEnglish ? 'Reality:' : 'Gerçek:'}</strong> {item.reality}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: FAQ */}
            <section id="sss" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Frequently Asked Questions' : '6. Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    q: 'I formed a US LLC but have no US income yet. Do I need to file anything?',
                    a: 'Potentially yes. Even with no income, certain informational returns may be required (e.g., Form 5472 for foreign-owned disregarded entities). State annual reports may also be due. Consult a tax professional.',
                  },
                  {
                    q: 'My US client is asking for a W-9 but I\'m in Turkey. What do I do?',
                    a: 'If you\'re a Turkish citizen/resident without US tax status, you should provide a W-8BEN (individual) or W-8BEN-E (entity) instead. Explain to the client that W-9 is for US persons only.',
                  },
                  {
                    q: 'What happens if I don\'t provide any tax form?',
                    a: 'The payer may apply 24% backup withholding on your payments, or refuse to pay you until documentation is provided.',
                  },
                  {
                    q: 'Do I need an ITIN if I have an LLC with an EIN?',
                    a: 'Not necessarily. The EIN is for the LLC. You may need an ITIN personally if you have individual US tax obligations, but many non-resident LLC owners don\'t need one initially.',
                  },
                  {
                    q: 'How does the US-Turkey tax treaty help me?',
                    a: 'It may reduce withholding rates on certain income (dividends, interest, royalties), exempt business profits if you don\'t have a US permanent establishment, and prevent double taxation. You typically need to claim treaty benefits on your tax forms.',
                  },
                  {
                    q: 'Can I do my US taxes myself?',
                    a: 'International tax situations are complex. While simple situations may be manageable, most non-resident business owners benefit from working with a CPA or tax attorney experienced in cross-border taxation.',
                  },
                ] : [
                  {
                    q: 'ABD LLC kurdum ama henüz ABD gelirim yok. Beyanname vermem gerekir mi?',
                    a: 'Muhtemelen evet. Gelir olmasa bile belirli bilgi beyannameleri gerekebilir (örn. yabancı sermayeli disregarded entity\'ler için Form 5472). Eyalet yıllık raporları da vadesi gelebilir. Bir vergi uzmanına danışın.',
                  },
                  {
                    q: 'ABD\'li müşterim W-9 istiyor ama Türkiye\'deyim. Ne yapmalıyım?',
                    a: 'ABD vergi statüsü olmayan bir Türk vatandaşı/mukimi iseniz, bunun yerine W-8BEN (bireysel) veya W-8BEN-E (şirket) sağlamalısınız. Müşteriye W-9\'un yalnızca ABD kişileri için olduğunu açıklayın.',
                  },
                  {
                    q: 'Hiçbir vergi formu sağlamazsam ne olur?',
                    a: 'Ödeyici ödemelerinize %24 yedek stopaj uygulayabilir veya belge sağlanana kadar size ödeme yapmayı reddedebilir.',
                  },
                  {
                    q: 'EIN\'li bir LLC\'m varsa ITIN\'e ihtiyacım var mı?',
                    a: 'Zorunlu değil. EIN LLC içindir. Bireysel ABD vergi yükümlülükleriniz varsa kişisel olarak ITIN\'e ihtiyacınız olabilir, ancak birçok yabancı LLC sahibinin başlangıçta buna ihtiyacı yoktur.',
                  },
                  {
                    q: 'ABD-Türkiye vergi anlaşması bana nasıl yardımcı olur?',
                    a: 'Belirli gelirlerden (temettüler, faiz, telif hakları) stopaj oranlarını azaltabilir, ABD\'de daimi işyeriniz yoksa ticari kârları muaf tutabilir ve çifte vergilendirmeyi önleyebilir. Genellikle vergi formlarınızda anlaşma avantajlarını talep etmeniz gerekir.',
                  },
                  {
                    q: 'ABD vergilerimi kendim yapabilir miyim?',
                    a: 'Uluslararası vergi durumları karmaşıktır. Basit durumlar yönetilebilir olsa da, çoğu yabancı işletme sahibi sınır ötesi vergilendirmede deneyimli bir mali müşavir veya vergi avukatıyla çalışmaktan fayda görür.',
                  },
                ]).map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4">
                      <h3 className="font-semibold text-black">{faq.q}</h3>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-gray-700 text-sm">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Sources */}
            <section id="kaynaklar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. Sources & Official Links' : '7. Kaynaklar ve Resmi Bağlantılar'}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/forms-pubs/about-form-w-9" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Form W-9
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Official W-9 instructions' : 'Resmi W-9 talimatları'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/forms-pubs/about-form-w-8-ben" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Form W-8BEN
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Certificate of Foreign Status for individuals' : 'Bireyler için Yabancı Statüsü Belgesi'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/forms-pubs/about-form-w-8-ben-e" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Form W-8BEN-E
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Certificate of Foreign Status for entities' : 'Şirketler için Yabancı Statüsü Belgesi'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/individuals/international-taxpayers/tax-treaties" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Tax Treaties
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'US tax treaty information including Turkey' : 'Türkiye dahil ABD vergi anlaşması bilgileri'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/individuals/international-taxpayers/taxpayer-identification-numbers-tin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Taxpayer Identification Numbers
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'EIN, SSN, ITIN explained' : 'EIN, SSN, ITIN açıklaması'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/businesses/corporations/foreign-account-tax-compliance-act-fatca" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – FATCA Information
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Foreign Account Tax Compliance Act' : 'Yabancı Hesap Vergi Uyum Yasası'}</p>
                  </div>
                </div>
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
                <Link href={`/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Must-have legal documents for US business' : 'ABD\'de iş için gerekli hukuki belgeler'}</p>
                </Link>
                <Link href={`/${lang}/checklists/w8-w9-karar-haritasi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'W-8/W-9 Decision Map' : 'W-8/W-9 Karar Haritası'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Quick reference for which form to use' : 'Hangi formu kullanacağınıza hızlı referans'}</p>
                </Link>
                <Link href={`/${lang}/library`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Legal Library' : 'Hukuk Kütüphanesi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Browse all guides and resources' : 'Tüm rehber ve kaynaklara göz atın'}</p>
                </Link>
              </div>
            </section>

            {/* Contributing Attorney */}
            <AuthorBox lang={lang} authorId="zeynep-moore" className="mb-10" />

            {/* Final Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute tax, legal, or financial advice. Tax laws are complex and change frequently. The information provided may not reflect current law or IRS guidance. Always consult a qualified CPA, tax attorney, or enrolled agent for advice specific to your situation. EchoLegal is not a law firm, accounting firm, or tax advisory service.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi, hukuki veya mali danışmanlık teşkil etmez. Vergi yasaları karmaşıktır ve sık sık değişir. Sağlanan bilgiler güncel yasayı veya IRS rehberliğini yansıtmayabilir. Kendi durumunuza özgü tavsiye için mutlaka uzman bir mali müşavir veya vergi avukatına danışın. EchoLegal bir hukuk bürosu, muhasebe firması veya vergi danışmanlık hizmeti değildir.'}
              </p>
            </div>
          </article>
        </main>

      </div>
    </>
  )
}
