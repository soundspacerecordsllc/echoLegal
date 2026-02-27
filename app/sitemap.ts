import type { MetadataRoute } from 'next'
import { templatesRegistry } from '@/lib/templates-registry'

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

function alternates(fullPath: string) {
  return {
    languages: {
      en: langUrl(fullPath, 'en'),
      tr: langUrl(fullPath, 'tr'),
      'x-default': langUrl(fullPath, 'en'),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

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

  // Get unique template slugs from registry
  const templateSlugs = Array.from(new Set(templatesRegistry.map((t) => t.slug)))

  const languages = ['tr', 'en'] as const

  // Priority helper
  const getPriority = (page: string, lang: string): number => {
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

  // Change frequency helper
  const getChangeFreq = (page: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' => {
    if (page === '') return 'weekly'
    if (page.startsWith('/legal/')) return 'yearly'
    return 'monthly'
  }

  // Combine all page arrays
  const allPages = [
    ...staticPages,
    ...libraryPages,
    ...guidePages,
    ...legalKitPages,
    ...checklistPages,
    ...additionalPages,
    ...amerikaPages,
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const lang of languages) {
    for (const page of allPages) {
      // Skip /templates for TR — use /sablonlar instead
      if (lang === 'tr' && page === '/templates') continue

      const fullPath = `/${lang}${page}`
      entries.push({
        url: `${SITE}${fullPath}`,
        lastModified: now,
        changeFrequency: getChangeFreq(page),
        priority: getPriority(page, lang),
        alternates: alternates(fullPath),
      })
    }

    // Consular document pages
    for (const slug of consularSlugs) {
      const fullPath = `/${lang}/consular-documents/${slug}`
      entries.push({
        url: `${SITE}${fullPath}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: alternates(fullPath),
      })
    }

    // Template pages with language-appropriate URLs
    for (const slug of templateSlugs) {
      const templatePath = lang === 'tr' ? `/sablonlar/${slug}` : `/templates/${slug}`
      const fullPath = `/${lang}${templatePath}`
      entries.push({
        url: `${SITE}${fullPath}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: alternates(fullPath),
      })
    }
  }

  // Turkish templates index with native URL
  entries.push({
    url: `${SITE}/tr/sablonlar`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
    alternates: alternates('/tr/sablonlar'),
  })

  return entries
}
