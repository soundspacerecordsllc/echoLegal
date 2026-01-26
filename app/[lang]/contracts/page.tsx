// app/[lang]/contracts/page.tsx
// Legal document database with search and filtering

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import ContractDiscovery from '@/components/ContractDiscovery'
import { getTemplatesByLang } from '@/lib/templates-registry'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const templateCount = getTemplatesByLang(lang).length

  return {
    title: isEnglish
      ? `Legal Document Templates (${templateCount}+) | EchoLegal`
      : `Hukuki Belge Şablonları (${templateCount}+) | EchoLegal`,
    description: isEnglish
      ? `Browse ${templateCount}+ legal document templates. Contracts, agreements, policies, and forms for US business. Available in English and Turkish.`
      : `${templateCount}+ hukuki belge şablonuna göz atın. ABD işi için sözleşmeler, anlaşmalar, politikalar ve formlar. İngilizce ve Türkçe olarak mevcuttur.`,
    alternates: {
      canonical: `https://echo-legal.com/${lang}/contracts`,
      languages: {
        en: 'https://echo-legal.com/en/contracts',
        tr: 'https://echo-legal.com/tr/contracts',
      },
    },
    openGraph: {
      title: isEnglish
        ? 'Legal Document Templates | EchoLegal'
        : 'Hukuki Belge Şablonları | EchoLegal',
      description: isEnglish
        ? 'Browse and download legal document templates for US business. Contracts, NDAs, privacy policies, and more.'
        : 'ABD işi için hukuki belge şablonlarına göz atın. Sözleşmeler, NDAs, gizlilik politikaları ve daha fazlası.',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ContractsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const templates = getTemplatesByLang(lang)

  // JSON-LD structured data for legal document collection
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isEnglish ? 'Legal Document Templates' : 'Hukuki Belge Şablonları',
    description: isEnglish
      ? 'Comprehensive collection of legal document templates for US business operations.'
      : 'ABD iş operasyonları için kapsamlı hukuki belge şablonları koleksiyonu.',
    url: `https://echo-legal.com/${lang}/contracts`,
    inLanguage: lang === 'en' ? 'en-US' : 'tr-TR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    numberOfItems: templates.length,
    about: {
      '@type': 'Thing',
      name: 'Legal Documents',
      description: 'Contracts, agreements, policies, and legal forms',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href={`/${lang}`} className="text-2xl font-black text-black">
              EchoLegal
            </Link>
            <div className="flex items-center gap-6">
              <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
                {isEnglish ? 'Home' : 'Ana Sayfa'}
              </Link>
              <Link
                href={`/${lang}/contracts`}
                className="text-sm font-medium text-black border-b-2 border-black"
              >
                {isEnglish ? 'Contracts' : 'Sözleşmeler'}
              </Link>
              <Link href={`/${lang}/templates`} className="text-sm font-medium hover:opacity-60">
                {isEnglish ? 'Templates' : 'Şablonlar'}
              </Link>
              <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">
                {isEnglish ? 'Library' : 'Kütüphane'}
              </Link>
              <Link href={`/${lang}/contribute`} className="text-sm font-medium hover:opacity-60">
                {isEnglish ? 'Contribute' : 'Katkıda Bulun'}
              </Link>
              <Link
                href={`/${lang === 'en' ? 'tr' : 'en'}/contracts`}
                className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
              >
                {isEnglish ? 'TR' : 'EN'}
              </Link>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-black mb-4">
              {isEnglish ? 'Legal Documents' : 'Hukuki Belgeler'}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {isEnglish
                ? `Search ${templates.length}+ legal document templates. Contracts, agreements, policies, and forms for US business operations. All documents available in English and Turkish.`
                : `${templates.length}+ hukuki belge şablonunda arama yapın. ABD iş operasyonları için sözleşmeler, anlaşmalar, politikalar ve formlar. Tüm belgeler İngilizce ve Türkçe olarak mevcuttur.`}
            </p>
          </div>

          {/* Document Discovery Interface */}
          <ContractDiscovery lang={lang} />

          {/* Additional Resources Section */}
          <section className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href={`/${lang}/legal-kits/business-starter`}
                className="block p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isEnglish ? 'US Business Starter Kit' : 'ABD İş Başlangıç Kiti'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? '5 essential documents bundled for new businesses'
                    : 'Yeni işletmeler için paketlenmiş 5 temel belge'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library`}
                className="block p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isEnglish ? 'Legal Guides' : 'Hukuki Rehberler'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Step-by-step guides and educational content'
                    : 'Adım adım rehberler ve eğitim içeriği'}
                </p>
              </Link>

              <Link
                href={`/${lang}/contribute`}
                className="block p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isEnglish ? 'Contribute' : 'Katkıda Bulun'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Licensed attorneys: join our contributor network'
                    : 'Lisanslı avukatlar: katkıda bulunan ağımıza katılın'}
                </p>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-20 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
              {dict.disclaimer.global}
            </p>
            <p className="text-xs text-gray-400 mt-4">
              © 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
