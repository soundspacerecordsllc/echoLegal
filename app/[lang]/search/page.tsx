import { Metadata } from 'next'
import { Locale } from '@/i18n-config'
import SiteSearch from '@/components/SiteSearch'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish ? 'Search | EchoLegal' : 'Arama | EchoLegal',
    description: isEnglish
      ? 'Search the EchoLegal legal encyclopedia, templates, and guides.'
      : 'EchoLegal hukuk ansiklopedisi, şablon ve rehberlerinde arama yapın.',
    robots: { index: false, follow: true },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return (
    <div className="bg-surface">
      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
            {isEnglish ? 'Search' : 'Arama'}
          </h1>
          <SiteSearch lang={lang} variant="standalone" />
        </div>
      </section>
    </div>
  )
}
