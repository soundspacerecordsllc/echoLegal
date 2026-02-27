import '../globals.css'
import type { Metadata } from 'next'
import { i18n, Locale } from '@/i18n-config'
import { getGlobalSchemas } from '@/lib/structured-data'
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
        'x-default': `/en`,
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params

  // Get global structured data schemas
  const globalSchemas = getGlobalSchemas()

  return (
    <>
      <head>
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
