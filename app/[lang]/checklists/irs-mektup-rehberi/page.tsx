// app/[lang]/checklists/irs-mektup-rehberi/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'irs-mektup-rehberi',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-chk-00006',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/checklists/${PAGE_META.slug}`

  return {
    title: isEnglish
      ? 'IRS Letter Received: First 7 Facts | EchoLegal'
      : 'IRS\'ten Mektup Geldiyse: İlk 7 Gerçek | EchoLegal',
    description: isEnglish
      ? 'General facts to understand when you receive a letter from the IRS. Reference information for international entrepreneurs.'
      : 'IRS\'ten mektup aldığınızda anlamanız gereken genel gerçekler. Uluslararası girişimciler için referans bilgisi.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/checklists/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/checklists/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'IRS Letter Guide' : 'IRS Mektup Rehberi',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
      'citation_lastmod': '2026/01/25',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
      'citation_keywords': 'irs, letter, guide, tax-notice',
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function IRSLetterGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/checklists/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'IRS Letter Guide' : 'IRS Mektup Rehberi'

  const articleJsonLd = generateArticleSchema({
    title: isEnglish ? 'IRS Letter Received: First 7 Facts' : "IRS'ten Mektup Geldiyse: İlk 7 Gerçek",
    description: isEnglish
      ? 'General facts to understand when you receive a letter from the IRS'
      : 'IRS\'ten mektup aldığınızda anlamanız gereken genel gerçekler',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['irs', 'letter', 'notice', 'tax-guide', 'compliance'],
  })

  const breadcrumbJsonLd = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Checklists' : 'Kontrol Listeleri', url: `${SITE_URL}/${lang}/checklists` },
    { name: isEnglish ? 'IRS Letter' : 'IRS Mektubu', url: `${SITE_URL}/${lang}/checklists/irs-mektup-rehberi` },
  ])

  const facts = [
    {
      number: 1,
      title: isEnglish ? 'Not all IRS letters are bad news' : 'Tüm IRS mektupları kötü haber değildir',
      content: isEnglish
        ? 'The IRS sends letters for many reasons: confirming receipt of documents, requesting additional information, notifying of changes, or simply updating records. A letter doesn\'t automatically mean you\'re in trouble.'
        : 'IRS birçok nedenle mektup gönderir: belge alındığını onaylama, ek bilgi isteme, değişiklikleri bildirme veya sadece kayıtları güncelleme. Mektup otomatik olarak başınızın belada olduğu anlamına gelmez.',
    },
    {
      number: 2,
      title: isEnglish ? 'Read the notice number' : 'Bildirim numarasını okuyun',
      content: isEnglish
        ? 'Every IRS letter has a notice number (like CP2000, LTR 4883C, etc.) in the upper right corner. This number tells you exactly what type of letter it is. You can search for this number on irs.gov to understand what it means.'
        : 'Her IRS mektubunun sağ üst köşesinde bir bildirim numarası vardır (CP2000, LTR 4883C gibi). Bu numara size tam olarak ne tür bir mektup olduğunu söyler. Ne anlama geldiğini anlamak için bu numarayı irs.gov\'da arayabilirsiniz.',
    },
    {
      number: 3,
      title: isEnglish ? 'Note the deadline' : 'Son tarihi not edin',
      content: isEnglish
        ? 'Many IRS letters have response deadlines. Missing these deadlines can result in automatic decisions against you or additional penalties. Check if there\'s a deadline and mark it on your calendar.'
        : 'Birçok IRS mektubunun yanıt son tarihleri vardır. Bu son tarihleri kaçırmak aleyhinize otomatik kararlarla veya ek cezalarla sonuçlanabilir. Bir son tarih olup olmadığını kontrol edin ve takviminize işaretleyin.',
    },
    {
      number: 4,
      title: isEnglish ? 'Verify it\'s actually from the IRS' : 'Gerçekten IRS\'ten olduğunu doğrulayın',
      content: isEnglish
        ? 'Scammers send fake IRS letters. Real IRS letters come by mail (not email), include your correct SSN/EIN (partially masked), and never demand immediate payment via gift cards or wire transfers.'
        : 'Dolandırıcılar sahte IRS mektupları gönderir. Gerçek IRS mektupları posta ile gelir (e-posta değil), doğru SSN/EIN\'inizi içerir (kısmen maskelenmiş) ve asla hediye kartları veya banka havalesi yoluyla anında ödeme talep etmez.',
    },
    {
      number: 5,
      title: isEnglish ? 'You usually have options' : 'Genellikle seçenekleriniz vardır',
      content: isEnglish
        ? 'Most IRS letters allow you to: agree with the assessment, disagree and provide documentation, request more time, or set up a payment plan. You rarely have to accept the first decision as final.'
        : 'Çoğu IRS mektubu şunları yapmanıza izin verir: değerlendirmeyi kabul etmek, katılmamak ve belge sağlamak, daha fazla zaman istemek veya ödeme planı kurmak. İlk kararı nadiren nihai olarak kabul etmeniz gerekir.',
    },
    {
      number: 6,
      title: isEnglish ? 'Keep all your records' : 'Tüm kayıtlarınızı saklayın',
      content: isEnglish
        ? 'When you respond to the IRS, keep copies of everything you send. Send documents by certified mail if possible, and keep the receipt. Document all phone calls (date, time, representative name, what was discussed).'
        : 'IRS\'ye yanıt verdiğinizde, gönderdiğiniz her şeyin kopyalarını saklayın. Mümkünse belgeleri iadeli taahhütlü postayla gönderin ve makbuzu saklayın. Tüm telefon görüşmelerini belgeleyin (tarih, saat, temsilci adı, ne tartışıldığı).',
    },
    {
      number: 7,
      title: isEnglish ? 'You can get help' : 'Yardım alabilirsiniz',
      content: isEnglish
        ? 'You don\'t have to handle IRS correspondence alone. Tax professionals (CPAs, enrolled agents, tax attorneys) can communicate with the IRS on your behalf. For complex situations, professional help is often worth the cost.'
        : 'IRS yazışmalarını tek başınıza halletmek zorunda değilsiniz. Vergi uzmanları (muhasebeciler, kayıtlı temsilciler, vergi avukatları) sizin adınıza IRS ile iletişim kurabilir. Karmaşık durumlar için profesyonel yardım genellikle maliyetine değer.',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JsonLdScript data={[articleJsonLd, breadcrumbJsonLd]} />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/checklists`} className="hover:text-black">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'IRS Letter' : 'IRS Mektubu'}</span>
        </nav>

        <article>
          <header className="mb-10">
            <span className="inline-block px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Reference Guide' : 'Referans Rehberi'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {isEnglish ? 'IRS Letter Received: First 7 Facts' : 'IRS\'ten Mektup Geldiyse: İlk 7 Gerçek'}
            </h1>
            <p className="text-lg text-gray-600">
              {isEnglish
                ? 'General information to help you understand IRS correspondence. Not tax advice.'
                : 'IRS yazışmalarını anlamanıza yardımcı olacak genel bilgiler. Vergi tavsiyesi değildir.'}
            </p>
          </header>

          <InstitutionalBadge lang={lang} jurisdictions={['US']} lastReviewedAt="2026-01-20" className="mb-10" />

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
            <p className="text-sm text-amber-900">
              <strong>{isEnglish ? 'This guide does not provide:' : 'Bu rehber şunları sağlamaz:'}</strong>{' '}
              {isEnglish
                ? 'Tax advice or guidance on how to respond to specific IRS notices. Every situation is different. Consult a tax professional for help with your specific letter.'
                : 'Vergi tavsiyesi veya belirli IRS bildirimlerine nasıl yanıt verileceğine dair rehberlik. Her durum farklıdır. Belirli mektubunuz için yardım almak için bir vergi uzmanına danışın.'}
            </p>
          </div>

          {/* Facts */}
          <div className="space-y-6 mb-12">
            {facts.map((fact) => (
              <div key={fact.number} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h3 className="font-bold text-black flex items-center gap-3">
                    <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                      {fact.number}
                    </span>
                    {fact.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-700">{fact.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What This Doesn't Cover */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
            <h3 className="font-bold text-black mb-3">
              {isEnglish ? 'What This Doesn\'t Cover' : 'Bu Rehberin Kapsamadıkları'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• {isEnglish ? 'How to respond to your specific letter' : 'Belirli mektubunuza nasıl yanıt verileceği'}</li>
              <li>• {isEnglish ? 'Whether you owe the amount stated' : 'Belirtilen miktarı borçlu olup olmadığınız'}</li>
              <li>• {isEnglish ? 'Whether you should agree or dispute' : 'Kabul etmeniz mi yoksa itiraz etmeniz mi gerektiği'}</li>
              <li>• {isEnglish ? 'Tax planning or strategy' : 'Vergi planlaması veya stratejisi'}</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              {isEnglish
                ? 'For these questions, consult a tax professional who can review your specific situation.'
                : 'Bu sorular için, özel durumunuzu inceleyebilecek bir vergi uzmanına danışın.'}
            </p>
          </div>

          <CiteThisEntry
            lang={lang}
            title={pageTitle}
            url={pageUrl}
            dateModified={PAGE_META.dateModified}
            version={PAGE_META.version}
            citationKey={PAGE_META.citationKey}
            contentType="checklist"
            className="mb-8"
          />

          {/* Related Resources */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4">
              {isEnglish ? 'Related resources on this topic' : 'Bu konuyla bağlantılı hukuki kaynaklar'}
            </h2>
            <div className="space-y-3">
              <Link href={`/${lang}/library/irs-vergi-gercekleri`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'IRS & Tax Facts (Full Guide)' : 'IRS ve Vergi Gerçekleri (Tam Rehber)'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
              <Link href={`/${lang}/checklists/w8-w9-karar-haritasi`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'W-8 or W-9 Decision Map' : 'W-8 mi W-9 mu? Karar Haritası'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
              <Link href={`/${lang}/library/hukuki-yanilgilar`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'Common Legal Misconceptions' : 'Sık Yapılan Hukuki Hatalar'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
            </div>
          </section>
        </article>
    </div>
  )
}
