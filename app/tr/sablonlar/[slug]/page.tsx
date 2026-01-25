// app/tr/sablonlar/[slug]/page.tsx
// Turkish template detail page

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/get-dictionary'
import Header from '@/components/Header'
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

// Generate static params for all Turkish templates
export async function generateStaticParams() {
  const slugsSet = new Set<string>()
  templatesRegistry.forEach((t) => {
    if (t.lang === 'tr') {
      slugsSet.add(t.slug)
    }
  })
  return Array.from(slugsSet).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplateBySlug(slug, 'tr')

  if (!template) {
    return { title: 'Şablon Bulunamadı' }
  }

  return {
    title: `${template.title} | EchoLegal`,
    description: template.shortDescription,
    alternates: {
      canonical: `https://echo-legal.com/tr/sablonlar/${slug}`,
      languages: {
        en: `https://echo-legal.com/en/templates/${slug}`,
        tr: `https://echo-legal.com/tr/sablonlar/${slug}`,
      },
    },
    openGraph: {
      title: template.title,
      description: template.shortDescription,
      type: 'article',
      url: `https://echo-legal.com/tr/sablonlar/${slug}`,
    },
  }
}

export default async function TurkishTemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const lang = 'tr'
  const dict = await getDictionary(lang)

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

  // Template content
  const templateContent = getTemplateContent(template)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: template.title,
    description: template.shortDescription,
    url: `https://echo-legal.com/tr/sablonlar/${slug}`,
    dateModified: template.updatedAt,
    inLanguage: 'tr-TR',
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
          name: 'Ana Sayfa',
          item: 'https://echo-legal.com/tr',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Şablonlar',
          item: 'https://echo-legal.com/tr/sablonlar',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: template.title,
          item: `https://echo-legal.com/tr/sablonlar/${slug}`,
        },
      ],
    },
  }

  // Official sources for certain template types
  const officialSources = getOfficialSources(template)

  return (
    <div className="min-h-screen bg-white">
      <Header lang={lang} dict={dict} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/tr" className="hover:text-black">
            Ana Sayfa
          </Link>
          {' → '}
          <Link href="/tr/sablonlar" className="hover:text-black">
            Şablonlar
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
        <h1 className="text-3xl md:text-4xl font-black text-black mb-4">
          {template.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6">{template.shortDescription}</p>

        {/* Last updated */}
        <p className="text-sm text-gray-500 mb-8">
          Son Güncelleme: {template.updatedAt}
        </p>

        {/* Link to legacy contract page if exists */}
        {hasContractPage && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">Bu şablon indirilebilir.</p>
            <Link
              href={`/tr/contracts/${slug}`}
              className="inline-flex items-center mt-2 text-sm font-semibold text-amber-700 hover:text-amber-900"
            >
              Şablonu Görüntüle ve İndir
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}

        {/* Template content */}
        <div className="prose prose-gray max-w-none mb-12">
          {templateContent.whatIsIt && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">Bu Nedir?</h2>
              <p className="text-gray-600">{templateContent.whatIsIt}</p>
            </section>
          )}

          {templateContent.whenToUse && templateContent.whenToUse.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Ne Zaman Kullanılır
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

          {templateContent.keyElements &&
            templateContent.keyElements.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Temel Unsurlar
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-2">⚖️ Hukuki Sorumluluk Reddi</h3>
          <p className="text-sm text-gray-600">
            Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil
            etmez. Gerçek hukuki konularda kullanmadan önce lisanslı bir avukata
            danışın.
          </p>
        </div>

        {/* Official Sources */}
        {officialSources.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-3 text-blue-900">
              📚 Resmi Kaynaklar
            </h3>
            <ul className="space-y-2">
              {officialSources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    {source.name} ↗
                  </a>
                  {source.description && (
                    <span className="text-xs text-blue-600 ml-2">
                      — {source.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {template.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Etiketler</h3>
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
              İlgili Şablonlar
            </h2>
            <TemplatesList templates={relatedTemplates} lang={lang} />
          </section>
        )}

        {/* Related Guides */}
        <section className="border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-xl font-bold text-black mb-4">İlgili Rehberler</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {getRelatedGuides(template).map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">{guide.title}</span>
                <p className="text-sm text-gray-500 mt-1">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme
            amaçlı eğitici hukuki bilgiler ve belge şablonları sunar. Bu web
            sitesindeki hiçbir şey hukuki tavsiye teşkil etmez.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Helper function to get template content
function getTemplateContent(template: Template): {
  whatIsIt?: string
  whenToUse?: string[]
  keyElements?: string[]
} {
  const contentByDocType: Record<
    string,
    { whatIsIt: string; whenToUse: string[]; keyElements: string[] }
  > = {
    contract: {
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
    letter: {
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
    checklist: {
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
    template: {
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
    guide: {
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
    sample: {
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
    form: {
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
    petition: {
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
  }

  return contentByDocType[template.docType] || {}
}

// Helper function to get official sources based on template category/tags
function getOfficialSources(
  template: Template
): Array<{ name: string; url: string; description?: string }> {
  const sources: Array<{ name: string; url: string; description?: string }> = []

  // Tax-related templates
  if (
    template.category === 'tax' ||
    template.tags.some((t) =>
      ['tax', 'irs', 'ein', 'itin', 'w8', 'w9', '1099'].includes(t.toLowerCase())
    )
  ) {
    sources.push({
      name: 'IRS (Internal Revenue Service)',
      url: 'https://www.irs.gov',
      description: 'ABD Vergi Dairesi',
    })
  }

  // Immigration-related templates
  if (
    template.category === 'immigration' ||
    template.tags.some((t) =>
      ['visa', 'immigration', 'uscis', 'i-130', 'ds-160'].includes(
        t.toLowerCase()
      )
    )
  ) {
    sources.push({
      name: 'USCIS',
      url: 'https://www.uscis.gov',
      description: 'ABD Göçmenlik Servisi',
    })
    sources.push({
      name: 'US Department of State',
      url: 'https://travel.state.gov',
      description: 'Vize Bilgileri',
    })
  }

  // Business/LLC-related templates
  if (
    template.tags.some((t) =>
      ['llc', 'corporation', 'business', 'fincen', 'boi'].includes(
        t.toLowerCase()
      )
    )
  ) {
    sources.push({
      name: 'FinCEN',
      url: 'https://www.fincen.gov',
      description: 'Beneficial Ownership Bilgileri',
    })
  }

  // Consular-related templates
  if (
    template.category === 'personal' ||
    template.tags.some((t) =>
      ['consular', 'passport', 'kimlik', 'nufus'].includes(t.toLowerCase())
    )
  ) {
    sources.push({
      name: 'T.C. Dışişleri Bakanlığı',
      url: 'https://www.konsolosluk.gov.tr',
      description: 'Konsolosluk Hizmetleri',
    })
  }

  return sources
}

// Helper function to get related guides
function getRelatedGuides(
  template: Template
): Array<{ title: string; href: string; description: string }> {
  const guides: Array<{ title: string; href: string; description: string }> = []

  // Map template categories/tags to relevant guides
  if (
    template.category === 'contracts' ||
    template.tags.includes('nda') ||
    template.tags.includes('contract')
  ) {
    guides.push({
      title: 'Temel Sözleşmeler Rehberi',
      href: '/tr/abdde-is-yapan-turkler-icin-sozlesmeler',
      description: 'ABD\'de iş yapan Türkler için gerekli sözleşmeler',
    })
  }

  if (
    template.category === 'business' ||
    template.tags.includes('llc') ||
    template.tags.includes('business')
  ) {
    guides.push({
      title: 'LLC Kurma Rehberi',
      href: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim',
      description: 'Adım adım LLC kurulum süreci',
    })
  }

  if (
    template.category === 'tax' ||
    template.tags.some((t) => ['tax', 'ein', 'itin', 'w8'].includes(t))
  ) {
    guides.push({
      title: 'EIN, ITIN, SSN Farkları',
      href: '/tr/ein-itin-ssn-farki',
      description: 'Vergi kimlik numaralarını anlama',
    })
    guides.push({
      title: 'W-8 ve W-9 Rehberi',
      href: '/tr/irs-vergiler-ve-w8-w9-gercekleri',
      description: 'IRS vergi formları açıklaması',
    })
  }

  if (template.category === 'immigration' || template.tags.includes('visa')) {
    guides.push({
      title: 'DS-160 Formu Rehberi',
      href: '/tr/ds-160-rehberi',
      description: 'Vize başvuru formu adım adım',
    })
    guides.push({
      title: 'ABD\'ye Gelme Yolları',
      href: '/tr/amerika/abdye-gelme-yollari',
      description: 'Vize kategorileri ve seçenekler',
    })
  }

  // Default guides if none match
  if (guides.length === 0) {
    guides.push({
      title: 'ABD İş Merkezi',
      href: '/tr/amerika',
      description: 'Tüm ABD iş kaynakları',
    })
  }

  return guides.slice(0, 4)
}
