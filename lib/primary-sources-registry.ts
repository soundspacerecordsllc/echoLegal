/**
 * EchoLegal Primary Sources Registry
 *
 * Single source of truth for all primarySources arrays.
 * Pages MUST import from this registry — inline primarySources
 * arrays in page components are a lint violation.
 *
 * Each entry is keyed by page slug. Labels support bilingual
 * resolution via { en, tr? } objects.
 */

import type { PrimarySourceEntry, PrimarySourceType, AuthorityLevel } from './content-schema'

type BilingualLabel = { en: string; tr?: string }

type RegistryEntry = {
  type: PrimarySourceType
  citation: string
  label?: BilingualLabel
  url?: string
  authorityLevel: AuthorityLevel
  canonicalId: string
  jurisdiction: string
}

// ============================================
// REGISTRY DATA
// ============================================

const REGISTRY: Record<string, RegistryEntry[]> = {
  'foreign-owned-single-member-llc-reporting': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 6038A',
      label: {
        en: 'Information with respect to certain foreign-owned corporations',
        tr: 'Belirli yabancı sermayeli şirketlere ilişkin bilgi',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6038A&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-6038A',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.6038A-1',
      label: {
        en: 'General requirements and definitions for information reporting',
        tr: 'Bilgi raporlaması için genel gereksinimler ve tanımlar',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRd277d0563e9069f/section-1.6038A-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-1.6038A-1',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 6038A(d)',
      label: {
        en: 'Penalty for failure to furnish information or maintain records',
        tr: 'Bilgi sağlama veya kayıt tutma başarısızlığı cezası',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6038A&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-6038A-d',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form 5472',
      label: {
        en: 'Information Return of a 25% Foreign-Owned U.S. Corporation or a Foreign Corporation Engaged in a U.S. Trade or Business',
        tr: 'Yüzde 25 yabancı sermayeli ABD şirketi veya ABD ticareti veya işiyle uğraşan yabancı şirket bilgi beyannamesi',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-5472',
      authorityLevel: 'form_instruction',
      canonicalId: 'US-IRS-FORM-5472-INSTR',
      jurisdiction: 'US',
    },
  ],

  'ein-itin-ssn-farki': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 6109',
      label: { en: 'Identifying numbers — statutory requirement for tax identification' },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6109&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-6109',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 301.6109-1',
      label: { en: 'Identifying numbers — regulatory implementation' },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/section-301.6109-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-301.6109-1',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '42 U.S.C. § 405(c)(2)',
      label: { en: 'Social Security Numbers — issuance authority' },
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-42-405-c',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 1635',
      label: { en: 'Employer Identification Number — understanding your EIN' },
      url: 'https://www.irs.gov/publications/p1635',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-1635',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form W-7',
      label: { en: 'Application for IRS Individual Taxpayer Identification Number' },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-7',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-w-7',
      jurisdiction: 'US',
    },
  ],

  'irs-vergiler-ve-w8-w9-gercekleri': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 1441',
      label: { en: 'Withholding of tax on nonresident aliens' },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section1441&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-1441',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(b)',
      label: { en: 'Definition of resident alien and nonresident alien' },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-7701-b',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.1441-1',
      label: { en: 'Requirement for the deduction and withholding of tax on payments to foreign persons' },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRe7928eed88ac04b/section-1.1441-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-1.1441-1',
      jurisdiction: 'US',
    },
    {
      type: 'Treaty',
      citation: 'U.S.–Turkey Income Tax Treaty (1996)',
      label: { en: 'Convention for the avoidance of double taxation' },
      url: 'https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents',
      authorityLevel: 'treaty',
      canonicalId: 'treaty-us-turkey-1996',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 515',
      label: { en: 'Withholding of Tax on Nonresident Aliens and Foreign Entities' },
      url: 'https://www.irs.gov/publications/p515',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-515',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form W-8BEN',
      label: { en: 'Certificate of Foreign Status of Beneficial Owner' },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-8-ben',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-w-8ben',
      jurisdiction: 'US',
    },
  ],

  'abd-de-llc-kurmak-turkler-icin-adim-adim': [
    {
      type: 'CFR',
      citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
      label: { en: 'Entity classification regulations (check-the-box)' },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/subject-group-ECFRa28caacb356462e',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-301.7701-1',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(a)(3)–(4)',
      label: { en: 'Definitions of "corporation" and "domestic"' },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-7701-a',
      jurisdiction: 'US',
    },
    {
      type: 'StateStatute',
      citation: '6 Del. C. § 18-101 et seq.',
      label: { en: 'Delaware Limited Liability Company Act' },
      authorityLevel: 'state_statute',
      canonicalId: 'del-stat-c-6-18-101',
      jurisdiction: 'US-DE',
    },
    {
      type: 'USC',
      citation: '31 U.S.C. § 5336',
      label: { en: 'Corporate Transparency Act — beneficial ownership reporting' },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title31-section5336&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-31-5336',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Rev. Proc. 2023-32',
      label: { en: 'EIN application procedures for foreign-owned entities' },
      url: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
      authorityLevel: 'agency_guidance',
      canonicalId: 'guidance-irs-rev-proc-2023-32',
      jurisdiction: 'US',
    },
  ],

  // ============================================
  // MIGRATED PAGES (Signal Architecture scale-out)
  // ============================================

  '1099-vergi-belgeleri': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 6041',
      label: {
        en: 'Returns regarding payments of $600 or more',
        tr: '600 dolar ve üzeri ödemeler için bilgi beyannameleri',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6041&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-6041',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 1441',
      label: {
        en: 'Withholding of tax on nonresident aliens',
        tr: 'Yerleşik olmayan yabancılardan vergi kesintisi',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section1441&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-1441',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 3406',
      label: {
        en: 'Backup withholding',
        tr: 'Yedek stopaj',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section3406&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-3406',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.6041-1',
      label: {
        en: 'Return of information as to payments',
        tr: 'Ödemelere ilişkin bilgi beyannamesi',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRac0cd4e10a77e87/section-1.6041-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-1.6041-1',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form 1099-NEC',
      label: {
        en: 'Nonemployee Compensation',
        tr: 'Çalışan dışı tazminat',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-1099-nec',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-1099-nec',
      jurisdiction: 'US',
    },
  ],

  'abd-odemeleri-alma-rehberi': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 1441',
      label: {
        en: 'Withholding of tax on nonresident aliens',
        tr: 'Yerleşik olmayan yabancılardan vergi kesintisi',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section1441&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-1441',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(b)',
      label: {
        en: 'Definition of resident alien and nonresident alien',
        tr: 'Yerleşik ve yerleşik olmayan yabancı tanımı',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-7701-b',
      jurisdiction: 'US',
    },
    {
      type: 'Treaty',
      citation: 'U.S.–Turkey Income Tax Treaty (1996)',
      label: {
        en: 'Convention for the avoidance of double taxation',
        tr: 'Çifte vergilendirmenin önlenmesi anlaşması',
      },
      url: 'https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents',
      authorityLevel: 'treaty',
      canonicalId: 'treaty-us-turkey-1996',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 515',
      label: {
        en: 'Withholding of Tax on Nonresident Aliens and Foreign Entities',
        tr: 'Yerleşik olmayan yabancılar ve yabancı kuruluşlardan vergi kesintisi',
      },
      url: 'https://www.irs.gov/publications/p515',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-515',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form W-8BEN',
      label: {
        en: 'Certificate of Foreign Status of Beneficial Owner',
        tr: 'Gerçek lehtar yabancı statü belgesi',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-8-ben',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-w-8ben',
      jurisdiction: 'US',
    },
  ],

  'abd-satis-vergisi-rehberi': [
    {
      type: 'Other',
      citation: 'U.S. Const. art. I, § 8, cl. 3',
      label: {
        en: 'Commerce Clause — congressional power to regulate interstate commerce',
        tr: 'Ticaret Maddesi — eyaletler arası ticareti düzenleme yetkisi',
      },
      authorityLevel: 'constitutional',
      canonicalId: 'us-const-art-1-s8-cl3',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '15 U.S.C. § 8721',
      label: {
        en: 'Remote Transactions Parity Act considerations',
        tr: 'Uzaktan işlem eşitliği hususları',
      },
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-15-8721',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 334',
      label: {
        en: 'Tax Guide for Small Business',
        tr: 'Küçük İşletmeler İçin Vergi Rehberi',
      },
      url: 'https://www.irs.gov/publications/p334',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-334',
      jurisdiction: 'US',
    },
  ],

  'ds-160-rehberi': [
    {
      type: 'USC',
      citation: '8 U.S.C. § 1202',
      label: {
        en: 'Application for visas',
        tr: 'Vize başvurusu',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title8-section1202&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-8-1202',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '8 U.S.C. § 1184(b)',
      label: {
        en: 'Presumption of immigrant intent (INA § 214(b))',
        tr: 'Göçmen niyeti karinesi (INA § 214(b))',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title8-section1184&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-8-1184-b',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '22 C.F.R. § 41.103',
      label: {
        en: 'Filing an application for a visa',
        tr: 'Vize başvurusu yapma',
      },
      url: 'https://www.ecfr.gov/current/title-22/chapter-I/subchapter-E/part-41/subpart-C/section-41.103',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-22-41.103',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 519',
      label: {
        en: 'U.S. Tax Guide for Aliens',
        tr: 'Yabancılar İçin ABD Vergi Rehberi',
      },
      url: 'https://www.irs.gov/publications/p519',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-519',
      jurisdiction: 'US',
    },
  ],

  'abdde-is-yapan-turkler-icin-sozlesmeler': [
    {
      type: 'USC',
      citation: '15 U.S.C. § 7001',
      label: {
        en: 'Electronic Signatures in Global and National Commerce Act (ESIGN)',
        tr: 'Ulusal ve Küresel Ticarette Elektronik İmza Kanunu (ESIGN)',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title15-section7001&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-15-7001',
      jurisdiction: 'US',
    },
    {
      type: 'StateStatute',
      citation: 'N.Y. Gen. Oblig. Law § 5-1401',
      label: {
        en: 'Choice of law — contracts covering $250,000 or more',
        tr: 'Hukuk seçimi — 250.000 dolar ve üzeri sözleşmeler',
      },
      authorityLevel: 'state_statute',
      canonicalId: 'ny-stat-gen-oblig-law-5-1401',
      jurisdiction: 'US-NY',
    },
    {
      type: 'USC',
      citation: '29 U.S.C. § 201',
      label: {
        en: 'Fair Labor Standards Act — short title',
        tr: 'Adil Çalışma Standartları Kanunu',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title29-section201&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-29-201',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 515',
      label: {
        en: 'Withholding of Tax on Nonresident Aliens and Foreign Entities',
        tr: 'Yerleşik olmayan yabancılar ve yabancı kuruluşlardan vergi kesintisi',
      },
      url: 'https://www.irs.gov/publications/p515',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-515',
      jurisdiction: 'US',
    },
  ],

  'w8-w9-karar-haritasi': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(a)(30)',
      label: {
        en: 'Definition of "United States person"',
        tr: '"Birleşik Devletler kişisi" tanımı',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-7701-a',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 1441',
      label: {
        en: 'Withholding of tax on nonresident aliens',
        tr: 'Yerleşik olmayan yabancılardan vergi kesintisi',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section1441&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-1441',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.1441-1',
      label: {
        en: 'Withholding of tax on payments to foreign persons',
        tr: 'Yabancı kişilere yapılan ödemelerden vergi kesintisi',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRe7928eed88ac04b/section-1.1441-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-1.1441-1',
      jurisdiction: 'US',
    },
    {
      type: 'Treaty',
      citation: 'U.S.–Turkey Income Tax Treaty (1996)',
      label: {
        en: 'Convention for the avoidance of double taxation',
        tr: 'Çifte vergilendirmenin önlenmesi anlaşması',
      },
      url: 'https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents',
      authorityLevel: 'treaty',
      canonicalId: 'treaty-us-turkey-1996',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form W-8BEN',
      label: {
        en: 'Certificate of Foreign Status of Beneficial Owner',
        tr: 'Gerçek lehtar yabancı statü belgesi',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-8-ben',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-w-8ben',
      jurisdiction: 'US',
    },
  ],

  'tax-documents-checklist': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 6109',
      label: {
        en: 'Identifying numbers',
        tr: 'Kimlik numaraları',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6109&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-6109',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '31 U.S.C. § 5336',
      label: {
        en: 'Beneficial ownership information reporting (Corporate Transparency Act)',
        tr: 'Gerçek lehtar bilgi raporlaması (Kurumsal Şeffaflık Kanunu)',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title31-section5336&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-31-5336',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 301.6109-1',
      label: {
        en: 'Identifying numbers — regulatory implementation',
        tr: 'Kimlik numaraları — düzenleyici uygulama',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/section-301.6109-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-301.6109-1',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form W-7',
      label: {
        en: 'Application for IRS Individual Taxpayer Identification Number',
        tr: 'IRS Bireysel Vergi Mükellefi Kimlik Numarası başvurusu',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-7',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-w-7',
      jurisdiction: 'US',
    },
  ],

  'llc-checklist': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 6109',
      label: {
        en: 'Identifying numbers — EIN requirement',
        tr: 'Kimlik numaraları — EIN gerekliliği',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6109&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-6109',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '31 U.S.C. § 5336',
      label: {
        en: 'Beneficial ownership information reporting (Corporate Transparency Act)',
        tr: 'Gerçek lehtar bilgi raporlaması (Kurumsal Şeffaflık Kanunu)',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title31-section5336&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-31-5336',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
      label: {
        en: 'Entity classification regulations (check-the-box)',
        tr: 'Kuruluş sınıflandırma düzenlemeleri (check-the-box)',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/subject-group-ECFRa28caacb356462e',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-301.7701-1',
      jurisdiction: 'US',
    },
    {
      type: 'StateStatute',
      citation: '6 Del. C. § 18-101 et seq.',
      label: {
        en: 'Delaware Limited Liability Company Act',
        tr: 'Delaware Limited Şirket Kanunu',
      },
      authorityLevel: 'state_statute',
      canonicalId: 'del-stat-c-6-18-101',
      jurisdiction: 'US-DE',
    },
  ],

  'contractor-vs-employee': [
    {
      type: 'USC',
      citation: '29 U.S.C. § 203(e)',
      label: {
        en: 'Definition of "employee" under the Fair Labor Standards Act',
        tr: 'Adil Çalışma Standartları Kanunu kapsamında "çalışan" tanımı',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title29-section203&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-29-203-e',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 3401(c)',
      label: {
        en: 'Definition of "employee" for tax withholding',
        tr: 'Vergi kesintisi için "çalışan" tanımı',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section3401&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-3401-c',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 31.3401(c)-1',
      label: {
        en: 'Employee defined — regulatory standard',
        tr: 'Çalışan tanımı — düzenleyici standart',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-C/part-31/subpart-E/subject-group-ECFR88a2c72c1297e02/section-31.3401(c)-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-31.3401-c-1',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 15-A',
      label: {
        en: "Employer's Supplemental Tax Guide — worker classification",
        tr: 'İşveren Ek Vergi Rehberi — işçi sınıflandırması',
      },
      url: 'https://www.irs.gov/publications/p15a',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-15-a',
      jurisdiction: 'US',
    },
  ],

  'privacy-policy-guide': [
    {
      type: 'USC',
      citation: '15 U.S.C. § 45',
      label: {
        en: 'Unfair methods of competition and unfair or deceptive acts (FTC Act)',
        tr: 'Haksız rekabet yöntemleri ve aldatıcı uygulamalar (FTC Kanunu)',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title15-section45&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-15-45',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '15 U.S.C. § 6501',
      label: {
        en: "Children's Online Privacy Protection Act (COPPA)",
        tr: 'Çocukların Çevrimiçi Gizlilik Koruma Kanunu (COPPA)',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title15-section6501&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-15-6501',
      jurisdiction: 'US',
    },
    {
      type: 'StateStatute',
      citation: 'Cal. Civ. Code § 1798.100 et seq.',
      label: {
        en: 'California Consumer Privacy Act (CCPA/CPRA)',
        tr: 'Kaliforniya Tüketici Gizlilik Kanunu (CCPA/CPRA)',
      },
      authorityLevel: 'state_statute',
      canonicalId: 'cal-civ-code-1798-100',
      jurisdiction: 'US-CA',
    },
  ],

  'library-irs-vergi-gercekleri': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 1441',
      label: {
        en: 'Withholding of tax on nonresident aliens',
        tr: 'Yerleşik olmayan yabancılardan vergi kesintisi',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section1441&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-1441',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(b)',
      label: {
        en: 'Definition of resident alien and nonresident alien',
        tr: 'Yerleşik ve yerleşik olmayan yabancı tanımı',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-7701-b',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.1441-1',
      label: {
        en: 'Withholding of tax on payments to foreign persons',
        tr: 'Yabancı kişilere yapılan ödemelerden vergi kesintisi',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRe7928eed88ac04b/section-1.1441-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-1.1441-1',
      jurisdiction: 'US',
    },
    {
      type: 'Treaty',
      citation: 'U.S.–Turkey Income Tax Treaty (1996)',
      label: {
        en: 'Convention for the avoidance of double taxation',
        tr: 'Çifte vergilendirmenin önlenmesi anlaşması',
      },
      url: 'https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents',
      authorityLevel: 'treaty',
      canonicalId: 'treaty-us-turkey-1996',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 519',
      label: {
        en: 'U.S. Tax Guide for Aliens',
        tr: 'Yabancılar İçin ABD Vergi Rehberi',
      },
      url: 'https://www.irs.gov/publications/p519',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-519',
      jurisdiction: 'US',
    },
  ],

  'library-llc-kurma-rehberi': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(a)(3)–(4)',
      label: {
        en: 'Definitions of "corporation" and "domestic"',
        tr: '"Şirket" ve "yerli" tanımları',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-7701-a',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
      label: {
        en: 'Entity classification regulations (check-the-box)',
        tr: 'Kuruluş sınıflandırma düzenlemeleri (check-the-box)',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/subject-group-ECFRa28caacb356462e',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-26-301.7701-1',
      jurisdiction: 'US',
    },
    {
      type: 'StateStatute',
      citation: '6 Del. C. § 18-101 et seq.',
      label: {
        en: 'Delaware Limited Liability Company Act',
        tr: 'Delaware Limited Şirket Kanunu',
      },
      authorityLevel: 'state_statute',
      canonicalId: 'del-stat-c-6-18-101',
      jurisdiction: 'US-DE',
    },
    {
      type: 'StateStatute',
      citation: 'Wyo. Stat. § 17-29-101 et seq.',
      label: {
        en: 'Wyoming Limited Liability Company Act',
        tr: 'Wyoming Limited Şirket Kanunu',
      },
      authorityLevel: 'state_statute',
      canonicalId: 'wyo-stat-17-29-101',
      jurisdiction: 'US-WY',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 6109',
      label: {
        en: 'Identifying numbers — EIN requirement',
        tr: 'Kimlik numaraları — EIN gerekliliği',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6109&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-6109',
      jurisdiction: 'US',
    },
  ],

  'library-llc-vize-yanilgisi': [
    {
      type: 'USC',
      citation: '8 U.S.C. § 1184(b)',
      label: {
        en: 'Presumption of immigrant intent (INA § 214(b))',
        tr: 'Göçmen niyeti karinesi (INA § 214(b))',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title8-section1184&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-8-1184-b',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '8 U.S.C. § 1101(a)(15)(E)',
      label: {
        en: 'Treaty trader and treaty investor visa classification',
        tr: 'Anlaşma tüccarı ve yatırımcı vize sınıflandırması',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title8-section1101&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-8-1101-a',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '8 C.F.R. § 214.2(e)',
      label: {
        en: 'Treaty trader and treaty investor requirements',
        tr: 'Anlaşma tüccarı ve yatırımcı gereklilikleri',
      },
      url: 'https://www.ecfr.gov/current/title-8/chapter-I/subchapter-B/part-214/section-214.2',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-8-214.2',
      jurisdiction: 'US',
    },
  ],
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Resolve primary sources for a page slug in a given language.
 * Returns PrimarySourceEntry[] suitable for the PrimarySources component.
 */
export function getPrimarySources(slug: string, lang: 'en' | 'tr'): PrimarySourceEntry[] {
  const entries = REGISTRY[slug]
  if (!entries) return []
  return entries.map(e => ({
    type: e.type,
    citation: e.citation,
    label: e.label
      ? (lang === 'tr' && e.label.tr ? e.label.tr : e.label.en)
      : undefined,
    url: e.url,
    authorityLevel: e.authorityLevel,
    canonicalId: e.canonicalId,
    jurisdiction: e.jurisdiction,
  }))
}

/**
 * Get all registry slugs. Used by validation scripts.
 */
export function getRegistrySlugs(): string[] {
  return Object.keys(REGISTRY)
}

/**
 * Get raw registry entries for a slug. Used by validation scripts.
 */
export function getRawRegistryEntries(slug: string): RegistryEntry[] | undefined {
  return REGISTRY[slug]
}
