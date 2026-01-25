import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  lang: 'en' | 'tr'
}

export default function Breadcrumb({ items, lang }: BreadcrumbProps) {
  const homeLabel = lang === 'en' ? 'Home' : 'Ana Sayfa'

  return (
    <nav
      className="text-sm text-gray-500 mb-8"
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex flex-wrap items-center gap-1">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href={`/${lang}`}
            className="hover:text-black transition-colors"
            itemProp="item"
          >
            <span itemProp="name">{homeLabel}</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-1"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span className="text-gray-400 mx-1">→</span>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-black transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-black font-medium" itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}
