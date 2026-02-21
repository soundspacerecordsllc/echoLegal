'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  searchTemplates,
  categoryLabels,
  docTypeLabels,
  Template,
} from '@/lib/templates-registry'

type AuthorityLevel = 'primary_law' | 'regulation' | 'case_law' | 'official_guidance' | 'secondary_analysis' | 'template'

const AUTHORITY_WEIGHTS: Record<AuthorityLevel, number> = {
  primary_law: 100,
  regulation: 80,
  case_law: 70,
  official_guidance: 60,
  secondary_analysis: 40,
  template: 20,
}

const AUTHORITY_LABELS: Record<AuthorityLevel, { en: string; tr: string }> = {
  primary_law: { en: 'Statute', tr: 'Kanun' },
  regulation: { en: 'Regulation', tr: 'Düzenleme' },
  case_law: { en: 'Case Law', tr: 'İçtihat' },
  official_guidance: { en: 'Official Guidance', tr: 'Resmi Rehber' },
  secondary_analysis: { en: 'Analysis', tr: 'Analiz' },
  template: { en: 'Template', tr: 'Şablon' },
}

type SearchResult = {
  title: string
  description: string
  href: string
  category: string
  type: 'template' | 'guide' | 'page'
  authorityLevel: AuthorityLevel
}

type SiteSearchProps = {
  lang: 'en' | 'tr'
  variant?: 'header' | 'standalone' | 'modal'
  className?: string
}

// Static search index for guides and pages
const staticSearchIndex: Record<string, SearchResult[]> = {
  en: [
    { title: 'LLC Formation Guide', description: 'Step-by-step guide to forming a US LLC', href: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim', category: 'Guides', type: 'guide', authorityLevel: 'regulation' },
    { title: 'DS-160 Form Guide', description: 'Visa application instructions', href: '/en/ds-160-rehberi', category: 'Immigration', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'W-8BEN Guide', description: 'Tax forms for non-residents', href: '/en/irs-vergiler-ve-w8-w9-gercekleri', category: 'Tax', type: 'guide', authorityLevel: 'regulation' },
    { title: 'EIN vs ITIN vs SSN', description: 'Tax ID numbers explained', href: '/en/ein-itin-ssn-farki', category: 'Tax', type: 'guide', authorityLevel: 'regulation' },
    { title: '1099 Tax Documents', description: 'Understanding 1099 forms', href: '/en/1099-vergi-belgeleri', category: 'Tax', type: 'guide', authorityLevel: 'regulation' },
    { title: 'Tax & ID Hub', description: 'All tax and ID guides', href: '/en/vergi-kimlik-rehberi', category: 'Tax', type: 'page', authorityLevel: 'secondary_analysis' },
    { title: 'US Bank Account', description: 'Opening accounts as non-resident', href: '/en/abdde-banka-hesabi-acmak', category: 'Banking', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'Sales Tax & Nexus', description: 'E-commerce tax obligations', href: '/en/abd-satis-vergisi-rehberi', category: 'Tax', type: 'guide', authorityLevel: 'regulation' },
    { title: 'Payment Platforms', description: 'Stripe, PayPal, Wise guide', href: '/en/abd-odemeleri-alma-rehberi', category: 'Payments', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'LLC vs Corporation', description: 'Business structure comparison', href: '/en/llc-mi-corporation-mi', category: 'Business', type: 'guide', authorityLevel: 'secondary_analysis' },
    { title: 'Essential Contracts', description: 'Must-have legal documents', href: '/en/abdde-is-yapan-turkler-icin-sozlesmeler', category: 'Contracts', type: 'guide', authorityLevel: 'secondary_analysis' },
    { title: 'Visa Categories', description: 'US visa types explained', href: '/en/amerika/abdye-gelme-yollari', category: 'Immigration', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'Legal Starter Kit', description: 'Essential documents bundle', href: '/en/legal-kits/business-starter', category: 'Kits', type: 'page', authorityLevel: 'template' },
    { title: 'Templates Library', description: 'Browse all legal templates', href: '/en/templates', category: 'Library', type: 'page', authorityLevel: 'secondary_analysis' },
    { title: 'US Business Hub', description: 'All US business resources', href: '/en/amerika', category: 'Hub', type: 'page', authorityLevel: 'secondary_analysis' },
  ],
  tr: [
    { title: 'LLC Kurma Rehberi', description: 'ABD LLC kurma adım adım rehberi', href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim', category: 'Rehberler', type: 'guide', authorityLevel: 'regulation' },
    { title: 'DS-160 Formu Rehberi', description: 'Vize başvurusu talimatları', href: '/tr/ds-160-rehberi', category: 'Göçmenlik', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'W-8BEN Rehberi', description: 'Yabancılar için vergi formları', href: '/tr/irs-vergiler-ve-w8-w9-gercekleri', category: 'Vergi', type: 'guide', authorityLevel: 'regulation' },
    { title: 'EIN, ITIN, SSN Farkları', description: 'Vergi kimlik numaraları', href: '/tr/ein-itin-ssn-farki', category: 'Vergi', type: 'guide', authorityLevel: 'regulation' },
    { title: '1099 Vergi Belgeleri', description: '1099 formlarını anlama', href: '/tr/1099-vergi-belgeleri', category: 'Vergi', type: 'guide', authorityLevel: 'regulation' },
    { title: 'Vergi ve Kimlik Rehberi', description: 'Tüm vergi ve kimlik rehberleri', href: '/tr/vergi-kimlik-rehberi', category: 'Vergi', type: 'page', authorityLevel: 'secondary_analysis' },
    { title: 'ABD Banka Hesabı', description: 'Yabancı olarak hesap açma', href: '/tr/abdde-banka-hesabi-acmak', category: 'Bankacılık', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'Satış Vergisi ve Nexus', description: 'E-ticaret vergi yükümlülükleri', href: '/tr/abd-satis-vergisi-rehberi', category: 'Vergi', type: 'guide', authorityLevel: 'regulation' },
    { title: 'Ödeme Platformları', description: 'Stripe, PayPal, Wise rehberi', href: '/tr/abd-odemeleri-alma-rehberi', category: 'Ödemeler', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'LLC mi Corporation mı', description: 'İş yapısı karşılaştırması', href: '/tr/llc-mi-corporation-mi', category: 'İş', type: 'guide', authorityLevel: 'secondary_analysis' },
    { title: 'Temel Sözleşmeler', description: 'Olmazsa olmaz hukuki belgeler', href: '/tr/abdde-is-yapan-turkler-icin-sozlesmeler', category: 'Sözleşmeler', type: 'guide', authorityLevel: 'secondary_analysis' },
    { title: 'Vize Kategorileri', description: 'ABD vize türleri açıklandı', href: '/tr/amerika/abdye-gelme-yollari', category: 'Göçmenlik', type: 'guide', authorityLevel: 'official_guidance' },
    { title: 'Legal Starter Kit', description: 'Temel belgeler paketi', href: '/tr/legal-kits/business-starter', category: 'Kitler', type: 'page', authorityLevel: 'template' },
    { title: 'Şablon Kütüphanesi', description: 'Tüm hukuki şablonlara göz atın', href: '/tr/templates', category: 'Kütüphane', type: 'page', authorityLevel: 'secondary_analysis' },
    { title: 'ABD İş Merkezi', description: 'Tüm ABD iş kaynakları', href: '/tr/amerika', category: 'Merkez', type: 'page', authorityLevel: 'secondary_analysis' },
  ],
}

// Convert template to search result
function templateToSearchResult(template: Template, lang: 'en' | 'tr'): SearchResult {
  return {
    title: template.title,
    description: template.shortDescription,
    href: `/${lang}/templates/${template.slug}`,
    category: categoryLabels[template.category][lang],
    type: 'template',
    authorityLevel: 'template',
  }
}

export default function SiteSearch({ lang, variant = 'header', className = '' }: SiteSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const isEnglish = lang === 'en'
  const placeholder = isEnglish ? 'Search templates, guides...' : 'Şablon, rehber ara...'

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    const searchTerms = searchQuery.toLowerCase().split(' ')
    const allResults: SearchResult[] = []

    // Search static index (guides, pages)
    const staticIndex = staticSearchIndex[lang] || staticSearchIndex.en
    const staticResults = staticIndex.filter((item) => {
      const searchText = `${item.title} ${item.description} ${item.category}`.toLowerCase()
      return searchTerms.every((term) => searchText.includes(term))
    })
    allResults.push(...staticResults)

    // Search templates from registry
    const templateResults = searchTemplates(searchQuery, lang)
    const templateSearchResults = templateResults.slice(0, 8).map(t => templateToSearchResult(t, lang))

    // Merge and deduplicate
    templateSearchResults.forEach(tr => {
      if (!allResults.some(r => r.href === tr.href)) {
        allResults.push(tr)
      }
    })

    // Sort by authority weight desc, then title match, then alphabetical
    allResults.sort((a, b) => {
      const weightA = AUTHORITY_WEIGHTS[a.authorityLevel]
      const weightB = AUTHORITY_WEIGHTS[b.authorityLevel]
      if (weightA !== weightB) return weightB - weightA
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()
      const aStartsWith = aTitle.startsWith(searchTerms[0])
      const bStartsWith = bTitle.startsWith(searchTerms[0])
      if (aStartsWith && !bStartsWith) return -1
      if (!aStartsWith && bStartsWith) return 1
      return aTitle.localeCompare(bTitle)
    })

    setResults(allResults.slice(0, 10))
    setSelectedIndex(0)
  }, [lang])

  // Watch query changes
  useEffect(() => {
    performSearch(query)
  }, [query, performSearch])

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Cmd/Ctrl + K to focus search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
      // Escape to close
      if (event.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle keyboard navigation in results
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (event.key === 'Enter' && results[selectedIndex]) {
      handleResultClick(results[selectedIndex].href)
    }
  }

  const handleResultClick = (href: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(href)
  }

  // Get type badge style
  const getTypeBadge = (type: SearchResult['type']) => {
    switch (type) {
      case 'template':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: isEnglish ? 'Template' : 'Şablon' }
      case 'guide':
        return { bg: 'bg-green-100', text: 'text-green-700', label: isEnglish ? 'Guide' : 'Rehber' }
      case 'page':
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: isEnglish ? 'Page' : 'Sayfa' }
    }
  }

  if (variant === 'header') {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-48 lg:w-64 px-3 py-1.5 pl-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hidden lg:block">
            ⌘K
          </span>
        </div>

        {/* Results dropdown */}
        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden max-h-[60vh] overflow-y-auto">
            {results.map((result, index) => {
              const badge = getTypeBadge(result.type)
              return (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.href)}
                  className={`w-full px-4 py-3 text-left border-b border-gray-100 last:border-b-0 transition-colors ${
                    index === selectedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs rounded ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs text-stone-400">{AUTHORITY_LABELS[result.authorityLevel]?.[lang] ?? ''}</span>
                    <span className="text-xs text-gray-400">{result.category}</span>
                  </div>
                  <span className="font-medium text-sm text-ink">{result.title}</span>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{result.description}</p>
                </button>
              )
            })}
            <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between bg-gray-50">
              <span>
                <kbd className="px-1 py-0.5 bg-white rounded border">↑</kbd>{' '}
                <kbd className="px-1 py-0.5 bg-white rounded border">↓</kbd>{' '}
                {isEnglish ? 'navigate' : 'gezin'}
              </span>
              <span>
                <kbd className="px-1 py-0.5 bg-white rounded border">Enter</kbd>{' '}
                {isEnglish ? 'select' : 'seç'}
              </span>
            </div>
          </div>
        )}

        {/* No results */}
        {isOpen && query.length >= 2 && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <p className="text-sm text-gray-500 text-center">
              {isEnglish ? 'No results found' : 'Sonuç bulunamadı'}
            </p>
          </div>
        )}
      </div>
    )
  }

  // Standalone variant (for search page)
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-xl focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
          ⌘K
        </span>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((result, index) => {
            const badge = getTypeBadge(result.type)
            return (
              <Link
                key={index}
                href={result.href}
                className={`block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${
                  index === selectedIndex ? 'ring-2 ring-gray-300' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 text-xs rounded ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                  <span className="text-xs text-stone-400">{AUTHORITY_LABELS[result.authorityLevel]?.[lang] ?? ''}</span>
                  <span className="text-xs text-gray-400">{result.category}</span>
                </div>
                <span className="font-medium text-ink">{result.title}</span>
                <p className="text-sm text-gray-600 mt-1">{result.description}</p>
              </Link>
            )
          })}
        </div>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="mt-4 p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
          {isEnglish ? 'No results found. Try a different search term.' : 'Sonuç bulunamadı. Farklı bir arama terimi deneyin.'}
        </div>
      )}
    </div>
  )
}
