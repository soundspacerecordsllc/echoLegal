// app/[lang]/amerika/abd-ye-gelmeden-once/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Before Arriving in the US: Legal Readiness Checklist | EchoLegal'
      : "ABD'ye Gelmeden Önce Yapılması Gerekenler | EchoLegal",
    description: isEnglish
      ? 'Essential legal preparation checklist for Turkish entrepreneurs before arriving in the United States. Business formation, tax compliance, banking, and documentation.'
      : "Türk girişimcilerin ABD'ye gelmeden önce tamamlaması gereken hukuki hazırlıklar. Şirket kurulumu, vergi uyumu, bankacılık ve belge düzeni.",
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function PreArrivalChecklistPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/amerika`} className="hover:text-black">{isEnglish ? 'US Hub' : 'ABD Merkezi'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'Before Arriving' : 'Gelmeden Önce'}</span>
        </nav>

        <article>
          {/* Hero */}
          <header className="mb-10">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold mb-4">
              {isEnglish ? 'Legal Readiness Checklist' : 'Hukuki Hazırlık Kontrol Listesi'}
            </span>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              {isEnglish
                ? 'Before Arriving in the US'
                : "ABD'ye Gelmeden Önce Yapılması Gerekenler"}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {isEnglish
                ? 'A practical checklist for Turkish entrepreneurs preparing to do business in the United States. Know the legal landscape before you arrive.'
                : "ABD'de iş kurmayı planlayan Türk girişimciler için pratik bir kontrol listesi. Yola çıkmadan önce hukuki zemini tanıyın."}
            </p>
          </header>

          {/* Section 1: Hukuki Statü ve Giriş Gerçekleri */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              {isEnglish ? 'Legal Status & Entry Realities' : 'Hukuki Statü ve Giriş Gerçekleri'}
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? 'Visa Type = Boundaries' : 'Vize Türü = Sınırlar'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'Each visa category has specific limitations on what activities are permitted. A B-1/B-2 visa allows meetings and negotiations but not employment. An E-2 requires substantial investment and active management. Know your visa\'s boundaries before making commitments.'
                    : 'Her vize kategorisinin izin verdiği faaliyetler sınırlıdır. B-1/B-2 vizesiyle toplantı ve müzakere yapabilirsiniz ancak çalışamazsınız. E-2 vizesi ise ciddi bir yatırım ve aktif yönetim katılımı gerektirir. Herhangi bir taahhütte bulunmadan önce vizenizin kapsamını net olarak bilin.'}
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? 'Misrepresentation Risks at Entry' : 'Girişte Yanlış Beyan Riskleri'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'Stating one purpose at the border while intending another can result in entry denial, visa revocation, or future immigration bars. CBP officers are trained to identify inconsistencies. If you\'re entering to explore business opportunities, say so—don\'t claim tourism while carrying business documents.'
                    : 'Sınırda belirttiğiniz amaçla gerçek niyetiniz örtüşmezse giriş reddi, vize iptali ve hatta ileriye dönük giriş yasağı gündeme gelebilir. CBP memurları bu tür tutarsızlıkları saptamak konusunda deneyimlidir. İş fırsatlarını araştırmak amacıyla geliyorsanız bunu açıkça ifade edin; yanınızda iş belgeleri varken turist olduğunuzu söylemeyin.'}
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <h3 className="font-semibold text-black mb-2">
                  {isEnglish ? 'The Tourist Visa Business Myth' : '"Turist Vizesiyle İş Kurma" Yanlış Algısı'}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isEnglish
                    ? 'Forming an LLC while on a tourist visa is technically possible—an LLC is just a business structure. But this doesn\'t grant work authorization. You cannot manage day-to-day operations, receive US-source salary, or be physically present as an employee. The LLC exists; your right to work in it may not.'
                    : 'Turist vizesiyle LLC kurmak teknik olarak mümkündür; LLC nihayetinde bir ticari yapıdır. Ancak bu size çalışma izni vermez. Günlük işleri yönetemez, ABD kaynaklı maaş alamaz ve fiziken çalışan sıfatıyla bulunamazsınız. Şirket kağıt üzerinde var olur, ama içinde çalışma hakkınız olmayabilir.'}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/${lang}/amerika/abdye-gelme-yollari`} className="text-blue-600 font-medium hover:underline text-sm">
                {isEnglish ? '→ View all visa categories' : '→ Tüm vize kategorilerini görüntüle'}
              </Link>
            </div>
          </section>

          {/* Section 2: Şirket Kurulumu */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              {isEnglish ? 'Business Formation (Before Arrival)' : 'Şirket Kurulumu (ABD\'ye Gelmeden Önce)'}
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'When an LLC Makes Sense' : 'LLC Ne Zaman Mantıklı'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    {isEnglish
                      ? 'You have US clients requiring a US business entity for payment'
                      : 'ABD\'deki müşterileriniz ödeme yapabilmek için ABD tüzel kişiliği talep ediyor'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    {isEnglish
                      ? 'You need a US bank account for operational purposes'
                      : 'İş akışınız için ABD\'de bir banka hesabına ihtiyacınız var'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    {isEnglish
                      ? 'You want liability separation between personal and business assets'
                      : 'Kişisel varlıklarınızı ticari sorumluluklardan ayırmak istiyorsunuz'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    {isEnglish
                      ? 'You\'re preparing for an investment-based visa (E-2) application'
                      : 'Yatırım temelli vize (E-2) başvurusuna hazırlanıyorsunuz'}
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'When an LLC Does NOT Make Sense' : 'LLC Ne Zaman Mantıklı Değil'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    {isEnglish
                      ? 'You believe it will help you get a visa (it will not)'
                      : 'Vize almanıza yardımcı olacağına inanıyorsunuz (olmayacak)'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    {isEnglish
                      ? 'You have no concrete US business activity planned'
                      : 'Somut ABD iş faaliyeti planınız yok'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    {isEnglish
                      ? 'You\'re forming it "just in case" without understanding compliance obligations'
                      : 'Getirdiği yükümlülükleri bilmeden sırf "her ihtimale karşı" kuruyorsunuz'}
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'EIN, Registered Agent, Address Realities' : 'EIN, Registered Agent, Adres Gerçekleri'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>EIN:</strong>{' '}
                    {isEnglish
                      ? 'Employer Identification Number from IRS. Required for bank accounts and tax filings. Can be obtained without SSN using Form SS-4.'
                      : "IRS'ten Employer Identification Number. Banka hesapları ve vergi beyannameleri için gereklidir. SSN olmadan Form SS-4 kullanılarak alınabilir."}
                  </li>
                  <li>
                    <strong>Registered Agent:</strong>{' '}
                    {isEnglish
                      ? 'Required in most states. Must have a physical address in the state of formation to receive legal documents.'
                      : 'Çoğu eyalette gereklidir. Hukuki belgeleri almak için kuruluş eyaletinde fiziksel bir adrese sahip olmalıdır.'}
                  </li>
                  <li>
                    <strong>{isEnglish ? 'Business Address:' : 'İş Adresi:'}</strong>{' '}
                    {isEnglish
                      ? 'Virtual addresses work for mail but may not be accepted by all banks or state agencies.'
                      : 'Sanal adresler posta için çalışır ancak tüm bankalar veya devlet kurumları tarafından kabul edilmeyebilir.'}
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <h3 className="font-semibold text-amber-900 mb-2">
                  {isEnglish ? 'Bank Account Expectations (Myth vs. Reality)' : 'Banka Hesabı Beklentileri (Mit vs. Gerçek)'}
                </h3>
                <p className="text-sm text-amber-800">
                  {isEnglish
                    ? 'Many non-residents assume they can easily open a US business bank account remotely. Reality: Traditional banks often require in-person verification, SSN/ITIN, and substantial documentation. Fintech alternatives (Mercury, Relay) have different requirements but may have limitations on certain transactions.'
                    : 'ABD mukimi olmayan pek çok kişi, uzaktan kolayca ABD ticari banka hesabı açabileceğini düşünür. Oysa geleneksel bankalar çoğunlukla yüz yüze kimlik doğrulaması, SSN veya ITIN ve kapsamlı evrak ister. Mercury veya Relay gibi fintech alternatifleri farklı şartlar sunar, ancak bunların da bazı işlem türlerinde kısıtlamaları olabilir.'}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/${lang}/library/llc-kurma-rehberi`} className="text-blue-600 font-medium hover:underline text-sm">
                {isEnglish ? '→ Read full LLC formation guide' : '→ Tam LLC kurma rehberini oku'}
              </Link>
            </div>
          </section>

          {/* Section 3: Vergi ve Uyumluluk Hazırlığı */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              {isEnglish ? 'Tax & Compliance Preparation' : 'Vergi ve Uyumluluk Hazırlığı'}
            </h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'Basic Tax Framework for Non-Residents' : 'ABD Mukimi Olmayanlar İçin Temel Vergi Çerçevesi'}
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  {isEnglish
                    ? 'US tax obligations depend on your residency status (for tax purposes), business structure, and income sources. Non-resident aliens with US-source income may have withholding requirements. LLCs have different tax treatment based on election and member count.'
                    : 'ABD vergi yükümlülükleriniz; vergisel ikamet durumunuza, şirket yapınıza ve gelir kaynağınıza göre belirlenir. ABD kaynaklı geliri bulunan yabancı uyrukluların stopaj yükümlülüğü doğabilir. LLC\'lerin vergisel muamelesi, seçilen vergi statüsüne ve üye sayısına göre değişir.'}
                </p>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Key forms to know: W-8BEN (for non-residents), W-9 (for US persons), 1099 (income reporting), 5472 (foreign-owned LLC disclosure).'
                    : "Bilmeniz gereken başlıca formlar: W-8BEN (ABD mukimi olmayanlar için), W-9 (ABD mukimleri için), 1099 (gelir bildirimi), 5472 (yabancı ortaklı LLC bildirimi)."}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'ITIN vs. SSN' : 'ITIN / SSN Farkı'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>SSN (Social Security Number):</strong>{' '}
                    {isEnglish
                      ? 'Issued to US citizens, permanent residents, and those authorized to work. Required for employment.'
                      : 'ABD vatandaşlarına, kalıcı oturma izni sahiplerine ve çalışma izni bulunanlara verilir. Çalışma hakkı için zorunludur.'}
                  </li>
                  <li>
                    <strong>ITIN (Individual Taxpayer Identification Number):</strong>{' '}
                    {isEnglish
                      ? 'For individuals who need to file US taxes but are not eligible for SSN. Does not authorize work.'
                      : 'ABD\'de vergi beyannamesi vermesi gereken ancak SSN almaya hakkı olmayan kişilere verilir. Çalışma izni sağlamaz.'}
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <h3 className="font-semibold text-red-900 mb-2">
                  {isEnglish ? 'Consequences of Improper Structure' : 'Yanlış Yapılandırmanın Sonuçları'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? 'Incorrect tax elections, missed filings, or improper classification can result in penalties, back taxes, and complications with future visa applications. The IRS shares information with immigration authorities in certain circumstances.'
                    : 'Hatalı vergi statüsü seçimi, verilmeyen beyannameler veya yanlış sınıflandırma; para cezasına, geriye dönük vergi tarhiyatına ve ilerideki vize başvurularınızda ciddi sorunlara neden olabilir. IRS, belirli durumlarda göçmenlik makamlarıyla bilgi paylaşmaktadır.'}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/${lang}/library/irs-vergi-gercekleri`} className="text-blue-600 font-medium hover:underline text-sm">
                {isEnglish ? '→ Read IRS & tax facts guide' : '→ IRS ve vergi gerçekleri rehberini oku'}
              </Link>
            </div>
          </section>

          {/* Section 4: Banka, Ödeme ve Para Transferi */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              {isEnglish ? 'Banking, Payments & Money Transfer' : 'Banka, Ödeme ve Para Transferi'}
            </h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'US Bank Account Realities' : 'ABD Banka Hesabı Açma Gerçekleri'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    {isEnglish
                      ? 'Traditional banks (Chase, Bank of America, Wells Fargo) typically require in-person visit, often with visa documentation'
                      : 'Chase, Bank of America, Wells Fargo gibi geleneksel bankalar genellikle vize belgelerinizle birlikte yüz yüze başvuru ister'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    {isEnglish
                      ? 'Some banks accept only certain visa types or require minimum deposits'
                      : 'Bazı bankalar yalnızca belirli vize türlerini kabul eder ya da asgari bakiye şartı koyar'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    {isEnglish
                      ? 'Business accounts have different requirements than personal accounts'
                      : 'Ticari hesap açma koşulları bireysel hesaplardan farklıdır'}
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'Fintech Alternatives & Their Limitations' : 'Wise / Mercury / Relay Gibi Yapıların Sınırları'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    {isEnglish
                      ? 'May have restrictions on certain business types or transaction volumes'
                      : 'Belirli faaliyet türleri veya işlem hacimleri bakımından kısıtlamalar içerebilir'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    {isEnglish
                      ? 'Account freezes can occur with limited recourse'
                      : 'Hesap dondurma riski vardır ve itiraz imkanları sınırlı olabilir'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    {isEnglish
                      ? 'Not all accept non-resident owners without US presence'
                      : 'Tamamı, ABD\'de fiziki varlığı olmayan yabancı sahipleri kabul etmez'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    {isEnglish
                      ? 'Integration with Turkish banking may have delays or fees'
                      : 'Türkiye\'deki bankalarla entegrasyonda gecikmeler veya ek masraflar söz konusu olabilir'}
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <h3 className="font-semibold text-red-900 mb-2">
                  {isEnglish ? 'Turkey-US Money Flow Risks' : 'Türkiye–ABD Para Akışı Riskleri'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? 'Large or frequent transfers between Turkey and the US may trigger reporting requirements or compliance reviews. Both countries have anti-money laundering regulations. Document the business purpose of significant transfers. Unexplained fund movements can complicate both tax and immigration matters.'
                    : 'Türkiye ile ABD arasındaki yüksek tutarlı veya sık tekrarlanan transferler, raporlama yükümlülüklerini ya da uyum denetimlerini tetikleyebilir. Her iki ülkede de kara para aklamayla mücadele düzenlemeleri mevcuttur. Büyük tutarlı transferlerin ticari gerekçesini mutlaka belgeleyin. Kaynağı açıklanamayan fon hareketleri, hem vergi hem de göçmenlik süreçlerinizi ciddi şekilde zorlaştırabilir.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Sözleşmeler ve Belgeler */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
              {isEnglish ? 'Contracts & Documents' : 'Sözleşmeler ve Belgeler'}
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-black mb-3">
                  {isEnglish ? 'Documents to Prepare Before Arrival' : 'ABD\'ye Gelmeden Önce Hazırlamanız Gereken Belgeler'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      <strong>{isEnglish ? 'Service Agreement:' : 'Hizmet Sözleşmesi:'}</strong>{' '}
                      {isEnglish
                        ? 'If you\'ll be providing services to US clients'
                        : 'ABD\'deki müşterilere hizmet sunacaksanız'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      <strong>{isEnglish ? 'Independent Contractor Agreement:' : 'Bağımsız Yüklenici Sözleşmesi:'}</strong>{' '}
                      {isEnglish
                        ? 'If you\'ll be hiring contractors or working as one'
                        : 'Yüklenici çalıştıracaksanız veya yüklenici olarak çalışacaksanız'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      <strong>{isEnglish ? 'NDA (Non-Disclosure Agreement):' : 'Gizlilik Sözleşmesi (NDA):'}</strong>{' '}
                      {isEnglish
                        ? 'For protecting business discussions and proprietary information'
                        : 'İş görüşmelerinde ve ticari sır niteliğindeki bilgilerin korunmasında'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      <strong>{isEnglish ? 'Operating Agreement:' : 'İşletme Sözleşmesi:'}</strong>{' '}
                      {isEnglish
                        ? 'If forming an LLC (required in many states, recommended in all)'
                        : 'LLC kuruyorsanız (birçok eyalette zorunlu, hepsinde önerilir)'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <h3 className="font-semibold text-amber-900 mb-2">
                  {isEnglish ? 'Why "We\'ll Figure It Out Later" Is Expensive' : '"Sonra Bakarız" Neden Pahalı'}
                </h3>
                <p className="text-sm text-amber-800">
                  {isEnglish
                    ? 'Verbal agreements, handshake deals, and "we trust each other" approaches work until they don\'t. Disputes with US parties without written contracts mean US courts applying default rules that may not favor you. Legal fees for litigation far exceed the cost of proper documentation upfront.'
                    : 'Sözlü anlaşmalar, el sıkışma anlaşmaları ve "birbirimize güveniyoruz" yaklaşımları çalışır—ta ki çalışmayana kadar. Yazılı sözleşmeler olmadan ABD taraflarıyla anlaşmazlıklar, size avantaj sağlamayabilecek varsayılan kuralları uygulayan ABD mahkemeleri anlamına gelir. Dava için hukuki ücretler, önceden uygun belgeleme maliyetinin çok üzerindedir.'}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/${lang}/contracts`} className="text-blue-600 font-medium hover:underline text-sm">
                {isEnglish ? '→ Browse contract templates' : '→ Sözleşme şablonlarına göz at'}
              </Link>
            </div>
          </section>

          {/* Section 6: Sık Yapılan Hatalar */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
              {isEnglish ? 'Common Mistakes (Summary)' : 'Sık Yapılan Hatalar (Özet)'}
            </h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-4">
                {isEnglish ? 'Frequent Pitfalls for Turkish Entrepreneurs' : 'Türk Girişimcilerin En Sık Düştüğü Tuzaklar'}
              </h3>
              <ul className="space-y-3 text-sm text-red-800">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">1.</span>
                  {isEnglish
                    ? 'Believing LLC formation leads to visa eligibility'
                    : 'LLC kurmanın vize uygunluğuna yol açtığına inanmak'}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">2.</span>
                  {isEnglish
                    ? 'Working while in the US on a tourist visa'
                    : 'Turist vizesiyle ABD\'deyken çalışmak'}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">3.</span>
                  {isEnglish
                    ? 'Ignoring state-level tax and compliance requirements'
                    : 'Eyalet düzeyindeki vergi ve uyumluluk gereksinimlerini görmezden gelmek'}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">4.</span>
                  {isEnglish
                    ? 'Using personal accounts for business transactions'
                    : 'İş işlemleri için kişisel hesapları kullanmak'}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">5.</span>
                  {isEnglish
                    ? 'Relying on internet forums instead of qualified professionals'
                    : 'Nitelikli profesyoneller yerine internet forumlarına güvenmek'}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">6.</span>
                  {isEnglish
                    ? 'Underestimating the complexity of US immigration law'
                    : 'ABD göçmenlik hukukunun karmaşıklığını hafife almak'}
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">7.</span>
                  {isEnglish
                    ? 'Not keeping proper records of business activities and fund movements'
                    : 'İş faaliyetleri ve fon hareketlerinin uygun kayıtlarını tutmamak'}
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-5">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'Misinformation from the Internet' : 'İnternetten Alınan Yanlış Bilgiler'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? 'YouTube videos, Turkish entrepreneur forums, and social media groups often contain outdated, oversimplified, or simply incorrect information about US immigration and business law. What worked for someone else may not work for you. What was true in 2020 may not be true today. Always verify with official sources and qualified professionals.'
                  : 'YouTube videoları, Türk girişimci forumları ve sosyal medya grupları genellikle ABD göçmenlik ve iş hukuku hakkında güncel olmayan, aşırı basitleştirilmiş veya sadece yanlış bilgiler içerir. Başkası için işe yarayan sizin için işe yaramayabilir. 2020\'de doğru olan bugün doğru olmayabilir. Her zaman resmi kaynaklardan ve nitelikli profesyonellerden doğrulayın.'}
              </p>
            </div>
          </section>

          {/* Section 7: Hukuki Bilgilendirme */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">7</span>
              {isEnglish ? 'Legal Notice' : 'Hukuki Bilgilendirme'}
            </h2>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'This content provides general legal information only and does not constitute legal, tax, or immigration advice. Laws and regulations change frequently, and individual circumstances vary significantly. The information presented is for educational purposes and should not be relied upon for decision-making without consultation with qualified professionals licensed in the relevant jurisdiction. EchoLegal does not create an attorney-client relationship through this content.'
                  : 'Bu içerik yalnızca genel hukuki bilgi sağlar ve hukuki, vergisel veya göçmenlik danışmanlığı teşkil etmez. Yasalar ve düzenlemeler sık sık değişir ve bireysel koşullar önemli ölçüde farklılık gösterir. Sunulan bilgiler eğitim amaçlıdır ve ilgili yargı yetkisinde lisanslı nitelikli profesyonellerle istişare yapılmadan karar verme için güvenilmemelidir. EchoLegal, bu içerik aracılığıyla avukat-müvekkil ilişkisi oluşturmaz.'}
              </p>
            </div>
          </section>

          {/* Review Schedule */}
          <div className="bg-gray-50 rounded-lg p-4 mb-10 text-sm text-gray-600">
            <p><strong>{isEnglish ? 'Last reviewed:' : 'Son gözden geçirme:'}</strong> {isEnglish ? 'January 2026' : 'Ocak 2026'}</p>
            <p><strong>{isEnglish ? 'Next scheduled update:' : 'Sonraki planlanan güncelleme:'}</strong> {isEnglish ? 'April 2026' : 'Nisan 2026'}</p>
          </div>

          {/* Editorial Resource Reference */}
          <section className="border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-700 mb-4">
              {isEnglish
                ? 'The most commonly used starter documents when establishing a US business:'
                : 'ABD\'de iş kurarken pratikte en sık kullanılan başlangıç belgeleri:'}
            </p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>• {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</li>
              <li>• {isEnglish ? 'NDA (Non-Disclosure Agreement)' : 'Gizlilik Sözleşmesi (NDA)'}</li>
              <li>• {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}</li>
              <li>• {isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}</li>
              <li>• {isEnglish ? 'Terms of Service' : 'Kullanım Koşulları'}</li>
            </ul>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Link
                href={`/${lang}/legal-kits/business-starter`}
                className="text-[#C9A227] font-medium hover:underline text-sm"
              >
                {isEnglish ? 'ABD Business Starter Legal Kit →' : 'ABD Business Starter Legal Kit →'}
              </Link>
              <span className="text-xs text-gray-500">
                {isEnglish ? 'I support EchoLegal – $20 recommended' : 'EchoLegal\'i destekliyorum – 20$ önerilir'}
              </span>
            </div>
          </section>
        </article>
    </main>
  )
}
