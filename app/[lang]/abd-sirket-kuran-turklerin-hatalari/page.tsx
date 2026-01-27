import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? '7 Legal Mistakes Turkish Entrepreneurs Make When Forming US Companies | EchoLegal'
    : 'ABD\'de Sirket Kuran Turklerin Yaptigi 7 Hukuki Hata | EchoLegal'

  const description = isEnglish
    ? 'The most common legal mistakes Turkish entrepreneurs make when forming US companies—and how to avoid costly errors with LLCs, taxes, and compliance.'
    : 'Turk girisimcilerin ABD sirketi kurarken yaptiklari en yaygin hukuki hatalar—ve LLC, vergi ve uyumla ilgili maliyetli hatalardan nasil kacinilir.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-sirket-kuran-turklerin-hatalari`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-sirket-kuran-turklerin-hatalari',
        'tr': 'https://echo-legal.com/tr/abd-sirket-kuran-turklerin-hatalari',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function MistakesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: isEnglish
        ? '7 Legal Mistakes Turkish Entrepreneurs Make When Forming US Companies'
        : 'ABD\'de Sirket Kuran Turklerin Yaptigi 7 Hukuki Hata',
      author: {
        '@type': 'Person',
        name: 'Zeynep Ruziye Moore',
        jobTitle: 'Attorney, New York Bar',
      },
      datePublished: '2026-01-15',
      dateModified: '2026-01-27',
      publisher: {
        '@type': 'Organization',
        name: 'EchoLegal',
        url: 'https://echo-legal.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (isEnglish ? [
        {
          question: 'Do I need an Operating Agreement for a single-member LLC?',
          answer: 'Yes. Banks require an Operating Agreement to open a business account, and states like New York and Delaware legally mandate one. Without it, courts may disregard your LLC\'s liability protection.',
        },
        {
          question: 'What is Form 5472 and why does it matter for Turkish LLC owners?',
          answer: 'Form 5472 is an IRS information return required for foreign-owned single-member LLCs. Failure to file carries a $25,000 penalty per form. It must be filed annually by April 15, even if the LLC had no income.',
        },
        {
          question: 'Which US state should a Turkish entrepreneur choose for an LLC?',
          answer: 'The best state depends on where your customers and operations are located. Forming in Delaware or Wyoming without actual business there can result in duplicate registration fees and filing requirements in your actual state of operation.',
        },
        {
          question: 'Can the Turkey-US tax treaty reduce my withholding tax?',
          answer: 'Yes. The Turkey-US tax treaty can reduce withholding rates from 30% to between 0% and 15%, depending on the type of income. You must file Form W-8BEN or W-8BEN-E and provide your Turkish TC Kimlik number to claim these benefits.',
        },
        {
          question: 'What happens if I mix personal and business finances in my LLC?',
          answer: 'Mixing personal and business funds can cause courts to "pierce the corporate veil," eliminating your limited liability protection. The IRS may also treat the LLC as a disregarded entity for enforcement purposes, making you personally liable for all business debts.',
        },
      ] : [
        {
          question: 'Tek uyeli LLC icin Operating Agreement gerekli mi?',
          answer: 'Evet. Bankalar is hesabi acmak icin Operating Agreement ister ve New York ile Delaware gibi eyaletler bunu yasal olarak zorunlu kilar. Olmadan mahkemeler LLC\'nizin sorumluluk korumasini gecersiz sayabilir.',
        },
        {
          question: 'Form 5472 nedir ve Turk LLC sahipleri icin neden onemlidir?',
          answer: 'Form 5472, yabanciya ait tek uyeli LLC\'ler icin zorunlu bir IRS bilgi beyannesidir. Dosyalamamanin cezasi form basina 25.000 dolardir. LLC geliri olmasa bile her yil 15 Nisan\'a kadar dosyalanmalidir.',
        },
        {
          question: 'Turk girisimci LLC icin hangi ABD eyaletini secmeli?',
          answer: 'En iyi eyalet, musterilerinizin ve operasyonlarinizin nerede olduguna baglidir. Orada gercek isiniz olmadan Delaware veya Wyoming\'de sirket kurmak, faaliyet gosterdiginiz eyalette mukerrer kayit ucretleri ve dosyalama gereksinimlerine yol acabilir.',
        },
        {
          question: 'Turkiye-ABD vergi anlasmasi stopaj vergimi dusurur mu?',
          answer: 'Evet. Turkiye-ABD vergi anlasmasi, gelir turune bagli olarak stopaj oranlarini %30\'dan %0-15 arasina dusebilir. Bu avantajlardan yararlanmak icin W-8BEN veya W-8BEN-E formu doldurup Turk TC Kimlik numaranizi sunmaniz gerekir.',
        },
        {
          question: 'LLC\'mde kisisel ve is finanslarini karistirirsam ne olur?',
          answer: 'Kisisel ve is fonlarini karistirmak mahkemelerin "kurumsal perdeyi delmesine" yol acabilir ve sinirli sorumluluk korumanizi ortadan kaldirir. IRS ayrica LLC\'nizi uygulama amaciyla dikkate almayarak sizi tum is borclarindan kisisel olarak sorumlu tutabilir.',
        },
      ]).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]

  const mistakes = isEnglish ? [
    {
      num: 1,
      title: 'Not Having an Operating Agreement',
      problem: 'Many Turkish entrepreneurs skip the Operating Agreement thinking it is optional or unnecessary for single-member LLCs.',
      consequence: 'Banks will reject your account opening. Courts may "pierce the corporate veil" and hold you personally liable. You will face issues with payment processors.',
      solution: 'Create an Operating Agreement before opening any bank accounts. It is required by banks, protects your liability, and is legally mandated in states like Delaware and New York.',
      link: '/operating-agreement-zorunlu-mu',
      linkText: isEnglish ? 'Learn more about Operating Agreements' : 'Operating Agreement hakkinda daha fazla bilgi',
    },
    {
      num: 2,
      title: 'Forgetting Form 5472 (IRS Reporting)',
      problem: 'Foreign-owned single-member LLCs must file Form 5472 annually with a pro forma Form 1120. Most Turkish LLC owners do not know this requirement exists.',
      consequence: '$25,000 penalty per form for late or missing filing. This is one of the highest penalties in the tax code.',
      solution: 'File Form 5472 by April 15 each year (or with extension). Even if your LLC had zero income. Keep records of all transactions between you and your LLC.',
      link: '/abd-llc-irs-mektubu-neden-gelir',
      linkText: 'Understanding IRS requirements',
    },
    {
      num: 3,
      title: 'Mixing Personal and Business Finances',
      problem: 'Using personal accounts for business transactions, or using LLC funds for personal expenses without proper documentation.',
      consequence: 'Loss of limited liability protection. The IRS and courts can treat your LLC as a "sham" entity and hold you personally responsible for all debts.',
      solution: 'Open a dedicated US business bank account. Never mix personal and business funds. Document all transactions properly.',
      link: '/abd-llc-banka-hesabi-acmak',
      linkText: 'How to open a US business bank account',
    },
    {
      num: 4,
      title: 'Choosing the Wrong State',
      problem: 'Forming an LLC in Delaware or Wyoming because "everyone does" without understanding tax implications when you have no actual business there.',
      consequence: 'You may need to register as a foreign LLC in states where you actually do business, doubling your fees and filing requirements.',
      solution: 'Consider where your customers are, where you will have employees, and your actual business activities. Sometimes your home state (if you have US presence) is the best choice.',
      link: '/abd-de-llc-kurmak-turkler-icin-adim-adim',
      linkText: 'State selection guide',
    },
    {
      num: 5,
      title: 'No Written Contracts with Clients',
      problem: 'Working on handshake deals or vague email agreements instead of proper contracts.',
      consequence: 'No legal protection when clients do not pay, scope creep, or disputes arise. Difficult to enforce payment across international borders.',
      solution: 'Use written Service Agreements for every client relationship. Include payment terms, scope, deliverables, and dispute resolution clauses.',
      link: '/service-agreement-neden-gerekli',
      linkText: 'Why you need a Service Agreement',
    },
    {
      num: 6,
      title: 'Ignoring Privacy Policy and Terms Requirements',
      problem: 'Running a website or app without Privacy Policy and Terms of Service, especially when serving US customers.',
      consequence: 'CCPA violations (California) can cost $7,500 per incident. Platform bans from Stripe, PayPal, app stores. Loss of customer trust.',
      solution: 'Have compliant Privacy Policy and Terms of Service on your website. Update them for GDPR, CCPA, and KVKK as needed.',
      link: '/abd-privacy-policy-zorunlu-mu',
      linkText: 'Do you need a Privacy Policy?',
    },
    {
      num: 7,
      title: 'Not Understanding Tax Treaty Benefits',
      problem: 'Paying 30% US withholding tax on income when treaty benefits could reduce or eliminate it.',
      consequence: 'Overpaying taxes significantly. Turkey-US treaty can reduce withholding to 0-15% depending on income type.',
      solution: 'Complete Form W-8BEN (individuals) or W-8BEN-E (LLCs) to claim treaty benefits. Provide your Turkish TC Kimlik number.',
      link: '/w-8ben-formu-nasil-doldurulur',
      linkText: 'How to fill out W-8BEN',
    },
  ] : [
    {
      num: 1,
      title: 'Operating Agreement Olmadan Ilerlemek',
      problem: 'Bircok Turk girisimci, istege bagli veya tek uyeli LLC\'ler icin gereksiz oldugunu dusunerek Operating Agreement\'i atliyor.',
      consequence: 'Bankalar hesap acma talebinizi reddedecek. Mahkemeler "kurumsal perdeyi delip" sizi kisisel olarak sorumlu tutabilir. Odeme islemcileriyle sorun yasarsiniz.',
      solution: 'Herhangi bir banka hesabi acmadan once Operating Agreement olusturun. Bankalar tarafindan gereklidir, sorumlulugunuzu korur ve Delaware ve New York gibi eyaletlerde yasal olarak zorunludur.',
      link: '/operating-agreement-zorunlu-mu',
      linkText: 'Operating Agreement hakkinda daha fazla bilgi',
    },
    {
      num: 2,
      title: 'Form 5472\'yi Unutmak (IRS Raporlamasi)',
      problem: 'Yabanciya ait tek uyeli LLC\'ler yillik olarak pro forma Form 1120 ile Form 5472 dosyalamalidir. Cogu Turk LLC sahibi bu gereksinimin varligini bilmiyor.',
      consequence: 'Gec veya eksik dosyalama icin form basina 25.000$ ceza. Bu, vergi yasasindaki en yuksek cezalardan biridir.',
      solution: 'Her yil 15 Nisan\'a kadar (veya uzatmayla) Form 5472 dosyalayin. LLC\'nizin sifir geliri olsa bile. Siz ve LLC\'niz arasindaki tum islemlerin kayitlarini tutun.',
      link: '/abd-llc-irs-mektubu-neden-gelir',
      linkText: 'IRS gereksinimlerini anlama',
    },
    {
      num: 3,
      title: 'Kisisel ve Is Finanslarini Karistirmak',
      problem: 'Is islemleri icin kisisel hesaplari kullanmak veya LLC fonlarini uygun belgeleme olmadan kisisel harcamalar icin kullanmak.',
      consequence: 'Sinirli sorumluluk korumasinin kaybi. IRS ve mahkemeler LLC\'nizi "sahte" bir varlik olarak degerlendirebilir ve sizi tum borclardan kisisel olarak sorumlu tutabilir.',
      solution: 'Ozel bir ABD is banka hesabi acin. Kisisel ve is fonlarini asla karistirmayin. Tum islemleri duzgun bir sekilde belgeleyin.',
      link: '/abd-llc-banka-hesabi-acmak',
      linkText: 'ABD is banka hesabi nasil acilir',
    },
    {
      num: 4,
      title: 'Yanlis Eyalet Secmek',
      problem: 'Orada gercek isiniz olmadan vergi etkilerini anlamadan "herkes yapiyor" diye Delaware veya Wyoming\'de LLC kurmak.',
      consequence: 'Gercekten is yaptiginiz eyaletlerde yabanci LLC olarak kaydolmaniz gerekebilir, bu da ucretlerinizi ve dosyalama gereksinimlerinizi ikiye katlar.',
      solution: 'Musterilerinizin nerede oldugunu, nerede calisanlariniz olacagini ve gercek is faaliyetlerinizi dusunun. Bazen kendi eyaletiniz (ABD\'de varliginiz varsa) en iyi secimdir.',
      link: '/abd-de-llc-kurmak-turkler-icin-adim-adim',
      linkText: 'Eyalet secim rehberi',
    },
    {
      num: 5,
      title: 'Musterilerle Yazili Sozlesme Yapmamak',
      problem: 'Uygun sozlesmeler yerine el sikisma anlasmalari veya belirsiz e-posta anlasmalariyla calismak.',
      consequence: 'Musteriler odemediginde, kapsam genislemesi veya anlasmazliklar ortaya ciktiginda hukuki koruma yok. Uluslararasi sinirlar arasinda odeme uygulamak zor.',
      solution: 'Her musteri iliskisi icin yazili Hizmet Sozlesmeleri kullanin. Odeme kosullari, kapsam, teslim edilecekler ve uyusmazlik cozum maddelerini ekleyin.',
      link: '/service-agreement-neden-gerekli',
      linkText: 'Neden Service Agreement gerekli',
    },
    {
      num: 6,
      title: 'Privacy Policy ve Terms Gereksinimlerini Gormezden Gelmek',
      problem: 'Ozellikle ABD musterilerine hizmet verirken Privacy Policy ve Terms of Service olmadan web sitesi veya uygulama calistirmak.',
      consequence: 'CCPA ihlalleri (Kaliforniya) olay basina 7.500$ mal olabilir. Stripe, PayPal, uygulama magazalarindan yasaklanma. Musteri guveninin kaybi.',
      solution: 'Web sitenizde uyumlu Privacy Policy ve Terms of Service bulundurun. GDPR, CCPA ve KVKK icin gerektigi gibi guncelleyin.',
      link: '/abd-privacy-policy-zorunlu-mu',
      linkText: 'Privacy Policy gerekli mi?',
    },
    {
      num: 7,
      title: 'Vergi Anlasmasi Avantajlarini Anlamamak',
      problem: 'Anlasma avantajlari azaltabilir veya ortadan kaldirabilirken gelir uzerinden %30 ABD stopaj vergisi odemek.',
      consequence: 'Onemli olcude fazla vergi odemek. Turkiye-ABD anlasmasi, gelir turune bagli olarak stopaji %0-15\'e dusurebilir.',
      solution: 'Anlasma avantajlarini talep etmek icin W-8BEN (bireyler) veya W-8BEN-E (LLC\'ler) formunu doldurun. Turk TC Kimlik numaranizi saglayin.',
      link: '/w-8ben-formu-nasil-doldurulur',
      linkText: 'W-8BEN nasil doldurulur',
    },
  ]

  const faqs = isEnglish ? [
    {
      q: 'Do I need an Operating Agreement for a single-member LLC?',
      a: 'Yes. Banks require an Operating Agreement to open a business account, and states like New York and Delaware legally mandate one. Without it, courts may disregard your LLC\'s liability protection.',
    },
    {
      q: 'What is Form 5472 and why does it matter for Turkish LLC owners?',
      a: 'Form 5472 is an IRS information return required for foreign-owned single-member LLCs. Failure to file carries a $25,000 penalty per form. It must be filed annually by April 15, even if the LLC had no income.',
    },
    {
      q: 'Which US state should a Turkish entrepreneur choose for an LLC?',
      a: 'The best state depends on where your customers and operations are located. Forming in Delaware or Wyoming without actual business there can result in duplicate registration fees and filing requirements in your actual state of operation.',
    },
    {
      q: 'Can the Turkey-US tax treaty reduce my withholding tax?',
      a: 'Yes. The Turkey-US tax treaty can reduce withholding rates from 30% to between 0% and 15%, depending on the type of income. You must file Form W-8BEN or W-8BEN-E and provide your Turkish TC Kimlik number to claim these benefits.',
    },
    {
      q: 'What happens if I mix personal and business finances in my LLC?',
      a: 'Mixing personal and business funds can cause courts to "pierce the corporate veil," eliminating your limited liability protection. The IRS may also treat the LLC as a disregarded entity for enforcement purposes, making you personally liable for all business debts.',
    },
  ] : [
    {
      q: 'Tek uyeli LLC icin Operating Agreement gerekli mi?',
      a: 'Evet. Bankalar is hesabi acmak icin Operating Agreement ister ve New York ile Delaware gibi eyaletler bunu yasal olarak zorunlu kilar. Olmadan mahkemeler LLC\'nizin sorumluluk korumasini gecersiz sayabilir.',
    },
    {
      q: 'Form 5472 nedir ve Turk LLC sahipleri icin neden onemlidir?',
      a: 'Form 5472, yabanciya ait tek uyeli LLC\'ler icin zorunlu bir IRS bilgi beyannesidir. Dosyalamamanin cezasi form basina 25.000 dolardir. LLC geliri olmasa bile her yil 15 Nisan\'a kadar dosyalanmalidir.',
    },
    {
      q: 'Turk girisimci LLC icin hangi ABD eyaletini secmeli?',
      a: 'En iyi eyalet, musterilerinizin ve operasyonlarinizin nerede olduguna baglidir. Orada gercek isiniz olmadan Delaware veya Wyoming\'de sirket kurmak, faaliyet gosterdiginiz eyalette mukerrer kayit ucretleri ve dosyalama gereksinimlerine yol acabilir.',
    },
    {
      q: 'Turkiye-ABD vergi anlasmasi stopaj vergimi dusurur mu?',
      a: 'Evet. Turkiye-ABD vergi anlasmasi, gelir turune bagli olarak stopaj oranlarini %30\'dan %0-15 arasina dusebilir. Bu avantajlardan yararlanmak icin W-8BEN veya W-8BEN-E formu doldurup Turk TC Kimlik numaranizi sunmaniz gerekir.',
    },
    {
      q: 'LLC\'mde kisisel ve is finanslarini karistirirsam ne olur?',
      a: 'Kisisel ve is fonlarini karistirmak mahkemelerin "kurumsal perdeyi delmesine" yol acabilir ve sinirli sorumluluk korumanizi ortadan kaldirir. IRS ayrica LLC\'nizi uygulama amaciyla dikkate almayarak sizi tum is borclarindan kisisel olarak sorumlu tutabilir.',
    },
  ]

  const relatedPages = isEnglish ? [
    { href: `/${lang}/operating-agreement-zorunlu-mu`, title: 'Is an Operating Agreement Required?' },
    { href: `/${lang}/abd-llc-irs-mektubu-neden-gelir`, title: 'Why Does the IRS Send Letters to LLCs?' },
    { href: `/${lang}/abd-privacy-policy-zorunlu-mu`, title: 'Is a Privacy Policy Required in the US?' },
  ] : [
    { href: `/${lang}/operating-agreement-zorunlu-mu`, title: 'Operating Agreement Zorunlu mu?' },
    { href: `/${lang}/abd-llc-irs-mektubu-neden-gelir`, title: 'IRS Neden LLC\'lere Mektup Gonderir?' },
    { href: `/${lang}/abd-privacy-policy-zorunlu-mu`, title: 'ABD\'de Privacy Policy Zorunlu mu?' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' / '}
          <span className="text-black font-medium">{isEnglish ? '7 Legal Mistakes' : '7 Hukuki Hata'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? '7 Legal Mistakes Turkish Entrepreneurs Make'
              : 'ABD\'de Sirket Kuran Turklerin Yaptigi 7 Hukuki Hata'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The most common (and costly) mistakes—and how to avoid them when forming and running a US company.'
              : 'En yaygin (ve maliyetli) hatalar—ve ABD sirketi kurarken ve yonetirken bunlardan nasil kacinilir.'}
          </p>

          {/* Snippet-optimized direct answer */}
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {isEnglish
              ? 'The seven most common legal mistakes Turkish entrepreneurs make when forming a US company are: operating without an Operating Agreement, failing to file Form 5472, mixing personal and business finances, choosing the wrong state, not using written contracts, ignoring privacy policy requirements, and not claiming tax treaty benefits. Each of these errors can result in significant financial penalties, loss of liability protection, or regulatory action.'
              : 'Turk girisimcilerin ABD\'de sirket kurarken yaptigi yedi en yaygin hukuki hata sunlardir: Operating Agreement olmadan ilerlemek, Form 5472 dosyalamamak, kisisel ve is finanslarini karistirmak, yanlis eyalet secmek, yazili sozlesme kullanmamak, privacy policy gereksinimlerini gormezden gelmek ve vergi anlasmasi avantajlarindan yararlanmamak. Bu hatalarin her biri ciddi mali cezalara, sorumluluk korumasinin kaybina veya duzenleyici isleme yol acabilir.'}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">ZM</div>
              <div>
                <p className="font-medium text-black">Zeynep Ruziye Moore</p>
                <p>{isEnglish ? 'Attorney, New York Bar | US-Turkey Legal Practice' : 'Avukat, New York Barosu | ABD-Turkiye Hukuk Pratigi'}</p>
              </div>
            </div>
            <span>|</span>
            <span>{isEnglish ? 'Updated: January 2026' : 'Guncelleme: Ocak 2026'}</span>
          </div>

          {/* Mistakes */}
          <div className="space-y-10">
            {mistakes.map((mistake) => (
              <section key={mistake.num} className="border-l-4 border-[#C9A227] pl-6">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-[#C9A227]">#{mistake.num}</span> {mistake.title}
                </h2>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">{isEnglish ? 'The Mistake:' : 'Hata:'}</p>
                    <p className="text-gray-700">{mistake.problem}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">{isEnglish ? 'Consequence:' : 'Sonuc:'}</p>
                    <p className="text-gray-700">{mistake.consequence}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-1">{isEnglish ? 'Solution:' : 'Cozum:'}</p>
                    <p className="text-gray-700">{mistake.solution}</p>
                  </div>

                  <Link href={`/${lang}${mistake.link}`} className="text-[#C9A227] hover:underline inline-block">
                    {mistake.linkText}
                  </Link>
                </div>
              </section>
            ))}
          </div>

          {/* Bu Risk Nasil Onlenir? */}
          <section className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">
              {isEnglish ? 'How to Prevent These Risks' : 'Bu Riskler Nasil Onlenir?'}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {isEnglish
                ? 'Avoiding these seven mistakes requires a systematic approach to US company formation. Before filing your LLC, prepare an Operating Agreement, open a dedicated business bank account, and establish a compliance calendar for annual filings such as Form 5472. Engage a qualified attorney who understands both US corporate law and Turkish tax obligations. Ensure your website has compliant legal policies, use written contracts for every client engagement, and file the appropriate W-8BEN forms to claim tax treaty benefits from the outset.'
                : 'Bu yedi hatadan kacinmak, ABD sirket kurulusuna sistematik bir yaklasim gerektirir. LLC basvurunuzu yapmadan once bir Operating Agreement hazirlayin, ozel bir is banka hesabi acin ve Form 5472 gibi yillik dosyalamalar icin bir uyum takvimi olusturun. Hem ABD sirketler hukukunu hem de Turk vergi yukumluluklerini anlayan nitelikli bir avukatla calisin. Web sitenizde uyumlu yasal politikalar bulundurun, her musteri iliskisi icin yazili sozlesmeler kullanin ve basindan itibaren vergi anlasmasi avantajlarindan yararlanmak icin uygun W-8BEN formlarini dosyalayin.'}
            </p>
            <div className="space-y-2 text-gray-700">
              {(isEnglish ? [
                'Prepare your Operating Agreement before any bank applications',
                'Set calendar reminders for April 15 Form 5472 deadline',
                'Maintain strict separation of personal and business accounts',
                'Review state registration requirements annually',
                'Audit your website for Privacy Policy and Terms of Service compliance',
                'File W-8BEN or W-8BEN-E to claim treaty benefits immediately',
                'Use written Service Agreements for every client relationship',
              ] : [
                'Banka basvurularindan once Operating Agreement\'inizi hazirlayin',
                '15 Nisan Form 5472 son tarihi icin takvim hatirlaticilari ayarlayin',
                'Kisisel ve is hesaplarinin kesin ayrimini koruyun',
                'Eyalet kayit gereksinimlerini yillik olarak gozden gecirin',
                'Web sitenizi Privacy Policy ve Terms of Service uyumu icin denetleyin',
                'Anlasma avantajlarindan hemen yararlanmak icin W-8BEN veya W-8BEN-E dosyalayin',
                'Her musteri iliskisi icin yazili Hizmet Sozlesmeleri kullanin',
              ]).map((item, i) => (
                <p key={i}>— {item}</p>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              {isEnglish ? 'Frequently Asked Questions' : 'Sikca Sorulan Sorular'}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Compliance Checklist */}
          <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-2">{isEnglish ? 'Quick Compliance Checklist' : 'Hizli Uyum Kontrol Listesi'}</h2>
            <p className="text-gray-400 text-sm mb-6">
              {isEnglish
                ? 'Compliance checklist template available — Pay What You Can — $20 recommended'
                : 'Uyum kontrol listesi sablonu mevcut — Pay What You Can — $20 onerilen'}
            </p>
            <div className="space-y-3">
              {(isEnglish ? [
                'Operating Agreement created and signed',
                'Form 5472 filed annually (by April 15)',
                'Separate business bank account opened',
                'Written contracts with all clients',
                'Privacy Policy and Terms of Service on website',
                'W-8BEN/W-8BEN-E completed for treaty benefits',
                'State registration requirements understood',
              ] : [
                'Operating Agreement olusturuldu ve imzalandi',
                'Form 5472 yillik olarak dosyalandi (15 Nisan\'a kadar)',
                'Ayri is banka hesabi acildi',
                'Tum musterilerle yazili sozlesmeler',
                'Web sitesinde Privacy Policy ve Terms of Service',
                'Anlasma avantajlari icin W-8BEN/W-8BEN-E tamamlandi',
                'Eyalet kayit gereksinimleri anlasildi',
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[#C9A227]">—</span>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Related Pages */}
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">
              {isEnglish ? 'Related Articles' : 'Ilgili Yazilar'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPages.map((page, i) => (
                <Link
                  key={i}
                  href={page.href}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-[#C9A227] hover:shadow-sm transition-all"
                >
                  <span className="text-[#C9A227] font-medium">{page.title}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Legal Disclaimer */}
          <section className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-xs text-gray-400 leading-relaxed">
              {isEnglish
                ? 'Disclaimer: This article is provided for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by reading this content. Laws and regulations change frequently; the information presented may not reflect the most current legal developments. For advice specific to your situation, consult a licensed attorney. EchoLegal and the author disclaim all liability for actions taken or not taken based on this content.'
                : 'Yasal Uyari: Bu makale yalnizca genel bilgilendirme amaciyla sunulmaktadir ve hukuki danismanlik teskil etmez. Bu icerigi okumakla avukat-muvekkil iliskisi kurulmaz. Yasalar ve duzenlemeler sik sik degisir; sunulan bilgiler en guncel yasal gelismeleri yansitmayabilir. Durumunuza ozel tavsiye icin lisansli bir avukata danisin. EchoLegal ve yazar, bu icerige dayanilarak yapilan veya yapilmayan eylemlerden dogan tum sorumlulugu reddeder.'}
            </p>
          </section>

        </article>
      </main>
    </>
  )
}
