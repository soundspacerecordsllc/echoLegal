// app/[lang]/updates/page.tsx
// Legal Updates feed page

import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { getLegalUpdates } from '@/lib/db/legal-updates-db'
import { LegalUpdatesFeed } from '@/components/LegalUpdatesFeed'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Legal Updates | EchoLegal'
      : 'Hukuki Güncellemeler | EchoLegal',
    description: isEnglish
      ? 'Stay informed with the latest legal updates from official US government sources including IRS, Congress, and the Federal Register.'
      : 'IRS, Kongre ve Federal Register dahil resmi ABD hükümeti kaynaklarından en son hukuki güncellemelerle bilgilenin.',
  }
}

export default async function LegalUpdatesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  // Fetch published updates only for public view
  const updates = await getLegalUpdates({ status: 'published' })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href={`/${lang}`} className="hover:text-black">
          {isEnglish ? 'Home' : 'Ana Sayfa'}
        </Link>
        {' → '}
        <span className="text-black font-medium">
          {isEnglish ? 'Legal Updates' : 'Hukuki Güncellemeler'}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-black mb-4">
          {isEnglish ? 'Legal Updates' : 'Hukuki Güncellemeler'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {isEnglish
            ? 'Curated updates from official US government sources. Filter by jurisdiction, topic, or date range.'
            : 'Resmi ABD hükümeti kaynaklarından derlenmiş güncellemeler. Yetki alanı, konu veya tarih aralığına göre filtreleyin.'}
        </p>
      </div>

      {/* Source Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800">
              {isEnglish
                ? 'These updates are sourced from official government publications including the IRS, US Congress, and Federal Register. Always verify information in the primary source before relying on it.'
                : 'Bu güncellemeler IRS, ABD Kongresi ve Federal Register dahil resmi hükümet yayınlarından alınmaktadır. Bilgilere güvenmeden önce her zaman birincil kaynaktan doğrulayın.'}
            </p>
          </div>
        </div>
      </div>

      {/* Feed */}
      <LegalUpdatesFeed updates={updates} lang={lang} />

      {/* Disclaimer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          {isEnglish
            ? 'This information is provided for educational purposes only and does not constitute legal advice. EchoLegal aggregates information from official sources but does not guarantee accuracy or completeness. Consult a licensed attorney for advice specific to your situation.'
            : 'Bu bilgiler yalnızca eğitim amaçlı sağlanmaktadır ve hukuki tavsiye teşkil etmez. EchoLegal resmi kaynaklardan bilgi derlemektedir ancak doğruluk veya eksiksizlik garantisi vermemektedir. Durumunuza özel tavsiye için lisanslı bir avukata danışın.'}
        </p>
      </div>
    </div>
  )
}
