// app/[lang]/vergi-kimlik-rehberi/page.tsx
// Tax & ID Hub - Central page for tax and identification-related content

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'vergi-kimlik-rehberi',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-gde-00012',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'US Tax & ID Guide for Turkish Entrepreneurs | EchoLegal'
    : 'Türk Girişimciler İçin ABD Vergi ve Kimlik Rehberi | EchoLegal'

  const description = isEnglish
    ? 'Complete guide to US tax obligations and identification numbers. EIN, ITIN, SSN, W-8, W-9, 1099 forms, tax treaties, and withholding explained for Turkish entrepreneurs.'
    : 'ABD vergi yükümlülükleri ve kimlik numaralarına kapsamlı rehber. Türk girişimciler için EIN, ITIN, SSN, W-8, W-9, 1099 formları, vergi anlaşmaları ve stopaj açıklandı.'

  const url = `${SITE_URL}/${lang}/${PAGE_META.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    other: {
      'citation_title': isEnglish ? 'Tax ID Guide' : 'Vergi Kimlik Rehberi',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
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

export default async function TaxIdHubPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Tax ID Guide' : 'Vergi Kimlik Rehberi'

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Complete guide to US tax obligations and identification numbers for Turkish entrepreneurs.'
      : 'Türk girişimciler için ABD vergi yükümlülükleri ve kimlik numaralarına kapsamlı rehber.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['ein', 'itin', 'ssn', 'tax-id', 'irs'],
    section: 'jurisdictional-guide',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: pageTitle, url: pageUrl },
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEnglish
      ? 'US Tax & ID Guide for Turkish Entrepreneurs'
      : 'Türk Girişimciler İçin ABD Vergi ve Kimlik Rehberi',
    description: isEnglish
      ? 'Complete guide to US tax obligations and identification numbers for Turkish entrepreneurs.'
      : 'Türk girişimciler için ABD vergi yükümlülükleri ve kimlik numaralarına kapsamlı rehber.',
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: `https://echo-legal.com/${lang}/irs-vergiler-ve-w8-w9-gercekleri`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: `https://echo-legal.com/${lang}/ein-itin-ssn-farki`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          url: `https://echo-legal.com/${lang}/1099-vergi-belgeleri`,
        },
      ],
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
        name: isEnglish ? 'Tax & ID Guide' : 'Vergi ve Kimlik Rehberi',
        item: `https://echo-legal.com/${lang}/vergi-kimlik-rehberi`,
      },
    ],
  }

  // Hub content sections
  const sections = {
    taxIds: {
      title: isEnglish ? 'Tax Identification Numbers' : 'Vergi Kimlik Numaraları',
      description: isEnglish
        ? 'Understanding which tax ID you need for your situation.'
        : 'Durumunuz için hangi vergi kimliğine ihtiyacınız olduğunu anlama.',
      items: [
        {
          title: isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN ve SSN Farkları',
          description: isEnglish
            ? 'Which tax identification number do you need? Complete comparison guide.'
            : 'Hangi vergi kimlik numarasına ihtiyacınız var? Kapsamlı karşılaştırma rehberi.',
          href: `/${lang}/ein-itin-ssn-farki`,
          badge: isEnglish ? 'Essential' : 'Temel',
        },
      ],
    },
    taxForms: {
      title: isEnglish ? 'Tax Forms & Documents' : 'Vergi Formları ve Belgeleri',
      description: isEnglish
        ? 'Common tax forms you\'ll encounter working with US clients.'
        : 'ABD müşterileriyle çalışırken karşılaşacağınız yaygın vergi formları.',
      items: [
        {
          title: isEnglish ? 'W-8/W-9 Guide' : 'W-8/W-9 Rehberi',
          description: isEnglish
            ? 'Which form to sign? W-8BEN, W-8BEN-E, or W-9 explained.'
            : 'Hangi formu imzalamalı? W-8BEN, W-8BEN-E veya W-9 açıklandı.',
          href: `/${lang}/irs-vergiler-ve-w8-w9-gercekleri`,
          badge: isEnglish ? 'Most Common' : 'En Yaygın',
        },
        {
          title: isEnglish ? '1099 & Tax Documents' : '1099 ve Vergi Belgeleri',
          description: isEnglish
            ? '1099-NEC, 1099-K, 1042-S forms and what they mean for you.'
            : '1099-NEC, 1099-K, 1042-S formları ve sizin için ne anlama geldiği.',
          href: `/${lang}/1099-vergi-belgeleri`,
          badge: null,
        },
      ],
    },
    taxObligations: {
      title: isEnglish ? 'Tax Obligations' : 'Vergi Yükümlülükleri',
      description: isEnglish
        ? 'Understanding when and what you may owe to the IRS.'
        : 'IRS\'e ne zaman ve ne borçlu olabileceğinizi anlama.',
      items: [
        {
          title: isEnglish ? 'US Sales Tax & Nexus' : 'ABD Satış Vergisi ve Nexus',
          description: isEnglish
            ? 'E-commerce tax obligations, state nexus, and compliance requirements.'
            : 'E-ticaret vergi yükümlülükleri, eyalet nexus ve uyumluluk gereksinimleri.',
          href: `/${lang}/abd-satis-vergisi-rehberi`,
          badge: isEnglish ? 'E-commerce' : 'E-ticaret',
        },
      ],
    },
    payments: {
      title: isEnglish ? 'Receiving Payments' : 'Ödeme Alma',
      description: isEnglish
        ? 'How to receive payments from US clients and platforms.'
        : 'ABD müşterilerinden ve platformlarından nasıl ödeme alınır.',
      items: [
        {
          title: isEnglish ? 'US Bank Account' : 'ABD Banka Hesabı',
          description: isEnglish
            ? 'Opening a US business bank account as a non-resident.'
            : 'Yabancı olarak ABD iş banka hesabı açma.',
          href: `/${lang}/abdde-banka-hesabi-acmak`,
          badge: null,
        },
        {
          title: isEnglish ? 'Stripe, PayPal & Wise' : 'Stripe, PayPal ve Wise',
          description: isEnglish
            ? 'Payment platforms guide for receiving US payments.'
            : 'ABD ödemelerini almak için ödeme platformları rehberi.',
          href: `/${lang}/abd-odemeleri-alma-rehberi`,
          badge: null,
        },
      ],
    },
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JsonLdScript data={[articleSchema, breadcrumbSchema, jsonLd, breadcrumbJsonLd]} />
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'Tax & ID Guide' : 'Vergi ve Kimlik Rehberi'}</span>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
            {isEnglish ? 'Tax & Identification Hub' : 'Vergi ve Kimlik Merkezi'}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            {isEnglish
              ? 'US Tax & Identification Guide'
              : 'ABD Vergi ve Kimlik Rehberi'}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            {isEnglish
              ? 'Everything you need to know about US tax obligations, identification numbers, and compliance requirements for Turkish entrepreneurs doing business with or in the United States.'
              : 'ABD\'de veya ABD ile iş yapan Türk girişimciler için ABD vergi yükümlülükleri, kimlik numaraları ve uyumluluk gereksinimleri hakkında bilmeniz gereken her şey.'}
          </p>

          <InstitutionalBadge
            lang={lang}
            jurisdictions={['US']}
            lastReviewedAt={PAGE_META.dateModified}
            className="mb-8"
          />
        </header>

        {/* Quick Start */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-blue-900 mb-3">{isEnglish ? 'Quick Start: Most Common Questions' : 'Hızlı Başlangıç: En Yaygın Sorular'}</h2>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>
              <span className="font-medium">→</span>{' '}
              {isEnglish ? 'My US client wants a W-9 but I\'m in Turkey:' : 'ABD\'li müşterim W-9 istiyor ama Türkiye\'deyim:'}{' '}
              <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="underline hover:text-blue-900">
                {isEnglish ? 'Read W-8/W-9 Guide' : 'W-8/W-9 Rehberini Oku'}
              </Link>
            </li>
            <li>
              <span className="font-medium">→</span>{' '}
              {isEnglish ? 'I formed a US LLC — what tax ID do I need?' : 'ABD LLC kurdum — hangi vergi kimliğine ihtiyacım var?'}{' '}
              <Link href={`/${lang}/ein-itin-ssn-farki`} className="underline hover:text-blue-900">
                {isEnglish ? 'Read EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}
              </Link>
            </li>
            <li>
              <span className="font-medium">→</span>{' '}
              {isEnglish ? 'I sell online to US customers — do I owe sales tax?' : 'ABD müşterilerine online satış yapıyorum — satış vergisi borcum var mı?'}{' '}
              <Link href={`/${lang}/abd-satis-vergisi-rehberi`} className="underline hover:text-blue-900">
                {isEnglish ? 'Read Sales Tax Guide' : 'Satış Vergisi Rehberini Oku'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Tax IDs */}
          <section>
            <h2 className="text-xl font-bold text-black mb-2">{sections.taxIds.title}</h2>
            <p className="text-gray-600 mb-4">{sections.taxIds.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.taxIds.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    {item.badge && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{item.badge}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Tax Forms */}
          <section>
            <h2 className="text-xl font-bold text-black mb-2">{sections.taxForms.title}</h2>
            <p className="text-gray-600 mb-4">{sections.taxForms.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.taxForms.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    {item.badge && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{item.badge}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Tax Obligations */}
          <section>
            <h2 className="text-xl font-bold text-black mb-2">{sections.taxObligations.title}</h2>
            <p className="text-gray-600 mb-4">{sections.taxObligations.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.taxObligations.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    {item.badge && (
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">{item.badge}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Payments */}
          <section>
            <h2 className="text-xl font-bold text-black mb-2">{sections.payments.title}</h2>
            <p className="text-gray-600 mb-4">{sections.payments.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.payments.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    {item.badge && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">{item.badge}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Related Resources */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Hubs' : 'İlgili Merkezler'}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href={`/${lang}/amerika`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Immigration & Visas' : 'Göçmenlik ve Vizeler'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'US visa pathways and requirements' : 'ABD vize yolları ve gereksinimleri'}</p>
            </Link>
            <Link
              href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'LLC Formation' : 'LLC Kurulumu'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'Step-by-step US LLC guide' : 'Adım adım ABD LLC rehberi'}</p>
            </Link>
            <Link
              href={`/${lang}/contracts`}
              className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'Professional legal documents' : 'Profesyonel hukuki belgeler'}</p>
            </Link>
          </div>
        </section>

        {/* Cite This Entry */}
        <CiteThisEntry
          lang={lang}
          title={pageTitle}
          url={pageUrl}
          dateModified={PAGE_META.dateModified}
          version={PAGE_META.version}
          citationKey={PAGE_META.citationKey}
          contentType="jurisdictional-guide"
          className="mt-12 mb-8"
        />

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-lg p-5">
          <p className="text-xs text-gray-600 leading-relaxed">
            {isEnglish
              ? 'This content is for informational purposes only and does not constitute tax, legal, or financial advice. Tax laws are complex and change frequently. Always consult a qualified CPA, tax attorney, or enrolled agent for advice specific to your situation. EchoLegal is not a law firm, accounting firm, or tax advisory service.'
              : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi, hukuki veya mali danışmanlık teşkil etmez. Vergi yasaları karmaşıktır ve sık sık değişir. Kendi durumunuza özgü tavsiye için mutlaka uzman bir mali müşavir veya vergi avukatına danışın. EchoLegal bir hukuk bürosu, muhasebe firması veya vergi danışmanlık hizmeti değildir.'}
          </p>
        </div>
      </main>
    </>
  )
}
