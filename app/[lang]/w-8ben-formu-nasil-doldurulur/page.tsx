import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How to Fill Out Form W-8BEN: 2026 Guide for Turkish Residents | EchoLegal'
    : 'W-8BEN Formu Nasıl Doldurulur? Türkler İçin 2026 Rehberi | EchoLegal'

  const description = isEnglish
    ? 'Step-by-step guide to completing IRS Form W-8BEN for Turkish residents. Line-by-line instructions, treaty benefits, and common mistakes.'
    : 'Türkiye mukimleri için IRS W-8BEN formu doldurma rehberi. Satır satır açıklamalar, vergi anlaşması avantajları ve sık yapılan hatalar.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/w-8ben-formu-nasil-doldurulur`,
      languages: {
        'en': 'https://echo-legal.com/en/w-8ben-formu-nasil-doldurulur',
        'tr': 'https://echo-legal.com/tr/w-8ben-formu-nasil-doldurulur',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function W8BENGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const faqItems = isEnglish ? [
    { q: 'How long is W-8BEN valid?', a: 'The form is valid for 3 calendar years from the date of signature. A form signed on July 15, 2026 expires on December 31, 2029.' },
    { q: 'Do I need an ITIN to fill out W-8BEN?', a: 'No. You can use your Turkish TC Kimlik No on Line 6 as your foreign tax identifying number. An ITIN is optional but may be required by some payers.' },
    { q: 'Where do I send the W-8BEN?', a: 'You do not send it to the IRS. Submit it directly to the payer (your US client, broker, bank, or platform) who requested it.' },
    { q: 'What if I have both US and Turkish citizenship?', a: 'Dual citizens with US citizenship cannot use W-8BEN. You would need to file as a US person using Form W-9 instead.' },
    { q: 'Can I sign electronically?', a: 'Yes, if the withholding agent accepts electronic signatures. Most digital platforms allow electronic completion and signing.' },
  ] : [
    { q: 'W-8BEN ne kadar süre geçerli?', a: 'Form, imza tarihinden itibaren 3 takvim yılı geçerlidir. 15 Temmuz 2026\'da imzalanan bir form 31 Aralık 2029\'da sona erer.' },
    { q: 'W-8BEN doldurmak için ITIN gerekli mi?', a: 'Hayır. Satır 6\'da Türk TC Kimlik Numaranızı yabancı vergi kimlik numarası olarak kullanabilirsiniz. ITIN isteğe bağlıdır, ancak bazı ödeme yapanlar talep edebilir.' },
    { q: 'W-8BEN\'i nereye gönderirim?', a: 'IRS\'e göndermezsiniz. Formu isteyen tarafa — ABD\'deki müşteriniz, aracı kurumunuz, bankanız veya platforma — doğrudan iletirsiniz.' },
    { q: 'Hem ABD hem Türk vatandaşlığım varsa ne olur?', a: 'ABD vatandaşlığı olan çifte vatandaşlar W-8BEN kullanamazlar. Bunun yerine W-9 Formu ile ABD vatandaşı olarak beyanda bulunmanız gerekir.' },
    { q: 'Elektronik imza geçerli mi?', a: 'Evet. Kesinti yapan taraf elektronik imzayı kabul ediyorsa geçerlidir. Dijital platformların çoğu elektronik tamamlama ve imzalamaya izin verir.' },
  ]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: isEnglish ? 'How to Fill Out Form W-8BEN for Turkish Residents' : 'Türkler İçin W-8BEN Formu Nasıl Doldurulur',
      description: isEnglish ? 'Step-by-step guide to completing IRS Form W-8BEN' : 'IRS W-8BEN formunu adım adım doldurma rehberi',
      author: {
        '@type': 'Person',
        name: 'Zeynep Ruziye Moore',
        jobTitle: isEnglish ? 'Attorney, New York Bar' : 'Avukat, New York Barosu',
      },
      datePublished: '2026-01-15',
      dateModified: '2026-01-27',
      step: [
        { '@type': 'HowToStep', name: isEnglish ? 'Part I: Identification' : 'Bölüm I: Kimlik Bilgileri', text: isEnglish ? 'Enter your legal name, country of citizenship, permanent address, and foreign tax ID' : 'Yasal adınızı, vatandaşlık ülkenizi, daimi adresinizi ve yabancı vergi kimlik numaranızı girin' },
        { '@type': 'HowToStep', name: isEnglish ? 'Part II: Treaty Benefits' : 'Bölüm II: Anlaşma Avantajları', text: isEnglish ? 'Claim tax treaty benefits between Turkey and the US' : 'Türkiye-ABD vergi anlaşması avantajlarını talep edin' },
        { '@type': 'HowToStep', name: isEnglish ? 'Part III: Certification' : 'Bölüm III: Onay', text: isEnglish ? 'Sign and date the form' : 'Formu imzalayın ve tarihleyin' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' / '}
          <Link href={`/${lang}/abd-yabancilar-vergi-gercekleri`} className="hover:text-black">{isEnglish ? 'Tax Guide' : 'Vergi Rehberi'}</Link>
          {' / '}
          <span className="text-black font-medium">{isEnglish ? 'W-8BEN Form Guide' : 'W-8BEN Formu Rehberi'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'How to Fill Out Form W-8BEN'
              : 'W-8BEN Formu Nasıl Doldurulur?'}
          </h1>

          {/* Direct answer paragraphs - snippet optimized */}
          <div className="text-lg text-gray-700 mb-6 leading-relaxed space-y-4">
            <p>
              {isEnglish
                ? 'Form W-8BEN is the IRS document that certifies your foreign status and allows you to claim reduced withholding tax rates under a tax treaty. For Turkish residents, submitting this form correctly can reduce US withholding from 30% to as low as 0–15%, depending on the type of income. The form is valid for three years from the date of signature.'
                : 'W-8BEN, IRS\'e yabancı statünüzü belgeleyen ve vergi anlaşması kapsamında indirimli stopaj oranı talep etmenizi sağlayan bir formdur. Türkiye mukimleri için bu formu doğru şekilde doldurmak, ABD stopajını gelir türüne göre %30\'dan %0–15 seviyesine kadar düşürebilir. Form, imza tarihinden itibaren üç yıl geçerlidir.'}
            </p>
            <p>
              {isEnglish
                ? 'Without a valid W-8BEN on file, US payers are legally required to withhold 30% of your payment and remit it to the IRS. This applies to dividends, interest, royalties, and certain service income. The form is not sent to the IRS — it is submitted directly to the payer who requests it.'
                : 'Dosyada geçerli bir W-8BEN olmadan, ABD\'deki ödeme yapanlar ödemenizin %30\'unu kesip IRS\'e göndermek zorundadır. Bu kural temettüler, faizler, telif hakları ve belirli hizmet gelirleri için geçerlidir. Form IRS\'e gönderilmez; doğrudan talep eden tarafa iletilir.'}
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold text-sm">ZM</div>
              <div>
                <p className="font-medium text-black">Zeynep Ruziye Moore</p>
                <p>{isEnglish ? 'Attorney, New York Bar | US-Turkey Legal Practice' : 'Avukat, New York Barosu | ABD-Türkiye Hukuk Pratiği'}</p>
              </div>
            </div>
            <span>·</span>
            <span>{isEnglish ? 'Updated: January 2026' : 'Güncelleme: Ocak 2026'}</span>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-10">
            <h2 className="font-bold mb-4">{isEnglish ? 'Contents' : 'İçindekiler'}</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#nedir" className="text-[#C9A227] hover:underline">{isEnglish ? '1. What is Form W-8BEN?' : '1. W-8BEN Formu Nedir?'}</a></li>
              <li><a href="#kim-doldurmali" className="text-[#C9A227] hover:underline">{isEnglish ? '2. Who Needs to Fill It Out?' : '2. Kim Doldurmalı?'}</a></li>
              <li><a href="#satir-satir" className="text-[#C9A227] hover:underline">{isEnglish ? '3. Line-by-Line Instructions' : '3. Satır Satır Açıklamalar'}</a></li>
              <li><a href="#vergi-anlasmasi" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Turkey-US Tax Treaty Benefits' : '4. Türkiye-ABD Vergi Anlaşması'}</a></li>
              <li><a href="#hatalar" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Common Mistakes' : '5. Sık Yapılan Hatalar'}</a></li>
              <li><a href="#risk-onleme" className="text-[#C9A227] hover:underline">{isEnglish ? '6. How to Prevent This Risk' : '6. Bu Risk Nasıl Önlenir?'}</a></li>
              <li><a href="#sss" className="text-[#C9A227] hover:underline">{isEnglish ? '7. FAQ' : '7. Sık Sorulan Sorular'}</a></li>
            </ul>
          </div>

          {/* Section 1 */}
          <section id="nedir" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. What is Form W-8BEN?' : '1. W-8BEN Formu Nedir?'}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isEnglish
                ? 'Form W-8BEN (Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting) is an IRS form used by foreign individuals to establish three things:'
                : 'W-8BEN (Gerçek Hak Sahibinin ABD Vergi Kesintisi ve Raporlaması İçin Yabancı Statü Belgesi), yabancı bireylerin üç temel hususu belgelemek için kullandığı bir IRS formudur:'}
            </p>
            <ul className="space-y-2 mb-6 text-gray-700">
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">—</span><span>{isEnglish ? 'That you are not a US person for tax purposes' : 'Vergi açısından ABD vatandaşı veya mukimi olmadığınız'}</span></li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">—</span><span>{isEnglish ? 'That you are the beneficial owner of the income' : 'Gelirin gerçek hak sahibi olduğunuz'}</span></li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">—</span><span>{isEnglish ? 'That you are eligible for a reduced withholding rate under a tax treaty' : 'Vergi anlaşması kapsamında indirimli stopaj oranına hak kazandığınız'}</span></li>
            </ul>

            <div className="bg-gray-100 border-l-4 border-gray-400 p-4">
              <p className="font-medium text-gray-900 mb-1">{isEnglish ? 'Without W-8BEN' : 'W-8BEN Olmadan'}</p>
              <p className="text-gray-700 text-sm">
                {isEnglish
                  ? 'US payers must withhold 30% of your payment and remit it to the IRS. This applies to dividends, interest, royalties, and certain other income types.'
                  : 'ABD\'deki ödeme yapan taraflar, ödemenizin %30\'unu keserek IRS\'e göndermek zorundadır. Bu kural temettüler, faizler, telif hakları ve diğer belirli gelir türleri için geçerlidir.'}
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="kim-doldurmali" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. Who Needs to Fill It Out?' : '2. Kim Doldurmalı?'}</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'W-8BEN Required:' : 'W-8BEN Gerekli:'}</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li className="flex items-start gap-2"><span className="text-gray-400">—</span><span>{isEnglish ? 'Turkish residents freelancing for US clients' : 'ABD müşterilerine freelance çalışan Türkiye mukimleri'}</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400">—</span><span>{isEnglish ? 'Receiving dividends from US stocks' : 'ABD hisse senetlerinden temettü alanlar'}</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400">—</span><span>{isEnglish ? 'Receiving royalties from US companies' : 'ABD şirketlerinden telif ücreti alanlar'}</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400">—</span><span>{isEnglish ? 'Income from US platforms (YouTube, Udemy, etc.)' : 'ABD platformlarından gelir elde edenler (YouTube, Udemy vb.)'}</span></li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'W-8BEN-E Required Instead:' : 'Bunun Yerine W-8BEN-E Gerekli:'}</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li className="flex items-start gap-2"><span className="text-gray-400">—</span><span>{isEnglish ? 'Receiving payment through a business entity' : 'Bir tüzel kişilik aracılığıyla ödeme alanlar'}</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400">—</span><span>{isEnglish ? 'You have a US LLC (even single-member)' : 'ABD\'de LLC sahibi olanlar (tek üyeli bile olsa)'}</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400">—</span><span>{isEnglish ? 'You operate as a Turkish company' : 'Türk şirketi olarak faaliyet gösterenler'}</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 border-l-4 border-[#C9A227] p-4">
              <p className="font-medium text-gray-900 mb-1">{isEnglish ? 'Important Distinction' : 'Önemli Ayrım'}</p>
              <p className="text-gray-700 text-sm">
                {isEnglish
                  ? 'W-8BEN is for individuals only. W-8BEN-E is for entities (companies, LLCs). Using the wrong form will result in rejection and potential 30% withholding.'
                  : 'W-8BEN yalnızca bireyler içindir. W-8BEN-E ise tüzel kişiler — yani şirketler ve LLC\'ler — içindir. Yanlış form kullanmak, formun reddedilmesine ve %30 stopaj uygulanmasına yol açar.'}
              </p>
            </div>
          </section>

          {/* Section 3: Line by Line */}
          <section id="satir-satir" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. Line-by-Line Instructions' : '3. Satır Satır Açıklamalar'}</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gray-50 -m-6 mb-4 p-4 rounded-t-lg">
                  {isEnglish ? 'Part I: Identification of Beneficial Owner' : 'Bölüm I: Gerçek Hak Sahibinin Kimlik Bilgileri'}
                </h3>

                <div className="space-y-4">
                  {(isEnglish ? [
                    { label: 'Line 1: Name', desc: 'Enter your full legal name exactly as it appears on your passport. Do not use nicknames or shortened forms.', example: 'Example: MEHMET YILMAZ' },
                    { label: 'Line 2: Country of Citizenship', desc: 'Enter "Turkey" (or "Türkiye" — both are accepted by the IRS).' },
                    { label: 'Line 3: Permanent Residence Address', desc: 'Your Turkish address. Must include street, city, and postal code. P.O. Box addresses are not accepted.', example: 'Example: Atatürk Cad. No:123, Kadıköy, Istanbul 34710, Turkey' },
                    { label: 'Line 4: Mailing Address', desc: 'Only fill this in if different from Line 3. Otherwise leave blank.' },
                    { label: 'Line 5: US Taxpayer ID (SSN or ITIN)', desc: 'If you have an ITIN, enter it here. If not, you may leave it blank — see Line 6.' },
                    { label: 'Line 6: Foreign Tax Identifying Number', desc: 'Enter your Turkish TC Kimlik No (11 digits). This is required to claim treaty benefits.', warning: 'You must provide your FTIN or explain why not on Line 6b.' },
                    { label: 'Line 7: Reference Number(s)', desc: 'Optional. Used for your records or if the payer assigns you an account number.' },
                    { label: 'Line 8: Date of Birth', desc: 'Required. Use MM-DD-YYYY format (American date format, not Turkish).', example: 'Example: 05-15-1985 (for May 15, 1985)' },
                  ] : [
                    { label: 'Satır 1: İsim', desc: 'Tam yasal adınızı pasaportunuzda göründüğü şekliyle yazın. Takma ad ya da kısaltma kullanmayın.', example: 'Örnek: MEHMET YILMAZ' },
                    { label: 'Satır 2: Vatandaşlık Ülkesi', desc: '"Turkey" veya "Türkiye" yazın. IRS her ikisini de kabul eder.' },
                    { label: 'Satır 3: Daimi İkamet Adresi', desc: 'Türkiye\'deki adresiniz. Sokak, şehir ve posta kodu içermelidir. Posta kutusu adresi kabul edilmez.', example: 'Örnek: Atatürk Cad. No:123, Kadıköy, İstanbul 34710, Türkiye' },
                    { label: 'Satır 4: Posta Adresi', desc: 'Yalnızca Satır 3\'ten farklıysa doldurun. Aynıysa boş bırakın.' },
                    { label: 'Satır 5: ABD Vergi Kimlik Numarası (SSN veya ITIN)', desc: 'ITIN\'iniz varsa buraya girin. Yoksa boş bırakabilirsiniz — Satır 6\'ya bakın.' },
                    { label: 'Satır 6: Yabancı Vergi Kimlik Numarası', desc: 'Türkiye TC Kimlik Numaranızı girin (11 hane). Anlaşma avantajlarından yararlanmak için bu satır zorunludur.', warning: 'FTIN sağlamalı veya Satır 6b\'de neden sağlamadığınızı açıklamalısınız.' },
                    { label: 'Satır 7: Referans Numarası', desc: 'İsteğe bağlı. Kendi kayıtlarınız veya ödeyicinin size atadığı hesap numarası için kullanılır.' },
                    { label: 'Satır 8: Doğum Tarihi', desc: 'Zorunludur. AA-GG-YYYY formatını kullanın (Amerikan tarih formatı — Türk formatı değil).', example: 'Örnek: 05-15-1985 (15 Mayıs 1985 için)' },
                  ]).map((item, i) => (
                    <div key={i} className="border-l-4 border-gray-300 pl-4">
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                      {item.example && <p className="text-gray-500 text-sm mt-1 font-mono">{item.example}</p>}
                      {item.warning && <p className="text-red-700 text-sm mt-1">{item.warning}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gray-50 -m-6 mb-4 p-4 rounded-t-lg">
                  {isEnglish ? 'Part II: Claim of Tax Treaty Benefits' : 'Bölüm II: Vergi Anlaşması Avantajları Talebi'}
                </h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 9: Treaty Country' : 'Satır 9: Anlaşma Ülkesi'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Enter "Turkey". Turkey has a bilateral tax treaty with the US that provides reduced withholding rates on certain income types.'
                        : '"Turkey" girin. Türkiye\'nin ABD ile belirli gelir türlerinde indirimli stopaj oranları sağlayan ikili bir vergi anlaşması vardır.'}
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 10: Special Rates and Conditions' : 'Satır 10: Özel Oranlar ve Koşullar'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'This is where you claim specific treaty benefits. Complete the sentence with the correct information for your income type.'
                        : 'Anlaşma kapsamındaki spesifik avantajları bu satırda talep edersiniz. Cümleyi gelir türünüze uygun bilgilerle tamamlayın.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gray-50 -m-6 mb-4 p-4 rounded-t-lg">
                  {isEnglish ? 'Part III: Certification' : 'Bölüm III: Onay'}
                </h3>

                <div className="border-l-4 border-gray-300 pl-4">
                  <p className="font-semibold">{isEnglish ? 'Signature and Date' : 'İmza ve Tarih'}</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Sign and date the form. Print your name exactly as on Line 1. Use MM-DD-YYYY format. The form is valid for 3 calendar years from the signature date.'
                      : 'Formu imzalayın ve tarihi yazın. Adınızı Satır 1\'deki gibi yazın. Tarih için AA-GG-YYYY formatını kullanın. Form, imza tarihinden itibaren 3 takvim yılı geçerlidir.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Treaty Benefits */}
          <section id="vergi-anlasmasi" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Turkey-US Tax Treaty Benefits' : '4. Türkiye-ABD Vergi Anlaşması Avantajları'}</h2>

            <p className="text-gray-700 mb-6">
              {isEnglish
                ? 'Turkey and the US have a bilateral tax treaty that reduces withholding on certain income types. The following rates apply when a properly completed W-8BEN is on file:'
                : 'Türkiye ile ABD arasında belirli gelir türlerinde stopajı azaltan ikili bir vergi anlaşması bulunmaktadır. Doğru şekilde doldurulmuş bir W-8BEN dosyalandığında aşağıdaki oranlar uygulanır:'}
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Income Type' : 'Gelir Türü'}</th>
                    <th className="border border-gray-200 p-3 text-center">{isEnglish ? 'Without Treaty' : 'Anlaşmasız'}</th>
                    <th className="border border-gray-200 p-3 text-center">{isEnglish ? 'With Treaty' : 'Anlaşmalı'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Treaty Article' : 'Anlaşma Maddesi'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: isEnglish ? 'Dividends' : 'Temettüler', without: '30%', treaty: '15%', article: 'Article 10' },
                    { type: isEnglish ? 'Interest' : 'Faiz', without: '30%', treaty: '10–15%', article: 'Article 11' },
                    { type: isEnglish ? 'Royalties' : 'Telif Hakları', without: '30%', treaty: '5–10%', article: 'Article 12' },
                    { type: isEnglish ? 'Independent Services' : 'Bağımsız Hizmetler', without: '30%', treaty: '0%*', article: 'Article 14' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3">{row.type}</td>
                      <td className="border border-gray-200 p-3 text-center">{row.without}</td>
                      <td className="border border-gray-200 p-3 text-center font-medium">{row.treaty}</td>
                      <td className="border border-gray-200 p-3 text-gray-600">{row.article}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500">
              {isEnglish
                ? '* Independent personal services (freelancing) are generally exempt from US tax if you do not have a fixed base in the US and stay fewer than 183 days per year.'
                : '* Bağımsız kişisel hizmetler (freelancing), ABD\'de sabit bir iş yeriniz yoksa ve yılda 183 günden az kalıyorsanız genellikle ABD vergisinden muaftır.'}
            </p>
          </section>

          {/* Section 5: Common Mistakes */}
          <section id="hatalar" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Common Mistakes' : '5. Sık Yapılan Hatalar'}</h2>

            <div className="space-y-3">
              {(isEnglish ? [
                { mistake: 'Name does not match passport', fix: 'Use your exact legal name as shown on your passport, including all middle names.' },
                { mistake: 'Wrong date format', fix: 'Use MM-DD-YYYY (American format), not DD-MM-YYYY or YYYY-MM-DD.' },
                { mistake: 'Missing foreign tax ID on Line 6', fix: 'Enter your Turkish TC Kimlik No. Required for treaty benefits since 2017.' },
                { mistake: 'Using W-8BEN for a business entity', fix: 'If you have an LLC or company, use W-8BEN-E instead.' },
                { mistake: 'Letting the form expire', fix: 'W-8BEN is valid for 3 years. Set a calendar reminder to renew before expiration.' },
                { mistake: 'Not completing Part II', fix: 'Complete Part II to claim treaty benefits. An incomplete Part II means 30% withholding applies.' },
              ] : [
                { mistake: 'İsim pasaportla eşleşmiyor', fix: 'Pasaportunuzdaki tam yasal adınızı kullanın. İkinci adlarınızı da dahil edin.' },
                { mistake: 'Yanlış tarih formatı', fix: 'AA-GG-YYYY (Amerikan formatı) kullanın. GG-AA-YYYY ya da YYYY-AA-GG değil.' },
                { mistake: 'Satır 6\'da vergi kimlik numarası eksik', fix: 'TC Kimlik Numaranızı girin. 2017\'den bu yana anlaşma avantajları için zorunludur.' },
                { mistake: 'Tüzel kişilik için W-8BEN kullanmak', fix: 'LLC ya da şirketiniz varsa W-8BEN-E kullanmanız gerekir.' },
                { mistake: 'Formun süresinin dolmasına izin vermek', fix: 'W-8BEN 3 yıl geçerlidir. Süre dolmadan önce takvime yenileme hatırlatması koyun.' },
                { mistake: 'Bölüm II\'yi boş bırakmak', fix: 'Anlaşma avantajlarından yararlanmak için Bölüm II\'yi eksiksiz doldurun. Eksik bırakırsanız %30 stopaj uygulanır.' },
              ]).map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <p className="font-medium text-gray-900"><span className="text-gray-400 mr-2">{isEnglish ? 'Mistake:' : 'Hata:'}</span>{item.mistake}</p>
                  <p className="text-gray-600 mt-1 text-sm"><span className="text-gray-400 mr-2">{isEnglish ? 'Fix:' : 'Düzeltme:'}</span>{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Risk Prevention */}
          <section id="risk-onleme" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. How to Prevent This Risk' : '6. Bu Risk Nasıl Önlenir?'}</h2>

            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'The primary risk of an incorrect or missing W-8BEN is overpayment of US taxes through unnecessary 30% withholding. Recovering withheld funds requires filing a US tax return, a process that can take 6–12 months.'
                : 'Eksik ya da hatalı bir W-8BEN\'in temel riski, gereksiz %30 stopaj nedeniyle ABD vergisinin fazla ödenmesidir. Kesilen tutarı geri almak için ABD vergi beyannamesi vermek gerekir ve bu süreç 6–12 ay alabilir.'}
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">{isEnglish ? 'Prevention Checklist:' : 'Önleme Kontrol Listesi:'}</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><span className="text-gray-400">1.</span><span>{isEnglish ? 'Complete W-8BEN before your first US payment — not after.' : 'W-8BEN\'i ilk ABD ödemenizden önce tamamlayın — sonra değil.'}</span></li>
                <li className="flex items-start gap-2"><span className="text-gray-400">2.</span><span>{isEnglish ? 'Always include your TC Kimlik No on Line 6 for treaty benefits.' : 'Anlaşma avantajları için Satır 6\'ya mutlaka TC Kimlik Numaranızı yazın.'}</span></li>
                <li className="flex items-start gap-2"><span className="text-gray-400">3.</span><span>{isEnglish ? 'Complete Part II fully — an incomplete form defaults to 30% withholding.' : 'Bölüm II\'yi eksiksiz doldurun. Eksik bırakılırsa varsayılan olarak %30 stopaj uygulanır.'}</span></li>
                <li className="flex items-start gap-2"><span className="text-gray-400">4.</span><span>{isEnglish ? 'Set a 3-year renewal reminder in your calendar.' : 'Takviminize 3 yıllık yenileme hatırlatıcısı ekleyin.'}</span></li>
                <li className="flex items-start gap-2"><span className="text-gray-400">5.</span><span>{isEnglish ? 'If you form an LLC, switch to W-8BEN-E immediately.' : 'LLC kurarsanız derhal W-8BEN-E\'ye geçiş yapın.'}</span></li>
              </ul>
            </div>
          </section>

          {/* Section 7: FAQ */}
          <section id="sss" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? '7. Frequently Asked Questions' : '7. Sık Sorulan Sorular'}</h2>

            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <details key={i} className="border border-gray-200 rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50">{faq.q}</summary>
                  <p className="p-4 pt-0 text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Document Reference */}
          <section className="border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-2">{isEnglish ? 'Related Legal Resource' : 'İlgili Hukuki Kaynak'}</h2>
            <p className="text-gray-600 text-sm mb-3">
              {isEnglish
                ? 'EchoLegal provides reference documents for US-Turkey cross-border tax compliance. These resources are available on a Pay What You Can basis.'
                : 'EchoLegal, ABD-Türkiye sınır ötesi vergi uyumluluğu konusunda referans belgeler sunar. Bu kaynaklar "Gücünüz Yettikçe Ödeyin" modeliyle kullanıma açıktır.'}
            </p>
            <p className="text-gray-500 text-sm italic">{isEnglish ? 'Pay What You Can — $20 recommended' : 'Pay What You Can — Önerilen: $20'}</p>
          </section>

          {/* Hub-and-spoke links */}
          <section className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/abd-yabancilar-vergi-gercekleri`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'US Tax Facts for Foreign Business Owners' : 'ABD\'de Şirket Kuran Yabancılar İçin Vergi Gerçekleri'}
                </Link>
                <span className="text-gray-400 ml-2">{isEnglish ? '— Parent Guide' : '— Ana Rehber'}</span>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Common Legal Mistakes When Forming a US Company' : 'ABD Şirketi Kurarken Yapılan Hukuki Hatalar'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-irs-mektubu-neden-gelir`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Why Turkish LLC Owners Receive IRS Letters' : 'Türk LLC Sahipleri Neden IRS Mektubu Alır?'}
                </Link>
              </li>
              <li>
                <a href="https://www.irs.gov/forms-pubs/about-form-w-8-ben" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Official IRS W-8BEN Instructions (External)' : 'Resmi IRS W-8BEN Talimatları (Harici Bağlantı)'}
                </a>
              </li>
            </ul>
          </section>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-xs text-gray-400 leading-relaxed">
              {isEnglish
                ? 'This article is published for general informational purposes and does not constitute legal or tax advice. For guidance specific to your situation, consult a qualified attorney or tax professional. EchoLegal is a legal information resource; use of this site does not create an attorney-client relationship.'
                : 'Bu makale genel bilgilendirme amacıyla yayımlanmıştır; hukuki veya vergisel danışmanlık niteliği taşımaz. Kendi durumunuza özel yönlendirme için nitelikli bir avukat ya da vergi uzmanına başvurun. EchoLegal bir hukuki bilgi kaynağıdır; bu sitenin kullanımı avukat-müvekkil ilişkisi oluşturmaz.'}
            </p>
          </div>

        </article>
      </main>
    </>
  )
}
