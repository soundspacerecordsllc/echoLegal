'use client'

import Link from 'next/link'

type Topic = {
  title: string
  href: string
  category: string
  isNew?: boolean
}

type PopularTopicsProps = {
  lang: 'en' | 'tr'
  variant?: 'sidebar' | 'grid' | 'compact'
  title?: string
  className?: string
}

// Static topics list - can be expanded or made dynamic
const popularTopics: Record<string, Topic[]> = {
  en: [
    { title: 'LLC Formation Guide', href: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim', category: 'Business' },
    { title: 'DS-160 Form Guide', href: '/en/ds-160-rehberi', category: 'Immigration', isNew: true },
    { title: 'W-8BEN & W-9 Guide', href: '/en/irs-vergiler-ve-w8-w9-gercekleri', category: 'Tax' },
    { title: 'US Bank Account', href: '/en/abdde-banka-hesabi-acmak', category: 'Banking' },
    { title: 'Visa Pathways', href: '/en/amerika/abdye-gelme-yollari', category: 'Immigration' },
    { title: 'NDA Template', href: '/en/contracts/nda', category: 'Contracts' },
  ],
  tr: [
    { title: 'LLC Kurma Rehberi', href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim', category: 'İş' },
    { title: 'DS-160 Formu Rehberi', href: '/tr/ds-160-rehberi', category: 'Göçmenlik', isNew: true },
    { title: 'W-8BEN & W-9 Rehberi', href: '/tr/irs-vergiler-ve-w8-w9-gercekleri', category: 'Vergi' },
    { title: 'ABD Banka Hesabı', href: '/tr/abdde-banka-hesabi-acmak', category: 'Bankacılık' },
    { title: 'Vize Yolları', href: '/tr/amerika/abdye-gelme-yollari', category: 'Göçmenlik' },
    { title: 'NDA Şablonu', href: '/tr/contracts/nda', category: 'Sözleşmeler' },
  ],
}

// Recently updated pages with dates
const recentlyUpdated: Record<string, { title: string; href: string; date: string }[]> = {
  en: [
    { title: 'DS-160 Form Guide', href: '/en/ds-160-rehberi', date: '2026-01-20' },
    { title: 'US Sales Tax & Nexus', href: '/en/abd-satis-vergisi-rehberi', date: '2026-01-18' },
    { title: 'Payment Platforms Guide', href: '/en/abd-odemeleri-alma-rehberi', date: '2026-01-15' },
    { title: 'LLC Formation Guide', href: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim', date: '2026-01-10' },
  ],
  tr: [
    { title: 'DS-160 Formu Rehberi', href: '/tr/ds-160-rehberi', date: '2026-01-20' },
    { title: 'ABD Satış Vergisi Rehberi', href: '/tr/abd-satis-vergisi-rehberi', date: '2026-01-18' },
    { title: 'Ödeme Platformları Rehberi', href: '/tr/abd-odemeleri-alma-rehberi', date: '2026-01-15' },
    { title: 'LLC Kurma Rehberi', href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim', date: '2026-01-10' },
  ],
}

export default function PopularTopics({ lang, variant = 'sidebar', title, className = '' }: PopularTopicsProps) {
  const isEnglish = lang === 'en'
  const topics = popularTopics[lang] || popularTopics.en
  const defaultTitle = isEnglish ? 'Popular Topics' : 'Popüler Konular'

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{title || defaultTitle}</h3>
        <div className="flex flex-wrap gap-2">
          {topics.slice(0, 4).map((topic, idx) => (
            <Link
              key={idx}
              href={topic.href}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              {topic.title}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={`${className}`}>
        <h2 className="text-xl font-bold text-black mb-6">{title || defaultTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, idx) => (
            <Link
              key={idx}
              href={topic.href}
              className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">{topic.category}</span>
                {topic.isNew && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    {isEnglish ? 'New' : 'Yeni'}
                  </span>
                )}
              </div>
              <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors block">
                {topic.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Sidebar variant (default)
  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-black mb-4">{title || defaultTitle}</h3>
      <ul className="space-y-3">
        {topics.map((topic, idx) => (
          <li key={idx}>
            <Link
              href={topic.href}
              className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors"
            >
              <span>{topic.title}</span>
              <span className="flex items-center gap-2">
                {topic.isNew && (
                  <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
                    {isEnglish ? 'New' : 'Yeni'}
                  </span>
                )}
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Recently Updated component
export function RecentlyUpdated({ lang, className = '' }: { lang: 'en' | 'tr'; className?: string }) {
  const isEnglish = lang === 'en'
  const updates = recentlyUpdated[lang] || recentlyUpdated.en
  const title = isEnglish ? 'Recently Updated' : 'Son Güncellemeler'

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <ul className="space-y-3">
        {updates.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
            >
              <span className="text-gray-700 hover:text-black">{item.title}</span>
              <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
