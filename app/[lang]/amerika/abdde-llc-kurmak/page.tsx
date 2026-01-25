import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import KitCallout from '@/components/KitCallout'
import { getRegistryEntry } from '@/lib/amerika-content-registry'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "Forming an LLC in the US - Delaware, Wyoming & State Selection | EchoLegal"
      : "ABD'de LLC Kurmak - Delaware, Wyoming & Eyalet Seçimi | EchoLegal",
    description: isEnglish
      ? "How to form an LLC in the United States as a foreign national. State selection, registered agents, EIN, and ongoing compliance requirements."
      : "Yabancı uyruklu olarak ABD'de LLC nasıl kurulur. Eyalet seçimi, registered agent, EIN ve sürekli uyum gereksinimleri.",
  }
}

export default async function AbddeLLCPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('abdde-llc-kurmak')

  const faqItems = [
    {
      question: isEnglish ? "Can a non-US resident form a US LLC?" : "ABD'de ikamet etmeyen biri ABD LLC'si kurabilir mi?",
      answer: isEnglish
        ? "Yes. US LLCs can be formed by non-residents without a visa or physical presence. However, LLC formation alone does not provide any immigration status or work authorization."
        : "Evet. ABD LLC'leri vize veya fiziksel varlık olmadan ABD'de ikamet etmeyenler tarafından kurulabilir. Ancak, LLC kurulumu tek başına herhangi bir göçmenlik statüsü veya çalışma izni sağlamaz."
    },
    {
      question: isEnglish ? "Why do people choose Delaware or Wyoming?" : "İnsanlar neden Delaware veya Wyoming'i seçiyor?",
      answer: isEnglish
        ? "Delaware has established business courts and case law. Wyoming has no state income tax and strong privacy protections. Neither is universally 'better' - the choice depends on your specific situation."
        : "Delaware'in yerleşik iş mahkemeleri ve içtihatları var. Wyoming'in eyalet gelir vergisi yok ve güçlü gizlilik korumaları var. Hiçbiri evrensel olarak 'daha iyi' değil - seçim özel durumunuza bağlı."
    },
    {
      question: isEnglish ? "Do I need a US address to form an LLC?" : "LLC kurmak için ABD adresine ihtiyacım var mı?",
      answer: isEnglish
        ? "You need a registered agent with a physical address in the state of formation. This can be a professional registered agent service. Your personal address can be outside the US."
        : "Kuruluş eyaletinde fiziksel adresi olan bir registered agent'a ihtiyacınız var. Bu profesyonel bir registered agent hizmeti olabilir. Kişisel adresiniz ABD dışında olabilir."
    },
    {
      question: isEnglish ? "What is an EIN and do I need one?" : "EIN nedir ve ihtiyacım var mı?",
      answer: isEnglish
        ? "An Employer Identification Number (EIN) is like a tax ID for your business. You need one to open a US bank account and file taxes. Foreign owners can obtain an EIN."
        : "İşveren Kimlik Numarası (EIN), işletmeniz için vergi kimliği gibidir. ABD banka hesabı açmak ve vergi beyannamesi vermek için bir taneye ihtiyacınız var. Yabancı sahipler EIN alabilir."
    },
    {
      question: isEnglish ? "Does forming an LLC give me a visa?" : "LLC kurmak bana vize verir mi?",
      answer: isEnglish
        ? "No. LLC formation has no connection to immigration status. You cannot 'sponsor yourself' for a work visa through your own LLC without meeting specific visa category requirements."
        : "Hayır. LLC kurulumunun göçmenlik statüsüyle bağlantısı yok. Belirli vize kategorisi gereksinimlerini karşılamadan kendi LLC'niz aracılığıyla 'kendinize sponsor olamazsınız'."
    },
    {
      question: isEnglish ? "What are the ongoing requirements after formation?" : "Kurulumdan sonra sürekli gereksinimler neler?",
      answer: isEnglish
        ? "Requirements vary by state but typically include: annual report filings, franchise taxes (varies by state), maintaining a registered agent, and proper record-keeping. Federal tax filings are also required."
        : "Gereksinimler eyalete göre değişir ancak genellikle şunları içerir: yıllık rapor dosyalamaları, franchise vergileri (eyalete göre değişir), registered agent'ı sürdürme ve uygun kayıt tutma. Federal vergi beyannameleri de gereklidir."
    },
    {
      question: isEnglish ? "Single-member or multi-member LLC?" : "Tek üyeli mi çok üyeli LLC mi?",
      answer: isEnglish
        ? "A single-member LLC is taxed as a 'disregarded entity' by default (pass-through). Multi-member LLCs are taxed as partnerships. Both can elect corporate taxation. The choice affects tax treatment significantly."
        : "Tek üyeli LLC varsayılan olarak 'dikkate alınmayan kuruluş' olarak vergilendirilir (geçişli). Çok üyeli LLC'ler ortaklık olarak vergilendirilir. Her ikisi de kurumsal vergilendirmeyi seçebilir. Seçim vergi muamelesini önemli ölçüde etkiler."
    },
    {
      question: isEnglish ? "Do I need an Operating Agreement?" : "Operating Agreement'a ihtiyacım var mı?",
      answer: isEnglish
        ? "While not always legally required, an Operating Agreement is essential for: defining ownership, establishing management rules, protecting limited liability status, and opening bank accounts."
        : "Her zaman yasal olarak zorunlu olmasa da, Operating Agreement şunlar için gereklidir: mülkiyeti tanımlama, yönetim kurallarını oluşturma, sınırlı sorumluluk statüsünü koruma ve banka hesabı açma."
    }
  ]

  const relatedPages = [
    { slug: 'llc-mi-corp-mu', title: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?' },
    { slug: 'abdde-banka-hesabi', title: isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı" },
    { slug: 'irs-vergi-gercekleri', title: isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri' },
    { slug: 'abdde-is-yapanlar-icin-sozlesmeler', title: isEnglish ? 'Contracts for US Business' : "ABD'de İş Yapanlar İçin Sözleşmeler" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/amerika`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Amerika Hub' : 'Amerika'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika/abdde-llc-kurmak`}
              className="border border-black rounded-full px-3 py-1 text-sm"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Forming an LLC' : "ABD'de LLC Kurmak" }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: US State Law (Delaware, Wyoming focus)' : 'Yargı Yetkisi: ABD Eyalet Hukuku (Delaware, Wyoming odaklı)'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Forming an LLC in the US" : "ABD'de LLC Kurmak"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "Non-US residents can form US LLCs without visa or physical presence"
              : "ABD'de ikamet etmeyenler vize veya fiziksel varlık olmadan ABD LLC'si kurabilir"}</li>
            <li>• {isEnglish
              ? "LLC formation does NOT provide any immigration status or visa"
              : "LLC kurulumu herhangi bir göçmenlik statüsü veya vize SAĞLAMAZ"}</li>
            <li>• {isEnglish
              ? "State selection (Delaware, Wyoming, etc.) depends on your specific needs"
              : "Eyalet seçimi (Delaware, Wyoming vb.) özel ihtiyaçlarınıza bağlıdır"}</li>
            <li>• {isEnglish
              ? "You need a registered agent and EIN for basic operations"
              : "Temel işlemler için registered agent ve EIN'e ihtiyacınız var"}</li>
            <li>• {isEnglish
              ? "Ongoing compliance (annual reports, taxes) is required"
              : "Sürekli uyum (yıllık raporlar, vergiler) gereklidir"}</li>
          </ul>
        </section>

        {/* CTA 1 - Above fold */}
        <KitCallout lang={lang} variant="compact" />

        {/* What This Covers */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                {isEnglish ? 'This Page Covers' : 'Bu Sayfa Kapsar'}
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {isEnglish ? 'LLC formation basics' : 'LLC kurulum temelleri'}</li>
                <li>• {isEnglish ? 'State selection factors' : 'Eyalet seçim faktörleri'}</li>
                <li>• {isEnglish ? 'Registered agent requirements' : 'Registered agent gereksinimleri'}</li>
                <li>• {isEnglish ? 'Ongoing compliance overview' : 'Sürekli uyum genel bakışı'}</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'This Page Does Not Cover' : 'Bu Sayfa Kapsamaz'}
              </h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• {isEnglish ? 'Specific state-by-state procedures' : 'Eyalet bazında özel prosedürler'}</li>
                <li>• {isEnglish ? 'Tax planning advice' : 'Vergi planlama tavsiyeleri'}</li>
                <li>• {isEnglish ? 'Formation service recommendations' : 'Kuruluş hizmeti önerileri'}</li>
                <li>• {isEnglish ? 'Individual business structure advice' : 'Bireysel iş yapısı tavsiyeleri'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'What is an LLC?' : 'LLC Nedir?'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "A Limited Liability Company (LLC) is a business structure that combines the liability protection of a corporation with the tax flexibility of a partnership. Members (owners) are generally not personally liable for business debts and obligations."
                : "Limited Liability Company (LLC), bir şirketin sorumluluk korumasını ortaklığın vergi esnekliğiyle birleştiren bir iş yapısıdır. Üyeler (sahipler) genellikle iş borçları ve yükümlülüklerinden kişisel olarak sorumlu değildir."}
            </p>
          </div>
        </section>

        {/* State Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Popular States for LLC Formation' : 'LLC Kurulumu İçin Popüler Eyaletler'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Delaware</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "Established Court of Chancery, extensive case law, business-friendly statutes, privacy protections."
                  : "Yerleşik Court of Chancery, geniş içtihat, iş dostu yasalar, gizlilik korumaları."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "Annual franchise tax ($300 minimum), requires registered agent, may need to register as foreign LLC in other states where you do business."
                  : "Yıllık franchise vergisi (minimum $300), registered agent gerektirir, iş yaptığınız diğer eyaletlerde yabancı LLC olarak kayıt gerekebilir."}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Wyoming</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "No state income tax, low annual fees ($60), strong asset protection, privacy protections."
                  : "Eyalet gelir vergisi yok, düşük yıllık ücretler ($60), güçlü varlık koruması, gizlilik korumaları."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "Less established case law than Delaware, still may need foreign LLC registration elsewhere."
                  : "Delaware'den daha az yerleşik içtihat, başka yerlerde yabancı LLC kaydı gerekebilir."}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Home State' : 'Kendi Eyaletiniz'}</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "If you have physical presence or do business in a specific state, forming there avoids foreign LLC registration requirements."
                  : "Belirli bir eyalette fiziksel varlığınız varsa veya iş yapıyorsanız, orada kurmak yabancı LLC kayıt gereksinimlerini önler."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "State-specific rules, fees, and tax implications vary significantly."
                  : "Eyalete özgü kurallar, ücretler ve vergi etkileri önemli ölçüde değişir."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 2 - Mid page */}
        <KitCallout lang={lang} variant="compact" />

        {/* Formation Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Basic Formation Steps' : 'Temel Kuruluş Adımları'}
          </h2>

          <div className="space-y-4">
            {(isEnglish ? [
              { step: '1', title: 'Choose a State', desc: 'Consider where you do business, tax implications, and ongoing costs.' },
              { step: '2', title: 'Select a Name', desc: 'Must be unique in the state and typically include "LLC" or "Limited Liability Company".' },
              { step: '3', title: 'Appoint a Registered Agent', desc: 'Required in every state. Must have physical address in state of formation.' },
              { step: '4', title: 'File Articles of Organization', desc: 'Official formation document filed with state. Fees vary ($50-$500+).' },
              { step: '5', title: 'Create Operating Agreement', desc: 'Internal governance document. Not always required but essential for operations.' },
              { step: '6', title: 'Obtain EIN', desc: 'Federal tax ID from IRS. Required for bank accounts and tax filings.' },
              { step: '7', title: 'Open Bank Account', desc: 'US business bank account. Requirements vary by bank.' }
            ] : [
              { step: '1', title: 'Eyalet Seçin', desc: 'Nerede iş yaptığınızı, vergi etkilerini ve sürekli maliyetleri düşünün.' },
              { step: '2', title: 'İsim Seçin', desc: 'Eyalette benzersiz olmalı ve genellikle "LLC" veya "Limited Liability Company" içermeli.' },
              { step: '3', title: 'Registered Agent Atayın', desc: 'Her eyalette gereklidir. Kuruluş eyaletinde fiziksel adresi olmalıdır.' },
              { step: '4', title: 'Articles of Organization Dosyalayın', desc: 'Eyalete sunulan resmi kuruluş belgesi. Ücretler değişir ($50-$500+).' },
              { step: '5', title: 'Operating Agreement Oluşturun', desc: 'İç yönetişim belgesi. Her zaman zorunlu değil ancak işlemler için gerekli.' },
              { step: '6', title: 'EIN Alın', desc: "IRS'den federal vergi kimliği. Banka hesapları ve vergi beyannameleri için gerekli." },
              { step: '7', title: 'Banka Hesabı Açın', desc: 'ABD iş banka hesabı. Gereksinimler bankaya göre değişir.' }
            ]).map((item, i) => (
              <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-[#C9A227] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
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
                {isEnglish ? '"Having an LLC gives me a visa"' : '"LLC\'m olması bana vize verir"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "LLC formation has zero connection to immigration. You cannot sponsor yourself for a work visa through your own LLC without meeting specific visa requirements (substantial investment for E-2, etc.)."
                  : "LLC kurulumunun göçmenlikle sıfır bağlantısı var. Belirli vize gereksinimlerini karşılamadan (E-2 için önemli yatırım vb.) kendi LLC'niz aracılığıyla kendinize çalışma vizesi sponsoru olamazsınız."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"Delaware is always the best choice"' : '"Delaware her zaman en iyi seçimdir"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Delaware makes sense for certain situations (VC-backed startups, complex equity structures) but may be overkill for simple businesses. If you operate only in one state, forming there may be simpler and cheaper."
                  : "Delaware belirli durumlar için (VC destekli girişimler, karmaşık hisse yapıları) mantıklıdır ancak basit işletmeler için aşırı olabilir. Yalnızca bir eyalette faaliyet gösteriyorsanız, orada kurmak daha basit ve ucuz olabilir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can avoid all taxes with a US LLC"' : '"ABD LLC\'siyle tüm vergilerden kaçınabilirim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "US LLCs have tax obligations. The specifics depend on your residency, where you operate, and whether you have US-source income. Tax planning requires professional advice."
                  : "ABD LLC'lerinin vergi yükümlülükleri var. Ayrıntılar ikametinize, nerede faaliyet gösterdiğinize ve ABD kaynaklı geliriniz olup olmadığına bağlıdır. Vergi planlaması profesyonel tavsiye gerektirir."}
              </p>
            </div>
          </div>
        </section>

        {/* Related Templates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Related Contracts and Templates' : 'İlgili Sözleşmeler ve Şablonlar'}
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/${lang}/contracts/service-agreement`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/independent-contractor`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/nda`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/legal-kitler/abd-business-starter-legal-kit`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'US Business Starter Kit' : 'ABD Business Starter Kit'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQAccordion
          items={faqItems}
          title={isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        />

        {/* CTA 3 - End of page */}
        <KitCallout lang={lang} variant="full" />

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

        {/* Last Verified */}
        <div className="border-t border-gray-200 pt-6 mb-8">
          <p className="text-sm text-gray-500">
            {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
          </p>
        </div>

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
              ? 'This content is for general informational purposes only and does not constitute legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez.'}
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">
            © 2025 EchoLegal. {isEnglish
              ? 'Prepared under supervision of NY licensed attorney (Bar #5552336).'
              : 'NY lisanslı avukat gözetiminde hazırlanmıştır (Bar #5552336).'}
          </p>
        </div>
      </footer>
    </div>
  )
}
