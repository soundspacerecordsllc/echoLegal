// app/[lang]/abd-de-llc-kurmak-turkler-icin-adim-adim/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { getArticleMetadata } from '@/lib/article-metadata'
import { getFeaturedSnippet } from '@/components/FeaturedSnippet'

const ARTICLE_SLUG = 'abd-de-llc-kurmak-turkler-icin-adim-adim'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How to Form an LLC in the US: Step-by-Step Guide for Turkish Entrepreneurs | EchoLegal'
    : 'ABD\'de LLC Kurmak: Türkler İçin Adım Adım Hukuki Rehber | EchoLegal'

  const description = isEnglish
    ? 'Complete legal guide for Turkish entrepreneurs forming an LLC in the United States. State selection, EIN, registered agent, bank account, and compliance requirements.'
    : 'Türk girişimciler için ABD\'de LLC kurma rehberi. Eyalet seçimi, EIN başvurusu, registered agent, banka hesabı açma ve uyum gereksinimleri.'

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
      canonical: `https://echo-legal.com/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-de-llc-kurmak-turkler-icin-adim-adim',
        'tr': 'https://echo-legal.com/tr/abd-de-llc-kurmak-turkler-icin-adim-adim',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'llc-nedir', label: isEnglish ? 'What is an LLC?' : 'LLC Nedir?' },
    { id: 'turkiye-mukimi-gercekler', label: isEnglish ? 'Key Realities for Turkish Residents' : 'Türkiye Mukimleri İçin Temel Gerçekler' },
    { id: 'adim-adim-surecler', label: isEnglish ? 'Step-by-Step Process' : 'Adım Adım Süreç' },
    { id: 'sik-yapilan-hatalar', label: isEnglish ? 'Common Mistakes' : 'Sık Yapılan Hatalar' },
    { id: 'belgeler-kontrol-listesi', label: isEnglish ? 'Document Checklist' : 'Belgeler Kontrol Listesi' },
    { id: 'sure-ve-maliyet', label: isEnglish ? 'Timeline & Costs' : 'Süre ve Maliyet' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
    { id: 'kaynaklar', label: isEnglish ? 'Sources' : 'Kaynaklar' },
  ]

  const articleMeta = getArticleMetadata(ARTICLE_SLUG)
  const featuredSnippet = getFeaturedSnippet(ARTICLE_SLUG)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'How to Form an LLC in the US: Step-by-Step Guide for Turkish Entrepreneurs'
      : 'ABD\'de LLC Kurmak: Türkler İçin Adım Adım Hukuki Rehber',
    author: {
      '@type': 'Person',
      name: 'Zeynep Ruziye Moore',
      jobTitle: 'Licensed in New York',
      affiliation: {
        '@type': 'Organization',
        name: 'EchoLegal',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: articleMeta?.datePublished || '2025-06-15',
    dateModified: articleMeta?.dateModified || '2026-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEnglish ? 'Home' : 'Ana Sayfa',
        item: `https://echo-legal.com/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEnglish ? 'Guides' : 'Rehberler',
        item: `https://echo-legal.com/${lang}/library`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi',
        item: `https://echo-legal.com/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Legal Guide' : 'Hukuki Rehber'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                {isEnglish
                  ? 'How to Form an LLC in the US: Step-by-Step Guide for Turkish Entrepreneurs'
                  : 'ABD\'de LLC Kurmak: Türkler İçin Adım Adım Hukuki Rehber'}
              </h1>

              <p className="text-base text-gray-600 mb-6">
                {isEnglish
                  ? 'Written for Turkish entrepreneurs and business owners evaluating LLC formation in the United States. This guide covers legal requirements — not marketing promises.'
                  : 'ABD\'de LLC kurmayı değerlendiren Türk girişimciler ve iş sahipleri için hazırlanmıştır. Pazarlama vaatleri değil, hukuki gereklilikleri ele alır.'}
              </p>

              {/* Authority signals */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Zeynep Ruziye Moore
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Updated: January 25, 2026' : 'Güncellendi: 25 Ocak 2026'}
                </span>
                <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Reviewed by a licensed attorney' : 'Lisanslı avukat tarafından incelendi'}
                </span>
              </div>

              {/* Featured snippet block */}
              {featuredSnippet && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed">
                    {featuredSnippet[lang]}
                  </p>
                </div>
              )}

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This guide explains the legal steps for forming a Limited Liability Company (LLC) in the United States, with particular attention to considerations for Turkish nationals and residents.'
                  : 'Bu rehber, ABD\'de Limited Liability Company (LLC) kurmanın hukuki adımlarını, özellikle Türk vatandaşları ve Türkiye mukimlerinin dikkat etmesi gereken hususlarla birlikte açıklamaktadır.'}
              </p>
            </header>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>{isEnglish ? 'Disclaimer:' : 'Uyarı:'}</strong>{' '}
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal advice. Consult a qualified attorney for your specific situation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır ve hukuki danışmanlık teşkil etmez. Kendi durumunuz için mutlaka uzman bir avukata danışın.'}
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-gray-50 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
              <ol className="space-y-2">
                {tocItems.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-black hover:underline">
                      {index + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1: LLC Nedir */}
            <section id="llc-nedir" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">{isEnglish ? '1. What is an LLC?' : '1. LLC Nedir?'}</h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <p>A Limited Liability Company (LLC) is a business structure under U.S. state law that combines the liability protection of a corporation with the tax flexibility of a partnership.</p>
                  <p><strong>Key characteristics:</strong></p>
                  <ul>
                    <li><strong>Limited liability:</strong> Members&apos; personal assets are generally protected from business debts and lawsuits.</li>
                    <li><strong>Pass-through taxation:</strong> By default, a single-member LLC is treated as a &quot;disregarded entity&quot; for federal tax purposes—meaning the LLC itself doesn&apos;t file a separate tax return; income passes through to the owner.</li>
                    <li><strong>Flexible management:</strong> Unlike corporations, LLCs have fewer formal requirements (no mandatory board meetings, annual minutes, etc.).</li>
                  </ul>
                  <p>LLCs are formed at the state level. Each state has its own formation requirements, fees, and ongoing compliance obligations.</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <p>Limited Liability Company (LLC), ABD eyalet hukuku kapsamında kurulan ve şirketin (corporation) sınırlı sorumluluk korumasını ortaklığın (partnership) vergi esnekliğiyle birleştiren bir işletme yapısıdır.</p>
                  <p><strong>Temel özellikleri:</strong></p>
                  <ul>
                    <li><strong>Sınırlı sorumluluk:</strong> Üyelerin kişisel varlıkları, işletme borçlarından ve davalardan kural olarak korunur.</li>
                    <li><strong>Geçişli vergilendirme (pass-through):</strong> Tek üyeli LLC, federal vergi açısından varsayılan olarak &quot;disregarded entity&quot; (dikkate alınmayan varlık) muamelesi görür. Bu, LLC&apos;nin ayrı vergi beyannamesi vermediği, gelirin doğrudan sahibine geçtiği anlamına gelir.</li>
                    <li><strong>Esnek yönetim:</strong> Corporation&apos;lardan farklı olarak LLC&apos;lerde zorunlu yönetim kurulu toplantısı, yıllık tutanak gibi biçimsel gereklilikler yoktur.</li>
                  </ul>
                  <p>LLC&apos;ler eyalet düzeyinde kurulur. Her eyaletin kendine özgü kuruluş gereksinimleri, harçları ve süregelen uyum yükümlülükleri vardır.</p>
                </div>
              )}
            </section>

            {/* Section 2: Türkiye Mukimleri İçin Temel Gerçekler */}
            <section id="turkiye-mukimi-gercekler" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. Key Realities for Turkish Residents' : '2. Türkiye Mukimleri İçin Temel Gerçekler'}
              </h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <p>If you are a Turkish citizen residing in Turkey (or elsewhere outside the US), there are specific considerations:</p>

                  <h3>EIN vs. ITIN vs. SSN</h3>
                  <ul>
                    <li><strong>EIN (Employer Identification Number):</strong> A tax ID for your LLC. Required for opening a US bank account and filing taxes. Non-residents can obtain an EIN by mail or fax using Form SS-4.</li>
                    <li><strong>ITIN (Individual Taxpayer Identification Number):</strong> A personal tax ID for individuals who cannot obtain an SSN. May be required for certain tax filings.</li>
                    <li><strong>SSN (Social Security Number):</strong> Only available to individuals authorized to work in the US.</li>
                  </ul>

                  <h3>US-Source Income</h3>
                  <p>Even without a US visa or physical presence, if your LLC earns income from US sources (US clients, US-based services), you may have US tax filing obligations. The US-Turkey tax treaty may provide certain benefits, but does not eliminate all requirements.</p>

                  <h3>LLC Does Not Grant Immigration Status</h3>
                  <p>A common misconception: forming an LLC does not provide any visa or immigration benefit. You cannot &quot;move to the US&quot; simply by forming an LLC. Immigration requires a separate legal pathway (E-2, L-1, etc.).</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <p>Türkiye&apos;de (veya ABD dışında başka bir yerde) ikamet eden bir Türk vatandaşıysanız, dikkat etmeniz gereken hususlar şunlardır:</p>

                  <h3>EIN, ITIN ve SSN Ayrımı</h3>
                  <ul>
                    <li><strong>EIN (Employer Identification Number):</strong> LLC&apos;niz için vergi kimlik numarası. ABD banka hesabı açmak ve vergi beyannamesi vermek için gereklidir. ABD dışındaki kişiler, SS-4 formunu posta veya faks yoluyla göndererek EIN alabilir.</li>
                    <li><strong>ITIN (Individual Taxpayer Identification Number):</strong> SSN alamayan bireyler için kişisel vergi kimlik numarası. Belirli vergi beyannameleri için gerekebilir.</li>
                    <li><strong>SSN (Social Security Number):</strong> Yalnızca ABD&apos;de çalışma izni olan kişilere verilir.</li>
                  </ul>

                  <h3>ABD Kaynaklı Gelir</h3>
                  <p>ABD vizesi veya fiziksel varlığınız olmasa bile, LLC&apos;niz ABD kaynaklı gelir elde ediyorsa (ABD&apos;li müşteriler, ABD merkezli hizmetler), ABD vergi beyannamesi verme yükümlülüğünüz doğabilir. ABD-Türkiye vergi anlaşması belirli avantajlar sağlayabilir ancak tüm gereklilikleri ortadan kaldırmaz.</p>

                  <h3>LLC Göçmenlik Statüsü Sağlamaz</h3>
                  <p>Yaygın bir yanılgı: LLC kurmak herhangi bir vize veya göçmenlik avantajı sağlamaz. Sadece LLC kurarak ABD&apos;ye yerleşemezsiniz. Göçmenlik için ayrı bir hukuki yol (E-2, L-1 vb.) gereklidir.</p>
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-5 mt-6">
                <p className="text-sm text-red-900 leading-relaxed font-medium">
                  {isEnglish
                    ? '⚠️ Important: Forming an LLC does NOT provide any immigration benefit. Do not rely on advice suggesting otherwise.'
                    : '⚠️ Önemli: LLC kurmak hiçbir göçmenlik avantajı sağlamaz. Aksini iddia eden tavsiyelere güvenmeyin.'}
                </p>
              </div>
            </section>

            {/* Section 3: Adım Adım Süreç */}
            <section id="adim-adim-surecler" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. Step-by-Step Process' : '3. Adım Adım Süreç'}
              </h2>

              {isEnglish ? (
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 1: Choose Your State</h3>
                    <p className="text-gray-700 mt-2">Delaware and Wyoming are popular for their business-friendly laws and privacy protections. However, if you will conduct business primarily in one state, forming there may be simpler. Each state has different fees and requirements.</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Delaware: $90 filing fee, $300/year franchise tax (minimum)</li>
                      <li>Wyoming: $100 filing fee, $60/year annual report</li>
                      <li>New Mexico: $50 filing fee, no annual report requirement</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 2: Appoint a Registered Agent</h3>
                    <p className="text-gray-700 mt-2">Every LLC must have a registered agent with a physical address in the formation state. This agent receives legal documents on behalf of your LLC. Commercial registered agent services typically cost $50-300/year.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 3: File Articles of Organization</h3>
                    <p className="text-gray-700 mt-2">Submit formation documents to the state. This can usually be done online. Processing time varies: some states offer same-day processing for an additional fee; others take 1-2 weeks.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 4: Obtain an EIN</h3>
                    <p className="text-gray-700 mt-2">Apply for an Employer Identification Number from the IRS using Form SS-4. Non-residents without an SSN must apply by mail or fax (not online). Processing takes 4-6 weeks.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 5: Draft an Operating Agreement</h3>
                    <p className="text-gray-700 mt-2">While not always legally required, an Operating Agreement defines ownership, profit distribution, and management rules. Banks often require this document to open an account.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 6: Open a US Bank Account</h3>
                    <p className="text-gray-700 mt-2">This is often the most challenging step for non-residents. Options include:</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>In-person visit to a US bank</li>
                      <li>Banks that accept remote applications (Mercury, Relay, etc.)</li>
                      <li>International banks with US branches</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 7: Maintain Compliance</h3>
                    <p className="text-gray-700 mt-2">Ongoing requirements vary by state but typically include:</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Annual reports and fees</li>
                      <li>Franchise taxes (in some states)</li>
                      <li>Federal tax filings (even if no US-source income)</li>
                      <li>BOI (Beneficial Ownership Information) reporting to FinCEN</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 1: Eyalet Seçimi</h3>
                    <p className="text-gray-700 mt-2">Delaware ve Wyoming, iş dostu yasaları ve gizlilik korumaları nedeniyle popülerdir. Ancak işinizi ağırlıklı olarak tek bir eyalette yürütecekseniz, orada kurmak daha pratik olabilir. Her eyaletin farklı harç ve gereksinimleri vardır.</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Delaware: $90 kuruluş harcı, yıllık en az $300 franchise vergisi</li>
                      <li>Wyoming: $100 kuruluş harcı, yıllık $60 rapor ücreti</li>
                      <li>New Mexico: $50 kuruluş harcı, yıllık rapor zorunluluğu yok</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 2: Registered Agent Atama</h3>
                    <p className="text-gray-700 mt-2">Her LLC&apos;nin kuruluş eyaletinde fiziksel adresi olan bir registered agent&apos;ı olmalıdır. Bu temsilci, LLC adına yasal belgeleri tebellüğ eder. Ticari registered agent hizmetleri genellikle yıllık $50-300 arasındadır.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 3: Articles of Organization Başvurusu</h3>
                    <p className="text-gray-700 mt-2">Kuruluş belgelerini eyalete sunun. Bu genellikle çevrimiçi yapılabilir. İşlem süresi değişkendir: bazı eyaletler ek ücretle aynı gün işlem sunar; diğerleri 1-2 hafta alabilir.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 4: EIN Alma</h3>
                    <p className="text-gray-700 mt-2">IRS&apos;den SS-4 formu ile Employer Identification Number başvurusu yapın. SSN&apos;si olmayan yabancılar çevrimiçi başvuru yapamaz; posta veya faks kullanmalıdır. İşlem süresi 4-6 haftadır.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 5: Operating Agreement Hazırlama</h3>
                    <p className="text-gray-700 mt-2">Her zaman yasal olarak zorunlu olmasa da Operating Agreement, ortaklık yapısını, kâr dağılımını ve yönetim kurallarını belirler. Bankalar genellikle hesap açmak için bu belgeyi ister.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 6: ABD Banka Hesabı Açma</h3>
                    <p className="text-gray-700 mt-2">ABD dışından kuranlar için genellikle en zorlu adım budur. Seçenekler:</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>ABD&apos;deki bir bankaya şahsen başvuru</li>
                      <li>Uzaktan başvuru kabul eden bankalar (Mercury, Relay vb.)</li>
                      <li>ABD şubesi olan uluslararası bankalar</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 7: Uyumu Sürdürme</h3>
                    <p className="text-gray-700 mt-2">Süregelen gereksinimler eyalete göre değişir ancak genellikle şunları içerir:</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Yıllık raporlar ve harçlar</li>
                      <li>Franchise vergileri (bazı eyaletlerde)</li>
                      <li>Federal vergi beyannameleri (ABD kaynaklı gelir olmasa bile)</li>
                      <li>FinCEN&apos;e BOI (Beneficial Ownership Information) bildirimi</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Section 4: Sık Yapılan Hatalar */}
            <section id="sik-yapilan-hatalar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '4. Common Mistakes' : '4. Sık Yapılan Hatalar'}
              </h2>

              {isEnglish ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;LLC means no taxes&quot;</h3>
                    <p className="text-gray-700 text-sm">False. An LLC is a legal structure, not a tax exemption. Depending on your situation, you may owe US federal taxes, state taxes, and/or taxes in your country of residence.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;I can use a nominee to hide ownership&quot;</h3>
                    <p className="text-gray-700 text-sm">The Corporate Transparency Act now requires disclosure of beneficial owners to FinCEN. Using nominees to conceal true ownership may result in civil and criminal penalties.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;Delaware is always the best choice&quot;</h3>
                    <p className="text-gray-700 text-sm">Delaware has advantages for certain situations (venture-backed startups, complex corporate structures). For a simple single-member LLC with no US operations, other states may be more cost-effective.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;I don&apos;t need to file anything if I have no income&quot;</h3>
                    <p className="text-gray-700 text-sm">Even with zero income, you may have filing obligations (state annual reports, BOI reporting, informational tax returns). Failure to file can result in penalties or administrative dissolution.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ Confusing sales tax with income tax</h3>
                    <p className="text-gray-700 text-sm">Sales tax is a separate obligation from income tax. If you sell taxable goods or services to customers in certain states, you may need to collect and remit sales tax—even without a physical presence there.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;LLC kurunca vergi yok&quot;</h3>
                    <p className="text-gray-700 text-sm">Yanlış. LLC bir hukuki yapıdır, vergi muafiyeti değildir. Durumunuza bağlı olarak ABD federal vergisi, eyalet vergisi ve/veya ikamet ettiğiniz ülkede vergi borcunuz doğabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;Nominee kullanarak sahipliği gizleyebilirim&quot;</h3>
                    <p className="text-gray-700 text-sm">Corporate Transparency Act artık gerçek faydalanıcı sahiplerin FinCEN&apos;e bildirilmesini zorunlu kılmaktadır. Gerçek sahipliği gizlemek için nominee kullanmak hukuki ve cezai yaptırımlara yol açabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;Delaware her zaman en iyi seçim&quot;</h3>
                    <p className="text-gray-700 text-sm">Delaware belirli durumlar için avantajlıdır (risk sermayesi destekli girişimler, karmaşık şirket yapıları). ABD operasyonu olmayan basit bir tek üyeli LLC için diğer eyaletler daha uygun maliyetli olabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ &quot;Gelirim yoksa beyanname vermeme gerek yok&quot;</h3>
                    <p className="text-gray-700 text-sm">Sıfır geliriniz olsa bile beyanname yükümlülükleriniz olabilir (eyalet yıllık raporları, BOI bildirimi, bilgi amaçlı vergi beyannameleri). Beyanname vermemek cezalara veya LLC&apos;nin idari feshedilmesine yol açabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">❌ Satış vergisini gelir vergisiyle karıştırmak</h3>
                    <p className="text-gray-700 text-sm">Satış vergisi (sales tax), gelir vergisinden ayrı bir yükümlülüktür. Belirli eyaletlerdeki müşterilere vergilendirilebilir mal veya hizmet satıyorsanız, orada fiziksel varlığınız olmasa bile satış vergisi toplamanız ve ödemeniz gerekebilir.</p>
                  </div>
                </div>
              )}
            </section>

            {/* Section 5: Belgeler Kontrol Listesi */}
            <section id="belgeler-kontrol-listesi" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '5. Document Checklist' : '5. Belgeler Kontrol Listesi'}
              </h2>

              <div className="bg-blue-50 rounded-lg p-6">
                <ul className="space-y-3">
                  {(isEnglish ? [
                    'Passport copy (for identity verification)',
                    'Proof of address (utility bill, bank statement)',
                    'Articles of Organization (filed with state)',
                    'EIN confirmation letter (IRS)',
                    'Operating Agreement',
                    'Registered Agent agreement',
                    'Bank account opening documents',
                    'BOI report confirmation (FinCEN)',
                  ] : [
                    'Pasaport kopyası (kimlik doğrulama için)',
                    'Adres belgesi (fatura, banka ekstresi)',
                    'Articles of Organization (eyalete sunulan)',
                    'EIN onay mektubu (IRS)',
                    'Operating Agreement',
                    'Registered Agent sözleşmesi',
                    'Banka hesabı açılış belgeleri',
                    'BOI raporu onayı (FinCEN)',
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-0.5">☐</span>
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 6: Süre ve Maliyet */}
            <section id="sure-ve-maliyet" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Timeline & Costs' : '6. Süre ve Maliyet'}
              </h2>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-900">
                  {isEnglish
                    ? '⚠️ These are estimates only. Actual costs and timelines vary by state and service provider. Verify current fees with official sources.'
                    : '⚠️ Bunlar yalnızca tahmindir. Gerçek maliyetler ve süreler eyalete ve hizmet sağlayıcıya göre değişir. Güncel harçları resmi kaynaklardan doğrulayın.'}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{isEnglish ? 'Item' : 'Kalem'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{isEnglish ? 'Cost Range' : 'Maliyet Aralığı'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{isEnglish ? 'Timeline' : 'Süre'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isEnglish ? [
                      ['State filing fee', '$50 – $500', '1 day – 2 weeks'],
                      ['Registered agent (annual)', '$50 – $300', 'Immediate'],
                      ['EIN application', 'Free', '4 – 6 weeks (by mail)'],
                      ['Operating Agreement (template)', '$0 – $200', '1 – 3 days'],
                      ['Bank account', '$0 – $30/month', '1 – 4 weeks'],
                      ['Annual state fees', '$0 – $800+', 'Annual'],
                      ['BOI filing', 'Free', 'Must file within 90 days of formation'],
                    ] : [
                      ['Eyalet kuruluş harcı', '$50 – $500', '1 gün – 2 hafta'],
                      ['Registered agent (yıllık)', '$50 – $300', 'Anında'],
                      ['EIN başvurusu', 'Ücretsiz', '4 – 6 hafta (posta ile)'],
                      ['Operating Agreement (şablon)', '$0 – $200', '1 – 3 gün'],
                      ['Banka hesabı', '$0 – $30/ay', '1 – 4 hafta'],
                      ['Yıllık eyalet harçları', '$0 – $800+', 'Yıllık'],
                      ['BOI bildirimi', 'Ücretsiz', 'Kuruluştan itibaren 90 gün içinde'],
                    ]).map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-3">{row[0]}</td>
                        <td className="border border-gray-200 px-4 py-3">{row[1]}</td>
                        <td className="border border-gray-200 px-4 py-3">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                {isEnglish
                  ? 'Total initial setup: approximately $200 – $1,000+ depending on state and services used.'
                  : 'Toplam başlangıç maliyeti: eyalet ve kullanılan hizmetlere bağlı olarak yaklaşık $200 – $1.000+.'}
              </p>
            </section>

            {/* Section 7: SSS */}
            <section id="sss" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. Frequently Asked Questions' : '7. Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    q: 'Can I form an LLC without visiting the US?',
                    a: 'Yes. LLC formation can be done entirely remotely. However, opening a bank account may require an in-person visit depending on the bank.'
                  },
                  {
                    q: 'Do I need a US address?',
                    a: 'You need a registered agent with a US address in your formation state. You do not need to personally have a US address, though some banks may require one.'
                  },
                  {
                    q: 'Which state should I choose?',
                    a: 'It depends on your business activities, where your customers are, and your budget. Wyoming and New Mexico are often cost-effective for non-residents with no US operations. Consult a professional for your specific situation.'
                  },
                  {
                    q: 'Will forming an LLC help me get a visa?',
                    a: 'No. LLC formation provides no immigration benefit. Visas require separate applications with specific eligibility requirements.'
                  },
                  {
                    q: 'Do I need to pay US taxes if I have no US income?',
                    a: 'You may still have filing obligations even with no income. Additionally, some states charge annual fees or franchise taxes regardless of income.'
                  },
                  {
                    q: 'What is BOI reporting?',
                    a: 'Beneficial Ownership Information reporting is a new federal requirement under the Corporate Transparency Act. Most LLCs must report their beneficial owners to FinCEN within 90 days of formation.'
                  },
                  {
                    q: 'Can I use my LLC for Stripe, PayPal, or Amazon?',
                    a: 'Generally yes, but each platform has its own verification requirements. Having an EIN and US bank account typically helps with onboarding.'
                  },
                ] : [
                  {
                    q: 'ABD\'ye gitmeden LLC kurabilir miyim?',
                    a: 'Evet. LLC kuruluşu tamamen uzaktan yapılabilir. Ancak banka hesabı açma, bankaya bağlı olarak şahsi ziyaret gerektirebilir.'
                  },
                  {
                    q: 'ABD adresi gerekli mi?',
                    a: 'Kuruluş eyaletinizde ABD adresine sahip bir registered agent gereklidir. Şahsen ABD adresinizin olması gerekmez, ancak bazı bankalar isteyebilir.'
                  },
                  {
                    q: 'Hangi eyaleti seçmeliyim?',
                    a: 'İş faaliyetlerinize, müşterilerinizin bulunduğu yere ve bütçenize bağlıdır. Wyoming ve New Mexico genellikle ABD operasyonu olmayan yabancılar için uygun maliyetlidir. Kendi durumunuz için bir uzmana danışın.'
                  },
                  {
                    q: 'LLC kurmak vize almama yardımcı olur mu?',
                    a: 'Hayır. LLC kurmak hiçbir göçmenlik avantajı sağlamaz. Vizeler, belirli uygunluk gereksinimleri olan ayrı başvurular gerektirir.'
                  },
                  {
                    q: 'ABD gelirim yoksa vergi ödemem gerekir mi?',
                    a: 'Geliriniz olmasa bile beyanname yükümlülükleriniz olabilir. Ayrıca bazı eyaletler gelirden bağımsız olarak yıllık harç veya franchise vergisi alır.'
                  },
                  {
                    q: 'BOI bildirimi nedir?',
                    a: 'Beneficial Ownership Information (Gerçek Faydalanıcı Bilgisi) bildirimi, Corporate Transparency Act kapsamında yeni bir federal gerekliliktir. Çoğu LLC, kuruluştan itibaren 90 gün içinde gerçek faydalanıcılarını FinCEN\'e bildirmelidir.'
                  },
                  {
                    q: 'LLC\'mi Stripe, PayPal veya Amazon için kullanabilir miyim?',
                    a: 'Genellikle evet, ancak her platformun kendi doğrulama gereksinimleri vardır. EIN ve ABD banka hesabı olması genellikle kayıt sürecinde yardımcı olur.'
                  },
                ]).map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4">
                      <h3 className="font-semibold text-black">{faq.q}</h3>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-gray-700 text-sm">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8: Kaynaklar */}
            <section id="kaynaklar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '8. Sources & Official Links' : '8. Kaynaklar ve Resmi Bağlantılar'}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – EIN Application
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Official EIN application information' : 'Resmi EIN başvuru bilgileri'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.fincen.gov/boi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      FinCEN – Beneficial Ownership Information
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'BOI reporting requirements and filing' : 'BOI bildirim gereksinimleri ve başvuru'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://corp.delaware.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      Delaware Division of Corporations
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Delaware business formation' : 'Delaware iş kuruluşu'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://sos.wyo.gov/Business/StartBusiness.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      Wyoming Secretary of State
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Wyoming business formation' : 'Wyoming iş kuruluşu'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/individuals/international-taxpayers/tax-treaties" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Tax Treaties
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Including US-Turkey tax treaty' : 'ABD-Türkiye vergi anlaşması dahil'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Must-have legal documents for US business' : 'ABD\'de iş için gerekli hukuki belgeler'}</p>
                </Link>
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'IRS & Tax Realities' : 'IRS ve Vergi Gerçekleri'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'W-8, W-9, and tax obligations' : 'W-8, W-9 ve vergi yükümlülükleri'}</p>
                </Link>
                <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates in one bundle' : 'Tek pakette 5 temel sözleşme şablonu'}</p>
                </Link>
                <Link href={`/${lang}/ein-itin-ssn-farki`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Tax ID numbers explained' : 'Vergi kimlik numaraları açıklandı'}</p>
                </Link>
              </div>
            </section>

            {/* Author Box */}
            <section className="border border-gray-200 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-3">{isEnglish ? 'Author' : 'Yazar'}</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
                  ZM
                </div>
                <div>
                  <h3 className="font-semibold text-black">Zeynep Ruziye Moore</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isEnglish ? 'Licensed in New York' : 'New York Lisanslı'}
                  </p>
                </div>
              </div>
            </section>

            {/* Legal Kit Reference */}
            <div className="border border-gray-200 rounded-lg p-8 mb-10">
              <h2 className="text-xl font-bold text-black mb-3">ABD Business Starter Legal Kit</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'Five foundational legal templates — operating agreement, independent contractor agreement, NDA, service agreement, and IP assignment — prepared for Turkish entrepreneurs forming a US-based LLC. Each document reflects standard US commercial practice. This kit helps sustain the free legal encyclopedia you just read.'
                  : 'Operating agreement, bağımsız yüklenici sözleşmesi, NDA, hizmet sözleşmesi ve fikri mülkiyet devir sözleşmesi — ABD\'de LLC kuran Türk girişimciler için hazırlanmış beş temel hukuki şablon. Her belge standart ABD ticari uygulamalarını yansıtır. Bu paket, okuduğunuz ücretsiz hukuki ansiklopedinin sürdürülmesine katkı sağlar.'}
              </p>
              <p className="text-sm text-gray-500 mb-5">
                {isEnglish
                  ? 'Pay What You Can — $20 suggested'
                  : 'Pay What You Can — Önerilen: $20'}
              </p>
              <Link href={`/${lang}/legal-kits/business-starter`} className="inline-block px-5 py-2.5 border border-black text-sm font-medium text-black rounded hover:bg-gray-50 transition-colors">
                {isEnglish ? 'View Kit' : 'Paketi Gör'}
              </Link>
            </div>

            {/* Final Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal, tax, or immigration advice. Laws and regulations change frequently. Consult qualified professionals for advice specific to your situation. EchoLegal is not a law firm and does not provide legal representation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; hukuki, vergisel veya göçmenlik danışmanlığı teşkil etmez. Yasalar ve düzenlemeler sık sık değişmektedir. Kendi durumunuza özgü tavsiye için uzman profesyonellere danışın. EchoLegal bir hukuk bürosu değildir ve hukuki temsil sağlamamaktadır.'}
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
