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
      ? 'Service Agreement Template | EchoLegal'
      : 'Hizmet Sözleşmesi Şablonu | EchoLegal',
    description: isEnglish
      ? 'Professional service agreement template in English and Turkish. Define scope, payment terms, deliverables, and intellectual property rights.'
      : 'Profesyonel hizmet sözleşmesi şablonu. Kapsam, ödeme koşulları, teslimatlar ve fikri mülkiyet haklarını tanımlayın.',
  }
}

export default async function ServiceAgreementPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'
  const documentUrl = isEnglish
    ? '/documents/Service-Agreement-EN.docx'
    : '/documents/Service-Agreement-TR.docx'

  const content = {
    title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
    subtitle: isEnglish
      ? 'A professional contract establishing the terms between a service provider and client.'
      : 'Hizmet sağlayıcı ile müşteri arasındaki koşulları belirleyen profesyonel bir sözleşme.',
    jurisdiction: isEnglish ? 'United States / Turkey' : 'ABD / Türkiye',
    lastUpdated: isEnglish ? 'Updated January 2026' : 'Ocak 2026 güncellemesi',
    breadcrumbs: [
      { label: isEnglish ? 'Home' : 'Ana Sayfa', href: `/${lang}` },
      { label: isEnglish ? 'Contracts' : 'Sözleşmeler', href: `/${lang}/contracts` },
      { label: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi' },
    ],
    contextText: isEnglish
      ? 'This template establishes a formal service relationship. It is not a substitute for legal advice specific to your situation.'
      : 'Bu şablon resmi bir hizmet ilişkisi kurar. Durumunuza özel hukuki tavsiyenin yerini tutmaz.',
    whatIsTitle: isEnglish ? 'What is a Service Agreement?' : 'Hizmet Sözleşmesi Nedir?',
    whatIsText: isEnglish
      ? 'A Service Agreement is a legally binding contract between a service provider and a client. It defines the scope of services, compensation structure, timelines, deliverables, intellectual property rights, and termination conditions. Both parties benefit from clear expectations and documented terms.'
      : 'Hizmet Sözleşmesi, hizmet sağlayıcı ile müşteri arasında yasal olarak bağlayıcı bir sözleşmedir. Hizmet kapsamını, ücret yapısını, zaman çizelgelerini, teslimatları, fikri mülkiyet haklarını ve fesih koşullarını tanımlar. Her iki taraf da net beklentiler ve belgelenmiş koşullardan yararlanır.',
    whenToUseTitle: isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır',
    whenToUseItems: isEnglish
      ? [
          'Providing professional services to clients',
          'Hiring consultants, agencies, or specialists',
          'Establishing ongoing service relationships',
          'Defining project scope and deliverables',
          'Setting payment terms and schedules',
          'Protecting intellectual property created during engagement',
        ]
      : [
          'Müşterilere profesyonel hizmet sağlarken',
          'Danışman, ajans veya uzman işe alırken',
          'Devam eden hizmet ilişkileri kurarken',
          'Proje kapsamı ve teslimatları tanımlarken',
          'Ödeme koşulları ve takvimlerini belirlerken',
          'Çalışma sırasında oluşturulan fikri mülkiyeti korurken',
        ],
    keyClausesTitle: isEnglish ? 'Key Clauses' : 'Temel Maddeler',
    keyClauses: isEnglish
      ? [
          'Scope of Services — Detailed description of work to be performed',
          'Compensation — Payment amounts, schedule, and method',
          'Term and Termination — Duration and exit conditions',
          'Intellectual Property — Ownership of work product',
          'Confidentiality — Protection of sensitive information',
          'Limitation of Liability — Risk allocation between parties',
        ]
      : [
          'Hizmet Kapsamı — Yapılacak işin detaylı tanımı',
          'Ücretlendirme — Ödeme tutarları, takvimi ve yöntemi',
          'Süre ve Fesih — Sözleşme süresi ve çıkış koşulları',
          'Fikri Mülkiyet — İş ürününün sahipliği',
          'Gizlilik — Hassas bilgilerin korunması',
          'Sorumluluk Sınırlaması — Taraflar arasında risk dağılımı',
        ],
    notCoveredTitle: isEnglish ? 'What This Does Not Cover' : 'Neleri Kapsamaz',
    notCoveredItems: isEnglish
      ? [
          'Employment relationships (use an Employment Agreement instead)',
          'Product sales (use a Sales Agreement)',
          'Highly regulated industries without modification',
          'International transactions requiring specific compliance',
        ]
      : [
          'İstihdam ilişkileri (bunun yerine İş Sözleşmesi kullanın)',
          'Ürün satışları (Satış Sözleşmesi kullanın)',
          'Değişiklik yapılmadan yüksek düzeyde düzenlenen sektörler',
          'Özel uyumluluk gerektiren uluslararası işlemler',
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
      ? 'Commonly used alongside Service Agreements'
      : 'Hizmet Sözleşmeleriyle birlikte sıkça kullanılan',
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
        switchLangUrl={`/${lang === 'en' ? 'tr' : 'en'}/contracts/service-agreement`}
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

        <ContentCard title={content.notCoveredTitle} variant="highlight">
          <ContentList items={content.notCoveredItems} variant="bullet" />
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
