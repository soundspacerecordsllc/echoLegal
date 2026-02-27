// app/[lang]/abd-de-llc-kurmak-turkler-icin-adim-adim/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { getArticleMetadata } from '@/lib/article-metadata'
import { getFeaturedSnippet } from '@/components/FeaturedSnippet'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'
import JudicialInterpretation from '@/components/JudicialInterpretation'
import type { JudicialEntry, InterpretiveNote, ResolutionBullet } from '@/components/JudicialInterpretation'
import ConflictPrecedence from '@/components/ConflictPrecedence'
import type { CaseIllustration, UnresolvedItem } from '@/components/ConflictPrecedence'
import JudicialAuthoritySection from '@/components/editorial/JudicialAuthoritySection'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const ARTICLE_SLUG = 'abd-de-llc-kurmak-turkler-icin-adim-adim'

const PAGE_META = {
  slug: 'abd-de-llc-kurmak-turkler-icin-adim-adim',
  datePublished: '2025-06-01',
  dateModified: '2026-02-17',
  version: '1.0',
  citationKey: 'ecl-gde-00014',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How to Form an LLC in the US: Step-by-Step Guide for Turkish Entrepreneurs | EchoLegal'
    : 'ABD\'de LLC Kurmak: Türkler İçin Adım Adım Hukuki Rehber | EchoLegal'

  const description = isEnglish
    ? 'Guide to LLC formation in the United States for Turkish entrepreneurs. State selection, EIN, registered agent, bank account, and compliance requirements.'
    : 'Türk girişimciler için ABD\'de LLC kurma rehberi. Eyalet seçimi, EIN başvurusu, registered agent, banka hesabı açma ve uyum gereksinimleri.'

  const url = `${SITE_URL}/${lang}/${PAGE_META.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'citation_title': isEnglish ? 'Setting Up a US LLC - Step by Step for Turks' : "ABD'de LLC Kurmak - Türkler İçin Adım Adım",
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
      'citation_lastmod': '2026/02/17',
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

export default async function LLCGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'llc-nedir', label: isEnglish ? 'What is an LLC?' : 'LLC Nedir?' },
    { id: 'turkiye-mukimi-gercekler', label: isEnglish ? 'Key Realities for Turkish Residents' : 'Türkiye\'de İkamet Edenler İçin Temel Gerçekler' },
    { id: 'adim-adim-surecler', label: isEnglish ? 'Step-by-Step Process' : 'Adım Adım Süreç' },
    { id: 'sik-yapilan-hatalar', label: isEnglish ? 'Common Mistakes' : 'Sık Yapılan Hatalar' },
    { id: 'belgeler-kontrol-listesi', label: isEnglish ? 'Document Checklist' : 'Belgeler Kontrol Listesi' },
    { id: 'sure-ve-maliyet', label: isEnglish ? 'Timeline & Costs' : 'Süre ve Maliyet' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
    { id: 'kaynaklar', label: isEnglish ? 'Sources' : 'Kaynaklar' },
    { id: 'judicial-interpretation', label: isEnglish ? 'Judicial Interpretation (Selected)' : 'Yargısal Yorum (Seçilmiş)' },
    { id: 'interpretive-notes', label: isEnglish ? 'Interpretive Notes' : 'Yorum Notları' },
    { id: 'conflict-precedence', label: isEnglish ? 'Conflict Resolution & Authority Precedence' : 'Çatışma Çözümü ve Yetki Önceliği' },
    { id: 'illustrative-judicial-treatment', label: isEnglish ? 'Illustrative Judicial Treatment' : 'Seçilmiş Yargısal Yaklaşım Örnekleri' },
  ]

  const articleMeta = getArticleMetadata(ARTICLE_SLUG)
  const featuredSnippet = getFeaturedSnippet(ARTICLE_SLUG)

  const pageUrl = `${SITE_URL}/${lang}/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Setting Up a US LLC - Step by Step for Turks' : "ABD'de LLC Kurmak - Türkler İçin Adım Adım"

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Guide to LLC formation in the United States for Turkish entrepreneurs.'
      : 'Türk girişimciler için ABD\'de LLC kurma rehberi.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['llc', 'turkish-entrepreneurs', 'us-business', 'step-by-step'],
    section: 'jurisdictional-guide',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: pageTitle, url: pageUrl },
  ])

  const primarySources = getPrimarySources(ARTICLE_SLUG, isEnglish ? 'en' : 'tr')

  const judicialEntries: JudicialEntry[] = [
    {
      citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
      summary: {
        en: 'The "check-the-box" regulations govern entity classification for federal tax purposes. A single-member LLC defaults to disregarded entity status unless an election is made. Binding regulation with the force of law.',
        tr: '"Check-the-box" düzenlemeleri federal vergi amaçları için tüzel kişilik sınıflandırmasını yönetir. Tek üyeli LLC, seçim yapılmadıkça varsayılan olarak dikkate alınmayan varlık statüsüne sahiptir. Kanun hükmünde bağlayıcı yönetmelik.',
      },
      weight: 'binding',
    },
    {
      citation: '26 U.S.C. § 7701(a)(3)–(4)',
      summary: {
        en: 'Statutory definitions of "corporation" and "domestic" for federal tax purposes. These definitions determine how state-law entities are treated under the Internal Revenue Code.',
        tr: 'Federal vergi amaçları için "şirket" ve "yerli" yasal tanımları. Bu tanımlar eyalet hukuku kapsamındaki kuruluşların İç Gelir Kanunu kapsamında nasıl değerlendirileceğini belirler.',
      },
      weight: 'binding',
    },
    {
      citation: '31 U.S.C. § 5336 (Corporate Transparency Act)',
      summary: {
        en: 'Requires most LLCs to report beneficial ownership information to FinCEN. Statutory mandate; FinCEN regulations implement the specifics.',
        tr: 'Çoğu LLC\'nin gerçek lehdar bilgilerini FinCEN\'e bildirmesini zorunlu kılar. Yasal gereklilik; FinCEN yönetmelikleri detayları uygular.',
      },
      weight: 'binding',
    },
    {
      citation: '6 Del. C. § 18-101 et seq. (Delaware LLC Act)',
      summary: {
        en: 'State statute governing LLC formation, governance, and dissolution in Delaware. State law controls entity formation; federal law controls tax treatment.',
        tr: 'Delaware\'de LLC kuruluş, yönetim ve feshine ilişkin eyalet kanunu. Eyalet hukuku kuruluşu kontrol eder; federal hukuk vergi uygulamasını kontrol eder.',
      },
      weight: 'binding',
    },
    {
      citation: 'IRS Rev. Proc. 2023-32',
      summary: {
        en: 'IRS guidance on EIN application procedures for foreign-owned entities. Administrative guidance; helpful but not binding on courts.',
        tr: 'Yabancı sermayeli kuruluşlar için EIN başvuru prosedürlerine ilişkin IRS rehberliği. İdari rehberlik; faydalıdır ancak mahkemeler için bağlayıcı değildir.',
      },
      weight: 'persuasive',
    },
  ]

  const conflictNotes: InterpretiveNote[] = [
    {
      en: 'Entity formation is governed by state law (e.g., Delaware LLC Act). Federal law does not create LLCs but determines how state-law entities are classified and taxed.',
      tr: 'Tüzel kişilik kuruluşu eyalet hukuku tarafından yönetilir (örn. Delaware LLC Yasası). Federal hukuk LLC oluşturmaz ancak eyalet hukuku kuruluşlarının nasıl sınıflandırıldığını ve vergilendirildiğini belirler.',
    },
    {
      en: 'Where state LLC statutes conflict with federal tax classification rules, federal law governs the tax treatment under the Supremacy Clause. However, state law governs liability protection, governance, and dissolution.',
      tr: 'Eyalet LLC kanunları federal vergi sınıflandırma kurallarıyla çatıştığında, Üstünlük Maddesi kapsamında federal hukuk vergi uygulamasını yönetir. Ancak sorumluluk koruması, yönetim ve fesih eyalet hukuku tarafından yönetilir.',
    },
    {
      en: 'FinCEN beneficial ownership regulations (31 C.F.R. § 1010.380) implement the Corporate Transparency Act. These regulations have the force of law, distinct from voluntary guidance.',
      tr: 'FinCEN gerçek lehdar yönetmelikleri (31 C.F.R. § 1010.380) Kurumsal Şeffaflık Yasası\'nı uygular. Bu yönetmelikler gönüllü rehberlikten farklı olarak kanun hükmündedir.',
    },
  ]

  const resolves: ResolutionBullet[] = [
    {
      en: 'Whether a non-US person can form an LLC (yes, under state law; no federal prohibition).',
      tr: 'ABD dışı bir kişinin LLC kurabilip kuramayacağı (evet, eyalet hukuku kapsamında; federal yasak yoktur).',
    },
    {
      en: 'Default federal tax classification of a single-member LLC (disregarded entity under check-the-box).',
      tr: 'Tek üyeli LLC\'nin varsayılan federal vergi sınıflandırması (check-the-box kapsamında dikkate alınmayan varlık).',
    },
    {
      en: 'Obligation to file BOI reports with FinCEN (required for most LLCs under the CTA).',
      tr: 'FinCEN\'e BOI raporu dosyalama yükümlülüğü (CTA kapsamında çoğu LLC için zorunludur).',
    },
  ]

  const doesNotResolve: ResolutionBullet[] = [
    {
      en: 'Which state is "best" for a particular business situation (requires analysis of specific facts and objectives).',
      tr: 'Belirli bir iş durumu için hangi eyaletin "en iyi" olduğu (belirli olgular ve hedeflerin analizi gerektirir).',
    },
    {
      en: 'Whether a foreign LLC owner has personal US tax filing obligations (depends on income sources and activities).',
      tr: 'Yabancı LLC sahibinin kişisel ABD vergi beyannamesi yükümlülüğü olup olmadığı (gelir kaynakları ve faaliyetlere bağlıdır).',
    },
    {
      en: 'Immigration implications of LLC ownership (LLC formation confers no immigration benefit).',
      tr: 'LLC sahipliğinin göçmenlik etkileri (LLC kuruluşu hiçbir göçmenlik avantajı sağlamaz).',
    },
  ]

  const caseIllustrations: CaseIllustration[] = [
    {
      citation: 'Littriello v. United States, 484 F.3d 372 (6th Cir. 2007)',
      principle: {
        en: 'State-law entity classification does not control federal tax treatment. The check-the-box regulations provide the exclusive framework for determining how an LLC is taxed at the federal level, regardless of how state law characterises the entity.',
        tr: 'Eyalet hukuku kapsamındaki tüzel kişilik sınıflandırması federal vergi uygulamasını belirlemez. Check-the-box düzenlemeleri, eyalet hukukunun kuruluşu nasıl nitelendirdiğinden bağımsız olarak, bir LLC\'nin federal düzeyde nasıl vergilendirileceğini belirleyen münhasır çerçeveyi sağlar.',
      },
    },
    {
      citation: 'McNamee v. Department of the Treasury, 488 F.3d 100 (2d Cir. 2007)',
      principle: {
        en: 'An LLC\'s limited liability protection under state law does not automatically confer any particular tax status under federal law. Federal tax classification is determined exclusively by the Treasury regulations, not by the state-law characteristics of the entity.',
        tr: 'Eyalet hukuku kapsamında bir LLC\'nin sınırlı sorumluluk koruması, federal hukuk kapsamında otomatik olarak belirli bir vergi statüsü sağlamaz. Federal vergi sınıflandırması, tüzel kişiliğin eyalet hukuku özelliklerine göre değil, münhasıran Hazine yönetmelikleri tarafından belirlenir.',
      },
    },
  ]

  const unresolvedItems: UnresolvedItem[] = [
    {
      en: 'Whether a specific business activity creates "nexus" sufficient to trigger state-level tax or registration obligations.',
      tr: 'Belirli bir ticari faaliyetin, eyalet düzeyinde vergi veya tescil yükümlülüklerini tetikleyecek yeterli "bağlantı" (nexus) oluşturup oluşturmadığı.',
    },
    {
      en: 'Factual determination of whether a foreign owner\'s involvement constitutes a "trade or business" within the United States.',
      tr: 'Yabancı sahibin katılımının ABD sınırları içinde "ticaret veya iş" oluşturup oluşturmadığına ilişkin olgusal tespit.',
    },
    {
      en: 'Choice-of-entity analysis for specific business models (requires professional assessment of individual circumstances).',
      tr: 'Belirli iş modelleri için tüzel kişilik seçimi analizi (bireysel koşulların profesyonel değerlendirmesini gerektirir).',
    },
    {
      en: 'Application of the "economic substance doctrine" to specific LLC structures or transactions.',
      tr: '"Ekonomik öz doktrini"nin belirli LLC yapılarına veya işlemlerine uygulanması.',
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <JsonLdScript data={[articleSchema, breadcrumbSchema]} />
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Legal Guide' : 'Hukuki Rehber'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                {isEnglish
                  ? 'How to Form an LLC in the US: Step-by-Step Guide for Turkish Entrepreneurs'
                  : 'ABD\'de LLC Kurmak: Türkler İçin Adım Adım Hukuki Rehber'}
              </h1>

              <p className="text-base text-gray-600 mb-6">
                {isEnglish
                  ? 'Written for Turkish entrepreneurs and business owners evaluating LLC formation in the United States.'
                  : 'ABD\'de LLC kurmayı değerlendiren Türk girişimciler ve iş sahipleri için hazırlanmıştır.'}
              </p>

              {/* Authority signals */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  EchoLegal
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Updated: January 25, 2026' : 'Güncellendi: 25 Ocak 2026'}
                </span>
                <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {isEnglish ? 'Reviewed by a licensed attorney' : 'Lisanslı avukat tarafından incelendi'}
                </span>
              </div>

              <InstitutionalBadge
                lang={lang}
                jurisdictions={['US']}
                lastReviewedAt={PAGE_META.dateModified}
                className="mb-8"
              />

              {/* Featured snippet block */}
              {featuredSnippet && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed">
                    {featuredSnippet[lang]}
                  </p>
                </div>
              )}

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This guide explains the legal steps for forming a Limited Liability Company (LLC) in the United States, with particular attention to considerations for Turkish nationals and residents.'
                  : 'Bu rehber, ABD\'de Limited Liability Company (LLC) kurmanın hukuki adımlarını, özellikle Türk vatandaşları ve Türkiye mukimlerinin dikkat etmesi gereken hususlarla birlikte açıklamaktadır.'}
              </p>
            </header>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>{isEnglish ? 'Disclaimer:' : 'Uyarı:'}</strong>{' '}
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal advice. Consult a qualified attorney for your specific situation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır ve hukuki danışmanlık teşkil etmez. Kendi durumunuz için mutlaka uzman bir avukata danışın.'}
              </p>
            </div>

            {/* Scope & Method */}
            <div className="border border-gray-200 rounded-lg px-5 py-4 mb-10">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {isEnglish ? 'Scope & Method' : 'Kapsam ve Metodoloji'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {isEnglish
                  ? 'This entry is structured according to a formal legal authority hierarchy. Binding sources (statutes and regulations) are presented separately from interpretive authorities (judicial decisions and agency interpretations). Ordering reflects relative legal force.'
                  : 'Bu madde, resmi bir hukuki otorite hiyerarşisine göre yapılandırılmıştır. Bağlayıcı kaynaklar (kanunlar ve yönetmelikler), yorumlayıcı otoritelerden (yargı kararları ve kurum yorumları) ayrı olarak sunulmaktadır. Sıralama, göreli hukuki bağlayıcılığı yansıtmaktadır.'}
              </p>
            </div>

            {/* Version Traceability */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-10 border-b border-gray-100 pb-3">
              <span>
                <span className="font-medium text-gray-600">
                  {isEnglish ? 'Version' : 'Sürüm'}:
                </span>{' '}
                v{PAGE_META.version}
              </span>
              <span>
                <span className="font-medium text-gray-600">
                  {isEnglish ? 'Last Reviewed' : 'Son İnceleme'}:
                </span>{' '}
                {PAGE_META.dateModified}
              </span>
              <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800">
                {isEnglish ? 'Foundational' : 'Temel'}
              </span>
            </div>

            {/* Judicial Deference Framework */}
            <div className="border border-gray-200 rounded-lg px-5 py-4 mb-10">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {isEnglish ? 'Judicial Deference Framework' : 'Yargısal İtibar (Deference) Çerçevesi'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                {isEnglish
                  ? 'Judicial deference describes the weight courts give to an administrative agency\'s interpretation of a statute or regulation it administers.'
                  : 'Yargısal itibar (deference), mahkemelerin bir idari kurumun yönettiği kanun veya yönetmeliğe ilişkin yorumuna ne ölçüde ağırlık verdiğini ifade eder.'}
              </p>
              <ul className="text-xs text-gray-500 leading-relaxed space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-gray-600">{isEnglish ? 'Chevron deference' : 'Chevron itibarı'}:</strong>{' '}
                  {isEnglish
                    ? 'Applies when Congress has delegated authority to an agency and the agency\'s interpretation is reasonable. Courts defer unless the statute is unambiguous.'
                    : 'Kongre bir kuruma yetki devrettiğinde ve kurumun yorumu makul olduğunda uygulanır. Kanun açık olmadıkça mahkemeler kurumun yorumuna itibar eder.'}
                </li>
                <li>
                  <strong className="text-gray-600">{isEnglish ? 'Skidmore deference' : 'Skidmore itibarı'}:</strong>{' '}
                  {isEnglish
                    ? 'A lesser standard based on the persuasiveness of the agency\'s reasoning, consistency of its interpretation, and expertise demonstrated.'
                    : 'Kurumun muhakemesinin ikna ediciliğine, yorum tutarlılığına ve ortaya koyduğu uzmanlığa dayanan daha düşük düzeyde bir itibar standardı.'}
                </li>
                <li>
                  <strong className="text-gray-600">{isEnglish ? 'Non-binding guidance' : 'Bağlayıcı olmayan rehberlik'}:</strong>{' '}
                  {isEnglish
                    ? 'Agency materials such as internal manuals (e.g., IRM), FAQs, opinion letters, and informal guidance do not carry the force of law. Courts may consider them but are not bound by them.'
                    : 'İç kılavuzlar (ör. IRM), SSS, görüş mektupları ve gayri resmi rehberlik gibi kurum materyalleri kanun gücü taşımaz. Mahkemeler bunları dikkate alabilir ancak bunlarla bağlı değildir.'}
                </li>
                <li>
                  <strong className="text-gray-600">{isEnglish ? 'Application on this platform' : 'Bu platformdaki uygulaması'}:</strong>{' '}
                  {isEnglish
                    ? 'EchoLegal labels content by authority level (statute, regulation, agency guidance, judicial interpretation). Courts may assign different weight to these sources than implied by their presentation order.'
                    : 'EchoLegal içeriği otorite düzeyine göre etiketler (kanun, yönetmelik, kurum rehberliği, yargısal yorum). Mahkemeler bu kaynaklara sunum sırasının ima ettiğinden farklı ağırlık atayabilir.'}
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-3 italic">
                {isEnglish
                  ? 'This framework is provided for contextual understanding and does not constitute legal advice regarding any specific matter.'
                  : 'Bu çerçeve bağlamsal anlayış için sunulmaktadır ve herhangi bir spesifik konuda hukuki tavsiye teşkil etmez.'}
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-gray-50 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
              <ol className="space-y-2">
                {tocItems.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-black hover:underline">
                      {index + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1: LLC Nedir */}
            <section id="llc-nedir" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">{isEnglish ? '1. What is an LLC?' : '1. LLC Nedir?'}</h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <p>A Limited Liability Company (LLC) is a business structure under U.S. state law that combines the liability protection of a corporation with the tax flexibility of a partnership.</p>
                  <p><strong>Key characteristics:</strong></p>
                  <ul>
                    <li><strong>Limited liability:</strong> Members&apos; personal assets are generally protected from business debts and lawsuits.</li>
                    <li><strong>Pass-through taxation:</strong> By default, a single-member LLC is treated as a &quot;disregarded entity&quot; for federal tax purposes. The LLC itself does not file a separate tax return. Income passes through to the owner.</li>
                    <li><strong>Flexible management:</strong> Unlike corporations, LLCs have fewer formal requirements (no mandatory board meetings, annual minutes, etc.).</li>
                  </ul>
                  <p>LLCs are formed at the state level. Each state has its own formation requirements, fees, and ongoing compliance obligations.</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <p>Limited Liability Company (LLC), ABD eyalet hukuku kapsamında kurulan ve şirketin (corporation) sınırlı sorumluluk korumasını ortaklığın (partnership) vergi esnekliğiyle birleştiren bir işletme yapısıdır.</p>
                  <p><strong>Temel özellikleri:</strong></p>
                  <ul>
                    <li><strong>Sınırlı sorumluluk:</strong> Üyelerin kişisel varlıkları, işletme borçlarından ve davalardan kural olarak korunur.</li>
                    <li><strong>Geçişli vergilendirme (pass-through):</strong> Tek üyeli LLC, federal vergi açısından varsayılan olarak &quot;disregarded entity&quot; (dikkate alınmayan varlık) muamelesi görür. LLC ayrı vergi beyannamesi vermez. Gelir doğrudan sahibine geçer.</li>
                    <li><strong>Esnek yönetim:</strong> Corporation&apos;lardan farklı olarak LLC&apos;lerde zorunlu yönetim kurulu toplantısı, yıllık tutanak gibi biçimsel gereklilikler yoktur.</li>
                  </ul>
                  <p>LLC&apos;ler eyalet düzeyinde kurulur. Her eyaletin kendine özgü kuruluş gereksinimleri, harçları ve süregelen uyum yükümlülükleri vardır.</p>
                </div>
              )}
            </section>

            {/* Section 2: Türkiye Mukimleri İçin Temel Gerçekler */}
            <section id="turkiye-mukimi-gercekler" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. Key Realities for Turkish Residents' : '2. Türkiye\'de İkamet Edenler İçin Temel Gerçekler'}
              </h2>

              {isEnglish ? (
                <div className="prose prose-gray max-w-none">
                  <p>If you are a Turkish citizen residing in Turkey (or elsewhere outside the US), there are specific considerations:</p>

                  <h3>EIN vs. ITIN vs. SSN</h3>
                  <ul>
                    <li><strong>EIN (Employer Identification Number):</strong> A tax ID for your LLC. Required for opening a US bank account and filing taxes. Non-residents can obtain an EIN by mail or fax using Form SS-4.</li>
                    <li><strong>ITIN (Individual Taxpayer Identification Number):</strong> A personal tax ID for individuals who cannot obtain an SSN. May be required for certain tax filings.</li>
                    <li><strong>SSN (Social Security Number):</strong> Only available to individuals authorized to work in the US.</li>
                  </ul>

                  <h3>US-Source Income</h3>
                  <p>Even without a US visa or physical presence, your LLC may trigger US tax filing obligations if it earns income from US sources (US clients, US-based services). The US-Turkey tax treaty may provide certain benefits but does not eliminate all requirements.</p>

                  <h3>LLC Does Not Grant Immigration Status</h3>
                  <p>A common misconception: forming an LLC does not provide any visa or immigration benefit. You cannot &quot;move to the US&quot; simply by forming an LLC. Immigration requires a separate legal pathway (E-2, L-1, etc.).</p>
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  <p>Türkiye&apos;de (veya ABD dışında başka bir yerde) ikamet eden bir Türk vatandaşıysanız, dikkat etmeniz gereken hususlar şunlardır:</p>

                  <h3>EIN, ITIN ve SSN Ayrımı</h3>
                  <ul>
                    <li><strong>EIN (Employer Identification Number):</strong> LLC&apos;niz için vergi kimlik numarası. ABD banka hesabı açmak ve vergi beyannamesi vermek için gereklidir. ABD dışındaki kişiler, SS-4 formunu posta veya faks yoluyla göndererek EIN alabilir.</li>
                    <li><strong>ITIN (Individual Taxpayer Identification Number):</strong> SSN alamayan bireyler için kişisel vergi kimlik numarası. Belirli vergi beyannameleri için gerekebilir.</li>
                    <li><strong>SSN (Social Security Number):</strong> Yalnızca ABD&apos;de çalışma izni olan kişilere verilir.</li>
                  </ul>

                  <h3>ABD Kaynaklı Gelir</h3>
                  <p>ABD vizesi veya fiziksel varlığınız olmasa bile, LLC&apos;niz ABD kaynaklı gelir elde ediyorsa (ABD&apos;li müşteriler, ABD merkezli hizmetler), ABD vergi beyannamesi verme yükümlülüğünüz doğabilir. ABD-Türkiye vergi anlaşması belirli avantajlar sağlayabilir ancak tüm gereklilikleri ortadan kaldırmaz.</p>

                  <h3>LLC Göçmenlik Statüsü Sağlamaz</h3>
                  <p>Yaygın bir yanılgı: LLC kurmak herhangi bir vize veya göçmenlik avantajı sağlamaz. Sadece LLC kurarak ABD&apos;ye yerleşemezsiniz. Göçmenlik için ayrı bir hukuki yol (E-2, L-1 vb.) gereklidir.</p>
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-5 mt-6">
                <p className="text-sm text-red-900 leading-relaxed font-medium">
                  {isEnglish
                    ? 'Important: Forming an LLC does NOT provide any immigration benefit. Do not rely on advice suggesting otherwise.'
                    : 'Önemli: LLC kurmak hiçbir göçmenlik avantajı sağlamaz. Aksini iddia eden tavsiyelere güvenmeyin.'}
                </p>
              </div>
            </section>

            {/* Section 3: Adım Adım Süreç */}
            <section id="adim-adim-surecler" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. Step-by-Step Process' : '3. Adım Adım Süreç'}
              </h2>

              {isEnglish ? (
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">Each step below builds on the one before it. The state is selected first because the registered agent must be physically present in that state. Articles of Organization are filed before applying for an EIN, as the IRS requires proof that the entity exists. Banks, in turn, generally require both an EIN and an Operating Agreement before opening an account. This sequence reflects the legal and practical dependencies of the process.</p>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 1: Choose Your State</h3>
                    <p className="text-gray-700 mt-2">Delaware and Wyoming are popular for their business-friendly laws and privacy protections. However, if you will conduct business primarily in one state, forming there may be simpler. Each state has different fees and requirements.</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Delaware: $90 filing fee, $300/year franchise tax (minimum)</li>
                      <li>Wyoming: $100 filing fee, $60/year annual report</li>
                      <li>New Mexico: $50 filing fee, no annual report requirement</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 2: Appoint a Registered Agent</h3>
                    <p className="text-gray-700 mt-2">Every LLC must designate a registered agent with a physical address in the formation state. The agent receives legal and official documents on behalf of your LLC. Commercial registered agent services typically cost $50–300 per year.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 3: File Articles of Organization</h3>
                    <p className="text-gray-700 mt-2">The Articles of Organization is the founding document that formally registers your LLC with the state. Most states accept online filings. Processing times range from same-day (with an expedited fee) to one or two weeks, depending on the state. Once the state approves this filing, your LLC legally exists.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 4: Obtain an EIN</h3>
                    <p className="text-gray-700 mt-2">An EIN (Employer Identification Number) is a tax identification number for your LLC, issued by the IRS. You need it to open a bank account, file tax returns, and enter into contracts. Non-residents without an SSN cannot apply online. The application must be submitted by mail or fax using Form SS-4, and processing typically takes four to six weeks. Without an EIN, your LLC exists on paper but cannot operate commercially in the United States.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 5: Draft an Operating Agreement</h3>
                    <p className="text-gray-700 mt-2">An Operating Agreement is the internal governance document of your LLC. It defines ownership percentages, profit distribution, and decision-making procedures. Not every state requires one by law, but in practice it is indispensable. Banks request it when opening an account, and it provides protection in disputes between members.</p>
                    <p className="text-gray-700 mt-2">Most US banks request a copy of the Operating Agreement when opening a business account. Even for single-member LLCs, banks use this document to verify who is authorized to act on behalf of the entity and how it is managed. An LLC without an Operating Agreement may face significant delays or outright rejection during the account opening process.</p>
                    <p className="text-sm text-gray-600 mt-3">
                      For related contract templates your LLC may need, see the <Link href={`/${lang}/contracts/service-agreement`} className="text-blue-600 hover:underline">Service Agreement</Link> and <Link href={`/${lang}/contracts/nda`} className="text-blue-600 hover:underline">Non-Disclosure Agreement</Link> template pages.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 6: Open a US Bank Account</h3>
                    <p className="text-gray-700 mt-2">For non-residents, this is often the most difficult step. Traditional US banks generally require an in-person visit to a branch. A smaller number of banks and fintech platforms accept remote applications from foreign LLC owners, though their requirements and approval rates change frequently. Prepare your EIN confirmation letter, Articles of Organization, and Operating Agreement before applying — having these documents ready streamlines the process.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Step 7: Maintain Compliance</h3>
                    <p className="text-gray-700 mt-2">Forming an LLC is not a one-time event. Most states require annual reports and charge ongoing fees or franchise taxes. At the federal level, you may need to file informational tax returns even if your LLC earned no US-source income. The Corporate Transparency Act also requires most LLCs to submit Beneficial Ownership Information (BOI) reports to FinCEN. Failure to meet these obligations can result in penalties or administrative dissolution. Ongoing compliance preserves your LLC&apos;s legal standing. Neglecting it directly jeopardizes the limited liability protection that was the reason for forming the entity.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">Aşağıdaki her adım bir öncekinin üzerine inşa edilir. Önce eyalet seçilir; çünkü registered agent kuruluş eyaletinde fiziksel olarak bulunmak zorundadır. Articles of Organization EIN başvurusundan önce sunulur; zira IRS tüzel kişiliğin hukuken var olduğuna dair belge talep eder. Bankalar ise hesap açmak için genellikle hem EIN hem de Operating Agreement ister. Bu sıralama sürecin hukuki ve pratik bağımlılıklarını yansıtır.</p>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 1: Eyalet Seçimi</h3>
                    <p className="text-gray-700 mt-2">Delaware ve Wyoming, iş dostu yasaları ve gizlilik korumaları nedeniyle popülerdir. Ancak işinizi ağırlıklı olarak tek bir eyalette yürütecekseniz, orada kurmak daha pratik olabilir. Her eyaletin farklı harç ve gereksinimleri vardır.</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                      <li>Delaware: $90 kuruluş harcı, yıllık en az $300 franchise vergisi</li>
                      <li>Wyoming: $100 kuruluş harcı, yıllık $60 rapor ücreti</li>
                      <li>New Mexico: $50 kuruluş harcı, yıllık rapor zorunluluğu yok</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 2: Registered Agent Atama</h3>
                    <p className="text-gray-700 mt-2">Her LLC, kuruluş eyaletinde fiziksel adresi bulunan bir registered agent atamak zorundadır. Registered agent, LLC adına resmî ve hukuki bildirimleri kabul eden yetkili kişidir. Profesyonel registered agent hizmetleri genellikle yıllık 50–300 USD arasında ücretlendirilir.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 3: Articles of Organization Başvurusu</h3>
                    <p className="text-gray-700 mt-2">Articles of Organization, LLC&apos;nizi eyalet nezdinde resmî olarak tescil eden kuruluş belgesidir. Çoğu eyalet çevrimiçi başvuru kabul eder. İşlem süreleri ek ücretle aynı gün onaydan bir ila iki haftaya kadar değişebilir. Eyalet bu başvuruyu onayladığında LLC&apos;niz hukuken var olmuş sayılır.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 4: EIN Alma</h3>
                    <p className="text-gray-700 mt-2">EIN (Employer Identification Number), IRS tarafından LLC&apos;nize verilen vergi kimlik numarasıdır. Banka hesabı açmak, vergi beyannamesi vermek ve sözleşme imzalamak için gereklidir. SSN&apos;si olmayan yabancılar çevrimiçi başvuru yapamaz. SS-4 formu posta veya faks yoluyla gönderilmelidir; işlem süresi genellikle dört ila altı haftadır. EIN olmadan LLC&apos;niz kâğıt üzerinde var olur ancak ABD&apos;de ticari olarak faaliyet gösteremez.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 5: Operating Agreement Hazırlama</h3>
                    <p className="text-gray-700 mt-2">Operating Agreement, LLC&apos;nizin iç yönetim belgesidir. Ortaklık paylarını, kâr dağılımını ve karar alma süreçlerini düzenler. Her eyalet bunu yasal olarak zorunlu kılmasa da pratikte vazgeçilmezdir. Bankalar hesap açarken bu belgeyi ister ve üyeler arasındaki anlaşmazlıklarda koruma sağlar.</p>
                    <p className="text-gray-700 mt-2">ABD&apos;deki bankaların büyük çoğunluğu iş hesabı açılışında Operating Agreement&apos;ın bir kopyasını talep eder. Tek üyeli LLC&apos;lerde dahi bankalar, hesap üzerinde kimin yetkili olduğunu ve LLC&apos;nin nasıl yönetildiğini bu belge aracılığıyla doğrular. Operating Agreement bulunmayan LLC&apos;ler hesap açma sürecinde ciddi gecikmeler yaşayabilir veya başvurularının reddedilmesiyle karşılaşabilir.</p>
                    <p className="text-sm text-gray-600 mt-3">
                      LLC&apos;nizin ihtiyaç duyabileceği ilgili sözleşme şablonları için <Link href={`/${lang}/contracts/service-agreement`} className="text-blue-600 hover:underline">Hizmet Sözleşmesi</Link> ve <Link href={`/${lang}/contracts/nda`} className="text-blue-600 hover:underline">Gizlilik Sözleşmesi</Link> şablon sayfalarına bakabilirsiniz.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 6: ABD Banka Hesabı Açma</h3>
                    <p className="text-gray-700 mt-2">ABD dışından kuruluş yapanlar için genellikle sürecin en zorlu adımı budur. Geleneksel ABD bankaları büyük çoğunlukla şubeye şahsen gitmenizi ister. Daha az sayıda banka ve fintek platformu yabancı LLC sahiplerinden uzaktan başvuru kabul eder; ancak koşulları ve onay oranları sık değişir. Başvuruya başlamadan önce EIN onay mektubunuzu, Articles of Organization belgenizi ve Operating Agreement&apos;ınızı hazır bulundurun — bu belgeler süreci önemli ölçüde kolaylaştırır.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-black">Adım 7: Uyumu Sürdürme</h3>
                    <p className="text-gray-700 mt-2">LLC kurmak tek seferlik bir işlem değildir. Çoğu eyalet yıllık rapor ve süregelen harç veya franchise vergisi talep eder. Federal düzeyde, LLC&apos;niz ABD kaynaklı gelir elde etmemiş olsa bile bilgi amaçlı vergi beyannamesi vermeniz gerekebilir. Corporate Transparency Act kapsamında çoğu LLC&apos;nin FinCEN&apos;e Beneficial Ownership Information (BOI) bildirimi yapması da zorunludur. Bu yükümlülüklerin yerine getirilmemesi cezalara veya idari feshe yol açabilir. Süregelen uyum, LLC&apos;nizin hukuki varlığını koruyan unsurdur. İhmal edilmesi, kuruluş amacınız olan sınırlı sorumluluk korumasını doğrudan tehlikeye atar.</p>
                  </div>
                </div>
              )}
            </section>

            {/* Section 4: Sık Yapılan Hatalar */}
            <section id="sik-yapilan-hatalar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '4. Common Mistakes' : '4. Sık Yapılan Hatalar'}
              </h2>

              {isEnglish ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;LLC means no taxes&quot;</h3>
                    <p className="text-gray-700 text-sm">False. An LLC is a legal structure, not a tax exemption. Depending on your circumstances, you may owe US federal taxes, state taxes, and taxes in your country of residence.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;I can use a nominee to hide ownership&quot;</h3>
                    <p className="text-gray-700 text-sm">The Corporate Transparency Act now requires disclosure of beneficial owners to FinCEN. Using nominees to conceal true ownership may result in civil and criminal penalties.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;Delaware is always the best choice&quot;</h3>
                    <p className="text-gray-700 text-sm">Delaware has advantages for certain situations (venture-backed startups, complex corporate structures). For a simple single-member LLC with no US operations, other states may be more cost-effective.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;I don&apos;t need to file anything if I have no income&quot;</h3>
                    <p className="text-gray-700 text-sm">Even with zero income, you may have filing obligations (state annual reports, BOI reporting, informational tax returns). Failure to file can result in penalties or administrative dissolution.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">Confusing sales tax with income tax</h3>
                    <p className="text-gray-700 text-sm">Sales tax is a separate obligation from income tax. If you sell taxable goods or services to customers in certain states, you may need to collect and remit sales tax — even without a physical presence there.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;LLC kurunca vergi yok&quot;</h3>
                    <p className="text-gray-700 text-sm">Yanlış. LLC bir hukuki yapıdır, vergi muafiyeti değildir. Koşullarınıza bağlı olarak ABD federal vergisi, eyalet vergisi ve ikamet ettiğiniz ülkede vergi borcunuz doğabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;Nominee kullanarak sahipliği gizleyebilirim&quot;</h3>
                    <p className="text-gray-700 text-sm">Corporate Transparency Act artık gerçek faydalanıcı sahiplerin FinCEN&apos;e bildirilmesini zorunlu kılmaktadır. Gerçek sahipliği gizlemek için nominee kullanmak hukuki ve cezai yaptırımlara yol açabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;Delaware her zaman en iyi seçim&quot;</h3>
                    <p className="text-gray-700 text-sm">Delaware belirli durumlar için avantajlıdır (risk sermayesi destekli girişimler, karmaşık şirket yapıları). ABD operasyonu olmayan basit bir tek üyeli LLC için diğer eyaletler daha uygun maliyetli olabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">&quot;Gelirim yoksa beyanname vermeme gerek yok&quot;</h3>
                    <p className="text-gray-700 text-sm">Sıfır geliriniz olsa bile beyanname yükümlülükleriniz olabilir (eyalet yıllık raporları, BOI bildirimi, bilgi amaçlı vergi beyannameleri). Beyanname vermemek cezalara veya LLC&apos;nin idari feshedilmesine yol açabilir.</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-bold text-black mb-2">Satış vergisini gelir vergisiyle karıştırmak</h3>
                    <p className="text-gray-700 text-sm">Satış vergisi (sales tax), gelir vergisinden ayrı bir yükümlülüktür. Belirli eyaletlerdeki müşterilere vergilendirilebilir mal veya hizmet satıyorsanız, orada fiziksel varlığınız olmasa bile satış vergisi toplamanız ve ödemeniz gerekebilir.</p>
                  </div>
                </div>
              )}
            </section>

            {/* Section 5: Belgeler Kontrol Listesi */}
            <section id="belgeler-kontrol-listesi" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '5. Document Checklist' : '5. Belgeler Kontrol Listesi'}
              </h2>

              <div className="bg-blue-50 rounded-lg p-6">
                <ul className="space-y-3">
                  {(isEnglish ? [
                    'Passport copy (for identity verification)',
                    'Proof of address (utility bill, bank statement)',
                    'Articles of Organization (filed with state)',
                    'EIN confirmation letter (IRS)',
                    'Operating Agreement',
                    'Registered Agent agreement',
                    'Bank account opening documents',
                    'BOI report confirmation (FinCEN)',
                  ] : [
                    'Pasaport kopyası (kimlik doğrulama için)',
                    'Adres belgesi (fatura, banka ekstresi)',
                    'Articles of Organization (eyalete sunulan)',
                    'EIN onay mektubu (IRS)',
                    'Operating Agreement',
                    'Registered Agent sözleşmesi',
                    'Banka hesabı açılış belgeleri',
                    'BOI raporu onayı (FinCEN)',
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-0.5">[ ]</span>
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 6: Süre ve Maliyet */}
            <section id="sure-ve-maliyet" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Timeline & Costs' : '6. Süre ve Maliyet'}
              </h2>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-900">
                  {isEnglish
                    ? 'These are estimates only. Actual costs and timelines vary by state and service provider. Verify current fees with official sources.'
                    : 'Bunlar yalnızca tahmindir. Gerçek maliyetler ve süreler eyalete ve hizmet sağlayıcıya göre değişir. Güncel harçları resmi kaynaklardan doğrulayın.'}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{isEnglish ? 'Item' : 'Kalem'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{isEnglish ? 'Cost Range' : 'Maliyet Aralığı'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{isEnglish ? 'Timeline' : 'Süre'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isEnglish ? [
                      ['State filing fee', '$50 – $500', '1 day – 2 weeks'],
                      ['Registered agent (annual)', '$50 – $300', 'Immediate'],
                      ['EIN application', 'Free', '4 – 6 weeks (by mail)'],
                      ['Operating Agreement (template)', '$0 – $200', '1 – 3 days'],
                      ['Bank account', '$0 – $30/month', '1 – 4 weeks'],
                      ['Annual state fees', '$0 – $800+', 'Annual'],
                      ['BOI filing', 'Free', 'Must file within 90 days of formation'],
                    ] : [
                      ['Eyalet kuruluş harcı', '$50 – $500', '1 gün – 2 hafta'],
                      ['Registered agent (yıllık)', '$50 – $300', 'Anında'],
                      ['EIN başvurusu', 'Ücretsiz', '4 – 6 hafta (posta ile)'],
                      ['Operating Agreement (şablon)', '$0 – $200', '1 – 3 gün'],
                      ['Banka hesabı', '$0 – $30/ay', '1 – 4 hafta'],
                      ['Yıllık eyalet harçları', '$0 – $800+', 'Yıllık'],
                      ['BOI bildirimi', 'Ücretsiz', 'Kuruluştan itibaren 90 gün içinde'],
                    ]).map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-3">{row[0]}</td>
                        <td className="border border-gray-200 px-4 py-3">{row[1]}</td>
                        <td className="border border-gray-200 px-4 py-3">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                {isEnglish
                  ? 'Total initial setup: approximately $200 – $1,000+ depending on state and services used.'
                  : 'Toplam başlangıç maliyeti: eyalet ve kullanılan hizmetlere bağlı olarak yaklaşık $200 – $1.000+.'}
              </p>
            </section>

            {/* Section 7: SSS */}
            <section id="sss" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. Frequently Asked Questions' : '7. Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    q: 'Can I form an LLC without visiting the US?',
                    a: 'Yes. LLC formation can be done entirely remotely. However, opening a bank account may require an in-person visit depending on the bank.'
                  },
                  {
                    q: 'Do I need a US address?',
                    a: 'You need a registered agent with a US address in your formation state. You do not need to personally have a US address, though some banks may require one.'
                  },
                  {
                    q: 'Which state should I choose?',
                    a: 'It depends on your business activities, where your customers are, and your budget. Wyoming and New Mexico are often cost-effective for non-residents with no US operations. Consult a professional for your specific situation.'
                  },
                  {
                    q: 'Will forming an LLC help me get a visa?',
                    a: 'No. LLC formation provides no immigration benefit. Visas require separate applications with specific eligibility requirements.'
                  },
                  {
                    q: 'Do I need to pay US taxes if I have no US income?',
                    a: 'You may still have filing obligations even with no income. Additionally, some states charge annual fees or franchise taxes regardless of income.'
                  },
                  {
                    q: 'What is BOI reporting?',
                    a: 'Beneficial Ownership Information reporting is a new federal requirement under the Corporate Transparency Act. Most LLCs must report their beneficial owners to FinCEN within 90 days of formation.'
                  },
                  {
                    q: 'Can I use my LLC for Stripe, PayPal, or Amazon?',
                    a: 'Generally yes, but each platform has its own verification requirements. Having an EIN and US bank account typically helps with onboarding.'
                  },
                ] : [
                  {
                    q: 'ABD\'ye gitmeden LLC kurabilir miyim?',
                    a: 'Evet. LLC kuruluşu tamamen uzaktan yapılabilir. Ancak banka hesabı açma, bankaya bağlı olarak şahsi ziyaret gerektirebilir.'
                  },
                  {
                    q: 'ABD adresi gerekli mi?',
                    a: 'Kuruluş eyaletinizde ABD adresine sahip bir registered agent gereklidir. Şahsen ABD adresinizin olması gerekmez, ancak bazı bankalar isteyebilir.'
                  },
                  {
                    q: 'Hangi eyaleti seçmeliyim?',
                    a: 'İş faaliyetlerinize, müşterilerinizin bulunduğu yere ve bütçenize bağlıdır. Wyoming ve New Mexico genellikle ABD operasyonu olmayan yabancılar için uygun maliyetlidir. Kendi durumunuz için bir uzmana danışın.'
                  },
                  {
                    q: 'LLC kurmak vize almama yardımcı olur mu?',
                    a: 'Hayır. LLC kurmak hiçbir göçmenlik avantajı sağlamaz. Vizeler, belirli uygunluk gereksinimleri olan ayrı başvurular gerektirir.'
                  },
                  {
                    q: 'ABD gelirim yoksa vergi ödemem gerekir mi?',
                    a: 'Geliriniz olmasa bile beyanname yükümlülükleriniz olabilir. Ayrıca bazı eyaletler gelirden bağımsız olarak yıllık harç veya franchise vergisi alır.'
                  },
                  {
                    q: 'BOI bildirimi nedir?',
                    a: 'Beneficial Ownership Information (Gerçek Faydalanıcı Bilgisi) bildirimi, Corporate Transparency Act kapsamında yeni bir federal gerekliliktir. Çoğu LLC, kuruluştan itibaren 90 gün içinde gerçek faydalanıcılarını FinCEN\'e bildirmelidir.'
                  },
                  {
                    q: 'LLC\'mi Stripe, PayPal veya Amazon için kullanabilir miyim?',
                    a: 'Genellikle evet, ancak her platformun kendi doğrulama gereksinimleri vardır. EIN ve ABD banka hesabı olması genellikle kayıt sürecinde yardımcı olur.'
                  },
                ]).map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4">
                      <h3 className="font-semibold text-black">{faq.q}</h3>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-gray-700 text-sm">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8: Kaynaklar */}
            <section id="kaynaklar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '8. Sources & Official Links' : '8. Kaynaklar ve Resmi Bağlantılar'}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – EIN Application
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Official EIN application information' : 'Resmi EIN başvuru bilgileri'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.fincen.gov/boi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      FinCEN – Beneficial Ownership Information
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'BOI reporting requirements and filing' : 'BOI bildirim gereksinimleri ve başvuru'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://corp.delaware.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      Delaware Division of Corporations
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Delaware business formation' : 'Delaware iş kuruluşu'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://sos.wyo.gov/Business/StartBusiness.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      Wyoming Secretary of State
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Wyoming business formation' : 'Wyoming iş kuruluşu'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/individuals/international-taxpayers/tax-treaties" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Tax Treaties
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Including US-Turkey tax treaty' : 'ABD-Türkiye vergi anlaşması dahil'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* References */}
            <section className="mb-10">
              <h2 className="text-lg font-bold text-black mb-3">
                {isEnglish ? 'References' : 'Referanslar'}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed">
                <li>{isEnglish ? 'Applicable state limited liability company statutes (e.g., Delaware LLC Act, Wyoming LLC Act, New Mexico LLC Act)' : 'İlgili eyalet limited şirket (LLC) mevzuatı (ör. Delaware LLC Yasası, Wyoming LLC Yasası, New Mexico LLC Yasası)'}</li>
                <li>{isEnglish ? 'Internal Revenue Code and Treasury Regulations governing entity classification (commonly referred to as the \'check-the-box\' regulations)' : 'İç Gelir Kanunu ve tüzel kişilik sınıflandırmasını düzenleyen Hazine Tüzükleri (yaygın olarak \'check-the-box\' düzenlemeleri olarak anılır)'}</li>
                <li>{isEnglish ? 'IRS authority and guidance on EIN issuance and taxpayer identification' : 'IRS\'nin EIN verilmesi ve vergi mükellefi kimliği konusundaki yetki ve rehberliği'}</li>
                <li>{isEnglish ? 'FinCEN Beneficial Ownership Information reporting requirements under the Corporate Transparency Act' : 'Kurumsal Şeffaflık Yasası kapsamında FinCEN Gerçek Lehdar Bilgileri raporlama gereksinimleri'}</li>
                <li>{isEnglish ? 'Federal immigration law (distinguishing entity formation from immigration status)' : 'Federal göçmenlik hukuku (tüzel kişilik kuruluşunun göçmenlik statüsünden ayrımı)'}</li>
              </ul>
            </section>

            {/* Sections 9–12: Judicial Interpretation Framework */}
            <JudicialAuthoritySection
              lang={isEnglish ? 'en' : 'tr'}
              id="judicial-authority"
              title={{
                en: 'Judicial Interpretation Framework',
                tr: 'Yargısal Yorum Çerçevesi',
              }}
              version="v1.0"
              lastReviewed="2026-02-19"
              reviewStatus="foundational"
            >
              <JudicialInterpretation
                lang={isEnglish ? 'en' : 'tr'}
                entries={judicialEntries}
                conflictNotes={conflictNotes}
                resolves={resolves}
                doesNotResolve={doesNotResolve}
                sectionNumber="9"
              />

              <ConflictPrecedence
                lang={isEnglish ? 'en' : 'tr'}
                caseIllustrations={caseIllustrations}
                unresolvedItems={unresolvedItems}
                sectionNumber="11"
              />

              {/* Conflict Resolution Principle */}
              <div className="border border-gray-200 rounded-lg px-5 py-4 mt-8">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  {isEnglish ? 'Conflict Resolution Principle' : 'Çatışma Çözüm İlkesi'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {isEnglish
                    ? 'In cases of normative conflict, binding statutory authority prevails over subordinate regulations. Regulations prevail over agency guidance. Judicial interpretation applies where statutory ambiguity exists. On matters governed by federal law, state provisions cannot override federal supremacy.'
                    : 'Normatif çatışma durumlarında bağlayıcı yasal otorite alt düzey yönetmeliklere üstün gelir. Yönetmelikler kurum rehberliğine üstün gelir. Yargısal yorum yasal belirsizliğin bulunduğu durumlarda uygulanır. Federal hukuk tarafından düzenlenen konularda eyalet hükümleri federal üstünlüğü geçersiz kılamaz.'}
                </p>
              </div>
            </JudicialAuthoritySection>

            <PrimarySources sources={primarySources} lang={isEnglish ? 'en' : 'tr'} />

            {/* Related Legal Entries */}
            <section className="mb-12">
              <h2 className="text-lg font-bold text-black mb-3">
                {isEnglish ? 'Related Legal Entries' : 'İlgili Hukuki Maddeler'}
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/${lang}/llc-mi-corporation-mi`} className="text-blue-600 hover:underline">
                    {isEnglish ? 'LLC vs. Corporation: Legal Structure Comparison' : 'LLC mi Corporation mı: Hukuki Yapı Karşılaştırması'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="text-blue-600 hover:underline">
                    {isEnglish ? 'IRS, Tax Obligations, and W-8BEN / W-9 Realities' : 'IRS, Vergi Yükümlülükleri ve W-8BEN / W-9 Gerçekleri'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/abdde-banka-hesabi-acmak`} className="text-blue-600 hover:underline">
                    {isEnglish ? 'Opening a U.S. Bank Account' : 'ABD\'de Banka Hesabı Açmak'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/ein-itin-ssn-farki`} className="text-blue-600 hover:underline">
                    {isEnglish ? 'EIN, ITIN, and SSN: Tax Identification Numbers' : 'EIN, ITIN ve SSN: Vergi Kimlik Numaraları'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`} className="text-blue-600 hover:underline">
                    {isEnglish ? 'Essential Contracts for U.S. Business Operations' : 'ABD\'de İş Operasyonları İçin Temel Sözleşmeler'}
                  </Link>
                </li>
              </ul>
            </section>

            {/* Related Resources */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`/${lang}/abdde-is-yapan-turkler-icin-sozlesmeler`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Common legal documents for US business' : 'ABD\'de iş için gerekli hukuki belgeler'}</p>
                </Link>
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'IRS & Tax Realities' : 'IRS ve Vergi Gerçekleri'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'W-8, W-9, and tax obligations' : 'W-8, W-9 ve vergi yükümlülükleri'}</p>
                </Link>
                <Link href={`/${lang}/legal-kits/business-starter`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-amber-50 border-amber-200">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'Business Starter Kit' : 'Business Starter Kit'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? '5 essential contract templates in one bundle' : 'Tek pakette 5 temel sözleşme şablonu'}</p>
                </Link>
                <Link href={`/${lang}/ein-itin-ssn-farki`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-black mb-1">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Tax ID numbers explained' : 'Vergi kimlik numaraları açıklandı'}</p>
                </Link>
              </div>
            </section>

            {/* Author Box */}
            <section className="border border-gray-200 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-3">{isEnglish ? 'Author' : 'Yazar'}</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xl">
                  EL
                </div>
                <div>
                  <h3 className="font-semibold text-black">EchoLegal</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {isEnglish ? 'Content reviewed by a New York-licensed attorney' : 'İçerik New York lisanslı bir avukat tarafından incelenmektedir'}
                  </p>
                </div>
              </div>
            </section>

            {/* Targeted FAQ for search intent */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">
                {isEnglish ? 'Frequently Asked Questions (for Turkish Nationals)' : 'Sık Sorulan Sorular (Türkler için)'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-black mb-2">
                    {isEnglish
                      ? 'Do I need to live in the US to form an LLC?'
                      : 'ABD\'de LLC kurmak için ABD\'de yaşamak gerekir mi?'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {isEnglish
                      ? 'No. US state law does not require LLC owners to be US residents or citizens. Formation can be completed entirely from abroad through a registered agent in the chosen state. However, certain post-formation steps — particularly opening a US bank account — may require physical presence depending on the institution.'
                      : 'Hayır. ABD eyalet hukuku, LLC sahiplerinin ABD\'de ikamet etmesini veya vatandaş olmasını şart koşmaz. Kuruluş, seçilen eyaletteki bir registered agent aracılığıyla tamamen yurt dışından tamamlanabilir. Ancak kuruluş sonrası bazı adımlar — özellikle ABD banka hesabı açma — kuruma bağlı olarak fiziksel varlık gerektirebilir.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">
                    {isEnglish
                      ? 'Can I form an LLC without opening a US bank account?'
                      : 'ABD\'de banka hesabı açmadan LLC kurulabilir mi?'}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {isEnglish
                      ? 'Yes. A bank account is not a legal prerequisite for LLC formation. The LLC becomes a legal entity upon state approval of the Articles of Organization. That said, operating without a US bank account limits your ability to receive payments, pay taxes, and use most US-based financial platforms.'
                      : 'Evet. Banka hesabı, LLC kuruluşu için yasal bir ön koşul değildir. LLC, Articles of Organization\'ın eyalet tarafından onaylanmasıyla tüzel kişilik kazanır. Bununla birlikte, ABD banka hesabı olmadan faaliyet göstermek ödeme alma, vergi ödeme ve ABD merkezli finansal platformları kullanma imkanınızı önemli ölçüde kısıtlar.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Legal Kit Reference */}
            <div className="border border-gray-200 rounded-lg p-8 mb-10">
              <h2 className="text-xl font-bold text-black mb-3">ABD Business Starter Legal Kit</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'Three legal document templates — Operating Agreement, Service Agreement, and NDA — prepared for Turkish entrepreneurs forming a US-based LLC. Each document is drafted in both English and Turkish, reflecting standard US commercial practice.'
                  : 'Operating Agreement, Hizmet Sözleşmesi ve NDA — ABD merkezli LLC kuran Türk girişimciler için hazırlanmış üç temel hukuki belge şablonu. Her belge, standart ABD ticari uygulamalarını yansıtacak şekilde hem İngilizce hem Türkçe olarak hazırlanmıştır.'}
              </p>
              <p className="text-sm text-gray-500 mb-5">
                {isEnglish
                  ? '$49 — one-time purchase'
                  : '$49 — tek seferlik ödeme'}
              </p>
              <Link href={`/${lang}/legal-kits/business-starter`} className="inline-block px-5 py-2.5 border border-black text-sm font-medium text-black rounded hover:bg-gray-50 transition-colors">
                {isEnglish ? 'Access the Legal Kit' : 'Legal Kit\'e Eriş'}
              </Link>
            </div>

            {/* Cite This Entry */}
            <CiteThisEntry
              lang={lang}
              title={pageTitle}
              url={pageUrl}
              dateModified={PAGE_META.dateModified}
              version={PAGE_META.version}
              citationKey={PAGE_META.citationKey}
              contentType="jurisdictional-guide"
              className="mb-8"
            />

            {/* Final Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute legal, tax, or immigration advice. Laws and regulations change frequently. Consult qualified professionals for advice specific to your situation. EchoLegal is not a law firm and does not provide legal representation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; hukuki, vergisel veya göçmenlik danışmanlığı teşkil etmez. Yasalar ve düzenlemeler sık sık değişmektedir. Kendi durumunuza özgü tavsiye için uzman profesyonellere danışın. EchoLegal bir hukuk bürosu değildir ve hukuki temsil sağlamamaktadır.'}
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
