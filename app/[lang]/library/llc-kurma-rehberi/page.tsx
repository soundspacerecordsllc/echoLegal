// app/[lang]/library/llc-kurma-rehberi/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'LLC Formation in the US: What You Need to Know | EchoLegal'
      : "ABD'de LLC Kurmak: Bilmeniz Gerekenler | EchoLegal",
    description: isEnglish
      ? 'A comprehensive reference guide to LLC formation in the United States for non-US entrepreneurs. State selection, formation process, tax implications, and common misconceptions.'
      : "ABD dışından girişimcilere yönelik LLC kurulum rehberi. Eyalet seçimi, kuruluş süreci, vergisel sonuçlar ve yaygın yanılgılar.",
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCFormationGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'LLC Formation' : 'LLC Kurma'}</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Reference Guide' : 'Referans Rehberi'}
            </span>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              {isEnglish
                ? 'LLC Formation in the US: What You Need to Know'
                : "ABD'de LLC Kurmak: Bilmeniz Gerekenler"}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {isEnglish
                ? "A factual reference guide explaining what an LLC is, how it's formed, and what non-US entrepreneurs should understand before starting the process."
                : "LLC nedir, nasıl kurulur ve ABD dışından girişimcilerin bu sürece başlamadan önce bilmesi gereken temel noktalar nelerdir? Bu rehber bu soruları yanıtlıyor."}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {isEnglish ? 'Last updated: January 2026' : 'Son güncelleme: Ocak 2026'}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {isEnglish ? '~12 min read' : '~12 dk okuma'}
              </span>
            </div>
          </header>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>{isEnglish ? 'Note:' : 'Not:'}</strong>{' '}
              {isEnglish
                ? 'This guide provides general information for educational purposes only. It does not constitute legal, tax, or immigration advice. Laws and requirements change frequently. Consult with licensed professionals before making decisions.'
                : 'Bu rehber yalnızca genel bilgilendirme amacıyla hazırlanmıştır. Hukuki, vergisel veya göçmenlik tavsiyesi niteliği taşımaz. Mevzuat ve uygulamalar değişkenlik gösterebilir. Herhangi bir karar almadan önce konunun uzmanına danışmanızı tavsiye ederiz.'}
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-10">
            <h2 className="font-bold text-black mb-4">
              {isEnglish ? 'Contents' : 'İçindekiler'}
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-llc" className="text-gray-600 hover:text-black">1. {isEnglish ? 'What is an LLC?' : 'LLC Nedir?'}</a></li>
              <li><a href="#why-llc" className="text-gray-600 hover:text-black">2. {isEnglish ? 'Why Do People Form LLCs?' : 'İnsanlar Neden LLC Kurar?'}</a></li>
              <li><a href="#state-selection" className="text-gray-600 hover:text-black">3. {isEnglish ? 'State Selection' : 'Eyalet Seçimi'}</a></li>
              <li><a href="#formation-process" className="text-gray-600 hover:text-black">4. {isEnglish ? 'Formation Process' : 'Kuruluş Süreci'}</a></li>
              <li><a href="#tax-implications" className="text-gray-600 hover:text-black">5. {isEnglish ? 'Tax Implications' : 'Vergisel Etkiler'}</a></li>
              <li><a href="#common-misconceptions" className="text-gray-600 hover:text-black">6. {isEnglish ? 'Common Misconceptions' : 'Sık Yapılan Hatalar'}</a></li>
              <li><a href="#next-steps" className="text-gray-600 hover:text-black">7. {isEnglish ? 'Documents You May Need' : 'İhtiyacınız Olabilecek Belgeler'}</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section id="what-is-llc" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                1. {isEnglish ? 'What is an LLC?' : 'LLC Nedir?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'LLC stands for "Limited Liability Company." It is a type of business structure in the United States that combines characteristics of both corporations and partnerships.'
                  : "LLC, \"Limited Liability Company\" ifadesinin kısaltmasıdır; Türkçe karşılığı \"Sınırlı Sorumlu Şirket\" olarak ifade edilebilir. ABD hukukunda, hem anonim şirketin hem de adi ortaklığın belirli özelliklerini bünyesinde barındıran esnek bir ticari yapıdır."}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'The key feature of an LLC is that it provides "limited liability" protection to its owners (called "members"). This means that the personal assets of the members are generally protected from business debts and lawsuits.'
                  : "LLC'nin en belirgin özelliği, sahiplerine (\"member\" / üye) sınırlı sorumluluk güvencesi tanımasıdır. Üyelerin kişisel mal varlıkları, kural olarak, şirketin borç ve davalarından ayrı tutulur."}
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <p className="text-sm text-blue-900">
                  <strong>{isEnglish ? 'Key Point:' : 'Önemli Nokta:'}</strong>{' '}
                  {isEnglish
                    ? 'An LLC is formed at the state level, not the federal level. Each state has its own LLC laws and requirements.'
                    : 'LLC, federal düzeyde değil eyalet düzeyinde kurulur. Her eyaletin kendine özgü LLC mevzuatı ve şartları bulunur.'}
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="why-llc" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                2. {isEnglish ? 'Why Do People Form LLCs?' : 'İnsanlar Neden LLC Kurar?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'There are several reasons why entrepreneurs choose to form an LLC:'
                  : 'Girişimcilerin LLC tercih etmesinin başlıca nedenleri şunlardır:'}
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>{isEnglish ? 'Limited Liability:' : 'Sınırlı Sorumluluk:'}</strong>{' '}
                  {isEnglish
                    ? 'Personal assets are generally protected from business obligations.'
                    : 'Kişisel mal varlığı, şirketin borçlarından kural olarak ayrı tutulur.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Tax Flexibility:' : 'Vergi Esnekliği:'}</strong>{' '}
                  {isEnglish
                    ? 'LLCs can choose how they want to be taxed (as a sole proprietorship, partnership, or corporation).'
                    : "LLC'ler vergilendirilme biçimlerini seçebilir: şahıs işletmesi, ortaklık veya şirket statüsü gibi."}
                </li>
                <li>
                  <strong>{isEnglish ? 'Operational Flexibility:' : 'Operasyonel Esneklik:'}</strong>{' '}
                  {isEnglish
                    ? 'Less formal requirements compared to corporations (no board of directors required, for example).'
                    : 'Anonim şirketlere kıyasla daha az formalite gerektirir; örneğin yönetim kurulu zorunluluğu yoktur.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Credibility:' : 'Güvenilirlik:'}</strong>{' '}
                  {isEnglish
                    ? 'Having a formal business structure may increase credibility with clients and partners.'
                    : 'Tescilli bir ticari yapıya sahip olmak, müşteri ve iş ortakları nezdinde güven oluşturabilir.'}
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="state-selection" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                3. {isEnglish ? 'State Selection' : 'Eyalet Seçimi'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'One of the first decisions when forming an LLC is choosing which state to incorporate in. Here are some general considerations:'
                  : "LLC kuruluşunda verilecek ilk kararlardan biri eyalet seçimidir. Göz önünde bulundurulması gereken başlıca hususlar şunlardır:"}
              </p>

              <h3 className="text-lg font-semibold text-black mt-6 mb-3">
                {isEnglish ? 'Common Choices' : 'Yaygın Tercihler'}
              </h3>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Delaware:</strong>{' '}
                  {isEnglish
                    ? 'Known for business-friendly laws and an experienced court system (Court of Chancery). Often chosen by startups seeking venture capital.'
                    : "İş hukukuna elverişli mevzuatı ve köklü ticaret mahkemesi (Court of Chancery) ile bilinir. Özellikle risk sermayesi hedefleyen girişimler tarafından tercih edilir."}
                </li>
                <li>
                  <strong>Wyoming:</strong>{' '}
                  {isEnglish
                    ? 'No state income tax, strong privacy protections, and low annual fees.'
                    : 'Eyalet gelir vergisi bulunmaz. Güçlü gizlilik düzenlemeleri ve düşük yıllık harçlar sunar.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Home State:' : 'Yaşadığınız Eyalet:'}</strong>{' '}
                  {isEnglish
                    ? 'If you live in the US, forming in your home state is often simplest and may avoid foreign qualification requirements.'
                    : "ABD'de ikamet ediyorsanız, bulunduğunuz eyalette kuruluş yapmak genellikle en pratik yoldur ve başka eyaletlerde ek tescil yükümlülüğü doğmasını önler."}
                </li>
              </ul>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-6">
                <h4 className="font-semibold text-black mb-2">
                  {isEnglish ? 'For Non-US Residents:' : "ABD Dışında İkamet Edenler İçin:"}
                </h4>
                <p className="text-sm text-gray-700">
                  {isEnglish
                    ? "If you don't live in the US, the state choice is more flexible. Wyoming and Delaware are popular among international entrepreneurs for their privacy laws and straightforward processes."
                    : "ABD'de ikamet etmiyorsanız eyalet seçiminde daha geniş bir hareket alanınız vardır. Wyoming ve Delaware, gizlilik düzenlemeleri ve sade kuruluş süreçleri nedeniyle yabancı girişimciler arasında sıkça tercih edilir."}
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="formation-process" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                4. {isEnglish ? 'Formation Process' : 'Kuruluş Süreci'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'While the exact process varies by state, the general steps for forming an LLC are:'
                  : 'Süreç eyaletten eyalete farklılık gösterse de genel adımlar şöyledir:'}
              </p>

              <ol className="list-decimal pl-6 space-y-4 text-gray-700">
                <li>
                  <strong>{isEnglish ? 'Choose a Name:' : 'İsim Seçin:'}</strong>{' '}
                  {isEnglish
                    ? 'The name must be unique in the state and typically must include "LLC" or "Limited Liability Company."'
                    : 'İsim eyalette benzersiz olmalı ve genellikle "LLC" veya "Limited Liability Company" içermelidir.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Registered Agent:' : 'Kayıtlı Temsilci:'}</strong>{' '}
                  {isEnglish
                    ? 'You need a registered agent with a physical address in the state to receive legal documents.'
                    : 'Resmi tebligatları teslim alması için kuruluş eyaletinde fiziki adresi bulunan bir kayıtlı temsilci (registered agent) atamanız gerekir.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Articles of Organization:' : 'Kuruluş Belgesi:'}</strong>{' '}
                  {isEnglish
                    ? 'File the formation documents (usually called Articles of Organization) with the state.'
                    : 'Kuruluş belgesini (Articles of Organization) ilgili eyalet makamına sunun.'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Operating Agreement:' : 'İşletme Sözleşmesi:'}</strong>{' '}
                  {isEnglish
                    ? 'While not always legally required, an Operating Agreement defines how the LLC will be run.'
                    : "Her eyalette zorunlu olmasa da İşletme Sözleşmesi, LLC'nin yönetim yapısını ve üyelerin hak ile yükümlülüklerini düzenler."}
                </li>
                <li>
                  <strong>{isEnglish ? 'EIN (Tax ID):' : 'EIN (Vergi Kimliği):'}</strong>{' '}
                  {isEnglish
                    ? 'Apply for an Employer Identification Number from the IRS.'
                    : "IRS'ye Employer Identification Number (İşveren Kimlik Numarası) başvurusu yapın."}
                </li>
              </ol>
            </section>

            {/* Section 5 */}
            <section id="tax-implications" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                5. {isEnglish ? 'Tax Implications' : 'Vergisel Etkiler'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'The tax treatment of an LLC depends on several factors, including where you live and how the LLC elects to be taxed:'
                  : "Bir LLC'nin ABD vergi sistemi içindeki konumu, tek bir kurala bağlı değildir. Vergilendirme; nerede ikamet ettiğiniz, LLC'nin faaliyet yapısı ve hangi vergi statüsünün seçildiği gibi birden fazla unsura göre belirlenir."}
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-5 my-6">
                <h4 className="font-semibold text-red-800 mb-2">
                  {isEnglish ? 'Important for Non-US Residents:' : "ABD'de Yerleşik Olmayanlar İçin Özel Not:"}
                </h4>
                <p className="text-sm text-red-900 mb-3">
                  {isEnglish
                    ? 'Tax obligations for non-US LLC owners are complex and depend on tax treaties, the type of income, and where you perform work. Consult a tax professional familiar with international tax law.'
                    : 'ABD dışında yaşayan LLC sahipleri açısından vergi yükümlülükleri:'}
                </p>
                {!isEnglish && (
                  <ul className="text-sm text-red-900 list-disc pl-5 space-y-1 mb-3">
                    <li>ABD kaynaklı gelir olup olmadığına,</li>
                    <li>Türkiye–ABD vergi anlaşmalarına,</li>
                    <li>ve fiilî faaliyetin nerede yürütüldüğüne</li>
                  </ul>
                )}
                {!isEnglish && (
                  <p className="text-sm text-red-900">
                    göre değişiklik gösterebilir. Bu nedenle, sınır ötesi gelir ve yapıların genel şablonlarla değil, somut çerçevede değerlendirilmesi gerekir.
                  </p>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish
                  ? 'Common tax elections include being treated as a "disregarded entity" (pass-through to personal taxes), a partnership, or a corporation (S-Corp or C-Corp election).'
                  : "ABD'de en sık karşılaşılan LLC vergilendirme seçenekleri şunlardır:"}
              </p>

              {!isEnglish && (
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Vergisel olarak yok sayılan yapı (disregarded entity)</li>
                  <li>Ortaklık (partnership) olarak vergilendirme</li>
                  <li>Şirket statüsü (C-Corp veya belirli şartlarda S-Corp)</li>
                </ul>
              )}

              <p className="text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'Each election has different tax consequences. The choice should be evaluated not just for "less tax" but for long-term compliance and risk.'
                  : 'Her seçeneğin vergi sonuçları farklıdır ve seçim, yalnızca "daha az vergi" değil, uzun vadeli uyum ve risk açısından değerlendirilmelidir.'}
              </p>
            </section>

            {/* Section 6 */}
            <section id="common-misconceptions" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                6. {isEnglish ? 'Common Misconceptions' : 'Sık Yapılan Hatalar'}
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-red-700 mb-1">
                    {isEnglish ? 'Myth: "Forming an LLC gives me a US visa."' : 'Yanılgı: "LLC kurmak bana ABD vizesi verir."'}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {isEnglish
                      ? 'Reality: Forming an LLC does NOT grant any immigration benefits or visa status. These are completely separate legal processes.'
                      : 'Gerçek: LLC kurmak herhangi bir göçmenlik avantajı veya vize statüsü SAĞLAMAZ. Bunlar tamamen ayrı hukuki süreçlerdir.'}
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-red-700 mb-1">
                    {isEnglish ? 'Myth: "A Delaware LLC means no taxes."' : 'Yanılgı: "Delaware LLC vergisiz demektir."'}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {isEnglish
                      ? 'Reality: Delaware has no state income tax for out-of-state earnings, but you may still owe federal taxes and taxes in your country of residence.'
                      : "Gerçek: Delaware, eyalet dışından elde edilen gelirler üzerinden eyalet gelir vergisi almaz. Ancak federal vergi yükümlülüğünüz ve ikamet ettiğiniz ülkedeki vergi borcunuz devam edebilir."}
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-red-700 mb-1">
                    {isEnglish ? 'Myth: "I can use my LLC to open any US bank account."' : "Yanılgı: \"LLC'mle herhangi bir ABD banka hesabı açabilirim.\""}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {isEnglish
                      ? 'Reality: Many traditional US banks require in-person visits or have strict requirements for non-resident account holders.'
                      : 'Gerçek: Birçok geleneksel ABD bankası yüz yüze ziyaret gerektirir veya yerleşik olmayan hesap sahipleri için katı gereksinimleri vardır.'}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/${lang}/library/hukuki-yanilgilar`}
                  className="inline-flex items-center text-[#C9A227] font-medium hover:text-[#B8922A]"
                >
                  {isEnglish ? 'Read more about common legal mistakes →' : 'Sık yapılan hukuki hatalar hakkında daha fazla oku →'}
                </Link>
              </div>
            </section>

            {/* Section 7 */}
            <section id="next-steps" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                7. {isEnglish ? 'Documents You May Need' : 'İhtiyacınız Olabilecek Belgeler'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isEnglish
                  ? "Once your LLC is formed, you'll likely need certain legal documents for ongoing business operations:"
                  : "LLC'niz kurulduktan sonra, devam eden iş operasyonları için muhtemelen belirli hukuki belgelere ihtiyacınız olacaktır:"}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/${lang}/contracts/nda`}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-black mb-1">
                    {isEnglish ? 'Non-Disclosure Agreement' : 'Gizlilik Sözleşmesi (NDA)'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isEnglish
                      ? 'Protect confidential information when discussing business opportunities.'
                      : 'İş fırsatlarını görüşürken gizli bilgileri koruyun.'}
                  </p>
                </Link>

                <Link
                  href={`/${lang}/contracts/service-agreement`}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-black mb-1">
                    {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isEnglish
                      ? 'Define terms for client work, payment, and deliverables.'
                      : 'Müşteri işi, ödeme ve teslimatlar için koşulları tanımlayın.'}
                  </p>
                </Link>

                <Link
                  href={`/${lang}/contracts/independent-contractor`}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-black mb-1">
                    {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isEnglish
                      ? 'Establish terms when hiring contractors.'
                      : 'Yüklenici çalıştırırken koşulları belirleyin.'}
                  </p>
                </Link>

                <Link
                  href={`/${lang}/contracts/privacy-policy`}
                  className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-black mb-1">
                    {isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isEnglish
                      ? 'Required for websites and apps that collect user data.'
                      : 'Kullanıcı verisi toplayan web siteleri ve uygulamalar için gerekli.'}
                  </p>
                </Link>
              </div>
            </section>
          </div>

          {/* Product CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              {isEnglish ? 'Get All Essential Documents' : 'Tüm Temel Belgeleri Alın'}
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
              {isEnglish
                ? 'Our Business Starter Kit includes 5 essential legal documents for starting a business in the US. I support EchoLegal – $20 recommended.'
                : "Business Starter Kit'imiz ABD'de iş kurmak için 5 temel hukuki belge içerir. Gücünüz kadar ödeyin."}
            </p>
            <div className="text-center">
              <Link
                href={`/${lang}/legal-kits/business-starter`}
                className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
              >
                {isEnglish ? 'View Business Starter Kit →' : "Business Starter Kit'i Görüntüle →"}
              </Link>
            </div>
          </div>

          {/* Related Resources */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/${lang}/library/irs-vergi-gercekleri`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'IRS & Tax Facts' : 'IRS ve Vergi Gerçekleri'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Understanding W-8, W-9, and 1099 forms.'
                    : 'W-8, W-9 ve 1099 formlarını anlama.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/llc-vize-yanilgisi`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Understanding the immigration realities.'
                    : 'Göçmenlik gerçeklerini anlama.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/hukuki-yanilgilar`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'Common Legal Misconceptions' : 'Sık Yapılan Hukuki Hatalar'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Myths vs. facts about US business.'
                    : 'ABD işi hakkında mitler ve gerçekler.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/temel-sozlesmeler`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'Essential Contracts' : 'Olmazsa Olmaz Sözleşmeler'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Contracts every US business needs.'
                    : 'Her ABD işinin ihtiyaç duyduğu sözleşmeler.'}
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
  )
}
