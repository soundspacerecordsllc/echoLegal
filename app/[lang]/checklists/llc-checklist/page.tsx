// app/[lang]/checklists/llc-checklist/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'US LLC Formation Checklist | Pre-Formation Checklist for Turkish Entrepreneurs | EchoLegal'
    : "ABD'de LLC Kurmadan Önce Kontrol Listesi | Türk Girişimciler İçin | EchoLegal"

  const description = isEnglish
    ? 'Free checklist: Everything you need before forming a US LLC. State selection, documents, costs, and timeline for Turkish entrepreneurs.'
    : "Ücretsiz kontrol listesi: ABD'de LLC kurmadan önce bilmeniz gereken her şey. Eyalet seçimi, belgeler, maliyetler ve zaman çizelgesi."

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
      canonical: `https://echo-legal.com/${lang}/checklists/llc-checklist`,
      languages: {
        'en': 'https://echo-legal.com/en/checklists/llc-checklist',
        'tr': 'https://echo-legal.com/tr/checklists/llc-checklist',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCChecklistPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const preFormationChecklist = isEnglish ? [
    { item: 'Research and select a state (Delaware, Wyoming, New Mexico, or where you operate)', done: false },
    { item: 'Choose a unique LLC name (check availability in target state)', done: false },
    { item: 'Decide on single-member or multi-member structure', done: false },
    { item: 'Determine your registered agent (required in all states)', done: false },
    { item: 'Prepare your Operating Agreement terms', done: false },
    { item: 'Gather required personal identification documents', done: false },
    { item: 'Budget for formation costs ($50-$500 depending on state)', done: false },
  ] : [
    { item: 'Eyalet araştırın ve seçin (Delaware, Wyoming, New Mexico veya faaliyet gösterdiğiniz yer)', done: false },
    { item: 'Benzersiz bir LLC adı seçin (hedef eyalette müsaitliği kontrol edin)', done: false },
    { item: 'Tek üyeli mi çok üyeli mi yapı olacağına karar verin', done: false },
    { item: 'Registered agent belirleyin (tüm eyaletlerde zorunlu)', done: false },
    { item: 'Operating Agreement şartlarınızı hazırlayın', done: false },
    { item: 'Gerekli kişisel kimlik belgelerini toplayın', done: false },
    { item: 'Kuruluş maliyetleri için bütçe ayırın (eyalete göre 50-500$)', done: false },
  ]

  const documentChecklist = isEnglish ? [
    { item: 'Valid passport (for identification)', done: false },
    { item: 'Proof of address in Turkey (utility bill, bank statement)', done: false },
    { item: 'Articles of Organization (prepared by state or formation service)', done: false },
    { item: 'Operating Agreement (single-member or multi-member version)', done: false },
    { item: 'EIN application form (SS-4) for IRS', done: false },
    { item: 'BOI (Beneficial Ownership Information) for FinCEN', done: false },
  ] : [
    { item: 'Geçerli pasaport (kimlik için)', done: false },
    { item: 'Türkiye\'de adres kanıtı (fatura, banka ekstresi)', done: false },
    { item: 'Articles of Organization (eyalet veya kuruluş hizmeti tarafından hazırlanır)', done: false },
    { item: 'Operating Agreement (tek üyeli veya çok üyeli versiyon)', done: false },
    { item: 'IRS için EIN başvuru formu (SS-4)', done: false },
    { item: 'FinCEN için BOI (Beneficial Ownership Information)', done: false },
  ]

  const postFormationChecklist = isEnglish ? [
    { item: 'File Articles of Organization with the state', done: false },
    { item: 'Obtain Certificate of Formation', done: false },
    { item: 'Apply for EIN (Employer Identification Number)', done: false },
    { item: 'File BOI report with FinCEN (within 90 days)', done: false },
    { item: 'Open US business bank account', done: false },
    { item: 'Set up accounting/bookkeeping system', done: false },
    { item: 'Register for state taxes if required', done: false },
    { item: 'Set calendar reminders for annual report deadlines', done: false },
  ] : [
    { item: 'Eyalete Articles of Organization başvurusu yapın', done: false },
    { item: 'Certificate of Formation alın', done: false },
    { item: 'EIN (Employer Identification Number) başvurusu yapın', done: false },
    { item: 'FinCEN\'e BOI raporu verin (90 gün içinde)', done: false },
    { item: 'ABD iş bankası hesabı açın', done: false },
    { item: 'Muhasebe/defter tutma sistemi kurun', done: false },
    { item: 'Gerekirse eyalet vergileri için kayıt olun', done: false },
    { item: 'Yıllık rapor son tarihleri için takvim hatırlatıcıları ayarlayın', done: false },
  ]

  const faqItems = isEnglish ? [
    {
      q: 'Do I need to visit the US to form an LLC?',
      a: 'No. The entire LLC formation process can be completed remotely. You can file online or through a registered agent service.',
    },
    {
      q: 'Which state should I choose?',
      a: 'For non-US residents without US operations: Wyoming or New Mexico (low costs, privacy). If you have US customers or plan to work in a specific state, consider forming there.',
    },
    {
      q: 'How long does LLC formation take?',
      a: 'Filing typically takes 1-7 business days depending on the state. EIN takes 4-6 weeks by mail for non-US persons.',
    },
    {
      q: 'What ongoing requirements will I have?',
      a: 'Annual reports (most states), registered agent maintenance, BOI updates if ownership changes, and tax filings.',
    },
  ] : [
    {
      q: 'LLC kurmak için ABD\'ye gitmem gerekir mi?',
      a: 'Hayır. Tüm LLC kurulum süreci uzaktan tamamlanabilir. Online veya registered agent hizmeti aracılığıyla başvurabilirsiniz.',
    },
    {
      q: 'Hangi eyaleti seçmeliyim?',
      a: 'ABD operasyonu olmayan yabancılar için: Wyoming veya New Mexico (düşük maliyetler, gizlilik). ABD\'de müşterileriniz varsa veya belirli bir eyalette çalışmayı planlıyorsanız, orada kurmayı düşünün.',
    },
    {
      q: 'LLC kurulumu ne kadar sürer?',
      a: 'Başvuru eyalete bağlı olarak genellikle 1-7 iş günü sürer. EIN, ABD dışındaki kişiler için posta ile 4-6 hafta sürer.',
    },
    {
      q: 'Hangi devam eden gereksinimlerim olacak?',
      a: 'Yıllık raporlar (çoğu eyalet), registered agent bakımı, sahiplik değişirse BOI güncellemeleri ve vergi beyannameleri.',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isEnglish ? 'US LLC Formation Checklist' : "ABD'de LLC Kurma Kontrol Listesi",
    description: isEnglish
      ? 'Complete checklist for Turkish entrepreneurs forming a US LLC'
      : 'Türk girişimciler için ABD LLC kurma kontrol listesi',
    step: preFormationChecklist.map((item, index) => ({
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
        name: isEnglish ? 'Checklists' : 'Kontrol Listeleri',
        item: `https://echo-legal.com/${lang}/checklists`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish ? 'LLC Checklist' : 'LLC Kontrol Listesi',
        item: `https://echo-legal.com/${lang}/checklists/llc-checklist`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href={`/${lang}`} className="text-2xl font-black text-black">EchoLegal</Link>
            <div className="flex items-center gap-6">
              <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
              <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'LLC Guide' : 'LLC Rehberi'}</Link>
              <Link
                href={`/${lang === 'en' ? 'tr' : 'en'}/checklists/llc-checklist`}
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
            <span className="text-black">{isEnglish ? 'LLC Formation Checklist' : 'LLC Kurma Kontrol Listesi'}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Free Checklist' : 'Ücretsiz Kontrol Listesi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight">
              {isEnglish ? 'US LLC Formation Checklist' : "ABD'de LLC Kurmadan Önce Kontrol Listesi"}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {isEnglish
                ? 'Everything you need to prepare before, during, and after forming your US LLC. Print this page or use it as a reference.'
                : 'ABD LLC\'nizi kurmadan önce, kurarken ve kurduktan sonra hazırlamanız gereken her şey. Bu sayfayı yazdırın veya referans olarak kullanın.'}
            </p>
          </div>

          {/* Pre-Formation Checklist */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              {isEnglish ? 'Before Formation' : 'Kuruluş Öncesi'}
            </h2>
            <div className="space-y-3">
              {preFormationChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Documents Checklist */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              {isEnglish ? 'Required Documents' : 'Gerekli Belgeler'}
            </h2>
            <div className="space-y-3">
              {documentChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Post-Formation Checklist */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              {isEnglish ? 'After Formation' : 'Kuruluş Sonrası'}
            </h2>
            <div className="space-y-3">
              {postFormationChecklist.map((item, index) => (
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
              <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Complete step-by-step guide' : 'Tam adım adım rehber'}</p>
              </Link>
              <Link href={`/${lang}/ein-itin-ssn-farki`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Tax ID numbers explained' : 'Vergi kimlik numaraları açıklandı'}</p>
              </Link>
              <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates' : '5 temel sözleşme şablonu'}</p>
              </Link>
              <Link href={`/${lang}/abdde-banka-hesabi-acmak`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'US Bank Account' : 'ABD Banka Hesabı'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Opening your business account' : 'İş banka hesabı açma'}</p>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded-lg p-5">
            <p className="text-xs text-gray-600 leading-relaxed">
              {isEnglish
                ? 'This checklist is for informational purposes only and does not constitute legal advice. Requirements vary by state and individual circumstances. Consult qualified professionals for your specific situation.'
                : 'Bu kontrol listesi yalnızca bilgilendirme amaçlıdır; hukuki tavsiye niteliği taşımaz. Gereksinimler eyalete ve bireysel durumlara göre değişir. Kendi durumunuz için uzman profesyonellere danışın.'}
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
