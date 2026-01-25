/**
 * Membership System Configuration
 * Handles premium content access, subscription tiers, and member management
 */

export interface MembershipTier {
  id: string
  name: string
  nameTr: string
  description: string
  descriptionTr: string
  price: number
  interval: 'month' | 'year'
  stripePriceId: string
  features: string[]
  featuresTr: string[]
  popular?: boolean
  trialDays?: number
}

export interface MemberAccess {
  userId: string
  email: string
  tierId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodEnd: Date
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}

/**
 * Membership tiers configuration
 */
export const membershipTiers: MembershipTier[] = [
  {
    id: 'free',
    name: 'Free',
    nameTr: 'Ücretsiz',
    description: 'Basic access to legal guides',
    descriptionTr: 'Hukuki rehberlere temel erişim',
    price: 0,
    interval: 'month',
    stripePriceId: '',
    features: [
      'Access to free legal guides',
      'Basic contract templates',
      'Community support',
    ],
    featuresTr: [
      'Ücretsiz hukuki rehberlere erişim',
      'Temel sözleşme şablonları',
      'Topluluk desteği',
    ],
  },
  {
    id: 'supporter',
    name: 'Supporter',
    nameTr: 'Destekçi',
    description: 'Support EchoLegal and get premium access',
    descriptionTr: 'EchoLegal\'i destekleyin ve premium erişim elde edin',
    price: 9,
    interval: 'month',
    stripePriceId: 'price_SUPPORTER_MONTHLY', // Replace with actual Stripe price ID
    features: [
      'All free features',
      'Premium legal guides',
      'Downloadable templates (Word/PDF)',
      'Ad-free experience',
      'Email support',
    ],
    featuresTr: [
      'Tüm ücretsiz özellikler',
      'Premium hukuki rehberler',
      'İndirilebilir şablonlar (Word/PDF)',
      'Reklamsız deneyim',
      'E-posta desteği',
    ],
    popular: true,
    trialDays: 7,
  },
  {
    id: 'professional',
    name: 'Professional',
    nameTr: 'Profesyonel',
    description: 'Complete access for serious entrepreneurs',
    descriptionTr: 'Ciddi girişimciler için tam erişim',
    price: 29,
    interval: 'month',
    stripePriceId: 'price_PROFESSIONAL_MONTHLY', // Replace with actual Stripe price ID
    features: [
      'All Supporter features',
      'All legal kits included',
      'Monthly Q&A webinars',
      'Priority email support',
      'Custom template requests',
    ],
    featuresTr: [
      'Tüm Destekçi özellikleri',
      'Tüm hukuk kitleri dahil',
      'Aylık Soru-Cevap webinarları',
      'Öncelikli e-posta desteği',
      'Özel şablon talepleri',
    ],
  },
  {
    id: 'supporter-annual',
    name: 'Supporter (Annual)',
    nameTr: 'Destekçi (Yıllık)',
    description: 'Save 20% with annual billing',
    descriptionTr: 'Yıllık faturalandırma ile %20 tasarruf edin',
    price: 86,
    interval: 'year',
    stripePriceId: 'price_SUPPORTER_ANNUAL', // Replace with actual Stripe price ID
    features: [
      'All Supporter features',
      '2 months free',
      'Annual billing',
    ],
    featuresTr: [
      'Tüm Destekçi özellikleri',
      '2 ay ücretsiz',
      'Yıllık faturalandırma',
    ],
  },
]

/**
 * Content that requires membership
 */
export const premiumContent = {
  // Premium guides (require Supporter tier or higher)
  premiumGuides: [
    'advanced-llc-strategies',
    'multi-state-compliance',
    'tax-optimization-guide',
  ],
  // Pro-only content (require Professional tier)
  proContent: [
    'custom-template-library',
    'monthly-webinar-access',
  ],
}

/**
 * Get membership tier by ID
 */
export function getMembershipTier(tierId: string): MembershipTier | undefined {
  return membershipTiers.find((tier) => tier.id === tierId)
}

/**
 * Check if user has access to specific content
 */
export function hasContentAccess(
  memberAccess: MemberAccess | null,
  contentId: string
): boolean {
  // Free content is accessible to everyone
  if (!premiumContent.premiumGuides.includes(contentId) &&
      !premiumContent.proContent.includes(contentId)) {
    return true
  }

  // No membership = no premium access
  if (!memberAccess || memberAccess.status !== 'active') {
    return false
  }

  // Check tier permissions
  const tier = getMembershipTier(memberAccess.tierId)
  if (!tier) return false

  // Professional tier has access to everything
  if (memberAccess.tierId === 'professional') return true

  // Supporter tier has access to premium guides but not pro content
  if (memberAccess.tierId === 'supporter' || memberAccess.tierId === 'supporter-annual') {
    return premiumContent.premiumGuides.includes(contentId)
  }

  return false
}

/**
 * Membership configuration
 */
export const membershipConfig = {
  // Enable/disable membership features
  enabled: true,

  // Allow free tier users to see previews of premium content
  showPremiumPreviews: true,

  // Number of free premium articles per month for non-members
  freePreviewsPerMonth: 2,

  // Stripe Customer Portal URL
  customerPortalUrl: '/api/membership/portal',
}
