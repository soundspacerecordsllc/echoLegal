import '../globals.css'
import type { Metadata } from 'next'
import { i18n } from '@/i18n-config'
import { headers } from 'next/headers'
import { getGlobalSchemas, SITE_URL } from '@/lib/structured-data'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'EchoLegal | Free Legal Encyclopedia & Contract Templates',
  description: 'Bilingual legal encyclopedia providing professionally drafted contracts and legal guides in English and Turkish. I support EchoLegal – legal knowledge for everyone.',
  metadataBase: new URL('https://echo-legal.com'),
}

// Generate dynamic hreflang links based on current path
function generateHreflangLinks(currentPath: string) {
  // Remove language prefix from path
  const pathWithoutLang = currentPath.replace(/^\/(en|tr)/, '') || ''

  return {
    en: `${SITE_URL}/en${pathWithoutLang}`,
    tr: `${SITE_URL}/tr${pathWithoutLang}`,
    xDefault: `${SITE_URL}/en${pathWithoutLang}`,
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  // Get current pathname for dynamic hreflang
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || `/${lang}`
  const hreflangs = generateHreflangLinks(pathname)

  // Get global structured data schemas
  const globalSchemas = getGlobalSchemas()

  return (
    <html lang={lang}>
      <head>
        {/* Dynamic hreflang tags */}
        <link rel="alternate" hrefLang="en" href={hreflangs.en} />
        <link rel="alternate" hrefLang="tr" href={hreflangs.tr} />
        <link rel="alternate" hrefLang="x-default" href={hreflangs.xDefault} />

        {/* Global structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchemas),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
