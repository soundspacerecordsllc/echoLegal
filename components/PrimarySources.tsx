'use client'

import { useState } from 'react'
import type { PrimarySourceEntry } from '@/lib/content-schema'
import { normalizeCitationText, normalizeLabelText, AUTHORITY_LEVEL_WEIGHT } from '@/lib/citations/canon'

interface PrimarySourcesProps {
  sources: PrimarySourceEntry[]
  lang: 'en' | 'tr'
}

export default function PrimarySources({ sources, lang }: PrimarySourcesProps) {
  const [open, setOpen] = useState(false)

  if (!sources || sources.length === 0) return null

  const isEnglish = lang === 'en'
  const title = isEnglish ? 'Primary legal sources' : 'Birincil hukuki kaynaklar'

  // Runtime invariant: every source must carry authorityLevel, canonicalId,
  // and jurisdictionScope. Hard fail. No silent degradation.
  for (const source of sources) {
    if (!source.authorityLevel) {
      throw new Error(
        `PrimarySource invariant violation: missing authorityLevel on "${source.citation}"`
      )
    }
    if (!source.canonicalId) {
      throw new Error(
        `PrimarySource invariant violation: missing canonicalId on "${source.citation}"`
      )
    }
    if (!(source.authorityLevel in AUTHORITY_LEVEL_WEIGHT)) {
      throw new Error(
        `PrimarySource invariant violation: unknown authorityLevel "${source.authorityLevel}" on "${source.citation}"`
      )
    }
    if (!source.jurisdictionScope) {
      throw new Error(
        `PrimarySource invariant violation: missing jurisdictionScope on "${source.citation}"`
      )
    }
  }

  // Normative hierarchy is structurally enforced.
  // Ordering is non-discretionary.
  const sorted = [...sources].sort((a, b) => {
    return AUTHORITY_LEVEL_WEIGHT[a.authorityLevel] - AUTHORITY_LEVEL_WEIGHT[b.authorityLevel]
  })

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
        <p className="text-xs text-gray-500 leading-relaxed mb-3 pl-5">
          {isEnglish
            ? 'Sources are presented in normative order. Lower-tier materials do not override higher-tier authority.'
            : 'Kaynaklar normatif sıraya göre sunulmaktadır. Alt kademe materyaller, üst kademe otoriteyi geçersiz kılmaz.'}
        </p>
        <ul className="space-y-2 text-sm text-gray-700 leading-relaxed pl-5">
          {sorted.map((source, index) => {
            const citation = normalizeCitationText(source.citation)
            const label = source.label ? normalizeLabelText(source.label) : undefined

            return (
              <li
                key={index}
                className="flex items-start gap-2"
                data-canonical-id={source.canonicalId}
                data-authority-tier={source.authorityLevel}
                data-jurisdiction={source.jurisdictionScope}
              >
                <span className="text-gray-400 select-none mt-px">–</span>
                <div>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-hover underline underline-offset-4 decoration-stone-300 hover:decoration-accent"
                    >
                      {citation}
                    </a>
                  ) : (
                    <span>{citation}</span>
                  )}
                  {label && (
                    <span className="text-gray-500 ml-1">— {label}</span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
