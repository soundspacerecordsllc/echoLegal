/**
 * AuthorityHierarchyTable — reusable editorial component.
 *
 * Renders a strict hierarchical table of legal authority layers with
 * binding weight classification. Relies on the AuthorityLevel enum
 * from the canonical content schema to enforce type safety.
 *
 * Display order is fixed and non-negotiable: statute → regulation →
 * administrative guidance → judicial interpretation, mapped to
 * Binding → Regulatory → Interpretive → Persuasive authority tiers.
 *
 * TypeScript will error if AuthorityLevel is not imported or if
 * required row fields are omitted.
 */

import type { AuthorityLevel } from '@/lib/content-schema'

// ── types ──────────────────────────────────────────────────────────────────

type BilingualText = { en: string; tr: string }

/**
 * Each row in the hierarchy table.
 * `authorityLevel` is required and must be a valid AuthorityLevel value.
 */
export type AuthorityRow = {
  authorityLevel: AuthorityLevel
  tier: BilingualText
  instrumentType: BilingualText
  description: BilingualText
  bindingWeight: BilingualText
}

export interface AuthorityHierarchyTableProps {
  lang: 'en' | 'tr'
  rows: AuthorityRow[]
  className?: string
}

// ── component ──────────────────────────────────────────────────────────────

export default function AuthorityHierarchyTable({
  lang,
  rows,
  className = '',
}: AuthorityHierarchyTableProps) {
  const isEnglish = lang === 'en'

  return (
    <div className={`mb-10 ${className}`}>
      <h3 className="text-lg font-semibold text-black mb-3">
        {isEnglish ? 'Authority Hierarchy' : 'Otorite Hiyerarşisi'}
      </h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {isEnglish
          ? 'The following table presents the normative hierarchy of legal authorities governing the procedural layers of this entry. Authority tiers are listed in strict descending order of precedence; lower-tier sources cannot override higher-tier instruments.'
          : 'Aşağıdaki tablo, bu maddenin prosedürel katmanlarını yöneten hukuki otoritelerin normatif hiyerarşisini sunmaktadır. Otorite kademeleri kesin azalan öncelik sırasına göre listelenmiştir; alt kademe kaynaklar, üst kademe belgeleri geçersiz kılamaz.'}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                {isEnglish ? 'Authority Tier' : 'Otorite Kademesi'}
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                {isEnglish ? 'Instrument Type' : 'Belge Türü'}
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                {isEnglish ? 'Description' : 'Açıklama'}
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                {isEnglish ? 'Binding Weight' : 'Bağlayıcılık Ağırlığı'}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.authorityLevel} className={i === 0 ? 'bg-indigo-50/50' : ''}>
                <td className="border border-gray-200 px-4 py-3 font-medium">
                  {isEnglish ? row.tier.en : row.tier.tr}
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  {isEnglish ? row.instrumentType.en : row.instrumentType.tr}
                </td>
                <td className="border border-gray-200 px-4 py-3 text-gray-600">
                  {isEnglish ? row.description.en : row.description.tr}
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  {isEnglish ? row.bindingWeight.en : row.bindingWeight.tr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
        {isEnglish
          ? 'This hierarchy is fixed and non-optional. Ordering reflects the US legal system\u2019s normative precedence structure.'
          : 'Bu hiyerarşi sabittir ve isteğe bağlı değildir. Sıralama, ABD hukuk sisteminin normatif öncelik yapısını yansıtmaktadır.'}
      </p>
    </div>
  )
}
