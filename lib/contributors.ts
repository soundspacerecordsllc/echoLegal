// lib/contributors.ts
// Contributor data model for EchoLegal
// Institutional author profiles for legal encyclopedia standards

export type ContributorRole = 'author' | 'reviewer' | 'contributor' | 'editorial-authority'

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
  // Professional designation (e.g., "Attorney at Law")
  designation: {
    en: string
    tr: string
  }
  // Institutional role at EchoLegal
  institutionalRole: {
    en: string
    tr: string
  }
  credentials: string[]
  barAdmission?: {
    jurisdiction: string
    number: string
    year?: number
  }
  education: {
    degree: string
    institution: string
    location?: string
  }[]
  bio: {
    en: string
    tr: string
  }
  // Jurisdictional scope disclaimer
  jurisdictionalNote: {
    en: string
    tr: string
  }
  initials: string
  image?: string
  linkedIn?: string
  isActive: boolean
  isAttorney: boolean
  isTeam?: boolean
  jurisdictions?: string[]
}

// Primary Contributing Attorney
export const ZEYNEP_MOORE: Contributor = {
  id: 'zeynep-moore',
  name: {
    en: 'Zeynep Ruziye Moore',
    tr: 'Zeynep Ruziye Moore',
  },
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
  credentials: [],
  barAdmission: {
    jurisdiction: 'New York',
    number: '',
  },
  education: [],
  bio: {
    en: 'Zeynep Ruziye Moore is licensed to practice law in the State of New York.',
    tr: 'Zeynep Ruziye Moore, New York Eyaleti\'nde avukatlık yapmaya yetkilidir.',
  },
  jurisdictionalNote: {
    en: 'Licensed in New York. This content is provided for general informational purposes and does not constitute legal advice.',
    tr: 'New York lisanslı. Bu içerik genel bilgilendirme amaçlıdır ve hukuki danışmanlık teşkil etmez.',
  },
  initials: 'ZM',
  isActive: true,
  isAttorney: true,
  jurisdictions: ['New York'],
}

// Editorial Team (organizational author)
export const EDITORIAL_TEAM: Contributor = {
  id: 'editorial-team',
  name: {
    en: 'EchoLegal Editorial Team',
    tr: 'EchoLegal Editör Ekibi',
  },
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
  education: [],
  bio: {
    en: 'The EchoLegal Editorial Team researches and maintains legal educational content for Turkish entrepreneurs and professionals navigating US legal and regulatory systems.',
    tr: 'EchoLegal Editör Ekibi, ABD hukuk ve düzenleyici sistemlerinde yol alan Türk girişimciler ve profesyoneller için hukuki eğitim içeriklerini araştırır ve sürdürür.',
  },
  jurisdictionalNote: {
    en: 'This content is provided for general informational and educational purposes only. It does not constitute legal, tax, or professional advice.',
    tr: 'Bu içerik yalnızca genel bilgilendirme ve eğitim amaçlıdır. Hukuki, vergisel veya profesyonel danışmanlık teşkil etmez.',
  },
  initials: 'EL',
  isActive: true,
  isAttorney: false,
  isTeam: true,
}

// Contributors registry
export const contributors: Record<string, Contributor> = {
  'zeynep-moore': ZEYNEP_MOORE,
  'editorial-team': EDITORIAL_TEAM,
}

export function getContributor(id: string): Contributor | undefined {
  return contributors[id]
}

export function getActiveContributors(): Contributor[] {
  return Object.values(contributors).filter(c => c.isActive)
}

export function getCanonicalAuthor(): Contributor {
  return ZEYNEP_MOORE
}

export function getEditorialTeam(): Contributor {
  return EDITORIAL_TEAM
}
