// lib/contributors.ts
// Contributor data model for EchoLegal
// Foundation for future attorney contributor system
// Currently only Zeynep is active - contributors disabled by default

export type ContributorRole = 'author' | 'reviewer' | 'contributor'

export type Contributor = {
  id: string
  name: {
    en: string
    tr: string
  }
  title: {
    en: string
    tr: string
  }
  credentials: string[]
  bio: {
    en: string
    tr: string
  }
  image?: string
  linkedIn?: string
  isActive: boolean
  isAttorney: boolean
  jurisdictions?: string[]
}

// Canonical authority - always active
export const ZEYNEP: Contributor = {
  id: 'zeynep-yilmaz',
  name: {
    en: 'Zeynep Yılmaz',
    tr: 'Zeynep Yılmaz',
  },
  title: {
    en: 'Legal Content Director',
    tr: 'Hukuki İçerik Direktörü',
  },
  credentials: ['J.D.', 'LL.M.'],
  bio: {
    en: 'Zeynep oversees all legal content at EchoLegal, ensuring accuracy and clarity for Turkish entrepreneurs navigating US legal systems.',
    tr: 'Zeynep, EchoLegal\'daki tüm hukuki içeriği denetler ve ABD hukuk sistemlerinde yol alan Türk girişimciler için doğruluk ve netlik sağlar.',
  },
  isActive: true,
  isAttorney: true,
  jurisdictions: ['New York', 'Turkey'],
}

// Future contributors - disabled by default
export const contributors: Record<string, Contributor> = {
  'zeynep-yilmaz': ZEYNEP,
  // Future contributors can be added here:
  // 'attorney-name': { ... isActive: false }
}

export function getContributor(id: string): Contributor | undefined {
  return contributors[id]
}

export function getActiveContributors(): Contributor[] {
  return Object.values(contributors).filter(c => c.isActive)
}

export function getCanonicalAuthor(): Contributor {
  return ZEYNEP
}
