import {
  ENCYCLOPEDIA_SCOPE_REGISTRY,
  isCrossJurisdictionLink,
} from '@/lib/cross-jurisdiction'

/**
 * Inline badge that renders "Cross-jurisdiction" / "Farklı yargı alanı"
 * when the source and target encyclopedia entries have no jurisdictional
 * overlap.
 *
 * Renders nothing (returns null) when:
 *   - Either slug is missing from the scope registry (fail silent).
 *   - The scopes overlap (not a cross-jurisdiction link).
 *
 * Usage:
 *   <Link href={...}>Article Title →</Link>
 *   <CrossJurisdictionBadge lang={lang} sourceSlug={PAGE_META.slug} targetSlug="other-article" />
 */
export default function CrossJurisdictionBadge({
  lang,
  sourceSlug,
  targetSlug,
}: {
  lang: 'en' | 'tr'
  sourceSlug: string
  targetSlug: string
}) {
  const sourceScope = ENCYCLOPEDIA_SCOPE_REGISTRY[sourceSlug]
  const targetScope = ENCYCLOPEDIA_SCOPE_REGISTRY[targetSlug]

  if (!sourceScope || !targetScope) return null
  if (!isCrossJurisdictionLink(sourceScope, targetScope)) return null

  return (
    <span className="inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-medium rounded bg-amber-100 text-amber-700 align-middle whitespace-nowrap">
      {lang === 'en' ? 'Cross-jurisdiction' : 'Farklı yargı alanı'}
    </span>
  )
}
