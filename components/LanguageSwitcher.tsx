'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LanguageSwitcherProps = {
  currentLang: string
  variant?: 'minimal' | 'full'
  className?: string
}

export default function LanguageSwitcher({
  currentLang,
  variant = 'minimal',
  className = ''
}: LanguageSwitcherProps) {
  const pathname = usePathname()

  // Get the path without the current locale
  const pathWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/'

  const languages = [
    { code: 'tr', label: 'Türkçe', flag: '' },
    { code: 'en', label: 'English', flag: '' },
  ]

  const otherLang = currentLang === 'en' ? 'tr' : 'en'
  const otherLangData = languages.find(l => l.code === otherLang)!

  if (variant === 'minimal') {
    return (
      <Link
        href={`/${otherLang}${pathWithoutLocale}`}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all ${className}`}
        title={otherLangData.label}
      >
        <span className="text-xs">{otherLangData.flag}</span>
        <span>{otherLang.toUpperCase()}</span>
      </Link>
    )
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {languages.map((lang) => {
        const isActive = lang.code === currentLang
        return (
          <Link
            key={lang.code}
            href={`/${lang.code}${pathWithoutLocale}`}
            className={`inline-flex items-center gap-1 px-2 py-1 text-sm rounded transition-colors ${
              isActive
                ? 'bg-black text-white font-semibold'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span className="text-xs">{lang.flag}</span>
            <span>{lang.code.toUpperCase()}</span>
          </Link>
        )
      })}
    </div>
  )
}
