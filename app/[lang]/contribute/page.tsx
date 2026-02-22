// app/[lang]/contribute/page.tsx
// Contributor framework page for licensed attorneys
// Describes how to contribute to EchoLegal's public legal reference library

import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { PrimaryAuthorAttribution } from '@/components/ContributorAttribution'
import ContributorApplicationForm from '@/components/ContributorApplicationForm'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Contribute to EchoLegal | Contributor Framework'
    : 'EchoLegal\'a Katkıda Bulunun | Katkıda Bulunan Çerçevesi'

  const description = isEnglish
    ? 'Licensed attorneys may apply to contribute jurisdiction-specific entries to the EchoLegal encyclopedia system. Eligibility requirements, editorial standards, and submission procedures.'
    : 'Lisanslı avukatlar, EchoLegal ansiklopedi sistemine yargı alanına özgü maddeler katkıda bulunmak üzere başvurabilir. Uygunluk gereksinimleri, editöryal standartlar ve sunum prosedürleri.'

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
    alternates: {
      canonical: `https://echo-legal.com/${lang}/contribute`,
      languages: {
        'en': 'https://echo-legal.com/en/contribute',
        'tr': 'https://echo-legal.com/tr/contribute',
        'x-default': 'https://echo-legal.com/en/contribute',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ContributePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-bold text-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/about`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'About' : 'Hakkımızda'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/contribute`}
              className="border border-gray-900 px-3 py-1 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            {isEnglish ? 'Contribute to EchoLegal' : 'EchoLegal\'a Katkıda Bulunma'}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {isEnglish
              ? 'EchoLegal is a public legal reference library. Contributions to this platform constitute scholarly legal reference work, intended for long-term public access by legal professionals, institutions, and researchers.'
              : 'Lisanslı avukatlar, editoryal inceleme ve kimlik doğrulama sürecinden geçerek belirli yargı alanlarına ilişkin maddelere katkıda bulunmak üzere başvurabilir. Kabul edilen katkılar yayımlanan maddelerde açıkça atfedilir; doğrulanmış kimlik ve mesleki bilgiler (uygun olduğu ölçüde) bu sayfada listelenir.'}
          </p>
          {!isEnglish && (
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              {'Uygunluk kriterleri ve sunum prosedürü, '}
              <Link href={`/${lang}/about/contributor-standards`} className="text-gray-900 font-medium hover:underline">
                Katkıda Bulunan Standartları
              </Link>
              {'\'nda açıklanmıştır.'}
            </p>
          )}
        </div>

        {/* Scope and Purpose */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Scope and Purpose' : 'Kapsam ve Amaç'}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'EchoLegal provides structured, jurisdiction-tagged legal reference content designed for long-term citability by professionals, institutions, and automated systems. All entries follow standardized editorial protocols and are assigned persistent citation identifiers.'
                : 'EchoLegal, profesyoneller, kurumlar ve otomatik sistemler tarafından uzun vadeli alıntılanabilirlik için tasarlanmış yapılandırılmış, yargı alanı etiketli hukuk referans içeriği sunar. Tüm girdiler standartlaştırılmış editöryal protokolleri takip eder ve kalıcı atıf tanımlayıcıları atanır.'}
            </p>
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'The encyclopedia currently covers US\u2013Turkey cross-border legal matters. Its architecture is designed to extend to additional jurisdictions and languages as qualified contributors are accepted.'
                : 'Ansiklopedi şu anda ABD-Türkiye sınır ötesi hukuki konuları kapsamaktadır. Altyapısı, nitelikli katkıda bulunanlar kabul edildikçe ek yargı alanlarına ve dillere genişleyecek şekilde tasarlanmıştır.'}
            </p>
          </div>
        </section>

        {/* Contributor Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Contributor Eligibility' : 'Katkıda Bulunan Uygunluk Gereksinimleri'}
          </h2>

          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Licensed Attorneys' : 'Lisanslı Avukatlar'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {isEnglish
                  ? 'Contributions are accepted only from attorneys with active bar membership in a recognized jurisdiction. Credentials are verified prior to any publication.'
                  : 'Katkılar yalnızca tanınmış bir yargı alanında aktif baro üyeliğine sahip avukatlardan kabul edilir. Kimlik bilgileri herhangi bir yayından önce doğrulanır.'}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Jurisdictional and Subject Matter Expertise' : 'Yargı Alanı ve Konu Uzmanlığı'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {isEnglish
                  ? 'Demonstrated expertise in specific practice areas and jurisdictions is required. Contributors are expected to write within their areas of active practice and jurisdictional competence.'
                  : 'Belirli uygulama alanlarında ve yargı alanlarında kanıtlanmış uzmanlık gereklidir. Katkıda bulunanların aktif uygulama ve yargı yetkinlikleri dahilinde yazmaları beklenir.'}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Reference-Grade Writing' : 'Referans Düzeyinde Yazım'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {isEnglish
                  ? 'All submissions must conform to a neutral, declarative, citation-ready writing standard. Content is structured for doctrinal reference, not commentary or advocacy.'
                  : 'Tüm gönderimler tarafsız, beyan edici, alıntıya hazır bir yazım standardına uygun olmalıdır. İçerik yorum veya savunuculuk için değil, doktriner referans için yapılandırılmıştır.'}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Native Language Content' : 'Ana Dil İçeriği'}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {isEnglish
                  ? 'Content authored by native speakers with command of legal terminology in their language is given priority. Accuracy of jurisdiction-specific terminology is required.'
                  : 'Kendi dillerinde hukuki terminolojiye hakim anadili konuşanlar tarafından yazılan içerik önceliklidir. Yargı alanına özgü terminolojinin doğruluğu gereklidir.'}
              </p>
            </div>
          </div>
        </section>

        {/* Content Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Types of Contributions' : 'Katkı Türleri'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Encyclopedic Articles' : 'Ansiklopedik Makaleler'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Comprehensive reference articles on legal topics, structured with overview, legal framework, practical implications, and compliance notes.'
                  : 'Hukuki konular hakkında kapsamlı referans makaleleri; genel bakış, hukuki çerçeve, pratik sonuçlar ve uyum notları ile yapılandırılmış.'}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Supplementary document templates with clause annotations. Must be jurisdiction-tagged and classified separately from primary legal sources.'
                  : 'Madde açıklamalarıyla tamamlayıcı belge şablonları. Yargı alanı etiketli olmalı ve birincil hukuk kaynaklarından ayrı olarak sınıflandırılmalıdır.'}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Checklists & Procedural References' : 'Kontrol Listeleri ve Prosedürel Referanslar'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Structured procedural references for compliance, filing requirements, and document preparation.'
                  : 'Uyum, dosyalama gereksinimleri ve belge hazırlama için yapılandırılmış prosedürel referanslar.'}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Review & Updates' : 'İnceleme ve Güncellemeler'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Reviewing existing content for accuracy, updating outdated information, and noting jurisdiction-specific variations.'
                  : 'Mevcut içeriği doğruluk açısından inceleme, güncel olmayan bilgileri güncelleme ve yargı alanına özgü farklılıkları not etme.'}
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Editorial Standards' : 'Editöryal Standartlar'}
          </h2>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5">✓</span>
              <p>
                <strong>{isEnglish ? 'Primary Sources:' : 'Birincil Kaynaklar:'}</strong>{' '}
                {isEnglish
                  ? 'All claims must be traceable to statutes, regulations, or official government sources.'
                  : 'Tüm iddialar kanunlara, düzenlemelere veya resmi devlet kaynaklarına kadar izlenebilir olmalıdır.'}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5">✓</span>
              <p>
                <strong>{isEnglish ? 'Neutral Doctrinal Tone:' : 'Tarafsız Doktriner Ton:'}</strong>{' '}
                {isEnglish
                  ? 'Content must employ a neutral, doctrinal tone. Advocacy, commentary, and promotional language are not permitted.'
                  : 'İçerik tarafsız, doktriner bir ton kullanmalıdır. Savunuculuk, yorum ve tanıtım diline izin verilmez.'}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5">✓</span>
              <p>
                <strong>{isEnglish ? 'Jurisdiction Tagging:' : 'Yargı Alanı Etiketleme:'}</strong>{' '}
                {isEnglish
                  ? 'Every piece of content must specify the jurisdiction(s) it applies to.'
                  : 'Her içerik parçası, geçerli olduğu yargı alanlarını belirtmelidir.'}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5">✓</span>
              <p>
                <strong>{isEnglish ? 'Citation-Ready Structure:' : 'Alıntıya Hazır Yapı:'}</strong>{' '}
                {isEnglish
                  ? 'Entries must follow a standardized format suitable for citation in professional and academic contexts. Each entry is assigned a persistent citation identifier.'
                  : 'Girdiler, profesyonel ve akademik bağlamlarda atıf için uygun standartlaştırılmış bir formatı takip etmelidir. Her girdiye kalıcı bir atıf tanımlayıcısı atanır.'}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5">✓</span>
              <p>
                <strong>{isEnglish ? 'Date Tracking:' : 'Tarih Takibi:'}</strong>{' '}
                {isEnglish
                  ? 'All entries carry publication and revision dates. Legal information is time-sensitive; the platform tracks verification currency.'
                  : 'Tüm girdiler yayın ve revizyon tarihleri taşır. Hukuki bilgiler zamana duyarlıdır; platform doğrulama güncelliğini takip eder.'}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5">✓</span>
              <p>
                <strong>{isEnglish ? 'No Legal Advice:' : 'Hukuki Tavsiye Yok:'}</strong>{' '}
                {isEnglish
                  ? 'All entries must include disclaimers that content is for reference purposes and does not constitute legal advice for any specific matter.'
                  : 'Tüm girdiler, içeriğin referans amaçlı olduğunu ve herhangi bir belirli konu için hukuki tavsiye teşkil etmediğini belirten uyarılar içermelidir.'}
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Infrastructure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Editorial Infrastructure' : 'Editöryal Altyapı'}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {isEnglish
              ? 'EchoLegal enforces a machine-verifiable citation standard across all primary source metadata. This infrastructure ensures formatting consistency, authority classification, and cross-reference integrity at the repository level.'
              : 'EchoLegal, tüm birincil kaynak meta verileri genelinde makine tarafından doğrulanabilir bir atıf standardı uygular. Bu altyapı; biçimlendirme tutarlılığını, otorite sınıflandırmasını ve çapraz referans bütünlüğünü depo düzeyinde sağlar.'}
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&bull;</span>
              <span>
                {isEnglish
                  ? 'Citation Canon v2 is the single source of truth for citation formatting in structured metadata fields.'
                  : 'Citation Canon v2, yapılandırılmış meta veri alanlarında atıf biçimlendirmesi için tek doğru kaynaktır.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&bull;</span>
              <span>
                {isEnglish
                  ? 'Authority levels are recorded for each primary source, reflecting its position in the legal hierarchy.'
                  : 'Her birincil kaynak için hukuki hiyerarşideki konumunu yansıtan otorite seviyeleri kaydedilir.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&bull;</span>
              <span>
                {isEnglish
                  ? 'Canonical identifiers are assigned deterministically to enable consistent cross-referencing across entries.'
                  : 'Girdiler arasında tutarlı çapraz referanslamayı sağlamak için kanonik tanımlayıcılar deterministik olarak atanır.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&bull;</span>
              <span>
                {isEnglish
                  ? 'Continuous integration enforces citation tests and strict lint on all pull requests that modify citation data.'
                  : 'Sürekli entegrasyon, atıf verilerini değiştiren tüm pull request\'lerde atıf testlerini ve sıkı lint kontrolünü uygular.'}
              </span>
            </li>
          </ul>
        </section>

        {/* Contributor Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Contributor Process' : 'Katkıda Bulunma Süreci'}
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isEnglish ? 'Expression of Interest' : 'İlgi Beyanı'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isEnglish
                    ? 'Submit your credentials, jurisdictional background, and proposed area of contribution for review.'
                    : 'Kimlik bilgilerinizi, yargı alanı geçmişinizi ve önerilen katkı alanınızı inceleme için gönderin.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isEnglish ? 'Credential Verification' : 'Kimlik Doğrulama'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isEnglish
                    ? 'Bar membership and professional standing are verified before approval.'
                    : 'Onay öncesinde baro üyeliği ve mesleki durum doğrulanır.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isEnglish ? 'Content Submission' : 'İçerik Gönderimi'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isEnglish
                    ? 'Submit content following the editorial guidelines and structural templates provided.'
                    : 'Sağlanan editöryal yönergeleri ve yapısal şablonları takip ederek içerik gönderin.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isEnglish ? 'Editorial Review' : 'Editöryal İnceleme'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isEnglish
                    ? 'Submissions are reviewed for accuracy, tone, structural compliance, and alignment with editorial and classification standards. AuthorityLevel assignment, CanonicalId assignment, and jurisdiction tagging are verified.'
                    : 'Gönderimler doğruluk, ton, yapısal uyum ve editöryal ile sınıflandırma standartlarına uygunluk açısından incelenir. AuthorityLevel ataması, CanonicalId ataması ve yargı alanı etiketlemesi doğrulanır.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isEnglish ? 'Publication & Attribution' : 'Yayın ve Atıf'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isEnglish
                    ? 'Accepted contributions carry named attribution with verified credentials and jurisdiction-specific contributor profile. Publication credit is recorded within the encyclopedia system with citation-ready structured references.'
                    : 'Kabul edilen katkılar, doğrulanmış kimlik bilgileri ve yargı alanına özgü katkıda bulunan profili ile isimli atıf taşır. Yayın kredisi, atıfa hazır yapılandırılmış referanslarla ansiklopedi sistemi içinde kaydedilir.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Editorial Authority */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Current Editorial Authority' : 'Mevcut Editöryal Otorite'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isEnglish
              ? 'All content is currently reviewed under the following editorial authority. The founder\u2019s role is structural — governing classification standards, authority hierarchy, and editorial integrity — not promotional.'
              : 'Tüm içerik şu anda aşağıdaki editöryal otorite altında incelenmektedir. Kurucunun rolü yapısaldır — sınıflandırma standartlarını, otorite hiyerarşisini ve editöryal bütünlüğü yönetir — tanıtım amaçlı değildir.'}
          </p>
          <PrimaryAuthorAttribution lang={lang} variant="full" />
        </section>

        {/* Application Form */}
        <section className="mb-12" id="apply">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isEnglish ? 'Submit an Expression of Interest' : 'İlgi Beyanı Gönderin'}
          </h2>
          <p className="text-gray-600 mb-8">
            {isEnglish
              ? 'Prospective contributors may submit the form below for review. Acceptance is selective and based on jurisdictional expertise, subject matter relevance, and alignment with editorial standards. All fields marked with * are required.'
              : 'Aday katkıda bulunanlar aşağıdaki formu inceleme için gönderebilir. Kabul, yargı alanı uzmanlığı, konu ilgisi ve editöryal standartlarla uyuma dayalı olarak seçicidir. * ile işaretlenmiş tüm alanlar zorunludur.'}
          </p>
          <ContributorApplicationForm lang={lang} />
        </section>

        {/* Closing & Contact */}
        <section className="border-t border-gray-200 pt-10">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {isEnglish
              ? 'All contributions are subject to editorial review prior to publication. Publication within the encyclopedia reflects adherence to editorial and classification standards. It does not constitute an endorsement of the contributor, their practice, or any legal position expressed.'
              : 'Tüm katkılar yayından önce editöryal incelemeye tabidir. Ansiklopedi içindeki yayın, editöryal ve sınıflandırma standartlarına uyumu yansıtır. Katkıda bulunanın, uygulamasının veya ifade edilen herhangi bir hukuki pozisyonun onayını teşkil etmez.'}
          </p>
          <p className="text-gray-600 text-sm text-center">
            {isEnglish
              ? 'For direct inquiries:'
              : 'Doğrudan sorularınız için:'}
          </p>
          <p className="text-center mt-1">
            <a
              href="mailto:contribute@echo-legal.com"
              className="text-gray-900 font-medium hover:underline"
            >
              contribute@echo-legal.com
            </a>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2026 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
