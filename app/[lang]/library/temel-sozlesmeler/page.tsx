// app/[lang]/library/temel-sozlesmeler/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateScholarlyArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'temel-sozlesmeler',
  datePublished: '2025-09-01',
  dateModified: '2026-01-25',
  version: '1.1',
  wordCount: 2200,
  citationKey: 'ecl-gde-00003',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'Essential Contracts for Turkish Entrepreneurs in the US | EchoLegal'
      : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler | EchoLegal',
    description: isEnglish
      ? 'The must-have legal documents for Turkish entrepreneurs doing business in the United States. NDA, Service Agreements, Privacy Policies, and more.'
      : 'ABD\'de iş yapan Türk girişimciler için olmazsa olmaz hukuki belgeler. NDA, Hizmet Sözleşmeleri, Gizlilik Politikaları ve daha fazlası.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/library/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/library/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/09/01',
      'citation_lastmod': '2026/01/25',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function EssentialContractsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler',
    abstractText: isEnglish
      ? 'A guide to the legal documents needed when doing business in or with the United States. Covers NDAs, Service Agreements, Privacy Policies, and more.'
      : 'ABD\'de veya ABD ile iş yaparken gereken hukuki belgelere rehber. NDA, Hizmet Sözleşmeleri, Gizlilik Politikaları ve daha fazlasını kapsar.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['contracts', 'nda', 'service-agreement', 'privacy-policy', 'terms-of-service', 'business-documents'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['Business Contracts', 'Legal Documents', 'US Business Law'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: pageTitle, url: pageUrl },
  ])

  const contracts = [
    {
      name: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      slug: 'nda',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'Before sharing confidential business information with anyone—potential partners, investors, contractors, or employees.'
        : 'Gizli iş bilgilerini herhangi biriyle paylaşmadan önce—potansiyel ortaklar, yatırımcılar, yükleniciler veya çalışanlar.',
      protects: isEnglish
        ? 'Trade secrets, business plans, client lists, proprietary methods, and other confidential information.'
        : 'Ticari sırlar, iş planları, müşteri listeleri, tescilli yöntemler ve diğer gizli bilgiler.',
    },
    {
      name: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      slug: 'service-agreement',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'When you provide services to clients. Defines the scope of work, payment terms, and deliverables.'
        : 'Müşterilere hizmet sağladığınızda. İş kapsamını, ödeme koşullarını ve teslim edilecekleri tanımlar.',
      protects: isEnglish
        ? 'Both parties by clearly defining expectations, preventing scope creep, and establishing payment terms.'
        : 'Her iki tarafı da beklentileri net bir şekilde tanımlayarak, kapsam kaymasını önleyerek ve ödeme koşullarını belirleyerek korur.',
    },
    {
      name: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      slug: 'independent-contractor',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'When you hire freelancers, consultants, or contractors. Establishes the relationship as contractor (not employee).'
        : 'Serbest çalışanlar, danışmanlar veya yükleniciler çalıştırdığınızda. İlişkiyi yüklenici (çalışan değil) olarak belirler.',
      protects: isEnglish
        ? 'Against misclassification claims, defines work expectations, IP ownership, and payment terms.'
        : 'Yanlış sınıflandırma iddialarına karşı korur, iş beklentilerini, fikri mülkiyet sahipliğini ve ödeme koşullarını tanımlar.',
    },
    {
      name: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
      slug: 'privacy-policy',
      priority: isEnglish ? 'Required' : 'Zorunlu',
      when: isEnglish
        ? 'If your website or app collects any user data (names, emails, cookies, analytics).'
        : 'Web siteniz veya uygulamanız herhangi bir kullanıcı verisi topluyorsa (isimler, e-postalar, çerezler, analitik).',
      protects: isEnglish
        ? 'Legal requirement for GDPR, CCPA, and other privacy laws. Failure to have one can result in fines.'
        : 'GDPR, CCPA ve diğer gizlilik yasaları için yasal gereklilik. Olmaması para cezalarıyla sonuçlanabilir.',
    },
    {
      name: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları',
      slug: 'terms-of-service',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'For any website, app, or online service. Defines the rules users must follow and limits your liability.'
        : 'Herhangi bir web sitesi, uygulama veya çevrimiçi hizmet için. Kullanıcıların uyması gereken kuralları tanımlar ve sorumluluğunuzu sınırlar.',
      protects: isEnglish
        ? 'Limits your liability, establishes governing law, defines acceptable use, and provides dispute resolution terms.'
        : 'Sorumluluğunuzu sınırlar, geçerli hukuku belirler, kabul edilebilir kullanımı tanımlar ve uyuşmazlık çözüm koşulları sağlar.',
    },
    {
      name: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
      slug: 'freelance-agreement',
      priority: isEnglish ? 'Important' : 'Önemli',
      when: isEnglish
        ? 'Specifically designed for freelancers working on project-based or ongoing client work.'
        : 'Proje bazlı veya sürekli müşteri işi yapan serbest çalışanlar için özel olarak tasarlanmış.',
      protects: isEnglish
        ? 'Clearly defines project scope, revisions, payment milestones, and intellectual property transfer.'
        : 'Proje kapsamını, revizyonları, ödeme aşamalarını ve fikri mülkiyet transferini net bir şekilde tanımlar.',
    },
    {
      name: isEnglish ? 'Influencer / Brand Agreement' : 'Influencer / Marka Sözleşmesi',
      slug: 'influencer-agreement',
      priority: isEnglish ? 'Important' : 'Önemli',
      when: isEnglish
        ? 'For content creators partnering with brands, or businesses hiring influencers for promotions.'
        : 'Markalarla ortaklık yapan içerik üreticileri veya tanıtımlar için influencer çalıştıran işletmeler için.',
      protects: isEnglish
        ? 'Defines deliverables, usage rights, FTC disclosure requirements, payment terms, and exclusivity.'
        : 'Teslim edilecekleri, kullanım haklarını, FTC açıklama gereksinimlerini, ödeme koşullarını ve münhasırlığı tanımlar.',
    },
  ]

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <JsonLdScript data={[scholarlySchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-12">
        <Link href={`/${lang}`} className="hover:text-ink transition-colors">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
        <span className="mx-2 text-stone-300">/</span>
        <Link href={`/${lang}/library`} className="hover:text-ink transition-colors">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
        <span className="mx-2 text-stone-300">/</span>
        <span className="text-ink">{isEnglish ? 'Essential Contracts' : 'Temel Sözleşmeler'}</span>
      </nav>

      <article>
        {/* Header — no badge bubble, institutional tone */}
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-prose mb-8">
            {isEnglish
              ? 'A guide to the legal documents you\'ll likely need when doing business in or with the United States. Understanding when and why you need each contract.'
              : 'ABD\'de veya ABD ile iş yaparken muhtemelen ihtiyaç duyacağınız hukuki belgelere rehber. Her bir sözleşmeye ne zaman ve neden ihtiyaç duyacağınızı anlama.'}
          </p>

          <InstitutionalBadge
            lang={lang}
            jurisdictions={['US']}
            lastReviewedAt={PAGE_META.dateModified}
          />
        </header>

        {/* Disclaimer — institutional left-border style */}
        <div className="border-l-2 border-stone-300 pl-5 mb-14">
          <p className="text-sm text-muted leading-relaxed">
            <strong className="text-ink">{isEnglish ? 'Note' : 'Not'}</strong>{' — '}
            {isEnglish
              ? 'This guide provides general information about common business contracts. Template documents should be reviewed by an attorney for your specific situation and jurisdiction.'
              : 'Bu rehber yaygın iş sözleşmeleri hakkında genel bilgi sağlar. Şablon belgeler, özel durumunuz ve yargı yetkiniz için bir avukat tarafından incelenmelidir.'}
          </p>
        </div>

        {/* Contracts List — flat sections, no cards */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-ink mb-10">
            {isEnglish ? 'Contract Overview' : 'Sözleşmelere Genel Bakış'}
          </h2>

          <div className="divide-y divide-stone-200">
            {contracts.map((contract, index) => (
              <div key={index} className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="font-serif text-lg font-semibold text-ink">{contract.name}</h3>
                  <span className="text-xs font-medium text-muted tracking-wide uppercase whitespace-nowrap bg-stone-100 px-2 py-0.5 rounded">
                    {contract.priority}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted leading-relaxed">
                    <span className="font-medium text-ink">{isEnglish ? 'When to use' : 'Ne zaman kullanılır'}:</span>{' '}
                    {contract.when}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    <span className="font-medium text-ink">{isEnglish ? 'What it protects' : 'Neyi korur'}:</span>{' '}
                    {contract.protects}
                  </p>
                </div>
                <Link
                  href={`/${lang}/contracts/${contract.slug}`}
                  className="arrow-link"
                >
                  {isEnglish ? 'View Template' : 'Şablonu Görüntüle'} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Minimum Essentials — understated, no colored box */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-ink mb-6">
            {isEnglish ? 'Minimum Essentials' : 'Minimum Gereklilikler'}
          </h2>

          <p className="text-sm text-muted leading-relaxed mb-5">
            {isEnglish
              ? 'If you are just starting out, these are the documents you should prioritize first:'
              : 'Yeni başlıyorsanız, öncelik vermeniz gereken belgeler şunlardır:'}
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-ink leading-relaxed">
            <li><strong>NDA</strong> — {isEnglish ? 'Before any business discussions' : 'Herhangi bir iş görüşmesinden önce'}</li>
            <li><strong>{isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</strong> — {isEnglish ? 'For all client work' : 'Tüm müşteri işleri için'}</li>
            <li><strong>{isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}</strong> — {isEnglish ? 'If you have a website or app' : 'Web siteniz veya uygulamanız varsa'}</li>
          </ol>
        </section>

        {/* Product CTA — restrained, no gradient */}
        <div className="border border-stone-200 rounded px-8 py-8 mb-16 text-center">
          <h2 className="font-serif text-xl font-semibold text-ink mb-3">
            {isEnglish ? 'Get All Essential Documents' : 'Tüm Temel Belgeleri Alın'}
          </h2>
          <p className="text-sm text-muted mb-6 max-w-md mx-auto leading-relaxed">
            {isEnglish
              ? 'Our Business Starter Kit includes 3 essential legal documents. I support EchoLegal – $49 recommended.'
              : 'Business Starter Kit\'imiz 3 temel hukuki belge içerir. Gücünüz kadar ödeyin.'}
          </p>
          <Link
            href={`/${lang}/legal-kits/business-starter`}
            className="btn-primary inline-block"
          >
            {isEnglish ? 'View Business Starter Kit' : 'Business Starter Kit\'i Görüntüle'}
          </Link>
        </div>

        {/* Related Resources — flat, no card hover effects */}
        <section className="mb-14">
          <h2 className="font-serif text-xl font-semibold text-ink mb-6">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
          <div className="divide-y divide-stone-200">
            <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'If you\'re forming a US business' : 'ABD işi kuruyorsanız'}</p>
            </Link>
            <Link href={`/${lang}/contracts`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'All Contract Templates' : 'Tüm Sözleşme Şablonları'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Browse our full library' : 'Tam kütüphanemize göz atın'}</p>
            </Link>
          </div>
        </section>

        {/* Citation Block */}
        <CiteThisEntry
          lang={lang}
          title={isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler'}
          url={pageUrl}
          version={PAGE_META.version}
          dateModified={PAGE_META.dateModified}
          citationKey={PAGE_META.citationKey}
        />
      </article>
    </main>
  )
}
