import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Do You Need a Lawyer to Start a US Company? | EchoLegal'
    : 'ABD\'de Şirket Kurmak Yasal Danışmanlık Gerektirir mi? | EchoLegal'

  const description = isEnglish
    ? 'Learn when you need legal help for US company formation and when you can do it yourself. What attorneys actually do and cost analysis.'
    : 'ABD şirket kurulumu için ne zaman hukuki yardıma ihtiyacınız olduğunu ve ne zaman kendiniz yapabileceğinizi öğrenin. Avukatlar gerçekte ne yapar ve maliyet analizi.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-sirket-kurmak-avukat-gerekir-mi`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-sirket-kurmak-avukat-gerekir-mi',
        'tr': 'https://echo-legal.com/tr/abd-sirket-kurmak-avukat-gerekir-mi',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LawyerNecessityPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish ? 'Do You Need a Lawyer to Start a US Company?' : 'ABD\'de Şirket Kurmak Yasal Danışmanlık Gerektirir mi?',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Do You Need a Lawyer?' : 'Avukat Gerekir mi?'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Do You Need a Lawyer to Start a US Company?'
              : 'ABD\'de Şirket Kurmak Yasal Danışmanlık Gerektirir mi?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'An honest assessment of when legal help is necessary, when it\'s optional, and when you can safely DIY.'
              : 'Hukuki yardımın ne zaman gerekli olduğuna, ne zaman isteğe bağlı olduğuna ve ne zaman güvenle kendiniz yapabileceğinize dair dürüst bir değerlendirme.'}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">ZM</div>
              <div>
                <p className="font-medium text-black">Zeynep Ruziye Moore</p>
                <p>{isEnglish ? 'Licensed in New York' : 'New York Lisanslı'}</p>
              </div>
            </div>
            <span>•</span>
            <span>{isEnglish ? 'Updated: January 2026' : 'Güncelleme: Ocak 2026'}</span>
          </div>

          {/* Quick Answer */}
          <div className="bg-[#C9A227]/10 border-2 border-[#C9A227] rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3">{isEnglish ? 'The Honest Answer: It Depends' : 'Dürüst Cevap: Duruma Bağlı'}</h2>
            <p className="text-gray-700">
              {isEnglish
                ? 'For basic LLC formation? No, you can do it yourself. For anything involving contracts, multiple owners, investors, immigration, or significant assets? Yes, professional guidance prevents costly mistakes. The key is knowing which category you\'re in.'
                : 'Temel LLC kurulumu için? Hayır, kendiniz yapabilirsiniz. Sözleşmeler, birden fazla ortak, yatırımcılar, göçmenlik veya önemli varlıkları içeren her şey için? Evet, profesyonel rehberlik maliyetli hatalardan korur. Anahtar, hangi kategoride olduğunuzu bilmektir.'}
            </p>
          </div>

          {/* What You CAN Do Yourself */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What You CAN Do Yourself (Safely)' : 'Kendiniz (Güvenle) Yapabilecekleriniz'}</h2>

            <div className="space-y-4">
              {[
                { task: isEnglish ? 'File Articles of Organization/Incorporation' : 'Kuruluş/Şirket Maddeleri Dosyalama', detail: isEnglish ? 'Standard forms, straightforward process' : 'Standart formlar, basit süreç' },
                { task: isEnglish ? 'Get EIN from IRS' : 'IRS\'den EIN Alma', detail: isEnglish ? 'Form SS-4, no legal expertise needed' : 'SS-4 Formu, hukuki uzmanlık gerekmiyor' },
                { task: isEnglish ? 'Hire a Registered Agent' : 'Kayıtlı Temsilci Kiralama', detail: isEnglish ? 'Simple service purchase' : 'Basit hizmet alımı' },
                { task: isEnglish ? 'Open a Business Bank Account' : 'Ticari Banka Hesabı Açma', detail: isEnglish ? 'Bank process, not legal process' : 'Banka süreci, hukuki süreç değil' },
                { task: isEnglish ? 'File Annual Reports' : 'Yıllık Raporları Dosyalama', detail: isEnglish ? 'Standard state filings' : 'Standart eyalet dosyalamaları' },
                { task: isEnglish ? 'Basic Single-Member LLC Operating Agreement' : 'Temel Tek Üyeli LLC Operating Agreement', detail: isEnglish ? 'Simple templates work for straightforward situations' : 'Basit durumlar için basit şablonlar işe yarar' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-600 text-2xl">✓</span>
                  <div>
                    <p className="font-semibold text-green-900">{item.task}</p>
                    <p className="text-green-800 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* When You SHOULD Get Legal Help */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When You SHOULD Get Legal Help' : 'Hukuki Yardım Almanız GEREKEN Durumlar'}</h2>

            <div className="space-y-4">
              {[
                { situation: isEnglish ? 'Multiple Owners/Partners' : 'Birden Fazla Ortak/Ortak', reason: isEnglish ? 'Operating Agreement needs to address profit splits, decision-making, exit scenarios, death/disability - get it wrong and you\'ll have expensive disputes' : 'Operating Agreement kar paylaşımı, karar verme, çıkış senaryoları, ölüm/sakatlık ele almalı - yanlış yaparsanız pahalı anlaşmazlıklar olur' },
                { situation: isEnglish ? 'Taking Investment' : 'Yatırım Alma', reason: isEnglish ? 'Investor agreements, cap tables, securities law compliance, preferred shares - mistakes here can invalidate your funding or create legal liability' : 'Yatırımcı anlaşmaları, hisse tabloları, menkul kıymetler yasası uyumluluğu, imtiyazlı hisseler - buradaki hatalar finansmanınızı geçersiz kılabilir veya yasal sorumluluk oluşturabilir' },
                { situation: isEnglish ? 'E-2 or Other Visa Goals' : 'E-2 veya Diğer Vize Hedefleri', reason: isEnglish ? 'Company structure affects visa eligibility - wrong setup means visa denial' : 'Şirket yapısı vize uygunluğunu etkiler - yanlış kurulum vize reddi demektir' },
                { situation: isEnglish ? 'Intellectual Property' : 'Fikri Mülkiyet', reason: isEnglish ? 'Patents, trademarks, licensing agreements, IP assignment to company' : 'Patentler, ticari markalar, lisans anlaşmaları, şirkete fikri mülkiyet devri' },
                { situation: isEnglish ? 'Client/Customer Contracts' : 'Müşteri/Müşteri Sözleşmeleri', reason: isEnglish ? 'Service agreements, Terms of Service, liability protection' : 'Hizmet sözleşmeleri, Hizmet Şartları, sorumluluk koruması' },
                { situation: isEnglish ? 'Employees/Contractors' : 'Çalışanlar/Yükleniciler', reason: isEnglish ? 'Employment agreements, independent contractor agreements, misclassification risks' : 'İş sözleşmeleri, bağımsız yüklenici sözleşmeleri, yanlış sınıflandırma riskleri' },
                { situation: isEnglish ? 'Regulated Industries' : 'Düzenlenen Sektörler', reason: isEnglish ? 'Healthcare, finance, insurance, cannabis, alcohol - special compliance requirements' : 'Sağlık, finans, sigorta, esrar, alkol - özel uyumluluk gereksinimleri' },
                { situation: isEnglish ? 'Real Estate Acquisition' : 'Gayrimenkul Edinimi', reason: isEnglish ? 'LLC structuring for property, operating agreements for real estate ventures' : 'Mülk için LLC yapılandırma, gayrimenkul girişimleri için operating agreement' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <span className="text-yellow-600 text-2xl">⚠</span>
                  <div>
                    <p className="font-semibold text-yellow-900">{item.situation}</p>
                    <p className="text-yellow-800 text-sm">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What Lawyers Actually Do */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What Business Lawyers Actually Do' : 'İş Avukatları Gerçekte Ne Yapar'}</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {(isEnglish ? [
                { service: 'Entity Selection Advice', description: 'LLC vs Corp, state selection, tax implications' },
                { service: 'Operating Agreements', description: 'Custom documents for your specific situation' },
                { service: 'Contract Drafting/Review', description: 'Client contracts, vendor agreements, TOS' },
                { service: 'Investor Documents', description: 'SAFE notes, convertible notes, stock purchase agreements' },
                { service: 'Employment Law', description: 'Offer letters, handbooks, contractor agreements' },
                { service: 'IP Protection', description: 'Trademark filing, IP assignment, licensing' },
                { service: 'Regulatory Compliance', description: 'Industry-specific permits and compliance' },
                { service: 'Dispute Resolution', description: 'Negotiations, settlements, litigation if needed' },
              ] : [
                { service: 'Kuruluş Seçimi Danışmanlığı', description: 'LLC vs Corp, eyalet seçimi, vergi etkileri' },
                { service: 'Operating Agreement', description: 'Özel durumunuz için özel belgeler' },
                { service: 'Sözleşme Hazırlama/İnceleme', description: 'Müşteri sözleşmeleri, satıcı anlaşmaları, TOS' },
                { service: 'Yatırımcı Belgeleri', description: 'SAFE notları, dönüştürülebilir notlar, hisse alım anlaşmaları' },
                { service: 'İş Hukuku', description: 'Teklif mektupları, el kitapları, yüklenici anlaşmaları' },
                { service: 'Fikri Mülkiyet Koruması', description: 'Ticari marka dosyalama, fikri mülkiyet devri, lisanslama' },
                { service: 'Düzenleyici Uyumluluk', description: 'Sektöre özel izinler ve uyumluluk' },
                { service: 'Uyuşmazlık Çözümü', description: 'Müzakereler, uzlaşmalar, gerekirse dava' },
              ]).map((item, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-black">{item.service}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cost Analysis */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Cost Analysis: DIY vs Professional' : 'Maliyet Analizi: Kendin Yap vs Profesyonel'}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Task' : 'Görev'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'DIY Cost' : 'Kendin Yap Maliyeti'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'With Attorney' : 'Avukat ile'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { task: isEnglish ? 'LLC Formation (Wyoming)' : 'LLC Kurulumu (Wyoming)', diy: '$100 + $60/yr', attorney: '$500-1,500' },
                    { task: isEnglish ? 'Single-Member Operating Agreement' : 'Tek Üyeli Operating Agreement', diy: isEnglish ? '$0-50 (template)' : '$0-50 (şablon)', attorney: '$500-1,000' },
                    { task: isEnglish ? 'Multi-Member Operating Agreement' : 'Çok Üyeli Operating Agreement', diy: isEnglish ? 'Not recommended' : 'Tavsiye edilmez', attorney: '$1,500-5,000' },
                    { task: isEnglish ? 'Service Agreement/Contract' : 'Hizmet Sözleşmesi', diy: isEnglish ? '$50-200 (template)' : '$50-200 (şablon)', attorney: '$500-2,000' },
                    { task: isEnglish ? 'Terms of Service + Privacy Policy' : 'Hizmet Şartları + Gizlilik Politikası', diy: isEnglish ? '$100-300 (generator)' : '$100-300 (oluşturucu)', attorney: '$1,000-3,000' },
                    { task: isEnglish ? 'Trademark Filing' : 'Ticari Marka Dosyalama', diy: '$250-350 (USPTO fee)', attorney: '$1,000-2,500' },
                    { task: isEnglish ? 'Investor Documentation' : 'Yatırımcı Dokümantasyonu', diy: isEnglish ? 'Not recommended' : 'Tavsiye edilmez', attorney: '$5,000-20,000' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.task}</td>
                      <td className="border border-gray-200 p-3">{row.diy}</td>
                      <td className="border border-gray-200 p-3">{row.attorney}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>{isEnglish ? 'Note:' : 'Not:'}</strong> {isEnglish
                  ? 'Attorney costs vary widely by location and experience. NYC lawyers typically charge 2-3x more than those in smaller markets. Flat-fee arrangements are common for standard business formation.'
                  : 'Avukat maliyetleri konum ve deneyime göre büyük farklılık gösterir. NYC avukatları genellikle daha küçük pazarlardakinden 2-3 kat daha fazla ücret alır. Standart işletme kurulumu için sabit ücret düzenlemeleri yaygındır.'}
              </p>
            </div>
          </section>

          {/* Risk Assessment */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'The Real Cost: What Goes Wrong Without Legal Help' : 'Gerçek Maliyet: Hukuki Yardım Olmadan Ne Yanlış Gider'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { problem: 'Bad Operating Agreement', cost: 'Partner dispute lawsuit: $50,000-200,000+', note: 'Common when partners disagree about exit terms' },
                { problem: 'Misclassifying Employees', cost: 'Back taxes + penalties: $10,000-100,000+', note: 'IRS and state audits for worker classification' },
                { problem: 'Inadequate Client Contracts', cost: 'Unpaid invoices or liability: $5,000-50,000+', note: 'No recourse for scope creep or non-payment' },
                { problem: 'Securities Law Violations', cost: 'Investor lawsuits: $100,000+', note: 'Improper fundraising can require returning all funds' },
                { problem: 'Wrong Entity for Visa', cost: 'Visa denial + restart costs: $20,000+', note: 'E-2 requires specific ownership structure' },
              ] : [
                { problem: 'Kötü Operating Agreement', cost: 'Ortak anlaşmazlığı davası: 50.000-200.000$+', note: 'Ortaklar çıkış şartları konusunda anlaşmazlık yaşadığında yaygın' },
                { problem: 'Çalışanları Yanlış Sınıflandırma', cost: 'Geriye dönük vergiler + cezalar: 10.000-100.000$+', note: 'İşçi sınıflandırması için IRS ve eyalet denetimleri' },
                { problem: 'Yetersiz Müşteri Sözleşmeleri', cost: 'Ödenmemiş faturalar veya sorumluluk: 5.000-50.000$+', note: 'Kapsam genişlemesi veya ödeme yapılmaması için başvuru yolu yok' },
                { problem: 'Menkul Kıymetler Yasası İhlalleri', cost: 'Yatırımcı davaları: 100.000$+', note: 'Uygunsuz fon toplama tüm fonların iadesini gerektirebilir' },
                { problem: 'Vize İçin Yanlış Kuruluş', cost: 'Vize reddi + yeniden başlama maliyetleri: 20.000$+', note: 'E-2 belirli sahiplik yapısı gerektirir' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-600 text-xl">✗</span>
                  <div>
                    <p className="font-semibold text-red-900">{item.problem}</p>
                    <p className="text-red-700 font-medium">{item.cost}</p>
                    <p className="text-red-800 text-sm">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Decision Framework */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Decision Framework: Do You Need a Lawyer?' : 'Karar Çerçevesi: Avukata İhtiyacınız Var mı?'}</h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-green-900">{isEnglish ? 'DIY is probably fine if:' : 'Kendin Yap muhtemelen uygunsa:'}</p>
                  <ul className="text-green-800 text-sm mt-2 space-y-1">
                    <li>• {isEnglish ? 'Single-member LLC for freelancing/consulting' : 'Freelance/danışmanlık için tek üyeli LLC'}</li>
                    <li>• {isEnglish ? 'No partners or investors' : 'Ortak veya yatırımcı yok'}</li>
                    <li>• {isEnglish ? 'Simple service business' : 'Basit hizmet işi'}</li>
                    <li>• {isEnglish ? 'No employees (just you)' : 'Çalışan yok (sadece siz)'}</li>
                    <li>• {isEnglish ? 'No visa goals tied to the company' : 'Şirkete bağlı vize hedefi yok'}</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-semibold text-yellow-900">{isEnglish ? 'Consider limited legal help if:' : 'Sınırlı hukuki yardım düşünün eğer:'}</p>
                  <ul className="text-yellow-800 text-sm mt-2 space-y-1">
                    <li>• {isEnglish ? 'You need a custom contract template' : 'Özel sözleşme şablonuna ihtiyacınız var'}</li>
                    <li>• {isEnglish ? 'You want Operating Agreement review' : 'Operating Agreement incelemesi istiyorsunuz'}</li>
                    <li>• {isEnglish ? 'You have specific questions' : 'Belirli sorularınız var'}</li>
                    <li>• {isEnglish ? 'You need a one-time document' : 'Tek seferlik bir belgeye ihtiyacınız var'}</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold text-red-900">{isEnglish ? 'You need an attorney if:' : 'Avukata ihtiyacınız var eğer:'}</p>
                  <ul className="text-red-800 text-sm mt-2 space-y-1">
                    <li>• {isEnglish ? 'Multiple owners with different contributions/roles' : 'Farklı katkılar/roller ile birden fazla ortak'}</li>
                    <li>• {isEnglish ? 'Taking investment of any kind' : 'Herhangi bir yatırım alma'}</li>
                    <li>• {isEnglish ? 'Immigration/visa is part of the plan' : 'Göçmenlik/vize planın bir parçası'}</li>
                    <li>• {isEnglish ? 'Regulated industry' : 'Düzenlenen sektör'}</li>
                    <li>• {isEnglish ? 'Significant assets at risk' : 'Risk altında önemli varlıklar'}</li>
                    <li>• {isEnglish ? 'Complex multi-entity structure' : 'Karmaşık çok kuruluşlu yapı'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Can formation services (LegalZoom, etc.) replace a lawyer?' : 'Kuruluş hizmetleri (LegalZoom, vb.) avukatın yerini alabilir mi?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'For basic formation filings, yes. They handle the paperwork efficiently. But they don\'t provide legal advice, custom documents, or help with complex situations. They\'re a filing service, not a law firm.'
                    : 'Temel kuruluş dosyalamaları için evet. Evrak işlerini verimli bir şekilde hallederler. Ama hukuki tavsiye, özel belgeler veya karmaşık durumlarla ilgili yardım sağlamazlar. Onlar bir dosyalama hizmeti, hukuk firması değil.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'How do I find a good business attorney?' : 'İyi bir iş avukatı nasıl bulurum?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Look for attorneys who specialize in business/corporate law, have experience with your industry, and ideally work with international clients if you\'re foreign. Ask for flat-fee quotes for specific services.'
                    : 'İş/şirket hukuku konusunda uzmanlaşmış, sektörünüzde deneyimi olan ve ideal olarak yabancıysanız uluslararası müşterilerle çalışan avukatlar arayın. Belirli hizmetler için sabit ücret teklifleri isteyin.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Can I start DIY and get a lawyer later?' : 'Kendin yap ile başlayıp sonra avukat tutabilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Yes, this is common. Many founders form their LLC themselves, then engage an attorney when they need contracts, bring on partners, or raise investment. Just don\'t wait until you\'re in a dispute.'
                    : 'Evet, bu yaygındır. Birçok kurucu LLC\'lerini kendileri kurar, sonra sözleşmelere ihtiyaç duyduklarında, ortak aldıklarında veya yatırım topladıklarında bir avukatla çalışır. Sadece bir anlaşmazlık içinde olana kadar beklemeyin.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Do I need a US lawyer or can I use one from my country?' : 'ABD avukatına mı ihtiyacım var yoksa kendi ülkemden birini kullanabilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'For US company formation and US contracts, you need a US-licensed attorney. Your home country lawyer can help with international tax planning and any home country implications.'
                    : 'ABD şirket kurulumu ve ABD sözleşmeleri için ABD lisanslı bir avukata ihtiyacınız var. Kendi ülkenizdeki avukatınız uluslararası vergi planlaması ve kendi ülkenizle ilgili sonuçlar konusunda yardımcı olabilir.'}
                </p>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/operating-agreement-zorunlu-mu`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Is an Operating Agreement Required? →' : 'Operating Agreement Zorunlu mu? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service-agreement-neden-gerekli`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Why Service Agreements Matter →' : 'Service Agreement Neden Gerekli? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? '7 Legal Mistakes to Avoid →' : 'Kaçınılması Gereken 7 Hukuki Hata →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kurmak-icin-gelmek-gerekir-mi`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Can You Form a US Company Remotely? →' : 'ABD Şirketi Uzaktan Kurulabilir mi? →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
