import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import {
  ContractHero,
  ContractPageHeader,
  ContractPageFooter,
  ContextCard,
  ContentCard,
  ContentList,
  DownloadSection,
  RelatedResources,
  LegalDisclaimer,
} from '@/components/contracts'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Independent Contractor Agreement Template | EchoLegal'
      : 'Bağımsız Yüklenici Sözleşmesi Şablonu | EchoLegal',
    description: isEnglish
      ? 'Professional independent contractor agreement in English and Turkish. Avoid misclassification issues and define clear contractor terms.'
      : 'Profesyonel bağımsız yüklenici sözleşmesi. Yanlış sınıflandırma sorunlarından kaçının ve net yüklenici koşulları belirleyin.',
  }
}

export default async function IndependentContractorPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'
  const documentUrl = isEnglish
    ? '/documents/IndependentContractorAgreement-EN.docx'
    : '/documents/BagimsizYukleniciSozlesmesi-TR.docx'

  const content = {
    title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
    subtitle: isEnglish
      ? 'A formal contract establishing the relationship between a business and an independent contractor.'
      : 'Bir işletme ile bağımsız yüklenici arasındaki ilişkiyi kuran resmi bir sözleşme.',
    jurisdiction: isEnglish ? 'United States / Turkey' : 'ABD / Türkiye',
    lastUpdated: isEnglish ? 'Updated January 2026' : 'Ocak 2026 güncellemesi',
    breadcrumbs: [
      { label: isEnglish ? 'Home' : 'Ana Sayfa', href: `/${lang}` },
      { label: isEnglish ? 'Contracts' : 'Sözleşmeler', href: `/${lang}/contracts` },
      { label: isEnglish ? 'Independent Contractor' : 'Bağımsız Yüklenici' },
    ],
    contextText: isEnglish
      ? 'This template clarifies that the contractor is not an employee. It is not a substitute for legal advice specific to your situation.'
      : 'Bu şablon yüklenicinin çalışan olmadığını açıklar. Durumunuza özel hukuki tavsiyenin yerini tutmaz.',
    whatIsTitle: isEnglish ? 'What is an Independent Contractor Agreement?' : 'Bağımsız Yüklenici Sözleşmesi Nedir?',
    whatIsText: isEnglish
      ? 'An Independent Contractor Agreement establishes a formal relationship between a business and a contractor. It clarifies that the contractor is not an employee, defines the scope of work, payment terms, intellectual property rights, and helps protect both parties from misclassification issues. Proper documentation is essential for tax and legal compliance.'
      : 'Bağımsız Yüklenici Sözleşmesi, bir işletme ile yüklenici arasında resmi bir ilişki kurar. Yüklenicinin çalışan olmadığını açıklar, iş kapsamını, ödeme koşullarını, fikri mülkiyet haklarını tanımlar ve her iki tarafı da yanlış sınıflandırma sorunlarından korur. Doğru belgeleme, vergi ve hukuki uyumluluk için gereklidir.',
    whenToUseTitle: isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır',
    whenToUseItems: isEnglish
      ? [
          'Hiring contractors or consultants',
          'Outsourcing specific projects',
          'Engaging freelancers for ongoing work',
          'Protecting against IRS/tax misclassification',
          'Defining intellectual property ownership',
          'Establishing clear payment terms',
        ]
      : [
          'Yüklenici veya danışman işe alırken',
          'Belirli projeleri dışarıya verirken',
          'Devam eden işler için serbest çalışanlarla çalışırken',
          'SGK/vergi yanlış sınıflandırmasına karşı koruma',
          'Fikri mülkiyet sahipliğini tanımlarken',
          'Net ödeme koşulları belirlerken',
        ],
    keyClausesTitle: isEnglish ? 'Key Clauses' : 'Temel Maddeler',
    keyClauses: isEnglish
      ? [
          'Scope of Work — Detailed description of services',
          'Compensation — Payment structure and schedule',
          'Independent Contractor Status — Not an employee',
          'Intellectual Property — Ownership of work product',
          'Confidentiality — Protection of business information',
          'Termination — How the relationship can end',
        ]
      : [
          'İş Kapsamı — Hizmetlerin detaylı tanımı',
          'Ücretlendirme — Ödeme yapısı ve takvimi',
          'Bağımsız Yüklenici Statüsü — Çalışan değil',
          'Fikri Mülkiyet — İş ürününün sahipliği',
          'Gizlilik — İş bilgilerinin korunması',
          'Fesih — İlişkinin nasıl sona erebileceği',
        ],
    misclassificationTitle: isEnglish ? 'Avoiding Misclassification' : 'Yanlış Sınıflandırmadan Kaçınma',
    misclassificationItems: isEnglish
      ? [
          'Contractor controls how and when work is performed',
          'Contractor provides own tools and equipment',
          'Contractor can work for other clients',
          'Relationship is project-based, not ongoing employment',
          'Contractor invoices for services rendered',
        ]
      : [
          'Yüklenici işin nasıl ve ne zaman yapılacağını kontrol eder',
          'Yüklenici kendi araç ve ekipmanını sağlar',
          'Yüklenici diğer müşteriler için çalışabilir',
          'İlişki proje bazlıdır, sürekli istihdam değil',
          'Yüklenici verilen hizmetler için fatura keser',
        ],
    disclaimer: isEnglish
      ? 'This template is for informational purposes only and does not constitute legal advice. Laws vary by jurisdiction. Consult a licensed attorney before use.'
      : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Yasalar yargı yetkisine göre değişir. Kullanmadan önce lisanslı bir avukata danışın.',
    downloadTitle: isEnglish ? 'Download Template' : 'Şablonu İndirin',
    downloadSubtitle: isEnglish
      ? 'Pay what you can. $20 recommended.'
      : 'Gücünüz kadar ödeyin. 20$ önerilir.',
    paidLabel: isEnglish ? 'Support EchoLegal — $20' : 'EchoLegal\'i Destekle — $20',
    freeLabel: isEnglish ? 'Download Free' : 'Ücretsiz İndir',
    supportText: isEnglish
      ? 'Your support helps maintain free access and ongoing updates.'
      : 'Desteğiniz ücretsiz erişimi ve sürekli güncellemeleri sağlamaya yardımcı olur.',
    relatedTitle: isEnglish ? 'Related Contracts' : 'İlgili Sözleşmeler',
    relatedSubtitle: isEnglish
      ? 'Commonly used with contractor agreements'
      : 'Yüklenici sözleşmeleriyle birlikte sıkça kullanılan',
    footerDisclaimer: isEnglish
      ? 'EchoLegal provides educational legal information and templates. Nothing on this website constitutes legal advice. Prepared under the supervision of a New York licensed attorney (NY Bar #5552336).'
      : 'EchoLegal eğitici hukuki bilgiler ve şablonlar sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez. New York lisanslı avukat gözetiminde hazırlanmıştır (NY Bar #5552336).',
  }

  const relatedContracts = [
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      description: isEnglish ? 'Protect confidential information' : 'Gizli bilgileri koruyun',
    },
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Agreement' : 'Serbest Çalışan Sözleşmesi',
      description: isEnglish ? 'For freelance engagements' : 'Serbest çalışma ilişkileri için',
    },
    {
      slug: 'service-agreement',
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      description: isEnglish ? 'Define service terms' : 'Hizmet koşullarını tanımlayın',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <ContractPageHeader
        lang={lang}
        switchLangUrl={`/${lang === 'en' ? 'tr' : 'en'}/contracts/independent-contractor`}
      />

      <ContractHero
        lang={lang}
        title={content.title}
        subtitle={content.subtitle}
        jurisdiction={content.jurisdiction}
        lastUpdated={content.lastUpdated}
        breadcrumbs={content.breadcrumbs}
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <ContextCard>
          {content.contextText}
        </ContextCard>

        <ContentCard title={content.whatIsTitle}>
          <p className="text-base leading-7">
            {content.whatIsText}
          </p>
        </ContentCard>

        <ContentCard title={content.whenToUseTitle}>
          <ContentList items={content.whenToUseItems} variant="check" />
        </ContentCard>

        <ContentCard title={content.keyClausesTitle}>
          <ContentList items={content.keyClauses} variant="bullet" />
        </ContentCard>

        <ContentCard title={content.misclassificationTitle} variant="highlight">
          <ContentList items={content.misclassificationItems} variant="check" />
        </ContentCard>

        <LegalDisclaimer text={content.disclaimer} />

        <DownloadSection
          lang={lang}
          title={content.downloadTitle}
          subtitle={content.downloadSubtitle}
          paidLabel={content.paidLabel}
          freeLabel={content.freeLabel}
          supportText={content.supportText}
          stripeLink={stripePaymentLink}
          documentUrl={documentUrl}
        />

        <RelatedResources
          lang={lang}
          title={content.relatedTitle}
          subtitle={content.relatedSubtitle}
          resources={relatedContracts}
        />
      </main>

      <ContractPageFooter disclaimerText={content.footerDisclaimer} />
    </div>
  )
}
