// app/[lang]/library/llc-vize-yanilgisi/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'LLC ≠ Visa: Immigration Realities for Business Owners | EchoLegal'
      : 'LLC Kurmak Vize Vermez: İş Sahipleri İçin Göçmenlik Gerçekleri | EchoLegal',
    description: isEnglish
      ? 'Understanding the relationship between US business formation and immigration. Why forming an LLC does not grant visa or immigration benefits.'
      : 'ABD şirket kurulumu ile göçmenlik arasındaki ilişkiyi anlama. LLC kurmanın neden vize veya göçmenlik avantajı sağlamadığı.',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCVisaMythPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

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
            <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Library' : 'Kütüphane'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/library/llc-vize-yanilgisi`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'LLC ≠ Visa' : 'LLC ≠ Vize'}</span>
        </nav>

        <article>
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Immigration Reality' : 'Göçmenlik Gerçeği'}
            </span>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              {isEnglish
                ? 'LLC ≠ Visa: Immigration Realities'
                : 'LLC Kurmak Vize Vermez: Göçmenlik Gerçekleri'}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {isEnglish
                ? 'One of the most common misconceptions among international entrepreneurs: forming a US LLC does not, by itself, grant any visa or immigration benefit.'
                : 'Uluslararası girişimciler arasındaki en yaygın yanılgılardan biri: ABD LLC kurmak tek başına herhangi bir vize veya göçmenlik avantajı sağlamaz.'}
            </p>
          </header>

          {/* Critical Alert */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-10">
            <h2 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              {isEnglish ? 'Critical Understanding' : 'Kritik Anlayış'}
            </h2>
            <p className="text-red-900 font-medium text-lg mb-3">
              {isEnglish
                ? 'Business formation and immigration are completely separate legal processes.'
                : 'Şirket kurulumu ve göçmenlik tamamen ayrı hukuki süreçlerdir.'}
            </p>
            <p className="text-red-800">
              {isEnglish
                ? 'An LLC is a business structure. A visa is an immigration status. One does not lead to the other automatically.'
                : 'LLC bir iş yapısıdır. Vize bir göçmenlik statüsüdür. Biri otomatik olarak diğerine yol açmaz.'}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
              {isEnglish
                ? 'This is general information only, not immigration advice. Immigration law is complex and changes frequently. Consult a licensed immigration attorney for your specific situation.'
                : 'Bu yalnızca genel bilgidir, göçmenlik tavsiyesi değildir. Göçmenlik hukuku karmaşıktır ve sık sık değişir. Özel durumunuz için lisanslı bir göçmenlik avukatına danışın.'}
            </p>
          </div>

          {/* Main Content */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'What an LLC Actually Does' : 'LLC Gerçekte Ne Yapar'}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isEnglish
                ? 'An LLC (Limited Liability Company) is a business structure that:'
                : 'LLC (Sınırlı Sorumlu Şirket) şunları yapan bir iş yapısıdır:'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>{isEnglish ? 'Provides limited liability protection for business owners' : 'İşletme sahipleri için sınırlı sorumluluk koruması sağlar'}</li>
              <li>{isEnglish ? 'Allows you to conduct business in the US' : 'ABD\'de iş yapmanıza izin verir'}</li>
              <li>{isEnglish ? 'Enables opening US bank accounts (with proper documentation)' : 'ABD banka hesapları açmanızı sağlar (uygun belgelerle)'}</li>
              <li>{isEnglish ? 'Creates a legal entity separate from you personally' : 'Sizden kişisel olarak ayrı bir tüzel kişilik oluşturur'}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {isEnglish
                ? 'What it does NOT do: grant you the right to live in, work in, or travel to the United States.'
                : 'Yapmadığı şey: ABD\'de yaşama, çalışma veya ABD\'ye seyahat etme hakkı vermek.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Common Confusions' : 'Yaygın Karışıklıklar'}
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? '"I heard I can get an E-2 visa with an LLC"' : '"LLC ile E-2 vizesi alabileceğimi duydum"'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'The E-2 visa requires a substantial investment in a US business, but the business alone doesn\'t qualify you. You must also: (1) be a citizen of a treaty country, (2) make a substantial investment, (3) be coming to the US to develop and direct the business, and (4) meet many other requirements. An LLC is just one piece of a much larger puzzle.'
                    : 'E-2 vizesi bir ABD işletmesine önemli bir yatırım gerektirir, ancak tek başına işletme sizi hak kazandırmaz. Ayrıca şunları yapmalısınız: (1) bir anlaşma ülkesi vatandaşı olmak, (2) önemli bir yatırım yapmak, (3) işi geliştirmek ve yönetmek için ABD\'ye gelmek ve (4) diğer birçok gereksinimi karşılamak. LLC çok daha büyük bir yapbozun sadece bir parçasıdır.'}
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? '"My LLC means I can work in the US"' : '"LLC\'m ABD\'de çalışabileceğim anlamına gelir"'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'Owning a US LLC does not give you work authorization. To work in the US, you need a work visa (H-1B, L-1, O-1, etc.) or other immigration status that permits employment. Operating your business remotely from outside the US is different from physically working inside the US.'
                    : 'ABD LLC\'ye sahip olmak size çalışma izni vermez. ABD\'de çalışmak için bir çalışma vizesine (H-1B, L-1, O-1, vb.) veya istihdama izin veren başka bir göçmenlik statüsüne ihtiyacınız var. İşletmenizi ABD dışından uzaktan yönetmek, ABD içinde fiziksel olarak çalışmaktan farklıdır.'}
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? '"Having US clients means I need an LLC and visa"' : '"ABD müşterilerim olması LLC ve vizeye ihtiyacım olduğu anlamına gelir"'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'You can have US clients and receive payments from US companies while remaining in your home country, without a US visa or LLC. Many international freelancers and businesses work with US clients remotely without any US immigration status.'
                    : 'Kendi ülkenizde kalırken, ABD vizesi veya LLC olmadan ABD müşterileriniz olabilir ve ABD şirketlerinden ödeme alabilirsiniz. Birçok uluslararası serbest çalışan ve işletme, herhangi bir ABD göçmenlik statüsü olmadan ABD müşterileriyle uzaktan çalışır.'}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'The Bottom Line' : 'Sonuç'}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-xl">📋</span>
                  <span>
                    <strong>{isEnglish ? 'LLC = Business structure' : 'LLC = İş yapısı'}</strong>
                    <br />
                    <span className="text-sm text-gray-600">{isEnglish ? 'A way to organize your business' : 'İşinizi organize etmenin bir yolu'}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🛂</span>
                  <span>
                    <strong>{isEnglish ? 'Visa = Immigration status' : 'Vize = Göçmenlik statüsü'}</strong>
                    <br />
                    <span className="text-sm text-gray-600">{isEnglish ? 'Permission to enter/stay/work in the US' : 'ABD\'ye girme/kalma/çalışma izni'}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🔗</span>
                  <span>
                    <strong>{isEnglish ? 'They are separate' : 'Bunlar ayrı şeylerdir'}</strong>
                    <br />
                    <span className="text-sm text-gray-600">{isEnglish ? 'One does not automatically lead to the other' : 'Biri otomatik olarak diğerine yol açmaz'}</span>
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Product CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              {isEnglish ? 'Starting a US Business?' : 'ABD\'de İş mi Kuruyorsunuz?'}
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
              {isEnglish
                ? 'If you decide to form an LLC, you\'ll need proper business documents. Our starter kit includes essential contracts.'
                : 'LLC kurmaya karar verirseniz, uygun iş belgelerine ihtiyacınız olacak. Başlangıç kitimiz temel sözleşmeleri içerir.'}
            </p>
            <div className="text-center">
              <Link
                href={`/${lang}/legal-kits/business-starter`}
                className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
              >
                {isEnglish ? 'View Business Starter Kit →' : 'Business Starter Kit\'i Görüntüle →'}
              </Link>
            </div>
          </div>

          {/* Related */}
          <section>
            <h2 className="text-xl font-bold text-black mb-6">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'If you do decide to form an LLC' : 'LLC kurmaya karar verirseniz'}</p>
              </Link>
              <Link href={`/${lang}/library/hukuki-yanilgilar`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Hukuki Yanılgılar'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'More myths vs. facts' : 'Daha fazla mit ve gerçek'}</p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">{dict.disclaimer.global}</p>
          <p className="text-xs text-gray-400 mt-4">© 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}</p>
        </div>
      </footer>
    </div>
  )
}
