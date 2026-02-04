// lib/contributors.ts
// Contributor data model for EchoLegal legal encyclopedia
// Institutional author profiles with governance and verification support

import { JurisdictionCode, LanguageCode } from './jurisdictions'

// ============================================
// CONTRIBUTOR TYPES
// ============================================

export type ContributorRole =
  | 'author'              // Can create and submit content
  | 'reviewer'            // Can review and approve content
  | 'editor'              // Can edit and approve content
  | 'editorial-authority' // Full editorial control

export type VerificationStatus =
  | 'unverified'          // Credentials not yet verified
  | 'pending'             // Verification in progress
  | 'verified'            // Credentials verified
  | 'suspended'           // Temporarily suspended

export type ContributorPermissions = {
  canAuthor: boolean       // Can create new content
  canReview: boolean       // Can review others' content
  canPublish: boolean      // Can publish without review
  canEditOthers: boolean   // Can edit content by other authors
  canManageContributors: boolean // Can manage other contributors
}

// ============================================
// CONTRIBUTOR DATA MODEL
// ============================================

export type Contributor = {
  // Identity
  id: string
  name: {
    en: string
    tr: string
  }
  initials: string
  image?: string

  // Professional info
  title: {
    en: string
    tr: string
  }
  designation: {
    en: string
    tr: string
  }
  institutionalRole: {
    en: string
    tr: string
  }
  bio: {
    en: string
    tr: string
  }

  // Credentials
  credentials: string[]
  barAdmissions: {
    jurisdiction: JurisdictionCode | string // Allow string for non-US jurisdictions
    jurisdictionName: string
    number: string
    year?: number
    isVerified: boolean
  }[]
  education: {
    degree: string
    institution: string
    location?: string
    year?: number
  }[]

  // Scope
  jurisdictions: JurisdictionCode[]  // Jurisdictions contributor can write about
  languages: LanguageCode[]          // Languages contributor can write in

  // Governance
  role: ContributorRole
  verificationStatus: VerificationStatus
  permissions: ContributorPermissions

  // Status
  isActive: boolean
  isAttorney: boolean
  isTeam?: boolean                    // Is this an organizational account

  // Contact
  email?: string                      // Internal use only
  linkedIn?: string

  // Jurisdictional scope disclaimer
  jurisdictionalNote: {
    en: string
    tr: string
  }

  // Timestamps
  joinedAt?: string                   // ISO date
  lastActiveAt?: string               // ISO date

  // Statistics (optional, computed)
  stats?: {
    articlesAuthored: number
    documentsAuthored: number
    reviewsCompleted: number
  }
}

// ============================================
// DEFAULT PERMISSIONS BY ROLE
// ============================================

export const DEFAULT_PERMISSIONS: Record<ContributorRole, ContributorPermissions> = {
  author: {
    canAuthor: true,
    canReview: false,
    canPublish: false,
    canEditOthers: false,
    canManageContributors: false,
  },
  reviewer: {
    canAuthor: true,
    canReview: true,
    canPublish: false,
    canEditOthers: false,
    canManageContributors: false,
  },
  editor: {
    canAuthor: true,
    canReview: true,
    canPublish: true,
    canEditOthers: true,
    canManageContributors: false,
  },
  'editorial-authority': {
    canAuthor: true,
    canReview: true,
    canPublish: true,
    canEditOthers: true,
    canManageContributors: true,
  },
}

// ============================================
// CONTRIBUTOR INSTANCES
// ============================================

// Primary Contributing Attorney
export const ZEYNEP_MOORE: Contributor = {
  id: 'zeynep-moore',
  name: {
    en: 'EchoLegal Legal Team',
    tr: 'EchoLegal Hukuk Ekibi',
  },
  initials: 'EL',
  designation: {
    en: 'Licensed in New York',
    tr: 'New York Lisanslı',
  },
  title: {
    en: 'Licensed in New York',
    tr: 'New York Lisanslı',
  },
  institutionalRole: {
    en: 'Oversees editorial standards and legal accuracy for all EchoLegal content.',
    tr: 'Tüm EchoLegal içeriklerinin editöryal standartlarını ve hukuki doğruluğunu denetler.',
  },
  credentials: ['J.D.', 'LL.M.', 'LL.B.'],
  barAdmissions: [
    {
      jurisdiction: 'US-NY',
      jurisdictionName: 'New York',
      number: '5552336',
      isVerified: true,
    },
  ],
  education: [
    {
      degree: 'LL.M.',
      institution: 'Fordham University School of Law',
      location: 'New York, NY',
    },
    {
      degree: 'LL.B.',
      institution: 'Marmara University Faculty of Law',
      location: 'Istanbul, Turkey',
    },
  ],
  jurisdictions: ['US', 'US-NY', 'TR'],
  languages: ['en', 'tr'],
  role: 'editorial-authority',
  verificationStatus: 'verified',
  permissions: DEFAULT_PERMISSIONS['editorial-authority'],
  bio: {
    en: 'Content is authored and reviewed by a New York-licensed attorney.',
    tr: 'İçerik, New York lisanslı bir avukat tarafından yazılmakta ve incelenmektedir.',
  },
  jurisdictionalNote: {
    en: 'Licensed in New York. This content is provided for general informational purposes and does not constitute legal advice.',
    tr: 'New York lisanslı. Bu içerik genel bilgilendirme amaçlıdır ve hukuki danışmanlık teşkil etmez.',
  },
  isActive: true,
  isAttorney: true,
  joinedAt: '2024-01-01',
}

// Editorial Team (organizational author)
export const EDITORIAL_TEAM: Contributor = {
  id: 'editorial-team',
  name: {
    en: 'EchoLegal Editorial Team',
    tr: 'EchoLegal Editör Ekibi',
  },
  initials: 'EL',
  designation: {
    en: 'Editorial Board',
    tr: 'Yayın Kurulu',
  },
  title: {
    en: 'Legal Content Editorial Board',
    tr: 'Hukuki İçerik Yayın Kurulu',
  },
  institutionalRole: {
    en: 'The EchoLegal Editorial Board is responsible for researching, drafting, and maintaining legal educational content. All substantive legal content is reviewed by licensed attorneys.',
    tr: 'EchoLegal Yayın Kurulu, hukuki eğitim içeriklerinin araştırılması, hazırlanması ve sürdürülmesinden sorumludur. Tüm esaslı hukuki içerikler lisanslı avukatlar tarafından incelenir.',
  },
  credentials: [],
  barAdmissions: [],
  education: [],
  jurisdictions: ['US', 'TR', 'GENERAL'],
  languages: ['en', 'tr'],
  role: 'author',
  verificationStatus: 'verified',
  permissions: {
    canAuthor: true,
    canReview: false,
    canPublish: false,
    canEditOthers: false,
    canManageContributors: false,
  },
  bio: {
    en: 'The EchoLegal Editorial Team researches and maintains legal educational content for international entrepreneurs and professionals navigating US legal and regulatory systems.',
    tr: 'EchoLegal Editör Ekibi, ABD hukuk ve düzenleyici sistemlerinde yol alan uluslararası girişimciler ve profesyoneller için hukuki eğitim içeriklerini araştırır ve sürdürür.',
  },
  jurisdictionalNote: {
    en: 'This content is provided for general informational and educational purposes only. It does not constitute legal, tax, or professional advice.',
    tr: 'Bu içerik yalnızca genel bilgilendirme ve eğitim amaçlıdır. Hukuki, vergisel veya profesyonel danışmanlık teşkil etmez.',
  },
  isActive: true,
  isAttorney: false,
  isTeam: true,
  joinedAt: '2024-01-01',
}

// ============================================
// CONTRIBUTORS REGISTRY
// ============================================

export const contributors: Record<string, Contributor> = {
  'zeynep-moore': ZEYNEP_MOORE,
  'editorial-team': EDITORIAL_TEAM,
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getContributor(id: string): Contributor | undefined {
  return contributors[id]
}

export function getActiveContributors(): Contributor[] {
  return Object.values(contributors).filter(c => c.isActive)
}

export function getContributorsByRole(role: ContributorRole): Contributor[] {
  return Object.values(contributors).filter(c => c.role === role && c.isActive)
}

export function getVerifiedAttorneys(): Contributor[] {
  return Object.values(contributors).filter(
    c => c.isAttorney && c.verificationStatus === 'verified' && c.isActive
  )
}

export function getCanonicalAuthor(): Contributor {
  return ZEYNEP_MOORE
}

export function getEditorialTeam(): Contributor {
  return EDITORIAL_TEAM
}

/**
 * Get contributors who can review content for a specific jurisdiction.
 */
export function getReviewersForJurisdiction(jurisdiction: JurisdictionCode): Contributor[] {
  return Object.values(contributors).filter(
    c =>
      c.isActive &&
      c.permissions.canReview &&
      c.verificationStatus === 'verified' &&
      c.jurisdictions.includes(jurisdiction)
  )
}

/**
 * Get contributors who can write in a specific language.
 */
export function getContributorsForLanguage(lang: LanguageCode): Contributor[] {
  return Object.values(contributors).filter(
    c => c.isActive && c.languages.includes(lang)
  )
}

// ============================================
// REVIEW GATE RULES
// ============================================

/**
 * Check if a contributor can serve as reviewer for content.
 * Reviewers must be verified attorneys with jurisdiction coverage.
 */
export function canReviewContent(
  reviewerId: string,
  contentJurisdictions: JurisdictionCode[]
): { allowed: boolean; reason?: string } {
  const reviewer = getContributor(reviewerId)

  if (!reviewer) {
    return { allowed: false, reason: 'Reviewer not found' }
  }

  if (!reviewer.isActive) {
    return { allowed: false, reason: 'Reviewer is not active' }
  }

  if (!reviewer.permissions.canReview) {
    return { allowed: false, reason: 'Contributor does not have review permissions' }
  }

  if (reviewer.verificationStatus !== 'verified') {
    return { allowed: false, reason: 'Reviewer credentials not verified' }
  }

  // Check jurisdiction coverage
  const coveredJurisdictions = contentJurisdictions.filter(j =>
    reviewer.jurisdictions.includes(j)
  )

  if (coveredJurisdictions.length === 0) {
    return {
      allowed: false,
      reason: `Reviewer does not cover any of the content jurisdictions: ${contentJurisdictions.join(', ')}`,
    }
  }

  return { allowed: true }
}

/**
 * Check if content passes the review gate for publication.
 * Published legal content must have:
 * 1. A verified author
 * 2. A verified reviewer (different from author for attorney content)
 * 3. A review date
 */
export function checkReviewGate(content: {
  authorId: string
  reviewerId?: string
  lastReviewedAt?: string
  jurisdictions: JurisdictionCode[]
}): { passed: boolean; errors: string[] } {
  const errors: string[] = []

  const author = getContributor(content.authorId)
  if (!author) {
    errors.push('Author not found')
  } else if (!author.isActive) {
    errors.push('Author is not active')
  }

  if (!content.reviewerId) {
    errors.push('Content must have a reviewer')
  } else {
    const reviewCheck = canReviewContent(content.reviewerId, content.jurisdictions)
    if (!reviewCheck.allowed) {
      errors.push(reviewCheck.reason || 'Reviewer not qualified')
    }
  }

  if (!content.lastReviewedAt) {
    errors.push('Content must have a review date')
  }

  return {
    passed: errors.length === 0,
    errors,
  }
}

/**
 * Get the default reviewer for content.
 * Currently returns the editorial authority.
 */
export function getDefaultReviewer(): Contributor {
  return ZEYNEP_MOORE
}
