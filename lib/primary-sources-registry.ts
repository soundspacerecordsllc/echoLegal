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
      citation: '26 U.S.C. § 7701(a)',
      label: {
        en: 'Definitions — entity classification and domestic/foreign status',
        tr: 'Tanımlar — tüzel kişilik sınıflandırması ve yerli/yabancı statüsü',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-7701-a',
      jurisdiction: 'US',
    },
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
      type: 'CFR',
      citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
      label: {
        en: 'Entity classification regulations (check-the-box)',
        tr: 'Tüzel kişilik sınıflandırma düzenlemeleri (check-the-box)',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/subject-group-ECFRa28caacb356462e',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-301.7701',
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
      type: 'CFR',
      citation: '26 C.F.R. § 1.6038A-2',
      label: {
        en: 'Requirement of return — reportable transaction categories',
        tr: 'Beyanname gereksinimleri — raporlanabilir işlem kategorileri',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRd277d0563e9069f/section-1.6038A-2',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-1.6038A-2',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'T.D. 9796 (Dec. 12, 2016)',
      label: {
        en: 'Treasury Decision extending § 6038A reporting to foreign-owned disregarded entities',
        tr: '§ 6038A raporlamasını yabancı sermayeli dikkate alınmayan varlıklara genişleten Hazine Kararı',
      },
      authorityLevel: 'agency_guidance',
      canonicalId: 'US-TREAS-TD-9796',
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
    {
      type: 'Guidance',
      citation: 'IRS Publication 515',
      label: {
        en: 'Withholding of Tax on Nonresident Aliens and Foreign Entities',
        tr: 'Yerleşik Olmayan Yabancılar ve Yabancı Kuruluşlardan Vergi Stopajı',
      },
      url: 'https://www.irs.gov/publications/p515',
      authorityLevel: 'publication',
      canonicalId: 'publication-irs-515-smllc',
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
      label: {
        en: 'Certificate of Foreign Status of Beneficial Owner',
        tr: 'Gerçek Lehdarın Yabancı Statüsü Belgesi',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-8-ben',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-w-8ben',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form W-9',
      label: {
        en: 'Request for Taxpayer Identification Number and Certification',
        tr: 'Vergi Mükellefi Kimlik Numarası ve Onay Talebi',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-9',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-w-9',
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
      label: {
        en: 'EIN application procedures for foreign-owned entities',
        tr: 'Yabancı sermayeli kuruluşlar için EIN başvuru prosedürleri',
      },
      url: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
      authorityLevel: 'agency_guidance',
      canonicalId: 'guidance-irs-rev-proc-2023-32',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form SS-4',
      label: {
        en: 'Application for Employer Identification Number',
        tr: 'İşveren Kimlik Numarası Başvurusu',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-ss-4',
      authorityLevel: 'form_instruction',
      canonicalId: 'form-instructions-irs-ss-4',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '31 C.F.R. § 1010.380',
      label: {
        en: 'Beneficial ownership information reporting requirements (FinCEN)',
        tr: 'Gerçek lehdar bilgi raporlama gereksinimleri (FinCEN)',
      },
      url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.380',
      authorityLevel: 'federal_regulation',
      canonicalId: 'cfr-31-1010.380',
      jurisdiction: 'US',
    },
  ],

  '1099-vergi-belgeleri': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 6041',
      label: {
        en: 'Information at source — payments of $600 or more',
        tr: 'Kaynakta bilgi — 600 $ veya üzeri ödemeler',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6041&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-6041',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 6050W',
      label: {
        en: 'Returns relating to payments made in settlement of payment card and third party network transactions',
        tr: 'Ödeme kartı ve üçüncü taraf ağ işlem ödemelerine ilişkin beyannameler',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6050W&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-6050W',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 1441',
      label: {
        en: 'Withholding of tax on nonresident aliens',
        tr: 'Yerleşik olmayan yabancılardan vergi stopajı',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section1441&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-1441',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.6041-1',
      label: {
        en: 'Return of information as to payments of $600 or more',
        tr: '600 $ veya üzeri ödemelere ilişkin bilgi beyannamesi',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRd277d0563e9069f/section-1.6041-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-1.6041-1',
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
      canonicalId: 'US-IRS-FORM-1099-NEC-INSTR',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form 1042-S',
      label: {
        en: 'Foreign Person\'s U.S. Source Income Subject to Withholding',
        tr: 'Yabancının stopaja tabi ABD kaynaklı geliri',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-1042-s',
      authorityLevel: 'form_instruction',
      canonicalId: 'US-IRS-FORM-1042-S-INSTR',
      jurisdiction: 'US',
    },
  ],

  'abd-odemeleri-alma-rehberi': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 1441',
      label: {
        en: 'Withholding of tax on nonresident aliens',
        tr: 'Yerleşik olmayan yabancılardan vergi stopajı',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section1441&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-1441-payments',
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
      canonicalId: 'US-26USC-3406',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. § 1.1441-1',
      label: {
        en: 'Requirement for the deduction and withholding of tax on payments to foreign persons',
        tr: 'Yabancılara yapılan ödemelerden vergi kesintisi ve stopajı gereksinimleri',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFRe7928eed88ac04b/section-1.1441-1',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-1.1441-1-payments',
      jurisdiction: 'US',
    },
    {
      type: 'Treaty',
      citation: 'U.S.–Turkey Income Tax Treaty (1996)',
      label: {
        en: 'Convention for the avoidance of double taxation',
        tr: 'Çifte vergilendirmeyi önleme anlaşması',
      },
      url: 'https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents',
      authorityLevel: 'treaty',
      canonicalId: 'US-TREATY-TR-1996-payments',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form W-8BEN',
      label: {
        en: 'Certificate of Foreign Status of Beneficial Owner',
        tr: 'Gerçek lehdarın yabancı statüsü belgesi',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-w-8-ben',
      authorityLevel: 'form_instruction',
      canonicalId: 'US-IRS-FORM-W-8BEN-INSTR-payments',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'IRS Publication 515',
      label: {
        en: 'Withholding of Tax on Nonresident Aliens and Foreign Entities',
        tr: 'Yerleşik olmayan yabancılar ve yabancı kuruluşlardan vergi stopajı',
      },
      url: 'https://www.irs.gov/publications/p515',
      authorityLevel: 'publication',
      canonicalId: 'US-IRS-PUB-515-payments',
      jurisdiction: 'US',
    },
  ],

  'abd-satis-vergisi-rehberi': [
    {
      type: 'Case',
      citation: 'South Dakota v. Wayfair, Inc., 585 U.S. 162 (2018)',
      label: {
        en: 'Supreme Court decision establishing economic nexus for sales tax',
        tr: 'Satış vergisi için ekonomik nexus\'u belirleyen Yüksek Mahkeme kararı',
      },
      authorityLevel: 'federal_statute',
      canonicalId: 'US-SCOTUS-SD-v-Wayfair-2018',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: 'U.S. Const. art. I, § 8, cl. 3',
      label: {
        en: 'Commerce Clause — Congressional power to regulate interstate commerce',
        tr: 'Ticaret Maddesi — Eyaletlerarası ticareti düzenleme yetkisi',
      },
      authorityLevel: 'constitutional',
      canonicalId: 'US-CONST-ART-I-S8-CL3',
      jurisdiction: 'US',
    },
  ],

  'llc-mi-corporation-mi': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(a)(2)–(4)',
      label: {
        en: 'Definitions of "partnership," "corporation," and "domestic"',
        tr: '"Ortaklık," "şirket" ve "yerli" tanımları',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-7701-a-entity',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
      label: {
        en: 'Entity classification regulations (check-the-box)',
        tr: 'Tüzel kişilik sınıflandırma düzenlemeleri (check-the-box)',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/subject-group-ECFRa28caacb356462e',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-301.7701-entity',
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
      canonicalId: 'US-DE-LLC-ACT',
      jurisdiction: 'US-DE',
    },
    {
      type: 'Guidance',
      citation: 'IRS, Instructions for Form 8832',
      label: {
        en: 'Entity Classification Election',
        tr: 'Tüzel kişilik sınıflandırma seçimi',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-8832',
      authorityLevel: 'form_instruction',
      canonicalId: 'US-IRS-FORM-8832-INSTR',
      jurisdiction: 'US',
    },
  ],

  'abdde-banka-hesabi-acmak': [
    {
      type: 'USC',
      citation: '31 U.S.C. § 5318',
      label: {
        en: 'Bank Secrecy Act — compliance, exemptions, and summons authority',
        tr: 'Banka Gizliliği Kanunu — uyum, muafiyetler ve celp yetkisi',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title31-section5318&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-31USC-5318',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '31 C.F.R. § 1010.380',
      label: {
        en: 'Beneficial ownership information reporting requirements (FinCEN)',
        tr: 'Gerçek lehdar bilgi raporlama gereksinimleri (FinCEN)',
      },
      url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-C/section-1010.380',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-31CFR-1010.380-bank',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '31 C.F.R. § 1020.220',
      label: {
        en: 'Customer identification program requirements for banks',
        tr: 'Bankalar için müşteri kimlik belirleme programı gereksinimleri',
      },
      url: 'https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1020/subpart-B/section-1020.220',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-31CFR-1020.220',
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
      canonicalId: 'US-8USC-1202',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '8 U.S.C. § 1182',
      label: {
        en: 'Inadmissible aliens — grounds of inadmissibility',
        tr: 'Kabul edilemez yabancılar — kabul edilemezlik gerekçeleri',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title8-section1182&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-8USC-1182',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '22 C.F.R. § 41.103',
      label: {
        en: 'Filing an application for a nonimmigrant visa',
        tr: 'Göçmen olmayan vizesi başvurusu yapma',
      },
      url: 'https://www.ecfr.gov/current/title-22/chapter-I/subchapter-E/part-41/subpart-B/section-41.103',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-22CFR-41.103',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'U.S. Department of State, DS-160 Online Nonimmigrant Visa Application',
      label: {
        en: 'Official DS-160 form and filing instructions',
        tr: 'Resmi DS-160 formu ve doldurma talimatları',
      },
      url: 'https://ceac.state.gov/genniv/',
      authorityLevel: 'agency_guidance',
      canonicalId: 'US-DOS-DS-160',
      jurisdiction: 'US',
    },
  ],

  'abd-llc-kurmak-prosedurel-mimari': [
    {
      type: 'USC',
      citation: '26 U.S.C. § 7701(a)',
      label: {
        en: 'Definitions — entity classification and domestic/foreign status',
        tr: 'Tanımlar — tüzel kişilik sınıflandırması ve yerli/yabancı statüsü',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section7701&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-26USC-7701-a',
      jurisdiction: 'US',
    },
    {
      type: 'CFR',
      citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
      label: {
        en: 'Entity classification regulations (check-the-box)',
        tr: 'Tüzel kişilik sınıflandırma düzenlemeleri (check-the-box)',
      },
      url: 'https://www.ecfr.gov/current/title-26/chapter-I/subchapter-F/part-301/subpart-ECFRd43e1e5bf6e7513/subject-group-ECFRa28caacb356462e',
      authorityLevel: 'federal_regulation',
      canonicalId: 'US-26CFR-301.7701',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '26 U.S.C. § 6109',
      label: {
        en: 'Identifying numbers — statutory requirement for tax identification',
        tr: 'Kimlik numaraları — vergi kimliği için yasal gereklilik',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title26-section6109&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'usc-26-6109',
      jurisdiction: 'US',
    },
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
      type: 'Guidance',
      citation: 'IRS, Instructions for Form SS-4',
      label: {
        en: 'Application for Employer Identification Number',
        tr: 'İşveren Kimlik Numarası başvurusu',
      },
      url: 'https://www.irs.gov/forms-pubs/about-form-ss-4',
      authorityLevel: 'form_instruction',
      canonicalId: 'US-IRS-FORM-SS-4-INSTR',
      jurisdiction: 'US',
    },
  ],

  'what-is-nda': [
    {
      type: 'USC',
      citation: '18 U.S.C. § 1836',
      label: {
        en: 'Defend Trade Secrets Act — federal civil cause of action for trade secret misappropriation',
        tr: 'Ticari Sırları Koruma Kanunu — ticari sır kötüye kullanımı için federal hukuk davası',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title18-section1836&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-18USC-1836',
      jurisdiction: 'US',
    },
    {
      type: 'USC',
      citation: '18 U.S.C. § 1839',
      label: {
        en: 'Definitions — trade secret, misappropriation, and improper means',
        tr: 'Tanımlar — ticari sır, kötüye kullanım ve uygunsuz yöntemler',
      },
      url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title18-section1839&num=0&edition=prelim',
      authorityLevel: 'federal_statute',
      canonicalId: 'US-18USC-1839',
      jurisdiction: 'US',
    },
    {
      type: 'StateStatute',
      citation: 'Uniform Trade Secrets Act (UTSA) § 1',
      label: {
        en: 'Model state law — definitions of trade secret and misappropriation (adopted in 48 states)',
        tr: 'Model eyalet yasası — ticari sır ve kötüye kullanım tanımları (48 eyalette kabul edilmiş)',
      },
      authorityLevel: 'state_statute',
      canonicalId: 'US-UTSA-1',
      jurisdiction: 'US',
    },
    {
      type: 'Guidance',
      citation: 'Restatement (Third) of Unfair Competition §§ 39–45 (1995)',
      label: {
        en: 'Trade secret definition, duty of confidence, and remedies for breach',
        tr: 'Ticari sır tanımı, gizlilik yükümlülüğü ve ihlal çözümleri',
      },
      authorityLevel: 'agency_guidance',
      canonicalId: 'US-RESTATEMENT-UNFAIR-COMP-39',
      jurisdiction: 'US',
    },
    {
      type: 'StateStatute',
      citation: 'N.Y. Gen. Oblig. Law § 5-701',
      label: {
        en: 'Statute of frauds — agreements required to be in writing',
        tr: 'Dolandırıcılık tüzüğü — yazılı olması gereken sözleşmeler',
      },
      authorityLevel: 'state_statute',
      canonicalId: 'ny-stat-gen-oblig-law-5-701',
      jurisdiction: 'US-NY',
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
