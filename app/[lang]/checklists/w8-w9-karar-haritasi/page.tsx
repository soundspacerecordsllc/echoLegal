// app/[lang]/checklists/w8-w9-karar-haritasi/page.tsx
// Interactive W-8 vs W-9 Decision Tool - Big-Law Quality Legal Encyclopedia Article

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import W8W9DecisionTool from '@/components/W8W9DecisionTool'
import AuthorBox from '@/components/AuthorBox'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'w8-w9-karar-haritasi',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-chk-00004',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/checklists/${PAGE_META.slug}`

  return {
    title: isEnglish
      ? 'W-8 or W-9? Interactive Decision Tool & Complete Guide | EchoLegal'
      : 'W-8 mi W-9 mu? Etkileşimli Karar Aracı ve Tam Rehber | EchoLegal',
    description: isEnglish
      ? 'Interactive tool to determine which US tax form you need: W-9, W-8BEN, or W-8BEN-E. Comprehensive guide covering US person status, beneficial owner rules, treaty benefits, and FATCA compliance.'
      : 'Hangi ABD vergi formuna ihtiyacınız olduğunu belirlemek için etkileşimli araç: W-9, W-8BEN veya W-8BEN-E. ABD kişisi statüsü, gerçek hak sahibi kuralları, anlaşma avantajları ve FATCA uyumunu kapsayan kapsamlı rehber.',
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/checklists/${PAGE_META.slug}`,
        tr: `${SITE_URL}/tr/checklists/${PAGE_META.slug}`,
      },
    },
    openGraph: {
      title: isEnglish
        ? 'W-8 or W-9? Interactive Decision Tool'
        : 'W-8 mi W-9 mu? Etkileşimli Karar Aracı',
      description: isEnglish
        ? 'Determine which US tax form you need with our interactive tool. Covers W-9, W-8BEN, and W-8BEN-E.'
        : 'Etkileşimli aracımızla hangi ABD vergi formuna ihtiyacınız olduğunu belirleyin.',
      type: 'article',
      url: url,
    },
    other: {
      'citation_title': isEnglish ? 'W-8/W-9 Decision Map' : 'W-8/W-9 Karar Haritası',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
      'citation_lastmod': '2026/01/25',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
      'citation_keywords': 'w-8, w-9, tax-form, decision-map',
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function W8W9DecisionMapPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/checklists/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'W-8/W-9 Decision Map' : 'W-8/W-9 Karar Haritası'

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'W-8 or W-9? Complete Decision Guide for International Entrepreneurs'
      : 'W-8 mi W-9 mu? Uluslararası Girişimciler İçin Tam Karar Rehberi',
    author: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: '2026-01-25',
    dateModified: '2026-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/checklists/w8-w9-karar-haritasi`,
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
        name: isEnglish ? 'Checklists' : 'Kontrol Listeleri',
        item: `https://echo-legal.com/${lang}/checklists`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish ? 'W-8 vs W-9 Decision Tool' : 'W-8 W-9 Karar Aracı',
        item: `https://echo-legal.com/${lang}/checklists/w8-w9-karar-haritasi`,
      },
    ],
  }

  // FAQ structured data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isEnglish
          ? 'What is the difference between W-8 and W-9?'
          : 'W-8 ve W-9 arasındaki fark nedir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'W-9 is for US persons (citizens, residents, US entities) to certify their taxpayer identification number. W-8 forms (W-8BEN for individuals, W-8BEN-E for entities) are for foreign persons to establish their non-US status and potentially claim tax treaty benefits.'
            : 'W-9, ABD kişilerinin (vatandaşlar, mukimler, ABD şirketleri) vergi kimlik numaralarını onaylaması içindir. W-8 formları (bireyler için W-8BEN, şirketler için W-8BEN-E) yabancı kişilerin ABD dışı statülerini belirlemesi ve potansiyel olarak vergi anlaşması avantajlarını talep etmesi içindir.',
        },
      },
      {
        '@type': 'Question',
        name: isEnglish
          ? 'Do I need a W-9 for my US LLC if I am a foreign owner?'
          : 'Yabancı sahipsem ABD LLC için W-9 gerekir mi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'Yes. A US LLC is a US entity regardless of who owns it. The LLC provides a W-9 using its EIN. Your personal status as a foreign owner remains separate from the entity\'s US status.'
            : 'Evet. ABD LLC, kimin sahibi olduğuna bakılmaksızın bir ABD tüzel kişisidir. LLC, EIN\'ini kullanarak W-9 sağlar. Yabancı sahip olarak kişisel statünüz, tüzel kişinin ABD statüsünden ayrı kalır.',
        },
      },
      {
        '@type': 'Question',
        name: isEnglish
          ? 'What happens if I provide the wrong form?'
          : 'Yanlış form verirsem ne olur?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'Providing the wrong form can result in incorrect withholding (24% backup withholding if W-9 is required but not provided, or 30% withholding if foreign status is not properly documented). It may also trigger IRS scrutiny and require amended filings.'
            : 'Yanlış form vermek yanlış stopaja yol açabilir (W-9 gerekliyse ancak sağlanmazsa %24 yedek stopaj veya yabancı statü düzgün belgelenmezse %30 stopaj). Ayrıca IRS incelemesini tetikleyebilir ve değiştirilmiş beyannameler gerektirebilir.',
        },
      },
    ],
  }

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JsonLdScript data={[jsonLd, breadcrumbJsonLd, faqJsonLd]} />
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">
            {isEnglish ? 'Home' : 'Ana Sayfa'}
          </Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/checklists`} className="hover:text-black">
            {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
          </Link>
          <span className="mx-2">→</span>
          <span className="text-black">W-8 / W-9</span>
        </nav>

        <article>
          {/* Header */}
          <header className="mb-10">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Interactive Tool' : 'Etkileşimli Araç'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {isEnglish ? 'W-8 or W-9? Decision Tool' : 'W-8 mi W-9 mu? Karar Aracı'}
            </h1>

            <InstitutionalBadge lang={lang} jurisdictions={['US', 'TR']} lastReviewedAt="2026-01-25" className="mb-6" />

            <p className="text-lg text-gray-600 leading-relaxed">
              {isEnglish
                ? 'Use this interactive tool to determine whether you need Form W-9, W-8BEN, or W-8BEN-E. Then explore our comprehensive guide below covering definitions, special cases, and common mistakes.'
                : 'W-9, W-8BEN veya W-8BEN-E Formuna ihtiyacınız olup olmadığını belirlemek için bu etkileşimli aracı kullanın. Ardından aşağıdaki tanımları, özel durumları ve yaygın hataları kapsayan kapsamlı rehberimizi inceleyin.'}
            </p>
          </header>

          {/* Executive Overview */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-bold text-black mb-3">
              {isEnglish ? 'What This Tool Does' : 'Bu Araç Ne Yapar'}
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                {isEnglish
                  ? 'Helps determine which IRS form applies to your situation'
                  : 'Durumunuz için hangi IRS formunun geçerli olduğunu belirlemeye yardımcı olur'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                {isEnglish
                  ? 'Provides specific guidance based on your answers'
                  : 'Cevaplarınıza göre özel rehberlik sağlar'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                {isEnglish
                  ? 'Explains the implications of each form'
                  : 'Her formun etkilerini açıklar'}
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>{isEnglish ? 'What This Tool Does NOT Do:' : 'Bu Araç Ne YAPMAZ:'}</strong>{' '}
                {isEnglish
                  ? 'This is not tax advice. Complex situations require consultation with a qualified tax professional.'
                  : 'Bu vergi tavsiyesi değildir. Karmaşık durumlar nitelikli bir vergi uzmanına danışmayı gerektirir.'}
              </p>
            </div>
          </section>

          {/* Critical Disclaimer */}
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-5 mb-10">
            <p className="text-sm text-amber-900">
              <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
              {isEnglish
                ? 'This tool provides general guidance only. Tax situations can be complex, and many factors affect the correct form choice. The information provided does not constitute tax or legal advice. Consult a qualified CPA or tax attorney for guidance specific to your situation.'
                : 'Bu araç yalnızca genel rehberlik sağlar. Vergi durumları karmaşık olabilir ve birçok faktör doğru form seçimini etkiler. Sağlanan bilgiler vergi veya hukuki tavsiye teşkil etmez. Durumunuza özel rehberlik için nitelikli bir mali müşavir veya vergi avukatına danışın.'}
            </p>
          </div>

          {/* Interactive Decision Tool */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Interactive Decision Tool' : 'Etkileşimli Karar Aracı'}
            </h2>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-8">
              <W8W9DecisionTool lang={lang} />
            </div>
          </section>

          {/* Divider */}
          <div className="border-t-2 border-gray-100 my-12" />

          {/* Deep Content: Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Key Definitions' : 'Temel Tanımlar'}
            </h2>

            <div className="space-y-6">
              {/* US Person */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
                <h3 className="font-bold text-blue-900 mb-2">
                  {isEnglish ? '"US Person" (IRC §7701(a)(30))' : '"ABD Kişisi" (IRC §7701(a)(30))'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish ? 'A "US person" includes:' : '"ABD kişisi" şunları içerir:'}
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>
                    {isEnglish
                      ? 'US citizens (including those living abroad)'
                      : 'ABD vatandaşları (yurtdışında yaşayanlar dahil)'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'US resident aliens (green card holders or substantial presence test)'
                      : 'ABD\'de mukim yabancılar (yeşil kart sahipleri veya önemli varlık testi)'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Domestic partnerships and corporations'
                      : 'Yurtiçi ortaklıklar ve şirketler'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'LLCs formed in any US state'
                      : 'Herhangi bir ABD eyaletinde kurulan LLC\'ler'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Estates and trusts subject to US tax'
                      : 'ABD vergisine tabi mülkler ve tröstler'}
                  </li>
                </ul>
              </div>

              {/* Beneficial Owner */}
              <div className="bg-green-50 border-l-4 border-green-500 p-5">
                <h3 className="font-bold text-green-900 mb-2">
                  {isEnglish ? '"Beneficial Owner"' : '"Gerçek Hak Sahibi"'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? 'The beneficial owner is the person or entity that owns the income and has the right to claim any applicable tax benefits. This is distinct from a nominee, agent, or intermediary who receives income on behalf of another.'
                    : 'Gerçek hak sahibi, gelirin sahibi olan ve geçerli vergi avantajlarını talep etme hakkına sahip olan kişi veya kuruluştur. Bu, başka biri adına gelir alan aday, acente veya aracıdan farklıdır.'}
                </p>
              </div>

              {/* Withholding Agent */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
                <h3 className="font-bold text-purple-900 mb-2">
                  {isEnglish ? '"Withholding Agent"' : '"Stopaj Acentesi"'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? 'Any US person (or foreign person with US-source income) who has control, receipt, custody, disposal, or payment of an amount subject to withholding. This includes companies paying contractors, platforms paying creators, and financial institutions paying interest.'
                    : 'Stopaja tabi bir tutar üzerinde kontrol, alım, vesayet, tasarruf veya ödeme yetkisi olan herhangi bir ABD kişisi (veya ABD kaynaklı geliri olan yabancı kişi). Bu, yüklenicilere ödeme yapan şirketleri, içerik üreticilerine ödeme yapan platformları ve faiz ödeyen finansal kuruluşları içerir.'}
                </p>
              </div>

              {/* Backup Withholding */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5">
                <h3 className="font-bold text-amber-900 mb-2">
                  {isEnglish ? '"Backup Withholding"' : '"Yedek Stopaj"'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? 'A 24% withholding applied when a payee fails to provide a correct taxpayer identification number or properly certify their status. This is a compliance mechanism—not a final tax. The withheld amounts can be claimed as a credit when filing a tax return.'
                    : 'Bir alacaklı doğru vergi kimlik numarası sağlamadığında veya statüsünü uygun şekilde onaylamadığında uygulanan %24 stopaj. Bu bir uyum mekanizmasıdır—nihai vergi değildir. Stopaj edilen tutarlar vergi beyannamesi verirken kredi olarak talep edilebilir.'}
                </p>
              </div>

              {/* FATCA */}
              <div className="bg-red-50 border-l-4 border-red-500 p-5">
                <h3 className="font-bold text-red-900 mb-2">
                  {isEnglish ? 'FATCA Status' : 'FATCA Statüsü'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? 'The Foreign Account Tax Compliance Act (FATCA) requires foreign financial institutions to report on US account holders and requires foreign entities receiving US payments to classify themselves for Chapter 4 purposes. This is why W-8BEN-E is more complex than W-8BEN.'
                    : 'Yabancı Hesap Vergi Uyum Yasası (FATCA), yabancı finans kuruluşlarının ABD hesap sahipleri hakkında rapor vermesini ve ABD ödemeleri alan yabancı kuruluşların Bölüm 4 amaçları için kendilerini sınıflandırmasını gerektirir. W-8BEN-E\'nin W-8BEN\'den daha karmaşık olmasının nedeni budur.'}
                </p>
              </div>
            </div>
          </section>

          {/* Form Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Form Comparison' : 'Form Karşılaştırması'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold">
                      {isEnglish ? 'Criteria' : 'Kriter'}
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-bold text-blue-700">
                      W-9
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-bold text-green-700">
                      W-8BEN
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-bold text-purple-700">
                      W-8BEN-E
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">
                      {isEnglish ? 'Who uses it' : 'Kim kullanır'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'US persons' : 'ABD kişileri'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'Foreign individuals' : 'Yabancı bireyler'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'Foreign entities' : 'Yabancı şirketler'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">
                      {isEnglish ? 'Form length' : 'Form uzunluğu'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      1 {isEnglish ? 'page' : 'sayfa'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      3 {isEnglish ? 'pages' : 'sayfa'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      30+ {isEnglish ? 'pages' : 'sayfa'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">
                      {isEnglish ? 'Validity period' : 'Geçerlilik süresi'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'Until info changes' : 'Bilgi değişene kadar'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      3 {isEnglish ? 'years' : 'yıl'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      3 {isEnglish ? 'years' : 'yıl'}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">
                      {isEnglish ? 'ID required' : 'Gerekli kimlik'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">SSN / EIN</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'Foreign TIN' : 'Yabancı TIN'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'Foreign TIN + GIIN (if applicable)' : 'Yabancı TIN + GIIN (varsa)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">
                      {isEnglish ? 'Treaty claims' : 'Anlaşma talepleri'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">N/A</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'Part II' : 'Bölüm II'}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {isEnglish ? 'Part III' : 'Bölüm III'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Special Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Special & Edge Cases' : 'Özel ve Sınır Durumları'}
            </h2>

            <div className="space-y-4">
              {/* US LLC owned by foreigner */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-red-50 px-5 py-4">
                  <h3 className="font-bold text-red-900">
                    {isEnglish
                      ? 'US LLC Owned by Non-US Person'
                      : 'ABD Dışından Kişinin Sahip Olduğu ABD LLC'}
                  </h3>
                </div>
                <div className="px-5 py-4">
                  <p className="text-gray-700 mb-3">
                    {isEnglish
                      ? 'This is one of the most common confusion points. A US LLC is a US entity—regardless of who owns it. The LLC provides a W-9 using its EIN.'
                      : 'Bu en yaygın karışıklık noktalarından biridir. ABD LLC bir ABD tüzel kişisidir—kimin sahibi olduğuna bakılmaksızın. LLC, EIN\'ini kullanarak W-9 sağlar.'}
                  </p>
                  <p className="text-gray-700">
                    <strong>{isEnglish ? 'Example:' : 'Örnek:'}</strong>{' '}
                    {isEnglish
                      ? 'Ali, a Turkish citizen living in Istanbul, forms a Wyoming LLC for his software consulting business. When his US client asks for tax documentation, the LLC provides a W-9 with the LLC\'s EIN. Ali personally remains a non-US person.'
                      : 'İstanbul\'da yaşayan Türk vatandaşı Ali, yazılım danışmanlık işi için Wyoming LLC kurar. ABD\'li müşterisi vergi belgesi istediğinde, LLC, LLC\'nin EIN\'i ile W-9 sağlar. Ali kişisel olarak ABD kişisi olmayan statüsünde kalır.'}
                  </p>
                </div>
              </div>

              {/* Disregarded entity */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-purple-50 px-5 py-4">
                  <h3 className="font-bold text-purple-900">
                    {isEnglish
                      ? 'Disregarded Entities'
                      : 'Disregarded Entity (Yok Sayılan Tüzel Kişi)'}
                  </h3>
                </div>
                <div className="px-5 py-4">
                  <p className="text-gray-700 mb-3">
                    {isEnglish
                      ? 'A single-member LLC that doesn\'t elect corporate taxation is a "disregarded entity" for tax purposes. For W-8/W-9 purposes, you still look at the entity\'s place of formation, not the owner.'
                      : 'Kurumsal vergilendirme seçmeyen tek üyeli LLC, vergi açısından "yok sayılan tüzel kişi"dir. W-8/W-9 amaçları için, sahibine değil tüzel kişinin kuruluş yerine bakarsınız.'}
                  </p>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'A US LLC (even as a disregarded entity) is a US person → W-9. A foreign entity owned by a US person → W-8BEN-E (the entity provides the form).'
                      : 'ABD LLC (yok sayılan tüzel kişi olarak bile) ABD kişisidir → W-9. ABD kişisinin sahip olduğu yabancı tüzel kişi → W-8BEN-E (tüzel kişi formu sağlar).'}
                  </p>
                </div>
              </div>

              {/* US citizen abroad */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-blue-50 px-5 py-4">
                  <h3 className="font-bold text-blue-900">
                    {isEnglish ? 'US Citizen Living Abroad' : 'Yurtdışında Yaşayan ABD Vatandaşı'}
                  </h3>
                </div>
                <div className="px-5 py-4">
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'US citizenship follows you everywhere. A US citizen is always a US person for tax purposes, regardless of where they live or how long they\'ve been abroad. US citizens provide W-9, not W-8 forms.'
                      : 'ABD vatandaşlığı sizi her yere takip eder. ABD vatandaşı, nerede yaşadığına veya ne kadar süredir yurtdışında olduğuna bakılmaksızın vergi açısından her zaman ABD kişisidir. ABD vatandaşları W-8 değil W-9 sağlar.'}
                  </p>
                </div>
              </div>

              {/* Treaty claims */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-5 py-4">
                  <h3 className="font-bold text-green-900">
                    {isEnglish
                      ? 'Tax Treaty Benefits (US-Turkey)'
                      : 'Vergi Anlaşması Avantajları (ABD-Türkiye)'}
                  </h3>
                </div>
                <div className="px-5 py-4">
                  <p className="text-gray-700 mb-3">
                    {isEnglish
                      ? 'The US-Turkey tax treaty may reduce withholding rates on certain types of income. To claim these benefits, you must complete the treaty section of the W-8BEN or W-8BEN-E form.'
                      : 'ABD-Türkiye vergi anlaşması, belirli gelir türlerinden stopaj oranlarını azaltabilir. Bu avantajları talep etmek için W-8BEN veya W-8BEN-E formunun anlaşma bölümünü doldurmalısınız.'}
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                    <li>
                      {isEnglish
                        ? 'Dividends: Generally 15% (reduced from 30%)'
                        : 'Temettüler: Genellikle %15 (%30\'dan indirilmiş)'}
                    </li>
                    <li>
                      {isEnglish
                        ? 'Interest: 10-15% (depending on type)'
                        : 'Faiz: %10-15 (türüne bağlı)'}
                    </li>
                    <li>{isEnglish ? 'Royalties: 10%' : 'Telif hakları: %10'}</li>
                    <li>
                      {isEnglish
                        ? 'Business profits: 0% if no US permanent establishment'
                        : 'Ticari karlar: ABD\'de daimi işyeri yoksa %0'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Common Mistakes to Avoid' : 'Kaçınılması Gereken Yaygın Hatalar'}
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistakeEn: 'Providing W-8BEN when you have a US LLC',
                  mistakeTr: 'ABD LLC\'niz varken W-8BEN vermek',
                  correctionEn:
                    'The US LLC is a US person and needs W-9. Your personal foreign status doesn\'t change the entity\'s status.',
                  correctionTr:
                    'ABD LLC bir ABD kişisidir ve W-9\'a ihtiyacı vardır. Kişisel yabancı statünüz tüzel kişinin statüsünü değiştirmez.',
                },
                {
                  mistakeEn: 'Using an old or expired W-8 form',
                  mistakeTr: 'Eski veya süresi dolmuş W-8 formu kullanmak',
                  correctionEn:
                    'W-8 forms expire after 3 years. Ensure you\'re using the current version and that it hasn\'t expired.',
                  correctionTr:
                    'W-8 formlarının süresi 3 yıl sonra dolar. Güncel sürümü kullandığınızdan ve süresinin dolmadığından emin olun.',
                },
                {
                  mistakeEn: 'Leaving the foreign TIN blank',
                  mistakeTr: 'Yabancı TIN\'i boş bırakmak',
                  correctionEn:
                    'While not always legally required, providing your foreign tax ID (like Turkish TC Kimlik No) strengthens your documentation.',
                  correctionTr:
                    'Her zaman yasal olarak gerekli olmasa da, yabancı vergi kimliğinizi (Türk TC Kimlik No gibi) sağlamak belgelerinizi güçlendirir.',
                },
                {
                  mistakeEn: 'Claiming treaty benefits without understanding requirements',
                  mistakeTr: 'Gereksinimleri anlamadan anlaşma avantajları talep etmek',
                  correctionEn:
                    'Treaty benefits have specific conditions. Incorrect claims can trigger IRS scrutiny. Consult a professional if unsure.',
                  correctionTr:
                    'Anlaşma avantajlarının özel koşulları vardır. Yanlış talepler IRS incelemesini tetikleyebilir. Emin değilseniz bir uzmana danışın.',
                },
                {
                  mistakeEn: 'Not updating forms when circumstances change',
                  mistakeTr: 'Koşullar değiştiğinde formları güncellememek',
                  correctionEn:
                    'If you become a US resident, form a new entity, or circumstances change, you must provide updated forms.',
                  correctionTr:
                    'ABD mukimi olursanız, yeni tüzel kişi kurarsanız veya koşullar değişirse güncellenmiş formlar sağlamalısınız.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-lg">✗</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-red-800 mb-1">
                      {isEnglish ? item.mistakeEn : item.mistakeTr}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="text-green-700 font-medium">✓ </span>
                      {isEnglish ? item.correctionEn : item.correctionTr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}
            </h2>

            <div className="space-y-4">
              {[
                {
                  qEn: 'My client is insisting I provide a W-9, but I\'m not a US person. What should I do?',
                  qTr: 'Müşterim W-9 vermemi ısrar ediyor ama ABD kişisi değilim. Ne yapmalıyım?',
                  aEn: 'Politely explain that W-9 is specifically for US persons, and as a foreign person, you should provide W-8BEN (individual) or W-8BEN-E (entity). You can reference IRS instructions for these forms. If they insist incorrectly, they may not understand the rules—consider providing written explanation or suggesting they consult their accountant.',
                  aTr: 'Kibarca W-9\'un özellikle ABD kişileri için olduğunu ve yabancı bir kişi olarak W-8BEN (bireysel) veya W-8BEN-E (şirket) sağlamanız gerektiğini açıklayın. Bu formlar için IRS talimatlarına referans verebilirsiniz. Yanlış bir şekilde ısrar ederlerse, kuralları anlamıyor olabilirler—yazılı açıklama sağlamayı veya muhasebecilerine danışmalarını önermeyi düşünün.',
                },
                {
                  qEn: 'I have both a US LLC and provide personal services. Which form do I use?',
                  qTr: 'Hem ABD LLC\'m var hem de kişisel hizmetler sunuyorum. Hangi formu kullanmalıyım?',
                  aEn: 'It depends on who is receiving the payment. If the US LLC is the service provider, the LLC provides W-9. If you personally (not through the LLC) are providing services, you may need W-8BEN. Many contractors invoice through their LLC to simplify this.',
                  aTr: 'Ödemeyi kimin aldığına bağlıdır. Hizmet sağlayıcı ABD LLC ise, LLC W-9 sağlar. Kişisel olarak (LLC aracılığıyla değil) hizmet sağlıyorsanız, W-8BEN\'e ihtiyacınız olabilir. Birçok yüklenici bunu basitleştirmek için LLC\'leri aracılığıyla fatura keser.',
                },
                {
                  qEn: 'How do I get an EIN for my US LLC to put on the W-9?',
                  qTr: 'W-9\'a koymak için ABD LLC\'m için nasıl EIN alırım?',
                  aEn: 'Apply online at irs.gov (if you have an SSN/ITIN) or by mail/fax using Form SS-4. Non-residents without SSN typically use the fax method, which takes 4-6 weeks.',
                  aTr: 'irs.gov\'da çevrimiçi başvurun (SSN/ITIN\'iniz varsa) veya SS-4 Formunu kullanarak posta/faks ile başvurun. SSN\'siz yabancılar genellikle 4-6 hafta süren faks yöntemini kullanır.',
                },
                {
                  qEn: 'What is the penalty for providing the wrong form?',
                  qTr: 'Yanlış form vermenin cezası nedir?',
                  aEn: 'Consequences can include incorrect withholding (24% backup withholding or 30% FDAP withholding), requirement to file amended forms, potential penalties for incorrect certifications, and IRS scrutiny. The payer may also face penalties for not obtaining correct documentation.',
                  aTr: 'Sonuçlar arasında yanlış stopaj (%24 yedek stopaj veya %30 FDAP stopajı), değiştirilmiş form verme zorunluluğu, yanlış onaylar için potansiyel cezalar ve IRS incelemesi yer alabilir. Ödeyici de doğru belge almamak için cezalarla karşılaşabilir.',
                },
              ].map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4">
                    <h3 className="font-semibold text-black">{isEnglish ? item.qEn : item.qTr}</h3>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-gray-700 text-sm">{isEnglish ? item.aEn : item.aTr}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Official Sources */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Official Sources & Downloads' : 'Resmi Kaynaklar ve İndirmeler'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Form W-9',
                  url: 'https://www.irs.gov/forms-pubs/about-form-w-9',
                  descEn: 'Request for Taxpayer Identification Number',
                  descTr: 'Vergi Kimlik Numarası Talebi',
                },
                {
                  title: 'Form W-8BEN',
                  url: 'https://www.irs.gov/forms-pubs/about-form-w-8-ben',
                  descEn: 'Certificate of Foreign Status (Individuals)',
                  descTr: 'Yabancı Statüsü Belgesi (Bireyler)',
                },
                {
                  title: 'Form W-8BEN-E',
                  url: 'https://www.irs.gov/forms-pubs/about-form-w-8-ben-e',
                  descEn: 'Certificate of Foreign Status (Entities)',
                  descTr: 'Yabancı Statüsü Belgesi (Şirketler)',
                },
                {
                  title: isEnglish ? 'US-Turkey Tax Treaty' : 'ABD-Türkiye Vergi Anlaşması',
                  url: 'https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents',
                  descEn: 'Full treaty text and technical explanation',
                  descTr: 'Tam anlaşma metni ve teknik açıklama',
                },
              ].map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-black">{source.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {isEnglish ? source.descEn : source.descTr}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-black mb-4">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>
            <div className="space-y-3">
              <Link
                href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <span className="font-medium text-black">
                  {isEnglish
                    ? 'IRS, Taxes & W-8/W-9 Complete Guide'
                    : 'IRS, Vergi ve W-8/W-9 Tam Rehber'}
                </span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
              <Link
                href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <span className="font-medium text-black">
                  {isEnglish
                    ? 'LLC Formation Guide for Turkish Entrepreneurs'
                    : 'Türk Girişimciler İçin LLC Kurma Rehberi'}
                </span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
              <Link
                href={`/${lang}/ein-itin-ssn-farki`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <span className="font-medium text-black">
                  {isEnglish
                    ? 'EIN vs ITIN vs SSN: What\'s the Difference?'
                    : 'EIN, ITIN, SSN: Fark Nedir?'}
                </span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
            </div>
          </section>

          <CiteThisEntry
            lang={lang}
            title={pageTitle}
            url={pageUrl}
            dateModified={PAGE_META.dateModified}
            version={PAGE_META.version}
            citationKey={PAGE_META.citationKey}
            contentType="checklist"
            className="mb-8"
          />

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
      </div>
  )
}
