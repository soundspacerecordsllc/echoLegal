'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type SearchResult = {
  id: string
  title: string
  description: string
  url: string
  category: string
  type: 'template' | 'guide' | 'checklist' | 'kit' | 'page'
  lang: 'en' | 'tr'
}

type HomeSearchProps = {
  lang: 'en' | 'tr'
}

/**
 * HomeSearch Component
 *
 * A prominent, large search bar designed for the homepage hero section.
 * Features instant search with dropdown results.
 */
export default function HomeSearch({ lang }: HomeSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const isEnglish = lang === 'en'

  const placeholder = isEnglish
    ? 'Search legal templates, guides, and resources...'
    : 'Hukuki şablonlar, rehberler ve kaynaklar arayın...'

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const { searchIndex } = await import('@/lib/search-index')
      const searchResults = searchIndex(searchQuery, { lang, limit: 6 })
      setResults(searchResults)
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [lang])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 150)
    return () => clearTimeout(timer)
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

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (event.key === 'Enter' && results[selectedIndex]) {
      event.preventDefault()
      handleResultClick(results[selectedIndex].url)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleResultClick = (url: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(url)
  }

  // Type badge styling
  const getTypeBadge = (type: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      template: { bg: 'bg-blue-50', text: 'text-blue-700', label: isEnglish ? 'Template' : 'Şablon' },
      guide: { bg: 'bg-green-50', text: 'text-green-700', label: isEnglish ? 'Guide' : 'Rehber' },
      checklist: { bg: 'bg-amber-50', text: 'text-amber-700', label: isEnglish ? 'Checklist' : 'Kontrol Listesi' },
      kit: { bg: 'bg-purple-50', text: 'text-purple-700', label: isEnglish ? 'Kit' : 'Kit' },
      page: { bg: 'bg-gray-100', text: 'text-gray-600', label: isEnglish ? 'Page' : 'Sayfa' },
    }
    return badges[type] || badges.page
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
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
          className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all"
          aria-label={isEnglish ? 'Search' : 'Ara'}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (results.length > 0 || (query.length >= 2 && !isLoading)) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden max-h-[400px] overflow-y-auto">
          {results.length > 0 ? (
            <>
              {results.map((result, index) => {
                const badge = getTypeBadge(result.type)
                return (
                  <button
                    key={result.id || index}
                    onClick={() => handleResultClick(result.url)}
                    className={`w-full px-4 py-3 text-left border-b border-gray-50 last:border-b-0 transition-colors ${
                      index === selectedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs rounded font-medium ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs text-gray-400">{result.category}</span>
                    </div>
                    <div className="font-medium text-gray-900">{result.title}</div>
                    <div className="text-sm text-gray-500 mt-0.5 line-clamp-1">{result.description}</div>
                  </button>
                )
              })}
              {/* Navigation hints */}
              <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between bg-gray-50">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-gray-500">↑</kbd>{' '}
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-gray-500">↓</kbd>{' '}
                  {isEnglish ? 'to navigate' : 'gezinmek için'}
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 text-gray-500">Enter</kbd>{' '}
                  {isEnglish ? 'to select' : 'seçmek için'}
                </span>
              </div>
            </>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{isEnglish ? 'No results found' : 'Sonuç bulunamadı'}</p>
              <p className="text-xs mt-1">{isEnglish ? 'Try a different search term' : 'Farklı bir arama terimi deneyin'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
