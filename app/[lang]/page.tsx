import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="bg-[#ffffff] min-h-screen">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b border-gray-100">
        <nav className="flex justify-between items-center px-8 py-5">
          <Link href={`/${lang}`} className="text-2xl font-black tracking-tight text-[#000000]">
            ECHOLEGAL
          </Link>
          <div className="flex items-center gap-8">
            <Link href={`/${lang}`} className="text-sm font-semibold hover:opacity-60 transition-opacity text-[#000000]">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-semibold hover:opacity-60 transition-opacity text-[#000000]">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link href={`/${lang}/consular-documents`} className="text-sm font-semibold hover:opacity-60 transition-opacity text-[#000000]">
              {isEnglish ? 'Consular' : 'Konsolosluk'}
            </Link>
            <Link 
              href={`/${lang === 'en' ? 'tr' : 'en'}`}
              className="flex items-center gap-2 text-sm font-semibold border-2 border-[#000000] rounded-full px-4 py-2 hover:bg-[#000000] hover:text-[#ffffff] transition-all text-[#000000]"
            >
              🌐 {isEnglish ? 'English' : 'Türkçe'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="bg-[#ffffff] pt-[72px]">
        {/* Hero Section - Split Layout */}
        <section className="min-h-[calc(100vh-72px)] grid md:grid-cols-2">
          {/* Left - Image */}
          <div className="relative h-[50vh] md:h-[calc(100vh-72px)]">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
              alt="Legal documents"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Right - Content */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-8 bg-[#ffffff]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-[#000000]">
              LEGAL<br />
              KNOWLEDGE<br />
              SHOULD<br />
              BELONG TO<br />
              EVERYONE.
            </h1>
            
            <p className="text-base md:text-lg text-[#444444] mb-3 max-w-md">
              {isEnglish 
                ? 'EchoLegal is a growing legal encyclopedia with professionally drafted contracts and explanations in English and Turkish.'
                : 'EchoLegal, İngilizce ve Türkçe olarak profesyonelce hazırlanmış sözleşmeler ve açıklamalar içeren büyüyen bir hukuk ansiklopedisidir.'
              }
            </p>
            
            <p className="text-base md:text-lg text-[#444444] mb-8 max-w-md">
              {isEnglish 
                ? 'Pay what you can. $20 recommended. Free access available by request.'
                : 'Ödeyebileceğiniz kadar ödeyin. 20$ önerilir. Talep üzerine ücretsiz erişim mevcuttur.'
              }
            </p>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                {isEnglish ? 'Featured Documents' : 'Öne Çıkan Belgeler'}
              </p>
              
              <div className="space-y-1">
                <Link 
                  href={`/${lang}/contracts/nda`}
                  className="block text-base font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity text-[#000000]"
                >
                  {isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}
                </Link>
                <Link 
                  href={`/${lang}/contracts/service-agreement`}
                  className="block text-base font-semibold underline underline-offset-4 hover:opacity-60 transition-opacity text-[#000000]"
                >
                  {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}
                </Link>
              </div>

              <p className="text-sm text-[#666666]">
                {isEnglish ? 'Available in English and Turkish.' : 'İngilizce ve Türkçe olarak mevcuttur.'}
              </p>
            </div>

            <Link 
              href={`/${lang}/contracts`}
              className="inline-block mt-8 bg-[#000000] text-[#ffffff] text-center px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#333333] transition-colors w-fit"
            >
              {isEnglish ? 'BROWSE ECHOLEGAL LIBRARY' : 'ECHOLEGAL KÜTÜPHANESİNE GÖZ ATIN'}
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-[#ffffff] py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#000000]">
                  {isEnglish ? 'What This Is' : 'Bu Nedir'}
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  {isEnglish 
                    ? 'A bilingual legal encyclopedia with professionally drafted legal templates and explanatory guides in English and Turkish.'
                    : 'İngilizce ve Türkçe olarak profesyonelce hazırlanmış yasal şablonlar ve açıklayıcı kılavuzlar içeren iki dilli bir hukuk ansiklopedisi.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#000000]">
                  {isEnglish ? "Who It's For" : 'Kimin İçin'}
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  {isEnglish
                    ? 'Students, small business owners, independent creators, and lawyers looking for reliable, structured legal information.'
                    : 'Öğrenciler, küçük işletme sahipleri, bağımsız yaratıcılar ve güvenilir, yapılandırılmış hukuki bilgi arayan avukatlar.'
                  }
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#000000]">
                  {isEnglish ? 'How You Can Use It' : 'Nasıl Kullanabilirsiniz'}
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  {isEnglish
                    ? 'Browse articles or download templates to learn, reference, and apply fundamentals in everyday legal situations.'
                    : 'Günlük yasal durumlarda temelleri öğrenmek, referans almak ve uygulamak için makalelere göz atın veya şablonları indirin.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Consular Section Promo */}
        <section className="py-16 px-8 bg-red-50 border-t border-red-100">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white text-red-800 rounded-full text-sm font-semibold mb-4">
              🇹🇷 {isEnglish ? 'New Section' : 'Yeni Bölüm'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#000000]">
              {isEnglish ? 'Turkish Consular Documents' : 'Türk Konsolosluk Belgeleri'}
            </h2>
            <p className="text-lg text-[#444444] mb-6">
              {isEnglish 
                ? 'Free checklists for passport, ID, notary services, birth & marriage registration. In English & Turkish.'
                : 'Pasaport, kimlik, noter hizmetleri, doğum ve evlilik kaydı için ücretsiz kontrol listeleri. İngilizce & Türkçe.'}
            </p>
            <Link 
              href={`/${lang}/consular-documents`}
              className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#B8922A] transition-colors"
            >
              {isEnglish ? 'View Consular Checklists →' : 'Konsolosluk Kontrol Listelerini Gör →'}
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8 bg-[#ffffff]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#000000]">
              {isEnglish ? 'Ready to get started?' : 'Başlamaya hazır mısınız?'}
            </h2>
            <p className="text-lg text-[#444444] mb-8">
              {isEnglish 
                ? 'Browse our library of professionally drafted legal templates.'
                : 'Profesyonelce hazırlanmış yasal şablon kütüphanemize göz atın.'
              }
            </p>
            <Link 
              href={`/${lang}/contracts`}
              className="inline-block bg-[#000000] text-[#ffffff] px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#333333] transition-colors"
            >
              {isEnglish ? 'VIEW ALL CONTRACTS' : 'TÜM SÖZLEŞMELERİ GÖRÜNTÜLE'}
            </Link>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-200 py-12 px-8 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-2xl font-black tracking-tight mb-2 text-[#000000]">ECHOLEGAL</p>
              <p className="text-sm text-[#666666]">
                {isEnglish ? 'Legal Encyclopedia' : 'Hukuk Ansiklopedisi'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href={`/${lang}/contracts`} className="hover:opacity-60 transition-opacity text-[#000000]">
                {isEnglish ? 'Contracts' : 'Sözleşmeler'}
              </Link>
              <Link href={`/${lang}/consular-documents`} className="hover:opacity-60 transition-opacity text-[#000000]">
                {isEnglish ? 'Consular' : 'Konsolosluk'}
              </Link>
              <Link href={`/${lang}/encyclopedia`} className="hover:opacity-60 transition-opacity text-[#000000]">
                {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
              </Link>
              <Link href={`/${lang}/support`} className="hover:opacity-60 transition-opacity text-[#000000]">
                {isEnglish ? 'Support' : 'Destek'}
              </Link>
            </div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-xs text-[#888888] leading-relaxed max-w-4xl">
              {isEnglish 
                ? 'LEGAL DISCLAIMER: EchoLegal provides educational legal information and document templates for general informational purposes only. Nothing on this website constitutes legal advice, nor does use of this website create an attorney-client relationship. Laws vary by jurisdiction and individual circumstances differ. You should consult with a licensed attorney in your jurisdiction before relying on any information or documents from this site.'
                : 'HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme amaçlı eğitici hukuki bilgiler ve belge şablonları sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez ve bu web sitesinin kullanımı avukat-müvekkil ilişkisi oluşturmaz.'
              }
            </p>
            <p className="text-xs text-[#888888] mt-4">
              © 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
