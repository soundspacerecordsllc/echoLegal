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
    ? 'Complete guide to filling out IRS Form W-8BEN for Turkish residents receiving US income. Line-by-line instructions, treaty benefits, and common mistakes to avoid.'
    : 'ABD\'den gelir alan Türkler için W-8BEN formu doldurma rehberi. Satır satır talimatlar, vergi anlaşması avantajları ve kaçınılması gereken hatalar.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: isEnglish ? 'en_US' : 'tr_TR',
    },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isEnglish
      ? 'How to Fill Out Form W-8BEN for Turkish Residents'
      : 'Türkler İçin W-8BEN Formu Nasıl Doldurulur',
    description: isEnglish
      ? 'Step-by-step guide to completing IRS Form W-8BEN'
      : 'IRS W-8BEN formunu doldurma adım adım rehberi',
    author: {
      '@type': 'Person',
      name: 'Zeynep Ruziye Moore',
      jobTitle: 'Licensed in New York',
    },
    step: [
      {
        '@type': 'HowToStep',
        name: isEnglish ? 'Enter your name' : 'Adınızı girin',
        text: isEnglish ? 'Line 1: Enter your full legal name as shown on your passport' : 'Satır 1: Pasaportunuzdaki tam yasal adınızı girin',
      },
      {
        '@type': 'HowToStep',
        name: isEnglish ? 'Enter country of citizenship' : 'Vatandaşlık ülkenizi girin',
        text: isEnglish ? 'Line 2: Enter Turkey' : 'Satır 2: Turkey yazın',
      },
      {
        '@type': 'HowToStep',
        name: isEnglish ? 'Enter your address' : 'Adresinizi girin',
        text: isEnglish ? 'Line 3: Enter your permanent Turkish address' : 'Satır 3: Türkiye\'deki daimi adresinizi girin',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'W-8BEN Form Guide' : 'W-8BEN Formu Rehberi'}</span>
        </nav>

        {/* Article Header */}
        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'How to Fill Out Form W-8BEN'
              : 'W-8BEN Formu Nasıl Doldurulur?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The complete 2026 guide for Turkish residents receiving income from US sources. Avoid the 30% withholding tax with proper form completion.'
              : 'ABD kaynaklarından gelir alan Türkler için 2026 rehberi. Doğru form doldurarak %30 stopaj vergisinden kaçının.'}
          </p>

          {/* Author and Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">ZM</div>
              <div>
                <p className="font-medium text-black">Zeynep Ruziye Moore</p>
                <p>{isEnglish ? 'Licensed in New York' : 'New York Lisanslı'}</p>
              </div>
            </div>
            <span>•</span>
            <span>{isEnglish ? 'Updated: January 2026' : 'Güncelleme: Ocak 2026'}</span>
            <span>•</span>
            <span>{isEnglish ? '10 min read' : '10 dk okuma'}</span>
          </div>

          {/* Featured Snippet Box */}
          <div className="bg-[#C9A227]/10 border-2 border-[#C9A227] rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3">{isEnglish ? 'Quick Answer' : 'Kısa Cevap'}</h2>
            <p className="text-gray-700">
              {isEnglish
                ? 'Form W-8BEN is an IRS document that certifies you are a foreign person and allows you to claim tax treaty benefits. For Turkish residents, this can reduce US withholding tax from 30% to as low as 0-15% depending on income type. The form is valid for 3 years.'
                : 'W-8BEN formu, yabancı bir kişi olduğunuzu belgeleyen ve vergi anlaşması avantajlarından yararlanmanızı sağlayan bir IRS belgesidir. Türk mukimler için bu, ABD stopaj vergisini %30\'dan gelir türüne göre %0-15\'e kadar düşürebilir. Form 3 yıl geçerlidir.'}
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-10">
            <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
            <ul className="space-y-2">
              <li><a href="#w8ben-nedir" className="text-[#C9A227] hover:underline">{isEnglish ? '1. What is Form W-8BEN?' : '1. W-8BEN Formu Nedir?'}</a></li>
              <li><a href="#kim-doldurmali" className="text-[#C9A227] hover:underline">{isEnglish ? '2. Who Needs to Fill It Out?' : '2. Kim Doldurmalı?'}</a></li>
              <li><a href="#satir-satir" className="text-[#C9A227] hover:underline">{isEnglish ? '3. Line-by-Line Instructions' : '3. Satır Satır Talimatlar'}</a></li>
              <li><a href="#vergi-anlasmasi" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Turkey-US Tax Treaty Benefits' : '4. Türkiye-ABD Vergi Anlaşması Avantajları'}</a></li>
              <li><a href="#hatalar" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Common Mistakes to Avoid' : '5. Kaçınılması Gereken Hatalar'}</a></li>
              <li><a href="#sss" className="text-[#C9A227] hover:underline">{isEnglish ? '6. FAQ' : '6. Sık Sorulan Sorular'}</a></li>
            </ul>
          </div>

          {/* Section 1 */}
          <section id="w8ben-nedir" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. What is Form W-8BEN?' : '1. W-8BEN Formu Nedir?'}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish
                ? 'Form W-8BEN (Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting) is an IRS form used by foreign individuals to:'
                : 'W-8BEN Formu (Amerika Birleşik Devletleri Vergi Kesintisi ve Raporlaması için Gerçek Hak Sahibinin Yabancı Statü Belgesi), yabancı bireyler tarafından şu amaçlarla kullanılan bir IRS formudur:'}
            </p>
            <ul className="space-y-2 mb-6">
              {(isEnglish ? [
                'Certify that you are not a US person',
                'Claim ownership of income subject to withholding',
                'Claim a reduced rate of withholding under a tax treaty',
              ] : [
                'ABD vatandaşı olmadığınızı belgelemek',
                'Stopaja tabi gelirin sahipliğini talep etmek',
                'Vergi anlaşması kapsamında indirimli stopaj oranı talep etmek',
              ]).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#C9A227] mr-2">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="font-semibold text-red-900">{isEnglish ? 'Without W-8BEN' : 'W-8BEN Olmadan'}</p>
              <p className="text-red-800">
                {isEnglish
                  ? 'US payers are required to withhold 30% of your payment and send it to the IRS. This applies to dividends, interest, royalties, and certain other income types.'
                  : 'ABD\'deki ödeme yapanlar, ödemenizin %30\'unu kesip IRS\'e göndermek zorundadır. Bu, temettüler, faizler, telif hakları ve diğer belirli gelir türleri için geçerlidir.'}
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="kim-doldurmali" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. Who Needs to Fill It Out?' : '2. Kim Doldurmalı?'}</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">{isEnglish ? 'You Need W-8BEN If:' : 'W-8BEN Gerekli:'}</h3>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• {isEnglish ? 'You\'re a Turkish resident freelancing for US clients' : 'Türkiye\'de yaşayıp ABD müşterilerine freelance çalışıyorsanız'}</li>
                  <li>• {isEnglish ? 'You receive dividends from US stocks' : 'ABD hisse senetlerinden temettü alıyorsanız'}</li>
                  <li>• {isEnglish ? 'You receive royalties from US companies' : 'ABD şirketlerinden telif ücreti alıyorsanız'}</li>
                  <li>• {isEnglish ? 'You have income from US platforms (YouTube, Udemy, etc.)' : 'ABD platformlarından geliriniz varsa (YouTube, Udemy vb.)'}</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">{isEnglish ? 'You Need W-8BEN-E Instead If:' : 'W-8BEN-E Gerekli:'}</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• {isEnglish ? 'You\'re receiving payment through a business entity' : 'Bir işletme aracılığıyla ödeme alıyorsanız'}</li>
                  <li>• {isEnglish ? 'You have an LLC (even single-member)' : 'LLC\'niz varsa (tek üyeli bile)'}</li>
                  <li>• {isEnglish ? 'You operate as a Turkish company' : 'Türk şirketi olarak faaliyet gösteriyorsanız'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="font-semibold text-yellow-900">{isEnglish ? 'Important Distinction' : 'Önemli Ayrım'}</p>
              <p className="text-yellow-800">
                {isEnglish
                  ? 'W-8BEN is for individuals. W-8BEN-E is for entities (companies, LLCs). Using the wrong form will cause rejection and potential withholding.'
                  : 'W-8BEN bireyler içindir. W-8BEN-E tüzel kişiler (şirketler, LLC\'ler) içindir. Yanlış form kullanmak ret ve potansiyel stopaja neden olur.'}
              </p>
            </div>
          </section>

          {/* Section 3: Line by Line */}
          <section id="satir-satir" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. Line-by-Line Instructions' : '3. Satır Satır Talimatlar'}</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gray-100 -m-6 mb-4 p-4 rounded-t-lg">
                  {isEnglish ? 'Part I: Identification of Beneficial Owner' : 'Bölüm I: Gerçek Hak Sahibinin Tanımlanması'}
                </h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 1: Name' : 'Satır 1: İsim'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Enter your full legal name EXACTLY as it appears on your passport. Do not use nicknames or shortened versions.'
                        : 'Pasaportunuzda AYNEN göründüğü şekilde tam yasal adınızı girin. Takma ad veya kısaltma kullanmayın.'}
                    </p>
                    <p className="text-green-600 text-sm mt-1">{isEnglish ? 'Example: MEHMET YILMAZ' : 'Örnek: MEHMET YILMAZ'}</p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 2: Country of Citizenship' : 'Satır 2: Vatandaşlık Ülkesi'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Enter "Turkey" (or "Türkiye" - both are accepted).'
                        : '"Turkey" veya "Türkiye" yazın - her ikisi de kabul edilir.'}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 3: Permanent Residence Address' : 'Satır 3: Daimi İkamet Adresi'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Your Turkish address. Must include street, city, and postal code. Do NOT use a P.O. Box.'
                        : 'Türkiye\'deki adresiniz. Sokak, şehir ve posta kodu içermelidir. Posta kutusu KULLANMAYIN.'}
                    </p>
                    <p className="text-green-600 text-sm mt-1">{isEnglish ? 'Example: Atatürk Cad. No:123, Kadıköy, Istanbul 34710, Turkey' : 'Örnek: Atatürk Cad. No:123, Kadıköy, İstanbul 34710, Türkiye'}</p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 4: Mailing Address' : 'Satır 4: Posta Adresi'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Only fill this if different from Line 3. Otherwise, leave blank.'
                        : 'Yalnızca Satır 3\'ten farklıysa doldurun. Aksi takdirde boş bırakın.'}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 5: U.S. Taxpayer Identification Number (SSN or ITIN)' : 'Satır 5: ABD Vergi Kimlik Numarası (SSN veya ITIN)'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'If you have an ITIN, enter it here. If not, you may leave it blank (see Line 6).'
                        : 'ITIN\'iniz varsa buraya girin. Yoksa boş bırakabilirsiniz (Satır 6\'ya bakın).'}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 6: Foreign Tax Identifying Number' : 'Satır 6: Yabancı Vergi Kimlik Numarası'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Enter your Turkish TC Kimlik No (11 digits). This is REQUIRED for treaty benefits.'
                        : 'Türkiye TC Kimlik Numaranızı girin (11 hane). Anlaşma avantajları için ZORUNLUDUR.'}
                    </p>
                    <p className="text-red-600 text-sm mt-1">{isEnglish ? '⚠️ Must provide FTIN or explain why not on Line 6b' : '⚠️ FTIN sağlamalı veya Satır 6b\'de neden sağlamadığınızı açıklamalısınız'}</p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 7: Reference Number(s)' : 'Satır 7: Referans Numarası'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Optional. Used for your records or if the payer assigns you an account number.'
                        : 'İsteğe bağlı. Kendi kayıtlarınız veya ödeyicinin size atadığı hesap numarası için kullanılır.'}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 8: Date of Birth' : 'Satır 8: Doğum Tarihi'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Required. Use MM-DD-YYYY format (American date format).'
                        : 'Zorunlu. AA-GG-YYYY formatını kullanın (Amerikan tarih formatı).'}
                    </p>
                    <p className="text-green-600 text-sm mt-1">{isEnglish ? 'Example: 05-15-1985 (for May 15, 1985)' : 'Örnek: 05-15-1985 (15 Mayıs 1985 için)'}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gray-100 -m-6 mb-4 p-4 rounded-t-lg">
                  {isEnglish ? 'Part II: Claim of Tax Treaty Benefits' : 'Bölüm II: Vergi Anlaşması Avantajları Talebi'}
                </h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 9: Treaty Country' : 'Satır 9: Anlaşma Ülkesi'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Enter "Turkey". Turkey has a tax treaty with the US that provides reduced withholding rates.'
                        : '"Turkey" girin. Türkiye\'nin ABD ile indirimli stopaj oranları sağlayan bir vergi anlaşması vardır.'}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Line 10: Special Rates and Conditions' : 'Satır 10: Özel Oranlar ve Koşullar'}</p>
                    <p className="text-gray-600 text-sm mb-2">
                      {isEnglish
                        ? 'This is where you claim specific treaty benefits. You must fill in the blanks correctly:'
                        : 'Belirli anlaşma avantajlarını burada talep edersiniz. Boşlukları doğru doldurmalısınız:'}
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                      {isEnglish
                        ? 'The beneficial owner is a resident of Turkey within the meaning of the income tax treaty between the United States and that country.'
                        : 'Gerçek hak sahibi, Amerika Birleşik Devletleri ile söz konusu ülke arasındaki gelir vergisi anlaşması anlamında Turkey mukimidir.'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 bg-gray-100 -m-6 mb-4 p-4 rounded-t-lg">
                  {isEnglish ? 'Part III: Certification' : 'Bölüm III: Onay'}
                </h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Signature' : 'İmza'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Sign and date the form. Electronic signatures are generally accepted if allowed by the withholding agent.'
                        : 'Formu imzalayın ve tarihleyin. Kesinti yapan izin veriyorsa elektronik imzalar genellikle kabul edilir.'}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Print Name' : 'Adı Soyadı'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Print your name exactly as on Line 1.'
                        : 'Adınızı Satır 1\'deki gibi AYNEN yazın.'}
                    </p>
                  </div>

                  <div className="border-l-4 border-[#C9A227] pl-4">
                    <p className="font-semibold">{isEnglish ? 'Date' : 'Tarih'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'Use MM-DD-YYYY format. The form is valid for 3 years from this date.'
                        : 'AA-GG-YYYY formatını kullanın. Form bu tarihten itibaren 3 yıl geçerlidir.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Treaty Benefits */}
          <section id="vergi-anlasmasi" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Turkey-US Tax Treaty Benefits' : '4. Türkiye-ABD Vergi Anlaşması Avantajları'}</h2>

            <p className="text-gray-600 mb-6">
              {isEnglish
                ? 'Turkey and the US have a tax treaty that reduces withholding tax on certain types of income:'
                : 'Türkiye ve ABD, belirli gelir türlerinde stopaj vergisini azaltan bir vergi anlaşmasına sahiptir:'}
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Income Type' : 'Gelir Türü'}</th>
                    <th className="border border-gray-200 p-3 text-center">{isEnglish ? 'Without Treaty' : 'Anlaşma Olmadan'}</th>
                    <th className="border border-gray-200 p-3 text-center">{isEnglish ? 'With Treaty' : 'Anlaşma İle'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Treaty Article' : 'Anlaşma Maddesi'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Dividends' : 'Temettüler'}</td>
                    <td className="border border-gray-200 p-3 text-center text-red-600">30%</td>
                    <td className="border border-gray-200 p-3 text-center text-green-600">15%</td>
                    <td className="border border-gray-200 p-3">Article 10</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Interest' : 'Faiz'}</td>
                    <td className="border border-gray-200 p-3 text-center text-red-600">30%</td>
                    <td className="border border-gray-200 p-3 text-center text-green-600">10-15%</td>
                    <td className="border border-gray-200 p-3">Article 11</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Royalties' : 'Telif Hakları'}</td>
                    <td className="border border-gray-200 p-3 text-center text-red-600">30%</td>
                    <td className="border border-gray-200 p-3 text-center text-green-600">5-10%</td>
                    <td className="border border-gray-200 p-3">Article 12</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Independent Services' : 'Bağımsız Hizmetler'}</td>
                    <td className="border border-gray-200 p-3 text-center text-red-600">30%</td>
                    <td className="border border-gray-200 p-3 text-center text-green-600">0%*</td>
                    <td className="border border-gray-200 p-3">Article 14</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500">
              {isEnglish
                ? '* Independent personal services (freelancing) are generally exempt if you don\'t have a fixed base in the US and stay less than 183 days.'
                : '* Bağımsız kişisel hizmetler (freelancing), ABD\'de sabit bir yeriniz yoksa ve 183 günden az kalıyorsanız genellikle muaftır.'}
            </p>
          </section>

          {/* Section 5: Common Mistakes */}
          <section id="hatalar" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Common Mistakes to Avoid' : '5. Kaçınılması Gereken Hatalar'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { mistake: 'Name doesn\'t match passport', fix: 'Always use your exact legal name as shown on your passport, including middle names' },
                { mistake: 'Wrong date format', fix: 'Use MM-DD-YYYY (American format), not DD-MM-YYYY or YYYY-MM-DD' },
                { mistake: 'Missing foreign tax ID (Line 6)', fix: 'Enter your Turkish TC Kimlik No. Required for treaty benefits since 2017' },
                { mistake: 'Using W-8BEN for a business', fix: 'If you have an LLC or company, use W-8BEN-E instead' },
                { mistake: 'Expired form', fix: 'W-8BEN is valid for 3 years. Set a reminder to renew before expiration' },
                { mistake: 'Not claiming treaty benefits', fix: 'Complete Part II to claim reduced withholding rates - don\'t leave it blank!' },
              ] : [
                { mistake: 'İsim pasaportla eşleşmiyor', fix: 'Her zaman pasaportunuzda göründüğü şekilde tam yasal adınızı kullanın, ikinci adlar dahil' },
                { mistake: 'Yanlış tarih formatı', fix: 'AA-GG-YYYY (Amerikan formatı) kullanın, GG-AA-YYYY veya YYYY-AA-GG değil' },
                { mistake: 'Eksik yabancı vergi kimliği (Satır 6)', fix: 'Türkiye TC Kimlik Numaranızı girin. 2017\'den beri anlaşma avantajları için zorunlu' },
                { mistake: 'İşletme için W-8BEN kullanmak', fix: 'LLC veya şirketiniz varsa, bunun yerine W-8BEN-E kullanın' },
                { mistake: 'Süresi dolmuş form', fix: 'W-8BEN 3 yıl geçerlidir. Süre dolmadan önce yenilemek için hatırlatıcı ayarlayın' },
                { mistake: 'Anlaşma avantajlarını talep etmemek', fix: 'İndirimli stopaj oranlarını talep etmek için Bölüm II\'yi doldurun - boş bırakmayın!' },
              ]).map((item, i) => (
                <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-800">✗ {item.mistake}</p>
                  <p className="text-green-700 mt-1">✓ {item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: FAQ */}
          <section id="sss" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? '6. Frequently Asked Questions' : '6. Sık Sorulan Sorular'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { q: 'How long is W-8BEN valid?', a: 'The form is valid for 3 calendar years from the date of signature. For example, a form signed on July 15, 2026 expires on December 31, 2029.' },
                { q: 'Do I need an ITIN to fill out W-8BEN?', a: 'No. You can use your Turkish TC Kimlik No on Line 6 as your foreign tax identifying number. An ITIN is optional but may be required by some payers.' },
                { q: 'Where do I send the W-8BEN?', a: 'You do NOT send it to the IRS. Submit it directly to the payer (your US client, broker, bank, or platform like YouTube) who requested it.' },
                { q: 'What if I have both US and Turkish citizenship?', a: 'Dual citizens with US citizenship cannot use W-8BEN. You would need to file as a US person using Form W-9 instead.' },
                { q: 'Can I sign electronically?', a: 'Yes, if the withholding agent accepts electronic signatures. Most digital platforms allow electronic completion and signing.' },
              ] : [
                { q: 'W-8BEN ne kadar süre geçerli?', a: 'Form, imza tarihinden itibaren 3 takvim yılı geçerlidir. Örneğin, 15 Temmuz 2026\'da imzalanan form 31 Aralık 2029\'da sona erer.' },
                { q: 'W-8BEN doldurmak için ITIN\'e ihtiyacım var mı?', a: 'Hayır. Yabancı vergi kimlik numaranız olarak Satır 6\'da Türk TC Kimlik Numaranızı kullanabilirsiniz. ITIN isteğe bağlıdır ancak bazı ödeyiciler tarafından istenebilir.' },
                { q: 'W-8BEN\'i nereye gönderirim?', a: 'IRS\'e GÖNDERMEZSİNİZ. İsteyen ödeyiciye (ABD müşteriniz, broker, banka veya YouTube gibi platform) doğrudan gönderin.' },
                { q: 'Hem ABD hem Türk vatandaşlığım varsa ne olur?', a: 'ABD vatandaşlığı olan çifte vatandaşlar W-8BEN kullanamazlar. Bunun yerine W-9 Formu kullanarak ABD vatandaşı olarak dosyalamanız gerekir.' },
                { q: 'Elektronik olarak imzalayabilir miyim?', a: 'Evet, kesinti yapan elektronik imzaları kabul ediyorsa. Çoğu dijital platform elektronik tamamlama ve imzalamaya izin verir.' },
              ]).map((faq, i) => (
                <details key={i} className="border border-gray-200 rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50">{faq.q}</summary>
                  <p className="p-4 pt-0 text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/checklists/w8-w9-karar-haritasi`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'W-8 vs W-9 Decision Tool →' : 'W-8 mi W-9 mu? Karar Aracı →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/ein-itin-ssn-farki`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'EIN vs ITIN vs SSN: What\'s the Difference? →' : 'EIN vs ITIN vs SSN: Fark Nedir? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'IRS Tax Facts for Turks →' : 'Türkler İçin IRS Vergi Gerçekleri →'}
                </Link>
              </li>
              <li>
                <a href="https://www.irs.gov/forms-pubs/about-form-w-8-ben" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Official IRS W-8BEN Instructions (External) →' : 'Resmi IRS W-8BEN Talimatları (Harici) →'}
                </a>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
