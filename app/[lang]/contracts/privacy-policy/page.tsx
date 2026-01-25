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
      ? 'Privacy Policy Template | EchoLegal'
      : 'Gizlilik Politikası Şablonu | EchoLegal',
    description: isEnglish
      ? 'Professional privacy policy template. GDPR, CCPA & KVKK compliant. Explain how your website or app collects, uses, and protects user data.'
      : 'Profesyonel gizlilik politikası şablonu. GDPR, CCPA ve KVKK uyumlu. Web sitenizin veya uygulamanızın kullanıcı verilerini nasıl topladığını, kullandığını ve koruduğunu açıklayın.',
  }
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/dRm3cv9163Xp7wCdCnd7q02'
  const documentUrl = isEnglish
    ? '/documents/PrivacyPolicy-EN.docx'
    : '/documents/GizlilikPolitikasi-TR.docx'

  const content = {
    title: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
    subtitle: isEnglish
      ? 'A legally required document explaining how your website or app handles user data.'
      : 'Web sitenizin veya uygulamanızın kullanıcı verilerini nasıl işlediğini açıklayan yasal olarak zorunlu bir belge.',
    jurisdiction: isEnglish ? 'GDPR / CCPA / KVKK Compliant' : 'GDPR / CCPA / KVKK Uyumlu',
    lastUpdated: isEnglish ? 'Updated January 2026' : 'Ocak 2026 güncellemesi',
    breadcrumbs: [
      { label: isEnglish ? 'Home' : 'Ana Sayfa', href: `/${lang}` },
      { label: isEnglish ? 'Contracts' : 'Sözleşmeler', href: `/${lang}/contracts` },
      { label: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası' },
    ],
    contextText: isEnglish
      ? 'This template covers essential privacy disclosure requirements. Customize it to reflect your actual data practices.'
      : 'Bu şablon temel gizlilik açıklama gereksinimlerini kapsar. Gerçek veri uygulamalarınızı yansıtacak şekilde özelleştirin.',
    whatIsTitle: isEnglish ? 'What is a Privacy Policy?' : 'Gizlilik Politikası Nedir?',
    whatIsText: isEnglish
      ? 'A Privacy Policy is a legal document that explains how your website or app collects, uses, stores, and protects user data. It is required by law in most jurisdictions (GDPR in Europe, CCPA in California, KVKK in Turkey) for any website that collects personal information. Transparency about data practices builds user trust and ensures regulatory compliance.'
      : 'Gizlilik Politikası, web sitenizin veya uygulamanızın kullanıcı verilerini nasıl topladığını, kullandığını, sakladığını ve koruduğunu açıklayan yasal bir belgedir. Kişisel bilgi toplayan herhangi bir web sitesi için çoğu yargı bölgesinde (Avrupa\'da GDPR, California\'da CCPA, Türkiye\'de KVKK) yasalarca zorunludur. Veri uygulamaları hakkında şeffaflık, kullanıcı güvenini oluşturur ve mevzuat uyumunu sağlar.',
    whenToUseTitle: isEnglish ? 'When You Need This' : 'Ne Zaman Gerekli',
    whenToUseItems: isEnglish
      ? [
          'Any website that collects user data',
          'E-commerce stores processing payments',
          'SaaS applications with user accounts',
          'Mobile apps accessing device data',
          'Websites using cookies or analytics',
          'Email newsletter sign-ups',
        ]
      : [
          'Kullanıcı verisi toplayan herhangi bir web sitesi',
          'Ödeme işleyen e-ticaret mağazaları',
          'Kullanıcı hesapları olan SaaS uygulamaları',
          'Cihaz verilerine erişen mobil uygulamalar',
          'Çerez veya analitik kullanan web siteleri',
          'E-posta bülteni kayıtları',
        ],
    keyClausesTitle: isEnglish ? 'Key Sections' : 'Temel Bölümler',
    keyClauses: isEnglish
      ? [
          'Data Collection — What information you collect and how',
          'Data Use — How you use the collected information',
          'Data Sharing — Third parties who may access data',
          'Data Storage — Where and how long data is stored',
          'User Rights — How users can access, correct, or delete data',
          'Cookies — Cookie policy and tracking technologies',
        ]
      : [
          'Veri Toplama — Hangi bilgileri nasıl topladığınız',
          'Veri Kullanımı — Toplanan bilgileri nasıl kullandığınız',
          'Veri Paylaşımı — Verilere erişebilecek üçüncü taraflar',
          'Veri Saklama — Verilerin nerede ve ne kadar süre saklandığı',
          'Kullanıcı Hakları — Kullanıcıların verilere nasıl erişip düzeltebileceği veya silebileceği',
          'Çerezler — Çerez politikası ve izleme teknolojileri',
        ],
    complianceTitle: isEnglish ? 'Compliance Requirements' : 'Uyumluluk Gereksinimleri',
    complianceItems: isEnglish
      ? [
          'GDPR — European Union data protection regulation',
          'CCPA — California Consumer Privacy Act',
          'KVKK — Turkish Personal Data Protection Law',
          'Cookie consent banners may be required',
          'Regular policy updates as practices change',
        ]
      : [
          'GDPR — Avrupa Birliği veri koruma düzenlemesi',
          'CCPA — California Tüketici Gizlilik Yasası',
          'KVKK — Türkiye Kişisel Verilerin Korunması Kanunu',
          'Çerez onay banner\'ları gerekebilir',
          'Uygulamalar değiştikçe düzenli politika güncellemeleri',
        ],
    disclaimer: isEnglish
      ? 'This template is for informational purposes only and does not constitute legal advice. Privacy laws vary by jurisdiction and change frequently. Consult a licensed attorney before use.'
      : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Gizlilik yasaları yargı yetkisine göre değişir ve sık sık güncellenir. Kullanmadan önce lisanslı bir avukata danışın.',
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
      ? 'Commonly used alongside Privacy Policies'
      : 'Gizlilik Politikalarıyla birlikte sıkça kullanılan',
    footerDisclaimer: isEnglish
      ? 'EchoLegal provides educational legal information and templates. Nothing on this website constitutes legal advice. Prepared under the supervision of a New York licensed attorney (NY Bar #5552336).'
      : 'EchoLegal eğitici hukuki bilgiler ve şablonlar sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez. New York lisanslı avukat gözetiminde hazırlanmıştır (NY Bar #5552336).',
  }

  const relatedContracts = [
    {
      slug: 'terms-of-service',
      title: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları',
      description: isEnglish ? 'Define user agreement terms' : 'Kullanıcı sözleşmesi koşullarını tanımlayın',
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
        switchLangUrl={`/${lang === 'en' ? 'tr' : 'en'}/contracts/privacy-policy`}
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
