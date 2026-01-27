/**
 * Amerika Hub - Page Data Structure
 * All hub pages under /tr/amerika
 */

export interface HubPage {
  slug: string
  titleTr: string
  titleEn: string
  descriptionTr: string
  descriptionEn: string
  icon: string
  category: 'immigration' | 'business' | 'tax' | 'contracts' | 'platform'
  available: boolean
  order: number
}

export const amerikaHubPages: HubPage[] = [
  {
    slug: 'abdye-gelme-yollari',
    titleTr: "ABD'ye Gelme Yolları",
    titleEn: 'Pathways to the United States',
    descriptionTr: 'Göçmen ve göçmen olmayan vize kategorileri, yasal giriş yolları ve temel gereksinimler.',
    descriptionEn: 'Immigrant and non-immigrant visa categories, legal entry pathways, and basic requirements.',
    icon: '✈️',
    category: 'immigration',
    available: true,
    order: 1
  },
  {
    slug: 'turist-vizesi-gercekleri',
    titleTr: 'Turist Vizesi Gerçekleri',
    titleEn: 'Tourist Visa Realities',
    descriptionTr: 'B-1/B-2 vizesi hakkında yanlış bilinenler, göçmen niyeti varsayımı ve ret sebepleri.',
    descriptionEn: 'Common misconceptions about B-1/B-2 visas, immigrant intent presumption, and denial reasons.',
    icon: '🛂',
    category: 'immigration',
    available: true,
    order: 2
  },
  {
    slug: 'statuden-statuye-gecis-gercekleri',
    titleTr: 'Statüden Statüye Geçiş Gerçekleri',
    titleEn: 'Status Change Realities',
    descriptionTr: 'ABD içinde statü değişikliği, 30/60 gün kuralı, adjustment of status ve yaygın hatalar.',
    descriptionEn: 'Changing status within the US, 30/60 day rule, adjustment of status, and common mistakes.',
    icon: '🔄',
    category: 'immigration',
    available: true,
    order: 3
  },
  {
    slug: 'abdde-llc-kurmak',
    titleTr: "ABD'de LLC Kurmak",
    titleEn: 'Forming an LLC in the US',
    descriptionTr: 'Delaware, Wyoming ve diğer eyaletlerde LLC kurulumu, registered agent ve yıllık yükümlülükler.',
    descriptionEn: 'LLC formation in Delaware, Wyoming, and other states, registered agents, and annual obligations.',
    icon: '🏢',
    category: 'business',
    available: true,
    order: 4
  },
  {
    slug: 'llc-mi-corp-mu',
    titleTr: 'LLC mi Corp mu?',
    titleEn: 'LLC vs Corporation',
    descriptionTr: 'İş yapısı seçimi, vergi etkileri, sorumluluk koruması ve yatırımcı beklentileri.',
    descriptionEn: 'Choosing business structure, tax implications, liability protection, and investor expectations.',
    icon: '⚖️',
    category: 'business',
    available: true,
    order: 5
  },
  {
    slug: 'abdde-banka-hesabi',
    titleTr: "ABD'de Banka Hesabı",
    titleEn: 'US Bank Account',
    descriptionTr: 'Şirket ve kişisel hesap açma, ITIN/EIN gereksinimleri, FBAR yükümlülükleri.',
    descriptionEn: 'Opening business and personal accounts, ITIN/EIN requirements, FBAR obligations.',
    icon: '🏦',
    category: 'business',
    available: true,
    order: 6
  },
  {
    slug: 'irs-vergi-gercekleri',
    titleTr: 'IRS Vergi Gerçekleri',
    titleEn: 'IRS Tax Realities',
    descriptionTr: 'ABD vergi mukimliği, substantial presence test, FATCA ve Türkiye ile çifte vergilendirme.',
    descriptionEn: 'US tax residency, substantial presence test, FATCA, and US-Turkey double taxation.',
    icon: '📊',
    category: 'tax',
    available: true,
    order: 7
  },
  {
    slug: 'abdde-is-yapanlar-icin-sozlesmeler',
    titleTr: "ABD'de İş Yapanlar İçin Sözleşmeler",
    titleEn: 'Contracts for Doing Business in the US',
    descriptionTr: 'Temel sözleşme türleri, governing law seçimi, dispute resolution ve NDA kullanımı.',
    descriptionEn: 'Essential contract types, choice of law, dispute resolution, and NDA usage.',
    icon: '📝',
    category: 'contracts',
    available: true,
    order: 8
  },
  {
    slug: 'ny-law-neden-tercih-edilir',
    titleTr: 'NY Law Neden Tercih Edilir',
    titleEn: 'Why Choose New York Law',
    descriptionTr: 'New York hukukunun uluslararası sözleşmelerde tercih edilme sebepleri.',
    descriptionEn: 'Why New York law is preferred in international contracts.',
    icon: '🗽',
    category: 'contracts',
    available: true,
    order: 9
  },
  {
    slug: 'platform-ne-yapar-ne-yapmaz',
    titleTr: 'Platform Ne Yapar Ne Yapmaz',
    titleEn: 'What This Platform Does and Does Not Do',
    descriptionTr: 'EchoLegal platformunun kapsamı, sınırları ve kullanım koşulları.',
    descriptionEn: 'Scope, limitations, and terms of use for the EchoLegal platform.',
    icon: 'ℹ️',
    category: 'platform',
    available: true,
    order: 10
  }
]

export interface LegalKit {
  slug: string
  titleTr: string
  titleEn: string
  descriptionTr: string
  descriptionEn: string
  price: number
  includes: string[]
  forWhom: string[]
  notFor: string[]
  jurisdiction: string
  stripeLink: string
  documentUrl: string
}

export const legalKits: LegalKit[] = [
  {
    slug: 'abd-business-starter-legal-kit',
    titleTr: 'ABD İş Başlangıç Hukuk Kiti',
    titleEn: 'US Business Starter Legal Kit',
    descriptionTr: "ABD'de iş kurmak isteyen girişimciler için temel hukuki şablon ve rehber paketi.",
    descriptionEn: 'Essential legal templates and guides for those starting a business in the US.',
    price: 20,
    includes: [
      'LLC İşletme Sözleşmesi şablonu (EN/TR)',
      'NDA şablonu (EN/TR)',
      'Bağımsız Yüklenici Sözleşmesi şablonu (EN/TR)',
      'Hizmet Sözleşmesi şablonu (EN/TR)',
      'EIN başvuru rehberi',
      'Eyalet seçimi karşılaştırma tablosu'
    ],
    forWhom: [
      "ABD'de LLC kurmayı planlayan girişimciler",
      'E-ticaret veya dijital hizmet sunmayı düşünen kişiler',
      "Serbest çalışan olarak ABD'li müşterilere hizmet verenler"
    ],
    notFor: [
      'Vize veya göçmenlik danışmanlığı arayanlar',
      'Dava veya uyuşmazlık desteği isteyenler',
      'Bireysel hukuki temsil bekleyenler'
    ],
    jurisdiction: 'ABD (Delaware, Wyoming, New York odaklı)',
    stripeLink: 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01',
    documentUrl: '/documents/kits/abd-business-starter-kit.zip'
  },
  {
    slug: 'abdye-gelmeden-once-hukuki-gercekler-rehberi',
    titleTr: "ABD'ye Gelmeden Önce Hukuki Gerçekler Rehberi",
    titleEn: 'Legal Realities Before Coming to the US Guide',
    descriptionTr: "ABD'ye gelmeden önce bilinmesi gereken temel hukuki gerçekler ve hazırlık kontrol listesi.",
    descriptionEn: 'Essential legal realities and preparation checklist before coming to the US.',
    price: 20,
    includes: [
      'Vize kategorileri karşılaştırma rehberi',
      'Göçmen niyeti ve 214(b) açıklaması',
      'Statü değişikliği kuralları özeti',
      'Giriş öncesi hazırlık kontrol listesi',
      'Yaygın hata ve riskler listesi'
    ],
    forWhom: [
      "ABD'ye turist vizesiyle gelmeyi planlayanlar",
      'Öğrenci vizesi başvurusu yapacak olanlar',
      'İş amaçlı kısa süreli ziyaret planlayanlar'
    ],
    notFor: [
      'Vize başvurusunun kendileri adına yapılmasını isteyenler',
      'Mülakat hazırlığı için danışmanlık arayanlar',
      'Red sonrası itiraz desteği bekleyenler'
    ],
    jurisdiction: 'ABD Federal Göçmenlik Hukuku',
    stripeLink: 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01',
    documentUrl: '/documents/kits/abdye-gelmeden-once-rehberi.zip'
  },
  {
    slug: 'tr-us-legal-bridge-mini-library',
    titleTr: 'TR-US Hukuki Köprü Mini Kütüphanesi',
    titleEn: 'TR-US Legal Bridge Mini Library',
    descriptionTr: 'Türkiye ile ABD arasında iş yapanlar için kapsamlı sözleşme ve rehber kütüphanesi.',
    descriptionEn: 'Comprehensive contract and guide library for those doing business between Turkey and the US.',
    price: 20,
    includes: [
      'Tüm sözleşme şablonları (7 adet, EN/TR)',
      'ABD İş Başlangıç Hukuk Kiti içeriği',
      'Göçmenlik rehberi',
      'Vergi temelleri özeti',
      'NY hukuku tercih rehberi'
    ],
    forWhom: [
      'Türkiye ile ABD arasında düzenli iş yapanlar',
      'Her iki ülkede de şirketi olanlar',
      'Kapsamlı şablon kütüphanesi isteyenler'
    ],
    notFor: [
      'Tek seferlik basit ihtiyaçları olanlar',
      'Hukuki temsil veya danışmanlık arayanlar',
      'Dava veya uyuşmazlık desteği isteyenler'
    ],
    jurisdiction: 'ABD + Türkiye (çapraz referanslı)',
    stripeLink: 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01',
    documentUrl: '/documents/kits/tr-us-legal-bridge-library.zip'
  }
]

export function getHubPageBySlug(slug: string): HubPage | undefined {
  return amerikaHubPages.find(page => page.slug === slug)
}

export function getLegalKitBySlug(slug: string): LegalKit | undefined {
  return legalKits.find(kit => kit.slug === slug)
}

export function getHubPagesByCategory(category: HubPage['category']): HubPage[] {
  return amerikaHubPages.filter(page => page.category === category).sort((a, b) => a.order - b.order)
}
