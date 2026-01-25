// app/[lang]/checklists/tax-documents-checklist/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'US Tax Documents Checklist | First Year Tax Prep for Non-Residents | EchoLegal'
    : "ABD Vergi Belgeleri: İlk Yıl Checklist | Türk Girişimciler İçin | EchoLegal"

  const description = isEnglish
    ? 'Free checklist: Essential US tax documents for your first year with a US LLC. EIN, W-8BEN, 1099s, and more explained.'
    : "Ücretsiz kontrol listesi: ABD LLC'nizin ilk yılı için temel vergi belgeleri. EIN, W-8BEN, 1099'lar ve daha fazlası."

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
    alternates: {
      canonical: `https://echo-legal.com/${lang}/checklists/tax-documents-checklist`,
      languages: {
        'en': 'https://echo-legal.com/en/checklists/tax-documents-checklist',
        'tr': 'https://echo-legal.com/tr/checklists/tax-documents-checklist',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function TaxDocumentsChecklistPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const taxIdChecklist = isEnglish ? [
    { item: 'EIN (Employer Identification Number) - Required for LLC', done: false },
    { item: 'Confirm EIN letter (CP 575) received and stored safely', done: false },
    { item: 'ITIN application (if personal tax filing required)', done: false },
    { item: 'Keep Turkish tax ID (Vergi Kimlik No) records accessible', done: false },
  ] : [
    { item: 'EIN (Employer Identification Number) - LLC için zorunlu', done: false },
    { item: 'EIN mektubunun (CP 575) alındığını ve güvenle saklandığını onaylayın', done: false },
    { item: 'ITIN başvurusu (kişisel vergi beyannamesi gerekiyorsa)', done: false },
    { item: 'Türk vergi kimlik numarası (Vergi Kimlik No) kayıtlarını erişilebilir tutun', done: false },
  ]

  const formsToCollectChecklist = isEnglish ? [
    { item: 'W-8BEN or W-8BEN-E (provide to US clients/platforms)', done: false },
    { item: 'W-9 understanding (you should NOT complete this as non-US person)', done: false },
    { item: '1099-NEC copies (if received from US clients paying $600+)', done: false },
    { item: '1099-K copies (from Stripe, PayPal if above threshold)', done: false },
    { item: '1042-S copies (if tax was withheld at source)', done: false },
  ] : [
    { item: 'W-8BEN veya W-8BEN-E (ABD müşterileri/platformlarına sağlayın)', done: false },
    { item: 'W-9 anlayışı (ABD dışı kişi olarak bunu doldurmamalısınız)', done: false },
    { item: '1099-NEC kopyaları (600$+ ödeyen ABD müşterilerinden aldıysanız)', done: false },
    { item: '1099-K kopyaları (Stripe, PayPal\'dan eşik üzerindeyse)', done: false },
    { item: '1042-S kopyaları (kaynakta vergi kesildiyse)', done: false },
  ]

  const recordKeepingChecklist = isEnglish ? [
    { item: 'All invoices issued to US clients', done: false },
    { item: 'Bank statements for US business account', done: false },
    { item: 'Payment processor statements (Stripe, PayPal, Wise)', done: false },
    { item: 'Business expense receipts (if deductible)', done: false },
    { item: 'Currency conversion records (USD to TRY)', done: false },
    { item: 'Copy of Operating Agreement', done: false },
    { item: 'Annual report receipts (if required by state)', done: false },
  ] : [
    { item: 'ABD müşterilerine kesilen tüm faturalar', done: false },
    { item: 'ABD iş hesabı banka hesap özetleri', done: false },
    { item: 'Ödeme işlemcisi ekstreleri (Stripe, PayPal, Wise)', done: false },
    { item: 'İşletme gideri makbuzları (düşülebilirse)', done: false },
    { item: 'Döviz dönüştürme kayıtları (USD\'den TRY\'ye)', done: false },
    { item: 'Operating Agreement kopyası', done: false },
    { item: 'Yıllık rapor makbuzları (eyalet gerektiriyorsa)', done: false },
  ]

  const deadlinesChecklist = isEnglish ? [
    { item: 'Mark March 15: Partnership/multi-member LLC deadline (if applicable)', done: false },
    { item: 'Mark April 15: Individual tax deadline (if filing 1040-NR)', done: false },
    { item: 'Note state annual report deadline (varies by state)', done: false },
    { item: 'BOI update deadline (30 days after ownership changes)', done: false },
    { item: 'Set calendar reminders 30 days before each deadline', done: false },
  ] : [
    { item: '15 Mart\'ı işaretleyin: Ortaklık/çok üyeli LLC son tarihi (geçerliyse)', done: false },
    { item: '15 Nisan\'ı işaretleyin: Bireysel vergi son tarihi (1040-NR veriyorsanız)', done: false },
    { item: 'Eyalet yıllık rapor son tarihini not edin (eyalete göre değişir)', done: false },
    { item: 'BOI güncelleme son tarihi (sahiplik değişikliklerinden 30 gün sonra)', done: false },
    { item: 'Her son tarihten 30 gün önce takvim hatırlatıcıları ayarlayın', done: false },
  ]

  const turkeyTaxChecklist = isEnglish ? [
    { item: 'Report US income on Turkish tax return (worldwide income)', done: false },
    { item: 'Convert USD income to TRY at transaction date rates', done: false },
    { item: 'Claim foreign tax credit if US tax was withheld', done: false },
    { item: 'Keep records for 5 years (Turkish requirement)', done: false },
    { item: 'Consider working with Turkish SMMM for cross-border taxes', done: false },
  ] : [
    { item: 'Türkiye vergi beyannamesinde ABD gelirini beyan edin (dünya geneli gelir)', done: false },
    { item: 'USD gelirini işlem tarihi kurlarıyla TRY\'ye çevirin', done: false },
    { item: 'ABD\'de vergi kesildiyse yabancı vergi kredisi talep edin', done: false },
    { item: 'Kayıtları 5 yıl saklayın (Türkiye gereksinimi)', done: false },
    { item: 'Sınır ötesi vergiler için Türk SMMM ile çalışmayı düşünün', done: false },
  ]

  const faqItems = isEnglish ? [
    {
      q: 'Do I need to file US taxes if I have no US income?',
      a: 'Generally no federal filing if no US-source income. However, some states require annual reports regardless of income. Check your state\'s requirements.',
    },
    {
      q: 'What is the difference between W-8BEN and W-8BEN-E?',
      a: 'W-8BEN is for individuals. W-8BEN-E is for entities (like your LLC). If your single-member LLC is a disregarded entity, you may use W-8BEN as the owner.',
    },
    {
      q: 'Should I hire a US accountant?',
      a: 'Recommended if you have significant US income, multiple states, or complex situations. For simple cases, proper record-keeping and understanding the basics may suffice.',
    },
    {
      q: 'What happens if I miss a deadline?',
      a: 'Penalties vary: late filing penalties, interest on unpaid taxes, or potential LLC suspension for missed annual reports. Set reminders well in advance.',
    },
  ] : [
    {
      q: 'ABD\'de gelirim yoksa ABD vergisi vermem gerekir mi?',
      a: 'ABD kaynaklı gelir yoksa genellikle federal beyanname gerekmez. Ancak bazı eyaletler gelirden bağımsız olarak yıllık rapor gerektirir. Eyaletinizin gereksinimlerini kontrol edin.',
    },
    {
      q: 'W-8BEN ve W-8BEN-E arasındaki fark nedir?',
      a: 'W-8BEN bireyler içindir. W-8BEN-E kuruluşlar (LLC\'niz gibi) içindir. Tek üyeli LLC\'niz göz ardı edilen bir kuruluşsa, sahip olarak W-8BEN kullanabilirsiniz.',
    },
    {
      q: 'ABD muhasebecisi tutmalı mıyım?',
      a: 'Önemli ABD geliriniz, birden fazla eyaletiniz veya karmaşık durumlarınız varsa önerilir. Basit durumlar için düzgün kayıt tutma ve temelleri anlamak yeterli olabilir.',
    },
    {
      q: 'Bir son tarihi kaçırırsam ne olur?',
      a: 'Cezalar değişir: geç beyanname cezaları, ödenmemiş vergiler üzerinde faiz veya kaçırılan yıllık raporlar için potansiyel LLC askıya alma. Hatırlatıcıları önceden ayarlayın.',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isEnglish ? 'US Tax Documents Checklist' : 'ABD Vergi Belgeleri Kontrol Listesi',
    description: isEnglish
      ? 'First year tax document checklist for non-resident LLC owners'
      : 'Yabancı LLC sahipleri için ilk yıl vergi belgesi kontrol listesi',
    step: taxIdChecklist.map((item, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: item.item,
    })),
  }

  const faqJsonLd = {
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
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href={`/${lang}`} className="text-2xl font-black text-black">EchoLegal</Link>
            <div className="flex items-center gap-6">
              <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
              <Link href={`/${lang}/vergi-kimlik-rehberi`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Tax Hub' : 'Vergi Rehberi'}</Link>
              <Link
                href={`/${lang === 'en' ? 'tr' : 'en'}/checklists/tax-documents-checklist`}
                className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
              >
                {isEnglish ? 'TR' : 'EN'}
              </Link>
            </div>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'Tax Documents Checklist' : 'Vergi Belgeleri Kontrol Listesi'}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Free Checklist' : 'Ücretsiz Kontrol Listesi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
              {isEnglish ? 'US Tax Documents: First Year Checklist' : "ABD Vergi Belgeleri: İlk Yıl Checklist"}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {isEnglish
                ? 'Essential tax documents and deadlines for your first year with a US LLC. Stay organized and compliant.'
                : 'ABD LLC\'nizin ilk yılı için temel vergi belgeleri ve son tarihler. Düzenli ve uyumlu kalın.'}
            </p>
          </div>

          {/* Tax IDs */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              {isEnglish ? 'Tax Identification Numbers' : 'Vergi Kimlik Numaraları'}
            </h2>
            <div className="space-y-3">
              {taxIdChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Forms to Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              {isEnglish ? 'Forms to Collect/Provide' : 'Toplanacak/Sağlanacak Formlar'}
            </h2>
            <div className="space-y-3">
              {formsToCollectChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Record Keeping */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              {isEnglish ? 'Record Keeping' : 'Kayıt Tutma'}
            </h2>
            <div className="space-y-3">
              {recordKeepingChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Deadlines */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              {isEnglish ? 'Important Deadlines' : 'Önemli Son Tarihler'}
            </h2>
            <div className="space-y-3">
              {deadlinesChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Turkey Tax */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              {isEnglish ? 'Turkey Tax Obligations' : 'Türkiye Vergi Yükümlülükleri'}
            </h2>
            <div className="space-y-3">
              {turkeyTaxChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              {isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
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

          {/* Related Resources */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'W-8/W-9 Tax Guide' : 'W-8/W-9 Vergi Rehberi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Which form to sign' : 'Hangi formu imzalamalı'}</p>
              </Link>
              <Link href={`/${lang}/ein-itin-ssn-farki`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Tax IDs explained' : 'Vergi kimlikleri açıklandı'}</p>
              </Link>
              <Link href={`/${lang}/1099-vergi-belgeleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? '1099 Tax Documents' : '1099 Vergi Belgeleri'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Understanding 1099 forms' : '1099 formlarını anlama'}</p>
              </Link>
              <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates' : '5 temel sözleşme şablonu'}</p>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded-lg p-5">
            <p className="text-xs text-gray-600 leading-relaxed">
              {isEnglish
                ? 'This checklist is for informational purposes only and does not constitute tax or legal advice. Tax laws change frequently. Consult a qualified CPA or tax attorney for your specific situation.'
                : 'Bu kontrol listesi yalnızca bilgilendirme amaçlıdır; vergi veya hukuki tavsiye niteliği taşımaz. Vergi yasaları sık sık değişir. Kendi durumunuz için uzman bir mali müşavir veya vergi avukatına danışın.'}
            </p>
          </div>
        </main>

        <footer className="border-t border-gray-200 mt-20 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">{dict.disclaimer.global}</p>
            <p className="text-xs text-gray-400 mt-4">© 2026 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}</p>
          </div>
        </footer>
      </div>
    </>
  )
}
