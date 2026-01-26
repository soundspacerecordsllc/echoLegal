// lib/templates-registry.ts
// Canonical document registry for EchoLegal
// Single source of truth for all contracts, templates, forms, letters, and documents
// Migrated to support content-schema.ts canonical structure

import { JurisdictionCode, LanguageCode } from './jurisdictions'

// ============================================
// TYPE DEFINITIONS
// ============================================

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

// Legacy jurisdiction type for backward compatibility
export type Jurisdiction = 'US' | 'TR' | 'US/TR' | 'General'

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived'

export type UseCase =
  | 'freelancer'
  | 'startup'
  | 'ecommerce'
  | 'employer'
  | 'tax'
  | 'immigration'
  | 'personal'
  | 'general'

export type Template = {
  // Identity
  id: string
  lang: LanguageCode
  slug: string

  // Content
  title: string
  shortDescription: string
  category: TemplateCategory
  tags: string[]
  docType: DocType

  // Scope
  jurisdiction: Jurisdiction // Legacy field for backward compatibility
  jurisdictions?: JurisdictionCode[] // Canonical jurisdiction codes
  useCases?: UseCase[]

  // Status
  status?: ContentStatus
  updatedAt: string
  createdAt?: string

  // Files
  downloadUrl?: string
  fileLinks?: {
    format: 'docx' | 'pdf' | 'gdoc' | 'md'
    lang: LanguageCode
    url: string
  }[]

  // Flags
  isSample?: boolean
  requiresCustomization?: boolean

  // Relations
  relatedIds?: string[]

  // Contributor attribution
  authorId?: string
  reviewerId?: string
  lastReviewedAt?: string
}

// ============================================
// UI LABELS
// ============================================

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
  freelancer: { en: 'Freelancer / Consultant', tr: 'Serbest Çalışan / Danışman' },
  startup: { en: 'Startup Founder', tr: 'Startup Kurucusu' },
  ecommerce: { en: 'E-Commerce Seller', tr: 'E-Ticaret Satıcısı' },
  employer: { en: 'Employer / Hiring', tr: 'İşveren / İşe Alım' },
  tax: { en: 'Tax Compliance', tr: 'Vergi Uyumu' },
  immigration: { en: 'Immigration / Visa', tr: 'Göçmenlik / Vize' },
  personal: { en: 'Personal Documents', tr: 'Kişisel Belgeler' },
  general: { en: 'General Use', tr: 'Genel Kullanım' },
}

export const statusLabels: Record<ContentStatus, { en: string; tr: string }> = {
  draft: { en: 'Draft', tr: 'Taslak' },
  review: { en: 'Under Review', tr: 'İncelemede' },
  published: { en: 'Published', tr: 'Yayınlandı' },
  archived: { en: 'Archived', tr: 'Arşivlendi' },
}

// Use case tag mapping for filtering
export const useCaseTagMap: Record<UseCase, string[]> = {
  freelancer: ['freelance', 'contractor', 'client', 'service', 'independent', 'serbest', 'musteri'],
  startup: ['startup', 'founder', 'llc', 'formation', 'business', 'nda', 'kurulus', 'is'],
  ecommerce: ['ecommerce', 'privacy', 'terms', 'website', 'saas', 'app', 'online'],
  employer: ['contractor', 'hiring', 'employee', 'hr', 'policy', 'calisan', 'ik'],
  tax: ['tax', 'irs', 'w8', 'w9', '1099', 'ein', 'itin', 'vergi'],
  immigration: ['visa', 'immigration', 'sponsor', 'consulate', 'travel', 'vize', 'konsolosluk'],
  personal: ['personal', 'identity', 'affidavit', 'residency', 'translation', 'kimlik'],
  general: [],
}

// ============================================
// TEMPLATES REGISTRY - ALL EXISTING CONTENT PRESERVED
// ============================================

export const templatesRegistry: Template[] = [
  // ===== CONTRACTS =====
  // English contracts
  {
    id: 'nda-en',
    lang: 'en',
    title: 'Non-Disclosure Agreement (NDA)',
    shortDescription: 'Protect confidential information when discussing business opportunities or partnerships.',
    category: 'contracts',
    tags: ['nda', 'confidentiality', 'business', 'partnership', 'startup'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['startup', 'freelancer', 'employer'],
    docType: 'contract',
    slug: 'nda',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup'],
    docType: 'contract',
    slug: 'service-agreement',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['employer', 'startup'],
    docType: 'contract',
    slug: 'independent-contractor',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['ecommerce', 'startup'],
    docType: 'template',
    slug: 'privacy-policy',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['ecommerce', 'startup'],
    docType: 'template',
    slug: 'terms-of-service',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['freelancer'],
    docType: 'contract',
    slug: 'freelance-agreement',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup'],
    docType: 'contract',
    slug: 'influencer-agreement',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
    relatedIds: ['service-agreement-en'],
  },

  // Turkish contracts
  {
    id: 'nda-tr',
    lang: 'tr',
    title: 'Gizlilik Sözleşmesi (NDA)',
    shortDescription: 'İş fırsatlarını veya ortaklıkları görüşürken gizli bilgileri koruyun.',
    category: 'contracts',
    tags: ['nda', 'gizlilik', 'is', 'ortaklik', 'startup'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['startup', 'freelancer', 'employer'],
    docType: 'contract',
    slug: 'nda',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
    relatedIds: ['service-agreement-tr', 'independent-contractor-tr'],
  },
  {
    id: 'service-agreement-tr',
    lang: 'tr',
    title: 'Hizmet Sözleşmesi',
    shortDescription: 'Müşteri işleri için kapsam, ödeme koşulları ve teslim edilecekleri tanımlayın.',
    category: 'contracts',
    tags: ['hizmet', 'musteri', 'kapsam', 'odeme', 'teslim', 'serbest'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup'],
    docType: 'contract',
    slug: 'service-agreement',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
    relatedIds: ['independent-contractor-tr', 'nda-tr'],
  },
  {
    id: 'independent-contractor-tr',
    lang: 'tr',
    title: 'Bağımsız Yüklenici Sözleşmesi',
    shortDescription: 'Serbest çalışan veya yüklenici çalıştırırken net koşullar belirleyin.',
    category: 'contracts',
    tags: ['yuklenici', 'serbest', 'calisan', '1099', 'bagimsiz'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['employer', 'startup'],
    docType: 'contract',
    slug: 'independent-contractor',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
    relatedIds: ['service-agreement-tr', 'nda-tr'],
  },
  {
    id: 'privacy-policy-tr',
    lang: 'tr',
    title: 'Gizlilik Politikası',
    shortDescription: 'Web siteniz veya uygulamanız için KVKK uyumlu gizlilik politikası.',
    category: 'contracts',
    tags: ['gizlilik', 'kvkk', 'website', 'uygulama', 'veri'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['ecommerce', 'startup'],
    docType: 'template',
    slug: 'privacy-policy',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
    relatedIds: ['terms-of-service-tr'],
  },
  {
    id: 'terms-of-service-tr',
    lang: 'tr',
    title: 'Kullanım Koşulları',
    shortDescription: 'Web siteleri, uygulamalar ve çevrimiçi hizmetler için kullanım şartları.',
    category: 'contracts',
    tags: ['kosullar', 'sartlar', 'website', 'uygulama', 'saas'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['ecommerce', 'startup'],
    docType: 'template',
    slug: 'terms-of-service',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
    relatedIds: ['privacy-policy-tr'],
  },
  {
    id: 'freelance-agreement-tr',
    lang: 'tr',
    title: 'Freelance Sözleşmesi',
    shortDescription: 'ABD müşterileriyle serbest çalışma için sözleşme şablonu.',
    category: 'contracts',
    tags: ['freelance', 'uzaktan', 'musteri', 'proje', 'kapsam'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['freelancer'],
    docType: 'contract',
    slug: 'freelance-agreement',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup'],
    docType: 'contract',
    slug: 'influencer-agreement',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup'],
    docType: 'template',
    slug: 'invoice-template',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'receipt-template-en',
    lang: 'en',
    title: 'Payment Receipt Template',
    shortDescription: 'Receipt template confirming payment received.',
    category: 'business',
    tags: ['receipt', 'payment', 'confirmation', 'record'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['freelancer', 'startup', 'general'],
    docType: 'template',
    slug: 'receipt-template',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'authorization-letter-en',
    lang: 'en',
    title: 'Authorization Letter',
    shortDescription: 'Letter authorizing someone to act on your behalf.',
    category: 'business',
    tags: ['authorization', 'proxy', 'representative', 'agent'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'general'],
    docType: 'letter',
    slug: 'authorization-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'company-policy-notice-en',
    lang: 'en',
    title: 'Company Policy Notice Template',
    shortDescription: 'Template for communicating policy updates to employees or contractors.',
    category: 'business',
    tags: ['policy', 'notice', 'employee', 'hr', 'company'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['employer', 'startup'],
    docType: 'template',
    slug: 'company-policy-notice',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'operating-agreement-outline-en',
    lang: 'en',
    title: 'LLC Operating Agreement Outline',
    shortDescription: 'Key sections and considerations for a single-member LLC operating agreement.',
    category: 'business',
    tags: ['llc', 'operating-agreement', 'formation', 'single-member'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['startup'],
    docType: 'guide',
    slug: 'operating-agreement-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },

  // Turkish business
  {
    id: 'invoice-template-tr',
    lang: 'tr',
    title: 'Fatura Şablonu',
    shortDescription: 'ABD müşterilerini faturalandırmak için profesyonel fatura şablonu.',
    category: 'business',
    tags: ['fatura', 'faturalandirma', 'odeme', 'musteri', 'serbest'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup'],
    docType: 'template',
    slug: 'invoice-template',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'receipt-template-tr',
    lang: 'tr',
    title: 'Ödeme Makbuzu Şablonu',
    shortDescription: 'Alınan ödemeyi onaylayan makbuz şablonu.',
    category: 'business',
    tags: ['makbuz', 'odeme', 'onay', 'kayit'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['freelancer', 'startup', 'general'],
    docType: 'template',
    slug: 'receipt-template',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'authorization-letter-tr',
    lang: 'tr',
    title: 'Yetki Mektubu',
    shortDescription: 'Birinin sizin adınıza hareket etmesine yetki veren mektup.',
    category: 'business',
    tags: ['yetki', 'vekalet', 'temsilci', 'vekil'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'general'],
    docType: 'letter',
    slug: 'authorization-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'company-policy-notice-tr',
    lang: 'tr',
    title: 'Şirket Politikası Bildirim Şablonu',
    shortDescription: 'Çalışanlara veya yüklenicilere politika güncellemelerini iletmek için şablon.',
    category: 'business',
    tags: ['politika', 'bildirim', 'calisan', 'ik', 'sirket'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['employer', 'startup'],
    docType: 'template',
    slug: 'company-policy-notice',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'operating-agreement-outline-tr',
    lang: 'tr',
    title: 'LLC Operating Agreement Anahat',
    shortDescription: 'Tek üyeli LLC işletme sözleşmesi için temel bölümler ve dikkat edilecekler.',
    category: 'business',
    tags: ['llc', 'isletme-sozlesmesi', 'kurulus', 'tek-uyeli'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['startup'],
    docType: 'guide',
    slug: 'operating-agreement-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['immigration'],
    docType: 'letter',
    slug: 'visa-appointment-cover-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'sponsor-letter-en',
    lang: 'en',
    title: 'Sponsor Letter Template',
    shortDescription: 'Letter of support for visa applications from a US sponsor.',
    category: 'immigration',
    tags: ['sponsor', 'visa', 'support', 'invitation', 'host'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['immigration'],
    docType: 'letter',
    slug: 'sponsor-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'affidavit-support-outline-en',
    lang: 'en',
    title: 'Affidavit of Support Outline',
    shortDescription: 'Key elements for an affidavit of financial support.',
    category: 'immigration',
    tags: ['affidavit', 'support', 'financial', 'i-134', 'sponsor'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['immigration'],
    docType: 'guide',
    slug: 'affidavit-support-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'travel-consent-letter-en',
    lang: 'en',
    title: 'Child Travel Consent Letter',
    shortDescription: 'Parental consent letter for minors traveling internationally.',
    category: 'immigration',
    tags: ['travel', 'consent', 'minor', 'child', 'parental'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'immigration'],
    docType: 'letter',
    slug: 'travel-consent-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'consulate-appointment-request-en',
    lang: 'en',
    title: 'Consulate Appointment Request',
    shortDescription: 'Template for requesting consulate services or appointments.',
    category: 'immigration',
    tags: ['consulate', 'appointment', 'request', 'services'],
    jurisdiction: 'US/TR',
    jurisdictions: ['US', 'TR'],
    useCases: ['immigration'],
    docType: 'letter',
    slug: 'consulate-appointment-request',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },

  // Turkish immigration
  {
    id: 'visa-appointment-cover-tr',
    lang: 'tr',
    title: 'Vize Randevu Kapak Yazısı',
    shortDescription: 'ABD vize mülakat randevuları için kapak yazısı şablonu.',
    category: 'immigration',
    tags: ['vize', 'randevu', 'konsolosluk', 'kapak-yazisi', 'mulakat'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['immigration'],
    docType: 'letter',
    slug: 'visa-appointment-cover-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'sponsor-letter-tr',
    lang: 'tr',
    title: 'Sponsor Mektubu Şablonu',
    shortDescription: 'ABD sponsorundan vize başvuruları için destek mektubu.',
    category: 'immigration',
    tags: ['sponsor', 'vize', 'destek', 'davet', 'ev-sahibi'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['immigration'],
    docType: 'letter',
    slug: 'sponsor-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'affidavit-support-outline-tr',
    lang: 'tr',
    title: 'Mali Destek Beyanı Anahat',
    shortDescription: 'Mali destek beyanı için temel unsurlar.',
    category: 'immigration',
    tags: ['beyan', 'destek', 'mali', 'i-134', 'sponsor'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['immigration'],
    docType: 'guide',
    slug: 'affidavit-support-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'travel-consent-letter-tr',
    lang: 'tr',
    title: 'Çocuk Seyahat İzin Mektubu',
    shortDescription: 'Uluslararası seyahat eden küçükler için ebeveyn izin mektubu.',
    category: 'immigration',
    tags: ['seyahat', 'izin', 'kucuk', 'cocuk', 'ebeveyn'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'immigration'],
    docType: 'letter',
    slug: 'travel-consent-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'consulate-appointment-request-tr',
    lang: 'tr',
    title: 'Konsolosluk Randevu Talebi',
    shortDescription: 'Konsolosluk hizmetleri veya randevuları talep etmek için şablon.',
    category: 'immigration',
    tags: ['konsolosluk', 'randevu', 'talep', 'hizmetler'],
    jurisdiction: 'US/TR',
    jurisdictions: ['US', 'TR'],
    useCases: ['immigration'],
    docType: 'letter',
    slug: 'consulate-appointment-request',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['TR'],
    useCases: ['personal', 'immigration'],
    docType: 'sample',
    slug: 'nufus-cuzdani-example',
    status: 'published',
    updatedAt: '2026-01-25',
    isSample: true,
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'power-of-attorney-outline-en',
    lang: 'en',
    title: 'Power of Attorney Outline',
    shortDescription: 'Key elements and considerations for a general power of attorney document.',
    category: 'personal',
    tags: ['power-of-attorney', 'poa', 'legal', 'authorization', 'proxy'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal'],
    docType: 'guide',
    slug: 'power-of-attorney-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'residency-proof-letter-en',
    lang: 'en',
    title: 'Proof of Residency Letter',
    shortDescription: 'Template for a letter confirming residential address.',
    category: 'personal',
    tags: ['residency', 'proof', 'address', 'verification', 'letter'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal'],
    docType: 'letter',
    slug: 'residency-proof-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'translation-certification-en',
    lang: 'en',
    title: 'Translation Certification Statement',
    shortDescription: 'Certification statement template for translated documents.',
    category: 'personal',
    tags: ['translation', 'certification', 'certified', 'document', 'official'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'immigration'],
    docType: 'template',
    slug: 'translation-certification',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'apostille-request-sample-en',
    lang: 'en',
    title: 'Apostille Request - Reference Guide',
    shortDescription: 'Understanding apostille requirements and the request process.',
    category: 'personal',
    tags: ['apostille', 'hague', 'legalization', 'document', 'official'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'immigration'],
    docType: 'sample',
    slug: 'apostille-request-guide',
    status: 'published',
    updatedAt: '2026-01-25',
    isSample: true,
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'name-change-affidavit-en',
    lang: 'en',
    title: 'Name Change Affidavit Outline',
    shortDescription: 'Key elements for a name change affidavit document.',
    category: 'personal',
    tags: ['name-change', 'affidavit', 'legal', 'identity'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['personal'],
    docType: 'guide',
    slug: 'name-change-affidavit',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['TR'],
    useCases: ['personal', 'immigration'],
    docType: 'sample',
    slug: 'nufus-cuzdani-example',
    status: 'published',
    updatedAt: '2026-01-25',
    isSample: true,
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'power-of-attorney-outline-tr',
    lang: 'tr',
    title: 'Vekaletname Anahat',
    shortDescription: 'Genel vekaletname belgesi için temel unsurlar ve dikkat edilecekler.',
    category: 'personal',
    tags: ['vekaletname', 'vekalet', 'hukuki', 'yetki', 'vekil'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal'],
    docType: 'guide',
    slug: 'power-of-attorney-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'residency-proof-letter-tr',
    lang: 'tr',
    title: 'İkametgah Belgesi Mektubu',
    shortDescription: 'İkamet adresini doğrulayan mektup şablonu.',
    category: 'personal',
    tags: ['ikametgah', 'belge', 'adres', 'dogrulama', 'mektup'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal'],
    docType: 'letter',
    slug: 'residency-proof-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'translation-certification-tr',
    lang: 'tr',
    title: 'Tercüme Sertifikası Beyanı',
    shortDescription: 'Tercüme edilmiş belgeler için sertifika beyanı şablonu.',
    category: 'personal',
    tags: ['tercume', 'sertifika', 'onayli', 'belge', 'resmi'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'immigration'],
    docType: 'template',
    slug: 'translation-certification',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'apostille-request-sample-tr',
    lang: 'tr',
    title: 'Apostil Talebi - Referans Rehberi',
    shortDescription: 'Apostil gereksinimleri ve talep sürecini anlama.',
    category: 'personal',
    tags: ['apostil', 'lahey', 'tasdik', 'belge', 'resmi'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['personal', 'immigration'],
    docType: 'sample',
    slug: 'apostille-request-guide',
    status: 'published',
    updatedAt: '2026-01-25',
    isSample: true,
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'name-change-affidavit-tr',
    lang: 'tr',
    title: 'İsim Değişikliği Beyanı Anahat',
    shortDescription: 'İsim değişikliği beyan belgesi için temel unsurlar.',
    category: 'personal',
    tags: ['isim-degisikligi', 'beyan', 'hukuki', 'kimlik'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['personal'],
    docType: 'guide',
    slug: 'name-change-affidavit',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['tax', 'freelancer'],
    docType: 'checklist',
    slug: 'w8-attachment-checklist',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'ein-request-cover-letter-en',
    lang: 'en',
    title: 'EIN Request Cover Letter',
    shortDescription: 'Cover letter template for mailing or faxing EIN applications.',
    category: 'tax',
    tags: ['ein', 'ss-4', 'irs', 'tax-id', 'application'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['tax', 'startup'],
    docType: 'letter',
    slug: 'ein-request-cover-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'vendor-onboarding-form-en',
    lang: 'en',
    title: 'Vendor Onboarding Form Outline',
    shortDescription: 'Key fields for a vendor/contractor onboarding form.',
    category: 'tax',
    tags: ['vendor', 'onboarding', 'contractor', 'w9', 'w8'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['employer', 'tax'],
    docType: 'form',
    slug: 'vendor-onboarding-form',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'itin-application-guide-en',
    lang: 'en',
    title: 'ITIN Application Preparation Guide',
    shortDescription: 'Checklist and guidance for ITIN (W-7) application preparation.',
    category: 'tax',
    tags: ['itin', 'w-7', 'irs', 'tax-id', 'application'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['tax', 'freelancer'],
    docType: 'checklist',
    slug: 'itin-application-guide',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: '1099-response-letter-en',
    lang: 'en',
    title: '1099 Inquiry Response Letter',
    shortDescription: 'Template for responding to client requests for 1099 information.',
    category: 'tax',
    tags: ['1099', 'tax', 'irs', 'response', 'inquiry'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['tax', 'freelancer'],
    docType: 'letter',
    slug: '1099-response-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'tax-treaty-claim-checklist-en',
    lang: 'en',
    title: 'Tax Treaty Benefits Claim Checklist',
    shortDescription: 'Documents needed to claim US-Turkey tax treaty benefits.',
    category: 'tax',
    tags: ['tax-treaty', 'turkey', 'benefits', 'withholding', 'w8'],
    jurisdiction: 'US/TR',
    jurisdictions: ['US', 'TR'],
    useCases: ['tax'],
    docType: 'checklist',
    slug: 'tax-treaty-claim-checklist',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },

  // Turkish tax
  {
    id: 'w8-attachment-checklist-tr',
    lang: 'tr',
    title: 'W-8BEN Ekleri Kontrol Listesi',
    shortDescription: 'W-8BEN formlarını gönderirken eklenecek belgelerin kontrol listesi.',
    category: 'tax',
    tags: ['w8', 'w8ben', 'irs', 'vergi', 'stopaj', 'kontrol-listesi'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['tax', 'freelancer'],
    docType: 'checklist',
    slug: 'w8-attachment-checklist',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'ein-request-cover-letter-tr',
    lang: 'tr',
    title: 'EIN Başvuru Kapak Yazısı',
    shortDescription: 'EIN başvurularını posta veya faks ile göndermek için kapak yazısı şablonu.',
    category: 'tax',
    tags: ['ein', 'ss-4', 'irs', 'vergi-kimlik', 'basvuru'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['tax', 'startup'],
    docType: 'letter',
    slug: 'ein-request-cover-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'vendor-onboarding-form-tr',
    lang: 'tr',
    title: 'Tedarikçi Kayıt Formu Anahat',
    shortDescription: 'Tedarikçi/yüklenici kayıt formu için temel alanlar.',
    category: 'tax',
    tags: ['tedarikci', 'kayit', 'yuklenici', 'w9', 'w8'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['employer', 'tax'],
    docType: 'form',
    slug: 'vendor-onboarding-form',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'itin-application-guide-tr',
    lang: 'tr',
    title: 'ITIN Başvuru Hazırlık Rehberi',
    shortDescription: 'ITIN (W-7) başvuru hazırlığı için kontrol listesi ve rehberlik.',
    category: 'tax',
    tags: ['itin', 'w-7', 'irs', 'vergi-kimlik', 'basvuru'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['tax', 'freelancer'],
    docType: 'checklist',
    slug: 'itin-application-guide',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: '1099-response-letter-tr',
    lang: 'tr',
    title: '1099 Sorgu Yanıt Mektubu',
    shortDescription: 'Müşterilerin 1099 bilgi taleplerine yanıt vermek için şablon.',
    category: 'tax',
    tags: ['1099', 'vergi', 'irs', 'yanit', 'sorgu'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['tax', 'freelancer'],
    docType: 'letter',
    slug: '1099-response-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'tax-treaty-claim-checklist-tr',
    lang: 'tr',
    title: 'Vergi Anlaşması Avantajları Kontrol Listesi',
    shortDescription: 'ABD-Türkiye vergi anlaşması avantajlarından yararlanmak için gerekli belgeler.',
    category: 'tax',
    tags: ['vergi-anlasmasi', 'turkiye', 'avantajlar', 'stopaj', 'w8'],
    jurisdiction: 'US/TR',
    jurisdictions: ['US', 'TR'],
    useCases: ['tax'],
    docType: 'checklist',
    slug: 'tax-treaty-claim-checklist',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
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
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup', 'general'],
    docType: 'letter',
    slug: 'demand-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'termination-notice-en',
    lang: 'en',
    title: 'Contract Termination Notice',
    shortDescription: 'Notice template for terminating a contract or agreement.',
    category: 'letters',
    tags: ['termination', 'contract', 'notice', 'end', 'agreement'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['freelancer', 'employer', 'general'],
    docType: 'letter',
    slug: 'termination-notice',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'cease-desist-en',
    lang: 'en',
    title: 'Cease and Desist Letter Outline',
    shortDescription: 'Key elements for a cease and desist letter.',
    category: 'letters',
    tags: ['cease-desist', 'infringement', 'stop', 'legal', 'warning'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['startup', 'general'],
    docType: 'guide',
    slug: 'cease-desist-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },

  // Turkish letters
  {
    id: 'demand-letter-tr',
    lang: 'tr',
    title: 'İhtar Mektubu Şablonu',
    shortDescription: 'Ödeme veya sözleşme ifası için resmi ihtar mektubu.',
    category: 'letters',
    tags: ['ihtar', 'odeme', 'ihlal', 'tahsilat', 'bildirim'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['freelancer', 'startup', 'general'],
    docType: 'letter',
    slug: 'demand-letter',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'termination-notice-tr',
    lang: 'tr',
    title: 'Sözleşme Fesih Bildirimi',
    shortDescription: 'Bir sözleşme veya anlaşmayı feshetmek için bildirim şablonu.',
    category: 'letters',
    tags: ['fesih', 'sozlesme', 'bildirim', 'son', 'anlasma'],
    jurisdiction: 'General',
    jurisdictions: ['GENERAL'],
    useCases: ['freelancer', 'employer', 'general'],
    docType: 'letter',
    slug: 'termination-notice',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
  {
    id: 'cease-desist-tr',
    lang: 'tr',
    title: 'İhlali Durdurma Mektubu Anahat',
    shortDescription: 'İhlali durdurma mektubu için temel unsurlar.',
    category: 'letters',
    tags: ['durdurma', 'ihlal', 'dur', 'hukuki', 'uyari'],
    jurisdiction: 'US',
    jurisdictions: ['US'],
    useCases: ['startup', 'general'],
    docType: 'guide',
    slug: 'cease-desist-outline',
    status: 'published',
    updatedAt: '2026-01-25',
    authorId: 'zeynep-moore',
    reviewerId: 'zeynep-moore',
    lastReviewedAt: '2026-01-25',
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTemplatesByLang(lang: LanguageCode): Template[] {
  return templatesRegistry.filter(t => t.lang === lang)
}

export function getPublishedTemplates(lang?: LanguageCode): Template[] {
  return templatesRegistry.filter(
    t => t.status === 'published' && (lang ? t.lang === lang : true)
  )
}

export function getTemplatesByCategory(category: TemplateCategory, lang?: LanguageCode): Template[] {
  return templatesRegistry.filter(t =>
    t.category === category && (lang ? t.lang === lang : true)
  )
}

export function getTemplateBySlug(slug: string, lang: LanguageCode): Template | undefined {
  return templatesRegistry.find(t => t.slug === slug && t.lang === lang)
}

export function getTemplateById(id: string): Template | undefined {
  return templatesRegistry.find(t => t.id === id)
}

export function getTemplatesByUseCase(useCase: UseCase, lang?: LanguageCode): Template[] {
  return templatesRegistry.filter(t =>
    t.useCases?.includes(useCase) && (lang ? t.lang === lang : true)
  )
}

export function searchTemplates(
  query: string,
  lang: LanguageCode,
  options?: {
    category?: TemplateCategory
    docType?: DocType
    jurisdiction?: Jurisdiction
    useCase?: UseCase
    includeBothLangs?: boolean
  }
): Template[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) {
    return getTemplatesByLang(lang)
  }

  return templatesRegistry.filter(t => {
    // Language filter
    if (!options?.includeBothLangs && t.lang !== lang) return false

    // Status filter - only show published
    if (t.status !== 'published') return false

    // Category filter
    if (options?.category && t.category !== options.category) return false

    // DocType filter
    if (options?.docType && t.docType !== options.docType) return false

    // Jurisdiction filter
    if (options?.jurisdiction && t.jurisdiction !== options.jurisdiction) return false

    // Use case filter
    if (options?.useCase && !t.useCases?.includes(options.useCase)) return false

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
      t.status === 'published' &&
      (t.category === template.category || t.tags.some(tag => template.tags.includes(tag)))
    )
    .slice(0, limit)
}

// ============================================
// METADATA HELPERS
// ============================================

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

// Get unique values from registry for dynamic filters
export function getAvailableCategories(lang: LanguageCode): TemplateCategory[] {
  const categories = new Set<TemplateCategory>()
  templatesRegistry
    .filter(t => t.lang === lang && t.status === 'published')
    .forEach(t => categories.add(t.category))
  return Array.from(categories)
}

export function getAvailableDocTypes(lang: LanguageCode): DocType[] {
  const types = new Set<DocType>()
  templatesRegistry
    .filter(t => t.lang === lang && t.status === 'published')
    .forEach(t => types.add(t.docType))
  return Array.from(types)
}

export function getAvailableJurisdictions(lang: LanguageCode): Jurisdiction[] {
  const jurisdictions = new Set<Jurisdiction>()
  templatesRegistry
    .filter(t => t.lang === lang && t.status === 'published')
    .forEach(t => jurisdictions.add(t.jurisdiction))
  return Array.from(jurisdictions)
}

export function getAvailableUseCases(lang: LanguageCode): UseCase[] {
  const useCases = new Set<UseCase>()
  templatesRegistry
    .filter(t => t.lang === lang && t.status === 'published')
    .forEach(t => t.useCases?.forEach(uc => useCases.add(uc)))
  return Array.from(useCases)
}

// ============================================
// CONTRIBUTOR ATTRIBUTION
// ============================================

export const DEFAULT_AUTHOR_ID = 'zeynep-moore'
export const DEFAULT_REVIEWER_ID = 'zeynep-moore'

export function getTemplateAuthorId(template: Template): string {
  return template.authorId || DEFAULT_AUTHOR_ID
}

export function getTemplateReviewerId(template: Template): string | undefined {
  return template.reviewerId || DEFAULT_REVIEWER_ID
}

export function getTemplatesByAuthor(authorId: string): Template[] {
  return templatesRegistry.filter(
    t => t.authorId === authorId || (!t.authorId && authorId === DEFAULT_AUTHOR_ID)
  )
}

export function getTemplatesByJurisdiction(
  jurisdiction: Jurisdiction,
  lang?: LanguageCode
): Template[] {
  return templatesRegistry.filter(
    t => t.jurisdiction === jurisdiction && (lang ? t.lang === lang : true)
  )
}

// ============================================
// STATISTICS
// ============================================

export function getRegistryStats(lang?: LanguageCode) {
  const filtered = lang
    ? templatesRegistry.filter(t => t.lang === lang)
    : templatesRegistry

  const published = filtered.filter(t => t.status === 'published')

  return {
    total: filtered.length,
    published: published.length,
    byCategory: getAllCategories().reduce((acc, cat) => {
      acc[cat] = published.filter(t => t.category === cat).length
      return acc
    }, {} as Record<TemplateCategory, number>),
    byDocType: getAllDocTypes().reduce((acc, type) => {
      acc[type] = published.filter(t => t.docType === type).length
      return acc
    }, {} as Record<DocType, number>),
    byJurisdiction: getAllJurisdictions().reduce((acc, jur) => {
      acc[jur] = published.filter(t => t.jurisdiction === jur).length
      return acc
    }, {} as Record<Jurisdiction, number>),
  }
}
