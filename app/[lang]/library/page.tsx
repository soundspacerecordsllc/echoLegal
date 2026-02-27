// app/[lang]/library/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const title = isEnglish
    ? 'Legal Reference Library | EchoLegal'
    : 'Hukuki Başvuru Kütüphanesi | EchoLegal'

  const description = isEnglish
    ? 'Reference entries on US business law for non-US entrepreneurs. LLC formation, tax compliance, contracts, and common misconceptions. Available in English and Turkish.'
    : 'ABD dışından girişimciler için ABD iş hukukuna ilişkin başvuru maddeleri. LLC kuruluşu, vergi uyumu, sözleşmeler ve yaygın yanılgılar. İngilizce ve Türkçe olarak mevcuttur.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
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
      title: isEnglish ? 'Business Formation' : 'Şirket Kuruluşu',
      description: isEnglish
        ? 'Entity structure, state selection, and formation process'
        : 'Tüzel kişilik yapısı, eyalet seçimi ve kuruluş süreci',
      articles: [
        {
          slug: 'llc-kurma-rehberi',
          title: isEnglish ? 'LLC Formation in the United States' : 'ABD\'de LLC Kuruluşu',
          description: isEnglish
            ? 'Legal structure, state selection, formation process, and tax classification for non-US entrepreneurs.'
            : 'ABD dışından girişimciler için hukuki yapı, eyalet seçimi, kuruluş süreci ve vergi sınıflandırması.',
          available: true,
        },
        {
          slug: 'llc-vize-yanilgisi',
          title: isEnglish ? 'LLC Formation and Visa Eligibility' : 'LLC Kuruluşu ve Vize Uygunluğu',
          description: isEnglish
            ? 'The legal separation between business entity formation and immigration status.'
            : 'Ticari tüzel kişilik kuruluşu ile göçmenlik statüsü arasındaki hukuki ayrım.',
          available: true,
        },
      ]
    },
    {
      id: 'tax-compliance',
      title: isEnglish ? 'Tax & Compliance' : 'Vergi ve Uyum',
      description: isEnglish
        ? 'US tax forms, withholding obligations, and treaty considerations'
        : 'ABD vergi formları, stopaj yükümlülükleri ve anlaşma hususları',
      articles: [
        {
          slug: 'irs-vergi-gercekleri',
          title: isEnglish ? 'US Tax Forms for Non-US Entrepreneurs' : 'ABD Dışından Girişimciler İçin Vergi Formları',
          description: isEnglish
            ? 'W-8BEN, W-9, 1099-NEC, withholding obligations, and the US\u2013Turkey tax treaty.'
            : 'W-8BEN, W-9, 1099-NEC, stopaj yükümlülükleri ve ABD-Türkiye vergi anlaşması.',
          available: true,
        },
      ]
    },
    {
      id: 'contracts',
      title: isEnglish ? 'Contracts' : 'Sözleşmeler',
      description: isEnglish
        ? 'Contracts commonly required for US business operations'
        : 'ABD iş faaliyetleri için yaygın olarak gerekli sözleşmeler',
      articles: [
        {
          slug: 'temel-sozlesmeler',
          title: isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş İçin Temel Sözleşmeler',
          description: isEnglish
            ? 'NDAs, service agreements, privacy policies, terms of service, and contractor agreements.'
            : 'NDA, hizmet sözleşmeleri, gizlilik politikaları, kullanım koşulları ve yüklenici sözleşmeleri.',
          available: true,
        },
      ]
    },
    {
      id: 'misconceptions',
      title: isEnglish ? 'Misconceptions' : 'Yanılgılar',
      description: isEnglish
        ? 'Frequently misunderstood aspects of US business law'
        : 'ABD iş hukukunun sıkça yanlış anlaşılan yönleri',
      articles: [
        {
          slug: 'hukuki-yanilgilar',
          title: isEnglish ? 'Common Legal Misconceptions About US Business' : 'ABD\'de İş Hukukuna İlişkin Yaygın Yanılgılar',
          description: isEnglish
            ? 'LLC formation, tax obligations, immigration, contracts, and banking — what is commonly misunderstood.'
            : 'LLC kuruluşu, vergi yükümlülükleri, göçmenlik, sözleşmeler ve bankacılık — yaygın olarak yanlış anlaşılanlar.',
          available: true,
        },
      ]
    },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <header className="mb-14">
        <p className="section-label">
          {isEnglish ? 'Reference' : 'Referans'}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4 leading-tight tracking-tight">
          {isEnglish ? 'Library' : 'Kütüphane'}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-2xl">
          {isEnglish
            ? 'Reference entries on US business law for non-US entrepreneurs. Written for accuracy, not as advice.'
            : 'ABD dışından girişimciler için ABD iş hukukuna ilişkin başvuru maddeleri. Doğruluk esas alınarak hazırlanmıştır; tavsiye niteliğinde değildir.'}
        </p>
      </header>

      {/* Categories */}
      <div className="space-y-14">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-20">
            {/* Section Header */}
            <div className="mb-6 border-b border-stone-200 pb-3">
              <h2 className="font-serif text-xl font-semibold text-ink">{category.title}</h2>
              <p className="text-sm text-muted mt-1">{category.description}</p>
            </div>

            {/* Article List */}
            <div className="divide-y divide-stone-200">
              {category.articles.map((article) =>
                article.available ? (
                  <Link
                    key={article.slug}
                    href={`/${lang}/library/${article.slug}`}
                    className="block py-5 first:pt-0 group"
                  >
                    <h3 className="text-base font-semibold text-ink group-hover:text-accent transition-colors mb-1.5 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {article.description}
                    </p>
                  </Link>
                ) : (
                  <div
                    key={article.slug}
                    className="py-5 first:pt-0 opacity-50"
                  >
                    <h3 className="text-base font-semibold text-muted mb-1.5 leading-snug">
                      {article.title}
                      <span className="ml-2 text-xs font-normal">
                        {isEnglish ? '(Coming)' : '(Yakında)'}
                      </span>
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Related Resources */}
      <nav className="mt-16 pt-8 border-t border-stone-200" aria-label={isEnglish ? 'Related resources' : 'İlgili kaynaklar'}>
        <p className="section-label">
          {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
        </p>
        <div className="divide-y divide-stone-200">
          <Link
            href={`/${lang}/contracts`}
            className="flex items-center justify-between py-3 group"
          >
            <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors">{isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}</span>
            <span className="text-muted text-sm">&rarr;</span>
          </Link>
          <Link
            href={`/${lang}/checklists`}
            className="flex items-center justify-between py-3 group"
          >
            <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</span>
            <span className="text-muted text-sm">&rarr;</span>
          </Link>
          <Link
            href={`/${lang}/legal-kits`}
            className="flex items-center justify-between py-3 group"
          >
            <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors">{isEnglish ? 'Document Kits' : 'Belge Kitleri'}</span>
            <span className="text-muted text-sm">&rarr;</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
