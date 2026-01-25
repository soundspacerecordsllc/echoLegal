import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  return {
    title: isEnglish 
      ? 'What is an NDA? Non-Disclosure Agreement Explained | EchoLegal'
      : 'NDA Nedir? Gizlilik Sözleşmesi Rehberi | EchoLegal',
    description: isEnglish
      ? 'Learn what an NDA (Non-Disclosure Agreement) is, when you need one, key clauses to include, and download a free template.'
      : 'NDA (Gizlilik Sözleşmesi) nedir, ne zaman gereklidir, hangi maddeler bulunmalı ve ücretsiz şablon indirin.',
  }
}

export default async function WhatIsNDAPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
            <Link href={`/${lang}/encyclopedia`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/encyclopedia/what-is-nda`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <Link href={`/${lang}/encyclopedia`} className="hover:text-black">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'What is an NDA?' : 'NDA Nedir?'}</span>
        </nav>

        {/* Article Header */}
        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish ? 'What is an NDA?' : 'NDA Nedir?'}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {isEnglish 
              ? 'Everything you need to know about Non-Disclosure Agreements: when to use them, what to include, and common mistakes to avoid.'
              : 'Gizlilik Sözleşmeleri hakkında bilmeniz gereken her şey: ne zaman kullanılır, neler içermeli ve kaçınılması gereken hatalar.'}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-12">
            <span>📅 {isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</span>
            <span>•</span>
            <span>⏱️ {isEnglish ? '8 min read' : '8 dk okuma'}</span>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
            <ul className="space-y-2">
              <li><a href="#definition" className="text-[#C9A227] hover:underline">{isEnglish ? '1. What is an NDA?' : '1. NDA Nedir?'}</a></li>
              <li><a href="#types" className="text-[#C9A227] hover:underline">{isEnglish ? '2. Types of NDAs' : '2. NDA Türleri'}</a></li>
              <li><a href="#when-needed" className="text-[#C9A227] hover:underline">{isEnglish ? '3. When Do You Need an NDA?' : '3. Ne Zaman NDA Gerekir?'}</a></li>
              <li><a href="#key-clauses" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Key Clauses in an NDA' : '4. NDA\'daki Temel Maddeler'}</a></li>
              <li><a href="#mistakes" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Common Mistakes to Avoid' : '5. Kaçınılması Gereken Hatalar'}</a></li>
              <li><a href="#template" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Get Your NDA Template' : '6. NDA Şablonunu İndirin'}</a></li>
            </ul>
          </div>

          {/* Section 1: Definition */}
          <section id="definition" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. What is an NDA?' : '1. NDA Nedir?'}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish 
                ? 'A Non-Disclosure Agreement (NDA), also known as a confidentiality agreement, is a legally binding contract that establishes a confidential relationship between parties. The party or parties signing the agreement agree that sensitive information they may obtain will not be made available to others.'
                : 'Gizlilik Sözleşmesi (NDA), gizli bir ilişki kuran yasal olarak bağlayıcı bir sözleşmedir. Sözleşmeyi imzalayan taraf veya taraflar, elde edebilecekleri hassas bilgilerin başkalarına açıklanmayacağını kabul eder.'}
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish 
                ? 'NDAs are commonly used in business settings to protect trade secrets, business strategies, client lists, proprietary technology, and other confidential information that gives a company its competitive edge.'
                : 'NDA\'lar genellikle iş ortamlarında ticari sırları, iş stratejilerini, müşteri listelerini, tescilli teknolojiyi ve şirkete rekabet avantajı sağlayan diğer gizli bilgileri korumak için kullanılır.'}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-900">{isEnglish ? '💡 Key Point' : '💡 Önemli Nokta'}</p>
              <p className="text-blue-800">
                {isEnglish 
                  ? 'An NDA creates legal consequences for breaching confidentiality. If someone violates the agreement, you can sue for damages and potentially get an injunction to stop further disclosure.'
                  : 'NDA, gizliliğin ihlali için yasal sonuçlar doğurur. Birisi sözleşmeyi ihlal ederse, tazminat davası açabilir ve daha fazla ifşayı durdurmak için ihtiyati tedbir alabilirsiniz.'}
              </p>
            </div>
          </section>

          {/* Section 2: Types */}
          <section id="types" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. Types of NDAs' : '2. NDA Türleri'}</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{isEnglish ? 'Unilateral (One-Way) NDA' : 'Tek Taraflı NDA'}</h3>
                <p className="text-gray-600">
                  {isEnglish 
                    ? 'Only one party discloses confidential information, and the other party agrees to protect it. Common in employer-employee relationships or when sharing business plans with potential investors.'
                    : 'Yalnızca bir taraf gizli bilgileri açıklar ve diğer taraf bunu korumayı kabul eder. İşveren-çalışan ilişkilerinde veya potansiyel yatırımcılarla iş planlarını paylaşırken yaygındır.'}
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{isEnglish ? 'Mutual (Two-Way) NDA' : 'Karşılıklı (İki Taraflı) NDA'}</h3>
                <p className="text-gray-600">
                  {isEnglish 
                    ? 'Both parties share confidential information and agree to protect each other\'s secrets. Common in joint ventures, partnerships, mergers, or any situation where both sides need to share sensitive data.'
                    : 'Her iki taraf da gizli bilgileri paylaşır ve birbirlerinin sırlarını korumayı kabul eder. Ortak girişimlerde, ortaklıklarda, birleşmelerde veya her iki tarafın hassas verileri paylaşması gereken durumlarda yaygındır.'}
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{isEnglish ? 'Multilateral NDA' : 'Çok Taraflı NDA'}</h3>
                <p className="text-gray-600">
                  {isEnglish 
                    ? 'Three or more parties are involved, where at least one party discloses information. This eliminates the need for separate bilateral NDAs between each party.'
                    : 'Üç veya daha fazla taraf dahildir ve en az bir taraf bilgi açıklar. Bu, her taraf arasında ayrı ikili NDA\'lara olan ihtiyacı ortadan kaldırır.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: When Needed */}
          <section id="when-needed" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. When Do You Need an NDA?' : '3. Ne Zaman NDA Gerekir?'}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish 
                ? 'You should consider using an NDA whenever you need to share sensitive information with another party. Here are common scenarios:'
                : 'Hassas bilgileri başka bir tarafla paylaşmanız gerektiğinde NDA kullanmayı düşünmelisiniz. İşte yaygın senaryolar:'}
            </p>
            <ul className="space-y-3">
              {(isEnglish ? [
                'Hiring employees or contractors who will access sensitive data',
                'Pitching your business idea to potential investors',
                'Discussing a potential partnership or joint venture',
                'Engaging in merger and acquisition negotiations',
                'Sharing trade secrets with manufacturers or suppliers',
                'Working with consultants or advisors',
                'Licensing your technology or intellectual property'
              ] : [
                'Hassas verilere erişecek çalışanları veya yüklenicileri işe alırken',
                'İş fikrinizi potansiyel yatırımcılara sunarken',
                'Potansiyel bir ortaklık veya ortak girişimi tartışırken',
                'Birleşme ve satın alma müzakerelerinde',
                'Üreticiler veya tedarikçilerle ticari sırları paylaşırken',
                'Danışmanlar veya müşavirlerle çalışırken',
                'Teknolojinizi veya fikri mülkiyetinizi lisanslarken'
              ]).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#C9A227] mr-3">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Key Clauses */}
          <section id="key-clauses" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Key Clauses in an NDA' : '4. NDA\'daki Temel Maddeler'}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {isEnglish 
                ? 'A well-drafted NDA should include these essential elements:'
                : 'İyi hazırlanmış bir NDA şu temel unsurları içermelidir:'}
            </p>
            
            <div className="space-y-6">
              {(isEnglish ? [
                { title: 'Definition of Confidential Information', desc: 'Clearly specify what information is considered confidential. Be specific but comprehensive enough to cover all sensitive data.' },
                { title: 'Obligations of Receiving Party', desc: 'Detail how the receiving party must handle, store, and protect the confidential information.' },
                { title: 'Exclusions from Confidentiality', desc: 'List information that is NOT considered confidential (publicly available info, independently developed info, etc.).' },
                { title: 'Time Period', desc: 'Specify how long the confidentiality obligations last. This can range from 2-5 years or indefinitely for trade secrets.' },
                { title: 'Return or Destruction of Information', desc: 'Require the receiving party to return or destroy all confidential materials when the relationship ends.' },
                { title: 'Consequences of Breach', desc: 'Outline remedies available if the agreement is violated, including monetary damages and injunctive relief.' }
              ] : [
                { title: 'Gizli Bilgi Tanımı', desc: 'Hangi bilgilerin gizli kabul edildiğini açıkça belirtin. Spesifik olun ama tüm hassas verileri kapsayacak kadar kapsamlı olun.' },
                { title: 'Alıcı Tarafın Yükümlülükleri', desc: 'Alıcı tarafın gizli bilgileri nasıl işlemesi, saklaması ve koruması gerektiğini detaylandırın.' },
                { title: 'Gizlilik Dışı Bilgiler', desc: 'Gizli SAYILMAYAN bilgileri listeleyin (kamuya açık bilgiler, bağımsız geliştirilen bilgiler vb.).' },
                { title: 'Süre', desc: 'Gizlilik yükümlülüklerinin ne kadar süreceğini belirtin. Bu 2-5 yıl veya ticari sırlar için süresiz olabilir.' },
                { title: 'Bilgilerin İadesi veya İmhası', desc: 'İlişki sona erdiğinde alıcı tarafın tüm gizli materyalleri iade etmesini veya imha etmesini isteyin.' },
                { title: 'İhlal Sonuçları', desc: 'Sözleşme ihlal edilirse mevcut çözümleri belirtin; parasal tazminat ve ihtiyati tedbir dahil.' }
              ]).map((clause, i) => (
                <div key={i} className="border-l-4 border-[#C9A227] pl-4">
                  <h3 className="text-lg font-semibold mb-1">{clause.title}</h3>
                  <p className="text-gray-600">{clause.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Mistakes */}
          <section id="mistakes" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Common Mistakes to Avoid' : '5. Kaçınılması Gereken Hatalar'}</h2>
            
            <div className="space-y-4">
              {(isEnglish ? [
                { mistake: 'Being too vague', fix: 'Clearly define what constitutes confidential information. Vague definitions may not hold up in court.' },
                { mistake: 'Making it too broad', fix: 'An overly broad NDA might be deemed unenforceable. Be reasonable in scope.' },
                { mistake: 'Forgetting exclusions', fix: 'Always include standard exclusions for publicly known information and independently developed materials.' },
                { mistake: 'No time limit', fix: 'Specify a reasonable duration. Indefinite NDAs may be challenged unless protecting true trade secrets.' },
                { mistake: 'Not specifying jurisdiction', fix: 'Always include which state/country\'s laws govern the agreement and where disputes will be resolved.' }
              ] : [
                { mistake: 'Çok belirsiz olmak', fix: 'Gizli bilgilerin ne olduğunu açıkça tanımlayın. Belirsiz tanımlar mahkemede geçerli olmayabilir.' },
                { mistake: 'Çok geniş kapsamlı olmak', fix: 'Aşırı geniş bir NDA uygulanamaz kabul edilebilir. Kapsamda makul olun.' },
                { mistake: 'İstisnaları unutmak', fix: 'Kamuya açık bilgiler ve bağımsız geliştirilen materyaller için standart istisnaları her zaman ekleyin.' },
                { mistake: 'Süre belirtmemek', fix: 'Makul bir süre belirtin. Süresiz NDA\'lar, gerçek ticari sırları korumadıkça itiraz edilebilir.' },
                { mistake: 'Yargı yetkisi belirtmemek', fix: 'Hangi eyalet/ülke yasalarının geçerli olduğunu ve uyuşmazlıkların nerede çözüleceğini her zaman belirtin.' }
              ]).map((item, i) => (
                <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-800">❌ {item.mistake}</p>
                  <p className="text-red-700 mt-1">✅ {item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Template CTA */}
          <section id="template" className="mb-12">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">{isEnglish ? 'Get Your NDA Template' : 'NDA Şablonunuzu Alın'}</h2>
              <p className="text-gray-300 mb-6">
                {isEnglish 
                  ? 'Download our professionally drafted NDA template. Available in English and Turkish. I support EchoLegal – $20 recommended. Download for free..'
                  : 'Profesyonelce hazırlanmış NDA şablonumuzu indirin. İngilizce ve Türkçe olarak mevcuttur. Ödeyebildiğiniz kadar ödeyin – $20 önerilir, ücretsiz seçenek mevcuttur.'}
              </p>
              <Link 
                href={`/${lang}/contracts/nda`}
                className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] transition-colors"
              >
                {isEnglish ? 'Download NDA Template →' : 'NDA Şablonunu İndir →'}
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}</h2>
            
            <div className="space-y-4">
              {(isEnglish ? [
                { q: 'Is an NDA legally binding?', a: 'Yes, when properly drafted and signed, an NDA is a legally enforceable contract. Breach of an NDA can result in lawsuits for damages and injunctive relief.' },
                { q: 'Can I write my own NDA?', a: 'Yes, but it\'s recommended to use a professionally drafted template or consult with an attorney to ensure it\'s enforceable and covers all necessary elements.' },
                { q: 'How long should an NDA last?', a: 'Typically 2-5 years for general business information. Trade secrets may be protected indefinitely. The duration should be reasonable for the type of information being protected.' },
                { q: 'What happens if someone breaks an NDA?', a: 'You can sue for damages (monetary compensation for losses) and seek an injunction (court order to stop further disclosure). The specific remedies depend on the terms of your NDA.' }
              ] : [
                { q: 'NDA yasal olarak bağlayıcı mı?', a: 'Evet, düzgün hazırlanıp imzalandığında NDA yasal olarak uygulanabilir bir sözleşmedir. NDA ihlali tazminat davaları ve ihtiyati tedbir ile sonuçlanabilir.' },
                { q: 'Kendi NDA\'mı yazabilir miyim?', a: 'Evet, ancak uygulanabilir olduğundan ve tüm gerekli unsurları kapsadığından emin olmak için profesyonelce hazırlanmış bir şablon kullanmanız veya bir avukata danışmanız önerilir.' },
                { q: 'NDA ne kadar sürmeli?', a: 'Genel iş bilgileri için genellikle 2-5 yıl. Ticari sırlar süresiz olarak korunabilir. Süre, korunan bilgi türü için makul olmalıdır.' },
                { q: 'Birisi NDA\'yı ihlal ederse ne olur?', a: 'Tazminat davası açabilir (kayıplar için parasal tazminat) ve ihtiyati tedbir (daha fazla ifşayı durdurmak için mahkeme kararı) talep edebilirsiniz.' }
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
              <Link href={`/${lang}/contracts/nda`} className="text-[#C9A227] hover:underline">
                {isEnglish ? 'NDA Template (Download)' : 'NDA Şablonu (İndir)'} →
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

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {isEnglish 
              ? 'LEGAL DISCLAIMER: This article is for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction. Consult a licensed attorney for advice specific to your situation. Prepared under the supervision of a New York licensed attorney (NY Bar #5552336).'
              : 'HUKUKI SORUMLULUK REDDİ: Bu makale yalnızca eğitim amaçlıdır ve hukuki tavsiye teşkil etmez. Yasalar yargı yetkisine göre değişir. Durumunuza özel tavsiye için lisanslı bir avukata danışın. New York lisanslı avukat gözetiminde hazırlanmıştır (NY Bar #5552336).'}
          </p>
          <p className="text-xs text-gray-400 mt-4">© 2025 EchoLegal.</p>
        </div>
      </footer>
    </div>
  )
}
