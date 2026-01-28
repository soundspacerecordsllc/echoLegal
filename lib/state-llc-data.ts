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
        'Florida Division of Corporations nezdinde Articles of Organization başvurusu',
        'Florida\'da geçerli adresi bulunan bir Registered Agent atanması',
        'Operating Agreement hazırlanması (resmi dosyalama zorunlu değildir ancak kesinlikle tavsiye edilir)',
        'Her yıl 1 Mayıs tarihine kadar yıllık rapor (Annual Report) sunulması',
        'Vergi yükümlülükleri için IRS\'den EIN alınması',
        'Kuruluştan itibaren 90 gün içinde FinCEN\'e BOI bildirimi yapılması',
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
        'Bireyler için eyalet düzeyinde gelir vergisi uygulanmaz',
        'Güçlü varlık koruma mevzuatı',
        'Üye kimliklerinin kamuya açıklanma zorunluluğu bulunmaz',
        'İş kurmaya elverişli hukuki ortam',
        'Geniş pazar erişimi (20 milyonu aşan nüfus)',
        'Hızlı çevrimiçi başvuru altyapısı',
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
        'Bazı eyaletlere kıyasla daha yüksek kuruluş ücreti (125$ / diğerleri 50-100$)',
        'Her yıl yıllık rapor sunma zorunluluğu',
        'Florida\'daki müşterilere satış halinde satış vergisi bağlantısı (nexus) doğabilir',
        'Eyalette fiziksel varlık bulunması ek vergi yükümlülükleri yaratabilir',
      ],
    },
    taxInfo: {
      en: 'Florida has no state income tax for individuals, making it attractive for LLC owners. However, multi-member LLCs taxed as partnerships still file informational returns. Florida does have a corporate income tax (5.5%) if your LLC elects corporate taxation.',
      tr: 'Florida, bireysel düzeyde eyalet gelir vergisi uygulamaz; bu durum LLC sahipleri açısından belirgin bir avantaj oluşturur. Ancak ortaklık olarak vergilendirilen çok üyeli LLC\'lerin bilgi beyannamesi (informational return) vermesi gerekir. LLC\'nin kurumsal vergilendirme (corporate taxation) tercih etmesi halinde %5,5 oranında Florida kurumlar vergisi uygulanır.',
    },
    sosWebsite: 'https://dos.myflorida.com/sunbiz/',
    notes: {
      en: 'Florida is popular among international entrepreneurs for its no income tax policy and strong business infrastructure. However, if you don\'t have physical operations in Florida, states like Wyoming or New Mexico may offer lower ongoing costs.',
      tr: 'Florida, gelir vergisi uygulamaması ve gelişmiş iş altyapısı sayesinde uluslararası girişimcilerin en çok tercih ettiği eyaletlerden biridir. Bununla birlikte, Florida\'da fiziksel faaliyet yürütmeyecekseniz Wyoming veya New Mexico gibi eyaletler daha düşük yıllık maliyetler sunabilir.',
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
