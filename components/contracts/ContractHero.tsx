import Link from 'next/link'

type ContractHeroProps = {
  lang: string
  title: string
  subtitle: string
  jurisdiction: string
  lastUpdated: string
  breadcrumbs: { label: string; href?: string }[]
}

export default function ContractHero({
  lang,
  title,
  subtitle,
  jurisdiction,
  lastUpdated,
  breadcrumbs,
}: ContractHeroProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-gray-600 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-600 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8 max-w-2xl">
          {subtitle}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-gray-400">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            {jurisdiction}
          </span>
          <span className="inline-flex items-center gap-1.5 text-gray-400">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  )
}
