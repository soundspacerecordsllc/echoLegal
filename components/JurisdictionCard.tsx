// components/JurisdictionCard.tsx
// Card component for the jurisdiction registry page

import { Jurisdiction, LanguageCode, languages } from '@/lib/jurisdictions'

type JurisdictionCardProps = {
  jurisdiction: Jurisdiction
  lang: 'en' | 'tr'
  contentCount?: number
}

const LEGAL_SYSTEM_LABELS: Record<string, { en: string; tr: string }> = {
  'common-law': { en: 'Common Law', tr: 'Anglosakson Hukuku' },
  'civil-law': { en: 'Civil Law', tr: 'Kıta Avrupası Hukuku' },
  'mixed': { en: 'Mixed System', tr: 'Karma Sistem' },
  'religious': { en: 'Religious Law', tr: 'Dini Hukuk' },
  'customary': { en: 'Customary Law', tr: 'Örf ve Adet Hukuku' },
}

const TYPE_LABELS: Record<string, { en: string; tr: string }> = {
  'country': { en: 'Country', tr: 'Ülke' },
  'state': { en: 'State', tr: 'Eyalet' },
  'region': { en: 'Region', tr: 'Bölge' },
  'supranational': { en: 'Supranational', tr: 'Ulusüstü' },
  'general': { en: 'General', tr: 'Genel' },
}

export default function JurisdictionCard({
  jurisdiction,
  lang,
  contentCount,
}: JurisdictionCardProps) {
  const isEnglish = lang === 'en'
  const displayLang: LanguageCode = lang as LanguageCode

  const legalSystemLabel = LEGAL_SYSTEM_LABELS[jurisdiction.legalSystem]
  const typeLabel = TYPE_LABELS[jurisdiction.type]
  const availableLanguages = jurisdiction.languages
    .filter(l => languages[l])
    .map(l => languages[l].nativeName)

  if (!jurisdiction.isActive) {
    return (
      <div className="border border-dashed border-gray-300 rounded-lg p-5 bg-gray-50 relative">
        <div className="absolute top-3 right-3">
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-200 rounded">
            {isEnglish ? 'In Development' : 'Geliştirme Aşamasında'}
          </span>
        </div>
        <div className="flex items-start gap-3">
          {jurisdiction.flag && (
            <span className="text-2xl opacity-40" aria-hidden="true">{jurisdiction.flag}</span>
          )}
          <div>
            <h3 className="font-semibold text-gray-500">
              {jurisdiction.name[displayLang] || jurisdiction.name.en}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {typeLabel?.[lang] || typeLabel?.en}
              {' · '}
              {legalSystemLabel?.[lang] || legalSystemLabel?.en}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-start gap-3">
        {jurisdiction.flag && (
          <span className="text-2xl" aria-hidden="true">{jurisdiction.flag}</span>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">
            {jurisdiction.name[displayLang] || jurisdiction.name.en}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {typeLabel?.[lang] || typeLabel?.en}
            {' · '}
            {legalSystemLabel?.[lang] || legalSystemLabel?.en}
          </p>
        </div>
        <span className="inline-block px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 rounded">
          {isEnglish ? 'Active' : 'Aktif'}
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          {typeof contentCount === 'number' && (
            <span>
              {contentCount} {isEnglish ? 'entries' : 'içerik'}
            </span>
          )}
          {availableLanguages.length > 0 && (
            <span>
              {isEnglish ? 'Languages' : 'Diller'}: {availableLanguages.join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
