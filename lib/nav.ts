// lib/nav.ts
// Centralized navigation configuration

export type NavItemChild = {
  labelEn: string
  labelTr: string
  href: string // Use {lang} placeholder for language-specific links
  descriptionEn?: string
  descriptionTr?: string
  external?: boolean
}

export type NavItem = {
  key: string
  labelEn: string
  labelTr: string
  href: string
  children?: NavItemChild[]
}

// Path mappings between EN and TR for special routes
export const PATH_MAPPINGS: Record<string, string> = {
  '/templates': '/sablonlar',
  '/sablonlar': '/templates',
}

// Reverse path mapping for language switching
export function getAlternatePath(path: string, targetLang: 'en' | 'tr'): string {
  // Remove language prefix
  let pathWithoutLang = path.replace(/^\/(en|tr)/, '')

  // Handle special mappings
  if (targetLang === 'tr') {
    // EN -> TR mappings
    if (pathWithoutLang.startsWith('/templates')) {
      pathWithoutLang = pathWithoutLang.replace('/templates', '/sablonlar')
    }
  } else {
    // TR -> EN mappings
    if (pathWithoutLang.startsWith('/sablonlar')) {
      pathWithoutLang = pathWithoutLang.replace('/sablonlar', '/templates')
    }
  }

  return `/${targetLang}${pathWithoutLang}`
}

// Central navigation structure
export const NAV_ITEMS: NavItem[] = [
  {
    key: 'guides',
    labelEn: 'Guides',
    labelTr: 'Rehberler',
    href: '/{lang}/library',
    children: [
      {
        labelEn: 'US Business Hub',
        labelTr: 'ABD İş Merkezi',
        href: '/{lang}/amerika',
        descriptionEn: 'All US business resources',
        descriptionTr: 'Tüm ABD iş kaynakları',
      },
      {
        labelEn: 'LLC Formation Guide',
        labelTr: 'LLC Kurma Rehberi',
        href: '/{lang}/abd-de-llc-kurmak-turkler-icin-adim-adim',
        descriptionEn: 'Step-by-step US business formation',
        descriptionTr: 'ABD şirket kurulumu adım adım',
      },
      {
        labelEn: 'DS-160 Visa Form',
        labelTr: 'DS-160 Vize Formu',
        href: '/{lang}/ds-160-rehberi',
        descriptionEn: 'Visa application guide',
        descriptionTr: 'Vize başvurusu rehberi',
      },
      {
        labelEn: 'Tax & ID Hub',
        labelTr: 'Vergi ve Kimlik Rehberi',
        href: '/{lang}/vergi-kimlik-rehberi',
        descriptionEn: 'EIN, ITIN, SSN, W-8, 1099',
        descriptionTr: 'EIN, ITIN, SSN, W-8, 1099',
      },
      {
        labelEn: 'Essential Contracts',
        labelTr: 'Temel Sözleşmeler',
        href: '/{lang}/abdde-is-yapan-turkler-icin-sozlesmeler',
        descriptionEn: 'Must-have legal documents',
        descriptionTr: 'Gerekli hukuki belgeler',
      },
      {
        labelEn: 'US Bank Account',
        labelTr: 'ABD Banka Hesabı',
        href: '/{lang}/abdde-banka-hesabi-acmak',
        descriptionEn: 'Opening accounts as non-resident',
        descriptionTr: 'Yabancı olarak hesap açma',
      },
    ],
  },
  {
    key: 'templates',
    labelEn: 'Templates',
    labelTr: 'Şablonlar',
    href: '/{lang}/templates', // Will be transformed for TR
    children: [
      {
        labelEn: 'View All Templates',
        labelTr: 'Tüm Şablonları Gör',
        href: '/{lang}/templates',
        descriptionEn: 'Browse 50+ legal templates',
        descriptionTr: '50+ hukuki şablona göz atın',
      },
      {
        labelEn: 'Contracts',
        labelTr: 'Sözleşmeler',
        href: '/{lang}/templates#contracts',
        descriptionEn: 'NDA, Service Agreement, etc.',
        descriptionTr: 'NDA, Hizmet Sözleşmesi, vb.',
      },
      {
        labelEn: 'Business Documents',
        labelTr: 'İş Belgeleri',
        href: '/{lang}/templates#business',
        descriptionEn: 'Invoice, Receipt, Authorization',
        descriptionTr: 'Fatura, Makbuz, Yetki',
      },
      {
        labelEn: 'Tax & IRS Forms',
        labelTr: 'Vergi & IRS Formları',
        href: '/{lang}/templates#tax',
        descriptionEn: 'W-8, EIN, ITIN checklists',
        descriptionTr: 'W-8, EIN, ITIN kontrol listeleri',
      },
      {
        labelEn: 'Immigration Letters',
        labelTr: 'Göç Mektupları',
        href: '/{lang}/templates#immigration',
        descriptionEn: 'Visa support letters',
        descriptionTr: 'Vize destek mektupları',
      },
    ],
  },
  {
    key: 'checklists',
    labelEn: 'Checklists',
    labelTr: 'Kontrol Listeleri',
    href: '/{lang}/checklists/llc-checklist',
    children: [
      {
        labelEn: 'LLC Formation Checklist',
        labelTr: 'LLC Kurulum Listesi',
        href: '/{lang}/checklists/llc-checklist',
        descriptionEn: 'Step-by-step LLC setup',
        descriptionTr: 'Adım adım LLC kurulumu',
      },
      {
        labelEn: 'Bank Account Checklist',
        labelTr: 'Banka Hesabı Listesi',
        href: '/{lang}/checklists/bank-account-checklist',
        descriptionEn: 'Documents needed',
        descriptionTr: 'Gerekli belgeler',
      },
      {
        labelEn: 'Tax Documents Checklist',
        labelTr: 'Vergi Belgeleri Listesi',
        href: '/{lang}/checklists/tax-documents-checklist',
        descriptionEn: 'IRS compliance docs',
        descriptionTr: 'IRS uyum belgeleri',
      },
    ],
  },
  {
    key: 'kits',
    labelEn: 'Legal Kits',
    labelTr: 'Hukuki Kitler',
    href: '/{lang}/legal-kits',
    children: [
      {
        labelEn: 'ABD Business Starter Kit',
        labelTr: 'ABD Business Starter Kit',
        href: '/{lang}/legal-kits/business-starter',
        descriptionEn: '5 essential documents',
        descriptionTr: '5 temel belge',
      },
    ],
  },
  {
    key: 'about',
    labelEn: 'About',
    labelTr: 'Hakkımızda',
    href: '/{lang}/about',
    children: [
      {
        labelEn: 'About EchoLegal',
        labelTr: 'EchoLegal Hakkında',
        href: '/{lang}/about',
        descriptionEn: 'Mission and approach',
        descriptionTr: 'Misyon ve yaklaşım',
      },
      {
        labelEn: 'Institutional Charter',
        labelTr: 'Kurumsal Tüzük',
        href: '/{lang}/about/charter',
        descriptionEn: 'Governance and editorial independence',
        descriptionTr: 'Yönetişim ve editöryal bağımsızlık',
      },
      {
        labelEn: 'Editorial Board',
        labelTr: 'Yayın Kurulu',
        href: '/{lang}/about/editorial-board',
        descriptionEn: 'Reviewing attorneys and team',
        descriptionTr: 'İnceleme avukatları ve ekip',
      },
      {
        labelEn: 'Editorial Policy',
        labelTr: 'Editöryal Politika',
        href: '/{lang}/about/editorial-policy',
        descriptionEn: 'Accuracy and sourcing standards',
        descriptionTr: 'Doğruluk ve kaynak standartları',
      },
      {
        labelEn: 'Jurisdictions',
        labelTr: 'Yargı Alanları',
        href: '/{lang}/jurisdictions',
        descriptionEn: 'Coverage by jurisdiction',
        descriptionTr: 'Yargı alanına göre kapsam',
      },
    ],
  },
  {
    key: 'support',
    labelEn: 'Support',
    labelTr: 'Destek',
    href: '/{lang}/support',
  },
]

// Helper to resolve href with language
export function resolveHref(href: string, lang: 'en' | 'tr'): string {
  let resolved = href.replace('{lang}', lang)

  // Transform /templates to /sablonlar for Turkish
  if (lang === 'tr' && resolved.includes('/tr/templates')) {
    resolved = resolved.replace('/tr/templates', '/tr/sablonlar')
  }

  return resolved
}

// Get nav item label by language
export function getLabel(
  item: { labelEn: string; labelTr: string },
  lang: 'en' | 'tr'
): string {
  return lang === 'en' ? item.labelEn : item.labelTr
}

// Get description by language
export function getDescription(
  item: { descriptionEn?: string; descriptionTr?: string },
  lang: 'en' | 'tr'
): string | undefined {
  return lang === 'en' ? item.descriptionEn : item.descriptionTr
}
