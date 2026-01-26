import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import { legalKits } from '@/lib/amerika-hub'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "Legal Kits - Curated Template & Guide Packages | EchoLegal"
      : "Legal Kitler - Derlenmiş Şablon & Rehber Paketleri | EchoLegal",
    description: isEnglish
      ? "Curated legal template and guide packages for US business and immigration. Pay what you can - $20 recommended."
      : "ABD iş ve göçmenlik için derlenmiş hukuki şablon ve rehber paketleri. Ödeyebildiğiniz kadar ödeyin - $20 önerilir.",
  }
}

export default async function LegalKitlerPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="bg-white">
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Legal Kits' : 'Legal Kitler' }
          ]}
        />

        <TrustStrip lang={lang} />

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Legal Kits" : "Legal Kitler"}
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          {isEnglish
            ? "Curated template and guide packages. Pay what you can - $20 recommended."
            : "Derlenmiş şablon ve rehber paketleri. Ödeyebildiğiniz kadar ödeyin - $20 önerilir."}
        </p>

        {/* Kits Grid */}
        <section className="mb-12">
          <div className="grid md:grid-cols-1 gap-6">
            {legalKits.map(kit => (
              <div
                key={kit.slug}
                className="border border-gray-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {isEnglish ? kit.titleEn : kit.titleTr}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {isEnglish ? kit.descriptionEn : kit.descriptionTr}
                    </p>

                    <div className="mb-4">
                      <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">
                        {isEnglish ? "What's Included" : 'Neler Dahil'}
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {kit.includes.slice(0, 4).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C9A227]">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {kit.includes.length > 4 && (
                          <li className="text-gray-500 italic">
                            +{kit.includes.length - 4} {isEnglish ? 'more items' : 'öğe daha'}
                          </li>
                        )}
                      </ul>
                    </div>

                    <p className="text-sm text-gray-500">
                      <span className="font-medium">{isEnglish ? 'Jurisdiction:' : 'Yargı Yetkisi:'}</span> {kit.jurisdiction}
                    </p>
                  </div>

                  <div className="flex flex-col items-stretch md:items-end gap-3 md:min-w-[200px]">
                    <div className="text-center md:text-right">
                      <span className="text-3xl font-bold">${kit.price}</span>
                      <span className="text-gray-500 text-sm ml-1">{isEnglish ? 'recommended' : 'önerilen'}</span>
                    </div>

                    <Link
                      href={`/${lang}/amerika/legal-kitler/${kit.slug}`}
                      className="block w-full bg-[#C9A227] text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
                    >
                      {isEnglish ? 'View Details' : 'Detayları Gör'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'How It Works' : 'Nasıl Çalışır'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#C9A227] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">{isEnglish ? 'Choose a Kit' : 'Bir Kit Seçin'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Select the kit that matches your needs"
                  : "İhtiyaçlarınıza uyan kiti seçin"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#C9A227] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">{isEnglish ? 'Pay What You Can' : 'Ödeyebildiğiniz Kadar Ödeyin'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "$20 recommended, or download free if needed"
                  : "$20 önerilir, veya gerekirse ücretsiz indirin"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#C9A227] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">{isEnglish ? 'Download & Customize' : 'İndirin & Özelleştirin'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Get instant access to templates and guides"
                  : "Şablonlara ve rehberlere anında erişin"}
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-12">
          <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 rounded-r-lg">
            <h3 className="font-bold text-amber-900 mb-2">
              {isEnglish ? 'Important Notice' : 'Önemli Bilgi'}
            </h3>
            <p className="text-sm text-amber-800">
              {isEnglish
                ? 'These kits provide templates and guides for self-serve use. They do not constitute legal advice or create an attorney-client relationship. Review and customize all materials for your specific situation. For complex matters, consult a licensed attorney.'
                : 'Bu kitler self-servis kullanım için şablonlar ve rehberler sağlar. Hukuki tavsiye teşkil etmez veya avukat-müvekkil ilişkisi oluşturmaz. Tüm materyalleri özel durumunuz için gözden geçirin ve özelleştirin. Karmaşık konular için lisanslı bir avukata danışın.'}
            </p>
          </div>
        </section>

        {/* Back to Hub */}
        <div className="text-center">
          <Link
            href={`/${lang}/amerika`}
            className="inline-block px-6 py-3 border border-gray-300 rounded-lg font-medium hover:border-[#C9A227] hover:text-[#C9A227] transition-colors"
          >
            ← {isEnglish ? 'Back to Amerika Hub' : 'Amerika Hub\'a Dön'}
          </Link>
        </div>
      </main>
    </div>
  )
}
