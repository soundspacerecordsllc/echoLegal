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
      ? 'Terms of Service Template | EchoLegal'
      : 'Kullanım Koşulları Şablonu | EchoLegal',
    description: isEnglish
      ? 'Professional Terms of Service template for websites and apps. Define user rules, liability limitations, and intellectual property rights.'
      : 'Web siteleri ve uygulamalar için profesyonel Kullanım Koşulları şablonu. Kullanıcı kurallarını, sorumluluk sınırlamalarını ve fikri mülkiyet haklarını tanımlayın.',
  }
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/dRm3cv9163Xp7wCdCnd7q02'
  const documentUrl = isEnglish
    ? '/documents/TermsOfService-EN.docx'
    : '/documents/KullanimKosullari-TR.docx'

  const content = {
    title: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları',
    subtitle: isEnglish
      ? 'A legal agreement establishing rules for using your website, app, or service.'
      : 'Web sitenizi, uygulamanızı veya hizmetinizi kullanma kurallarını belirleyen yasal bir anlaşma.',
    jurisdiction: isEnglish ? 'United States / Turkey' : 'ABD / Türkiye',
    lastUpdated: isEnglish ? 'Updated January 2026' : 'Ocak 2026 güncellemesi',
    breadcrumbs: [
      { label: isEnglish ? 'Home' : 'Ana Sayfa', href: `/${lang}` },
      { label: isEnglish ? 'Contracts' : 'Sözleşmeler', href: `/${lang}/contracts` },
      { label: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları' },
    ],
    contextText: isEnglish
      ? 'This template establishes user agreement terms for your digital product. Customize it to reflect your specific service and requirements.'
      : 'Bu şablon dijital ürününüz için kullanıcı sözleşmesi koşullarını oluşturur. Spesifik hizmetinizi ve gereksinimlerinizi yansıtacak şekilde özelleştirin.',
    whatIsTitle: isEnglish ? 'What are Terms of Service?' : 'Kullanım Koşulları Nedir?',
    whatIsText: isEnglish
      ? 'Terms of Service (also called Terms and Conditions or Terms of Use) is a legal agreement between you and your users that establishes the rules for using your website, app, or service. It protects your business by limiting liability, establishing user conduct rules, defining intellectual property rights, and setting dispute resolution procedures.'
      : 'Kullanım Koşulları (Hizmet Şartları veya Kullanım Şartları olarak da bilinir), web sitenizi, uygulamanızı veya hizmetinizi kullanma kurallarını belirleyen sizinle kullanıcılarınız arasındaki yasal bir anlaşmadır. Sorumluluğu sınırlayarak, kullanıcı davranış kuralları oluşturarak, fikri mülkiyet haklarını tanımlayarak ve uyuşmazlık çözüm prosedürlerini belirleyerek işletmenizi korur.',
    whenToUseTitle: isEnglish ? 'When You Need This' : 'Ne Zaman Gerekli',
    whenToUseItems: isEnglish
      ? [
          'Any website or web application',
          'SaaS products and online services',
          'E-commerce stores',
          'Mobile applications',
          'Online communities or forums',
          'Subscription-based services',
        ]
      : [
          'Herhangi bir web sitesi veya web uygulaması',
          'SaaS ürünleri ve online hizmetler',
          'E-ticaret mağazaları',
          'Mobil uygulamalar',
          'Online topluluklar veya forumlar',
          'Abonelik tabanlı hizmetler',
        ],
    keyClausesTitle: isEnglish ? 'Key Sections' : 'Temel Bölümler',
    keyClauses: isEnglish
      ? [
          'User Conduct — Rules for acceptable behavior',
          'Account Terms — Registration and account responsibilities',
          'Intellectual Property — Ownership of content and trademarks',
          'Limitation of Liability — Caps on damages and disclaimers',
          'Termination — When and how accounts can be terminated',
          'Dispute Resolution — Governing law and jurisdiction',
        ]
      : [
          'Kullanıcı Davranışı — Kabul edilebilir davranış kuralları',
          'Hesap Koşulları — Kayıt ve hesap sorumlulukları',
          'Fikri Mülkiyet — İçerik ve ticari marka sahipliği',
          'Sorumluluk Sınırlaması — Zarar üst sınırları ve sorumluluk reddi',
          'Fesih — Hesapların ne zaman ve nasıl sonlandırılabileceği',
          'Uyuşmazlık Çözümü — Geçerli hukuk ve yargı yetkisi',
        ],
    protectionTitle: isEnglish ? 'Business Protection' : 'İşletme Koruması',
    protectionItems: isEnglish
      ? [
          'Limits your liability for service issues',
          'Establishes clear user behavior expectations',
          'Protects your intellectual property',
          'Defines how disputes will be resolved',
          'Allows you to terminate problem accounts',
        ]
      : [
          'Hizmet sorunlarına ilişkin sorumluluğunuzu sınırlar',
          'Net kullanıcı davranış beklentileri oluşturur',
          'Fikri mülkiyetinizi korur',
          'Uyuşmazlıkların nasıl çözüleceğini tanımlar',
          'Sorunlu hesapları sonlandırmanıza olanak tanır',
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
    relatedTitle: isEnglish ? 'Related Documents' : 'İlgili Belgeler',
    relatedSubtitle: isEnglish
      ? 'Commonly used alongside Terms of Service'
      : 'Kullanım Koşullarıyla birlikte sıkça kullanılan',
    footerDisclaimer: isEnglish
      ? 'EchoLegal provides educational legal information and templates. Nothing on this website constitutes legal advice. Prepared under the supervision of a New York licensed attorney (NY Bar #5552336).'
      : 'EchoLegal eğitici hukuki bilgiler ve şablonlar sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez. New York lisanslı avukat gözetiminde hazırlanmıştır (NY Bar #5552336).',
  }

  const relatedContracts = [
    {
      slug: 'privacy-policy',
      title: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
      description: isEnglish ? 'Explain data collection practices' : 'Veri toplama uygulamalarını açıklayın',
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
        switchLangUrl={`/${lang === 'en' ? 'tr' : 'en'}/contracts/terms-of-service`}
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

        <ContentCard title={content.protectionTitle} variant="highlight">
          <ContentList items={content.protectionItems} variant="check" />
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
