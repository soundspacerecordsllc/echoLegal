import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "What This Platform Does and Does Not Do | EchoLegal"
      : "Platformun Kapsamı ve Sınırları | EchoLegal",
    description: isEnglish
      ? "Clear explanation of EchoLegal's scope, limitations, and what you can expect from this legal reference platform."
      : "EchoLegal'in kapsamı, sınırları ve bu hukuk referans platformundan neler bekleyebileceğiniz hakkında açık bilgilendirme.",
  }
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'What This Platform Does' : 'Platformun Kapsamı ve Sınırları' }
          ]}
        />

        <TrustStrip lang={lang} />

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish ? "What This Platform Does and Does Not Do" : "Platformun Kapsamı ve Sınırları"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified: January 2026' : 'Son doğrulama: Ocak 2026'}
        </p>

        {/* Core Statement */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            {isEnglish
              ? "EchoLegal is a legal reference and template platform. It provides general legal information and self-serve document templates. It does not provide individual legal representation, consultation, or case-specific advice."
              : "EchoLegal, bir hukuk referans ve şablon platformudur. Genel hukuki bilgi ile kullanıcıların kendi başına yararlanabileceği belge şablonları sunar. Bireysel hukuki temsil, danışmanlık veya somut bir dosyaya yönelik tavsiye vermez."}
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'What This Platform Provides' : 'Platformun Sunduğu Hizmetler'}
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'General Legal Information' : 'Genel Hukuki Bilgi'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "Educational content about legal concepts, processes, and requirements. Written in plain language for understanding, not advice."
                    : "Hukuki kavramlar, süreçler ve yükümlülükler hakkında bilgilendirici içerik. Hukuki tavsiye vermek amacıyla değil, konuyu anlaşılır kılmak amacıyla sade bir dille kaleme alınmıştır."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'Document Templates' : 'Belge Şablonları'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "Bilingual contract templates (NDA, Service Agreement, etc.) for self-serve use. Templates require customization for your specific situation."
                    : "Kullanıcıların doğrudan yararlanabileceği iki dilli sözleşme şablonları (NDA, Hizmet Sözleşmesi vb.). Şablonlar, somut durumunuza göre uyarlanmalıdır."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'Procedural Checklists' : 'Süreç Kontrol Listeleri'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "General checklists for common procedures (consular services, business formation steps). Not a substitute for official requirements."
                    : "Yaygın işlemler için genel kontrol listeleri (konsolosluk hizmetleri, şirket kuruluş adımları). Resmî gerekliliklerin yerini almaz."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'Bilingual Access' : 'İki Dilli Erişim'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "Content available in both English and Turkish for Turkish citizens navigating US legal systems."
                    : "ABD hukuk sistemini anlamak isteyen Türk vatandaşlarına yönelik, Türkçe ve İngilizce olarak sunulan içerik."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'What This Platform Does NOT Provide' : 'Platformun Sunmadığı Hizmetler'}
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Legal Representation' : 'Hukuki Temsil'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "No attorney-client relationship is formed through this platform. We do not represent individuals in any legal matter."
                    : "Bu platform üzerinden avukat-müvekkil ilişkisi kurulmaz. Hiçbir hukuki konuda bireysel temsil hizmeti verilmez."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Case-Specific Advice' : 'Somut Dosyaya Yönelik Tavsiye'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We cannot evaluate your specific situation or tell you what to do. General information is not a substitute for individual legal advice."
                    : "Bireysel durumunuzu değerlendirmemiz veya ne yapmanız gerektiğini söylememiz mümkün değildir. Genel bilgi, kişiye özel hukuki danışmanlığın yerini tutamaz."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Consultations or Intake' : 'Danışmanlık veya Dosya Kabulü'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We do not offer consultations, case reviews, or take on clients. This is a reference platform only."
                    : "Danışmanlık görüşmesi, dosya incelemesi veya müvekkil kabulü yapılmaz. Bu platform yalnızca referans amaçlıdır."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Immigration Services' : 'Göçmenlik Hizmetleri'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We do not prepare visa applications, represent clients before USCIS, or provide immigration consultations."
                    : "Vize başvurusu hazırlanmaz, USCIS nezdinde temsil yapılmaz ve göçmenlik danışmanlığı verilmez."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Tax Filing Services' : 'Vergi Beyanname Hizmetleri'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We provide general tax information only. We do not prepare tax returns or provide tax planning advice."
                    : "Yalnızca genel vergi bilgisi sunulmaktadır. Vergi beyannamesi hazırlama veya vergi planlaması danışmanlığı hizmeti verilmez."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use This Platform */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'How to Use This Platform' : 'Bu Platform Nasıl Kullanılmalı'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "Use this platform to educate yourself about legal concepts and processes. The information here can help you understand what questions to ask, what procedures exist, and what documents you might need."
                : "Bu platformu, hukuki kavramları ve süreçleri öğrenmek amacıyla kullanabilirsiniz. Buradaki bilgiler, hangi soruları sormanız gerektiğini, hangi prosedürlerin mevcut olduğunu ve hangi belgelere ihtiyaç duyabileceğinizi anlamanıza yardımcı olur."}
            </p>
            <p>
              {isEnglish
                ? "For matters that affect your legal rights, business decisions, or immigration status, consult with a licensed attorney who can evaluate your specific circumstances."
                : "Hukuki haklarınızı, ticari kararlarınızı veya göçmenlik statünüzü doğrudan etkileyen konularda, bireysel koşullarınızı değerlendirebilecek lisanslı bir avukata başvurmanızı öneriyoruz."}
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'About This Platform' : 'Platform Hakkında'}
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? "EchoLegal content is prepared under the supervision of Zeynep Ruziye Moore, licensed in New York."
                : "EchoLegal içeriği, New York Barosu'na kayıtlı Zeynep Ruziye Moore gözetiminde hazırlanmaktadır."}
            </p>
            <p className="text-gray-700">
              {isEnglish
                ? "This platform exists because reliable, bilingual legal information is difficult to find. The goal is to help people understand legal frameworks before they act - not to replace professional advice when it's needed."
                : "Bu platform, güvenilir ve iki dilli hukuki bilgiye erişimin güç olduğu bir ihtiyaçtan doğmuştur. Amacımız, kişilerin harekete geçmeden önce hukuki çerçeveyi kavramalarına katkı sağlamaktır; profesyonel hukuki danışmanlığın yerini almak değil."}
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Explore the Platform' : 'Platformu Keşfedin'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/${lang}/amerika`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Amerika Hub' : 'Amerika'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/consular-documents`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Consular Services' : 'Konsolosluk Hizmetleri'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/legal/disclaimer`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Full Legal Disclaimer' : 'Hukuki Sorumluluk Reddi Beyanı'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amacıyla hazırlanmış olup hukuki danışmanlık niteliği taşımaz.'}
          </p>
        </div>
    </main>
  )
}
