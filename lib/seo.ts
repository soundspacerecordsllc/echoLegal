import { Metadata } from 'next'

type SupportedLocale = 'en' | 'tr'

interface SEOConfig {
  title: string
  titleTr: string
  description: string
  descriptionTr: string
  keywords?: string[]
  keywordsTr?: string[]
  image?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  price?: number
  currency?: string
}

/**
 * Generate metadata for a page with bilingual support
 */
export function generatePageMetadata(
  config: SEOConfig,
  lang: SupportedLocale,
  path: string
): Metadata {
  const isEnglish = lang === 'en'
  const title = isEnglish ? config.title : config.titleTr
  const description = isEnglish ? config.description : config.descriptionTr
  const keywords = isEnglish ? config.keywords : config.keywordsTr
  const url = `https://echo-legal.com/${lang}${path}`
  const altLang = isEnglish ? 'tr' : 'en'
  const altUrl = `https://echo-legal.com/${altLang}${path}`

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    authors: config.author ? [{ name: config.author }] : [{ name: 'EchoLegal' }],
    openGraph: {
      title,
      description,
      url,
      siteName: 'EchoLegal',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      type: config.type === 'article' ? 'article' : 'website',
      images: config.image ? [
        {
          url: config.image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [
        {
          url: 'https://echo-legal.com/og-default.png',
          width: 1200,
          height: 630,
          alt: 'EchoLegal - Legal Encyclopedia',
        }
      ],
      ...(config.type === 'article' && {
        publishedTime: config.publishedTime,
        modifiedTime: config.modifiedTime,
        authors: config.author ? [config.author] : ['EchoLegal'],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: config.image ? [config.image] : ['https://echo-legal.com/og-default.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `https://echo-legal.com/en${path}`,
        'tr': `https://echo-legal.com/tr${path}`,
        'x-default': `https://echo-legal.com/en${path}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Common SEO configurations for reuse across pages
 */
export const seoConfigs = {
  home: {
    title: 'EchoLegal | Free Legal Encyclopedia & Contract Templates',
    titleTr: 'EchoLegal | Ücretsiz Hukuk Ansiklopedisi ve Sözleşme Şablonları',
    description: 'Bilingual legal encyclopedia with professionally drafted contracts and legal guides in English and Turkish. Free access to NDA, service agreements, and more.',
    descriptionTr: 'İngilizce ve Türkçe profesyonelce hazırlanmış sözleşmeler ve hukuki rehberler içeren iki dilli hukuk ansiklopedisi. NDA, hizmet sözleşmeleri ve daha fazlasına ücretsiz erişim.',
    keywords: ['legal templates', 'contract templates', 'NDA', 'service agreement', 'Turkish legal', 'US business formation', 'LLC formation'],
    keywordsTr: ['hukuki şablonlar', 'sözleşme şablonları', 'NDA', 'gizlilik sözleşmesi', 'hizmet sözleşmesi', 'ABD şirket kurma', 'LLC kurma'],
  },
  library: {
    title: 'Legal Guides Library | EchoLegal',
    titleTr: 'Hukuki Rehberler Kütüphanesi | EchoLegal',
    description: 'Comprehensive legal guides for Turkish entrepreneurs in the US. LLC formation, IRS tax facts, visa requirements, and common legal misconceptions.',
    descriptionTr: 'ABD\'deki Türk girişimciler için kapsamlı hukuki rehberler. LLC kurma, IRS vergi gerçekleri, vize gereksinimleri ve yaygın hukuki yanılgılar.',
    keywords: ['LLC formation guide', 'IRS tax guide', 'US visa guide', 'Turkish entrepreneurs US', 'US business guide'],
    keywordsTr: ['LLC kurma rehberi', 'IRS vergi rehberi', 'ABD vize rehberi', 'Türk girişimciler ABD', 'ABD iş rehberi'],
  },
  contracts: {
    title: 'Legal Contract Templates | EchoLegal',
    titleTr: 'Hukuki Sözleşme Şablonları | EchoLegal',
    description: 'Professionally drafted legal contract templates in English and Turkish. NDA, service agreements, employment contracts, and more.',
    descriptionTr: 'İngilizce ve Türkçe profesyonelce hazırlanmış hukuki sözleşme şablonları. NDA, hizmet sözleşmeleri, iş sözleşmeleri ve daha fazlası.',
    keywords: ['NDA template', 'service agreement template', 'contract templates', 'legal documents', 'bilingual contracts'],
    keywordsTr: ['NDA şablonu', 'hizmet sözleşmesi şablonu', 'sözleşme şablonları', 'hukuki belgeler', 'iki dilli sözleşmeler'],
  },
  legalKits: {
    title: 'Legal Starter Kits | EchoLegal',
    titleTr: 'Hukuki Başlangıç Kitleri | EchoLegal',
    description: 'Essential legal document bundles for starting a business in the US. Complete kits with NDA, service agreements, privacy policy, and more.',
    descriptionTr: 'ABD\'de iş kurmak için temel hukuki belge paketleri. NDA, hizmet sözleşmeleri, gizlilik politikası ve daha fazlasını içeren tam kitler.',
    keywords: ['business starter kit', 'legal documents bundle', 'US business documents', 'startup legal kit'],
    keywordsTr: ['iş başlangıç kiti', 'hukuki belge paketi', 'ABD iş belgeleri', 'girişim hukuk kiti'],
  },
  consular: {
    title: 'Turkish Consular Services Guide | EchoLegal',
    titleTr: 'Türk Konsolosluk Hizmetleri Rehberi | EchoLegal',
    description: 'Complete guide to Turkish consular services in the US. Passport renewal, ID card, notary services, birth and marriage registration.',
    descriptionTr: 'ABD\'deki Türk konsolosluk hizmetleri için tam rehber. Pasaport yenileme, kimlik kartı, noter hizmetleri, doğum ve evlilik kaydı.',
    keywords: ['Turkish consulate', 'passport renewal', 'Turkish ID', 'consular services', 'Turkish notary'],
    keywordsTr: ['Türk konsolosluğu', 'pasaport yenileme', 'Türk kimliği', 'konsolosluk hizmetleri', 'Türk noter'],
  },
  amerika: {
    title: 'Coming to the US Guide | EchoLegal',
    titleTr: 'ABD\'ye Gelmek Rehberi | EchoLegal',
    description: 'Comprehensive guide for Turkish entrepreneurs coming to the US. Visa options, LLC formation, banking, taxes, and legal requirements.',
    descriptionTr: 'ABD\'ye gelen Türk girişimciler için kapsamlı rehber. Vize seçenekleri, LLC kurma, bankacılık, vergiler ve hukuki gereksinimler.',
    keywords: ['US visa guide', 'Turkish entrepreneurs US', 'US business formation', 'US immigration', 'E-2 visa'],
    keywordsTr: ['ABD vize rehberi', 'Türk girişimciler ABD', 'ABD şirket kurma', 'ABD göçmenlik', 'E-2 vizesi'],
  },
}
