import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import HomeSearch from '@/components/HomeSearch'

export const metadata: Metadata = {
  title: 'EchoLegal | Legal Knowledge Should Belong to Everyone',
  description:
    'A global legal encyclopedia with professionally drafted reference articles, explanations, and templates. Structured for clarity, accuracy, and long-term use. Available in English and Turkish.',
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="bg-white">
      {/* Hero Section - Split Layout with Photo */}
      <section className="min-h-[calc(100vh-80px)] grid md:grid-cols-2">
        {/* Left - Image */}
        <div className="relative h-[50vh] md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
            alt="Legal documents"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-8 bg-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-black">
            {isEnglish ? (
              <>LEGAL<br />KNOWLEDGE<br />SHOULD<br />BELONG TO<br />EVERYONE.</>
            ) : (
              <>HUKUKİ<br />BİLGİ<br />HERKESİN<br />HAKKI<br />OLMALI.</>
            )}
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-3 max-w-md">
            {isEnglish
              ? 'EchoLegal is a global legal encyclopedia with professionally drafted reference articles, explanations, and templates in English and Turkish.'
              : 'EchoLegal, İngilizce ve Türkçe olarak profesyonelce hazırlanmış referans makaleleri, açıklamalar ve şablonlar içeren küresel bir hukuk ansiklopedisidir.'
            }
          </p>

          <p className="text-sm text-gray-500 mb-8 max-w-md">
            {isEnglish
              ? 'Structured for clarity, accuracy, and long-term reference use.'
              : 'Açıklık, doğruluk ve uzun vadeli referans kullanımı için yapılandırılmıştır.'
            }
          </p>

          {/* Search Bar */}
          <div className="mb-8 max-w-md">
            <HomeSearch lang={lang} />
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {isEnglish ? 'Start Exploring' : 'Keşfetmeye Başlayın'}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/encyclopedia`}
                className="text-sm font-medium px-4 py-2 border border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50 transition-colors text-gray-700"
              >
                {isEnglish ? 'Legal Knowledge' : 'Hukuki Bilgi'}
              </Link>
              <Link
                href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
                className="text-sm font-medium px-4 py-2 border border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50 transition-colors text-gray-700"
              >
                {isEnglish ? 'Templates' : 'Şablonlar'}
              </Link>
              <Link
                href={`/${lang}/library`}
                className="text-sm font-medium px-4 py-2 border border-gray-300 rounded hover:border-gray-400 hover:bg-gray-50 transition-colors text-gray-700"
              >
                {isEnglish ? 'Guides' : 'Rehberler'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What EchoLegal Contains */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Legal Knowledge */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isEnglish ? 'Legal Knowledge' : 'Hukuki Bilgi'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {isEnglish
                  ? 'Encyclopedic reference articles explaining legal concepts, doctrines, and processes with precision and neutrality.'
                  : 'Hukuki kavramları, doktrinleri ve süreçleri hassasiyet ve tarafsızlıkla açıklayan ansiklopedik referans makaleleri.'}
              </p>
              <Link
                href={`/${lang}/encyclopedia`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {isEnglish ? 'Browse articles →' : 'Makalelere göz at →'}
              </Link>
            </div>

            {/* Templates */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isEnglish ? 'Templates' : 'Şablonlar'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {isEnglish
                  ? 'Professionally drafted legal documents — contracts, agreements, and forms — with annotations and usage guidance.'
                  : 'Profesyonelce hazırlanmış hukuki belgeler — sözleşmeler, anlaşmalar ve formlar — açıklamalar ve kullanım rehberiyle birlikte.'}
              </p>
              <Link
                href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {isEnglish ? 'View templates →' : 'Şablonları gör →'}
              </Link>
            </div>

            {/* Guides */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isEnglish ? 'Guides' : 'Rehberler'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {isEnglish
                  ? 'Process-oriented explanations for navigating legal procedures, regulatory requirements, and compliance matters.'
                  : 'Hukuki prosedürler, düzenleyici gereklilikler ve uyum konularında yol gösterici süreç odaklı açıklamalar.'}
              </p>
              <Link
                href={`/${lang}/library`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {isEnglish ? 'Read guides →' : 'Rehberleri oku →'}
              </Link>
            </div>

            {/* Checklists */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {isEnglish
                  ? 'Practical operational tools for legal tasks — document preparation, filing requirements, and procedural steps.'
                  : 'Hukuki görevler için pratik operasyonel araçlar — belge hazırlama, dosyalama gereksinimleri ve prosedür adımları.'}
              </p>
              <Link
                href={`/${lang}/checklists`}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {isEnglish ? 'Use checklists →' : 'Kontrol listelerini kullan →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Subject */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10 text-center">
            {isEnglish ? 'Explore by Subject' : 'Konuya Göre Keşfet'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Business & Corporate */}
            <Link
              href={`/${lang}/amerika`}
              className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {isEnglish ? 'Business Formation' : 'Şirket Kuruluşu'}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {isEnglish
                  ? 'Entity structures, incorporation, LLCs, corporate governance, and business registration across jurisdictions.'
                  : 'Tüzel kişilik yapıları, kuruluş, LLC\'ler, kurumsal yönetim ve farklı yargı alanlarında işletme tescili.'}
              </p>
              <span className="text-xs text-gray-400">
                {isEnglish ? 'US · EU · TR · General' : 'ABD · AB · TR · Genel'}
              </span>
            </Link>

            {/* Contracts */}
            <Link
              href={`/${lang}/contracts`}
              className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {isEnglish ? 'Contracts & Agreements' : 'Sözleşmeler ve Anlaşmalar'}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {isEnglish
                  ? 'NDAs, service agreements, employment contracts, licensing, and commercial terms with detailed annotations.'
                  : 'NDA\'lar, hizmet sözleşmeleri, iş sözleşmeleri, lisanslama ve detaylı açıklamalarla ticari şartlar.'}
              </p>
              <span className="text-xs text-gray-400">
                {isEnglish ? 'US · General' : 'ABD · Genel'}
              </span>
            </Link>

            {/* Tax & Compliance */}
            <Link
              href={`/${lang}/library`}
              className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {isEnglish ? 'Tax & Compliance' : 'Vergi ve Uyum'}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {isEnglish
                  ? 'Tax forms, regulatory filings, reporting obligations, and compliance frameworks explained clearly.'
                  : 'Vergi formları, düzenleyici başvurular, raporlama yükümlülükleri ve uyum çerçeveleri açık bir şekilde açıklanmıştır.'}
              </p>
              <span className="text-xs text-gray-400">
                {isEnglish ? 'US · TR · General' : 'ABD · TR · Genel'}
              </span>
            </Link>

            {/* Immigration & Visas */}
            <Link
              href={`/${lang}/amerika/abdye-gelme-yollari`}
              className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {isEnglish ? 'Immigration & Visas' : 'Göçmenlik ve Vizeler'}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {isEnglish
                  ? 'Visa categories, immigration procedures, status changes, and consular processes documented thoroughly.'
                  : 'Vize kategorileri, göçmenlik prosedürleri, statü değişiklikleri ve konsolosluk süreçleri kapsamlı olarak belgelenmiştir.'}
              </p>
              <span className="text-xs text-gray-400">
                {isEnglish ? 'US · TR' : 'ABD · TR'}
              </span>
            </Link>

            {/* Consular Services */}
            <Link
              href={`/${lang}/consular-documents`}
              className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {isEnglish ? 'Consular Procedures' : 'Konsolosluk İşlemleri'}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {isEnglish
                  ? 'Document requirements, official procedures, and checklists for consular services and civil registrations.'
                  : 'Konsolosluk hizmetleri ve nüfus kayıtları için belge gereksinimleri, resmi prosedürler ve kontrol listeleri.'}
              </p>
              <span className="text-xs text-gray-400">
                {isEnglish ? 'TR Consular' : 'TR Konsolosluk'}
              </span>
            </Link>

            {/* Legal Kits */}
            <Link
              href={`/${lang}/legal-kits`}
              className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {isEnglish
                  ? 'Bundled document collections for specific legal use cases — business startup, compliance packages, and more.'
                  : 'Belirli hukuki kullanım durumları için paket belge koleksiyonları — iş kurulumu, uyum paketleri ve daha fazlası.'}
              </p>
              <span className="text-xs text-gray-400">
                {isEnglish ? 'Multi-jurisdiction' : 'Çok yargı alanlı'}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {isEnglish ? 'About This Platform' : 'Bu Platform Hakkında'}
          </h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              {isEnglish
                ? 'EchoLegal is an independent legal knowledge platform founded by a New York-licensed attorney with dual legal education in Turkey and the United States. The platform exists to make legal knowledge accessible, structured, and useful for anyone who needs it.'
                : 'EchoLegal, Türkiye ve Amerika Birleşik Devletleri\'nde çifte hukuk eğitimi almış, New York lisanslı bir avukat tarafından kurulan bağımsız bir hukuki bilgi platformudur. Platform, hukuki bilgiyi ihtiyacı olan herkes için erişilebilir, yapılandırılmış ve kullanışlı hale getirmek amacıyla var olmaktadır.'}
            </p>
            <p>
              {isEnglish
                ? 'All content is written with attorney-level precision and reviewed for accuracy. This is legal information for educational purposes — not legal advice, and not a substitute for consultation with a licensed attorney in your jurisdiction.'
                : 'Tüm içerikler avukat düzeyinde hassasiyetle yazılmış ve doğruluk açısından gözden geçirilmiştir. Bu, eğitim amaçlı hukuki bilgidir — hukuki tavsiye değildir ve kendi yargı alanınızda lisanslı bir avukata danışmanın yerini tutmaz.'}
            </p>
          </div>
          <Link
            href={`/${lang}/about`}
            className="inline-block mt-6 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            {isEnglish ? 'Learn more about EchoLegal →' : 'EchoLegal hakkında daha fazla bilgi →'}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl font-semibold text-gray-900">50+</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Templates' : 'Şablon'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">80+</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Articles' : 'Makale'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">2</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Languages' : 'Dil'}
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">∞</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Free Access' : 'Ücretsiz Erişim'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-sm text-gray-300 leading-relaxed">
            {isEnglish
              ? 'EchoLegal provides legal information for educational and reference purposes. This content does not constitute legal advice and does not create an attorney-client relationship. Laws vary by jurisdiction. Consult a licensed attorney for advice specific to your situation.'
              : 'EchoLegal, eğitim ve referans amaçlı hukuki bilgiler sunar. Bu içerik hukuki tavsiye teşkil etmez ve avukat-müvekkil ilişkisi oluşturmaz. Yasalar yargı alanlarına göre farklılık gösterir. Durumunuza özel tavsiye için lisanslı bir avukata danışın.'}
          </p>
        </div>
      </section>
    </div>
  )
}
