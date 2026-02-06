// app/[lang]/checklists/llc-checklist/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import JsonLdScript from '@/components/JsonLdScript'
import { SITE_URL } from '@/lib/structured-data'

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
        item: `${SITE_URL}/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEnglish ? 'Checklists' : 'Kontrol Listeleri',
        item: `${SITE_URL}/${lang}/checklists`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish ? 'LLC Checklist' : 'LLC Kontrol Listesi',
        item: `${SITE_URL}/${lang}/checklists/llc-checklist`,
      },
    ],
  }

  return (
      <div className="bg-white">
        <JsonLdScript data={[jsonLd, faqJsonLd, breadcrumbJsonLd]} />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-gray-900">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href={`/${lang}/checklists`} className="hover:text-gray-900">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900">{isEnglish ? 'LLC Formation' : 'LLC Kurulumu'}</span>
          </nav>

          {/* Header */}
          <header className="mb-12 pb-8 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              {isEnglish ? 'Checklist' : 'Kontrol Listesi'}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
              {isEnglish ? 'US LLC Formation' : 'ABD LLC Kurulumu'}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {isEnglish
                ? 'A structured preparation checklist for forming a Limited Liability Company in the United States. Covers pre-formation planning, required documents, and post-formation obligations.'
                : 'Amerika Birleşik Devletleri\'nde Limited Şirket kurmak için yapılandırılmış bir hazırlık listesi. Kuruluş öncesi planlama, gerekli belgeler ve kuruluş sonrası yükümlülükleri kapsar.'}
            </p>
          </header>

          <InstitutionalBadge lang={lang} jurisdictions={['US']} lastReviewedAt="2026-01-20" className="mb-8" />

          {/* Pre-Formation Checklist */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
              {isEnglish ? 'I. Pre-Formation Planning' : 'I. Kuruluş Öncesi Planlama'}
            </h2>
            <div className="space-y-1">
              {preFormationChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-4 py-3 border-b border-gray-100 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Documents Checklist */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
              {isEnglish ? 'II. Required Documents' : 'II. Gerekli Belgeler'}
            </h2>
            <div className="space-y-1">
              {documentChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-4 py-3 border-b border-gray-100 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Post-Formation Checklist */}
          <section className="mb-12">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
              {isEnglish ? 'III. Post-Formation Steps' : 'III. Kuruluş Sonrası Adımlar'}
            </h2>
            <div className="space-y-1">
              {postFormationChecklist.map((item, index) => (
                <label key={index} className="flex items-start gap-4 py-3 border-b border-gray-100 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.item}</span>
                </label>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
              {isEnglish ? 'Common Questions' : 'Sık Sorulan Sorular'}
            </h2>
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-12 pt-8 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="block py-3 group">
                <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}
                </h3>
                <p className="text-sm text-gray-500">{isEnglish ? 'Detailed reference guide' : 'Detaylı referans rehberi'}</p>
              </Link>
              <Link href={`/${lang}/ein-itin-ssn-farki`} className="block py-3 group">
                <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {isEnglish ? 'EIN, ITIN, SSN Explained' : 'EIN, ITIN, SSN Açıklaması'}
                </h3>
                <p className="text-sm text-gray-500">{isEnglish ? 'Tax identification numbers' : 'Vergi kimlik numaraları'}</p>
              </Link>
              <Link href={`/${lang}/checklists/bank-account-checklist`} className="block py-3 group">
                <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {isEnglish ? 'Bank Account Checklist' : 'Banka Hesabı Listesi'}
                </h3>
                <p className="text-sm text-gray-500">{isEnglish ? 'Opening your business account' : 'İş hesabı açma'}</p>
              </Link>
              <Link href={`/${lang}/legal-kits/business-starter`} className="block py-3 group">
                <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}
                </h3>
                <p className="text-sm text-gray-500">{isEnglish ? 'Essential document templates' : 'Temel belge şablonları'}</p>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <aside className="pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              {isEnglish
                ? 'This checklist is provided for informational and reference purposes only. It does not constitute legal, tax, or professional advice. Requirements vary by state, jurisdiction, and individual circumstances. Always verify current requirements with relevant state authorities and consult qualified professionals for guidance specific to your situation.'
                : 'Bu kontrol listesi yalnızca bilgilendirme ve referans amaçlıdır. Hukuki, vergi veya profesyonel tavsiye niteliği taşımaz. Gereksinimler eyalete, yargı alanına ve bireysel durumlara göre değişir. Güncel gereksinimleri her zaman ilgili eyalet yetkilileriyle doğrulayın ve durumunuza özel rehberlik için nitelikli profesyonellere danışın.'}
            </p>
          </aside>
        </main>
      </div>
  )
}
