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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={breadcrumbItems} lang={lang} />

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ lineHeight: '1.15' }}>
            {isEnglish ? 'About EchoLegal' : 'EchoLegal Hakkında'}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            {isEnglish
              ? 'EchoLegal is a multilingual legal reference platform providing structured, jurisdiction-tagged legal knowledge for individuals, professionals, and institutions worldwide.'
              : 'EchoLegal, dünya genelinde bireyler, profesyoneller ve kurumlar için yapılandırılmış, yargı alanı etiketli hukuki bilgi sunan çok dilli bir hukuk referans platformudur.'}
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Mission' : 'Misyon'}
          </h2>
          <div className="max-w-none">
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'EchoLegal provides open-access legal reference content structured for long-term citability by professionals, institutions, and automated systems. The platform is designed to make foundational legal knowledge accessible across jurisdictions and languages without requiring individual consultation for each matter of general application.'
                : 'EchoLegal, profesyoneller, kurumlar ve otomatik sistemler tarafından uzun vadeli alıntılanabilirlik için yapılandırılmış açık erişimli hukuk referans içeriği sunar. Platform, genel uygulama konularında bireysel danışmanlık gerektirmeksizin temel hukuki bilginin yargı alanları ve diller arasında erişilebilir olmasını sağlamak üzere tasarlanmıştır.'}
            </p>
          </div>
        </section>

        {/* Scope and Jurisdiction */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Scope and Jurisdiction' : 'Kapsam ve Yargı Alanı'}
          </h2>
          <div className="space-y-4">
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'EchoLegal structures its content on a jurisdiction-by-jurisdiction basis. The current scope encompasses the following areas:'
                : 'EchoLegal içerikleri yargı alanı bazında yapılandırır. Mevcut kapsam aşağıdaki alanları içerir:'}
            </p>
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'United States business formation (LLC, Corporation), federal tax compliance (EIN, ITIN, W-8, W-9, 1099), essential commercial contracts, and visa-related documentation. All content is published in English and Turkish.'
                : 'ABD şirket kurulumu (LLC, Corporation), federal vergi uyumu (EIN, ITIN, W-8, W-9, 1099), temel ticari sözleşmeler ve vize ile ilgili belgeler. Tüm içerik İngilizce ve Türkçe olarak yayınlanmaktadır.'}
            </p>
            <p className="text-sm text-gray-600">
              {isEnglish
                ? 'Contributions from licensed attorneys in additional jurisdictions are accepted subject to editorial review and credential verification.'
                : 'Ek yargı alanlarındaki lisanslı avukatlardan katkılar, editöryal inceleme ve kimlik doğrulamasına tabi olarak kabul edilmektedir.'}
            </p>
          </div>
        </section>

        {/* Editorial Methodology */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {isEnglish ? 'Editorial Methodology' : 'Editöryal Metodoloji'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Reference Standard' : 'Referans Standardı'}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'Content is authored in encyclopedic, declarative register. Promotional language, speculative framing, and advocacy are excluded.'
                  : 'İçerik ansiklopedik, beyan edici kayıtla yazılmaktadır. Tanıtım dili, spekülatif çerçeveleme ve savunuculuk hariç tutulur.'}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Primary Source Citation' : 'Birincil Kaynak Atfı'}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'All assertions are traceable to official government sources, statutes, or regulations. USCIS, IRS, and state authorities are cited directly.'
                  : 'Tüm iddialar resmi hükümet kaynaklarına, yasalara veya düzenlemelere kadar izlenebilir durumdadır. USCIS, IRS ve eyalet otoriteleri doğrudan atıfla belirtilir.'}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Native-Language Authorship' : 'Anadil Yazarlığı'}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'Content is authored by native speakers with command of legal terminology. Machine translation is not used. Currently published in English and Turkish.'
                  : 'İçerik, hukuki terminolojiye hakim anadili konuşanlar tarafından yazılmaktadır. Makine çevirisi kullanılmaz. Şu anda İngilizce ve Türkçe olarak yayınlanmaktadır.'}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                {isEnglish ? 'Temporal Provenance' : 'Zamansal Kaynak Takibi'}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'All entries carry publication and revision dates. Legal information is time-sensitive; the platform records when content was last verified.'
                  : 'Tüm girdiler yayın ve revizyon tarihleri taşır. Hukuki bilgiler zamana duyarlıdır; platform içeriğin en son ne zaman doğrulandığını kayıt altına alır.'}
              </p>
            </div>
          </div>
        </section>

        {/* Access Model */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Access Model' : 'Erişim Modeli'}
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'Templates and reference guides are available through a voluntary contribution model. The suggested contribution is $49. All materials remain accessible at no cost to maintain equitable access irrespective of financial circumstance.'
                : 'Şablonlar ve referans rehberleri gönüllü katkı modeli ile sunulmaktadır. Önerilen katkı payı 49$\'dır. Mali koşullardan bağımsız olarak eşit erişimi korumak amacıyla tüm materyaller ücretsiz olarak erişilebilir durumdadır.'}
            </p>
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'This model is structured for long-term operational sustainability. Voluntary contributions support continued open access. Content is identical regardless of payment status.'
                : 'Bu model uzun vadeli operasyonel sürdürülebilirlik için yapılandırılmıştır. Gönüllü katkılar açık erişimin devamını destekler. İçerik, ödeme durumundan bağımsız olarak aynıdır.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 border-t border-gray-200 pt-5">
            <span className="flex items-center gap-2">
              <span className="text-gray-400">&mdash;</span>
              {isEnglish ? 'No paywalls on information' : 'Bilgide ödeme duvarı yok'}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-gray-400">&mdash;</span>
              {isEnglish ? 'No mandatory registration' : 'Zorunlu kayıt yok'}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-gray-400">&mdash;</span>
              {isEnglish ? 'Uniform quality for all users' : 'Tüm kullanıcılar için aynı kalite'}
            </span>
          </div>
        </section>

        {/* Editorial Oversight */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Editorial Oversight' : 'Editöryal Gözetim'}
          </h2>
          <p className="text-gray-800 leading-relaxed">
            {isEnglish
              ? 'All legal content published on EchoLegal is reviewed for accuracy by a New York-licensed attorney with expertise in US immigration and business law.'
              : 'EchoLegal\'da yayınlanan tüm hukuki içerik, ABD göçmenlik ve iş hukuku konusunda uzmanlığa sahip New York lisanslı bir avukat tarafından doğruluk açısından incelenmektedir.'}
          </p>
        </section>

        {/* Limitations */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEnglish ? 'Limitations' : 'Sınırlamalar'}
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&mdash;</span>
              <p className="text-gray-800 leading-relaxed">
                <strong>{isEnglish ? 'Not legal advice.' : 'Hukuki tavsiye değildir.'}</strong>{' '}
                {isEnglish
                  ? 'Content is published for reference and educational purposes. It does not substitute consultation with a qualified attorney for matters of individual application.'
                  : 'İçerik referans ve eğitim amaçlı yayınlanmaktadır. Bireysel uygulama konularında nitelikli bir avukatla danışmanlığın yerini tutmaz.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&mdash;</span>
              <p className="text-gray-800 leading-relaxed">
                <strong>{isEnglish ? 'Not a law firm.' : 'Hukuk bürosu değildir.'}</strong>{' '}
                {isEnglish
                  ? 'EchoLegal does not represent clients, file documents, or provide individual legal services.'
                  : 'EchoLegal müvekkilleri temsil etmez, belge sunmaz veya bireysel hukuk hizmetleri sağlamaz.'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-0.5">&mdash;</span>
              <p className="text-gray-800 leading-relaxed">
                <strong>{isEnglish ? 'Not a referral service.' : 'Yönlendirme hizmeti değildir.'}</strong>{' '}
                {isEnglish
                  ? 'No commissions are received from attorneys or service providers. There is no financial incentive to recommend specific professionals.'
                  : 'Avukatlardan veya hizmet sağlayıcılardan komisyon alınmaz. Belirli profesyonelleri önerme konusunda herhangi bir mali teşvik bulunmaz.'}
              </p>
            </div>
          </div>
        </section>

        {/* Governance & Policies */}
        <section className="border-t border-gray-200 pt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            {isEnglish ? 'Governance & Policies' : 'Yönetişim ve Politikalar'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
            <Link
              href={`/${lang}/about/charter`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Institutional Charter' : 'Kurumsal Tüzük'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Mission, editorial independence, and governance structure' : 'Misyon, editöryal bağımsızlık ve yönetişim yapısı'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/editorial-policy`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Editorial Policy' : 'Editöryal Politika'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Standards for accuracy, sourcing, and review' : 'Doğruluk, kaynak kullanımı ve inceleme standartları'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/editorial-board`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Editorial Board' : 'Yayın Kurulu'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Reviewing attorneys and editorial team' : 'İnceleme avukatları ve editör ekibi'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/contributor-standards`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Contributor Standards' : 'Katkıda Bulunan Standartları'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Requirements for contributing attorneys' : 'Katkıda bulunan avukatlar için gereksinimler'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/corrections`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Corrections & Retractions' : 'Düzeltmeler ve Geri Çekmeler'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'How errors are handled and documented' : 'Hataların nasıl ele alınıp belgelendiği'}
              </span>
            </Link>
            <Link
              href={`/${lang}/about/citation-guide`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Citation Guide' : 'Atıf Rehberi'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'How to cite EchoLegal content' : 'EchoLegal içeriğine nasıl atıf yapılır'}
              </span>
            </Link>
            <Link
              href={`/${lang}/jurisdictions`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Jurisdictions' : 'Yargı Alanları'}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {isEnglish ? 'Legal jurisdictions currently covered' : 'Şu anda kapsanan hukuki yargı alanları'}
              </span>
            </Link>
            <Link
              href={`/${lang}/legal/disclaimer`}
              className="block p-5 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{isEnglish ? 'Legal Disclaimer' : 'Yasal Uyarı'}</span>
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
