import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.echo-legal.com'

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
    '/support',
    '/legal/privacy',
    '/legal/terms',
    '/legal/disclaimer',
    '/legal/cookies',
  ]

  // Amerika Hub pages
  const amerikaPages = [
    '/amerika',
    '/amerika/abdye-gelme-yollari',
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

  const languages = ['tr', 'en']
  const now = new Date().toISOString()

  const urls: MetadataRoute.Sitemap = []

  // Add static pages for both languages
  for (const lang of languages) {
    for (const page of staticPages) {
      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }

    // Add Amerika Hub pages (higher priority for TR)
    for (const page of amerikaPages) {
      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: lang === 'tr' ? 0.9 : 0.7,
      })
    }

    // Add consular document pages
    for (const slug of consularSlugs) {
      urls.push({
        url: `${baseUrl}/${lang}/consular-documents/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return urls
}
