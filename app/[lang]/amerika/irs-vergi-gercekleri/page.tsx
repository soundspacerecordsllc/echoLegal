import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import { getRegistryEntry } from '@/lib/amerika-content-registry'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "IRS Tax Realities - US Tax Basics for Non-Residents | EchoLegal"
      : "IRS Vergi Gerçekleri – ABD'de Mukim Olmayanlar İçin Temel Vergi Bilgileri | EchoLegal",
    description: isEnglish
      ? "Understanding US tax obligations. Substantial presence test, FATCA, FBAR, US-Turkey tax treaty, and common misconceptions."
      : "ABD vergi yükümlülüklerine genel bakış. Substantial presence test, FATCA, FBAR, ABD-Türkiye vergi anlaşması ve sık karşılaşılan yanılgılar.",
  }
}

export default async function IRSVergiPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('irs-vergi-gercekleri')

  const faqItems = [
    {
      question: isEnglish ? "Do I have to pay US taxes if I own a US LLC?" : "ABD'de bir LLC'm varsa ABD'ye vergi ödemem gerekir mi?",
      answer: isEnglish
        ? "It depends on your tax residency status and income source. A single-member LLC owned by a non-resident alien with no US-source income generally has minimal US tax obligations, but there are still filing requirements and state-level taxes to consider."
        : "Bu, vergi mukimlik durumunuza ve gelir kaynağınıza göre değişir. ABD kaynaklı geliri bulunmayan ve mukim olmayan bir yabancının sahip olduğu tek üyeli LLC'nin federal düzeyde vergi yükümlülüğü genellikle sınırlıdır. Bununla birlikte, beyanname verme zorunlulukları ve eyalet düzeyindeki vergiler ayrıca değerlendirilmelidir."
    },
    {
      question: isEnglish ? "What is the substantial presence test?" : "Substantial presence test nedir?",
      answer: isEnglish
        ? "A formula to determine US tax residency: you're a resident if you're in the US at least 31 days in the current year AND 183 days over 3 years (current year days + 1/3 of prior year days + 1/6 of second prior year days). Certain visa holders are exempt."
        : "ABD vergi mukimliğini belirlemek için kullanılan bir formüldür. Cari yılda en az 31 gün ABD'de bulunmanız ve üç yıllık ağırlıklı hesaplamada toplam 183 güne ulaşmanız hâlinde mukim sayılırsınız. Formül şu şekilde uygulanır: cari yıl günleri + bir önceki yılın günlerinin üçte biri + iki önceki yılın günlerinin altıda biri. Belirli vize kategorileri bu testten muaftır."
    },
    {
      question: isEnglish ? "What is FATCA?" : "FATCA nedir?",
      answer: isEnglish
        ? "Foreign Account Tax Compliance Act requires foreign financial institutions to report accounts held by US persons to the IRS. If you're a US tax resident or citizen, your foreign banks report your accounts to the IRS."
        : "FATCA (Foreign Account Tax Compliance Act), yabancı finansal kuruluşların ABD vatandaşları ve mukimleri adına tutulan hesapları IRS'e bildirmesini zorunlu kılan federal bir düzenlemedir. ABD vergi mukimi veya vatandaşıysanız, yurt dışındaki bankalarınız hesap bilgilerinizi doğrudan IRS'e iletir."
    },
    {
      question: isEnglish ? "What is FBAR?" : "FBAR nedir?",
      answer: isEnglish
        ? "Report of Foreign Bank and Financial Accounts. US persons with foreign financial accounts exceeding $10,000 aggregate value at any time during the year must file FinCEN Form 114. Penalties for non-filing are severe."
        : "FBAR (Report of Foreign Bank and Financial Accounts), yurt dışındaki finansal hesapların bildirim yükümlülüğüdür. Yıl içinde herhangi bir anda toplam bakiyesi 10.000 doları aşan yabancı hesaplara sahip ABD kişileri, FinCEN Form 114'ü elektronik olarak beyan etmek zorundadır. Bu yükümlülüğe uyulmaması hâlinde ağır para cezaları uygulanır."
    },
    {
      question: isEnglish ? "Is there a US-Turkey tax treaty?" : "ABD-Türkiye vergi anlaşması var mı?",
      answer: isEnglish
        ? "Yes. The US-Turkey tax treaty (TIAS 10205) provides rules for avoiding double taxation and reduced withholding rates on certain income types. Treaty benefits require proper claiming and documentation."
        : "Evet. ABD-Türkiye vergi anlaşması (TIAS 10205), çifte vergilendirmenin önlenmesine ilişkin kurallar ile belirli gelir türlerinde indirimli stopaj oranları öngörür. Anlaşma kapsamındaki haklardan yararlanabilmek için usulüne uygun başvuru yapılması ve gerekli belgelerin sunulması şarttır."
    },
    {
      question: isEnglish ? "Do I need an ITIN?" : "ITIN'e ihtiyacım var mı?",
      answer: isEnglish
        ? "An Individual Taxpayer Identification Number is for those who need to file US taxes but aren't eligible for an SSN. Non-resident aliens with US tax filing obligations typically need an ITIN."
        : "ITIN (Individual Taxpayer Identification Number), ABD'de vergi beyannamesi vermesi gereken ancak SSN almaya hak kazanamayan kişiler için düzenlenen vergi kimlik numarasıdır. ABD'de beyanname yükümlülüğü bulunan mukim olmayan yabancıların genellikle ITIN edinmesi gerekir."
    }
  ]

  const relatedPages = [
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
    { slug: 'abdde-banka-hesabi', title: isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı" },
    { slug: 'llc-mi-corp-mu', title: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?' },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          {isEnglish ? 'Jurisdiction: US Federal Tax Law + US-Turkey Treaty' : 'Kapsam: ABD Federal Vergi Hukuku + ABD-Türkiye Vergi Anlaşması'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "IRS Tax Realities" : "IRS Vergi Gerçekleri"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "US tax residency is determined by substantial presence test or green card test"
              : "ABD vergi mukimliği, substantial presence test veya yeşil kart testi ile belirlenir"}</li>
            <li>• {isEnglish
              ? "Owning a US LLC does not automatically create US tax obligations"
              : "ABD'de LLC sahibi olmak, tek başına vergi yükümlülüğü doğurmaz"}</li>
            <li>• {isEnglish
              ? "FATCA and FBAR have separate reporting requirements with severe penalties"
              : "FATCA ve FBAR birbirinden ayrı bildirim yükümlülükleri içerir; ihlâl hâlinde ağır yaptırımlar uygulanır"}</li>
            <li>• {isEnglish
              ? "US-Turkey tax treaty provides some double taxation relief"
              : "ABD-Türkiye vergi anlaşması, çifte vergilendirmeyi belirli ölçüde hafifletir"}</li>
            <li>• {isEnglish
              ? "Tax planning requires professional advice - this is general information only"
              : "Vergi planlaması profesyonel destek gerektirir; buradaki bilgiler yalnızca genel niteliktedir"}</li>
          </ul>
        </section>

        {/* Warning */}
        <section className="mb-12">
          <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 rounded-r-lg">
            <h3 className="font-bold text-amber-900 mb-2">
              {isEnglish ? 'Important Notice' : 'Önemli Uyarı'}
            </h3>
            <p className="text-sm text-amber-800">
              {isEnglish
                ? 'Tax law is complex and highly dependent on individual circumstances. This page provides general educational information only. For tax planning, filing, or specific questions, consult a qualified tax professional (CPA, tax attorney, or enrolled agent).'
                : 'Vergi hukuku karmaşık bir alandır ve sonuçları kişinin bireysel koşullarına göre büyük farklılık gösterir. Bu sayfa yalnızca genel bilgilendirme amacı taşır. Vergi planlaması, beyanname hazırlığı veya somut sorularınız için mutlaka yetkili bir vergi uzmanına (CPA, vergi avukatı veya enrolled agent) başvurun.'}
            </p>
          </div>
        </section>

        {/* Tax Residency */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Determining US Tax Residency' : 'ABD Vergi Mukimliğinin Tespiti'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Green Card Test' : 'Yeşil Kart Testi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "You're a US tax resident if you're a lawful permanent resident (green card holder) at any time during the calendar year."
                  : "Takvim yılı içinde herhangi bir anda yasal daimi oturma iznine (yeşil kart) sahipseniz, ABD vergi mukimi sayılırsınız."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Substantial Presence Test' : 'Substantial Presence Testi'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "You're a US tax resident if you meet both conditions:"
                  : "Aşağıdaki her iki koşulu birlikte sağlıyorsanız ABD vergi mukimi kabul edilirsiniz:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish ? "Present in the US at least 31 days in the current year" : "Cari yılda en az 31 gün ABD'de fiziksel olarak bulunmuş olmak"}</li>
                <li>• {isEnglish
                  ? "183 or more days over 3 years using weighted formula: current year days + 1/3 of prior year days + 1/6 of second prior year days"
                  : "Üç yıllık ağırlıklı hesaplamayla 183 gün veya üzerine ulaşmak: cari yıl günleri + bir önceki yılın günlerinin 1/3'ü + iki önceki yılın günlerinin 1/6'sı"}</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Exempt Individuals' : 'Muaf Tutulan Kişiler'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Certain days don't count: F/J/M/Q visa holders in student/trainee status (with time limits), foreign government officials, teachers/trainees under J visa (first 2 years), and professional athletes here for charity events."
                  : "Bazı günler hesaba katılmaz: öğrenci veya stajyer statüsündeki F/J/M/Q vize sahipleri (belirli süre sınırlarıyla), yabancı devlet görevlileri, J vizesiyle bulunan öğretmenler ve stajyerler (ilk 2 yıl) ve hayır amaçlı etkinliklere katılan profesyonel sporcular."}
              </p>
            </div>
          </div>
        </section>

        {/* LLC Taxation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'LLC Taxation Basics' : 'LLC Vergilendirmesinin Esasları'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "LLCs are 'pass-through' entities by default for federal tax purposes. This means the LLC itself doesn't pay federal income tax - income and losses pass through to the owners' personal returns."
                : "LLC'ler federal vergi hukuku açısından varsayılan olarak \"geçişli\" (pass-through) kuruluşlardır. Bu, LLC tüzel kişiliğinin kendisinin federal gelir vergisi ödemediği anlamına gelir; gelir ve zararlar doğrudan sahiplerin kişisel beyannamelerine yansır."}
            </p>
            <p>
              {isEnglish
                ? "A single-member LLC owned by a non-resident alien with no US-source income (FDAP or ECI) has minimal US federal tax obligations, but state taxes, FBAR, and other requirements may still apply."
                : "ABD kaynaklı geliri (FDAP veya ECI) bulunmayan, mukim olmayan bir yabancının sahip olduğu tek üyeli LLC'nin federal düzeyde vergi yükümlülüğü oldukça sınırlıdır. Ancak eyalet vergileri, FBAR bildirimi ve diğer beyanname zorunlulukları yine de geçerli olabilir."}
            </p>
          </div>
        </section>

        {/* FATCA and FBAR */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'FATCA and FBAR Requirements' : 'FATCA ve FBAR Yükümlülükleri'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">FATCA (Form 8938)</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "US persons must report specified foreign financial assets if they exceed thresholds ($50,000-$200,000+ depending on filing status and residence). Filed with your tax return."
                  : "ABD vergi mükellefleri, yurt dışındaki belirli finansal varlıkları kanunda öngörülen eşikleri aştığında bildirmekle yükümlüdür (beyanname durumuna ve ikamete göre 50.000–200.000 dolar ve üzeri). Bu bildirim, yıllık vergi beyannamesiyle birlikte yapılır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">FBAR (FinCEN Form 114)</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "US persons with foreign financial accounts exceeding $10,000 aggregate value at any time during the year must file. Separate from tax return, filed electronically with FinCEN. Severe penalties for non-compliance."
                  : "Yıl içinde herhangi bir anda toplam bakiyesi 10.000 doları aşan yurt dışı finansal hesaplara sahip ABD kişileri bu formu doldurmak zorundadır. Vergi beyannamesinden ayrı olarak FinCEN'e elektronik ortamda beyan edilir. Bildirim yükümlülüğüne aykırı davranılması hâlinde ağır cezai yaptırımlar söz konusudur."}
              </p>
            </div>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Common Misconceptions' : 'Sık Karşılaşılan Yanılgılar'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can avoid all taxes with a Delaware LLC"' : '"Delaware LLC ile tüm vergilerden kurtulabilirim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Delaware's lack of state income tax for out-of-state businesses doesn't eliminate federal taxes, taxes in states where you actually do business, or your home country's taxes."
                  : "Delaware'in eyalet dışı işletmelerden gelir vergisi almaması, federal vergileri, fiilen faaliyet gösterdiğiniz eyaletlerdeki vergileri veya kendi ülkenizdeki vergi yükümlülüklerini ortadan kaldırmaz."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"FBAR is only for big accounts"' : '"FBAR yalnızca yüksek bakiyeli hesaplar için geçerlidir"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "The $10,000 threshold is the aggregate of ALL foreign financial accounts at any time during the year. Multiple small accounts can trigger the requirement."
                  : "10.000 dolarlık eşik, yıl içinde herhangi bir anda sahip olduğunuz TÜM yurt dışı finansal hesapların toplam bakiyesidir. Tek başına küçük olan birden fazla hesap, bir arada değerlendirildiğinde bildirim yükümlülüğünü doğurabilir."}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQAccordion
          items={faqItems}
          title={isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        />

        {/* Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Sources' : 'Kaynaklar'}
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {registryEntry?.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] underline">
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}{source.citation && ` (${source.citation})`}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Related Pages */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Related Pages' : 'İlgili Sayfalar'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPages.map(page => (
              <Link
                key={page.slug}
                href={`/${lang}/amerika/${page.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">{page.title}</span>
                <span className="text-[#C9A227]">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute tax or legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amacıyla hazırlanmış olup vergi veya hukuki danışmanlık niteliği taşımaz.'}
          </p>
        </div>
      </main>
    </div>
  )
}
