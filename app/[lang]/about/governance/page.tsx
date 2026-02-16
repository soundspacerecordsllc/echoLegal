// app/[lang]/about/governance/page.tsx

import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import GovernanceNav from '@/components/GovernanceNav'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Governance | EchoLegal'
    : 'Yönetişim | EchoLegal'

  const description = isEnglish
    ? 'Institutional governance framework for EchoLegal. Editorial authority, structural enforcement, and normative ordering principles.'
    : 'EchoLegal için kurumsal yönetişim çerçevesi. Editöryal otorite, yapısal uygulama ve normatif sıralama ilkeleri.'

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
      canonical: `https://echo-legal.com/${lang}/about/governance`,
      languages: {
        'en': 'https://echo-legal.com/en/about/governance',
        'tr': 'https://echo-legal.com/tr/about/governance',
        'x-default': 'https://echo-legal.com/en/about/governance',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda', href: `/${lang}/about` },
    { label: isEnglish ? 'Governance' : 'Yönetişim' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <GovernanceNav lang={lang} currentPath="/about/governance" />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Governance' : 'Yönetişim'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'Institutional principles governing EchoLegal\'s editorial operations, structural enforcement, and authority framework.'
            : 'EchoLegal\'ın editöryal faaliyetlerini, yapısal uygulamasını ve otorite çerçevesini yöneten kurumsal ilkeler.'}
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Overview' : 'Genel Bakış'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'EchoLegal operates under a governance framework designed to ensure editorial integrity, legal accuracy, and institutional continuity. This framework is articulated across the following documents:'
              : 'EchoLegal, editöryal bütünlüğü, hukuki doğruluğu ve kurumsal sürekliliği sağlamak için tasarlanmış bir yönetişim çerçevesi altında faaliyet gösterir. Bu çerçeve aşağıdaki belgelerde ifade edilmektedir:'}
          </p>
          <div className="bg-gray-50 rounded-lg p-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&ndash;</span>
              <p>
                <Link href={`/${lang}/about/charter`} className="text-gray-900 underline hover:opacity-60">
                  {isEnglish ? 'Institutional Charter' : 'Kurumsal Tüzük'}
                </Link>
                {isEnglish
                  ? ' — Mission, editorial independence, governance structure, and amendment procedures.'
                  : ' — Misyon, editöryal bağımsızlık, yönetişim yapısı ve değişiklik prosedürleri.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&ndash;</span>
              <p>
                <Link href={`/${lang}/about/editorial-policy`} className="text-gray-900 underline hover:opacity-60">
                  {isEnglish ? 'Editorial Policy' : 'Editöryal Politika'}
                </Link>
                {isEnglish
                  ? ' — Content standards, review schedules, and jurisdictional accuracy requirements.'
                  : ' — İçerik standartları, inceleme takvimleri ve yargı alanı doğruluk gereksinimleri.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&ndash;</span>
              <p>
                <Link href={`/${lang}/about/contributor-standards`} className="text-gray-900 underline hover:opacity-60">
                  {isEnglish ? 'Contributor Standards' : 'Katkıda Bulunan Standartları'}
                </Link>
                {isEnglish
                  ? ' — Eligibility, verification, editorial process, and citation standards.'
                  : ' — Uygunluk, doğrulama, editöryal süreç ve atıf standartları.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&ndash;</span>
              <p>
                <Link href={`/${lang}/about/corrections`} className="text-gray-900 underline hover:opacity-60">
                  {isEnglish ? 'Corrections Policy' : 'Düzeltme Politikası'}
                </Link>
                {isEnglish
                  ? ' — Error reporting and correction procedures.'
                  : ' — Hata raporlama ve düzeltme prosedürleri.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structural Authority Ordering */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Structural Authority Ordering' : 'Yapısal Otorite Sıralaması'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-900">
            <p className="text-gray-800">
              {isEnglish
                ? 'EchoLegal enforces structural authority ordering across all primary source disclosures. Authority precedence is not discretionary.'
                : 'EchoLegal, tüm birincil kaynak açıklamalarında yapısal otorite sıralaması uygular. Otorite önceliği ihtiyari değildir.'}
            </p>
          </div>
          <p>
            {isEnglish
              ? 'Sources cited in every entry are classified by their position in the normative hierarchy and presented in order of legal precedence: constitutional and statutory authority first, followed by implementing regulations, then administrative instruments, then guidance and publications. This ordering is enforced by the authority classification and canonical identifier systems described in the Charter (Article V) and Contributor Standards.'
              : 'Her maddede atıf yapılan kaynaklar, normatif hiyerarşideki konumlarına göre sınıflandırılır ve hukuki öncelik sırasına göre sunulur: önce anayasal ve yasal otorite, ardından uygulama yönetmelikleri, sonra idari araçlar, ardından rehberlik ve yayınlar. Bu sıralama, Tüzük (Madde V) ve Katkıda Bulunan Standartları\'nda açıklanan otorite sınıflandırması ve kanonik tanımlayıcı sistemleri tarafından uygulanır.'}
          </p>
        </div>
      </section>

      {/* Editorial Authority */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Editorial Authority' : 'Editöryal Otorite'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'Final editorial authority rests with the Editorial Director, a licensed attorney, as defined in the Institutional Charter (Article III, Section 1). Editorial decisions are made on the basis of legal accuracy and completeness. No commercial or external interest may override editorial standards.'
              : 'Nihai editöryal otorite, Kurumsal Tüzük\'te (Madde III, Bölüm 1) tanımlandığı şekliyle lisanslı bir avukat olan Editöryal Direktör\'de bulunur. Editöryal kararlar hukuki doğruluk ve bütünlük temelinde alınır. Hiçbir ticari veya dışsal çıkar editöryal standartların önüne geçemez.'}
          </p>
          <p>
            {isEnglish
              ? 'For the full governance structure, contributor tiers, and succession framework, refer to the Institutional Charter.'
              : 'Tam yönetişim yapısı, katkıda bulunan kademeleri ve halefiyet çerçevesi için Kurumsal Tüzük\'e bakınız.'}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Inquiries' : 'Sorular'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'Questions regarding EchoLegal\'s governance framework may be directed through the support page.'
            : 'EchoLegal\'ın yönetişim çerçevesine ilişkin sorular destek sayfası aracılığıyla iletilebilir.'}
        </p>
        <Link
          href={`/${lang}/support`}
          className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          {isEnglish ? 'Contact' : 'İletişim'}
        </Link>
      </section>
    </main>
  )
}
