import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Link from 'next/link'
import JsonLdScript from '@/components/JsonLdScript'
import {
  EncyclopediaAuthorityLevel,
  sortByAuthority,
  validateEncyclopediaEntries,
  formatJurisdictionScope,
  JURISDICTION_SHORT_LABELS,
} from '@/lib/encyclopedia-authority'
import type { EncyclopediaIndexEntry } from '@/lib/encyclopedia-authority'
import type { JurisdictionCode } from '@/lib/jurisdictions'

/**
 * Jurisdiction codes available as filter options on the index page.
 * Order here determines button order in the UI.
 */
const FILTER_OPTIONS: JurisdictionCode[] = ['US', 'US-NY', 'US-CA', 'EU', 'TR']

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Legal Encyclopedia | EchoLegal'
      : 'Hukuki Ansiklopedi | EchoLegal',
    description: isEnglish
      ? 'Browse legal encyclopedia entries covering US business law, contracts, and compliance. Authority-ranked, jurisdiction-tagged.'
      : 'ABD iş hukuku, sözleşmeler ve uyumu kapsayan hukuki ansiklopedi maddelerine göz atın. Otorite sıralamalı, yargı alanı etiketli.',
  }
}

export default async function EncyclopediaPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  // Read jurisdiction filter from ?j= query param.
  // Unknown values are treated as "All" (no filter).
  const rawJ = typeof searchParams.j === 'string' ? searchParams.j : undefined
  const activeFilter = rawJ && FILTER_OPTIONS.includes(rawJ as JurisdictionCode)
    ? (rawJ as JurisdictionCode)
    : null

  const articles: EncyclopediaIndexEntry[] = [
    {
      slug: 'contractor-vs-employee',
      title: isEnglish ? 'Contractor vs Employee' : 'Bağımsız Yüklenici mi, İşçi mi?',
      description: isEnglish
        ? 'Key differences and why classification matters.'
        : 'Temel farklar ve doğru sınıflandırmanın hukuki önemi.',
      readTime: '10 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.FEDERAL_STATUTORY,
      canonicalId: 'ecl-enc-00003',
      jurisdictionScope: ['US'],
    },
    {
      slug: 'what-is-nda',
      title: isEnglish ? 'What is an NDA?' : 'Gizlilik Sözleşmesi (NDA) Nedir?',
      description: isEnglish
        ? 'Everything you need to know about Non-Disclosure Agreements.'
        : 'Gizlilik sözleşmelerinin hukuki niteliği, kapsamı ve uygulamadaki yeri.',
      readTime: '8 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.DOCTRINAL_FRAMEWORK,
      canonicalId: 'ecl-enc-00001',
      jurisdictionScope: ['US', 'US-NY'],
    },
    {
      slug: 'privacy-policy-guide',
      title: isEnglish ? 'Do I Need a Privacy Policy?' : 'Gizlilik Politikası Gerekli mi?',
      description: isEnglish
        ? 'GDPR, CCPA, and KVKK requirements explained.'
        : 'GDPR, CCPA ve KVKK kapsamında yükümlülükleriniz.',
      readTime: '8 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.COMPLIANCE_REGULATORY,
      canonicalId: 'ecl-enc-00004',
      jurisdictionScope: ['US', 'US-CA', 'EU', 'TR'],
    },
    {
      slug: 'freelancer-legal-guide',
      title: isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışanlar İçin Hukuk Rehberi',
      description: isEnglish
        ? 'Essential legal knowledge for freelancers and independent contractors.'
        : 'Serbest çalışanların ve bağımsız yüklenicilerin bilmesi gereken temel hukuki konular.',
      readTime: '12 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.PROCEDURAL_GUIDE,
      canonicalId: 'ecl-enc-00002',
      jurisdictionScope: ['US'],
    },
  ]

  // Validate invariants — throws in dev, returns errors for build
  const validation = validateEncyclopediaEntries(articles)
  if (!validation.valid) {
    throw new Error(
      `Encyclopedia index build failed:\n${validation.errors.join('\n')}`
    )
  }

  // Sort by authority weight, then filter by jurisdiction.
  // Filtering is applied after sort so ordering is never affected.
  //
  // Hierarchical matching: a top-level code like "US" matches entries whose
  // jurisdictionScope contains "US" OR any sub-jurisdiction starting with "US-".
  // A sub-jurisdiction code like "US-NY" (contains "-") requires a strict match.
  const sorted = sortByAuthority(articles)
  const filtered = activeFilter
    ? sorted.filter((a) =>
        activeFilter.includes('-')
          ? a.jurisdictionScope.includes(activeFilter)
          : a.jurisdictionScope.some(
              (s) => s === activeFilter || s.startsWith(`${activeFilter}-`)
            )
      )
    : sorted

  const basePath = `/${lang}/encyclopedia`

  const canonicalUrl = `https://echo-legal.com/${lang}/encyclopedia`
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumbs`,
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
        name: isEnglish ? 'Legal Encyclopedia' : 'Hukuk Ansiklopedisi',
        item: canonicalUrl,
      },
    ],
  }
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: isEnglish
      ? 'Legal Encyclopedia | EchoLegal'
      : 'Hukuki Ansiklopedi | EchoLegal',
    inLanguage: lang,
    isPartOf: { '@id': 'https://echo-legal.com/#website' },
    publisher: { '@id': 'https://echo-legal.com/#organization' },
  }

  return (
    <>
      <JsonLdScript data={[webPageJsonLd, breadcrumbJsonLd]} />
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          {isEnglish ? 'Legal Encyclopedia' : 'Hukuk Ansiklopedisi'}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {isEnglish
            ? 'Comprehensive guides on business law, employment, intellectual property, and more.'
            : 'Ticaret hukuku, iş ilişkileri, fikri mülkiyet ve daha birçok konuda kapsamlı rehberler.'}
        </p>

        {/* Jurisdiction filter */}
        <nav
          className="flex flex-wrap items-center gap-2 mb-8"
          aria-label={isEnglish ? 'Filter by jurisdiction' : 'Yargı alanına göre filtrele'}
        >
          <span className="text-sm text-gray-500 mr-1">
            {isEnglish ? 'Jurisdiction:' : 'Yargı Alanı:'}
          </span>
          <Link
            href={basePath}
            scroll={false}
            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
              !activeFilter
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {isEnglish ? 'All' : 'Tümü'}
          </Link>
          {FILTER_OPTIONS.map((code) => (
            <Link
              key={code}
              href={`${basePath}?j=${code}`}
              scroll={false}
              className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                activeFilter === code
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              {JURISDICTION_SHORT_LABELS[code]?.[lang] ?? code}
            </Link>
          ))}
        </nav>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((article) => (
            <div
              key={article.slug}
              className={`border rounded-lg p-6 ${article.available ? 'border-gray-200 hover:shadow-lg transition-shadow' : 'border-gray-100 bg-gray-50'}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  article.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {article.available
                    ? (isEnglish ? 'Available' : 'Yayında')
                    : (isEnglish ? 'Coming Soon' : 'Yakında')}
                </span>
                <span className="text-xs text-gray-400">{article.readTime}</span>
              </div>

              <h2 className="text-xl font-bold mb-2">
                {article.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {article.description}
              </p>

              <div className="flex items-center justify-between">
                {article.available ? (
                  <Link
                    href={`/${lang}/encyclopedia/${article.slug}`}
                    className="inline-block text-[#C9A227] font-semibold hover:underline"
                  >
                    {isEnglish ? 'Read Article →' : 'Yazıyı Oku →'}
                  </Link>
                ) : (
                  <span className="text-gray-400">
                    {isEnglish ? 'Coming Soon' : 'Yakında'}
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {isEnglish ? 'Jurisdiction' : 'Yargı Alanı'}: {formatJurisdictionScope(article.jurisdictionScope, lang)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </>
  )
}
