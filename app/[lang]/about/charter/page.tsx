// app/[lang]/about/charter/page.tsx

import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import GovernanceNav from '@/components/GovernanceNav'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Institutional Charter | EchoLegal'
    : 'Kurumsal Tüzük | EchoLegal'

  const description = isEnglish
    ? 'The founding charter of EchoLegal. Mission, editorial independence, governance structure, and institutional commitments.'
    : 'EchoLegal\'ın kuruluş tüzüğü. Misyon, editöryal bağımsızlık, yönetişim yapısı ve kurumsal taahhütler.'

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
      canonical: `https://echo-legal.com/${lang}/about/charter`,
      languages: {
        'en': 'https://echo-legal.com/en/about/charter',
        'tr': 'https://echo-legal.com/tr/about/charter',
        'x-default': 'https://echo-legal.com/en/about/charter',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function CharterPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda', href: `/${lang}/about` },
    { label: isEnglish ? 'Charter' : 'Tüzük' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <GovernanceNav lang={lang} currentPath="/about/charter" />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Institutional Charter' : 'Kurumsal Tüzük'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'The governing document that defines EchoLegal\'s mission, editorial independence, and institutional structure.'
            : 'EchoLegal\'ın misyonunu, editöryal bağımsızlığını ve kurumsal yapısını tanımlayan yönetişim belgesi.'}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          {isEnglish ? 'Effective: January 2024' : 'Yürürlük: Ocak 2024'}
        </p>
      </div>

      {/* Article I — Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article I — Mission' : 'Madde I — Misyon'}
        </h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-gray-900">
          <p className="text-gray-800 italic text-lg">
            {isEnglish
              ? '"Legal knowledge should belong to everyone."'
              : '"Hukuki bilgi herkesin olmalıdır."'}
          </p>
        </div>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'EchoLegal is a legal encyclopedia and contract library. Its purpose is to make accurate, professionally reviewed legal information freely accessible to individuals and businesses worldwide.'
              : 'EchoLegal bir hukuk ansiklopedisi ve sözleşme kütüphanesidir. Amacı, doğru ve profesyonel olarak incelenmiş hukuki bilgiyi dünya genelinde bireyler ve işletmeler için serbestçe erişilebilir kılmaktır.'}
          </p>
          <p>
            {isEnglish
              ? 'EchoLegal does not provide legal advice, represent clients, or substitute for the judgment of a qualified attorney. It is an educational reference built to the standards of a legal publishing institution.'
              : 'EchoLegal hukuki danışmanlık sağlamaz, müvekkilleri temsil etmez veya nitelikli bir avukatın değerlendirmesinin yerini almaz. Bir hukuk yayıncılığı kurumunun standartlarına göre inşa edilmiş eğitim amaçlı bir referans kaynağıdır.'}
          </p>
        </div>
      </section>

      {/* Article II — Editorial Independence */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article II — Editorial Independence' : 'Madde II — Editöryal Bağımsızlık'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'All editorial decisions at EchoLegal are made on the basis of legal accuracy, completeness, and reader utility. No commercial interest, sponsorship, or external pressure may override editorial standards.'
              : 'EchoLegal\'daki tüm editöryal kararlar hukuki doğruluk, bütünlük ve okuyucu faydasına dayanılarak alınır. Hiçbir ticari çıkar, sponsorluk veya dış baskı editöryal standartların önüne geçemez.'}
          </p>
          <p>
            {isEnglish
              ? 'Contributors maintain full intellectual independence. EchoLegal does not accept paid placements, sponsored content, or editorial consideration in exchange for compensation from third parties.'
              : 'Katkıda bulunanlar tam entelektüel bağımsızlıklarını korur. EchoLegal, üçüncü taraflardan tazminat karşılığında ücretli yerleşimler, sponsorlu içerik veya editöryal değerlendirme kabul etmez.'}
          </p>
        </div>
      </section>

      {/* Article III — Governance Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article III — Governance Structure' : 'Madde III — Yönetişim Yapısı'}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Section 1. Editorial Authority' : 'Bölüm 1. Editöryal Otorite'}
            </h3>
            <p className="text-gray-700">
              {isEnglish
                ? 'Editorial authority is held by a licensed attorney designated as Editorial Director. The Editorial Director has final authority over all publication decisions, contributor appointments, and editorial policy. This authority exists to ensure that legal accuracy is never compromised by operational considerations.'
                : 'Editöryal otorite, Editöryal Direktör olarak atanan lisanslı bir avukat tarafından tutulur. Editöryal Direktör, tüm yayın kararları, katkıda bulunan atamaları ve editöryal politika üzerinde nihai otoriteye sahiptir. Bu otorite, hukuki doğruluğun hiçbir zaman operasyonel kaygılar tarafından zedelenmemesini sağlamak için mevcuttur.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Section 2. Editorial Succession' : 'Bölüm 2. Editöryal Halefiyet'}
            </h3>
            <p className="text-gray-700">
              {isEnglish
                ? 'Editorial authority is an institutional role, not a personal appointment. Editorial standards survive any individual appointment. In the event the current Editorial Director is unable to serve, authority transfers to the most senior member of the Editorial Board who holds active bar admission. If no such member exists, publication is suspended until a qualified successor is designated.'
                : 'Editöryal otorite kişisel bir atama değil, kurumsal bir roldür. Editöryal standartlar herhangi bir bireysel atamadan bağımsız olarak devam eder. Mevcut Editöryal Direktör\'ün görev yapamaması halinde otorite, aktif baro kaydı bulunan Yayın Kurulu\'nun en kıdemli üyesine devredilir. Böyle bir üye bulunmuyorsa, nitelikli bir halef belirlenene kadar yayın askıya alınır.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Section 3. Editorial Board' : 'Bölüm 3. Yayın Kurulu'}
            </h3>
            <p className="text-gray-700">
              {isEnglish
                ? 'The Editorial Board consists of verified contributors holding the role of Reviewer or above. Board members participate in editorial policy discussions, advise on jurisdictional accuracy, and review content within their areas of competence. Board membership is determined by the Editorial Director based on demonstrated expertise and contribution history.'
                : 'Yayın Kurulu, İncelemeci veya üstü rolüne sahip doğrulanmış katkıda bulunanlardan oluşur. Kurul üyeleri editöryal politika tartışmalarına katılır, yargı alanı doğruluğu konusunda danışmanlık yapar ve yetkinlik alanları dahilinde içerikleri inceler. Kurul üyeliği, kanıtlanmış uzmanlık ve katkı geçmişine dayanılarak Editöryal Direktör tarafından belirlenir.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Section 4. Contributor Tiers' : 'Bölüm 4. Katkıda Bulunan Kademeleri'}
            </h3>
            <p className="text-gray-700 mb-3">
              {isEnglish
                ? 'EchoLegal recognizes the following contributor tiers, each with defined permissions and responsibilities:'
                : 'EchoLegal, her biri tanımlanmış izin ve sorumluluklara sahip aşağıdaki katkıda bulunan kademelerini tanır:'}
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>
                  <strong>{isEnglish ? 'Author' : 'Yazar'}</strong>
                  {isEnglish
                    ? ' — Licensed attorneys who may draft and submit content for review.'
                    : ' — İncelenmek üzere içerik hazırlayıp sunabilen lisanslı avukatlar.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Reviewer' : 'İncelemeci'}</strong>
                  {isEnglish
                    ? ' — Attorneys who may peer-review submissions within their jurisdictional competence.'
                    : ' — Yargı alanı yetkinlikleri dahilinde sunumları hakemli incelemeye tabi tutabilen avukatlar.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Jurisdiction Editor' : 'Yargı Alanı Editörü'}</strong>
                  {isEnglish
                    ? ' — Attorneys responsible for all content within a specific jurisdiction.'
                    : ' — Belirli bir yargı alanı içindeki tüm içerikten sorumlu avukatlar.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Senior Editor' : 'Kıdemli Editör'}</strong>
                  {isEnglish
                    ? ' — Attorneys who may review and publish content across multiple jurisdictions.'
                    : ' — Birden fazla yargı alanında içerik inceleyip yayınlayabilen avukatlar.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Editorial Director' : 'Editöryal Direktör'}</strong>
                  {isEnglish
                    ? ' — The final editorial authority as defined in Section 1 of this article.'
                    : ' — Bu maddenin Bölüm 1\'inde tanımlandığı şekliyle nihai editöryal otorite.'}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Article IV — Content Standards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article IV — Content Standards' : 'Madde IV — İçerik Standartları'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'All published content on EchoLegal must satisfy the following requirements:'
              : 'EchoLegal\'da yayınlanan tüm içerik aşağıdaki gereksinimleri karşılamalıdır:'}
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">i.</span>
              <p>
                {isEnglish
                  ? 'Factual claims must be traceable to primary legal sources: statutes, regulations, government publications, or reported judicial decisions.'
                  : 'Olgusal iddialar birincil hukuki kaynaklara kadar izlenebilir olmalıdır: kanunlar, yönetmelikler, resmi yayınlar veya raporlanmış yargı kararları.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">ii.</span>
              <p>
                {isEnglish
                  ? 'Content must maintain a neutral, encyclopedic tone. Marketing language, urgency tactics, and speculative claims are prohibited.'
                  : 'İçerik tarafsız, ansiklopedik bir üslup sürdürmelidir. Pazarlama dili, aciliyet taktikleri ve spekülatif iddialar yasaktır.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">iii.</span>
              <p>
                {isEnglish
                  ? 'All legal content must be reviewed by a licensed attorney with jurisdiction-appropriate credentials before publication.'
                  : 'Tüm hukuki içerik, yayınlanmadan önce yargı alanına uygun yetkinliklere sahip lisanslı bir avukat tarafından incelenmelidir.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">iv.</span>
              <p>
                {isEnglish
                  ? 'Appropriate disclaimers must accompany all content. No content may be presented in a manner that could reasonably be interpreted as individualized legal advice.'
                  : 'Tüm içeriklere uygun feragatnameler eşlik etmelidir. Hiçbir içerik, makul bir şekilde bireysel hukuki danışmanlık olarak yorumlanabilecek biçimde sunulamaz.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">v.</span>
              <p>
                {isEnglish
                  ? 'All content must display publication date, last modification date, and jurisdictional scope. Content must be reviewed on a defined schedule and updated when the underlying law changes.'
                  : 'Tüm içerik yayın tarihi, son değişiklik tarihi ve yargı alanı kapsamını göstermelidir. İçerik belirlenmiş bir takvimde gözden geçirilmeli ve temel alınan hukuk değiştiğinde güncellenmelidir.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article V — Normative Hierarchy and Authority Modeling */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article V — Normative Hierarchy and Authority Modeling' : 'Madde V — Normatif Hiyerarşi ve Otorite Modelleme'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'EchoLegal treats legal authority as a layered system. All primary source analysis and source disclosure across the platform adheres to the following normative ordering:'
              : 'EchoLegal, hukuki otoriteyi katmanlı bir sistem olarak ele alır. Platform genelindeki tüm birincil kaynak analizi ve kaynak açıklaması aşağıdaki normatif sıralamaya uyar:'}
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">i.</span>
              <p>
                <strong>{isEnglish ? 'Constitutional and statutory authority.' : 'Anayasal ve yasal otorite.'}</strong>{' '}
                {isEnglish
                  ? 'Enacted law — constitutional provisions and statutes — constitutes the highest tier of binding authority. Primary analysis begins here.'
                  : 'Yürürlükteki hukuk — anayasal hükümler ve kanunlar — bağlayıcı otoritenin en üst kademesini oluşturur. Birincil analiz bu noktada başlar.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">ii.</span>
              <p>
                <strong>{isEnglish ? 'Implementing regulations.' : 'Uygulama yönetmelikleri.'}</strong>{' '}
                {isEnglish
                  ? 'Agency regulations promulgated under statutory delegation carry the force of law within their authorized scope, but may not exceed the statute.'
                  : 'Yasal yetki devri kapsamında yayımlanan kurum düzenlemeleri, yetkilendirilmiş kapsamları dahilinde kanun gücü taşır, ancak kanunu aşamaz.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">iii.</span>
              <p>
                <strong>{isEnglish ? 'Administrative instruments.' : 'İdari araçlar.'}</strong>{' '}
                {isEnglish
                  ? 'Forms, instructions, and procedural directives operationalize statutory and regulatory requirements. They are interpretive, not independently binding.'
                  : 'Formlar, talimatlar ve prosedürel direktifler yasal ve düzenleyici gereksinimleri işlevselleştirir. Yorumlayıcıdır, bağımsız olarak bağlayıcı değildir.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5 font-mono text-sm">iv.</span>
              <p>
                <strong>{isEnglish ? 'Agency guidance and publications.' : 'Kurum rehberliği ve yayınlar.'}</strong>{' '}
                {isEnglish
                  ? 'Rulings, notices, and publications represent an agency\'s interpretive position. They provide context but lack the binding force of higher-tier authority.'
                  : 'Kararlar, bildirimler ve yayınlar bir kurumun yorumlayıcı pozisyonunu temsil eder. Bağlam sağlar ancak üst kademe otoritenin bağlayıcı gücünden yoksundur.'}
              </p>
            </div>
          </div>
          <p>
            {isEnglish
              ? 'Lower-tier instruments cannot override higher-tier authority. The order in which sources are presented across the platform reflects this normative weight, not editorial discretion. Authority classification and canonical identifiers enforce this hierarchy structurally.'
              : 'Alt kademe araçlar, üst kademe otoriteyi geçersiz kılamaz. Kaynakların platform genelinde sunulma sırası, editöryal takdir yetkisini değil, bu normatif ağırlığı yansıtır. Otorite sınıflandırması ve kanonik tanımlayıcılar bu hiyerarşiyi yapısal olarak uygular.'}
          </p>

          <div className="mt-8">
            <h3 className="font-semibold text-black mb-4">
              {isEnglish ? 'Section V.5 — Structural Authority Enforcement' : 'Bölüm V.5 — Yapısal Otorite Uygulaması'}
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-900">
              <p className="text-gray-800 mb-4">
                {isEnglish
                  ? 'The following rules are binding and non-discretionary. They apply to every entry that includes a primary source disclosure.'
                  : 'Aşağıdaki kurallar bağlayıcı ve takdir yetkisine tabi değildir. Birincil kaynak açıklaması içeren her maddeye uygulanır.'}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5 font-mono text-sm">i.</span>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'All primary sources must be assigned an AuthorityLevel classification corresponding to their position in the normative hierarchy.'
                      : 'Tüm birincil kaynaklar, normatif hiyerarşideki konumlarına karşılık gelen bir AuthorityLevel sınıflandırmasına atanmalıdır.'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5 font-mono text-sm">ii.</span>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'All primary sources must include a canonical identifier conforming to the Citation Canon specification.'
                      : 'Tüm birincil kaynaklar, Atıf Kanonu spesifikasyonuna uygun bir kanonik tanımlayıcı içermelidir.'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5 font-mono text-sm">iii.</span>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Disclosure ordering must reflect normative authority weight. Sources are presented in descending order of legal precedence.'
                      : 'Açıklama sıralaması normatif otorite ağırlığını yansıtmalıdır. Kaynaklar hukuki önceliğin azalan sırasına göre sunulur.'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5 font-mono text-sm">iv.</span>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Editorial discretion may not override tier precedence. The ordering of sources by authority weight is structurally enforced and not subject to editorial adjustment.'
                      : 'Editöryal takdir yetkisi kademe önceliğini geçersiz kılamaz. Kaynakların otorite ağırlığına göre sıralanması yapısal olarak uygulanır ve editöryal düzenlemeye tabi değildir.'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5 font-mono text-sm">v.</span>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Entries lacking authority classification are incomplete and non-compliant. An entry may not be published until every primary source carries both an AuthorityLevel and a canonical identifier.'
                      : 'Otorite sınıflandırması eksik olan maddeler tamamlanmamış ve uyumsuz kabul edilir. Her birincil kaynak hem AuthorityLevel hem de kanonik tanımlayıcı taşıyana kadar bir madde yayınlanamaz.'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5 font-mono text-sm">vi.</span>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Lower-tier instruments cannot supersede higher-tier authority. Where a conflict exists between sources at different tiers, the higher-tier source controls.'
                      : 'Alt kademe araçlar, üst kademe otoriteyi geçersiz kılamaz. Farklı kademelerdeki kaynaklar arasında bir çelişki bulunduğunda, üst kademe kaynak bağlayıcıdır.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article VI — Jurisdictional Expansion */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article VI — Jurisdictional Expansion' : 'Madde VI — Yargı Alanı Genişlemesi'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'EchoLegal is designed to serve multiple jurisdictions and languages. Expansion to a new jurisdiction requires:'
              : 'EchoLegal birden fazla yargı alanına ve dile hizmet etmek üzere tasarlanmıştır. Yeni bir yargı alanına genişleme şunları gerektirir:'}
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-1">
            <li>
              {isEnglish
                ? 'At least one verified contributor admitted to practice in that jurisdiction.'
                : 'İlgili yargı alanında avukatlık yapmaya yetkili en az bir doğrulanmış katkıda bulunan.'}
            </li>
            <li>
              {isEnglish
                ? 'A designated Jurisdiction Editor responsible for accuracy within that jurisdiction.'
                : 'İlgili yargı alanı içinde doğruluktan sorumlu atanmış bir Yargı Alanı Editörü.'}
            </li>
            <li>
              {isEnglish
                ? 'A minimum body of foundational content — at least five encyclopedia entries and three contract templates — reviewed by a second attorney in that jurisdiction.'
                : 'İlgili yargı alanında ikinci bir avukat tarafından incelenmiş minimum bir temel içerik bütünü — en az beş ansiklopedi maddesi ve üç sözleşme şablonu.'}
            </li>
            <li>
              {isEnglish
                ? 'Jurisdiction-specific disclaimers and legal notices drafted and approved by the Editorial Director.'
                : 'Editöryal Direktör tarafından hazırlanıp onaylanan yargı alanına özgü feragatnameler ve hukuki bildirimler.'}
            </li>
          </ol>
          <p>
            {isEnglish
              ? 'No jurisdiction may be represented as active on EchoLegal until these requirements are satisfied.'
              : 'Bu gereksinimler karşılanana kadar hiçbir yargı alanı EchoLegal\'da aktif olarak gösterilemez.'}
          </p>
        </div>
      </section>

      {/* Article VII — Open Access Commitment */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article VII — Open Access Commitment' : 'Madde VII — Açık Erişim Taahhüdü'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'All encyclopedic content on EchoLegal — articles, guides, legal updates, and checklists — is freely accessible without registration, paywall, or usage restriction. This commitment is permanent and may not be revoked under Article IX.'
              : 'EchoLegal\'daki tüm ansiklopedik içerik — makaleler, rehberler, hukuki güncellemeler ve kontrol listeleri — kayıt, ödeme duvarı veya kullanım kısıtlaması olmaksızın serbestçe erişilebilirdir. Bu taahhüt kalıcıdır ve Madde IX kapsamında geri alınamaz.'}
          </p>
          <p>
            {isEnglish
              ? 'Contract templates and document kits may be offered on a paid or voluntary-payment basis to sustain operations, but informational content is never gated.'
              : 'Sözleşme şablonları ve belge kitleri faaliyetleri sürdürmek amacıyla ücretli veya gönüllü ödeme esasına göre sunulabilir, ancak bilgilendirici içerik hiçbir zaman erişime kapatılmaz.'}
          </p>
        </div>
      </section>

      {/* Article VIII — Conflict of Interest */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article VIII — Conflict of Interest' : 'Madde VIII — Çıkar Çatışması'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'Contributors must disclose any financial interest, professional relationship, or other potential conflict that could affect the objectivity of their contributions. The Editorial Director evaluates disclosures and may require recusal or additional review.'
              : 'Katkıda bulunanlar, katkılarının tarafsızlığını etkileyebilecek herhangi bir mali çıkar, mesleki ilişki veya diğer potansiyel çatışmayı beyan etmelidir. Editöryal Direktör beyanları değerlendirir ve çekilme veya ek inceleme isteyebilir.'}
          </p>
          <p>
            {isEnglish
              ? 'EchoLegal does not accept compensation from service providers, law firms, or government agencies in exchange for favorable content treatment.'
              : 'EchoLegal, hizmet sağlayıcılardan, hukuk bürolarından veya devlet kurumlarından olumlu içerik muamelesi karşılığında tazminat kabul etmez.'}
          </p>
        </div>
      </section>

      {/* Article IX — Amendments */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Article IX — Amendments' : 'Madde IX — Değişiklikler'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'This charter may be amended by the Editorial Director with the advisory input of the Editorial Board. All amendments are documented with effective dates and made publicly available. The core mission statement (Article I) and open access commitment (Article VII) may not be revoked.'
            : 'Bu tüzük, Yayın Kurulu\'nun danışma görüşüyle Editöryal Direktör tarafından değiştirilebilir. Tüm değişiklikler yürürlük tarihleriyle belgelenir ve kamuya açık hale getirilir. Temel misyon beyanı (Madde I) ve açık erişim taahhüdü (Madde VII) geri alınamaz.'}
        </p>
      </section>
    </main>
  )
}
