import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Legal Encyclopedia | EchoLegal'
      : 'Hukuk Ansiklopedisi | EchoLegal',
    description: isEnglish
      ? 'Structured legal reference organized by concept, jurisdiction, and topic. Attorney-drafted entries on business law, contracts, tax, immigration, and consular procedures.'
      : 'Kavram, yargı alanı ve konuya göre düzenlenmiş yapılandırılmış hukuki başvuru kaynağı. İş hukuku, sözleşmeler, vergi, göçmenlik ve konsolosluk işlemleri.',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function EncyclopediaPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const conceptArticles = [
    {
      slug: 'what-is-nda',
      title: isEnglish ? 'What is an NDA?' : 'Gizlilik Sözleşmesi (NDA) Nedir?',
      description: isEnglish
        ? 'Legal nature, enforceability, and standard provisions of non-disclosure agreements.'
        : 'Gizlilik sözleşmelerinin hukuki niteliği, uygulanabilirliği ve standart hükümleri.',
    },
    {
      slug: 'freelancer-legal-guide',
      title: isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışanlar İçin Hukuk Rehberi',
      description: isEnglish
        ? 'Contract requirements, tax obligations, and liability considerations for independent professionals.'
        : 'Bağımsız profesyoneller için sözleşme gereksinimleri, vergi yükümlülükleri ve sorumluluk değerlendirmeleri.',
    },
    {
      slug: 'contractor-vs-employee',
      title: isEnglish ? 'Contractor vs Employee' : 'Bağımsız Yüklenici mi, İşçi mi?',
      description: isEnglish
        ? 'Classification criteria under US federal and state law, and consequences of misclassification.'
        : 'ABD federal ve eyalet hukukuna göre sınıflandırma kriterleri ve yanlış sınıflandırmanın sonuçları.',
    },
    {
      slug: 'privacy-policy-guide',
      title: isEnglish ? 'Do I Need a Privacy Policy?' : 'Gizlilik Politikası Gerekli mi?',
      description: isEnglish
        ? 'Obligations under GDPR, CCPA, and KVKK for businesses collecting personal data.'
        : 'Kişisel veri toplayan işletmeler için GDPR, CCPA ve KVKK kapsamındaki yükümlülükler.',
    },
    {
      slug: 'common-misconceptions',
      title: isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Hukuki Yanılgılar',
      description: isEnglish
        ? 'Frequently repeated claims about US business law that do not reflect current legal standards.'
        : 'ABD iş hukukuna dair sıkça tekrarlanan ancak güncel hukuki standartları yansıtmayan iddialar.',
    },
  ]

  const pillarGuides = [
    {
      href: `/${lang}/amerika/abdde-llc-kurmak`,
      title: isEnglish ? 'LLC Formation in the US' : 'ABD\'de LLC Kurmak',
      description: isEnglish
        ? 'Entity types, state selection, formation requirements, and post-formation compliance.'
        : 'Tüzel kişilik türleri, eyalet seçimi, kuruluş gereksinimleri ve kuruluş sonrası uyum.',
      jurisdiction: isEnglish ? 'US Federal & State' : 'ABD Federal ve Eyalet',
    },
    {
      href: `/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`,
      title: isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş Yapanlar İçin Sözleşmeler',
      description: isEnglish
        ? 'Contract types, enforceability requirements, and cross-jurisdictional considerations.'
        : 'Sözleşme türleri, geçerlilik gereksinimleri ve yargı alanları arası değerlendirmeler.',
      jurisdiction: isEnglish ? 'US · Turkey' : 'ABD · Türkiye',
    },
    {
      href: `/${lang}/amerika/irs-vergi-gercekleri`,
      title: isEnglish ? 'IRS, Taxes & W-8 / W-9 Realities' : 'IRS, Vergi ve W-8 / W-9 Gerçekleri',
      description: isEnglish
        ? 'Tax residency, reporting obligations, FATCA/FBAR, and treaty benefits for non-residents.'
        : 'Vergi mukimliği, raporlama yükümlülükleri, FATCA/FBAR ve mukim olmayanlar için anlaşma hakları.',
      jurisdiction: isEnglish ? 'US Federal Tax' : 'ABD Federal Vergi',
    },
  ]

  const jurisdictions = [
    {
      href: `/${lang}/amerika`,
      title: isEnglish ? 'United States — Federal' : 'Amerika Birleşik Devletleri — Federal',
      description: isEnglish
        ? 'Federal business law, tax, immigration, and regulatory framework.'
        : 'Federal iş hukuku, vergi, göçmenlik ve düzenleyici çerçeve.',
    },
    {
      href: `/${lang}/amerika/ny-law-neden-tercih-edilir`,
      title: isEnglish ? 'New York' : 'New York',
      description: isEnglish
        ? 'Why New York law is frequently selected as governing law in commercial agreements.'
        : 'Ticari sözleşmelerde neden New York hukukunun sıklıkla tercih edildiği.',
    },
    {
      href: `/${lang}/amerika/llc-eyalet/florida`,
      title: isEnglish ? 'Florida' : 'Florida',
      description: isEnglish
        ? 'LLC formation, state tax structure, and compliance requirements in Florida.'
        : 'Florida\'da LLC kuruluşu, eyalet vergi yapısı ve uyum gereksinimleri.',
    },
    {
      href: `/${lang}/consular-documents`,
      title: isEnglish ? 'Turkey — Consular Procedures' : 'Türkiye — Konsolosluk İşlemleri',
      description: isEnglish
        ? 'Turkish consular services, document legalization, and administrative procedures in the US.'
        : 'ABD\'deki Türk konsolosluk hizmetleri, belge tasdiki ve idari işlemler.',
    },
  ]

  const topics = [
    {
      href: `/${lang}/library#business-formation`,
      title: isEnglish ? 'Business Formation' : 'Şirket Kuruluşu',
      description: isEnglish
        ? 'LLC, corporation, and partnership structures under US law.'
        : 'ABD hukukuna göre LLC, şirket ve ortaklık yapıları.',
    },
    {
      href: `/${lang}/library#contracts`,
      title: isEnglish ? 'Contracts' : 'Sözleşmeler',
      description: isEnglish
        ? 'Formation, enforceability, and standard commercial agreement types.'
        : 'Sözleşme kurulumu, uygulanabilirlik ve standart ticari sözleşme türleri.',
    },
    {
      href: `/${lang}/library#tax-compliance`,
      title: isEnglish ? 'Tax & Compliance' : 'Vergi ve Uyum',
      description: isEnglish
        ? 'IRS obligations, form requirements, and reporting standards for non-residents.'
        : 'IRS yükümlülükleri, form gereksinimleri ve mukim olmayanlar için raporlama standartları.',
    },
    {
      href: `/${lang}/amerika/abdye-gelme-yollari`,
      title: isEnglish ? 'Immigration' : 'Göçmenlik',
      description: isEnglish
        ? 'Visa categories, status adjustments, and pathways to the United States.'
        : 'Vize kategorileri, statü değişiklikleri ve ABD\'ye giriş yolları.',
    },
    {
      href: `/${lang}/consular-documents`,
      title: isEnglish ? 'Consular & Administrative' : 'Konsolosluk ve İdari İşlemler',
      description: isEnglish
        ? 'Document legalization, apostille, notarization, and consular registration procedures.'
        : 'Belge tasdiki, apostil, noter onayı ve konsolosluk kayıt işlemleri.',
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-[#C9A227] uppercase tracking-widest mb-2">
            {isEnglish ? 'Reference' : 'Referans'}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {isEnglish ? 'Legal Encyclopedia' : 'Hukuk Ansiklopedisi'}
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
            {isEnglish
              ? 'Structured legal reference organized by concept, jurisdiction, and topic. All entries are drafted with attorney-level precision.'
              : 'Kavram, yargı alanı ve konuya göre düzenlenmiş yapılandırılmış hukuki başvuru kaynağı. Tüm maddeler avukat düzeyinde hassasiyetle hazırlanmıştır.'}
          </p>
        </header>

        {/* Section 1: Core Concepts & Frameworks */}
        <section className="mb-14">
          <div className="mb-5 border-b border-gray-200 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isEnglish ? 'Core Concepts & Frameworks' : 'Temel Kavramlar ve Çerçeveler'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEnglish
                ? 'Reference articles on foundational legal concepts.'
                : 'Temel hukuki kavramlara ilişkin başvuru makaleleri.'}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {conceptArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/${lang}/encyclopedia/${article.slug}`}
                className="group flex flex-col justify-between p-5 md:p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all duration-150"
              >
                <div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {article.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-[#C9A227] group-hover:text-[#b08d1f] transition-colors">
                  <span>{isEnglish ? 'Read' : 'Oku'}</span>
                  <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Pillar Guides */}
        <section className="mb-14">
          <div className="mb-5 border-b border-gray-200 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isEnglish ? 'Pillar Guides' : 'Ana Rehberler'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEnglish
                ? 'Comprehensive reference guides on the three primary subject areas.'
                : 'Üç temel konu alanına ilişkin kapsamlı başvuru rehberleri.'}
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {pillarGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex flex-col justify-between p-5 md:p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all duration-150"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase rounded-full bg-gray-100 text-gray-600 mb-3">
                    {isEnglish ? 'Pillar Guide' : 'Ana Rehber'}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400 mt-3 block">
                  {guide.jurisdiction}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: By Jurisdiction */}
        <section id="by-jurisdiction" className="mb-14 scroll-mt-20">
          <div className="mb-5 border-b border-gray-200 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isEnglish ? 'By Jurisdiction' : 'Yargı Alanına Göre'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEnglish
                ? 'Legal information organized by applicable jurisdiction.'
                : 'Uygulanabilir yargı alanına göre düzenlenmiş hukuki bilgi.'}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {jurisdictions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all duration-150"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <svg className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-[#C9A227] group-hover:translate-x-0.5 transition-all duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: By Topic */}
        <section id="by-topic" className="mb-14 scroll-mt-20">
          <div className="mb-5 border-b border-gray-200 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {isEnglish ? 'By Topic' : 'Konuya Göre'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEnglish
                ? 'Browse content across subject-matter categories.'
                : 'Konu kategorilerine göre içeriklere göz atın.'}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex flex-col p-4 md:p-5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all duration-150"
              >
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors mb-1">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Resources */}
        <nav className="pt-8 border-t border-gray-200" aria-label={isEnglish ? 'Related resources' : 'İlgili kaynaklar'}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href={`/${lang}/library`}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Guides' : 'Rehberler'}</span>
              <span className="text-gray-400 text-sm">→</span>
            </Link>
            <Link
              href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Templates' : 'Şablonlar'}</span>
              <span className="text-gray-400 text-sm">→</span>
            </Link>
            <Link
              href={`/${lang}/checklists`}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all"
            >
              <span className="text-sm font-medium text-gray-700">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</span>
              <span className="text-gray-400 text-sm">→</span>
            </Link>
          </div>
        </nav>
      </main>
    </div>
  )
}
