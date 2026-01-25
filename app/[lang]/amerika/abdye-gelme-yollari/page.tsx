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
      : "Türk vatandaşları için ABD göçmen olmayan vize kategorilerine kapsamlı rehber. B-1/B-2, F-1, H-1B, L-1, E-2, O-1 vizeleri resmi USCIS referanslarıyla açıklanmıştır.",
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
            <Link href={`/${lang}/amerika`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'US Hub' : 'ABD Merkezi'}
            </Link>
            <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Library' : 'Kütüphane'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika/abdye-gelme-yollari`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

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

          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
            {isEnglish
              ? 'US Visa Categories'
              : "ABD'ye Gelme Yolları"}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            {isEnglish
              ? 'A comprehensive reference to non-immigrant visa categories relevant to Turkish nationals. Each category has specific requirements, limitations, and pathways.'
              : 'Türk vatandaşlarıyla ilgili göçmen olmayan vize kategorilerine kapsamlı bir referans. Her kategori, kendine özgü gereksinimler, sınırlamalar ve yollara sahiptir.'}
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
              : 'Bu sayfadaki bilgiler ABD Vatandaşlık ve Göçmenlik Hizmetleri (USCIS) ve ABD Dışişleri Bakanlığı referans alınarak hazırlanmıştır. Güncel gereksinimleri her zaman resmi devlet web sitelerinden doğrulayın.'}
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
              : 'Bu sayfa yalnızca genel hukuki bilgi sağlar, göçmenlik tavsiyesi değildir. Göçmenlik hukuku karmaşıktır ve bireysel koşullar önemli ölçüde farklılık gösterir. Özel durumunuz için lisanslı bir göçmenlik avukatına danışın.'}
          </p>
        </div>

        {/* Visa Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Non-Immigrant Visa Categories' : 'Göçmen Olmayan Vize Kategorileri'}
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
                {isEnglish ? 'Non-Immigrant vs. Immigrant' : 'Göçmen Olmayan vs. Göçmen'}
              </h3>
              <p className="text-sm text-gray-700">
                {isEnglish
                  ? 'Non-immigrant visas are for temporary stays with a specific purpose. Immigrant visas (green cards) are for permanent residence. Most non-immigrant visas require demonstrating intent to return home.'
                  : 'Göçmen olmayan vizeler, belirli bir amaçla geçici kalışlar içindir. Göçmen vizeler (yeşil kartlar) kalıcı oturum içindir. Çoğu göçmen olmayan vize, eve dönme niyetinin gösterilmesini gerektirir.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-3">
                {isEnglish ? 'Dual Intent' : 'Çifte Niyet'}
              </h3>
              <p className="text-sm text-gray-700">
                {isEnglish
                  ? 'Some visas (H-1B, L-1, O-1) allow "dual intent"—you can maintain the visa while pursuing permanent residence. Others (B, F) do not, and applying for a green card may affect your status.'
                  : 'Bazı vizeler (H-1B, L-1, O-1) "çifte niyete" izin verir—kalıcı oturum takip ederken vizeyi koruyabilirsiniz. Diğerleri (B, F) izin vermez ve yeşil kart başvurusu statünüzü etkileyebilir.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-3">
                {isEnglish ? 'Status vs. Visa' : 'Statü vs. Vize'}
              </h3>
              <p className="text-sm text-gray-700">
                {isEnglish
                  ? 'A visa is for entry; status is what allows you to remain. Your visa can expire while you\'re in the US legally. Check your I-94 for your authorized stay period, not your visa sticker.'
                  : 'Vize giriş içindir; statü kalmanıza izin veren şeydir. ABD\'de yasal olarak bulunurken vizenizin süresi dolabilir. İzin verilen kalış süreniz için vize etiketinizi değil, I-94\'ünüzü kontrol edin.'}
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
                : 'Türkiye\'nin Amerika Birleşik Devletleri ile E-2 Yatırımcı Anlaşması vardır ve bu, Türk vatandaşlarını E-2 vizelerine uygun kılar. Bu, girişimciler için önemli bir avantajdır çünkü birçok ülkenin böyle bir anlaşma ilişkisi yoktur.'}
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
              : 'Göçmenlik düzenlemeleri sık sık değişir. Güncel gereksinimleri her zaman resmi devlet web sitelerinden doğrulayın.'}
          </p>
        </div>

        {/* Related Resources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-black mb-6">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href={`/${lang}/library/llc-vize-yanilgisi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'Common misconceptions about business and immigration' : 'İş ve göçmenlik hakkında yaygın yanılgılar'}</p>
            </Link>
            <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'If you decide to form a US business' : 'ABD işletmesi kurmaya karar verirseniz'}</p>
            </Link>
          </div>
        </section>

        {/* Editorial Resource Reference */}
        <section className="border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-700 mb-4">
            {isEnglish
              ? 'Documents commonly associated with this topic:'
              : 'Bu konuyla ilgili yaygın kullanılan başlangıç belgeleri:'}
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
              {isEnglish ? 'I support EchoLegal – $20 recommended' : 'EchoLegal\'i destekliyorum – 20$ önerilir'}
            </span>
          </div>
        </section>
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
