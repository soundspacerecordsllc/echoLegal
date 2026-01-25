import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generator for EchoLegal
 * Generates XML sitemap with hreflang alternates for all pages
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://echo-legal.com'

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
    '/consular-documents',
    '/encyclopedia',
    '/encyclopedia/what-is-nda',
    '/support',
    '/legal/privacy',
    '/legal/terms',
    '/legal/disclaimer',
    '/legal/cookies',
  ]

  // Library pages (educational content)
  const libraryPages = [
    '/library',
    '/library/llc-kurma-rehberi',
    '/library/llc-vize-yanilgisi',
    '/library/irs-vergi-gercekleri',
    '/library/hukuki-yanilgilar',
    '/library/temel-sozlesmeler',
  ]

  // Standalone guide pages (new comprehensive guides)
  const guidePages = [
    '/abd-de-llc-kurmak-turkler-icin-adim-adim',
    '/abdde-is-yapan-turkler-icin-sozlesmeler',
    '/irs-vergiler-ve-w8-w9-gercekleri',
    '/abdde-banka-hesabi-acmak',
    '/llc-mi-corporation-mi',
    '/ds-160-rehberi',
    '/abd-odemeleri-alma-rehberi',
    '/abd-satis-vergisi-rehberi',
  ]

  // Legal kit pages
  const legalKitPages = [
    '/legal-kits',
    '/legal-kits/business-starter',
  ]

  // Checklist pages
  const checklistPages = [
    '/checklists',
    '/checklists/llc-kontrol-listesi',
    '/checklists/w8-w9-karar-haritasi',
    '/checklists/irs-mektup-rehberi',
  ]

  // Amerika Hub pages
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

  const languages = ['tr', 'en'] as const
  const now = new Date().toISOString()

  const urls: MetadataRoute.Sitemap = []

  // Helper to determine priority
  const getPriority = (page: string, lang: string): number => {
    if (page === '') return 1.0
    if (page === '/contracts' || page === '/library' || page === '/legal-kits') return 0.9
    // New standalone guide pages get high priority
    if (guidePages.includes(page)) return 0.85
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

  // Helper to determine change frequency
  const getChangeFreq = (page: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' => {
    if (page === '') return 'weekly'
    if (page.startsWith('/legal/')) return 'yearly'
    if (page.startsWith('/contracts') || page.startsWith('/legal-kits')) return 'monthly'
    return 'monthly'
  }

  // Combine all page arrays
  const allPages = [
    ...staticPages,
    ...libraryPages,
    ...guidePages,
    ...legalKitPages,
    ...checklistPages,
    ...amerikaPages,
  ]

  // Add all pages for both languages
  for (const lang of languages) {
    for (const page of allPages) {
      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: now,
        changeFrequency: getChangeFreq(page),
        priority: getPriority(page, lang),
      })
    }

    // Add consular document pages
    for (const slug of consularSlugs) {
      const page = `/consular-documents/${slug}`
      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return urls
}
