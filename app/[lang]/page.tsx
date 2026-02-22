import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import HomeSearch from '@/components/HomeSearch'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'EchoLegal — Multilingual Legal Encyclopedia'
    : 'EchoLegal — Çok Dilli Hukuk Ansiklopedisi'

  const description = isEnglish
    ? 'A multilingual legal encyclopedia with professionally drafted reference articles, explanations, and templates. Structured for clarity, accuracy, and long-term use. Currently published in English and Turkish; designed for additional languages.'
    : 'Profesyonelce hazırlanmış referans makaleleri, açıklamalar ve şablonlar içeren çok dilli hukuk ansiklopedisi. Netlik, doğruluk ve uzun vadeli kullanım için yapılandırılmıştır. Şu anda İngilizce ve Türkçe yayımlanmaktadır; yeni dillere ölçeklenecek şekilde tasarlanmıştır.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}`,
      languages: {
        'en': 'https://echo-legal.com/en',
        'tr': 'https://echo-legal.com/tr',
        'x-default': 'https://echo-legal.com/en',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="bg-surface">
      {/* 1. Masthead — Text-only, search-centered */}
      <section className="section-spacing border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {isEnglish
              ? 'Multilingual Legal Encyclopedia'
              : 'Çok Dilli Hukuk Ansiklopedisi'}
          </h1>

          <p className="text-lg text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
            {isEnglish
              ? 'A multilingual legal reference system containing encyclopedia entries, document templates, and jurisdictional guides. Content is organized by authority hierarchy and maintained with version traceability.'
              : 'Ansiklopedi maddeleri, belge şablonları ve yargı alanı rehberlerini içeren çok dilli bir hukuk referans sistemi. İçerik otorite hiyerarşisine göre düzenlenmiş ve sürüm izlenebilirliğiyle sürdürülmektedir.'}
          </p>

          <p className="text-sm text-muted mb-10">
            {isEnglish
              ? 'Currently published in English and Turkish; designed for additional languages.'
              : 'Şu anda İngilizce ve Türkçe yayımlanmaktadır; yeni dillere ölçeklenecek şekilde tasarlanmıştır.'}
          </p>

          <div className="max-w-lg mx-auto">
            <HomeSearch lang={lang} />
          </div>
          <p className="text-xs text-stone-400 mt-4">
            {isEnglish
              ? 'Results ordered by authority hierarchy and jurisdiction. Deterministic ranking enforced.'
              : 'Sonuçlar otorite hiyerarşisi ve yargı alanına göre sıralanır. Belirleyici sıralama uygulanır.'}
          </p>
        </div>
      </section>

      {/* 2. Content Index — Four equal-weight text columns */}
      <section className="section-spacing border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-12 text-center">
            {isEnglish ? 'Reference Collection' : 'Referans Koleksiyonu'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-ink mb-2">
                {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
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
              <h3 className="text-base font-semibold text-ink mb-2">
                {isEnglish ? 'Templates' : 'Şablonlar'}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
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
              <h3 className="text-base font-semibold text-ink mb-2">
                {isEnglish ? 'Guides' : 'Rehberler'}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
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
              <h3 className="text-base font-semibold text-ink mb-2">
                {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
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

      {/* 3. Jurisdiction Coverage — Compact horizontal display */}
      <section className="py-14 md:py-18 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-xl font-semibold text-ink mb-8 text-center">
            {isEnglish ? 'Jurisdiction Coverage' : 'Yargı Alanı Kapsamı'}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-ink">US Federal</span>
              <span className="text-muted">{isEnglish ? 'Active' : 'Aktif'}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-ink">US — New York</span>
              <span className="text-muted">{isEnglish ? 'Active' : 'Aktif'}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-ink">US — California</span>
              <span className="text-muted">{isEnglish ? 'Active' : 'Aktif'}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-ink">EU</span>
              <span className="text-muted">{isEnglish ? 'Active' : 'Aktif'}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-ink">{isEnglish ? 'Turkey' : 'Türkiye'}</span>
              <span className="text-muted">{isEnglish ? 'Active' : 'Aktif'}</span>
            </div>
          </div>
          <p className="text-xs text-muted text-center mt-6">
            {isEnglish
              ? 'Published in English and Turkish. All content is jurisdiction-tagged.'
              : 'İngilizce ve Türkçe yayımlanmaktadır. Tüm içerik yargı alanı etiketlidir.'}
          </p>
        </div>
      </section>

      {/* 4. Editorial Methodology — Prominent, not buried */}
      <section className="section-spacing border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-6">
            {isEnglish ? 'Editorial Methodology' : 'Editoryal Metodoloji'}
          </h2>
          <div className="space-y-4 text-ink leading-relaxed">
            <p>
              {isEnglish
                ? 'Content is organized by authority hierarchy — statutes, regulations, official agency guidance, and judicial interpretation — and maintained in a neutral, descriptive register.'
                : 'İçerik otorite hiyerarşisine göre düzenlenmiştir — kanunlar, yönetmelikler, resmi kurum rehberliği ve yargısal yorum — ve tarafsız, betimleyici bir dilde sürdürülmektedir.'}
            </p>
            <p>
              {isEnglish
                ? 'Key entries carry version traceability (version number and last-reviewed date) and are periodically reviewed. Citations to primary sources are provided where relevant.'
                : 'Ana maddeler sürüm izlenebilirliği (sürüm numarası ve son inceleme tarihi) taşır ve düzenli olarak gözden geçirilir. Birincil kaynaklara yapılan atıflar ilgili yerlerde verilmektedir.'}
            </p>
            <p>
              {isEnglish
                ? 'EchoLegal is authored by a New York-licensed attorney with dual legal education in Turkey and the United States. Content is reviewed for legal accuracy and maintained independently.'
                : 'EchoLegal, Türkiye ve Amerika Birleşik Devletleri\'nde çifte hukuk eğitimi almış, New York lisanslı bir avukat tarafından yazılmaktadır. İçerik hukuki doğruluk açısından gözden geçirilmekte ve bağımsız olarak sürdürülmektedir.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Institutional Notice — Closing section */}
      <section className="bg-stone-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
            {isEnglish ? 'Legal Notice' : 'Hukuki Uyarı'}
          </p>
          <p className="text-sm text-stone-300 leading-relaxed max-w-2xl mx-auto">
            {isEnglish
              ? 'EchoLegal provides legal information for educational and reference purposes. This content does not constitute legal advice and does not create an attorney-client relationship. Laws vary by jurisdiction. Consult a licensed attorney for advice specific to your situation.'
              : 'EchoLegal, eğitim ve referans amaçlı hukuki bilgiler sunar. Bu içerik hukuki tavsiye teşkil etmez ve avukat-müvekkil ilişkisi oluşturmaz. Yasalar yargı alanlarına göre farklılık gösterir. Durumunuza özel tavsiye için lisanslı bir avukata danışın.'}
          </p>
        </div>
      </section>
    </div>
  )
}
