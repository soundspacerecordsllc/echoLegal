'use client'

import { useState, useEffect } from 'react'
import SearchModal from './SearchModal'

type SearchButtonProps = {
  lang: string
}

export default function SearchButton({ lang }: SearchButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isEnglish = lang === 'en'

  // Keyboard shortcut to open search (Cmd/Ctrl + K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        aria-label={isEnglish ? 'Search' : 'Ara'}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">{isEnglish ? 'Search' : 'Ara'}</span>
        <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-xs bg-white rounded border border-gray-200 font-mono">
          ⌘K
        </kbd>
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} lang={lang} />
    </>
  )
}
