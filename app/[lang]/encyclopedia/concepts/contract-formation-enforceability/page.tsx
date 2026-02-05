import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  return {
    title: isEnglish
      ? 'Contract Formation & Enforceability | Legal Encyclopedia | EchoLegal'
      : 'Sözleşme Kurulumu ve Uygulanabilirlik | Hukuk Ansiklopedisi | EchoLegal',
    description: isEnglish
      ? 'Elements required for valid contract formation under common law and civil law systems. Offer, acceptance, consideration, capacity, legality, and enforceability doctrines.'
      : 'Common law ve medeni hukuk sistemlerinde geçerli sözleşme kurulumu için gereken unsurlar. İcap, kabul, ivaz, ehliyet, hukuka uygunluk ve uygulanabilirlik doktrinleri.',
  }
}

export default async function ContractFormationPage({
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
        <span className="text-black font-medium">{isEnglish ? 'Contract Formation & Enforceability' : 'Sözleşme Kurulumu ve Uygulanabilirlik'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-[#C9A227] uppercase tracking-widest mb-2">
            {isEnglish ? 'Core Concept' : 'Temel Kavram'}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Contract Formation & Enforceability' : 'Sözleşme Kurulumu ve Uygulanabilirlik'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'The legal requirements for creating a binding agreement and the doctrines that determine whether a court will enforce it.'
              : 'Bağlayıcı bir anlaşma oluşturmanın hukuki gereklilikleri ve mahkemenin sözleşmeyi uygulayıp uygulamayacağını belirleyen doktrinler.'}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
            <span>{isEnglish ? 'Last Updated: February 2026' : 'Son Güncelleme: Şubat 2026'}</span>
            <span>•</span>
            <span>{isEnglish ? '14 min read' : '14 dk okuma'}</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
          <ul className="space-y-2">
            <li><a href="#formation-elements" className="text-[#C9A227] hover:underline">{isEnglish ? '1. Elements of Contract Formation' : '1. Sözleşme Kurulumunun Unsurları'}</a></li>
            <li><a href="#offer-acceptance" className="text-[#C9A227] hover:underline">{isEnglish ? '2. Offer and Acceptance' : '2. İcap ve Kabul'}</a></li>
            <li><a href="#consideration" className="text-[#C9A227] hover:underline">{isEnglish ? '3. Consideration and Its Equivalents' : '3. İvaz ve Medeni Hukuktaki Karşılıkları'}</a></li>
            <li><a href="#capacity-legality" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Capacity and Legality' : '4. Ehliyet ve Hukuka Uygunluk'}</a></li>
            <li><a href="#defenses" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Defenses to Enforceability' : '5. Uygulanabilirliğe Karşı Savunmalar'}</a></li>
            <li><a href="#statute-of-frauds" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Statute of Frauds' : '6. Yazılı Şekil Şartı (Statute of Frauds)'}</a></li>
            <li><a href="#comparative" className="text-[#C9A227] hover:underline">{isEnglish ? '7. Comparative Framework: Common Law and Civil Law' : '7. Karşılaştırmalı Çerçeve: Common Law ve Medeni Hukuk'}</a></li>
            <li><a href="#remedies" className="text-[#C9A227] hover:underline">{isEnglish ? '8. Remedies for Breach' : '8. Sözleşme İhlali Halinde Hukuki Yaptırımlar'}</a></li>
          </ul>
        </div>

        {/* Section 1 */}
        <section id="formation-elements" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. Elements of Contract Formation' : '1. Sözleşme Kurulumunun Unsurları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'In legal doctrine, a contract is a legally enforceable promise or set of promises. For a contract to be valid and binding, specific elements must be present at the time of formation. The absence of any essential element renders the purported agreement void or voidable.'
              : 'Hukuk doktrininde sözleşme, hukuken uygulanabilir bir taahhüt veya taahhütler bütünüdür. Bir sözleşmenin geçerli ve bağlayıcı olabilmesi için kurulma anında belirli unsurların mevcut olması gerekir. Herhangi bir esaslı unsurun yokluğu, sözde anlaşmayı hükümsüz veya iptal edilebilir kılar.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'In most common law jurisdictions, six elements are generally required: (1) offer, (2) acceptance, (3) consideration, (4) mutual assent, (5) capacity, and (6) legality of purpose. Civil law systems, including Turkish law under the Turkish Code of Obligations (Türk Borçlar Kanunu), employ a functionally analogous framework, though the doctrinal terminology and structural emphasis differ.'
              : 'Çoğu common law yargı alanında genellikle altı unsur aranır: (1) icap, (2) kabul, (3) ivaz, (4) karşılıklı irade uyumu, (5) ehliyet ve (6) konunun hukuka uygunluğu. Türk Borçlar Kanunu kapsamındaki Türk hukuku dahil medeni hukuk sistemleri, doktrinsel terminoloji ve yapısal vurgu farklılık gösterse de işlevsel olarak benzer bir çerçeve uygular.'}
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4">{isEnglish ? 'Essential Elements at a Glance' : 'Esaslı Unsurlar — Özet'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {(isEnglish ? [
                { element: 'Offer', desc: 'A definite proposal communicated to the offeree with intent to be bound upon acceptance.' },
                { element: 'Acceptance', desc: 'An unequivocal manifestation of assent to the terms of the offer.' },
                { element: 'Consideration', desc: 'A bargained-for exchange of value — a legal detriment or benefit.' },
                { element: 'Mutual Assent', desc: 'A meeting of the minds as to the material terms of the agreement.' },
                { element: 'Capacity', desc: 'Legal competence of the parties to enter into a binding agreement.' },
                { element: 'Legality', desc: 'The subject matter and purpose must not violate law or public policy.' },
              ] : [
                { element: 'İcap', desc: 'Kabul halinde bağlanma niyetiyle muhatabına iletilen belirli bir öneri.' },
                { element: 'Kabul', desc: 'İcabın şartlarına koşulsuz ve açık bir onay beyanı.' },
                { element: 'İvaz (Karşılık)', desc: 'Pazarlık yoluyla belirlenen değer değişimi — hukuki bir külfet veya menfaat.' },
                { element: 'Karşılıklı İrade Uyumu', desc: 'Sözleşmenin esaslı şartları üzerinde tarafların iradelerinin örtüşmesi.' },
                { element: 'Ehliyet', desc: 'Tarafların bağlayıcı bir sözleşme akdetme konusundaki hukuki yetkinliği.' },
                { element: 'Hukuka Uygunluk', desc: 'Sözleşmenin konusu ve amacı hukuka veya kamu düzenine aykırı olmamalıdır.' },
              ]).map((item, i) => (
                <div key={i} className="border-l-4 border-[#C9A227] pl-3">
                  <p className="font-semibold text-gray-900">{item.element}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="offer-acceptance" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. Offer and Acceptance' : '2. İcap ve Kabul'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The formation of a contract begins with an offer — a manifestation of willingness to enter into a bargain, made so as to justify the offeree in understanding that assent to the bargain is invited and will conclude it. An offer must be sufficiently definite in its material terms (parties, subject matter, price, and time of performance) and must be communicated to the offeree.'
              : 'Sözleşmenin kurulması icap ile başlar — muhatabın, pazarlığa onay verilmesinin istendiğini ve verilmesi halinde sözleşmenin kurulacağını anlamasını haklı kılacak şekilde yapılan, pazarlığa girme iradesinin beyanıdır. İcabın esaslı şartları (taraflar, konu, bedel ve ifa zamanı) yeterince belirli olmalı ve muhataba iletilmelidir.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Acceptance must mirror the terms of the offer without material alteration. In common law jurisdictions, this is governed by the "mirror image rule": any modification of terms constitutes a counteroffer rather than an acceptance. Under Article 2 of the Uniform Commercial Code (UCC), applicable to the sale of goods, additional or different terms in the acceptance may become part of the contract between merchants.'
              : 'Kabul, icabın şartlarını esaslı bir değişiklik yapmaksızın yansıtmalıdır. Common law yargı alanlarında bu, "aynadaki görüntü kuralı" (mirror image rule) ile düzenlenir: şartlarda yapılan herhangi bir değişiklik, kabul yerine karşı icap oluşturur. Mal satışına uygulanan Yeknesak Ticaret Kanunu (UCC) Madde 2 kapsamında ise, tacirler arasındaki kabuldeki ek veya farklı şartlar sözleşmenin parçası haline gelebilir.'}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Doctrinal Distinction' : 'Doktrinsel Ayrım'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'In Turkish law, acceptance must be unconditional; a response that modifies or adds to the terms of the offer constitutes a new offer (TBK Art. 5). However, unlike the common law mirror image rule, Turkish doctrine emphasizes the subjective intent of the parties alongside the objective declaration.'
                : 'Türk hukukunda kabul koşulsuz olmalıdır; icabın şartlarını değiştiren veya ek şart içeren yanıt yeni bir icap teşkil eder (TBK m. 5). Ancak common law\'daki aynadaki görüntü kuralından farklı olarak, Türk doktrini objektif beyanın yanı sıra tarafların sübjektif iradesini de ön plana çıkarır.'}
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-3">{isEnglish ? 'Termination of Offers' : 'İcabın Sona Ermesi'}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'An offer may be terminated by: (a) revocation by the offeror prior to acceptance, (b) rejection or counteroffer by the offeree, (c) lapse of time, (d) death or incapacity of either party, or (e) supervening illegality. Under the doctrine of promissory estoppel, however, an offeror may be precluded from revoking if the offeree has reasonably relied on the offer to their detriment.'
              : 'İcap şu hallerde sona erer: (a) kabul öncesinde icapçının geri alması, (b) muhatabın reddi veya karşı icabı, (c) sürenin geçmesi, (d) taraflardan birinin ölümü veya ehliyetsizliği, (e) sonradan hukuka aykırılığın ortaya çıkması. Ancak "estoppel" doktrini kapsamında, muhatap icaba güvenerek aleyhine hareket etmişse, icapçının geri alması engellenebilir.'}
          </p>
        </section>

        {/* Section 3 */}
        <section id="consideration" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. Consideration and Its Equivalents' : '3. İvaz ve Medeni Hukuktaki Karşılıkları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Consideration is a defining feature of common law contract doctrine. It requires that each party to a contract must provide something of value — a benefit received or a detriment suffered — as the price for the other party\'s promise. A gratuitous promise, lacking consideration, is generally unenforceable at common law unless made under seal or supported by promissory estoppel.'
              : 'İvaz (consideration), common law sözleşme doktrininin ayırt edici bir özelliğidir. Sözleşmenin her tarafının, karşı tarafın taahhüdünün bedeli olarak değerli bir şey sunmasını — alınan bir menfaat veya katlanılan bir külfet — gerektirir. İvazdan yoksun bir karşılıksız taahhüt, mühürlü sözleşme veya promissory estoppel ile desteklenmedikçe common law\'da genellikle uygulanamaz.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Comparative legal analysis distinguishes common law consideration from its functional equivalents in civil law systems. Turkish law does not require consideration as a discrete formation element. Under the Turkish Code of Obligations, the validity of a contract depends on the mutual declarations of intent, and a gratuitous promise may be binding if it meets the requirements for a donation agreement (bağışlama sözleşmesi, TBK Art. 285 et seq.).'
              : 'Karşılaştırmalı hukuk analizi, common law ivaını medeni hukuk sistemlerindeki işlevsel karşılıklarından ayırır. Türk hukuku, ivaı ayrı bir kuruluş unsuru olarak aramaz. Türk Borçlar Kanunu kapsamında sözleşmenin geçerliliği karşılıklı irade beyanlarına bağlıdır ve karşılıksız bir taahhüt, bağışlama sözleşmesi şartlarını karşılaması halinde bağlayıcı olabilir (TBK m. 285 vd.).'}
          </p>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Doctrine' : 'Doktrin'}</th>
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Common Law' : 'Common Law'}</th>
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Civil Law (Turkey)' : 'Medeni Hukuk (Türkiye)'}</th>
                </tr>
              </thead>
              <tbody>
                {(isEnglish ? [
                  { doctrine: 'Consideration required?', cl: 'Yes — bargained-for exchange', civil: 'No — mutual intent suffices' },
                  { doctrine: 'Gratuitous promises', cl: 'Generally unenforceable', civil: 'May be binding as donation' },
                  { doctrine: 'Pre-existing duty', cl: 'No consideration if already obligated', civil: 'Not applicable as doctrine' },
                  { doctrine: 'Nominal consideration', cl: 'Courts may scrutinize adequacy', civil: 'N/A — no consideration requirement' },
                ] : [
                  { doctrine: 'İvaz gerekli mi?', cl: 'Evet — pazarlık yoluyla değişim', civil: 'Hayır — karşılıklı irade yeterli' },
                  { doctrine: 'Karşılıksız taahhüt', cl: 'Genellikle uygulanamaz', civil: 'Bağışlama olarak bağlayıcı olabilir' },
                  { doctrine: 'Mevcut yükümlülük', cl: 'Zaten yükümlüyse ivaz yoktur', civil: 'Doktrin olarak uygulanmaz' },
                  { doctrine: 'Sembolik ivaz', cl: 'Mahkemeler yeterliliğini sorgulayabilir', civil: 'Uygulanmaz — ivaz şartı yok' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border-b border-gray-200 font-medium">{row.doctrine}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-600">{row.cl}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-600">{row.civil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section id="capacity-legality" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Capacity and Legality' : '4. Ehliyet ve Hukuka Uygunluk'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'For a contract to be enforceable, each party must possess the legal capacity to contract. In both common law and civil law traditions, minors, persons adjudicated as mentally incapacitated, and, in certain jurisdictions, intoxicated persons lack full contractual capacity. Contracts entered into by persons lacking capacity are generally voidable — not void — at the option of the incapacitated party.'
              : 'Bir sözleşmenin uygulanabilir olması için her tarafın sözleşme yapma ehliyetine sahip olması gerekir. Hem common law hem de medeni hukuk geleneklerinde küçükler, mahkeme kararıyla ehliyetsiz ilan edilen kişiler ve bazı yargı alanlarında sarhoş kişiler tam sözleşme ehliyetinden yoksundur. Ehliyetsiz kişilerin akdettiği sözleşmeler genellikle hükümsüz değil, ehliyetsiz tarafın tercihine bağlı olarak iptal edilebilirdir.'}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The legality requirement mandates that the subject matter and purpose of the contract must not contravene statutory law, common law principles, or public policy. A contract to perform an illegal act is void ab initio and confers no rights on either party. Courts will not assist in the enforcement of agreements that violate fundamental legal norms.'
              : 'Hukuka uygunluk şartı, sözleşmenin konusunun ve amacının kanun hükümlerine, hukuk ilkelerine veya kamu düzenine aykırı olmamasını gerektirir. Hukuka aykırı bir edimi konu alan sözleşme başından itibaren (ab initio) hükümsüzdür ve tarafların hiçbirine hak tanımaz. Mahkemeler, temel hukuk normlarını ihlal eden anlaşmaların uygulanmasına yardımcı olmaz.'}
          </p>
        </section>

        {/* Section 5 */}
        <section id="defenses" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Defenses to Enforceability' : '5. Uygulanabilirliğe Karşı Savunmalar'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'Even where the formal elements of contract formation are satisfied, a contract may be rendered unenforceable if certain defenses are established. These doctrines protect the integrity of contractual consent and ensure that enforcement serves legitimate expectations.'
              : 'Sözleşme kurulumunun biçimsel unsurları sağlanmış olsa bile, belirli savunmaların ileri sürülmesi halinde sözleşme uygulanamaz hale gelebilir. Bu doktrinler, sözleşmesel rızanın bütünlüğünü korur ve uygulamanın meşru beklentilere hizmet etmesini sağlar.'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { defense: 'Duress', desc: 'A contract obtained through unlawful threats or coercion that deprives a party of free will is voidable. Both physical duress and economic duress may vitiate consent.' },
              { defense: 'Undue Influence', desc: 'Where a party in a position of trust or dominance exerts improper pressure on the other to enter an agreement, the influenced party may seek rescission.' },
              { defense: 'Misrepresentation and Fraud', desc: 'A material misrepresentation of fact — whether innocent, negligent, or fraudulent — that induces a party to enter a contract may render it voidable.' },
              { defense: 'Mistake', desc: 'A mutual mistake as to a basic assumption on which the contract was made may render the contract voidable if the risk was not allocated by the agreement. A unilateral mistake generally does not, unless the non-mistaken party knew or should have known of the error.' },
              { defense: 'Unconscionability', desc: 'A court may refuse to enforce a contract or term that is so one-sided as to be unconscionable at the time it was made. This requires both procedural unconscionability (absence of meaningful choice) and substantive unconscionability (unreasonably favorable terms).' },
            ] : [
              { defense: 'İkrah (Duress)', desc: 'Hukuka aykırı tehdit veya zorlama yoluyla tarafın özgür iradesini ortadan kaldırarak elde edilen sözleşme iptal edilebilir. Hem fiziksel ikrah hem de ekonomik baskı rızayı sakatlayabilir.' },
              { defense: 'Haksız Etki (Undue Influence)', desc: 'Güven veya hâkimiyet konumundaki tarafın, diğer taraf üzerinde sözleşme akdetmesi için uygunsuz baskı uygulaması halinde, etki altındaki taraf fesih talep edebilir.' },
              { defense: 'Aldatma ve Hile', desc: 'Bir tarafı sözleşmeye girmeye yönlendiren esaslı bir maddi olay yanıltması — ister masum, ister ihmal kaynaklı, ister hileli — sözleşmeyi iptal edilebilir kılabilir.' },
              { defense: 'Hata (Mistake)', desc: 'Sözleşmenin dayandığı temel varsayıma ilişkin karşılıklı yanılma, risk sözleşme ile tahsis edilmemişse sözleşmeyi iptal edilebilir kılabilir. Tek taraflı yanılma, karşı tarafın hatayı bildiği veya bilmesi gerektiği durumlar dışında genellikle bunu sağlamaz.' },
              { defense: 'Aşırı Yararlanma (Gabin)', desc: 'Mahkeme, kurulduğu anda aşırı tek taraflı olan bir sözleşmeyi veya şartı uygulamayı reddedebilir. Bu, hem usuli aşırılık (anlamlı seçim yokluğu) hem de esasa ilişkin aşırılık (makul olmayan derecede avantajlı şartlar) gerektirir.' },
            ]).map((item, i) => (
              <div key={i} className="border-l-4 border-gray-300 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.defense}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 */}
        <section id="statute-of-frauds" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. Statute of Frauds' : '6. Yazılı Şekil Şartı (Statute of Frauds)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The Statute of Frauds, originating in English common law (1677), requires that certain categories of contracts be evidenced by a writing signed by the party to be charged. In the absence of a sufficient written memorandum, the contract is unenforceable — though not void. The writing need not be the contract itself; it must merely evidence the essential terms.'
              : 'İngiliz common law\'ından (1677) kaynaklanan Statute of Frauds (Yazılı Şekil Şartı), belirli sözleşme kategorilerinin, yükümlülük altına girecek tarafça imzalanmış yazılı bir belge ile kanıtlanmasını gerektirir. Yeterli yazılı bir belgenin yokluğunda sözleşme hükümsüz değil, uygulanamaz hale gelir. Yazılı belgenin sözleşmenin kendisi olması gerekmez; esaslı şartları kanıtlaması yeterlidir.'}
          </p>

          <h3 className="text-lg font-semibold mb-3">{isEnglish ? 'Categories Typically Requiring a Writing' : 'Genellikle Yazılı Belge Gerektiren Kategoriler'}</h3>
          <div className="space-y-3 mb-6">
            {(isEnglish ? [
              { category: 'Real property transactions', detail: 'Contracts for the sale or transfer of interests in land.' },
              { category: 'Contracts not performable within one year', detail: 'Agreements that by their terms cannot be completed within one year from the date of making.' },
              { category: 'Sale of goods over $500 (UCC § 2-201)', detail: 'Applies to transactions governed by the Uniform Commercial Code.' },
              { category: 'Suretyship agreements', detail: 'Promises to answer for the debt or obligation of another.' },
              { category: 'Contracts in consideration of marriage', detail: 'Prenuptial agreements and similar undertakings.' },
            ] : [
              { category: 'Taşınmaz işlemleri', detail: 'Arazi üzerindeki hakların satışı veya devrine ilişkin sözleşmeler.' },
              { category: 'Bir yıl içinde ifası mümkün olmayan sözleşmeler', detail: 'Şartları gereği yapıldığı tarihten itibaren bir yıl içinde tamamlanamayacak anlaşmalar.' },
              { category: '$500 üzeri mal satışı (UCC § 2-201)', detail: 'Yeknesak Ticaret Kanunu\'na tabi işlemlere uygulanır.' },
              { category: 'Kefalet sözleşmeleri', detail: 'Başkasının borcu veya yükümlülüğü için ödeme taahhüdü.' },
              { category: 'Evlilik edimi karşılığı sözleşmeler', detail: 'Evlilik öncesi sözleşmeler ve benzeri taahhütler.' },
            ]).map((item, i) => (
              <div key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3 mt-0.5 font-bold">{i + 1}.</span>
                <div>
                  <span className="font-semibold text-gray-900">{item.category}</span>
                  <span className="text-gray-600 text-sm ml-1">— {item.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Turkish Law' : 'Türk Hukuku'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Turkish law imposes form requirements more broadly than common law. Certain contracts — including real property sales (TBK Art. 237) and surety agreements (TBK Art. 583) — require notarial form (resmi şekil) for validity. Failure to comply with the prescribed form renders the contract void, not merely unenforceable.'
                : 'Türk hukuku, şekil şartlarını common law\'dan daha geniş kapsamda uygular. Taşınmaz satışları (TBK m. 237) ve kefalet sözleşmeleri (TBK m. 583) dahil belirli sözleşmeler, geçerlilik için resmi şekil (noter onayı) gerektirir. Öngörülen şekle uyulmaması sözleşmeyi uygulanamaz değil, hükümsüz kılar.'}
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section id="comparative" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '7. Comparative Framework: Common Law and Civil Law' : '7. Karşılaştırmalı Çerçeve: Common Law ve Medeni Hukuk'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'Comparative legal analysis distinguishes the contract formation frameworks of common law and civil law along several structural dimensions. While both traditions achieve functionally similar outcomes, the doctrinal mechanisms differ in emphasis, terminology, and procedural application.'
              : 'Karşılaştırmalı hukuk analizi, common law ve medeni hukukun sözleşme kurulum çerçevelerini birkaç yapısal boyutta ayırt eder. Her iki gelenek de işlevsel olarak benzer sonuçlara ulaşsa da, doktrinsel mekanizmalar vurgu, terminoloji ve usul uygulaması bakımından farklılık gösterir.'}
          </p>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Dimension' : 'Boyut'}</th>
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Common Law (US/UK)' : 'Common Law (ABD/BK)'}</th>
                  <th className="p-3 text-left border-b border-gray-200">{isEnglish ? 'Civil Law (Turkey)' : 'Medeni Hukuk (Türkiye)'}</th>
                </tr>
              </thead>
              <tbody>
                {(isEnglish ? [
                  { dim: 'Source of doctrine', cl: 'Judicial precedent (case law)', civil: 'Codified statutes (TBK)' },
                  { dim: 'Consideration', cl: 'Required element', civil: 'Not required' },
                  { dim: 'Form requirements', cl: 'Limited (Statute of Frauds)', civil: 'Broader (resmi şekil for certain categories)' },
                  { dim: 'Good faith', cl: 'Implied in performance (UCC/Restatement)', civil: 'General duty at all stages (TBK Art. 2)' },
                  { dim: 'Interpretation', cl: 'Objective theory of contracts', civil: 'Subjective intent with objective safeguards' },
                  { dim: 'Breach remedies', cl: 'Damages as default; specific performance exceptional', civil: 'Specific performance as default; damages supplementary' },
                ] : [
                  { dim: 'Doktrinin kaynağı', cl: 'Yargısal içtihat (case law)', civil: 'Kodifiye kanunlar (TBK)' },
                  { dim: 'İvaz', cl: 'Gerekli unsur', civil: 'Gerekli değil' },
                  { dim: 'Şekil şartları', cl: 'Sınırlı (Statute of Frauds)', civil: 'Daha geniş (belirli kategoriler için resmi şekil)' },
                  { dim: 'Dürüstlük kuralı', cl: 'İfa aşamasında zımni (UCC/Restatement)', civil: 'Tüm aşamalarda genel yükümlülük (TBK m. 2)' },
                  { dim: 'Yorum', cl: 'Objektif sözleşme teorisi', civil: 'Objektif güvencelerle desteklenen sübjektif irade' },
                  { dim: 'İhlal yaptırımları', cl: 'Varsayılan tazminat; aynen ifa istisnai', civil: 'Varsayılan aynen ifa; tazminat tamamlayıcı' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border-b border-gray-200 font-medium">{row.dim}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-600">{row.cl}</td>
                    <td className="p-3 border-b border-gray-200 text-gray-600">{row.civil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 8 */}
        <section id="remedies" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '8. Remedies for Breach' : '8. Sözleşme İhlali Halinde Hukuki Yaptırımlar'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'When a party breaches a contractual obligation, the non-breaching party is entitled to seek remedies. In common law jurisdictions, the primary remedy is compensatory damages — monetary compensation intended to place the injured party in the position they would have occupied had the contract been performed. Equitable remedies, such as specific performance and injunctive relief, are available where damages would be inadequate.'
              : 'Bir taraf sözleşme yükümlülüğünü ihlal ettiğinde, ihlale uğrayan taraf hukuki yaptırım talep etme hakkına sahiptir. Common law yargı alanlarında birincil yaptırım telafi edici tazminattır — zarara uğrayan tarafı sözleşme ifa edilseydi bulunacağı konuma getirmeyi amaçlayan parasal tazminat. Tazminatın yetersiz kalacağı durumlarda aynen ifa ve ihtiyati tedbir gibi hakkaniyet yaptırımları kullanılabilir.'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { remedy: 'Expectation Damages', desc: 'Compensation for the benefit the injured party expected to receive from performance, including lost profits.' },
              { remedy: 'Reliance Damages', desc: 'Recovery of expenditures made in reasonable reliance on the contract, restoring the injured party to the pre-contractual position.' },
              { remedy: 'Restitution', desc: 'Disgorgement of any benefit conferred on the breaching party, preventing unjust enrichment.' },
              { remedy: 'Specific Performance', desc: 'A court order requiring the breaching party to perform their contractual obligations. Typically reserved for unique subject matter, such as real property.' },
              { remedy: 'Liquidated Damages', desc: 'A pre-agreed sum stipulated in the contract as compensation for breach. Enforceable if the amount is a reasonable estimate of anticipated harm and actual damages would be difficult to calculate.' },
            ] : [
              { remedy: 'Müspet Zarar (Beklenen Menfaat)', desc: 'Zarara uğrayan tarafın ifadan beklediği menfaatin tazmini; yoksun kalınan kâr dahil.' },
              { remedy: 'Menfi Zarar (Güven Zararı)', desc: 'Sözleşmeye makul güvene dayanarak yapılan harcamaların tazmini; tarafı sözleşme öncesi durumuna döndürür.' },
              { remedy: 'Sebepsiz Zenginleşmenin İadesi', desc: 'İhlal eden tarafa sağlanan menfaatin iadesi; haksız zenginleşmenin önlenmesi.' },
              { remedy: 'Aynen İfa', desc: 'İhlal eden tarafın sözleşme yükümlülüklerini ifa etmesini gerektiren mahkeme kararı. Tipik olarak taşınmaz gibi benzersiz konulara ayrılmıştır.' },
              { remedy: 'Cezai Şart (Götürü Tazminat)', desc: 'Sözleşmede ihlal tazminatı olarak önceden kararlaştırılan tutar. Tutarın öngörülen zararın makul bir tahmini olması ve fiili zararın hesaplanmasının güç olması halinde uygulanabilir.' },
            ]).map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.remedy}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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
            <Link href={`/${lang}/encyclopedia/concepts/governing-law-jurisdiction`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Governing Law & Jurisdiction' : 'Uygulanacak Hukuk ve Yargı Yetkisi'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia/concepts/common-law-vs-civil-law`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Common Law vs Civil Law' : 'Common Law ve Medeni Hukuk Karşılaştırması'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia/what-is-nda`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'What is an NDA?' : 'NDA Nedir?'} →
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
