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
    descriptionTr: 'Konsoloslukta yeni pasaport başvurusu yapabilir, süresi dolmuş pasaportunuzu yenileyebilir veya kayıp/çalıntı pasaportunuzu değiştirebilirsiniz.',
    checklistPdfEn: '/documents/Passport-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Pasaport-Kontrol-Listesi-TR.pdf',
    available: true,
  },
  {
    slug: 'turkish-id',
    titleEn: 'Turkish ID Card (Kimlik)',
    titleTr: 'T.C. Kimlik Kartı',
    descriptionEn: 'Apply for or renew your Turkish national ID card (Kimlik Kartı) through the consulate.',
    descriptionTr: 'Konsolosluk aracılığıyla T.C. Kimlik Kartı başvurusu yapabilir veya mevcut kimliğinizi yenileyebilirsiniz.',
    checklistPdfEn: '/documents/Turkish-ID-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Kimlik-Kontrol-Listesi-TR.pdf',
    available: true,
  },
  {
    slug: 'notary-services',
    titleEn: 'Notary Services (Vekaletname)',
    titleTr: 'Noterlik Hizmetleri (Vekaletname)',
    descriptionEn: 'Get powers of attorney, consent letters, and other documents notarized at the Turkish consulate.',
    descriptionTr: 'Türk konsolosluğunda vekaletname, muvafakatname ve diğer belgelerinizi noter onayına sunabilirsiniz.',
    checklistPdfEn: '/documents/Notary-Services-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Noterlik-Kontrol-Listesi-TR.pdf',
    available: true,
  },
  {
    slug: 'birth-registration',
    titleEn: 'Birth Registration Abroad',
    titleTr: 'Yurt Dışında Doğum Tescili',
    descriptionEn: 'Register the birth of a child born abroad to Turkish citizen parent(s) with Turkish civil records.',
    descriptionTr: 'Yurt dışında doğan çocuğunuzu Türk nüfus kayıtlarına tescil ettirebilirsiniz.',
    checklistPdfEn: '/documents/Birth-Registration-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Dogum-Tescili-Kontrol-Listesi-TR.pdf',
    available: true,
  },
  {
    slug: 'marriage-registration',
    titleEn: 'Marriage Registration Abroad',
    titleTr: 'Yurt Dışında Evlilik Tescili',
    descriptionEn: 'Register a marriage performed abroad with Turkish civil records through the consulate.',
    descriptionTr: 'Yurt dışında gerçekleştirilen evliliğinizi konsolosluk aracılığıyla Türk nüfus kayıtlarına tescil ettirebilirsiniz.',
    checklistPdfEn: '/documents/Marriage-Registration-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Evlilik-Tescili-Kontrol-Listesi-TR.pdf',
    available: true,
  },
  {
    slug: 'death-registration',
    titleEn: 'Death Registration & Funeral Transport',
    titleTr: 'Ölüm Tescili ve Cenaze Nakli',
    descriptionEn: 'Deaths of Turkish citizens abroad must be registered with the consulate. The consulate also assists with funeral transport to Turkey.',
    descriptionTr: 'Yurt dışında vefat eden Türk vatandaşlarının ölümü konsolosluğa bildirilmelidir. Konsolosluk ayrıca Türkiye\'ye cenaze nakli konusunda da yardımcı olur.',
    checklistPdfEn: '/documents/Death-Registration-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Olum-Tescili-Kontrol-Listesi-TR.pdf',
    available: true,
  },
  {
    slug: 'population-registry',
    titleEn: 'Population Registry Extract (Nüfus Kayıt Örneği)',
    titleTr: 'Nüfus Kayıt Örneği',
    descriptionEn: 'Obtain official extracts from the Turkish population registry for legal, administrative, or personal use.',
    descriptionTr: 'Resmi, idari veya kişisel kullanım için Türk nüfus kayıtlarından örnek alabilirsiniz.',
    checklistPdfEn: '/documents/Population-Registry-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Nufus-Kayit-Ornegi-Kontrol-Listesi-TR.pdf',
    available: true,
  },
  {
    slug: 'document-certification',
    titleEn: 'Document Certification (Tasdik / Apostille)',
    titleTr: 'Belge Tasdiki (Tasdik / Apostil)',
    descriptionEn: 'Turkish consulates can authenticate signatures, certify document copies, and verify translations. This is required for documents to be used in Turkey.',
    descriptionTr: 'Türk konsolosluklarında imza doğrulama, belge kopyası tasdiki ve tercüme onayı yaptırabilirsiniz. Türkiye\'de kullanılacak belgeler için bu işlem zorunludur.',
    checklistPdfEn: '/documents/Document-Certification-Checklist-EN.pdf',
    checklistPdfTr: '/documents/Belge-Tasdiki-Kontrol-Listesi-TR.pdf',
    available: true,
  },
]

export function getProcedureBySlug(slug: string): ConsularProcedure | undefined {
  return consularProcedures.find(p => p.slug === slug)
}

export function getChecklistUrl(procedure: ConsularProcedure, lang: 'en' | 'tr'): string {
  return lang === 'en' ? procedure.checklistPdfEn : procedure.checklistPdfTr
}
