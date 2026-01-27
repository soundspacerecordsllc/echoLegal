import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  return {
    title: isEnglish
      ? 'Contractor vs Employee: Complete Classification Guide | EchoLegal'
      : 'Yüklenici mi Çalışan mı: Kapsamlı Sınıflandırma Rehberi | EchoLegal',
    description: isEnglish
      ? 'Understand the critical differences between contractors and employees. Learn IRS tests, legal factors, misclassification risks, and how to properly classify workers.'
      : 'Yükleniciler ve çalışanlar arasındaki kritik farkları anlayın. IRS testlerini, yasal faktörleri, yanlış sınıflandırma risklerini ve çalışanları doğru sınıflandırmayı öğrenin.',
  }
}

export default async function ContractorVsEmployeePage({
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
        <span className="text-black font-medium">{isEnglish ? 'Contractor vs Employee' : 'Yüklenici mi Çalışan mı'}</span>
      </nav>

      {/* Article Header */}
      <article>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          {isEnglish ? 'Contractor vs Employee' : 'Yüklenici mi Çalışan mı?'}
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          {isEnglish
            ? 'The definitive guide to worker classification: understand the legal tests, avoid costly misclassification penalties, and structure your working relationships correctly.'
            : 'İşçi sınıflandırması için kesin rehber: yasal testleri anlayın, maliyetli yanlış sınıflandırma cezalarından kaçının ve çalışma ilişkilerinizi doğru yapılandırın.'}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-12">
          <span>{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</span>
          <span>•</span>
          <span>{isEnglish ? '10 min read' : '10 dk okuma'}</span>
        </div>

        {/* Warning Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12">
          <h2 className="font-bold text-red-900 mb-2">{isEnglish ? 'Why This Matters' : 'Bu Neden Önemli'}</h2>
          <p className="text-red-800">
            {isEnglish
              ? 'Misclassifying an employee as an independent contractor can result in back taxes, penalties of up to 40% of unpaid employment taxes, lawsuits for unpaid benefits, and even criminal prosecution. Both businesses hiring workers and individuals working as contractors need to understand these rules.'
              : 'Bir çalışanı bağımsız yüklenici olarak yanlış sınıflandırmak, geriye dönük vergiler, ödenmemiş istihdam vergilerinin %40\'ına kadar cezalar, ödenmemiş haklar için davalar ve hatta cezai kovuşturma ile sonuçlanabilir. Hem işçi çalıştıran işletmelerin hem de yüklenici olarak çalışan bireylerin bu kuralları anlaması gerekir.'}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
          <ul className="space-y-2">
            <li><a href="#overview" className="text-[#C9A227] hover:underline">{isEnglish ? '1. Overview: Employee vs Contractor' : '1. Genel Bakış: Çalışan vs Yüklenici'}</a></li>
            <li><a href="#irs-test" className="text-[#C9A227] hover:underline">{isEnglish ? '2. The IRS 3-Factor Test' : '2. IRS 3-Faktör Testi'}</a></li>
            <li><a href="#abc-test" className="text-[#C9A227] hover:underline">{isEnglish ? '3. The ABC Test (California & Beyond)' : '3. ABC Testi (Kaliforniya ve Ötesi)'}</a></li>
            <li><a href="#economic-reality" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Economic Reality Test (DOL)' : '4. Ekonomik Gerçeklik Testi (DOL)'}</a></li>
            <li><a href="#comparison" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Side-by-Side Comparison' : '5. Yan Yana Karşılaştırma'}</a></li>
            <li><a href="#misclassification" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Misclassification Consequences' : '6. Yanlış Sınıflandırma Sonuçları'}</a></li>
            <li><a href="#international" className="text-[#C9A227] hover:underline">{isEnglish ? '7. International Considerations' : '7. Uluslararası Değerlendirmeler'}</a></li>
            <li><a href="#best-practices" className="text-[#C9A227] hover:underline">{isEnglish ? '8. Best Practices for Compliance' : '8. Uyum İçin En İyi Uygulamalar'}</a></li>
          </ul>
        </div>

        {/* Section 1: Overview */}
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. Overview: Employee vs Contractor' : '1. Genel Bakış: Çalışan vs Yüklenici'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'The distinction between an employee and an independent contractor isn\'t just about job titles or what a contract says—it\'s determined by the actual nature of the working relationship. What you call the worker doesn\'t matter; what matters is how the work is actually performed.'
              : 'Bir çalışan ile bağımsız yüklenici arasındaki ayrım sadece iş unvanları veya sözleşmenin ne dediğiyle ilgili değildir—çalışma ilişkisinin gerçek doğasıyla belirlenir. İşçiye ne dediğiniz önemli değildir; önemli olan işin gerçekte nasıl yapıldığıdır.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">{isEnglish ? 'Employee' : 'Çalışan'}</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Works under employer\'s control and direction' : 'İşverenin kontrolü ve yönlendirmesi altında çalışır'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Set hours and workplace' : 'Belirlenen saatler ve işyeri'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Uses employer\'s tools and equipment' : 'İşverenin araç ve ekipmanlarını kullanır'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Receives benefits (health, retirement, etc.)' : 'Haklar alır (sağlık, emeklilik, vb.)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Taxes withheld by employer' : 'Vergiler işveren tarafından kesilir'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Protected by labor laws' : 'İş kanunları tarafından korunur'}</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-semibold mb-4 text-green-900">{isEnglish ? 'Independent Contractor' : 'Bağımsız Yüklenici'}</h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Controls how, when, and where work is done' : 'İşin nasıl, ne zaman ve nerede yapılacağını kontrol eder'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Sets own schedule and location' : 'Kendi programını ve yerini belirler'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Uses own tools and equipment' : 'Kendi araç ve ekipmanlarını kullanır'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'No benefits from client' : 'Müşteriden hak almaz'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Pays own taxes (self-employment)' : 'Kendi vergilerini öder (serbest meslek)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Works for multiple clients' : 'Birden fazla müşteri için çalışır'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: IRS Test */}
        <section id="irs-test" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. The IRS 3-Factor Test' : '2. IRS 3-Faktör Testi'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'The IRS uses a "common law" test that examines the degree of control and independence in the relationship. It focuses on three categories of factors:'
              : 'IRS, ilişkideki kontrol ve bağımsızlık derecesini inceleyen bir "ortak hukuk" testi kullanır. Üç faktör kategorisine odaklanır:'}
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-[#C9A227] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                {isEnglish ? 'Behavioral Control' : 'Davranışsal Kontrol'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish
                  ? 'Does the company control or have the right to control what the worker does and how they do it?'
                  : 'Şirket, işçinin ne yaptığını ve nasıl yaptığını kontrol ediyor mu veya kontrol etme hakkına sahip mi?'}
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="font-semibold mb-2">{isEnglish ? 'Key Questions:' : 'Önemli Sorular:'}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'Does the company dictate when, where, and how work is done?' : 'Şirket işin ne zaman, nerede ve nasıl yapılacağını dikte ediyor mu?'}</li>
                  <li>• {isEnglish ? 'Does the company provide training on methods?' : 'Şirket yöntemler hakkında eğitim veriyor mu?'}</li>
                  <li>• {isEnglish ? 'Is there a sequence in which work must be performed?' : 'İşin yapılması gereken bir sıra var mı?'}</li>
                  <li>• {isEnglish ? 'Does the company evaluate HOW work is done vs just results?' : 'Şirket işin NASIL yapıldığını mı değerlendiriyor yoksa sadece sonuçları mı?'}</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-[#C9A227] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                {isEnglish ? 'Financial Control' : 'Finansal Kontrol'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish
                  ? 'Does the business direct or control the financial and business aspects of the worker\'s job?'
                  : 'İşletme, işçinin işinin finansal ve ticari yönlerini yönlendiriyor veya kontrol ediyor mu?'}
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="font-semibold mb-2">{isEnglish ? 'Key Questions:' : 'Önemli Sorular:'}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'Does the worker have unreimbursed business expenses?' : 'İşçinin karşılanmayan iş giderleri var mı?'}</li>
                  <li>• {isEnglish ? 'Does the worker invest in their own equipment/facilities?' : 'İşçi kendi ekipman/tesislerine yatırım yapıyor mu?'}</li>
                  <li>• {isEnglish ? 'Does the worker make their services available to the market?' : 'İşçi hizmetlerini piyasaya sunuyor mu?'}</li>
                  <li>• {isEnglish ? 'How is the worker paid (hourly vs project vs commission)?' : 'İşçiye nasıl ödeme yapılıyor (saatlik vs proje vs komisyon)?'}</li>
                  <li>• {isEnglish ? 'Can the worker realize profit or loss?' : 'İşçi kar veya zarar edebilir mi?'}</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-[#C9A227] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                {isEnglish ? 'Type of Relationship' : 'İlişki Türü'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish
                  ? 'What is the nature of the relationship between the parties?'
                  : 'Taraflar arasındaki ilişkinin doğası nedir?'}
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="font-semibold mb-2">{isEnglish ? 'Key Questions:' : 'Önemli Sorular:'}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'Are there written contracts describing the relationship?' : 'İlişkiyi tanımlayan yazılı sözleşmeler var mı?'}</li>
                  <li>• {isEnglish ? 'Does the worker receive benefits (insurance, pension, vacation)?' : 'İşçi haklar alıyor mu (sigorta, emeklilik, tatil)?'}</li>
                  <li>• {isEnglish ? 'Is the relationship expected to be permanent or for a project?' : 'İlişkinin kalıcı mı yoksa proje bazlı mı olması bekleniyor?'}</li>
                  <li>• {isEnglish ? 'Is the work a key aspect of the regular business?' : 'İş, normal işletmenin önemli bir yönü mü?'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Important Note' : 'Önemli Not'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'No single factor is determinative. The IRS looks at the entire relationship. You can request an IRS determination using Form SS-8, but this can take 6+ months and may trigger an audit.'
                : 'Hiçbir tek faktör belirleyici değildir. IRS tüm ilişkiye bakar. Form SS-8 kullanarak IRS belirleme talep edebilirsiniz, ancak bu 6+ ay sürebilir ve denetime yol açabilir.'}
            </p>
          </div>
        </section>

        {/* Section 3: ABC Test */}
        <section id="abc-test" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. The ABC Test (California & Beyond)' : '3. ABC Testi (Kaliforniya ve Ötesi)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'California\'s AB5 law (and similar laws in other states like New Jersey, Massachusetts, and Illinois) uses the stricter ABC Test. Under this test, a worker is presumed to be an employee unless ALL THREE conditions are met:'
              : 'Kaliforniya\'nın AB5 yasası (ve New Jersey, Massachusetts ve Illinois gibi diğer eyaletlerdeki benzer yasalar) daha katı ABC Testini kullanır. Bu test kapsamında, ÜÇ koşulun TÜMÜ karşılanmadıkça işçinin çalışan olduğu varsayılır:'}
          </p>

          <div className="space-y-4">
            <div className="border-2 border-[#C9A227] rounded-lg p-6 bg-amber-50">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                <span className="bg-[#C9A227] text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">A</span>
                {isEnglish ? 'Free from Control' : 'Kontrolden Bağımsız'}
              </h3>
              <p className="text-gray-700">
                {isEnglish
                  ? 'The worker is free from the control and direction of the hiring entity in performing the work, both under the contract and in fact.'
                  : 'İşçi, hem sözleşme kapsamında hem de fiilen işin yapılmasında işe alan kuruluşun kontrolü ve yönlendirmesinden bağımsızdır.'}
              </p>
            </div>

            <div className="border-2 border-[#C9A227] rounded-lg p-6 bg-amber-50">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                <span className="bg-[#C9A227] text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">B</span>
                {isEnglish ? 'Outside Usual Business' : 'Olağan İşin Dışında'}
              </h3>
              <p className="text-gray-700">
                {isEnglish
                  ? 'The worker performs work that is outside the usual course of the hiring entity\'s business.'
                  : 'İşçi, işe alan kuruluşun olağan iş seyrinin dışında iş yapar.'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {isEnglish
                  ? 'Example: A plumber hired by a retail store = contractor. A plumber hired by a plumbing company = likely employee.'
                  : 'Örnek: Bir perakende mağazası tarafından kiralanan tesisatçı = yüklenici. Bir tesisatçı şirketi tarafından kiralanan tesisatçı = muhtemelen çalışan.'}
              </p>
            </div>

            <div className="border-2 border-[#C9A227] rounded-lg p-6 bg-amber-50">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                <span className="bg-[#C9A227] text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">C</span>
                {isEnglish ? 'Independent Business' : 'Bağımsız İş'}
              </h3>
              <p className="text-gray-700">
                {isEnglish
                  ? 'The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.'
                  : 'İşçi, genellikle yapılan işle aynı nitelikteki bağımsız olarak kurulmuş bir ticaret, meslek veya işle meşguldür.'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {isEnglish
                  ? 'Evidence: Business license, own website, multiple clients, advertising services publicly'
                  : 'Kanıt: İşletme ruhsatı, kendi web sitesi, birden fazla müşteri, hizmetlerin kamuya duyurulması'}
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
            <p className="font-semibold text-red-900">{isEnglish ? 'The "B" Prong is the Hardest' : '"B" Şartı En Zordur'}</p>
            <p className="text-red-800">
              {isEnglish
                ? 'Many businesses fail the ABC test on prong B. If a software company hires a freelance developer to write code, that\'s arguably within their "usual course of business." This has made contractor relationships much harder in ABC test states.'
                : 'Birçok işletme ABC testinde B şartında başarısız olur. Bir yazılım şirketi kod yazması için serbest çalışan bir geliştirici kiralarsa, bu tartışmalı olarak "olağan iş seyri" içindedir. Bu, ABC testi eyaletlerinde yüklenici ilişkilerini çok daha zorlaştırmıştır.'}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold mb-3">{isEnglish ? 'States Using ABC Test (as of 2026)' : 'ABC Testi Kullanan Eyaletler (2026 itibarıyla)'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {['California', 'Connecticut', 'Delaware', 'Illinois', 'Indiana', 'Louisiana', 'Massachusetts', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'Vermont', 'Washington', 'West Virginia'].map((state) => (
                <span key={state} className="bg-white px-2 py-1 rounded border">{state}</span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">{isEnglish ? 'Note: States may use ABC test for specific purposes (e.g., unemployment) only.' : 'Not: Eyaletler ABC testini yalnızca belirli amaçlar için (örneğin, işsizlik) kullanabilir.'}</p>
          </div>
        </section>

        {/* Section 4: Economic Reality Test */}
        <section id="economic-reality" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Economic Reality Test (DOL)' : '4. Ekonomik Gerçeklik Testi (DOL)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The Department of Labor uses the Economic Reality Test for determining worker classification under the Fair Labor Standards Act (FLSA). This test focuses on whether the worker is economically dependent on the employer.'
              : 'Çalışma Bakanlığı, Adil Çalışma Standartları Yasası (FLSA) kapsamında işçi sınıflandırmasını belirlemek için Ekonomik Gerçeklik Testini kullanır. Bu test, işçinin işverene ekonomik olarak bağımlı olup olmadığına odaklanır.'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { factor: 'Opportunity for Profit or Loss', desc: 'Can the worker\'s managerial skill affect their profit or loss?' },
              { factor: 'Investment', desc: 'Does the worker invest in equipment, materials, or helpers?' },
              { factor: 'Permanence of Relationship', desc: 'Is the work relationship indefinite/continuous or project-based?' },
              { factor: 'Nature and Degree of Control', desc: 'How much control does the employer exercise over the work?' },
              { factor: 'Integral to Business', desc: 'Is the work integral to the employer\'s business?' },
              { factor: 'Skill and Initiative', desc: 'Does the worker use specialized skills and business-like initiative?' }
            ] : [
              { factor: 'Kar veya Zarar Fırsatı', desc: 'İşçinin yönetim becerisi kar veya zararını etkileyebilir mi?' },
              { factor: 'Yatırım', desc: 'İşçi ekipman, malzeme veya yardımcılara yatırım yapıyor mu?' },
              { factor: 'İlişkinin Kalıcılığı', desc: 'Çalışma ilişkisi belirsiz/sürekli mi yoksa proje bazlı mı?' },
              { factor: 'Kontrolün Niteliği ve Derecesi', desc: 'İşveren iş üzerinde ne kadar kontrol uyguluyor?' },
              { factor: 'İşletme İçin Ayrılmaz', desc: 'İş, işverenin işletmesi için ayrılmaz mı?' },
              { factor: 'Beceri ve İnisiyatif', desc: 'İşçi uzmanlaşmış beceriler ve iş benzeri inisiyatif kullanıyor mu?' }
            ]).map((item, i) => (
              <div key={i} className="flex items-start border-l-4 border-gray-300 pl-4">
                <span className="font-semibold text-[#C9A227] mr-2">{i + 1}.</span>
                <div>
                  <span className="font-semibold">{item.factor}:</span>
                  <span className="text-gray-600 ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'The Core Question' : 'Temel Soru'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'The ultimate question is: Is this worker economically dependent on the employer (employee) or in business for themselves (contractor)? No single factor is decisive—the totality of circumstances matters.'
                : 'Temel soru şudur: Bu işçi işverene ekonomik olarak mı bağımlı (çalışan) yoksa kendi işini mi yapıyor (yüklenici)? Hiçbir tek faktör belirleyici değildir—koşulların bütünü önemlidir.'}
            </p>
          </div>
        </section>

        {/* Section 5: Comparison */}
        <section id="comparison" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Side-by-Side Comparison' : '5. Yan Yana Karşılaştırma'}</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Factor' : 'Faktör'}</th>
                  <th className="border border-gray-200 p-3 text-left bg-blue-50">{isEnglish ? 'Employee' : 'Çalışan'}</th>
                  <th className="border border-gray-200 p-3 text-left bg-green-50">{isEnglish ? 'Contractor' : 'Yüklenici'}</th>
                </tr>
              </thead>
              <tbody>
                {(isEnglish ? [
                  { factor: 'Schedule', employee: 'Set by employer', contractor: 'Sets own hours' },
                  { factor: 'Location', employee: 'Works at employer\'s site', contractor: 'Works anywhere' },
                  { factor: 'Tools', employee: 'Employer provides', contractor: 'Provides own' },
                  { factor: 'Training', employee: 'Receives training', contractor: 'Already skilled' },
                  { factor: 'Payment', employee: 'Regular salary/hourly', contractor: 'Per project/invoice' },
                  { factor: 'Taxes', employee: 'Withheld by employer', contractor: 'Pays own (1099)' },
                  { factor: 'Benefits', employee: 'May receive', contractor: 'None from client' },
                  { factor: 'Termination', employee: 'Can be fired', contractor: 'Contract ends' },
                  { factor: 'Exclusivity', employee: 'Often exclusive', contractor: 'Multiple clients' },
                  { factor: 'Direction', employee: 'Told how to work', contractor: 'Controls methods' },
                ] : [
                  { factor: 'Program', employee: 'İşveren tarafından belirlenir', contractor: 'Kendi saatlerini belirler' },
                  { factor: 'Konum', employee: 'İşverenin yerinde çalışır', contractor: 'Her yerde çalışır' },
                  { factor: 'Araçlar', employee: 'İşveren sağlar', contractor: 'Kendi sağlar' },
                  { factor: 'Eğitim', employee: 'Eğitim alır', contractor: 'Zaten yetenekli' },
                  { factor: 'Ödeme', employee: 'Düzenli maaş/saatlik', contractor: 'Proje/fatura başına' },
                  { factor: 'Vergiler', employee: 'İşveren tarafından kesilir', contractor: 'Kendi öder (1099)' },
                  { factor: 'Haklar', employee: 'Alabilir', contractor: 'Müşteriden yok' },
                  { factor: 'Fesih', employee: 'Kovulabilir', contractor: 'Sözleşme biter' },
                  { factor: 'Münhasırlık', employee: 'Genellikle münhasır', contractor: 'Birden fazla müşteri' },
                  { factor: 'Yönlendirme', employee: 'Nasıl çalışacağı söylenir', contractor: 'Yöntemleri kontrol eder' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-200 p-3 font-medium">{row.factor}</td>
                    <td className="border border-gray-200 p-3 bg-blue-50/50">{row.employee}</td>
                    <td className="border border-gray-200 p-3 bg-green-50/50">{row.contractor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Misclassification */}
        <section id="misclassification" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. Misclassification Consequences' : '6. Yanlış Sınıflandırma Sonuçları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'Misclassifying employees as contractors carries serious legal and financial penalties for businesses. Workers may also have claims for unpaid benefits and protections.'
              : 'Çalışanları yüklenici olarak yanlış sınıflandırmanın işletmeler için ciddi hukuki ve mali cezaları vardır. İşçilerin ödenmemiş haklar ve korumalar için talepleri de olabilir.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="text-lg font-semibold text-red-900 mb-4">{isEnglish ? 'For Businesses' : 'İşletmeler İçin'}</h3>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>{isEnglish ? 'Back Taxes:' : 'Geriye Dönük Vergiler:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'All unpaid employment taxes (Social Security, Medicare, unemployment)' : 'Tüm ödenmemiş istihdam vergileri (Sosyal Güvenlik, Medicare, işsizlik)'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>{isEnglish ? 'Penalties:' : 'Cezalar:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Up to 40% of unpaid taxes, plus interest' : 'Ödenmemiş vergilerin %40\'ına kadar, artı faiz'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>{isEnglish ? 'Unpaid Benefits:' : 'Ödenmemiş Haklar:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Health insurance, retirement, paid leave owed' : 'Sağlık sigortası, emeklilik, borçlu ücretli izin'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>{isEnglish ? 'Overtime & Minimum Wage:' : 'Fazla Mesai ve Asgari Ücret:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'FLSA violations with liquidated damages (2x)' : 'Tazminatlı FLSA ihlalleri (2x)'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <div>
                    <strong>{isEnglish ? 'Criminal Liability:' : 'Cezai Sorumluluk:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Willful violations can lead to prosecution' : 'Kasten ihlaller kovuşturmaya yol açabilir'}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">{isEnglish ? 'For Workers' : 'İşçiler İçin'}</h3>
              <ul className="space-y-3 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">!</span>
                  <div>
                    <strong>{isEnglish ? 'No Employer Tax Match:' : 'İşveren Vergi Eşleşmesi Yok:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'You pay full 15.3% self-employment tax' : 'Tam %15,3 serbest meslek vergisi ödersiniz'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">!</span>
                  <div>
                    <strong>{isEnglish ? 'No Benefits:' : 'Hak Yok:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'No health insurance, retirement, PTO' : 'Sağlık sigortası, emeklilik, PTO yok'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">!</span>
                  <div>
                    <strong>{isEnglish ? 'No Worker Protections:' : 'İşçi Korumaları Yok:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'No unemployment, workers\' comp, FMLA' : 'İşsizlik, işçi tazminatı, FMLA yok'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <div>
                    <strong>{isEnglish ? 'You May Have Claims:' : 'Talepleriniz Olabilir:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Can file complaints with DOL, state agencies, or sue for back pay/benefits' : 'DOL, eyalet kurumlarına şikayette bulunabilir veya geri ödeme/haklar için dava açabilirsiniz'}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 my-6">
            <h3 className="font-semibold mb-3">{isEnglish ? 'Real-World Penalties' : 'Gerçek Dünya Cezaları'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>{isEnglish ? 'Failure to withhold taxes' : 'Vergi kesintisi yapmama'}</span>
                <span className="font-semibold">{isEnglish ? '1.5% of wages + 40% of FICA' : 'Ücretlerin %1,5 + FICA\'nın %40\'ı'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>{isEnglish ? 'Failure to file W-2s' : 'W-2 dosyalamamak'}</span>
                <span className="font-semibold">$50-$280 {isEnglish ? 'per form' : 'form başına'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>{isEnglish ? 'FLSA overtime violations' : 'FLSA fazla mesai ihlalleri'}</span>
                <span className="font-semibold">{isEnglish ? '2x back pay + attorney fees' : '2x geri ödeme + avukatlık ücreti'}</span>
              </div>
              <div className="flex justify-between">
                <span>{isEnglish ? 'State penalties (CA example)' : 'Eyalet cezaları (CA örneği)'}</span>
                <span className="font-semibold">$5,000-$25,000 {isEnglish ? 'per violation' : 'ihlal başına'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: International */}
        <section id="international" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '7. International Considerations' : '7. Uluslararası Değerlendirmeler'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Worker classification rules vary significantly by country. When working across borders, both businesses and workers need to understand local requirements.'
              : 'İşçi sınıflandırma kuralları ülkeden ülkeye önemli ölçüde farklılık gösterir. Sınır ötesi çalışırken, hem işletmelerin hem de işçilerin yerel gereksinimleri anlaması gerekir.'}
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Turkey' : 'Türkiye'}</h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Turkey uses a "subordination" test focusing on whether the worker is under the employer\'s authority and instruction. Turkish law strongly presumes employment relationships, and misclassification can result in back social security contributions plus penalties.'
                  : 'Türkiye, işçinin işverenin otoritesi ve talimatı altında olup olmadığına odaklanan bir "bağımlılık" testi kullanır. Türk hukuku güçlü bir şekilde istihdam ilişkilerini varsayar ve yanlış sınıflandırma, geriye dönük sosyal güvenlik katkıları artı cezalarla sonuçlanabilir.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'European Union' : 'Avrupa Birliği'}</h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'EU member states have varying tests but generally favor employee classification. The proposed Platform Work Directive would create presumption of employment for platform workers, shifting burden to platforms to prove contractor status.'
                  : 'AB üye devletlerinin farklı testleri vardır ancak genellikle çalışan sınıflandırmasını tercih ederler. Önerilen Platform Çalışma Direktifi, platform çalışanları için istihdam karinesi oluşturacak ve yüklenici statüsünü kanıtlama yükünü platformlara yükleyecektir.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'United Kingdom' : 'Birleşik Krallık'}</h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'UK has three categories: employee, worker, and self-employed. The "worker" status provides some protections (minimum wage, paid leave) without full employment rights. IR35 rules require companies to determine contractor status for tax purposes.'
                  : 'İngiltere\'nin üç kategorisi vardır: çalışan, işçi ve serbest meslek. "İşçi" statüsü, tam istihdam hakları olmaksızın bazı korumalar (asgari ücret, ücretli izin) sağlar. IR35 kuralları, şirketlerin vergi amaçlı yüklenici statüsünü belirlemesini gerektirir.'}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <p className="font-semibold text-yellow-900">{isEnglish ? 'Cross-Border Hiring' : 'Sınır Ötesi İşe Alma'}</p>
            <p className="text-yellow-800">
              {isEnglish
                ? 'If you hire contractors in other countries, you must comply with THAT country\'s classification rules, not just US rules. Many companies use Employer of Record (EOR) services to manage international compliance.'
                : 'Diğer ülkelerde yüklenici işe alıyorsanız, sadece ABD kurallarına değil, O ülkenin sınıflandırma kurallarına uymanız gerekir. Birçok şirket uluslararası uyumu yönetmek için Employer of Record (EOR) hizmetlerini kullanır.'}
            </p>
          </div>
        </section>

        {/* Section 8: Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '8. Best Practices for Compliance' : '8. Uyum İçin En İyi Uygulamalar'}</h2>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">{isEnglish ? 'For Businesses Hiring Contractors' : 'Yüklenici İşe Alan İşletmeler İçin'}</h3>
              <ul className="space-y-2 text-green-800">
                {(isEnglish ? [
                  'Use clear written contracts specifying contractor relationship',
                  'Don\'t control HOW work is done—focus on results',
                  'Allow contractors to work for others',
                  'Don\'t provide training (hire skilled contractors)',
                  'Let contractors set their own hours and workplace',
                  'Pay by project/milestone, not hourly/salary',
                  'Require contractors to provide their own tools',
                  'Don\'t offer employee benefits',
                  'Issue 1099s, not W-2s',
                  'Document the business purpose for contractor vs employee decision'
                ] : [
                  'Yüklenici ilişkisini belirten açık yazılı sözleşmeler kullanın',
                  'İşin NASIL yapıldığını kontrol etmeyin—sonuçlara odaklanın',
                  'Yüklenicilerin başkaları için çalışmasına izin verin',
                  'Eğitim vermeyin (yetenekli yükleniciler işe alın)',
                  'Yüklenicilerin kendi saatlerini ve işyerini belirlemesine izin verin',
                  'Saatlik/maaş değil, proje/kilometre taşına göre ödeme yapın',
                  'Yüklenicilerin kendi araçlarını sağlamasını isteyin',
                  'Çalışan hakları sunmayın',
                  'W-2 değil, 1099 düzenleyin',
                  'Yüklenici vs çalışan kararı için iş amacını belgeleyin'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">{isEnglish ? 'For Workers/Freelancers' : 'İşçiler/Serbest Çalışanlar İçin'}</h3>
              <ul className="space-y-2 text-blue-800">
                {(isEnglish ? [
                  'Form a business entity (LLC) to demonstrate independence',
                  'Work for multiple clients',
                  'Have your own website and marketing materials',
                  'Use your own equipment and software',
                  'Set your own rates and hours',
                  'Invoice for your work (don\'t accept paychecks)',
                  'Carry your own insurance',
                  'Sign contracts as a business, not an individual',
                  'Avoid arrangements that look like employment'
                ] : [
                  'Bağımsızlığı göstermek için bir iş kuruluşu (LLC) kurun',
                  'Birden fazla müşteri için çalışın',
                  'Kendi web siteniz ve pazarlama materyalleriniz olsun',
                  'Kendi ekipman ve yazılımınızı kullanın',
                  'Kendi ücretlerinizi ve saatlerinizi belirleyin',
                  'İşiniz için fatura kesin (maaş çeki kabul etmeyin)',
                  'Kendi sigortanızı taşıyın',
                  'Sözleşmeleri birey olarak değil, işletme olarak imzalayın',
                  'İstihdam gibi görünen düzenlemelerden kaçının'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Summary Decision Tree */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Quick Classification Checklist' : 'Hızlı Sınıflandırma Kontrol Listesi'}</h2>
            <p className="text-gray-300 mb-4">
              {isEnglish
                ? 'If most answers are "Yes," the worker is likely a contractor. If most are "No," they\'re likely an employee.'
                : 'Cevapların çoğu "Evet" ise, işçi muhtemelen yüklenicidir. Çoğu "Hayır" ise, muhtemelen çalışandır.'}
            </p>
            <div className="space-y-3">
              {(isEnglish ? [
                'Does the worker control how, when, and where they work?',
                'Can they work for other clients simultaneously?',
                'Do they provide their own tools and equipment?',
                'Are they paid per project rather than hourly/salary?',
                'Do they have a registered business entity?',
                'Can they realize a profit or loss on the engagement?',
                'Is the relationship project-based with a defined end?',
                'Are they free from day-to-day supervision?'
              ] : [
                'İşçi nasıl, ne zaman ve nerede çalıştığını kontrol ediyor mu?',
                'Aynı anda diğer müşteriler için çalışabilir mi?',
                'Kendi araç ve ekipmanlarını sağlıyor mu?',
                'Saatlik/maaş yerine proje başına mı ödeme yapılıyor?',
                'Kayıtlı bir iş kuruluşu var mı?',
                'Angajmandan kar veya zarar edebilir mi?',
                'İlişki tanımlanmış bir sonu olan proje bazlı mı?',
                'Günlük denetimden bağımsız mı?'
              ]).map((q, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-[#C9A227] mr-3">☐</span>
                  <span className="text-gray-300">{q}</span>
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
              { q: 'Can a contract override classification rules?', a: 'No. A contract calling someone a "contractor" doesn\'t make them one legally. Classification is determined by the actual nature of the working relationship, not by labels or agreements. Courts and agencies look at how work is actually performed.' },
              { q: 'What if I\'ve been misclassified?', a: 'You can file a complaint with the IRS (Form SS-8), Department of Labor, or your state labor agency. You may be entitled to back pay, overtime, benefits, and tax refunds. Consider consulting an employment attorney.' },
              { q: 'Can I be a contractor for one company and employee for another?', a: 'Yes, absolutely. Classification is determined relationship by relationship. You could be an employee at your day job and a legitimate contractor for freelance work, as long as each relationship meets the appropriate criteria.' },
              { q: 'Does working from home make me a contractor?', a: 'No. Remote work alone doesn\'t determine classification. Many employees work from home. What matters is the degree of control over HOW work is performed, not WHERE.' },
              { q: 'What about the gig economy?', a: 'Gig workers (Uber, DoorDash, etc.) have been the subject of major legal battles. Some states (California) have moved toward classifying them as employees, while others maintain contractor status. This area of law is rapidly evolving.' }
            ] : [
              { q: 'Sözleşme sınıflandırma kurallarını geçersiz kılabilir mi?', a: 'Hayır. Birini "yüklenici" olarak adlandıran bir sözleşme onu yasal olarak yüklenici yapmaz. Sınıflandırma, etiketler veya anlaşmalarla değil, çalışma ilişkisinin gerçek doğasıyla belirlenir. Mahkemeler ve kurumlar işin gerçekte nasıl yapıldığına bakar.' },
              { q: 'Yanlış sınıflandırılmışsam ne olur?', a: 'IRS (Form SS-8), Çalışma Bakanlığı veya eyalet çalışma kurumunuza şikayette bulunabilirsiniz. Geri ödeme, fazla mesai, haklar ve vergi iadeleri hakkınız olabilir. Bir iş hukuku avukatına danışmayı düşünün.' },
              { q: 'Bir şirket için yüklenici ve başka biri için çalışan olabilir miyim?', a: 'Evet, kesinlikle. Sınıflandırma ilişkiye göre belirlenir. Günlük işinizde çalışan ve serbest çalışma için meşru yüklenici olabilirsiniz, her ilişki uygun kriterleri karşıladığı sürece.' },
              { q: 'Evden çalışmak beni yüklenici yapar mı?', a: 'Hayır. Uzaktan çalışma tek başına sınıflandırmayı belirlemez. Birçok çalışan evden çalışır. Önemli olan işin NEREDE değil, NASIL yapıldığı üzerindeki kontrol derecesidir.' },
              { q: 'Gig ekonomisi ne olacak?', a: 'Gig çalışanları (Uber, DoorDash, vb.) büyük hukuki mücadelelerin konusu olmuştur. Bazı eyaletler (Kaliforniya) onları çalışan olarak sınıflandırmaya doğru ilerledi, diğerleri yüklenici statüsünü sürdürüyor. Bu hukuk alanı hızla gelişiyor.' }
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
            <Link href={`/${lang}/encyclopedia/freelancer-legal-guide`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışan Hukuk Rehberi'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/1099-vergi-belgeleri`} className="text-[#C9A227] hover:underline">
              {isEnglish ? '1099 Tax Documents Explained' : '1099 Vergi Belgeleri Açıklaması'} →
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
