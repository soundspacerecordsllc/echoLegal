// app/[lang]/abd-satis-vergisi-rehberi/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'US Sales Tax & Nexus Guide for Foreign Sellers | EchoLegal'
    : 'ABD Satış Vergisi ve Nexus Rehberi | EchoLegal'

  const description = isEnglish
    ? 'Understanding US sales tax obligations for international e-commerce. Economic nexus thresholds, state-by-state requirements, marketplace facilitator laws, and compliance strategies.'
    : 'Uluslararası e-ticaret için ABD satış vergisi yükümlülüklerini anlama. Ekonomik nexus eşikleri, eyalet bazında gereksinimler, pazar yeri kanunları ve uyum stratejileri.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-satis-vergisi-rehberi`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-satis-vergisi-rehberi',
        'tr': 'https://echo-legal.com/tr/abd-satis-vergisi-rehberi',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function SalesTaxGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'satis-vergisi-nedir', label: isEnglish ? 'What is US Sales Tax?' : 'ABD Satış Vergisi Nedir?' },
    { id: 'nexus-nedir', label: isEnglish ? 'Understanding Nexus' : 'Nexus\'u Anlamak' },
    { id: 'ekonomik-nexus', label: isEnglish ? 'Economic Nexus Thresholds' : 'Ekonomik Nexus Eşikleri' },
    { id: 'yabanci-saticilar', label: isEnglish ? 'Rules for Foreign Sellers' : 'Yabancı Satıcılar için Kurallar' },
    { id: 'marketplace', label: isEnglish ? 'Marketplace Facilitator Laws' : 'Pazar Yeri Kolaylaştırıcı Kanunları' },
    { id: 'kayit-sureci', label: isEnglish ? 'Registration Process' : 'Kayıt Süreci' },
    { id: 'yazilim-cozumleri', label: isEnglish ? 'Software Solutions' : 'Yazılım Çözümleri' },
    { id: 'vergisiz-eyaletler', label: isEnglish ? 'No Sales Tax States' : 'Satış Vergisi Olmayan Eyaletler' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'US Sales Tax & Nexus Guide for Foreign Sellers'
      : 'ABD Satış Vergisi ve Nexus Rehberi',
    author: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: '2026-01-25',
    dateModified: '2026-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/abd-satis-vergisi-rehberi`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'US Sales Tax Guide' : 'ABD Satış Vergisi Rehberi'}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-purple-50 text-purple-800 rounded-full text-sm font-semibold mb-4">
              🏷️ {isEnglish ? 'E-Commerce Tax' : 'E-Ticaret Vergisi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
              {isEnglish
                ? 'US Sales Tax & Nexus'
                : 'ABD Satış Vergisi ve Nexus'}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {isEnglish
                ? 'A practical guide to US sales tax for international sellers. Understand when you have tax obligations, how to register, and how to stay compliant when selling to US customers.'
                : 'Uluslararası satıcılar için ABD satış vergisi pratik rehberi. Ne zaman vergi yükümlülükleriniz olduğunu, nasıl kayıt yaptıracağınızı ve ABD müşterilerine satış yaparken nasıl uyumlu kalacağınızı anlayın.'}
            </p>
          </div>

          {/* Key Distinction */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <span>💡</span>
              {isEnglish ? 'Sales Tax vs Income Tax' : 'Satış Vergisi ve Gelir Vergisi Farkı'}
            </h3>
            <p className="text-sm text-blue-800">
              {isEnglish
                ? 'US sales tax is separate from income tax. Sales tax is collected from customers and remitted to states. Income tax is on your profits. This guide covers sales tax only. For income tax, see our IRS guide.'
                : 'ABD satış vergisi, gelir vergisinden ayrıdır. Satış vergisi müşterilerden tahsil edilir ve eyaletlere ödenir. Gelir vergisi karlarınız üzerindedir. Bu rehber yalnızca satış vergisini kapsar. Gelir vergisi için IRS rehberimize bakın.'}
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Contents' : 'İçindekiler'}</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tocItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-gray-600 hover:text-black flex items-center gap-2"
                >
                  <span className="text-gray-400">{index + 1}.</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {/* Satış Vergisi Nedir */}
            <section id="satis-vergisi-nedir" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'What is US Sales Tax?' : 'ABD Satış Vergisi Nedir?'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Unlike most countries with a national VAT, the United States has no federal sales tax. Instead, 45 states (plus DC) impose their own sales taxes. Each state sets its own rules, rates, and exemptions.'
                  : 'Ulusal KDV\'si olan çoğu ülkenin aksine, Amerika Birleşik Devletleri\'nin federal satış vergisi yoktur. Bunun yerine, 45 eyalet (artı DC) kendi satış vergilerini uygular. Her eyalet kendi kurallarını, oranlarını ve muafiyetlerini belirler.'}
              </p>

              <div className="bg-gray-50 rounded-lg p-5 my-6">
                <h5 className="font-semibold text-black mb-3">{isEnglish ? 'Key Differences from VAT' : 'KDV\'den Temel Farkları'}</h5>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>{isEnglish ? 'State-level, not national' : 'Ulusal değil, eyalet düzeyinde'}</li>
                  <li>{isEnglish ? 'Rates vary: 0% to 10%+ depending on state/locality' : 'Oranlar değişir: eyalet/yerelliğe göre %0 ile %10+'}</li>
                  <li>{isEnglish ? 'Collected at point of sale (not at each stage like VAT)' : 'Satış noktasında tahsil edilir (KDV gibi her aşamada değil)'}</li>
                  <li>{isEnglish ? 'No input tax credit mechanism' : 'Girdi vergisi kredisi mekanizması yok'}</li>
                  <li>{isEnglish ? 'Some states have local taxes on top of state tax' : 'Bazı eyaletlerde eyalet vergisinin üstünde yerel vergiler var'}</li>
                </ul>
              </div>
            </section>

            {/* Nexus Nedir */}
            <section id="nexus-nedir" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Understanding Nexus' : 'Nexus\'u Anlamak'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? '"Nexus" is the legal term for a sufficient connection to a state that creates a sales tax obligation. Without nexus in a state, you have no obligation to collect or remit sales tax there.'
                  : '"Nexus", bir eyaletle satış vergisi yükümlülüğü oluşturan yeterli bağlantı için kullanılan hukuki terimdir. Bir eyalette nexus olmadan, orada satış vergisi toplama veya ödeme yükümlülüğünüz yoktur.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Types of Nexus' : 'Nexus Türleri'}</h4>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Physical Nexus' : 'Fiziksel Nexus'}</h5>
                  <p className="text-sm text-gray-700">
                    {isEnglish
                      ? 'Having physical presence in a state: office, warehouse, employees, inventory stored at a fulfillment center (including Amazon FBA).'
                      : 'Bir eyalette fiziksel varlık: ofis, depo, çalışanlar, bir yerine getirme merkezinde saklanan envanter (Amazon FBA dahil).'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Economic Nexus' : 'Ekonomik Nexus'}</h5>
                  <p className="text-sm text-gray-700">
                    {isEnglish
                      ? 'Meeting sales thresholds in a state (typically $100,000 in sales or 200 transactions). This can apply even without physical presence.'
                      : 'Bir eyalette satış eşiklerini karşılamak (tipik olarak 100.000$ satış veya 200 işlem). Bu, fiziksel varlık olmasa bile geçerli olabilir.'}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                <p className="text-sm text-amber-800">
                  <strong>{isEnglish ? 'South Dakota v. Wayfair (2018):' : 'South Dakota v. Wayfair (2018):'}</strong>{' '}
                  {isEnglish
                    ? 'This Supreme Court decision allowed states to impose economic nexus on out-of-state sellers. Since then, most states have enacted economic nexus laws that can apply to foreign sellers.'
                    : 'Bu Yüksek Mahkeme kararı, eyaletlerin eyalet dışı satıcılara ekonomik nexus uygulamasına izin verdi. O zamandan beri, çoğu eyalet yabancı satıcılara uygulanabilecek ekonomik nexus yasaları çıkardı.'}
                </p>
              </div>
            </section>

            {/* Ekonomik Nexus */}
            <section id="ekonomik-nexus" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Economic Nexus Thresholds by State' : 'Eyalete Göre Ekonomik Nexus Eşikleri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Most states use a $100,000 sales OR 200 transactions threshold. However, thresholds vary and some states have dropped the transaction count.'
                  : 'Çoğu eyalet 100.000$ satış VEYA 200 işlem eşiği kullanır. Ancak eşikler değişir ve bazı eyaletler işlem sayısını kaldırdı.'}
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 my-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'State' : 'Eyalet'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Sales Threshold' : 'Satış Eşiği'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Transaction Threshold' : 'İşlem Eşiği'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Tax Rate' : 'Vergi Oranı'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">California</td>
                      <td className="px-4 py-3 text-sm border-b">$500,000</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'None' : 'Yok'}</td>
                      <td className="px-4 py-3 text-sm border-b">7.25% + {isEnglish ? 'local' : 'yerel'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">Texas</td>
                      <td className="px-4 py-3 text-sm border-b">$500,000</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'None' : 'Yok'}</td>
                      <td className="px-4 py-3 text-sm border-b">6.25% + {isEnglish ? 'local' : 'yerel'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">New York</td>
                      <td className="px-4 py-3 text-sm border-b">$500,000</td>
                      <td className="px-4 py-3 text-sm border-b">100</td>
                      <td className="px-4 py-3 text-sm border-b">4% + {isEnglish ? 'local' : 'yerel'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">Florida</td>
                      <td className="px-4 py-3 text-sm border-b">$100,000</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'None' : 'Yok'}</td>
                      <td className="px-4 py-3 text-sm border-b">6% + {isEnglish ? 'local' : 'yerel'}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">Pennsylvania</td>
                      <td className="px-4 py-3 text-sm border-b">$100,000</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'None' : 'Yok'}</td>
                      <td className="px-4 py-3 text-sm border-b">6%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Washington</td>
                      <td className="px-4 py-3 text-sm">$100,000</td>
                      <td className="px-4 py-3 text-sm">{isEnglish ? 'None' : 'Yok'}</td>
                      <td className="px-4 py-3 text-sm">6.5% + {isEnglish ? 'local' : 'yerel'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 italic">
                {isEnglish
                  ? 'Note: These are select examples. Thresholds can change. Always verify current requirements with official state sources.'
                  : 'Not: Bunlar seçilmiş örneklerdir. Eşikler değişebilir. Güncel gereksinimleri her zaman resmi eyalet kaynaklarından doğrulayın.'}
              </p>
            </section>

            {/* Yabancı Satıcılar */}
            <section id="yabanci-saticilar" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Rules for Foreign Sellers' : 'Yabancı Satıcılar için Kurallar'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'As a Turkish seller, you may have US sales tax obligations if you meet nexus thresholds, even without any physical presence in the US.'
                  : 'Türk bir satıcı olarak, ABD\'de herhangi bir fiziksel varlık olmasa bile nexus eşiklerini karşılarsanız ABD satış vergisi yükümlülükleriniz olabilir.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'When Foreign Sellers Have Nexus' : 'Yabancı Satıcıların Ne Zaman Nexus\'u Var'}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>{isEnglish ? 'Amazon FBA:' : 'Amazon FBA:'}</strong>{' '}
                  {isEnglish
                    ? 'If you use Fulfillment by Amazon, your inventory is stored in US warehouses. This creates physical nexus in states where your inventory is located.'
                    : 'Fulfillment by Amazon kullanıyorsanız, envanteriniz ABD depolarında saklanır. Bu, envanterinizin bulunduğu eyaletlerde fiziksel nexus oluşturur.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'High Sales Volume:' : 'Yüksek Satış Hacmi:'}</strong>{' '}
                  {isEnglish
                    ? 'Exceeding economic nexus thresholds in any state triggers collection obligations there.'
                    : 'Herhangi bir eyalette ekonomik nexus eşiklerini aşmak orada tahsilat yükümlülüklerini tetikler.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'US Warehouse/3PL:' : 'ABD Deposu/3PL:'}</strong>{' '}
                  {isEnglish
                    ? 'Using any third-party logistics provider in the US creates physical nexus in that state.'
                    : 'ABD\'de herhangi bir üçüncü taraf lojistik sağlayıcısı kullanmak o eyalette fiziksel nexus oluşturur.'}
                </li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                <p className="text-sm text-green-800">
                  <strong>{isEnglish ? 'Good News:' : 'İyi Haber:'}</strong>{' '}
                  {isEnglish
                    ? 'If you sell directly from Turkey (dropshipping, digital products, or international shipping) and don\'t meet economic nexus thresholds, you likely have no sales tax obligations.'
                    : 'Doğrudan Türkiye\'den satış yapıyorsanız (dropshipping, dijital ürünler veya uluslararası kargo) ve ekonomik nexus eşiklerini karşılamıyorsanız, muhtemelen satış vergisi yükümlülüğünüz yoktur.'}
                </p>
              </div>
            </section>

            {/* Marketplace */}
            <section id="marketplace" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Marketplace Facilitator Laws' : 'Pazar Yeri Kolaylaştırıcı Kanunları'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Most states have enacted "marketplace facilitator" laws that shift sales tax collection responsibility to the marketplace rather than individual sellers.'
                  : 'Çoğu eyalet, satış vergisi tahsilat sorumluluğunu bireysel satıcılardan pazar yerine aktaran "pazar yeri kolaylaştırıcı" yasaları çıkardı.'}
              </p>

              <div className="bg-blue-50 rounded-lg p-5 my-6">
                <h5 className="font-semibold text-blue-900 mb-3">{isEnglish ? 'What This Means for You' : 'Bu Sizin İçin Ne Anlama Geliyor'}</h5>
                <p className="text-sm text-blue-800 mb-3">
                  {isEnglish
                    ? 'If you sell through these marketplaces, they handle sales tax collection and remittance for you:'
                    : 'Bu pazar yerleri aracılığıyla satış yapıyorsanız, satış vergisi tahsilatını ve ödemesini sizin için hallediyorlar:'}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                  <li>Amazon</li>
                  <li>eBay</li>
                  <li>Etsy</li>
                  <li>Walmart Marketplace</li>
                  <li>Shopify ({isEnglish ? 'with their tax services' : 'vergi hizmetleriyle'})</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                <p className="text-sm text-amber-800">
                  <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                  {isEnglish
                    ? 'Marketplace facilitator laws cover sales made ON the marketplace. If you also sell through your own website, you are responsible for those sales tax obligations separately.'
                    : 'Pazar yeri kolaylaştırıcı yasaları, pazar yerinde yapılan satışları kapsar. Kendi web siteniz aracılığıyla da satış yapıyorsanız, bu satış vergisi yükümlülüklerinden ayrı olarak siz sorumlusunuz.'}
                </p>
              </div>
            </section>

            {/* Kayıt Süreci */}
            <section id="kayit-sureci" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Registration Process' : 'Kayıt Süreci'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'If you determine you have nexus in a state, you must register for a sales tax permit before collecting tax.'
                  : 'Bir eyalette nexus\'unuz olduğunu belirlerseniz, vergi toplamadan önce satış vergisi izni için kayıt yaptırmalısınız.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Steps to Register' : 'Kayıt Adımları'}</h4>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  <strong>{isEnglish ? 'Get an EIN:' : 'EIN Alın:'}</strong>{' '}
                  {isEnglish
                    ? 'You need a US Employer Identification Number. Foreign businesses can apply by mail using Form SS-4.'
                    : 'ABD İşveren Kimlik Numarasına ihtiyacınız var. Yabancı işletmeler Form SS-4 kullanarak posta ile başvurabilir.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Register in each nexus state:' : 'Her nexus eyaletinde kayıt olun:'}</strong>{' '}
                  {isEnglish
                    ? 'Each state has its own registration portal. Some participate in the Streamlined Sales Tax (SST) program for easier multi-state registration.'
                    : 'Her eyaletin kendi kayıt portalı vardır. Bazıları daha kolay çok eyaletli kayıt için Streamlined Sales Tax (SST) programına katılır.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Configure your software:' : 'Yazılımınızı yapılandırın:'}</strong>{' '}
                  {isEnglish
                    ? 'Set up your e-commerce platform to calculate and collect the correct tax rates.'
                    : 'E-ticaret platformunuzu doğru vergi oranlarını hesaplayacak ve toplayacak şekilde ayarlayın.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'File returns:' : 'Beyanname verin:'}</strong>{' '}
                  {isEnglish
                    ? 'Filing frequency varies by state (monthly, quarterly, or annually) based on your sales volume.'
                    : 'Beyanname sıklığı, satış hacminize göre eyalete göre değişir (aylık, üç aylık veya yıllık).'}
                </li>
              </ol>
            </section>

            {/* Yazılım Çözümleri */}
            <section id="yazilim-cozumleri" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Software Solutions' : 'Yazılım Çözümleri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Managing sales tax across multiple states manually is extremely difficult. These platforms automate calculation, collection, and filing:'
                  : 'Satış vergisini birden fazla eyalette manuel olarak yönetmek son derece zordur. Bu platformlar hesaplama, tahsilat ve beyanname vermeyi otomatikleştirir:'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">TaxJar</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    {isEnglish
                      ? 'Popular for small-medium businesses. Integrates with major platforms.'
                      : 'Küçük-orta işletmeler için popüler. Büyük platformlarla entegre olur.'}
                  </p>
                  <p className="text-xs text-gray-500">{isEnglish ? 'From $19/month' : 'Aylık 19$\'dan başlayan'}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Avalara</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    {isEnglish
                      ? 'Enterprise-grade solution. Comprehensive compliance tools.'
                      : 'Kurumsal düzeyde çözüm. Kapsamlı uyum araçları.'}
                  </p>
                  <p className="text-xs text-gray-500">{isEnglish ? 'Custom pricing' : 'Özel fiyatlandırma'}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Quaderno</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    {isEnglish
                      ? 'Good for digital products and SaaS. International focus.'
                      : 'Dijital ürünler ve SaaS için iyi. Uluslararası odak.'}
                  </p>
                  <p className="text-xs text-gray-500">{isEnglish ? 'From $49/month' : 'Aylık 49$\'dan başlayan'}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Stripe Tax</h5>
                  <p className="text-sm text-gray-700 mb-2">
                    {isEnglish
                      ? 'Built into Stripe. Simple for Stripe users.'
                      : 'Stripe\'a dahil. Stripe kullanıcıları için basit.'}
                  </p>
                  <p className="text-xs text-gray-500">0.5% {isEnglish ? 'per transaction' : 'işlem başına'}</p>
                </div>
              </div>
            </section>

            {/* Vergisiz Eyaletler */}
            <section id="vergisiz-eyaletler" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'States with No Sales Tax' : 'Satış Vergisi Olmayan Eyaletler'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Five states have no state-level sales tax. Sales to customers in these states generally do not require sales tax collection:'
                  : 'Beş eyalette eyalet düzeyinde satış vergisi yoktur. Bu eyaletlerdeki müşterilere satışlar genellikle satış vergisi tahsilatı gerektirmez:'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-6">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-green-800">Alaska*</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-green-800">Delaware</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-green-800">Montana</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-green-800">New Hampshire</span>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <span className="font-semibold text-green-800">Oregon</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic">
                {isEnglish
                  ? '*Alaska has no state sales tax but allows local municipalities to impose their own sales taxes.'
                  : '*Alaska\'da eyalet satış vergisi yoktur ancak yerel belediyelerin kendi satış vergilerini uygulamasına izin verir.'}
              </p>
            </section>

            {/* FAQ */}
            <section id="sss" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                {isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'Do I need to collect sales tax if I sell digital products?' : 'Dijital ürün satıyorsam satış vergisi toplamam gerekiyor mu?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'It depends on the state. Some states tax digital products (software, e-books, streaming), while others exempt them. You still need nexus in a state before any collection obligation applies.'
                      : 'Eyalete bağlıdır. Bazı eyaletler dijital ürünleri (yazılım, e-kitaplar, streaming) vergilendirir, diğerleri muaf tutar. Herhangi bir tahsilat yükümlülüğü uygulanmadan önce yine de bir eyalette nexus\'unuz olması gerekir.'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'What happens if I don\'t collect sales tax when required?' : 'Gerekli olduğunda satış vergisi toplamazsam ne olur?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'States can assess back taxes, penalties, and interest. They may also hold you personally liable. Some states offer voluntary disclosure programs with reduced penalties for businesses that come forward proactively.'
                      : 'Eyaletler geriye dönük vergi, ceza ve faiz değerlendirebilir. Ayrıca sizi kişisel olarak sorumlu tutabilirler. Bazı eyaletler, proaktif olarak öne çıkan işletmeler için azaltılmış cezalarla gönüllü açıklama programları sunar.'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'I use Amazon FBA. Do I have nexus in all 50 states?' : 'Amazon FBA kullanıyorum. 50 eyaletin hepsinde nexus\'um var mı?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Not necessarily in all 50, but likely in many. Amazon stores your inventory across their network of fulfillment centers. You have physical nexus in each state where your inventory is stored. Amazon does provide inventory placement reports.'
                      : 'Mutlaka 50\'nin hepsinde değil, ancak muhtemelen birçoğunda. Amazon envanterinizi yerine getirme merkezleri ağında saklar. Envanterinizin saklandığı her eyalette fiziksel nexus\'unuz var. Amazon envanter yerleştirme raporları sağlar.'}
                  </p>
                </div>

                <div className="pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'Do I need a US business entity to register for sales tax?' : 'Satış vergisi için kayıt yaptırmak için ABD işletme varlığına ihtiyacım var mı?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'No, you don\'t need a US LLC or corporation. Foreign businesses can register for sales tax permits in most states. However, you will need an EIN, and the registration process may require additional documentation for foreign entities.'
                      : 'Hayır, ABD LLC\'si veya şirketine ihtiyacınız yok. Yabancı işletmeler çoğu eyalette satış vergisi izinleri için kayıt yaptırabilir. Ancak bir EIN\'e ihtiyacınız olacak ve kayıt süreci yabancı kuruluşlar için ek belgeler gerektirebilir.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Related Guides */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Related Guides' : 'İlgili Rehberler'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-black">{isEnglish ? 'IRS & W-8/W-9 Guide' : 'IRS ve W-8/W-9 Rehberi'}</span>
                  <span className="block text-sm text-gray-600 mt-1">{isEnglish ? 'Income tax obligations (separate from sales tax)' : 'Gelir vergisi yükümlülükleri (satış vergisinden ayrı)'}</span>
                </Link>
                <Link
                  href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-black">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</span>
                  <span className="block text-sm text-gray-600 mt-1">{isEnglish ? 'Setting up a US business entity' : 'ABD işletme varlığı kurma'}</span>
                </Link>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Disclaimer' : 'Yasal Uyarı'}</p>
              <p>
                {isEnglish
                  ? 'This guide is for informational purposes only and does not constitute tax or legal advice. Sales tax laws vary by state and change frequently. Consult with a qualified tax professional for guidance specific to your situation.'
                  : 'Bu rehber yalnızca bilgilendirme amaçlıdır ve vergi veya hukuki tavsiye niteliği taşımaz. Satış vergisi yasaları eyalete göre değişir ve sık sık değişir. Durumunuza özel rehberlik için nitelikli bir vergi uzmanına danışın.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
