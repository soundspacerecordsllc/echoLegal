import Link from 'next/link'

const SITE_URL = 'https://echo-legal.com'

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

  // Generate JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${SITE_URL}/${lang}`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: `${SITE_URL}${item.href}` }),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            className="hover:text-black underline underline-offset-2 decoration-gray-300 hover:decoration-gray-700 transition-colors"
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
                className="hover:text-black underline underline-offset-2 decoration-gray-300 hover:decoration-gray-700 transition-colors"
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
    </>
  )
}
