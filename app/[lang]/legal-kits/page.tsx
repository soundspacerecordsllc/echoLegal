// app/[lang]/legal-kits/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Legal Document Kits | Curated Bundles | EchoLegal'
      : 'Hukuki Belge Kitleri | Seçilmiş Paketler | EchoLegal',
    description: isEnglish
      ? 'Professionally curated legal document bundles for specific business and legal use cases. Reference-grade templates with annotations.'
      : 'Belirli iş ve hukuki kullanım durumları için profesyonelce hazırlanmış hukuki belge paketleri. Açıklamalı referans kalitesinde şablonlar.',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LegalKitsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const kits = [
    {
      slug: 'business-starter',
      title: isEnglish ? 'US Business Starter Legal Kit' : 'ABD İş Başlangıç Hukuk Kiti',
      subtitle: isEnglish ? 'Essential Documents for US Business Formation' : 'ABD Şirket Kuruluşu İçin Temel Belgeler',
      description: isEnglish
        ? 'Core legal documents for establishing and operating a business in the United States. Includes NDA, Service Agreement, Contractor Agreement, Privacy Policy, and Terms of Service.'
        : 'ABD\'de iş kurma ve işletme için temel hukuki belgeler. NDA, Hizmet Sözleşmesi, Yüklenici Sözleşmesi, Gizlilik Politikası ve Kullanım Koşulları içerir.',
      documents: 5,
      available: true,
      featured: true,
      jurisdiction: 'US',
    },
    {
      slug: 'freelancer-essentials',
      title: isEnglish ? 'Freelancer Essentials Kit' : 'Serbest Çalışan Temel Kiti',
      subtitle: isEnglish ? 'Contracts for Independent Professionals' : 'Bağımsız Profesyoneller İçin Sözleşmeler',
      description: isEnglish
        ? 'Essential contracts for freelancers and independent contractors. Service Agreement, NDA, and Independent Contractor Agreement with detailed annotations.'
        : 'Serbest çalışanlar ve bağımsız yükleniciler için temel sözleşmeler. Detaylı açıklamalarla Hizmet Sözleşmesi, NDA ve Bağımsız Yüklenici Sözleşmesi.',
      documents: 3,
      available: false,
      featured: false,
      jurisdiction: 'General',
    },
    {
      slug: 'ecommerce-bundle',
      title: isEnglish ? 'E-Commerce Legal Bundle' : 'E-Ticaret Hukuki Paketi',
      subtitle: isEnglish ? 'Legal Framework for Online Sellers' : 'Çevrimiçi Satıcılar İçin Hukuki Çerçeve',
      description: isEnglish
        ? 'Privacy Policy, Terms of Service, and Return Policy templates for e-commerce businesses operating online.'
        : 'Çevrimiçi faaliyet gösteren e-ticaret işletmeleri için Gizlilik Politikası, Kullanım Koşulları ve İade Politikası şablonları.',
      documents: 3,
      available: false,
      featured: false,
      jurisdiction: 'General',
    },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            {isEnglish ? 'Bundles' : 'Paketler'}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'Curated collections of legal documents for specific use cases. Each kit contains professionally drafted templates with annotations.'
              : 'Belirli kullanım durumları için hazırlanmış hukuki belge koleksiyonları. Her kit, açıklamalarla profesyonelce hazırlanmış şablonlar içerir.'}
          </p>
        </header>

        {/* Kits List */}
        <div className="divide-y divide-gray-200">
          {kits.map((kit) => (
            <div key={kit.slug} className="py-8">
              {kit.available ? (
                <Link href={`/${lang}/legal-kits/${kit.slug}`} className="block group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-serif font-semibold text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                        {kit.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-3">{kit.subtitle}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{kit.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{kit.documents} {isEnglish ? 'documents' : 'belge'}</span>
                        <span>·</span>
                        <span>{kit.jurisdiction}</span>
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1">
                      →
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="opacity-60">
                  <h2 className="text-xl font-serif font-semibold text-gray-700 mb-1">
                    {kit.title}
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      {isEnglish ? '(Coming)' : '(Yakında)'}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">{kit.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{kit.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Related Resources */}
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'All Templates →' : 'Tüm Şablonlar →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/contracts`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Contracts →' : 'Sözleşmeler →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/checklists`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Checklists →' : 'Kontrol Listeleri →'}
            </Link>
          </div>
        </nav>
      </main>
    </div>
  )
}
