'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  templatesRegistry,
  Template,
  TemplateCategory,
  DocType,
  Jurisdiction,
  categoryLabels,
  docTypeLabels,
  jurisdictionLabels,
  getAllCategories,
  getAllDocTypes,
  getAllJurisdictions,
} from '@/lib/templates-registry'

type ContractDiscoveryProps = {
  lang: 'en' | 'tr'
}

// Use case definitions for legal database filtering
const useCases = {
  freelancer: {
    en: 'Freelancer / Consultant',
    tr: 'Serbest Çalışan / Danışman',
    tags: ['freelance', 'contractor', 'client', 'service', 'independent', 'serbest'],
  },
  startup: {
    en: 'Startup Founder',
    tr: 'Startup Kurucusu',
    tags: ['startup', 'founder', 'llc', 'formation', 'business', 'nda'],
  },
  ecommerce: {
    en: 'E-Commerce Seller',
    tr: 'E-Ticaret Satıcısı',
    tags: ['ecommerce', 'privacy', 'terms', 'website', 'saas', 'app'],
  },
  employer: {
    en: 'Employer / Hiring',
    tr: 'İşveren / İşe Alım',
    tags: ['contractor', 'hiring', 'employee', 'hr', 'policy'],
  },
  tax: {
    en: 'Tax Compliance',
    tr: 'Vergi Uyumu',
    tags: ['tax', 'irs', 'w8', 'w9', '1099', 'ein', 'itin'],
  },
  immigration: {
    en: 'Immigration / Visa',
    tr: 'Göçmenlik / Vize',
    tags: ['visa', 'immigration', 'sponsor', 'consulate', 'travel'],
  },
} as const

type UseCaseKey = keyof typeof useCases

export default function ContractDiscovery({ lang }: ContractDiscoveryProps) {
  const isEnglish = lang === 'en'

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')
  const [selectedDocType, setSelectedDocType] = useState<DocType | 'all'>('all')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | 'all'>('all')
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseKey | 'all'>('all')

  // Get templates for current language
  const templates = useMemo(() => {
    return templatesRegistry.filter(t => t.lang === lang)
  }, [lang])

  // Filtered results
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const searchText = [
          template.title,
          template.shortDescription,
          ...template.tags,
        ].join(' ').toLowerCase()
        if (!searchText.includes(query)) return false
      }

      // Category filter
      if (selectedCategory !== 'all' && template.category !== selectedCategory) {
        return false
      }

      // Doc type filter
      if (selectedDocType !== 'all' && template.docType !== selectedDocType) {
        return false
      }

      // Jurisdiction filter
      if (selectedJurisdiction !== 'all' && template.jurisdiction !== selectedJurisdiction) {
        return false
      }

      // Use case filter (tag-based)
      if (selectedUseCase !== 'all') {
        const useCaseTags = useCases[selectedUseCase].tags
        const hasMatchingTag = template.tags.some(tag =>
          useCaseTags.some(ucTag => tag.toLowerCase().includes(ucTag.toLowerCase()))
        )
        if (!hasMatchingTag) return false
      }

      return true
    })
  }, [templates, searchQuery, selectedCategory, selectedDocType, selectedJurisdiction, selectedUseCase])

  // Count active filters
  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedDocType !== 'all',
    selectedJurisdiction !== 'all',
    selectedUseCase !== 'all',
  ].filter(Boolean).length

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedDocType('all')
    setSelectedJurisdiction('all')
    setSelectedUseCase('all')
  }

  const templatesPath = isEnglish ? '/en/templates' : '/tr/sablonlar'

  return (
    <div className="space-y-6">
      {/* Search Header - Legal Database Style */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {isEnglish ? 'Document Search' : 'Belge Arama'}
        </h2>

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEnglish ? 'Search by keyword...' : 'Anahtar kelimeyle ara...'}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
          />
          <svg
            className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {isEnglish ? 'Category' : 'Kategori'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as TemplateCategory | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
            >
              <option value="all">{isEnglish ? 'All Categories' : 'Tüm Kategoriler'}</option>
              {getAllCategories().map(cat => (
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
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value as DocType | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
            >
              <option value="all">{isEnglish ? 'All Types' : 'Tüm Türler'}</option>
              {getAllDocTypes().map(type => (
                <option key={type} value={type}>
                  {docTypeLabels[type][lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Jurisdiction Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {isEnglish ? 'Jurisdiction' : 'Yargı Alanı'}
            </label>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value as Jurisdiction | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
            >
              <option value="all">{isEnglish ? 'All Jurisdictions' : 'Tüm Yargı Alanları'}</option>
              {getAllJurisdictions().map(jur => (
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
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value as UseCaseKey | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
            >
              <option value="all">{isEnglish ? 'All Use Cases' : 'Tüm Kullanım Amaçları'}</option>
              {(Object.keys(useCases) as UseCaseKey[]).map(key => (
                <option key={key} value={key}>
                  {useCases[key][lang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters & Clear */}
        {activeFilterCount > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {activeFilterCount} {isEnglish ? 'filter(s) active' : 'filtre aktif'}
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              {isEnglish ? 'Clear all filters' : 'Tüm filtreleri temizle'}
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {filteredTemplates.length} {isEnglish ? 'documents found' : 'belge bulundu'}
        </span>
        {searchQuery && (
          <span className="text-gray-500">
            {isEnglish ? 'for' : 'için'} "{searchQuery}"
          </span>
        )}
      </div>

      {/* Results Grid - Legal Database Style */}
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
        {filteredTemplates.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="font-medium mb-1">
              {isEnglish ? 'No documents match your criteria' : 'Kriterlerinize uyan belge bulunamadı'}
            </p>
            <p className="text-sm">
              {isEnglish ? 'Try adjusting your filters or search term' : 'Filtrelerinizi veya arama teriminizi değiştirmeyi deneyin'}
            </p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <Link
              key={template.id}
              href={`${templatesPath}/${template.slug}`}
              className="block p-4 hover:bg-gray-50 transition-colors"
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
                      {categoryLabels[template.category][lang]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-black">
                    {template.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {template.shortDescription}
                  </p>
                </div>

                {/* Arrow indicator */}
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
