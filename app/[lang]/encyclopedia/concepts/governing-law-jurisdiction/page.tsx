import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  return {
    title: isEnglish
      ? 'Governing Law & Jurisdiction | Legal Encyclopedia | EchoLegal'
      : 'Uygulanacak Hukuk ve Yargı Yetkisi | Hukuk Ansiklopedisi | EchoLegal',
    description: isEnglish
      ? 'How governing law clauses and jurisdictional provisions determine which legal system applies to a contract and where disputes are resolved.'
      : 'Uygulanacak hukuk klozları ve yargı yetkisi hükümlerinin sözleşmeye hangi hukuk sisteminin uygulanacağını ve uyuşmazlıkların nerede çözüleceğini nasıl belirlediği.',
  }
}

export default async function GoverningLawPage({
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
        <span className="text-black font-medium">{isEnglish ? 'Governing Law & Jurisdiction' : 'Uygulanacak Hukuk ve Yargı Yetkisi'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-[#C9A227] uppercase tracking-widest mb-2">
            {isEnglish ? 'Core Concept' : 'Temel Kavram'}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Governing Law & Jurisdiction' : 'Uygulanacak Hukuk ve Yargı Yetkisi'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'How contractual choice-of-law and forum selection clauses determine the applicable legal framework and the forum for dispute resolution in cross-border and multi-jurisdictional transactions.'
              : 'Sözleşmelerdeki hukuk seçimi ve mahkeme seçimi klozlarının, sınır ötesi ve çok yargı alanlı işlemlerde uygulanacak hukuki çerçeveyi ve uyuşmazlık çözüm merciini nasıl belirlediği.'}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
            <span>{isEnglish ? 'Last Updated: February 2026' : 'Son Güncelleme: Şubat 2026'}</span>
            <span>•</span>
            <span>{isEnglish ? '12 min read' : '12 dk okuma'}</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
          <ul className="space-y-2">
            <li><a href="#distinction" className="text-[#C9A227] hover:underline">{isEnglish ? '1. Governing Law vs Jurisdiction: A Foundational Distinction' : '1. Uygulanacak Hukuk ve Yargı Yetkisi: Temel Ayrım'}</a></li>
            <li><a href="#choice-of-law" className="text-[#C9A227] hover:underline">{isEnglish ? '2. Choice-of-Law Clauses' : '2. Hukuk Seçimi Klozları'}</a></li>
            <li><a href="#forum-selection" className="text-[#C9A227] hover:underline">{isEnglish ? '3. Forum Selection and Consent to Jurisdiction' : '3. Mahkeme Seçimi ve Yargı Yetkisine Rıza'}</a></li>
            <li><a href="#us-framework" className="text-[#C9A227] hover:underline">{isEnglish ? '4. US Framework: Federal and State Dimensions' : '4. ABD Çerçevesi: Federal ve Eyalet Boyutları'}</a></li>
            <li><a href="#international" className="text-[#C9A227] hover:underline">{isEnglish ? '5. International Dimensions' : '5. Uluslararası Boyutlar'}</a></li>
            <li><a href="#arbitration" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Arbitration as an Alternative Forum' : '6. Alternatif Çözüm Mercii Olarak Tahkim'}</a></li>
            <li><a href="#practical" className="text-[#C9A227] hover:underline">{isEnglish ? '7. Practical Implications for Drafting' : '7. Sözleşme Kaleme Alımında Pratik Sonuçlar'}</a></li>
          </ul>
        </div>

        {/* Section 1 */}
        <section id="distinction" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. Governing Law vs Jurisdiction: A Foundational Distinction' : '1. Uygulanacak Hukuk ve Yargı Yetkisi: Temel Ayrım'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'In legal doctrine, "governing law" (also referred to as "applicable law" or "choice of law") and "jurisdiction" address two distinct questions. Governing law determines which legal system\'s substantive rules apply to the interpretation and enforcement of a contract. Jurisdiction determines which court or tribunal has the authority to hear and decide a dispute arising from the contract.'
              : 'Hukuk doktrininde "uygulanacak hukuk" (aynı zamanda "tatbik edilecek hukuk" veya "kanunlar ihtilafı" olarak da anılır) ve "yargı yetkisi" iki ayrı soruyu ele alır. Uygulanacak hukuk, sözleşmenin yorumlanması ve uygulanmasında hangi hukuk sisteminin maddi kurallarının geçerli olacağını belirler. Yargı yetkisi ise sözleşmeden doğan uyuşmazlığı dinleme ve karara bağlama yetkisinin hangi mahkeme veya hakem heyetinde olduğunu tespit eder.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'These two questions may yield different answers. A contract may specify that New York substantive law governs its interpretation while designating the courts of Delaware as the exclusive forum for disputes. Understanding this separation is essential for parties engaged in multi-jurisdictional commerce.'
              : 'Bu iki soru farklı cevaplar verebilir. Bir sözleşme, yorumlanmasında New York maddi hukukunun uygulanacağını belirlerken, uyuşmazlıkların münhasır mercii olarak Delaware mahkemelerini tayin edebilir. Bu ayrımın kavranması, çok yargı alanlı ticarette faaliyet gösteren taraflar için esastır.'}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Governing Law' : 'Uygulanacak Hukuk'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'Which rules apply?' : 'Hangi kurallar uygulanır?'}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• {isEnglish ? 'Substantive contract law' : 'Maddi sözleşme hukuku'}</li>
                <li>• {isEnglish ? 'Interpretation of terms' : 'Şartların yorumu'}</li>
                <li>• {isEnglish ? 'Rights and obligations of parties' : 'Tarafların hak ve yükümlülükleri'}</li>
                <li>• {isEnglish ? 'Available remedies' : 'Mevcut hukuki yaptırımlar'}</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Jurisdiction' : 'Yargı Yetkisi'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'Which court decides?' : 'Hangi mahkeme karar verir?'}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>• {isEnglish ? 'Forum for dispute resolution' : 'Uyuşmazlık çözüm mercii'}</li>
                <li>• {isEnglish ? 'Procedural rules' : 'Usul kuralları'}</li>
                <li>• {isEnglish ? 'Enforcement mechanisms' : 'İcra mekanizmaları'}</li>
                <li>• {isEnglish ? 'Service of process requirements' : 'Tebligat gereksinimleri'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="choice-of-law" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. Choice-of-Law Clauses' : '2. Hukuk Seçimi Klozları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Party autonomy — the freedom of contracting parties to select the law governing their agreement — is a foundational principle in both common law and civil law systems. In most common law jurisdictions, courts will honor a reasonable choice-of-law clause provided there is a substantial relationship between the chosen jurisdiction and the parties or transaction, or there exists another reasonable basis for the choice.'
              : 'Taraf otonomisi — sözleşme taraflarının anlaşmalarına uygulanacak hukuku seçme özgürlüğü — hem common law hem de medeni hukuk sistemlerinde temel bir ilkedir. Çoğu common law yargı alanında mahkemeler, seçilen yargı alanı ile taraflar veya işlem arasında esaslı bir bağ bulunması ya da seçim için makul bir gerekçe olması koşuluyla, makul bir hukuk seçimi klozuna saygı gösterir.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Under the Restatement (Second) of Conflict of Laws § 187, a choice-of-law provision will be upheld unless: (a) the chosen state has no substantial relationship to the parties or the transaction and there is no other reasonable basis for the choice, or (b) application of the chosen law would contravene a fundamental policy of a state with a materially greater interest in the issue.'
              : 'Kanunlar İhtilafı Restatement (İkinci) § 187 kapsamında, hukuk seçimi hükmü şu haller dışında geçerli kabul edilir: (a) seçilen eyaletin taraflarla veya işlemle esaslı bir bağı yoksa ve seçim için başka makul bir gerekçe bulunmuyorsa, veya (b) seçilen hukukun uygulanması, konuya ilişkin maddi açıdan daha büyük menfaati olan bir eyaletin temel politikasına aykırıysa.'}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Limits on Party Autonomy' : 'Taraf Otonomisinin Sınırları'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Party autonomy is not unlimited. Mandatory rules of the forum state — including consumer protection statutes, employment regulations, and anti-trust provisions — cannot be circumvented by a choice-of-law clause. In Turkish law, MÖHUK Art. 24 governs contractual choice of law, but mandatory provisions of Turkish law (emredici hükümler) remain applicable where Turkey has a closer connection to the dispute.'
                : 'Taraf otonomisi sınırsız değildir. Forum devletinin emredici kuralları — tüketici koruma mevzuatı, iş hukuku düzenlemeleri ve rekabet hukuku hükümleri dahil — hukuk seçimi klozu ile bertaraf edilemez. Türk hukukunda MÖHUK m. 24 sözleşmesel hukuk seçimini düzenler; ancak Türkiye\'nin uyuşmazlıkla daha yakın bağı olduğu durumlarda Türk hukukunun emredici hükümleri uygulanabilir olmaya devam eder.'}
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="forum-selection" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. Forum Selection and Consent to Jurisdiction' : '3. Mahkeme Seçimi ve Yargı Yetkisine Rıza'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'A forum selection clause designates the court or arbitral tribunal that will have authority to resolve disputes. Such clauses may be "exclusive" — restricting all litigation to the designated forum — or "non-exclusive" — merely consenting to jurisdiction in the designated forum without waiving the right to litigate elsewhere.'
              : 'Mahkeme seçimi klozu, uyuşmazlıkları çözme yetkisine sahip olacak mahkeme veya hakem heyetini tayin eder. Bu klozlar "münhasır" olabilir — tüm davaları belirlenen merciyle sınırlandırır — veya "münhasır olmayan" — başka yerlerde dava açma hakkından feragat etmeksizin belirlenen mercide yargı yetkisine rıza gösterir.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'In the United States, the Supreme Court\'s decision in M/S Bremen v. Zapata Off-Shore Co. (1972) established that forum selection clauses are "prima facie valid" and should be enforced unless the resisting party can demonstrate that enforcement would be unreasonable or unjust, or that the clause was procured through fraud or overreaching.'
              : 'Amerika Birleşik Devletleri\'nde, Yüksek Mahkeme\'nin M/S Bremen v. Zapata Off-Shore Co. (1972) kararı, mahkeme seçimi klozlarının "prima facie geçerli" olduğunu ve karşı tarafın uygulamanın makul olmadığını veya adaletsiz olacağını ya da klozun hile veya aşırı baskı ile elde edildiğini kanıtlayamadığı sürece uygulanması gerektiğini belirlemiştir.'}
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Exclusive Forum Clauses' : 'Münhasır Yetki Klozları'}</h3>
              <p className="text-gray-600 text-sm">{isEnglish
                ? 'Limit litigation to a single designated forum. All other courts must dismiss or stay proceedings in deference to the exclusive designation. Provide maximum certainty regarding the dispute resolution venue.'
                : 'Davaları tek bir belirlenen merci ile sınırlar. Diğer tüm mahkemeler, münhasır tayine saygı göstererek davayı reddetmeli veya bekletmelidir. Uyuşmazlık çözüm yeri konusunda azami kesinlik sağlar.'}</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Non-Exclusive Forum Clauses' : 'Münhasır Olmayan Yetki Klozları'}</h3>
              <p className="text-gray-600 text-sm">{isEnglish
                ? 'Consent to jurisdiction in the designated forum without precluding litigation elsewhere. Provide a guaranteed available venue while preserving flexibility. Often preferred in international contracts where enforcement may be needed in multiple jurisdictions.'
                : 'Başka yerlerde dava açmayı engellemeksizin belirlenen mercide yargı yetkisine rıza gösterir. Esnekliği korurken garantili bir merci sağlar. Birden fazla yargı alanında icraya ihtiyaç duyulabilecek uluslararası sözleşmelerde sıklıkla tercih edilir.'}</p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="us-framework" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. US Framework: Federal and State Dimensions' : '4. ABD Çerçevesi: Federal ve Eyalet Boyutları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The US federal system introduces a distinctive layer of complexity. Each of the fifty states maintains its own substantive contract law, and parties must attend to both the choice of governing state law and the selection of a state or federal court as the dispute resolution forum.'
              : 'ABD federal sistemi, kendine özgü bir karmaşıklık katmanı ekler. Elli eyaletin her biri kendi maddi sözleşme hukukunu sürdürür ve tarafların hem uygulanacak eyalet hukukunun seçimine hem de uyuşmazlık çözüm mercii olarak eyalet veya federal mahkeme seçimine dikkat etmesi gerekir.'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { factor: 'Personal Jurisdiction', desc: 'A court must have personal jurisdiction over the defendant. In state courts, "long-arm statutes" define the extent of jurisdictional reach. Federal courts analyze personal jurisdiction under the due process clause of the Fourteenth Amendment.' },
              { factor: 'Subject Matter Jurisdiction', desc: 'Federal courts require either federal question jurisdiction (28 U.S.C. § 1331) or diversity jurisdiction (28 U.S.C. § 1332), which requires complete diversity of citizenship and an amount in controversy exceeding $75,000.' },
              { factor: 'Venue', desc: 'Distinct from jurisdiction, venue determines the specific court location within a jurisdiction. Contractual venue provisions are generally enforceable and may be analyzed under 28 U.S.C. § 1404(a) in federal courts.' },
            ] : [
              { factor: 'Kişi Bakımından Yargı Yetkisi', desc: 'Mahkemenin davalı üzerinde kişi bakımından yargı yetkisi olmalıdır. Eyalet mahkemelerinde "long-arm" statüleri yargı yetkisinin kapsamını belirler. Federal mahkemeler, On Dördüncü Değişiklik\'in hukuki süreç güvencesi kapsamında kişi bakımından yargı yetkisini analiz eder.' },
              { factor: 'Konu Bakımından Yargı Yetkisi', desc: 'Federal mahkemeler ya federal sorun yargı yetkisi (28 U.S.C. § 1331) ya da farklı vatandaşlık yargı yetkisi (28 U.S.C. § 1332) gerektirir; ikincisi tam vatandaşlık farklılığı ve 75.000 doları aşan dava değeri şartı arar.' },
              { factor: 'Yer Bakımından Yetki (Venue)', desc: 'Yargı yetkisinden farklı olarak venue, bir yargı alanı içindeki spesifik mahkeme konumunu belirler. Sözleşmesel venue hükümleri genellikle uygulanabilir olup federal mahkemelerde 28 U.S.C. § 1404(a) kapsamında değerlendirilebilir.' },
            ]).map((item, i) => (
              <div key={i} className="border-l-4 border-[#C9A227] pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.factor}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section id="international" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. International Dimensions' : '5. Uluslararası Boyutlar'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'In international transactions, governing law and jurisdiction acquire particular significance because enforcement depends on the legal frameworks of potentially multiple sovereign states. The principal instruments governing these questions include the Hague Convention on Choice of Court Agreements (2005), the Rome I Regulation (EU), and bilateral or multilateral treaties between states.'
              : 'Uluslararası işlemlerde uygulanacak hukuk ve yargı yetkisi, icranın potansiyel olarak birden fazla egemen devletin hukuki çerçevesine bağlı olması nedeniyle özel bir önem kazanır. Bu soruları düzenleyen başlıca belgeler arasında Lahey Mahkeme Seçimi Sözleşmesi (2005), Roma I Tüzüğü (AB) ve devletler arası ikili veya çok taraflı anlaşmalar yer alır.'}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Turkish Private International Law' : 'Türk Milletlerarası Özel Hukuku'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Turkey\'s Act on Private International Law and Procedural Law (MÖHUK, No. 5718) governs choice-of-law and jurisdictional questions. Article 24 permits contractual choice of law for obligations arising from contracts. Turkish courts retain jurisdiction over disputes with a sufficient connection to Turkey, and mandatory provisions of Turkish law (emredici hükümler) cannot be derogated from by foreign law choices.'
                : 'Türkiye\'nin Milletlerarası Özel Hukuk ve Usul Hukuku Hakkında Kanun (MÖHUK, No. 5718) hukuk seçimi ve yargı yetkisi sorularını düzenler. Madde 24, sözleşmeden doğan borçlar için sözleşmesel hukuk seçimine izin verir. Türk mahkemeleri, Türkiye ile yeterli bağı olan uyuşmazlıklarda yargı yetkisini muhafaza eder ve Türk hukukunun emredici hükümleri yabancı hukuk seçimleriyle bertaraf edilemez.'}
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-3">{isEnglish ? 'Enforcement of Foreign Judgments' : 'Yabancı Mahkeme Kararlarının Tanınması ve Tenfizi'}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'A governing law and forum selection analysis must account for enforcement. A judgment rendered by a court of competent jurisdiction may be unenforceable in another state if that state does not recognize the originating court\'s authority. In the absence of a multilateral treaty, enforcement of foreign judgments in the United States is governed by state law — typically under the Uniform Foreign-Country Money Judgments Recognition Act or common law principles of comity.'
              : 'Uygulanacak hukuk ve mahkeme seçimi analizi, icra aşamasını da hesaba katmalıdır. Yetkili bir mahkemece verilen karar, ilgili devletin asıl mahkemenin yetkisini tanımadığı durumlarda başka bir devlette icra edilemeyebilir. Çok taraflı bir anlaşmanın yokluğunda, yabancı mahkeme kararlarının ABD\'de tenfizi eyalet hukuku ile — tipik olarak Yeknesak Yabancı Ülke Para Kararları Tanıma Kanunu veya uluslararası nezaket (comity) ilkeleri ile — düzenlenir.'}
          </p>
        </section>

        {/* Section 6 */}
        <section id="arbitration" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. Arbitration as an Alternative Forum' : '6. Alternatif Çözüm Mercii Olarak Tahkim'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Arbitration clauses represent a distinct species of forum selection that removes disputes from the national court system entirely. In international commerce, arbitration is frequently preferred for its procedural neutrality, the enforceability of awards under the New York Convention (1958), and the ability to select arbitrators with relevant subject-matter expertise.'
              : 'Tahkim klozları, uyuşmazlıkları ulusal mahkeme sisteminden tamamen çıkaran kendine özgü bir mahkeme seçimi türüdür. Uluslararası ticarette tahkim, usuli tarafsızlığı, kararların New York Sözleşmesi (1958) kapsamında tenfiz edilebilirliği ve ilgili konu uzmanlığına sahip hakemlerin seçilebilmesi nedeniyle sıklıkla tercih edilir.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The Federal Arbitration Act (9 U.S.C. § 1 et seq.) establishes a strong federal policy favoring arbitration in the United States. Turkish law similarly recognizes arbitration under the International Arbitration Law (No. 4686) for international disputes and the Code of Civil Procedure (HMK) for domestic arbitration.'
              : 'Federal Tahkim Kanunu (9 U.S.C. § 1 vd.) ABD\'de tahkimi destekleyen güçlü bir federal politika oluşturur. Türk hukuku da benzer şekilde uluslararası uyuşmazlıklar için Milletlerarası Tahkim Kanunu (No. 4686) ve iç tahkim için Hukuk Muhakemeleri Kanunu (HMK) kapsamında tahkimi tanır.'}
          </p>
        </section>

        {/* Section 7 */}
        <section id="practical" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '7. Practical Implications for Drafting' : '7. Sözleşme Kaleme Alımında Pratik Sonuçlar'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'The selection of governing law and forum has consequences that extend well beyond the dispute resolution clause itself. Practitioners drafting multi-jurisdictional agreements should attend to the following considerations:'
              : 'Uygulanacak hukuk ve merci seçimi, uyuşmazlık çözüm klozunun çok ötesine uzanan sonuçlar doğurur. Çok yargı alanlı sözleşmeler kaleme alan uygulayıcılar aşağıdaki hususlara dikkat etmelidir:'}
          </p>

          <div className="space-y-3">
            {(isEnglish ? [
              { point: 'Align governing law with the jurisdiction of the forum court.', detail: 'A court applying foreign law must engage in complex proof procedures. Alignment reduces interpretive risk and litigation cost.' },
              { point: 'Specify whether forum selection is exclusive or non-exclusive.', detail: 'Ambiguity may result in parallel proceedings in multiple jurisdictions, increasing cost and creating the risk of inconsistent judgments.' },
              { point: 'Consider enforceability of judgments at the outset.', detail: 'Where the opposing party\'s assets are located in a jurisdiction that may not recognize the chosen forum\'s judgments, arbitration may be preferable.' },
              { point: 'Account for mandatory rules that cannot be derogated.', detail: 'Consumer protection, employment, and competition statutes in the parties\' home jurisdictions may override choice-of-law provisions.' },
              { point: 'Include the full scope of the governing law clause.', detail: 'Specify whether the clause encompasses formation, interpretation, performance, breach, and remedies — or only certain aspects of the contractual relationship.' },
            ] : [
              { point: 'Uygulanacak hukuku forum mahkemesinin yargı alanıyla uyumlu tutun.', detail: 'Yabancı hukuku uygulayan mahkeme, karmaşık ispat prosedürleri yürütmek zorundadır. Uyum, yorum riskini ve dava maliyetini azaltır.' },
              { point: 'Mahkeme seçiminin münhasır mı yoksa münhasır olmayan mı olduğunu belirtin.', detail: 'Belirsizlik, birden fazla yargı alanında paralel davalara yol açabilir; bu da maliyeti artırır ve çelişkili kararlar riski yaratır.' },
              { point: 'Kararların icra edilebilirliğini en başından değerlendirin.', detail: 'Karşı tarafın varlıklarının, seçilen merciin kararlarını tanımayabilecek bir yargı alanında bulunması halinde tahkim tercih edilebilir.' },
              { point: 'Bertaraf edilemeyecek emredici kuralları hesaba katın.', detail: 'Tarafların kendi yargı alanlarındaki tüketici koruma, iş hukuku ve rekabet mevzuatı, hukuk seçimi hükümlerini geçersiz kılabilir.' },
              { point: 'Uygulanacak hukuk klozunun tam kapsamını belirtin.', detail: 'Klozun kuruluş, yorum, ifa, ihlal ve yaptırımları kapsayıp kapsamadığını veya sözleşme ilişkisinin yalnızca belirli yönlerini düzenlediğini belirleyin.' },
            ]).map((item, i) => (
              <div key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3 mt-0.5 font-bold">{i + 1}.</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.point}</p>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
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
            <Link href={`/${lang}/encyclopedia/concepts/common-law-vs-civil-law`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Common Law vs Civil Law' : 'Common Law ve Medeni Hukuk Karşılaştırması'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/amerika/ny-law-neden-tercih-edilir`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Why New York Law Is Frequently Chosen' : 'New York Hukuku Neden Sıklıkla Tercih Edilir?'} →
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
