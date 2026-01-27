import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How Long Does It Take to Form an LLC in the US? | EchoLegal'
    : 'ABD\'de LLC Kurmak Kac Gun Surer? | EchoLegal'

  const description = isEnglish
    ? 'Realistic timeline for forming a US LLC as a Turkish resident. State processing times, EIN wait times, and factors that affect speed.'
    : 'Turkiye\'den ABD LLC kurmanin gercekci zaman cizelgesi. Eyalet islem sureleri, EIN bekleme sureleri ve hizi etkileyen faktorler.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-llc-kurmak-kac-gun-surer`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-llc-kurmak-kac-gun-surer',
        'tr': 'https://echo-legal.com/tr/abd-llc-kurmak-kac-gun-surer',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCTimelinePage({
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
      headline: isEnglish ? 'How Long Does It Take to Form an LLC in the US?' : 'ABD\'de LLC Kurmak Kac Gun Surer?',
      author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Attorney, New York Bar' },
      datePublished: '2026-01-15',
      dateModified: '2026-01-27',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: isEnglish ? 'How long does it take to form an LLC in the US from Turkey?' : 'Turkiye\'den ABD\'de LLC kurmak ne kadar surer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'The total process typically takes 2-6 weeks. State filing takes 1-10 business days depending on the state, and EIN applications for foreign owners add 2-4 weeks via fax.'
              : 'Toplam surec genellikle 2-6 hafta surer. Eyalet basvurusu eyalete bagli olarak 1-10 is gunu, yabanci sahipler icin EIN basvurusu faksla 2-4 hafta ekler.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish ? 'Which US state processes LLC filings the fastest?' : 'Hangi ABD eyaleti LLC basvurularini en hizli isler?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'New Mexico typically processes LLC filings in 1-2 business days at no extra cost. Delaware offers same-day processing for $1,000.'
              : 'New Mexico, LLC basvurularini ek ucret olmadan genellikle 1-2 is gununde isler. Delaware ise 1.000 dolara ayni gun isleme imkani sunar.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish ? 'Can I get an EIN online as a foreign LLC owner?' : 'Yabanci LLC sahibi olarak EIN\'i cevrimici alabilir miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'No. Foreign owners without a US SSN or ITIN cannot use the IRS online EIN application. They must fax or mail Form SS-4, which typically takes 2-4 weeks.'
              : 'Hayir. ABD SSN veya ITIN\'i olmayan yabanci sahipler IRS\'in cevrimici EIN basvurusunu kullanamaz. SS-4 Formunu faks veya posta ile gondermeleri gerekir; bu islem genellikle 2-4 hafta surer.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish ? 'What causes delays when forming a US LLC?' : 'ABD LLC kurarken gecikmelere ne sebep olur?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'Common delays include rejected company names, incorrect form information, busy IRS fax lines, missing registered agent appointments, and state processing backlogs.'
              : 'Yaygin gecikmeler arasinda reddedilen sirket adlari, formda yanlis bilgi, yogun IRS faks hatlari, eksik kayitli temsilci atamalari ve eyalet islem yogunlugu yer alir.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish ? 'Can I open a US bank account before getting my EIN?' : 'EIN almadan once ABD banka hesabi acabilir miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'No. US business bank accounts require an EIN. You must wait until the IRS issues your EIN before applying for a bank account.'
              : 'Hayir. ABD is banka hesaplari EIN gerektirir. Banka hesabi basvurusu yapabilmek icin IRS\'in EIN\'inizi vermesini beklemeniz gerekir.',
          },
        },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' / '}
          <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="hover:text-black">
            {isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}
          </Link>
          {' / '}
          <span className="text-black font-medium">{isEnglish ? 'LLC Timeline' : 'LLC Suresi'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish ? 'How Long Does It Take to Form an LLC?' : 'ABD\'de LLC Kurmak Kac Gun Surer?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The realistic timeline for forming a US LLC from Turkey: what to expect at each stage and how to speed up the process.'
              : 'Turkiye\'den ABD LLC kurmanin gercekci zaman cizelgesi: her asamada ne beklenmeli ve surec nasil hizlandirilir.'}
          </p>

          {/* Direct Answer Paragraph */}
          <p className="text-lg text-gray-800 mb-6 leading-relaxed">
            {isEnglish
              ? 'Forming a US LLC from Turkey typically takes 2 to 6 weeks in total. State filing ranges from 1 to 10 business days depending on the state chosen. The EIN application for foreign owners without a US SSN adds 2 to 4 weeks, as it must be submitted by fax. Expedited state filings can reduce processing to same-day in some states.'
              : 'Turkiye\'den ABD\'de LLC kurmak toplamda genellikle 2 ila 6 hafta surer. Eyalet basvurusu, secilen eyalete bagli olarak 1 ila 10 is gunu arasinda degisir. ABD SSN\'i olmayan yabanci sahipler icin EIN basvurusu faksla yapilmak zorunda oldugundan surece 2 ila 4 hafta ekler. Bazi eyaletlerde hizlandirilmis basvuru ile islem suresi ayni gune indirilebilir.'}
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

          {/* Timeline Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Complete Timeline Breakdown' : 'Asamalara Gore Surec'}</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'Preparation' : 'Hazirlik'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-2 days' : '1-2 gun'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? '-- Choose your state, company name, and registered agent. Gather required information (address, owner details).'
                      : '-- Eyalet, sirket adi ve kayitli temsilci secilir. Gerekli bilgiler (adres, sahip bilgileri) toplanir.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'State Filing (Articles of Organization)' : 'Eyalet Basvurusu (Articles of Organization)'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-10 business days (varies by state)' : '1-10 is gunu (eyalete gore degisir)'}</p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="font-medium mb-2">{isEnglish ? 'Processing Times by State:' : 'Eyaletlere Gore Islem Sureleri:'}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between"><span>Delaware</span><span className="text-green-600">{isEnglish ? '1-3 days' : '1-3 gun'}</span></div>
                      <div className="flex justify-between"><span>Wyoming</span><span className="text-green-600">{isEnglish ? '3-5 days' : '3-5 gun'}</span></div>
                      <div className="flex justify-between"><span>Florida</span><span className="text-yellow-600">{isEnglish ? '5-7 days' : '5-7 gun'}</span></div>
                      <div className="flex justify-between"><span>New Mexico</span><span className="text-green-600">{isEnglish ? '1-2 days' : '1-2 gun'}</span></div>
                      <div className="flex justify-between"><span>Texas</span><span className="text-yellow-600">{isEnglish ? '3-5 days' : '3-5 gun'}</span></div>
                      <div className="flex justify-between"><span>California</span><span className="text-red-600">{isEnglish ? '7-10 days' : '7-10 gun'}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'EIN Application (Federal Tax ID)' : 'EIN Basvurusu (Federal Vergi Kimlik Numarasi)'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '2-4 weeks for foreign owners' : 'Yabanci sahipler icin 2-4 hafta'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? '-- Foreign owners cannot apply online and must fax Form SS-4 to the IRS. This is typically the longest step in the process.'
                      : '-- Yabanci sahipler cevrimici basvuru yapamaz; SS-4 Formunu IRS\'e faks ile gondermek zorundadir. Bu, genellikle surecin en uzun asamasidir.'}
                  </p>
                  <div className="border-l-4 border-gray-400 pl-3 mt-3">
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? '-- Note: Some registered agents offer assistance with expediting EIN applications for foreign owners.'
                        : '-- Not: Bazi kayitli temsilciler, yabanci sahipler icin EIN basvurularinin hizlandirilmasinda yardimci olabilir.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'Operating Agreement' : 'Isletme Sozlesmesi (Operating Agreement)'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-2 days' : '1-2 gun'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? '-- Draft and sign your Operating Agreement. This step can proceed in parallel while waiting for state approval or EIN.'
                      : '-- Isletme Sozlesmesi hazirlanir ve imzalanir. Bu adim, eyalet onayi veya EIN beklenirken paralel olarak yurutulur.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">5</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'Bank Account Opening' : 'Banka Hesabi Acma'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-7 days (after EIN)' : '1-7 gun (EIN alindiktan sonra)'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? '-- Once you have your EIN and Operating Agreement, you can open a US business bank account. Digital banks such as Mercury and Relay tend to approve foreign-owned LLCs more quickly than traditional banks.'
                      : '-- EIN ve Isletme Sozlesmesi tamamlandiginda ABD is banka hesabi acilabilir. Mercury ve Relay gibi dijital bankalar, yabancilara ait LLC\'leri geleneksel bankalara kiyasla daha hizli onaylama egilimindedir.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Expedited Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Expedited Filing Options' : 'Hizlandirilmis Basvuru Secenekleri'}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'State' : 'Eyalet'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Standard' : 'Standart'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Expedited' : 'Hizlandirilmis'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Same-Day' : 'Ayni Gun'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Delaware</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? '3-5 days (free)' : '3-5 gun (ucretsiz)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? '24hr ($100)' : '24 saat ($100)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Same-day ($1,000)' : 'Ayni gun ($1.000)'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3 font-medium">Wyoming</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? '3-5 days (free)' : '3-5 gun (ucretsiz)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? '24hr ($100)' : '24 saat ($100)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Same-day ($200)' : 'Ayni gun ($200)'}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Florida</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? '5-7 days (free)' : '5-7 gun (ucretsiz)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? '1-2 days ($50)' : '1-2 gun ($50)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Not available' : 'Mevcut degil'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3 font-medium">New Mexico</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? '1-2 days (free)' : '1-2 gun (ucretsiz)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'N/A (already fast)' : 'Yok (zaten hizli)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'N/A' : 'Yok'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Delays */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What Can Cause Delays?' : 'Gecikmelere Neler Sebep Olabilir?'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { issue: 'Name already taken', solution: 'Search the state business database before filing. Have 2-3 backup names ready.' },
                { issue: 'Incorrect information on forms', solution: 'Double-check all details, especially addresses and member names, before submission.' },
                { issue: 'EIN fax issues', solution: 'Use a reliable fax service. IRS fax lines can be busy -- try early morning US Eastern time.' },
                { issue: 'Missing registered agent', solution: 'Appoint a registered agent before filing. This is required in all states.' },
                { issue: 'State processing backlog', solution: 'Check current processing times on the state website. Pay for expedited filing if timing is critical.' },
              ] : [
                { issue: 'Sirket adi daha once alinmis', solution: 'Basvurmadan once eyalet ticari veritabaninda isim arastirmasi yapin. 2-3 yedek isim hazir bulundurun.' },
                { issue: 'Formlardaki bilgi hatalari', solution: 'Basvuru oncesinde tum detaylari, ozellikle adresleri ve uye isimlerini dikkatlice kontrol edin.' },
                { issue: 'EIN faks sorunlari', solution: 'Guvenilir bir faks servisi kullanin. IRS faks hatlari yogun olabilir -- ABD Dogu saatiyle sabah erken deneyin.' },
                { issue: 'Kayitli temsilci atanmamis', solution: 'Basvurudan once kayitli temsilci atayin. Bu, tum eyaletlerde zorunludur.' },
                { issue: 'Eyalet is yogunlugu', solution: 'Guncel islem surelerini eyaletin resmi sitesinden kontrol edin. Sure kritikse hizlandirilmis basvuru icin odeme yapin.' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-500 font-bold text-lg">--</span>
                  <div>
                    <p className="font-semibold">{item.issue}</p>
                    <p className="text-gray-600 text-sm">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Prevent Delays */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How to Prevent This Risk' : 'Bu Risk Nasil Onlenir?'}</h2>
            <p className="text-gray-600 mb-4">
              {isEnglish
                ? 'The following steps reduce the likelihood of delays during LLC formation:'
                : 'Asagidaki adimlar, LLC kurulus surecinde gecikme olasiliklarini azaltir:'}
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                {isEnglish
                  ? 'Search the state business name database before choosing your company name. Confirm the name is available and complies with state naming rules (e.g., must include "LLC").'
                  : 'Sirket adinizi secmeden once eyalet ticari isim veritabaninda arastirma yapin. Ismin musait oldugunu ve eyalet isimlendirme kurallarina uygun oldugunu (ornegin "LLC" icermesi gerektigi) teyit edin.'}
              </li>
              <li>
                {isEnglish
                  ? 'Appoint a registered agent in the formation state before submitting your Articles of Organization. The filing will be rejected without one.'
                  : 'Articles of Organization\'i gondermeden once kurulus eyaletinde bir kayitli temsilci atayin. Temsilci olmadan basvuru reddedilir.'}
              </li>
              <li>
                {isEnglish
                  ? 'Prepare Form SS-4 in advance so it is ready to fax immediately after receiving your state approval. This avoids idle time between steps.'
                  : 'SS-4 Formunu onceden hazirlayin; eyalet onayiniz gelir gelmez fakslamaya hazir olsun. Bu, adimlar arasindaki bos beklemeyi onler.'}
              </li>
              <li>
                {isEnglish
                  ? 'Use a reliable international fax service and send during early morning US Eastern hours (before 10 AM ET) when IRS fax lines are less congested.'
                  : 'Guvenilir bir uluslararasi faks servisi kullanin ve IRS faks hatlarinin daha az yogun oldugu ABD Dogu saatiyle sabah erken saatlerde (10:00 ET oncesi) gonderin.'}
              </li>
              <li>
                {isEnglish
                  ? 'Draft your Operating Agreement while waiting for state approval or EIN. This step does not depend on either and can run in parallel, saving 1-2 days from the total timeline.'
                  : 'Isletme Sozlesmesini eyalet onayi veya EIN beklerken hazirlayin. Bu adim her ikisinden de bagimsizdir ve paralel yurutulerek toplam sureden 1-2 gun kazandirir.'}
              </li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sik Sorulan Sorular'}</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{isEnglish ? 'How long does it take to form an LLC in the US from Turkey?' : 'Turkiye\'den ABD\'de LLC kurmak ne kadar surer?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'The total process typically takes 2-6 weeks. State filing takes 1-10 business days depending on the state, and EIN applications for foreign owners add 2-4 weeks via fax.'
                    : 'Toplam surec genellikle 2-6 hafta surer. Eyalet basvurusu eyalete bagli olarak 1-10 is gunu, yabanci sahipler icin EIN basvurusu faksla 2-4 hafta ekler.'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{isEnglish ? 'Which US state processes LLC filings the fastest?' : 'Hangi ABD eyaleti LLC basvurularini en hizli isler?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'New Mexico typically processes LLC filings in 1-2 business days at no extra cost. Delaware offers same-day processing for $1,000.'
                    : 'New Mexico, LLC basvurularini ek ucret olmadan genellikle 1-2 is gununde isler. Delaware ise 1.000 dolara ayni gun isleme imkani sunar.'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{isEnglish ? 'Can I get an EIN online as a foreign LLC owner?' : 'Yabanci LLC sahibi olarak EIN\'i cevrimici alabilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'No. Foreign owners without a US SSN or ITIN cannot use the IRS online EIN application. They must fax or mail Form SS-4, which typically takes 2-4 weeks.'
                    : 'Hayir. ABD SSN veya ITIN\'i olmayan yabanci sahipler IRS\'in cevrimici EIN basvurusunu kullanamaz. SS-4 Formunu faks veya posta ile gondermeleri gerekir; bu islem genellikle 2-4 hafta surer.'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{isEnglish ? 'What causes delays when forming a US LLC?' : 'ABD LLC kurarken gecikmelere ne sebep olur?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Common delays include rejected company names, incorrect form information, busy IRS fax lines, missing registered agent appointments, and state processing backlogs.'
                    : 'Yaygin gecikmeler arasinda reddedilen sirket adlari, formda yanlis bilgi, yogun IRS faks hatlari, eksik kayitli temsilci atamalari ve eyalet islem yogunlugu yer alir.'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{isEnglish ? 'Can I open a US bank account before getting my EIN?' : 'EIN almadan once ABD banka hesabi acabilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'No. US business bank accounts require an EIN. You must wait until the IRS issues your EIN before applying for a bank account.'
                    : 'Hayir. ABD is banka hesaplari EIN gerektirir. Banka hesabi basvurusu yapabilmek icin IRS\'in EIN\'inizi vermesini beklemeniz gerekir.'}
                </p>
              </div>
            </div>
          </section>

          {/* Document Reference */}
          <section className="mb-12 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">{isEnglish ? 'Document Reference' : 'Belge Referansi'}</h2>
            <p className="text-gray-600 mb-4">
              {isEnglish
                ? 'This article is part of the EchoLegal encyclopedia on US business formation for Turkish residents. All content is provided for informational purposes.'
                : 'Bu makale, EchoLegal\'in Turkiye\'den ABD\'de sirket kurulumu konusundaki ansiklopedik iceriginin bir parcasidir. Tum icerik bilgilendirme amaclidir.'}
            </p>
            <p className="text-sm text-gray-500">
              {isEnglish
                ? 'Pay What You Can -- $20 recommended'
                : 'Pay What You Can -- $20 onerilen'}
            </p>
          </section>

          {/* Related Links - Hub and Spoke */}
          <section className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Articles' : 'Ilgili Makaleler'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete LLC Formation Guide for Turkish Residents' : 'Turkler Icin ABD\'de LLC Kurma Rehberi'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/operating-agreement-zorunlu-mu`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Is an Operating Agreement Required?' : 'Operating Agreement (Isletme Sozlesmesi) Zorunlu mu?'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-irs-mektubu-neden-gelir`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Why Does the IRS Send Letters to Your LLC?' : 'IRS LLC\'nize Neden Mektup Gonderir?'}
                </Link>
              </li>
            </ul>
          </section>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-200 pt-6 text-xs text-gray-400 leading-relaxed">
            <p>
              {isEnglish
                ? 'Disclaimer: This article is provided for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by reading this content. Laws and procedures change frequently; verify current requirements with the relevant state authority or a licensed attorney before taking action. EchoLegal is not a law firm.'
                : 'Yasal Uyari: Bu makale yalnizca genel bilgilendirme amaciyla sunulmaktadir ve hukuki danismanlik niteliginde degildir. Bu icerigi okumak avukat-muvekkil iliskisi olusturmaz. Yasalar ve prosedurler sik degisir; harekete gecmeden once guncel gereklilikleri ilgili eyalet kurumu veya lisansli bir avukat ile dogrulayin. EchoLegal bir hukuk burosu degildir.'}
            </p>
          </div>

        </article>
      </main>
    </>
  )
}
