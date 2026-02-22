'use client'

import Link from 'next/link'
import { useState } from 'react'

interface MobileNavProps {
  lang: string
  isEnglish: boolean
}

export default function MobileNav({ lang, isEnglish }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: `/${lang}/amerika`, labelEn: 'Coming to the US', labelTr: "ABD'ye Gelmek & İş Kurmak" },
    { href: `/${lang}/library`, labelEn: 'Legal Guides', labelTr: 'Hukuki Rehberler' },
    { href: `/${lang}/contracts`, labelEn: 'Contracts', labelTr: 'Sözleşmeler' },
    { href: `/${lang}/legal-kits`, labelEn: 'Starter Kits', labelTr: 'Başlangıç Kitleri' },
    { href: `/${lang}/consular-documents`, labelEn: 'Official Sources', labelTr: 'Resmî Kaynaklar' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold hover:opacity-60 transition-opacity text-ink"
          >
            {isEnglish ? link.labelEn : link.labelTr}
          </Link>
        ))}
        <Link
          href={`/${isEnglish ? 'tr' : 'en'}`}
          className="flex items-center gap-2 text-sm font-semibold border-2 border-ink rounded-full px-4 py-2 hover:bg-ink hover:text-white transition-all text-ink"
        >
          {isEnglish ? 'TR' : 'EN'}
        </Link>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-3">
        {/* Language Toggle - Always visible on mobile */}
        <Link
          href={`/${isEnglish ? 'tr' : 'en'}`}
          className="text-sm font-semibold border-2 border-ink rounded-full px-3 py-1.5 hover:bg-ink hover:text-white transition-all text-ink"
        >
          {isEnglish ? 'TR' : 'EN'}
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-ink focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 text-base font-semibold text-ink hover:bg-gray-50 transition-colors"
              >
                {isEnglish ? link.labelEn : link.labelTr}
              </Link>
            ))}
            <Link
              href={`/${lang}/support`}
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 text-base font-semibold text-ink hover:bg-gray-50 transition-colors"
            >
              {isEnglish ? 'Support' : 'Destek'}
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
