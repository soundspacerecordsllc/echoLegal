// components/FeaturedSnippet.tsx
// Short answer block optimized for Google Featured Snippets
// 40-60 words, neutral definition-style language

type Props = {
  answer: {
    en: string
    tr: string
  }
  lang: 'en' | 'tr'
  className?: string
}

export function FeaturedSnippet({ answer, lang, className = '' }: Props) {
  return (
    <div className={`bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg ${className}`}>
      <p className="text-gray-800 leading-relaxed">
        {answer[lang]}
      </p>
    </div>
  )
}

// Pre-defined featured snippets for high-intent pages
export const featuredSnippets: Record<string, { en: string; tr: string }> = {
  'abd-de-llc-kurmak-turkler-icin-adim-adim': {
    en: 'A Limited Liability Company (LLC) is a US business structure that provides personal liability protection while allowing flexible tax treatment. Turkish entrepreneurs can form a US LLC remotely without visiting the US, typically in states like Wyoming, Delaware, or New Mexico. Formation costs range from $50-$500 depending on the state.',
    tr: 'Limited Liability Company (LLC), kişisel sorumluluk koruması sağlarken esnek vergi uygulamasına izin veren bir ABD iş yapısıdır. Türk girişimciler, ABD\'yi ziyaret etmeden Wyoming, Delaware veya New Mexico gibi eyaletlerde uzaktan LLC kurabilir. Kuruluş maliyetleri eyalete bağlı olarak 50-500$ arasında değişir.',
  },
  'ein-itin-ssn-farki': {
    en: 'EIN (Employer Identification Number) is a tax ID for US businesses, obtained free from the IRS. ITIN (Individual Taxpayer Identification Number) is for individuals without SSN eligibility who need to file US taxes. SSN (Social Security Number) is only for US citizens, permanent residents, and work-authorized individuals.',
    tr: 'EIN (Employer Identification Number), IRS\'den ücretsiz alınan ABD işletmeleri için vergi kimliğidir. ITIN (Individual Taxpayer Identification Number), SSN almaya uygun olmayan ve ABD vergisi beyan etmesi gereken bireyler içindir. SSN (Social Security Number) yalnızca ABD vatandaşları, daimi yerleşikler ve çalışma izni olan kişiler içindir.',
  },
  'irs-vergiler-ve-w8-w9-gercekleri': {
    en: 'W-8BEN is a tax form for non-US persons to certify foreign status and claim tax treaty benefits, avoiding 30% withholding. W-9 is for US persons only. Turkish freelancers and businesses working with US clients should provide W-8BEN (individuals) or W-8BEN-E (entities) to their US payers.',
    tr: 'W-8BEN, ABD dışı kişilerin yabancı statüsünü onaylaması ve %30 stopajı önlemek için vergi anlaşması avantajlarından yararlanması için kullanılan bir vergi formudur. W-9 yalnızca ABD kişileri içindir. ABD müşterileriyle çalışan Türk serbest çalışanlar ve işletmeler, ABD ödeme yapanlarına W-8BEN (bireyler) veya W-8BEN-E (kuruluşlar) sağlamalıdır.',
  },
  'abdde-banka-hesabi-acmak': {
    en: 'Non-US residents can open US business bank accounts through neobanks like Mercury or Relay without visiting the US. Requirements include: active US LLC, EIN from IRS, Operating Agreement, and valid passport. Traditional banks typically require in-person visits. Account opening takes 1-7 business days.',
    tr: 'ABD\'de yaşamayan kişiler, ABD\'yi ziyaret etmeden Mercury veya Relay gibi neobankalar aracılığıyla ABD iş bankası hesabı açabilir. Gereksinimler: aktif ABD LLC, IRS\'den EIN, Operating Agreement ve geçerli pasaport. Geleneksel bankalar genellikle yüz yüze ziyaret gerektirir. Hesap açma 1-7 iş günü sürer.',
  },
  'abd-satis-vergisi-rehberi': {
    en: 'US sales tax applies when you have "nexus" (connection) with a state—through physical presence or exceeding economic thresholds (typically $100,000 in sales or 200 transactions). After South Dakota v. Wayfair (2018), remote sellers must collect sales tax in states where they have economic nexus.',
    tr: 'ABD satış vergisi, bir eyaletle "nexus" (bağlantı) olduğunda uygulanır—fiziksel varlık veya ekonomik eşikleri aşma (genellikle 100.000$ satış veya 200 işlem). South Dakota v. Wayfair (2018) kararından sonra, uzak satıcılar ekonomik nexus\'a sahip oldukları eyaletlerde satış vergisi toplamalıdır.',
  },
  'abd-odemeleri-alma-rehberi': {
    en: 'Turkish freelancers can receive US payments through Stripe, PayPal, or Wise. Wise offers the lowest fees for large invoices (0.7% conversion). To avoid 30% withholding, provide W-8BEN form to US clients. The US-Turkey tax treaty reduces withholding to 0% for most service fees.',
    tr: 'Türk serbest çalışanlar, ABD ödemelerini Stripe, PayPal veya Wise aracılığıyla alabilir. Wise, büyük faturalar için en düşük ücretleri sunar (%0,7 dönüşüm). %30 stopajı önlemek için ABD müşterilerine W-8BEN formu sağlayın. ABD-Türkiye vergi anlaşması, çoğu hizmet ücreti için stopajı %0\'a düşürür.',
  },
  'llc-mi-corporation-mi': {
    en: 'LLCs offer flexibility and pass-through taxation, ideal for small businesses and solo founders. Corporations provide structure for raising investment (C-Corp) or tax optimization (S-Corp, US persons only). Most Turkish entrepreneurs start with an LLC due to simplicity and lower compliance costs.',
    tr: 'LLC\'ler esneklik ve geçişli vergilendirme sunar, küçük işletmeler ve solo kurucular için idealdir. Corporation\'lar yatırım toplama (C-Corp) veya vergi optimizasyonu (S-Corp, yalnızca ABD kişileri) için yapı sağlar. Çoğu Türk girişimci, basitlik ve düşük uyum maliyetleri nedeniyle LLC ile başlar.',
  },
  'ds-160-rehberi': {
    en: 'DS-160 is the online nonimmigrant visa application required for US visa appointments. Complete it accurately—inconsistencies lead to denials. Key sections: travel history, employment, family information. Save frequently and note your Application ID. The confirmation page is required for your consulate interview.',
    tr: 'DS-160, ABD vize randevuları için gereken online göçmen olmayan vize başvurusudur. Doğru doldurun—tutarsızlıklar redde yol açar. Önemli bölümler: seyahat geçmişi, istihdam, aile bilgileri. Sık sık kaydedin ve Başvuru Numaranızı not edin. Onay sayfası konsolosluk mülakatınız için gereklidir.',
  },
}

export function getFeaturedSnippet(slug: string): { en: string; tr: string } | undefined {
  return featuredSnippets[slug]
}
