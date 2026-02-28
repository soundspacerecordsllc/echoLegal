import '../globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { SITE_ORIGIN, absoluteUrl } from '@/lib/site'
import { getGlobalSchemas } from '@/lib/structured-data'
import { getAlternatePath } from '@/lib/nav'
import AppShell from '@/components/AppShell'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/tr'

  const enUrl = absoluteUrl(getAlternatePath(pathname, 'en'))
  const trUrl = absoluteUrl(getAlternatePath(pathname, 'tr'))

  return {
    title: 'EchoLegal | Ücretsiz Hukuki Ansiklopedi ve Sözleşme Şablonları',
    description:
      'İngilizce ve Türkçe hazırlanmış sözleşme şablonları, hukuki rehberler ve ansiklopedi maddeleri. Türk girişimciler ve serbest çalışanlar için.',
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: absoluteUrl(pathname),
      languages: {
        en: enUrl,
        tr: trUrl,
        'x-default': enUrl,
      },
    },
  }
}

export default async function TurkishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get global structured data schemas
  const globalSchemas = getGlobalSchemas()

  return (
    <html lang="tr">
      <head>
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
      </body>
    </html>
  )
}
