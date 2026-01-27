// components/TemplatesGrid.tsx
// Grid display component for templates

'use client'

import Link from 'next/link'
import {
  Template,
  docTypeLabels,
  jurisdictionLabels,
} from '@/lib/templates-registry'

type Props = {
  templates: Template[]
  lang: 'en' | 'tr'
  showCategory?: boolean
}

export function TemplatesGrid({ templates, lang, showCategory = false }: Props) {
  const isEnglish = lang === 'en'

  if (templates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {isEnglish ? 'No templates found.' : 'Şablon bulunamadı.'}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Link
          key={template.id}
          href={`/${lang}/templates/${template.slug}`}
          className="group block p-5 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all"
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              {docTypeLabels[template.docType][lang]}
            </span>
            {template.jurisdiction !== 'General' && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                {jurisdictionLabels[template.jurisdiction][lang]}
              </span>
            )}
            {template.isSample && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded">
                {isEnglish ? 'Sample' : 'Örnek'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black mb-2">
            {template.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {template.shortDescription}
          </p>

          {/* View link */}
          <span className="mt-4 inline-flex items-center text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
            {isEnglish ? 'View Template' : 'Şablonu Görüntüle'}
            <svg
              className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </span>
        </Link>
      ))}
    </div>
  )
}

// Compact list view for related templates
export function TemplatesList({ templates, lang }: Omit<Props, 'showCategory'>) {
  const isEnglish = lang === 'en'

  if (templates.length === 0) return null

  return (
    <div className="space-y-2">
      {templates.map((template) => (
        <Link
          key={template.id}
          href={`/${lang}/templates/${template.slug}`}
          className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div>
            <span className="text-sm font-medium text-gray-900 group-hover:text-black">
              {template.title}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              {docTypeLabels[template.docType][lang]}
            </span>
          </div>
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all"
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
        </Link>
      ))}
    </div>
  )
}
