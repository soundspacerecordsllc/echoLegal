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
