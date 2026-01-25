// lib/state-llc-data.ts
// Configuration for state-specific LLC pages
// This enables programmatic scale for future state pages

export type StateData = {
  slug: string
  name: {
    en: string
    tr: string
  }
  formationFee: string
  annualFee: string
  processingTime: string
  requirements: {
    en: string[]
    tr: string[]
  }
  advantages: {
    en: string[]
    tr: string[]
  }
  disadvantages: {
    en: string[]
    tr: string[]
  }
  taxInfo: {
    en: string
    tr: string
  }
  sosWebsite: string
  notes: {
    en: string
    tr: string
  }
}

export const stateData: Record<string, StateData> = {
  florida: {
    slug: 'florida',
    name: {
      en: 'Florida',
      tr: 'Florida',
    },
    formationFee: '$125',
    annualFee: '$138.75',
    processingTime: '2-3 business days (online)',
    requirements: {
      en: [
        'Articles of Organization filing with Florida Division of Corporations',
        'Registered Agent with Florida address required',
        'Operating Agreement (not filed, but recommended)',
        'Annual Report due by May 1 each year',
        'EIN from IRS for tax purposes',
        'BOI filing with FinCEN within 90 days',
      ],
      tr: [
        'Florida Division of Corporations\'a Articles of Organization başvurusu',
        'Florida adresli Registered Agent gerekli',
        'Operating Agreement (dosyalanmaz ama önerilir)',
        'Her yıl 1 Mayıs\'a kadar Yıllık Rapor',
        'Vergi amaçları için IRS\'den EIN',
        '90 gün içinde FinCEN\'e BOI bildirimi',
      ],
    },
    advantages: {
      en: [
        'No state income tax for individuals',
        'Strong asset protection laws',
        'No requirement to disclose member names publicly',
        'Business-friendly legal environment',
        'Large market access (20+ million population)',
        'Fast online filing system',
      ],
      tr: [
        'Bireyler için eyalet gelir vergisi yok',
        'Güçlü varlık koruma yasaları',
        'Üye isimlerini kamuya açıklama zorunluluğu yok',
        'İş dostu yasal ortam',
        'Büyük pazar erişimi (20+ milyon nüfus)',
        'Hızlı online başvuru sistemi',
      ],
    },
    disadvantages: {
      en: [
        'Higher formation fee than some states ($125 vs $50-100)',
        'Annual report required every year',
        'May trigger nexus for sales tax if selling to Florida customers',
        'Physical presence may create additional tax obligations',
      ],
      tr: [
        'Bazı eyaletlerden daha yüksek kuruluş ücreti (125$ vs 50-100$)',
        'Her yıl yıllık rapor gerekli',
        'Florida müşterilerine satış yapıyorsanız satış vergisi nexus\'u tetikleyebilir',
        'Fiziksel varlık ek vergi yükümlülükleri oluşturabilir',
      ],
    },
    taxInfo: {
      en: 'Florida has no state income tax for individuals, making it attractive for LLC owners. However, multi-member LLCs taxed as partnerships still file informational returns. Florida does have a corporate income tax (5.5%) if your LLC elects corporate taxation.',
      tr: 'Florida\'da bireyler için eyalet gelir vergisi yoktur, bu da LLC sahipleri için çekici kılar. Ancak ortaklık olarak vergilendirilen çok üyeli LLC\'ler hâlâ bilgi beyannamesi verir. LLC\'niz kurumsal vergilendirme seçerse Florida\'nın kurumlar vergisi (%5,5) vardır.',
    },
    sosWebsite: 'https://dos.myflorida.com/sunbiz/',
    notes: {
      en: 'Florida is popular among international entrepreneurs for its no income tax policy and strong business infrastructure. However, if you don\'t have physical operations in Florida, states like Wyoming or New Mexico may offer lower ongoing costs.',
      tr: 'Florida, gelir vergisi olmaması ve güçlü iş altyapısıyla uluslararası girişimciler arasında popülerdir. Ancak Florida\'da fiziksel operasyonunuz yoksa, Wyoming veya New Mexico gibi eyaletler daha düşük devam eden maliyetler sunabilir.',
    },
  },
  // Future states can be added here:
  // wyoming: { ... },
  // delaware: { ... },
  // newMexico: { ... },
}

export function getStateData(slug: string): StateData | undefined {
  return stateData[slug]
}

export function getAllStateSlugs(): string[] {
  return Object.keys(stateData)
}
