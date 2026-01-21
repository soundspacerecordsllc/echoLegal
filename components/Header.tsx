'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type HeaderProps = {
  lang: string
  dict: any
}

export default function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const switchLang = lang === 'en' ? 'tr' : 'en'
  const currentPath = pathname.replace(`/${lang}`, '')
  const switchUrl = `/${switchLang}${currentPath || ''}`

  return (
    <header className="bg-white border-b border-legal-gray-light sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <span className="font-serif text-2xl font-bold text-legal-navy">
              EchoLegal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href={`/${lang}`} 
              className="text-legal-gray hover:text-legal-navy font-medium transition-colors"
            >
              {dict.nav.home}
            </Link>
            <Link 
              href={`/${lang}/contracts`} 
              className="text-legal-gray hover:text-legal-navy font-medium transition-colors"
            >
              {dict.nav.contracts}
            </Link>
            <Link 
              href={`/${lang}/encyclopedia`} 
              className="text-legal-gray hover:text-legal-navy font-medium transition-colors"
            >
              {dict.nav.encyclopedia}
            </Link>
            <Link 
              href={`/${lang}/support`} 
              className="text-legal-gray hover:text-legal-navy font-medium transition-colors"
            >
              {dict.nav.support}
            </Link>

            {/* Language Switcher */}
            <Link
              href={switchUrl}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border-2 border-legal-gold text-legal-navy font-semibold text-sm hover:bg-legal-gold hover:text-white transition-all"
            >
              {switchLang.toUpperCase()}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
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
          <div className="md:hidden py-4 space-y-3">
            <Link 
              href={`/${lang}`} 
              className="block text-legal-gray hover:text-legal-navy font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.home}
            </Link>
            <Link 
              href={`/${lang}/contracts`} 
              className="block text-legal-gray hover:text-legal-navy font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.contracts}
            </Link>
            <Link 
              href={`/${lang}/encyclopedia`} 
              className="block text-legal-gray hover:text-legal-navy font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.encyclopedia}
            </Link>
            <Link 
              href={`/${lang}/support`} 
              className="block text-legal-gray hover:text-legal-navy font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {dict.nav.support}
            </Link>
            <Link
              href={switchUrl}
              className="block w-fit px-3 py-1.5 rounded-full border-2 border-legal-gold text-legal-navy font-semibold text-sm"
            >
              {switchLang.toUpperCase()}
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
