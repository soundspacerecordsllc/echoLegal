import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  return NextResponse.redirect(request.nextUrl)
}

function getLocale(request: NextRequest): string {
  // Check if user has a saved preference in cookies
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim())
    
    for (const lang of languages) {
      // Check for exact match
      if (i18n.locales.includes(lang as any)) {
        return lang
      }
      
      // Check for language prefix (e.g., 'tr-TR' -> 'tr')
      const langPrefix = lang.split('-')[0]
      if (i18n.locales.includes(langPrefix as any)) {
        return langPrefix
      }
    }
  }

  return i18n.defaultLocale
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
