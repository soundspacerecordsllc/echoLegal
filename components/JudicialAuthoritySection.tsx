/**
 * JudicialAuthoritySection — structured 3-layer doctrinal block.
 *
 * Layer 1: Doctrinal header — Judicial Interpretation Framework
 * Layer 2: Subsection A — Statutory Interpretation Doctrine
 * Layer 3: Subsection B — Key Supreme Court Holdings (case cards)
 *
 * Cases sorted by AUTHORITY_LEVEL_WEIGHT, with chronological
 * tiebreaker (oldest → newest) within the same authority level.
 *
 * Mobile-first: stacked cards, no tables.
 * Bilingual: EN/TR with formal legal register.
 * Institutional tone only.
 */

import type { AuthorityLevel } from '@/lib/content-schema'
import { AUTHORITY_LEVEL_WEIGHT } from '@/lib/citations/canon'

// ── types ──────────────────────────────────────────────────────────────

export type ImpactCategory =
  | 'classification'
  | 'reporting-obligations'
  | 'penalty-framework'
  | 'nexus-doctrine'

export type JudicialCase = {
  caseName: string
  citation: string
  court: string
  year: number
  holdingSummary: { en: string; tr: string }
  authorityLevel: AuthorityLevel
  canonicalId: string
  jurisdiction?: string
  doctrineType?: string
  impactCategory?: ImpactCategory
}

interface JudicialAuthoritySectionProps {
  lang: 'en' | 'tr'
  cases: JudicialCase[]
}

// ── impact category labels ─────────────────────────────────────────────

const IMPACT_LABELS: Record<ImpactCategory, { en: string; tr: string }> = {
  classification: { en: 'Classification', tr: 'Sınıflandırma' },
  'reporting-obligations': {
    en: 'Reporting Obligations',
    tr: 'Raporlama Yükümlülükleri',
  },
  'penalty-framework': { en: 'Penalty Framework', tr: 'Yaptırım Çerçevesi' },
  'nexus-doctrine': { en: 'Nexus Doctrine', tr: 'Nexus Doktrini' },
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

  // Enforce authority-level ordering (non-discretionary).
  // Chronological tiebreaker within same authority level.
  const sorted = [...cases].sort((a, b) => {
    const weightDiff =
      AUTHORITY_LEVEL_WEIGHT[a.authorityLevel] -
      AUTHORITY_LEVEL_WEIGHT[b.authorityLevel]
    if (weightDiff !== 0) return weightDiff
    return a.year - b.year
  })

  return (
    <section id="judicial-authority" className="mb-12">
      {/* ── Layer 1: Doctrinal Header ─────────────────────────────── */}
      <h2 className="text-2xl font-semibold mb-2">
        {isEnglish
          ? 'Judicial Interpretation Framework'
          : 'Yargısal Yorum Çerçevesi'}
      </h2>
      <span className="inline-block text-xs text-gray-500 mb-4">
        {isEnglish ? 'Jurisdiction: US Federal' : 'Kapsam: ABD Federal'}
      </span>

      <div className="prose max-w-none text-gray-600 mb-8">
        <p className="text-sm leading-relaxed">
          {isEnglish
            ? 'Federal statutes governing LLC formation and entity classification are subject to judicial interpretation. Court holdings clarify statutory scope, define classification doctrine, establish penalty parameters, and set compliance standards. The framework below presents the interpretive doctrines courts apply, followed by selected Supreme Court holdings with direct relevance to LLC formation and operations.'
            : 'LLC kuruluşu ve kuruluş sınıflandırmasını düzenleyen federal kanunlar yargısal yoruma tabidir. Mahkeme kararları kanun kapsamını netleştirir, sınıflandırma doktrinini tanımlar, yaptırım parametrelerini belirler ve uyum standartlarını oluşturur. Aşağıdaki çerçeve, mahkemelerin uyguladığı yorum doktrinlerini ve ardından LLC kuruluşu ve faaliyetleriyle doğrudan ilgili seçilmiş Yüksek Mahkeme kararlarını sunmaktadır.'}
        </p>
      </div>

      {/* ── Layer 2: Subsection A — Statutory Interpretation ──────── */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {isEnglish
            ? 'A. Statutory Interpretation Doctrine'
            : 'A. Kanun Yorumu Doktrini'}
        </h3>

        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-indigo-50">
              <span className="font-semibold text-sm text-gray-900">
                {isEnglish ? 'Plain Meaning Rule' : 'Düz Anlam Kuralı'}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'Courts begin with the statutory text. Where the language of a statute is plain and unambiguous, courts apply it as written without resort to legislative history or extrinsic aids. This principle governs the initial interpretation of Internal Revenue Code provisions applicable to LLCs, including entity classification under § 7701 and reporting obligations under § 6038A.'
                  : 'Mahkemeler kanun metninden başlar. Bir kanunun dili açık ve belirsizlik taşımıyorsa, mahkemeler yasama tarihine veya dışsal yardımlara başvurmaksızın metni olduğu gibi uygular. Bu ilke, LLC\'lere uygulanabilir Internal Revenue Code hükümlerinin — § 7701 kapsamında kuruluş sınıflandırması ve § 6038A kapsamında raporlama yükümlülükleri dahil — ilk yorumunu yönetir.'}
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-indigo-50">
              <span className="font-semibold text-sm text-gray-900">
                {isEnglish
                  ? 'Agency Deference Standards'
                  : 'Kuruma Saygı (Deference) Standartları'}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'When statutory text is ambiguous, courts have historically applied deference frameworks to agency interpretations. Under Chevron U.S.A., Inc. v. NRDC, 467 U.S. 837 (1984), courts deferred to reasonable agency interpretations of ambiguous statutes the agency was charged with administering. Under Skidmore v. Swift & Co., 323 U.S. 134 (1944), agency interpretations lacking the force of law receive deference proportional to their persuasiveness, consistency, and thoroughness of reasoning.'
                  : 'Kanun metni belirsiz olduğunda, mahkemeler tarihsel olarak kurum yorumlarına saygı (deference) çerçeveleri uygulamıştır. Chevron U.S.A., Inc. v. NRDC, 467 U.S. 837 (1984) kapsamında mahkemeler, kurumun uygulamakla yetkili olduğu belirsiz kanunlara ilişkin makul kurum yorumlarına saygı göstermiştir. Skidmore v. Swift & Co., 323 U.S. 134 (1944) kapsamında ise kanun hükmünde olmayan kurum yorumları, ikna edicilik gücü, tutarlılık ve gerekçe kapsamlılığıyla orantılı saygı görür.'}
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-gray-50">
              <span className="font-semibold text-sm text-gray-900">
                {isEnglish
                  ? 'Post-Chevron Developments'
                  : 'Chevron Sonrası Gelişmeler'}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'The Supreme Court\'s decision in Loper Bright Enterprises v. Raimondo, 603 U.S. ___ (2024) overruled Chevron deference, holding that courts must exercise independent judgment in determining the meaning of statutory provisions, rather than deferring to agency interpretations of ambiguous statutes. Treasury Regulations and IRS guidance previously entitled to Chevron deference may now be subject to closer judicial scrutiny. The Skidmore standard remains applicable to agency interpretations that lack the force of law.'
                  : 'Yüksek Mahkeme\'nin Loper Bright Enterprises v. Raimondo, 603 U.S. ___ (2024) kararı Chevron saygısını ortadan kaldırmış ve mahkemelerin belirsiz kanunlara ilişkin kurum yorumlarına saygı göstermek yerine kanun hükümlerinin anlamını belirlemede bağımsız yargı kullanması gerektiğine hükmetmiştir. Daha önce Chevron saygısından yararlanan Treasury Regulations ve IRS rehberliği artık daha sıkı yargısal denetime tabi olabilir. Kanun hükmünde olmayan kurum yorumları için Skidmore standardı uygulanabilir olmaya devam etmektedir.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Layer 3: Subsection B — Key Holdings ─────────────────── */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isEnglish
            ? 'B. Key Supreme Court Holdings'
            : 'B. Temel Yüksek Mahkeme Kararları'}
        </h3>

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
                    <h4 className="font-semibold text-sm text-gray-900 leading-snug">
                      {c.caseName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {c.citation} ({c.year})
                    </p>
                    {c.impactCategory && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                        {isEnglish
                          ? IMPACT_LABELS[c.impactCategory].en
                          : IMPACT_LABELS[c.impactCategory].tr}
                      </span>
                    )}
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
      </div>

      {/* ── Micro doctrinal disclaimer ────────────────────────────── */}
      <div className="text-xs text-gray-400 leading-relaxed">
        <p>
          {isEnglish
            ? 'This section summarizes selected federal cases relevant to LLC classification and compliance. It does not exhaust the full body of jurisprudence. Case summaries are condensed for reference; holdings may have been narrowed, distinguished, or extended by subsequent decisions. Consult primary sources for authoritative text.'
            : 'Bu bölüm, LLC sınıflandırması ve uyumuyla ilgili seçilmiş federal davaları özetlemektedir. İçtihadın tamamını kapsamamaktadır. Karar özetleri referans amaçlı kısaltılmıştır; kararlar sonraki içtihatlarla daraltılmış, ayrıştırılmış veya genişletilmiş olabilir. Yetkili metin için birincil kaynaklara başvurunuz.'}
        </p>
      </div>
    </section>
  )
}
