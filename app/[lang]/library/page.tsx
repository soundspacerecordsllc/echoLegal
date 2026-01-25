// app/[lang]/library/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Legal Reference Library | EchoLegal'
      : 'Hukuki Referans Kütüphanesi | EchoLegal',
    description: isEnglish
      ? 'Comprehensive legal reference guides for Turkish entrepreneurs doing business in the United States. LLC formation, tax facts, common misconceptions, and more.'
      : "ABD'de iş yapan Türk girişimciler için kapsamlı hukuki referans rehberleri. LLC kurulumu, vergi gerçekleri, sık yapılan hatalar ve daha fazlası.",
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const categories = [
    {
      id: 'business-formation',
      title: isEnglish ? 'Business Formation' : 'Şirket Kurulumu',
      description: isEnglish
        ? 'Guides on forming business entities in the United States'
        : "ABD'de iş varlıkları kurma rehberleri",
      articles: [
        {
          slug: 'llc-kurma-rehberi',
          title: isEnglish ? 'LLC Formation in the US: What You Need to Know' : "ABD'de LLC Kurmak: Bilmeniz Gerekenler",
          description: isEnglish
            ? 'A comprehensive reference guide to understanding LLC formation in the United States.'
            : "ABD'de LLC kurulumunu anlamak için kapsamlı bir referans rehberi.",
          available: true,
          featured: true,
        },
        {
          slug: 'llc-vize-yanilgisi',
          title: isEnglish ? 'LLC ≠ Visa: Immigration Realities' : 'LLC Kurmak Vize Vermez: Göçmenlik Gerçekleri',
          description: isEnglish
            ? 'Understanding the relationship between business formation and US immigration law.'
            : 'Şirket kurulumu ile ABD göçmenlik hukuku arasındaki ilişkiyi anlama.',
          available: true,
          featured: false,
        },
      ]
    },
    {
      id: 'tax-compliance',
      title: isEnglish ? 'Tax & Compliance' : 'Vergi ve Uyum',
      description: isEnglish
        ? 'Understanding US tax obligations and IRS requirements'
        : 'ABD vergi yükümlülüklerini ve IRS gereksinimlerini anlama',
      articles: [
        {
          slug: 'irs-vergi-gercekleri',
          title: isEnglish ? 'IRS, Taxes & Form Realities' : 'IRS, Vergi ve Form Gerçekleri',
          description: isEnglish
            ? 'W-8, W-9, 1099 forms explained. What they mean and when you need them.'
            : 'W-8, W-9, 1099 formları açıklandı. Ne anlama geldiği ve ne zaman ihtiyacınız olduğu.',
          available: true,
          featured: true,
        },
      ]
    },
    {
      id: 'legal-truths',
      title: isEnglish ? 'Legal Truth Library' : 'Hukuki Gerçekler Kütüphanesi',
      description: isEnglish
        ? 'Common misconceptions vs. legal realities'
        : 'Sık yapılan hatalar ve hukuki gerçekler',
      articles: [
        {
          slug: 'hukuki-yanilgilar',
          title: isEnglish ? 'Common Legal Misconceptions' : "ABD'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları",
          description: isEnglish
            ? 'Debunking the most common legal myths about doing business in the US.'
            : "ABD'de iş yapma hakkındaki en yaygın hukuki mitleri çürütme.",
          available: true,
          featured: true,
        },
      ]
    },
    {
      id: 'contracts',
      title: isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler',
      description: isEnglish
        ? 'Understanding the contracts every business needs'
        : 'Her işletmenin ihtiyaç duyduğu sözleşmeleri anlama',
      articles: [
        {
          slug: 'temel-sozlesmeler',
          title: isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : "ABD'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler",
          description: isEnglish
            ? 'The contracts you need when starting a business in the United States.'
            : "ABD'de iş kurarken ihtiyacınız olan sözleşmeler.",
          available: true,
          featured: false,
        },
      ]
    },
  ]

  return (
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
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link href={`/${lang}/legal-kits`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}
            </Link>
            <Link href={`/${lang}/library`} className="text-sm font-medium text-black border-b-2 border-black">
              {isEnglish ? 'Library' : 'Kütüphane'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/library`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            {isEnglish ? 'Legal Reference Library' : 'Hukuki Referans Kütüphanesi'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {isEnglish
              ? 'Factual, reference-only guides for Turkish entrepreneurs navigating US business and legal requirements. No advice—just clear explanations.'
              : 'ABD iş ve hukuki gereksinimlerinde yol alan Türk girişimciler için gerçeklere dayalı, yalnızca referans rehberler. Tavsiye yok—sadece net açıklamalar.'}
          </p>
        </div>

        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Featured Guides' : 'Öne Çıkan Rehberler'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.flatMap(cat => cat.articles.filter(a => a.featured && a.available)).map((article) => (
              <Link
                key={article.slug}
                href={`/${lang}/library/${article.slug}`}
                className="group border-2 border-gray-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#C9A227] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm">{article.description}</p>
                <span className="inline-block mt-4 text-sm font-medium text-[#C9A227]">
                  {isEnglish ? 'Read Guide →' : 'Rehberi Oku →'}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        {categories.map((category) => (
          <section key={category.id} className="mb-12">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-black">{category.title}</h2>
              <p className="text-gray-500 text-sm">{category.description}</p>
            </div>

            <div className="space-y-4">
              {category.articles.map((article) => (
                <div
                  key={article.slug}
                  className={`border rounded-lg p-5 ${
                    article.available
                      ? 'border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all'
                      : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-black">{article.title}</h3>
                        {!article.available && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-500 rounded text-xs">
                            {isEnglish ? 'Coming Soon' : 'Yakında'}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{article.description}</p>
                    </div>
                    {article.available && (
                      <Link
                        href={`/${lang}/library/${article.slug}`}
                        className="text-sm text-[#C9A227] font-medium hover:text-[#B8922A] whitespace-nowrap ml-4"
                      >
                        {isEnglish ? 'Read →' : 'Oku →'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Product CTA */}
        <section className="mt-16 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-black mb-2">
                {isEnglish ? 'Need the Essential Documents?' : 'Temel Belgelere mi İhtiyacınız Var?'}
              </h2>
              <p className="text-gray-600">
                {isEnglish
                  ? 'Our Business Starter Kit includes 5 essential legal documents for US business.'
                  : "Business Starter Kit'imiz ABD işi için 5 temel hukuki belge içerir."}
              </p>
            </div>
            <Link
              href={`/${lang}/legal-kits/business-starter`}
              className="bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors whitespace-nowrap"
            >
              {isEnglish ? 'View Business Starter Kit →' : "Business Starter Kit'i Görüntüle →"}
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
  )
}
