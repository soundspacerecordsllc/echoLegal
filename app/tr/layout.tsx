import '../globals.css'
import type { Metadata } from 'next'
import { getGlobalSchemas, SITE_URL } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'EchoLegal | Ücretsiz Hukuki Ansiklopedi ve Sözleşme Şablonları',
  description:
    'İngilizce ve Türkçe profesyonelce hazırlanmış sözleşmeler ve hukuki rehberler sunan iki dilli hukuki ansiklopedi.',
  metadataBase: new URL('https://echo-legal.com'),
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
        {/* Dynamic hreflang tags for Turkish sablonlar routes */}
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/templates`} />
        <link rel="alternate" hrefLang="tr" href={`${SITE_URL}/tr/sablonlar`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en/templates`} />

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
