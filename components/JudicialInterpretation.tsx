/**
 * JudicialInterpretation — reusable content-section pattern.
 *
 * Renders two sections:
 *   1. "Judicial Interpretation (Selected)" — binding vs persuasive authority,
 *      how courts treat conflicts, and what this resolves / does not resolve.
 *   2. "Interpretive Notes" — concise analytical notes with cross-links
 *      to the Citation Guide and Charter authority-precedence article.
 *
 * Props are page-specific content; layout and tone are standardised.
 */

import Link from 'next/link'

// ── types ──────────────────────────────────────────────────────────────────

export type JudicialEntry = {
  /** Short citation or case/ruling identifier */
  citation: string
  /** One-sentence summary of the holding or interpretive point */
  summary: { en: string; tr: string }
  /** 'binding' | 'persuasive' */
  weight: 'binding' | 'persuasive'
}

export type InterpretiveNote = {
  en: string
  tr: string
}

export type ResolutionBullet = {
  en: string
  tr: string
}

export interface JudicialInterpretationProps {
  lang: 'en' | 'tr'
  /** Selected judicial / administrative interpretation entries */
  entries: JudicialEntry[]
  /** Brief notes on how courts treat conflicts between statute/regulation/guidance */
  conflictNotes: InterpretiveNote[]
  /** "What this resolves" bullets */
  resolves: ResolutionBullet[]
  /** "What this does NOT resolve" bullets */
  doesNotResolve: ResolutionBullet[]
  /** Section numbering prefix, e.g. "9" to render "9. Judicial Interpretation…" */
  sectionNumber?: string
}

// ── component ──────────────────────────────────────────────────────────────

export default function JudicialInterpretation({
  lang,
  entries,
  conflictNotes,
  resolves,
  doesNotResolve,
  sectionNumber,
}: JudicialInterpretationProps) {
  const isEnglish = lang === 'en'
  const prefix = sectionNumber ? `${sectionNumber}. ` : ''
  const prefix2 = sectionNumber ? `${Number(sectionNumber) + 1}. ` : ''

  return (
    <>
      {/* ── Section A: Judicial Interpretation (Selected) ─────────────── */}
      <section id="judicial-interpretation" className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {prefix}{isEnglish
            ? 'Judicial Interpretation (Selected)'
            : 'Yargısal Yorum (Seçilmiş)'}
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          {isEnglish
            ? 'The entries below distinguish binding authority from persuasive guidance. Binding authority (statutes, regulations) controls; persuasive authority (agency guidance, IRS publications) informs but does not override higher-tier sources in the event of conflict.'
            : 'Aşağıdaki maddeler bağlayıcı otoriteyi ikna edici rehberlikten ayırmaktadır. Bağlayıcı otorite (kanunlar, yönetmelikler) belirleyicidir; ikna edici otorite (kurum rehberliği, IRS yayınları) bilgi verir ancak çatışma durumunda üst kademe kaynakları geçersiz kılmaz.'}
        </p>

        {/* Entries */}
        <div className="space-y-4 mb-8">
          {entries.map((entry, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className={`px-5 py-3 ${entry.weight === 'binding' ? 'bg-indigo-50' : 'bg-amber-50'}`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold text-black text-sm">{entry.citation}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    entry.weight === 'binding'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {entry.weight === 'binding'
                      ? (isEnglish ? 'Binding' : 'Bağlayıcı')
                      : (isEnglish ? 'Persuasive' : 'İkna Edici')}
                  </span>
                </div>
              </div>
              <div className="px-5 py-3">
                <p className="text-sm text-gray-700">{isEnglish ? entry.summary.en : entry.summary.tr}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Conflict treatment */}
        <div className="bg-gray-50 rounded-lg p-5 mb-6">
          <h3 className="text-sm font-semibold text-black mb-3">
            {isEnglish
              ? 'How courts treat conflicts between statute, regulation, and guidance'
              : 'Mahkemeler kanun, yönetmelik ve rehberlik arasındaki çatışmaları nasıl ele alır'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {conflictNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gray-400 select-none mt-px">–</span>
                <span>{isEnglish ? note.en : note.tr}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Resolves / Does not resolve */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-800 mb-3">
              {isEnglish ? 'What this resolves' : 'Bunun çözdüğü konular'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {resolves.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 select-none mt-px">&#10003;</span>
                  <span>{isEnglish ? item.en : item.tr}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-red-800 mb-3">
              {isEnglish ? 'What this does NOT resolve' : 'Bunun çözmediği konular'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {doesNotResolve.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 select-none mt-px">&#10007;</span>
                  <span>{isEnglish ? item.en : item.tr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section B: Interpretive Notes ──────────────────────────────── */}
      <section id="interpretive-notes" className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {prefix2}{isEnglish ? 'Interpretive Notes' : 'Yorum Notları'}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {isEnglish
            ? 'These notes summarise how binding and persuasive authority interact for the topics covered on this page. For the institutional standard governing source precedence, see the references below.'
            : 'Bu notlar, bu sayfada ele alınan konular için bağlayıcı ve ikna edici otoritenin nasıl etkileştiğini özetlemektedir. Kaynak önceliğini düzenleyen kurumsal standart için aşağıdaki referanslara bakınız.'}
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-sm text-gray-800">
            {isEnglish
              ? 'Where a statute and agency guidance conflict, the statute controls. Regulations issued under proper statutory authority have the force of law; informal guidance (revenue rulings, instructions, publications) does not.'
              : 'Kanun ile kurum rehberliği çatıştığında kanun geçerlidir. Uygun yasal yetki altında çıkarılan yönetmelikler kanun hükmündedir; gayri resmi rehberlik (gelir kararları, talimatlar, yayınlar) kanun hükmünde değildir.'}
          </p>
        </div>

        {/* Cross-links */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href={`/${lang}/about/charter`}
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            <span>&rarr;</span>
            {isEnglish ? 'Charter — Authority Precedence' : 'Tüzük — Otorite Önceliği'}
          </Link>
          <Link
            href={`/${lang}/about/contributor-standards`}
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            <span>&rarr;</span>
            {isEnglish ? 'Citation Guide & Contributor Standards' : 'Atıf Rehberi ve Katkıda Bulunan Standartları'}
          </Link>
        </div>
      </section>
    </>
  )
}
