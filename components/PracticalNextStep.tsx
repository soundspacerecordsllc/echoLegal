import type { PracticalMetadata } from '@/lib/encyclopedia-authority'

const LABELS = {
  en: {
    title: 'Practical Implications',
    affected: 'Who this affects',
    risk: 'Immediate risk',
    nextStep: 'Next procedural step',
  },
  tr: {
    title: 'Pratik Sonuç',
    affected: 'Kimleri etkiler',
    risk: 'Acil risk',
    nextStep: 'Sonraki prosedürel adım',
  },
} as const

/**
 * Standardized "Practical Implications" block rendered at the bottom of
 * every encyclopedia entry page. Takes pre-localized PracticalMetadata.
 *
 * If `practical` is undefined, emits a development warning and renders
 * nothing. This ensures gradual adoption without breaking production.
 */
export default function PracticalNextStep({
  lang,
  practical,
  className,
}: {
  lang: 'en' | 'tr'
  practical: PracticalMetadata | undefined
  className?: string
}) {
  if (!practical) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[PracticalNextStep] Missing practical metadata. Every encyclopedia entry should provide this data.')
    }
    return null
  }

  const l = LABELS[lang]

  return (
    <section className={`border border-gray-200 rounded-lg p-6 ${className ?? ''}`}>
      <h2 className="text-xl font-bold mb-4">{l.title}</h2>

      <div className="space-y-4">
        {/* Who this affects */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {l.affected}
          </h3>
          <ul className="space-y-1">
            {practical.affected.map((item, i) => (
              <li key={i} className="flex items-start text-gray-700">
                <span className="text-gray-400 mr-2">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Immediate risk */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {l.risk}
          </h3>
          <p className="text-gray-700">{practical.risk}</p>
        </div>

        {/* Next procedural step */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {l.nextStep}
          </h3>
          <p className="text-gray-700">{practical.nextStep}</p>
        </div>
      </div>
    </section>
  )
}
