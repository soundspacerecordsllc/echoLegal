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
      ? 'Non-Disclosure Agreement (NDA) Template | EchoLegal'
      : 'Gizlilik Sözleşmesi (NDA) Şablonu | EchoLegal',
    description: isEnglish
      ? 'Professional NDA template in English and Turkish. Protect confidential business information in partnerships and negotiations.'
      : 'Profesyonel NDA şablonu. Ortaklıklarda ve müzakerelerde gizli iş bilgilerini koruyun.',
  }
}

export default async function NDAPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'
  const documentUrl = isEnglish
    ? '/documents/NDA-EN.docx'
    : '/documents/GizlilikSozlesmesi-TR.docx'

  const content = {
    title: isEnglish ? 'Non-Disclosure Agreement' : 'Gizlilik Sözleşmesi',
    subtitle: isEnglish
      ? 'A legally binding contract to protect confidential information shared between parties.'
      : 'Taraflar arasında paylaşılan gizli bilgileri korumak için yasal olarak bağlayıcı bir sözleşme.',
    jurisdiction: isEnglish ? 'United States / Turkey' : 'ABD / Türkiye',
    lastUpdated: isEnglish ? 'Updated January 2026' : 'Ocak 2026 güncellemesi',
    breadcrumbs: [
      { label: isEnglish ? 'Home' : 'Ana Sayfa', href: `/${lang}` },
      { label: isEnglish ? 'Contracts' : 'Sözleşmeler', href: `/${lang}/contracts` },
      { label: 'NDA' },
    ],
    contextText: isEnglish
      ? 'This template creates legal consequences for breaching confidentiality. It is not a substitute for legal advice specific to your situation.'
      : 'Bu şablon gizlilik ihlali için yasal sonuçlar oluşturur. Durumunuza özel hukuki tavsiyenin yerini tutmaz.',
    whatIsTitle: isEnglish ? 'What is an NDA?' : 'NDA Nedir?',
    whatIsText: isEnglish
      ? 'A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship between parties. The party or parties signing the agreement commit to keeping sensitive information private and not disclosing it to unauthorized third parties. NDAs protect trade secrets, business strategies, client lists, proprietary technology, and other confidential information.'
      : 'Gizlilik Sözleşmesi (NDA), taraflar arasında gizli bir ilişki kuran yasal olarak bağlayıcı bir sözleşmedir. Sözleşmeyi imzalayan taraf veya taraflar, hassas bilgileri gizli tutmayı ve yetkisiz üçüncü taraflara ifşa etmemeyi taahhüt eder. NDA\'lar ticari sırları, iş stratejilerini, müşteri listelerini, tescilli teknolojiyi ve diğer gizli bilgileri korur.',
    whenToUseTitle: isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır',
    whenToUseItems: isEnglish
      ? [
          'Sharing business plans with potential investors',
          'Hiring employees or contractors with access to sensitive data',
          'Entering business partnerships or joint ventures',
          'Discussing merger or acquisition opportunities',
          'Working with vendors who need proprietary information',
          'Licensing your technology or intellectual property',
        ]
      : [
          'Potansiyel yatırımcılarla iş planları paylaşırken',
          'Hassas verilere erişimi olan çalışanlar veya yükleniciler işe alırken',
          'İş ortaklıkları veya ortak girişimlere girerken',
          'Birleşme veya satın alma fırsatlarını görüşürken',
          'Özel bilgilere ihtiyaç duyan satıcılarla çalışırken',
          'Teknolojinizi veya fikri mülkiyetinizi lisanslarken',
        ],
    keyClausesTitle: isEnglish ? 'Key Clauses' : 'Temel Maddeler',
    keyClauses: isEnglish
      ? [
          'Definition of Confidential Information — What is protected',
          'Obligations of Receiving Party — How information must be handled',
          'Exclusions — Information not covered (public knowledge, etc.)',
          'Time Period — Duration of confidentiality obligations',
          'Return of Information — What happens when the relationship ends',
          'Remedies for Breach — Consequences of violation',
        ]
      : [
          'Gizli Bilgi Tanımı — Neyin korunduğu',
          'Alıcı Tarafın Yükümlülükleri — Bilginin nasıl işlenmesi gerektiği',
          'İstisnalar — Kapsam dışı bilgiler (kamuya açık bilgi vb.)',
          'Süre — Gizlilik yükümlülüklerinin süresi',
          'Bilgilerin İadesi — İlişki sona erdiğinde ne olacağı',
          'İhlal Çözümleri — İhlalin sonuçları',
        ],
    typesTitle: isEnglish ? 'Types of NDAs' : 'NDA Türleri',
    typesItems: isEnglish
      ? [
          'Unilateral (One-Way) — Only one party discloses information',
          'Mutual (Two-Way) — Both parties share confidential information',
          'Multilateral — Three or more parties are involved',
        ]
      : [
          'Tek Taraflı — Yalnızca bir taraf bilgi açıklar',
          'Karşılıklı (İki Taraflı) — Her iki taraf da gizli bilgi paylaşır',
          'Çok Taraflı — Üç veya daha fazla taraf dahildir',
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
      ? 'Commonly used alongside NDAs'
      : 'NDA\'larla birlikte sıkça kullanılan',
    footerDisclaimer: isEnglish
      ? 'EchoLegal provides educational legal information and templates. Nothing on this website constitutes legal advice. Prepared under the supervision of a New York licensed attorney (NY Bar #5552336).'
      : 'EchoLegal eğitici hukuki bilgiler ve şablonlar sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez. New York lisanslı avukat gözetiminde hazırlanmıştır (NY Bar #5552336).',
  }

  const relatedContracts = [
    {
      slug: 'service-agreement',
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      description: isEnglish ? 'Define service terms' : 'Hizmet koşullarını tanımlayın',
    },
    {
      slug: 'independent-contractor',
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      description: isEnglish ? 'Formalize contractor relationships' : 'Yüklenici ilişkilerini resmileştirin',
    },
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Agreement' : 'Serbest Çalışan Sözleşmesi',
      description: isEnglish ? 'For freelance engagements' : 'Serbest çalışma ilişkileri için',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <ContractPageHeader
        lang={lang}
        switchLangUrl={`/${lang === 'en' ? 'tr' : 'en'}/contracts/nda`}
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

        <ContentCard title={content.typesTitle} variant="highlight">
          <ContentList items={content.typesItems} variant="number" />
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
