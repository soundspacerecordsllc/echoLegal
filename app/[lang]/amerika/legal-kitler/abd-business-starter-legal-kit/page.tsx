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
      ? "US Business Starter Legal Kit - Templates & Guides | EchoLegal"
      : "ABD Business Starter Legal Kit - Şablonlar & Rehberler | EchoLegal",
    description: isEnglish
      ? "Essential legal templates and guides for starting a business in the US. LLC Operating Agreement, NDA, Service Agreement, and more."
      : "ABD'de iş kurmak için temel hukuki şablonlar ve rehberler. LLC Operating Agreement, NDA, Hizmet Sözleşmesi ve daha fazlası.",
  }
}

export default async function BusinessStarterKitPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const kit = getLegalKitBySlug('abd-business-starter-legal-kit')

  const stripePaymentLink = kit?.stripeLink || 'https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumb
        lang={lang}
        items={[
          { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
          { label: isEnglish ? 'Legal Kits' : 'Legal Kitler', href: `/${lang}/amerika/legal-kitler` },
          { label: 'Business Starter Kit' }
        ]}
      />

      <TrustStrip lang={lang} />

      <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
        {isEnglish ? 'Jurisdiction: United States (Delaware, Wyoming, NY focus)' : 'Yargi Yetkisi: ABD (Delaware, Wyoming, NY odakli)'}
      </span>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
        {isEnglish ? "US Business Starter Legal Kit" : "ABD Business Starter Legal Kit"}
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        {isEnglish
          ? "Essential legal templates and guides for starting a business in the United States."
          : "ABD'de iş kurmak için temel hukuki şablonlar ve rehberler."}
      </p>

      {/* What's Included */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {isEnglish ? "What's Included" : 'Neler Dahil'}
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <ul className="space-y-3">
            {(kit?.includes || [
              'LLC Operating Agreement şablonu (EN/TR)',
              'NDA şablonu (EN/TR)',
              'Independent Contractor Agreement şablonu (EN/TR)',
              'Service Agreement şablonu (EN/TR)',
              'EIN başvuru rehberi',
              'Eyalet seçim karşılaştırma tablosu'
            ]).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#C9A227] mt-1">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-900 mb-4">
              {isEnglish ? 'This Kit Is For' : 'Bu Kit Kimin İçin'}
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              {(kit?.forWhom || [
                "ABD'de LLC kurmayı planlayan girişimciler",
                'E-ticaret veya dijital hizmet sunacak kişiler',
                'Freelancer olarak ABD müşterilerine hizmet verenler'
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
              {isEnglish ? 'This Kit Is NOT For' : 'Bu Kit Kimin İçin DEĞİL'}
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              {(kit?.notFor || [
                'Vize veya göçmenlik danışmanlığı arayanlar',
                'Dava veya uyuşmazlık desteği isteyenler',
                'Bireysel hukuki temsil bekleyenler'
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

      {/* Jurisdiction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {isEnglish ? 'Jurisdiction Scope' : 'Yargı Yetkisi Kapsamı'}
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700">
            {kit?.jurisdiction || (isEnglish
              ? 'United States (Delaware, Wyoming, New York focus)'
              : 'ABD (Delaware, Wyoming, New York odaklı)')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {isEnglish
              ? 'Templates may require modification for use in other jurisdictions.'
              : 'Şablonlar diğer yargı alanlarında kullanım için değişiklik gerektirebilir.'}
          </p>
        </div>
      </section>

      {/* Download Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            {isEnglish ? 'Get This Kit' : 'Bu Kiti Edinin'}
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
              ? 'These templates are for informational purposes and self-serve use only. They do not constitute legal advice. Review and customize for your specific situation. Consult a licensed attorney for complex matters.'
              : 'Bu şablonlar yalnızca bilgilendirme amaçlı ve self-servis kullanım içindir. Hukuki tavsiye teşkil etmezler. Özel durumunuz için gözden geçirin ve özelleştirin. Karmaşık konular için lisanslı bir avukata danışın.'}
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
            href={`/${lang}/amerika/abdde-banka-hesabi`}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
          >
            <span className="font-medium text-gray-800">
              {isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı"}
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
            href={`/${lang}/amerika/irs-vergi-gercekleri`}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
          >
            <span className="font-medium text-gray-800">
              {isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri'}
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
