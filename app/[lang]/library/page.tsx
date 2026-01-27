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
      title: isEnglish ? 'Tax & Compliance' : 'Vergi ve Yasal Uyum',
      description: isEnglish
        ? 'Understanding US tax obligations and IRS requirements'
        : 'ABD vergi yükümlülüklerini ve IRS gereksinimlerini anlamak',
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
      title: isEnglish ? 'Essential Contracts' : 'Temel Sözleşmeler',
      description: isEnglish
        ? 'Understanding the contracts every business needs'
        : 'Her işletmenin ihtiyaç duyduğu sözleşmeleri anlamak',
      articles: [
        {
          slug: 'temel-sozlesmeler',
          title: isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : "ABD'de İş Yapan Türkler İçin Temel Sözleşmeler",
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
    <div className="bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            {isEnglish ? 'Reference' : 'Referans'}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Library' : 'Kütüphane'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'In-depth reference guides explaining US business and legal concepts. Written for accuracy and clarity, not as advice.'
              : 'ABD iş ve hukuk kavramlarını açıklayan derinlemesine referans rehberleri. Tavsiye olarak değil, doğruluk ve netlik için yazılmıştır.'}
          </p>
        </header>

        {/* Categories */}
        {categories.map((category) => (
          <section key={category.id} className="mb-12">
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-2">{category.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{category.description}</p>

            <div className="divide-y divide-gray-100">
              {category.articles.map((article) => (
                <div key={article.slug} className="py-4">
                  {article.available ? (
                    <Link
                      href={`/${lang}/library/${article.slug}`}
                      className="block group"
                    >
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{article.description}</p>
                    </Link>
                  ) : (
                    <div className="opacity-60">
                      <h3 className="font-medium text-gray-700 mb-1">
                        {article.title}
                        <span className="ml-2 text-xs text-gray-400">
                          {isEnglish ? '(Coming)' : '(Yakında)'}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">{article.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Related Resources */}
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/amerika`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'US Business Hub →' : 'ABD İş Merkezi →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/checklists`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Checklists →' : 'Kontrol Listeleri →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/legal-kits`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Legal Kits →' : 'Hukuki Kitler →'}
            </Link>
          </div>
        </nav>
      </main>
    </div>
  )
}
