// components/ContributorAttribution.tsx
// Authority/credentials are intentionally hidden (service-first). Do not render in UI.
// This component is retained for type compatibility but renders nothing.
// Authority signals exist only in hidden metadata (JSON-LD, Next.js metadata).

import { Contributor, getContributor, ZEYNEP_MOORE, EDITORIAL_TEAM } from '@/lib/contributors'
import { LanguageCode } from '@/lib/jurisdictions'

type SupportedLang = 'en' | 'tr'

type ContributorAttributionProps = {
  contributorId?: string
  contributor?: Contributor
  lang: LanguageCode | SupportedLang
  variant?: 'full' | 'compact' | 'inline'
  showJurisdiction?: boolean
  showCredentials?: boolean
  className?: string
}

// Service-first: no visible personal credit rendered
export default function ContributorAttribution(_props: ContributorAttributionProps) {
  return null
}

// Service-first: returns null. Authority signals in metadata only.
export function PrimaryAuthorAttribution(_props: {
  lang: 'en' | 'tr'
  variant?: 'full' | 'compact' | 'inline'
  className?: string
}) {
  return null
}

// Service-first: returns null. Authority signals in metadata only.
export function EditorialTeamAttribution(_props: {
  lang: 'en' | 'tr'
  variant?: 'full' | 'compact' | 'inline'
  className?: string
}) {
  return null
}

// Service-first: returns null. Authority signals in metadata only.
export function ArticleReviewerSection(_props: {
  lang: 'en' | 'tr'
  reviewerId?: string
  lastReviewedAt?: string
  className?: string
}) {
  return null
}
