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
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isEnglish = lang === 'en'
  const switchLang = lang === 'en' ? 'tr' : 'en'
  const currentPath = pathname.replace(`/${lang}`, '')
  const switchUrl = `/${switchLang}${currentPath || ''}`

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

  // Navigation structure
  const navItems: NavItem[] = [
    {
      key: 'usImmigrationBusiness',
      label: dict.nav.usImmigrationBusiness,
      href: `/${lang}/amerika`,
      dropdown: [
        {
          label: isEnglish ? 'Visa Pathways' : 'Vize Yolları',
          href: `/${lang}/amerika/abdye-gelme-yollari`,
          description: isEnglish ? 'E2, L1, H1B, O1 and more' : 'E2, L1, H1B, O1 ve diğerleri'
        },
        {
          label: isEnglish ? 'LLC Formation' : 'LLC Kurulumu',
          href: `/${lang}/amerika/abdde-llc-kurmak`,
          description: isEnglish ? 'State comparison & process' : 'Eyalet karşılaştırması ve süreç'
        },
        {
          label: isEnglish ? 'Pre-Arrival Checklist' : 'Gelmeden Önce Yapılacaklar',
          href: `/${lang}/amerika/abd-ye-gelmeden-once`,
          description: isEnglish ? 'Legal preparation guide' : 'Hukuki hazırlık rehberi'
        },
      ]
    },
    {
      key: 'legalGuides',
      label: dict.nav.legalGuides,
      href: `/${lang}/library`,
      dropdown: [
        {
          label: isEnglish ? 'LLC Formation Guide (Detailed)' : 'LLC Kurma Rehberi (Detaylı)',
          href: `/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`,
          description: isEnglish ? 'Step-by-step for Turkish entrepreneurs' : 'Türkler için adım adım',
        },
        {
          label: isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler',
          href: `/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`,
          description: isEnglish ? 'Must-have legal documents' : 'Gerekli hukuki belgeler',
        },
        {
          label: isEnglish ? 'IRS & W-8/W-9 Guide' : 'IRS ve W-8/W-9 Rehberi',
          href: `/${lang}/irs-vergiler-ve-w8-w9-gercekleri`,
          description: isEnglish ? 'Tax forms explained' : 'Vergi formları açıklandı',
        },
        {
          label: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corporation mı',
          href: `/${lang}/llc-mi-corporation-mi`,
          description: isEnglish ? 'Compare business structures' : 'İş yapılarını karşılaştırın',
        },
        {
          label: isEnglish ? 'US Bank Account' : 'ABD Banka Hesabı',
          href: `/${lang}/abdde-banka-hesabi-acmak`,
          description: isEnglish ? 'Opening accounts as non-resident' : 'Yabancı olarak hesap açma',
        },
      ]
    },
    {
      key: 'contracts',
      label: dict.nav.contracts,
      href: `/${lang}/contracts`,
    },
    {
      key: 'starterKits',
      label: dict.nav.starterKits,
      href: `/${lang}/legal-kits`,
      dropdown: [
        {
          label: isEnglish ? 'ABD Business Starter Kit' : 'ABD Business Starter Kit',
          href: `/${lang}/legal-kits/business-starter`,
          description: isEnglish ? '5 essential documents' : '5 temel belge'
        },
      ]
    },
    {
      key: 'officialSources',
      label: dict.nav.officialSources,
      href: `/${lang}/consular-documents`,
      dropdown: [
        {
          label: isEnglish ? 'Turkish Consular Services' : 'Türk Konsolosluk İşlemleri',
          href: `/${lang}/consular-documents`,
          description: isEnglish ? 'Passport, ID, notary' : 'Pasaport, kimlik, noter'
        },
        {
          label: isEnglish ? 'USCIS Official Site' : 'USCIS Resmî Sitesi',
          href: 'https://www.uscis.gov',
          description: isEnglish ? 'US immigration authority' : 'ABD göçmenlik otoritesi'
        },
        {
          label: isEnglish ? 'Turkish Consulate Portal' : 'Konsolosluk Randevu Portalı',
          href: 'https://www.konsolosluk.gov.tr',
          description: isEnglish ? 'Appointment system' : 'Randevu sistemi'
        },
      ]
    },
  ]

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key)
  }

  return (
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

            {/* Language Switcher */}
            <Link
              href={switchUrl}
              className="ml-4 px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all"
            >
              {switchLang.toUpperCase()}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
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
  )
}
