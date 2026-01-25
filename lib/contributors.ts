// lib/contributors.ts
// Contributor data model for EchoLegal
// Foundation for future contributor system
// Editorial Team is default - individual contributors disabled by default

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
  isTeam?: boolean // true for organizational author
  jurisdictions?: string[]
}

// Canonical authority - Editorial Team (organizational author)
export const EDITORIAL_TEAM: Contributor = {
  id: 'editorial-team',
  name: {
    en: 'EchoLegal Editorial Team',
    tr: 'EchoLegal Editör Ekibi',
  },
  title: {
    en: 'Legal Content Team',
    tr: 'Hukuki İçerik Ekibi',
  },
  credentials: [],
  bio: {
    en: 'The EchoLegal Editorial Team researches and maintains legal content for Turkish entrepreneurs navigating US legal systems. All content is reviewed for accuracy.',
    tr: 'EchoLegal Editör Ekibi, ABD hukuk sistemlerinde yol alan Türk girişimciler için hukuki içerikleri araştırır ve sürdürür. Tüm içerikler doğruluk açısından incelenir.',
  },
  isActive: true,
  isAttorney: false,
  isTeam: true,
}

// Future individual contributors - disabled by default
export const contributors: Record<string, Contributor> = {
  'editorial-team': EDITORIAL_TEAM,
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
  return EDITORIAL_TEAM
}
