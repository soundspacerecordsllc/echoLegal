import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Working as a Freelancer in the US: Legal Facts for Turks | EchoLegal'
    : 'ABD\'de Freelancer Olarak Çalışmak: Hukuki Gerçekler | EchoLegal'

  const description = isEnglish
    ? 'Essential legal guide for Turkish freelancers working with US clients. Taxes, contracts, payments, and compliance requirements explained.'
    : 'ABD müşterileriyle çalışan Türk freelancerlar için temel hukuki rehber. Vergiler, sözleşmeler, ödemeler ve uyum gereksinimleri açıklandı.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-freelancer-hukuki-rehber`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-freelancer-hukuki-rehber',
        'tr': 'https://echo-legal.com/tr/abd-freelancer-hukuki-rehber',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function FreelancerGuidePage({
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
    headline: isEnglish ? 'Working as a Freelancer in the US' : 'ABD\'de Freelancer Olarak Çalışmak',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Freelancer Guide' : 'Freelancer Rehberi'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Freelancing for US Clients: Legal Facts'
              : 'ABD\'de Freelancer Olarak Çalışmak'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The essential legal guide for Turkish freelancers working with American clients—from Turkey or anywhere in the world.'
              : 'Amerikan müşterilerle çalışan Türk freelancerlar için temel hukuki rehber—Türkiye\'den veya dünyanın herhangi bir yerinden.'}
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

          {/* Key Facts */}
          <div className="bg-[#C9A227]/10 border-2 border-[#C9A227] rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3">{isEnglish ? 'Key Facts for Turkish Freelancers' : 'Türk Freelancerlar İçin Önemli Gerçekler'}</h2>
            <ul className="space-y-2">
              {(isEnglish ? [
                'You DON\'T need a US visa to work remotely for US clients',
                'You DON\'T need to form a US company (but it can help)',
                'You DO need to fill out W-8BEN to avoid 30% tax withholding',
                'You DO need written contracts for legal protection',
                'You SHOULD report US income on your Turkish taxes',
              ] : [
                'ABD müşterileri için uzaktan çalışmak için ABD vizesine ihtiyacınız YOK',
                'ABD şirketi kurmanız gerekmiyor (ama yardımcı olabilir)',
                '%30 vergi kesintisinden kaçınmak için W-8BEN doldurmanız GEREKİYOR',
                'Hukuki koruma için yazılı sözleşmelere ihtiyacınız VAR',
                'ABD gelirini Türk vergilerinizde bildirmeniz GEREKİR',
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C9A227]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Do You Need US Company */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Do You Need a US Company?' : 'ABD Şirketine İhtiyacınız Var mı?'}</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="border border-green-200 rounded-lg p-5 bg-green-50">
                <h3 className="font-semibold text-green-900 mb-3">{isEnglish ? 'Work WITHOUT US Company' : 'ABD Şirketi OLMADAN Çalışın'}</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• {isEnglish ? 'Simpler setup - just fill W-8BEN' : 'Daha basit kurulum - sadece W-8BEN doldurun'}</li>
                  <li>• {isEnglish ? 'No US tax filings required' : 'ABD vergi dosyalaması gerekmez'}</li>
                  <li>• {isEnglish ? 'No annual fees or compliance costs' : 'Yıllık ücret veya uyum maliyeti yok'}</li>
                  <li>• {isEnglish ? 'Works fine for most freelancers' : 'Çoğu freelancer için iyi çalışır'}</li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-5 bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-3">{isEnglish ? 'Work WITH US Company (LLC)' : 'ABD Şirketiyle (LLC) Çalışın'}</h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• {isEnglish ? 'More professional appearance' : 'Daha profesyonel görünüm'}</li>
                  <li>• {isEnglish ? 'Easier to get US clients' : 'ABD müşterisi bulmak daha kolay'}</li>
                  <li>• {isEnglish ? 'Can accept US payment methods' : 'ABD ödeme yöntemlerini kabul edebilir'}</li>
                  <li>• {isEnglish ? 'US bank account possible' : 'ABD banka hesabı mümkün'}</li>
                  <li>• {isEnglish ? 'BUT: requires Form 5472 annually' : 'AMA: yıllık Form 5472 gerektirir'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="font-semibold text-yellow-900">{isEnglish ? 'Recommendation' : 'Öneri'}</p>
              <p className="text-yellow-800">
                {isEnglish
                  ? 'Start without a US company. Form an LLC only when you have steady US clients and the benefits outweigh the compliance costs ($500+/year).'
                  : 'ABD şirketi olmadan başlayın. Yalnızca düzenli ABD müşterileriniz olduğunda ve faydalar uyum maliyetlerini (yılda 500$+) aştığında bir LLC kurun.'}
              </p>
            </div>
          </section>

          {/* Tax Forms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Important Tax Forms' : 'Önemli Vergi Formları'}</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-2">W-8BEN</h3>
                <p className="text-gray-600 mb-3">
                  {isEnglish
                    ? 'The most important form for Turkish freelancers. It tells US clients you\'re a foreign person and can claim tax treaty benefits.'
                    : 'Türk freelancerlar için en önemli form. ABD müşterilerine yabancı bir kişi olduğunuzu ve vergi anlaşması avantajlarından yararlanabileceğinizi söyler.'}
                </p>
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Reduces 30% withholding' : '%30 stopajı azaltır'}</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Valid 3 years' : '3 yıl geçerli'}</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-2">1099-NEC / 1099-MISC</h3>
                <p className="text-gray-600 mb-3">
                  {isEnglish
                    ? 'US clients may send you this form if they paid you $600+. It reports your income to the IRS. You generally don\'t need to file US taxes if you\'re not a US person and have W-8BEN on file.'
                    : 'ABD müşterileri size 600$+ ödedilerse bu formu gönderebilir. Gelirinizi IRS\'e bildirir. ABD vatandaşı değilseniz ve dosyada W-8BEN varsa genellikle ABD vergisi dosyalamanız gerekmez.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-2">Form 5472 <span className="text-red-600 text-sm">{isEnglish ? '(If you have US LLC)' : '(ABD LLC\'niz varsa)'}</span></h3>
                <p className="text-gray-600 mb-3">
                  {isEnglish
                    ? 'ONLY if you form a US LLC. Annual filing required by April 15. $25,000 penalty for missing it. This is why many freelancers avoid forming US companies.'
                    : 'YALNIZCA ABD LLC kurarsanız. 15 Nisan\'a kadar yıllık dosyalama gereklidir. Kaçırma cezası 25.000$. Bu yüzden birçok freelancer ABD şirketi kurmaktan kaçınır.'}
                </p>
              </div>
            </div>
          </section>

          {/* Getting Paid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Getting Paid from US Clients' : 'ABD Müşterilerinden Ödeme Almak'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { method: 'Wise (TransferWise)', pros: 'Low fees, multi-currency, fast', cons: 'Limits for some countries' },
                { method: 'PayPal', pros: 'Widely accepted, instant', cons: 'Higher fees (2.9% + conversion)' },
                { method: 'Payoneer', pros: 'Good for marketplaces, virtual US account', cons: 'Fees can add up' },
                { method: 'Direct Wire Transfer', pros: 'For large amounts, no intermediary', cons: 'Bank fees both ends ($25-50)' },
                { method: 'US Bank Account (with LLC)', pros: 'ACH transfers, Zelle, lowest fees', cons: 'Requires US LLC' },
              ] : [
                { method: 'Wise (TransferWise)', pros: 'Düşük ücretler, çoklu para birimi, hızlı', cons: 'Bazı ülkeler için limitler' },
                { method: 'PayPal', pros: 'Yaygın kabul, anlık', cons: 'Daha yüksek ücretler (%2,9 + dönüşüm)' },
                { method: 'Payoneer', pros: 'Pazaryerleri için iyi, sanal ABD hesabı', cons: 'Ücretler birikebilir' },
                { method: 'Doğrudan Havale', pros: 'Büyük miktarlar için, aracı yok', cons: 'Her iki uçta banka ücretleri (25-50$)' },
                { method: 'ABD Banka Hesabı (LLC ile)', pros: 'ACH transferleri, Zelle, en düşük ücretler', cons: 'ABD LLC gerektirir' },
              ]).map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold">{item.method}</p>
                    <p className="text-green-600 text-sm">✓ {item.pros}</p>
                    <p className="text-red-600 text-sm">✗ {item.cons}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contract Essentials */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Contract Essentials' : 'Sözleşme Temelleri'}</h2>

            <p className="text-gray-600 mb-4">
              {isEnglish
                ? 'Never work without a written contract. At minimum, your agreement should include:'
                : 'Asla yazılı sözleşme olmadan çalışmayın. En azından, anlaşmanız şunları içermelidir:'}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {(isEnglish ? [
                'Scope of work (exactly what you\'ll deliver)',
                'Payment amount and schedule',
                'Payment method and currency (USD)',
                'Deadline and milestones',
                'Revision limits',
                'Intellectual property rights',
                'Termination clause',
                'Governing law (your preference)',
              ] : [
                'İş kapsamı (tam olarak ne teslim edeceğiniz)',
                'Ödeme miktarı ve takvimi',
                'Ödeme yöntemi ve para birimi (USD)',
                'Son tarih ve kilometre taşları',
                'Revizyon sınırları',
                'Fikri mülkiyet hakları',
                'Fesih maddesi',
                'Geçerli hukuk (tercihiniz)',
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                  <span className="text-[#C9A227]">✓</span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Common Mistakes to Avoid' : 'Kaçınılması Gereken Yaygın Hatalar'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { mistake: 'Not filling out W-8BEN', consequence: 'Client withholds 30% of your payment and sends it to IRS' },
                { mistake: 'Working without contracts', consequence: 'No legal recourse if client doesn\'t pay' },
                { mistake: 'Ignoring Turkish tax obligations', consequence: 'You still owe taxes in Turkey on worldwide income' },
                { mistake: 'Using personal accounts for business', consequence: 'Makes accounting messy, potential tax issues' },
                { mistake: 'Forming US LLC without understanding compliance', consequence: '$25,000 penalty for missing Form 5472' },
              ] : [
                { mistake: 'W-8BEN doldurmamak', consequence: 'Müşteri ödemenizin %30\'unu keser ve IRS\'e gönderir' },
                { mistake: 'Sözleşme olmadan çalışmak', consequence: 'Müşteri ödemezse hukuki başvuru yok' },
                { mistake: 'Türkiye vergi yükümlülüklerini görmezden gelmek', consequence: 'Dünya çapındaki gelir üzerinden hâlâ Türkiye\'de vergi borcunuz var' },
                { mistake: 'İş için kişisel hesapları kullanmak', consequence: 'Muhasebeyi karmaşıklaştırır, potansiyel vergi sorunları' },
                { mistake: 'Uyumu anlamadan ABD LLC kurmak', consequence: 'Form 5472\'yi kaçırmak için 25.000$ ceza' },
              ]).map((item, i) => (
                <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-800">✗ {item.mistake}</p>
                  <p className="text-red-700 text-sm mt-1">→ {item.consequence}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/w-8ben-formu-nasil-doldurulur`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Fill Out W-8BEN →' : 'W-8BEN Nasıl Doldurulur →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service-agreement-neden-gerekli`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Why You Need a Service Agreement →' : 'Neden Service Agreement Gerekli →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/encyclopedia/freelancer-legal-guide`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete Freelancer Legal Handbook →' : 'Eksiksiz Freelancer Hukuk El Kitabı →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
