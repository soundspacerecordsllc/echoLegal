// app/[lang]/updates/[slug]/page.tsx
// Legal Update detail page

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Locale } from '@/i18n-config'
import { getLegalUpdateBySlug, getLegalUpdates } from '@/lib/db/legal-updates-db'
import { jurisdictionLabels } from '@/lib/legal-updates'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const update = await getLegalUpdateBySlug(slug)

  if (!update) {
    return { title: 'Not Found' }
  }

  return {
    title: `${update.title} | Legal Updates | EchoLegal`,
    description: update.summary.substring(0, 160),
  }
}

export default async function LegalUpdateDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const isEnglish = lang === 'en'

  const update = await getLegalUpdateBySlug(slug)

  if (!update || update.status !== 'published') {
    notFound()
  }

  const jurisdictionInfo = jurisdictionLabels[update.jurisdiction]

  const formattedDate = new Date(update.publishedAt).toLocaleDateString(
    isEnglish ? 'en-US' : 'tr-TR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  // Color classes for jurisdiction badges
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  }

  // Get related updates (same jurisdiction or tags)
  const allUpdates = await getLegalUpdates({ status: 'published' })
  const relatedUpdates = allUpdates
    .filter(u =>
      u.id !== update.id &&
      (u.jurisdiction === update.jurisdiction || u.tags.some(t => update.tags.includes(t)))
    )
    .slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href={`/${lang}`} className="hover:text-black">
          {isEnglish ? 'Home' : 'Ana Sayfa'}
        </Link>
        {' → '}
        <Link href={`/${lang}/updates`} className="hover:text-black">
          {isEnglish ? 'Legal Updates' : 'Hukuki Güncellemeler'}
        </Link>
        {' → '}
        <span className="text-black font-medium">
          {update.title.substring(0, 40)}...
        </span>
      </nav>

      {/* Meta Info */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <time className="text-sm text-gray-500" dateTime={update.publishedAt}>
          {formattedDate}
        </time>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${colorClasses[jurisdictionInfo.color]}`}>
          {jurisdictionInfo[lang]}
        </span>
        <span className="text-sm text-gray-400">
          {isEnglish ? 'Source:' : 'Kaynak:'} {update.sourceName}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
        {update.title}
      </h1>

      {/* Tags */}
      {update.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {update.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          ))}
        </div>
      )}

      {/* Primary Source Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">
              {isEnglish ? 'Verify in Primary Source' : 'Birincil Kaynaktan Doğrulayın'}
            </p>
            <p className="text-sm text-amber-700">
              {isEnglish
                ? 'This is a summary for informational purposes. Always refer to the official source for complete and accurate information.'
                : 'Bu bilgilendirme amaçlı bir özettir. Eksiksiz ve doğru bilgi için her zaman resmi kaynağa başvurun.'}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Content */}
      <div className="prose prose-gray max-w-none mb-8">
        <h2 className="text-xl font-semibold text-black mb-4">
          {isEnglish ? 'Summary' : 'Özet'}
        </h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {isEnglish ? update.summary : (update.summaryTr || update.summary)}
        </p>
      </div>

      {/* Source Links */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">
          {isEnglish ? 'Official Sources' : 'Resmi Kaynaklar'}
        </h3>
        <div className="space-y-3">
          <a
            href={update.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="font-medium">{isEnglish ? 'Primary Source' : 'Birincil Kaynak'}</span>
            <span className="text-sm text-gray-500 truncate max-w-xs">
              ({new URL(update.sourceUrl).hostname})
            </span>
          </a>
          {update.sourceUrls.length > 1 && update.sourceUrls.slice(1).map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>{isEnglish ? 'Additional Source' : 'Ek Kaynak'}</span>
              <span className="text-sm text-gray-500 truncate max-w-xs">
                ({new URL(url).hostname})
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Related Updates */}
      {relatedUpdates.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-black mb-6">
            {isEnglish ? 'Related Updates' : 'İlgili Güncellemeler'}
          </h2>
          <div className="space-y-4">
            {relatedUpdates.map((related) => (
              <Link
                key={related.id}
                href={`/${lang}/updates/${related.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">
                    {new Date(related.publishedAt).toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${colorClasses[jurisdictionLabels[related.jurisdiction].color]}`}>
                    {jurisdictionLabels[related.jurisdiction][lang]}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="mt-8">
        <Link
          href={`/${lang}/updates`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isEnglish ? 'Back to Legal Updates' : 'Hukuki Güncellemelere Dön'}
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          {isEnglish
            ? 'This information is provided for educational purposes only and does not constitute legal advice. Always verify information in the primary source before relying on it. Consult a licensed attorney for advice specific to your situation.'
            : 'Bu bilgiler yalnızca eğitim amaçlı sağlanmaktadır ve hukuki tavsiye teşkil etmez. Bilgilere güvenmeden önce her zaman birincil kaynaktan doğrulayın. Durumunuza özel tavsiye için lisanslı bir avukata danışın.'}
        </p>
      </div>
    </div>
  )
}
