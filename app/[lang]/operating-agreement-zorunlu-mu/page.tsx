import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Is an Operating Agreement Required for a US LLC? | EchoLegal'
    : 'Operating Agreement Zorunlu mu? ABD LLC Icin Gereklilik ve Icerik | EchoLegal'

  const description = isEnglish
    ? 'An Operating Agreement is legally required in five US states and practically required by all banks. This article explains state requirements, essential clauses, and single-member vs multi-member differences.'
    : 'Operating Agreement bes ABD eyaletinde yasal olarak zorunludur ve tum bankalar tarafindan fiilen istenmektedir. Bu makale eyalet gereksinimlerini, temel maddeleri ve tek uyeli ile cok uyeli farklarini aciklar.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/operating-agreement-zorunlu-mu`,
      languages: {
        'en': 'https://echo-legal.com/en/operating-agreement-zorunlu-mu',
        'tr': 'https://echo-legal.com/tr/operating-agreement-zorunlu-mu',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function OperatingAgreementPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const faqItems = isEnglish ? [
    { q: 'Do I need to file my Operating Agreement with the state?', a: 'No. An Operating Agreement is an internal document. You keep it in your records but do not file it with any government agency. However, banks, courts, and the IRS may request to see it.' },
    { q: 'Can I write my own Operating Agreement?', a: 'It is possible, but a poorly drafted agreement can create significant problems later. Using an attorney-reviewed template or having an attorney draft one is strongly recommended.' },
    { q: 'Can I change my Operating Agreement later?', a: 'Yes. Most Operating Agreements include an amendment provision. Typically, all members must agree to any changes.' },
    { q: 'What if I do not have one and need to open a bank account?', a: 'You should create one immediately. Banks will not open business accounts without an Operating Agreement. A properly prepared agreement can be completed in a single day using an appropriate template.' },
    { q: 'Is an Operating Agreement the same as Articles of Organization?', a: 'No. Articles of Organization are filed with the state to create the LLC. The Operating Agreement is a separate, internal document that governs how the LLC operates. Both are needed.' },
  ] : [
    { q: 'Operating Agreement\'i eyalete dosyalamam gerekir mi?', a: 'Hayir. Operating Agreement dahili bir belgedir. Kayitlarinizda tutarsiniz ancak herhangi bir devlet kurumuna dosyalamak gerekmez. Bankalar, mahkemeler veya IRS gormek isteyebilir.' },
    { q: 'Kendi Operating Agreement\'imi yazabilir miyim?', a: 'Mumkundur, ancak kotu hazirlanmis bir sozlesme ileride ciddi sorunlara yol acabilir. Avukat tarafindan incelenmis bir sablon kullanmak veya bir avukata hazirlatmak tavsiye edilir.' },
    { q: 'Operating Agreement\'i daha sonra degistirebilir miyim?', a: 'Evet. Cogu Operating Agreement bir degisiklik hukmunu icerir. Genellikle tum uyelerin degisiklikleri onaylamasi gerekir.' },
    { q: 'Yoksa ve banka hesabi acmam gerekiyorsa ne yapmaliyim?', a: 'Derhal bir tane hazirlayiniz. Bankalar Operating Agreement olmadan is hesabi acmaz. Uygun bir sablon kullanilarak bir gunde hazirlanabilir.' },
    { q: 'Operating Agreement ile Articles of Organization ayni sey mi?', a: 'Hayir. Articles of Organization LLC\'yi olusturmak icin eyalete dosyalanan belgedir. Operating Agreement ise LLC\'nin nasil isletilecegini duzenleyen ayri, dahili bir belgedir. Her ikisi de gereklidir.' },
  ]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: isEnglish
        ? 'Is an Operating Agreement Required for a US LLC?'
        : 'Operating Agreement ABD LLC Icin Zorunlu mu?',
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
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' / '}
          <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="hover:text-black">
            {isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}
          </Link>
          {' / '}
          <span className="text-black font-medium">{isEnglish ? 'Operating Agreement' : 'Operating Agreement'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Is an Operating Agreement Required?'
              : 'Operating Agreement Zorunlu mu?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Legally required in five states, practically required everywhere. This article covers state-by-state rules, essential clauses, and the differences between single-member and multi-member agreements.'
              : 'Bes eyalette yasal olarak zorunlu, pratikte her yerde gerekli. Bu makale eyalet bazinda kurallari, temel maddeleri ve tek uyeli ile cok uyeli sozlesme farklarini ele alir.'}
          </p>

          {/* Snippet-optimized direct answer */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {isEnglish
              ? 'An Operating Agreement is legally required in five US states: California, Delaware, Maine, Missouri, and New York. In all other states, it is not mandated by statute but is required by virtually every bank to open a business account, by payment processors during verification, and by courts when evaluating whether an LLC\'s liability protection should be upheld. Every LLC, whether single-member or multi-member, should have a properly drafted Operating Agreement.'
              : 'Operating Agreement bes ABD eyaletinde yasal olarak zorunludur: California, Delaware, Maine, Missouri ve New York. Diger tum eyaletlerde kanunla zorunlu tutulmasa da, is hesabi acmak icin neredeyse her banka tarafindan, dogrulama sirasinda odeme islemcileri tarafindan ve LLC\'nin sorumluluk korumasinin gecerliligini degerlendirirken mahkemeler tarafindan istenmektedir. Tek uyeli veya cok uyeli farketmeksizin, her LLC\'nin uygun sekilde hazirlanmis bir Operating Agreement\'a sahip olmasi gerekir.'}
          </p>

          {/* Author block */}
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

          {/* What is an Operating Agreement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What Is an Operating Agreement?' : 'Operating Agreement Nedir?'}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish
                ? 'An Operating Agreement is an internal document that defines how an LLC will be governed and operated. It is not filed with the state. The agreement typically covers the following areas:'
                : 'Operating Agreement, bir LLC\'nin nasil yonetilecegini ve isletilecegini tanimliyan dahili bir belgedir. Eyalete dosyalanmaz. Sozlesme genellikle su alanlari kapsar:'}
            </p>
            <ul className="space-y-2 mb-6">
              {(isEnglish ? [
                'Ownership percentages and capital contributions',
                'How profits and losses are distributed',
                'Member voting rights and decision-making processes',
                'Management structure (member-managed vs manager-managed)',
                'What happens if a member leaves or dies',
                'How the LLC can be dissolved',
              ] : [
                'Sahiplik yuzdeleri ve sermaye katkilari',
                'Kar ve zararlarin nasil dagitilacagi',
                'Uye oy haklari ve karar alma surecleri',
                'Yonetim yapisi (uye yonetimli veya yonetici yonetimli)',
                'Bir uye ayrilirsa veya olurse ne olacagi',
                'LLC\'nin nasil feshedilebilecegi',
              ]).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-gray-400 mr-2">{'\u2014'}</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* State Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'State-by-State Legal Requirements' : 'Eyalete Gore Yasal Gereksinimler'}</h2>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'States Where Legally Required' : 'Yasal Olarak Zorunlu Olan Eyaletler'}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {['California', 'Delaware', 'Maine', 'Missouri', 'New York'].map((state) => (
                  <span key={state} className="bg-red-100 text-red-800 px-3 py-2 rounded text-center text-sm font-medium">{state}</span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">{isEnglish ? 'Popular LLC States' : 'Populer LLC Eyaletleri'}</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">Delaware</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Required. Delaware LLC Act Section 18-101(7) mandates a written Operating Agreement.'
                      : 'Zorunlu. Delaware LLC Yasasi Bolum 18-101(7) yazili bir Operating Agreement zorunlu kilar.'}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Wyoming</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Not legally required. If absent, state default rules apply.'
                      : 'Yasal olarak zorunlu degil. Yoksa eyalet varsayilan kurallari gecerli olur.'}
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">New York</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Required within 90 days of formation. NY LLC Law Section 417 mandates a written Operating Agreement.'
                      : 'Kurulustan sonraki 90 gun icinde zorunlu. NY LLC Yasasi Bolum 417 yazili bir Operating Agreement gerektirir.'}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Florida</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Not legally required. Courts will look for one when disputes arise.'
                      : 'Yasal olarak zorunlu degil. Anlaşmazlıklar ortaya ciktiginda mahkemeler bir tane arar.'}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Texas</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Not legally required. Referred to as a "Company Agreement" in Texas statute.'
                      : 'Yasal olarak zorunlu degil. Texas mevzuatinda "Company Agreement" olarak anilir.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why You Need One */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Why an Operating Agreement Is Necessary Even When Not Required by Law' : 'Yasal Zorunluluk Olmasa Bile Neden Gereklidir'}</h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">{'\u2014'}</span>
                <div>
                  <span className="font-semibold">{isEnglish ? 'Bank account opening.' : 'Banka hesabi acma.'}</span>{' '}
                  <span className="text-gray-600">
                    {isEnglish
                      ? 'Virtually every US bank — Mercury, Relay, Chase, Bank of America — requires an Operating Agreement to open a business account.'
                      : 'Neredeyse her ABD bankasi — Mercury, Relay, Chase, Bank of America — is hesabi acmak icin Operating Agreement ister.'}
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">{'\u2014'}</span>
                <div>
                  <span className="font-semibold">{isEnglish ? 'Liability protection.' : 'Sorumluluk korumasi.'}</span>{' '}
                  <span className="text-gray-600">
                    {isEnglish
                      ? 'Without an Operating Agreement, courts may pierce the corporate veil and hold members personally liable for LLC debts.'
                      : 'Operating Agreement olmadan, mahkemeler kurumsal perdeyi delebilir ve uyeleri LLC borclarindan kisisel olarak sorumlu tutabilir.'}
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">{'\u2014'}</span>
                <div>
                  <span className="font-semibold">{isEnglish ? 'Payment processor verification.' : 'Odeme islemcisi dogrulamasi.'}</span>{' '}
                  <span className="text-gray-600">
                    {isEnglish
                      ? 'Stripe, PayPal, and other payment processors may request the agreement during account verification.'
                      : 'Stripe, PayPal ve diger odeme islemcileri hesap dogrulamasi sirasinda sozlesmeyi isteyebilir.'}
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">{'\u2014'}</span>
                <div>
                  <span className="font-semibold">{isEnglish ? 'Avoiding state default rules.' : 'Eyalet varsayilan kurallarindan kacinma.'}</span>{' '}
                  <span className="text-gray-600">
                    {isEnglish
                      ? 'Without an Operating Agreement, the state\'s default LLC rules govern your company. These rules may not reflect the members\' actual intentions.'
                      : 'Operating Agreement olmadan, eyaletin varsayilan LLC kurallari sirketinizi yonetir. Bu kurallar uyelerin gercek niyetlerini yansitmayabilir.'}
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* Single-Member vs Multi-Member */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Single-Member vs Multi-Member LLCs' : 'Tek Uyeli ve Cok Uyeli LLC\'ler'}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'Single-Member LLC' : 'Tek Uyeli LLC'}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {isEnglish
                    ? 'Even with a single owner, an Operating Agreement serves important functions:'
                    : 'Tek sahip olsa bile Operating Agreement onemli islevler gorur:'}
                </p>
                <ul className="space-y-2 text-sm">
                  {(isEnglish ? [
                    'Documents that the LLC is a separate legal entity from the owner',
                    'Required by most banks for account opening',
                    'Protects limited liability status in court',
                    'Establishes procedures for adding members in the future',
                  ] : [
                    'LLC\'nin sahibinden ayri bir tuzel kisilik oldugunu belgeler',
                    'Cogu banka tarafindan hesap acilisi icin gereklidir',
                    'Mahkemede sinirli sorumluluk statusunu korur',
                    'Gelecekte uye eklemek icin prosedurler olusturur',
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gray-400 mr-2">{'\u2014'}</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'Multi-Member LLC' : 'Cok Uyeli LLC'}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {isEnglish
                    ? 'With multiple owners, an Operating Agreement is critical to preventing disputes:'
                    : 'Birden fazla sahip oldugunda, Operating Agreement uyusmazliklari onlemek icin kritik onem tasir:'}
                </p>
                <ul className="space-y-2 text-sm">
                  {(isEnglish ? [
                    'Defines each member\'s ownership percentage',
                    'Establishes voting rights and decision-making rules',
                    'Specifies profit distribution, which need not match ownership percentages',
                    'Sets rules for adding or removing members',
                    'Provides clear exit procedures to prevent disputes',
                  ] : [
                    'Her uyenin sahiplik yuzdesini tanimlar',
                    'Oy haklarini ve karar alma kurallarini belirler',
                    'Kar dagitimini belirtir; sahiplik yuzdeleriyle eslesmek zorunda degildir',
                    'Uye ekleme veya cikarma kurallarini koyar',
                    'Uyusmazliklari onlemek icin net cikis prosedurlerini saglar',
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gray-400 mr-2">{'\u2014'}</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Essential Clauses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Essential Clauses to Include' : 'Dahil Edilmesi Gereken Temel Maddeler'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { clause: 'Formation Details', desc: 'LLC name, state of formation, principal office address, registered agent' },
                { clause: 'Members and Ownership', desc: 'Names of all members, ownership percentages, capital contributions' },
                { clause: 'Management Structure', desc: 'Member-managed or manager-managed, voting requirements' },
                { clause: 'Profit and Loss Distribution', desc: 'How profits and losses are allocated (may differ from ownership percentages)' },
                { clause: 'Meetings and Voting', desc: 'Meeting frequency, quorum requirements, decision-making procedures' },
                { clause: 'Transfer of Interests', desc: 'Whether members may sell their interest, right of first refusal provisions' },
                { clause: 'Withdrawal and Dissolution', desc: 'Procedures if a member withdraws, becomes incapacitated, or dies' },
                { clause: 'Dispute Resolution', desc: 'Arbitration vs litigation, governing law, jurisdiction' },
              ] : [
                { clause: 'Kurulus Detaylari', desc: 'LLC adi, kurulus eyaleti, ana ofis adresi, kayitli temsilci' },
                { clause: 'Uyeler ve Sahiplik', desc: 'Tum uyelerin isimleri, sahiplik yuzdeleri, sermaye katkilari' },
                { clause: 'Yonetim Yapisi', desc: 'Uye yonetimli veya yonetici yonetimli, oy gereksinimleri' },
                { clause: 'Kar ve Zarar Dagitimi', desc: 'Kar ve zararlarin nasil dagitilacagi (sahiplik yuzdesinden farkli olabilir)' },
                { clause: 'Toplantilar ve Oylama', desc: 'Toplanti sikligi, yeter sayi gereksinimleri, karar alma prosedürleri' },
                { clause: 'Paylarin Devri', desc: 'Uyelerin paylarini satip satamayacagi, onalim hakki hukumleri' },
                { clause: 'Ayrilma ve Fesih', desc: 'Bir uye ayrilirsa, is goremez hale gelirse veya olurse uygulanacak prosedurler' },
                { clause: 'Uyusmazlik Cozumu', desc: 'Tahkim veya dava, gecerli hukuk, yargi yetkisi' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{item.clause}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bu Risk Nasil Onlenir */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How to Prevent This Risk' : 'Bu Risk Nasil Onlenir?'}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish
                ? 'Operating without an Operating Agreement exposes your LLC to unnecessary legal and practical risks. The following steps ensure your LLC is properly documented:'
                : 'Operating Agreement olmadan faaliyet gostermek LLC\'nizi gereksiz hukuki ve pratik risklere maruz birakir. Asagidaki adimlar LLC\'nizin uygun sekilde belgelenmesini saglar:'}
            </p>
            <ol className="space-y-3">
              {(isEnglish ? [
                'Determine whether your state legally requires an Operating Agreement. If your LLC is in California, Delaware, Maine, Missouri, or New York, you are obligated by statute.',
                'Even if your state does not require one, prepare an Operating Agreement before opening a bank account or accepting payments.',
                'Use an attorney-reviewed template or retain an attorney to draft a customized agreement. Generic templates found online may omit critical provisions.',
                'Ensure all members sign the agreement and that each member retains a copy.',
                'Review and update the agreement whenever there is a change in membership, ownership percentages, or management structure.',
              ] : [
                'Eyaletinizin yasal olarak Operating Agreement zorunlu kilip kilmadigini belirleyin. LLC\'niz California, Delaware, Maine, Missouri veya New York\'taysa kanunla yukumlusunuz.',
                'Eyaletiniz zorunlu kilmasa bile, banka hesabi acmadan veya odeme kabul etmeden once Operating Agreement hazirlayin.',
                'Avukat tarafindan incelenmis bir sablon kullanin veya ozellestirilmis bir sozlesme hazirlatmak icin bir avukata danisin. Internette bulunan genel sablonlar kritik hukumleri atlayabilir.',
                'Tum uyelerin sozlesmeyi imzalamasini ve her uyenin bir kopyasini saklamasini saglayin.',
                'Uyelik, sahiplik yuzdeleri veya yonetim yapisinda bir degisiklik oldugunda sozlesmeyi gozden gecirin ve guncelleyin.',
              ]).map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-gray-600">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-sm">
                {isEnglish
                  ? 'EchoLegal offers an attorney-reviewed Operating Agreement template on a Pay What You Can basis \u2014 $20 recommended.'
                  : 'EchoLegal, avukat tarafindan incelenmis bir Operating Agreement sablonunu Pay What You Can (Gucunuz Yettigince Odeyin) esasina gore sunmaktadir \u2014 onerilen ucret $20.'}
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sik Sorulan Sorular'}</h2>

            <div className="space-y-6">
              {faqItems.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Resources — Hub and Spoke */}
          <section className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Articles' : 'Ilgili Makaleler'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete LLC Formation Guide for Turkish Entrepreneurs' : 'Turkler Icin ABD\'de LLC Kurma Rehberi'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Common Legal Mistakes Turkish Business Owners Make in the US' : 'ABD\'de Sirket Kuran Turklerin Yaptigi Hukuki Hatalar'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-kurmak-kac-gun-surer`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How Long Does It Take to Form a US LLC?' : 'ABD\'de LLC Kurmak Kac Gun Surer?'}
                </Link>
              </li>
            </ul>
          </section>

          {/* Legal Disclaimer */}
          <div className="text-xs text-gray-400 border-t pt-6">
            <p>
              {isEnglish
                ? 'Disclaimer: This article is provided for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by reading this content. Laws vary by state and change over time. For advice regarding your specific situation, consult a licensed attorney in the relevant jurisdiction.'
                : 'Yasal Uyari: Bu makale yalnizca bilgilendirme amaciyla sunulmaktadir ve hukuki danismanlik teskil etmez. Bu icerigi okumakla avukat-muvekkil iliskisi kurulmaz. Yasalar eyalete gore degisir ve zamanla degisebilir. Ozel durumunuzla ilgili tavsiye icin ilgili yargi bolgesinde lisansli bir avukata danisiniz.'}
            </p>
          </div>

        </article>
      </main>
    </>
  )
}
