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
            ? 'Licensed attorneys may apply to contribute jurisdiction-specific entries subject to editorial review and credential verification. The following standards govern eligibility, submission requirements, and editorial compliance.'
            : 'Lisanslı avukatlar, editöryal inceleme ve kimlik doğrulamasına tabi olarak yargı alanına özgü maddeler katkıda bulunmak üzere başvurabilir. Aşağıdaki standartlar uygunluk, sunum gereksinimleri ve editöryal uyumu düzenler.'}
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
                      ? 'Approved content is published by a Jurisdiction Editor, Senior Editor, or the Editorial Director. The editorial board retains final structural authority over classification, jurisdiction tagging, and authority-level assignment. Published content displays the publication date, author attribution, reviewer attribution, and review date.'
                      : 'Onaylanan içerik Yargı Alanı Editörü, Kıdemli Editör veya Editöryal Direktör tarafından yayınlanır. Yayın kurulu, sınıflandırma, yargı alanı etiketleme ve otorite seviyesi ataması üzerinde nihai yapısal otoriteyi elinde tutar. Yayınlanan içerik yayın tarihi, yazar atfı, incelemeci atfı ve inceleme tarihini gösterir.'}
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
          {isEnglish ? 'Contributor Attribution and Recognition' : 'Katkıda Bulunan Atfı ve Tanınırlığı'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Professional Attribution' : 'Profesyonel Atıf'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Named attribution on every published entry. Author and reviewer credentials, bar admissions, and jurisdictional competence are recorded alongside all content.'
                : 'Yayınlanan her maddede isimli atıf. Yazar ve incelemeci kimlik bilgileri, baro kayıtları ve yargı alanı yetkinliği tüm içerikle birlikte kaydedilir.'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Jurisdiction-Specific Contributor Profile' : 'Yargı Alanına Özgü Katkıda Bulunan Profili'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Verified contributors are listed on the Editorial Board page with their credentials, jurisdictional coverage, and role within the encyclopedia system.'
                : 'Doğrulanmış katkıda bulunanlar, kimlik bilgileri, yargı alanı kapsamları ve ansiklopedi sistemi içindeki rolleriyle birlikte Yayın Kurulu sayfasında listelenir.'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Citable Publication Record' : 'Atıf Yapılabilir Yayın Kaydı'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Published entries carry structured citation metadata, persistent identifiers, and authority-level classification. Entries are formatted for citation in legal and academic contexts.'
                : 'Yayınlanan maddeler yapılandırılmış atıf meta verileri, kalıcı tanımlayıcılar ve otorite seviyesi sınıflandırması taşır. Maddeler hukuki ve akademik bağlamlarda atıf için biçimlendirilmiştir.'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Publication Credit' : 'Yayın Kredisi'}
            </h3>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Publication within the encyclopedia system constitutes a verifiable record of subject-matter expertise, documented with jurisdiction tagging and citation metadata.'
                : 'Ansiklopedi sistemi içindeki yayın, yargı alanı etiketleme ve atıf meta verileriyle belgelenen, doğrulanabilir bir konu uzmanlığı kaydı oluşturur.'}
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

      {/* Citation & Authority Standards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Citation & Authority Standards (Canon v2)' : 'Atıf ve Otorite Standartları (Canon v2)'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'EchoLegal maintains a structured citation standard for all primary source metadata. This standard governs how statutes, regulations, treaties, and agency materials are recorded in citation fields and rendered in source disclosures.'
              : 'EchoLegal, tüm birincil kaynak meta verileri için yapılandırılmış bir atıf standardı sürdürür. Bu standart; kanunların, düzenlemelerin, antlaşmaların ve kurum materyallerinin atıf alanlarında nasıl kaydedileceğini ve kaynak açıklamalarında nasıl gösterileceğini düzenler.'}
          </p>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'Authority Levels' : 'Otorite Seviyeleri'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Each primary source entry is classified by its position in the legal hierarchy (e.g., federal statute, federal regulation, treaty, agency guidance). This classification enables consistent weighting across entries and supports structured retrieval.'
                  : 'Her birincil kaynak girdisi, hukuki hiyerarşideki konumuna göre sınıflandırılır (örn. federal kanun, federal düzenleme, antlaşma, kurum rehberliği). Bu sınıflandırma, girdiler arasında tutarlı ağırlıklandırmayı sağlar ve yapılandırılmış erişimi destekler.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'Canonical Identifiers' : 'Kanonik Tanımlayıcılar'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Each source is assigned a deterministic, lowercase identifier (e.g., usc-26-7701-a, cfr-26-301.7701-1). These identifiers ensure consistency when the same authority is cited across multiple entries and enable cross-referencing.'
                  : 'Her kaynağa deterministik, küçük harfli bir tanımlayıcı atanır (örn. usc-26-7701-a, cfr-26-301.7701-1). Bu tanımlayıcılar, aynı otorite birden fazla girdide atıf yapıldığında tutarlılığı sağlar ve çapraz referanslamayı mümkün kılar.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'Normalization Scope' : 'Normalizasyon Kapsamı'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Citation normalization applies to structured citation fields and primary source metadata rendered in source disclosures. Narrative body text is not subject to automated normalization and follows conventional prose style.'
                  : 'Atıf normalizasyonu, yapılandırılmış atıf alanlarına ve kaynak açıklamalarında gösterilen birincil kaynak meta verilerine uygulanır. Anlatımsal metin otomatik normalizasyona tabi değildir ve geleneksel düz yazı stilini takip eder.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'PR Verification' : 'PR Doğrulaması'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'All pull requests that modify citation data must pass citation tests and strict lint checks before merge. These checks verify formatting compliance, authority level completeness, and canonical ID assignment.'
                  : 'Atıf verilerini değiştiren tüm pull request\'ler, birleştirmeden önce atıf testlerini ve sıkı lint kontrollerini geçmelidir. Bu kontroller, biçimlendirme uyumluluğunu, otorite seviyesi bütünlüğünü ve kanonik kimlik atamasını doğrular.'}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'The full specification is maintained in the '
              : 'Tam spesifikasyon '}
            <Link
              href="https://github.com/soundspacerecordsllc/echoLegal/blob/main/docs/CITATION_CANON.md"
              className="text-gray-900 underline hover:opacity-60"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isEnglish ? 'Citation Canon reference document' : 'Atıf Kanonu referans belgesinde'}
            </Link>
            {isEnglish ? '.' : ' tutulmaktadır.'}
          </p>
        </div>
      </section>

      {/* Normative Hierarchy and Authority Modeling */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Normative Hierarchy and Authority Modeling' : 'Normatif Hiyerarşi ve Otorite Modelleme'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'EchoLegal models law as a layered authority system. Each source cited in a primary source disclosure occupies a defined position within the normative hierarchy. This hierarchy governs not only how sources are classified, but also the order in which they are presented to the reader.'
              : 'EchoLegal, hukuku katmanlı bir otorite sistemi olarak modellemektedir. Birincil kaynak açıklamasında atıf yapılan her kaynak, normatif hiyerarşi içinde tanımlanmış bir konuma sahiptir. Bu hiyerarşi, yalnızca kaynakların nasıl sınıflandırıldığını değil, aynı zamanda okuyucuya sunulma sırasını da belirler.'}
          </p>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'Constitutional and Statutory Authority' : 'Anayasal ve Yasal Otorite'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'The highest tier. Constitutional provisions and enacted statutes represent binding law. Primary analysis of any legal question begins at this level. Statutes define obligations, rights, and penalties with the force of legislative authority.'
                  : 'En üst kademe. Anayasal hükümler ve yürürlüğe konmuş kanunlar bağlayıcı hukuku temsil eder. Herhangi bir hukuki sorunun birincil analizi bu düzeyde başlar. Kanunlar; yükümlülükleri, hakları ve cezaları yasama otoritesinin gücüyle tanımlar.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'Implementing Regulations' : 'Uygulama Yönetmelikleri'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Regulations promulgated by executive agencies under statutory authorization. They carry the force of law within their delegated scope, but cannot exceed or contradict the statute they implement.'
                  : 'Yasal yetkilendirme altında yürütme organı kurumları tarafından çıkarılan düzenlemeler. Devredilen kapsamları dahilinde kanun gücü taşırlar, ancak uyguladıkları kanunu aşamaz veya çelişemezler.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'Administrative Instruments' : 'İdari Araçlar'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Forms, instructions, and procedural documents issued by agencies to operationalize statutory and regulatory requirements. These instruments are interpretive in nature; they represent an agency\'s administrative position but do not independently create legal obligations.'
                  : 'Yasal ve düzenleyici gereksinimleri işlevselleştirmek amacıyla kurumlar tarafından yayımlanan formlar, talimatlar ve prosedürel belgeler. Bu araçlar yorumlayıcı niteliktedir; bir kurumun idari pozisyonunu temsil eder ancak bağımsız olarak hukuki yükümlülük oluşturmaz.'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-1">
                {isEnglish ? 'Agency Guidance and Publications' : 'Kurum Rehberliği ve Yayınlar'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Revenue rulings, revenue procedures, notices, publications, and similar materials. These provide the agency\'s interpretive position but lack the binding force of statute or regulation. They are cited for context, not as controlling authority.'
                  : 'Gelir kararları, gelir prosedürleri, bildirimler, yayınlar ve benzeri materyaller. Bunlar kurumun yorumlayıcı pozisyonunu sağlar ancak kanun veya düzenlemenin bağlayıcı gücünden yoksundur. Bağlam için atıf yapılır, bağlayıcı otorite olarak değil.'}
              </p>
            </div>
          </div>

          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <p className="text-sm text-gray-700">
              {isEnglish
                ? 'Lower-tier instruments cannot override higher-tier authority. A form instruction cannot alter a statutory obligation; a publication cannot supersede a regulation. Where a conflict exists between tiers, the higher-tier source controls.'
                : 'Alt kademe araçlar, üst kademe otoriteyi geçersiz kılamaz. Bir form talimatı yasal bir yükümlülüğü değiştiremez; bir yayın bir düzenlemenin yerini alamaz. Kademeler arasında bir çelişki bulunduğunda, üst kademe kaynak bağlayıcıdır.'}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'This hierarchy is enforced structurally. Authority classification and canonical identifiers ensure that source presentation order reflects normative weight, not editorial preference. These mechanisms are applied consistently across all entries that include primary source disclosures.'
              : 'Bu hiyerarşi yapısal olarak uygulanır. Otorite sınıflandırması ve kanonik tanımlayıcılar, kaynak sunuş sırasının editöryal tercihi değil, normatif ağırlığı yansıtmasını sağlar. Bu mekanizmalar, birincil kaynak açıklamaları içeren tüm maddelerde tutarlı bir şekilde uygulanır.'}
          </p>
        </div>
      </section>

      {/* Submission Compliance Checklist */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Submission Compliance Checklist' : 'Sunum Uyumluluk Kontrol Listesi'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'Every submission that includes primary source disclosures must satisfy the following requirements before review. Submissions that do not meet these criteria are non-compliant and will be returned without review.'
              : 'Birincil kaynak açıklamaları içeren her sunum, inceleme öncesinde aşağıdaki gereksinimleri karşılamalıdır. Bu kriterleri karşılamayan sunumlar uyumsuz kabul edilir ve incelenmeden iade edilir.'}
          </p>
          <div className="bg-gray-50 rounded-lg p-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">1.</span>
              <p>
                {isEnglish
                  ? 'Every primary source carries an AuthorityLevel classification corresponding to its position in the normative hierarchy.'
                  : 'Her birincil kaynak, normatif hiyerarşideki konumuna karşılık gelen bir AuthorityLevel sınıflandırması taşır.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">2.</span>
              <p>
                {isEnglish
                  ? 'Every primary source includes a canonical identifier conforming to the Citation Canon specification.'
                  : 'Her birincil kaynak, Atıf Kanonu spesifikasyonuna uygun bir kanonik tanımlayıcı içerir.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">3.</span>
              <p>
                {isEnglish
                  ? 'Sources are classified into the correct tier: constitutional/statutory, implementing regulation, administrative instrument, or agency guidance/publication.'
                  : 'Kaynaklar doğru kademeye sınıflandırılmıştır: anayasal/yasal, uygulama yönetmeliği, idari araç veya kurum rehberliği/yayın.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">4.</span>
              <p>
                {isEnglish
                  ? 'Source presentation order reflects normative authority weight. No editorial override of tier precedence is permitted.'
                  : 'Kaynak sunuş sırası normatif otorite ağırlığını yansıtır. Kademe önceliğinin editöryal olarak geçersiz kılınmasına izin verilmez.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">5.</span>
              <p>
                {isEnglish
                  ? 'All penalty disclosures are anchored to the specific statutory provision that authorizes the penalty.'
                  : 'Tüm ceza açıklamaları, cezayı yetkilendiren belirli yasal hükme dayandırılmıştır.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">6.</span>
              <p>
                {isEnglish
                  ? 'Canonical identifiers follow the deterministic format defined in the Citation Canon (e.g., US-26USC-6038A, US-26CFR-1.6038A-1).'
                  : 'Kanonik tanımlayıcılar, Atıf Kanonu\'nda tanımlanan deterministik biçimi takip eder (örn. US-26USC-6038A, US-26CFR-1.6038A-1).'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Inquiries' : 'Sorular'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'Licensed attorneys may apply to contribute jurisdiction-specific entries subject to editorial review. Inquiries may be directed through the support page.'
            : 'Lisanslı avukatlar, editöryal incelemeye tabi olarak yargı alanına özgü maddelere katkıda bulunmak üzere başvurabilir. Sorular destek sayfası aracılığıyla iletilebilir.'}
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
