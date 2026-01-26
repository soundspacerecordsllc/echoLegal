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
      ? "Tourist Visa Realities - B-1/B-2 Facts & Misconceptions | EchoLegal"
      : "Turist Vizesi Gerçekleri - B-1/B-2 Gerçekleri & Yanlış Bilinenler | EchoLegal",
    description: isEnglish
      ? "The truth about US tourist visas. 214(b) refusals, immigrant intent presumption, and common mistakes Turkish applicants make."
      : "ABD turist vizeleri hakkında gerçekler. 214(b) retleri, göçmen niyeti varsayımı ve Türk başvuru sahiplerinin yaptığı yaygın hatalar.",
  }
}

export default async function TuristVizesiPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('turist-vizesi-gercekleri')

  const faqItems = [
    {
      question: isEnglish ? "Why was my tourist visa denied?" : "Turist vize başvurum neden reddedildi?",
      answer: isEnglish
        ? "Most tourist visa denials are under INA § 214(b), meaning the officer wasn't convinced you would return to your home country. This isn't about documents - it's about your overall ties and circumstances."
        : "Çoğu turist vizesi reddi INA § 214(b) kapsamındadır, yani memur ülkenize döneceğinize ikna olmamıştır. Bu belgelerle ilgili değil - genel bağlarınız ve koşullarınızla ilgili."
    },
    {
      question: isEnglish ? "What does 214(b) really mean?" : "214(b) gerçekte ne anlama geliyor?",
      answer: isEnglish
        ? "Section 214(b) creates a legal presumption that every visa applicant intends to immigrate. You must overcome this presumption by demonstrating strong ties to your home country and a specific, legitimate purpose for your temporary visit."
        : "214(b) maddesi, her vize başvuru sahibinin göç etme niyetinde olduğuna dair yasal bir varsayım oluşturur. Ülkenizle güçlü bağlar ve geçici ziyaretiniz için belirli, meşru bir amaç göstererek bu varsayımın üstesinden gelmelisiniz."
    },
    {
      question: isEnglish ? "Can I appeal a 214(b) denial?" : "214(b) reddine itiraz edebilir miyim?",
      answer: isEnglish
        ? "There is no formal appeal for 214(b) denials. You can reapply, but simply resubmitting the same application rarely changes the outcome. Your circumstances or how you present them must change."
        : "214(b) retleri için resmi bir itiraz yoktur. Yeniden başvurabilirsiniz, ancak aynı başvuruyu tekrar göndermek nadiren sonucu değiştirir. Koşullarınız veya bunları sunma şekliniz değişmelidir."
    },
    {
      question: isEnglish ? "How many times can I reapply after denial?" : "Retten sonra kaç kez yeniden başvurabilirim?",
      answer: isEnglish
        ? "There's no legal limit on reapplications, but multiple denials without changed circumstances can establish a pattern that makes future approvals more difficult."
        : "Yeniden başvurular için yasal bir sınır yoktur, ancak koşullar değişmeden birden fazla red, gelecekteki onayları zorlaştıran bir örüntü oluşturabilir."
    },
    {
      question: isEnglish ? "Does having a lot of money help with visa approval?" : "Çok para sahibi olmak vize onayına yardımcı olur mu?",
      answer: isEnglish
        ? "Financial resources alone don't overcome 214(b). Officers look at your overall profile - ties to home country, travel history, employment stability, family situation, and the credibility of your stated plans."
        : "Finansal kaynaklar tek başına 214(b)'nin üstesinden gelmez. Memurlar genel profilinize bakar - ülkeyle bağlar, seyahat geçmişi, istihdam istikrarı, aile durumu ve belirtilen planlarınızın güvenilirliği."
    },
    {
      question: isEnglish ? "Should I show property documents or bank statements?" : "Tapu veya banka hesap dökümleri göstermeli miyim?",
      answer: isEnglish
        ? "Documents support your case but don't guarantee approval. The interview conversation and your overall profile matter more than any single document. Officers assess credibility, not just paperwork."
        : "Belgeler davanızı destekler ancak onay garantisi vermez. Mülakat konuşması ve genel profiliniz herhangi bir belgeden daha önemlidir. Memurlar sadece evrak değil, güvenilirliği değerlendirir."
    },
    {
      question: isEnglish ? "Can I change my status after entering on a tourist visa?" : "Turist vizesiyle girdikten sonra statümü değiştirebilir miyim?",
      answer: isEnglish
        ? "Technically possible in some cases, but entering with tourist visa while intending to change status can be considered misrepresentation. The 30/60 day rule and preconceived intent doctrine create significant risks."
        : "Bazı durumlarda teknik olarak mümkündür, ancak statü değiştirme niyetiyle turist vizesiyle girmek yanlış beyan olarak değerlendirilebilir. 30/60 gün kuralı ve önceden tasarlanmış niyet doktrini önemli riskler oluşturur."
    },
    {
      question: isEnglish ? "How long should I wait before reapplying?" : "Yeniden başvurmadan önce ne kadar beklemeliyim?",
      answer: isEnglish
        ? "There's no mandatory waiting period, but applying immediately after denial without changed circumstances is rarely productive. Wait until something material in your situation has changed."
        : "Zorunlu bir bekleme süresi yoktur, ancak koşullar değişmeden retten hemen sonra başvurmak nadiren sonuç verir. Durumunuzda somut bir şey değişene kadar bekleyin."
    }
  ]

  const relatedPages = [
    { slug: 'abdye-gelme-yollari', title: isEnglish ? 'Pathways to the US' : "ABD'ye Gelme Yolları" },
    { slug: 'statuden-statuye-gecis-gercekleri', title: isEnglish ? 'Status Change Realities' : 'Statüden Statüye Geçiş Gerçekleri' },
    { slug: 'platform-ne-yapar-ne-yapmaz', title: isEnglish ? 'What This Platform Does' : 'Platform Ne Yapar Ne Yapmaz' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Tourist Visa Realities' : 'Turist Vizesi Gerçekleri' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: US Federal Immigration Law' : 'Yargı Yetkisi: ABD Federal Göçmenlik Hukuku'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Tourist Visa Realities" : "Turist Vizesi Gerçekleri"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "Every tourist visa applicant is presumed to be an intending immigrant under INA § 214(b)"
              : "Her turist vizesi başvuru sahibi, INA § 214(b) kapsamında göçmen adayı olarak varsayılır"}</li>
            <li>• {isEnglish
              ? "214(b) denials are about your overall profile, not missing documents"
              : "214(b) retleri eksik belgelerle değil, genel profilinizle ilgilidir"}</li>
            <li>• {isEnglish
              ? "There is no formal appeal process for tourist visa denials"
              : "Turist vizesi retleri için resmi bir itiraz süreci yoktur"}</li>
            <li>• {isEnglish
              ? "Reapplying without changed circumstances rarely produces different results"
              : "Koşullar değişmeden yeniden başvurmak nadiren farklı sonuçlar üretir"}</li>
            <li>• {isEnglish
              ? "Entering as tourist while planning to change status carries serious legal risks"
              : "Statü değiştirmeyi planlarken turist olarak girmek ciddi hukuki riskler taşır"}</li>
          </ul>
        </section>

        {/* What This Covers */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                {isEnglish ? 'This Page Covers' : 'Bu Sayfa Kapsar'}
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {isEnglish ? 'How 214(b) works in practice' : '214(b) uygulamada nasıl işler'}</li>
                <li>• {isEnglish ? 'Why denials happen' : 'Retler neden olur'}</li>
                <li>• {isEnglish ? 'Common misconceptions' : 'Yaygın yanlış varsayımlar'}</li>
                <li>• {isEnglish ? 'What officers evaluate' : 'Memurlar neyi değerlendirir'}</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'This Page Does Not Cover' : 'Bu Sayfa Kapsamaz'}
              </h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• {isEnglish ? 'Interview coaching' : 'Mülakat koçluğu'}</li>
                <li>• {isEnglish ? 'Document preparation' : 'Belge hazırlığı'}</li>
                <li>• {isEnglish ? 'Individual case assessment' : 'Bireysel vaka değerlendirmesi'}</li>
                <li>• {isEnglish ? 'Guaranteed approval strategies' : 'Garantili onay stratejileri'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Understanding the 214(b) Presumption' : '214(b) Varsayımını Anlamak'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "Section 214(b) of the Immigration and Nationality Act creates a fundamental presumption: every applicant for a non-immigrant visa is presumed to be an intending immigrant until they prove otherwise. This isn't a punishment or suspicion - it's the legal default that applies to everyone."
                : "Göçmenlik ve Vatandaşlık Yasasının 214(b) maddesi temel bir varsayım oluşturur: her göçmen olmayan vize başvurusu sahibi, aksi kanıtlanana kadar göçmen adayı olarak varsayılır. Bu bir ceza veya şüphe değil - herkese uygulanan yasal varsayımdır."}
            </p>
            <p>
              {isEnglish
                ? "To overcome this presumption, you must demonstrate: (1) a specific, legitimate purpose for your temporary visit, (2) intent to depart after that purpose is accomplished, and (3) sufficient ties to your home country that would compel your return."
                : "Bu varsayımın üstesinden gelmek için şunları göstermelisiniz: (1) geçici ziyaretiniz için belirli, meşru bir amaç, (2) bu amaç gerçekleştikten sonra ayrılma niyeti ve (3) dönüşünüzü zorunlu kılacak ülkenizle yeterli bağlar."}
            </p>
          </div>
        </section>

        {/* What Officers Evaluate */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'What Consular Officers Evaluate' : 'Konsolosluk Memurları Neyi Değerlendirir'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Ties to Home Country' : 'Ülkeyle Bağlar'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Employment stability, property ownership, family relationships, business interests, and other factors that demonstrate roots in your home country."
                  : "İstihdam istikrarı, mülk sahipliği, aile ilişkileri, iş çıkarları ve ülkenizdeki kökleri gösteren diğer faktörler."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Purpose of Visit' : 'Ziyaret Amacı'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Is your stated purpose specific and credible? Vague plans like 'visiting friends' or 'tourism' without specifics raise questions."
                  : "Belirtilen amacınız belirli ve güvenilir mi? 'Arkadaşları ziyaret' veya ayrıntı olmadan 'turizm' gibi belirsiz planlar soru işaretleri yaratır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Travel History' : 'Seyahat Geçmişi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Previous travel to other countries and compliance with visa terms demonstrates reliability. No travel history isn't automatically disqualifying but provides less evidence."
                  : "Diğer ülkelere önceki seyahatler ve vize koşullarına uyum güvenilirliği gösterir. Seyahat geçmişi olmaması otomatik olarak diskalifiye etmez ancak daha az kanıt sağlar."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Overall Credibility' : 'Genel Güvenilirlik'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Does your story make sense? Are your answers consistent? Officers are trained to assess credibility through the interview conversation."
                  : "Hikayeniz mantıklı mı? Cevaplarınız tutarlı mı? Memurlar mülakat konuşması yoluyla güvenilirliği değerlendirmek için eğitilmiştir."}
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
                {isEnglish ? '"More documents will fix a denial"' : '"Daha fazla belge reddi düzeltir"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "214(b) denials are rarely about missing documents. They're about your overall profile and circumstances. Adding more paperwork to the same profile rarely changes outcomes."
                  : "214(b) retleri nadiren eksik belgelerle ilgilidir. Genel profiliniz ve koşullarınızla ilgilidir. Aynı profile daha fazla evrak eklemek nadiren sonuçları değiştirir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"The officer made a mistake"' : '"Memur hata yaptı"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Consular officers have broad discretion under 214(b). What feels like an unfair denial is usually a different assessment of your ties and intent, not an error."
                  : "Konsolosluk memurları 214(b) kapsamında geniş takdir yetkisine sahiptir. Haksız bir ret gibi hissedilen şey, genellikle bir hata değil, bağlarınızın ve niyetinizin farklı bir değerlendirmesidir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I should apply again immediately"' : '"Hemen tekrar başvurmalıyım"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Reapplying without changed circumstances wastes time and money. Wait until something material has changed - new job, property purchase, family change, or significant time passage."
                  : "Koşullar değişmeden yeniden başvurmak zaman ve para israfıdır. Somut bir şey değişene kadar bekleyin - yeni iş, mülk satın alma, aile değişikliği veya önemli zaman geçişi."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"Rich people always get visas"' : '"Zengin insanlar her zaman vize alır"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Wealth alone doesn't overcome 214(b). In fact, significant financial resources without strong ties can suggest you have means to relocate permanently."
                  : "Zenginlik tek başına 214(b)'nin üstesinden gelmez. Aslında, güçlü bağlar olmadan önemli finansal kaynaklar, kalıcı olarak taşınma imkanınız olduğunu düşündürebilir."}
              </p>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Self-Assessment Checklist' : 'Öz Değerlendirme Kontrol Listesi'}
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <ul className="space-y-3">
              {(isEnglish ? [
                'Can you clearly explain why you need to visit the US specifically?',
                'What requires you to return to your home country?',
                'Do you have stable employment or business that requires your presence?',
                'What family or property ties anchor you to your home country?',
                'Have you complied with visa terms in previous international travel?',
                'Is your financial situation consistent with your stated purpose?',
                'Can you articulate your plans specifically, not vaguely?',
                'Would an objective observer believe you intend to return?'
              ] : [
                "ABD'yi özellikle neden ziyaret etmeniz gerektiğini açıkça açıklayabilir misiniz?",
                'Ülkenize dönmenizi gerektiren ne var?',
                'Varlığınızı gerektiren istikrarlı bir işiniz veya işletmeniz var mı?',
                'Sizi ülkenize bağlayan hangi aile veya mülk bağları var?',
                'Önceki uluslararası seyahatlerinizde vize koşullarına uydunuz mu?',
                'Mali durumunuz belirtilen amacınızla tutarlı mı?',
                'Planlarınızı belirsiz değil, spesifik olarak ifade edebilir misiniz?',
                'Objektif bir gözlemci dönme niyetinize inanır mı?'
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#C9A227] mt-1">☐</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
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
  )
}
