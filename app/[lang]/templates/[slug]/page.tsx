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

          {/* Slug-specific additional sections */}
          {templateContent.sections?.map((section, i) => (
            <section key={i} className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">{section.title}</h2>
              {section.type === 'prose' && (
                typeof section.content === 'string'
                  ? <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  : (section.content as string[]).map((p, j) => <p key={j} className="text-gray-600 leading-relaxed mb-3">{p}</p>)
              )}
              {section.type === 'bullets' && Array.isArray(section.content) && (
                <ul className="space-y-2">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start">
                      <span className="text-[#C9A227] mr-2 mt-0.5">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.type === 'numbered' && Array.isArray(section.content) && (
                <ol className="space-y-3">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start">
                      <span className="font-semibold text-gray-400 mr-3 min-w-[1.5rem]">{j + 1}.</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.type === 'callout' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                  {typeof section.content === 'string'
                    ? <p className="text-amber-900 text-sm leading-relaxed">{section.content}</p>
                    : (section.content as string[]).map((p, j) => <p key={j} className="text-amber-900 text-sm leading-relaxed mb-2 last:mb-0">{p}</p>)}
                </div>
              )}
            </section>
          ))}
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

// Section type for rich per-template content
interface TemplateSection {
  title: string
  type: 'prose' | 'bullets' | 'numbered' | 'callout'
  content: string | string[]
}

// Helper function to get template content
function getTemplateContent(
  template: Template,
  isEnglish: boolean
): {
  whatIsIt?: string
  whenToUse?: string[]
  keyElements?: string[]
  sections?: TemplateSection[]
} {
  // Check for slug-specific rich content first
  const slugContent = getSlugSpecificContent(template.slug, isEnglish)
  if (slugContent) {
    return slugContent
  }

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

// Slug-specific rich content overrides
function getSlugSpecificContent(
  slug: string,
  isEnglish: boolean
): {
  whatIsIt?: string
  whenToUse?: string[]
  keyElements?: string[]
  sections?: TemplateSection[]
} | null {
  const overrides: Record<string, {
    en: { whatIsIt: string; whenToUse: string[]; keyElements: string[]; sections: TemplateSection[] }
    tr: { whatIsIt: string; whenToUse: string[]; keyElements: string[]; sections: TemplateSection[] }
  }> = {
    'cease-desist-outline': {
      en: {
        whatIsIt: 'A cease and desist letter is a formal written notice demanding that a person or entity stop a specific activity that infringes on your legal rights. While not a lawsuit itself, it serves as an official record that you identified the violation, communicated your objection, and gave the offending party an opportunity to comply before you pursue legal action. In US legal practice, sending a cease and desist letter is often a prerequisite to litigation — courts in many jurisdictions look favorably on parties who attempted to resolve disputes before filing suit.',
        whenToUse: [
          'Someone is using your trademark, brand name, or logo without authorization',
          'Your copyrighted content (text, images, software, music) is being reproduced or distributed without permission',
          'A former employee or business partner is violating a non-disclosure or non-compete agreement',
          'Another business is engaging in unfair competition or misappropriating trade secrets',
          'Someone is making false or defamatory statements about you or your business',
          'A party is breaching a contract and you want to demand compliance before escalating',
          'Your patented invention or process is being used without a license',
          'A domain name is being used in a way that infringes on your trademark (cybersquatting)',
        ],
        keyElements: [
          'Sender identification — Full legal name, address, and capacity (individual, company, or attorney on behalf of client)',
          'Recipient identification — Full legal name and address of the party engaging in the unauthorized activity',
          'Factual description — Detailed, objective account of the infringing activity: what is being done, when it started, where it is occurring',
          'Legal basis — The specific rights being violated with statutory citations (e.g., Lanham Act 15 U.S.C. \u00A7 1051, Copyright Act 17 U.S.C. \u00A7 101)',
          'Specific demands — Exactly what actions the recipient must take (stop activity, remove materials, provide accounting of profits, etc.)',
          'Compliance deadline — A reasonable but firm timeframe (typically 10\u201330 days)',
          'Consequences of non-compliance — Statement that legal action will follow if demands are not met',
          'Reservation of rights — Explicit statement that all rights and remedies are preserved',
        ],
        sections: [
          {
            title: 'Types of Cease and Desist Letters',
            type: 'bullets',
            content: [
              'Trademark infringement — Unauthorized use of a registered or common-law trademark, trade name, or confusingly similar mark. Governed by the Lanham Act (15 U.S.C. \u00A7 1051 et seq.) at the federal level and state unfair competition statutes.',
              'Copyright infringement — Unauthorized reproduction, distribution, display, or creation of derivative works. Governed by the Copyright Act (17 U.S.C. \u00A7 101 et seq.). The DMCA takedown notice (17 U.S.C. \u00A7 512) is a related but distinct mechanism for online content.',
              'Patent infringement — Unauthorized making, using, selling, or importing of a patented invention. Governed by 35 U.S.C. \u00A7 271. Patent C&D letters require particular care, as overly aggressive assertions can trigger declaratory judgment actions.',
              'Breach of contract — Violation of contractual obligations such as non-disclosure agreements (NDAs), non-compete clauses, licensing agreements, or service contracts.',
              'Defamation and disparagement — False statements of fact that harm reputation (defamation) or economic interests (trade disparagement). Standards vary significantly by state.',
              'Trade secret misappropriation — Unauthorized acquisition, disclosure, or use of trade secrets. Governed by the Defend Trade Secrets Act (18 U.S.C. \u00A7 1836) at the federal level and state versions of the Uniform Trade Secrets Act.',
              'Harassment and stalking — Demands to stop unwanted contact, intimidation, or surveillance. Often involves state-specific anti-harassment statutes.',
            ],
          },
          {
            title: 'Legal Framework',
            type: 'prose',
            content: [
              'Cease and desist letters operate at the intersection of multiple legal domains. There is no single federal "cease and desist letter statute" — instead, the letter derives its authority from the underlying substantive law being invoked. The letter itself is not a court order and carries no independent legal force; its power lies in documenting your claim and creating a record of notice.',
              'At the federal level, the Lanham Act governs trademark claims, the Copyright Act governs copyright claims, and the Defend Trade Secrets Act covers trade secret misappropriation. State laws add additional layers: unfair business practices statutes (such as California Business & Professions Code \u00A7 17200), state trademark registration acts, and consumer protection laws.',
              'In some contexts, sending a cease and desist letter is more than a courtesy — it is a legal necessity. For example, to recover statutory damages for willful copyright infringement, you may need to demonstrate that the infringer had actual notice. Similarly, some state consumer protection claims require a pre-suit demand letter. Trademark holders also have a duty to police their marks; failure to act against known infringers can weaken trademark rights over time.',
            ],
          },
          {
            title: 'How to Draft a Cease and Desist Letter',
            type: 'numbered',
            content: [
              'Investigate and document the violation. Before writing anything, gather evidence: screenshots, URLs, photographs, purchase records, correspondence, dates, and witness information. Thorough documentation strengthens your position and prevents the recipient from claiming ignorance.',
              'Identify your legal basis. Determine which law or contract provision is being violated. Be specific — cite the statute section, patent number, trademark registration number, or contract clause. Vague or overbroad legal claims undermine credibility.',
              'Draft the factual background. Write a clear, chronological account of the infringing activity. Stick to objective facts. Avoid emotional language, threats beyond what is legally available, or exaggerations that could be used against you.',
              'State your demands clearly. List exactly what you want the recipient to do: stop the activity, remove materials, provide an accounting, pay damages, confirm compliance in writing. Each demand should be specific and actionable.',
              'Set a reasonable deadline. Give the recipient enough time to review the letter with their own counsel and take the required action — typically 10 to 30 days. Unreasonably short deadlines may be seen as bad faith.',
              'Explain the consequences. State that you will pursue legal remedies if the demands are not met, but avoid language that could be construed as extortion or harassment. Stick to remedies actually available under the applicable law.',
              'Include a reservation of rights. Add a standard clause stating that you are not waiving any rights or remedies by sending the letter, and that all rights are expressly reserved.',
              'Have an attorney review the letter. Even if you draft the letter yourself, having a licensed attorney review it before sending ensures legal accuracy and may carry additional weight with the recipient.',
            ],
          },
          {
            title: 'Delivery and Service',
            type: 'prose',
            content: [
              'How you deliver the letter matters. The most common and recommended method is certified mail with return receipt requested (USPS), which provides proof that the letter was sent and received. For urgent matters, overnight delivery services (FedEx, UPS) with signature confirmation are also effective.',
              'Email delivery is increasingly accepted but should be used as a supplement to, not a replacement for, physical mail. If you send by email, use a method that confirms delivery (read receipts, tracking). Some practitioners send the letter by both email and certified mail simultaneously.',
              'If the recipient is outside the United States, international delivery introduces additional complexity. The Hague Convention on the Service Abroad of Judicial and Extrajudicial Documents may apply to pre-litigation communications in some contexts. For a simple cease and desist letter (as opposed to formal legal process), international courier services with tracking are generally sufficient.',
            ],
          },
          {
            title: 'After Sending: Possible Outcomes',
            type: 'bullets',
            content: [
              'Compliance — The recipient stops the activity, removes the infringing material, or otherwise meets your demands. This is the ideal outcome. Request written confirmation of compliance.',
              'Negotiation — The recipient responds with a counter-proposal, such as a licensing agreement, partial compliance, or a request for more time. Many disputes are resolved through negotiation following a C&D letter.',
              'No response — If the recipient ignores the letter, this strengthens your position in subsequent litigation, as you can demonstrate they had actual notice of your claims and chose not to act.',
              'Denial or dispute — The recipient may deny infringement, challenge your rights, or assert their own defenses (fair use, first sale, prior use, etc.). This may lead to further negotiation or litigation.',
              'Declaratory judgment action — In some cases, particularly patent disputes, the recipient may preemptively file a declaratory judgment action asking a court to rule that they are not infringing. This is a strategic risk to be aware of.',
              'Counter-claims — The recipient may assert their own claims against you, such as tortious interference, abuse of process, or antitrust violations if your letter is deemed anticompetitive.',
            ],
          },
          {
            title: 'Common Mistakes to Avoid',
            type: 'bullets',
            content: [
              'Sending the letter without sufficient evidence. A C&D letter based on suspicion rather than documented facts undermines your credibility and may expose you to counter-claims.',
              'Using overly aggressive or threatening language. Courts and opposing counsel view inflammatory language as a sign of weak claims. Professional, measured tone is far more effective.',
              'Making legal claims you cannot support. Asserting rights you do not actually have (e.g., claiming trademark rights in a generic term, or copyright in an idea) damages your credibility and may constitute fraud.',
              'Setting unreasonable deadlines. Giving 24 hours to comply with complex demands signals bad faith. Allow a reasonable period for the recipient to consult counsel.',
              'Failing to follow through. Sending a C&D letter and then taking no action when demands are ignored signals that your claims are not serious. Only send the letter if you are prepared to escalate.',
              'Sending the letter to the wrong party. Ensure you have correctly identified the person or entity responsible for the infringing activity. Misdirected letters waste time and may alert the actual infringer.',
              'Omitting the reservation of rights clause. Without this language, a court could potentially interpret your letter as limiting the scope of your claims.',
              'Not keeping copies and proof of delivery. Always retain a copy of the letter and proof of delivery (certified mail receipt, tracking confirmation). These are essential evidence in any subsequent proceeding.',
            ],
          },
          {
            title: 'Cross-Border Considerations: US and Turkey',
            type: 'prose',
            content: [
              'When the infringing party is in Turkey (or the infringement occurs across both jurisdictions), additional considerations arise. Turkish law recognizes the concept of a formal notice (ihtar/ihbarname), which serves a similar function to a US cease and desist letter. Under Turkish law, a notarized notice (noterden ihtar) sent through a notary public carries particular legal weight and creates an official record.',
              'Intellectual property rights are territorial — a US trademark registration does not automatically protect your mark in Turkey, and vice versa. If you need protection in both jurisdictions, you must register in both. Turkey is a member of the Madrid Protocol, which provides a streamlined process for international trademark registration. Copyright protection, by contrast, arises automatically under both US and Turkish law (both countries are Berne Convention signatories), though registration in the US is required to file an infringement suit.',
              'Enforcement of a US cease and desist letter in Turkey (or a Turkish ihtar in the US) has no direct legal mechanism — the letter serves as notice, but any enforcement action must be pursued in the appropriate jurisdiction under that jurisdiction\'s laws. In cross-border disputes, it is common to send parallel notices in both countries, each citing the applicable local law.',
            ],
          },
          {
            title: 'Cease and Desist Letter vs. Filing a Lawsuit',
            type: 'callout',
            content: [
              'A cease and desist letter is not a substitute for legal action — it is a precursor to it. The letter is faster, cheaper, and less adversarial than litigation. Many disputes are resolved at the letter stage, saving both parties the cost and time of court proceedings.',
              'However, in some situations, going directly to court is more appropriate: if the infringement is causing irreparable harm that requires an emergency injunction, if the statute of limitations is about to expire, if the infringer has already demonstrated they will not comply voluntarily, or if you need the discovery process to identify the full scope of the infringement.',
              'The decision between sending a letter first versus filing suit immediately should be made with the advice of a licensed attorney who can assess the specific circumstances of your case.',
            ],
          },
        ],
      },
      tr: {
        whatIsIt: 'İhlali durdurma mektubu (cease and desist letter), bir kişi veya kuruluştan, yasal haklarınızı ihlal eden belirli bir faaliyeti durdurmasını talep eden resmi yazılı bildirimdir. Kendi başına bir dava olmamakla birlikte, ihlali tespit ettiğinize, itirazınızı ilettiğinize ve ihlal eden tarafa hukuki işlem başlatmadan önce uyum fırsatı tanıdığınıza dair resmi bir kayıt işlevi görür. ABD hukuk pratiğinde, ihlali durdurma mektubu göndermek genellikle dava açmanın ön koşuludur — birçok yargı bölgesinde mahkemeler, dava açmadan önce uyuşmazlığı çözmeye çalışan taraflara olumlu bakar.',
        whenToUse: [
          'Birisi ticari markanızı, marka adınızı veya logonuzu izinsiz kullanıyorsa',
          'Telif hakkıyla korunan içeriğiniz (metin, görsel, yazılım, müzik) izinsiz çoğaltılıyor veya dağıtılıyorsa',
          'Eski bir çalışan veya iş ortağı gizlilik veya rekabet yasağı sözleşmesini ihlal ediyorsa',
          'Başka bir işletme haksız rekabet yapıyor veya ticari sırlarınızı kötüye kullanıyorsa',
          'Birisi sizin veya işletmeniz hakkında yanlış veya karalayıcı beyanlarda bulunuyorsa',
          'Bir taraf sözleşmeyi ihlal ediyor ve tırmandırmadan önce uyum talep etmek istiyorsanız',
          'Patentli buluşunuz veya süreciniz lisanssız kullanılıyorsa',
          'Bir alan adı, ticari markanızı ihlal edecek şekilde kullanılıyorsa (cybersquatting)',
        ],
        keyElements: [
          'Gönderen kimliği — Tam yasal ad, adres ve sıfat (birey, şirket veya müvekkil adına avukat)',
          'Muhatap kimliği — Yetkisiz faaliyette bulunan tarafın tam yasal adı ve adresi',
          'Olgusal açıklama — İhlal faaliyetinin ayrıntılı, nesnel anlatımı: ne yapılıyor, ne zaman başladı, nerede gerçekleşiyor',
          'Hukuki dayanak — İhlal edilen hakların yasal dayanağı ve mevzuat referansları (ör. Lanham Act 15 U.S.C. \u00A7 1051, Copyright Act 17 U.S.C. \u00A7 101)',
          'Belirli talepler — Muhatabın yapması gereken işlemler (faaliyeti durdurma, materyalleri kaldırma, kazanç hesabı verme vb.)',
          'Uyum süresi — Makul ancak kesin bir süre (genellikle 10\u201330 gün)',
          'Uyumsuzluğun sonuçları — Talepler karşılanmazsa hukuki işlem başlatılacağı beyanı',
          'Hakların saklı tutulması — Tüm hak ve başvuru yollarının açıkça saklı tutulduğu ifade',
        ],
        sections: [
          {
            title: 'İhlali Durdurma Mektubu Türleri',
            type: 'bullets',
            content: [
              'Marka ihlali — Tescilli veya kullanıma dayalı bir ticari markanın, ticaret unvanının veya karıştırılabilecek derecede benzer bir işaretin izinsiz kullanımı. Federal düzeyde Lanham Act (15 U.S.C. \u00A7 1051 vd.) ve eyalet haksız rekabet mevzuatı kapsamındadır.',
              'Telif hakkı ihlali — İzinsiz çoğaltma, dağıtım, sergileme veya türev eser oluşturma. Copyright Act (17 U.S.C. \u00A7 101 vd.) kapsamındadır. DMCA kaldırma bildirimi (17 U.S.C. \u00A7 512) çevrimiçi içerik için ilgili ancak ayrı bir mekanizmadır.',
              'Patent ihlali — Patentli bir buluşun izinsiz üretimi, kullanımı, satışı veya ithalatı. 35 U.S.C. \u00A7 271 kapsamındadır. Patent C&D mektupları özel dikkat gerektirir; aşırı agresif iddialar hükümsüzlük davası açılmasına yol açabilir.',
              'Sözleşme ihlali — Gizlilik sözleşmesi (NDA), rekabet yasağı, lisans sözleşmesi veya hizmet sözleşmesi gibi sözleşme yükümlülüklerinin ihlali.',
              'Karalama ve itibar zedeleme — İtibara (defamation) veya ekonomik çıkarlara (trade disparagement) zarar veren yanlış olgusal beyanlar. Standartlar eyalete göre önemli ölçüde farklılık gösterir.',
              'Ticari sır kötüye kullanımı — Ticari sırların izinsiz elde edilmesi, ifşa edilmesi veya kullanılması. Federal düzeyde Defend Trade Secrets Act (18 U.S.C. \u00A7 1836) ve eyalet düzeyinde Uniform Trade Secrets Act versiyonları kapsamındadır.',
              'Taciz ve takip — İstenmeyen iletişim, yıldırma veya gözetimin durdurulması talebi. Genellikle eyalete özgü taciz karşıtı mevzuatı içerir.',
            ],
          },
          {
            title: 'Hukuki Çerçeve',
            type: 'prose',
            content: [
              'İhlali durdurma mektupları birden fazla hukuk alanının kesişiminde yer alır. Federal düzeyde tek bir "ihlali durdurma mektubu yasası" bulunmaz — mektup, otoritesini dayandığı maddi hukuktan alır. Mektubun kendisi bir mahkeme emri değildir ve bağımsız bir hukuki güce sahip değildir; gücü, talebinizi belgelemesi ve bildirim kaydı oluşturmasından gelir.',
              'Federal düzeyde Lanham Act marka taleplerini, Copyright Act telif hakkı taleplerini ve Defend Trade Secrets Act ticari sır kötüye kullanımını düzenler. Eyalet yasaları ek katmanlar ekler: haksız iş uygulamaları mevzuatı (California Business & Professions Code \u00A7 17200 gibi), eyalet marka tescil kanunları ve tüketici koruma mevzuatı.',
              'Bazı bağlamlarda ihlali durdurma mektubu göndermek bir nezaket kuralından öte, hukuki bir gerekliliktir. Örneğin, kasıtlı telif hakkı ihlali için yasal tazminat talep edebilmek için ihlalin gerçek bildirimden haberdar olduğunu kanıtlamanız gerekebilir. Benzer şekilde, bazı eyalet tüketici koruma talepleri dava öncesi talep mektubu gerektirir. Marka sahiplerinin de markalarını koruma yükümlülüğü vardır; bilinen ihlallere karşı hareketsiz kalmak, zaman içinde marka haklarını zayıflatabilir.',
            ],
          },
          {
            title: 'İhlali Durdurma Mektubu Nasıl Hazırlanır',
            type: 'numbered',
            content: [
              'İhlali araştırın ve belgeleyin. Yazmaya başlamadan önce kanıt toplayın: ekran görüntüleri, URL\'ler, fotoğraflar, satın alma kayıtları, yazışmalar, tarihler ve tanık bilgileri. Kapsamlı belgeleme pozisyonunuzu güçlendirir ve muhatabın bilgisizlik iddiasını engeller.',
              'Hukuki dayananığınızı belirleyin. Hangi yasa veya sözleşme hükmünün ihlal edildiğini tespit edin. Spesifik olun — yasa maddesi, patent numarası, marka tescil numarası veya sözleşme maddesi belirtin. Belirsiz veya aşırı geniş hukuki iddialar güvenilirliği zedeler.',
              'Olgusal arka planı yazın. İhlal faaliyetinin açık, kronolojik bir anlatımını hazırlayın. Nesnel olgulara bağlı kalın. Duygusal dil, yasal olarak mevcut olanın ötesinde tehditler veya aleyhinize kullanılabilecek abartılardan kaçının.',
              'Taleplerinizi açıkça ifade edin. Muhatabın ne yapmasını istediğinizi tam olarak listeleyin: faaliyeti durdurma, materyalleri kaldırma, hesap verme, tazminat ödeme, yazılı olarak uyum teyidi. Her talep spesifik ve uygulanabilir olmalıdır.',
              'Makul bir süre belirleyin. Muhataba mektubu kendi avukatıyla incelemesi ve gerekli işlemi yapması için yeterli zaman tanıyın — genellikle 10 ila 30 gün. Makul olmayan kısa süreler kötü niyet göstergesi olarak değerlendirilebilir.',
              'Sonuçları açıklayın. Talepler karşılanmazsa hukuki yollara başvuracağınızı belirtin, ancak şantaj veya taciz olarak yorumlanabilecek ifadelerden kaçının. Yalnızca uygulanabilir hukuk kapsamında gerçekten mevcut olan çarelere atıfta bulunun.',
              'Hakların saklı tutulması maddesini ekleyin. Mektup göndererek herhangi bir hak veya başvuru yolundan feragat etmediğinizi ve tüm hakların açıkça saklı tutulduğunu belirten standart bir madde ekleyin.',
              'Mektubu bir avukata inceletin. Mektubu kendiniz hazırlasanız bile, göndermeden önce lisanslı bir avukata incelettirmek hem hukuki doğruluğu sağlar hem de muhatap nezdinde ek ağırlık taşıyabilir.',
            ],
          },
          {
            title: 'Teslim ve Tebliğ',
            type: 'prose',
            content: [
              'Mektubu nasıl teslim ettiğiniz önemlidir. En yaygın ve önerilen yöntem, iadeli taahhütlü posta (USPS certified mail with return receipt) ile göndermektir; bu yöntem mektubun gönderildiğine ve teslim alındığına dair kanıt sağlar. Acil durumlar için imza onaylı kargo hizmetleri (FedEx, UPS) de etkilidir.',
              'E-posta ile teslim giderek daha kabul görmektedir, ancak fiziksel postanın yerini almamalı, onu tamamlamalıdır. E-posta ile gönderirseniz, teslimi doğrulayan bir yöntem kullanın (okundu bilgisi, takip). Bazı hukukçular mektubu hem e-posta hem de iadeli taahhütlü posta ile eş zamanlı gönderir.',
              'Muhatap ABD dışındaysa, uluslararası teslim ek karmaşıklık getirir. Lahey Sözleşmesi bazı bağlamlarda dava öncesi iletişimlere uygulanabilir. Basit bir ihlali durdurma mektubu için (resmi hukuki süreçten farklı olarak) takipli uluslararası kargo hizmetleri genellikle yeterlidir.',
            ],
          },
          {
            title: 'Gönderdikten Sonra: Olası Sonuçlar',
            type: 'bullets',
            content: [
              'Uyum — Muhatap faaliyeti durdurur, ihlal eden materyali kaldırır veya taleplerinizi karşılar. Bu ideal sonuçtur. Yazılı uyum teyidi isteyin.',
              'Müzakere — Muhatap bir karşı teklifle yanıt verir: lisans sözleşmesi, kısmi uyum veya ek süre talebi gibi. Birçok uyuşmazlık, C&D mektubunun ardından müzakere yoluyla çözülür.',
              'Yanıtsızlık — Muhatap mektubu görmezden gelirse, bu durum sonraki davada pozisyonunuzu güçlendirir; taleplerinizden haberdar olduklarını ve hareketsiz kalmayı tercih ettiklerini kanıtlayabilirsiniz.',
              'Reddetme veya itiraz — Muhatap ihlali reddedebilir, haklarınıza itiraz edebilir veya kendi savunmalarını öne sürebilir (adil kullanım, ilk satış, öncelik hakkı vb.). Bu durum ileri müzakereye veya davaya yol açabilir.',
              'Tespit davası — Bazı durumlarda, özellikle patent uyuşmazlıklarında, muhatap ihlal etmediğinin tespiti için önceden dava açabilir (declaratory judgment). Bu, farkında olunması gereken stratejik bir risktir.',
              'Karşı talepler — Muhatap, mektubunuzun haksız müdahale (tortious interference), sürecin kötüye kullanımı veya rekabet karşıtı olduğu gerekçesiyle kendi taleplerini öne sürebilir.',
            ],
          },
          {
            title: 'Kaçınılması Gereken Yaygın Hatalar',
            type: 'bullets',
            content: [
              'Yeterli kanıt olmadan mektup göndermek. Belgelenmiş olgular yerine şüpheye dayanan bir C&D mektubu güvenilirliğinizi zedeler ve karşı taleplere maruz kalmanıza yol açabilir.',
              'Aşırı agresif veya tehditkâr dil kullanmak. Mahkemeler ve karşı taraf avukatları kışkırtıcı dili zayıf iddiaların işareti olarak değerlendirir. Profesyonel ve ölçülü ton çok daha etkilidir.',
              'Destekleyemeyeceğiniz hukuki iddialar öne sürmek. Gerçekte sahip olmadığınız hakları iddia etmek (ör. jenerik bir terimde marka hakkı veya bir fikir üzerinde telif hakkı) güvenilirliğinize zarar verir.',
              'Makul olmayan süreler belirlemek. Karmaşık taleplere 24 saat uyum süresi vermek kötü niyet göstergesidir. Muhatabın avukatına danışması için makul süre tanıyın.',
              'Takip etmemek. C&D mektubu gönderip talepler görmezden gelindiğinde hareketsiz kalmak, iddialarınızın ciddi olmadığını gösterir. Mektubu yalnızca tırmandırmaya hazırsanız gönderin.',
              'Mektubu yanlış tarafa göndermek. İhlal faaliyetinden sorumlu kişi veya kuruluşu doğru tespit ettiğinizden emin olun. Yanlış yönlendirilmiş mektuplar zaman kaybettirir.',
              'Hakların saklı tutulması maddesini atlmak. Bu ifade olmadan, mahkeme mektubunuzu taleplerinizin kapsamını sınırlayan bir belge olarak yorumlayabilir.',
              'Kopya ve teslim kanıtı saklamamak. Mektubun bir kopyasını ve teslim kanıtını (iadeli taahhütlü makbuzu, kargo takip onayı) daima saklayın. Bunlar sonraki işlemlerde temel kanıt niteliğindedir.',
            ],
          },
          {
            title: 'Sınır Ötesi Hususlar: ABD ve Türkiye',
            type: 'prose',
            content: [
              'İhlal eden taraf Türkiye\'deyse (veya ihlal her iki yargı bölgesinde gerçekleşiyorsa) ek hususlar gündeme gelir. Türk hukuku, ABD\'deki ihlali durdurma mektubuna benzer işlev gören resmi bildirim (ihtar/ihbarname) kavramını tanır. Türk hukukunda noter aracılığıyla gönderilen ihtar (noterden ihtar), özel hukuki ağırlık taşır ve resmi kayıt oluşturur.',
              'Fikri mülkiyet hakları ülkeseldir — ABD marka tescili Türkiye\'de otomatik koruma sağlamaz ve bunun tersi de geçerlidir. Her iki yargı bölgesinde de korumaya ihtiyacınız varsa, her ikisinde de tescil yaptırmanız gerekir. Türkiye Madrid Protokolü üyesidir ve bu protokol uluslararası marka tescili için basitleştirilmiş bir süreç sunar. Telif hakkı koruması ise hem ABD hem Türk hukukunda otomatik olarak doğar (her iki ülke de Bern Sözleşmesi imzacısıdır), ancak ABD\'de ihlal davası açmak için tescil gereklidir.',
              'ABD\'deki bir ihlali durdurma mektubunun Türkiye\'de (veya Türk ihtarının ABD\'de) doğrudan icra mekanizması yoktur — mektup bildirim işlevi görür, ancak herhangi bir icra işlemi ilgili yargı bölgesinde o yargı bölgesinin hukuku kapsamında yürütülmelidir. Sınır ötesi uyuşmazlıklarda, her biri yerel mevzuata atıfta bulunan paralel bildirimler göndermek yaygın bir uygulamadır.',
            ],
          },
          {
            title: 'İhlali Durdurma Mektubu mu, Dava mı?',
            type: 'callout',
            content: [
              'İhlali durdurma mektubu hukuki işlemin yerini almaz — öncüsüdür. Mektup, davadan daha hızlı, daha ucuz ve daha az çatışmacıdır. Birçok uyuşmazlık mektup aşamasında çözülür ve her iki tarafa da mahkeme süreçlerinin maliyetini ve zamanını kazandırır.',
              'Ancak bazı durumlarda doğrudan dava açmak daha uygundur: ihlal acil tedbir gerektiren telafisi güç bir zarara yol açıyorsa, zamanaşımı süresi dolmak üzereyse, ihlal edenin gönüllü olarak uymayacağı zaten belli ise veya ihlalin tam kapsamını tespit etmek için keşif sürecine ihtiyaç duyuyorsanız.',
              'Önce mektup göndermek ile doğrudan dava açmak arasındaki karar, davanızın özel koşullarını değerlendirebilecek lisanslı bir avukatın tavsiyesiyle verilmelidir.',
            ],
          },
        ],
      },
    },

    'demand-letter': {
      en: {
        whatIsIt: 'A demand letter is a formal written communication sent to a person or entity requiring them to fulfill a legal obligation — typically the payment of a debt, performance of a contractual duty, or compensation for damages. It is one of the most commonly used pre-litigation tools in US legal practice. A well-drafted demand letter often resolves disputes without the need for court intervention, saving both parties significant time and expense.',
        whenToUse: [
          'A client or customer owes you money for goods or services delivered',
          'A business partner has failed to perform their contractual obligations',
          'You have suffered damages due to another party\'s negligence or breach',
          'An insurance company has denied or underpaid a valid claim',
          'A landlord has failed to return a security deposit',
          'You need to formally notify a debtor before filing a collections lawsuit',
          'A contractor has performed defective work and refuses to remedy it',
        ],
        keyElements: [
          'Statement of facts — Clear, chronological account of the events giving rise to the demand',
          'Legal basis — The contract provision, statute, or legal theory supporting your claim',
          'Specific demand — The exact amount owed or action required, with supporting calculations',
          'Compliance deadline — A reasonable timeframe (typically 15\u201330 days)',
          'Consequences — Statement that legal action will follow if the demand is not met',
          'Supporting documentation — References to contracts, invoices, receipts, or other evidence',
          'Reservation of rights — Statement preserving all legal claims and remedies',
        ],
        sections: [
          {
            title: 'Legal Significance',
            type: 'prose',
            content: [
              'In many US jurisdictions, sending a demand letter is a practical or legal prerequisite to filing a lawsuit. Some state consumer protection statutes (such as Massachusetts G.L. c. 93A) require a written demand at least 30 days before filing suit. Even where not legally required, courts routinely consider whether the plaintiff attempted to resolve the matter before litigation — failure to do so may affect the recovery of attorney\'s fees or punitive damages.',
              'A demand letter also starts or preserves important legal timelines. It can serve as evidence of the date you put the other party on notice, which is relevant to calculating interest, establishing willfulness, and meeting notice requirements under various statutes.',
            ],
          },
          {
            title: 'Best Practices',
            type: 'numbered',
            content: [
              'Be precise about the amount. Include a detailed breakdown of how you calculated the amount owed — principal, interest, late fees, damages, and any offsets. Vague demands for unspecified sums undermine credibility.',
              'Attach supporting evidence. Include copies (not originals) of relevant contracts, invoices, correspondence, photos, or other documentation that supports your claim.',
              'Maintain a professional tone. Emotional or threatening language weakens your position. State the facts, the law, and the consequences clearly and dispassionately.',
              'Offer a resolution path. Where appropriate, indicate willingness to negotiate a payment plan or alternative resolution. This demonstrates good faith and may accelerate settlement.',
              'Send by traceable method. Use certified mail with return receipt requested, or a commercial delivery service with tracking. Keep copies of everything.',
            ],
          },
        ],
      },
      tr: {
        whatIsIt: 'İhtar mektubu, bir kişi veya kuruluşa yasal bir yükümlülüğü yerine getirmesini — genellikle bir borcun ödenmesini, sözleşmesel bir görevin ifasını veya zararların tazmini — talep eden resmi yazılı bir bildirimdir. ABD hukuk pratiğinde en yaygın kullanılan dava öncesi araçlardan biridir. İyi hazırlanmış bir ihtar mektubu, çoğu zaman mahkemeye gerek kalmadan uyuşmazlıkları çözer ve her iki tarafa da önemli zaman ve masraf tasarrufu sağlar.',
        whenToUse: [
          'Bir müşteri, teslim edilen mal veya hizmetler karşılığında size borçluysa',
          'Bir iş ortağı sözleşme yükümlülüklerini yerine getirmediyse',
          'Karşı tarafın ihmali veya ihlali nedeniyle zarara uğradıysanız',
          'Bir sigorta şirketi geçerli bir talebi reddetti veya eksik ödeme yaptıysa',
          'Bir ev sahibi güvence bedelini iade etmediyse',
          'Tahsilat davası açmadan önce borçluyu resmi olarak bilgilendirmeniz gerekiyorsa',
          'Bir yüklenici kusurlu iş yaptı ve düzeltmeyi reddediyorsa',
        ],
        keyElements: [
          'Olgu beyanı — Talebe yol açan olayların açık, kronolojik anlatımı',
          'Hukuki dayanak — Talebinizi destekleyen sözleşme hükmü, yasa maddesi veya hukuk teorisi',
          'Belirli talep — Borçlu olunan tam tutar veya gerekli işlem, destekleyici hesaplamalarla',
          'Uyum süresi — Makul bir zaman dilimi (genellikle 15\u201330 gün)',
          'Sonuçlar — Talep karşılanmazsa hukuki işlem başlatılacağı beyanı',
          'Destekleyici belgeler — Sözleşme, fatura, makbuz veya diğer kanıtlara atıflar',
          'Hakların saklı tutulması — Tüm hukuki talep ve başvuru yollarının korunması beyanı',
        ],
        sections: [
          {
            title: 'Hukuki Önemi',
            type: 'prose',
            content: [
              'Birçok ABD yargı bölgesinde ihtar mektubu göndermek, dava açmanın pratik veya yasal ön koşuludur. Bazı eyalet tüketici koruma yasaları (Massachusetts G.L. c. 93A gibi) dava açmadan en az 30 gün önce yazılı ihtar gönderilmesini gerektirir. Yasal olarak gerekli olmadığı durumlarda bile, mahkemeler davacının dava öncesinde sorunu çözmeye çalışıp çalışmadığını rutin olarak değerlendirir — bunu yapmamak avukatlık ücretleri veya cezai tazminat kararlarını etkileyebilir.',
              'İhtar mektubu ayrıca önemli hukuki süreleri başlatır veya korur. Karşı tarafı bilgilendirdiğiniz tarihin kanıtı olarak hizmet edebilir; bu durum faiz hesaplama, kastın tespiti ve çeşitli yasalar kapsamındaki bildirim gereksinimlerini karşılama açısından önemlidir.',
            ],
          },
          {
            title: 'En İyi Uygulamalar',
            type: 'numbered',
            content: [
              'Tutar konusunda kesin olun. Borçlu olunan tutarı nasıl hesapladığınızın ayrıntılı dökümünü ekleyin — anapara, faiz, gecikme bedelleri, zararlar ve mahsuplar. Belirsiz tutarlara yönelik talepler güvenilirliği zedeler.',
              'Destekleyici kanıt ekleyin. İlgili sözleşmelerin, faturaların, yazışmaların, fotoğrafların veya talebinizi destekleyen diğer belgelerin kopyalarını (asıllarını değil) ekleyin.',
              'Profesyonel bir ton sürdürün. Duygusal veya tehditkâr dil pozisyonunuzu zayıflatır. Olguları, hukuku ve sonuçları açık ve tarafsız bir şekilde ifade edin.',
              'Çözüm yolu sunun. Uygun olduğunda, bir ödeme planı veya alternatif çözüm müzakere etmeye istekli olduğunuzu belirtin. Bu iyi niyet gösterir ve uzlaşmayı hızlandırabilir.',
              'Takip edilebilir yöntemle gönderin. İadeli taahhütlü posta veya takipli kargo hizmeti kullanın. Her şeyin kopyasını saklayın.',
            ],
          },
        ],
      },
    },

    'termination-notice': {
      en: {
        whatIsIt: 'A contract termination notice is a formal written document notifying the other party to a contract that you are ending the agreement. Proper termination requires strict compliance with the notice provisions in the contract itself — including the method of delivery, required notice period, and any cure rights. Failure to follow these requirements can result in the termination being deemed invalid, exposing you to breach of contract claims.',
        whenToUse: [
          'The contract term is expiring and you choose not to renew',
          'The other party has materially breached the agreement',
          'You are exercising a termination-for-convenience clause',
          'Business circumstances have changed and the contract is no longer needed',
          'A force majeure event has made performance impossible or impracticable',
          'The parties have agreed to terminate by mutual consent',
          'You are ending a month-to-month or at-will arrangement',
        ],
        keyElements: [
          'Contract identification — The full name, date, and reference number of the agreement being terminated',
          'Parties — Full legal names of all parties to the contract',
          'Termination basis — The specific contract provision or legal ground authorizing termination',
          'Effective date — When the termination takes effect, accounting for any required notice period',
          'Surviving obligations — Identification of provisions that survive termination (confidentiality, indemnification, governing law)',
          'Required actions — What each party must do upon termination (return materials, final payments, transition services)',
          'Cure notice — If terminating for cause, confirmation that any required cure period has expired',
        ],
        sections: [
          {
            title: 'Important Considerations',
            type: 'callout',
            content: [
              'Before sending a termination notice, carefully review the contract\'s termination provisions. Many contracts require a specific notice period (30, 60, or 90 days), a particular delivery method (certified mail, overnight courier), and may grant the breaching party a right to cure before termination becomes effective. Failure to comply with these provisions can invalidate the termination and expose you to liability for wrongful termination of the contract.',
            ],
          },
        ],
      },
      tr: {
        whatIsIt: 'Sözleşme fesih bildirimi, karşı tarafa sözleşmeyi sona erdirdiğinizi bildiren resmi yazılı bir belgedir. Usulüne uygun fesih, sözleşmenin kendi fesih hükümlerine — teslim yöntemi, gerekli bildirim süresi ve düzeltme hakları dahil — sıkı sıkıya uyulmasını gerektirir. Bu gerekliliklere uyulmaması, feshin geçersiz sayılmasına ve sözleşme ihlali taleplerine maruz kalmanıza yol açabilir.',
        whenToUse: [
          'Sözleşme süresi doluyor ve yenilememayı tercih ediyorsunuz',
          'Karşı taraf sözleşmeyi esaslı şekilde ihlal etti',
          'Kolaylık feshi (termination for convenience) maddesini kullanıyorsunuz',
          'İş koşulları değişti ve sözleşmeye artık ihtiyaç yok',
          'Bir mücbir sebep olayı ifayı imkansız veya uygulanamaz hale getirdi',
          'Taraflar karşılıklı rızayla fesih konusunda anlaştı',
          'Aylık veya isteğe bağlı bir düzenlemeyi sonlandırıyorsunuz',
        ],
        keyElements: [
          'Sözleşme kimliği — Feshedilen sözleşmenin tam adı, tarihi ve referans numarası',
          'Taraflar — Sözleşmenin tüm taraflarının tam yasal isimleri',
          'Fesih gerekçesi — Feshi yetkilendiren belirli sözleşme hükmü veya yasal dayanak',
          'Geçerlilik tarihi — Gerekli bildirim süresi dikkate alınarak feshin yürürlüğe gireceği tarih',
          'Yürürlükte kalan yükümlülükler — Fesihten sonra da geçerli olacak hükümlerin tespiti (gizlilik, tazminat, uygulanacak hukuk)',
          'Gerekli işlemler — Fesih üzerine her tarafın yapması gerekenler (materyal iadesi, son ödemeler, hizmet devri)',
          'Düzeltme bildirimi — Haklı fesih durumunda, gerekli düzeltme süresinin dolduğunun teyidi',
        ],
        sections: [
          {
            title: 'Önemli Hususlar',
            type: 'callout',
            content: [
              'Fesih bildirimi göndermeden önce sözleşmenin fesih hükümlerini dikkatle inceleyin. Birçok sözleşme belirli bir bildirim süresi (30, 60 veya 90 gün), belirli bir teslim yöntemi (iadeli taahhütlü posta, kurye) gerektirir ve ihlal eden tarafa fesih yürürlüğe girmeden önce düzeltme hakkı tanıyabilir. Bu hükümlere uyulmaması feshi geçersiz kılabilir ve haksız fesih nedeniyle sorumluluk doğurabilir.',
            ],
          },
        ],
      },
    },
  }

  const override = overrides[slug]
  if (!override) return null
  const langContent = isEnglish ? override.en : override.tr
  return {
    whatIsIt: langContent.whatIsIt,
    whenToUse: langContent.whenToUse,
    keyElements: langContent.keyElements,
    sections: langContent.sections,
  }
}
