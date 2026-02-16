/**
 * EchoLegal Content Registry
 * Tracks legal freshness, verification status, and sourcing for all hub pages
 */

export interface ContentRegistryEntry {
  page: string
  slug: string
  jurisdiction: 'US' | 'TR' | 'US-TR'
  lastVerified: string // YYYY-MM-DD
  sourceType: 'primary' | 'secondary'
  verificationRequired: boolean
  sources: ContentSource[]
  needsLexisResearch?: LexisResearchItem[]
}

export interface ContentSource {
  title: string
  url?: string
  type: 'statute' | 'regulation' | 'case' | 'treaty' | 'official' | 'secondary'
  citation?: string
}

export interface LexisResearchItem {
  query: string
  section: string
  priority: 'high' | 'medium' | 'low'
  notes?: string
}

export const amerikaContentRegistry: ContentRegistryEntry[] = [
  {
    page: 'Amerika Hub Ana Sayfa',
    slug: 'amerika',
    jurisdiction: 'US-TR',
    lastVerified: '2026-01-25',
    sourceType: 'secondary',
    verificationRequired: false,
    sources: []
  },
  {
    page: "ABD'ye Gelme Yolları",
    slug: 'abdye-gelme-yollari',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'primary',
    verificationRequired: true,
    sources: [
      {
        title: 'Immigration and Nationality Act (INA)',
        type: 'statute',
        citation: '8 U.S.C. § 1101 et seq.'
      },
      {
        title: 'USCIS Policy Manual',
        url: 'https://www.uscis.gov/policy-manual',
        type: 'official'
      },
      {
        title: 'Department of State - Visa Categories',
        url: 'https://travel.state.gov/content/travel/en/us-visas.html',
        type: 'official'
      }
    ],
    needsLexisResearch: [
      {
        query: 'immigrant visa categories INA 201-203',
        section: 'Göçmen Vize Kategorileri',
        priority: 'high'
      }
    ]
  },
  {
    page: 'Turist Vizesi Gerçekleri',
    slug: 'turist-vizesi-gercekleri',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'primary',
    verificationRequired: true,
    sources: [
      {
        title: 'B-1/B-2 Visitor Visa Requirements',
        url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
        type: 'official'
      },
      {
        title: 'INA § 214(b) - Presumption of Immigrant Intent',
        type: 'statute',
        citation: '8 U.S.C. § 1184(b)'
      },
      {
        title: '9 FAM 402.2 - B Visas',
        type: 'regulation',
        citation: '9 FAM 402.2'
      }
    ]
  },
  {
    page: 'Statüden Statüye Geçiş Gerçekleri',
    slug: 'statuden-statuye-gecis-gercekleri',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'primary',
    verificationRequired: true,
    sources: [
      {
        title: 'Change of Status — 8 C.F.R. § 248',
        type: 'regulation',
        citation: '8 C.F.R. § 248'
      },
      {
        title: 'Adjustment of Status - INA § 245',
        type: 'statute',
        citation: '8 U.S.C. § 1255'
      },
      {
        title: 'USCIS - Change of Status',
        url: 'https://www.uscis.gov/visit-the-united-states/change-my-nonimmigrant-status',
        type: 'official'
      }
    ],
    needsLexisResearch: [
      {
        query: 'change of status while I-94 expired',
        section: 'Süre Aşımı ve Sonuçları',
        priority: 'high'
      },
      {
        query: 'adjustment of status 30/60 day rule',
        section: 'Niyet Değişikliği Kuralları',
        priority: 'medium'
      }
    ]
  },
  {
    page: "ABD'de LLC Kurmak",
    slug: 'abdde-llc-kurmak',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'primary',
    verificationRequired: true,
    sources: [
      {
        title: 'Delaware LLC Act',
        type: 'statute',
        citation: '6 Del. C. § 18-101 et seq.'
      },
      {
        title: 'Wyoming LLC Act',
        type: 'statute',
        citation: 'Wyo. Stat. § 17-29-101 et seq.'
      },
      {
        title: 'IRS - Limited Liability Company',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc',
        type: 'official'
      }
    ]
  },
  {
    page: 'LLC mi Corp mu?',
    slug: 'llc-mi-corp-mu',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'primary',
    verificationRequired: true,
    sources: [
      {
        title: 'IRS - Business Structures',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/business-structures',
        type: 'official'
      },
      {
        title: 'Delaware General Corporation Law',
        type: 'statute',
        citation: '8 Del. C. § 101 et seq.'
      }
    ]
  },
  {
    page: "ABD'de Banka Hesabı",
    slug: 'abdde-banka-hesabi',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'secondary',
    verificationRequired: true,
    sources: [
      {
        title: 'Bank Secrecy Act / AML Requirements',
        type: 'statute',
        citation: '31 U.S.C. § 5311 et seq.'
      },
      {
        title: 'FBAR Requirements',
        url: 'https://www.irs.gov/businesses/small-businesses-self-employed/report-of-foreign-bank-and-financial-accounts-fbar',
        type: 'official'
      }
    ]
  },
  {
    page: 'IRS Vergi Gerçekleri',
    slug: 'irs-vergi-gercekleri',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'primary',
    verificationRequired: true,
    sources: [
      {
        title: 'Internal Revenue Code',
        type: 'statute',
        citation: 'Internal Revenue Code (26 U.S.C.)'
      },
      {
        title: 'IRS - International Taxpayers',
        url: 'https://www.irs.gov/individuals/international-taxpayers',
        type: 'official'
      },
      {
        title: 'US-Turkey Tax Treaty',
        type: 'treaty',
        citation: 'U.S.–Turkey Income Tax Treaty, TIAS 10205 (1996)'
      }
    ],
    needsLexisResearch: [
      {
        query: 'substantial presence test 26 USC 7701(b)',
        section: 'Vergi Mukimliği Belirleme',
        priority: 'high'
      }
    ]
  },
  {
    page: "ABD'de İş Yapanlar İçin Sözleşmeler",
    slug: 'abdde-is-yapanlar-icin-sozlesmeler',
    jurisdiction: 'US-TR',
    lastVerified: '2026-01-25',
    sourceType: 'secondary',
    verificationRequired: false,
    sources: [
      {
        title: 'Uniform Commercial Code',
        type: 'statute',
        citation: 'UCC'
      },
      {
        title: 'Restatement (Second) of Contracts',
        type: 'secondary'
      }
    ]
  },
  {
    page: 'NY Law Neden Tercih Edilir',
    slug: 'ny-law-neden-tercih-edilir',
    jurisdiction: 'US',
    lastVerified: '2026-01-25',
    sourceType: 'secondary',
    verificationRequired: false,
    sources: [
      {
        title: 'NY General Obligations Law § 5-1401',
        type: 'statute',
        citation: 'N.Y. Gen. Oblig. Law § 5-1401'
      }
    ]
  },
  {
    page: 'Platform Ne Yapar Ne Yapmaz',
    slug: 'platform-ne-yapar-ne-yapmaz',
    jurisdiction: 'US-TR',
    lastVerified: '2026-01-25',
    sourceType: 'secondary',
    verificationRequired: false,
    sources: []
  },
  {
    page: 'Foreign-Owned Single-Member LLC Reporting',
    slug: 'foreign-owned-single-member-llc-reporting',
    jurisdiction: 'US',
    lastVerified: '2026-02-16',
    sourceType: 'primary',
    verificationRequired: true,
    sources: [
      {
        title: '26 U.S.C. § 6038A',
        type: 'statute',
        citation: '26 U.S.C. § 6038A'
      },
      {
        title: '26 C.F.R. § 1.6038A-1',
        type: 'regulation',
        citation: '26 C.F.R. § 1.6038A-1'
      },
      {
        title: '26 U.S.C. § 6038A(d) — Penalty',
        type: 'statute',
        citation: '26 U.S.C. § 6038A(d)'
      },
      {
        title: 'IRS Form 5472 Instructions',
        url: 'https://www.irs.gov/forms-pubs/about-form-5472',
        type: 'official'
      }
    ]
  }
]

export function getRegistryEntry(slug: string): ContentRegistryEntry | undefined {
  return amerikaContentRegistry.find(entry => entry.slug === slug)
}

export function getPagesNeedingVerification(): ContentRegistryEntry[] {
  return amerikaContentRegistry.filter(entry => entry.verificationRequired)
}

export function getPagesNeedingLexisResearch(): ContentRegistryEntry[] {
  return amerikaContentRegistry.filter(entry => entry.needsLexisResearch && entry.needsLexisResearch.length > 0)
}
