'use client'

import Link from 'next/link'

type StarterKitCTAProps = {
  lang: 'en' | 'tr'
  variant?: 'inline' | 'sticky' | 'card'
  className?: string
}

/**
 * Contextual CTA for Legal Starter Kit
 * Designed to be non-intrusive and match encyclopedic tone
 */
export default function StarterKitCTA({
  lang,
  variant = 'inline',
  className = ''
}: StarterKitCTAProps) {
  const isEnglish = lang === 'en'

  const content = {
    en: {
      title: 'Legal Starter Kit',
      description: 'Essential contract templates for US business (EN/TR)',
      cta: 'View Kit',
      support: 'I support EchoLegal',
      recommended: '$20 recommended · Free access available',
    },
    tr: {
      title: 'Legal Starter Kit',
      description: 'ABD işletmeleri için temel sözleşme şablonları (EN/TR)',
      cta: 'Kiti Görüntüle',
      support: 'EchoLegal\'ı destekliyorum',
      recommended: '20$ önerilir · Ücretsiz erişim mevcut',
    },
  }

  const t = content[lang]

  if (variant === 'inline') {
    return (
      <div className={`border border-gray-200 rounded-lg p-4 my-6 bg-gray-50 ${className}`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h4 className="font-semibold text-black text-sm">{t.title}</h4>
            <p className="text-xs text-gray-600">{t.description}</p>
          </div>
          <Link
            href={`/${lang}/legal-kits/business-starter`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
          >
            {t.cta}
            <span>→</span>
          </Link>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`border border-gray-200 rounded-lg p-6 bg-white shadow-sm ${className}`}>
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">📦</span>
          <div>
            <h3 className="font-bold text-black">{t.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{t.description}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">{t.recommended}</p>
        <div className="flex flex-col gap-2">
          <Link
            href={`/${lang}/legal-kits/business-starter`}
            className="block text-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    )
  }

  // Sticky variant - bottom bar
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl hidden sm:block">📦</span>
          <div>
            <h4 className="font-semibold text-black text-sm">{t.title}</h4>
            <p className="text-xs text-gray-600 hidden sm:block">{t.description}</p>
          </div>
        </div>
        <Link
          href={`/${lang}/legal-kits/business-starter`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          {t.cta}
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
