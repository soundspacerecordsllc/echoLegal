import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import { getLegalKitBySlug } from '@/lib/amerika-hub'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "TR-US Legal Bridge Mini Library - Complete Template Collection | EchoLegal"
      : "TR-US Legal Bridge Mini Library - Kapsamlı Şablon Koleksiyonu | EchoLegal",
    description: isEnglish
      ? "Comprehensive contract and guide library for doing business between Turkey and the US. All templates in English and Turkish."
      : "Türkiye-ABD arasında iş yapanlar için kapsamlı sözleşme ve rehber kütüphanesi. Tüm şablonlar İngilizce ve Türkçe.",
  }
}

export default async function TRUSBridgeLibraryPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const kit = getLegalKitBySlug('tr-us-legal-bridge-mini-library')

  const stripePaymentLink = kit?.stripeLink || 'https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Legal Kits' : 'Legal Kitler', href: `/${lang}/amerika/legal-kitler` },
            { label: 'TR-US Legal Bridge Library' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 rounded-full text-sm font-semibold mb-4">
          {isEnglish ? 'Jurisdiction: US + Turkey (Cross-Referenced)' : 'Yargı Yetkisi: ABD + Türkiye (Çapraz Referanslı)'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          TR-US Legal Bridge Mini Library
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          {isEnglish
            ? "The complete template and guide collection for those doing business between Turkey and the United States."
            : "Türkiye-ABD arasında iş yapanlar için kapsamlı şablon ve rehber koleksiyonu."}
        </p>

        {/* Value Proposition */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-50 to-blue-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isEnglish ? 'Everything You Need in One Package' : 'İhtiyacınız Olan Her Şey Tek Pakette'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-[#C9A227]">7+</div>
                <div className="text-sm text-gray-600">{isEnglish ? 'Contract Templates' : 'Sözleşme Şablonu'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A227]">EN/TR</div>
                <div className="text-sm text-gray-600">{isEnglish ? 'Bilingual Access' : 'İki Dilli Erişim'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#C9A227]">5+</div>
                <div className="text-sm text-gray-600">{isEnglish ? 'Reference Guides' : 'Referans Rehberi'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? "What's Included" : 'Neler Dahil'}
          </h2>

          <div className="space-y-4">
            {/* Contract Templates */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-[#C9A227]"></span>
                {isEnglish ? 'Contract Templates (All EN/TR)' : 'Sözleşme Şablonları (Tümü EN/TR)'}
              </h3>
              <ul className="grid md:grid-cols-2 gap-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span>LLC Operating Agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span>Non-Disclosure Agreement (NDA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span>Independent Contractor Agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span>Service Agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span>Terms of Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span>Privacy Policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span>Website Terms & Conditions</span>
                </li>
              </ul>
            </div>

            {/* Guides */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-[#C9A227]"></span>
                {isEnglish ? 'Reference Guides' : 'Referans Rehberleri'}
              </h3>
              <ul className="space-y-2">
                {(kit?.includes || [
                  'ABD Business Starter Kit içeriği',
                  'Göçmenlik rehberi',
                  'Vergi temelleri özeti',
                  'NY hukuku tercih rehberi',
                  'EIN başvuru rehberi',
                  'Eyalet seçim karşılaştırma tablosu'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C9A227]">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-900 mb-4">
                {isEnglish ? 'This Library Is For' : 'Bu Kütüphane Kimin İçin'}
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                {(kit?.forWhom || [
                  'Türkiye-ABD arasında düzenli iş yapanlar',
                  'Her iki ülkede de şirketi olanlar',
                  'Kapsamlı şablon kütüphanesi isteyenler'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-900 mb-4">
                {isEnglish ? 'This Library Is NOT For' : 'Bu Kütüphane Kimin İçin DEĞİL'}
              </h3>
              <ul className="space-y-2 text-sm text-red-800">
                {(kit?.notFor || [
                  'Tek seferlik basit ihtiyaçlar için',
                  'Hukuki temsil veya danışmanlık arayanlar',
                  'Dava veya uyuşmazlık desteği isteyenler'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why This Library */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'Why Choose This Library' : 'Neden Bu Kütüphane'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">{isEnglish ? 'Complete Coverage' : 'Tam Kapsam'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'All essential templates for starting and operating a US business as a Turkish national.'
                  : 'Türk vatandaşı olarak ABD işi kurmak ve işletmek için tüm temel şablonlar.'}
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">{isEnglish ? 'Bilingual Access' : 'İki Dilli Erişim'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Every template available in both English and Turkish for easy understanding.'
                  : 'Her şablon kolay anlaşılması için hem İngilizce hem Türkçe olarak mevcut.'}
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">{isEnglish ? 'NY Law Based' : 'NY Hukuku Temelli'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Contracts drafted with New York governing law, preferred in international transactions.'
                  : 'Sözleşmeler, uluslararası işlemlerde tercih edilen New York hukuku ile hazırlanmış.'}
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold mb-2">{isEnglish ? 'Cross-Referenced' : 'Çapraz Referanslı'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Guides explain relevant differences between US and Turkish legal concepts.'
                  : 'Rehberler ABD ve Türk hukuki kavramları arasındaki ilgili farkları açıklar.'}
              </p>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isEnglish ? 'Get the Complete Library' : 'Tam Kütüphaneyi Edinin'}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {isEnglish ? 'Pay what you can. $49 recommended.' : 'Ödeyebildiğiniz kadar ödeyin. $49 önerilir.'}
            </p>

            <a
              href={stripePaymentLink}
              className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] transition-colors mb-3"
            >
              {isEnglish ? 'Pay $49 (Recommended)' : '$49 Öde (Önerilen)'}
            </a>

            <a
              href={kit?.documentUrl || '#'}
              download
              className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors mb-4"
            >
              {isEnglish ? 'Download Free' : 'Ücretsiz İndir'}
            </a>

            <p className="text-center text-sm text-gray-500">
              {isEnglish
                ? 'Payment supports ongoing updates and bilingual access.'
                : 'Ödeme, sürekli güncellemeleri ve iki dilli erişimi destekler.'}
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 rounded-r-lg">
            <h3 className="font-bold text-amber-900 mb-2">
              {isEnglish ? 'Important Notice' : 'Önemli Bilgi'}
            </h3>
            <p className="text-sm text-amber-800">
              {isEnglish
                ? 'These templates and guides are for informational purposes and self-serve use only. They do not constitute legal advice. Review and customize for your specific situation. Consult a licensed attorney for complex matters.'
                : 'Bu şablonlar ve rehberler yalnızca bilgilendirme amaçlı ve self-servis kullanım içindir. Hukuki tavsiye teşkil etmezler. Özel durumunuz için gözden geçirin ve özelleştirin. Karmaşık konular için lisanslı bir avukata danışın.'}
            </p>
          </div>
        </section>

        {/* Related Pages */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/${lang}/amerika/abdde-llc-kurmak`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/ny-law-neden-tercih-edilir`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Why Choose NY Law' : 'NY Law Neden Tercih Edilir'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'All Contract Templates' : 'Tüm Sözleşme Şablonları'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/legal-kitler`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'All Legal Kits' : 'Tüm Legal Kitler'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* Institutional Licensing */}
        <section className="text-center text-sm text-gray-500 mb-8">
          <p>
            {isEnglish
              ? 'For institutional licensing inquiries, please contact via the platform.'
              : 'Kurumsal lisans sorguları için lütfen platform üzerinden iletişime geçin.'}
          </p>
        </section>

        {/* Footer Disclaimer */}
        <div className="text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez.'}
          </p>
        </div>
      </main>
  )
}
