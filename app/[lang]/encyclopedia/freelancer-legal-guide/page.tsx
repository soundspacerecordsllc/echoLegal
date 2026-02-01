import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  return {
    title: isEnglish
      ? 'Freelancer Legal Guide: Complete Legal Handbook for Independent Contractors | EchoLegal'
      : 'Serbest Çalışan Hukuk Rehberi: Bağımsız Yükleniciler İçin Tam Kılavuz | EchoLegal',
    description: isEnglish
      ? 'Comprehensive legal guide for freelancers covering contracts, taxes, intellectual property, liability protection, and international clients.'
      : 'Sözleşmeler, vergiler, fikri mülkiyet, sorumluluk koruması ve uluslararası müşteriler hakkında serbest çalışanlar için kapsamlı hukuk rehberi.',
  }
}

export default async function FreelancerLegalGuidePage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
        {' → '}
        <Link href={`/${lang}/encyclopedia`} className="hover:text-black">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</Link>
        {' → '}
        <span className="text-black font-medium">{isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışan Hukuk Rehberi'}</span>
      </nav>

      {/* Article Header */}
      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışan Hukuk Rehberi'}
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          {isEnglish
            ? 'The complete legal handbook for freelancers and independent contractors: from structuring your business to protecting your work and getting paid.'
            : 'Serbest çalışanlar ve bağımsız yükleniciler için kapsamlı hukuk el kitabı: işinizi yapılandırmaktan çalışmalarınızı korumaya ve ödeme almaya kadar.'}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-12">
          <span>{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</span>
          <span>•</span>
          <span>{isEnglish ? '12 min read' : '12 dk okuma'}</span>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
          <ul className="space-y-2">
            <li><a href="#business-structure" className="text-[#C9A227] hover:underline">{isEnglish ? '1. Choosing Your Business Structure' : '1. İş Yapınızı Seçme'}</a></li>
            <li><a href="#contracts" className="text-[#C9A227] hover:underline">{isEnglish ? '2. Essential Contracts for Freelancers' : '2. Serbest Çalışanlar İçin Temel Sözleşmeler'}</a></li>
            <li><a href="#intellectual-property" className="text-[#C9A227] hover:underline">{isEnglish ? '3. Protecting Your Intellectual Property' : '3. Fikri Mülkiyetinizi Koruma'}</a></li>
            <li><a href="#taxes" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Tax Obligations and Planning' : '4. Vergi Yükümlülükleri ve Planlaması'}</a></li>
            <li><a href="#liability" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Liability Protection and Insurance' : '5. Sorumluluk Koruması ve Sigorta'}</a></li>
            <li><a href="#international" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Working with International Clients' : '6. Uluslararası Müşterilerle Çalışma'}</a></li>
            <li><a href="#getting-paid" className="text-[#C9A227] hover:underline">{isEnglish ? '7. Getting Paid: Invoicing and Collections' : '7. Ödeme Alma: Faturalama ve Tahsilat'}</a></li>
            <li><a href="#disputes" className="text-[#C9A227] hover:underline">{isEnglish ? '8. Handling Client Disputes' : '8. Müşteri Anlaşmazlıklarını Yönetme'}</a></li>
          </ul>
        </div>

        {/* Section 1: Business Structure */}
        <section id="business-structure" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. Choosing Your Business Structure' : '1. İş Yapınızı Seçme'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'One of the first legal decisions you\'ll make as a freelancer is how to structure your business. This choice affects your taxes, liability, and how you interact with clients.'
              : 'Serbest çalışan olarak vereceğiniz ilk hukuki kararlardan biri işinizi nasıl yapılandıracağınızdır. Bu seçim vergilerinizi, sorumluluğunuzu ve müşterilerle nasıl etkileşim kuracağınızı etkiler.'}
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{isEnglish ? 'Sole Proprietorship' : 'Şahıs Şirketi'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'The simplest structure. You and your business are legally the same entity. No formal registration required in most places, but you\'re personally liable for all business debts and obligations.'
                  : 'En basit yapı. Siz ve işiniz yasal olarak aynı varlıksınız. Çoğu yerde resmi kayıt gerekmez, ancak tüm iş borçları ve yükümlülüklerinden kişisel olarak sorumlusunuz.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Easy Setup' : 'Kolay Kurulum'}</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Low Cost' : 'Düşük Maliyet'}</span>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Personal Liability' : 'Kişisel Sorumluluk'}</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{isEnglish ? 'Limited Liability Company (LLC)' : 'Limited Şirket (LLC)'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'Provides personal liability protection while maintaining tax flexibility. Your personal assets are generally protected from business debts. Popular choice for serious freelancers.'
                  : 'Vergi esnekliğini korurken kişisel sorumluluk koruması sağlar. Kişisel varlıklarınız genellikle iş borçlarından korunur. Ciddi serbest çalışanlar için popüler seçim.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Liability Protection' : 'Sorumluluk Koruması'}</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Tax Flexibility' : 'Vergi Esnekliği'}</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{isEnglish ? 'State Fees' : 'Eyalet Ücretleri'}</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{isEnglish ? 'S Corporation' : 'S Şirketi'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'Can provide tax advantages for higher-earning freelancers by allowing you to pay yourself a reasonable salary and take additional profits as distributions, potentially reducing self-employment taxes.'
                  : 'Kendinize makul bir maaş ödemenize ve ek karları dağıtım olarak almanıza izin vererek yüksek kazanan serbest çalışanlar için vergi avantajları sağlayabilir, potansiyel olarak serbest meslek vergilerini azaltır.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Tax Savings' : 'Vergi Tasarrufu'}</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{isEnglish ? 'More Complexity' : 'Daha Karmaşık'}</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Payroll Required' : 'Bordro Gerekli'}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Recommendation' : 'Öneri'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Most freelancers earning over $50,000/year should consider forming an LLC. It\'s a good balance of liability protection, tax benefits, and administrative simplicity. Consult a tax professional for your specific situation.'
                : 'Yılda 50.000$\'dan fazla kazanan serbest çalışanların çoğu bir LLC kurmayı düşünmelidir. Sorumluluk koruması, vergi avantajları ve idari basitlik arasında iyi bir dengedir. Özel durumunuz için bir vergi uzmanına danışın.'}
            </p>
          </div>
        </section>

        {/* Section 2: Contracts */}
        <section id="contracts" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. Essential Contracts for Freelancers' : '2. Serbest Çalışanlar İçin Temel Sözleşmeler'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Written contracts are your best protection as a freelancer. Never start work without a signed agreement. Here are the essential contracts every freelancer needs:'
              : 'Yazılı sözleşmeler serbest çalışan olarak en iyi korumanızdır. İmzalı bir anlaşma olmadan asla işe başlamayın. İşte her serbest çalışanın ihtiyaç duyduğu temel sözleşmeler:'}
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-[#C9A227] pl-4">
              <h3 className="text-lg font-semibold mb-2">{isEnglish ? 'Master Service Agreement (MSA)' : 'Ana Hizmet Sözleşmesi (MSA)'}</h3>
              <p className="text-gray-600 mb-2">
                {isEnglish
                  ? 'A comprehensive contract that covers the overall relationship with a client. It includes:'
                  : 'Bir müşteriyle genel ilişkiyi kapsayan kapsamlı bir sözleşme. İçerir:'}
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>{isEnglish ? 'Payment terms and rates' : 'Ödeme koşulları ve oranlar'}</li>
                <li>{isEnglish ? 'Intellectual property ownership' : 'Fikri mülkiyet sahipliği'}</li>
                <li>{isEnglish ? 'Confidentiality provisions' : 'Gizlilik hükümleri'}</li>
                <li>{isEnglish ? 'Limitation of liability' : 'Sorumluluk sınırlaması'}</li>
                <li>{isEnglish ? 'Termination procedures' : 'Fesih prosedürleri'}</li>
                <li>{isEnglish ? 'Dispute resolution process' : 'Uyuşmazlık çözüm süreci'}</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#C9A227] pl-4">
              <h3 className="text-lg font-semibold mb-2">{isEnglish ? 'Statement of Work (SOW)' : 'İş Beyanı (SOW)'}</h3>
              <p className="text-gray-600 mb-2">
                {isEnglish
                  ? 'Project-specific document that defines the scope, deliverables, timeline, and budget for each project. Used alongside an MSA.'
                  : 'Her proje için kapsam, teslim edilecekler, zaman çizelgesi ve bütçeyi tanımlayan projeye özgü belge. MSA ile birlikte kullanılır.'}
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>{isEnglish ? 'Detailed project scope' : 'Detaylı proje kapsamı'}</li>
                <li>{isEnglish ? 'Specific deliverables with acceptance criteria' : 'Kabul kriterleri ile belirli teslim edilecekler'}</li>
                <li>{isEnglish ? 'Milestones and deadlines' : 'Kilometre taşları ve son tarihler'}</li>
                <li>{isEnglish ? 'Project-specific pricing' : 'Projeye özel fiyatlandırma'}</li>
                <li>{isEnglish ? 'Revision limits' : 'Revizyon sınırları'}</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#C9A227] pl-4">
              <h3 className="text-lg font-semibold mb-2">{isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}</h3>
              <p className="text-gray-600">
                {isEnglish
                  ? 'Protects confidential information shared during the project. Many clients will require you to sign their NDA, but you should also have your own template for protecting your proprietary methods.'
                  : 'Proje sırasında paylaşılan gizli bilgileri korur. Birçok müşteri kendi NDA\'larını imzalamanızı isteyecektir, ancak kendi tescilli yöntemlerinizi korumak için kendi şablonunuz da olmalıdır.'}
              </p>
            </div>

            <div className="border-l-4 border-[#C9A227] pl-4">
              <h3 className="text-lg font-semibold mb-2">{isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}</h3>
              <p className="text-gray-600">
                {isEnglish
                  ? 'Establishes that you\'re an independent contractor, not an employee. Critical for avoiding misclassification issues. Should clearly state your control over how, when, and where you work.'
                  : 'Çalışan değil, bağımsız yüklenici olduğunuzu belirler. Yanlış sınıflandırma sorunlarından kaçınmak için kritik. Nasıl, ne zaman ve nerede çalıştığınız üzerindeki kontrolünüzü açıkça belirtmelidir.'}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <p className="font-semibold text-yellow-900">{isEnglish ? 'Critical Contract Clauses' : 'Kritik Sözleşme Maddeleri'}</p>
            <ul className="text-yellow-800 mt-2 space-y-1">
              <li>• <strong>{isEnglish ? 'Kill Fee:' : 'İptal Ücreti:'}</strong> {isEnglish ? 'Get paid if a project is cancelled after you\'ve started' : 'Başladıktan sonra proje iptal edilirse ödeme alın'}</li>
              <li>• <strong>{isEnglish ? 'Scope Creep Protection:' : 'Kapsam Genişlemesi Koruması:'}</strong> {isEnglish ? 'Extra work means extra pay' : 'Ekstra iş ekstra ödeme demektir'}</li>
              <li>• <strong>{isEnglish ? 'Late Payment Penalties:' : 'Geç Ödeme Cezaları:'}</strong> {isEnglish ? 'Interest on overdue invoices' : 'Vadesi geçmiş faturalara faiz'}</li>
              <li>• <strong>{isEnglish ? 'Rights Retention:' : 'Hak Tutma:'}</strong> {isEnglish ? 'Keep rights until fully paid' : 'Tam ödeme yapılana kadar hakları koruyun'}</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Intellectual Property */}
        <section id="intellectual-property" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. Protecting Your Intellectual Property' : '3. Fikri Mülkiyetinizi Koruma'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'As a freelancer, your intellectual property (IP) is often your most valuable asset. Understanding IP rights is essential for protecting your work and knowing what you\'re giving clients.'
              : 'Serbest çalışan olarak fikri mülkiyetiniz (IP) genellikle en değerli varlığınızdır. IP haklarını anlamak, çalışmalarınızı korumak ve müşterilere ne verdiğinizi bilmek için önemlidir.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">{isEnglish ? 'Copyright' : 'Telif Hakkı'}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {isEnglish
                  ? 'Automatic protection for original creative works. You own the copyright to your work the moment you create it.'
                  : 'Orijinal yaratıcı eserler için otomatik koruma. Eserinizi yarattığınız anda telif hakkına sahip olursunuz.'}
              </p>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Covers: Written content, designs, code, photography, illustrations, music'
                  : 'Kapsar: Yazılı içerik, tasarımlar, kod, fotoğraflar, illüstrasyonlar, müzik'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">{isEnglish ? 'Work for Hire' : 'İşe Özel Eser'}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {isEnglish
                  ? 'When work is created as "work for hire," the client owns the copyright from the start. This must be explicitly stated in writing.'
                  : '"İşe özel eser" olarak yaratıldığında, müşteri başından itibaren telif hakkına sahiptir. Bu yazılı olarak açıkça belirtilmelidir.'}
              </p>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Important: Not all freelance work qualifies as work for hire under US law.'
                  : 'Önemli: Tüm serbest çalışma ABD hukukuna göre işe özel eser olarak nitelendirilmez.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{isEnglish ? 'IP Transfer vs. Licensing' : 'IP Devri vs. Lisanslama'}</h3>

            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h4 className="font-semibold text-green-900 mb-2">{isEnglish ? 'Licensing (Recommended)' : 'Lisanslama (Önerilen)'}</h4>
              <p className="text-green-800 text-sm">
                {isEnglish
                  ? 'You retain ownership but grant the client permission to use the work in specific ways. You can license the same work to multiple clients (if non-exclusive) and retain the right to use it in your portfolio.'
                  : 'Sahipliği korursunuz ancak müşteriye eseri belirli şekillerde kullanma izni verirsiniz. Aynı eseri birden fazla müşteriye lisanslayabilir (münhasır değilse) ve portfolyonuzda kullanma hakkını koruyabilirsiniz.'}
              </p>
            </div>

            <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <h4 className="font-semibold text-orange-900 mb-2">{isEnglish ? 'Full Transfer/Assignment' : 'Tam Devir/Temlik'}</h4>
              <p className="text-orange-800 text-sm">
                {isEnglish
                  ? 'You give up all rights to the work. The client becomes the owner and can do anything with it. If transferring all rights, charge a premium (typically 50-200% more than licensing).'
                  : 'Eserdeki tüm hakları devredersiniz. Müşteri sahip olur ve onunla her şeyi yapabilir. Tüm hakları devrediyorsanız, prim talep edin (genellikle lisanslamadan %50-200 daha fazla).'}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Portfolio Rights' : 'Portfolyo Hakları'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Always negotiate the right to showcase your work in your portfolio, even when transferring full ownership. Most clients will agree to this reasonable request.'
                : 'Tam sahiplik devretseniz bile, çalışmanızı portfolyonuzda sergileme hakkını her zaman müzakere edin. Çoğu müşteri bu makul talebe katılacaktır.'}
            </p>
          </div>
        </section>

        {/* Section 4: Taxes */}
        <section id="taxes" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Tax Obligations and Planning' : '4. Vergi Yükümlülükleri ve Planlaması'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Freelancers face unique tax challenges. Unlike employees who have taxes withheld, you\'re responsible for calculating and paying your own taxes.'
              : 'Serbest çalışanlar benzersiz vergi zorluklarıyla karşı karşıyadır. Vergileri kesilen çalışanların aksine, kendi vergilerinizi hesaplamak ve ödemekten siz sorumlusunuz.'}
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Self-Employment Tax (US)' : 'Serbest Meslek Vergisi (ABD)'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'In the US, freelancers pay self-employment tax of 15.3% on net earnings (12.4% Social Security + 2.9% Medicare). This is in addition to regular income tax.'
                  : 'ABD\'de serbest çalışanlar net kazançlar üzerinden %15,3 serbest meslek vergisi öder (%12,4 Sosyal Güvenlik + %2,9 Medicare). Bu, normal gelir vergisine ektir.'}
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm">
                <p className="font-mono">
                  {isEnglish ? 'Example: $100,000 net income' : 'Örnek: 100.000$ net gelir'}
                </p>
                <p className="font-mono">
                  {isEnglish ? 'Self-employment tax: ~$14,130' : 'Serbest meslek vergisi: ~14.130$'}
                </p>
                <p className="font-mono">
                  {isEnglish ? '+ Federal income tax (varies by bracket)' : '+ Federal gelir vergisi (dilimine göre değişir)'}
                </p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Quarterly Estimated Taxes' : 'Üç Aylık Tahmini Vergiler'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'You must pay estimated taxes quarterly if you expect to owe $1,000 or more. Missing payments results in penalties.'
                  : '1.000$ veya daha fazla borçlu olmayı bekliyorsanız, tahmini vergileri üç ayda bir ödemeniz gerekir. Ödemeleri kaçırmak cezalara neden olur.'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
                <div className="bg-[#C9A227] text-white rounded p-2">Q1: Apr 15</div>
                <div className="bg-[#C9A227] text-white rounded p-2">Q2: Jun 15</div>
                <div className="bg-[#C9A227] text-white rounded p-2">Q3: Sep 15</div>
                <div className="bg-[#C9A227] text-white rounded p-2">Q4: Jan 15</div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Common Deductions' : 'Yaygın Kesintiler'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'Reduce your taxable income by deducting legitimate business expenses:'
                  : 'Meşru iş giderlerini düşerek vergilendirilebilir gelirinizi azaltın:'}
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                {(isEnglish ? [
                  'Home office (dedicated space)',
                  'Computer and equipment',
                  'Software subscriptions',
                  'Professional development',
                  'Health insurance premiums',
                  'Retirement contributions (SEP-IRA, Solo 401k)',
                  'Business travel',
                  'Professional services (accounting, legal)',
                  'Marketing and advertising',
                  'Coworking space'
                ] : [
                  'Ev ofisi (ayrılmış alan)',
                  'Bilgisayar ve ekipman',
                  'Yazılım abonelikleri',
                  'Mesleki gelişim',
                  'Sağlık sigortası primleri',
                  'Emeklilik katkıları (SEP-IRA, Solo 401k)',
                  'İş seyahati',
                  'Profesyonel hizmetler (muhasebe, hukuk)',
                  'Pazarlama ve reklam',
                  'Ortak çalışma alanı'
                ]).map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
            <p className="font-semibold text-red-900">{isEnglish ? 'Warning: Keep Records' : 'Uyarı: Kayıt Tutun'}</p>
            <p className="text-red-800">
              {isEnglish
                ? 'Keep detailed records and receipts for all business expenses. The IRS can audit you up to 3 years after filing (6 years if substantial income is unreported). Use accounting software like QuickBooks, FreshBooks, or Wave.'
                : 'Tüm iş giderleri için detaylı kayıtlar ve makbuzlar tutun. IRS, dosyalamadan sonra 3 yıla kadar (önemli gelir bildirilmemişse 6 yıl) denetleyebilir. QuickBooks, FreshBooks veya Wave gibi muhasebe yazılımı kullanın.'}
            </p>
          </div>
        </section>

        {/* Section 5: Liability */}
        <section id="liability" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Liability Protection and Insurance' : '5. Sorumluluk Koruması ve Sigorta'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Freelancers face professional and business liability risks. Protect yourself with proper legal structures, contract terms, and insurance.'
              : 'Serbest çalışanlar profesyonel ve ticari sorumluluk riskleriyle karşı karşıyadır. Uygun yasal yapılar, sözleşme koşulları ve sigorta ile kendinizi koruyun.'}
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Professional Liability Insurance (E&O)' : 'Mesleki Sorumluluk Sigortası (E&O)'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'Errors and Omissions (E&O) insurance protects you if a client claims your work caused them financial harm due to mistakes, missed deadlines, or failure to deliver promised results.'
                  : 'Hatalar ve İhmaller (E&O) sigortası, bir müşteri işinizin hatalar, kaçırılan son tarihler veya vaat edilen sonuçları sunamamak nedeniyle mali zarara uğradığını iddia ederse sizi korur.'}
              </p>
              <p className="text-sm text-gray-500">
                {isEnglish
                  ? 'Typical cost: $500-2,000/year for $1M coverage'
                  : 'Tipik maliyet: 1M$ teminat için yılda 500-2.000$'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'General Liability Insurance' : 'Genel Sorumluluk Sigortası'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'Covers physical injuries or property damage. Essential if you ever meet clients in person or work on-site.'
                  : 'Fiziksel yaralanmaları veya maddi hasarı kapsar. Müşterilerle şahsen görüşüyorsanız veya sahada çalışıyorsanız gereklidir.'}
              </p>
              <p className="text-sm text-gray-500">
                {isEnglish
                  ? 'Typical cost: $300-1,000/year'
                  : 'Tipik maliyet: Yılda 300-1.000$'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Cyber Liability Insurance' : 'Siber Sorumluluk Sigortası'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'If you handle client data, this covers data breaches, cyber attacks, and related liabilities. Increasingly important for developers, marketers, and anyone handling sensitive information.'
                  : 'Müşteri verilerini işliyorsanız, bu veri ihlallerini, siber saldırıları ve ilgili yükümlülükleri kapsar. Geliştiriciler, pazarlamacılar ve hassas bilgileri işleyen herkes için giderek daha önemli.'}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 my-6">
            <h3 className="font-semibold mb-3">{isEnglish ? 'Contractual Liability Protections' : 'Sözleşmesel Sorumluluk Korumaları'}</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#C9A227] mr-2 font-bold">1.</span>
                <div>
                  <strong>{isEnglish ? 'Limitation of Liability Clause:' : 'Sorumluluk Sınırlaması Maddesi:'}</strong>
                  {isEnglish
                    ? ' Cap your liability at the amount the client paid you for the project.'
                    : ' Sorumluluğunuzu müşterinin proje için size ödediği miktarla sınırlayın.'}
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#C9A227] mr-2 font-bold">2.</span>
                <div>
                  <strong>{isEnglish ? 'Indemnification Clause:' : 'Tazminat Maddesi:'}</strong>
                  {isEnglish
                    ? ' Protect yourself from third-party claims arising from the client\'s use of your work.'
                    : ' Müşterinin işinizi kullanmasından kaynaklanan üçüncü taraf taleplerinden kendinizi koruyun.'}
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#C9A227] mr-2 font-bold">3.</span>
                <div>
                  <strong>{isEnglish ? 'No Consequential Damages:' : 'Dolaylı Zararlar Yok:'}</strong>
                  {isEnglish
                    ? ' Exclude liability for lost profits, lost business, or other indirect damages.'
                    : ' Kayıp karlar, kayıp iş veya diğer dolaylı zararlar için sorumluluğu hariç tutun.'}
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: International Clients */}
        <section id="international" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. Working with International Clients' : '6. Uluslararası Müşterilerle Çalışma'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The global nature of freelancing means you may work with clients in different countries. This creates additional legal and practical considerations.'
              : 'Serbest çalışmanın küresel doğası, farklı ülkelerdeki müşterilerle çalışabileceğiniz anlamına gelir. Bu, ek hukuki ve pratik değerlendirmeler oluşturur.'}
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Tax Forms and Withholding' : 'Vergi Formları ve Kesinti'}</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  <strong>{isEnglish ? 'US Freelancer + US Client:' : 'ABD\'li Serbest Çalışan + ABD\'li Müşteri:'}</strong>
                  {isEnglish ? ' Submit W-9; no withholding required.' : ' W-9 gönderin; kesinti gerekmez.'}
                </p>
                <p>
                  <strong>{isEnglish ? 'US Freelancer + Foreign Client:' : 'ABD\'li Serbest Çalışan + Yabancı Müşteri:'}</strong>
                  {isEnglish ? ' Usually no US tax forms needed; report income normally.' : ' Genellikle ABD vergi formu gerekmez; geliri normal olarak bildirin.'}
                </p>
                <p>
                  <strong>{isEnglish ? 'Foreign Freelancer + US Client:' : 'Yabancı Serbest Çalışan + ABD\'li Müşteri:'}</strong>
                  {isEnglish ? ' Complete W-8BEN to claim treaty benefits and avoid 30% withholding.' : ' Anlaşma avantajlarından yararlanmak ve %30 kesintiden kaçınmak için W-8BEN doldurun.'}
                </p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Contract Considerations' : 'Sözleşme Değerlendirmeleri'}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#C9A227] mr-2">•</span>
                  <span><strong>{isEnglish ? 'Governing Law:' : 'Geçerli Hukuk:'}</strong> {isEnglish ? 'Specify which country/state\'s laws apply. Usually your home jurisdiction.' : 'Hangi ülke/eyalet yasalarının geçerli olduğunu belirtin. Genellikle kendi yargı alanınız.'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C9A227] mr-2">•</span>
                  <span><strong>{isEnglish ? 'Dispute Resolution:' : 'Uyuşmazlık Çözümü:'}</strong> {isEnglish ? 'Consider arbitration for international disputes—cheaper than cross-border litigation.' : 'Uluslararası uyuşmazlıklar için tahkimi düşünün—sınır ötesi davalardan daha ucuz.'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C9A227] mr-2">•</span>
                  <span><strong>{isEnglish ? 'Currency:' : 'Para Birimi:'}</strong> {isEnglish ? 'Specify the currency for payment to avoid exchange rate disputes.' : 'Kur anlaşmazlıklarından kaçınmak için ödeme para birimini belirtin.'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C9A227] mr-2">•</span>
                  <span><strong>{isEnglish ? 'Payment Method:' : 'Ödeme Yöntemi:'}</strong> {isEnglish ? 'Use international-friendly platforms like Wise, PayPal, or Payoneer.' : 'Wise, PayPal veya Payoneer gibi uluslararası platformları kullanın.'}</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Data Protection Compliance' : 'Veri Koruma Uyumluluğu'}</h3>
              <p className="text-gray-600 mb-3">
                {isEnglish
                  ? 'If you handle personal data of EU residents, you must comply with GDPR even if you\'re outside the EU. Similarly, KVKK applies if handling Turkish residents\' data.'
                  : 'AB sakinlerinin kişisel verilerini işliyorsanız, AB dışında olsanız bile GDPR\'a uymanız gerekir. Benzer şekilde, Türk vatandaşlarının verilerini işliyorsanız KVKK geçerlidir.'}
              </p>
              <Link href={`/${lang}/encyclopedia/privacy-policy-guide`} className="text-[#C9A227] hover:underline text-sm">
                {isEnglish ? 'Learn more in our Privacy Policy Guide →' : 'Gizlilik Politikası Rehberimizde daha fazla bilgi edinin →'}
              </Link>
            </div>
          </div>
        </section>

        {/* Section 7: Getting Paid */}
        <section id="getting-paid" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '7. Getting Paid: Invoicing and Collections' : '7. Ödeme Alma: Faturalama ve Tahsilat'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Proper invoicing practices and payment terms help ensure you get paid on time and provide legal protection if disputes arise.'
              : 'Uygun faturalama uygulamaları ve ödeme koşulları, zamanında ödeme almanızı sağlamaya yardımcı olur ve anlaşmazlıklar ortaya çıkarsa hukuki koruma sağlar.'}
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-[#C9A227] pl-4">
              <h3 className="text-lg font-semibold mb-2">{isEnglish ? 'Invoice Essentials' : 'Fatura Temelleri'}</h3>
              <p className="text-gray-600 mb-2">{isEnglish ? 'Every invoice should include:' : 'Her fatura şunları içermelidir:'}</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>{isEnglish ? 'Your business name and contact information' : 'İşletme adınız ve iletişim bilgileriniz'}</li>
                <li>{isEnglish ? 'Client name and billing address' : 'Müşteri adı ve fatura adresi'}</li>
                <li>{isEnglish ? 'Unique invoice number' : 'Benzersiz fatura numarası'}</li>
                <li>{isEnglish ? 'Invoice date and due date' : 'Fatura tarihi ve son ödeme tarihi'}</li>
                <li>{isEnglish ? 'Itemized description of services' : 'Hizmetlerin ayrıntılı açıklaması'}</li>
                <li>{isEnglish ? 'Payment terms and accepted methods' : 'Ödeme koşulları ve kabul edilen yöntemler'}</li>
                <li>{isEnglish ? 'Late payment penalties (if applicable)' : 'Geç ödeme cezaları (varsa)'}</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">{isEnglish ? 'Upfront Deposits' : 'Peşin Depozito'}</h4>
                <p className="text-green-800 text-sm">
                  {isEnglish
                    ? 'Require 25-50% upfront for new clients or large projects. Protects against non-payment.'
                    : 'Yeni müşteriler veya büyük projeler için %25-50 peşin isteyin. Ödeme yapılmamasına karşı korur.'}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">{isEnglish ? 'Milestone Payments' : 'Aşama Ödemeleri'}</h4>
                <p className="text-blue-800 text-sm">
                  {isEnglish
                    ? 'For longer projects, tie payments to milestones. Never let outstanding payments exceed 2 weeks of work.'
                    : 'Daha uzun projeler için ödemeleri aşamalara bağlayın. Bekleyen ödemelerin 2 haftalık işi aşmasına izin vermeyin.'}
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">{isEnglish ? 'Net 15/30 Terms' : 'Net 15/30 Vadeler'}</h4>
                <p className="text-purple-800 text-sm">
                  {isEnglish
                    ? 'Net 15 (due in 15 days) is better for cash flow. Net 30 is standard for larger companies.'
                    : 'Net 15 (15 gün içinde vadesi gelen) nakit akışı için daha iyidir. Net 30 büyük şirketler için standarttır.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
            <p className="font-semibold text-red-900">{isEnglish ? 'When a Client Won\'t Pay' : 'Müşteri Ödeme Yapmadığında'}</p>
            <ol className="text-red-800 mt-2 space-y-1 list-decimal list-inside">
              <li>{isEnglish ? 'Send payment reminders (day 1, 7, 14, 30)' : 'Ödeme hatırlatmaları gönderin (1., 7., 14., 30. gün)'}</li>
              <li>{isEnglish ? 'Stop work until paid (per your contract)' : 'Ödeme yapılana kadar işi durdurun (sözleşmenize göre)'}</li>
              <li>{isEnglish ? 'Send a formal demand letter' : 'Resmi bir talep mektubu gönderin'}</li>
              <li>{isEnglish ? 'Consider small claims court (under $10K typically)' : 'Küçük davalar mahkemesini düşünün (genellikle 10.000$ altı)'}</li>
              <li>{isEnglish ? 'For larger amounts, consult an attorney' : 'Daha büyük miktarlar için bir avukata danışın'}</li>
            </ol>
          </div>
        </section>

        {/* Section 8: Disputes */}
        <section id="disputes" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '8. Handling Client Disputes' : '8. Müşteri Anlaşmazlıklarını Yönetme'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Even with good contracts, disputes happen. Handle them professionally to protect your reputation and legal rights.'
              : 'İyi sözleşmelerle bile anlaşmazlıklar olur. İtibarınızı ve yasal haklarınızı korumak için bunları profesyonelce ele alın.'}
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Prevention is Best' : 'Önleme En İyisidir'}</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isEnglish ? 'Document everything in writing (emails, chat logs, meeting notes)' : 'Her şeyi yazılı olarak belgeleyin (e-postalar, sohbet kayıtları, toplantı notları)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isEnglish ? 'Get sign-off at each project milestone' : 'Her proje aşamasında onay alın'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isEnglish ? 'Address concerns immediately—don\'t let issues fester' : 'Endişeleri hemen ele alın—sorunların büyümesine izin vermeyin'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{isEnglish ? 'Keep scope changes documented with price adjustments' : 'Kapsam değişikliklerini fiyat ayarlamalarıyla belgelenmiş tutun'}</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Dispute Resolution Options' : 'Uyuşmazlık Çözüm Seçenekleri'}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">{isEnglish ? 'Negotiation' : 'Müzakere'}</h4>
                  <p className="text-gray-600 text-sm">{isEnglish ? 'Direct discussion to find mutual agreement. Usually the fastest and cheapest option.' : 'Karşılıklı anlaşma bulmak için doğrudan görüşme. Genellikle en hızlı ve ucuz seçenek.'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">{isEnglish ? 'Mediation' : 'Arabuluculuk'}</h4>
                  <p className="text-gray-600 text-sm">{isEnglish ? 'Neutral third party helps facilitate agreement. Non-binding but often effective.' : 'Tarafsız üçüncü taraf anlaşmayı kolaylaştırmaya yardımcı olur. Bağlayıcı değil ama genellikle etkili.'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">{isEnglish ? 'Arbitration' : 'Tahkim'}</h4>
                  <p className="text-gray-600 text-sm">{isEnglish ? 'Private judge makes a binding decision. Faster than court but still formal.' : 'Özel hakim bağlayıcı bir karar verir. Mahkemeden daha hızlı ama yine de resmi.'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">{isEnglish ? 'Litigation' : 'Dava'}</h4>
                  <p className="text-gray-600 text-sm">{isEnglish ? 'Court proceedings. Last resort—expensive and time-consuming.' : 'Mahkeme işlemleri. Son çare—pahalı ve zaman alıcı.'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'When to Walk Away' : 'Ne Zaman Çekilmeli'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Sometimes the best legal strategy is to end the relationship. If a client becomes abusive, refuses to pay, or makes unreasonable demands, exercise your termination rights (make sure you have them in your contract) and move on. Your time and mental health are worth more than any single client.'
                : 'Bazen en iyi hukuki strateji ilişkiyi sonlandırmaktır. Bir müşteri tacizci olursa, ödeme yapmayı reddederse veya makul olmayan taleplerde bulunursa, fesih haklarınızı kullanın (sözleşmenizde olduğundan emin olun) ve devam edin. Zamanınız ve ruh sağlığınız herhangi bir müşteriden daha değerlidir.'}
            </p>
          </div>
        </section>

        {/* Summary Checklist */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Freelancer Legal Checklist' : 'Serbest Çalışan Hukuki Kontrol Listesi'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {(isEnglish ? [
                'Choose appropriate business structure (LLC recommended)',
                'Use written contracts for every project',
                'Define IP ownership clearly',
                'Set aside 25-30% for taxes',
                'Pay quarterly estimated taxes',
                'Get appropriate insurance coverage',
                'Include limitation of liability in contracts',
                'Require deposits for new clients',
                'Keep detailed records of everything',
                'Know your dispute resolution options'
              ] : [
                'Uygun iş yapısı seçin (LLC önerilir)',
                'Her proje için yazılı sözleşmeler kullanın',
                'IP sahipliğini açıkça tanımlayın',
                'Vergiler için %25-30 ayırın',
                'Üç aylık tahmini vergileri ödeyin',
                'Uygun sigorta kapsamı alın',
                'Sözleşmelere sorumluluk sınırlaması ekleyin',
                'Yeni müşteriler için depozito isteyin',
                'Her şeyin detaylı kayıtlarını tutun',
                'Uyuşmazlık çözüm seçeneklerinizi bilin'
              ]).map((item, i) => (
                <div key={i} className="flex items-start">
                  <span className="text-[#C9A227] mr-2">☐</span>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}</h2>

          <div className="space-y-4">
            {(isEnglish ? [
              { q: 'Do I need an LLC to freelance?', a: 'No, you can freelance as a sole proprietor. However, an LLC provides liability protection and tax benefits that become valuable as your income grows. Consider forming one once you earn $50,000+ annually.' },
              { q: 'Can I use a template contract or do I need a lawyer?', a: 'Template contracts work well for standard projects. However, for high-value projects, unusual terms, or if you\'ve had disputes before, investing in a lawyer to customize your contracts is worthwhile.' },
              { q: 'How much should I save for taxes?', a: 'Save 25-30% of your income for taxes. This covers self-employment tax (15.3%) plus federal and state income taxes. The exact amount depends on your total income and deductions.' },
              { q: 'What if a client wants me to sign their contract instead of mine?', a: 'Read their contract carefully. Look for unfavorable terms like full IP transfer, unlimited revisions, or broad non-competes. Negotiate changes or add an addendum for terms you need.' },
              { q: 'Do I need insurance as a freelancer?', a: 'It depends on your risk level. Professional liability (E&O) insurance is recommended for anyone whose work could cause financial harm to clients. General liability is important if you meet clients in person.' }
            ] : [
              { q: 'Serbest çalışmak için LLC\'ye ihtiyacım var mı?', a: 'Hayır, şahıs şirketi olarak serbest çalışabilirsiniz. Ancak, bir LLC geliriniz arttıkça değerli hale gelen sorumluluk koruması ve vergi avantajları sağlar. Yıllık 50.000$+ kazandığınızda bir tane kurmayı düşünün.' },
              { q: 'Şablon sözleşme kullanabilir miyim yoksa avukata mı ihtiyacım var?', a: 'Şablon sözleşmeler standart projeler için iyi çalışır. Ancak, yüksek değerli projeler, olağandışı koşullar veya daha önce anlaşmazlıklarınız olduysa, sözleşmelerinizi özelleştirmek için bir avukata yatırım yapmaya değer.' },
              { q: 'Vergiler için ne kadar biriktirmeliyim?', a: 'Gelirinizin %25-30\'unu vergiler için biriktirin. Bu, serbest meslek vergisini (%15,3) artı federal ve eyalet gelir vergilerini kapsar. Kesin miktar toplam gelirinize ve kesintilerinize bağlıdır.' },
              { q: 'Bir müşteri benimki yerine kendi sözleşmesini imzalamamı isterse ne olur?', a: 'Sözleşmelerini dikkatlice okuyun. Tam IP devri, sınırsız revizyon veya geniş rekabet yasağı gibi olumsuz koşulları arayın. Değişiklikleri müzakere edin veya ihtiyacınız olan koşullar için ek protokol ekleyin.' },
              { q: 'Serbest çalışan olarak sigortaya ihtiyacım var mı?', a: 'Risk seviyenize bağlıdır. İşi müşterilere mali zarar verebilecek herkes için mesleki sorumluluk (E&O) sigortası önerilir. Müşterilerle şahsen görüşüyorsanız genel sorumluluk önemlidir.' }
            ]).map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg">
                <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50">{faq.q}</summary>
                <p className="p-4 pt-0 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Articles' : 'İlgili Makaleler'}</h2>
        <ul className="space-y-2">
          <li>
            <Link href={`/${lang}/encyclopedia/contractor-vs-employee`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Contractor vs Employee: Classification Guide' : 'Yüklenici mi Çalışan mı: Sınıflandırma Rehberi'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia/what-is-nda`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'What is an NDA?' : 'NDA Nedir?'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia/privacy-policy-guide`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Do I Need a Privacy Policy?' : 'Gizlilik Politikasına İhtiyacım Var mı?'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Back to Encyclopedia' : 'Ansiklopediye Dön'} →
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
