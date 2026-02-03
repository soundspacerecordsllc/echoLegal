import Link from 'next/link'

interface KitCalloutProps {
  lang: string
  variant?: 'compact' | 'full'
}

/**
 * KitCallout - Reusable component to promote the Business Starter Kit
 * Use on money pages like LLC formation, contracts, etc.
 *
 * Variants:
 * - compact: Smaller, inline version for mid-page placement
 * - full: Larger card version for end of page
 */
export default function KitCallout({ lang, variant = 'compact' }: KitCalloutProps) {
  const isEnglish = lang === 'en'

  const stripeLink = 'https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03'
  const freeDownloadLink = '/documents/kits/abd-business-starter-kit.zip'
  const kitPageLink = `/${lang}/amerika/legal-kitler/abd-business-starter-legal-kit`

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">
              {isEnglish ? 'US Business Starter Legal Kit' : 'ABD İş Başlangıç Hukuk Kiti'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {isEnglish
                ? 'LLC templates, NDA, Service Agreement & more'
                : 'LLC şablonları, NDA, Hizmet Sözleşmesi ve daha fazlası'}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={stripeLink}
              className="px-4 py-2 bg-[#C9A227] text-white text-sm font-medium rounded-lg hover:bg-[#B8922A] transition-colors whitespace-nowrap"
            >
              {isEnglish ? '$20 Pay' : '20 $ Destek'}
            </a>
            <a
              href={freeDownloadLink}
              download
              className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              {isEnglish ? 'Free' : 'Ücretsiz'}
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Full variant - larger card for end of page
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 my-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isEnglish ? 'US Business Starter Legal Kit' : 'ABD İş Başlangıç Hukuk Kiti'}
        </h3>
        <p className="text-gray-600">
          {isEnglish
            ? 'Everything you need to start your US business'
            : 'ABD\'deki işinizi başlatmak için ihtiyacınız olan her şey'}
        </p>
      </div>

      <ul className="text-sm text-gray-700 space-y-2 mb-6 max-w-md mx-auto">
        <li className="flex items-center gap-2">
          <span className="text-[#C9A227]">✓</span>
          <span>{isEnglish ? 'LLC Operating Agreement template' : 'LLC İşletme Sözleşmesi şablonu'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-[#C9A227]">✓</span>
          <span>{isEnglish ? 'NDA template (EN/TR)' : 'NDA şablonu (EN/TR)'}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-[#C9A227]">✓</span>
          <span>{isEnglish ? 'Service Agreement template (EN/TR)' : 'Hizmet Sözleşmesi şablonu (EN/TR)'}</span>
        </li>
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={stripeLink}
          className="px-6 py-3 bg-[#C9A227] text-white font-semibold rounded-lg hover:bg-[#B8922A] transition-colors text-center"
        >
          {isEnglish ? '$20 Recommended' : '20 $ Önerilen'}
        </a>
        <a
          href={freeDownloadLink}
          download
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-center"
        >
          {isEnglish ? 'Download Free' : 'Ücretsiz İndir'}
        </a>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        <Link href={kitPageLink} className="hover:text-[#C9A227] underline">
          {isEnglish ? 'View kit details' : 'Kit detaylarını görüntüle'}
        </Link>
      </p>
    </div>
  )
}
