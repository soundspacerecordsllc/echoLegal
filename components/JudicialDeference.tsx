/**
 * JudicialDeference — reusable doctrinal content-section.
 *
 * Renders:
 *   1. "Judicial Deference Framework" — four-tier structure describing how
 *      courts calibrate deference to agency interpretations.
 *   2. Comparison table (5–7 rows) with columns: Instrument, Binding?,
 *      Deference Level, Judicial Review Standard.
 *   3. "Representative Doctrinal References" — citation-style case
 *      references with one-sentence principles.
 *
 * Tone: judicial, neutral, encyclopedic. No advocacy or implementation language.
 */

// ── types ──────────────────────────────────────────────────────────────────

export type DeferenceCase = {
  /** Citation-style reference, e.g. "Case Name (Court, Year)" */
  citation: string
  /** One-sentence doctrinal principle */
  principle: { en: string; tr: string }
}

export interface JudicialDeferenceProps {
  lang: 'en' | 'tr'
  /** Section numbering prefix, e.g. "12" to render "12. Judicial Deference…" */
  sectionNumber?: string
  /** Page-specific representative doctrinal references */
  cases: DeferenceCase[]
}

// ── tier data ──────────────────────────────────────────────────────────────

type Tier = {
  numeral: string
  title: { en: string; tr: string }
  description: { en: string; tr: string }
  color: string
}

const TIERS: Tier[] = [
  {
    numeral: 'I',
    title: {
      en: 'Statutory Interpretation Baseline',
      tr: 'Yasal Yorum Temel İlkesi',
    },
    description: {
      en: 'Courts begin with the text of the statute. Where the statutory language is clear and unambiguous, it is applied as written; no deference to agency interpretation is required or appropriate.',
      tr: 'Mahkemeler kanun metninden başlar. Yasal dil açık ve belirsizlikten uzak olduğunda, yazıldığı şekliyle uygulanır; kurum yorumuna saygı gösterilmesi gerekmez veya uygun değildir.',
    },
    color: 'border-indigo-400 bg-indigo-50/50',
  },
  {
    numeral: 'II',
    title: {
      en: 'Chevron Framework',
      tr: 'Chevron Çerçevesi',
    },
    description: {
      en: 'Where a statute is ambiguous and the agency has promulgated a regulation through notice-and-comment rulemaking, courts apply the Chevron two-step: (1) has Congress directly spoken to the precise question? If not, (2) is the agency\'s interpretation a permissible construction of the statute? If both conditions are met, the agency\'s interpretation controls.',
      tr: 'Kanun belirsiz olduğunda ve kurum bildirim ve yorum yöntemiyle yönetmelik çıkardığında, mahkemeler Chevron iki aşamalı testini uygular: (1) Kongre doğrudan bu konuya değinmiş mi? Değilse, (2) kurumun yorumu kanunun kabul edilebilir bir yorumu mu? Her iki koşul sağlanırsa kurumun yorumu geçerlidir.',
    },
    color: 'border-blue-400 bg-blue-50/50',
  },
  {
    numeral: 'III',
    title: {
      en: 'Skidmore Deference',
      tr: 'Skidmore Saygısı (Deference)',
    },
    description: {
      en: 'For informal agency interpretations — revenue rulings, IRS notices, agency guidance letters — courts apply Skidmore deference: the interpretation\'s persuasive power depends on the thoroughness of its reasoning, consistency with earlier and later pronouncements, and all factors that give it the power to persuade.',
      tr: 'Gayri resmi kurum yorumları — gelir kararları, IRS bildirimleri, kurum rehberlik mektupları — için mahkemeler Skidmore saygısını uygular: yorumun ikna gücü, muhakemesinin kapsamlılığına, önceki ve sonraki beyanlarla tutarlılığına ve ikna gücü veren tüm faktörlere bağlıdır.',
    },
    color: 'border-amber-400 bg-amber-50/50',
  },
  {
    numeral: 'IV',
    title: {
      en: 'Non-binding Guidance',
      tr: 'Bağlayıcı Olmayan Rehberlik',
    },
    description: {
      en: 'IRS publications, form instructions, FAQs, and similar materials receive no judicial deference. They represent the agency\'s administrative convenience and are treated as informational aids only. Courts are not bound by them and may disregard them where they conflict with statute or regulation.',
      tr: 'IRS yayınları, form talimatları, SSS ve benzeri materyaller yargısal saygı görmez. Bunlar kurumun idari kolaylığını temsil eder ve yalnızca bilgilendirme araçları olarak değerlendirilir. Mahkemeler bunlarla bağlı değildir ve kanun veya yönetmelikle çatıştıklarında göz ardı edebilir.',
    },
    color: 'border-gray-400 bg-gray-50/50',
  },
]

// ── comparison table data ──────────────────────────────────────────────────

type ComparisonRow = {
  instrument: { en: string; tr: string }
  binding: { en: string; tr: string }
  deferenceLevel: { en: string; tr: string }
  reviewStandard: { en: string; tr: string }
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    instrument: { en: 'Statute (IRC)', tr: 'Kanun (IRC)' },
    binding: { en: 'Yes', tr: 'Evet' },
    deferenceLevel: { en: 'N/A — statute is the source of law', tr: 'Uygulanamaz — kanun hukuk kaynağıdır' },
    reviewStandard: { en: 'Constitutional review only', tr: 'Yalnızca anayasal denetim' },
  },
  {
    instrument: { en: 'Treasury Regulation (notice-and-comment)', tr: 'Hazine Yönetmeliği (bildirim ve yorum)' },
    binding: { en: 'Yes', tr: 'Evet' },
    deferenceLevel: { en: 'Chevron deference', tr: 'Chevron saygısı' },
    reviewStandard: { en: 'Permissible construction of ambiguous statute', tr: 'Belirsiz kanunun kabul edilebilir yorumu' },
  },
  {
    instrument: { en: 'Treasury Regulation (interpretive)', tr: 'Hazine Yönetmeliği (yorumlayıcı)' },
    binding: { en: 'Varies', tr: 'Değişir' },
    deferenceLevel: { en: 'Skidmore or Chevron (context-dependent)', tr: 'Skidmore veya Chevron (bağlama bağlı)' },
    reviewStandard: { en: 'Persuasiveness of reasoning', tr: 'Muhakemenin ikna ediciliği' },
  },
  {
    instrument: { en: 'Revenue Ruling', tr: 'Gelir Kararı' },
    binding: { en: 'No', tr: 'Hayır' },
    deferenceLevel: { en: 'Skidmore deference', tr: 'Skidmore saygısı' },
    reviewStandard: { en: 'Thoroughness, consistency, persuasiveness', tr: 'Kapsamlılık, tutarlılık, ikna edicilik' },
  },
  {
    instrument: { en: 'IRS Notice / Announcement', tr: 'IRS Bildirimi / Duyurusu' },
    binding: { en: 'No', tr: 'Hayır' },
    deferenceLevel: { en: 'Skidmore deference (limited)', tr: 'Skidmore saygısı (sınırlı)' },
    reviewStandard: { en: 'Weight of reasoning; no presumption of correctness', tr: 'Muhakeme ağırlığı; doğruluk karinesi yok' },
  },
  {
    instrument: { en: 'IRS Publication / Form Instruction', tr: 'IRS Yayını / Form Talimatı' },
    binding: { en: 'No', tr: 'Hayır' },
    deferenceLevel: { en: 'None', tr: 'Yok' },
    reviewStandard: { en: 'Informational only; no judicial deference', tr: 'Yalnızca bilgilendirme; yargısal saygı yok' },
  },
]

// ── component ──────────────────────────────────────────────────────────────

export default function JudicialDeference({
  lang,
  sectionNumber,
  cases,
}: JudicialDeferenceProps) {
  const isEnglish = lang === 'en'
  const prefix = sectionNumber ? `${sectionNumber}. ` : ''
  const prefix2 = sectionNumber ? `${Number(sectionNumber) + 1}. ` : ''

  return (
    <>
      {/* ── Section: Judicial Deference Framework ─────────────────────── */}
      <section id="judicial-deference" className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {prefix}{isEnglish
            ? 'Judicial Deference Framework'
            : 'Yargısal İtibar (Deference) Çerçevesi'}
        </h2>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {isEnglish
            ? 'Federal courts do not treat all government interpretations of the tax code equally. The level of deference a court accords depends on the instrument type, the process by which it was issued, and its relationship to the underlying statute. The following framework describes the four principal tiers of judicial deference in US tax law.'
            : 'Federal mahkemeler, hükümetin vergi kanunu yorumlarının tümüne eşit muamele etmez. Mahkemenin gösterdiği saygı düzeyi, belge türüne, çıkarılma sürecine ve temel kanunla ilişkisine bağlıdır. Aşağıdaki çerçeve, ABD vergi hukukunda yargısal saygının dört temel kademesini açıklamaktadır.'}
        </p>

        {/* Four tiers */}
        <div className="space-y-4 mb-8">
          {TIERS.map((tier) => (
            <div key={tier.numeral} className={`border-l-4 ${tier.color} rounded-r-lg p-4`}>
              <h3 className="text-sm font-semibold text-black mb-2">
                {tier.numeral}. {isEnglish ? tier.title.en : tier.title.tr}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {isEnglish ? tier.description.en : tier.description.tr}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Instrument' : 'Belge'}
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Binding?' : 'Bağlayıcı mı?'}
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Deference Level' : 'Saygı Düzeyi'}
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Judicial Review Standard' : 'Yargısal Denetim Standardı'}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className={i === 0 ? 'bg-indigo-50/50' : ''}>
                  <td className="border border-gray-200 px-4 py-3 font-medium">
                    {isEnglish ? row.instrument.en : row.instrument.tr}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {isEnglish ? row.binding.en : row.binding.tr}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {isEnglish ? row.deferenceLevel.en : row.deferenceLevel.tr}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-600">
                    {isEnglish ? row.reviewStandard.en : row.reviewStandard.tr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section: Representative Doctrinal References ──────────────── */}
      <section id="doctrinal-references" className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {prefix2}{isEnglish
            ? 'Representative Doctrinal References'
            : 'Temsili Doktrinel Referanslar'}
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {isEnglish
            ? 'The following references illustrate the deference principles described above. They are selected for doctrinal significance and do not constitute a comprehensive survey of case law.'
            : 'Aşağıdaki referanslar yukarıda açıklanan saygı ilkelerini örneklemektedir. Doktrinel önem açısından seçilmişlerdir ve içtihat hukukunun kapsamlı bir araştırmasını oluşturmaz.'}
        </p>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <div key={i} className="border-l-4 border-gray-300 pl-4 py-2">
              <p className="text-sm font-semibold text-black">{c.citation}</p>
              <p className="text-sm text-gray-700 mt-1">
                {isEnglish ? c.principle.en : c.principle.tr}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
