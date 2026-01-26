// components/ContractDiscovery.tsx
// Legal database-style document discovery interface
// Reads exclusively from templates-registry - no hardcoded filter values

'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Template,
  TemplateCategory,
  DocType,
  Jurisdiction,
  UseCase,
  getPublishedTemplates,
  searchTemplates,
  categoryLabels,
  docTypeLabels,
  jurisdictionLabels,
  useCaseLabels,
  getAvailableCategories,
  getAvailableDocTypes,
  getAvailableJurisdictions,
  getAvailableUseCases,
} from '@/lib/templates-registry'
import { LanguageCode } from '@/lib/jurisdictions'

// ============================================
// TYPES
// ============================================

type FilterState = {
  query: string
  category: TemplateCategory | ''
  docType: DocType | ''
  jurisdiction: Jurisdiction | ''
  useCase: UseCase | ''
}

type ContractDiscoveryProps = {
  lang: LanguageCode
  initialFilters?: Partial<FilterState>
  showUrlSync?: boolean
  className?: string
}

// ============================================
// COMPONENT
// ============================================

export default function ContractDiscovery({
  lang,
  initialFilters = {},
  showUrlSync = true,
  className = '',
}: ContractDiscoveryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEnglish = lang === 'en'

  // Initialize filters from URL params or props
  const getInitialFilters = useCallback((): FilterState => {
    if (showUrlSync && searchParams) {
      return {
        query: searchParams.get('q') || initialFilters.query || '',
        category: (searchParams.get('category') as TemplateCategory) || initialFilters.category || '',
        docType: (searchParams.get('type') as DocType) || initialFilters.docType || '',
        jurisdiction: (searchParams.get('jurisdiction') as Jurisdiction) || initialFilters.jurisdiction || '',
        useCase: (searchParams.get('useCase') as UseCase) || initialFilters.useCase || '',
      }
    }
    return {
      query: initialFilters.query || '',
      category: initialFilters.category || '',
      docType: initialFilters.docType || '',
      jurisdiction: initialFilters.jurisdiction || '',
      useCase: initialFilters.useCase || '',
    }
  }, [searchParams, showUrlSync, initialFilters])

  const [filters, setFilters] = useState<FilterState>(getInitialFilters)

  // Sync filters with URL
  useEffect(() => {
    if (!showUrlSync) return

    const params = new URLSearchParams()
    if (filters.query) params.set('q', filters.query)
    if (filters.category) params.set('category', filters.category)
    if (filters.docType) params.set('type', filters.docType)
    if (filters.jurisdiction) params.set('jurisdiction', filters.jurisdiction)
    if (filters.useCase) params.set('useCase', filters.useCase)

    const queryString = params.toString()
    const newPath = queryString ? `?${queryString}` : ''

    // Only update if different from current URL
    const currentSearch = window.location.search
    if (currentSearch !== (queryString ? `?${queryString}` : '')) {
      router.replace(`${window.location.pathname}${newPath}`, { scroll: false })
    }
  }, [filters, showUrlSync, router])

  // Get available filter options from registry (derived from actual data)
  const availableCategories = useMemo(() => getAvailableCategories(lang), [lang])
  const availableDocTypes = useMemo(() => getAvailableDocTypes(lang), [lang])
  const availableJurisdictions = useMemo(() => getAvailableJurisdictions(lang), [lang])
  const availableUseCases = useMemo(() => getAvailableUseCases(lang), [lang])

  // Filter results from registry
  const results = useMemo(() => {
    const hasFilters = filters.query || filters.category || filters.docType || filters.jurisdiction || filters.useCase

    if (!hasFilters) {
      return getPublishedTemplates(lang)
    }

    return searchTemplates(filters.query, lang, {
      category: filters.category || undefined,
      docType: filters.docType || undefined,
      jurisdiction: filters.jurisdiction || undefined,
      useCase: filters.useCase || undefined,
    })
  }, [filters, lang])

  // Update individual filter
  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      docType: '',
      jurisdiction: '',
      useCase: '',
    })
  }

  // Check if any filters are active
  const hasActiveFilters = filters.query || filters.category || filters.docType || filters.jurisdiction || filters.useCase

  // Count active filters
  const activeFilterCount = [
    filters.category,
    filters.docType,
    filters.jurisdiction,
    filters.useCase,
  ].filter(Boolean).length

  const templatesPath = `/${lang}/templates`

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Header - Legal Database Style */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isEnglish ? 'Document Search' : 'Belge Arama'}
        </h2>

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            placeholder={isEnglish ? 'Search by title, description, or keywords...' : 'Başlık, açıklama veya anahtar kelimeye göre ara...'}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
            aria-label={isEnglish ? 'Search documents' : 'Belge ara'}
          />
          <svg
            className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {filters.query && (
            <button
              onClick={() => updateFilter('query', '')}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              aria-label={isEnglish ? 'Clear search' : 'Aramayı temizle'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {isEnglish ? 'Category' : 'Kategori'}
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
              aria-label={isEnglish ? 'Filter by category' : 'Kategoriye göre filtrele'}
            >
              <option value="">{isEnglish ? 'All Categories' : 'Tüm Kategoriler'}</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Document Type Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {isEnglish ? 'Document Type' : 'Belge Türü'}
            </label>
            <select
              value={filters.docType}
              onChange={(e) => updateFilter('docType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
              aria-label={isEnglish ? 'Filter by document type' : 'Belge türüne göre filtrele'}
            >
              <option value="">{isEnglish ? 'All Types' : 'Tüm Türler'}</option>
              {availableDocTypes.map(type => (
                <option key={type} value={type}>
                  {docTypeLabels[type][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Jurisdiction Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {isEnglish ? 'Jurisdiction' : 'Yetki Alanı'}
            </label>
            <select
              value={filters.jurisdiction}
              onChange={(e) => updateFilter('jurisdiction', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
              aria-label={isEnglish ? 'Filter by jurisdiction' : 'Yetki alanına göre filtrele'}
            >
              <option value="">{isEnglish ? 'All Jurisdictions' : 'Tüm Yetki Alanları'}</option>
              {availableJurisdictions.map(jur => (
                <option key={jur} value={jur}>
                  {jurisdictionLabels[jur][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Use Case Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {isEnglish ? 'Use Case' : 'Kullanım Amacı'}
            </label>
            <select
              value={filters.useCase}
              onChange={(e) => updateFilter('useCase', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
              aria-label={isEnglish ? 'Filter by use case' : 'Kullanım amacına göre filtrele'}
            >
              <option value="">{isEnglish ? 'All Use Cases' : 'Tüm Kullanım Amaçları'}</option>
              {availableUseCases.map(uc => (
                <option key={uc} value={uc}>
                  {useCaseLabels[uc][lang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters & Clear */}
        {activeFilterCount > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1">
                  {categoryLabels[filters.category][lang]}
                  <button onClick={() => updateFilter('category', '')} className="hover:text-blue-900">×</button>
                </span>
              )}
              {filters.docType && (
                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full flex items-center gap-1">
                  {docTypeLabels[filters.docType][lang]}
                  <button onClick={() => updateFilter('docType', '')} className="hover:text-green-900">×</button>
                </span>
              )}
              {filters.jurisdiction && (
                <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full flex items-center gap-1">
                  {jurisdictionLabels[filters.jurisdiction][lang]}
                  <button onClick={() => updateFilter('jurisdiction', '')} className="hover:text-purple-900">×</button>
                </span>
              )}
              {filters.useCase && (
                <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full flex items-center gap-1">
                  {useCaseLabels[filters.useCase][lang]}
                  <button onClick={() => updateFilter('useCase', '')} className="hover:text-amber-900">×</button>
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              {isEnglish ? 'Clear all' : 'Temizle'}
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {results.length} {isEnglish ? 'documents found' : 'belge bulundu'}
        </span>
        {filters.query && (
          <span className="text-gray-500">
            {isEnglish ? 'for' : 'için'} &quot;{filters.query}&quot;
          </span>
        )}
      </div>

      {/* Results Grid - Legal Database Style */}
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
        {results.length === 0 ? (
          <EmptyState lang={lang} hasFilters={!!hasActiveFilters} onClear={clearFilters} />
        ) : (
          results.map((template) => (
            <DocumentRow
              key={template.id}
              template={template}
              lang={lang}
              templatesPath={templatesPath}
            />
          ))
        )}
      </div>

      {/* Footer Note - Encyclopedic tone */}
      <div className="text-xs text-gray-500 text-center">
        {isEnglish
          ? 'All documents are reference templates for educational purposes. Review with a licensed attorney before use.'
          : 'Tüm belgeler eğitim amaçlı referans şablonlarıdır. Kullanmadan önce lisanslı bir avukata danışın.'}
      </div>
    </div>
  )
}

// ============================================
// DOCUMENT ROW
// ============================================

function DocumentRow({
  template,
  lang,
  templatesPath,
}: {
  template: Template
  lang: LanguageCode
  templatesPath: string
}) {
  return (
    <Link
      href={`${templatesPath}/${template.slug}`}
      className="block p-4 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
      aria-label={`${lang === 'en' ? 'View' : 'Görüntüle'}: ${template.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Metadata badges */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
              {docTypeLabels[template.docType][lang]}
            </span>
            {template.jurisdiction !== 'General' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                {jurisdictionLabels[template.jurisdiction][lang]}
              </span>
            )}
            {template.isSample && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700">
                {lang === 'en' ? 'Sample' : 'Örnek'}
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
              {categoryLabels[template.category][lang]}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900">
            {template.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
            {template.shortDescription}
          </p>

          {/* Use cases */}
          {template.useCases && template.useCases.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {template.useCases.slice(0, 3).map((uc) => (
                <span key={uc} className="text-xs text-gray-400">
                  {useCaseLabels[uc][lang]}
                  {template.useCases!.indexOf(uc) < Math.min(template.useCases!.length - 1, 2) ? ' · ' : ''}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Arrow indicator */}
        <svg
          className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  )
}

// ============================================
// EMPTY STATE
// ============================================

function EmptyState({
  lang,
  hasFilters,
  onClear,
}: {
  lang: LanguageCode
  hasFilters: boolean
  onClear: () => void
}) {
  const isEnglish = lang === 'en'

  return (
    <div className="p-8 text-center">
      <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">
        {isEnglish ? 'No documents found' : 'Belge bulunamadı'}
      </h3>

      <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
        {hasFilters
          ? isEnglish
            ? 'No documents match your current filters. Try adjusting your search criteria.'
            : 'Mevcut filtrelerinize uyan belge yok. Arama kriterlerinizi değiştirmeyi deneyin.'
          : isEnglish
            ? 'No documents are currently available.'
            : 'Şu anda mevcut belge yok.'}
      </p>

      {hasFilters && (
        <button
          onClick={onClear}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {isEnglish ? 'Clear all filters' : 'Tüm filtreleri temizle'}
        </button>
      )}
    </div>
  )
}
