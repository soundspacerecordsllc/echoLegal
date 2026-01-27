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
      : "IRS Vergi Gerçekleri - Yerleşik Olmayanlar İçin ABD Vergi Temelleri | EchoLegal",
    description: isEnglish
      ? "Understanding US tax obligations. Substantial presence test, FATCA, FBAR, US-Turkey tax treaty, and common misconceptions."
      : "ABD vergi yükümlülüklerini anlamak. Substantial presence test, FATCA, FBAR, ABD-Türkiye vergi anlaşması ve yaygın yanlış varsayımlar.",
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
      question: isEnglish ? "Do I have to pay US taxes if I own a US LLC?" : "ABD LLC'm varsa ABD vergileri ödemek zorunda mıyım?",
      answer: isEnglish
        ? "It depends on your tax residency status and income source. A single-member LLC owned by a non-resident alien with no US-source income generally has minimal US tax obligations, but there are still filing requirements and state-level taxes to consider."
        : "Vergi mukimlik statünüze ve gelir kaynağınıza bağlıdır. ABD kaynaklı geliri olmayan yerleşik olmayan yabancı tarafından sahip olunan tek üyeli LLC'nin genellikle minimal ABD vergi yükümlülükleri vardır, ancak hala dosyalama gereksinimleri ve eyalet düzeyinde vergiler dikkate alınmalıdır."
    },
    {
      question: isEnglish ? "What is the substantial presence test?" : "Substantial presence test nedir?",
      answer: isEnglish
        ? "A formula to determine US tax residency: you're a resident if you're in the US at least 31 days in the current year AND 183 days over 3 years (current year days + 1/3 of prior year days + 1/6 of second prior year days). Certain visa holders are exempt."
        : "ABD vergi mukimliğini belirlemek için bir formül: cari yılda en az 31 gün VE 3 yıl boyunca 183 gün ABD'deyseniz mukimsiniz (cari yıl günleri + önceki yıl günlerinin 1/3'ü + iki önceki yıl günlerinin 1/6'sı). Belirli vize sahipleri muaftır."
    },
    {
      question: isEnglish ? "What is FATCA?" : "FATCA nedir?",
      answer: isEnglish
        ? "Foreign Account Tax Compliance Act requires foreign financial institutions to report accounts held by US persons to the IRS. If you're a US tax resident or citizen, your foreign banks report your accounts to the IRS."
        : "Yabancı Hesap Vergi Uyum Yasası, yabancı finansal kuruluşların ABD kişileri tarafından tutulan hesapları IRS'e bildirmesini gerektirir. ABD vergi mukimi veya vatandaşıysanız, yabancı bankalarınız hesaplarınızı IRS'e bildirir."
    },
    {
      question: isEnglish ? "What is FBAR?" : "FBAR nedir?",
      answer: isEnglish
        ? "Report of Foreign Bank and Financial Accounts. US persons with foreign financial accounts exceeding $10,000 aggregate value at any time during the year must file FinCEN Form 114. Penalties for non-filing are severe."
        : "Yabancı Banka ve Finansal Hesaplar Raporu. Yıl içinde herhangi bir zamanda toplam değeri 10.000 doları aşan yabancı finansal hesapları olan ABD kişileri FinCEN Form 114 dosyalamalıdır. Dosyalamamanın cezaları ağırdır."
    },
    {
      question: isEnglish ? "Is there a US-Turkey tax treaty?" : "ABD-Türkiye vergi anlaşması var mı?",
      answer: isEnglish
        ? "Yes. The US-Turkey tax treaty (TIAS 10205) provides rules for avoiding double taxation and reduced withholding rates on certain income types. Treaty benefits require proper claiming and documentation."
        : "Evet. ABD-Türkiye vergi anlaşması (TIAS 10205) çifte vergilendirmeyi önleme ve belirli gelir türlerinde indirimli stopaj oranları için kurallar sağlar. Anlaşma avantajları uygun talep ve belgelendirme gerektirir."
    },
    {
      question: isEnglish ? "Do I need an ITIN?" : "ITIN'e ihtiyacım var mı?",
      answer: isEnglish
        ? "An Individual Taxpayer Identification Number is for those who need to file US taxes but aren't eligible for an SSN. Non-resident aliens with US tax filing obligations typically need an ITIN."
        : "Bireysel Vergi Mükellefi Kimlik Numarası, ABD vergileri dosyalaması gereken ancak SSN için uygun olmayanlar içindir. ABD vergi dosyalama yükümlülükleri olan yerleşik olmayan yabancılar genellikle ITIN'e ihtiyaç duyar."
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
          {isEnglish ? 'Jurisdiction: US Federal Tax Law + US-Turkey Treaty' : 'Yargı Yetkisi: ABD Federal Vergi Hukuku + ABD-Türkiye Anlaşması'}
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
              : "ABD vergi mukimliği substantial presence test veya yeşil kart testi ile belirlenir"}</li>
            <li>• {isEnglish
              ? "Owning a US LLC does not automatically create US tax obligations"
              : "ABD LLC'sine sahip olmak otomatik olarak ABD vergi yükümlülükleri oluşturmaz"}</li>
            <li>• {isEnglish
              ? "FATCA and FBAR have separate reporting requirements with severe penalties"
              : "FATCA ve FBAR'ın ağır cezalarla ayrı raporlama gereksinimleri vardır"}</li>
            <li>• {isEnglish
              ? "US-Turkey tax treaty provides some double taxation relief"
              : "ABD-Türkiye vergi anlaşması bir miktar çifte vergilendirme rahatlaması sağlar"}</li>
            <li>• {isEnglish
              ? "Tax planning requires professional advice - this is general information only"
              : "Vergi planlaması profesyonel tavsiye gerektirir - bu yalnızca genel bilgidir"}</li>
          </ul>
        </section>

        {/* Warning */}
        <section className="mb-12">
          <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 rounded-r-lg">
            <h3 className="font-bold text-amber-900 mb-2">
              {isEnglish ? 'Important Notice' : 'Önemli Bilgi'}
            </h3>
            <p className="text-sm text-amber-800">
              {isEnglish
                ? 'Tax law is complex and highly dependent on individual circumstances. This page provides general educational information only. For tax planning, filing, or specific questions, consult a qualified tax professional (CPA, tax attorney, or enrolled agent).'
                : 'Vergi hukuku karmaşıktır ve bireysel koşullara büyük ölçüde bağlıdır. Bu sayfa yalnızca genel eğitim bilgisi sağlar. Vergi planlaması, dosyalama veya belirli sorular için nitelikli bir vergi uzmanına (CPA, vergi avukatı veya kayıtlı acente) danışın.'}
            </p>
          </div>
        </section>

        {/* Tax Residency */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Determining US Tax Residency' : 'ABD Vergi Mukimliğini Belirleme'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Green Card Test' : 'Yeşil Kart Testi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "You're a US tax resident if you're a lawful permanent resident (green card holder) at any time during the calendar year."
                  : "Takvim yılı içinde herhangi bir zamanda yasal kalıcı oturma izni sahibiyseniz (yeşil kart) ABD vergi mukimisinizdir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Substantial Presence Test' : 'Substantial Presence Testi'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "You're a US tax resident if you meet both conditions:"
                  : "Her iki koşulu karşılıyorsanız ABD vergi mukimisinizdir:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish ? "Present in the US at least 31 days in the current year" : "Cari yılda ABD'de en az 31 gün bulunmak"}</li>
                <li>• {isEnglish
                  ? "183 or more days over 3 years using weighted formula: current year days + 1/3 of prior year days + 1/6 of second prior year days"
                  : "Ağırlıklı formül kullanarak 3 yıl boyunca 183 veya daha fazla gün: cari yıl günleri + önceki yıl günlerinin 1/3'ü + iki önceki yıl günlerinin 1/6'sı"}</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Exempt Individuals' : 'Muaf Kişiler'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Certain days don't count: F/J/M/Q visa holders in student/trainee status (with time limits), foreign government officials, teachers/trainees under J visa (first 2 years), and professional athletes here for charity events."
                  : "Belirli günler sayılmaz: öğrenci/stajyer statüsündeki F/J/M/Q vize sahipleri (zaman sınırlarıyla), yabancı hükümet yetkilileri, J vizesi kapsamındaki öğretmenler/stajyerler (ilk 2 yıl) ve yardım etkinlikleri için burada olan profesyonel sporcular."}
              </p>
            </div>
          </div>
        </section>

        {/* LLC Taxation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'LLC Taxation Basics' : 'LLC Vergilendirme Temelleri'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "LLCs are 'pass-through' entities by default for federal tax purposes. This means the LLC itself doesn't pay federal income tax - income and losses pass through to the owners' personal returns."
                : "LLC'ler federal vergi amaçları için varsayılan olarak 'geçişli' kuruluşlardır. Bu, LLC'nin kendisinin federal gelir vergisi ödemediği anlamına gelir - gelir ve kayıplar sahiplerin kişisel beyannamelerine geçer."}
            </p>
            <p>
              {isEnglish
                ? "A single-member LLC owned by a non-resident alien with no US-source income (FDAP or ECI) has minimal US federal tax obligations, but state taxes, FBAR, and other requirements may still apply."
                : "ABD kaynaklı geliri (FDAP veya ECI) olmayan yerleşik olmayan yabancı tarafından sahip olunan tek üyeli LLC'nin minimal ABD federal vergi yükümlülükleri vardır, ancak eyalet vergileri, FBAR ve diğer gereksinimler yine de geçerli olabilir."}
            </p>
          </div>
        </section>

        {/* FATCA and FBAR */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'FATCA and FBAR Requirements' : 'FATCA ve FBAR Gereksinimleri'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">FATCA (Form 8938)</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "US persons must report specified foreign financial assets if they exceed thresholds ($50,000-$200,000+ depending on filing status and residence). Filed with your tax return."
                  : "ABD kişileri, belirtilen yabancı finansal varlıkları eşikleri aşarsa bildirmelidir (dosyalama durumuna ve ikamete bağlı olarak $50,000-$200,000+). Vergi beyannamenizle dosyalanır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">FBAR (FinCEN Form 114)</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "US persons with foreign financial accounts exceeding $10,000 aggregate value at any time during the year must file. Separate from tax return, filed electronically with FinCEN. Severe penalties for non-compliance."
                  : "Yıl içinde herhangi bir zamanda toplam değeri 10,000 doları aşan yabancı finansal hesapları olan ABD kişileri dosyalamalıdır. Vergi beyannamesinden ayrı, FinCEN ile elektronik olarak dosyalanır. Uyumsuzluk için ağır cezalar."}
              </p>
            </div>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Common Misconceptions' : 'Yaygın Yanlış Varsayımlar'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can avoid all taxes with a Delaware LLC"' : '"Delaware LLC ile tüm vergilerden kaçınabilirim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Delaware's lack of state income tax for out-of-state businesses doesn't eliminate federal taxes, taxes in states where you actually do business, or your home country's taxes."
                  : "Delaware'in eyalet dışı işletmeler için eyalet gelir vergisi olmaması federal vergileri, gerçekten iş yaptığınız eyaletlerdeki vergileri veya ülkenizdeki vergileri ortadan kaldırmaz."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"FBAR is only for big accounts"' : '"FBAR sadece büyük hesaplar için"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "The $10,000 threshold is the aggregate of ALL foreign financial accounts at any time during the year. Multiple small accounts can trigger the requirement."
                  : "10,000 dolar eşiği, yıl içinde herhangi bir zamanda TÜM yabancı finansal hesapların toplamıdır. Birden fazla küçük hesap gereksinimi tetikleyebilir."}
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
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve vergi veya hukuki tavsiye teşkil etmez.'}
          </p>
        </div>
      </main>
    </div>
  )
}
