// lib/templates-registry.ts
// Config-driven templates registry for EchoLegal
// Supports contracts, forms, letters, samples, and document examples

export type TemplateCategory =
  | 'contracts'
  | 'business'
  | 'immigration'
  | 'personal'
  | 'letters'
  | 'tax'
  | 'realestate'
  | 'other'

export type DocType =
  | 'contract'
  | 'form'
  | 'letter'
  | 'sample'
  | 'petition'
  | 'checklist'
  | 'template'
  | 'guide'

export type Jurisdiction = 'US' | 'TR' | 'US/TR' | 'General'

export type UseCase =
  | 'freelancer'
  | 'startup'
  | 'remote-worker'
  | 'digital-nomad'
  | 'consultant'
  | 'content-creator'
  | 'investor'
  | 'e-commerce'
  | 'immigration'
  | 'general'

export type Template = {
  id: string
  lang: 'en' | 'tr'
  title: string
  shortDescription: string
  category: TemplateCategory
  tags: string[]
  jurisdiction: Jurisdiction
  docType: DocType
  slug: string
  updatedAt: string
  downloadUrl?: string
  isSample?: boolean
  relatedIds?: string[]
  useCases?: UseCase[]
}

// Category labels for UI
export const categoryLabels: Record<TemplateCategory, { en: string; tr: string }> = {
  contracts: { en: 'Contracts', tr: 'Sözleşmeler' },
  business: { en: 'Business', tr: 'İş Belgeleri' },
  immigration: { en: 'Immigration & Consular', tr: 'Göç & Konsolosluk' },
  personal: { en: 'Personal Docs', tr: 'Kişisel Belgeler' },
  letters: { en: 'Letters & Notices', tr: 'Dilekçe & İhtar' },
  tax: { en: 'Tax & IRS', tr: 'Vergi & IRS' },
  realestate: { en: 'Real Estate', tr: 'Gayrimenkul' },
  other: { en: 'Other', tr: 'Diğer' },
}

export const docTypeLabels: Record<DocType, { en: string; tr: string }> = {
  contract: { en: 'Contract', tr: 'Sözleşme' },
  form: { en: 'Form', tr: 'Form' },
  letter: { en: 'Letter', tr: 'Mektup' },
  sample: { en: 'Sample/Example', tr: 'Örnek' },
  petition: { en: 'Petition', tr: 'Dilekçe' },
  checklist: { en: 'Checklist', tr: 'Kontrol Listesi' },
  template: { en: 'Template', tr: 'Şablon' },
  guide: { en: 'Guide', tr: 'Rehber' },
}

export const jurisdictionLabels: Record<Jurisdiction, { en: string; tr: string }> = {
  US: { en: 'United States', tr: 'ABD' },
  TR: { en: 'Turkey', tr: 'Türkiye' },
  'US/TR': { en: 'US & Turkey', tr: 'ABD & Türkiye' },
  General: { en: 'General', tr: 'Genel' },
}

export const useCaseLabels: Record<UseCase, { en: string; tr: string }> = {
  freelancer: { en: 'Freelancers', tr: 'Serbest Çalışanlar' },
  startup: { en: 'Startups', tr: 'Startup\'lar' },
  'remote-worker': { en: 'Remote Workers', tr: 'Uzaktan Çalışanlar' },
  'digital-nomad': { en: 'Digital Nomads', tr: 'Dijital Göçebeler' },
  consultant: { en: 'Consultants', tr: 'Danışmanlar' },
  'content-creator': { en: 'Content Creators', tr: 'İçerik Üreticileri' },
  investor: { en: 'Investors', tr: 'Yatırımcılar' },
  'e-commerce': { en: 'E-Commerce', tr: 'E-Ticaret' },
  immigration: { en: 'Immigration', tr: 'Göçmenlik' },
  general: { en: 'General', tr: 'Genel' },
}

// Templates Registry
export const templatesRegistry: Template[] = [
  // ===== CONTRACTS (existing + new) =====
  // English contracts
  {
    id: 'nda-en',
    lang: 'en',
    title: 'Non-Disclosure Agreement (NDA)',
    shortDescription: 'Protect confidential information when discussing business opportunities or partnerships.',
    category: 'contracts',
    tags: ['nda', 'confidentiality', 'business', 'partnership', 'startup'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'nda',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-en', 'independent-contractor-en'],
  },
  {
    id: 'service-agreement-en',
    lang: 'en',
    title: 'Service Agreement',
    shortDescription: 'Define scope, payment terms, and deliverables for client work.',
    category: 'contracts',
    tags: ['service', 'client', 'scope', 'payment', 'deliverables', 'freelance'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'service-agreement',
    updatedAt: '2026-01-25',
    relatedIds: ['independent-contractor-en', 'nda-en'],
  },
  {
    id: 'independent-contractor-en',
    lang: 'en',
    title: 'Independent Contractor Agreement',
    shortDescription: 'Establish clear terms when hiring freelancers or contractors.',
    category: 'contracts',
    tags: ['contractor', 'freelancer', 'hiring', '1099', 'independent'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'independent-contractor',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-en', 'nda-en'],
  },
  {
    id: 'privacy-policy-en',
    lang: 'en',
    title: 'Privacy Policy',
    shortDescription: 'GDPR and CCPA compliant privacy policy for your website or app.',
    category: 'contracts',
    tags: ['privacy', 'gdpr', 'ccpa', 'website', 'app', 'data'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'privacy-policy',
    updatedAt: '2026-01-25',
    relatedIds: ['terms-of-service-en'],
  },
  {
    id: 'terms-of-service-en',
    lang: 'en',
    title: 'Terms of Service',
    shortDescription: 'Terms and conditions for websites, apps, and online services.',
    category: 'contracts',
    tags: ['terms', 'conditions', 'website', 'app', 'saas', 'tos'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'terms-of-service',
    updatedAt: '2026-01-25',
    relatedIds: ['privacy-policy-en'],
  },
  {
    id: 'freelance-agreement-en',
    lang: 'en',
    title: 'Freelance Agreement',
    shortDescription: 'Contract template for freelance work with US clients.',
    category: 'contracts',
    tags: ['freelance', 'remote', 'client', 'project', 'scope'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'freelance-agreement',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-en', 'independent-contractor-en'],
  },
  {
    id: 'influencer-agreement-en',
    lang: 'en',
    title: 'Influencer Agreement',
    shortDescription: 'Contract for brand partnerships and sponsored content.',
    category: 'contracts',
    tags: ['influencer', 'brand', 'sponsorship', 'social-media', 'content'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'influencer-agreement',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-en'],
  },

  // Turkish contracts
  {
    id: 'nda-tr',
    lang: 'tr',
    title: 'Gizlilik Sözleşmesi (NDA)',
    shortDescription: 'İş görüşmeleri ve ortaklık müzakerelerinde gizli bilgilerin korunmasına yönelik sözleşme.',
    category: 'contracts',
    tags: ['nda', 'gizlilik', 'is', 'ortaklik', 'startup'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'nda',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-tr', 'independent-contractor-tr'],
  },
  {
    id: 'service-agreement-tr',
    lang: 'tr',
    title: 'Hizmet Sözleşmesi',
    shortDescription: 'Müşteri ilişkilerinde iş kapsamı, ödeme koşulları ve teslim yükümlülüklerini düzenleyen sözleşme.',
    category: 'contracts',
    tags: ['hizmet', 'musteri', 'kapsam', 'odeme', 'teslim', 'serbest'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'service-agreement',
    updatedAt: '2026-01-25',
    relatedIds: ['independent-contractor-tr', 'nda-tr'],
  },
  {
    id: 'independent-contractor-tr',
    lang: 'tr',
    title: 'Bağımsız Yüklenici Sözleşmesi',
    shortDescription: 'Serbest çalışan veya yüklenici ile iş ilişkisinin koşullarını belirleyen sözleşme.',
    category: 'contracts',
    tags: ['yuklenici', 'serbest', 'calisan', '1099', 'bagimsiz'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'independent-contractor',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-tr', 'nda-tr'],
  },
  {
    id: 'privacy-policy-tr',
    lang: 'tr',
    title: 'Gizlilik Politikası',
    shortDescription: 'Web sitesi veya uygulama için KVKK ve GDPR uyumlu kişisel verilerin korunması politikası.',
    category: 'contracts',
    tags: ['gizlilik', 'kvkk', 'website', 'uygulama', 'veri'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'privacy-policy',
    updatedAt: '2026-01-25',
    relatedIds: ['terms-of-service-tr'],
  },
  {
    id: 'terms-of-service-tr',
    lang: 'tr',
    title: 'Kullanım Koşulları',
    shortDescription: 'Web sitesi, uygulama ve dijital hizmetler için kullanıcı hak ve yükümlülüklerini düzenleyen koşullar.',
    category: 'contracts',
    tags: ['kosullar', 'sartlar', 'website', 'uygulama', 'saas'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'terms-of-service',
    updatedAt: '2026-01-25',
    relatedIds: ['privacy-policy-tr'],
  },
  {
    id: 'freelance-agreement-tr',
    lang: 'tr',
    title: 'Freelance Sözleşmesi',
    shortDescription: 'ABD merkezli müşterilerle uzaktan serbest çalışma ilişkisini düzenleyen sözleşme.',
    category: 'contracts',
    tags: ['freelance', 'uzaktan', 'musteri', 'proje', 'kapsam'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'freelance-agreement',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-tr', 'independent-contractor-tr'],
  },
  {
    id: 'influencer-agreement-tr',
    lang: 'tr',
    title: 'Influencer Sözleşmesi',
    shortDescription: 'Marka ortaklıkları ve sponsorlu içerik için sözleşme.',
    category: 'contracts',
    tags: ['influencer', 'marka', 'sponsorluk', 'sosyal-medya', 'icerik'],
    jurisdiction: 'US',
    docType: 'contract',
    slug: 'influencer-agreement',
    updatedAt: '2026-01-25',
    relatedIds: ['service-agreement-tr'],
  },

  // ===== BUSINESS TEMPLATES =====
  // English
  {
    id: 'invoice-template-en',
    lang: 'en',
    title: 'Invoice Template',
    shortDescription: 'Professional invoice template for billing US clients.',
    category: 'business',
    tags: ['invoice', 'billing', 'payment', 'client', 'freelance'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'invoice-template',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/InvoiceTemplate-EN.docx',
  },
  {
    id: 'receipt-template-en',
    lang: 'en',
    title: 'Payment Receipt Template',
    shortDescription: 'Receipt template confirming payment received.',
    category: 'business',
    tags: ['receipt', 'payment', 'confirmation', 'record'],
    jurisdiction: 'General',
    docType: 'template',
    slug: 'receipt-template',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/PaymentReceipt-EN.docx',
  },
  {
    id: 'authorization-letter-en',
    lang: 'en',
    title: 'Authorization Letter',
    shortDescription: 'Letter authorizing someone to act on your behalf.',
    category: 'business',
    tags: ['authorization', 'proxy', 'representative', 'agent'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'authorization-letter',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/AuthorizationLetter-EN.docx',
  },
  {
    id: 'company-policy-notice-en',
    lang: 'en',
    title: 'Company Policy Notice Template',
    shortDescription: 'Template for communicating policy updates to employees or contractors.',
    category: 'business',
    tags: ['policy', 'notice', 'employee', 'hr', 'company'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'company-policy-notice',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/CompanyPolicyNotice-EN.docx',
  },
  {
    id: 'operating-agreement-outline-en',
    lang: 'en',
    title: 'LLC Operating Agreement Outline',
    shortDescription: 'Key sections and considerations for a single-member LLC operating agreement.',
    category: 'business',
    tags: ['llc', 'operating-agreement', 'formation', 'single-member'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'operating-agreement-outline',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/OperatingAgreementOutline-EN.docx',
  },

  // Turkish business
  {
    id: 'invoice-template-tr',
    lang: 'tr',
    title: 'Fatura Şablonu',
    shortDescription: 'ABD merkezli müşterilere yönelik profesyonel fatura şablonu.',
    category: 'business',
    tags: ['fatura', 'faturalandirma', 'odeme', 'musteri', 'serbest'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'invoice-template',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/FaturaSablonu-TR.docx',
  },
  {
    id: 'receipt-template-tr',
    lang: 'tr',
    title: 'Ödeme Makbuzu Şablonu',
    shortDescription: 'Alınan ödemeyi onaylayan makbuz şablonu.',
    category: 'business',
    tags: ['makbuz', 'odeme', 'onay', 'kayit'],
    jurisdiction: 'General',
    docType: 'template',
    slug: 'receipt-template',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/OdemeMakbuzu-TR.docx',
  },
  {
    id: 'authorization-letter-tr',
    lang: 'tr',
    title: 'Yetki Mektubu',
    shortDescription: 'Bir kişiye sizin adınıza işlem yapma yetkisi veren resmi yetkilendirme mektubu.',
    category: 'business',
    tags: ['yetki', 'vekalet', 'temsilci', 'vekil'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'authorization-letter',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/YetkiMektubu-TR.docx',
  },
  {
    id: 'company-policy-notice-tr',
    lang: 'tr',
    title: 'Şirket Politikası Bildirim Şablonu',
    shortDescription: 'Şirket içi politika değişikliklerini çalışan ve yüklenicilere bildirmek için kullanılan şablon.',
    category: 'business',
    tags: ['politika', 'bildirim', 'calisan', 'ik', 'sirket'],
    jurisdiction: 'US',
    docType: 'template',
    slug: 'company-policy-notice',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/SirketPolitikasiBildirimi-TR.docx',
  },
  {
    id: 'operating-agreement-outline-tr',
    lang: 'tr',
    title: 'LLC Operating Agreement Anahat',
    shortDescription: 'Tek üyeli LLC için Operating Agreement hazırlarken ele alınması gereken temel bölümler ve hususlar.',
    category: 'business',
    tags: ['llc', 'isletme-sozlesmesi', 'kurulus', 'tek-uyeli'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'operating-agreement-outline',
    updatedAt: '2026-02-05',
    downloadUrl: '/documents/OperatingAgreementAnahat-TR.docx',
  },

  // ===== IMMIGRATION & CONSULAR =====
  // English
  {
    id: 'visa-appointment-cover-en',
    lang: 'en',
    title: 'Visa Appointment Cover Letter',
    shortDescription: 'Cover letter template for US visa interview appointments.',
    category: 'immigration',
    tags: ['visa', 'appointment', 'consulate', 'cover-letter', 'interview'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'visa-appointment-cover-letter',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/VisaAppointmentCoverLetter-EN.docx',
  },
  {
    id: 'sponsor-letter-en',
    lang: 'en',
    title: 'Sponsor Letter Template',
    shortDescription: 'Letter of support for visa applications from a US sponsor.',
    category: 'immigration',
    tags: ['sponsor', 'visa', 'support', 'invitation', 'host'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'sponsor-letter',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/SponsorLetter-EN.docx',
  },
  {
    id: 'affidavit-support-outline-en',
    lang: 'en',
    title: 'Affidavit of Support Outline',
    shortDescription: 'Key elements for an affidavit of financial support.',
    category: 'immigration',
    tags: ['affidavit', 'support', 'financial', 'i-134', 'sponsor'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'affidavit-support-outline',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/AffidavitOfSupportOutline-EN.docx',
  },
  {
    id: 'travel-consent-letter-en',
    lang: 'en',
    title: 'Child Travel Consent Letter',
    shortDescription: 'Parental consent letter for minors traveling internationally.',
    category: 'immigration',
    tags: ['travel', 'consent', 'minor', 'child', 'parental'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'travel-consent-letter',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/ChildTravelConsentLetter-EN.docx',
  },
  {
    id: 'consulate-appointment-request-en',
    lang: 'en',
    title: 'Consulate Appointment Request',
    shortDescription: 'Template for requesting consulate services or appointments.',
    category: 'immigration',
    tags: ['consulate', 'appointment', 'request', 'services'],
    jurisdiction: 'US/TR',
    docType: 'letter',
    slug: 'consulate-appointment-request',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/ConsulateAppointmentRequest-EN.docx',
  },

  // Turkish immigration
  {
    id: 'visa-appointment-cover-tr',
    lang: 'tr',
    title: 'Vize Randevu Kapak Yazısı',
    shortDescription: 'ABD vize mülakatı randevusu için hazırlanmış kapak yazısı şablonu.',
    category: 'immigration',
    tags: ['vize', 'randevu', 'konsolosluk', 'kapak-yazisi', 'mulakat'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'visa-appointment-cover-letter',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/VizeRandevuKapakYazisi-TR.docx',
  },
  {
    id: 'sponsor-letter-tr',
    lang: 'tr',
    title: 'Sponsor Mektubu Şablonu',
    shortDescription: 'ABD\'deki davetçi veya sponsor tarafından vize başvurusuna destek amacıyla düzenlenen mektup.',
    category: 'immigration',
    tags: ['sponsor', 'vize', 'destek', 'davet', 'ev-sahibi'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'sponsor-letter',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/SponsorMektubu-TR.docx',
  },
  {
    id: 'affidavit-support-outline-tr',
    lang: 'tr',
    title: 'Mali Destek Beyanı Anahat',
    shortDescription: 'Mali destek taahhüdü (Affidavit of Support) hazırlamak için gereken temel unsurlar.',
    category: 'immigration',
    tags: ['beyan', 'destek', 'mali', 'i-134', 'sponsor'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'affidavit-support-outline',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/MaliDestekBeyani-TR.docx',
  },
  {
    id: 'travel-consent-letter-tr',
    lang: 'tr',
    title: 'Çocuk Seyahat İzin Mektubu',
    shortDescription: 'Reşit olmayan çocuğun yurt dışı seyahati için ebeveyn muvafakat mektubu.',
    category: 'immigration',
    tags: ['seyahat', 'izin', 'kucuk', 'cocuk', 'ebeveyn'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'travel-consent-letter',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/CocukSeyahatIzinMektubu-TR.docx',
  },
  {
    id: 'consulate-appointment-request-tr',
    lang: 'tr',
    title: 'Konsolosluk Randevu Talebi',
    shortDescription: 'Konsolosluktan hizmet veya randevu talep etmek amacıyla kullanılan yazı şablonu.',
    category: 'immigration',
    tags: ['konsolosluk', 'randevu', 'talep', 'hizmetler'],
    jurisdiction: 'US/TR',
    docType: 'letter',
    slug: 'consulate-appointment-request',
    updatedAt: '2026-01-27',
    downloadUrl: '/documents/KonsoloslukRandevuTalebi-TR.docx',
  },

  // ===== PERSONAL DOCS / SAMPLES =====
  // English
  {
    id: 'nufus-cuzdani-sample-en',
    lang: 'en',
    title: 'Turkish ID Card (Nüfus Cüzdanı) - Example Guide',
    shortDescription: 'Reference guide showing the format and fields of a Turkish national ID card.',
    category: 'personal',
    tags: ['nufus-cuzdani', 'turkish-id', 'identity', 'document', 'example'],
    jurisdiction: 'TR',
    docType: 'sample',
    slug: 'nufus-cuzdani-example',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/TurkishIDCard-ExampleGuide-EN.docx',
    isSample: true,
  },
  {
    id: 'power-of-attorney-outline-en',
    lang: 'en',
    title: 'Power of Attorney Outline',
    shortDescription: 'Key elements and considerations for a general power of attorney document.',
    category: 'personal',
    tags: ['power-of-attorney', 'poa', 'legal', 'authorization', 'proxy'],
    jurisdiction: 'General',
    docType: 'guide',
    slug: 'power-of-attorney-outline',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/PowerOfAttorney-Sample-EN.docx',
  },
  {
    id: 'residency-proof-letter-en',
    lang: 'en',
    title: 'Proof of Residency Letter',
    shortDescription: 'Template for a letter confirming residential address.',
    category: 'personal',
    tags: ['residency', 'proof', 'address', 'verification', 'letter'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'residency-proof-letter',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/ProofOfResidencyLetter-EN.docx',
  },
  {
    id: 'translation-certification-en',
    lang: 'en',
    title: 'Translation Certification Statement',
    shortDescription: 'Certification statement template for translated documents.',
    category: 'personal',
    tags: ['translation', 'certification', 'certified', 'document', 'official'],
    jurisdiction: 'General',
    docType: 'template',
    slug: 'translation-certification',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/TranslationCertification-EN.docx',
  },
  {
    id: 'apostille-request-sample-en',
    lang: 'en',
    title: 'Apostille Request - Reference Guide',
    shortDescription: 'Understanding apostille requirements and the request process.',
    category: 'personal',
    tags: ['apostille', 'hague', 'legalization', 'document', 'official'],
    jurisdiction: 'General',
    docType: 'sample',
    slug: 'apostille-request-guide',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/ApostilleRequest-Guide-EN.docx',
    isSample: true,
  },
  {
    id: 'name-change-affidavit-en',
    lang: 'en',
    title: 'Name Change Affidavit Outline',
    shortDescription: 'Key elements for a name change affidavit document.',
    category: 'personal',
    tags: ['name-change', 'affidavit', 'legal', 'identity'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'name-change-affidavit',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/NameChangeAffidavit-Outline-EN.docx',
  },

  // Turkish personal
  {
    id: 'nufus-cuzdani-sample-tr',
    lang: 'tr',
    title: 'Nüfus Cüzdanı Örneği - Rehber',
    shortDescription: 'Türk nüfus cüzdanı format ve alanlarını gösteren referans rehberi.',
    category: 'personal',
    tags: ['nufus-cuzdani', 'kimlik', 'belge', 'ornek'],
    jurisdiction: 'TR',
    docType: 'sample',
    slug: 'nufus-cuzdani-example',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/NufusCuzdani-OrnekRehber-TR.docx',
    isSample: true,
  },
  {
    id: 'power-of-attorney-outline-tr',
    lang: 'tr',
    title: 'Vekaletname Anahat',
    shortDescription: 'Genel vekaletname düzenlerken dikkate alınması gereken başlıca unsurlar ve hükümler.',
    category: 'personal',
    tags: ['vekaletname', 'vekalet', 'hukuki', 'yetki', 'vekil'],
    jurisdiction: 'General',
    docType: 'guide',
    slug: 'power-of-attorney-outline',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/Vekaletname-Sample-TR.docx',
  },
  {
    id: 'residency-proof-letter-tr',
    lang: 'tr',
    title: 'İkametgah Belgesi Mektubu',
    shortDescription: 'İkamet adresini doğrulayan mektup şablonu.',
    category: 'personal',
    tags: ['ikametgah', 'belge', 'adres', 'dogrulama', 'mektup'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'residency-proof-letter',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/IkametgahBelgesi-Mektup-TR.docx',
  },
  {
    id: 'translation-certification-tr',
    lang: 'tr',
    title: 'Tercüme Sertifikası Beyanı',
    shortDescription: 'Tercüme edilmiş belgeler için sertifika beyanı şablonu.',
    category: 'personal',
    tags: ['tercume', 'sertifika', 'onayli', 'belge', 'resmi'],
    jurisdiction: 'General',
    docType: 'template',
    slug: 'translation-certification',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/TercumeSertifikasi-Beyan-TR.docx',
  },
  {
    id: 'apostille-request-sample-tr',
    lang: 'tr',
    title: 'Apostil Talebi - Referans Rehberi',
    shortDescription: 'Apostil şartları ve başvuru sürecine ilişkin rehber.',
    category: 'personal',
    tags: ['apostil', 'lahey', 'tasdik', 'belge', 'resmi'],
    jurisdiction: 'General',
    docType: 'sample',
    slug: 'apostille-request-guide',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/ApostilTalebi-Rehber-TR.docx',
    isSample: true,
  },
  {
    id: 'name-change-affidavit-tr',
    lang: 'tr',
    title: 'İsim Değişikliği Beyanı Anahat',
    shortDescription: 'İsim değişikliği beyan belgesi için temel unsurlar.',
    category: 'personal',
    tags: ['isim-degisikligi', 'beyan', 'hukuki', 'kimlik'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'name-change-affidavit',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/IsimDegisikligiBeyanı-Anahat-TR.docx',
  },

  // ===== TAX & IRS =====
  // English
  {
    id: 'w8-attachment-checklist-en',
    lang: 'en',
    title: 'W-8BEN Attachment Checklist',
    shortDescription: 'Checklist of documents to attach when submitting W-8BEN forms.',
    category: 'tax',
    tags: ['w8', 'w8ben', 'irs', 'tax', 'withholding', 'checklist'],
    jurisdiction: 'US',
    docType: 'checklist',
    slug: 'w8-attachment-checklist',
    updatedAt: '2026-01-25',
  },
  {
    id: 'ein-request-cover-letter-en',
    lang: 'en',
    title: 'EIN Request Cover Letter',
    shortDescription: 'Cover letter template for mailing or faxing EIN applications.',
    category: 'tax',
    tags: ['ein', 'ss-4', 'irs', 'tax-id', 'application'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'ein-request-cover-letter',
    updatedAt: '2026-01-25',
  },
  {
    id: 'vendor-onboarding-form-en',
    lang: 'en',
    title: 'Vendor Onboarding Form Outline',
    shortDescription: 'Key fields for a vendor/contractor onboarding form.',
    category: 'tax',
    tags: ['vendor', 'onboarding', 'contractor', 'w9', 'w8'],
    jurisdiction: 'US',
    docType: 'form',
    slug: 'vendor-onboarding-form',
    updatedAt: '2026-01-25',
  },
  {
    id: 'itin-application-guide-en',
    lang: 'en',
    title: 'ITIN Application Preparation Guide',
    shortDescription: 'Checklist and guidance for ITIN (W-7) application preparation.',
    category: 'tax',
    tags: ['itin', 'w-7', 'irs', 'tax-id', 'application'],
    jurisdiction: 'US',
    docType: 'checklist',
    slug: 'itin-application-guide',
    updatedAt: '2026-01-25',
  },
  {
    id: '1099-response-letter-en',
    lang: 'en',
    title: '1099 Inquiry Response Letter',
    shortDescription: 'Template for responding to client requests for 1099 information.',
    category: 'tax',
    tags: ['1099', 'tax', 'irs', 'response', 'inquiry'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: '1099-response-letter',
    updatedAt: '2026-01-25',
  },
  {
    id: 'tax-treaty-claim-checklist-en',
    lang: 'en',
    title: 'Tax Treaty Benefits Claim Checklist',
    shortDescription: 'Documents needed to claim US-Turkey tax treaty benefits.',
    category: 'tax',
    tags: ['tax-treaty', 'turkey', 'benefits', 'withholding', 'w8'],
    jurisdiction: 'US/TR',
    docType: 'checklist',
    slug: 'tax-treaty-claim-checklist',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/TaxTreatyChecklist-EN.docx',
  },

  // Turkish tax
  {
    id: 'w8-attachment-checklist-tr',
    lang: 'tr',
    title: 'W-8BEN Ekleri Kontrol Listesi',
    shortDescription: 'W-8BEN formu ile birlikte sunulması gereken belgelerin kontrol listesi.',
    category: 'tax',
    tags: ['w8', 'w8ben', 'irs', 'vergi', 'stopaj', 'kontrol-listesi'],
    jurisdiction: 'US',
    docType: 'checklist',
    slug: 'w8-attachment-checklist',
    updatedAt: '2026-01-25',
  },
  {
    id: 'ein-request-cover-letter-tr',
    lang: 'tr',
    title: 'EIN Başvuru Kapak Yazısı',
    shortDescription: 'EIN başvurusunu posta veya faks yoluyla IRS\'e iletirken kullanılacak kapak yazısı.',
    category: 'tax',
    tags: ['ein', 'ss-4', 'irs', 'vergi-kimlik', 'basvuru'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'ein-request-cover-letter',
    updatedAt: '2026-01-25',
  },
  {
    id: 'vendor-onboarding-form-tr',
    lang: 'tr',
    title: 'Tedarikçi Kayıt Formu Anahat',
    shortDescription: 'Tedarikçi/yüklenici kayıt formu için temel alanlar.',
    category: 'tax',
    tags: ['tedarikci', 'kayit', 'yuklenici', 'w9', 'w8'],
    jurisdiction: 'US',
    docType: 'form',
    slug: 'vendor-onboarding-form',
    updatedAt: '2026-01-25',
  },
  {
    id: 'itin-application-guide-tr',
    lang: 'tr',
    title: 'ITIN Başvuru Hazırlık Rehberi',
    shortDescription: 'ITIN (W-7) başvuru hazırlığı için kontrol listesi ve rehberlik.',
    category: 'tax',
    tags: ['itin', 'w-7', 'irs', 'vergi-kimlik', 'basvuru'],
    jurisdiction: 'US',
    docType: 'checklist',
    slug: 'itin-application-guide',
    updatedAt: '2026-01-25',
  },
  {
    id: '1099-response-letter-tr',
    lang: 'tr',
    title: '1099 Sorgu Yanıt Mektubu',
    shortDescription: 'Müşterilerden gelen 1099 bilgi taleplerine yazılı yanıt vermek için kullanılan şablon.',
    category: 'tax',
    tags: ['1099', 'vergi', 'irs', 'yanit', 'sorgu'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: '1099-response-letter',
    updatedAt: '2026-01-25',
  },
  {
    id: 'tax-treaty-claim-checklist-tr',
    lang: 'tr',
    title: 'Vergi Anlaşması Avantajları Kontrol Listesi',
    shortDescription: 'ABD-Türkiye vergi anlaşması avantajlarından yararlanmak için gerekli belgeler.',
    category: 'tax',
    tags: ['vergi-anlasmasi', 'turkiye', 'avantajlar', 'stopaj', 'w8'],
    jurisdiction: 'US/TR',
    docType: 'checklist',
    slug: 'tax-treaty-claim-checklist',
    updatedAt: '2026-01-28',
    downloadUrl: '/documents/VergiAnlasmasiKontrolListesi-TR.docx',
  },

  // ===== LETTERS & NOTICES =====
  // English
  {
    id: 'demand-letter-en',
    lang: 'en',
    title: 'Demand Letter Template',
    shortDescription: 'Formal demand letter for payment or contract performance.',
    category: 'letters',
    tags: ['demand', 'payment', 'breach', 'collection', 'notice'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'demand-letter',
    updatedAt: '2026-01-25',
  },
  {
    id: 'termination-notice-en',
    lang: 'en',
    title: 'Contract Termination Notice',
    shortDescription: 'Notice template for terminating a contract or agreement.',
    category: 'letters',
    tags: ['termination', 'contract', 'notice', 'end', 'agreement'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'termination-notice',
    updatedAt: '2026-01-25',
  },
  {
    id: 'cease-desist-en',
    lang: 'en',
    title: 'Cease and Desist Letter Outline',
    shortDescription: 'Key elements for a cease and desist letter.',
    category: 'letters',
    tags: ['cease-desist', 'infringement', 'stop', 'legal', 'warning'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'cease-desist-outline',
    updatedAt: '2026-01-25',
  },

  // Turkish letters
  {
    id: 'demand-letter-tr',
    lang: 'tr',
    title: 'İhtar Mektubu Şablonu',
    shortDescription: 'Alacak tahsili veya sözleşmenin ifası talebiyle gönderilen resmi ihtar mektubu.',
    category: 'letters',
    tags: ['ihtar', 'odeme', 'ihlal', 'tahsilat', 'bildirim'],
    jurisdiction: 'US',
    docType: 'letter',
    slug: 'demand-letter',
    updatedAt: '2026-01-25',
  },
  {
    id: 'termination-notice-tr',
    lang: 'tr',
    title: 'Sözleşme Fesih Bildirimi',
    shortDescription: 'Mevcut bir sözleşmeyi sona erdirmek amacıyla karşı tarafa gönderilen fesih bildirimi.',
    category: 'letters',
    tags: ['fesih', 'sozlesme', 'bildirim', 'son', 'anlasma'],
    jurisdiction: 'General',
    docType: 'letter',
    slug: 'termination-notice',
    updatedAt: '2026-01-25',
  },
  {
    id: 'cease-desist-tr',
    lang: 'tr',
    title: 'İhlali Durdurma Mektubu Anahat',
    shortDescription: 'Hak ihlalinin durdurulmasını talep eden resmi uyarı mektubunun temel unsurları.',
    category: 'letters',
    tags: ['durdurma', 'ihlal', 'dur', 'hukuki', 'uyari'],
    jurisdiction: 'US',
    docType: 'guide',
    slug: 'cease-desist-outline',
    updatedAt: '2026-01-25',
  },
]

// Helper functions
export function getTemplatesByLang(lang: 'en' | 'tr'): Template[] {
  return templatesRegistry.filter(t => t.lang === lang)
}

export function getTemplatesByCategory(category: TemplateCategory, lang?: 'en' | 'tr'): Template[] {
  return templatesRegistry.filter(t =>
    t.category === category && (lang ? t.lang === lang : true)
  )
}

export function getTemplateBySlug(slug: string, lang: 'en' | 'tr'): Template | undefined {
  return templatesRegistry.find(t => t.slug === slug && t.lang === lang)
}

export function getTemplateById(id: string): Template | undefined {
  return templatesRegistry.find(t => t.id === id)
}

export function searchTemplates(
  query: string,
  lang: string,
  options?: {
    category?: TemplateCategory
    docType?: DocType
    jurisdiction?: Jurisdiction
    useCase?: UseCase
    includeBothLangs?: boolean
  }
): Template[] {
  const normalizedQuery = query.toLowerCase().trim()
  const normalizedLang = normalizeTemplateLang(lang)

  return templatesRegistry.filter(t => {
    // Language filter
    if (!options?.includeBothLangs && t.lang !== normalizedLang) return false

    // Category filter
    if (options?.category && t.category !== options.category) return false

    // DocType filter
    if (options?.docType && t.docType !== options.docType) return false

    // Jurisdiction filter
    if (options?.jurisdiction && t.jurisdiction !== options.jurisdiction) return false

    // UseCase filter
    if (options?.useCase && (!t.useCases || !t.useCases.includes(options.useCase))) return false

    // If no query, return all that match filters
    if (!normalizedQuery) return true

    // Search in title, description, and tags
    const searchableText = [
      t.title,
      t.shortDescription,
      ...t.tags,
    ].join(' ').toLowerCase()

    return searchableText.includes(normalizedQuery)
  })
}

export function getRelatedTemplates(template: Template, limit = 4): Template[] {
  return templatesRegistry
    .filter(t =>
      t.id !== template.id &&
      t.lang === template.lang &&
      (t.category === template.category || t.tags.some(tag => template.tags.includes(tag)))
    )
    .slice(0, limit)
}

export function getAllCategories(): TemplateCategory[] {
  return Object.keys(categoryLabels) as TemplateCategory[]
}

export function getAllDocTypes(): DocType[] {
  return Object.keys(docTypeLabels) as DocType[]
}

export function getAllJurisdictions(): Jurisdiction[] {
  return Object.keys(jurisdictionLabels) as Jurisdiction[]
}

export function getAllUseCases(): UseCase[] {
  return Object.keys(useCaseLabels) as UseCase[]
}

// Helper to normalize language codes to supported template languages
type TemplateLang = 'en' | 'tr'
function normalizeTemplateLang(lang: string): TemplateLang {
  return lang === 'tr' ? 'tr' : 'en'
}

/**
 * Get all published (visible) templates for a language.
 */
export function getPublishedTemplates(lang: string): Template[] {
  const normalizedLang = normalizeTemplateLang(lang)
  return templatesRegistry.filter(t => t.lang === normalizedLang)
}

/**
 * Get categories that have at least one template in the given language.
 */
export function getAvailableCategories(lang: string): TemplateCategory[] {
  const templates = getPublishedTemplates(lang)
  const categories = new Set(templates.map(t => t.category))
  return Array.from(categories)
}

/**
 * Get doc types that have at least one template in the given language.
 */
export function getAvailableDocTypes(lang: string): DocType[] {
  const templates = getPublishedTemplates(lang)
  const docTypes = new Set(templates.map(t => t.docType))
  return Array.from(docTypes)
}

/**
 * Get jurisdictions that have at least one template in the given language.
 */
export function getAvailableJurisdictions(lang: string): Jurisdiction[] {
  const templates = getPublishedTemplates(lang)
  const jurisdictions = new Set(templates.map(t => t.jurisdiction))
  return Array.from(jurisdictions)
}

/**
 * Get use cases that have at least one template in the given language.
 */
export function getAvailableUseCases(lang: string): UseCase[] {
  const templates = getPublishedTemplates(lang)
  const useCases = new Set<UseCase>()
  templates.forEach(t => {
    if (t.useCases) {
      t.useCases.forEach(uc => useCases.add(uc))
    }
  })
  return Array.from(useCases)
}
