const SITE = 'https://echo-legal.com'

/** Swap /en↔/tr prefix and /templates↔/sablonlar in one step. */
function langUrl(fullPath: string, targetLang: 'en' | 'tr'): string {
  let p = fullPath.replace(/^\/(en|tr)/, '')
  if (targetLang === 'tr') {
    p = p.replace(/^\/templates/, '/sablonlar')
  } else {
    p = p.replace(/^\/sablonlar/, '/templates')
  }
  return `${SITE}/${targetLang}${p}`
}

// Static pages
const staticPages = [
  '',
  '/contracts',
  '/contracts/nda',
  '/contracts/service-agreement',
  '/contracts/independent-contractor',
  '/contracts/freelance-agreement',
  '/contracts/privacy-policy',
  '/contracts/terms-of-service',
  '/contracts/influencer-agreement',
  '/templates',
  '/consular-documents',
  '/encyclopedia',
  '/encyclopedia/what-is-nda',
  '/support',
  '/legal/privacy',
  '/legal/terms',
  '/legal/disclaimer',
  '/legal/cookies',
  '/about',
  '/about/editorial-policy',
]

// Library pages
const libraryPages = [
  '/library',
  '/library/llc-kurma-rehberi',
  '/library/llc-vize-yanilgisi',
  '/library/irs-vergi-gercekleri',
  '/library/hukuki-yanilgilar',
  '/library/temel-sozlesmeler',
]

// Standalone guide pages
const guidePages = [
  '/abd-de-llc-kurmak-turkler-icin-adim-adim',
  '/abdde-is-yapan-turkler-icin-sozlesmeler',
  '/irs-vergiler-ve-w8-w9-gercekleri',
  '/abdde-banka-hesabi-acmak',
  '/llc-mi-corporation-mi',
  '/ds-160-rehberi',
  '/abd-odemeleri-alma-rehberi',
  '/abd-satis-vergisi-rehberi',
  '/ein-itin-ssn-farki',
  '/1099-vergi-belgeleri',
  '/vergi-kimlik-rehberi',
]

// Legal kit pages
const legalKitPages = [
  '/legal-kits',
  '/legal-kits/business-starter',
]

// Checklist pages
const checklistPages = [
  '/checklists',
  '/checklists/llc-checklist',
  '/checklists/llc-kontrol-listesi',
  '/checklists/bank-account-checklist',
  '/checklists/tax-documents-checklist',
  '/checklists/irs-mektup-rehberi',
  '/checklists/w8-w9-karar-haritasi',
]

// Additional content pages
const additionalPages = [
  '/contribute',
  '/jurisdictions',
  '/about/charter',
  '/about/citation-guide',
  '/about/contributor-standards',
  '/about/corrections',
  '/about/editorial-board',
  '/about/governance',
  '/abd-llc-kurmak-prosedurel-mimari',
  '/foreign-owned-single-member-llc-reporting',
  '/encyclopedia/common-misconceptions',
  '/encyclopedia/contractor-vs-employee',
  '/encyclopedia/freelancer-legal-guide',
  '/encyclopedia/privacy-policy-guide',
]

// Amerika Hub pages (includes state-specific LLC pages)
const amerikaPages = [
  '/amerika',
  '/amerika/abdye-gelme-yollari',
  '/amerika/abd-ye-gelmeden-once',
  '/amerika/turist-vizesi-gercekleri',
  '/amerika/statuden-statuye-gecis-gercekleri',
  '/amerika/abdde-llc-kurmak',
  '/amerika/llc-mi-corp-mu',
  '/amerika/abdde-banka-hesabi',
  '/amerika/irs-vergi-gercekleri',
  '/amerika/abdde-is-yapanlar-icin-sozlesmeler',
  '/amerika/ny-law-neden-tercih-edilir',
  '/amerika/platform-ne-yapar-ne-yapmaz',
  '/amerika/legal-kitler',
  '/amerika/legal-kitler/abd-business-starter-legal-kit',
  '/amerika/legal-kitler/abdye-gelmeden-once-hukuki-gercekler-rehberi',
  '/amerika/legal-kitler/tr-us-legal-bridge-mini-library',
  '/amerika/llc-eyalet/florida',
]

// Consular document slugs
const consularSlugs = [
  'passport',
  'turkish-id',
  'birth-registration',
  'marriage-registration',
  'death-registration',
  'document-certification',
  'notary-services',
  'population-registry',
]

// Template slugs
const templateSlugs = [
  'nda',
  'service-agreement',
  'independent-contractor',
  'privacy-policy',
  'terms-of-service',
  'freelance-agreement',
  'influencer-agreement',
  'invoice-template',
  'receipt-template',
  'authorization-letter',
  'company-policy-notice',
  'operating-agreement-outline',
  'visa-appointment-cover-letter',
  'sponsor-letter',
  'affidavit-support-outline',
  'travel-consent-letter',
  'consulate-appointment-request',
  'nufus-cuzdani-example',
  'power-of-attorney-outline',
  'residency-proof-letter',
  'translation-certification',
  'apostille-request-guide',
  'name-change-affidavit',
  'w8-attachment-checklist',
  'ein-request-cover-letter',
  'vendor-onboarding-form',
  'itin-application-guide',
  '1099-response-letter',
  'tax-treaty-claim-checklist',
  'demand-letter',
  'termination-notice',
  'cease-desist-outline',
]

const languages = ['tr', 'en'] as const

function getPriority(page: string, lang: string): number {
  if (page === '') return 1.0
  if (page === '/contracts' || page === '/library' || page === '/legal-kits' || page === '/templates') return 0.9
  if (guidePages.includes(page)) return 0.85
  if (page.startsWith('/templates/')) return 0.75
  if (page.startsWith('/contracts/')) return 0.8
  if (page.startsWith('/legal-kits/')) return 0.8
  if (page.startsWith('/library/')) return 0.8
  if (page.startsWith('/amerika')) return lang === 'tr' ? 0.8 : 0.7
  if (page.startsWith('/consular-documents')) return 0.7
  if (page.startsWith('/checklists')) return 0.6
  if (page.startsWith('/encyclopedia')) return 0.6
  if (page.startsWith('/legal/')) return 0.4
  return 0.5
}

function getChangeFreq(page: string): string {
  if (page === '') return 'weekly'
  if (page.startsWith('/legal/')) return 'yearly'
  return 'monthly'
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET() {
  const now = new Date().toISOString()

  const allPages = [
    ...staticPages,
    ...libraryPages,
    ...guidePages,
    ...legalKitPages,
    ...checklistPages,
    ...additionalPages,
    ...amerikaPages,
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
  xml += `<?xml-stylesheet type="text/xsl" href="${SITE}/sitemap.xsl"?>\n`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`

  for (const lang of languages) {
    for (const page of allPages) {
      if (lang === 'tr' && page === '/templates') continue

      const fullPath = `/${lang}${page}`
      const url = `${SITE}${fullPath}`
      xml += `<url>\n`
      xml += `<loc>${escapeXml(url)}</loc>\n`
      xml += `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(langUrl(fullPath, 'en'))}" />\n`
      xml += `<xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(langUrl(fullPath, 'tr'))}" />\n`
      xml += `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(langUrl(fullPath, 'en'))}" />\n`
      xml += `<lastmod>${now}</lastmod>\n`
      xml += `<changefreq>${getChangeFreq(page)}</changefreq>\n`
      xml += `<priority>${getPriority(page, lang)}</priority>\n`
      xml += `</url>\n`
    }

    for (const slug of consularSlugs) {
      const fullPath = `/${lang}/consular-documents/${slug}`
      const url = `${SITE}${fullPath}`
      xml += `<url>\n`
      xml += `<loc>${escapeXml(url)}</loc>\n`
      xml += `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(langUrl(fullPath, 'en'))}" />\n`
      xml += `<xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(langUrl(fullPath, 'tr'))}" />\n`
      xml += `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(langUrl(fullPath, 'en'))}" />\n`
      xml += `<lastmod>${now}</lastmod>\n`
      xml += `<changefreq>monthly</changefreq>\n`
      xml += `<priority>0.7</priority>\n`
      xml += `</url>\n`
    }

    for (const slug of templateSlugs) {
      const templatePath = lang === 'tr' ? `/sablonlar/${slug}` : `/templates/${slug}`
      const fullPath = `/${lang}${templatePath}`
      const url = `${SITE}${fullPath}`
      xml += `<url>\n`
      xml += `<loc>${escapeXml(url)}</loc>\n`
      xml += `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(langUrl(fullPath, 'en'))}" />\n`
      xml += `<xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(langUrl(fullPath, 'tr'))}" />\n`
      xml += `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(langUrl(fullPath, 'en'))}" />\n`
      xml += `<lastmod>${now}</lastmod>\n`
      xml += `<changefreq>monthly</changefreq>\n`
      xml += `<priority>0.75</priority>\n`
      xml += `</url>\n`
    }
  }

  // Turkish templates index with native URL
  const trSablonlarPath = '/tr/sablonlar'
  xml += `<url>\n`
  xml += `<loc>${escapeXml(`${SITE}${trSablonlarPath}`)}</loc>\n`
  xml += `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(langUrl(trSablonlarPath, 'en'))}" />\n`
  xml += `<xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(langUrl(trSablonlarPath, 'tr'))}" />\n`
  xml += `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(langUrl(trSablonlarPath, 'en'))}" />\n`
  xml += `<lastmod>${now}</lastmod>\n`
  xml += `<changefreq>monthly</changefreq>\n`
  xml += `<priority>0.9</priority>\n`
  xml += `</url>\n`

  xml += `</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
