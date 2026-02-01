'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  NAV_ITEMS,
  resolveHref,
  getLabel,
  getDescription,
  getAlternatePath,
} from '@/lib/nav'
import { LanguageCode } from '@/lib/jurisdictions'

type AppShellProps = {
  lang: 'en' | 'tr'
  children: React.ReactNode
}

export default function AppShell({ lang, children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader lang={lang} />
      <main className="flex-1">{children}</main>
      <AppFooter lang={lang} />
    </div>
  )
}

// ============================================================================
// HEADER WITH PERSISTENT SEARCH
// ============================================================================

function AppHeader({ lang }: { lang: 'en' | 'tr' }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isEnglish = lang === 'en'
  const switchLang = isEnglish ? 'tr' : 'en'
  const switchUrl = getAlternatePath(pathname, switchLang)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
    setMobileSearchOpen(false)
  }, [pathname])

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={dropdownRef}
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold text-black tracking-tight">
              EchoLegal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.key} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.key)}
                      className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-md ${
                        activeDropdown === item.key
                          ? 'text-black bg-gray-100'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {getLabel(item, lang)}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.key && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                        {/* View All link */}
                        <Link
                          href={resolveHref(item.href, lang)}
                          className="block px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 border-b border-gray-100 mb-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {isEnglish ? 'View All' : 'Tümünü Gör'} →
                        </Link>
                        {item.children.map((child, idx) => (
                          <Link
                            key={idx}
                            href={resolveHref(child.href, lang)}
                            target={child.external ? '_blank' : undefined}
                            rel={
                              child.external
                                ? 'noopener noreferrer'
                                : undefined
                            }
                            className="block px-4 py-2 hover:bg-gray-50"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="block text-sm font-medium text-gray-900">
                              {getLabel(child, lang)}
                              {child.external && (
                                <span className="ml-1 text-gray-400">↗</span>
                              )}
                            </span>
                            {getDescription(child, lang) && (
                              <span className="block text-xs text-gray-500 mt-0.5">
                                {getDescription(child, lang)}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={resolveHref(item.href, lang)}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {getLabel(item, lang)}
                  </Link>
                )}
              </div>
            ))}

            {/* Persistent Search Bar (Desktop) */}
            <div className="ml-3">
              <HeaderSearch lang={lang} />
            </div>

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
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
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

            {/* Language Switcher (Mobile) */}
            <Link
              href={switchUrl}
              className="px-2 py-1 text-sm font-semibold border border-gray-300 rounded-full"
            >
              {switchLang.toUpperCase()}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Inline Expansion) */}
        {mobileSearchOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100">
            <HeaderSearch lang={lang} variant="mobile" />
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            {NAV_ITEMS.map((item) => (
              <div key={item.key} className="py-1">
                <Link
                  href={resolveHref(item.href, lang)}
                  className="block px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  {getLabel(item, lang)}
                </Link>
                {item.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.children.map((child, idx) => (
                      <Link
                        key={idx}
                        href={resolveHref(child.href, lang)}
                        target={child.external ? '_blank' : undefined}
                        rel={
                          child.external ? 'noopener noreferrer' : undefined
                        }
                        className="block px-2 py-1.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
                      >
                        {getLabel(child, lang)}
                        {child.external && ' ↗'}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

// ============================================================================
// PERSISTENT HEADER SEARCH (INLINE, NO MODAL)
// ============================================================================

type SearchResult = {
  id: string
  title: string
  description: string
  url: string
  category: string
  type: 'template' | 'guide' | 'checklist' | 'kit' | 'page'
  lang: LanguageCode
}

function HeaderSearch({
  lang,
  variant = 'desktop'
}: {
  lang: 'en' | 'tr'
  variant?: 'desktop' | 'mobile'
}) {
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
    ? 'Search templates, guides, checklists...'
    : 'Şablon, rehber, kontrol listesi ara...'

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const { searchIndex, getTypeLabel, getTypeBadgeColor } = await import('@/lib/search-index')
      const searchResults = searchIndex(searchQuery, { lang, limit: 8 })
      setResults(
        searchResults.map((item) => ({
          ...item,
          typeLabel: getTypeLabel(item.type, lang),
          badgeColor: getTypeBadgeColor(item.type),
        }))
      )
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

  // Keyboard shortcut (Cmd/Ctrl+K focuses input, no modal)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

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

  const isMobile = variant === 'mobile'

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <svg
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`}
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
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            border border-gray-200 rounded-lg bg-white
            focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400
            ${isMobile
              ? 'w-full px-4 py-2.5 pl-10 text-base'
              : 'w-56 xl:w-72 px-3 py-1.5 pl-9 text-sm'
            }
          `}
          aria-label={isEnglish ? 'Search' : 'Ara'}
        />
      </div>

      {/* Results Dropdown (Inline, No Modal) */}
      {isOpen && (results.length > 0 || (query.length >= 2 && !isLoading)) && (
        <div className={`
          absolute top-full left-0 right-0 mt-1
          bg-white border border-gray-200 rounded-lg shadow-lg
          z-50 overflow-hidden
          ${isMobile ? 'max-h-[50vh]' : 'max-h-[60vh]'}
          overflow-y-auto
        `}>
          {results.length > 0 ? (
            <>
              {results.map((result, index) => {
                const badge = getTypeBadge(result.type)
                return (
                  <button
                    key={result.id || index}
                    onClick={() => handleResultClick(result.url)}
                    className={`
                      w-full px-4 py-3 text-left border-b border-gray-50 last:border-b-0
                      transition-colors
                      ${index === selectedIndex ? 'bg-gray-50' : 'hover:bg-gray-50'}
                    `}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs rounded font-medium ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs text-gray-400">{result.category}</span>
                    </div>
                    <div className="font-medium text-sm text-gray-900">{result.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{result.description}</div>
                  </button>
                )
              })}
              {/* Navigation hints */}
              <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between bg-gray-50">
                <span>
                  <kbd className="px-1 py-0.5 bg-white rounded border border-gray-200 text-gray-500">↑</kbd>{' '}
                  <kbd className="px-1 py-0.5 bg-white rounded border border-gray-200 text-gray-500">↓</kbd>{' '}
                  {isEnglish ? 'navigate' : 'gezin'}
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-white rounded border border-gray-200 text-gray-500">Enter</kbd>{' '}
                  {isEnglish ? 'select' : 'seç'}
                </span>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              {isEnglish ? 'No results found' : 'Sonuç bulunamadı'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// FOOTER
// ============================================================================

function AppFooter({ lang }: { lang: 'en' | 'tr' }) {
  const isEnglish = lang === 'en'

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div>
            <Link href={`/${lang}`} className="text-lg font-bold text-black tracking-tight">
              EchoLegal
            </Link>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              {isEnglish
                ? 'A bilingual legal encyclopedia with attorney-drafted reference articles and templates.'
                : 'Avukat tarafından hazırlanmış referans makaleleri ve şablonlar içeren iki dilli hukuk ansiklopedisi.'}
            </p>
          </div>

          {/* Reference */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {isEnglish ? 'Reference' : 'Referans'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}/amerika`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'US Business Hub' : 'ABD İş Rehberi'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/encyclopedia`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
                </Link>
              </li>
              <li>
                <Link href={resolveHref('/{lang}/templates', lang)} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Templates' : 'Şablonlar'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/checklists`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {isEnglish ? 'Legal' : 'Hukuki'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}/legal/privacy`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/terms`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Terms of Service' : 'Kullanım Koşulları'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/disclaimer`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Disclaimer' : 'Sorumluluk Reddi'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about/editorial-policy`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Editorial Policy' : 'Yayın Politikası'}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {isEnglish ? 'Platform' : 'Platform'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={`/${lang}/about`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'About' : 'Hakkımızda'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/support`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Support' : 'Destek'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contribute`} className="text-gray-500 hover:text-black transition-colors">
                  {isEnglish ? 'Contribute' : 'Katkıda Bulun'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
            {isEnglish
              ? 'LEGAL DISCLAIMER: EchoLegal provides educational legal information and document templates for general informational purposes only. Nothing on this website constitutes legal advice, nor does use of this website create an attorney-client relationship. Laws vary by jurisdiction. Consult a licensed attorney for advice specific to your situation.'
              : 'HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme amaçlı eğitici hukuki bilgiler ve belge şablonları sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez ve bu web sitesinin kullanılması avukat-müvekkil ilişkisi oluşturmaz. Yasalar yargı alanlarına göre farklılık gösterir. Durumunuza özel tavsiye için lisanslı bir avukata danışın.'}
          </p>
          <p className="text-xs text-gray-400 mt-3">
            © 2026 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
