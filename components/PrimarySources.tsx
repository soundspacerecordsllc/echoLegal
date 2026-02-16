'use client'

import { useState } from 'react'
import type { PrimarySourceEntry } from '@/lib/content-schema'

interface PrimarySourcesProps {
  sources: PrimarySourceEntry[]
  lang: 'en' | 'tr'
}

export default function PrimarySources({ sources, lang }: PrimarySourcesProps) {
  const [open, setOpen] = useState(false)

  if (!sources || sources.length === 0) return null

  const isEnglish = lang === 'en'
  const title = isEnglish ? 'Primary legal sources' : 'Birincil hukuki kaynaklar'

  return (
    <section className="mb-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            open ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {title}
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? 'max-h-[800px] mt-3' : 'max-h-0'
        }`}
      >
        <ul className="space-y-2 text-sm text-gray-700 leading-relaxed pl-5">
          {sources.map((source, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gray-400 select-none mt-px">–</span>
              <div>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {source.citation}
                  </a>
                ) : (
                  <span>{source.citation}</span>
                )}
                {source.label && (
                  <span className="text-gray-500 ml-1">— {source.label}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
