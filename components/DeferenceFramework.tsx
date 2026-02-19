/**
 * DeferenceFramework — doctrinal hierarchy block.
 *
 * Renders a stepped-ladder visualization of the US federal legal
 * authority hierarchy, showing how courts weigh different source
 * types from statutes down to informal guidance.
 *
 * Mobile-first: uses stacked cards instead of a wide table.
 * Bilingual: EN/TR with formal legal Turkish.
 * Jurisdiction-tagged: US Federal.
 */

type DeferenceLevel = {
  level: number
  label: { en: string; tr: string }
  description: { en: string; tr: string }
  binding: boolean
}

const DEFERENCE_LEVELS: DeferenceLevel[] = [
  {
    level: 1,
    label: { en: 'Statute', tr: 'Kanun' },
    description: {
      en: 'Federal statutes enacted by Congress (e.g., Internal Revenue Code, state LLC acts). Statutes are the highest domestic authority below the Constitution and control all subordinate instruments.',
      tr: 'Kongre tarafından çıkarılan federal kanunlar (ör. Internal Revenue Code, eyalet LLC yasaları). Kanunlar, Anayasa altında en üst yurtiçi otorite olup tüm alt kademe belgeleri bağlar.',
    },
    binding: true,
  },
  {
    level: 2,
    label: { en: 'Regulation', tr: 'Yönetmelik' },
    description: {
      en: 'Rules issued by federal agencies under statutory authority (e.g., Treasury Regulations under 26 C.F.R.). Regulations carry the force of law when issued through notice-and-comment rulemaking.',
      tr: 'Federal kurumların yasal yetki altında çıkardığı kurallar (ör. 26 C.F.R. kapsamında Treasury Regulations). Bildirim ve yorum süreciyle çıkarılan yönetmelikler kanun hükmündedir.',
    },
    binding: true,
  },
  {
    level: 3,
    label: {
      en: 'Revenue Rulings & Procedures',
      tr: 'Gelir Kararları ve Prosedürleri',
    },
    description: {
      en: 'Published IRS interpretations of how the law applies to specific fact patterns (Revenue Rulings) and procedural guidance (Revenue Procedures). Courts consider these but are not bound by them.',
      tr: 'IRS\'in hukukun belirli olgulara nasıl uygulandığına ilişkin yayımlanmış yorumları (Revenue Rulings) ve prosedürel rehberliği (Revenue Procedures). Mahkemeler bunları dikkate alır ancak bağlı değildir.',
    },
    binding: false,
  },
  {
    level: 4,
    label: { en: 'Notices & Announcements', tr: 'Bildirimler ve Duyurular' },
    description: {
      en: 'IRS Notices and Announcements that signal policy positions or upcoming regulatory changes. Persuasive but carry no binding legal force.',
      tr: 'Politika pozisyonlarını veya yaklaşan düzenleyici değişiklikleri bildiren IRS Bildirimleri ve Duyuruları. İkna edici niteliktedir ancak bağlayıcı hukuki güce sahip değildir.',
    },
    binding: false,
  },
  {
    level: 5,
    label: {
      en: 'Informal Guidance (FAQs, Publications)',
      tr: 'Gayri Resmi Rehberlik (SSS, Yayınlar)',
    },
    description: {
      en: 'IRS Publications, FAQs, and website content. These are informational aids written for a general audience. Courts afford them no deference; they may simplify or omit nuances present in higher-tier sources.',
      tr: 'IRS Yayınları, Sıkça Sorulan Sorular ve web sitesi içerikleri. Bunlar genel kitleye yönelik bilgilendirme araçlarıdır. Mahkemeler bunlara saygı (deference) tanımaz; üst kademe kaynaklardaki nüansları basitleştirebilir veya atlayabilir.',
    },
    binding: false,
  },
]

interface DeferenceFrameworkProps {
  lang: 'en' | 'tr'
}

export default function DeferenceFramework({ lang }: DeferenceFrameworkProps) {
  const isEnglish = lang === 'en'

  return (
    <section id="deference-framework" className="mb-12">
      <h2 className="text-2xl font-semibold mb-2">
        {isEnglish
          ? 'Judicial Deference Framework'
          : 'Yargısal İtibar (Deference) Çerçevesi'}
      </h2>

      <span className="inline-block text-xs text-gray-500 mb-4">
        {isEnglish ? 'Jurisdiction: US Federal' : 'Kapsam: ABD Federal'}
      </span>

      <div className="prose max-w-none text-gray-600 mb-6">
        <p className="text-sm leading-relaxed">
          {isEnglish
            ? 'Not all legal sources carry equal weight. Federal courts apply a hierarchy of deference when determining which authority controls a given question. Understanding this framework helps distinguish what a business owner must follow from what is merely informational.'
            : 'Tüm hukuki kaynaklar eşit ağırlığa sahip değildir. Federal mahkemeler, belirli bir soruya hangi otoritenin hakim olduğunu belirlerken bir itibar (deference) hiyerarşisi uygular. Bu çerçeveyi anlamak, işletme sahibinin uyması zorunlu olanı yalnızca bilgilendirme niteliğinde olandan ayırt etmeye yardımcı olur.'}
        </p>
      </div>

      {/* Stepped ladder — stacked cards for mobile friendliness */}
      <div className="space-y-3 mb-6">
        {DEFERENCE_LEVELS.map((item) => (
          <div
            key={item.level}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 ${
                item.binding ? 'bg-indigo-50' : 'bg-gray-50'
              }`}
            >
              <span className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-700 flex-shrink-0">
                {item.level}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-gray-900">
                  {isEnglish ? item.label.en : item.label.tr}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    item.binding
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.binding
                    ? isEnglish
                      ? 'Binding'
                      : 'Bağlayıcı'
                    : isEnglish
                      ? 'Non-binding'
                      : 'Bağlayıcı değil'}
                </span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {isEnglish ? item.description.en : item.description.tr}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Practical takeaway */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          {isEnglish ? 'Practical Takeaway' : 'Pratik Sonuç'}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {isEnglish
            ? 'Statutes and regulations (Levels 1–2) are "must-follow": non-compliance carries legal consequences. Revenue Rulings and Notices (Levels 3–4) reflect the IRS\'s stated position and are prudent to follow in practice, but courts may reach different conclusions. IRS Publications and FAQs (Level 5) are helpful as starting points but should never be treated as definitive legal authority. When a Publication appears to conflict with the Internal Revenue Code or Treasury Regulations, the higher-tier source controls.'
            : 'Kanunlar ve yönetmelikler (Kademe 1–2) "uyulması zorunlu" kaynaklardır: uyumsuzluk hukuki sonuç doğurur. Gelir Kararları ve Bildirimler (Kademe 3–4) IRS\'in beyan ettiği pozisyonu yansıtır ve pratikte bunlara uymak ihtiyatlı bir yaklaşımdır; ancak mahkemeler farklı sonuçlara varabilir. IRS Yayınları ve SSS\'ler (Kademe 5) başlangıç noktası olarak faydalıdır ancak kesin hukuki otorite olarak asla değerlendirilmemelidir. Bir Yayın, Internal Revenue Code veya Treasury Regulations ile çelişir göründüğünde üst kademe kaynak geçerlidir.'}
        </p>
      </div>
    </section>
  )
}
