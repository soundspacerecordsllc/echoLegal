'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import {
  NAV_ITEMS,
  resolveHref,
  getLabel,
  getDescription,
  getAlternatePath,
} from '@/lib/nav'

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
// HEADER
// ============================================================================

function AppHeader({ lang }: { lang: 'en' | 'tr' }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
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

  // Keyboard shortcut for search
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          ref={dropdownRef}
        >
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex items-center flex-shrink-0">
              <span className="text-2xl font-black text-black tracking-tight">
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

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal lang={lang} onClose={() => setSearchOpen(false)} />
      )}
    </>
  )
}

// ============================================================================
// SEARCH MODAL
// ============================================================================

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

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    import('@/lib/search-index').then(
      ({ searchIndex, getTypeLabel, getTypeBadgeColor }) => {
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
      }
    )
  }, [query, lang, includeOtherLang])

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
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
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

          {results.length > 0 && (
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.map((result, index) => (
                <a
                  key={result.id}
                  href={result.url}
                  onClick={onClose}
                  className={`block p-3 rounded-lg transition-colors ${
                    index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
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

          {query && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              {isEnglish
                ? 'No results found. Try a different search term.'
                : 'Sonuç bulunamadı. Farklı bir arama terimi deneyin.'}
            </div>
          )}

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

// ============================================================================
// FOOTER
// ============================================================================

function AppFooter({ lang }: { lang: 'en' | 'tr' }) {
  const isEnglish = lang === 'en'

  return (
    <footer className="border-t border-gray-200 py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href={`/${lang}`} className="text-xl font-black text-black">
              EchoLegal
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              {isEnglish
                ? 'Free legal resources for Turkish entrepreneurs in the US.'
                : 'ABD\'deki Türk girişimciler için ücretsiz hukuki kaynaklar.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              {isEnglish ? 'Quick Links' : 'Hızlı Bağlantılar'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${lang}/amerika`}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'US Business Hub' : 'ABD İş Merkezi'}
                </Link>
              </li>
              <li>
                <Link
                  href={resolveHref('/{lang}/templates', lang)}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'Templates' : 'Şablonlar'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal-kits`}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              {isEnglish ? 'Legal' : 'Hukuki'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${lang}/legal/privacy`}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal/terms`}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'Terms of Service' : 'Kullanım Koşulları'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal/disclaimer`}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'Disclaimer' : 'Sorumluluk Reddi'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              {isEnglish ? 'Support' : 'Destek'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${lang}/support`}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'Support Us' : 'Bizi Destekle'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-gray-500 hover:text-black"
                >
                  {isEnglish ? 'About' : 'Hakkımızda'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {isEnglish
              ? 'LEGAL DISCLAIMER: EchoLegal provides educational legal information and document templates for general informational purposes only. Nothing on this website constitutes legal advice, nor does use of this website create an attorney-client relationship.'
              : 'HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme amaçlı eğitici hukuki bilgiler ve belge şablonları sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez ve bu web sitesinin kullanılması avukat-müvekkil ilişkisi oluşturmaz.'}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal.{' '}
            {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
