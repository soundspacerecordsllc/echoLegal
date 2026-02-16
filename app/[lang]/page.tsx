import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import HomeSearch from '@/components/HomeSearch'

export const metadata: Metadata = {
  title: 'EchoLegal — Legal Encyclopedia & Reference Platform',
  description:
    'A bilingual legal encyclopedia with professionally drafted reference articles, explanations, and templates. Structured for clarity, accuracy, and long-term use. Available in English and Turkish.',
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
      {/* Hero — Split Layout with Photo */}
      <section className="border-b border-gray-100">
        <div className="grid md:grid-cols-2 min-h-[70vh]">
          {/* Left - Image */}
          <div className="relative h-[40vh] md:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
              alt={isEnglish ? 'Legal documents on a desk' : 'Masadaki hukuki belgeler'}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight mb-8 text-gray-900 uppercase">
              {isEnglish ? (
                <>Legal<br />Knowledge<br />Should<br />Belong to<br />Everyone.</>
              ) : (
                <>Hukuki<br />Bilgi<br />Herkese<br />Ait<br />Olmalı.</>
              )}
            </h1>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 max-w-md">
              {isEnglish
                ? 'EchoLegal is a bilingual legal encyclopedia with professionally drafted reference articles, templates, and guides. Founded by a New York-licensed attorney with dual legal education in Turkey and the United States.'
                : 'EchoLegal, New York lisanslı ve Türkiye ile ABD\'de çifte hukuk eğitimi almış bir avukat tarafından kurulan iki dilli hukuk ansiklopedisidir. Profesyonelce hazırlanmış referans makaleleri, şablonlar ve rehberler içerir.'}
            </p>

            {/* Search */}
            <div className="max-w-md mb-8">
              <HomeSearch lang={lang} />
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/encyclopedia`}
                className="btn-secondary text-sm"
              >
                {isEnglish ? 'Browse Encyclopedia' : 'Ansiklopediyi İncele'}
              </Link>
              <Link
                href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
                className="btn-secondary text-sm"
              >
                {isEnglish ? 'View Templates' : 'Şablonları Gör'}
              </Link>
              <Link
                href={`/${lang}/amerika`}
                className="btn-secondary text-sm"
              >
                {isEnglish ? 'US Business Hub' : 'ABD İş Rehberi'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Content Areas */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 text-center">
            {isEnglish ? 'Core Reference Areas' : 'Temel Referans Alanları'}
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            {isEnglish
              ? 'Structured legal information across business formation, contracts, tax compliance, immigration, and consular procedures.'
              : 'Şirket kuruluşu, sözleşmeler, vergi uyumu, göçmenlik ve konsolosluk işlemleri alanlarında yapılandırılmış hukuki bilgi.'}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Pillar 1: LLC / Business */}
            <Link
              href={`/${lang}/amerika/abdde-llc-kurmak`}
              className="group card-elevated flex flex-col"
            >
              <p className="section-label">
                {isEnglish ? 'Pillar Guide' : 'Ana Rehber'}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'LLC Formation in the US' : 'ABD\'de LLC Kurmak'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {isEnglish
                  ? 'Comprehensive guide to forming an LLC as a non-resident. Entity types, state selection, compliance, and post-formation requirements.'
                  : 'Türkler için ABD\'de LLC kurma rehberi. Tüzel kişilik türleri, eyalet seçimi, uyum gereksinimleri ve kuruluş sonrası yükümlülükler.'}
              </p>
              <span className="text-xs text-gray-400 mt-auto block pt-2">
                {isEnglish ? 'US Federal & State Law' : 'ABD Federal ve Eyalet Hukuku'}
              </span>
            </Link>

            {/* Pillar 2: Contracts */}
            <Link
              href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`}
              className="group card-elevated flex flex-col"
            >
              <p className="section-label">
                {isEnglish ? 'Pillar Guide' : 'Ana Rehber'}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş Yapanlar İçin Sözleşmeler'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {isEnglish
                  ? 'What contracts exist, when each is needed, risks of operating without them, and how they interact across jurisdictions.'
                  : 'Hangi sözleşmeler var, her biri ne zaman gerekli, sözleşmesiz çalışmanın riskleri ve farklı yargı alanlarında etkileşimleri.'}
              </p>
              <span className="text-xs text-gray-400 mt-auto block pt-2">
                {isEnglish ? 'US · Turkey' : 'ABD · Türkiye'}
              </span>
            </Link>

            {/* Pillar 3: Tax */}
            <Link
              href={`/${lang}/amerika/irs-vergi-gercekleri`}
              className="group card-elevated flex flex-col"
            >
              <p className="section-label">
                {isEnglish ? 'Pillar Guide' : 'Ana Rehber'}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'IRS, Taxes & W-8 / W-9 Realities' : 'IRS, Vergi ve W-8 / W-9 Gerçekleri'}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {isEnglish
                  ? 'Tax residency, reporting obligations, FATCA/FBAR, treaty benefits, and common misconceptions for non-residents.'
                  : 'Vergi mukimliği, raporlama yükümlülükleri, FATCA/FBAR, anlaşma hakları ve mukim olmayanlar için yaygın yanılgılar.'}
              </p>
              <span className="text-xs text-gray-400 mt-auto block pt-2">
                {isEnglish ? 'US Federal Tax Law' : 'ABD Federal Vergi Hukuku'}
              </span>
            </Link>
          </div>

          {/* Secondary content areas */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href={`/${lang}/amerika/abdye-gelme-yollari`}
              className="group card-link"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'Immigration & Visas' : 'Göçmenlik ve Vizeler'}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {isEnglish
                  ? 'Visa categories, status changes, consular procedures, and pathways documented thoroughly.'
                  : 'Vize kategorileri, statü değişiklikleri, konsolosluk süreçleri ve yollar kapsamlı olarak belgelenmiştir.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/contracts`}
              className="group card-link"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'Template Library' : 'Şablon Kütüphanesi'}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {isEnglish
                  ? 'Professionally drafted contracts, agreements, and forms with annotations and usage guidance.'
                  : 'Profesyonelce hazırlanmış sözleşmeler, anlaşmalar ve formlar — açıklamalar ve kullanım rehberiyle.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/consular-documents`}
              className="group card-link"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors">
                {isEnglish ? 'Consular Procedures' : 'Konsolosluk İşlemleri'}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {isEnglish
                  ? 'Document requirements, official procedures, and checklists for Turkish consular services.'
                  : 'Türk konsolosluk hizmetleri için belge gereksinimleri, resmi prosedürler ve kontrol listeleri.'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-20 md:py-24 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-12 text-center">
            {isEnglish ? 'Browse by Content Type' : 'İçerik Türüne Göre İncele'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                {isEnglish
                  ? 'Reference articles explaining legal concepts, doctrines, and processes with precision and neutrality.'
                  : 'Hukuki kavramları, doktrinleri ve süreçleri hassasiyet ve tarafsızlıkla açıklayan referans makaleleri.'}
              </p>
              <Link
                href={`/${lang}/encyclopedia`}
                className="arrow-link"
              >
                {isEnglish ? 'Browse articles' : 'Makalelere göz at'}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Templates' : 'Şablonlar'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                {isEnglish
                  ? 'Professionally drafted legal documents — contracts, agreements, and forms — with usage guidance.'
                  : 'Profesyonelce hazırlanmış hukuki belgeler — sözleşmeler, anlaşmalar ve formlar — kullanım rehberiyle.'}
              </p>
              <Link
                href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
                className="arrow-link"
              >
                {isEnglish ? 'View templates' : 'Şablonları gör'}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Guides' : 'Rehberler'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                {isEnglish
                  ? 'Process-oriented explanations for navigating legal procedures and compliance matters.'
                  : 'Hukuki prosedürler ve uyum konularında yol gösterici süreç odaklı açıklamalar.'}
              </p>
              <Link
                href={`/${lang}/library`}
                className="arrow-link"
              >
                {isEnglish ? 'Read guides' : 'Rehberleri oku'}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                {isEnglish
                  ? 'Practical tools for document preparation, filing requirements, and procedural verification.'
                  : 'Belge hazırlama, dosyalama gereksinimleri ve prosedür doğrulama için pratik araçlar.'}
              </p>
              <Link
                href={`/${lang}/checklists`}
                className="arrow-link"
              >
                {isEnglish ? 'Use checklists' : 'Kontrol listelerini kullan'}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About & Credentials */}
      <section className="py-20 md:py-24 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label">
            {isEnglish ? 'About This Platform' : 'Bu Platform Hakkında'}
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {isEnglish ? 'Independent. Attorney-Founded. Open Access.' : 'Bağımsız. Avukat Tarafından Kurulmuş. Açık Erişim.'}
          </h2>
          <div className="text-gray-800 leading-relaxed space-y-4">
            <p>
              {isEnglish
                ? 'EchoLegal is an independent legal reference platform founded by a New York-licensed attorney with dual legal education in Turkey and the United States. All content is authored with attorney-level precision and reviewed for accuracy.'
                : 'EchoLegal, Türkiye ve Amerika Birleşik Devletleri\'nde çifte hukuk eğitimi almış, New York lisanslı bir avukat tarafından kurulan bağımsız bir hukuk referans platformudur. Tüm içerikler avukat düzeyinde hassasiyetle yazılmış ve doğruluk açısından gözden geçirilmiştir.'}
            </p>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Content is published for reference and educational purposes. It does not constitute legal advice and is not a substitute for consultation with a licensed attorney in the relevant jurisdiction.'
                : 'İçerik referans ve eğitim amaçlı yayınlanmaktadır. Hukuki tavsiye teşkil etmez ve ilgili yargı alanında lisanslı bir avukata danışmanın yerini tutmaz.'}
            </p>
          </div>
          <Link
            href={`/${lang}/about`}
            className="arrow-link mt-8"
          >
            {isEnglish ? 'About EchoLegal' : 'EchoLegal hakkında'}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600 mt-1">
                {isEnglish ? 'Templates' : 'Şablon'}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">80+</p>
              <p className="text-sm text-gray-600 mt-1">
                {isEnglish ? 'Reference Articles' : 'Referans Makale'}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600 mt-1">
                {isEnglish ? 'Languages' : 'Dil'}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">Open</p>
              <p className="text-sm text-gray-600 mt-1">
                {isEnglish ? 'Access' : 'Erişim'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            {isEnglish ? 'Legal Notice' : 'Hukuki Uyarı'}
          </p>
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
