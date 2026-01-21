import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function EncyclopediaPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <>
      <Header lang={lang} dict={dict} />
      
      <main className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-navy mb-4">
            {dict.nav.encyclopedia}
          </h1>
          <p className="text-xl text-legal-gray mb-12">
            {isEnglish 
              ? 'Comprehensive legal guides covering business law, employment, intellectual property, and more.'
              : 'İş hukuku, istihdam, fikri mülkiyet ve daha fazlasını kapsayan kapsamlı hukuki kılavuzlar.'
            }
          </p>

          <div className="bg-amber-50 border-l-4 border-legal-gold p-8 rounded-r-lg">
            <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
              {isEnglish ? 'Coming Soon' : 'Yakında'}
            </h2>
            <p className="text-legal-gray">
              {isEnglish
                ? 'We are currently building our legal encyclopedia with comprehensive articles on key legal topics. Check back soon for in-depth guides on contracts, business entities, employment law, intellectual property, and more.'
                : 'Şu anda önemli hukuki konularda kapsamlı makaleler içeren hukuk ansiklopedimizi oluşturuyoruz. Sözleşmeler, işletme kuruluşları, iş hukuku, fikri mülkiyet ve daha fazlası hakkında ayrıntılı kılavuzlar için yakında tekrar kontrol edin.'
              }
            </p>
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict} />
    </>
  )
}
