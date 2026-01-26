// app/[lang]/about/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Why EchoLegal? | Our Mission & Approach'
    : 'Neden EchoLegal? | Misyonumuz ve Yaklaşımımız'

  const description = isEnglish
    ? 'Learn about EchoLegal\'s mission to provide accessible, high-quality legal information for Turkish entrepreneurs. Our encyclopedic approach, editorial standards, and pay-what-you-can model.'
    : 'EchoLegal\'ın Türk girişimcilere erişilebilir, kaliteli hukuki bilgi sunma misyonunu öğrenin. Ansiklopedik yaklaşımımız, editöryal standartlarımız ve destekle model.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/about`,
      languages: {
        'en': 'https://echo-legal.com/en/about',
        'tr': 'https://echo-legal.com/tr/about',
        'x-default': 'https://echo-legal.com/en/about',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda' },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={breadcrumbItems} lang={lang} />

        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
            {isEnglish ? 'Why EchoLegal?' : 'Neden EchoLegal?'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'A legal encyclopedia built for Turkish entrepreneurs navigating the US legal system.'
              : 'ABD hukuk sisteminde yol alan Türk girişimciler için oluşturulmuş bir hukuk ansiklopedisi.'}
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Our Mission' : 'Misyonumuz'}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'EchoLegal exists to democratize legal knowledge. We believe that understanding your legal rights and obligations shouldn\'t require expensive consultations for every basic question.'
                : 'EchoLegal, hukuki bilgiyi demokratikleştirmek için var. Her temel soru için pahalı danışmanlıklara ihtiyaç duymadan hukuki hak ve yükümlülüklerinizi anlamanız gerektiğine inanıyoruz.'}
            </p>
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'Our focus is specifically on the intersection of Turkish and American legal systems — immigration pathways, business formation, tax obligations, and contract requirements for Turkish entrepreneurs doing business in or with the United States.'
                : 'Odak noktamız özellikle Türk ve Amerikan hukuk sistemlerinin kesişim noktasıdır — ABD\'de veya ABD ile iş yapan Türk girişimciler için göçmenlik yolları, şirket kurulumu, vergi yükümlülükleri ve sözleşme gereksinimleri.'}
            </p>
          </div>
        </section>

        {/* Encyclopedic Approach */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Our Encyclopedic Approach' : 'Ansiklopedik Yaklaşımımız'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold text-black mb-2">
                {isEnglish ? 'Reference, Not Marketing' : 'Pazarlama Değil, Referans'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'We write like an encyclopedia, not a sales page. No hype, no fear tactics, no manipulation. Just clear, factual information.'
                  : 'Satış sayfası gibi değil, ansiklopedi gibi yazıyoruz. Abartı yok, korku taktikleri yok, manipülasyon yok. Sadece net, olgusal bilgi.'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">🏛️</div>
              <h3 className="font-semibold text-black mb-2">
                {isEnglish ? 'Primary Sources First' : 'Önce Birincil Kaynaklar'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Every claim is traceable to official government sources, statutes, or regulations. We cite USCIS, IRS, and state authorities directly.'
                  : 'Her iddia resmi hükümet kaynaklarına, yasalara veya düzenlemelere kadar izlenebilir. USCIS, IRS ve eyalet otoritelerini doğrudan alıntılıyoruz.'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="font-semibold text-black mb-2">
                {isEnglish ? 'Truly Bilingual' : 'Gerçekten İki Dilli'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Not machine-translated. Our Turkish content is written by native speakers who understand the nuances of legal terminology in both languages.'
                  : 'Makine çevirisi değil. Türkçe içeriğimiz, her iki dilde de hukuki terminolojinin inceliklerini anlayan anadili Türkçe olan kişiler tarafından yazılmaktadır.'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="font-semibold text-black mb-2">
                {isEnglish ? 'Dated & Updated' : 'Tarihli ve Güncel'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Every article shows when it was published and last updated. Legal information changes; we track when our content was verified.'
                  : 'Her makale ne zaman yayınlandığını ve son güncellendiğini gösterir. Hukuki bilgiler değişir; içeriğimizin ne zaman doğrulandığını takip ediyoruz.'}
              </p>
            </div>
          </div>
        </section>

        {/* Pay What You Can */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'I Support EchoLegal Model' : 'EchoLegal\'ı Destekliyorum Modeli'}
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'Our templates and guides are available on a "pay what you can" basis. We recommend $20, but if you\'re just starting out or times are tight, you can access everything for free.'
                : 'Şablonlarımız ve rehberlerimiz "gücünüz yettiğince ödeyin" esasına göre sunulmaktadır. 20$ öneriyoruz, ancak yeni başlıyorsanız veya ekonomik durumunuz uygun değilse her şeye ücretsiz erişebilirsiniz.'}
            </p>
            <p className="text-gray-700">
              {isEnglish
                ? 'This isn\'t charity — it\'s sustainability. Those who can pay help subsidize access for those who can\'t. The content is the same either way.'
                : 'Bu hayır işi değil — sürdürülebilirlik. Ödeyebilenler, ödeyemeyenlerin erişimini sübvanse etmeye yardımcı oluyor. İçerik her iki durumda da aynı.'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {isEnglish ? 'No paywalls on information' : 'Bilgide ödeme duvarı yok'}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {isEnglish ? 'No forced sign-ups' : 'Zorunlu kayıt yok'}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {isEnglish ? 'Same quality for all' : 'Herkes için aynı kalite'}
            </span>
          </div>
        </section>

        {/* Who We Are */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Editorial Oversight' : 'Editöryal Gözetim'}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                ⚖️
              </div>
              <div>
                <h3 className="font-bold text-black">Zeynep Ruziye Moore</h3>
                <p className="text-sm text-gray-600 mb-2">Attorney at Law • New York Bar No: 5552336</p>
                <p className="text-sm text-gray-700">
                  {isEnglish
                    ? 'All legal content on EchoLegal is reviewed for accuracy by a licensed attorney with expertise in US immigration and business law, particularly as it relates to Turkish nationals.'
                    : 'EchoLegal\'daki tüm hukuki içerik, özellikle Türk vatandaşlarıyla ilgili olarak ABD göçmenlik ve iş hukuku konusunda uzmanlığa sahip lisanslı bir avukat tarafından doğruluk açısından incelenmektedir.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'What EchoLegal Is Not' : 'EchoLegal Ne Değildir'}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✕</span>
              <p className="text-gray-700">
                <strong>{isEnglish ? 'Not legal advice:' : 'Hukuki tavsiye değildir:'}</strong>{' '}
                {isEnglish
                  ? 'Our content is educational. It doesn\'t replace consultation with a qualified attorney for your specific situation.'
                  : 'İçeriğimiz eğitim amaçlıdır. Özel durumunuz için nitelikli bir avukatla danışmanlığın yerini almaz.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✕</span>
              <p className="text-gray-700">
                <strong>{isEnglish ? 'Not a law firm:' : 'Hukuk bürosu değildir:'}</strong>{' '}
                {isEnglish
                  ? 'We don\'t represent clients, file documents, or provide individual legal services.'
                  : 'Müvekkilleri temsil etmiyor, belge sunmuyor veya bireysel hukuk hizmetleri sağlamıyoruz.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✕</span>
              <p className="text-gray-700">
                <strong>{isEnglish ? 'Not a referral service:' : 'Yönlendirme hizmeti değildir:'}</strong>{' '}
                {isEnglish
                  ? 'We don\'t receive commissions from lawyers or service providers. We have no financial incentive to recommend specific professionals.'
                  : 'Avukatlardan veya hizmet sağlayıcılardan komisyon almıyoruz. Belirli profesyonelleri önerme konusunda mali teşvikimiz yok.'}
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-black mb-4">
            {isEnglish ? 'Learn More' : 'Daha Fazla Bilgi'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/${lang}/about/editorial-policy`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Editorial Policy' : 'Editöryal Politika'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Our standards for accuracy and sourcing' : 'Doğruluk ve kaynak kullanımı standartlarımız'}
              </span>
            </Link>
            <Link
              href={`/${lang}/legal/disclaimer`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Legal Disclaimer' : 'Yasal Uyarı'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Important limitations of our content' : 'İçeriğimizin önemli sınırlamaları'}
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
