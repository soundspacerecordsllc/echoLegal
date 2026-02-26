import '../globals.css'
import type { Metadata } from 'next'
import { i18n, Locale } from '@/i18n-config'
import { headers } from 'next/headers'
import { getGlobalSchemas, SITE_URL } from '@/lib/structured-data'
import AppShell from '@/components/AppShell'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: 'en' | 'tr' }>
}): Promise<Metadata> {
  const { lang } = await params

  return {
    title: 'EchoLegal | Free Legal Encyclopedia & Contract Templates',
    description:
      'Multilingual legal encyclopedia providing professionally drafted contracts and legal guides. Currently in English and Turkish. Legal knowledge for everyone.',
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: `/en`,
        tr: `/tr`,
      },
    },
  }
}

// Generate dynamic hreflang links based on current path
function generateHreflangLinks(currentPath: string) {
  // Remove language prefix from path
  let pathWithoutLang = currentPath.replace(/^\/(en|tr)/, '') || ''

  // Handle special TR/EN path mappings for hreflang
  const enPath = pathWithoutLang.replace('/sablonlar', '/templates')
  const trPath = pathWithoutLang.replace('/templates', '/sablonlar')

  return {
    en: `${SITE_URL}/en${enPath}`,
    tr: `${SITE_URL}/tr${trPath}`,
    xDefault: `${SITE_URL}/en${enPath}`,
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  // Get current pathname for dynamic hreflang
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || `/${lang}`
  const hreflangs = generateHreflangLinks(pathname)

  // Get global structured data schemas
  const globalSchemas = getGlobalSchemas()

  return (
    <>
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
      <AppShell lang={lang}>{children}</AppShell>
    </>
  )
}
