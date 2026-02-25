import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

const LOCALE_COOKIE = 'ECHOLEGAL_LOCALE'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

export function middleware(request: NextRequest) {
  // Enforce apex domain: redirect www → echo-legal.com (permanent 301)
  const host = request.headers.get('host') ?? ''
  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.host = host.replace(/^www\./, '')
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  const pathname = request.nextUrl.pathname

  // Skip static files, API routes, and non-i18n app areas
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/control-panel') ||
    pathname.startsWith('/filingcontrol') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    // Extract locale from pathname and set cookie for future visits
    const currentLocale = pathname.split('/')[1]
    const response = NextResponse.next()

    // Set x-pathname header for dynamic hreflang generation in layout
    response.headers.set('x-pathname', pathname)

    // Only set cookie if it doesn't match current locale
    const existingCookie = request.cookies.get(LOCALE_COOKIE)?.value
    if (existingCookie !== currentLocale) {
      response.cookies.set(LOCALE_COOKIE, currentLocale, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      })
    }

    return response
  }

  // No locale in path - determine where to redirect
  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  // Check if this is a first-time visitor (no cookie)
  const hasVisitedBefore = request.cookies.has(LOCALE_COOKIE)

  // Use 302 (temporary) for first visit, allowing search engines to index both versions
  const response = NextResponse.redirect(url, hasVisitedBefore ? 307 : 302)

  // Set cookie for future visits
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  })

  return response
}

function getLocale(request: NextRequest): string {
  // Priority 1: Check saved preference in cookies
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && i18n.locales.includes(cookieLocale as typeof i18n.locales[number])) {
    return cookieLocale
  }

  // Priority 2: Check Accept-Language header with quality values
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, q = 'q=1'] = lang.trim().split(';')
        return {
          code: code.trim(),
          quality: parseFloat(q.replace('q=', '')) || 1,
        }
      })
      .sort((a, b) => b.quality - a.quality)

    for (const { code } of languages) {
      // Check for exact match (e.g., 'tr')
      if (i18n.locales.includes(code as typeof i18n.locales[number])) {
        return code
      }

      // Check for language prefix (e.g., 'tr-TR' -> 'tr')
      const langPrefix = code.split('-')[0].toLowerCase()
      if (i18n.locales.includes(langPrefix as typeof i18n.locales[number])) {
        return langPrefix
      }
    }
  }

  // Priority 3: Default locale
  return i18n.defaultLocale
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
