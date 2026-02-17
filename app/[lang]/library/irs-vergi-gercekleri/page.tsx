// app/[lang]/library/irs-vergi-gercekleri/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateScholarlyArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'

const PAGE_META = {
  slug: 'irs-vergi-gercekleri',
  datePublished: '2025-09-15',
  dateModified: '2026-01-25',
  version: '1.1',
  wordCount: 2400,
  citationKey: 'ecl-gde-00002',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'IRS, Taxes & Form Realities: W-8, W-9, 1099 Explained | EchoLegal'
      : 'IRS, Vergi ve Form Gerçekleri: W-8, W-9, 1099 Açıklamalı | EchoLegal',
    description: isEnglish
      ? 'Understanding US tax forms for non-US entrepreneurs. W-8BEN, W-9, 1099-NEC, and more explained in plain language.'
      : 'ABD dışından girişimcilere yönelik ABD vergi formları rehberi. W-8BEN, W-9, 1099-NEC ve diğer formlar sade bir dille açıklanmıştır.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/library/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/library/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'IRS, Taxes & Form Realities: W-8, W-9, 1099 Explained' : 'IRS, Vergi ve Form Gerçekleri: W-8, W-9, 1099 Açıklamalı',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/09/15',
      'citation_lastmod': '2026/01/25',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function IRSTaxFactsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const primarySources = getPrimarySources('library-irs-vergi-gercekleri', isEnglish ? 'en' : 'tr')

  const forms = [
    {
      name: 'W-8BEN',
      fullName: isEnglish
        ? 'Certificate of Foreign Status of Beneficial Owner'
        : 'Gerçek Hak Sahibinin Yabancı Statüsü Belgesi',
      whoFiles: isEnglish
        ? 'Non-US individuals receiving US-source income'
        : 'ABD kaynaklı gelir alan ABD dışından bireyler',
      purpose: isEnglish
        ? 'Certifies that you are not a US person and claims any applicable tax treaty benefits.'
        : 'ABD mukimi olmadığınızı belgeler ve varsa vergi anlaşması kapsamındaki avantajlardan yararlanmanızı sağlar.',
      whenNeeded: isEnglish
        ? 'When a US company will pay you (as an individual) and needs to know your tax status.'
        : 'Bir ABD şirketi size (birey olarak) ödeme yapacağında ve vergi durumunuzu bilmesi gerektiğinde.',
    },
    {
      name: 'W-8BEN-E',
      fullName: isEnglish
        ? 'Certificate of Status of Beneficial Owner for Entities'
        : 'Tüzel Kişiler İçin Gerçek Hak Sahibi Statüsü Belgesi',
      whoFiles: isEnglish
        ? 'Non-US entities (companies) receiving US-source income'
        : 'ABD kaynaklı gelir alan ABD dışı tüzel kişiler (şirketler)',
      purpose: isEnglish
        ? 'Similar to W-8BEN but for foreign entities like your non-US company.'
        : "W-8BEN ile aynı amaca hizmet eder; ancak bu form yabancı tüzel kişiler (şirketler) için düzenlenmiştir.",
      whenNeeded: isEnglish
        ? 'When your foreign company receives payments from US sources.'
        : 'Yabancı şirketiniz ABD kaynaklarından ödeme aldığında.',
    },
    {
      name: 'W-9',
      fullName: isEnglish
        ? 'Request for Taxpayer Identification Number and Certification'
        : 'Vergi Mükellefi Kimlik Numarası Talebi ve Beyanı',
      whoFiles: isEnglish
        ? 'US persons (citizens, residents, and US entities like LLCs)'
        : "ABD'li kişiler (vatandaşlar, mukimler ve LLC gibi ABD tüzel kişileri)",
      purpose: isEnglish
        ? 'Provides your TIN (SSN or EIN) to the payer for tax reporting purposes.'
        : "Vergi kimlik numaranızı (SSN veya EIN) ödemeyi yapan tarafa bildirmenizi sağlar.",
      whenNeeded: isEnglish
        ? 'When you have a US LLC or are otherwise a "US person" for tax purposes.'
        : "ABD LLC'niz olduğunda veya vergi açısından 'ABD'li kişi' olduğunuzda.",
    },
    {
      name: '1099-NEC',
      fullName: isEnglish
        ? 'Nonemployee Compensation'
        : 'Bağımsız Yüklenici Ödemeleri',
      whoFiles: isEnglish
        ? 'Payers report payments; recipients receive copies'
        : 'Ödeme yapanlar ödemeleri bildirir; alıcılar kopya alır',
      purpose: isEnglish
        ? 'Reports payments of $600 or more to non-employees (contractors).'
        : 'Bağımsız yüklenicilere yapılan 600 ABD doları ve üzeri ödemeleri IRS\'ye bildirir.',
      whenNeeded: isEnglish
        ? 'You\'ll receive this if you\'re paid as a US contractor. Used for tax filing.'
        : 'ABD\'de yüklenici olarak ödeme aldığınızda bu formu alırsınız. Vergi beyannamesi hazırlarken kullanılır.',
    },
    {
      name: '1099-MISC',
      fullName: isEnglish
        ? 'Miscellaneous Information'
        : 'Çeşitli Bilgiler',
      whoFiles: isEnglish
        ? 'Payers report various types of payments'
        : 'Ödeme yapanlar çeşitli ödeme türlerini bildirir',
      purpose: isEnglish
        ? 'Reports other types of income like rents, royalties, prizes, etc.'
        : 'Kira, telif ücreti, ikramiye gibi çeşitli gelir türlerini bildirir.',
      whenNeeded: isEnglish
        ? 'When you receive these types of payments from US sources.'
        : 'ABD kaynaklarından bu tür ödemeler aldığınızda.',
    },
  ]

  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'IRS, Taxes & Form Realities' : 'IRS, Vergi ve Form Gerçekleri'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'IRS, Taxes & Form Realities: W-8, W-9, 1099 Explained' : 'IRS, Vergi ve Form Gerçekleri: W-8, W-9, 1099 Açıklamalı',
    abstractText: isEnglish
      ? 'A plain-language guide to understanding US tax forms for non-US entrepreneurs. Covers W-8BEN, W-9, 1099-NEC, and withholding tax basics.'
      : 'ABD dışından girişimcilere yönelik ABD vergi formları rehberi. W-8BEN, W-9, 1099-NEC ve stopaj vergisi temellerini kapsar.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['irs', 'w-8ben', 'w-9', '1099', 'tax-forms', 'withholding-tax', 'fatca'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['US Tax Forms', 'IRS', 'International Taxation'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JsonLdScript data={[scholarlySchema, breadcrumbSchema]} />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'IRS & Tax Facts' : 'IRS ve Vergi Gerçekleri'}</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Tax Reference' : 'Vergi Referansı'}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
              {pageTitle}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {isEnglish
                ? 'A plain-language guide to understanding US tax forms. W-8, W-9, 1099 forms explained for non-US entrepreneurs working with American businesses.'
                : 'ABD vergi formlarını sade bir dille ele alan başvuru rehberi. ABD şirketleriyle çalışan yabancı girişimciler için W-8, W-9 ve 1099 formları açıklanmıştır.'}
            </p>

            <InstitutionalBadge
              lang={lang}
              jurisdictions={['US']}
              lastReviewedAt={PAGE_META.dateModified}
              className="mb-4"
            />
          </header>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>{isEnglish ? 'Disclaimer:' : 'Uyarı:'}</strong>{' '}
              {isEnglish
                ? 'This guide provides general information for educational purposes only. Tax laws are complex and change frequently. This is not tax advice. Consult a qualified tax professional for your specific situation.'
                : 'Bu rehber yalnızca genel bilgilendirme amacıyla hazırlanmıştır. Vergi mevzuatı karmaşık olup sık değişikliğe uğrar. Burada yer alan bilgiler vergi tavsiyesi niteliği taşımaz. Kendi durumunuza özgü değerlendirme için uzman bir vergi danışmanına başvurun.'}
            </p>
          </div>

          {/* Quick Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Quick Overview: Which Form Do You Need?' : 'Hızlı Bakış: Hangi Forma İhtiyacınız Var?'}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="font-semibold text-black">
                      {isEnglish
                        ? 'You\'re outside the US, receiving payment from a US company:'
                        : 'ABD dışındasınız, ABD şirketinden ödeme alıyorsunuz:'}
                    </p>
                    <p className="text-gray-600">
                      → <strong>W-8BEN</strong> {isEnglish ? '(individual)' : '(birey)'} {isEnglish ? 'or' : 'veya'} <strong>W-8BEN-E</strong> {isEnglish ? '(company)' : '(şirket)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="font-semibold text-black">
                      {isEnglish
                        ? 'You have a US LLC or are a US person:'
                        : 'ABD LLC\'niz var veya ABD\'li bir kişisiniz:'}
                    </p>
                    <p className="text-gray-600">
                      → <strong>W-9</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">📬</span>
                  <div>
                    <p className="font-semibold text-black">
                      {isEnglish
                        ? 'You received contractor payments of $600+ from US source:'
                        : 'ABD kaynağından 600$+ yüklenici ödemesi aldınız:'}
                    </p>
                    <p className="text-gray-600">
                      → {isEnglish ? 'Expect to receive a' : 'Almanız gereken form:'} <strong>1099-NEC</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Forms Detail */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Forms Explained' : 'Formların Açıklaması'}
            </h2>

            <div className="space-y-6">
              {forms.map((form, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded">
                      {form.name}
                    </span>
                    <span className="text-gray-500 text-sm">{form.fullName}</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">
                        {isEnglish ? 'Who files:' : 'Kim doldurur:'}
                      </p>
                      <p className="text-gray-600">{form.whoFiles}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">
                        {isEnglish ? 'Purpose:' : 'Amaç:'}
                      </p>
                      <p className="text-gray-600">{form.purpose}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">
                        {isEnglish ? 'When needed:' : 'Ne zaman gerekli:'}
                      </p>
                      <p className="text-gray-600">{form.whenNeeded}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Common Questions' : 'Sık Sorulan Sorular'}
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish
                    ? 'What if a US company asks for my W-9 but I\'m not in the US?'
                    : 'ABD şirketi W-9 istiyorsa ama ben ABD\'de değilsem ne olur?'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'If you\'re not a US person (citizen, resident, or US entity), you should provide a W-8BEN (for individuals) or W-8BEN-E (for entities) instead. Politely explain that as a non-US person/entity, the appropriate form is W-8.'
                    : 'ABD mukimi, vatandaşı veya ABD tüzel kişisi değilseniz W-9 yerine W-8BEN (bireyler için) veya W-8BEN-E (tüzel kişiler için) sunmalısınız. Karşı tarafa, ABD dışından bir kişi veya kuruluş olarak doğru formun W-8 olduğunu nazikçe belirtin.'}
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish
                    ? 'I have a US LLC. Which form do I use?'
                    : 'ABD LLC\'m var. Hangi formu kullanırım?'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'Your US LLC is considered a US entity, so you would provide a W-9. The LLC will have its own EIN (Employer Identification Number) that goes on the form.'
                    : 'ABD LLC\'niz bir ABD tüzel kişisi olarak kabul edilir, bu nedenle W-9 sağlarsınız. LLC\'nin forma yazılacak kendi EIN\'i (İşveren Kimlik Numarası) olacaktır.'}
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish
                    ? 'What is withholding tax?'
                    : 'Stopaj vergisi nedir?'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'When US companies pay non-US persons, they may be required to withhold (keep back) a percentage of the payment and send it to the IRS. The W-8 forms help establish your status and potentially reduce this withholding based on tax treaties.'
                    : 'ABD şirketleri ABD dışından kişilere ödeme yaptığında, ödemenin bir yüzdesini tutmak (stopaj) ve IRS\'ye göndermek zorunda kalabilirler. W-8 formları durumunuzu belirlemeye ve vergi anlaşmalarına dayanarak bu stopajı potansiyel olarak azaltmaya yardımcı olur.'}
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish
                    ? 'Do I need to file US taxes if I\'m not in the US?'
                    : 'ABD\'de değilsem ABD vergileri beyan etmem gerekir mi?'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'It depends on many factors: the type of income, whether you have a US business presence, tax treaties, and more. This is exactly why you should consult a tax professional who understands international taxation.'
                    : 'Birçok faktöre bağlıdır: gelir türü, ABD\'de iş varlığınız olup olmadığı, vergi anlaşmaları ve daha fazlası. İşte bu yüzden uluslararası vergilendirmeyi anlayan bir vergi uzmanına danışmalısınız.'}
                </p>
              </div>
            </div>
          </section>

          {/* Turkey-US Tax Treaty Note */}
          <section className="mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">
                {isEnglish ? 'Note for Turkish Citizens' : 'Türk Vatandaşları İçin Not'}
              </h3>
              <p className="text-sm text-blue-900 leading-relaxed mb-3">
                {isEnglish
                  ? 'Turkey and the United States have a tax treaty that may affect withholding rates on certain types of income. When completing W-8BEN, you may be able to claim treaty benefits.'
                  : 'Türkiye ve Amerika Birleşik Devletleri arasında belirli gelir türlerinde stopaj oranlarını etkileyebilecek bir vergi anlaşması vardır. W-8BEN doldururken anlaşma avantajlarını talep edebilirsiniz.'}
              </p>
              <p className="text-sm text-blue-900">
                {isEnglish
                  ? 'However, tax treaty benefits are complex and depend on your specific situation. Consult a tax professional before claiming any treaty benefits.'
                  : 'Ancak vergi anlaşması avantajları karmaşıktır ve özel durumunuza bağlıdır. Herhangi bir anlaşma avantajı talep etmeden önce bir vergi uzmanına danışın.'}
              </p>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Key Takeaways' : 'Önemli Çıkarımlar'}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    {isEnglish
                      ? 'W-8 forms are for non-US persons; W-9 is for US persons and entities.'
                      : 'W-8 formları ABD dışından kişiler içindir; W-9 ABD\'li kişiler ve tüzel kişiler içindir.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    {isEnglish
                      ? 'If you have a US LLC, you\'re considered a US entity for these purposes.'
                      : 'ABD LLC\'niz varsa, bu amaçlar için ABD tüzel kişisi olarak kabul edilirsiniz.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    {isEnglish
                      ? '1099 forms report payments; you\'ll receive them from US clients who paid you $600+.'
                      : '1099 formları ödemeleri bildirir; size 600$+ ödeyen ABD müşterilerinden alırsınız.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>
                    {isEnglish
                      ? 'Tax obligations depend on many factors—always consult a professional.'
                      : 'Vergi yükümlülükleri birçok faktöre bağlıdır—her zaman bir uzmana danışın.'}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Product CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              {isEnglish ? 'Need Business Documents?' : 'İş Belgelerine İhtiyacınız Var mı?'}
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
              {isEnglish
                ? 'Our Business Starter Kit includes essential contracts for US business operations.'
                : 'Business Starter Kit\'imiz ABD iş operasyonları için temel sözleşmeleri içerir.'}
            </p>
            <div className="text-center">
              <Link
                href={`/${lang}/legal-kits/business-starter`}
                className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
              >
                {isEnglish ? 'View Business Starter Kit →' : 'Business Starter Kit\'i Görüntüle →'}
              </Link>
            </div>
          </div>

          <PrimarySources sources={primarySources} lang={isEnglish ? 'en' : 'tr'} />

          {/* Related Resources */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/${lang}/library/llc-kurma-rehberi`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-black mb-1">
                  {isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Understanding how to form an LLC in the US.'
                    : 'ABD\'de LLC kurmanın temellerini anlama.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/hukuki-yanilgilar`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-black mb-1">
                  {isEnglish ? 'Common Legal Misconceptions' : 'Sık Yapılan Hukuki Hatalar'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Myths vs. facts about US business and taxes.'
                    : 'ABD işi ve vergileri hakkında mitler ve gerçekler.'}
                </p>
              </Link>
            </div>
          </section>

          {/* Citation Block */}
          <CiteThisEntry
            lang={lang}
            title={isEnglish ? 'IRS, Taxes & Form Realities: W-8, W-9, 1099 Explained' : 'IRS, Vergi ve Form Gerçekleri: W-8, W-9, 1099 Açıklamalı'}
            url={pageUrl}
            version={PAGE_META.version}
            dateModified={PAGE_META.dateModified}
            citationKey={PAGE_META.citationKey}
          />
        </article>
      </main>
  )
}
