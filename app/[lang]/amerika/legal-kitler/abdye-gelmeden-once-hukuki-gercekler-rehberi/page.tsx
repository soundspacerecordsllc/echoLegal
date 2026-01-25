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
      ? "Legal Realities Before Coming to the US - Guide | EchoLegal"
      : "ABD'ye Gelmeden Önce Hukuki Gerçekler Rehberi | EchoLegal",
    description: isEnglish
      ? "Essential legal realities and preparation checklist before coming to the US. Visa categories, immigrant intent, and status change rules."
      : "ABD'ye gelmeden önce bilinmesi gereken temel hukuki gerçekler ve hazırlık kontrol listesi.",
  }
}

export default async function PreArrivalGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const kit = getLegalKitBySlug('abdye-gelmeden-once-hukuki-gercekler-rehberi')

  const stripePaymentLink = kit?.stripeLink || 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/amerika`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Amerika Hub' : 'Amerika'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika/legal-kitler/abdye-gelmeden-once-hukuki-gercekler-rehberi`}
              className="border border-black rounded-full px-3 py-1 text-sm"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Legal Kits' : 'Legal Kitler', href: `/${lang}/amerika/legal-kitler` },
            { label: isEnglish ? 'Pre-Arrival Guide' : 'Gelmeden Önce Rehberi' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: US Federal Immigration Law' : 'Yargı Yetkisi: ABD Federal Göçmenlik Hukuku'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Legal Realities Before Coming to the US" : "ABD'ye Gelmeden Önce Hukuki Gerçekler Rehberi"}
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          {isEnglish
            ? "Essential legal realities and preparation checklist before traveling to the United States."
            : "ABD'ye gelmeden önce bilinmesi gereken temel hukuki gerçekler ve hazırlık kontrol listesi."}
        </p>

        {/* What's Included */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? "What's Included" : 'Neler Dahil'}
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <ul className="space-y-3">
              {(kit?.includes || [
                'Vize kategorileri karşılaştırma rehberi',
                'Göçmen niyeti ve 214(b) açıklaması',
                'Statü değişikliği kuralları özeti',
                'Giriş öncesi hazırlık kontrol listesi',
                'Yaygın hata ve riskler listesi'
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#C9A227] mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Key Topics Covered */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'Key Topics Covered' : 'Kapsanan Temel Konular'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-3">
                {isEnglish ? 'Visa Categories' : 'Vize Kategorileri'}
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• B-1/B-2 {isEnglish ? 'Tourist & Business Visas' : 'Turist & İş Vizeleri'}</li>
                <li>• F-1 {isEnglish ? 'Student Visa' : 'Öğrenci Vizesi'}</li>
                <li>• E-2 {isEnglish ? 'Treaty Investor' : 'Yatırımcı Vizesi'}</li>
                <li>• H-1B {isEnglish ? 'Specialty Occupation' : 'Uzmanlık Vizesi'}</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
              <h3 className="font-bold text-purple-900 mb-3">
                {isEnglish ? 'Immigrant Intent' : 'Göçmen Niyeti'}
              </h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• INA 214(b) {isEnglish ? 'presumption' : 'varsayımı'}</li>
                <li>• {isEnglish ? 'Dual intent visas' : 'Çifte niyet vizeleri'}</li>
                <li>• {isEnglish ? 'Ties to home country' : 'Ülke bağları'}</li>
                <li>• {isEnglish ? 'Denial reasons' : 'Red sebepleri'}</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-3">
                {isEnglish ? 'Status Change Rules' : 'Statü Değişikliği Kuralları'}
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• 30/60 {isEnglish ? 'day rule' : 'gün kuralı'}</li>
                <li>• {isEnglish ? 'Preconceived intent doctrine' : 'Önceden tasarlanmış niyet doktrini'}</li>
                <li>• {isEnglish ? 'Adjustment of Status basics' : 'Adjustment of Status temelleri'}</li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
              <h3 className="font-bold text-orange-900 mb-3">
                {isEnglish ? 'Common Mistakes' : 'Yaygın Hatalar'}
              </h3>
              <ul className="space-y-2 text-sm text-orange-800">
                <li>• {isEnglish ? 'Overstaying I-94' : 'I-94 süresini aşma'}</li>
                <li>• {isEnglish ? 'Working without authorization' : 'İzinsiz çalışma'}</li>
                <li>• {isEnglish ? 'Misrepresentation at interview' : 'Mülakatta yanlış beyan'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-900 mb-4">
                {isEnglish ? 'This Guide Is For' : 'Bu Rehber Kimin İçin'}
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                {(kit?.forWhom || [
                  "ABD'ye turist vizesiyle gelmeyi planlayanlar",
                  'Öğrenci vizesi başvurusu yapacaklar',
                  'İş amaçlı kısa süreli ziyaret planlayanlar'
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
                {isEnglish ? 'This Guide Is NOT For' : 'Bu Rehber Kimin İçin DEĞİL'}
              </h3>
              <ul className="space-y-2 text-sm text-red-800">
                {(kit?.notFor || [
                  'Vize başvurusu yapılmasını isteyenler',
                  'Mülakat hazırlığı için danışmanlık arayanlar',
                  'Red sonrası itiraz desteği bekleyenler'
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

        {/* Download Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              {isEnglish ? 'Get This Guide' : 'Bu Rehberi Edinin'}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {isEnglish ? 'Pay what you can. $20 recommended.' : 'Ödeyebildiğiniz kadar ödeyin. $20 önerilir.'}
            </p>

            <a
              href={stripePaymentLink}
              className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] transition-colors mb-3"
            >
              {isEnglish ? 'Pay $20 (Recommended)' : '$20 Öde (Önerilen)'}
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
                ? 'This guide provides general information only. It does not constitute legal advice or create an attorney-client relationship. Immigration law is complex and fact-specific. Consult a licensed immigration attorney for your specific situation.'
                : 'Bu rehber yalnızca genel bilgi sağlar. Hukuki tavsiye teşkil etmez veya avukat-müvekkil ilişkisi oluşturmaz. Göçmenlik hukuku karmaşık ve duruma özgüdür. Özel durumunuz için lisanslı bir göçmenlik avukatına danışın.'}
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
              href={`/${lang}/amerika/abdye-gelme-yollari`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Pathways to the US' : "ABD'ye Gelme Yolları"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/turist-vizesi-gercekleri`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Tourist Visa Realities' : 'Turist Vizesi Gerçekleri'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/statuden-statuye-gecis-gercekleri`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Status Change Realities' : 'Statüden Statüye Geçiş'}
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

        {/* Footer Disclaimer */}
        <div className="text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez.'}
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">
            © 2025 EchoLegal. {isEnglish
              ? 'Prepared under supervision of NY licensed attorney (Bar #5552336).'
              : 'NY lisanslı avukat gözetiminde hazırlanmıştır (Bar #5552336).'}
          </p>
        </div>
      </footer>
    </div>
  )
}
