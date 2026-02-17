/**
 * ConflictPrecedence — reusable doctrinal content-section.
 *
 * Renders:
 *   1. "Conflict Resolution & Authority Precedence" — matrix table showing
 *      instrument types, normative weights, override capacity, and court treatment.
 *   2. Explanatory paragraph on how courts generally resolve conflicts.
 *   3. "Not resolved by this hierarchy" bullet section.
 *   4. "Illustrative Judicial Treatment (Selected)" — 1–2 citation-style
 *      references with high-level doctrinal principles.
 *
 * Tone: judicial, neutral, encyclopedic. No advocacy or implementation language.
 */

// ── types ──────────────────────────────────────────────────────────────────

export type CaseIllustration = {
  /** Citation-style reference, e.g. "Case Name (Court, Year)" */
  citation: string
  /** One-sentence doctrinal principle */
  principle: { en: string; tr: string }
}

export type UnresolvedItem = {
  en: string
  tr: string
}

export interface ConflictPrecedenceProps {
  lang: 'en' | 'tr'
  /** Section numbering prefix, e.g. "10" to render "10. Conflict Resolution…" */
  sectionNumber?: string
  /** Page-specific illustrative case references */
  caseIllustrations: CaseIllustration[]
  /** Items that this hierarchy does NOT resolve */
  unresolvedItems: UnresolvedItem[]
}

// ── matrix data ────────────────────────────────────────────────────────────

type MatrixRow = {
  instrument: { en: string; tr: string }
  weight: { en: string; tr: string }
  canOverride: { en: string; tr: string }
  courtTreatment: { en: string; tr: string }
}

const MATRIX_ROWS: MatrixRow[] = [
  {
    instrument: { en: 'Constitution', tr: 'Anayasa' },
    weight: { en: 'Supreme', tr: 'En üstün' },
    canOverride: { en: 'All subordinate instruments', tr: 'Tüm alt kademe belgeler' },
    courtTreatment: { en: 'Controls unconditionally', tr: 'Koşulsuz olarak geçerlidir' },
  },
  {
    instrument: { en: 'Federal Statute', tr: 'Federal Kanun' },
    weight: { en: 'Binding', tr: 'Bağlayıcı' },
    canOverride: { en: 'Regulations, guidance, instructions', tr: 'Yönetmelikler, rehberlik, talimatlar' },
    courtTreatment: { en: 'Applied as enacted; regulations must conform', tr: 'Kanunlaştırıldığı şekliyle uygulanır; yönetmelikler uyum sağlamalıdır' },
  },
  {
    instrument: { en: 'Treaty', tr: 'Uluslararası Anlaşma' },
    weight: { en: 'Binding', tr: 'Bağlayıcı' },
    canOverride: { en: 'May modify statutory rates where applicable', tr: 'Uygulanabilir olduğunda yasal oranları değiştirebilir' },
    courtTreatment: { en: 'Co-equal with statute; later-in-time rule applies', tr: 'Kanunla eş düzeyde; sonra çıkan kuralı uygulanır' },
  },
  {
    instrument: { en: 'Federal Regulation', tr: 'Federal Yönetmelik' },
    weight: { en: 'Implementing', tr: 'Uygulayıcı' },
    canOverride: { en: 'Guidance and instructions only', tr: 'Yalnızca rehberlik ve talimatlar' },
    courtTreatment: { en: 'Force of law if issued under proper authority', tr: 'Uygun yetki altında çıkarılmışsa kanun hükmündedir' },
  },
  {
    instrument: { en: 'Agency Guidance / Revenue Ruling', tr: 'Kurum Rehberliği / Gelir Kararı' },
    weight: { en: 'Interpretive', tr: 'Yorumlayıcı' },
    canOverride: { en: 'Nothing; cannot override higher sources', tr: 'Hiçbir şey; üst kaynakları geçersiz kılamaz' },
    courtTreatment: { en: 'Considered but not binding on courts', tr: 'Değerlendirilir ancak mahkemeler için bağlayıcı değildir' },
  },
  {
    instrument: { en: 'Form Instruction / Publication', tr: 'Form Talimatı / Yayın' },
    weight: { en: 'Non-binding', tr: 'Bağlayıcı olmayan' },
    canOverride: { en: 'Nothing', tr: 'Hiçbir şey' },
    courtTreatment: { en: 'Informational only; no judicial deference', tr: 'Yalnızca bilgilendirme amaçlı; yargısal saygı yok' },
  },
]

// ── component ──────────────────────────────────────────────────────────────

export default function ConflictPrecedence({
  lang,
  sectionNumber,
  caseIllustrations,
  unresolvedItems,
}: ConflictPrecedenceProps) {
  const isEnglish = lang === 'en'
  const prefix = sectionNumber ? `${sectionNumber}. ` : ''
  const prefix2 = sectionNumber ? `${Number(sectionNumber) + 1}. ` : ''

  return (
    <>
      {/* ── Section: Conflict Resolution & Authority Precedence ──────── */}
      <section id="conflict-precedence" className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {prefix}{isEnglish
            ? 'Conflict Resolution & Authority Precedence'
            : 'Çatışma Çözümü ve Yetki Önceliği'}
        </h2>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {isEnglish
            ? 'When multiple legal instruments address the same question, a fixed hierarchy determines which source controls. The following matrix summarises the normative weight of each instrument type, its capacity to override lower-tier sources, and typical judicial treatment.'
            : 'Birden fazla hukuki belge aynı konuyu ele aldığında, hangi kaynağın geçerli olduğunu sabit bir hiyerarşi belirler. Aşağıdaki matris, her belge türünün normatif ağırlığını, alt kademe kaynakları geçersiz kılma kapasitesini ve tipik yargısal muameleyi özetlemektedir.'}
        </p>

        {/* Precedence matrix table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Instrument Type' : 'Belge Türü'}
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Normative Weight' : 'Normatif Ağırlık'}
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Can Override' : 'Geçersiz Kılabilir'}
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                  {isEnglish ? 'Typical Court Treatment' : 'Tipik Yargısal Muamele'}
                </th>
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map((row, i) => (
                <tr key={i} className={i === 0 ? 'bg-indigo-50/50' : ''}>
                  <td className="border border-gray-200 px-4 py-3 font-medium">
                    {isEnglish ? row.instrument.en : row.instrument.tr}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {isEnglish ? row.weight.en : row.weight.tr}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {isEnglish ? row.canOverride.en : row.canOverride.tr}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-600">
                    {isEnglish ? row.courtTreatment.en : row.courtTreatment.tr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* General conflict-resolution paragraph */}
        <div className="bg-gray-50 rounded-lg p-5 mb-6">
          <h3 className="text-sm font-semibold text-black mb-3">
            {isEnglish
              ? 'If conflict arises, courts generally…'
              : 'Çatışma ortaya çıkarsa, mahkemeler genel olarak…'}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {isEnglish
              ? 'apply the higher-ranking source. A statute prevails over a conflicting regulation; a regulation issued under proper delegated authority prevails over informal agency guidance. Where a statute and a treaty conflict, courts apply the "later-in-time" rule: the more recently enacted instrument controls. Regulations that exceed their statutory mandate are struck down as ultra vires. Agency publications and form instructions receive no judicial deference and are treated as informational aids, not as authoritative statements of law.'
              : 'daha üst sıradaki kaynağı uygular. Çatışan bir yönetmelik karşısında kanun geçerlidir; uygun yetki devri altında çıkarılan yönetmelik, gayri resmi kurum rehberliğine göre üstündür. Kanun ile anlaşma çatıştığında, mahkemeler "sonra çıkan kural" ilkesini uygular: daha yakın tarihli belge geçerlidir. Yasal yetkisini aşan yönetmelikler yetki aşımı (ultra vires) olarak geçersiz kılınır. Kurum yayınları ve form talimatları yargısal saygı görmez; hukuki otorite beyanları olarak değil, bilgilendirme araçları olarak değerlendirilir.'}
          </p>
        </div>

        {/* Not resolved by this hierarchy */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            {isEnglish
              ? 'Not resolved by this hierarchy'
              : 'Bu hiyerarşi tarafından çözülmeyen konular'}
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {unresolvedItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gray-400 select-none mt-px">–</span>
                <span>{isEnglish ? item.en : item.tr}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section: Illustrative Judicial Treatment ────────────────── */}
      <section id="illustrative-judicial-treatment" className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {prefix2}{isEnglish
            ? 'Illustrative Judicial Treatment (Selected)'
            : 'Seçilmiş Yargısal Yaklaşım Örnekleri'}
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {isEnglish
            ? 'The following references illustrate how federal courts have applied the precedence principles described above. These are selected for doctrinal relevance; they do not constitute a comprehensive survey of case law.'
            : 'Aşağıdaki referanslar, federal mahkemelerin yukarıda açıklanan öncelik ilkelerini nasıl uyguladığını göstermektedir. Bunlar doktrinel alaka düzeyine göre seçilmiştir; içtihat hukukunun kapsamlı bir araştırmasını oluşturmaz.'}
        </p>

        <div className="space-y-4">
          {caseIllustrations.map((c, i) => (
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
