'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

type SearchItem = {
  id: string
  url: string
  titleEn: string
  titleTr: string
  descriptionEn: string
  descriptionTr: string
  category: string
  jurisdiction: string | null
  keywords: string[]
  authorityLevel?: string
}

// Authority level weight map for deterministic ordering
const AUTHORITY_WEIGHTS: Record<string, number> = {
  primary_law: 100,
  regulation: 200,
  case_law: 300,
  official_guidance: 400,
  secondary_analysis: 500,
  template: 600,
}

const AUTHORITY_LABELS: Record<string, { en: string; tr: string }> = {
  primary_law: { en: 'Statute', tr: 'Kanun' },
  regulation: { en: 'Regulation', tr: 'Düzenleme' },
  case_law: { en: 'Case Law', tr: 'İçtihat' },
  official_guidance: { en: 'Official Guidance', tr: 'Resmi Rehber' },
  secondary_analysis: { en: 'Analysis', tr: 'Analiz' },
  template: { en: 'Template', tr: 'Şablon' },
}

// Derive authority level from item category when not explicitly set
function getItemAuthorityLevel(item: SearchItem): string {
  if (item.authorityLevel) return item.authorityLevel
  switch (item.category) {
    case 'contract': return 'template'
    case 'checklist': return 'template'
    case 'consular': return 'official_guidance'
    case 'cornerstone': return 'regulation'
    case 'amerika': return 'official_guidance'
    default: return 'secondary_analysis'
  }
}

type SearchIndex = {
  version: string
  generated: string
  totalItems: number
  items: SearchItem[]
}

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
  lang: string
}

export default function SearchModal({ isOpen, onClose, lang }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const isEnglish = lang === 'en'

  // Popular links shown when no results
  const popularLinks = [
    { url: '/contracts', titleEn: 'Contracts Library', titleTr: 'Sözleşmeler' },
    { url: '/contracts/nda', titleEn: 'NDA Template', titleTr: 'Gizlilik Sözleşmesi' },
    { url: '/encyclopedia/common-misconceptions', titleEn: 'Common Misconceptions', titleTr: 'Yaygın Yanlış Varsayımlar' },
    { url: '/consular-documents', titleEn: 'Consular Documents', titleTr: 'Konsolosluk Belgeleri' },
  ]

  // Load search index on mount
  useEffect(() => {
    async function loadIndex() {
      try {
        const response = await fetch('/search-index.json')
        const data = await response.json()
        setSearchIndex(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load search index:', error)
        setIsLoading(false)
      }
    }
    loadIndex()
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchIndex || !searchQuery.trim()) {
      setResults([])
      return
    }

    const q = searchQuery.toLowerCase().trim()
    const scored = searchIndex.items.map((item) => {
      let score = 0
      const title = isEnglish ? item.titleEn : item.titleTr
      const description = isEnglish ? item.descriptionEn : item.descriptionTr

      // Exact title match (highest priority)
      if (title.toLowerCase().includes(q)) {
        score += 100
      }
      // Keywords match
      if (item.keywords.some((k) => k.toLowerCase().includes(q))) {
        score += 50
      }
      // Description match
      if (description.toLowerCase().includes(q)) {
        score += 25
      }
      // URL match
      if (item.url.toLowerCase().includes(q)) {
        score += 10
      }

      return { item, score }
    })

    const filtered = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => {
        const weightA = AUTHORITY_WEIGHTS[getItemAuthorityLevel(a.item)] ?? 500
        const weightB = AUTHORITY_WEIGHTS[getItemAuthorityLevel(b.item)] ?? 500
        if (weightA !== weightB) return weightA - weightB
        if (a.score !== b.score) return b.score - a.score
        return a.item.id.localeCompare(b.item.id)
      })
      .slice(0, 8)
      .map((s) => s.item)

    setResults(filtered)
    setSelectedIndex(0)
  }, [searchIndex, isEnglish])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 150)
    return () => clearTimeout(timer)
  }, [query, performSearch])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            window.location.href = `/${lang}${results[selectedIndex].url}`
            onClose()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex, lang])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, results.length])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { en: string; tr: string }> = {
      contract: { en: 'Contract', tr: 'Sözleşme' },
      article: { en: 'Article', tr: 'Makale' },
      consular: { en: 'Consular', tr: 'Konsolosluk' },
      page: { en: 'Page', tr: 'Sayfa' },
    }
    return isEnglish ? labels[category]?.en || category : labels[category]?.tr || category
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={isEnglish ? 'Search' : 'Ara'}
    >
      <div className="w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="relative border-b border-gray-200">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEnglish ? 'Search contracts, articles, topics...' : 'Sözleşme, makale, konu ara...'}
            className="w-full pl-12 pr-12 py-4 text-lg outline-none"
            aria-label={isEnglish ? 'Search input' : 'Arama girişi'}
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium px-2 py-1 rounded border border-gray-200"
            aria-label={isEnglish ? 'Close search' : 'Aramayı kapat'}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto" ref={resultsRef}>
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              {isEnglish ? 'Loading...' : 'Yükleniyor...'}
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/${lang}${item.url}`}
                  onClick={onClose}
                  className={`block px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-amber-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate">
                          {isEnglish ? item.titleEn : item.titleTr}
                        </span>
                        <span className="text-xs text-stone-400">
                          {AUTHORITY_LABELS[getItemAuthorityLevel(item)]?.[isEnglish ? 'en' : 'tr'] ?? ''}
                        </span>
                        <span className="inline-flex px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {isEnglish ? item.descriptionEn : item.descriptionTr}
                      </p>
                    </div>
                    <span className="text-stone-400 flex-shrink-0">→</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">
                {isEnglish ? 'No results found for' : 'Sonuç bulunamadı:'} &quot;{query}&quot;
              </p>
              <p className="text-sm text-gray-400 mb-6">
                {isEnglish ? 'Try searching for:' : 'Şunları deneyin:'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['NDA', 'LLC', isEnglish ? 'Contract' : 'Sözleşme', isEnglish ? 'Visa' : 'Vize'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">
                {isEnglish ? 'Popular' : 'Popüler'}
              </p>
              {popularLinks.map((link) => (
                <Link
                  key={link.url}
                  href={`/${lang}${link.url}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-2 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-medium text-gray-700">
                    {isEnglish ? link.titleEn : link.titleTr}
                  </span>
                  <span className="text-gray-400">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">↑↓</kbd>
                {isEnglish ? 'Navigate' : 'Gezin'}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">↵</kbd>
                {isEnglish ? 'Open' : 'Aç'}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono">esc</kbd>
                {isEnglish ? 'Close' : 'Kapat'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
