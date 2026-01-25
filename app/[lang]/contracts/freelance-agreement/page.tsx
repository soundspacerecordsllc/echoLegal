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
      ? 'Freelance Service Agreement Template | EchoLegal'
      : 'Serbest Çalışan Hizmet Sözleşmesi Şablonu | EchoLegal',
    description: isEnglish
      ? 'Professional freelance agreement template in English and Turkish. Define project terms, deliverables, payment schedules, and intellectual property rights.'
      : 'Profesyonel serbest çalışan sözleşmesi şablonu. Proje şartlarını, teslimatları, ödeme takvimlerini ve fikri mülkiyet haklarını tanımlayın.',
  }
}

export default async function FreelanceAgreementPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'
  const documentUrl = isEnglish
    ? '/documents/FreelanceServiceAgreement-Modern-EN.docx'
    : '/documents/SerbestCalisanHizmetSozlesmesi-Modern-TR.docx'

  const content = {
    title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
    subtitle: isEnglish
      ? 'A professional contract between a freelancer and client outlining project terms, deliverables, and payment.'
      : 'Serbest çalışan ile müşteri arasında proje şartlarını, teslimatları ve ödemeyi belirleyen profesyonel bir sözleşme.',
    jurisdiction: isEnglish ? 'United States / Turkey' : 'ABD / Türkiye',
    lastUpdated: isEnglish ? 'Updated January 2026' : 'Ocak 2026 güncellemesi',
    breadcrumbs: [
      { label: isEnglish ? 'Home' : 'Ana Sayfa', href: `/${lang}` },
      { label: isEnglish ? 'Contracts' : 'Sözleşmeler', href: `/${lang}/contracts` },
      { label: isEnglish ? 'Freelance Agreement' : 'Serbest Çalışan Sözleşmesi' },
    ],
    contextText: isEnglish
      ? 'This template helps establish clear expectations for freelance engagements. It is not a substitute for legal advice specific to your situation.'
      : 'Bu şablon serbest çalışma ilişkileri için net beklentiler oluşturmaya yardımcı olur. Durumunuza özel hukuki tavsiyenin yerini tutmaz.',
    whatIsTitle: isEnglish ? 'What is a Freelance Service Agreement?' : 'Serbest Çalışan Hizmet Sözleşmesi Nedir?',
    whatIsText: isEnglish
      ? 'A Freelance Service Agreement is a legally binding contract between a freelancer and a client that outlines project terms, deliverables, payment schedules, intellectual property rights, and termination conditions. It protects both parties by setting clear expectations and documenting the working relationship.'
      : 'Serbest Çalışan Hizmet Sözleşmesi, bir serbest çalışan ile müşteri arasında proje şartlarını, teslimatları, ödeme takvimlerini, fikri mülkiyet haklarını ve fesih koşullarını belirleyen yasal olarak bağlayıcı bir sözleşmedir. Net beklentiler oluşturarak ve çalışma ilişkisini belgeleyerek her iki tarafı da korur.',
    whenToUseTitle: isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır',
    whenToUseItems: isEnglish
      ? [
          'Starting a new freelance project',
          'Defining scope of work and deliverables',
          'Establishing payment terms and milestones',
          'Protecting intellectual property rights',
          'Setting revision limits and approval processes',
          'Clarifying timeline and deadlines',
        ]
      : [
          'Yeni bir serbest çalışma projesi başlatırken',
          'İş kapsamını ve teslimatları tanımlarken',
          'Ödeme koşullarını ve aşamalarını belirlerken',
          'Fikri mülkiyet haklarını korurken',
          'Revizyon limitlerini ve onay süreçlerini belirlerken',
          'Zaman çizelgesi ve teslim tarihlerini netleştirirken',
        ],
    keyClausesTitle: isEnglish ? 'Key Clauses' : 'Temel Maddeler',
    keyClauses: isEnglish
      ? [
          'Scope of Work — Detailed description of services and deliverables',
          'Compensation — Payment structure, schedule, and method',
          'Timeline — Project milestones and deadlines',
          'Revisions — Number of revisions included and additional costs',
          'Intellectual Property — Ownership of work product upon payment',
          'Termination — Conditions and notice period for ending the agreement',
        ]
      : [
          'İş Kapsamı — Hizmetlerin ve teslimatların detaylı tanımı',
          'Ücretlendirme — Ödeme yapısı, takvimi ve yöntemi',
          'Zaman Çizelgesi — Proje aşamaları ve teslim tarihleri',
          'Revizyonlar — Dahil olan revizyon sayısı ve ek maliyetler',
          'Fikri Mülkiyet — Ödeme sonrası iş ürününün sahipliği',
          'Fesih — Sözleşmeyi sonlandırma koşulları ve bildirim süresi',
        ],
    bestPracticesTitle: isEnglish ? 'Best Practices' : 'En İyi Uygulamalar',
    bestPracticesItems: isEnglish
      ? [
          'Be specific about deliverables and deadlines',
          'Define payment terms and late fees clearly',
          'Require a deposit before starting work',
          'Document all changes to scope in writing',
          'Keep communication professional and documented',
        ]
      : [
          'Teslimatlar ve teslim tarihleri hakkında net olun',
          'Ödeme koşullarını ve gecikme ücretlerini açıkça tanımlayın',
          'İşe başlamadan önce depozito talep edin',
          'Kapsam değişikliklerini yazılı olarak belgeleyin',
          'İletişimi profesyonel ve belgelenmiş tutun',
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
      ? 'Commonly used alongside freelance agreements'
      : 'Serbest çalışan sözleşmeleriyle birlikte sıkça kullanılan',
    footerDisclaimer: isEnglish
      ? 'EchoLegal provides educational legal information and templates. Nothing on this website constitutes legal advice. Prepared under the supervision of a New York licensed attorney (NY Bar #5552336).'
      : 'EchoLegal eğitici hukuki bilgiler ve şablonlar sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez. New York lisanslı avukat gözetiminde hazırlanmıştır (NY Bar #5552336).',
  }

  const relatedContracts = [
    {
      slug: 'independent-contractor',
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      description: isEnglish ? 'Formalize contractor relationships' : 'Yüklenici ilişkilerini resmileştirin',
    },
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      description: isEnglish ? 'Protect confidential information' : 'Gizli bilgileri koruyun',
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
        switchLangUrl={`/${lang === 'en' ? 'tr' : 'en'}/contracts/freelance-agreement`}
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

        <ContentCard title={content.bestPracticesTitle} variant="highlight">
          <ContentList items={content.bestPracticesItems} variant="check" />
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
