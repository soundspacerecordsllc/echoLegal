import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <>
      <Header lang={lang} dict={dict} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-legal-navy to-legal-navy-light text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              {dict.home.hero}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-4">
              {dict.home.subtitle}
            </p>
            <p className="text-lg text-legal-gold mb-10">
              {dict.home.pricing}
            </p>
            <Link 
              href={`/${lang}/contracts`}
              className="inline-block bg-legal-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-legal-gold-light transition-all hover:shadow-2xl"
            >
              {dict.home.browseLibrary}
            </Link>
          </div>
        </section>

        {/* What This Is Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-legal-gray-light">
              <h3 className="font-serif text-2xl font-bold mb-4 text-legal-navy">
                {lang === 'en' ? 'What This Is' : 'Bu Nedir'}
              </h3>
              <p className="text-legal-gray">
                {lang === 'en' 
                  ? 'A bilingual legal encyclopedia with professionally drafted legal templates and explanatory guides in English and Turkish.'
                  : 'İngilizce ve Türkçe olarak profesyonelce hazırlanmış yasal şablonlar ve açıklayıcı kılavuzlar içeren iki dilli bir hukuk ansiklopedisi.'
                }
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-legal-gray-light">
              <h3 className="font-serif text-2xl font-bold mb-4 text-legal-navy">
                {lang === 'en' ? 'Who It\'s For' : 'Kimin İçin'}
              </h3>
              <p className="text-legal-gray">
                {lang === 'en'
                  ? 'Students, small business owners, independent creators, and lawyers looking for reliable, structured legal information.'
                  : 'Öğrenciler, küçük işletme sahipleri, bağımsız yaratıcılar ve güvenilir, yapılandırılmış hukuki bilgi arayan avukatlar.'
                }
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-legal-gray-light">
              <h3 className="font-serif text-2xl font-bold mb-4 text-legal-navy">
                {lang === 'en' ? 'How You Can Use It' : 'Nasıl Kullanabilirsiniz'}
              </h3>
              <p className="text-legal-gray">
                {lang === 'en'
                  ? 'Browse articles or download templates to learn, reference, and apply fundamentals in everyday legal situations.'
                  : 'Günlük yasal durumlarda temelleri öğrenmek, referans almak ve uygulamak için makalelere göz atın veya şablonları indirin.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Featured Documents */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-12 text-legal-navy">
              {dict.home.featuredDocuments}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* NDA Card */}
              <Link 
                href={`/${lang}/contracts/nda`}
                className="bg-white p-8 rounded-lg border-2 border-legal-gray-light hover:border-legal-gold transition-all hover:shadow-lg group"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-legal-gold text-white text-sm font-semibold rounded-full">
                    {lang === 'en' ? 'Popular' : 'Popüler'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-legal-navy group-hover:text-legal-gold transition-colors">
                  Non-Disclosure Agreement (NDA)
                </h3>
                <p className="text-legal-gray mb-4">
                  {lang === 'en'
                    ? 'Protect confidential business information in partnerships, employment, and negotiations.'
                    : 'Ortaklıklarda, istihdamda ve müzakerelerde gizli iş bilgilerini koruyun.'
                  }
                </p>
                <div className="flex items-center text-legal-gold font-semibold">
                  {lang === 'en' ? 'Learn More' : 'Daha Fazla'} →
                </div>
              </Link>

              {/* Service Agreement Card */}
              <Link 
                href={`/${lang}/contracts/service-agreement`}
                className="bg-white p-8 rounded-lg border-2 border-legal-gray-light hover:border-legal-gold transition-all hover:shadow-lg group"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-legal-navy text-white text-sm font-semibold rounded-full">
                    {lang === 'en' ? 'Essential' : 'Temel'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-legal-navy group-hover:text-legal-gold transition-colors">
                  Service Agreement
                </h3>
                <p className="text-legal-gray mb-4">
                  {lang === 'en'
                    ? 'Define clear terms for service-based relationships with clients and contractors.'
                    : 'Müşteriler ve yüklenicilerle hizmet tabanlı ilişkiler için net şartları tanımlayın.'
                  }
                </p>
                <div className="flex items-center text-legal-gold font-semibold">
                  {lang === 'en' ? 'Learn More' : 'Daha Fazla'} →
                </div>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link 
                href={`/${lang}/contracts`}
                className="inline-block btn-secondary"
              >
                {lang === 'en' ? 'View All Contracts' : 'Tüm Sözleşmeleri Görüntüle'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} dict={dict} />
    </>
  )
}
