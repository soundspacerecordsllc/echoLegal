// lib/site.ts
// Single source of truth for the site origin / base URL.
//
// Every module that needs an absolute URL must import from here.
// The literal default 'https://echo-legal.com' appears ONLY in this file.

export const SITE_ORIGIN: string =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://echo-legal.com'

/**
 * Build an absolute URL from a path.
 * If `pathOrUrl` is already absolute (starts with "http"), returns it as-is.
 * Otherwise joins SITE_ORIGIN + path, ensuring exactly one slash at the seam.
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  const base = SITE_ORIGIN.replace(/\/+$/, '')
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${base}${path}`
}

/**
 * Build a JSON-LD @id fragment URL.
 * Returns `${SITE_ORIGIN}/#${fragment}` (no double slashes).
 */
export function siteId(fragment: string): string {
  const base = SITE_ORIGIN.replace(/\/+$/, '')
  const frag = fragment.replace(/^#/, '')
  return `${base}/#${frag}`
}
