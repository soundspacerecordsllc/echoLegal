// app/[lang]/contracts/page.tsx
// Legal document database with search and filtering

import { Suspense } from 'react'
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {isEnglish ? 'Template Library' : 'Şablon Kütüphanesi'}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {isEnglish ? 'Legal Documents' : 'Hukuki Belgeler'}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {isEnglish
                ? `Search ${templates.length}+ legal document templates. Contracts, agreements, policies, and forms for US business operations. All documents available in English and Turkish.`
                : `${templates.length}+ hukuki belge şablonunda arama yapın. ABD iş operasyonları için sözleşmeler, anlaşmalar, politikalar ve formlar. Tüm belgeler İngilizce ve Türkçe olarak mevcuttur.`}
            </p>
          </div>

          {/* Document Discovery Interface */}
          <Suspense>
            <ContractDiscovery lang={lang} />
          </Suspense>

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
      </div>
    </>
  )
}
