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
    descriptionEn: 'Apply for a new Turkish passport, renew an expiring one, or replace a lost/stolen passport at the consulate.',
    descriptionTr: 'Konsoloslukta yeni Türk pasaportu başvurusu, süresi dolan pasaport yenileme veya kayıp/çalıntı pasaport değiştirme.',
    checklistPdfEn: '/documents/PassportChecklistEN.pdf',
    checklistPdfTr: '/documents/PasaportKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'turkish-id',
    titleEn: 'Turkish ID Card (Kimlik)',
    titleTr: 'T.C. Kimlik Kartı',
    descriptionEn: 'Apply for or renew your Turkish national ID card (Kimlik Kartı) through the consulate.',
    descriptionTr: 'Konsolosluk aracılığıyla T.C. Kimlik Kartı başvurusu veya yenileme işlemleri.',
    checklistPdfEn: '/documents/TurkishIDChecklistEN.pdf',
    checklistPdfTr: '/documents/KimlikKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'notary-services',
    titleEn: 'Notary Services (Vekaletname)',
    titleTr: 'Noterlik Hizmetleri (Vekaletname)',
    descriptionEn: 'Get powers of attorney, consent letters, and other documents notarized at the Turkish consulate.',
    descriptionTr: 'Türk konsolosluğunda vekaletname, muvafakatname ve diğer belgelerin noter onayı.',
    checklistPdfEn: '/documents/NotaryServicesChecklistEN.pdf',
    checklistPdfTr: '/documents/NoterlikKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'birth-registration',
    titleEn: 'Birth Registration Abroad',
    titleTr: 'Yurt Dışında Doğum Tescili',
    descriptionEn: 'Register the birth of a child born abroad to Turkish citizen parent(s) with Turkish civil records.',
    descriptionTr: 'Yurt dışında doğan çocuğun Türk nüfus kayıtlarına tescil işlemi.',
    checklistPdfEn: '/documents/BirthRegistrationChecklistEN.pdf',
    checklistPdfTr: '/documents/DogumTesciliKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'marriage-registration',
    titleEn: 'Marriage Registration Abroad',
    titleTr: 'Yurt Dışında Evlilik Tescili',
    descriptionEn: 'Register a marriage performed abroad with Turkish civil records through the consulate.',
    descriptionTr: 'Yurt dışında yapılan evliliğin Türk nüfus kayıtlarına tescil işlemi.',
    checklistPdfEn: '/documents/MarriageRegistrationChecklistEN.pdf',
    checklistPdfTr: '/documents/EvlilikTesciliKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'death-registration',
    titleEn: 'Death Registration & Funeral Transport',
    titleTr: 'Ölüm Tescili ve Cenaze Nakli',
    descriptionEn: 'Deaths of Turkish citizens abroad must be registered with the consulate. The consulate also assists with funeral transport to Turkey.',
    descriptionTr: 'Yurt dışında vefat eden Türk vatandaşlarının konsolosluğa tescil edilmesi gerekir. Konsolosluk Türkiye\'ye cenaze nakli konusunda da yardımcı olur.',
    checklistPdfEn: '/documents/DeathRegistrationChecklistEN.pdf',
    checklistPdfTr: '/documents/OlumTesciliKontrolListesiTR.pdf',
    available: true,
  },
  {
    slug: 'population-registry',
    titleEn: 'Population Registry Extract (Nüfus Kayıt Örneği)',
    titleTr: 'Nüfus Kayıt Örneği',
    descriptionEn: 'Obtain official extracts from the Turkish population registry for legal, administrative, or personal use.',
    descriptionTr: 'Resmi, idari veya kişisel kullanım için Türk nüfus kayıtlarından örnek alma.',
    checklistPdfEn: '/documents/PopulationRegistryChecklistEN.pdf',
    checklistPdfTr: '/documents/NufusKayitOrnegiKontrolListesiTR.pdf',
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
