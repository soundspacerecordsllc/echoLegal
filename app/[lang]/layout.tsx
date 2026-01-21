import '../globals.css'
import type { Metadata } from 'next'
import { i18n } from '@/i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'EchoLegal | Free Legal Encyclopedia & Contract Templates',
  description: 'Bilingual legal encyclopedia providing professionally drafted contracts and legal guides in English and Turkish. Pay what you can - legal knowledge for everyone.',
  metadataBase: new URL('https://echo-legal.com'),
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://echo-legal.com/en" />
        <link rel="alternate" hrefLang="tr" href="https://echo-legal.com/tr" />
        <link rel="alternate" hrefLang="x-default" href="https://echo-legal.com/en" />
      </head>
      <body>{children}</body>
    </html>
  )
}
