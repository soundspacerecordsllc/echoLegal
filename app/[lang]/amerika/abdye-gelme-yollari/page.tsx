// app/[lang]/amerika/abdye-gelme-yollari/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { visaCategories } from '@/lib/visa-categories'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'US Visa Categories for Turkish Nationals | EchoLegal'
      : "ABD'ye Gelme Yolları: Türk Vatandaşları İçin Vize Rehberi | EchoLegal",
    description: isEnglish
      ? 'Comprehensive guide to US non-immigrant visa categories for Turkish nationals. B-1/B-2, F-1, H-1B, L-1, E-2, O-1 visas explained with official USCIS references.'
      : "Türk vatandaşlarına yönelik ABD geçici vize kategorilerinin kapsamlı rehberi. B-1/B-2, F-1, H-1B, L-1, E-2 ve O-1 vizeleri resmi USCIS kaynaklarıyla ele alınmaktadır.",
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function VisaPathwaysPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/amerika`} className="hover:text-black">{isEnglish ? 'US Hub' : 'ABD Merkezi'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'Visa Pathways' : 'Vize Yolları'}</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold mb-4">
            🇺🇸 {isEnglish ? 'Immigration Reference' : 'Göçmenlik Referansı'}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            {isEnglish
              ? 'US Visa Categories'
              : "ABD'ye Gelme Yolları"}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            {isEnglish
              ? 'A comprehensive reference to non-immigrant visa categories relevant to Turkish nationals. Each category has specific requirements, limitations, and pathways.'
              : 'Türk vatandaşlarını ilgilendiren geçici (non-immigrant) vize kategorilerinin kapsamlı bir özeti. Her kategorinin kendine özgü şartları, sınırları ve izlediği yol farklıdır.'}
          </p>
        </div>

        {/* Official Source */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span>🏛️</span>
            {isEnglish ? 'Official Source' : 'Resmi Kaynak'}
          </h3>
          <p className="text-sm text-blue-800 mb-3">
            {isEnglish
              ? 'Information on this page is referenced from U.S. Citizenship and Immigration Services (USCIS) and the U.S. Department of State. Always verify current requirements on official government websites.'
              : 'Bu sayfadaki bilgiler USCIS (ABD Vatandaşlık ve Göçmenlik Hizmetleri) ile ABD Dışişleri Bakanlığı kaynaklarına dayanmaktadır. Güncel koşulları mutlaka resmi kurumların sitelerinden teyit edin.'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://www.uscis.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium hover:underline"
            >
              uscis.gov →
            </a>
            <a
              href="https://travel.state.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium hover:underline"
            >
              travel.state.gov →
            </a>
          </div>
        </div>

        {/* Critical Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
            {isEnglish
              ? 'This page provides general legal information only, not immigration advice. Immigration law is complex and individual circumstances vary significantly. Consult a licensed immigration attorney for guidance on your specific situation.'
              : 'Bu sayfa yalnızca genel bilgi amaçlıdır; göçmenlik danışmanlığı yerine geçmez. Göçmenlik hukuku karmaşıktır ve her başvuranın koşulları birbirinden farklıdır. Kendi durumunuz için mutlaka lisanslı bir göçmenlik avukatına başvurun.'}
          </p>
        </div>

        {/* Visa Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Non-Immigrant Visa Categories' : 'Geçici (Non-Immigrant) Vize Kategorileri'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {visaCategories.map((visa) => (
              <Link
                key={visa.slug}
                href={`/${lang}/amerika/vizeler/${visa.slug}`}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{visa.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono font-bold">
                        {visa.code}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#C9A227] transition-colors">
                      {isEnglish ? visa.titleEn : visa.titleTr}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {isEnglish ? visa.shortDescEn : visa.shortDescTr}
                    </p>
                    <span className="text-[#C9A227] font-medium text-sm">
                      {isEnglish ? 'View Full Details →' : 'Detayları Görüntüle →'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Key Understanding */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Key Concepts' : 'Temel Kavramlar'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-3">
                {isEnglish ? 'Non-Immigrant vs. Immigrant' : 'Geçici Vize ile Göçmen Vizesi Farkı'}
              </h3>
              <p className="text-sm text-gray-700">
                {isEnglish
                  ? 'Non-immigrant visas are for temporary stays with a specific purpose. Immigrant visas (green cards) are for permanent residence. Most non-immigrant visas require demonstrating intent to return home.'
                  : 'Geçici vizeler belirli bir amaçla sınırlı süreli kalış hakkı tanır. Göçmen vizeleri (yeşil kart) ise kalıcı oturum içindir. Geçici vize sahiplerinin çoğundan ülkelerine dönme niyetini kanıtlaması beklenir.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-3">
                {isEnglish ? 'Dual Intent' : 'Çifte Niyet'}
              </h3>
              <p className="text-sm text-gray-700">
                {isEnglish
                  ? 'Some visas (H-1B, L-1, O-1) allow "dual intent"—you can maintain the visa while pursuing permanent residence. Others (B, F) do not, and applying for a green card may affect your status.'
                  : 'H-1B, L-1 ve O-1 gibi bazı vizeler "çifte niyet" ilkesini kabul eder; yani kalıcı oturum başvurusu yaparken mevcut vize statünüzü koruyabilirsiniz. B ve F gibi vizelerde ise bu mümkün değildir ve yeşil kart başvurusu statünüzü tehlikeye atabilir.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-3">
                {isEnglish ? 'Status vs. Visa' : 'Statü vs. Vize'}
              </h3>
              <p className="text-sm text-gray-700">
                {isEnglish
                  ? 'A visa is for entry; status is what allows you to remain. Your visa can expire while you\'re in the US legally. Check your I-94 for your authorized stay period, not your visa sticker.'
                  : 'Vize ABD\'ye girişinizi sağlar; statü ise kalma hakkınızı belirler. ABD\'de yasal olarak bulunurken vize süreniz dolabilir. Kalış sürenizi vize etiketinden değil, I-94 belgenizden takip edin.'}
              </p>
            </div>
          </div>
        </section>

        {/* Turkey-Specific Note */}
        <section className="mb-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <span>🇹🇷</span>
              {isEnglish ? 'For Turkish Nationals' : 'Türk Vatandaşları İçin'}
            </h3>
            <p className="text-sm text-red-800 mb-4">
              {isEnglish
                ? 'Turkey has an E-2 Treaty Investor agreement with the United States, making Turkish citizens eligible for E-2 visas. This is a significant advantage for entrepreneurs, as many countries do not have this treaty relationship.'
                : 'Türkiye ile ABD arasında E-2 Yatırımcı Anlaşması bulunmaktadır. Bu anlaşma sayesinde Türk vatandaşları E-2 vizesine başvurabilir. Pek çok ülkenin bu imkana sahip olmadığı düşünüldüğünde, girişimciler açısından kayda değer bir avantajdır.'}
            </p>
            <Link
              href={`/${lang}/amerika/vizeler/e2`}
              className="text-red-700 font-medium hover:underline text-sm"
            >
              {isEnglish ? 'Learn about E-2 Visa →' : 'E-2 Vizesi Hakkında Bilgi Alın →'}
            </Link>
          </div>
        </section>

        {/* Review Schedule */}
        <div className="bg-gray-50 rounded-lg p-4 mb-10 text-sm text-gray-600">
          <p className="mb-1">
            <strong>{isEnglish ? 'Sources:' : 'Kaynaklar:'}</strong>{' '}
            <a href="https://www.uscis.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USCIS</a>,{' '}
            <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">U.S. Department of State</a>
          </p>
          <p><strong>{isEnglish ? 'Last reviewed:' : 'Son gözden geçirme:'}</strong> {isEnglish ? 'January 2026' : 'Ocak 2026'}</p>
          <p><strong>{isEnglish ? 'Next scheduled update:' : 'Sonraki planlanan güncelleme:'}</strong> {isEnglish ? 'April 2026' : 'Nisan 2026'}</p>
          <p className="mt-2 text-xs text-gray-500">
            {isEnglish
              ? 'Immigration regulations change frequently. Always verify current requirements on official government websites.'
              : 'Göçmenlik düzenlemeleri sık değişir. Güncel koşulları mutlaka resmi kurumların sitelerinden teyit edin.'}
          </p>
        </div>

        {/* Related Resources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-black mb-6">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href={`/${lang}/library/llc-vize-yanilgisi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'Common misconceptions about business and immigration' : 'İş ve göçmenlik hakkında sık yapılan hatalar'}</p>
            </Link>
            <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'If you decide to form a US business' : 'ABD işletmesi kurmaya karar verirseniz'}</p>
            </Link>
          </div>
        </section>

        {/* Editorial Resource Reference */}
        <section className="border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-700 mb-4">
            {isEnglish
              ? 'Documents commonly associated with this topic:'
              : 'Bu konuyla bağlantılı olarak sıklıkla ihtiyaç duyulan belgeler:'}
          </p>
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            <li>• {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</li>
            <li>• {isEnglish ? 'NDA (Non-Disclosure Agreement)' : 'Gizlilik Sözleşmesi (NDA)'}</li>
            <li>• {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}</li>
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link
              href={`/${lang}/legal-kits/business-starter`}
              className="text-[#C9A227] font-medium hover:underline text-sm"
            >
              {isEnglish ? 'ABD Business Starter Legal Kit →' : 'ABD Business Starter Legal Kit →'}
            </Link>
            <span className="text-xs text-gray-500">
              {isEnglish ? 'I support EchoLegal – $49 recommended' : 'EchoLegal\'i destekliyorum – önerilen tutar 49 $'}
            </span>
          </div>
        </section>
    </main>
  )
}
