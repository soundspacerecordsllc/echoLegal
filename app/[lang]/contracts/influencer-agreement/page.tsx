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
      ? 'Influencer Agreement Template | EchoLegal'
      : 'Influencer Sözleşmesi Şablonu | EchoLegal',
    description: isEnglish
      ? 'Professional influencer/brand collaboration agreement template. FTC compliant. Define deliverables, compensation, content rights, and exclusivity terms.'
      : 'Profesyonel influencer/marka işbirliği sözleşmesi şablonu. Teslimatları, ücreti, içerik haklarını ve münhasırlık koşullarını tanımlayın.',
  }
}

export default async function InfluencerAgreementPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'
  const documentUrl = isEnglish
    ? '/documents/InfluencerAgreement-Modern-EN.docx'
    : '/documents/InfluencerSozlesmesi-Modern-TR.docx'

  const content = {
    title: isEnglish ? 'Influencer / Brand Collaboration Agreement' : 'Influencer / Marka İşbirliği Sözleşmesi',
    subtitle: isEnglish
      ? 'A professional contract between content creators and brands for sponsored collaborations.'
      : 'İçerik üreticileri ile markalar arasında sponsorlu işbirlikleri için profesyonel bir sözleşme.',
    jurisdiction: isEnglish ? 'United States / Turkey' : 'ABD / Türkiye',
    lastUpdated: isEnglish ? 'Updated January 2026' : 'Ocak 2026 güncellemesi',
    breadcrumbs: [
      { label: isEnglish ? 'Home' : 'Ana Sayfa', href: `/${lang}` },
      { label: isEnglish ? 'Contracts' : 'Sözleşmeler', href: `/${lang}/contracts` },
      { label: isEnglish ? 'Influencer Agreement' : 'Influencer Sözleşmesi' },
    ],
    contextText: isEnglish
      ? 'This template covers essential terms for influencer-brand partnerships. It is not a substitute for legal advice specific to your situation.'
      : 'Bu şablon influencer-marka ortaklıkları için temel koşulları kapsar. Durumunuza özel hukuki tavsiyenin yerini tutmaz.',
    whatIsTitle: isEnglish ? 'What is an Influencer Agreement?' : 'Influencer Sözleşmesi Nedir?',
    whatIsText: isEnglish
      ? 'An Influencer Agreement is a contract between a content creator and a brand that outlines the terms of a sponsored collaboration. It covers deliverables, compensation, content rights, FTC/advertising disclosure requirements, exclusivity periods, and approval processes. Both parties benefit from clear documentation of expectations.'
      : 'Influencer Sözleşmesi, bir içerik üreticisi ile marka arasında sponsorlu işbirliğinin şartlarını belirleyen bir sözleşmedir. Teslimatları, ücreti, içerik haklarını, reklam beyanı gereksinimlerini, münhasırlık dönemlerini ve onay süreçlerini kapsar. Her iki taraf da beklentilerin net belgelenmesinden yararlanır.',
    whenToUseTitle: isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır',
    whenToUseItems: isEnglish
      ? [
          'Brand partnership or sponsorship deals',
          'Paid social media collaborations',
          'Product reviews or unboxing content',
          'Affiliate marketing arrangements',
          'Ambassador or long-term partnerships',
          'Content licensing agreements',
        ]
      : [
          'Marka ortaklığı veya sponsorluk anlaşmaları',
          'Ücretli sosyal medya işbirlikleri',
          'Ürün incelemeleri veya kutu açılışı içerikleri',
          'Affiliate pazarlama düzenlemeleri',
          'Elçilik veya uzun vadeli ortaklıklar',
          'İçerik lisanslama anlaşmaları',
        ],
    keyClausesTitle: isEnglish ? 'Key Clauses' : 'Temel Maddeler',
    keyClauses: isEnglish
      ? [
          'Deliverables — Specific content requirements, platforms, and formats',
          'Compensation — Payment structure, schedule, and bonuses',
          'Content Rights — Usage rights, licensing, and duration',
          'Exclusivity — Competitor restrictions and time periods',
          'FTC Disclosure — Compliance with advertising regulations',
          'Approval Process — Content review and revision procedures',
        ]
      : [
          'Teslimatlar — Spesifik içerik gereksinimleri, platformlar ve formatlar',
          'Ücretlendirme — Ödeme yapısı, takvimi ve bonuslar',
          'İçerik Hakları — Kullanım hakları, lisanslama ve süre',
          'Münhasırlık — Rakip kısıtlamaları ve zaman dilimleri',
          'Reklam Beyanı — Reklam düzenlemelerine uyumluluk',
          'Onay Süreci — İçerik inceleme ve revizyon prosedürleri',
        ],
    complianceTitle: isEnglish ? 'Disclosure Requirements' : 'Beyan Gereksinimleri',
    complianceItems: isEnglish
      ? [
          'FTC requires clear disclosure of paid partnerships',
          'Use #ad or #sponsored in visible locations',
          'Disclosure must be in same language as content',
          'Turkey requires compliance with advertising regulations',
          'Platform-specific disclosure tools should be used',
        ]
      : [
          'FTC ücretli ortaklıkların net beyanını gerektirir',
          '#reklam veya #sponsorlu etiketlerini görünür yerlerde kullanın',
          'Beyan içerikle aynı dilde olmalıdır',
          'Türkiye reklam düzenlemelerine uyumu gerektirir',
          'Platforma özgü beyan araçları kullanılmalıdır',
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
      ? 'Commonly used with influencer agreements'
      : 'Influencer sözleşmeleriyle birlikte sıkça kullanılan',
    footerDisclaimer: isEnglish
      ? 'EchoLegal provides educational legal information and templates. Nothing on this website constitutes legal advice. Prepared under the supervision of a New York licensed attorney (NY Bar #5552336).'
      : 'EchoLegal eğitici hukuki bilgiler ve şablonlar sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez. New York lisanslı avukat gözetiminde hazırlanmıştır (NY Bar #5552336).',
  }

  const relatedContracts = [
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
      description: isEnglish ? 'For freelance engagements' : 'Serbest çalışma ilişkileri için',
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
        switchLangUrl={`/${lang === 'en' ? 'tr' : 'en'}/contracts/influencer-agreement`}
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

        <ContentCard title={content.complianceTitle} variant="highlight">
          <ContentList items={content.complianceItems} variant="check" />
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
