// app/[lang]/checklists/bank-account-checklist/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'US Bank Account Checklist | What You Need Before Opening | EchoLegal'
    : "ABD Banka Hesabı Açmadan Önce Bilmen Gerekenler | EchoLegal"

  const description = isEnglish
    ? 'Free checklist: Documents and requirements for opening a US business bank account as a non-resident. Mercury, Relay, traditional banks.'
    : "Ücretsiz kontrol listesi: Yabancı olarak ABD iş bankası hesabı açmak için gerekli belgeler ve şartlar."

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
      canonical: `https://echo-legal.com/${lang}/checklists/bank-account-checklist`,
      languages: {
        'en': 'https://echo-legal.com/en/checklists/bank-account-checklist',
        'tr': 'https://echo-legal.com/tr/checklists/bank-account-checklist',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function BankAccountChecklistPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const prerequisiteChecklist = isEnglish ? [
    { item: 'Active US LLC with Certificate of Formation/Good Standing', done: false },
    { item: 'EIN (Employer Identification Number) from IRS', done: false },
    { item: 'Operating Agreement (signed and dated)', done: false },
    { item: 'Articles of Organization', done: false },
    { item: 'Valid passport (for all members/signers)', done: false },
    { item: 'Proof of address in home country (utility bill, bank statement)', done: false },
  ] : [
    { item: 'Certificate of Formation/Good Standing ile aktif ABD LLC', done: false },
    { item: 'IRS\'den EIN (Employer Identification Number)', done: false },
    { item: 'Operating Agreement (imzalı ve tarihli)', done: false },
    { item: 'Articles of Organization', done: false },
    { item: 'Geçerli pasaport (tüm üyeler/imzacılar için)', done: false },
    { item: 'Kendi ülkenizde adres kanıtı (fatura, banka ekstresi)', done: false },
  ]

  const neobanksChecklist = isEnglish ? [
    { item: 'Mercury: US LLC required, no US address needed, online application', done: false },
    { item: 'Relay: Accepts non-US owners, integrates with accounting software', done: false },
    { item: 'Brex: For startups, may require revenue or funding', done: false },
    { item: 'Prepare business description (what your company does)', done: false },
    { item: 'Have website or social presence ready for verification', done: false },
  ] : [
    { item: 'Mercury: ABD LLC gerekli, ABD adresi gerekmez, online başvuru', done: false },
    { item: 'Relay: ABD dışı sahipleri kabul eder, muhasebe yazılımlarıyla entegre', done: false },
    { item: 'Brex: Startuplar için, gelir veya yatırım gerektirebilir', done: false },
    { item: 'İş açıklaması hazırlayın (şirketiniz ne yapıyor)', done: false },
    { item: 'Doğrulama için web sitesi veya sosyal medya hazır olsun', done: false },
  ]

  const traditionalBanksChecklist = isEnglish ? [
    { item: 'Plan US visit (many require in-person account opening)', done: false },
    { item: 'Book appointment in advance (Chase, Bank of America, Wells Fargo)', done: false },
    { item: 'Bring all LLC documents (originals preferred)', done: false },
    { item: 'Bring two forms of ID (passport + driver license if available)', done: false },
    { item: 'Prepare initial deposit ($100-$500 typically)', done: false },
    { item: 'Be ready to explain business activities clearly', done: false },
  ] : [
    { item: 'ABD ziyareti planlayın (çoğu yüz yüze hesap açma gerektirir)', done: false },
    { item: 'Önceden randevu alın (Chase, Bank of America, Wells Fargo)', done: false },
    { item: 'Tüm LLC belgelerini getirin (orijinaller tercih edilir)', done: false },
    { item: 'İki kimlik formu getirin (pasaport + varsa ehliyet)', done: false },
    { item: 'İlk para yatırma hazırlayın (genellikle 100-500$)', done: false },
    { item: 'İş faaliyetlerini net açıklamaya hazır olun', done: false },
  ]

  const afterOpeningChecklist = isEnglish ? [
    { item: 'Set up online banking access', done: false },
    { item: 'Order debit card if needed', done: false },
    { item: 'Enable two-factor authentication', done: false },
    { item: 'Connect to accounting software (QuickBooks, Xero, Wave)', done: false },
    { item: 'Set up payment processing (Stripe, PayPal) with bank account', done: false },
    { item: 'Keep bank statements organized for tax purposes', done: false },
  ] : [
    { item: 'Online bankacılık erişimi kurun', done: false },
    { item: 'Gerekirse banka kartı sipariş edin', done: false },
    { item: 'İki faktörlü doğrulama etkinleştirin', done: false },
    { item: 'Muhasebe yazılımına bağlayın (QuickBooks, Xero, Wave)', done: false },
    { item: 'Ödeme işlemeyi (Stripe, PayPal) banka hesabıyla kurun', done: false },
    { item: 'Vergi amaçları için banka hesap özetlerini düzenli tutun', done: false },
  ]

  const faqItems = isEnglish ? [
    {
      q: 'Can I open a US bank account without visiting the US?',
      a: 'Yes, with neobanks like Mercury or Relay. Traditional banks usually require in-person visits. Some community banks may accept remote applications with extra documentation.',
    },
    {
      q: 'Do I need an SSN to open a business bank account?',
      a: 'No. An EIN is sufficient for business accounts. SSN is only required for personal accounts.',
    },
    {
      q: 'How long does account opening take?',
      a: 'Neobanks: 1-5 business days for approval. Traditional banks: Same-day if in person, or 1-2 weeks for mail applications.',
    },
    {
      q: 'What if my application is rejected?',
      a: 'Common reasons: incomplete documentation, business type concerns, or verification issues. Try a different bank or neobank, and ensure all documents are current and consistent.',
    },
  ] : [
    {
      q: 'ABD\'ye gitmeden ABD banka hesabı açabilir miyim?',
      a: 'Evet, Mercury veya Relay gibi neobankalarla. Geleneksel bankalar genellikle yüz yüze ziyaret gerektirir. Bazı topluluk bankaları ekstra belgeyle uzaktan başvuru kabul edebilir.',
    },
    {
      q: 'İş bankası hesabı açmak için SSN\'e ihtiyacım var mı?',
      a: 'Hayır. İş hesapları için EIN yeterlidir. SSN yalnızca kişisel hesaplar için gereklidir.',
    },
    {
      q: 'Hesap açma ne kadar sürer?',
      a: 'Neobankalar: Onay için 1-5 iş günü. Geleneksel bankalar: Yüz yüze ise aynı gün, posta başvuruları için 1-2 hafta.',
    },
    {
      q: 'Başvurum reddedilirse ne olur?',
      a: 'Yaygın nedenler: eksik belgeler, iş türü endişeleri veya doğrulama sorunları. Farklı bir banka veya neobank deneyin ve tüm belgelerin güncel ve tutarlı olduğundan emin olun.',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isEnglish ? 'US Bank Account Opening Checklist' : 'ABD Banka Hesabı Açma Kontrol Listesi',
    description: isEnglish
      ? 'Complete checklist for opening a US business bank account as a non-resident'
      : 'Yabancı olarak ABD iş bankası hesabı açma kontrol listesi',
    step: prerequisiteChecklist.map((item, index) => ({
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'Bank Account Checklist' : 'Banka Hesabı Kontrol Listesi'}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Free Checklist' : 'Ücretsiz Kontrol Listesi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
              {isEnglish ? 'US Bank Account Checklist' : "ABD Banka Hesabı Açmadan Önce Bilmen Gerekenler"}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {isEnglish
                ? 'Everything you need to prepare before opening a US business bank account. Works for neobanks and traditional banks.'
                : 'ABD iş bankası hesabı açmadan önce hazırlamanız gereken her şey. Neobankalar ve geleneksel bankalar için geçerlidir.'}
            </p>
          </div>

          {/* Prerequisites */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              {isEnglish ? 'Prerequisites (Required for All Banks)' : 'Ön Koşullar (Tüm Bankalar İçin Gerekli)'}
            </h2>
            <div className="space-y-3">
              {prerequisiteChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Neobanks */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              {isEnglish ? 'For Neobanks (Mercury, Relay)' : 'Neobankalar İçin (Mercury, Relay)'}
            </h2>
            <div className="space-y-3">
              {neobanksChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Traditional Banks */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              {isEnglish ? 'For Traditional Banks (In-Person)' : 'Geleneksel Bankalar İçin (Yüz Yüze)'}
            </h2>
            <div className="space-y-3">
              {traditionalBanksChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* After Opening */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              {isEnglish ? 'After Account is Open' : 'Hesap Açıldıktan Sonra'}
            </h2>
            <div className="space-y-3">
              {afterOpeningChecklist.map((item, index) => (
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
              <Link href={`/${lang}/abdde-banka-hesabi-acmak`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'US Bank Account Guide' : 'ABD Banka Hesabı Rehberi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Complete banking guide' : 'Tam bankacılık rehberi'}</p>
              </Link>
              <Link href={`/${lang}/checklists/llc-checklist`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Checklist' : 'LLC Kurma Kontrol Listesi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Form your LLC first' : 'Önce LLC\'nizi kurun'}</p>
              </Link>
              <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates' : '5 temel sözleşme şablonu'}</p>
              </Link>
              <Link href={`/${lang}/abd-odemeleri-alma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'US Payments Guide' : 'ABD Ödeme Rehberi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Stripe, PayPal, Wise' : 'Stripe, PayPal, Wise'}</p>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded-lg p-5">
            <p className="text-xs text-gray-600 leading-relaxed">
              {isEnglish
                ? 'This checklist is for informational purposes only and does not constitute financial advice. Bank requirements change frequently. Verify current requirements directly with the financial institution.'
                : 'Bu kontrol listesi yalnızca bilgilendirme amaçlıdır; mali tavsiye niteliği taşımaz. Banka gereksinimleri sık sık değişir. Güncel gereksinimleri doğrudan finans kurumuyla doğrulayın.'}
            </p>
          </div>
      </div>
    </>
  )
}
