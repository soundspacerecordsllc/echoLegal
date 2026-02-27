// app/[lang]/encyclopedia/[slug]/history/page.tsx
// Revision history page for encyclopedia entries.
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 4.3.2:
// "Accessible via URL: /{lang}/encyclopedia/{slug}/history"

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Locale } from '@/i18n-config'
import Breadcrumb from '@/components/Breadcrumb'
import { RevisionHistoryPage } from '@/components/RevisionHistory'
import { getContentRevisions, getSectionSlugs } from '@/lib/content-revisions'

type PageParams = {
  lang: Locale
  slug: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const record = getContentRevisions('encyclopedia', slug)
  if (!record) return {}

  const isEnglish = lang === 'en'
  const entryTitle = record.title[lang] || record.title.en

  const title = isEnglish
    ? `Revision History: ${entryTitle} | EchoLegal`
    : `Revizyon Geçmişi: ${entryTitle} | EchoLegal`

  const description = isEnglish
    ? `Complete revision history for "${entryTitle}". Track all substantive, editorial, and correction changes.`
    : `"${entryTitle}" için tam revizyon geçmişi. Tüm esaslı, editöryal ve düzeltme değişikliklerini takip edin.`

  return {
    title,
    description,
    robots: { index: false },
  }
}

export async function generateStaticParams() {
  const slugs = getSectionSlugs('encyclopedia')
  const params: { lang: string; slug: string }[] = []

  for (const slug of slugs) {
    params.push({ lang: 'en', slug })
    params.push({ lang: 'tr', slug })
  }

  return params
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { lang, slug } = await params
  const record = getContentRevisions('encyclopedia', slug)

  if (!record) {
    notFound()
  }

  const isEnglish = lang === 'en'
  const entryTitle = record.title[lang] || record.title.en

  const breadcrumbItems = [
    { label: isEnglish ? 'Encyclopedia' : 'Ansiklopedi', href: `/${lang}/encyclopedia` },
    { label: entryTitle, href: `/${lang}/encyclopedia/${slug}` },
    { label: isEnglish ? 'Revision History' : 'Revizyon Geçmişi' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      {/* Back link */}
      <div className="mb-8">
        <Link
          href={`/${lang}/encyclopedia/${slug}`}
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          &larr; {isEnglish ? 'Back to entry' : 'Maddeye dön'}
        </Link>
      </div>

      {/* Revision history page component */}
      <RevisionHistoryPage
        lang={lang}
        title={entryTitle}
        revisionHistory={record.revisionHistory}
        currentVersion={record.currentVersion}
      />

      {/* Citation key */}
      {record.citationKey && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {isEnglish ? 'Citation ID:' : 'Kaynak No:'}
            </span>
            <code className="text-xs font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
              {record.citationKey}
            </code>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-400 leading-relaxed">
          {isEnglish
            ? 'Revision history reflects editorial and substantive changes tracked by the EchoLegal editorial system. Minor typographical corrections may not be individually recorded.'
            : 'Revizyon geçmişi, EchoLegal editöryal sistemi tarafından takip edilen editöryal ve esaslı değişiklikleri yansıtır. Küçük yazım düzeltmeleri ayrı ayrı kaydedilmeyebilir.'}
        </p>
      </div>
    </main>
  )
}
