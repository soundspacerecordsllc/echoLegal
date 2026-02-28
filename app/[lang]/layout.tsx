import '../globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { i18n, Locale } from '@/i18n-config'
import { SITE_URL } from '@/lib/structured-data'
import { entityGraph } from '@/lib/entity-graph'
import JsonLdScript from '@/components/JsonLdScript'
import { getAlternatePath } from '@/lib/nav'
import AppShell from '@/components/AppShell'

export const dynamicParams = false

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: 'en' | 'tr' }>
}): Promise<Metadata> {
  const { lang } = await params
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || `/${lang}`

  const enUrl = `${SITE_URL}${getAlternatePath(pathname, 'en')}`
  const trUrl = `${SITE_URL}${getAlternatePath(pathname, 'tr')}`

  return {
    title: 'EchoLegal | Free Legal Encyclopedia & Contract Templates',
    description:
      'Multilingual legal encyclopedia providing professionally drafted contracts and legal guides. Currently in English and Turkish. Legal knowledge for everyone.',
    alternates: {
      canonical: `${SITE_URL}${pathname}`,
      languages: {
        en: enUrl,
        tr: trUrl,
        'x-default': enUrl,
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

  return (
    <>
      <head>
        {/* Global entity graph (Organization + WebSite + LegalService) */}
        <JsonLdScript data={[...entityGraph]} />
      </head>
      <AppShell lang={lang}>{children}</AppShell>
    </>
  )
}
