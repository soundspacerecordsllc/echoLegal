// app/[lang]/library/llc-vize-yanilgisi/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateScholarlyArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'

const PAGE_META = {
  slug: 'llc-vize-yanilgisi',
  datePublished: '2025-10-15',
  dateModified: '2026-01-25',
  version: '1.0',
  wordCount: 2000,
  citationKey: 'ecl-enc-00007',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'LLC ≠ Visa: Immigration Realities for Business Owners | EchoLegal'
      : 'LLC Kurmak Vize Vermez: İş Sahipleri İçin Göçmenlik Gerçekleri | EchoLegal',
    description: isEnglish
      ? 'Understanding the relationship between US business formation and immigration. Why forming an LLC does not grant visa or immigration benefits.'
      : 'ABD\'de şirket kuruluşu ile göçmenlik hukuku arasındaki ilişki. LLC kurmanın neden vize ya da oturma hakkı sağlamadığını açıklıyoruz.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/library/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/library/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'LLC ≠ Visa: Immigration Realities for Business Owners' : 'LLC Kurmak Vize Vermez: İş Sahipleri İçin Göçmenlik Gerçekleri',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/10/15',
      'citation_lastmod': '2026/01/25',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCVisaMythPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const primarySources = getPrimarySources('library-llc-vize-yanilgisi', isEnglish ? 'en' : 'tr')
  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'LLC ≠ Visa: Immigration Realities' : 'LLC Kurmak Vize Vermez: Göçmenlik Gerçekleri'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'LLC ≠ Visa: Immigration Realities for Business Owners' : 'LLC Kurmak Vize Vermez: İş Sahipleri İçin Göçmenlik Gerçekleri',
    abstractText: isEnglish
      ? 'Forming a US LLC does not grant any visa or immigration benefit. This article explains the separation between business formation and immigration law.'
      : 'ABD\'de LLC kurmak herhangi bir vize veya göçmenlik hakkı doğurmaz. Bu makale şirket kuruluşu ile göçmenlik hukuku arasındaki ayrımı açıklar.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['llc', 'visa', 'immigration', 'e-2', 'work-authorization', 'business-formation'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['LLC Formation', 'US Immigration', 'Business vs Immigration'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JsonLdScript data={[scholarlySchema, breadcrumbSchema]} />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'LLC ≠ Visa' : 'LLC ≠ Vize'}</span>
        </nav>

        <article>
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Immigration Reality' : 'Göçmenlik Gerçeği'}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
              {pageTitle}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {isEnglish
                ? 'One of the most common misconceptions among international entrepreneurs: forming a US LLC does not, by itself, grant any visa or immigration benefit.'
                : 'Yabancı girişimciler arasında en yaygın yanılgılardan biri budur: ABD\'de LLC kurmak, tek başına herhangi bir vize veya göçmenlik hakkı doğurmaz.'}
            </p>

            <InstitutionalBadge
              lang={lang}
              jurisdictions={['US']}
              lastReviewedAt={PAGE_META.dateModified}
              className="mb-4"
            />
          </header>

          {/* Critical Alert */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-10">
            <h2 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <span className="text-2xl font-bold text-red-700">!</span>
              {isEnglish ? 'Critical Understanding' : 'Dikkat Edilmesi Gereken Temel Nokta'}
            </h2>
            <p className="text-red-900 font-medium text-lg mb-3">
              {isEnglish
                ? 'Business formation and immigration are completely separate legal processes.'
                : 'Şirket kurulumu ve göçmenlik tamamen ayrı hukuki süreçlerdir.'}
            </p>
            <p className="text-red-800">
              {isEnglish
                ? 'An LLC is a business structure. A visa is an immigration status. One does not lead to the other automatically.'
                : 'LLC bir ticari yapıdır. Vize ise bir göçmenlik statüsüdür. Biri diğerini otomatik olarak doğurmaz.'}
            </p>
          </div>

          {/* Official Source */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <span></span>
              {isEnglish ? 'Official Source' : 'Resmi Kaynak'}
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              {isEnglish
                ? 'Immigration information on this page is referenced from the U.S. Citizenship and Immigration Services (USCIS), the authoritative source for US immigration policy.'
                : 'Bu sayfadaki göçmenlik bilgileri, ABD göçmenlik politikasının yetkili kaynağı olan ABD Vatandaşlık ve Göçmenlik Hizmetleri (USCIS) referans alınarak hazırlanmıştır.'}
            </p>
            <a
              href="https://www.uscis.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 font-medium hover:underline text-sm"
            >
              uscis.gov →
            </a>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
              {isEnglish
                ? 'This is general information only, not immigration advice. Immigration law is complex and changes frequently. Consult a licensed immigration attorney for your specific situation.'
                : 'Bu sayfa yalnızca genel bilgilendirme amaçlıdır; göçmenlik tavsiyesi niteliği taşımaz. Göçmenlik mevzuatı karmaşık ve değişkendir. Kendi durumunuz için mutlaka lisanslı bir göçmenlik avukatından hukuki destek alın.'}
            </p>
          </div>

          {/* Main Content */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'What an LLC Actually Does' : 'LLC Aslında Ne Sağlar'}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isEnglish
                ? 'An LLC (Limited Liability Company) is a business structure that:'
                : 'LLC (Limited Liability Company), aşağıdaki işlevleri yerine getiren bir ticari yapıdır:'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>{isEnglish ? 'Provides limited liability protection for business owners' : 'İşletme sahiplerine sınırlı sorumluluk güvencesi tanır'}</li>
              <li>{isEnglish ? 'Allows you to conduct business in the US' : 'ABD\'de ticari faaliyet yürütmenizi mümkün kılar'}</li>
              <li>{isEnglish ? 'Enables opening US bank accounts (with proper documentation)' : 'Gerekli belgelerle ABD\'de banka hesabı açabilmenizi sağlar'}</li>
              <li>{isEnglish ? 'Creates a legal entity separate from you personally' : 'Şahsınızdan ayrı bir tüzel kişilik oluşturur'}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {isEnglish
                ? 'What it does NOT do: grant you the right to live in, work in, or travel to the United States.'
                : 'LLC\'nin sağlamadığı şey: ABD\'de yaşama, çalışma veya ülkeye giriş hakkı.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Common Confusions' : 'Yaygın Karışıklıklar'}
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? '"I heard I can get an E-2 visa with an LLC"' : '"LLC ile E-2 vizesi alabileceğimi duydum"'}
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  {isEnglish
                    ? 'The E-2 visa requires a substantial investment in a US business, but the business alone doesn\'t qualify you. You must also: (1) be a citizen of a treaty country, (2) make a substantial investment, (3) be coming to the US to develop and direct the business, and (4) meet many other requirements. An LLC is just one piece of a much larger puzzle.'
                    : 'E-2 vizesi bir ABD işletmesine ciddi miktarda yatırım yapılmasını gerektirir; ancak salt işletme sahibi olmak vize hakkı doğurmaz. Ayrıca: (1) ABD ile yatırım anlaşması bulunan bir ülkenin vatandaşı olmalısınız, (2) kayda değer bir yatırım yapmalısınız, (3) işletmeyi bizzat yönetmek üzere ABD\'ye gelmelisiniz ve (4) çok sayıda ek koşulu karşılamalısınız. LLC, bu sürecin yalnızca bir parçasıdır.'}
                </p>
                <a
                  href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/e-2-treaty-investors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline"
                >
                  {isEnglish ? 'USCIS: E-2 Treaty Investors →' : 'USCIS: E-2 Yatırımcı Vizesi →'}
                </a>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? '"My LLC means I can work in the US"' : '"LLC\'m ABD\'de çalışabileceğim anlamına gelir"'}
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  {isEnglish
                    ? 'Owning a US LLC does not give you work authorization. To work in the US, you need a work visa (H-1B, L-1, O-1, etc.) or other immigration status that permits employment. Operating your business remotely from outside the US is different from physically working inside the US.'
                    : 'ABD\'de kurulu bir LLC\'ye sahip olmak, size çalışma izni vermez. ABD\'de fiilen çalışabilmek için çalışma vizesi (H-1B, L-1, O-1 vb.) ya da çalışmaya izin veren başka bir göçmenlik statüsü gerekir. İşletmenizi ABD dışından uzaktan yönetmek ile ABD sınırları içinde fiziken çalışmak farklı hukuki durumlardır.'}
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <a href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USCIS: H-1B →</a>
                  <a href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1a-intracompany-transferee-executive-or-manager" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USCIS: L-1 →</a>
                  <a href="https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USCIS: O-1 →</a>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? '"Having US clients means I need an LLC and visa"' : '"ABD müşterilerim olması LLC ve vizeye ihtiyacım olduğu anlamına gelir"'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'You can have US clients and receive payments from US companies while remaining in your home country, without a US visa or LLC. Many international freelancers and businesses work with US clients remotely without any US immigration status.'
                    : 'Kendi ülkenizde kalarak, ABD vizesi veya LLC olmaksızın ABD\'li müşterilerle çalışabilir ve ödeme alabilirsiniz. Dünya genelinde pek çok serbest çalışan ve işletme, herhangi bir ABD göçmenlik statüsüne sahip olmadan ABD müşterilerine uzaktan hizmet vermektedir.'}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'The Bottom Line' : 'Sonuç'}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-xl"></span>
                  <span>
                    <strong>{isEnglish ? 'LLC = Business structure' : 'LLC = Ticari yapı'}</strong>
                    <br />
                    <span className="text-sm text-gray-600">{isEnglish ? 'A way to organize your business' : 'İşletmenizi hukuken yapılandırmanın bir yolu'}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🛂</span>
                  <span>
                    <strong>{isEnglish ? 'Visa = Immigration status' : 'Vize = Göçmenlik statüsü'}</strong>
                    <br />
                    <span className="text-sm text-gray-600">{isEnglish ? 'Permission to enter/stay/work in the US' : 'ABD\'ye girme/kalma/çalışma izni'}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl"></span>
                  <span>
                    <strong>{isEnglish ? 'They are separate' : 'Bunlar ayrı şeylerdir'}</strong>
                    <br />
                    <span className="text-sm text-gray-600">{isEnglish ? 'One does not automatically lead to the other' : 'Biri otomatik olarak diğerine yol açmaz'}</span>
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Review Schedule */}
          <div className="bg-gray-50 rounded-lg p-4 mb-10 text-sm text-gray-600">
            <p className="mb-1">
              <strong>{isEnglish ? 'Source:' : 'Kaynak:'}</strong>{' '}
              <a href="https://www.uscis.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">U.S. Citizenship and Immigration Services (uscis.gov)</a>
            </p>
            <p><strong>{isEnglish ? 'Last reviewed:' : 'Son gözden geçirme:'}</strong> {isEnglish ? 'January 2026' : 'Ocak 2026'}</p>
            <p><strong>{isEnglish ? 'Next scheduled update:' : 'Sonraki planlanan güncelleme:'}</strong> {isEnglish ? 'April 2026' : 'Nisan 2026'}</p>
            <p className="mt-2 text-xs text-gray-500">
              {isEnglish
                ? 'Immigration regulations change frequently. Always verify current requirements on uscis.gov.'
                : 'Göçmenlik mevzuatı sık değişir. Güncel koşulları her zaman uscis.gov üzerinden teyit edin.'}
            </p>
          </div>

          {/* Product CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              {isEnglish ? 'Starting a US Business?' : 'ABD\'de İş mi Kuruyorsunuz?'}
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
              {isEnglish
                ? 'If you decide to form an LLC, you\'ll need proper business documents. Our starter kit includes essential contracts.'
                : 'LLC kurmaya karar verdiğinizde, ticari faaliyetleriniz için gerekli hukuki belgelere ihtiyacınız olacak. Başlangıç kitimiz temel sözleşmeleri içerir.'}
            </p>
            <div className="text-center">
              <Link
                href={`/${lang}/legal-kits/business-starter`}
                className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
              >
                {isEnglish ? 'View Business Starter Kit →' : 'Business Starter Kit\'i Görüntüle →'}
              </Link>
            </div>
          </div>

          <PrimarySources sources={primarySources} lang={isEnglish ? 'en' : 'tr'} />

          {/* Related */}
          <section>
            <h2 className="text-xl font-bold text-black mb-6">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'If you do decide to form an LLC' : 'LLC kurmaya karar verirseniz'}</p>
              </Link>
              <Link href={`/${lang}/library/hukuki-yanilgilar`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Common Legal Misconceptions' : 'Sık Yapılan Hukuki Hatalar'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'More myths vs. facts' : 'Daha fazla mit ve gerçek'}</p>
              </Link>
            </div>
          </section>

          {/* Citation Block */}
          <CiteThisEntry
            lang={lang}
            title={isEnglish ? 'LLC ≠ Visa: Immigration Realities for Business Owners' : 'LLC Kurmak Vize Vermez: İş Sahipleri İçin Göçmenlik Gerçekleri'}
            url={pageUrl}
            version={PAGE_META.version}
            dateModified={PAGE_META.dateModified}
            citationKey={PAGE_META.citationKey}
          />
        </article>
      </main>
  )
}
