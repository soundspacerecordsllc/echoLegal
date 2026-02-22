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
    ? 'A multilingual legal reference system comprising encyclopedia entries, jurisdiction-tagged document templates, and procedural references. Organized by authority hierarchy with version traceability. Published in English and Turkish.'
    : 'Ansiklopedi maddeleri, yargı alanı etiketli belge şablonları ve prosedürel referanslar içeren çok dilli bir hukuk referans sistemi. Otorite hiyerarşisine göre düzenlenmiş, sürüm izlenebilirliğiyle sürdürülmektedir. İngilizce ve Türkçe yayımlanmaktadır.'

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
              ? 'A multilingual legal reference system providing structured encyclopedia entries, supplementary document templates, and jurisdiction-specific guidance. Content is organized by authority and jurisdiction, with maintained version traceability.'
              : 'Ansiklopedi maddeleri, tamamlayıcı belge şablonları ve yargı alanı referanslarını kapsayan çok dilli bir hukuk referans sistemi. İçerik otorite hiyerarşisine göre sınıflandırılmış, yargı alanı etiketli ve sürüm izlenebilirliğiyle sürdürülmektedir.'}
          </p>

          <p className="text-sm text-muted mb-10">
            {isEnglish
              ? 'Currently published in English and Turkish; designed for additional languages.'
              : 'Şu anda İngilizce ve Türkçe yayımlanmaktadır; yeni dillere ölçeklenecek şekilde tasarlanmıştır.'}
          </p>

          <div className="max-w-lg mx-auto">
            <HomeSearch lang={lang} />
          </div>
          <p className="sr-only">
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
                  ? 'Supplementary legal documents — contracts, agreements, and forms — jurisdiction-tagged and maintained separately from primary legal sources.'
                  : 'Tamamlayıcı hukuki belgeler — sözleşmeler, anlaşmalar ve formlar — yargı alanı etiketli, birincil hukuk kaynaklarından ayrı olarak sürdürülmektedir.'}
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
                {isEnglish ? 'Procedural References' : 'Prosedürel Referanslar'}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                {isEnglish
                  ? 'Procedural references covering legal processes, filing requirements, and jurisdictional compliance matters.'
                  : 'Hukuki süreçleri, dosyalama gereksinimlerini ve yargı alanlarına özgü uyum konularını kapsayan prosedürel referanslar.'}
              </p>
              <Link
                href={`/${lang}/library`}
                className="arrow-link"
              >
                {isEnglish ? 'View references' : 'Referansları görüntüle'}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-ink mb-2">
                {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                {isEnglish
                  ? 'Structured verification lists for document preparation, filing requirements, and procedural compliance.'
                  : 'Belge hazırlama, dosyalama gereksinimleri ve prosedürel uyum için yapılandırılmış doğrulama listeleri.'}
              </p>
              <Link
                href={`/${lang}/checklists`}
                className="arrow-link"
              >
                {isEnglish ? 'View checklists' : 'Kontrol listelerini görüntüle'}
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

    </div>
  )
}
