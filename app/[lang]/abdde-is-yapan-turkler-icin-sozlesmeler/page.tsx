// app/[lang]/abdde-is-yapan-turkler-icin-sozlesmeler/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Essential Contracts for Turkish Entrepreneurs in the US | EchoLegal'
    : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler | EchoLegal'

  const description = isEnglish
    ? 'Must-have legal contracts for Turkish entrepreneurs doing business in the United States. NDA, Service Agreements, IP Assignment, Privacy Policies, and more.'
    : 'ABD\'de iş yapan Türk girişimciler için olmazsa olmaz hukuki sözleşmeler. NDA, Hizmet Sözleşmesi, Fikri Mülkiyet Devri, Gizlilik Politikası ve daha fazlası.'

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
      canonical: `https://echo-legal.com/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`,
      languages: {
        'en': 'https://echo-legal.com/en/abdde-is-yapan-turkler-icin-sozlesmeler',
        'tr': 'https://echo-legal.com/tr/abdde-is-yapan-turkler-icin-sozlesmeler',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ContractsGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'temel-sozlesme-turleri', label: isEnglish ? 'Core Contract Types' : 'Temel Sözleşme Türleri' },
    { id: 'ne-zaman-hangi-sozlesme', label: isEnglish ? 'When to Use Each Contract' : 'Ne Zaman Hangi Sözleşme' },
    { id: 'onemli-maddeler', label: isEnglish ? 'Key Clauses Explained' : 'Kritik Maddeler' },
    { id: 'turkiye-abd-notlar', label: isEnglish ? 'Turkey-US Cross-Border Notes' : 'Türkiye-ABD Sınır Ötesi Notlar' },
    { id: 'kirmizi-bayraklar', label: isEnglish ? 'Red Flags to Watch' : 'Dikkat Edilmesi Gereken Uyarı İşaretleri' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
    { id: 'kaynaklar', label: isEnglish ? 'Sources' : 'Kaynaklar' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'Essential Contracts for Turkish Entrepreneurs in the US'
      : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler',
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
    datePublished: '2025-01-25',
    dateModified: '2025-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`,
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
        name: isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler',
        item: `https://echo-legal.com/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`,
      },
    ],
  }

  const contractTypes = isEnglish ? [
    {
      name: 'Non-Disclosure Agreement (NDA)',
      aka: 'Confidentiality Agreement',
      purpose: 'Protects confidential information shared between parties.',
      when: 'Before sharing business plans, trade secrets, client lists, or proprietary information with potential partners, investors, or contractors.',
      critical: true,
    },
    {
      name: 'Service Agreement',
      aka: 'Master Services Agreement (MSA)',
      purpose: 'Defines the terms under which services will be provided.',
      when: 'When you provide professional services to clients. Covers scope of work, payment terms, deliverables, and liability limits.',
      critical: true,
    },
    {
      name: 'Independent Contractor Agreement',
      aka: 'Consulting Agreement, Freelance Agreement',
      purpose: 'Establishes the relationship between a business and an independent contractor.',
      when: 'When hiring freelancers or contractors. Critical for avoiding misclassification claims and defining work relationship.',
      critical: true,
    },
    {
      name: 'IP Assignment Agreement',
      aka: 'Work for Hire, IP Transfer',
      purpose: 'Transfers intellectual property rights from one party to another.',
      when: 'When commissioning creative work, software development, or any work product where you need to own the IP.',
      critical: true,
    },
    {
      name: 'Operating Agreement',
      aka: 'LLC Agreement',
      purpose: 'Defines ownership structure, profit distribution, and management rules for an LLC.',
      when: 'When forming an LLC. Required by some states; practically required for bank accounts.',
      critical: true,
    },
    {
      name: 'Privacy Policy',
      aka: 'Data Privacy Notice',
      purpose: 'Discloses how your business collects, uses, and protects user data.',
      when: 'Required if your website or app collects any personal data (names, emails, cookies, analytics).',
      critical: true,
    },
    {
      name: 'Terms of Service',
      aka: 'Terms and Conditions, Terms of Use',
      purpose: 'Sets the rules for using your website, app, or service.',
      when: 'For any website, app, or online platform. Establishes acceptable use and limits liability.',
      critical: true,
    },
    {
      name: 'Influencer / Brand Agreement',
      aka: 'Sponsorship Agreement, Content Creator Agreement',
      purpose: 'Defines terms for promotional content partnerships.',
      when: 'When partnering with influencers for marketing or when being hired as an influencer.',
      critical: false,
    },
  ] : [
    {
      name: 'Gizlilik Sözleşmesi (NDA)',
      aka: 'Non-Disclosure Agreement, Confidentiality Agreement',
      purpose: 'Taraflar arasında paylaşılan gizli bilgileri korur.',
      when: 'İş planlarını, ticari sırları, müşteri listelerini veya tescilli bilgileri potansiyel ortaklar, yatırımcılar veya yüklenicilerle paylaşmadan önce.',
      critical: true,
    },
    {
      name: 'Hizmet Sözleşmesi',
      aka: 'Service Agreement, Master Services Agreement (MSA)',
      purpose: 'Hizmetlerin sunulacağı koşulları tanımlar.',
      when: 'Müşterilere profesyonel hizmet verdiğinizde. İş kapsamını, ödeme koşullarını, teslim edilecekleri ve sorumluluk sınırlarını kapsar.',
      critical: true,
    },
    {
      name: 'Bağımsız Yüklenici Sözleşmesi',
      aka: 'Independent Contractor Agreement, Freelance Agreement',
      purpose: 'İşletme ile bağımsız yüklenici arasındaki ilişkiyi belirler.',
      when: 'Serbest çalışan veya yüklenici çalıştırırken. Yanlış sınıflandırma iddialarından kaçınmak ve iş ilişkisini tanımlamak için kritiktir.',
      critical: true,
    },
    {
      name: 'Fikri Mülkiyet Devir Sözleşmesi',
      aka: 'IP Assignment Agreement, Work for Hire',
      purpose: 'Fikri mülkiyet haklarını bir taraftan diğerine devreder.',
      when: 'Yaratıcı iş, yazılım geliştirme veya fikri mülkiyetine sahip olmanız gereken herhangi bir iş ürünü sipariş ederken.',
      critical: true,
    },
    {
      name: 'Operating Agreement',
      aka: 'LLC Sözleşmesi, Şirket Sözleşmesi',
      purpose: 'LLC için ortaklık yapısını, kâr dağılımını ve yönetim kurallarını tanımlar.',
      when: 'LLC kurarken. Bazı eyaletlerde zorunludur; banka hesabı açmak için pratikte gereklidir.',
      critical: true,
    },
    {
      name: 'Gizlilik Politikası',
      aka: 'Privacy Policy, Kişisel Verilerin Korunması Politikası',
      purpose: 'İşletmenizin kullanıcı verilerini nasıl topladığını, kullandığını ve koruduğunu açıklar.',
      when: 'Web siteniz veya uygulamanız herhangi bir kişisel veri topluyorsa (isimler, e-postalar, çerezler, analitik) zorunludur.',
      critical: true,
    },
    {
      name: 'Kullanım Koşulları',
      aka: 'Terms of Service, Terms and Conditions',
      purpose: 'Web sitenizi, uygulamanızı veya hizmetinizi kullanma kurallarını belirler.',
      when: 'Herhangi bir web sitesi, uygulama veya çevrimiçi platform için. Kabul edilebilir kullanımı belirler ve sorumluluğu sınırlar.',
      critical: true,
    },
    {
      name: 'Influencer / Marka Sözleşmesi',
      aka: 'Sponsorship Agreement, Content Creator Agreement',
      purpose: 'Tanıtım içeriği ortaklıklarının koşullarını tanımlar.',
      when: 'Pazarlama için influencer\'larla ortaklık yaparken veya influencer olarak çalıştırıldığınızda.',
      critical: false,
    },
  ]

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

      <div className="bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Contract Guide' : 'Sözleşme Rehberi'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
                {isEnglish
                  ? 'Essential Contracts for Turkish Entrepreneurs in the US'
                  : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler'}
              </h1>

              <p className="text-base text-gray-600 mb-6">
                {isEnglish
                  ? 'Written for Turkish entrepreneurs who are doing business in or with the United States and need to understand which contracts to have in place.'
                  : 'ABD\'de veya ABD ile iş yapan ve hangi sözleşmelere ihtiyaç duyduğunu anlamak isteyen Türk girişimciler için hazırlanmıştır.'}
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This guide covers the legal contracts you\'ll likely need when doing business in or with the United States, with considerations for Turkish entrepreneurs operating across borders.'
                  : 'Bu rehber, ABD\'de veya ABD ile iş yaparken muhtemelen ihtiyaç duyacağınız hukuki sözleşmeleri, sınır ötesi faaliyet gösteren Türk girişimciler için dikkat edilmesi gereken hususlarla birlikte ele almaktadır.'}
              </p>
            </header>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>{isEnglish ? 'Disclaimer:' : 'Uyarı:'}</strong>{' '}
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal advice. Contract templates should be reviewed by a qualified attorney for your specific situation and jurisdiction.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır ve hukuki danışmanlık teşkil etmez. Sözleşme şablonları, kendi durumunuz ve yargı yetkiniz için uzman bir avukat tarafından incelenmelidir.'}
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

            {/* Section 1: Temel Sözleşme Türleri */}
            <section id="temel-sozlesme-turleri" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '1. Core Contract Types' : '1. Temel Sözleşme Türleri'}
              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {isEnglish
                  ? 'The contracts below are not listed in random order. The NDA comes first because it protects information you share before any deal is signed. Service and contractor agreements follow because they govern the actual working relationship. IP assignment exists to ensure that what gets created under those agreements belongs to you. The Operating Agreement, Privacy Policy, and Terms of Service round out the set because they address the structural and regulatory foundations your business needs to operate.'
                  : 'Aşağıdaki sözleşmeler rastgele sıralanmamıştır. NDA en başta yer alır; çünkü herhangi bir anlaşma imzalanmadan önce paylaşılan bilgileri korur. Hizmet ve yüklenici sözleşmeleri onu takip eder; çünkü fiili iş ilişkisini düzenler. Fikri mülkiyet devri, bu sözleşmeler kapsamında üretilen işin size ait olmasını güvence altına alır. Operating Agreement, Gizlilik Politikası ve Kullanım Koşulları ise işletmenizin faaliyete geçmesi için gereken yapısal ve hukuki temelleri tamamlar.'}
              </p>

              <p className="text-gray-700 mb-6">
                {isEnglish
                  ? 'Below are the essential contracts most businesses operating in the US will need. Each serves a specific protective function.'
                  : 'Aşağıda ABD\'de faaliyet gösteren çoğu işletmenin ihtiyaç duyacağı temel sözleşmeler yer almaktadır. Her biri belirli bir koruma işlevi görür.'}
              </p>

              <div className="space-y-4">
                {contractTypes.map((contract, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-black">{contract.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{contract.aka}</p>
                      </div>
                      {contract.critical && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                          {isEnglish ? 'Critical' : 'Kritik'}
                        </span>
                      )}
                    </div>
                    <div className="px-5 py-4 space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{isEnglish ? 'Purpose:' : 'Amacı:'}</p>
                        <p className="text-sm text-gray-600">{contract.purpose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{isEnglish ? 'When needed:' : 'Ne zaman gerekli:'}</p>
                        <p className="text-sm text-gray-600">{contract.when}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Ne Zaman Hangi Sözleşme */}
            <section id="ne-zaman-hangi-sozlesme" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. When to Use Each Contract' : '2. Ne Zaman Hangi Sözleşme'}
              </h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <h3>Starting a business conversation?</h3>
                  <p>→ NDA first. Before sharing any sensitive information about your business, idea, or clients.</p>

                  <h3>Providing services to a client?</h3>
                  <p>→ Service Agreement. Defines what you&apos;ll deliver, when, and for how much. Protects both parties.</p>

                  <h3>Hiring someone to work for you?</h3>
                  <p>→ Independent Contractor Agreement if they&apos;re not an employee. This is crucial for avoiding misclassification liability in the US.</p>

                  <h3>Commissioning creative or technical work?</h3>
                  <p>→ IP Assignment Agreement. Without this, the creator may retain rights to the work they produced for you.</p>

                  <h3>Forming an LLC?</h3>
                  <p>→ Operating Agreement. Banks typically require this to open a business account. Defines ownership and decision-making rules.</p>

                  <h3>Running a website or app?</h3>
                  <p>→ Privacy Policy (legally required in most cases) + Terms of Service (highly recommended).</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <h3>Bir iş görüşmesine mi başlıyorsunuz?</h3>
                  <p>→ Önce NDA. İşiniz, fikriniz veya müşterileriniz hakkında hassas bilgi paylaşmadan önce.</p>

                  <h3>Bir müşteriye hizmet mi veriyorsunuz?</h3>
                  <p>→ Hizmet Sözleşmesi. Ne teslim edeceğinizi, ne zaman ve ne karşılığında yapacağınızı tanımlar. Her iki tarafı da korur.</p>

                  <h3>Birini çalıştırıyor musunuz?</h3>
                  <p>→ Çalışan değilse Bağımsız Yüklenici Sözleşmesi. ABD&apos;de yanlış sınıflandırma sorumluluğundan kaçınmak için kritiktir.</p>

                  <h3>Yaratıcı veya teknik iş mi sipariş ediyorsunuz?</h3>
                  <p>→ Fikri Mülkiyet Devir Sözleşmesi. Bu olmadan, üretici sizin için ürettiği işin haklarını elinde tutabilir.</p>

                  <h3>LLC mi kuruyorsunuz?</h3>
                  <p>→ Operating Agreement. Bankalar genellikle iş hesabı açmak için bunu ister. Ortaklık ve karar alma kurallarını tanımlar.</p>

                  <h3>Web sitesi veya uygulama mı işletiyorsunuz?</h3>
                  <p>→ Gizlilik Politikası (çoğu durumda yasal olarak zorunlu) + Kullanım Koşulları (kesinlikle tavsiye edilir).</p>
                </div>
              )}
            </section>

            {/* Section 3: Önemli Maddeler */}
            <section id="onemli-maddeler" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. Key Clauses Explained' : '3. Kritik Maddeler'}
              </h2>

              <p className="text-gray-700 mb-6">
                {isEnglish
                  ? 'Regardless of contract type, certain clauses appear repeatedly and deserve careful attention:'
                  : 'Sözleşme türünden bağımsız olarak, belirli maddeler sürekli karşınıza çıkar ve dikkatli inceleme gerektirir:'}
              </p>

              <div className="space-y-6">
                {(isEnglish ? [
                  {
                    title: 'Scope of Work / Services',
                    description: 'Precisely defines what will be delivered. Ambiguity here leads to disputes later.',
                    tip: 'Be specific. "Marketing services" is too vague. "Monthly social media management including 12 posts and 2 reports" is better.',
                  },
                  {
                    title: 'Payment Terms',
                    description: 'When payment is due, in what currency, through what method, and consequences of late payment.',
                    tip: 'Specify currency (USD), payment method (wire, ACH), and late payment penalties or interest.',
                  },
                  {
                    title: 'Intellectual Property',
                    description: 'Who owns the work product. By default under US law, contractors often retain IP unless explicitly assigned.',
                    tip: 'If you\'re paying for work, ensure the contract includes a clear IP assignment clause.',
                  },
                  {
                    title: 'Confidentiality',
                    description: 'Obligations to keep certain information private. May survive termination of the contract.',
                    tip: 'Define what\'s confidential and for how long the obligation lasts (often 2-5 years or indefinitely for trade secrets).',
                  },
                  {
                    title: 'Termination',
                    description: 'How either party can end the relationship. Notice periods, grounds for immediate termination.',
                    tip: 'Include both "for cause" (breach, etc.) and "for convenience" (with notice) termination rights.',
                  },
                  {
                    title: 'Governing Law',
                    description: 'Which jurisdiction\'s laws apply to interpret the contract.',
                    tip: 'New York and Delaware are common choices for US contracts. This affects how disputes are resolved.',
                  },
                  {
                    title: 'Dispute Resolution',
                    description: 'How disagreements will be handled—courts, arbitration, or mediation.',
                    tip: 'Arbitration is often faster but may limit discovery. Courts provide more formal process but can be slower.',
                  },
                ] : [
                  {
                    title: 'İş Kapsamı / Hizmetler',
                    description: 'Neyin teslim edileceğini kesin olarak tanımlar. Buradaki belirsizlik ileride uyuşmazlıklara yol açar.',
                    tip: 'Spesifik olun. "Pazarlama hizmetleri" çok belirsiz. "Aylık 12 gönderi ve 2 rapor dahil sosyal medya yönetimi" daha iyi.',
                  },
                  {
                    title: 'Ödeme Koşulları',
                    description: 'Ödemenin ne zaman, hangi para biriminde, hangi yöntemle yapılacağı ve geç ödemenin sonuçları.',
                    tip: 'Para birimini (USD), ödeme yöntemini (havale, ACH) ve geç ödeme cezalarını veya faizini belirtin.',
                  },
                  {
                    title: 'Fikri Mülkiyet',
                    description: 'İş ürününe kimin sahip olduğu. ABD hukuku altında varsayılan olarak yükleniciler, açıkça devredilmedikçe genellikle fikri mülkiyeti ellerinde tutar.',
                    tip: 'İş için ödeme yapıyorsanız, sözleşmenin açık bir fikri mülkiyet devir maddesi içerdiğinden emin olun.',
                  },
                  {
                    title: 'Gizlilik',
                    description: 'Belirli bilgileri özel tutma yükümlülükleri. Sözleşmenin feshinden sonra da devam edebilir.',
                    tip: 'Neyin gizli olduğunu ve yükümlülüğün ne kadar süreceğini tanımlayın (genellikle 2-5 yıl veya ticari sırlar için süresiz).',
                  },
                  {
                    title: 'Fesih',
                    description: 'Her iki tarafın ilişkiyi nasıl sonlandırabileceği. İhbar süreleri, derhal fesih gerekçeleri.',
                    tip: 'Hem "haklı nedenle" (ihlal vb.) hem de "kolaylık için" (ihbarla) fesih haklarını ekleyin.',
                  },
                  {
                    title: 'Geçerli Hukuk',
                    description: 'Sözleşmeyi yorumlamak için hangi yargı alanının yasalarının uygulanacağı.',
                    tip: 'New York ve Delaware, ABD sözleşmeleri için yaygın seçimlerdir. Bu, uyuşmazlıkların nasıl çözüleceğini etkiler.',
                  },
                  {
                    title: 'Uyuşmazlık Çözümü',
                    description: 'Anlaşmazlıkların nasıl ele alınacağı—mahkemeler, tahkim veya arabuluculuk.',
                    tip: 'Tahkim genellikle daha hızlıdır ancak keşif sürecini sınırlayabilir. Mahkemeler daha resmi süreç sağlar ancak daha yavaş olabilir.',
                  },
                ]).map((clause, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-bold text-black">{clause.title}</h3>
                    <p className="text-gray-700 mt-1">{clause.description}</p>
                    <p className="text-sm text-purple-800 mt-2 bg-purple-50 p-2 rounded">
                      <strong>{isEnglish ? 'Tip:' : 'İpucu:'}</strong> {clause.tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Türkiye-ABD Notlar */}
            <section id="turkiye-abd-notlar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '4. Turkey-US Cross-Border Notes' : '4. Türkiye-ABD Sınır Ötesi Notlar'}
              </h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <h3>Language Versions</h3>
                  <p>When contracting with Turkish parties, you may need both English and Turkish versions. Decide which version controls in case of discrepancy. Common approach: English controls for legal interpretation, Turkish provided for convenience.</p>

                  <h3>Governing Law Selection</h3>
                  <p>If you choose US law (e.g., New York), be aware that Turkish courts may not enforce all provisions. If you choose Turkish law, US courts may similarly limit enforcement. Consider:</p>
                  <ul>
                    <li>Where are the parties located?</li>
                    <li>Where will disputes likely need to be enforced?</li>
                    <li>What law is your counterparty more comfortable with?</li>
                  </ul>

                  <h3>Enforceability Considerations</h3>
                  <p>Some contract terms valid in the US may not be enforceable in Turkey, and vice versa. Examples:</p>
                  <ul>
                    <li>Non-compete clauses are more strictly limited under Turkish law</li>
                    <li>Certain consumer protection provisions differ significantly</li>
                    <li>Arbitration clauses may require specific formalities</li>
                  </ul>
                  <p>For significant contracts, consider review by attorneys familiar with both jurisdictions.</p>

                  <h3>Currency and Payment</h3>
                  <p>Specify currency clearly. Consider exchange rate fluctuations and bank transfer costs. US banks may charge fees for international wires; Turkish regulations may affect currency conversion.</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <h3>Dil Versiyonları</h3>
                  <p>Türk taraflarla sözleşme yaparken hem İngilizce hem Türkçe versiyonlara ihtiyaç duyabilirsiniz. Tutarsızlık durumunda hangi versiyonun geçerli olacağına karar verin. Yaygın yaklaşım: hukuki yorum için İngilizce geçerli, Türkçe kolaylık için sağlanır.</p>

                  <h3>Geçerli Hukuk Seçimi</h3>
                  <p>ABD hukuku (örneğin New York) seçerseniz, Türk mahkemelerinin tüm hükümleri uygulamayabileceğini bilin. Türk hukuku seçerseniz, ABD mahkemeleri de benzer şekilde uygulamayı sınırlayabilir. Düşünün:</p>
                  <ul>
                    <li>Taraflar nerede bulunuyor?</li>
                    <li>Uyuşmazlıkların muhtemelen nerede icra edilmesi gerekecek?</li>
                    <li>Karşı taraf hangi hukuka daha aşina?</li>
                  </ul>

                  <h3>Uygulanabilirlik Hususları</h3>
                  <p>ABD&apos;de geçerli olan bazı sözleşme koşulları Türkiye&apos;de uygulanabilir olmayabilir ve tersi de geçerlidir. Örnekler:</p>
                  <ul>
                    <li>Rekabet yasağı maddeleri Türk hukuku kapsamında daha katı biçimde sınırlandırılmıştır</li>
                    <li>Bazı tüketici koruma hükümleri önemli ölçüde farklılık gösterir</li>
                    <li>Tahkim maddeleri belirli şekil şartları gerektirebilir</li>
                  </ul>
                  <p>Önemli sözleşmeler için her iki yargı alanına hakim avukatlar tarafından inceleme düşünün.</p>

                  <h3>Para Birimi ve Ödeme</h3>
                  <p>Para birimini açıkça belirtin. Döviz kuru dalgalanmalarını ve banka transfer masraflarını göz önünde bulundurun. ABD bankaları uluslararası havaleler için ücret alabilir; Türk düzenlemeleri döviz dönüşümünü etkileyebilir.</p>
                </div>
              )}
            </section>

            {/* Section 5: Kırmızı Bayraklar */}
            <section id="kirmizi-bayraklar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '5. Red Flags to Watch' : '5. Dikkat Edilmesi Gereken Uyarı İşaretleri'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    flag: 'No written contract at all',
                    risk: 'Verbal agreements are difficult to prove and enforce. Always get agreements in writing.',
                  },
                  {
                    flag: 'One-sided indemnification',
                    risk: 'If you\'re asked to indemnify the other party for everything, including their own negligence, negotiate more balanced terms.',
                  },
                  {
                    flag: 'Unlimited liability',
                    risk: 'Contracts should typically cap liability at a reasonable amount (e.g., fees paid under the contract).',
                  },
                  {
                    flag: 'Automatic renewal without notice',
                    risk: 'Some contracts auto-renew unless you cancel within a narrow window. Know your termination rights.',
                  },
                  {
                    flag: 'Vague scope of work',
                    risk: 'Ambiguous deliverables lead to disputes. Insist on specific, measurable terms.',
                  },
                  {
                    flag: 'IP assignment without compensation',
                    risk: 'If you\'re assigning your IP, ensure you\'re adequately compensated and understand what rights you\'re giving up.',
                  },
                  {
                    flag: 'Arbitration in inconvenient forum',
                    risk: 'Arbitration in a distant location can make dispute resolution practically impossible.',
                  },
                ] : [
                  {
                    flag: 'Hiç yazılı sözleşme olmaması',
                    risk: 'Sözlü anlaşmaları kanıtlamak ve uygulatmak zordur. Anlaşmaları her zaman yazılı hale getirin.',
                  },
                  {
                    flag: 'Tek taraflı tazminat yükümlülüğü',
                    risk: 'Karşı tarafı kendi ihmali dahil her şey için tazmin etmeniz isteniyorsa, daha dengeli koşullar için müzakere edin.',
                  },
                  {
                    flag: 'Sınırsız sorumluluk',
                    risk: 'Sözleşmeler genellikle sorumluluğu makul bir miktarla sınırlamalıdır (örneğin, sözleşme kapsamında ödenen ücretler).',
                  },
                  {
                    flag: 'Bildirimsiz otomatik yenileme',
                    risk: 'Bazı sözleşmeler dar bir zaman diliminde iptal etmezseniz otomatik yenilenir. Fesih haklarınızı bilin.',
                  },
                  {
                    flag: 'Belirsiz iş kapsamı',
                    risk: 'Muğlak teslim edilecekler uyuşmazlıklara yol açar. Spesifik, ölçülebilir koşullar üzerinde ısrar edin.',
                  },
                  {
                    flag: 'Karşılıksız fikri mülkiyet devri',
                    risk: 'Fikri mülkiyetinizi devrediyorsanız, yeterli karşılık aldığınızdan ve hangi hakları bıraktığınızı anladığınızdan emin olun.',
                  },
                  {
                    flag: 'Elverişsiz yerde tahkim',
                    risk: 'Uzak bir yerde tahkim, uyuşmazlık çözümünü pratikte imkansız hale getirebilir.',
                  },
                ]).map((item, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-bold text-red-900 flex items-center gap-2">
                      <span>⚠️</span> {item.flag}
                    </h3>
                    <p className="text-sm text-red-800 mt-1">{item.risk}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: SSS */}
            <section id="sss" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Frequently Asked Questions' : '6. Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    q: 'Can I use the same contract for all my clients?',
                    a: 'A template can serve as a starting point, but each client relationship may have unique requirements. Review and customize as needed. Significant engagements warrant careful negotiation.',
                  },
                  {
                    q: 'Do contracts need to be notarized?',
                    a: 'Most business contracts in the US do not require notarization. However, certain documents (real estate, some corporate filings) may require it. Turkish notarization requirements may differ.',
                  },
                  {
                    q: 'Are electronic signatures valid?',
                    a: 'Yes, in most cases under US law (ESIGN Act, UETA) and Turkish law (Electronic Signature Law). However, certain documents may still require wet signatures.',
                  },
                  {
                    q: 'What if the other party breaches the contract?',
                    a: 'Your remedies depend on the contract terms and applicable law. Common remedies include damages, specific performance, or termination. Document the breach and consult an attorney.',
                  },
                  {
                    q: 'Should contracts be in English or Turkish?',
                    a: 'Depends on the parties and where enforcement may be needed. Many cross-border contracts include both languages with one designated as controlling for interpretation.',
                  },
                  {
                    q: 'How long should I keep signed contracts?',
                    a: 'At minimum, for the duration of the business relationship plus the statute of limitations for contract claims (typically 4-6 years in most US states). Some recommend keeping them indefinitely.',
                  },
                ] : [
                  {
                    q: 'Aynı sözleşmeyi tüm müşterilerim için kullanabilir miyim?',
                    a: 'Bir şablon başlangıç noktası olabilir, ancak her müşteri ilişkisinin kendine özgü gereksinimleri olabilir. Gerektiğinde inceleyin ve özelleştirin. Önemli işler dikkatli müzakere gerektirir.',
                  },
                  {
                    q: 'Sözleşmelerin noter onayı gerekir mi?',
                    a: 'ABD\'deki çoğu ticari sözleşme noter onayı gerektirmez. Ancak belirli belgeler (gayrimenkul, bazı kurumsal başvurular) gerektirebilir. Türk noter gereksinimleri farklılık gösterebilir.',
                  },
                  {
                    q: 'Elektronik imzalar geçerli mi?',
                    a: 'Evet, çoğu durumda ABD hukuku (ESIGN Act, UETA) ve Türk hukuku (Elektronik İmza Kanunu) kapsamında geçerlidir. Ancak bazı belgeler hâlâ ıslak imza gerektirebilir.',
                  },
                  {
                    q: 'Karşı taraf sözleşmeyi ihlal ederse ne olur?',
                    a: 'Başvurabileceğiniz çareler sözleşme koşullarına ve geçerli hukuka bağlıdır. Yaygın çareler arasında tazminat, aynen ifa veya fesih bulunur. İhlali belgeleyin ve bir avukata danışın.',
                  },
                  {
                    q: 'Sözleşmeler İngilizce mi Türkçe mi olmalı?',
                    a: 'Taraflara ve icranın nerede gerekebileceğine bağlıdır. Birçok sınır ötesi sözleşme, yorum için birinin geçerli olarak belirlenmesiyle her iki dili de içerir.',
                  },
                  {
                    q: 'İmzalı sözleşmeleri ne kadar süre saklamalıyım?',
                    a: 'En az, iş ilişkisinin süresi artı sözleşme davaları için zamanaşımı süresi (çoğu ABD eyaletinde genellikle 4-6 yıl). Bazıları süresiz saklamayı önerir.',
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

            {/* Section 7: Kaynaklar */}
            <section id="kaynaklar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. Sources & Official Links' : '7. Kaynaklar ve Resmi Bağlantılar'}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.ftc.gov/business-guidance/privacy-security" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      FTC – Privacy & Security Guidance
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'US privacy law requirements for businesses' : 'İşletmeler için ABD gizlilik hukuku gereksinimleri'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.dol.gov/agencies/whd/flsa/misclassification" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      DOL – Worker Misclassification
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Employee vs. contractor classification' : 'Çalışan ve yüklenici sınıflandırması'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.copyright.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      U.S. Copyright Office
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Copyright registration and work-for-hire rules' : 'Telif hakkı tescili ve iş için eser kuralları'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.uniformlaws.org/committees/community-home?communitykey=2c04b76c-2b7d-4399-977e-d5876ba7e034" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      Uniform Law Commission – UETA
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Electronic signatures and records' : 'Elektronik imzalar ve kayıtlar'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Targeted FAQ for search intent */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">
                {isEnglish ? 'Frequently Asked Questions (for Turkish Entrepreneurs)' : 'Sık Sorulan Sorular (Türk Girişimciler için)'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-black mb-2">
                    {isEnglish
                      ? 'Can I use a contract drafted under Turkish law for US business relationships?'
                      : 'Türk hukukuna göre hazırlanmış bir sözleşmeyi ABD iş ilişkilerinde kullanabilir miyim?'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {isEnglish
                      ? 'It is technically possible, but generally inadvisable. US counterparties expect contracts governed by US state law, and US courts may not enforce certain provisions valid only under Turkish law. If your business relationship is based in the US or serves US clients, contracts drafted under the applicable US state law provide significantly stronger protection.'
                      : 'Teknik olarak mümkündür, ancak genel olarak tavsiye edilmez. ABD\'deki karşı taraflar ABD eyalet hukukuna tabi sözleşmeler bekler ve ABD mahkemeleri yalnızca Türk hukuku kapsamında geçerli olan bazı hükümleri uygulamayabilir. İş ilişkiniz ABD merkezliyse veya ABD müşterilerine hizmet veriyorsanız, ilgili ABD eyalet hukukuna göre hazırlanmış sözleşmeler önemli ölçüde daha güçlü koruma sağlar.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">
                    {isEnglish
                      ? 'Do I need all of these contracts from day one?'
                      : 'Bu sözleşmelerin hepsine ilk günden ihtiyacım var mı?'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {isEnglish
                      ? 'Not necessarily, but delaying increases your risk. At minimum, an Operating Agreement should be in place at formation, a Privacy Policy before your website goes live, and an NDA before any confidential business discussion. The remaining contracts become necessary as you take on clients, hire contractors, or commission work product.'
                      : 'Zorunlu değil, ancak ertelemek riskinizi artırır. En azından Operating Agreement kuruluşta, Gizlilik Politikası web siteniz yayına girmeden önce ve NDA herhangi bir gizli iş görüşmesinden önce hazır olmalıdır. Diğer sözleşmeler müşteri aldıkça, yüklenici çalıştırdıkça veya iş ürünü sipariş ettikçe gerekli hale gelir.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Legal Kit Reference */}
            <div className="border border-gray-200 rounded-lg p-8 mb-10">
              <h2 className="text-xl font-bold text-black mb-3">ABD Business Starter Legal Kit</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'Three legal document templates — Operating Agreement, Service Agreement, and NDA — prepared for Turkish entrepreneurs forming a US-based LLC. Each document is drafted in both English and Turkish, reflecting standard US commercial practice.'
                  : 'Operating Agreement, Hizmet Sözleşmesi ve NDA — ABD merkezli LLC kuran Türk girişimciler için hazırlanmış üç temel hukuki belge şablonu. Her belge, standart ABD ticari uygulamalarını yansıtacak şekilde hem İngilizce hem Türkçe olarak hazırlanmıştır.'}
              </p>
              <p className="text-sm text-gray-500 mb-5">
                {isEnglish
                  ? '$49 — one-time purchase'
                  : '$49 — tek seferlik ödeme'}
              </p>
              <Link href={`/${lang}/legal-kits/business-starter`} className="inline-block px-5 py-2.5 border border-black text-sm font-medium text-black rounded hover:bg-gray-50 transition-colors">
                {isEnglish ? 'Access the Legal Kit' : 'Legal Kit\'e Eriş'}
              </Link>
            </div>

            {/* Template Library CTA */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold text-black mb-2">
                {isEnglish ? 'Need Contract Templates?' : 'Sözleşme Şablonlarına mı İhtiyacınız Var?'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isEnglish
                  ? 'Browse our template library for professionally drafted contracts you can customize for your needs.'
                  : 'İhtiyaçlarınıza göre özelleştirebileceğiniz profesyonelce hazırlanmış sözleşmeler için şablon kütüphanemize göz atın.'}
              </p>
              <Link
                href={`/${lang}/contracts`}
                className="inline-block text-blue-600 font-medium hover:underline"
              >
                {isEnglish ? 'View Contract Templates →' : 'Sözleşme Şablonlarını Görüntüle →'}
              </Link>
            </div>

            {/* Related Resources */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Step-by-step guide to forming a US LLC' : 'ABD\'de LLC kurma adım adım rehberi'}</p>
                </Link>
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'IRS & Tax Realities' : 'IRS ve Vergi Gerçekleri'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'W-8, W-9, and tax obligations' : 'W-8, W-9 ve vergi yükümlülükleri'}</p>
                </Link>
              </div>
            </section>

            {/* Author Box */}
            <section className="border border-gray-200 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-3">{isEnglish ? 'Author' : 'Yazar'}</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
                  EL
                </div>
                <div>
                  <h3 className="font-semibold text-black">EchoLegal</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isEnglish ? 'Content reviewed by a New York-licensed attorney' : 'İçerik New York lisanslı bir avukat tarafından incelenmektedir'}
                  </p>
                </div>
              </div>
            </section>

            {/* Final Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal advice. Contract templates and guidance should be reviewed by a qualified attorney for your specific situation and jurisdiction. EchoLegal is not a law firm and does not provide legal representation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır ve hukuki danışmanlık teşkil etmez. Sözleşme şablonları ve rehberlik, kendi durumunuz ve yargı yetkiniz için uzman bir avukat tarafından incelenmelidir. EchoLegal bir hukuk bürosu değildir ve hukuki temsil sağlamamaktadır.'}
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
