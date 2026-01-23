// lib/consular-procedures.ts

export interface ConsularProcedure {
  slug: string
  titleEn: string
  titleTr: string
  descriptionEn: string
  descriptionTr: string
  checklistPdfEn: string
  checklistPdfTr: string
  available: boolean
}

export const consularProcedures: ConsularProcedure[] = [
  {
    slug: 'passport',
    titleEn: 'Passport (New / Renewal / Lost)',
    titleTr: 'Pasaport (Yeni / Yenileme / Kayıp)',
    descriptionEn: 'Turkish passports can be applied for at consulates abroad. Applications require biometric data collection and in-person appearance.',
    descriptionTr: 'Türk pasaportları yurt dışındaki konsolosluklarda başvurulabilir. Başvurular biyometrik veri toplama ve şahsen başvuru gerektirir.',
    checklistPdfEn: '/documents/PassportChecklistEN.pdf',
    checklistPdfTr: '/documents/PasaportKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'turkish-id',
    titleEn: 'Turkish ID Card (Kimlik)',
    titleTr: 'T.C. Kimlik Kartı',
    descriptionEn: 'The Turkish ID card (Kimlik) is the primary identification document for Turkish citizens. It can be renewed or replaced at consulates.',
    descriptionTr: 'T.C. Kimlik Kartı, Türk vatandaşları için birincil kimlik belgesidir. Konsolosluklarda yenilenebilir veya değiştirilebilir.',
    checklistPdfEn: '/documents/TurkishIDChecklistEN.pdf',
    checklistPdfTr: '/documents/KimlikKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'notary-services',
    titleEn: 'Notary Services (Vekaletname / Muvafakatname)',
    titleTr: 'Noterlik Hizmetleri (Vekaletname / Muvafakatname)',
    descriptionEn: 'Turkish consulates provide notary services including Power of Attorney (Vekaletname), revocation documents, and consent letters for minors.',
    descriptionTr: 'Türk konsoloslukları Vekaletname, iptal belgeleri ve reşit olmayanlar için muvafakatname dahil noterlik hizmetleri sunar.',
    checklistPdfEn: '/documents/NotaryServicesChecklistEN.pdf',
    checklistPdfTr: '/documents/NoterlikKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'birth-registration',
    titleEn: 'Birth Registration Abroad',
    titleTr: 'Yurt Dışında Doğum Tescili',
    descriptionEn: 'Turkish citizens must register births occurring abroad with the Turkish consulate to obtain Turkish citizenship for the child.',
    descriptionTr: 'Türk vatandaşları, çocuğun Türk vatandaşlığı alabilmesi için yurt dışında gerçekleşen doğumları Türk konsolosluğuna tescil ettirmelidir.',
    checklistPdfEn: '/documents/BirthRegistrationChecklistEN.pdf',
    checklistPdfTr: '/documents/DogumTesciliKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'marriage-registration',
    titleEn: 'Marriage Registration Abroad',
    titleTr: 'Yurt Dışında Evlilik Tescili',
    descriptionEn: 'Marriages performed abroad must be registered with Turkish authorities to be recognized in Turkey. This is done through the consulate.',
    descriptionTr: 'Yurt dışında yapılan evliliklerin Türkiye\'de tanınması için Türk makamlarına tescil edilmesi gerekir. Bu işlem konsolosluk aracılığıyla yapılır.',
    checklistPdfEn: '/documents/MarriageRegistrationChecklistEN.pdf',
    checklistPdfTr: '/documents/EvlilikTesciliKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'population-registry',
    titleEn: 'Population Registry Extract (Nüfus Kayıt Örneği)',
    titleTr: 'Nüfus Kayıt Örneği',
    descriptionEn: 'A Population Registry Extract is an official document showing your family registration details in Turkey. It\'s required for many legal procedures.',
    descriptionTr: 'Nüfus Kayıt Örneği, Türkiye\'deki aile kayıt bilgilerinizi gösteren resmi bir belgedir. Birçok hukuki işlem için gereklidir.',
    checklistPdfEn: '/documents/PopulationRegistryChecklistEN.pdf',
    checklistPdfTr: '/documents/NufusKayitOrnegiKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'death-registration',
    titleEn: 'Death Registration & Funeral Transport',
    titleTr: 'Ölüm Tescili ve Cenaze Nakli',
    descriptionEn: 'Deaths of Turkish citizens abroad must be registered with the consulate. The consulate also assists with funeral transport arrangements to Turkey.',
    descriptionTr: 'Yurt dışında vefat eden Türk vatandaşlarının konsolosluğa tescil edilmesi gerekir. Konsolosluk Türkiye\'ye cenaze nakli konusunda da yardımcı olur.',
    checklistPdfEn: '/documents/DeathRegistrationChecklistEN.pdf',
    checklistPdfTr: '/documents/OlumTesciliKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'document-certification',
    titleEn: 'Document Certification (Tasdik / Apostille)',
    titleTr: 'Belge Tasdiki (Tasdik / Apostil)',
    descriptionEn: 'Turkish consulates can authenticate signatures, certify document copies, and verify translations. This is required for documents to be used in Turkey.',
    descriptionTr: 'Türk konsoloslukları imza doğrulama, belge kopyası tasdiki ve tercüme onayı yapabilir. Türkiye\'de kullanılacak belgeler için gereklidir.',
    checklistPdfEn: '/documents/DocumentCertificationChecklistEN.pdf',
    checklistPdfTr: '/documents/BelgeTasdikiKontrolListesiTR.pdf',
    available: true,
  },
]

export function getProcedureBySlug(slug: string): ConsularProcedure | undefined {
  return consularProcedures.find(p => p.slug === slug)
}

export function getChecklistUrl(procedure: ConsularProcedure, lang: 'en' | 'tr'): string {
  return lang === 'en' ? procedure.checklistPdfEn : procedure.checklistPdfTr
}
export function getChecklistUrl(procedure: ConsularProcedure, lang: 'en' | 'tr'): string {
  return lang === 'en' ? procedure.checklistPdfEn : procedure.checklistPdfTr
}
