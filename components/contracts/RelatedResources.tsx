import Link from 'next/link'

type RelatedResource = {
  slug: string
  title: string
  description?: string
}

type RelatedResourcesProps = {
  lang: string
  title: string
  subtitle?: string
  resources: RelatedResource[]
}

export default function RelatedResources({ lang, title, subtitle, resources }: RelatedResourcesProps) {
  return (
    <section className="my-12 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Link
            key={resource.slug}
            href={`/${lang}/contracts/${resource.slug}`}
            className="group block p-5 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors block truncate">
                  {resource.title}
                </span>
                {resource.description && (
                  <p className="text-sm text-gray-400 mt-1 truncate">
                    {resource.description}
                  </p>
                )}
              </div>
              <span className="flex-shrink-0 ml-4 text-gray-300 group-hover:text-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
