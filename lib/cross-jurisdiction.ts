// lib/cross-jurisdiction.ts
// Cross-jurisdiction link detection for encyclopedia entries.
//
// Used by CrossJurisdictionBadge to determine whether an internal link
// crosses jurisdiction boundaries. Hierarchical matching is consistent
// with the encyclopedia index filter: a top-level code like "US" covers
// "US" and all "US-*" sub-jurisdictions.

import type { JurisdictionCode } from './jurisdictions'

// ============================================
// SCOPE REGISTRY
// ============================================

/**
 * Canonical jurisdiction scope for each encyclopedia entry, keyed by slug.
 *
 * When a slug is absent from this registry, cross-jurisdiction detection
 * fails silent (no badge is shown). This is intentional: pages without
 * scope metadata should never produce a false-positive badge.
 */
export const ENCYCLOPEDIA_SCOPE_REGISTRY: Readonly<Record<string, JurisdictionCode[]>> = {
  'contractor-vs-employee': ['US'],
  'what-is-nda': ['US', 'US-NY'],
  'privacy-policy-guide': ['US', 'US-CA', 'EU', 'TR'],
  'freelancer-legal-guide': ['US'],
}

// ============================================
// HIERARCHICAL OVERLAP
// ============================================

/**
 * Check whether two jurisdiction codes overlap using hierarchical matching.
 *
 * Rules (consistent with the encyclopedia index filter):
 *   - A top-level code (no "-") like "US" matches "US" or any "US-*" code.
 *   - A sub-jurisdiction code (contains "-") like "US-NY" matches only exact.
 *   - Matching is symmetric: codesOverlap(a, b) === codesOverlap(b, a).
 */
function codesOverlap(a: string, b: string): boolean {
  if (a === b) return true
  // a is parent, b is child
  if (!a.includes('-') && b.startsWith(`${a}-`)) return true
  // b is parent, a is child
  if (!b.includes('-') && a.startsWith(`${b}-`)) return true
  return false
}

/**
 * Determine if two jurisdiction scopes have ANY hierarchical overlap.
 * Returns true when at least one (codeA, codeB) pair matches.
 */
export function jurisdictionScopesOverlap(
  scopeA: readonly JurisdictionCode[],
  scopeB: readonly JurisdictionCode[]
): boolean {
  return scopeA.some((a) => scopeB.some((b) => codesOverlap(a, b)))
}

/**
 * Determine if a link from source page to target page crosses jurisdictions.
 *
 * Returns `true` when the scopes have NO overlap — meaning the target
 * page covers a completely different jurisdiction than the source.
 *
 * Returns `false` (no badge) when either scope is empty or undefined,
 * following the fail-silent principle.
 */
export function isCrossJurisdictionLink(
  sourceScope: readonly JurisdictionCode[],
  targetScope: readonly JurisdictionCode[]
): boolean {
  if (sourceScope.length === 0 || targetScope.length === 0) return false
  return !jurisdictionScopesOverlap(sourceScope, targetScope)
}
