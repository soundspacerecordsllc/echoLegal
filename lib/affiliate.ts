/**
 * Affiliate Marketing Configuration
 * Manages affiliate links, tracking, and disclosure requirements
 */

export interface AffiliateLink {
  id: string
  name: string
  nameTr: string
  url: string
  description: string
  descriptionTr: string
  category: 'legal' | 'business' | 'software' | 'books' | 'services'
  network: 'amazon' | 'cj' | 'shareasale' | 'direct' | 'other'
  commission?: string
  active: boolean
}

/**
 * Affiliate links registry
 * Add new affiliate partnerships here
 */
export const affiliateLinks: AffiliateLink[] = [
  {
    id: 'incfile-llc',
    name: 'Incfile LLC Formation',
    nameTr: 'Incfile LLC Kurulumu',
    url: 'https://www.incfile.com/?affiliate=ECHOLEGAL', // Replace with actual affiliate URL
    description: 'Form your LLC with Incfile - Free registered agent for 1 year',
    descriptionTr: 'Incfile ile LLC\'nizi kurun - 1 yıl ücretsiz kayıtlı acente',
    category: 'business',
    network: 'cj',
    commission: '$50-150 per signup',
    active: true,
  },
  {
    id: 'legalzoom',
    name: 'LegalZoom',
    nameTr: 'LegalZoom',
    url: 'https://www.legalzoom.com/?affiliate=ECHOLEGAL', // Replace with actual affiliate URL
    description: 'Legal services for businesses and individuals',
    descriptionTr: 'İşletmeler ve bireyler için hukuki hizmetler',
    category: 'legal',
    network: 'cj',
    commission: '10% per sale',
    active: true,
  },
  {
    id: 'stripe-atlas',
    name: 'Stripe Atlas',
    nameTr: 'Stripe Atlas',
    url: 'https://stripe.com/atlas?ref=ECHOLEGAL', // Replace with actual affiliate URL
    description: 'Start your company with Stripe Atlas - Full incorporation package',
    descriptionTr: 'Stripe Atlas ile şirketinizi kurun - Tam kuruluş paketi',
    category: 'business',
    network: 'direct',
    commission: '$500 per signup',
    active: true,
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    nameTr: 'QuickBooks',
    url: 'https://quickbooks.intuit.com/?affiliate=ECHOLEGAL', // Replace with actual affiliate URL
    description: 'Accounting software for small businesses',
    descriptionTr: 'Küçük işletmeler için muhasebe yazılımı',
    category: 'software',
    network: 'cj',
    commission: '15% per sale',
    active: true,
  },
  {
    id: 'mercury-bank',
    name: 'Mercury Bank',
    nameTr: 'Mercury Banka',
    url: 'https://mercury.com/?ref=ECHOLEGAL', // Replace with actual affiliate URL
    description: 'Business banking for startups',
    descriptionTr: 'Startup\'lar için iş bankacılığı',
    category: 'business',
    network: 'direct',
    commission: '$100 per funded account',
    active: true,
  },
  {
    id: 'notion',
    name: 'Notion',
    nameTr: 'Notion',
    url: 'https://notion.so/?r=ECHOLEGAL', // Replace with actual affiliate URL
    description: 'All-in-one workspace for notes, docs, and project management',
    descriptionTr: 'Notlar, belgeler ve proje yönetimi için hepsi bir arada çalışma alanı',
    category: 'software',
    network: 'direct',
    active: true,
  },
]

/**
 * Get affiliate link by ID
 */
export function getAffiliateLink(id: string): AffiliateLink | undefined {
  return affiliateLinks.find((link) => link.id === id && link.active)
}

/**
 * Get affiliate links by category
 */
export function getAffiliateLinksByCategory(category: AffiliateLink['category']): AffiliateLink[] {
  return affiliateLinks.filter((link) => link.category === category && link.active)
}

/**
 * Generate tracking URL with UTM parameters
 */
export function generateTrackingUrl(
  affiliateLink: AffiliateLink,
  source: string,
  campaign?: string
): string {
  const url = new URL(affiliateLink.url)
  url.searchParams.set('utm_source', 'echolegal')
  url.searchParams.set('utm_medium', 'affiliate')
  url.searchParams.set('utm_campaign', campaign || affiliateLink.id)
  url.searchParams.set('utm_content', source)
  return url.toString()
}

/**
 * Affiliate configuration
 */
export const affiliateConfig = {
  // Enable/disable affiliate features globally
  enabled: true,

  // Show affiliate disclosure automatically on pages with affiliate links
  autoDisclosure: true,

  // Network-specific configurations
  networks: {
    amazon: {
      associateTag: 'echolegal-20', // Replace with your Amazon Associates tag
      enabled: true,
    },
    cj: {
      websiteId: 'XXXXXX', // Replace with your CJ Affiliate website ID
      enabled: true,
    },
    shareasale: {
      merchantId: 'XXXXXX', // Replace with your ShareASale merchant ID
      enabled: false,
    },
  },

  // Default disclosure text
  disclosureRequired: true,
}
