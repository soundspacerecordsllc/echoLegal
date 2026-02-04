// app/[lang]/about/contributor-standards/page.tsx

import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import GovernanceNav from '@/components/GovernanceNav'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Contributor Standards | EchoLegal'
    : 'Katkıda Bulunan Standartları | EchoLegal'

  const description = isEnglish
    ? 'Requirements for contributing to EchoLegal. Eligibility, bar verification, editorial process, and contributor responsibilities.'
    : 'EchoLegal\'a katkıda bulunma gereksinimleri. Uygunluk, baro doğrulaması, editöryal süreç ve katkıda bulunan sorumlulukları.'

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
      canonical: `https://echo-legal.com/${lang}/about/contributor-standards`,
      languages: {
        'en': 'https://echo-legal.com/en/about/contributor-standards',
        'tr': 'https://echo-legal.com/tr/about/contributor-standards',
        'x-default': 'https://echo-legal.com/en/about/contributor-standards',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ContributorStandardsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda', href: `/${lang}/about` },
    { label: isEnglish ? 'Contributor Standards' : 'Katkıda Bulunan Standartları' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <GovernanceNav lang={lang} currentPath="/about/contributor-standards" />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Contributor Standards' : 'Katkıda Bulunan Standartları'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'Requirements and expectations for attorneys contributing to EchoLegal.'
            : 'EchoLegal\'a katkıda bulunan avukatlar için gereksinimler ve beklentiler.'}
        </p>
      </div>

      {/* Eligibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Eligibility' : 'Uygunluk'}
        </h2>
        <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-900">
          <p className="text-gray-800 font-medium mb-3">
            {isEnglish
              ? 'EchoLegal accepts contributions exclusively from licensed attorneys.'
              : 'EchoLegal yalnızca lisanslı avukatlardan katkı kabul eder.'}
          </p>
          <p className="text-gray-700 text-sm">
            {isEnglish
              ? 'This requirement exists because EchoLegal is a legal reference. Accuracy depends on contributors who have the professional training, jurisdictional knowledge, and ethical obligations that accompany bar admission.'
              : 'Bu gereksinim, EchoLegal\'ın bir hukuk referansı olmasından kaynaklanır. Doğruluk, baro kaydıyla birlikte gelen mesleki eğitim, yargı alanı bilgisi ve etik yükümlülüklere sahip katkıda bulunanlara bağlıdır.'}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-black">
            {isEnglish ? 'Minimum Requirements' : 'Asgari Gereksinimler'}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-1 flex-shrink-0">1.</span>
              <p className="text-gray-700">
                {isEnglish
                  ? 'Active bar admission in at least one jurisdiction. The bar admission must be current and in good standing. Retired or inactive admissions are noted but do not qualify for authoring or reviewing legal content.'
                  : 'En az bir yargı alanında aktif baro kaydı. Baro kaydı güncel ve iyi durumda olmalıdır. Emekli veya aktif olmayan kayıtlar not edilir ancak hukuki içerik yazmak veya incelemek için yeterli değildir.'}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-1 flex-shrink-0">2.</span>
              <p className="text-gray-700">
                {isEnglish
                  ? 'Willingness to undergo bar verification. EchoLegal verifies all bar admissions through public bar directories, certificate review, or peer attestation.'
                  : 'Baro doğrulamasına tabi tutulmaya isteklilik. EchoLegal tüm baro kayıtlarını kamusal baro dizinleri, sertifika incelemesi veya meslektaş onayı yoluyla doğrular.'}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-1 flex-shrink-0">3.</span>
              <p className="text-gray-700">
                {isEnglish
                  ? 'Agreement to the EchoLegal Contributor Agreement, which governs content licensing, attribution, and editorial authority.'
                  : 'İçerik lisanslama, atıf ve editöryal otoriteyi düzenleyen EchoLegal Katkıda Bulunan Sözleşmesi\'ni kabul etme.'}
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Verification Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Verification Process' : 'Doğrulama Süreci'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'Credential verification is required before any content can be submitted for review. The process consists of:'
              : 'Herhangi bir içeriğin incelemeye sunulabilmesi için yetkinlik doğrulaması gereklidir. Süreç şunlardan oluşur:'}
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <span className="text-lg font-bold text-blue-600">1</span>
              <div>
                <h3 className="font-semibold text-blue-900">
                  {isEnglish ? 'Application' : 'Başvuru'}
                </h3>
                <p className="text-sm text-blue-800 mt-1">
                  {isEnglish
                    ? 'Submit bar admission jurisdiction, bar number, years of practice, specialization areas, and languages of fluency.'
                    : 'Baro kayıt yargı alanı, baro numarası, uygulama yılları, uzmanlık alanları ve akıcı konuşulan dilleri sunun.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <span className="text-lg font-bold text-green-600">2</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'Bar Directory Verification' : 'Baro Dizini Doğrulaması'}
                </h3>
                <p className="text-sm text-green-800 mt-1">
                  {isEnglish
                    ? 'EchoLegal confirms bar admission through the relevant jurisdiction\'s public attorney directory. For jurisdictions without digital directories, certificate review or peer attestation by two verified contributors is accepted.'
                    : 'EchoLegal, baro kaydını ilgili yargı alanının kamusal avukat dizini aracılığıyla doğrular. Dijital dizini olmayan yargı alanları için, sertifika incelemesi veya iki doğrulanmış katkıda bulunan tarafından meslektaş onayı kabul edilir.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <span className="text-lg font-bold text-amber-600">3</span>
              <div>
                <h3 className="font-semibold text-amber-900">
                  {isEnglish ? 'Activation' : 'Aktivasyon'}
                </h3>
                <p className="text-sm text-amber-800 mt-1">
                  {isEnglish
                    ? 'Upon verification, the contributor is activated as an Author and may submit content for review. Promotion to Reviewer or higher tiers requires demonstrated contribution history and nomination by existing editorial staff.'
                    : 'Doğrulamadan sonra, katkıda bulunan Yazar olarak aktifleştirilir ve incelemeye içerik sunabilir. İncelemeci veya daha üst kademelere terfi, kanıtlanmış katkı geçmişi ve mevcut editöryal personel tarafından aday gösterilmeyi gerektirir.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
              <span className="text-lg font-bold text-gray-600">4</span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isEnglish ? 'Annual Re-Verification' : 'Yıllık Yeniden Doğrulama'}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  {isEnglish
                    ? 'All contributors must confirm active bar status annually. Contributors who do not re-verify within 60 days of the re-verification date have publishing privileges paused until the process is completed.'
                    : 'Tüm katkıda bulunanlar yıllık olarak aktif baro durumlarını teyit etmelidir. Yeniden doğrulama tarihinden itibaren 60 gün içinde yeniden doğrulama yapmayan katkıda bulunanların yayın ayrıcalıkları süreç tamamlanana kadar askıya alınır.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Editorial Process' : 'Editöryal Süreç'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'All content follows a structured editorial workflow before publication:'
              : 'Tüm içerik yayınlanmadan önce yapılandırılmış bir editöryal iş akışını takip eder:'}
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="font-mono text-sm text-gray-400 mt-0.5">i.</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {isEnglish ? 'Drafting' : 'Taslak Hazırlama'}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {isEnglish
                      ? 'The author drafts content following EchoLegal\'s editorial policy: neutral tone, primary source citations, appropriate disclaimers, and jurisdictional scope clearly identified.'
                      : 'Yazar, EchoLegal\'ın editöryal politikasına uygun olarak içerik hazırlar: tarafsız üslup, birincil kaynak atıfları, uygun feragatnameler ve açıkça belirlenmiş yargı alanı kapsamı.'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-sm text-gray-400 mt-0.5">ii.</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {isEnglish ? 'Peer Review' : 'Hakemli İnceleme'}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {isEnglish
                      ? 'A Reviewer with competence in the relevant jurisdiction evaluates the submission for legal accuracy, completeness, and editorial compliance. The reviewer may approve, request revisions, or reject the submission with a documented rationale.'
                      : 'İlgili yargı alanında yetkinliğe sahip bir İncelemeci, sunumu hukuki doğruluk, bütünlük ve editöryal uyumluluk açısından değerlendirir. İncelemeci onaylayabilir, revizyon isteyebilir veya belgelenmiş bir gerekçeyle sunumu reddedebilir.'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-sm text-gray-400 mt-0.5">iii.</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {isEnglish ? 'Publication' : 'Yayın'}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {isEnglish
                      ? 'Approved content is published by a Jurisdiction Editor, Senior Editor, or the Editorial Director. Published content displays the publication date, author attribution, reviewer attribution, and review date.'
                      : 'Onaylanan içerik Yargı Alanı Editörü, Kıdemli Editör veya Editöryal Direktör tarafından yayınlanır. Yayınlanan içerik yayın tarihi, yazar atfı, incelemeci atfı ve inceleme tarihini gösterir.'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-sm text-gray-400 mt-0.5">iv.</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {isEnglish ? 'Ongoing Maintenance' : 'Sürekli Bakım'}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {isEnglish
                      ? 'Published content is subject to periodic review per the schedule defined in the Editorial Policy. Authors are notified when their content is due for review and are expected to update or confirm accuracy.'
                      : 'Yayınlanan içerik, Editöryal Politika\'da tanımlanan takvime göre periyodik incelemeye tabidir. İçerikleri inceleme zamanı geldiğinde yazarlar bilgilendirilir ve doğruluğu güncelemeleri veya teyit etmeleri beklenir.'}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* What Contributors Receive */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'What Contributors Receive' : 'Katkıda Bulunanlar Ne Alır'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Professional Attribution' : 'Profesyonel Atıf'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Public attribution on every published entry. Author and reviewer names, bar admissions, and jurisdictional competence are displayed alongside all content.'
                : 'Yayınlanan her maddede kamuya açık atıf. Yazar ve incelemeci adları, baro kayıtları ve yargı alanı yetkinliği tüm içerikle birlikte gösterilir.'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Editorial Board Listing' : 'Yayın Kurulu Listesi'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'All verified contributors are listed on the Editorial Board page with their credentials, jurisdictions, and role within EchoLegal.'
                : 'Doğrulanmış tüm katkıda bulunanlar, yetkinlikleri, yargı alanları ve EchoLegal\'daki rolleriyle birlikte Yayın Kurulu sayfasında listelenir.'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Citable Publication Record' : 'Atıf Yapılabilir Yayın Kaydı'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Published entries carry structured citation metadata and are designed to be citable in legal and academic contexts.'
                : 'Yayınlanan maddeler yapılandırılmış atıf meta verileri taşır ve hukuki ve akademik bağlamlarda atıf yapılabilir olacak şekilde tasarlanmıştır.'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Peer Recognition' : 'Meslektaş Tanınırlığı'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Contributions to a growing legal encyclopedia serve as a verifiable professional credential and demonstrate subject-matter expertise to peers and clients.'
                : 'Büyüyen bir hukuk ansiklopedisine yapılan katkılar, doğrulanabilir bir profesyonel yetkinlik belgesi olarak hizmet eder ve meslektaşlara ve müvekkillere konu uzmanlığını gösterir.'}
            </p>
          </div>
        </div>
      </section>

      {/* Conduct */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Contributor Conduct' : 'Katkıda Bulunan Davranışı'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'Contributors must:'
              : 'Katkıda bulunanlar:'}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-1">
            <li>
              {isEnglish
                ? 'Maintain active bar admission in good standing throughout their contribution period.'
                : 'Katkı dönemleri boyunca iyi durumda aktif baro kaydını sürdürmelidir.'}
            </li>
            <li>
              {isEnglish
                ? 'Author content only within jurisdictions where they hold competence or, for general content, clearly identify the jurisdictional scope.'
                : 'İçerik yalnızca yetkinlik sahibi oldukları yargı alanlarında yazmalı veya genel içerik için yargı alanı kapsamını açıkça belirlemelidir.'}
            </li>
            <li>
              {isEnglish
                ? 'Disclose any conflict of interest that could affect editorial objectivity.'
                : 'Editöryal tarafsızlığı etkileyebilecek herhangi bir çıkar çatışmasını beyan etmelidir.'}
            </li>
            <li>
              {isEnglish
                ? 'Respond to review feedback and revision requests within a reasonable timeframe.'
                : 'İnceleme geri bildirimlerine ve revizyon taleplerine makul bir süre içinde yanıt vermelidir.'}
            </li>
            <li>
              {isEnglish
                ? 'Not submit content that has been substantially published elsewhere without disclosure.'
                : 'Beyan etmeden başka bir yerde esaslı olarak yayınlanmış içerik sunmamalıdır.'}
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Inquiries' : 'Sorular'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'Licensed attorneys interested in contributing to EchoLegal may direct inquiries through the support page.'
            : 'EchoLegal\'a katkıda bulunmak isteyen lisanslı avukatlar, destek sayfası aracılığıyla sorularını iletebilir.'}
        </p>
        <Link
          href={`/${lang}/support`}
          className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          {isEnglish ? 'Contact' : 'İletişim'}
        </Link>
      </section>
    </main>
  )
}
