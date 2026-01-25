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
    en: 'Attorney at Law',
    tr: 'Avukat',
  },
  title: {
    en: 'Contributing Attorney & Editorial Authority',
    tr: 'Katkıda Bulunan Avukat ve Editöryal Otorite',
  },
  institutionalRole: {
    en: 'Contributing Attorney and Editorial Authority for EchoLegal. Responsible for legal accuracy review and editorial oversight of US-Turkey cross-border legal content.',
    tr: 'EchoLegal için Katkıda Bulunan Avukat ve Editöryal Otorite. ABD-Türkiye sınır ötesi hukuki içeriklerin hukuki doğruluk incelemesi ve editöryal gözetiminden sorumludur.',
  },
  credentials: ['J.D.', 'LL.M.', 'LL.B.'],
  barAdmission: {
    jurisdiction: 'New York',
    number: '5552336',
  },
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
  bio: {
    en: 'Zeynep Ruziye Moore is an attorney admitted to practice in the State of New York. She holds an LL.M. from Fordham University School of Law and an LL.B. from Marmara University Faculty of Law. Her practice and scholarship focus on cross-border transactions, corporate formation, and regulatory compliance matters affecting Turkish nationals and businesses operating in the United States.',
    tr: 'Zeynep Ruziye Moore, New York Eyaleti\'nde avukatlık yapmaya yetkili bir hukukçudur. Fordham Üniversitesi Hukuk Fakültesi\'nden LL.M. ve Marmara Üniversitesi Hukuk Fakültesi\'nden LL.B. derecelerine sahiptir. Uygulama ve akademik çalışmaları, Amerika Birleşik Devletleri\'nde faaliyet gösteren Türk vatandaşları ve işletmelerini etkileyen sınır ötesi işlemler, şirket kuruluşu ve mevzuata uygunluk konularına odaklanmaktadır.',
  },
  jurisdictionalNote: {
    en: 'Admitted to practice in New York. This content is provided for general informational purposes and does not constitute legal advice. No attorney-client relationship is formed through use of this platform.',
    tr: 'New York\'ta avukatlık yapmaya yetkilidir. Bu içerik genel bilgilendirme amaçlıdır ve hukuki danışmanlık teşkil etmez. Bu platformun kullanımı ile avukat-müvekkil ilişkisi kurulmaz.',
  },
  initials: 'ZM',
  isActive: true,
  isAttorney: true,
  jurisdictions: ['New York', 'Federal'],
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
