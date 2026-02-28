// components/CitationMetaTags.tsx
// Renders <meta> citation tags for Google Scholar and academic indexing.
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 4.2.1:
// Every published content page must include citation_* meta tags.
//
// Usage in page head or layout:
//   <CitationMetaTags
//     title="What Is a Non-Disclosure Agreement"
//     dateModified="2026-01-25"
//     lang="en"
//     url={absoluteUrl('/en/encyclopedia/what-is-nda')}
//   />

import { generateCitationMetaTags } from '@/lib/structured-data'

type CitationMetaTagsProps = {
  title: string
  datePublished?: string
  dateModified: string
  version?: string
  lang: string
  url: string
  citationKey?: string
}

export default function CitationMetaTags(props: CitationMetaTagsProps) {
  const tags = generateCitationMetaTags(props)

  return (
    <>
      {tags.map(tag => (
        <meta key={tag.name} name={tag.name} content={tag.content} />
      ))}
    </>
  )
}
