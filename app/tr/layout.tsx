import '../globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getGlobalSchemas, SITE_URL } from '@/lib/structured-data'
import AppShell from '@/components/AppShell'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: 'EchoLegal | Ücretsiz Hukuki Ansiklopedi ve Sözleşme Şablonları',
  description:
    'İngilizce ve Türkçe hazırlanmış sözleşme şablonları, hukuki rehberler ve ansiklopedi maddeleri. Türk girişimciler ve serbest çalışanlar için.',
  metadataBase: new URL('https://echo-legal.com'),
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

export default async function TurkishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get current pathname for dynamic hreflang
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/tr'
  const hreflangs = generateHreflangLinks(pathname)

  // Get global structured data schemas
  const globalSchemas = getGlobalSchemas()

  return (
    <html lang="tr">
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111827" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

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
      <body>
        <AppShell lang="tr">{children}</AppShell>
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
