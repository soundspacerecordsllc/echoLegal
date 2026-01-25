'use client'

import Link from 'next/link'

type RelatedItem = {
  title: string
  href: string
  description?: string
}

type SeeAlsoProps = {
  lang: 'en' | 'tr'
  items: RelatedItem[]
  title?: string
  variant?: 'list' | 'cards' | 'inline'
  className?: string
}

// Tag-based content mapping for smart recommendations
type ContentTag = 'llc' | 'visa' | 'tax' | 'banking' | 'contracts' | 'immigration' | 'business'

const taggedContent: Record<ContentTag, Record<string, RelatedItem[]>> = {
  llc: {
    en: [
      { title: 'LLC vs Corporation', href: '/en/llc-mi-corporation-mi', description: 'Compare business structures' },
      { title: 'US Bank Account Guide', href: '/en/abdde-banka-hesabi-acmak', description: 'Open business banking' },
      { title: 'Essential Contracts', href: '/en/abdde-is-yapan-turkler-icin-sozlesmeler', description: 'Legal documents you need' },
      { title: 'IRS Tax Guide', href: '/en/irs-vergiler-ve-w8-w9-gercekleri', description: 'Tax obligations for LLCs' },
    ],
    tr: [
      { title: 'LLC mi Corporation mı', href: '/tr/llc-mi-corporation-mi', description: 'İş yapılarını karşılaştırın' },
      { title: 'ABD Banka Hesabı', href: '/tr/abdde-banka-hesabi-acmak', description: 'İş bankacılığı açın' },
      { title: 'Temel Sözleşmeler', href: '/tr/abdde-is-yapan-turkler-icin-sozlesmeler', description: 'İhtiyacınız olan belgeler' },
      { title: 'IRS Vergi Rehberi', href: '/tr/irs-vergiler-ve-w8-w9-gercekleri', description: 'LLC vergi yükümlülükleri' },
    ],
  },
  visa: {
    en: [
      { title: 'Visa Pathways', href: '/en/amerika/abdye-gelme-yollari', description: 'All visa categories' },
      { title: 'DS-160 Form Guide', href: '/en/ds-160-rehberi', description: 'Application instructions' },
      { title: 'Pre-Arrival Checklist', href: '/en/amerika/abd-ye-gelmeden-once', description: 'Before you come' },
    ],
    tr: [
      { title: 'Vize Yolları', href: '/tr/amerika/abdye-gelme-yollari', description: 'Tüm vize kategorileri' },
      { title: 'DS-160 Formu Rehberi', href: '/tr/ds-160-rehberi', description: 'Başvuru talimatları' },
      { title: 'Gelmeden Önce Yapılacaklar', href: '/tr/amerika/abd-ye-gelmeden-once', description: 'Gelmeden önce' },
    ],
  },
  tax: {
    en: [
      { title: 'W-8BEN & W-9 Guide', href: '/en/irs-vergiler-ve-w8-w9-gercekleri', description: 'Tax forms explained' },
      { title: 'US Sales Tax & Nexus', href: '/en/abd-satis-vergisi-rehberi', description: 'E-commerce tax guide' },
      { title: 'LLC Formation', href: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim', description: 'Tax-optimized structure' },
    ],
    tr: [
      { title: 'W-8BEN & W-9 Rehberi', href: '/tr/irs-vergiler-ve-w8-w9-gercekleri', description: 'Vergi formları açıklandı' },
      { title: 'ABD Satış Vergisi', href: '/tr/abd-satis-vergisi-rehberi', description: 'E-ticaret vergi rehberi' },
      { title: 'LLC Kurulumu', href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim', description: 'Vergi optimize yapı' },
    ],
  },
  banking: {
    en: [
      { title: 'US Bank Account', href: '/en/abdde-banka-hesabi-acmak', description: 'Open without SSN' },
      { title: 'Payment Platforms', href: '/en/abd-odemeleri-alma-rehberi', description: 'Stripe, PayPal, Wise' },
      { title: 'LLC Formation', href: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim', description: 'Business structure first' },
    ],
    tr: [
      { title: 'ABD Banka Hesabı', href: '/tr/abdde-banka-hesabi-acmak', description: 'SSN olmadan açın' },
      { title: 'Ödeme Platformları', href: '/tr/abd-odemeleri-alma-rehberi', description: 'Stripe, PayPal, Wise' },
      { title: 'LLC Kurulumu', href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim', description: 'Önce iş yapısı' },
    ],
  },
  contracts: {
    en: [
      { title: 'NDA Template', href: '/en/contracts/nda', description: 'Non-disclosure agreement' },
      { title: 'Service Agreement', href: '/en/contracts/service-agreement', description: 'Freelance contracts' },
      { title: 'Essential Contracts Guide', href: '/en/abdde-is-yapan-turkler-icin-sozlesmeler', description: 'Full overview' },
    ],
    tr: [
      { title: 'NDA Şablonu', href: '/tr/contracts/nda', description: 'Gizlilik sözleşmesi' },
      { title: 'Hizmet Sözleşmesi', href: '/tr/contracts/service-agreement', description: 'Serbest çalışan sözleşmeleri' },
      { title: 'Temel Sözleşmeler Rehberi', href: '/tr/abdde-is-yapan-turkler-icin-sozlesmeler', description: 'Tam genel bakış' },
    ],
  },
  immigration: {
    en: [
      { title: 'Visa Pathways', href: '/en/amerika/abdye-gelme-yollari', description: 'E2, L1, H1B, O1' },
      { title: 'DS-160 Guide', href: '/en/ds-160-rehberi', description: 'Visa form help' },
      { title: 'Tourist Visa Facts', href: '/en/amerika/turist-vizesi-gercekleri', description: 'B1/B2 visa' },
      { title: 'Status Change', href: '/en/amerika/statuden-statuye-gecis-gercekleri', description: 'COS explained' },
    ],
    tr: [
      { title: 'Vize Yolları', href: '/tr/amerika/abdye-gelme-yollari', description: 'E2, L1, H1B, O1' },
      { title: 'DS-160 Rehberi', href: '/tr/ds-160-rehberi', description: 'Vize formu yardımı' },
      { title: 'Turist Vizesi Gerçekleri', href: '/tr/amerika/turist-vizesi-gercekleri', description: 'B1/B2 vizesi' },
      { title: 'Statü Değişikliği', href: '/tr/amerika/statuden-statuye-gecis-gercekleri', description: 'COS açıklandı' },
    ],
  },
  business: {
    en: [
      { title: 'LLC Formation', href: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim', description: 'Start your business' },
      { title: 'LLC vs Corp', href: '/en/llc-mi-corporation-mi', description: 'Choose structure' },
      { title: 'Banking Guide', href: '/en/abdde-banka-hesabi-acmak', description: 'Business banking' },
      { title: 'Legal Starter Kit', href: '/en/legal-kits/business-starter', description: '5 essential docs' },
    ],
    tr: [
      { title: 'LLC Kurulumu', href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim', description: 'İşinizi başlatın' },
      { title: 'LLC mi Corp mu', href: '/tr/llc-mi-corporation-mi', description: 'Yapı seçin' },
      { title: 'Bankacılık Rehberi', href: '/tr/abdde-banka-hesabi-acmak', description: 'İş bankacılığı' },
      { title: 'Legal Starter Kit', href: '/tr/legal-kits/business-starter', description: '5 temel belge' },
    ],
  },
}

// Get related items by tags
export function getRelatedByTags(tags: ContentTag[], lang: 'en' | 'tr', excludeHref?: string): RelatedItem[] {
  const seen = new Set<string>()
  const items: RelatedItem[] = []

  for (const tag of tags) {
    const tagItems = taggedContent[tag]?.[lang] || []
    for (const item of tagItems) {
      if (!seen.has(item.href) && item.href !== excludeHref) {
        seen.add(item.href)
        items.push(item)
      }
    }
  }

  return items.slice(0, 4) // Return max 4 items
}

export default function SeeAlso({ lang, items, title, variant = 'list', className = '' }: SeeAlsoProps) {
  const isEnglish = lang === 'en'
  const defaultTitle = isEnglish ? 'See Also' : 'Ayrıca Bakınız'

  if (items.length === 0) return null

  if (variant === 'inline') {
    return (
      <div className={`text-sm text-gray-600 ${className}`}>
        <span className="font-medium">{title || defaultTitle}:</span>{' '}
        {items.map((item, idx) => (
          <span key={idx}>
            <Link href={item.href} className="text-blue-600 hover:underline">
              {item.title}
            </Link>
            {idx < items.length - 1 && ', '}
          </span>
        ))}
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={`${className}`}>
        <h3 className="text-lg font-bold text-black mb-4">{title || defaultTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
            >
              <h4 className="font-medium text-gray-900 group-hover:text-black mb-1">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-sm text-gray-500">{item.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // List variant (default)
  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-bold text-black mb-4">{title || defaultTitle}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-gray-400 mt-1">→</span>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-black transition-colors"
            >
              <span className="font-medium">{item.title}</span>
              {item.description && (
                <span className="text-sm text-gray-500 ml-1">— {item.description}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Convenience component for tag-based recommendations
export function RelatedContent({
  tags,
  lang,
  excludeHref,
  title,
  variant = 'cards',
  className = ''
}: {
  tags: ContentTag[]
  lang: 'en' | 'tr'
  excludeHref?: string
  title?: string
  variant?: 'list' | 'cards' | 'inline'
  className?: string
}) {
  const items = getRelatedByTags(tags, lang, excludeHref)

  return (
    <SeeAlso
      lang={lang}
      items={items}
      title={title}
      variant={variant}
      className={className}
    />
  )
}
