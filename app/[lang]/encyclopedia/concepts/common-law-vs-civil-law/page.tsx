import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  return {
    title: isEnglish
      ? 'Common Law vs Civil Law | Legal Encyclopedia | EchoLegal'
      : 'Common Law ve Medeni Hukuk | Hukuk Ansiklopedisi | EchoLegal',
    description: isEnglish
      ? 'A comparative analysis of common law and civil law legal traditions. Structural differences, sources of law, judicial roles, and practical implications for cross-border transactions.'
      : 'Common law ve medeni hukuk geleneklerinin karşılaştırmalı analizi. Yapısal farklılıklar, hukukun kaynakları, yargısal roller ve sınır ötesi işlemler için pratik sonuçlar.',
  }
}

export default async function CommonLawVsCivilLawPage({
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
        <span className="text-black font-medium">{isEnglish ? 'Common Law vs Civil Law' : 'Common Law ve Medeni Hukuk'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-[#C9A227] uppercase tracking-widest mb-2">
            {isEnglish ? 'Core Concept' : 'Temel Kavram'}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Common Law vs Civil Law' : 'Common Law ve Medeni Hukuk'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'A comparative analysis of the two dominant legal traditions, their structural foundations, and the practical consequences for parties operating across legal systems.'
              : 'İki baskın hukuk geleneğinin yapısal temelleri ve farklı hukuk sistemlerinde faaliyet gösteren taraflar için pratik sonuçlarının karşılaştırmalı analizi.'}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
            <span>{isEnglish ? 'Last Updated: February 2026' : 'Son Güncelleme: Şubat 2026'}</span>
            <span>•</span>
            <span>{isEnglish ? '13 min read' : '13 dk okuma'}</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
          <ul className="space-y-2">
            <li><a href="#overview" className="text-[#C9A227] hover:underline">{isEnglish ? '1. Two Legal Traditions' : '1. İki Hukuk Geleneği'}</a></li>
            <li><a href="#sources" className="text-[#C9A227] hover:underline">{isEnglish ? '2. Sources of Law' : '2. Hukukun Kaynakları'}</a></li>
            <li><a href="#judicial-role" className="text-[#C9A227] hover:underline">{isEnglish ? '3. The Role of the Judiciary' : '3. Yargının Rolü'}</a></li>
            <li><a href="#contract-law" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Implications for Contract Law' : '4. Sözleşme Hukuku Açısından Sonuçlar'}</a></li>
            <li><a href="#procedural" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Procedural Differences' : '5. Usul Hukuku Farklılıkları'}</a></li>
            <li><a href="#mixed" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Mixed and Hybrid Systems' : '6. Karma ve Melez Sistemler'}</a></li>
            <li><a href="#cross-border" className="text-[#C9A227] hover:underline">{isEnglish ? '7. Cross-Border Implications' : '7. Sınır Ötesi İşlemler İçin Sonuçlar'}</a></li>
          </ul>
        </div>

        {/* Section 1 */}
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. Two Legal Traditions' : '1. İki Hukuk Geleneği'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The world\'s legal systems are broadly organized into two principal traditions: common law and civil law. This division, while necessarily simplified, reflects fundamental differences in the sources, methodology, and institutional structures of legal reasoning. Understanding these differences is essential for any party engaged in cross-border transactions or subject to the laws of multiple jurisdictions.'
              : 'Dünya hukuk sistemleri genel olarak iki temel gelenek etrafında örgütlenir: common law ve medeni hukuk (kıta Avrupası hukuku). Bu ayrım, zorunlu olarak basitleştirilmiş olmakla birlikte, hukuki akıl yürütmenin kaynakları, metodolojisi ve kurumsal yapılarındaki temel farklılıkları yansıtır. Bu farklılıkların kavranması, sınır ötesi işlemlerle uğraşan veya birden fazla yargı alanının hukukuna tabi olan taraflar için esastır.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The common law tradition, originating in medieval England, is characterized by the doctrine of judicial precedent (stare decisis) and the predominance of case law as a source of legal rules. The civil law tradition, deriving from Roman law through the codifications of continental Europe, is characterized by comprehensive legislative codes that serve as the primary source of legal authority.'
              : 'Ortaçağ İngiltere\'sinden kaynaklanan common law geleneği, yargısal emsal doktrini (stare decisis) ve hukuki kuralların kaynağı olarak içtihat hukukunun (case law) baskınlığı ile nitelenir. Roma hukukundan Kıta Avrupası\'nın kodifikasyonları aracılığıyla türeyen medeni hukuk geleneği ise hukuki otoritenin birincil kaynağı olarak kapsamlı yasama kodlarıyla karakterize edilir.'}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
              <h3 className="font-semibold text-blue-900 mb-3">{isEnglish ? 'Common Law Systems' : 'Common Law Sistemleri'}</h3>
              <p className="text-sm text-blue-800 mb-3">{isEnglish
                ? 'United States, United Kingdom, Canada, Australia, India, Hong Kong, Singapore, and other former British territories.'
                : 'Amerika Birleşik Devletleri, Birleşik Krallık, Kanada, Avustralya, Hindistan, Hong Kong, Singapur ve diğer eski İngiliz toprakları.'}</p>
              <p className="text-xs text-blue-700">{isEnglish
                ? 'Approximately 30% of world jurisdictions.'
                : 'Dünya yargı alanlarının yaklaşık %30\'u.'}</p>
            </div>
            <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
              <h3 className="font-semibold text-green-900 mb-3">{isEnglish ? 'Civil Law Systems' : 'Medeni Hukuk Sistemleri'}</h3>
              <p className="text-sm text-green-800 mb-3">{isEnglish
                ? 'Continental Europe (France, Germany, Italy, Spain), Turkey, Japan, South Korea, most of Latin America, and much of Africa and Asia.'
                : 'Kıta Avrupası (Fransa, Almanya, İtalya, İspanya), Türkiye, Japonya, Güney Kore, Latin Amerika\'nın büyük bölümü ve Afrika ile Asya\'nın önemli kısmı.'}</p>
              <p className="text-xs text-green-700">{isEnglish
                ? 'Approximately 60% of world jurisdictions.'
                : 'Dünya yargı alanlarının yaklaşık %60\'ı.'}</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="sources" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. Sources of Law' : '2. Hukukun Kaynakları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'The most fundamental structural difference between the two traditions lies in their primary sources of legal authority. This distinction shapes not only how law is created but how it is interpreted, applied, and evolved over time.'
              : 'İki gelenek arasındaki en temel yapısal farklılık, birincil hukuki otorite kaynaklarında yatar. Bu ayrım yalnızca hukukun nasıl yaratıldığını değil, nasıl yorumlandığını, uygulandığını ve zaman içinde nasıl evrildiğini de şekillendirir.'}
          </p>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Source' : 'Kaynak'}</th>
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Common Law' : 'Common Law'}</th>
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Civil Law' : 'Medeni Hukuk'}</th>
                </tr>
              </thead>
              <tbody>
                {(isEnglish ? [
                  { source: 'Primary authority', cl: 'Judicial decisions (case law)', civil: 'Legislative codes and statutes' },
                  { source: 'Role of precedent', cl: 'Binding under stare decisis', civil: 'Persuasive but not formally binding' },
                  { source: 'Statutory codes', cl: 'Supplementary; interpreted in light of case law', civil: 'Primary; intended as comprehensive systems' },
                  { source: 'Scholarly doctrine', cl: 'Secondary source; limited formal authority', civil: 'Significant influence on interpretation' },
                  { source: 'Custom', cl: 'Recognized in limited contexts', civil: 'Recognized as supplementary source (TBK Art. 1)' },
                ] : [
                  { source: 'Birincil otorite', cl: 'Yargı kararları (içtihat hukuku)', civil: 'Yasama kodları ve kanunlar' },
                  { source: 'Emsal rolü', cl: 'Stare decisis kapsamında bağlayıcı', civil: 'İkna edici ancak resmi olarak bağlayıcı değil' },
                  { source: 'Kanun kodları', cl: 'Tamamlayıcı; içtihat ışığında yorumlanır', civil: 'Birincil; kapsamlı sistemler olarak tasarlanmıştır' },
                  { source: 'Akademik doktrin', cl: 'İkincil kaynak; sınırlı resmi otorite', civil: 'Yorum üzerinde önemli etkiye sahip' },
                  { source: 'Örf ve adet', cl: 'Sınırlı bağlamlarda tanınır', civil: 'Tamamlayıcı kaynak olarak tanınır (TBK m. 1)' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border-b border-gray-200 font-medium">{row.source}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-600">{row.cl}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-600">{row.civil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section id="judicial-role" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. The Role of the Judiciary' : '3. Yargının Rolü'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'In common law systems, judges serve a dual function: they adjudicate disputes and, through their written opinions, create law that binds future courts within the same hierarchy. The doctrine of stare decisis — the obligation to follow established precedent — ensures continuity and predictability while permitting incremental legal development through distinguishing or, in rare cases, overruling prior decisions.'
              : 'Common law sistemlerinde yargıçlar çift işlev görür: uyuşmazlıkları karara bağlar ve yazılı kararları aracılığıyla aynı hiyerarşi içindeki gelecek mahkemeleri bağlayan hukuk yaratır. Stare decisis doktrini — yerleşik içtihada uyma yükümlülüğü — önceki kararların ayırt edilmesi veya nadir durumlarda bozulması yoluyla kademeli hukuki gelişime izin verirken süreklilik ve öngörülebilirlik sağlar.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'In civil law systems, the judicial role is conceptually narrower. Judges apply the code to the facts of the case; they do not, in theory, create law. Judicial decisions are not formally binding on other courts, though in practice the decisions of high courts — such as the Turkish Court of Cassation (Yargıtay) — carry substantial persuasive authority and are regularly cited.'
              : 'Medeni hukuk sistemlerinde yargısal rol kavramsal olarak daha dardır. Yargıçlar kanunu davanın olgularına uygular; teorik olarak hukuk yaratmaz. Yargı kararları diğer mahkemeleri resmi olarak bağlamaz; ancak uygulamada yüksek mahkeme kararları — Yargıtay kararları gibi — önemli ikna edici otoriteye sahiptir ve düzenli olarak atıfta bulunulur.'}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'The Turkish Judiciary' : 'Türk Yargısı'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Turkey\'s legal system, shaped by the reception of the Swiss Civil Code in 1926, follows the civil law tradition. The Court of Cassation (Yargıtay) serves as the supreme appellate court for civil and criminal matters. While its decisions are not formally binding as precedent, the concept of "içtihadı birleştirme kararları" (unification of jurisprudence decisions) creates binding interpretive authority on specific legal questions when adopted by the General Assembly.'
                : 'Türk hukuk sistemi, 1926\'da İsviçre Medeni Kanunu\'nun alınmasıyla şekillenen medeni hukuk geleneğini takip eder. Yargıtay, hukuk ve ceza davalarında en yüksek temyiz mahkemesi olarak görev yapar. Kararları resmi olarak emsal niteliğinde bağlayıcı olmamakla birlikte, Genel Kurul tarafından kabul edilen "içtihadı birleştirme kararları" belirli hukuki sorularda bağlayıcı yorumlama otoritesi oluşturur.'}
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section id="contract-law" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Implications for Contract Law' : '4. Sözleşme Hukuku Açısından Sonuçlar'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'The common law / civil law distinction has significant practical consequences for how contracts are formed, interpreted, and enforced. Parties entering into cross-border agreements must understand these differences to draft provisions that will be given effect under the applicable legal system.'
              : 'Common law / medeni hukuk ayrımı, sözleşmelerin nasıl kurulduğu, yorumlandığı ve uygulandığı konusunda önemli pratik sonuçlar doğurur. Sınır ötesi anlaşmalara giren taraflar, uygulanacak hukuk sistemi altında hüküm ifade edecek hükümler kaleme almak için bu farklılıkları kavramalıdır.'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { area: 'Formation', cl: 'Requires offer, acceptance, and consideration. The consideration doctrine has no equivalent in civil law.', civil: 'Requires mutual declarations of intent (icap and kabul). No consideration requirement; causa or its absence does not generally invalidate a contract.' },
              { area: 'Interpretation', cl: 'Objective approach: courts assess the reasonable meaning of the contract language. Parol evidence rule may exclude extrinsic evidence of prior negotiations.', civil: 'Subjective approach: courts seek the actual shared intent of the parties. Parol evidence rule does not apply; surrounding circumstances are freely considered.' },
              { area: 'Good faith', cl: 'Implied duty of good faith in performance (UCC § 1-304; Restatement § 205). No general pre-contractual good faith duty.', civil: 'General duty of good faith at all stages, including pre-contractual negotiations (TBK Art. 2; TMK Art. 2). Culpa in contrahendo is recognized.' },
              { area: 'Form requirements', cl: 'Generally formless; Statute of Frauds applies to limited categories.', civil: 'More extensive form requirements. Certain contracts require notarial form (resmi şekil) for validity.' },
              { area: 'Remedies', cl: 'Damages as default remedy. Specific performance is equitable and discretionary.', civil: 'Specific performance as primary remedy (aynen ifa). Damages are supplementary.' },
            ] : [
              { area: 'Kuruluş', cl: 'İcap, kabul ve ivaz gerektirir. İvaz doktrininin medeni hukukta karşılığı yoktur.', civil: 'Karşılıklı irade beyanları (icap ve kabul) gerektirir. İvaz şartı aranmaz; sebep (causa) veya yokluğu sözleşmeyi genel olarak geçersiz kılmaz.' },
              { area: 'Yorum', cl: 'Objektif yaklaşım: mahkemeler sözleşme dilinin makul anlamını değerlendirir. Parol evidence kuralı, önceki müzakerelere ilişkin dış kanıtları dışlayabilir.', civil: 'Sübjektif yaklaşım: mahkemeler tarafların gerçek ortak iradesini arar. Parol evidence kuralı uygulanmaz; çevre koşullar serbestçe değerlendirilir.' },
              { area: 'Dürüstlük kuralı', cl: 'İfa aşamasında zımni dürüstlük yükümlülüğü (UCC § 1-304; Restatement § 205). Genel bir sözleşme öncesi dürüstlük yükümlülüğü yoktur.', civil: 'Sözleşme öncesi müzakereler dahil tüm aşamalarda genel dürüstlük yükümlülüğü (TBK m. 2; TMK m. 2). Culpa in contrahendo tanınır.' },
              { area: 'Şekil şartları', cl: 'Genel olarak şekilsiz; Statute of Frauds sınırlı kategorilere uygulanır.', civil: 'Daha kapsamlı şekil şartları. Belirli sözleşmeler geçerlilik için resmi şekil gerektirir.' },
              { area: 'Yaptırımlar', cl: 'Varsayılan yaptırım tazminattır. Aynen ifa hakkaniyete dayalı ve takdiridir.', civil: 'Birincil yaptırım aynen ifadır. Tazminat tamamlayıcıdır.' },
            ]).map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">{item.area}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{isEnglish ? 'Common Law' : 'Common Law'}</p>
                    <p className="text-sm text-gray-600">{item.cl}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{isEnglish ? 'Civil Law' : 'Medeni Hukuk'}</p>
                    <p className="text-sm text-gray-600">{item.civil}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section id="procedural" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Procedural Differences' : '5. Usul Hukuku Farklılıkları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The adversarial and inquisitorial models represent the procedural dimension of the common law / civil law divide. While modern practice has produced considerable convergence, the foundational procedural orientation of each system remains distinct.'
              : 'Çekişmeli (adversarial) ve tahkiki (inquisitorial) modeller, common law / medeni hukuk ayrımının usul hukuku boyutunu temsil eder. Modern uygulama önemli ölçüde yakınlaşma üretmişken, her sistemin temel usuli yönelimi ayrı kalmaya devam eder.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3">{isEnglish ? 'Adversarial System' : 'Çekişmeli Sistem'}</h3>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{isEnglish ? 'Common Law' : 'Common Law'}</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {isEnglish ? 'Parties drive the proceedings; judge serves as neutral arbiter' : 'Taraflar yargılamayı yönlendirir; yargıç tarafsız hakem olarak görev yapar'}</li>
                <li>• {isEnglish ? 'Extensive pre-trial discovery between parties' : 'Taraflar arasında kapsamlı ön-duruşma keşif süreci'}</li>
                <li>• {isEnglish ? 'Oral testimony and cross-examination emphasized' : 'Sözlü tanıklık ve çapraz sorgu vurgulanır'}</li>
                <li>• {isEnglish ? 'Jury trial available in many civil cases' : 'Birçok hukuk davasında jüri yargılaması mevcuttur'}</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3">{isEnglish ? 'Inquisitorial System' : 'Tahkiki Sistem'}</h3>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{isEnglish ? 'Civil Law' : 'Medeni Hukuk'}</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {isEnglish ? 'Judge plays an active role in gathering evidence and directing proceedings' : 'Yargıç delil toplamada ve yargılamayı yönlendirmede aktif rol oynar'}</li>
                <li>• {isEnglish ? 'Limited or no pre-trial discovery' : 'Sınırlı veya hiç ön-duruşma keşif süreci yoktur'}</li>
                <li>• {isEnglish ? 'Written submissions and documentary evidence emphasized' : 'Yazılı beyanlar ve belgesel kanıtlar vurgulanır'}</li>
                <li>• {isEnglish ? 'No jury in civil proceedings' : 'Hukuk davalarında jüri bulunmaz'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="mixed" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. Mixed and Hybrid Systems' : '6. Karma ve Melez Sistemler'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The binary classification of legal systems as purely common law or civil law, while analytically useful, does not fully capture the complexity of modern legal practice. Numerous jurisdictions operate under hybrid systems that integrate elements of both traditions, sometimes alongside religious or customary law.'
              : 'Hukuk sistemlerinin saf common law veya medeni hukuk olarak ikili sınıflandırması, analitik açıdan yararlı olmakla birlikte, modern hukuk uygulamasının karmaşıklığını tam olarak yansıtmaz. Çok sayıda yargı alanı, her iki geleneğin unsurlarını — bazen dini veya geleneksel hukukla birlikte — bütünleştiren karma sistemler altında faaliyet gösterir.'}
          </p>

          <div className="space-y-3">
            {(isEnglish ? [
              { system: 'Louisiana (United States)', desc: 'Civil law tradition for private law (based on French and Spanish codes), operating within the common law federal framework.' },
              { system: 'Scotland', desc: 'A mixed system combining elements of Roman-derived civil law with English common law principles.' },
              { system: 'South Africa', desc: 'Roman-Dutch civil law tradition combined with English common law, particularly in procedural and commercial matters.' },
              { system: 'Japan', desc: 'Civil code modeled after the German BGB and French Code civil, with significant post-war common law influence in constitutional and commercial law.' },
              { system: 'Turkey', desc: 'Civil law system received from the Swiss Civil Code (1926) and Swiss Code of Obligations, with subsequent influence from German and Italian legal scholarship.' },
            ] : [
              { system: 'Louisiana (ABD)', desc: 'Özel hukuk için medeni hukuk geleneği (Fransız ve İspanyol kodlarına dayalı), common law federal çerçevesi içinde işler.' },
              { system: 'İskoçya', desc: 'Roma kaynaklı medeni hukuk unsurlarını İngiliz common law ilkeleriyle birleştiren karma sistem.' },
              { system: 'Güney Afrika', desc: 'Roma-Hollanda medeni hukuk geleneği, özellikle usul ve ticaret hukukunda İngiliz common law ile birleştirilmiştir.' },
              { system: 'Japonya', desc: 'Alman BGB ve Fransız Code civil\'e göre modellenen medeni kanun; anayasa ve ticaret hukukunda önemli savaş sonrası common law etkisi.' },
              { system: 'Türkiye', desc: 'İsviçre Medeni Kanunu (1926) ve İsviçre Borçlar Kanunu\'ndan alınan medeni hukuk sistemi; sonradan Alman ve İtalyan hukuk doktrininin etkisi.' },
            ]).map((item, i) => (
              <div key={i} className="flex items-start border-l-4 border-gray-300 pl-4">
                <div>
                  <span className="font-semibold text-gray-900">{item.system}</span>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7 */}
        <section id="cross-border" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '7. Cross-Border Implications' : '7. Sınır Ötesi İşlemler İçin Sonuçlar'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'For parties operating across the common law / civil law divide, the structural differences identified above have immediate practical consequences for transaction planning, contract drafting, and dispute resolution strategy.'
              : 'Common law / medeni hukuk ayrımının her iki yakasında faaliyet gösteren taraflar için yukarıda tespit edilen yapısal farklılıklar, işlem planlaması, sözleşme kaleme alımı ve uyuşmazlık çözüm stratejisi açısından doğrudan pratik sonuçlar doğurur.'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { point: 'Contract drafting must account for the interpretive methodology of the governing law.', detail: 'A contract governed by common law should be drafted with greater specificity, as courts will apply the language objectively. A contract governed by civil law may rely more on good faith and implied obligations, but should still define key terms to avoid interpretive disputes.' },
              { point: 'Discovery and evidence rules affect litigation strategy.', detail: 'Parties litigating in a common law forum should anticipate broad discovery obligations. In civil law forums, the absence of discovery makes pre-litigation document preservation and organization essential.' },
              { point: 'Enforcement mechanisms differ between systems.', detail: 'Common law jurisdictions generally require a separate enforcement proceeding to execute a foreign judgment. Civil law jurisdictions may enforce through exequatur proceedings, subject to bilateral or multilateral treaty obligations.' },
              { point: 'Alternative dispute resolution may bridge systemic differences.', detail: 'International arbitration, conducted under institutional rules (ICC, LCIA, ISTAC) and subject to the New York Convention for enforcement, offers a procedurally neutral framework that transcends the common law / civil law divide.' },
            ] : [
              { point: 'Sözleşme kaleme alımı, uygulanacak hukukun yorum metodolojisini dikkate almalıdır.', detail: 'Common law\'a tabi bir sözleşme, mahkemelerin dili objektif olarak uygulayacağı göz önünde bulundurularak daha spesifik kaleme alınmalıdır. Medeni hukuka tabi bir sözleşme dürüstlük kuralı ve zımni yükümlülüklere daha fazla dayanabilir; ancak yorum uyuşmazlıklarını önlemek için temel terimlerin yine de tanımlanması gerekir.' },
              { point: 'Keşif ve delil kuralları dava stratejisini etkiler.', detail: 'Common law mahkemesinde dava açan taraflar geniş keşif yükümlülüklerini öngörmelidir. Medeni hukuk mahkemelerinde keşif sürecinin yokluğu, dava öncesi belge muhafaza ve organizasyonunu zorunlu kılar.' },
              { point: 'İcra mekanizmaları sistemler arasında farklılık gösterir.', detail: 'Common law yargı alanları genellikle yabancı mahkeme kararını icra etmek için ayrı bir icra davası gerektirir. Medeni hukuk yargı alanları, ikili veya çok taraflı anlaşma yükümlülüklerine tabi olarak exequatur davası yoluyla tenfiz edebilir.' },
              { point: 'Alternatif uyuşmazlık çözümü sistemik farklılıkları köprüleyebilir.', detail: 'Kurumsal kurallar (ICC, LCIA, ISTAC) altında yürütülen ve tenfiz için New York Sözleşmesi\'ne tabi uluslararası tahkim, common law / medeni hukuk ayrımını aşan usuli açıdan tarafsız bir çerçeve sunar.' },
            ]).map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-5">
                <p className="font-semibold text-gray-900 mb-2">{item.point}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference Status */}
        <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">{isEnglish ? 'Reference Status' : 'Referans Durumu'}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {isEnglish
              ? 'This entry is part of a foundational legal reference library intended for general informational use. It does not constitute legal advice, and readers should consult a licensed attorney for guidance specific to their jurisdiction and circumstances.'
              : 'Bu madde, genel bilgilendirme amacıyla hazırlanmış temel bir hukuki başvuru kütüphanesinin parçasıdır. Hukuki tavsiye niteliğinde değildir; okuyucular, kendi yargı alanları ve koşullarına özgü rehberlik için lisanslı bir avukata danışmalıdır.'}
          </p>
        </section>
      </article>

      {/* Related Legal Concepts */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">{isEnglish ? 'Related Legal Concepts' : 'İlgili Hukuki Kavramlar'}</h2>
        <ul className="space-y-2">
          <li>
            <Link href={`/${lang}/encyclopedia/concepts/contract-formation-enforceability`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Contract Formation & Enforceability' : 'Sözleşme Kurulumu ve Uygulanabilirlik'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia/concepts/governing-law-jurisdiction`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Governing Law & Jurisdiction' : 'Uygulanacak Hukuk ve Yargı Yetkisi'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia/contractor-vs-employee`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Contractor vs Employee' : 'Bağımsız Yüklenici mi, İşçi mi?'} →
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
