// components/CiteThisEntry.tsx
// "Cite This Entry" block component for content pages.
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 4.2.2:
// Every published content page renders a citation block at the bottom.
// Provides standard and Bluebook citation formats with copy functionality.

'use client'

import { useState } from 'react'
import { generateCitationText } from '@/lib/structured-data'
import { type ContentTypeKey } from '@/lib/content-schema'

// Re-export from structured-data for convenience
export { generateCitationText }

// ============================================
// TYPES
// ============================================

type CiteThisEntryProps = {
  lang: 'en' | 'tr'
  title: string
  url: string
  dateModified: string
  version?: string
  citationKey?: string
  contentType?: ContentTypeKey
  className?: string
}

// ============================================
// COMPONENT
// ============================================

export default function CiteThisEntry({
  lang,
  title,
  url,
  dateModified,
  version,
  citationKey,
  contentType,
  className = '',
}: CiteThisEntryProps) {
  const isEnglish = lang === 'en'
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  const citation = generateCitationText({
    title,
    version,
    dateModified,
    url,
    lang,
    contentType,
  })

  const handleCopy = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedFormat(format)
      setTimeout(() => setCopiedFormat(null), 2000)
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedFormat(format)
      setTimeout(() => setCopiedFormat(null), 2000)
    }
  }

  return (
    <section
      className={`border border-gray-200 rounded px-5 py-4 ${className}`}
      aria-label={isEnglish ? 'Cite this entry' : 'Bu maddeyi kaynak göster'}
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        {isEnglish ? 'Cite This Entry' : 'Bu Maddeyi Kaynak Göster'}
      </h3>

      {/* Standard citation */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {isEnglish ? 'Standard' : 'Standart'}
          </span>
          <button
            type="button"
            onClick={() => handleCopy(citation.standard, 'standard')}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={isEnglish ? 'Copy standard citation' : 'Standart kaynakçayı kopyala'}
          >
            {copiedFormat === 'standard'
              ? (isEnglish ? 'Copied' : 'Kopyalandı')
              : (isEnglish ? 'Copy' : 'Kopyala')}
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed font-serif">
          {citation.standard}
        </p>
      </div>

      {/* Bluebook citation */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Bluebook
          </span>
          <button
            type="button"
            onClick={() => handleCopy(citation.bluebook, 'bluebook')}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={isEnglish ? 'Copy Bluebook citation' : 'Bluebook kaynakçasını kopyala'}
          >
            {copiedFormat === 'bluebook'
              ? (isEnglish ? 'Copied' : 'Kopyalandı')
              : (isEnglish ? 'Copy' : 'Kopyala')}
          </button>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed font-serif">
          {citation.bluebook}
        </p>
      </div>

      {/* Citation key */}
      {citationKey && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {isEnglish ? 'Citation ID:' : 'Kaynak No:'}
          </span>
          <code className="text-xs font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
            {citationKey}
          </code>
        </div>
      )}
    </section>
  )
}

// ============================================
// COMPACT VARIANT
// ============================================

/**
 * Inline citation link for use in article footers.
 * Shows a single line with a copy button.
 */
export function CiteThisEntryCompact({
  lang,
  title,
  url,
  dateModified,
  version,
  className = '',
}: {
  lang: 'en' | 'tr'
  title: string
  url: string
  dateModified: string
  version?: string
  className?: string
}) {
  const isEnglish = lang === 'en'
  const [copied, setCopied] = useState(false)

  const citation = generateCitationText({
    title,
    version,
    dateModified,
    url,
    lang,
  })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation.standard)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`flex items-center gap-2 text-xs text-gray-400 ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        className="underline hover:text-gray-600 transition-colors"
      >
        {copied
          ? (isEnglish ? 'Copied' : 'Kopyalandı')
          : (isEnglish ? 'Cite this entry' : 'Kaynak göster')}
      </button>
    </div>
  )
}
