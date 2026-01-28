'use client'

import Link from 'next/link'
import SearchButton from '@/components/SearchButton'

type ContractPageHeaderProps = {
  lang: string
  switchLangUrl: string
}

export default function ContractPageHeader({ lang, switchLangUrl }: ContractPageHeaderProps) {
  const isEnglish = lang === 'en'

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href={`/${lang}`} className="text-xl font-semibold tracking-tight text-gray-900">
          EchoLegal
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={`/${lang}`}
            className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {isEnglish ? 'Home' : 'Ana Sayfa'}
          </Link>
          <Link
            href={`/${lang}/contracts`}
            className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {isEnglish ? 'Contracts' : 'Sözleşmeler'}
          </Link>
          <Link
            href={`/${lang}/encyclopedia`}
            className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
          </Link>
          <SearchButton lang={lang} />
          <Link
            href={switchLangUrl}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 transition-all"
          >
            {isEnglish ? 'TR' : 'EN'}
          </Link>
        </div>
      </nav>
    </header>
  )
}
