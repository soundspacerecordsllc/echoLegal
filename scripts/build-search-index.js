/**
 * Build Search Index Script
 * Generates /public/search-index.json from existing content
 * Run: node scripts/build-search-index.js
 */

const fs = require('fs');
const path = require('path');

// Content registry - manually maintained list of all searchable pages
const searchableContent = {
  contracts: [
    {
      slug: 'nda',
      titleEn: 'Non-Disclosure Agreement (NDA)',
      titleTr: 'Gizlilik Sözleşmesi (NDA)',
      descriptionEn: 'Protect confidential business information in partnerships and negotiations.',
      descriptionTr: 'Ortaklıklarda ve müzakerelerde gizli iş bilgilerini koruyun.',
      category: 'contract',
      jurisdiction: 'US/Turkey',
      keywords: ['nda', 'confidentiality', 'gizlilik', 'non-disclosure', 'trade secret', 'ticari sır'],
    },
    {
      slug: 'service-agreement',
      titleEn: 'Service Agreement',
      titleTr: 'Hizmet Sözleşmesi',
      descriptionEn: 'Professional contract for service providers and clients. Define scope, payment, and deliverables.',
      descriptionTr: 'Hizmet sağlayıcılar ve müşteriler için profesyonel sözleşme. Kapsam, ödeme ve teslimatları tanımlayın.',
      category: 'contract',
      jurisdiction: 'US/Turkey',
      keywords: ['service', 'hizmet', 'provider', 'client', 'scope', 'payment'],
    },
    {
      slug: 'freelance-agreement',
      titleEn: 'Freelance Service Agreement',
      titleTr: 'Serbest Çalışan Hizmet Sözleşmesi',
      descriptionEn: 'Professional contract for freelancers and their clients.',
      descriptionTr: 'Serbest çalışanlar ve müşterileri için profesyonel sözleşme.',
      category: 'contract',
      jurisdiction: 'US/Turkey',
      keywords: ['freelance', 'serbest', 'freelancer', 'contractor', 'gig'],
    },
    {
      slug: 'independent-contractor',
      titleEn: 'Independent Contractor Agreement',
      titleTr: 'Bağımsız Yüklenici Sözleşmesi',
      descriptionEn: 'Establish clear terms for contractor relationships. Avoid misclassification issues.',
      descriptionTr: 'Yüklenici ilişkileri için net şartlar belirleyin. Yanlış sınıflandırma sorunlarından kaçının.',
      category: 'contract',
      jurisdiction: 'US/Turkey',
      keywords: ['contractor', 'yüklenici', 'independent', 'bağımsız', '1099', 'IRS', 'misclassification'],
    },
    {
      slug: 'influencer-agreement',
      titleEn: 'Influencer / Brand Agreement',
      titleTr: 'Influencer / Marka Sözleşmesi',
      descriptionEn: 'Collaboration agreement between content creators and brands.',
      descriptionTr: 'İçerik üreticileri ve markalar arasında işbirliği sözleşmesi.',
      category: 'contract',
      jurisdiction: 'US/Turkey',
      keywords: ['influencer', 'brand', 'marka', 'social media', 'sosyal medya', 'collaboration'],
    },
    {
      slug: 'privacy-policy',
      titleEn: 'Privacy Policy',
      titleTr: 'Gizlilik Politikası',
      descriptionEn: 'GDPR and CCPA compliant privacy policy for websites and apps.',
      descriptionTr: 'Web siteleri ve uygulamalar için KVKK uyumlu gizlilik politikası.',
      category: 'contract',
      jurisdiction: 'US/Turkey/EU',
      keywords: ['privacy', 'gizlilik', 'GDPR', 'CCPA', 'KVKK', 'data protection', 'veri koruma'],
    },
    {
      slug: 'terms-of-service',
      titleEn: 'Terms of Service',
      titleTr: 'Kullanım Koşulları',
      descriptionEn: 'Terms and conditions for websites, apps, and online services.',
      descriptionTr: 'Web siteleri, uygulamalar ve online hizmetler için kullanım şartları.',
      category: 'contract',
      jurisdiction: 'US/Turkey',
      keywords: ['terms', 'koşullar', 'conditions', 'website', 'app', 'uygulama'],
    },
  ],
  encyclopedia: [
    {
      slug: 'common-misconceptions',
      titleEn: 'Common Legal Misconceptions',
      titleTr: 'Yaygın Yanlış Varsayımlar',
      descriptionEn: 'LLCs, immigration, taxes, and contracts—what people get wrong.',
      descriptionTr: 'LLC, göçmenlik, vergiler ve sözleşmeler hakkında yaygın yanlışlar.',
      category: 'article',
      keywords: ['LLC', 'visa', 'vize', 'immigration', 'göçmenlik', 'tax', 'vergi', 'Delaware', 'misconception'],
    },
    {
      slug: 'what-is-nda',
      titleEn: 'What is an NDA?',
      titleTr: 'NDA Nedir?',
      descriptionEn: 'Everything you need to know about Non-Disclosure Agreements.',
      descriptionTr: 'Gizlilik Sözleşmeleri hakkında bilmeniz gereken her şey.',
      category: 'article',
      keywords: ['nda', 'confidentiality', 'gizlilik', 'agreement', 'sözleşme', 'types', 'clauses'],
    },
    {
      slug: 'contractor-vs-employee',
      titleEn: 'Contractor vs Employee: Complete Classification Guide',
      titleTr: 'Bağımsız Yüklenici mi, İşçi mi: Kapsamlı Sınıflandırma Rehberi',
      descriptionEn: 'The definitive guide to worker classification covering IRS tests, ABC test, economic reality test, and misclassification risks.',
      descriptionTr: 'İşçi statüsü belirleme rehberi: IRS testleri, ABC testi, ekonomik gerçeklik testi ve yanlış sınıflandırma riskleri.',
      category: 'article',
      keywords: ['contractor', 'employee', 'worker classification', 'IRS test', 'ABC test', 'misclassification', 'employment law'],
    },
    {
      slug: 'freelancer-legal-guide',
      titleEn: 'Freelancer Legal Guide',
      titleTr: 'Serbest Çalışan Hukuk Rehberi',
      descriptionEn: 'Comprehensive legal guide for freelancers covering contracts, taxes, intellectual property, and liability protection.',
      descriptionTr: 'Serbest çalışanlar için sözleşmeler, vergiler, fikri mülkiyet ve sorumluluk koruması rehberi.',
      category: 'article',
      keywords: ['freelancer', 'serbest çalışan', 'independent contractor', 'self-employment tax', 'intellectual property', 'liability'],
    },
    {
      slug: 'privacy-policy-guide',
      titleEn: 'Do I Need a Privacy Policy? GDPR, CCPA & KVKK Explained',
      titleTr: 'Gizlilik Politikasına İhtiyacım Var mı? GDPR, CCPA ve KVKK Açıklaması',
      descriptionEn: 'Complete guide to privacy policy requirements under GDPR, CCPA, KVKK, and other data protection laws.',
      descriptionTr: 'GDPR, CCPA, KVKK ve diğer veri koruma yasaları kapsamında gizlilik politikası gereksinimlerinin tam rehberi.',
      category: 'article',
      keywords: ['privacy policy', 'gizlilik politikası', 'GDPR', 'CCPA', 'KVKK', 'data protection', 'veri koruma'],
    },
  ],
  consular: [
    {
      slug: 'pasaport',
      titleEn: 'Passport Services',
      titleTr: 'Pasaport İşlemleri',
      descriptionEn: 'New passport application, renewal, and lost passport procedures.',
      descriptionTr: 'Yeni pasaport başvurusu, yenileme ve kayıp pasaport işlemleri.',
      category: 'consular',
      keywords: ['passport', 'pasaport', 'renewal', 'yenileme', 'consulate', 'konsolosluk'],
    },
    {
      slug: 'tc-kimlik',
      titleEn: 'Turkish ID Card',
      titleTr: 'T.C. Kimlik Kartı',
      descriptionEn: 'Turkish ID card application and renewal at consulates.',
      descriptionTr: 'Konsolosluklarda T.C. kimlik kartı başvurusu ve yenileme.',
      category: 'consular',
      keywords: ['kimlik', 'ID', 'Turkish', 'Türk', 'nüfus', 'population'],
    },
    {
      slug: 'vekaletname',
      titleEn: 'Power of Attorney (Notary)',
      titleTr: 'Vekaletname (Noter)',
      descriptionEn: 'Notarized power of attorney for legal and financial matters in Turkey.',
      descriptionTr: 'Türkiye\'deki hukuki ve mali işlemler için noter onaylı vekaletname.',
      category: 'consular',
      keywords: ['vekaletname', 'power of attorney', 'noter', 'notary', 'vekil'],
    },
    {
      slug: 'dogum-tescili',
      titleEn: 'Birth Registration',
      titleTr: 'Doğum Tescili',
      descriptionEn: 'Register a birth with Turkish authorities through the consulate.',
      descriptionTr: 'Konsolosluk aracılığıyla Türk makamlarına doğum kaydı.',
      category: 'consular',
      keywords: ['birth', 'doğum', 'registration', 'tescil', 'baby', 'bebek', 'nüfus'],
    },
    {
      slug: 'evlilik-tescili',
      titleEn: 'Marriage Registration',
      titleTr: 'Evlilik Tescili',
      descriptionEn: 'Register your marriage with Turkish authorities.',
      descriptionTr: 'Evliliğinizi Türk makamlarına kaydetme.',
      category: 'consular',
      keywords: ['marriage', 'evlilik', 'wedding', 'düğün', 'registration', 'tescil'],
    },
    {
      slug: 'olum-tescili',
      titleEn: 'Death Registration',
      titleTr: 'Ölüm Tescili',
      descriptionEn: 'Register a death with Turkish authorities.',
      descriptionTr: 'Vefatı Türk makamlarına kaydetme.',
      category: 'consular',
      keywords: ['death', 'ölüm', 'vefat', 'registration', 'tescil'],
    },
    {
      slug: 'nufus-kayit',
      titleEn: 'Population Registry',
      titleTr: 'Nüfus Kayıt Örneği',
      descriptionEn: 'Obtain certified population registry records.',
      descriptionTr: 'Onaylı nüfus kayıt örneği alma.',
      category: 'consular',
      keywords: ['nüfus', 'population', 'registry', 'kayıt', 'certificate', 'belge'],
    },
    {
      slug: 'belge-onay',
      titleEn: 'Document Certification',
      titleTr: 'Belge Onayı',
      descriptionEn: 'Apostille and document certification services.',
      descriptionTr: 'Apostil ve belge onay hizmetleri.',
      category: 'consular',
      keywords: ['apostille', 'certification', 'onay', 'document', 'belge', 'tasdik'],
    },
  ],
  library: [
    {
      slug: 'hukuki-yanilgilar',
      titleEn: 'Common Legal Misconceptions About US Business',
      titleTr: 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları',
      descriptionEn: 'Facts vs. myths about doing business in the United States covering LLC formation, taxes, banking, and immigration.',
      descriptionTr: 'ABD\'de iş yapma hakkında gerçekler ve mitler: LLC kurulumu, vergiler, bankacılık ve göçmenlik.',
      category: 'library',
      keywords: ['legal misconceptions', 'hukuki hatalar', 'LLC myths', 'US business', 'tax myths', 'banking'],
    },
    {
      slug: 'irs-vergi-gercekleri',
      titleEn: 'IRS, Taxes & Form Realities: W-8, W-9, 1099 Explained',
      titleTr: 'IRS, Vergi ve Form Gerçekleri: W-8, W-9, 1099 Açıklamalı',
      descriptionEn: 'Plain-language guide to US tax forms for non-US entrepreneurs covering W-8BEN, W-9, 1099-NEC, and withholding tax.',
      descriptionTr: 'ABD dışından girişimcilere yönelik ABD vergi formları rehberi: W-8BEN, W-9, 1099-NEC ve stopaj vergisi.',
      category: 'library',
      keywords: ['IRS', 'W-8BEN', 'W-9', '1099', 'tax forms', 'vergi formları', 'withholding tax', 'FATCA'],
    },
    {
      slug: 'llc-kurma-rehberi',
      titleEn: 'LLC Formation in the US: What You Need to Know',
      titleTr: 'ABD\'de LLC Kurmak: Bilmeniz Gerekenler',
      descriptionEn: 'Comprehensive reference guide to LLC formation covering state selection, formation process, tax implications, and common misconceptions.',
      descriptionTr: 'LLC kurulumu hakkında kapsamlı rehber: eyalet seçimi, kuruluş süreci, vergisel etkiler ve yaygın yanılgılar.',
      category: 'library',
      keywords: ['LLC', 'limited liability company', 'business formation', 'Delaware', 'Wyoming', 'EIN', 'state selection'],
    },
    {
      slug: 'llc-vize-yanilgisi',
      titleEn: 'LLC Does Not Equal Visa: Immigration Realities for Business Owners',
      titleTr: 'LLC Kurmak Vize Vermez: İş Sahipleri İçin Göçmenlik Gerçekleri',
      descriptionEn: 'Why forming a US LLC does not grant any visa or immigration benefit. The separation between business formation and immigration law.',
      descriptionTr: 'LLC kurmanın neden vize veya göçmenlik hakkı sağlamadığı: şirket kuruluşu ve göçmenlik hukuku ayrımı.',
      category: 'library',
      keywords: ['LLC', 'visa', 'vize', 'immigration', 'göçmenlik', 'E-2', 'work authorization', 'visa myths'],
    },
    {
      slug: 'temel-sozlesmeler',
      titleEn: 'Essential Contracts for Turkish Entrepreneurs in the US',
      titleTr: 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler',
      descriptionEn: 'Guide to must-have legal documents for business including NDAs, Service Agreements, Privacy Policies, and Terms of Service.',
      descriptionTr: 'İş yapanlar için olmazsa olmaz hukuki belgeler: NDA, Hizmet Sözleşmeleri, Gizlilik Politikaları ve Kullanım Koşulları.',
      category: 'library',
      keywords: ['contracts', 'sözleşmeler', 'NDA', 'service agreement', 'hizmet sözleşmesi', 'business documents'],
    },
  ],
  checklists: [
    {
      slug: 'bank-account-checklist',
      titleEn: 'US Bank Account Checklist',
      titleTr: 'ABD Banka Hesabı Açmadan Önce Bilmen Gerekenler',
      descriptionEn: 'Documents and requirements for opening a US business bank account as a non-resident.',
      descriptionTr: 'Yabancı olarak ABD iş bankası hesabı açmak için gerekli belgeler ve şartlar.',
      category: 'checklist',
      keywords: ['bank account', 'banka hesabı', 'business banking', 'Mercury', 'Relay', 'non-resident'],
    },
    {
      slug: 'irs-mektup-rehberi',
      titleEn: 'IRS Letter Guide',
      titleTr: 'IRS Mektubu Rehberi',
      descriptionEn: 'General facts to understand when you receive a letter from the IRS. Reference for international entrepreneurs.',
      descriptionTr: 'IRS\'ten mektup aldığınızda anlamanız gereken genel gerçekler. Uluslararası girişimciler için referans.',
      category: 'checklist',
      keywords: ['IRS', 'letters', 'mektup', 'notices', 'correspondence', 'tax'],
    },
    {
      slug: 'llc-checklist',
      titleEn: 'US LLC Formation Checklist',
      titleTr: 'ABD LLC Kurulum Kontrol Listesi',
      descriptionEn: 'Everything you need before forming a US LLC. State selection, documents, costs, and timeline.',
      descriptionTr: 'ABD\'de LLC kurmadan önce bilmeniz gereken her şey. Eyalet seçimi, belgeler, maliyetler ve zaman çizelgesi.',
      category: 'checklist',
      keywords: ['LLC formation', 'LLC kurulumu', 'Delaware', 'Wyoming', 'EIN', 'Articles of Organization'],
    },
    {
      slug: 'llc-kontrol-listesi',
      titleEn: 'Before Forming a US LLC',
      titleTr: 'ABD\'de LLC Kurmadan Önce',
      descriptionEn: 'Key questions to consider before starting the LLC formation process.',
      descriptionTr: 'LLC kurulum sürecini başlatmadan önce düşünülmesi gereken temel sorular.',
      category: 'checklist',
      keywords: ['LLC', 'kontrol listesi', 'formation planning', 'tax implications', 'registered agent', 'EIN'],
    },
    {
      slug: 'tax-documents-checklist',
      titleEn: 'US Tax Documents Checklist',
      titleTr: 'ABD Vergi Belgeleri: İlk Yıl Checklist',
      descriptionEn: 'Essential US tax documents for your first year with a US LLC. EIN, W-8BEN, 1099s, and more.',
      descriptionTr: 'ABD LLC\'nizin ilk yılı için temel vergi belgeleri. EIN, W-8BEN, 1099\'lar ve daha fazlası.',
      category: 'checklist',
      keywords: ['tax documents', 'vergi belgeleri', 'EIN', 'W-8BEN', '1099', 'tax forms', 'tax filing'],
    },
    {
      slug: 'w8-w9-karar-haritasi',
      titleEn: 'W-8 or W-9? Decision Tool',
      titleTr: 'W-8 mi W-9 mu? Karar Aracı',
      descriptionEn: 'Determine which US tax form you need: W-9, W-8BEN, or W-8BEN-E. Covers US person status, treaty benefits, and FATCA.',
      descriptionTr: 'Hangi ABD vergi formuna ihtiyacınız olduğunu belirleyin: W-9, W-8BEN veya W-8BEN-E.',
      category: 'checklist',
      keywords: ['W-9', 'W-8BEN', 'W-8BEN-E', 'tax forms', 'vergi formları', 'FATCA', 'treaty benefits', 'withholding'],
    },
  ],
  amerika: [
    {
      slug: 'abd-ye-gelmeden-once',
      titleEn: 'Before Arriving in the US: Legal Readiness Checklist',
      titleTr: 'ABD\'ye Gelmeden Önce Yapılması Gerekenler',
      descriptionEn: 'Essential legal preparation checklist for Turkish entrepreneurs before arriving in the United States.',
      descriptionTr: 'Türk girişimcilerin ABD\'ye gelmeden önce tamamlaması gereken hukuki hazırlıklar.',
      category: 'amerika',
      keywords: ['pre-arrival', 'ABD hazırlık', 'legal checklist', 'business formation', 'tax compliance'],
    },
    {
      slug: 'abdde-banka-hesabi',
      titleEn: 'US Bank Account: Opening Business & Personal Accounts',
      titleTr: 'ABD\'de Banka Hesabı: İş ve Kişisel Hesap Açma',
      descriptionEn: 'How to open a US bank account as a non-resident. EIN/ITIN requirements, FBAR obligations, and common challenges.',
      descriptionTr: 'Yerleşik olmayan biri olarak ABD banka hesabı nasıl açılır. EIN/ITIN gereksinimleri ve FBAR yükümlülükleri.',
      category: 'amerika',
      keywords: ['bank account', 'banka hesabı', 'EIN', 'ITIN', 'FBAR', 'non-resident', 'Mercury'],
    },
    {
      slug: 'abdde-is-yapanlar-icin-sozlesmeler',
      titleEn: 'Contracts for Doing Business in the US',
      titleTr: 'ABD\'de Ticari Faaliyet İçin Gerekli Sözleşmeler',
      descriptionEn: 'Guide to US business contracts: types, key clauses, red flags, and international enforcement.',
      descriptionTr: 'ABD\'de ticari sözleşmelere ilişkin rehber: sözleşme türleri, kritik hükümler ve uluslararası tenfiz.',
      category: 'amerika',
      keywords: ['contracts', 'sözleşmeler', 'NDA', 'service agreement', 'governing law', 'arbitration'],
    },
    {
      slug: 'abdde-llc-kurmak',
      titleEn: 'Forming an LLC in the US: Complete Guide',
      titleTr: 'ABD\'de LLC Kurmak: Kapsamlı Rehber',
      descriptionEn: 'Comprehensive guide to forming a US LLC. State comparison, formation steps, Operating Agreement, EIN, and compliance.',
      descriptionTr: 'ABD\'de LLC kurulumuna ilişkin kapsamlı rehber. Eyalet karşılaştırması, kuruluş adımları ve uyum yükümlülükleri.',
      category: 'amerika',
      keywords: ['LLC', 'formation', 'kuruluş', 'Delaware', 'Wyoming', 'EIN', 'Operating Agreement'],
    },
    {
      slug: 'abdye-gelme-yollari',
      titleEn: 'US Visa Categories for Turkish Nationals',
      titleTr: 'ABD\'ye Gelme Yolları: Türk Vatandaşları İçin Vize Rehberi',
      descriptionEn: 'Guide to US non-immigrant visa categories for Turkish nationals. B-1/B-2, F-1, H-1B, L-1, E-2, O-1 visas.',
      descriptionTr: 'Türk vatandaşlarına yönelik ABD geçici vize kategorilerinin rehberi. B-1/B-2, F-1, H-1B, L-1, E-2, O-1.',
      category: 'amerika',
      keywords: ['visa', 'vize', 'B-1/B-2', 'F-1', 'H-1B', 'E-2', 'O-1', 'immigration'],
    },
    {
      slug: 'irs-vergi-gercekleri',
      titleEn: 'IRS Tax Realities: US Tax Basics for Non-Residents',
      titleTr: 'IRS Vergi Gerçekleri: Mukim Olmayanlar İçin Temel Vergi Bilgileri',
      descriptionEn: 'US tax obligations for non-resident aliens. Substantial presence test, FATCA, FBAR, and US-Turkey tax treaty.',
      descriptionTr: 'Mukim olmayan yabancılar için ABD vergi yükümlülükleri. Substantial presence test, FATCA, FBAR ve vergi anlaşması.',
      category: 'amerika',
      keywords: ['IRS', 'tax', 'vergi', 'substantial presence', 'FATCA', 'FBAR', 'W-8', 'tax treaty'],
    },
    {
      slug: 'legal-kitler',
      titleEn: 'Legal Kits: Curated Template & Guide Packages',
      titleTr: 'Legal Kitler: Derlenmiş Şablon ve Rehber Paketleri',
      descriptionEn: 'Curated legal template and guide packages for US business and immigration.',
      descriptionTr: 'ABD iş ve göçmenlik için derlenmiş hukuki şablon ve rehber paketleri.',
      category: 'amerika',
      keywords: ['legal kits', 'templates', 'şablonlar', 'guides', 'rehber', 'contracts', 'business documents'],
    },
    {
      slug: 'llc-mi-corp-mu',
      titleEn: 'LLC vs Corporation: Choosing Your US Business Structure',
      titleTr: 'LLC mi Corporation mu? ABD\'de Doğru İş Yapısını Seçmek',
      descriptionEn: 'Compare LLC and Corporation structures. Tax implications, liability protection, and investor expectations.',
      descriptionTr: 'LLC ve Corporation yapılarının karşılaştırması. Vergisel sonuçlar, sorumluluk koruması ve yatırımcı beklentileri.',
      category: 'amerika',
      keywords: ['LLC', 'corporation', 'C-Corp', 'S-Corp', 'business structure', 'iş yapısı', 'tax'],
    },
    {
      slug: 'ny-law-neden-tercih-edilir',
      titleEn: 'Why Choose New York Law: Governing Law Selection',
      titleTr: 'New York Hukuku Neden Tercih Edilir: Uygulanacak Hukuk Seçimi',
      descriptionEn: 'Why New York law is preferred for international commercial contracts. Choice of law considerations.',
      descriptionTr: 'Uluslararası ticari sözleşmelerde New York hukukunun neden tercih edildiği.',
      category: 'amerika',
      keywords: ['New York law', 'choice of law', 'hukuk seçimi', 'commercial contracts', 'Delaware', 'governing law'],
    },
    {
      slug: 'platform-ne-yapar-ne-yapmaz',
      titleEn: 'What This Platform Does and Does Not Do',
      titleTr: 'Platformun Kapsamı ve Sınırları',
      descriptionEn: 'EchoLegal\'s scope, limitations, and what you can expect from this legal reference platform.',
      descriptionTr: 'EchoLegal\'ın kapsamı, sınırları ve bu platformdan neler bekleyebileceğiniz.',
      category: 'amerika',
      keywords: ['platform scope', 'kapsam', 'limitations', 'sınırlar', 'legal reference', 'disclaimer'],
    },
    {
      slug: 'statuden-statuye-gecis-gercekleri',
      titleEn: 'Status Change Realities: Change of Status & Adjustment',
      titleTr: 'Statü Değişikliği Gerçekleri: ABD\'de Statü Geçişi',
      descriptionEn: 'The truth about changing immigration status in the US. 30/60 day rule, preconceived intent, and adjustment of status.',
      descriptionTr: 'ABD\'de göçmenlik statüsü değişikliğine ilişkin gerçekler. 30/60 gün kuralı ve statü düzeltmesi.',
      category: 'amerika',
      keywords: ['status change', 'statü değişikliği', '30/60 day rule', 'adjustment of status', 'immigration', 'göçmenlik'],
    },
    {
      slug: 'turist-vizesi-gercekleri',
      titleEn: 'Tourist Visa Realities: B-1/B-2 Facts & Misconceptions',
      titleTr: 'Turist Vizesi Gerçekleri: B-1/B-2 Bilinmesi Gerekenler',
      descriptionEn: 'The truth about US tourist visas. 214(b) refusals, immigrant intent presumption, and common mistakes.',
      descriptionTr: 'ABD turist vizesine ilişkin gerçekler. 214(b) ret gerekçesi ve Türk başvuru sahiplerinin sık düştüğü hatalar.',
      category: 'amerika',
      keywords: ['tourist visa', 'turist vizesi', 'B-1/B-2', '214(b)', 'visa denial', 'immigrant intent'],
    },
  ],
  about: [
    {
      slug: '',
      titleEn: 'Why EchoLegal? Our Mission & Approach',
      titleTr: 'Neden EchoLegal? Misyonumuz ve Yaklaşımımız',
      descriptionEn: 'EchoLegal\'s mission to democratize legal knowledge. Our encyclopedic approach and editorial standards.',
      descriptionTr: 'EchoLegal\'ın hukuki bilgiyi demokratikleştirme misyonu. Ansiklopedik yaklaşımımız ve editöryal standartlarımız.',
      category: 'governance',
      keywords: ['about', 'hakkımızda', 'mission', 'misyon', 'editorial standards'],
    },
    {
      slug: 'charter',
      titleEn: 'Institutional Charter',
      titleTr: 'Kurumsal Tüzük',
      descriptionEn: 'The founding charter of EchoLegal. Mission, editorial independence, governance structure.',
      descriptionTr: 'EchoLegal\'ın kuruluş tüzüğü. Misyon, editöryal bağımsızlık, yönetişim yapısı.',
      category: 'governance',
      keywords: ['charter', 'tüzük', 'governance', 'yönetişim', 'editorial independence'],
    },
    {
      slug: 'citation-guide',
      titleEn: 'Citation Guide',
      titleTr: 'Atıf Rehberi',
      descriptionEn: 'How to cite EchoLegal content in legal, academic, and machine-readable contexts.',
      descriptionTr: 'Hukuki, akademik ve makine tarafından okunabilir bağlamlarda EchoLegal içeriğine atıf yapma.',
      category: 'governance',
      keywords: ['citation', 'atıf', 'Bluebook', 'OSCOLA', 'academic', 'reference'],
    },
    {
      slug: 'contributor-standards',
      titleEn: 'Contributor Standards',
      titleTr: 'Katkıda Bulunan Standartları',
      descriptionEn: 'Requirements for contributing to EchoLegal. Eligibility, bar verification, and editorial process.',
      descriptionTr: 'EchoLegal\'a katkıda bulunma gereksinimleri. Uygunluk, baro doğrulaması ve editöryal süreç.',
      category: 'governance',
      keywords: ['contributor', 'katkıda bulunan', 'standards', 'standartlar', 'bar verification', 'editorial'],
    },
    {
      slug: 'corrections',
      titleEn: 'Correction & Retraction Policy',
      titleTr: 'Düzeltme ve Geri Çekme Politikası',
      descriptionEn: 'How EchoLegal handles errors, corrections, and retractions.',
      descriptionTr: 'EchoLegal\'ın hataları, düzeltmeleri ve geri çekmeleri nasıl ele aldığı.',
      category: 'governance',
      keywords: ['corrections', 'düzeltme', 'retraction', 'geri çekme', 'error reporting', 'version history'],
    },
    {
      slug: 'editorial-board',
      titleEn: 'Editorial Board',
      titleTr: 'Yayın Kurulu',
      descriptionEn: 'The attorneys and legal professionals who review and maintain EchoLegal\'s content.',
      descriptionTr: 'EchoLegal içeriğini inceleyen ve sürdüren avukatlar ve hukuk profesyonelleri.',
      category: 'governance',
      keywords: ['editorial board', 'yayın kurulu', 'attorneys', 'avukatlar', 'legal review'],
    },
    {
      slug: 'editorial-policy',
      titleEn: 'Editorial Policy',
      titleTr: 'Editöryal Politika',
      descriptionEn: 'EchoLegal\'s editorial standards for legal content. Source hierarchy, update policy, and attorney oversight.',
      descriptionTr: 'EchoLegal\'ın hukuki içerik için editöryal standartları. Kaynak hiyerarşisi ve avukat gözetimi.',
      category: 'governance',
      keywords: ['editorial policy', 'editöryal politika', 'standards', 'source hierarchy', 'attorney oversight'],
    },
  ],
  legal: [
    {
      slug: 'cookies',
      titleEn: 'Cookie Policy',
      titleTr: 'Çerez Politikası',
      descriptionEn: 'How EchoLegal uses cookies for language preferences and analytics.',
      descriptionTr: 'EchoLegal\'ın dil tercihleri ve analitik için çerezleri nasıl kullandığı.',
      category: 'legal',
      keywords: ['cookies', 'çerez', 'privacy', 'gizlilik', 'analytics'],
    },
    {
      slug: 'disclaimer',
      titleEn: 'Legal Disclaimer',
      titleTr: 'Yasal Uyarı',
      descriptionEn: 'Important limitations and disclaimers of EchoLegal\'s content and services.',
      descriptionTr: 'EchoLegal\'ın içeriği ve hizmetleri hakkında önemli sınırlamalar ve uyarılar.',
      category: 'legal',
      keywords: ['disclaimer', 'yasal uyarı', 'limitations', 'sınırlamalar', 'liability'],
    },
    {
      slug: 'privacy',
      titleEn: 'Privacy Policy',
      titleTr: 'Gizlilik Politikası',
      descriptionEn: 'EchoLegal\'s privacy policy covering information collection, usage, and user rights.',
      descriptionTr: 'EchoLegal\'ın bilgi toplama, kullanım ve kullanıcı haklarını kapsayan gizlilik politikası.',
      category: 'legal',
      keywords: ['privacy', 'gizlilik', 'data collection', 'veri toplama', 'user rights', 'kullanıcı hakları'],
    },
    {
      slug: 'terms',
      titleEn: 'Terms of Use',
      titleTr: 'Kullanım Koşulları',
      descriptionEn: 'Terms of use governing website access, content usage, and service conditions.',
      descriptionTr: 'Web sitesi erişimi, içerik kullanımı ve hizmet koşullarını düzenleyen kullanım koşulları.',
      category: 'legal',
      keywords: ['terms', 'koşullar', 'terms of use', 'kullanım koşulları', 'website', 'service'],
    },
  ],
  pages: [
    {
      slug: '',
      titleEn: 'Home',
      titleTr: 'Ana Sayfa',
      descriptionEn: 'Legal knowledge should belong to everyone. Bilingual legal encyclopedia.',
      descriptionTr: 'Hukuki bilgi herkesin olmalı. İki dilli hukuk ansiklopedisi.',
      category: 'page',
      keywords: ['home', 'ana sayfa', 'echolegal', 'legal', 'hukuk'],
    },
    {
      slug: 'contracts',
      titleEn: 'Contracts Library',
      titleTr: 'Sözleşmeler Kütüphanesi',
      descriptionEn: 'Professional legal templates for everyday business needs.',
      descriptionTr: 'Günlük iş ihtiyaçları için profesyonel hukuki şablonlar.',
      category: 'page',
      keywords: ['contracts', 'sözleşmeler', 'templates', 'şablonlar', 'library'],
    },
    {
      slug: 'encyclopedia',
      titleEn: 'Legal Encyclopedia',
      titleTr: 'Hukuk Ansiklopedisi',
      descriptionEn: 'Comprehensive guides on business law, employment, and intellectual property.',
      descriptionTr: 'İş hukuku, istihdam ve fikri mülkiyet hakkında kapsamlı rehberler.',
      category: 'page',
      keywords: ['encyclopedia', 'ansiklopedi', 'guides', 'rehber', 'articles'],
    },
    {
      slug: 'consular-documents',
      titleEn: 'Turkish Consular Documents',
      titleTr: 'Türk Konsolosluk Belgeleri',
      descriptionEn: 'Free checklists for passport, ID, notary services, and more.',
      descriptionTr: 'Pasaport, kimlik, noter hizmetleri için ücretsiz kontrol listeleri.',
      category: 'page',
      keywords: ['consular', 'konsolosluk', 'Turkish', 'Türk', 'checklist', 'kontrol listesi'],
    },
    {
      slug: 'support',
      titleEn: 'Support',
      titleTr: 'Destek',
      descriptionEn: 'Frequently asked questions and how to get help.',
      descriptionTr: 'Sık sorulan sorular ve yardım alma.',
      category: 'page',
      keywords: ['support', 'destek', 'help', 'yardım', 'FAQ', 'contact'],
    },
    {
      slug: 'templates',
      titleEn: 'Free Legal Templates & Document Library',
      titleTr: 'Ücretsiz Hukuki Şablon ve Belge Kütüphanesi',
      descriptionEn: 'Browse 50+ free legal templates: contracts, business forms, immigration letters, tax checklists.',
      descriptionTr: 'Sözleşmeler, iş formları, göç mektupları, vergi kontrol listeleri dahil 50+ ücretsiz hukuki şablon.',
      category: 'page',
      keywords: ['templates', 'şablonlar', 'documents', 'belgeler', 'free', 'ücretsiz', 'download'],
    },
    {
      slug: 'library',
      titleEn: 'Legal Reference Library',
      titleTr: 'Hukuki Başvuru Kaynakları',
      descriptionEn: 'Comprehensive legal reference guides for doing business in the United States.',
      descriptionTr: 'ABD\'de iş yapmak için kapsamlı hukuki referans rehberleri.',
      category: 'page',
      keywords: ['library', 'kütüphane', 'reference', 'başvuru', 'guides', 'rehberler'],
    },
    {
      slug: 'checklists',
      titleEn: 'Checklists & Decision Guides',
      titleTr: 'Kontrol Listeleri ve Karar Rehberleri',
      descriptionEn: 'Quick reference checklists and decision guides for common US business legal questions.',
      descriptionTr: 'Yaygın ABD iş hukuku soruları için hızlı referans kontrol listeleri ve karar rehberleri.',
      category: 'page',
      keywords: ['checklists', 'kontrol listeleri', 'decision guides', 'karar rehberi', 'LLC', 'tax'],
    },
    {
      slug: 'amerika',
      titleEn: 'US Business & Legal Guide for Turkish Entrepreneurs',
      titleTr: 'Türk Girişimciler İçin ABD Hukuk Rehberi',
      descriptionEn: 'Comprehensive legal reference hub for Turkish entrepreneurs doing business in the United States.',
      descriptionTr: 'ABD\'de iş kurmak isteyen Türk girişimcilere yönelik kapsamlı hukuki başvuru kaynağı.',
      category: 'page',
      keywords: ['Amerika', 'ABD', 'US business', 'Turkish entrepreneurs', 'Türk girişimciler', 'legal guide'],
    },
    {
      slug: 'contribute',
      titleEn: 'Contribute to EchoLegal',
      titleTr: 'EchoLegal\'a Katkıda Bulunun',
      descriptionEn: 'EchoLegal accepts contributions from licensed attorneys for its public legal reference library.',
      descriptionTr: 'EchoLegal, lisanslı avukatlardan kamu hukuk referans kütüphanesi için katkı kabul etmektedir.',
      category: 'page',
      keywords: ['contribute', 'katkı', 'attorneys', 'avukatlar', 'editorial', 'submission'],
    },
    {
      slug: 'jurisdictions',
      titleEn: 'Jurisdiction Coverage',
      titleTr: 'Yargı Alanı Kapsamı',
      descriptionEn: 'Jurisdictions covered by EchoLegal with published legal content.',
      descriptionTr: 'EchoLegal tarafından kapsanan ve yayınlanmış hukuki içeriğe sahip yargı alanları.',
      category: 'page',
      keywords: ['jurisdictions', 'yargı alanı', 'coverage', 'kapsam', 'US', 'Turkey'],
    },
    {
      slug: 'updates',
      titleEn: 'Legal Updates',
      titleTr: 'Hukuki Güncellemeler',
      descriptionEn: 'Latest legal updates from official US government sources including IRS, Congress, and Federal Register.',
      descriptionTr: 'IRS, Kongre ve Federal Register dahil resmi ABD hükümeti kaynaklarından son hukuki güncellemeler.',
      category: 'page',
      keywords: ['updates', 'güncellemeler', 'news', 'haberler', 'IRS', 'Congress', 'Federal Register'],
    },
  ],
};

// Build the search index
function buildSearchIndex() {
  const index = [];
  const timestamp = new Date().toISOString();

  // Process contracts
  searchableContent.contracts.forEach((item) => {
    index.push({
      id: `contract-${item.slug}`,
      url: `/contracts/${item.slug}`,
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: item.jurisdiction || null,
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process encyclopedia articles
  searchableContent.encyclopedia.forEach((item) => {
    index.push({
      id: `encyclopedia-${item.slug}`,
      url: `/encyclopedia/${item.slug}`,
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: item.jurisdiction || null,
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process consular documents
  searchableContent.consular.forEach((item) => {
    index.push({
      id: `consular-${item.slug}`,
      url: `/consular-documents/${item.slug}`,
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: 'Turkey',
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process library guides
  searchableContent.library.forEach((item) => {
    index.push({
      id: `library-${item.slug}`,
      url: `/library/${item.slug}`,
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: 'US/Turkey',
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process checklists
  searchableContent.checklists.forEach((item) => {
    index.push({
      id: `checklist-${item.slug}`,
      url: `/checklists/${item.slug}`,
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: 'US',
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process Amerika Hub pages
  searchableContent.amerika.forEach((item) => {
    index.push({
      id: `amerika-${item.slug}`,
      url: `/amerika/${item.slug}`,
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: 'US/Turkey',
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process about/governance pages
  searchableContent.about.forEach((item) => {
    index.push({
      id: `about-${item.slug || 'index'}`,
      url: item.slug ? `/about/${item.slug}` : '/about',
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: null,
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process legal pages
  searchableContent.legal.forEach((item) => {
    index.push({
      id: `legal-${item.slug}`,
      url: `/legal/${item.slug}`,
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: null,
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  // Process main pages
  searchableContent.pages.forEach((item) => {
    index.push({
      id: `page-${item.slug || 'home'}`,
      url: item.slug ? `/${item.slug}` : '/',
      titleEn: item.titleEn,
      titleTr: item.titleTr,
      descriptionEn: item.descriptionEn,
      descriptionTr: item.descriptionTr,
      category: item.category,
      jurisdiction: null,
      keywords: item.keywords,
      lastVerified: timestamp,
    });
  });

  return {
    version: '1.0',
    generated: timestamp,
    totalItems: index.length,
    items: index,
  };
}

// Write the index to public folder
function writeIndex() {
  const index = buildSearchIndex();
  const outputPath = path.join(__dirname, '..', 'public', 'search-index.json');

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
  console.log(`Search index built successfully!`);
  console.log(`Total items: ${index.totalItems}`);
  console.log(`Output: ${outputPath}`);
}

writeIndex();
