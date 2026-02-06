// app/[lang]/contribute/page.tsx
// Contributor framework page for licensed attorneys
// Describes how to contribute to EchoLegal's public legal reference library

import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import ContributorApplicationForm from '@/components/ContributorApplicationForm'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Contribute to EchoLegal | For Licensed Attorneys'
      : 'EchoLegal\'a Katkıda Bulunun | Lisanslı Avukatlar İçin',
    description: isEnglish
      ? 'EchoLegal accepts contributions from licensed attorneys for its public legal reference library. Review eligibility requirements, editorial standards, and submission guidelines.'
      : 'EchoLegal, lisanslı avukatlardan kamu hukuk referans kütüphanesi için katkı kabul etmektedir. Uygunluk gereksinimleri, editöryal standartlar ve gönderim yönergeleri.',
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
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
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
            {isEnglish ? 'Contribute to EchoLegal' : 'EchoLegal\'a Katkıda Bulunun'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'EchoLegal is a public legal reference library. Contributions to this platform constitute scholarly legal reference work, intended for long-term public access by legal professionals, institutions, and researchers.'
              : 'EchoLegal, bir kamu hukuk referans kütüphanesidir. Bu platforma yapılan katkılar, hukuk profesyonelleri, kurumlar ve araştırmacılar tarafından uzun vadeli kamusal erişim için tasarlanmış akademik hukuk referans çalışmalarıdır.'}
          </p>
        </div>

        {/* Scope and Purpose */}
        <section className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Scope and Purpose' : 'Kapsam ve Amaç'}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {isEnglish
              ? 'EchoLegal provides structured, jurisdiction-tagged legal reference content designed for long-term citability by professionals, institutions, and automated systems. All entries follow standardized editorial protocols and are assigned persistent citation identifiers.'
              : 'EchoLegal, profesyoneller, kurumlar ve otomatik sistemler tarafından uzun vadeli alıntılanabilirlik için tasarlanmış yapılandırılmış, yargı alanı etiketli hukuk referans içeriği sunar. Tüm girdiler standartlaştırılmış editöryal protokolleri takip eder ve kalıcı atıf tanımlayıcıları atanır.'}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {isEnglish
              ? 'The platform currently covers US\u2013Turkey cross-border legal matters. Its architecture is designed to scale to additional jurisdictions and languages as qualified contributors are accepted.'
              : 'Platform şu anda ABD-Türkiye sınır ötesi hukuki konuları kapsamaktadır. Altyapısı, nitelikli katkıda bulunanlar kabul edildikçe ek yargı alanlarına ve dillere ölçeklenebilir olarak tasarlanmıştır.'}
          </p>
        </section>

        {/* Contributor Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Contributor Eligibility' : 'Katkıda Bulunan Uygunluk Gereksinimleri'}
          </h2>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Licensed Attorneys' : 'Lisanslı Avukatlar'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Contributions are accepted only from attorneys with active bar membership in a recognized jurisdiction. Credentials are verified prior to any publication.'
                  : 'Katkılar yalnızca tanınmış bir yargı alanında aktif baro üyeliğine sahip avukatlardan kabul edilir. Kimlik bilgileri herhangi bir yayından önce doğrulanır.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Jurisdictional and Subject Matter Expertise' : 'Yargı Alanı ve Konu Uzmanlığı'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Demonstrated expertise in specific practice areas and jurisdictions is required. Contributors are expected to write within their areas of active practice and jurisdictional competence.'
                  : 'Belirli uygulama alanlarında ve yargı alanlarında kanıtlanmış uzmanlık gereklidir. Katkıda bulunanların aktif uygulama ve yargı yetkinlikleri dahilinde yazmaları beklenir.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Reference-Grade Writing' : 'Referans Düzeyinde Yazım'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'All submissions must conform to a neutral, declarative, citation-ready writing standard. Content is structured for doctrinal reference, not commentary or advocacy.'
                  : 'Tüm gönderimler tarafsız, beyan edici, alıntıya hazır bir yazım standardına uygun olmalıdır. İçerik yorum veya savunuculuk için değil, doktriner referans için yapılandırılmıştır.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Native Language Content' : 'Ana Dil İçeriği'}
              </h3>
              <p className="text-gray-600 text-sm">
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
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Encyclopedic Articles' : 'Ansiklopedik Makaleler'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Comprehensive reference articles on legal topics, structured with overview, legal framework, practical implications, and compliance notes.'
                  : 'Hukuki konular hakkında kapsamlı referans makaleleri; genel bakış, hukuki çerçeve, pratik sonuçlar ve uyum notları ile yapılandırılmış.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">📄</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Professionally drafted templates with clause explanations. Must be jurisdiction-specific and linked to educational content.'
                  : 'Madde açıklamalarıyla profesyonelce hazırlanmış şablonlar. Yargı alanına özgü ve eğitim içeriğiyle bağlantılı olmalıdır.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">✅</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Checklists & Guides' : 'Kontrol Listeleri ve Rehberler'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Practical step-by-step resources for compliance, procedures, and document preparation.'
                  : 'Uyum, prosedürler ve belge hazırlama için pratik adım adım kaynaklar.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">🔍</div>
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
                    ? 'Submissions are reviewed for accuracy, tone, structural compliance, and alignment with platform standards.'
                    : 'Gönderimler doğruluk, ton, yapısal uyum ve platform standartlarına uygunluk açısından incelenir.'}
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
                    ? 'Accepted contributions are attributed by name and credentials. Published entries are intended for professional and academic reference.'
                    : 'Kabul edilen katkılar isim ve kimlik bilgileriyle atfedilir. Yayınlanan girdiler profesyonel ve akademik referans için tasarlanmıştır.'}
                </p>
              </div>
            </div>
          </div>
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
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {isEnglish
              ? 'All contributions are subject to editorial review prior to publication. Publication on EchoLegal reflects adherence to the platform\u2019s editorial and structural standards. It does not constitute an endorsement of the contributor, their practice, or any legal position expressed.'
              : 'Tüm katkılar yayından önce editöryal incelemeye tabidir. EchoLegal\u2019da yayın, platformun editöryal ve yapısal standartlarına uyumu yansıtır. Katkıda bulunanın, uygulamasının veya ifade edilen herhangi bir hukuki pozisyonun onayını teşkil etmez.'}
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
