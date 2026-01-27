'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { LegalUpdate, Jurisdiction, jurisdictionLabels, commonTags } from '@/lib/legal-updates'

interface LegalUpdatesFeedProps {
  updates: LegalUpdate[]
  lang: 'en' | 'tr'
}

export function LegalUpdatesFeed({ updates, lang }: LegalUpdatesFeedProps) {
  const isEnglish = lang === 'en'

  const [search, setSearch] = useState('')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | ''>('')
  const [selectedTag, setSelectedTag] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // Get unique tags from updates
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    updates.forEach(u => u.tags.forEach(t => tags.add(t)))
    return Array.from(tags).sort()
  }, [updates])

  // Filter updates
  const filteredUpdates = useMemo(() => {
    return updates.filter(update => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        if (
          !update.title.toLowerCase().includes(searchLower) &&
          !update.summary.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      // Jurisdiction filter
      if (selectedJurisdiction && update.jurisdiction !== selectedJurisdiction) {
        return false
      }

      // Tag filter
      if (selectedTag && !update.tags.includes(selectedTag)) {
        return false
      }

      // Date range filters
      if (dateFrom && update.publishedAt < dateFrom) {
        return false
      }
      if (dateTo && update.publishedAt > dateTo) {
        return false
      }

      return true
    })
  }, [updates, search, selectedJurisdiction, selectedTag, dateFrom, dateTo])

  const clearFilters = () => {
    setSearch('')
    setSelectedJurisdiction('')
    setSelectedTag('')
    setDateFrom('')
    setDateTo('')
  }

  const hasFilters = search || selectedJurisdiction || selectedTag || dateFrom || dateTo

  return (
    <div>
      {/* Search and Filters */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        {/* Search */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            {isEnglish ? 'Search' : 'Ara'}
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isEnglish ? 'Search by title or summary...' : 'Başlık veya özete göre ara...'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Jurisdiction */}
          <div>
            <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Jurisdiction' : 'Yetki Alanı'}
            </label>
            <select
              id="jurisdiction"
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value as Jurisdiction | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="">{isEnglish ? 'All' : 'Tümü'}</option>
              {Object.entries(jurisdictionLabels).map(([key, labels]) => (
                <option key={key} value={key}>
                  {labels[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Tag */}
          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'Topic' : 'Konu'}
            </label>
            <select
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="">{isEnglish ? 'All Topics' : 'Tüm Konular'}</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'From Date' : 'Başlangıç'}
            </label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Date To */}
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
              {isEnglish ? 'To Date' : 'Bitiş'}
            </label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {filteredUpdates.length} {isEnglish ? 'results' : 'sonuç'}
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              {isEnglish ? 'Clear filters' : 'Filtreleri temizle'}
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredUpdates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {isEnglish
            ? 'No legal updates found matching your criteria.'
            : 'Kriterlerinize uygun hukuki güncelleme bulunamadı.'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUpdates.map((update) => (
            <LegalUpdateCard key={update.id} update={update} lang={lang} />
          ))}
        </div>
      )}
    </div>
  )
}

// Individual update card
function LegalUpdateCard({ update, lang }: { update: LegalUpdate; lang: 'en' | 'tr' }) {
  const isEnglish = lang === 'en'
  const jurisdictionInfo = jurisdictionLabels[update.jurisdiction]

  const formattedDate = new Date(update.publishedAt).toLocaleDateString(
    isEnglish ? 'en-US' : 'tr-TR',
    { year: 'numeric', month: 'short', day: 'numeric' }
  )

  // Color classes for jurisdiction badges
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  }

  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        {/* Date and Jurisdiction */}
        <div className="flex items-center gap-3 flex-wrap">
          <time className="text-sm text-gray-500" dateTime={update.publishedAt}>
            {formattedDate}
          </time>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${colorClasses[jurisdictionInfo.color]}`}>
            {jurisdictionInfo[lang]}
          </span>
          <span className="text-xs text-gray-400">
            {update.sourceName}
          </span>
        </div>
      </div>

      {/* Title */}
      <Link href={`/${lang}/updates/${update.slug}`}>
        <h2 className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors mb-2">
          {update.title}
        </h2>
      </Link>

      {/* Summary */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {isEnglish ? update.summary : (update.summaryTr || update.summary)}
      </p>

      {/* Tags */}
      {update.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {update.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
          {update.tags.length > 4 && (
            <span className="text-xs text-gray-400">
              +{update.tags.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Primary Source Link */}
      <div className="flex items-center gap-4">
        <a
          href={update.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-900 inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {isEnglish ? 'Primary Source' : 'Birincil Kaynak'}
        </a>
        <Link
          href={`/${lang}/updates/${update.slug}`}
          className="text-sm font-medium text-gray-900 hover:text-gray-600"
        >
          {isEnglish ? 'Read more →' : 'Devamını oku →'}
        </Link>
      </div>
    </article>
  )
}
