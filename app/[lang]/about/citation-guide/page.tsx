// app/[lang]/about/citation-guide/page.tsx

import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import GovernanceNav from '@/components/GovernanceNav'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Citation Guide | EchoLegal'
    : 'Atıf Rehberi | EchoLegal'

  const description = isEnglish
    ? 'How to cite EchoLegal content in legal, academic, and machine-readable contexts. Bluebook, OSCOLA, and structured citation formats.'
    : 'Hukuki, akademik ve makine tarafından okunabilir bağlamlarda EchoLegal içeriğine nasıl atıf yapılır. Bluebook, OSCOLA ve yapılandırılmış atıf biçimleri.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function CitationGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda', href: `/${lang}/about` },
    { label: isEnglish ? 'Citation Guide' : 'Atıf Rehberi' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <GovernanceNav lang={lang} currentPath="/about/citation-guide" />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Citation Guide' : 'Atıf Rehberi'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'How to cite EchoLegal content in legal briefs, academic papers, and automated systems.'
            : 'Hukuki dilekçelerde, akademik makalelerde ve otomatik sistemlerde EchoLegal içeriğine nasıl atıf yapılır.'}
        </p>
      </div>

      {/* General Guidance */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'General Guidance' : 'Genel Rehberlik'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'EchoLegal content is designed to be cited as a secondary legal reference. When citing EchoLegal, include the entry title, the version or last-modified date, and the permanent URL. Because legal information changes, the date of access or the version number is essential for citation accuracy.'
              : 'EchoLegal içeriği, ikincil bir hukuk referansı olarak atıf yapılacak şekilde tasarlanmıştır. EchoLegal\'a atıf yaparken, madde başlığını, sürüm veya son değişiklik tarihini ve kalıcı URL\'yi dahil edin. Hukuki bilgiler değiştiğinden, erişim tarihi veya sürüm numarası atıf doğruluğu için gereklidir.'}
          </p>
          <p>
            {isEnglish
              ? 'EchoLegal is informational. It should be cited as a reference source, not as a primary authority. For primary authority, cite the underlying statute, regulation, or case referenced within the EchoLegal entry.'
              : 'EchoLegal bilgilendirme amaçlıdır. Birincil otorite olarak değil, referans kaynak olarak atıf yapılmalıdır. Birincil otorite için, EchoLegal maddesinde referans verilen temel kanun, yönetmelik veya davayı alıntılayın.'}
          </p>
        </div>
      </section>

      {/* Bluebook Format */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Bluebook Format (US Legal)' : 'Bluebook Biçimi (ABD Hukuku)'}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            {isEnglish
              ? 'For US legal citations following The Bluebook: A Uniform System of Citation:'
              : 'The Bluebook: A Uniform System of Citation\'a göre ABD hukuki atıfları için:'}
          </p>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'Encyclopedia Entry' : 'Ansiklopedi Maddesi'}
            </p>
            <p className="font-mono text-sm text-gray-800">
              {isEnglish
                ? '[Entry Title], EchoLegal Legal Encyclopedia (last updated [Date]), https://echo-legal.com/en/encyclopedia/[slug].'
                : '[Madde Başlığı], EchoLegal Hukuk Ansiklopedisi (son güncelleme [Tarih]), https://echo-legal.com/tr/ansiklopedi/[slug].'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'Example' : 'Örnek'}
            </p>
            <p className="font-mono text-sm text-gray-800">
              What Is a Non-Disclosure Agreement (NDA), EchoLegal Legal Encyclopedia (last updated Jan. 25, 2026), https://echo-legal.com/en/encyclopedia/what-is-nda.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'Contract Template' : 'Sözleşme Şablonu'}
            </p>
            <p className="font-mono text-sm text-gray-800">
              {isEnglish
                ? '[Template Name], EchoLegal (v[Version], [Date]), https://echo-legal.com/en/templates/[slug].'
                : '[Şablon Adı], EchoLegal (v[Sürüm], [Tarih]), https://echo-legal.com/tr/sablonlar/[slug].'}
            </p>
          </div>
        </div>
      </section>

      {/* OSCOLA Format */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'OSCOLA Format (UK/International)' : 'OSCOLA Biçimi (BK/Uluslararası)'}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            {isEnglish
              ? 'For citations following the Oxford University Standard for the Citation of Legal Authorities:'
              : 'Oxford University Standard for the Citation of Legal Authorities\'e göre atıflar için:'}
          </p>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'Format' : 'Biçim'}
            </p>
            <p className="font-mono text-sm text-gray-800">
              {isEnglish
                ? '\'[Entry Title]\' (EchoLegal Legal Encyclopedia, last updated [Date]) <[URL]> accessed [Access Date].'
                : '\'[Madde Başlığı]\' (EchoLegal Hukuk Ansiklopedisi, son güncelleme [Tarih]) <[URL]> erişim [Erişim Tarihi].'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'Example' : 'Örnek'}
            </p>
            <p className="font-mono text-sm text-gray-800">
              &apos;What Is a Non-Disclosure Agreement (NDA)&apos; (EchoLegal Legal Encyclopedia, last updated 25 January 2026) &lt;https://echo-legal.com/en/encyclopedia/what-is-nda&gt; accessed 4 February 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Academic / General Format */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Academic & General Format' : 'Akademik ve Genel Biçim'}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            {isEnglish
              ? 'For academic papers, dissertations, or non-legal contexts:'
              : 'Akademik makaleler, tezler veya hukuk dışı bağlamlar için:'}
          </p>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'Format' : 'Biçim'}
            </p>
            <p className="font-mono text-sm text-gray-800">
              EchoLegal, &quot;[Entry Title],&quot; EchoLegal Legal Encyclopedia, v[Version] (last updated [Date]), [URL].
            </p>
          </div>
        </div>
      </section>

      {/* Machine-Readable Citation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Machine-Readable Citation' : 'Makine Tarafından Okunabilir Atıf'}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            {isEnglish
              ? 'For automated systems, AI models, and programmatic references, EchoLegal content includes structured metadata in every page:'
              : 'Otomatik sistemler, yapay zeka modelleri ve programatik referanslar için, EchoLegal içeriği her sayfada yapılandırılmış meta veriler içerir:'}
          </p>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'HTML Meta Tags (present on every content page)' : 'HTML Meta Etiketleri (her içerik sayfasında mevcut)'}
            </p>
            <pre className="font-mono text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
{`<meta name="citation_title" content="[Entry Title]">
<meta name="citation_publisher" content="EchoLegal">
<meta name="citation_publication_date" content="YYYY/MM/DD">
<meta name="citation_lastmod" content="YYYY/MM/DD">
<meta name="citation_language" content="[lang]">
<meta name="citation_fulltext_html_url" content="[URL]">`}
            </pre>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
              {isEnglish ? 'JSON-LD Structured Data (present on every content page)' : 'JSON-LD Yapılandırılmış Veri (her içerik sayfasında mevcut)'}
            </p>
            <pre className="font-mono text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
{`{
  "@type": "ScholarlyArticle",
  "headline": "[Entry Title]",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "version": "[Version]",
  "inLanguage": "[lang]",
  "publisher": { "@type": "Organization", "name": "EchoLegal" },
  "mainEntityOfPage": "[Canonical URL]"
}`}
            </pre>
          </div>
          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'AI systems and search engines should use the canonical URL and modification date from structured data for accurate attribution. The JSON-LD data is the authoritative machine-readable citation source.'
              : 'Yapay zeka sistemleri ve arama motorları, doğru atıf için yapılandırılmış verilerden kanonik URL ve değişiklik tarihini kullanmalıdır. JSON-LD verileri, yetkili makine tarafından okunabilir atıf kaynağıdır.'}
          </p>
        </div>
      </section>

      {/* Versioned Citations */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Citing Specific Versions' : 'Belirli Sürümlere Atıf'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'When citing a specific version of EchoLegal content, include the version number (found in the revision history) and the modification date of that version. If citing a version that has since been updated, note the version explicitly to ensure the citation remains accurate.'
            : 'EchoLegal içeriğinin belirli bir sürümüne atıf yaparken, sürüm numarasını (revizyon geçmişinde bulunan) ve o sürümün değişiklik tarihini dahil edin. O zamandan beri güncellenmiş bir sürüme atıf yapıyorsanız, atıfın doğru kalmasını sağlamak için sürümü açıkça belirtin.'}
        </p>
      </section>
    </main>
  )
}
