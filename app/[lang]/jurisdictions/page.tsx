// app/[lang]/jurisdictions/page.tsx

import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import JurisdictionCard from '@/components/JurisdictionCard'
import {
  jurisdictions,
  Jurisdiction,
} from '@/lib/jurisdictions'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Jurisdiction Coverage | EchoLegal'
    : 'Yargı Alanı Kapsamı | EchoLegal'

  const description = isEnglish
    ? 'Jurisdictions covered by EchoLegal. Active jurisdictions with published legal content and jurisdictions in development.'
    : 'EchoLegal tarafından kapsanan yargı alanları. Yayınlanmış hukuki içeriğe sahip aktif yargı alanları ve geliştirme aşamasındaki yargı alanları.'

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
      canonical: `https://echo-legal.com/${lang}/jurisdictions`,
      languages: {
        'en': 'https://echo-legal.com/en/jurisdictions',
        'tr': 'https://echo-legal.com/tr/jurisdictions',
        'x-default': 'https://echo-legal.com/en/jurisdictions',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

// Content counts per active jurisdiction (approximation from existing registries)
const CONTENT_COUNTS: Record<string, number> = {
  US: 50,
  TR: 30,
}

function categorizeJurisdictions() {
  const all = Object.values(jurisdictions)

  const activeCountries = all.filter(
    j => j.isActive && j.type === 'country'
  )
  const activeStates = all.filter(
    j => j.isActive && j.type === 'state'
  )
  // Show inactive country-level and supranational jurisdictions that have flags
  // (these are the ones with real expansion intent, not GENERAL)
  const developing = all.filter(
    j => !j.isActive && (j.type === 'country' || j.type === 'supranational') && j.flag
  )

  return { activeCountries, activeStates, developing }
}

export default async function JurisdictionsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'Jurisdictions' : 'Yargı Alanları' },
  ]

  const { activeCountries, activeStates, developing } = categorizeJurisdictions()

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Jurisdiction Coverage' : 'Yargı Alanı Kapsamı'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'Legal jurisdictions covered by EchoLegal. Each active jurisdiction has published content reviewed by licensed attorneys admitted in that jurisdiction.'
            : 'EchoLegal tarafından kapsanan hukuki yargı alanları. Her aktif yargı alanı, o yargı alanında avukatlık yapmaya yetkili lisanslı avukatlar tarafından incelenmiş yayınlanmış içeriğe sahiptir.'}
        </p>
      </div>

      {/* Expansion Policy */}
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700 text-sm">
            {isEnglish
              ? 'EchoLegal expands to new jurisdictions only when it can do so with verified local expertise. A jurisdiction is activated when it has at least one verified attorney contributor, a designated editor, a minimum body of foundational content, and jurisdiction-specific disclaimers approved by the Editorial Director. See the Institutional Charter for the full activation requirements.'
              : 'EchoLegal, yeni yargı alanlarına yalnızca doğrulanmış yerel uzmanlıkla genişleyebildiğinde genişler. Bir yargı alanı, en az bir doğrulanmış avukat katkıda bulunan, atanmış bir editör, minimum bir temel içerik bütünü ve Editöryal Direktör tarafından onaylanan yargı alanına özgü feragatnamelere sahip olduğunda aktifleştirilir. Tam aktivasyon gereksinimleri için Kurumsal Tüzük\'e bakın.'}
          </p>
        </div>
      </section>

      {/* Active Jurisdictions — Countries */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Active Jurisdictions' : 'Aktif Yargı Alanları'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCountries.map((j) => (
            <JurisdictionCard
              key={j.code}
              jurisdiction={j}
              lang={lang}
              contentCount={CONTENT_COUNTS[j.code]}
            />
          ))}
        </div>
      </section>

      {/* Active States */}
      {activeStates.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'US State Coverage' : 'ABD Eyalet Kapsamı'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isEnglish
              ? 'The following US states have jurisdiction-specific content (in addition to federal coverage).'
              : 'Aşağıdaki ABD eyaletleri yargı alanına özgü içeriğe sahiptir (federal kapsamın yanı sıra).'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {activeStates.map((j) => (
              <div key={j.code} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {j.name[lang as 'en' | 'tr'] || j.name.en}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {j.shortName[lang as 'en' | 'tr'] || j.shortName.en}
                  {' · '}
                  {isEnglish ? 'Common Law' : 'Anglosakson Hukuku'}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* In Development */}
      {developing.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'In Development' : 'Geliştirme Aşamasında'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isEnglish
              ? 'The following jurisdictions are on the EchoLegal roadmap. Content is not yet available. Licensed attorneys in these jurisdictions who are interested in contributing may contact us through the support page.'
              : 'Aşağıdaki yargı alanları EchoLegal yol haritasındadır. İçerik henüz mevcut değildir. Bu yargı alanlarında katkıda bulunmak isteyen lisanslı avukatlar destek sayfası aracılığıyla bizimle iletişime geçebilir.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developing.map((j) => (
              <JurisdictionCard
                key={j.code}
                jurisdiction={j}
                lang={lang}
              />
            ))}
          </div>
        </section>
      )}

      {/* Contribute */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Expand Coverage' : 'Kapsamı Genişletin'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'EchoLegal is built by licensed attorneys. If you hold active bar admission in a jurisdiction not yet covered and are interested in contributing, review the Contributor Standards and contact us.'
            : 'EchoLegal lisanslı avukatlar tarafından oluşturulmaktadır. Henüz kapsanmayan bir yargı alanında aktif baro kaydınız varsa ve katkıda bulunmak istiyorsanız, Katkıda Bulunan Standartlarını inceleyin ve bizimle iletişime geçin.'}
        </p>
        <div className="flex gap-3 mt-4">
          <Link
            href={`/${lang}/about/contributor-standards`}
            className="inline-block px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            {isEnglish ? 'Contributor Standards' : 'Katkıda Bulunan Standartları'}
          </Link>
          <Link
            href={`/${lang}/support`}
            className="inline-block px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            {isEnglish ? 'Contact' : 'İletişim'}
          </Link>
        </div>
      </section>
    </main>
  )
}
