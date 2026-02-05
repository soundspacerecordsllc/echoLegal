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
      ? 'Legal Guides | EchoLegal'
      : 'Hukuki Rehberler | EchoLegal',
    description: isEnglish
      ? 'Comprehensive legal reference guides for doing business in the United States. LLC formation, tax compliance, common misconceptions, and more. Available in English and Turkish.'
      : "ABD'de iş yapmak için kapsamlı hukuki referans rehberleri. LLC kurulumu, vergi uyumu, sık yapılan hatalar ve daha fazlası. İngilizce ve Türkçe olarak mevcuttur.",
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
        : "ABD'de ticari yapı oluşturmaya ilişkin rehberler",
      articles: [
        {
          slug: 'llc-kurma-rehberi',
          title: isEnglish ? 'LLC Formation in the US: What You Need to Know' : "ABD'de LLC Kurmak: Bilmeniz Gerekenler",
          description: isEnglish
            ? 'A comprehensive reference guide to understanding LLC formation in the United States.'
            : "ABD'de LLC kurulum sürecine dair kapsamlı bir başvuru rehberi.",
          available: true,
          featured: true,
          badge: isEnglish ? 'Guide' : 'Rehber',
        },
        {
          slug: 'llc-vize-yanilgisi',
          title: isEnglish ? 'LLC ≠ Visa: Immigration Realities' : 'LLC Kurmak Vize Vermez: Göçmenlik Gerçekleri',
          description: isEnglish
            ? 'Understanding the relationship between business formation and US immigration law.'
            : 'Şirket kuruluşu ile ABD göçmenlik hukuku arasındaki ilişki.',
          available: true,
          featured: false,
          badge: isEnglish ? 'Guide' : 'Rehber',
        },
      ]
    },
    {
      id: 'tax-compliance',
      title: isEnglish ? 'Tax & Compliance' : 'Vergi ve Yasal Uyum',
      description: isEnglish
        ? 'Understanding US tax obligations and IRS requirements'
        : 'ABD vergi yükümlülükleri ve IRS gereklilikleri hakkında bilgi',
      articles: [
        {
          slug: 'irs-vergi-gercekleri',
          title: isEnglish ? 'IRS, Taxes & Form Realities' : 'IRS, Vergi ve Form Gerçekleri',
          description: isEnglish
            ? 'W-8, W-9, 1099 forms explained. What they mean and when you need them.'
            : 'W-8, W-9, 1099 formları nedir, ne zaman gerekir ve ne anlama gelir?',
          available: true,
          featured: true,
          badge: isEnglish ? 'Guide' : 'Rehber',
        },
      ]
    },
    {
      id: 'legal-truths',
      title: isEnglish ? 'Legal Truth Library' : 'Hukuki Gerçekler Kütüphanesi',
      description: isEnglish
        ? 'Common misconceptions vs. legal realities'
        : 'Yaygın yanılgılar ve hukuki gerçekler',
      articles: [
        {
          slug: 'hukuki-yanilgilar',
          title: isEnglish ? 'Common Legal Misconceptions' : "ABD'de İş Yaparken Sık Yapılan Hukuki Hatalar",
          description: isEnglish
            ? 'Debunking the most common legal myths about doing business in the US.'
            : "ABD'de iş yapmaya dair en yaygın hukuki yanılgıları gerçeklerle karşılaştırıyoruz.",
          available: true,
          featured: true,
          badge: isEnglish ? 'Guide' : 'Rehber',
        },
      ]
    },
    {
      id: 'contracts',
      title: isEnglish ? 'Essential Contracts' : 'Temel Sözleşmeler',
      description: isEnglish
        ? 'Understanding the contracts every business needs'
        : 'Her işletme için vazgeçilmez sözleşme türleri',
      articles: [
        {
          slug: 'temel-sozlesmeler',
          title: isEnglish ? 'Essential Contracts for US Business' : "ABD'de İş Yapmak İçin Temel Sözleşmeler",
          description: isEnglish
            ? 'The contracts you need when starting a business in the United States.'
            : "ABD'de iş kurarken hazırlamanız gereken sözleşmeler.",
          available: true,
          featured: false,
          badge: isEnglish ? 'Contracts' : 'Sözleşmeler',
        },
      ]
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Header */}
        <header className="mb-10">
          <p className="text-sm font-medium text-[#C9A227] uppercase tracking-widest mb-2">
            {isEnglish ? 'Reference' : 'Referans'}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {isEnglish ? 'Guides' : 'Rehberler'}
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
            {isEnglish
              ? 'In-depth reference guides explaining US business and legal concepts. Written for accuracy and clarity, not as advice.'
              : 'ABD iş hukuku ve ticari yapılara ilişkin ayrıntılı başvuru rehberleri. Hukuki tavsiye niteliğinde değildir; doğruluk ve anlaşılırlık esas alınarak hazırlanmıştır.'}
          </p>
        </header>

        {/* Related Reference Strip */}
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm" aria-label={isEnglish ? 'Related reference' : 'İlgili referans'}>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">
            {isEnglish ? 'See also' : 'Ayrıca bkz.'}
          </span>
          <Link
            href={`/${lang}/encyclopedia`}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
          </Link>
          <Link
            href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            {isEnglish ? 'Templates' : 'Şablonlar'}
          </Link>
        </nav>

        {/* Section Jump Links */}
        <nav className="mb-10 flex flex-wrap gap-2" aria-label={isEnglish ? 'Jump to section' : 'Bölüme atla'}>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-block px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:border-gray-400 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-colors"
            >
              {cat.title}
            </a>
          ))}
        </nav>

        {/* Categories */}
        <div className="space-y-14">
          {categories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-20">
              {/* Section Header */}
              <div className="mb-5 border-b border-gray-200 pb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </div>

              {/* Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {category.articles.map((article) =>
                  article.available ? (
                    <Link
                      key={article.slug}
                      href={`/${lang}/library/${article.slug}`}
                      className="group relative flex flex-col justify-between p-5 md:p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all duration-150"
                    >
                      {/* Badge */}
                      <div>
                        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase rounded-full bg-gray-100 text-gray-600 mb-3">
                          {article.badge}
                        </span>
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {article.description}
                        </p>
                      </div>

                      {/* Open CTA */}
                      <div className="mt-4 flex items-center text-sm font-medium text-[#C9A227] group-hover:text-[#b08d1f] transition-colors">
                        <span>{isEnglish ? 'Open' : 'Aç'}</span>
                        <svg
                          className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform duration-150"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={article.slug}
                      className="relative flex flex-col justify-between p-5 md:p-6 bg-white border border-gray-100 rounded-xl opacity-50 cursor-default"
                    >
                      <div>
                        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase rounded-full bg-gray-100 text-gray-400 mb-3">
                          {article.badge}
                        </span>
                        <h3 className="text-base font-semibold text-gray-700 mb-2 leading-snug">
                          {article.title}
                          <span className="ml-2 text-xs font-normal text-gray-400">
                            {isEnglish ? '(Coming)' : '(Yakında)'}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {article.description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Related Resources */}
        <nav className="mt-16 pt-8 border-t border-gray-200" aria-label={isEnglish ? 'Related resources' : 'İlgili kaynaklar'}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Link
              href={`/${lang}/encyclopedia`}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</span>
              <span className="text-gray-400 text-sm">→</span>
            </Link>
            <Link
              href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Templates' : 'Şablonlar'}</span>
              <span className="text-gray-400 text-sm">→</span>
            </Link>
            <Link
              href={`/${lang}/checklists`}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</span>
              <span className="text-gray-400 text-sm">→</span>
            </Link>
            <Link
              href={`/${lang}/legal-kits`}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}</span>
              <span className="text-gray-400 text-sm">→</span>
            </Link>
          </div>
        </nav>
      </main>
    </div>
  )
}
