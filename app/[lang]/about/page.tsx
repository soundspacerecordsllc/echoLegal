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
    ? 'Learn about EchoLegal\'s mission to democratize legal knowledge worldwide. Our encyclopedic approach, editorial standards, and sustainable access model. Currently serving US and Turkish law.'
    : 'EchoLegal\'ın hukuki bilgiyi dünya genelinde demokratikleştirme misyonunu öğrenin. Ansiklopedik yaklaşımımız, editöryal standartlarımız ve sürdürülebilir erişim modelimiz. Şu anda ABD ve Türk hukuku.'

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
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            {isEnglish ? 'Why EchoLegal?' : 'Neden EchoLegal?'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'A global legal encyclopedia providing free, high-quality legal knowledge for individuals and businesses worldwide.'
              : 'Dünya genelinde bireyler ve işletmeler için ücretsiz, yüksek kaliteli hukuki bilgi sağlayan global bir hukuk ansiklopedisi.'}
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
                ? 'EchoLegal exists to democratize legal knowledge. We believe that understanding your legal rights and obligations shouldn\'t require expensive consultations for every basic question. Our goal is to build a global, multilingual legal encyclopedia that serves individuals and businesses everywhere.'
                : 'EchoLegal, hukuki bilgiyi demokratikleştirmek için var. Her temel soru için pahalı danışmanlıklara ihtiyaç duymadan hukuki hak ve yükümlülüklerinizi anlamanız gerektiğine inanıyoruz. Amacımız, her yerdeki bireyler ve işletmelere hizmet veren global, çok dilli bir hukuk ansiklopedisi oluşturmaktır.'}
            </p>
          </div>
        </section>

        {/* Current Focus Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Current Focus' : 'Mevcut Odak'}
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'We are building EchoLegal one jurisdiction at a time. Our initial focus is United States business and legal requirements, with all content available in both English and Turkish.'
                : 'EchoLegal\'ı tek tek yargı alanlarına göre oluşturuyoruz. İlk odak noktamız ABD iş ve hukuki gereksinimleridir ve tüm içerik hem İngilizce hem de Türkçe olarak mevcuttur.'}
            </p>
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'Topics currently covered include: US business formation (LLC, Corporation), tax compliance (EIN, ITIN, W-8, W-9, 1099), essential contracts, and visa-related documentation.'
                : 'Şu anda kapsanan konular: ABD şirket kurulumu (LLC, Corporation), vergi uyumu (EIN, ITIN, W-8, W-9, 1099), temel sözleşmeler ve vize ile ilgili belgeler.'}
            </p>
            <p className="text-sm text-blue-800">
              {isEnglish
                ? 'We welcome contributions from licensed attorneys in other jurisdictions who share our mission. Contact us to learn about contributing.'
                : 'Misyonumuzu paylaşan diğer yargı alanlarındaki lisanslı avukatlardan katkıları memnuniyetle karşılıyoruz. Katkıda bulunma hakkında bilgi almak için bizimle iletişime geçin.'}
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
              <h3 className="font-semibold text-black mb-2">
                {isEnglish ? 'Multilingual by Design' : 'Tasarımı İtibarıyla Çok Dilli'}
              </h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? 'Not machine-translated. Content is written by native speakers who understand the nuances of legal terminology. Currently available in English and Turkish, with more languages planned.'
                  : 'Makine çevirisi değil. İçerik, hukuki terminolojinin inceliklerini anlayan anadili konuşan kişiler tarafından yazılmaktadır. Şu anda İngilizce ve Türkçe olarak mevcut, daha fazla dil planlanmaktadır.'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
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

        {/* Sustainable Access Model */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Sustainable Access Model' : 'Sürdürülebilir Erişim Modeli'}
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'Our templates and guides are available through a flexible pricing model. The suggested contribution is $49, though all materials remain accessible at no cost to ensure equitable access regardless of financial circumstances.'
                : 'Şablonlarımız ve rehberlerimiz esnek bir fiyatlandırma modeliyle sunulmaktadır. Önerilen katkı payı 49$ olmakla birlikte, mali koşullardan bağımsız olarak eşit erişim sağlamak amacıyla tüm materyaller ücretsiz olarak erişilebilir durumdadır.'}
            </p>
            <p className="text-gray-700">
              {isEnglish
                ? 'This model is designed for long-term sustainability. Contributions from paying users support continued free access for all. The content provided is identical regardless of payment.'
                : 'Bu model uzun vadeli sürdürülebilirlik için tasarlanmıştır. Ödeme yapan kullanıcıların katkıları, herkes için ücretsiz erişimin devamını destekler. Sunulan içerik, ödeme durumundan bağımsız olarak aynıdır.'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {isEnglish ? 'No paywalls on information' : 'Bilgide ödeme duvarı yok'}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {isEnglish ? 'No mandatory registration' : 'Zorunlu kayıt yok'}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              {isEnglish ? 'Uniform quality for all users' : 'Tüm kullanıcılar için aynı kalite'}
            </span>
          </div>
        </section>

        {/* Editorial Oversight */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Editorial Oversight' : 'Editöryal Gözetim'}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-sm text-gray-700">
              {isEnglish
                ? 'All legal content on EchoLegal is reviewed for accuracy by a New York-licensed attorney with expertise in US immigration and business law.'
                : 'EchoLegal\'daki tüm hukuki içerik, ABD göçmenlik ve iş hukuku konusunda uzmanlığa sahip New York lisanslı bir avukat tarafından doğruluk açısından incelenmektedir.'}
            </p>
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

        {/* Governance & Policies */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-lg font-bold text-black mb-4">
            {isEnglish ? 'Governance & Policies' : 'Yönetişim ve Politikalar'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href={`/${lang}/about/charter`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Institutional Charter' : 'Kurumsal Tüzük'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Mission, editorial independence, and governance structure' : 'Misyon, editöryal bağımsızlık ve yönetişim yapısı'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/editorial-policy`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Editorial Policy' : 'Editöryal Politika'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Standards for accuracy, sourcing, and review' : 'Doğruluk, kaynak kullanımı ve inceleme standartları'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/editorial-board`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Editorial Board' : 'Yayın Kurulu'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Reviewing attorneys and editorial team' : 'İnceleme avukatları ve editör ekibi'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/contributor-standards`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Contributor Standards' : 'Katkıda Bulunan Standartları'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Requirements for contributing attorneys' : 'Katkıda bulunan avukatlar için gereksinimler'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/corrections`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Corrections & Retractions' : 'Düzeltmeler ve Geri Çekmeler'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'How errors are handled and documented' : 'Hataların nasıl ele alınıp belgelendiği'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/citation-guide`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Citation Guide' : 'Atıf Rehberi'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'How to cite EchoLegal content' : 'EchoLegal içeriğine nasıl atıf yapılır'}
              </span>
            </Link>
            <Link
              href={`/${lang}/jurisdictions`}
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-black">{isEnglish ? 'Jurisdictions' : 'Yargı Alanları'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Legal jurisdictions currently covered' : 'Şu anda kapsanan hukuki yargı alanları'}
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
