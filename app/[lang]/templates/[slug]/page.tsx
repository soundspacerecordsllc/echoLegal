// app/[lang]/templates/[slug]/page.tsx
// Dynamic template detail page

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Locale } from '@/i18n-config'
import { TemplatesList } from '@/components/TemplatesGrid'
import {
  getTemplateBySlug,
  getRelatedTemplates,
  categoryLabels,
  docTypeLabels,
  jurisdictionLabels,
  templatesRegistry,
  Template,
} from '@/lib/templates-registry'

// Generate static params for all templates
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  const slugsSet = new Set<string>()

  templatesRegistry.forEach((t) => {
    slugsSet.add(t.slug)
  })

  const slugs = Array.from(slugsSet)

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    params.push({ lang: 'en', slug })
    params.push({ lang: 'tr', slug })
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const template = getTemplateBySlug(slug, lang)
  const isEnglish = lang === 'en'

  if (!template) {
    return {
      title: isEnglish ? 'Template Not Found' : 'Şablon Bulunamadı',
    }
  }

  return {
    title: `${template.title} | EchoLegal`,
    description: template.shortDescription,
    alternates: {
      canonical: `https://echo-legal.com/${lang}/templates/${slug}`,
      languages: {
        en: `https://echo-legal.com/en/templates/${slug}`,
        tr: `https://echo-legal.com/tr/templates/${slug}`,
      },
    },
    openGraph: {
      title: template.title,
      description: template.shortDescription,
      type: 'article',
      url: `https://echo-legal.com/${lang}/templates/${slug}`,
    },
  }
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const isEnglish = lang === 'en'

  const template = getTemplateBySlug(slug, lang)

  if (!template) {
    notFound()
  }

  const relatedTemplates = getRelatedTemplates(template, 4)

  // Check if this template has a corresponding contract page (legacy)
  const hasContractPage = [
    'nda',
    'service-agreement',
    'independent-contractor',
    'privacy-policy',
    'terms-of-service',
    'freelance-agreement',
    'influencer-agreement',
  ].includes(slug)

  // Template content placeholders (to be expanded)
  const templateContent = getTemplateContent(template, isEnglish)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: template.title,
    description: template.shortDescription,
    url: `https://echo-legal.com/${lang}/templates/${slug}`,
    dateModified: template.updatedAt,
    inLanguage: lang === 'en' ? 'en-US' : 'tr-TR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    breadcrumb: {
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
          name: isEnglish ? 'Templates' : 'Şablonlar',
          item: `https://echo-legal.com/${lang}/templates`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: template.title,
          item: `https://echo-legal.com/${lang}/templates/${slug}`,
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">
            {isEnglish ? 'Home' : 'Ana Sayfa'}
          </Link>
          {' → '}
          <Link href={`/${lang}/templates`} className="hover:text-black">
            {isEnglish ? 'Templates' : 'Şablonlar'}
          </Link>
          {' → '}
          <span className="text-black font-medium">{template.title}</span>
        </nav>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {categoryLabels[template.category][lang]}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {docTypeLabels[template.docType][lang]}
          </span>
          {template.jurisdiction !== 'General' && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              📍 {jurisdictionLabels[template.jurisdiction][lang]}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          {template.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6">{template.shortDescription}</p>

        {/* Last updated */}
        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last Updated:' : 'Son Güncelleme:'} {template.updatedAt}
        </p>

        {/* Download Section */}
        {(template.downloadUrl || hasContractPage) ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-xl font-semibold text-center mb-2">
              {isEnglish ? 'Download This Template' : 'Bu Şablonu İndirin'}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              {isEnglish
                ? 'Pay what you can — $49 recommended to support ongoing updates.'
                : 'Gücünüz yettiğince katkıda bulunun — sürekli güncellemeler için $49 önerilir.'}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                <a
                  href="https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03"
                  className="block w-full bg-gray-900 text-white text-center py-3.5 px-4 text-sm font-semibold rounded hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                >
                  {isEnglish
                    ? 'Support EchoLegal — $49'
                    : "EchoLegal'i Destekle — $49"}
                </a>
                <p className="text-center text-xs text-gray-500 mt-3 leading-relaxed">
                  {isEnglish
                    ? 'Helps maintain bilingual access and updates.'
                    : 'İki dilli erişimi ve güncellemeleri sürdürmeye yardımcı olur.'}
                </p>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg bg-white">
                <a
                  href={template.downloadUrl || `/${lang}/contracts/${slug}`}
                  {...(template.downloadUrl ? { download: true } : {})}
                  className="block w-full bg-white text-gray-900 text-center py-3.5 px-4 text-sm font-semibold border border-gray-300 rounded hover:border-gray-500 hover:bg-gray-50 transition-all"
                >
                  {isEnglish
                    ? 'Download Free'
                    : 'Ücretsiz İndir'}
                </a>
                <p className="text-center text-xs text-gray-500 mt-3 leading-relaxed">
                  {isEnglish
                    ? 'No payment required. Always free to access.'
                    : 'Ödeme gerekmez. Erişim her zaman ücretsizdir.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-xl font-semibold text-center mb-3">
              {isEnglish ? 'Template Coming Soon' : 'Şablon Yakında'}
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              {isEnglish
                ? 'This downloadable template is being prepared. Check back soon or contact us for updates.'
                : 'Bu indirilebilir şablon hazırlanıyor. Yakında tekrar kontrol edin veya güncellemeler için bize ulaşın.'}
            </p>
            <a
              href={`/${lang}/support`}
              className="block w-full max-w-xs mx-auto bg-gray-900 text-white text-center py-3 rounded font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              {isEnglish ? 'Contact for Updates' : 'Güncellemeler İçin İletişime Geçin'}
            </a>
          </div>
        )}

        {/* Template content */}
        <div className="prose prose-gray max-w-none mb-12">
          {templateContent.whatIsIt && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                {isEnglish ? 'What is This?' : 'Bu Nedir?'}
              </h2>
              <p className="text-gray-600">{templateContent.whatIsIt}</p>
            </section>
          )}

          {templateContent.whenToUse && templateContent.whenToUse.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                {isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır'}
              </h2>
              <ul className="space-y-2">
                {templateContent.whenToUse.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {templateContent.keyElements && templateContent.keyElements.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                {isEnglish ? 'Key Elements' : 'Temel Unsurlar'}
              </h2>
              <ul className="space-y-2">
                {templateContent.keyElements.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-2">
            ⚖️ {isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}
          </h3>
          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'This template is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before use in actual legal matters.'
              : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Gerçek hukuki konularda kullanmadan önce lisanslı bir avukata danışın.'}
          </p>
        </div>

        {/* Tags */}
        {template.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {isEnglish ? 'Tags' : 'Etiketler'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Templates */}
        {relatedTemplates.length > 0 && (
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-black mb-4">
              {isEnglish ? 'Related Templates' : 'İlgili Şablonlar'}
            </h2>
            <TemplatesList templates={relatedTemplates} lang={lang} />
          </section>
        )}
      </div>
    </>
  )
}

// Helper function to get template content
function getTemplateContent(
  template: Template,
  isEnglish: boolean
): {
  whatIsIt?: string
  whenToUse?: string[]
  keyElements?: string[]
} {
  // Default content based on doc type
  const contentByDocType: Record<
    string,
    { en: { whatIsIt: string; whenToUse: string[]; keyElements: string[] }; tr: { whatIsIt: string; whenToUse: string[]; keyElements: string[] } }
  > = {
    contract: {
      en: {
        whatIsIt:
          'A contract is a legally binding agreement between two or more parties that creates mutual obligations enforceable by law.',
        whenToUse: [
          'Entering business relationships',
          'Defining scope of work',
          'Establishing payment terms',
          'Protecting intellectual property',
        ],
        keyElements: [
          'Parties involved',
          'Scope of agreement',
          'Terms and conditions',
          'Payment terms',
          'Termination clauses',
          'Dispute resolution',
        ],
      },
      tr: {
        whatIsIt:
          'Sözleşme, iki veya daha fazla taraf arasında hukuk tarafından uygulanabilir karşılıklı yükümlülükler yaratan yasal olarak bağlayıcı bir anlaşmadır.',
        whenToUse: [
          'İş ilişkilerine girerken',
          'Çalışma kapsamını tanımlarken',
          'Ödeme koşullarını belirlerken',
          'Fikri mülkiyeti korurken',
        ],
        keyElements: [
          'İlgili taraflar',
          'Anlaşma kapsamı',
          'Şartlar ve koşullar',
          'Ödeme koşulları',
          'Fesih maddeleri',
          'Uyuşmazlık çözümü',
        ],
      },
    },
    letter: {
      en: {
        whatIsIt:
          'A formal letter template for professional correspondence in legal, business, or official contexts.',
        whenToUse: [
          'Official communications',
          'Formal requests',
          'Notifications and notices',
          'Professional correspondence',
        ],
        keyElements: [
          'Proper heading and date',
          'Recipient information',
          'Clear subject line',
          'Professional body text',
          'Appropriate closing',
        ],
      },
      tr: {
        whatIsIt:
          'Hukuki, iş veya resmi bağlamlarda profesyonel yazışmalar için resmi mektup şablonu.',
        whenToUse: [
          'Resmi iletişimler',
          'Resmi talepler',
          'Bildirimler ve ihtarlar',
          'Profesyonel yazışmalar',
        ],
        keyElements: [
          'Uygun başlık ve tarih',
          'Alıcı bilgileri',
          'Net konu satırı',
          'Profesyonel içerik',
          'Uygun kapanış',
        ],
      },
    },
    checklist: {
      en: {
        whatIsIt:
          'A structured checklist to help ensure you complete all required steps or gather all necessary documents.',
        whenToUse: [
          'Preparing applications',
          'Gathering required documents',
          'Following multi-step processes',
          'Ensuring compliance',
        ],
        keyElements: [
          'Clear action items',
          'Required documents list',
          'Deadline reminders',
          'Status tracking',
        ],
      },
      tr: {
        whatIsIt:
          'Gerekli tüm adımları tamamlamanızı veya gerekli tüm belgeleri toplamanızı sağlamak için yapılandırılmış kontrol listesi.',
        whenToUse: [
          'Başvuruları hazırlarken',
          'Gerekli belgeleri toplarken',
          'Çok adımlı süreçleri takip ederken',
          'Uyumluluğu sağlarken',
        ],
        keyElements: [
          'Net eylem maddeleri',
          'Gerekli belgeler listesi',
          'Son tarih hatırlatıcıları',
          'Durum takibi',
        ],
      },
    },
    template: {
      en: {
        whatIsIt:
          'A pre-formatted document template that you can customize for your specific needs.',
        whenToUse: [
          'Starting with a professional format',
          'Ensuring consistency',
          'Saving time on formatting',
          'Following best practices',
        ],
        keyElements: [
          'Standard formatting',
          'Placeholder text',
          'Customizable sections',
          'Instructions for use',
        ],
      },
      tr: {
        whatIsIt:
          'Özel ihtiyaçlarınız için özelleştirebileceğiniz önceden biçimlendirilmiş belge şablonu.',
        whenToUse: [
          'Profesyonel bir formatla başlarken',
          'Tutarlılık sağlarken',
          'Biçimlendirmede zaman kazanırken',
          'En iyi uygulamaları takip ederken',
        ],
        keyElements: [
          'Standart biçimlendirme',
          'Yer tutucu metin',
          'Özelleştirilebilir bölümler',
          'Kullanım talimatları',
        ],
      },
    },
    guide: {
      en: {
        whatIsIt:
          'An educational guide explaining key concepts, requirements, and best practices.',
        whenToUse: [
          'Learning about a topic',
          'Understanding requirements',
          'Planning your approach',
          'Making informed decisions',
        ],
        keyElements: [
          'Clear explanations',
          'Step-by-step guidance',
          'Practical examples',
          'Best practices',
        ],
      },
      tr: {
        whatIsIt:
          'Temel kavramları, gereksinimleri ve en iyi uygulamaları açıklayan eğitici rehber.',
        whenToUse: [
          'Bir konu hakkında öğrenirken',
          'Gereksinimleri anlarken',
          'Yaklaşımınızı planlarken',
          'Bilinçli kararlar verirken',
        ],
        keyElements: [
          'Net açıklamalar',
          'Adım adım rehberlik',
          'Pratik örnekler',
          'En iyi uygulamalar',
        ],
      },
    },
    sample: {
      en: {
        whatIsIt:
          'A sample or example document showing the format and content of a specific document type.',
        whenToUse: [
          'Understanding document format',
          'Seeing real examples',
          'Learning what to include',
          'Reference for your own documents',
        ],
        keyElements: [
          'Realistic example',
          'Proper formatting',
          'All required sections',
          'Annotations or notes',
        ],
      },
      tr: {
        whatIsIt:
          'Belirli bir belge türünün formatını ve içeriğini gösteren örnek belge.',
        whenToUse: [
          'Belge formatını anlarken',
          'Gerçek örnekleri görürken',
          'Nelerin dahil edilmesi gerektiğini öğrenirken',
          'Kendi belgeleriniz için referans',
        ],
        keyElements: [
          'Gerçekçi örnek',
          'Uygun biçimlendirme',
          'Tüm gerekli bölümler',
          'Ek açıklamalar veya notlar',
        ],
      },
    },
    form: {
      en: {
        whatIsIt: 'A form template with fields to fill in for specific purposes.',
        whenToUse: [
          'Collecting information',
          'Standardizing data entry',
          'Ensuring completeness',
          'Official submissions',
        ],
        keyElements: [
          'Clear field labels',
          'Logical organization',
          'Required vs optional fields',
          'Instructions',
        ],
      },
      tr: {
        whatIsIt: 'Belirli amaçlar için doldurulacak alanları olan form şablonu.',
        whenToUse: [
          'Bilgi toplarken',
          'Veri girişini standartlaştırırken',
          'Eksiksizliği sağlarken',
          'Resmi başvurular',
        ],
        keyElements: [
          'Net alan etiketleri',
          'Mantıksal organizasyon',
          'Zorunlu ve isteğe bağlı alanlar',
          'Talimatlar',
        ],
      },
    },
    petition: {
      en: {
        whatIsIt: 'A formal petition or request document for official purposes.',
        whenToUse: [
          'Making official requests',
          'Formal applications',
          'Legal proceedings',
          'Government submissions',
        ],
        keyElements: [
          'Proper addressing',
          'Clear request statement',
          'Supporting details',
          'Required signatures',
        ],
      },
      tr: {
        whatIsIt: 'Resmi amaçlar için resmi dilekçe veya talep belgesi.',
        whenToUse: [
          'Resmi talepler yaparken',
          'Resmi başvurular',
          'Hukuki süreçler',
          'Devlet başvuruları',
        ],
        keyElements: [
          'Uygun hitap',
          'Net talep ifadesi',
          'Destekleyici detaylar',
          'Gerekli imzalar',
        ],
      },
    },
  }

  const content = contentByDocType[template.docType]
  if (!content) {
    return {}
  }

  const langContent = isEnglish ? content.en : content.tr
  return {
    whatIsIt: langContent.whatIsIt,
    whenToUse: langContent.whenToUse,
    keyElements: langContent.keyElements,
  }
}
