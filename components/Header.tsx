'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

type HeaderProps = {
  lang: string
  dict: any
}

type DropdownItem = {
  label: string
  href: string
  description?: string
}

type NavItem = {
  key: string
  label: string
  href: string
  dropdown?: DropdownItem[]
}

export default function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isEnglish = lang === 'en'
  const switchLang = lang === 'en' ? 'tr' : 'en'

  // Handle path switching for language toggle
  const currentPath = pathname.replace(`/${lang}`, '')
  // Map Turkish-specific paths to English equivalents and vice versa
  let switchPath = currentPath
  if (currentPath.startsWith('/sablonlar')) {
    switchPath = currentPath.replace('/sablonlar', '/templates')
  } else if (currentPath.startsWith('/templates')) {
    switchPath = currentPath.replace('/templates', '/sablonlar')
  }
  const switchUrl = `/${switchLang}${switchPath || ''}`

  // Templates URL based on language
  const templatesUrl = isEnglish ? `/${lang}/templates` : '/tr/sablonlar'

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut for search
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Navigation structure - simplified and clear hierarchy
  const navItems: NavItem[] = [
    {
      key: 'library',
      label: isEnglish ? 'Library' : 'Kütüphane',
      href: `/${lang}/library`,
      dropdown: [
        {
          label: isEnglish ? 'Reference Guides' : 'Referans Rehberleri',
          href: `/${lang}/library`,
          description: isEnglish ? 'In-depth legal explanations' : 'Derinlemesine hukuki açıklamalar'
        },
        {
          label: isEnglish ? 'US Business Hub' : 'ABD İş Merkezi',
          href: `/${lang}/amerika`,
          description: isEnglish ? 'Complete US business resource' : 'Kapsamlı ABD iş kaynağı'
        },
        {
          label: isEnglish ? 'Encyclopedia' : 'Ansiklopedi',
          href: `/${lang}/encyclopedia`,
          description: isEnglish ? 'Legal concepts explained' : 'Hukuki kavramlar açıklandı'
        },
      ]
    },
    {
      key: 'templates',
      label: isEnglish ? 'Templates' : 'Şablonlar',
      href: templatesUrl,
      dropdown: [
        {
          label: isEnglish ? 'All Templates' : 'Tüm Şablonlar',
          href: templatesUrl,
          description: isEnglish ? '50+ legal documents' : '50+ hukuki belge'
        },
        {
          label: isEnglish ? 'Contracts' : 'Sözleşmeler',
          href: `/${lang}/contracts`,
          description: isEnglish ? 'NDA, Service, Freelance' : 'NDA, Hizmet, Serbest Çalışan'
        },
      ]
    },
    {
      key: 'checklists',
      label: isEnglish ? 'Checklists' : 'Kontrol Listeleri',
      href: `/${lang}/checklists`,
      dropdown: [
        {
          label: isEnglish ? 'All Checklists' : 'Tüm Listeler',
          href: `/${lang}/checklists`,
          description: isEnglish ? 'Quick reference tools' : 'Hızlı referans araçları'
        },
        {
          label: isEnglish ? 'LLC Formation' : 'LLC Kurulumu',
          href: `/${lang}/checklists/llc-checklist`,
          description: isEnglish ? 'Pre-formation checklist' : 'Kuruluş öncesi kontrol listesi'
        },
        {
          label: isEnglish ? 'W-8 / W-9 Decision' : 'W-8 / W-9 Kararı',
          href: `/${lang}/checklists/w8-w9-karar-haritasi`,
          description: isEnglish ? 'Which form do you need?' : 'Hangi form gerekli?'
        },
      ]
    },
    {
      key: 'kits',
      label: isEnglish ? 'Legal Kits' : 'Hukuki Kitler',
      href: `/${lang}/legal-kits`,
    },
    {
      key: 'support',
      label: isEnglish ? 'Support' : 'Destek',
      href: `/${lang}/support`,
    },
  ]

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={dropdownRef}>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex items-center">
              <span className="text-2xl font-black text-black tracking-tight">
                EchoLegal
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.key} className="relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.key)}
                        className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md ${
                          activeDropdown === item.key
                            ? 'text-black bg-gray-100'
                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                        <svg
                          className={`w-4 h-4 transition-transform ${activeDropdown === item.key ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === item.key && (
                        <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                          {/* Main link */}
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 border-b border-gray-100 mb-1"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {isEnglish ? 'View All' : 'Tümünü Gör'} →
                          </Link>
                          {item.dropdown.map((subItem, idx) => (
                            <Link
                              key={idx}
                              href={subItem.href}
                              target={subItem.href.startsWith('http') ? '_blank' : undefined}
                              rel={subItem.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="block px-4 py-2 hover:bg-gray-50"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="block text-sm font-medium text-gray-900">
                                {subItem.label}
                                {subItem.href.startsWith('http') && (
                                  <span className="ml-1 text-gray-400">↗</span>
                                )}
                              </span>
                              {subItem.description && (
                                <span className="block text-xs text-gray-500 mt-0.5">
                                  {subItem.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="ml-2 p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
                aria-label={isEnglish ? 'Search' : 'Ara'}
              >
                <svg
                  className="w-5 h-5"
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
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
                  ⌘K
                </kbd>
              </button>

              {/* Language Switcher */}
              <Link
                href={switchUrl}
                className="ml-2 px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all"
              >
                {switchLang.toUpperCase()}
              </Link>
            </div>

            {/* Mobile buttons */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-black rounded-md"
                aria-label={isEnglish ? 'Search' : 'Ara'}
              >
                <svg
                  className="w-6 h-6"
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
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100">
              {navItems.map((item) => (
                <div key={item.key} className="py-1">
                  <Link
                    href={item.href}
                    className="block px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 mt-1 space-y-1">
                      {item.dropdown.map((subItem, idx) => (
                        <Link
                          key={idx}
                          href={subItem.href}
                          target={subItem.href.startsWith('http') ? '_blank' : undefined}
                          rel={subItem.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block px-2 py-1.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                          {subItem.href.startsWith('http') && ' ↗'}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Language Switcher */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  href={switchUrl}
                  className="inline-block px-4 py-2 text-sm font-semibold border border-gray-300 rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isEnglish ? 'Türkçe' : 'English'} ({switchLang.toUpperCase()})
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal
          lang={lang as 'en' | 'tr'}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </>
  )
}

// Search Modal Component
function SearchModal({
  lang,
  onClose,
}: {
  lang: 'en' | 'tr'
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [includeOtherLang, setIncludeOtherLang] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isEnglish = lang === 'en'

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Import and search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    // Dynamic import to keep bundle size down
    import('@/lib/search-index').then(({ searchIndex, getTypeLabel, getTypeBadgeColor }) => {
      const searchResults = searchIndex(query, {
        lang,
        includeOtherLang,
        limit: 10,
      })
      setResults(
        searchResults.map((item) => ({
          ...item,
          typeLabel: getTypeLabel(item.type, lang),
          badgeColor: getTypeBadgeColor(item.type),
        }))
      )
      setSelectedIndex(0)
    })
  }, [query, lang, includeOtherLang])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].url
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center border-b border-gray-200 px-4">
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
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isEnglish
                  ? 'Search templates, guides, checklists...'
                  : 'Şablon, rehber, kontrol listesi ara...'
              }
              className="flex-1 px-4 py-4 text-base outline-none placeholder-gray-400"
            />
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded">
              ESC
            </kbd>
          </div>

          {/* Language toggle */}
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={includeOtherLang}
                onChange={(e) => setIncludeOtherLang(e.target.checked)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              {isEnglish
                ? 'Include Turkish results'
                : 'İngilizce sonuçları da göster'}
            </label>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.map((result, index) => (
                <a
                  key={result.id}
                  href={result.url}
                  onClick={onClose}
                  className={`block p-3 rounded-lg transition-colors ${
                    index === selectedIndex
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${result.badgeColor.bg} ${result.badgeColor.text}`}
                    >
                      {result.typeLabel}
                    </span>
                    <span className="text-xs text-gray-500">
                      {result.category}
                    </span>
                    {result.lang !== lang && (
                      <span className="text-xs text-gray-400 uppercase">
                        [{result.lang}]
                      </span>
                    )}
                  </div>
                  <div className="font-medium text-gray-900">{result.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {result.description}
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* No results */}
          {query && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              {isEnglish
                ? 'No results found. Try a different search term.'
                : 'Sonuç bulunamadı. Farklı bir arama terimi deneyin.'}
            </div>
          )}

          {/* Empty state */}
          {!query && (
            <div className="p-6 text-center text-gray-500">
              <p className="mb-2">
                {isEnglish
                  ? 'Start typing to search...'
                  : 'Aramaya başlamak için yazın...'}
              </p>
              <p className="text-xs text-gray-400">
                {isEnglish
                  ? 'Search templates, guides, checklists, and legal kits'
                  : 'Şablon, rehber, kontrol listesi ve hukuki kitlerde arayın'}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-400 flex items-center justify-between bg-gray-50">
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
      </div>
    </div>
  )
}
