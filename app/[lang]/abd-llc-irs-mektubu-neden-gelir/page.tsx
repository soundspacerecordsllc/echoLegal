import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Why Do Turkish LLC Owners Receive IRS Letters? | EchoLegal'
    : 'ABD\'de LLC Kuran Turkler Neden IRS Mektubu Alir? | EchoLegal'

  const description = isEnglish
    ? 'Common reasons Turkish LLC owners receive letters from the IRS. What different notices mean, how to respond, and how to prevent compliance issues.'
    : 'Turk LLC sahiplerinin IRS\'den mektup almasinin yaygin nedenleri. Farkli bildirimlerin anlami, nasil yanit verilir ve uyum sorunlari nasil onlenir.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-llc-irs-mektubu-neden-gelir`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-llc-irs-mektubu-neden-gelir',
        'tr': 'https://echo-legal.com/tr/abd-llc-irs-mektubu-neden-gelir',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function IRSLetterPage({
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
        ? 'Why Do Turkish LLC Owners Receive IRS Letters?'
        : 'ABD\'de LLC Kuran Turkler Neden IRS Mektubu Alir?',
      author: {
        '@type': 'Person',
        name: 'Zeynep Ruziye Moore',
        jobTitle: 'Attorney, New York Bar',
      },
      datePublished: '2026-01-15',
      dateModified: '2026-01-27',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: isEnglish
            ? 'Why did I receive a letter from the IRS for my LLC?'
            : 'LLC\'m icin neden IRS\'den mektup aldim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'Most IRS letters to foreign-owned LLCs are routine: EIN confirmations, missing form reminders (especially Form 5472), or filing deadline notices. Very few relate to audits.'
              : 'Yabanci sahipli LLC\'lere gelen IRS mektuplarinin cogu rutindir: EIN onaylari, eksik form hatirlatmalari (ozellikle Form 5472) veya dosyalama son tarihi bildirimleri. Cok azi denetimle ilgilidir.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish
            ? 'What is the penalty for not filing Form 5472?'
            : 'Form 5472 dosyalamamanin cezasi nedir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'The penalty for failing to file Form 5472 is $25,000 per form per year. This applies to all foreign-owned single-member LLCs, even those with no US-source income.'
              : 'Form 5472 dosyalamamanin cezasi yillik form basina 25.000 dolardir. Bu, ABD kaynakli geliri olmayan yabanci sahipli tek uyeli LLC\'ler dahil tumune uygulanir.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish
            ? 'How long do I have to respond to an IRS letter?'
            : 'IRS mektubuna yanit vermek icin ne kadar sureye sahibim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'Most IRS letters specify a response deadline, typically 30 to 60 days from the date on the notice. Check the top right corner of the letter for the specific deadline.'
              : 'Cogu IRS mektubu bir yanit son tarihi belirtir; genellikle bildirimdeki tarihten itibaren 30 ila 60 gundur. Belirli son tarih icin mektubun sag ust kosesini kontrol edin.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish
            ? 'Do I need to file taxes if my LLC has no income?'
            : 'LLC\'min geliri yoksa vergi dosyalamam gerekir mi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'Yes. Foreign-owned single-member LLCs must file a pro forma Form 1120 and Form 5472 annually, regardless of income. Failure to do so results in a $25,000 penalty.'
              : 'Evet. Yabanci sahipli tek uyeli LLC\'ler, gelirden bagimsiz olarak yillik pro forma Form 1120 ve Form 5472 dosyalamalidir. Bunu yapmamak 25.000 dolar cezayla sonuclanir.',
          },
        },
        {
          '@type': 'Question',
          name: isEnglish
            ? 'Should I hire a professional to respond to an IRS letter?'
            : 'IRS mektubuna yanit vermek icin profesyonel tutmali miyim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEnglish
              ? 'For routine notices like EIN confirmations (CP 575), you can respond yourself. For penalty notices, especially related to Form 5472 or underreported income (CP 2000), consulting a tax professional experienced in US-international tax is strongly recommended.'
              : 'EIN onaylari (CP 575) gibi rutin bildirimler icin kendiniz yanit verebilirsiniz. Ceza bildirimleri, ozellikle Form 5472 veya eksik bildirilen gelir (CP 2000) ile ilgili olanlar icin, ABD-uluslararasi vergi konusunda deneyimli bir vergi uzmaniyla gorusmek kesinlikle onerilir.',
          },
        },
      ],
    },
  ]

  const faqItems = isEnglish
    ? [
        { q: 'Why did I receive a letter from the IRS for my LLC?', a: 'Most IRS letters to foreign-owned LLCs are routine: EIN confirmations, missing form reminders (especially Form 5472), or filing deadline notices. Very few relate to audits or enforcement actions.' },
        { q: 'What is the penalty for not filing Form 5472?', a: 'The penalty for failing to file Form 5472 is $25,000 per form per year. This applies to all foreign-owned single-member LLCs, even those with no US-source income.' },
        { q: 'How long do I have to respond to an IRS letter?', a: 'Most IRS letters specify a response deadline, typically 30 to 60 days from the date on the notice. The specific deadline appears in the top right corner of the letter.' },
        { q: 'Do I need to file taxes if my LLC has no income?', a: 'Yes. Foreign-owned single-member LLCs must file a pro forma Form 1120 and Form 5472 annually, regardless of income. Failure to do so results in a $25,000 penalty per year.' },
        { q: 'Should I hire a professional to respond to an IRS letter?', a: 'For routine notices like EIN confirmations, you can respond yourself. For penalty notices related to Form 5472 or underreported income, consulting a tax professional experienced in US-international tax is strongly recommended.' },
      ]
    : [
        { q: 'LLC\'m icin neden IRS\'den mektup aldim?', a: 'Yabanci sahipli LLC\'lere gelen IRS mektuplarinin cogu rutindir: EIN onaylari, eksik form hatirlatmalari (ozellikle Form 5472) veya dosyalama son tarihi bildirimleri. Cok azi denetim veya uygulama islemleriyle ilgilidir.' },
        { q: 'Form 5472 dosyalamamanin cezasi nedir?', a: 'Form 5472 dosyalamamanin cezasi yillik form basina 25.000 dolardir. Bu, ABD kaynakli geliri olmayan yabanci sahipli tek uyeli LLC\'ler dahil tumune uygulanir.' },
        { q: 'IRS mektubuna yanit vermek icin ne kadar sureye sahibim?', a: 'Cogu IRS mektubu bir yanit son tarihi belirtir; genellikle bildirimdeki tarihten itibaren 30 ila 60 gundur. Belirli son tarih mektubun sag ust kosesinde yer alir.' },
        { q: 'LLC\'min geliri yoksa vergi dosyalamam gerekir mi?', a: 'Evet. Yabanci sahipli tek uyeli LLC\'ler, gelirden bagimsiz olarak yillik pro forma Form 1120 ve Form 5472 dosyalamalidir. Bunu yapmamak yillik 25.000 dolar cezayla sonuclanir.' },
        { q: 'IRS mektubuna yanit vermek icin profesyonel tutmali miyim?', a: 'EIN onaylari gibi rutin bildirimler icin kendiniz yanit verebilirsiniz. Form 5472 veya eksik bildirilen gelirle ilgili ceza bildirimleri icin, ABD-uluslararasi vergi konusunda deneyimli bir vergi uzmaniyla gorusmek onerilir.' },
      ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' / '}
          <Link href={`/${lang}/abd-yabancilar-vergi-gercekleri`} className="hover:text-black">
            {isEnglish ? 'Tax Guide' : 'Vergi Rehberi'}
          </Link>
          {' / '}
          <span className="text-black font-medium">{isEnglish ? 'IRS Letters Explained' : 'IRS Mektuplari'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Why Do Turkish LLC Owners Receive IRS Letters?'
              : 'ABD\'de LLC Kuran Turkler Neden IRS Mektubu Alir?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Understanding the most common IRS notices, what they mean, and how to respond.'
              : 'En yaygin IRS bildirimlerini, ne anlama geldiklerini ve nasil yanit verilecegini anlamak.'}
          </p>

          {/* Snippet-optimized direct answer */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'Turkish citizens who form an LLC in the United States typically receive IRS letters for one of several reasons: confirmation of their EIN assignment, reminders about unfiled Form 5472 (required annually for all foreign-owned single-member LLCs, even with zero income), or notices about missing tax returns. Most of these letters are routine and do not indicate an audit. However, ignoring them can result in penalties of $25,000 or more.'
                : 'ABD\'de LLC kuran Turk vatandaslari genellikle su nedenlerden biriyle IRS mektubu alir: EIN atamasinin onayi, dosyalanmamis Form 5472 hatirlatmasi (sifir gelirli olsa bile tum yabanci sahipli tek uyeli LLC\'ler icin yillik olarak zorunlu) veya eksik vergi beyannamesi bildirimleri. Bu mektuplarin cogu rutindir ve bir denetimi isaret etmez. Ancak gormezden gelmek 25.000 dolar veya daha fazla cezayla sonuclanabilir.'}
            </p>
          </div>

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

          {/* Integrated "don't panic" message */}
          <p className="text-gray-700 mb-10 leading-relaxed">
            {isEnglish
              ? 'It is worth noting that most IRS letters are routine in nature. They typically confirm your EIN, request missing forms, or remind you of upcoming filing deadlines. Only a small fraction of IRS correspondence relates to audits or penalties. Reading the letter carefully and identifying the notice number (found in the top right corner) is the most important first step.'
              : 'Belirtmek gerekir ki, IRS mektuplarinin buyuk cogunlugu rutin niteliktedir. Genellikle EIN\'inizi onaylar, eksik formlari talep eder veya yaklasan dosyalama son tarihlerini hatirlatilar. IRS yazismalarinin yalnizca kucuk bir kismi denetimler veya cezalarla ilgilidir. Mektubu dikkatlice okumak ve bildirim numarasini (sag ust kosede bulunur) belirlemek en onemli ilk adimdir.'}
          </p>

          {/* Common Letter Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {isEnglish ? 'Most Common IRS Letters for LLC Owners' : 'LLC Sahipleri Icin En Yaygin IRS Mektuplari'}
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 bg-white rounded-r-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">CP 575 / EIN Confirmation</h3>
                <p className="text-gray-700 mb-2">
                  {isEnglish
                    ? 'This letter confirms your EIN assignment. It is not a cause for concern.'
                    : 'Bu mektup EIN atamanizi onaylar. Endise nedeni degildir.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Action: Keep this letter. You will need it to open bank accounts and file taxes.'
                    : 'Yapilmasi gereken: Bu mektubu saklayin. Banka hesabi acmak ve vergi dosyalamak icin gerekecektir.'}
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 bg-white rounded-r-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">CP 259 / First Notice of Missing Return</h3>
                <p className="text-gray-700 mb-2">
                  {isEnglish
                    ? 'The IRS believes you should have filed a return but did not.'
                    : 'IRS, beyanname vermeniz gerektigine inanmakta ancak dosyalama yapmamissiniz.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Action: If you filed, send proof. If you were not required to file (foreign-owned LLC with no US income), respond explaining why. If you missed the deadline, file immediately.'
                    : 'Yapilmasi gereken: Dosyaladiysan kanit gonderin. Dosyalamaniz gerekmiyorsa (ABD geliri olmayan yabanci sahipli LLC), nedenini aciklayarak yanit verin. Son tarihi kacirdiysan hemen dosyalayin.'}
                </p>
              </div>

              <div className="border-l-4 border-blue-500 bg-white rounded-r-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Letter 147C / EIN Verification</h3>
                <p className="text-gray-700 mb-2">
                  {isEnglish
                    ? 'A confirmation of your EIN, typically issued when you or your bank requests verification.'
                    : 'Siz veya bankaniz dogrulama talep ettiginde verilen EIN onayidir.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Action: This is usually requested by you or your bank. Keep it for your records.'
                    : 'Yapilmasi gereken: Bu genellikle sizin veya bankaniz tarafindan talep edilir. Kayitlariniz icin saklayin.'}
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-white rounded-r-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Form 5471 / Form 5472 Notice</h3>
                <p className="text-gray-700 mb-2">
                  {isEnglish
                    ? 'You may have missed required foreign ownership reporting.'
                    : 'Zorunlu yabanci sahiplik raporlamasini kacirmis olabilirsiniz.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Action: Form 5472 is required for foreign-owned single-member LLCs. The penalty for late filing is $25,000. Consult a tax professional immediately.'
                    : 'Yapilmasi gereken: Form 5472, yabanci sahipli tek uyeli LLC\'ler icin zorunludur. Gec dosyalama cezasi 25.000 dolardir. Derhal bir vergi uzmanina danisin.'}
                </p>
              </div>

              <div className="border-l-4 border-red-500 bg-white rounded-r-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">CP 2000 / Underreported Income</h3>
                <p className="text-gray-700 mb-2">
                  {isEnglish
                    ? 'The IRS believes you have unreported income.'
                    : 'IRS, bildirilmemis geliriniz oldugunu dusunmektedir.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Action: Review carefully. If correct, pay the amount due. If incorrect, respond with documentation within 30 days.'
                    : 'Yapilmasi gereken: Dikkatlice inceleyin. Dogruysa odenmesi gereken tutari odeyin. Yanlissa 30 gun icinde belgelerle yanit verin.'}
                </p>
              </div>
            </div>
          </section>

          {/* Why Foreign Owners Get More Letters */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              {isEnglish ? 'Why Foreign LLC Owners Get More Letters' : 'Yabanci LLC Sahipleri Neden Daha Fazla Mektup Alir?'}
            </h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { reason: 'Form 5472 Requirement', detail: 'Foreign-owned LLCs must file Form 5472 annually, even with zero income. Many owners are not aware of this obligation.' },
                { reason: 'Pro Forma 1120 Requirement', detail: 'Along with Form 5472, a "pro forma" Form 1120 (first page only) must also be filed.' },
                { reason: 'No ITIN or SSN', detail: 'Without a US tax identification number, some IRS systems flag the account for manual review.' },
                { reason: 'Address Issues', detail: 'If the registered agent changes or mail is not forwarded, filing deadlines may be missed.' },
                { reason: 'Bank Reporting', detail: 'US banks report account information to the IRS. Discrepancies between reported data and filed returns trigger notices.' },
              ] : [
                { reason: 'Form 5472 Gereksinimi', detail: 'Yabanci sahipli LLC\'ler, sifir gelirle bile yillik Form 5472 dosyalamalidir. Bircok sahip bu yukumlulukten habersizdir.' },
                { reason: 'Pro Forma 1120 Gereksinimi', detail: 'Form 5472 ile birlikte "pro forma" Form 1120 (yalnizca ilk sayfa) de dosyalanmalidir.' },
                { reason: 'ITIN veya SSN Yoklugu', detail: 'ABD vergi kimlik numarasi olmadan, bazi IRS sistemleri hesabi manuel inceleme icin isaretler.' },
                { reason: 'Adres Sorunlari', detail: 'Kayitli temsilci degisirse veya posta yonlendirilmezse dosyalama son tarihleri kacirilabilir.' },
                { reason: 'Banka Raporlamasi', detail: 'ABD bankalari hesap bilgilerini IRS\'ye raporlar. Raporlanan veriler ile dosyalanan beyannameler arasindaki tutarsizliklar bildirim tetikler.' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <span className="text-[#C9A227] font-bold">{i + 1}.</span>
                  <div>
                    <p className="font-semibold">{item.reason}</p>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Respond */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              {isEnglish ? 'How to Respond to IRS Letters' : 'IRS Mektuplarina Nasil Yanit Verilir'}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <ol className="space-y-4">
                {(isEnglish ? [
                  'Read the entire letter carefully. Note the notice number (top right) and response deadline.',
                  'Do not ignore it. Even if you believe the notice is incorrect, you must respond by the deadline.',
                  'Gather documentation. Bank statements, filed returns, contracts -- whatever supports your position.',
                  'Respond in writing. Use certified mail with return receipt. Keep copies of everything you send.',
                  'If you need more time, call the number on the letter to request an extension.',
                  'Consider professional help for complex issues, especially Form 5472 penalties.',
                ] : [
                  'Tum mektubu dikkatlice okuyun. Bildirim numarasini (sag ust) ve yanit son tarihini not edin.',
                  'Gormezden gelmeyin. Bildirimin yanlis oldugunu dusunseniz bile son tarihe kadar yanit vermelisiniz.',
                  'Belgeleri toplayin. Banka hesap ozetleri, dosyalanmis beyannameler, sozlesmeler -- konumunuzu destekleyen her sey.',
                  'Yazili olarak yanit verin. Alindi teyitli taahhutlu posta kullanin. Gonderdiginiz her seyin kopyasini saklayin.',
                  'Daha fazla zamana ihtiyaciniz varsa uzatma talep etmek icin mektuptaki numarayi arayin.',
                  'Karmasik konular icin, ozellikle Form 5472 cezalari icin profesyonel yardim degerlendirilmelidir.',
                ]).map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Bu Risk Nasil Onlenir? */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              {isEnglish ? 'How to Prevent These Issues' : 'Bu Risk Nasil Onlenir?'}
            </h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <ol className="space-y-4">
                {(isEnglish ? [
                  { step: 'File Form 5472 and pro forma Form 1120 every year by April 15 (or by the extended deadline). The penalty for late or missing filing is $25,000 per year.' },
                  { step: 'Maintain detailed records of all transactions between you and your LLC, including capital contributions, distributions, loans, and payments for services.' },
                  { step: 'Use a reliable registered agent and verify that IRS correspondence reaches you. Check your mail or registered agent portal regularly.' },
                  { step: 'Prepare and maintain an Operating Agreement for your LLC. This document demonstrates that the LLC is properly structured and governed.' },
                  { step: 'Consult a tax professional who understands both US and Turkish tax obligations. US-Turkey tax treaty provisions and FBAR requirements add complexity that general practitioners may not be familiar with.' },
                  { step: 'Mark all filing deadlines on your calendar. Key dates include April 15 (Form 5472/1120), June 15 (FBAR), and any state-specific deadlines for your LLC\'s state of formation.' },
                ] : [
                  { step: 'Form 5472 ve pro forma Form 1120\'yi her yil 15 Nisan\'a kadar (veya uzatilmis son tarihe kadar) dosyalayin. Gec veya eksik dosyalama cezasi yillik 25.000 dolardir.' },
                  { step: 'Siz ve LLC\'niz arasindaki tum islemlerin ayrintili kayitlarini tutun: sermaye katkilari, dagitimlar, krediler ve hizmet odemeleri dahil.' },
                  { step: 'Guvenilir bir kayitli temsilci kullanin ve IRS yazismalarinin size ulastigini dogrulayin. Postanizi veya kayitli temsilci portalinizi duzenli olarak kontrol edin.' },
                  { step: 'LLC\'niz icin bir Isletme Sozlesmesi (Operating Agreement) hazirlayip muhafaza edin. Bu belge LLC\'nin duzgun yapilandirildigini ve yonetildigini gosterir.' },
                  { step: 'Hem ABD hem de Turkiye vergi yukumluluklerini anlayan bir vergi uzmanina danisin. ABD-Turkiye vergi anlasmasi hukumleri ve FBAR gereksinimleri, genel pratisyenlerin asina olmayabilecegi karmasiklik ekler.' },
                  { step: 'Tum dosyalama son tarihlerini takviminize isaretleyin. Onemli tarihler arasinda 15 Nisan (Form 5472/1120), 15 Haziran (FBAR) ve LLC\'nizin kuruldugu eyalete ozgu son tarihler yer alir.' },
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-gray-700">{item.step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {isEnglish ? 'Frequently Asked Questions' : 'Sikca Sorulan Sorular'}
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="border border-gray-200 rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50">{item.q}</summary>
                  <p className="px-4 pb-4 text-gray-700">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Document Reference */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12 text-center">
            <p className="text-gray-700 font-medium">
              {isEnglish
                ? 'Pay What You Can — $20 recommended'
                : 'Pay What You Can — 20 dolar onerilir'}
            </p>
          </div>

          {/* Hub-and-spoke Related Links */}
          <section className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'Ilgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-yabancilar-vergi-gercekleri`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'US Tax Guide for Foreign Nationals' : 'Yabancilar Icin ABD Vergi Rehberi'}
                </Link>
                <span className="text-gray-400 text-sm ml-2">{isEnglish ? '(Parent Guide)' : '(Ana Rehber)'}</span>
              </li>
              <li>
                <Link href={`/${lang}/w-8ben-formu-nasil-doldurulur`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Fill Out Form W-8BEN' : 'W-8BEN Formu Nasil Doldurulur'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Common Mistakes by Turkish LLC Owners in the US' : 'ABD\'de Sirket Kuran Turklerin Yaptigi Hatalar'}
                </Link>
              </li>
            </ul>
          </section>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-200 pt-6 mt-12">
            <p className="text-xs text-gray-500 leading-relaxed">
              {isEnglish
                ? 'Disclaimer: This article is provided for informational purposes only and does not constitute legal or tax advice. No attorney-client relationship is formed by reading this content. Tax laws and regulations change frequently. Consult a qualified attorney or tax professional for advice specific to your situation. EchoLegal is not a law firm and does not provide legal representation.'
                : 'Sorumluluk Reddi: Bu makale yalnizca bilgilendirme amaciyla sunulmaktadir ve hukuki veya vergi tavsiyesi niteliginde degildir. Bu icerigi okumakla avukat-muvekkil iliskisi kurulmaz. Vergi yasalari ve duzenlemeleri sik sik degisir. Durumunuza ozgu tavsiye icin nitelikli bir avukata veya vergi uzmanina danisin. EchoLegal bir hukuk burosu degildir ve hukuki temsil saglamaz.'}
            </p>
          </div>
        </article>
      </main>
    </>
  )
}
