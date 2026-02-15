// lib/jurisdictions.ts
// Global jurisdiction and language infrastructure for multi-jurisdiction expansion
// Designed to scale from US/TR to worldwide coverage

export type JurisdictionCode =
  | 'US'
  | 'TR'
  | 'US-NY'
  | 'US-DE'
  | 'US-WY'
  | 'US-CA'
  | 'US-TX'
  | 'US-FL'
  | 'EU'
  | 'UK'
  | 'DE'
  | 'FR'
  | 'INTL'
  | 'GENERAL'

export type LanguageCode = 'en' | 'tr' | 'de' | 'fr' | 'es' | 'pt' | 'zh' | 'ja' | 'ar'

export type JurisdictionType = 'country' | 'state' | 'region' | 'supranational' | 'general'

export type Jurisdiction = {
  code: JurisdictionCode
  type: JurisdictionType
  name: Record<LanguageCode, string>
  shortName: Record<LanguageCode, string>
  parent?: JurisdictionCode
  languages: LanguageCode[]
  legalSystem: 'common-law' | 'civil-law' | 'mixed' | 'religious' | 'customary'
  isActive: boolean // Whether content is currently available
  flag?: string
}

// Jurisdiction Registry - extensible for global expansion
export const jurisdictions: Record<JurisdictionCode, Jurisdiction> = {
  // United States (Federal)
  US: {
    code: 'US',
    type: 'country',
    name: {
      en: 'United States',
      tr: 'Amerika Birleşik Devletleri',
      de: 'Vereinigte Staaten',
      fr: 'États-Unis',
      es: 'Estados Unidos',
      pt: 'Estados Unidos',
      zh: '美国',
      ja: 'アメリカ合衆国',
      ar: 'الولايات المتحدة',
    },
    shortName: {
      en: 'US',
      tr: 'ABD',
      de: 'USA',
      fr: 'É-U',
      es: 'EE.UU.',
      pt: 'EUA',
      zh: '美国',
      ja: '米国',
      ar: 'أمريكا',
    },
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: true,
    flag: '',
  },

  // US States
  'US-NY': {
    code: 'US-NY',
    type: 'state',
    name: {
      en: 'New York',
      tr: 'New York',
      de: 'New York',
      fr: 'New York',
      es: 'Nueva York',
      pt: 'Nova Iorque',
      zh: '纽约州',
      ja: 'ニューヨーク州',
      ar: 'نيويورك',
    },
    shortName: {
      en: 'NY',
      tr: 'NY',
      de: 'NY',
      fr: 'NY',
      es: 'NY',
      pt: 'NY',
      zh: '纽约',
      ja: 'NY',
      ar: 'نيويورك',
    },
    parent: 'US',
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: true,
  },
  'US-DE': {
    code: 'US-DE',
    type: 'state',
    name: {
      en: 'Delaware',
      tr: 'Delaware',
      de: 'Delaware',
      fr: 'Delaware',
      es: 'Delaware',
      pt: 'Delaware',
      zh: '特拉华州',
      ja: 'デラウェア州',
      ar: 'ديلاوير',
    },
    shortName: {
      en: 'DE',
      tr: 'DE',
      de: 'DE',
      fr: 'DE',
      es: 'DE',
      pt: 'DE',
      zh: '特拉华',
      ja: 'DE',
      ar: 'ديلاوير',
    },
    parent: 'US',
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: true,
  },
  'US-WY': {
    code: 'US-WY',
    type: 'state',
    name: {
      en: 'Wyoming',
      tr: 'Wyoming',
      de: 'Wyoming',
      fr: 'Wyoming',
      es: 'Wyoming',
      pt: 'Wyoming',
      zh: '怀俄明州',
      ja: 'ワイオミング州',
      ar: 'وايومنغ',
    },
    shortName: {
      en: 'WY',
      tr: 'WY',
      de: 'WY',
      fr: 'WY',
      es: 'WY',
      pt: 'WY',
      zh: '怀俄明',
      ja: 'WY',
      ar: 'وايومنغ',
    },
    parent: 'US',
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: true,
  },
  'US-CA': {
    code: 'US-CA',
    type: 'state',
    name: {
      en: 'California',
      tr: 'Kaliforniya',
      de: 'Kalifornien',
      fr: 'Californie',
      es: 'California',
      pt: 'Califórnia',
      zh: '加利福尼亚州',
      ja: 'カリフォルニア州',
      ar: 'كاليفورنيا',
    },
    shortName: {
      en: 'CA',
      tr: 'CA',
      de: 'CA',
      fr: 'CA',
      es: 'CA',
      pt: 'CA',
      zh: '加州',
      ja: 'CA',
      ar: 'كاليفورنيا',
    },
    parent: 'US',
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: false, // Not yet covered
  },
  'US-TX': {
    code: 'US-TX',
    type: 'state',
    name: {
      en: 'Texas',
      tr: 'Teksas',
      de: 'Texas',
      fr: 'Texas',
      es: 'Texas',
      pt: 'Texas',
      zh: '德克萨斯州',
      ja: 'テキサス州',
      ar: 'تكساس',
    },
    shortName: {
      en: 'TX',
      tr: 'TX',
      de: 'TX',
      fr: 'TX',
      es: 'TX',
      pt: 'TX',
      zh: '德州',
      ja: 'TX',
      ar: 'تكساس',
    },
    parent: 'US',
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: false,
  },
  'US-FL': {
    code: 'US-FL',
    type: 'state',
    name: {
      en: 'Florida',
      tr: 'Florida',
      de: 'Florida',
      fr: 'Floride',
      es: 'Florida',
      pt: 'Flórida',
      zh: '佛罗里达州',
      ja: 'フロリダ州',
      ar: 'فلوريدا',
    },
    shortName: {
      en: 'FL',
      tr: 'FL',
      de: 'FL',
      fr: 'FL',
      es: 'FL',
      pt: 'FL',
      zh: '佛州',
      ja: 'FL',
      ar: 'فلوريدا',
    },
    parent: 'US',
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: true,
  },

  // Turkey
  TR: {
    code: 'TR',
    type: 'country',
    name: {
      en: 'Turkey',
      tr: 'Türkiye',
      de: 'Türkei',
      fr: 'Turquie',
      es: 'Turquía',
      pt: 'Turquia',
      zh: '土耳其',
      ja: 'トルコ',
      ar: 'تركيا',
    },
    shortName: {
      en: 'TR',
      tr: 'TR',
      de: 'TR',
      fr: 'TR',
      es: 'TR',
      pt: 'TR',
      zh: '土耳其',
      ja: 'TR',
      ar: 'تركيا',
    },
    languages: ['tr'],
    legalSystem: 'civil-law',
    isActive: true,
    flag: '',
  },

  // Future jurisdictions (placeholders for expansion)
  EU: {
    code: 'EU',
    type: 'supranational',
    name: {
      en: 'European Union',
      tr: 'Avrupa Birliği',
      de: 'Europäische Union',
      fr: 'Union européenne',
      es: 'Unión Europea',
      pt: 'União Europeia',
      zh: '欧洲联盟',
      ja: '欧州連合',
      ar: 'الاتحاد الأوروبي',
    },
    shortName: {
      en: 'EU',
      tr: 'AB',
      de: 'EU',
      fr: 'UE',
      es: 'UE',
      pt: 'UE',
      zh: '欧盟',
      ja: 'EU',
      ar: 'الاتحاد الأوروبي',
    },
    languages: ['en', 'de', 'fr'],
    legalSystem: 'civil-law',
    isActive: false,
    flag: '🇪🇺',
  },
  UK: {
    code: 'UK',
    type: 'country',
    name: {
      en: 'United Kingdom',
      tr: 'Birleşik Krallık',
      de: 'Vereinigtes Königreich',
      fr: 'Royaume-Uni',
      es: 'Reino Unido',
      pt: 'Reino Unido',
      zh: '英国',
      ja: 'イギリス',
      ar: 'المملكة المتحدة',
    },
    shortName: {
      en: 'UK',
      tr: 'BK',
      de: 'GB',
      fr: 'R-U',
      es: 'RU',
      pt: 'RU',
      zh: '英国',
      ja: '英国',
      ar: 'بريطانيا',
    },
    languages: ['en'],
    legalSystem: 'common-law',
    isActive: false,
    flag: '🇬🇧',
  },
  DE: {
    code: 'DE',
    type: 'country',
    name: {
      en: 'Germany',
      tr: 'Almanya',
      de: 'Deutschland',
      fr: 'Allemagne',
      es: 'Alemania',
      pt: 'Alemanha',
      zh: '德国',
      ja: 'ドイツ',
      ar: 'ألمانيا',
    },
    shortName: {
      en: 'DE',
      tr: 'DE',
      de: 'DE',
      fr: 'DE',
      es: 'DE',
      pt: 'DE',
      zh: '德国',
      ja: 'DE',
      ar: 'ألمانيا',
    },
    languages: ['de'],
    legalSystem: 'civil-law',
    isActive: false,
    flag: '🇩🇪',
  },
  FR: {
    code: 'FR',
    type: 'country',
    name: {
      en: 'France',
      tr: 'Fransa',
      de: 'Frankreich',
      fr: 'France',
      es: 'Francia',
      pt: 'França',
      zh: '法国',
      ja: 'フランス',
      ar: 'فرنسا',
    },
    shortName: {
      en: 'FR',
      tr: 'FR',
      de: 'FR',
      fr: 'FR',
      es: 'FR',
      pt: 'FR',
      zh: '法国',
      ja: 'FR',
      ar: 'فرنسا',
    },
    languages: ['fr'],
    legalSystem: 'civil-law',
    isActive: false,
    flag: '🇫🇷',
  },
  INTL: {
    code: 'INTL',
    type: 'supranational',
    name: {
      en: 'International',
      tr: 'Uluslararası',
      de: 'International',
      fr: 'International',
      es: 'Internacional',
      pt: 'Internacional',
      zh: '国际',
      ja: '国際',
      ar: 'دولي',
    },
    shortName: {
      en: 'INTL',
      tr: 'ULUSL',
      de: 'INTL',
      fr: 'INTL',
      es: 'INTL',
      pt: 'INTL',
      zh: '国际',
      ja: '国際',
      ar: 'دولي',
    },
    languages: ['en'],
    legalSystem: 'mixed',
    isActive: false,
    flag: '',
  },
  GENERAL: {
    code: 'GENERAL',
    type: 'general',
    name: {
      en: 'General / Non-Specific',
      tr: 'Genel / Belirli Değil',
      de: 'Allgemein',
      fr: 'Général',
      es: 'General',
      pt: 'Geral',
      zh: '通用',
      ja: '一般',
      ar: 'عام',
    },
    shortName: {
      en: 'General',
      tr: 'Genel',
      de: 'Allg.',
      fr: 'Gén.',
      es: 'Gral.',
      pt: 'Geral',
      zh: '通用',
      ja: '一般',
      ar: 'عام',
    },
    languages: ['en', 'tr'],
    legalSystem: 'mixed',
    isActive: true,
  },
}

// Language metadata
export type Language = {
  code: LanguageCode
  name: Record<LanguageCode, string>
  nativeName: string
  direction: 'ltr' | 'rtl'
  isActive: boolean
}

export const languages: Record<LanguageCode, Language> = {
  en: {
    code: 'en',
    name: {
      en: 'English',
      tr: 'İngilizce',
      de: 'Englisch',
      fr: 'Anglais',
      es: 'Inglés',
      pt: 'Inglês',
      zh: '英语',
      ja: '英語',
      ar: 'الإنجليزية',
    },
    nativeName: 'English',
    direction: 'ltr',
    isActive: true,
  },
  tr: {
    code: 'tr',
    name: {
      en: 'Turkish',
      tr: 'Türkçe',
      de: 'Türkisch',
      fr: 'Turc',
      es: 'Turco',
      pt: 'Turco',
      zh: '土耳其语',
      ja: 'トルコ語',
      ar: 'التركية',
    },
    nativeName: 'Türkçe',
    direction: 'ltr',
    isActive: true,
  },
  de: {
    code: 'de',
    name: {
      en: 'German',
      tr: 'Almanca',
      de: 'Deutsch',
      fr: 'Allemand',
      es: 'Alemán',
      pt: 'Alemão',
      zh: '德语',
      ja: 'ドイツ語',
      ar: 'الألمانية',
    },
    nativeName: 'Deutsch',
    direction: 'ltr',
    isActive: false,
  },
  fr: {
    code: 'fr',
    name: {
      en: 'French',
      tr: 'Fransızca',
      de: 'Französisch',
      fr: 'Français',
      es: 'Francés',
      pt: 'Francês',
      zh: '法语',
      ja: 'フランス語',
      ar: 'الفرنسية',
    },
    nativeName: 'Français',
    direction: 'ltr',
    isActive: false,
  },
  es: {
    code: 'es',
    name: {
      en: 'Spanish',
      tr: 'İspanyolca',
      de: 'Spanisch',
      fr: 'Espagnol',
      es: 'Español',
      pt: 'Espanhol',
      zh: '西班牙语',
      ja: 'スペイン語',
      ar: 'الإسبانية',
    },
    nativeName: 'Español',
    direction: 'ltr',
    isActive: false,
  },
  pt: {
    code: 'pt',
    name: {
      en: 'Portuguese',
      tr: 'Portekizce',
      de: 'Portugiesisch',
      fr: 'Portugais',
      es: 'Portugués',
      pt: 'Português',
      zh: '葡萄牙语',
      ja: 'ポルトガル語',
      ar: 'البرتغالية',
    },
    nativeName: 'Português',
    direction: 'ltr',
    isActive: false,
  },
  zh: {
    code: 'zh',
    name: {
      en: 'Chinese',
      tr: 'Çince',
      de: 'Chinesisch',
      fr: 'Chinois',
      es: 'Chino',
      pt: 'Chinês',
      zh: '中文',
      ja: '中国語',
      ar: 'الصينية',
    },
    nativeName: '中文',
    direction: 'ltr',
    isActive: false,
  },
  ja: {
    code: 'ja',
    name: {
      en: 'Japanese',
      tr: 'Japonca',
      de: 'Japanisch',
      fr: 'Japonais',
      es: 'Japonés',
      pt: 'Japonês',
      zh: '日语',
      ja: '日本語',
      ar: 'اليابانية',
    },
    nativeName: '日本語',
    direction: 'ltr',
    isActive: false,
  },
  ar: {
    code: 'ar',
    name: {
      en: 'Arabic',
      tr: 'Arapça',
      de: 'Arabisch',
      fr: 'Arabe',
      es: 'Árabe',
      pt: 'Árabe',
      zh: '阿拉伯语',
      ja: 'アラビア語',
      ar: 'العربية',
    },
    nativeName: 'العربية',
    direction: 'rtl',
    isActive: false,
  },
}

// Helper functions
export function getJurisdiction(code: JurisdictionCode): Jurisdiction | undefined {
  return jurisdictions[code]
}

export function getActiveJurisdictions(): Jurisdiction[] {
  return Object.values(jurisdictions).filter(j => j.isActive)
}

export function getJurisdictionsByType(type: JurisdictionType): Jurisdiction[] {
  return Object.values(jurisdictions).filter(j => j.type === type)
}

export function getChildJurisdictions(parentCode: JurisdictionCode): Jurisdiction[] {
  return Object.values(jurisdictions).filter(j => j.parent === parentCode)
}

export function getJurisdictionName(code: JurisdictionCode, lang: LanguageCode): string {
  const jurisdiction = jurisdictions[code]
  return jurisdiction?.name[lang] || jurisdiction?.name.en || code
}

export function getJurisdictionShortName(code: JurisdictionCode, lang: LanguageCode): string {
  const jurisdiction = jurisdictions[code]
  return jurisdiction?.shortName[lang] || jurisdiction?.shortName.en || code
}

export function getLanguage(code: LanguageCode): Language | undefined {
  return languages[code]
}

export function getActiveLanguages(): Language[] {
  return Object.values(languages).filter(l => l.isActive)
}

export function getLanguageName(code: LanguageCode, displayLang: LanguageCode): string {
  const language = languages[code]
  return language?.name[displayLang] || language?.name.en || code
}

// Content availability helpers
export function isContentAvailable(jurisdictionCode: JurisdictionCode, langCode: LanguageCode): boolean {
  const jurisdiction = jurisdictions[jurisdictionCode]
  const language = languages[langCode]
  return jurisdiction?.isActive && language?.isActive
}

export function getAvailableLanguagesForJurisdiction(code: JurisdictionCode): LanguageCode[] {
  const jurisdiction = jurisdictions[code]
  if (!jurisdiction) return []
  return jurisdiction.languages.filter(lang => languages[lang]?.isActive)
}

// ============================================
// NORMALIZATION & VALIDATION
// ============================================

// Alias mapping for legacy or variant codes
const jurisdictionAliases: Record<string, JurisdictionCode> = {
  'USA': 'US',
  'United States': 'US',
  'America': 'US',
  'Turkey': 'TR',
  'Türkiye': 'TR',
  'New York': 'US-NY',
  'NY': 'US-NY',
  'Delaware': 'US-DE',
  'Wyoming': 'US-WY',
  'California': 'US-CA',
  'Texas': 'US-TX',
  'Florida': 'US-FL',
  'General': 'GENERAL',
  'International': 'INTL',
  // Legacy template registry values
  'US/TR': 'US', // Maps to US with TR as additional language
}

/**
 * Normalize a jurisdiction input to a canonical JurisdictionCode.
 * Returns undefined if the input cannot be normalized.
 */
export function normalizeJurisdiction(input: string): JurisdictionCode | undefined {
  if (!input) return undefined

  // Direct match
  const upperInput = input.toUpperCase()
  if (upperInput in jurisdictions) {
    return upperInput as JurisdictionCode
  }

  // Alias match
  if (input in jurisdictionAliases) {
    return jurisdictionAliases[input]
  }

  // Check for state codes with US- prefix
  if (upperInput.startsWith('US-') && upperInput in jurisdictions) {
    return upperInput as JurisdictionCode
  }

  return undefined
}

/**
 * Validate that a jurisdiction code exists in the registry.
 * Throws an error in development, returns false in production.
 */
export function isValidJurisdiction(code: string): code is JurisdictionCode {
  return code in jurisdictions
}

/**
 * Assert that a jurisdiction code is valid.
 * Use during development/build to catch invalid codes.
 */
export function assertValidJurisdiction(code: string, context?: string): asserts code is JurisdictionCode {
  if (!isValidJurisdiction(code)) {
    const message = `Invalid jurisdiction code: "${code}"${context ? ` in ${context}` : ''}`
    if (process.env.NODE_ENV === 'development') {
      throw new Error(message)
    } else {
      console.error(message)
    }
  }
}

/**
 * Get the parent jurisdiction for a nested jurisdiction (e.g., US for US-NY).
 */
export function getParentJurisdiction(code: JurisdictionCode): Jurisdiction | undefined {
  const jurisdiction = jurisdictions[code]
  if (!jurisdiction?.parent) return undefined
  return jurisdictions[jurisdiction.parent]
}

/**
 * Check if a jurisdiction is a child of another (e.g., US-NY is child of US).
 */
export function isChildOf(childCode: JurisdictionCode, parentCode: JurisdictionCode): boolean {
  const child = jurisdictions[childCode]
  if (!child?.parent) return false
  if (child.parent === parentCode) return true
  // Recursive check for nested hierarchies
  return isChildOf(child.parent, parentCode)
}

/**
 * Get all jurisdiction codes that apply to content (self + parents).
 * E.g., for US-NY returns ['US-NY', 'US']
 */
export function getApplicableJurisdictions(code: JurisdictionCode): JurisdictionCode[] {
  const result: JurisdictionCode[] = [code]
  const jurisdiction = jurisdictions[code]
  if (jurisdiction?.parent) {
    result.push(...getApplicableJurisdictions(jurisdiction.parent))
  }
  return result
}

// ============================================
// LANGUAGE NORMALIZATION
// ============================================

const languageAliases: Record<string, LanguageCode> = {
  'english': 'en',
  'turkish': 'tr',
  'türkçe': 'tr',
  'german': 'de',
  'deutsch': 'de',
  'french': 'fr',
  'français': 'fr',
}

/**
 * Normalize a language input to a canonical LanguageCode.
 */
export function normalizeLanguage(input: string): LanguageCode | undefined {
  if (!input) return undefined

  const lowerInput = input.toLowerCase()

  // Direct match
  if (lowerInput in languages) {
    return lowerInput as LanguageCode
  }

  // Alias match
  if (lowerInput in languageAliases) {
    return languageAliases[lowerInput]
  }

  return undefined
}

/**
 * Validate that a language code exists in the registry.
 */
export function isValidLanguage(code: string): code is LanguageCode {
  return code in languages
}

/**
 * Assert that a language code is valid.
 */
export function assertValidLanguage(code: string, context?: string): asserts code is LanguageCode {
  if (!isValidLanguage(code)) {
    const message = `Invalid language code: "${code}"${context ? ` in ${context}` : ''}`
    if (process.env.NODE_ENV === 'development') {
      throw new Error(message)
    } else {
      console.error(message)
    }
  }
}
