// app/[lang]/contribute/page.tsx
// Contributor framework page for licensed attorneys
// Describes how to contribute to EchoLegal's global legal encyclopedia

import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/i18n-config'
import { PrimaryAuthorAttribution } from '@/components/ContributorAttribution'
import ContributorApplicationForm from '@/components/ContributorApplicationForm'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Contribute to EchoLegal | For Licensed Attorneys'
      : 'EchoLegal\'a Katkıda Bulunun | Lisanslı Avukatlar İçin',
    description: isEnglish
      ? 'EchoLegal invites licensed attorneys worldwide to contribute to our global legal encyclopedia. Learn about our editorial standards and contributor framework.'
      : 'EchoLegal, dünya genelindeki lisanslı avukatları global hukuk ansiklopedimize katkıda bulunmaya davet ediyor. Editöryal standartlarımız ve katkıda bulunma çerçevemiz hakkında bilgi edinin.',
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
              ? 'EchoLegal is building a global legal encyclopedia. We invite licensed attorneys worldwide to contribute knowledge in their areas of expertise.'
              : 'EchoLegal global bir hukuk ansiklopedisi oluşturuyor. Dünya genelindeki lisanslı avukatları uzmanlık alanlarında bilgi katkısında bulunmaya davet ediyoruz.'}
          </p>
        </div>

        {/* Vision Section */}
        <section className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Our Vision' : 'Vizyonumuz'}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {isEnglish
              ? 'We believe legal knowledge should be accessible to everyone. Our goal is to create a comprehensive, multilingual legal reference that serves individuals and businesses worldwide—a resource that can be cited by humans, institutions, and AI systems alike.'
              : 'Hukuki bilginin herkes için erişilebilir olması gerektiğine inanıyoruz. Amacımız, dünya genelinde bireylere ve işletmelere hizmet veren kapsamlı, çok dilli bir hukuk referansı oluşturmaktır—insanlar, kurumlar ve yapay zeka sistemleri tarafından alıntılanabilecek bir kaynak.'}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {isEnglish
              ? 'We start with what we know best: US–Turkey cross-border legal matters. But our architecture is designed to scale—to dozens of jurisdictions, dozens of languages, and hundreds of expert contributors.'
              : 'En iyi bildiğimiz alanla başlıyoruz: ABD-Türkiye sınır ötesi hukuki konular. Ancak altyapımız ölçeklenebilir olarak tasarlandı—düzinelerce yargı alanı, düzinelerce dil ve yüzlerce uzman katkıda bulunan için.'}
          </p>
        </section>

        {/* What We're Looking For */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'What We\'re Looking For' : 'Aradıklarımız'}
          </h2>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Licensed Attorneys' : 'Lisanslı Avukatlar'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Active bar membership in your jurisdiction. We verify credentials before publication.'
                  : 'Yargı alanınızda aktif baro üyeliği. Yayın öncesi kimlik bilgilerini doğrularız.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Subject Matter Expertise' : 'Konu Uzmanlığı'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Practitioners with deep knowledge in specific practice areas: corporate, immigration, tax, employment, IP, real estate, etc.'
                  : 'Belirli uygulama alanlarında derin bilgiye sahip uygulayıcılar: kurumsal, göçmenlik, vergi, istihdam, fikri mülkiyet, gayrimenkul, vb.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Encyclopedic Writing Style' : 'Ansiklopedik Yazım Tarzı'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Neutral, factual, educational content. No marketing language, no self-promotion. Think Wikipedia or Practical Law, not a blog.'
                  : 'Tarafsız, olgusal, eğitici içerik. Pazarlama dili yok, kişisel tanıtım yok. Blog değil, Vikipedi veya Practical Law gibi düşünün.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Native Language Content' : 'Ana Dil İçeriği'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'We value content written by native speakers who understand legal terminology nuances in their language.'
                  : 'Kendi dillerindeki hukuki terminoloji nüanslarını anlayan anadili konuşanlar tarafından yazılan içeriğe değer veriyoruz.'}
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
                <strong>{isEnglish ? 'Neutral Tone:' : 'Tarafsız Ton:'}</strong>{' '}
                {isEnglish
                  ? 'No marketing language, fear tactics, or persuasive writing. Factual and educational only.'
                  : 'Pazarlama dili, korku taktikleri veya ikna edici yazım yok. Yalnızca olgusal ve eğitici.'}
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
                <strong>{isEnglish ? 'Date Tracking:' : 'Tarih Takibi:'}</strong>{' '}
                {isEnglish
                  ? 'Publication and update dates must be visible. Legal information changes; we track when content was verified.'
                  : 'Yayın ve güncelleme tarihleri görünür olmalıdır. Hukuki bilgiler değişir; içeriğin ne zaman doğrulandığını takip ederiz.'}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 mt-0.5">✓</span>
              <p>
                <strong>{isEnglish ? 'No Legal Advice:' : 'Hukuki Tavsiye Yok:'}</strong>{' '}
                {isEnglish
                  ? 'Clear disclaimers that content is educational and does not constitute legal advice.'
                  : 'İçeriğin eğitim amaçlı olduğunu ve hukuki tavsiye teşkil etmediğini belirten açık uyarılar.'}
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
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
                    ? 'Contact us with your credentials, jurisdiction, and proposed contribution area.'
                    : 'Kimlik bilgileriniz, yargı alanınız ve önerilen katkı alanınızla bizimle iletişime geçin.'}
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
                    ? 'We verify bar membership and professional standing before approval.'
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
                    ? 'Submit content following our editorial guidelines and templates.'
                    : 'Editöryal yönergelerimizi ve şablonlarımızı takip ederek içerik gönderin.'}
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
                    ? 'Our editorial team reviews for accuracy, tone, and alignment with platform standards.'
                    : 'Editör ekibimiz doğruluk, ton ve platform standartlarına uyum açısından inceler.'}
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
                    ? 'Content is published with professional attribution including your name, jurisdiction, and credentials.'
                    : 'İçerik, adınız, yargı alanınız ve kimlik bilgileriniz dahil profesyonel atıfla yayınlanır.'}
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
              ? 'All EchoLegal content is currently reviewed under the editorial authority of:'
              : 'Tüm EchoLegal içeriği şu anda aşağıdaki editöryal otorite altında incelenmektedir:'}
          </p>
          <PrimaryAuthorAttribution lang={lang} variant="full" />
        </section>

        {/* Application Form */}
        <section className="mb-12" id="apply">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isEnglish ? 'Apply to Contribute' : 'Katkıda Bulunmak İçin Başvurun'}
          </h2>
          <p className="text-gray-600 mb-8">
            {isEnglish
              ? 'Complete the form below to express your interest in contributing to EchoLegal. All fields marked with * are required.'
              : 'EchoLegal\'a katkıda bulunma ilginizi belirtmek için aşağıdaki formu doldurun. * ile işaretlenmiş tüm alanlar zorunludur.'}
          </p>
          <ContributorApplicationForm lang={lang} />
        </section>

        {/* Alternative Contact */}
        <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-600 mb-3">
            {isEnglish
              ? 'Prefer to reach out directly? Contact us at:'
              : 'Doğrudan ulaşmayı mı tercih ediyorsunuz? Bize ulaşın:'}
          </p>
          <a
            href="mailto:contribute@echo-legal.com"
            className="text-gray-900 font-medium hover:underline"
          >
            contribute@echo-legal.com
          </a>
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
