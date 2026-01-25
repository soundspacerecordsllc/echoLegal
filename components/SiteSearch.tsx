'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type SearchResult = {
  title: string
  description: string
  href: string
  category: string
}

type SiteSearchProps = {
  lang: 'en' | 'tr'
  variant?: 'header' | 'standalone'
  className?: string
}

// Static search index - lightweight, no external dependencies
const searchIndex: Record<string, SearchResult[]> = {
  en: [
    { title: 'LLC Formation Guide', description: 'Step-by-step guide to forming a US LLC', href: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim', category: 'Guides' },
    { title: 'DS-160 Form Guide', description: 'Visa application instructions', href: '/en/ds-160-rehberi', category: 'Immigration' },
    { title: 'W-8BEN Guide', description: 'Tax forms for non-residents', href: '/en/irs-vergiler-ve-w8-w9-gercekleri', category: 'Tax' },
    { title: 'US Bank Account', description: 'Opening accounts as non-resident', href: '/en/abdde-banka-hesabi-acmak', category: 'Banking' },
    { title: 'Sales Tax & Nexus', description: 'E-commerce tax obligations', href: '/en/abd-satis-vergisi-rehberi', category: 'Tax' },
    { title: 'Payment Platforms', description: 'Stripe, PayPal, Wise guide', href: '/en/abd-odemeleri-alma-rehberi', category: 'Payments' },
    { title: 'LLC vs Corporation', description: 'Business structure comparison', href: '/en/llc-mi-corporation-mi', category: 'Business' },
    { title: 'Essential Contracts', description: 'Must-have legal documents', href: '/en/abdde-is-yapan-turkler-icin-sozlesmeler', category: 'Contracts' },
    { title: 'NDA Template', description: 'Non-disclosure agreement', href: '/en/contracts/nda', category: 'Templates' },
    { title: 'Service Agreement', description: 'Service contract template', href: '/en/contracts/service-agreement', category: 'Templates' },
    { title: 'Visa Categories', description: 'US visa types explained', href: '/en/amerika/abdye-gelme-yollari', category: 'Immigration' },
    { title: 'Legal Starter Kit', description: 'Essential documents bundle', href: '/en/legal-kits/business-starter', category: 'Kits' },
  ],
  tr: [
    { title: 'LLC Kurma Rehberi', description: 'ABD LLC kurma adım adım rehberi', href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim', category: 'Rehberler' },
    { title: 'DS-160 Formu Rehberi', description: 'Vize başvurusu talimatları', href: '/tr/ds-160-rehberi', category: 'Göçmenlik' },
    { title: 'W-8BEN Rehberi', description: 'Yabancılar için vergi formları', href: '/tr/irs-vergiler-ve-w8-w9-gercekleri', category: 'Vergi' },
    { title: 'ABD Banka Hesabı', description: 'Yabancı olarak hesap açma', href: '/tr/abdde-banka-hesabi-acmak', category: 'Bankacılık' },
    { title: 'Satış Vergisi ve Nexus', description: 'E-ticaret vergi yükümlülükleri', href: '/tr/abd-satis-vergisi-rehberi', category: 'Vergi' },
    { title: 'Ödeme Platformları', description: 'Stripe, PayPal, Wise rehberi', href: '/tr/abd-odemeleri-alma-rehberi', category: 'Ödemeler' },
    { title: 'LLC mi Corporation mı', description: 'İş yapısı karşılaştırması', href: '/tr/llc-mi-corporation-mi', category: 'İş' },
    { title: 'Temel Sözleşmeler', description: 'Olmazsa olmaz hukuki belgeler', href: '/tr/abdde-is-yapan-turkler-icin-sozlesmeler', category: 'Sözleşmeler' },
    { title: 'NDA Şablonu', description: 'Gizlilik sözleşmesi', href: '/tr/contracts/nda', category: 'Şablonlar' },
    { title: 'Hizmet Sözleşmesi', description: 'Hizmet sözleşmesi şablonu', href: '/tr/contracts/service-agreement', category: 'Şablonlar' },
    { title: 'Vize Kategorileri', description: 'ABD vize türleri açıklandı', href: '/tr/amerika/abdye-gelme-yollari', category: 'Göçmenlik' },
    { title: 'Legal Starter Kit', description: 'Temel belgeler paketi', href: '/tr/legal-kits/business-starter', category: 'Kitler' },
  ],
}

export default function SiteSearch({ lang, variant = 'header', className = '' }: SiteSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const isEnglish = lang === 'en'
  const placeholder = isEnglish ? 'Search guides, contracts...' : 'Rehberler, sözleşmeler ara...'

  // Search function
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchTerms = query.toLowerCase().split(' ')
    const index = searchIndex[lang] || searchIndex.en

    const filtered = index.filter((item) => {
      const searchText = `${item.title} ${item.description} ${item.category}`.toLowerCase()
      return searchTerms.every((term) => searchText.includes(term))
    })

    setResults(filtered.slice(0, 6))
  }, [query, lang])

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

  const handleResultClick = (href: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(href)
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
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleResultClick(result.href)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-black">{result.title}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{result.category}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{result.description}</p>
              </button>
            ))}
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
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((result, index) => (
            <Link
              key={index}
              href={result.href}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-black">{result.title}</span>
                <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded">{result.category}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{result.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
