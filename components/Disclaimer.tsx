/**
 * Reusable Disclaimer Component
 * Bilingual (English/Turkish) legal disclaimer for all pages
 */

interface DisclaimerProps {
  lang: 'en' | 'tr'
  variant?: 'full' | 'compact' | 'inline' | 'banner'
  className?: string
}

const disclaimerContent = {
  en: {
    title: 'Legal Disclaimer',
    full: 'EchoLegal provides educational legal information and document templates for general informational purposes only. Nothing on this website constitutes legal advice, nor does use of this website create an attorney-client relationship. Laws vary by jurisdiction and individual circumstances differ. You should consult with a licensed attorney in your jurisdiction before relying on any information or documents from this site. EchoLegal makes no warranties about the accuracy, completeness, or reliability of any information provided.',
    compact: 'This content is for educational purposes only and does not constitute legal advice. Consult a licensed attorney for advice specific to your situation.',
    inline: 'For educational purposes only. Not legal advice.',
    banner: 'This site provides educational legal information only. It is not a substitute for professional legal advice.',
  },
  tr: {
    title: 'Yasal Uyarı',
    full: 'EchoLegal yalnızca genel bilgilendirme amaçlı eğitim niteliğinde hukuki bilgiler ve belge şablonları sunar. Bu sitedeki hiçbir içerik hukuki tavsiye değildir; sitenin kullanımı avukat-müvekkil ilişkisi oluşturmaz. Yasalar yargı yetkisine göre değişir ve bireysel koşullar farklılık gösterir. Bu sitedeki herhangi bir bilgiye veya belgeye güvenmeden önce kendi yargı bölgenizdeki lisanslı bir avukata danışmalısınız. EchoLegal, sağlanan bilgilerin doğruluğu, eksiksizliği veya güvenilirliği konusunda herhangi bir garanti vermez.',
    compact: 'Bu içerik yalnızca eğitim amaçlıdır ve hukuki tavsiye niteliği taşımaz. Durumunuza özel tavsiye için lisanslı bir avukata danışın.',
    inline: 'Yalnızca eğitim amaçlıdır. Hukuki tavsiye değildir.',
    banner: 'Bu site yalnızca eğitim amaçlı hukuki bilgi sağlar. Profesyonel hukuki danışmanlığın yerini tutmaz.',
  },
}

export default function Disclaimer({ lang, variant = 'compact', className = '' }: DisclaimerProps) {
  const content = disclaimerContent[lang]
  const isEnglish = lang === 'en'

  if (variant === 'full') {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
          {content.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {content.full}
        </p>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-amber-50 border-l-4 border-amber-400 p-4 ${className}`}>
        <p className="text-sm text-amber-800">
          <span className="font-semibold">{content.title}:</span> {content.compact}
        </p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <span className={`text-xs text-gray-500 italic ${className}`}>
        {content.inline}
      </span>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-blue-50 border-b border-blue-100 py-2 px-4 text-center ${className}`}>
        <p className="text-xs text-blue-700">
          <span className="font-medium">{isEnglish ? 'Notice' : 'Uyarı'}:</span> {content.banner}
        </p>
      </div>
    )
  }

  return null
}

/**
 * Footer disclaimer for use at the bottom of pages
 */
export function FooterDisclaimer({ lang }: { lang: 'en' | 'tr' }) {
  const content = disclaimerContent[lang]

  return (
    <div className="border-t border-gray-100 pt-8 mt-10">
      <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
        <span className="font-semibold uppercase tracking-wider">{content.title}:</span>{' '}
        {content.full}
      </p>
    </div>
  )
}

/**
 * Affiliate disclosure for pages with affiliate links
 */
export function AffiliateDisclosure({ lang }: { lang: 'en' | 'tr' }) {
  const isEnglish = lang === 'en'

  return (
    <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
      <p>
        <span className="font-semibold">
          {isEnglish ? 'Affiliate Disclosure' : 'Ortaklık Açıklaması'}:
        </span>{' '}
        {isEnglish
          ? 'Some links on this page are affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you. This helps support EchoLegal and allows us to continue providing free legal resources.'
          : 'Bu sayfadaki bazı bağlantılar ortaklık bağlantılarıdır. Bu bağlantılar üzerinden alışveriş yaparsanız, size ekstra maliyet olmadan küçük bir komisyon kazanabiliriz. Bu, EchoLegal\'i desteklememize ve ücretsiz hukuki kaynaklar sunmaya devam etmemize yardımcı olur.'}
      </p>
    </div>
  )
}
