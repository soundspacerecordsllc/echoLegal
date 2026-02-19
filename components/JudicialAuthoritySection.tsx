/**
 * JudicialAuthoritySection — structured case-law display block.
 *
 * Renders an ordered list of judicial authorities relevant to a
 * specific topic page. Cases are sorted by AUTHORITY_LEVEL_WEIGHT
 * to comply with the platform's normative ordering rules.
 *
 * Mobile-first: stacked cards, no wide tables.
 * Bilingual: EN/TR with formal legal register.
 * Institutional tone only.
 */

import type { AuthorityLevel } from '@/lib/content-schema'
import { AUTHORITY_LEVEL_WEIGHT } from '@/lib/citations/canon'

// ── types ──────────────────────────────────────────────────────────────

export type JudicialCase = {
  caseName: string
  citation: string
  court: string
  year: number
  holdingSummary: { en: string; tr: string }
  authorityLevel: AuthorityLevel
  canonicalId: string
  jurisdiction?: string
}

interface JudicialAuthoritySectionProps {
  lang: 'en' | 'tr'
  cases: JudicialCase[]
}

// ── court badge styling ────────────────────────────────────────────────

function courtBadgeStyle(court: string): string {
  if (court.includes('Supreme Court')) {
    return 'bg-indigo-100 text-indigo-800'
  }
  if (court.includes('Cir.') || court.includes('Circuit')) {
    return 'bg-blue-100 text-blue-800'
  }
  return 'bg-gray-100 text-gray-700'
}

// ── component ──────────────────────────────────────────────────────────

export default function JudicialAuthoritySection({
  lang,
  cases,
}: JudicialAuthoritySectionProps) {
  const isEnglish = lang === 'en'

  if (!cases || cases.length === 0) return null

  // Enforce authority-level ordering (non-discretionary)
  const sorted = [...cases].sort(
    (a, b) =>
      AUTHORITY_LEVEL_WEIGHT[a.authorityLevel] -
      AUTHORITY_LEVEL_WEIGHT[b.authorityLevel]
  )

  return (
    <section id="judicial-authority" className="mb-12">
      <h2 className="text-2xl font-semibold mb-2">
        {isEnglish ? 'Judicial Authority' : 'Yargısal İçtihat'}
      </h2>
      <span className="inline-block text-xs text-gray-500 mb-4">
        {isEnglish ? 'Selected case law' : 'Seçilmiş içtihat'}
      </span>

      <div className="prose max-w-none text-gray-600 mb-6">
        <p className="text-sm leading-relaxed">
          {isEnglish
            ? 'The following cases establish foundational doctrinal principles relevant to LLC formation, entity classification, jurisdictional reach, and liability protection. Holdings are presented in order of authority level.'
            : 'Aşağıdaki kararlar, LLC kuruluşu, kuruluş sınıflandırması, yargı yetkisi kapsamı ve sorumluluk korumasıyla ilgili temel doktriner ilkeleri oluşturmaktadır. Kararlar otorite düzeyine göre sıralanmıştır.'}
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((c) => (
          <div
            key={c.canonicalId}
            className="border border-gray-200 rounded-lg overflow-hidden"
            data-canonical-id={c.canonicalId}
            data-authority-tier={c.authorityLevel}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gray-50">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900 leading-snug">
                    {c.caseName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {c.citation} ({c.year})
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${courtBadgeStyle(c.court)}`}
                >
                  {c.court}
                </span>
              </div>
            </div>

            {/* Holding summary */}
            <div className="px-4 py-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish ? c.holdingSummary.en : c.holdingSummary.tr}
              </p>
            </div>

            {/* Metadata footer */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-400">
              <span>
                {isEnglish ? 'Jurisdiction:' : 'Yargı alanı:'}{' '}
                {c.jurisdiction || 'US Federal'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 text-xs text-gray-400 leading-relaxed">
        <p>
          {isEnglish
            ? 'Case summaries are condensed for reference. Holdings may have been narrowed, distinguished, or extended by subsequent decisions. Consult primary sources for authoritative text.'
            : 'Karar özetleri referans amaçlı kısaltılmıştır. Kararlar sonraki içtihatlarla daraltılmış, ayrıştırılmış veya genişletilmiş olabilir. Yetkili metin için birincil kaynaklara başvurunuz.'}
        </p>
      </div>
    </section>
  )
}
