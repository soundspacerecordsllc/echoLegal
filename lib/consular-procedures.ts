export type ConsularProcedure = {
  slug: string
  slugTr: string
  titleEn: string
  titleTr: string
  summaryEn: string
  summaryTr: string
  requirementsEn: string[]
  requirementsTr: string[]
  processingNotesEn: string[]
  processingNotesTr: string[]
  checklistUrlEn: string
  checklistUrlTr: string
  relatedProcedures: string[] // slugs
  relatedContracts: { slug: string; titleEn: string; titleTr: string }[]
  metaTitleEn: string
  metaTitleTr: string
  metaDescEn: string
  metaDescTr: string
}

export const consularProcedures: ConsularProcedure[] = [
  {
    slug: 'passport',
    slugTr: 'pasaport',
    titleEn: 'Passport (New / Renewal / Lost)',
    titleTr: 'Pasaport (Yeni / Yenileme / Kayıp)',
    summaryEn: 'Turkish passports can be applied for at consulates abroad. Applications require biometric data collection, so in-person attendance is mandatory. Processing times vary by passport type.',
    summaryTr: 'Türk pasaportları yurt dışındaki konsolosluklardan başvurulabilir. Başvurular biyometrik veri toplama gerektirdiğinden şahsen başvuru zorunludur. İşlem süreleri pasaport türüne göre değişir.',
    requirementsEn: [
      'Valid Turkish ID card (Kimlik)',
      'Current passport (if renewal or for reference)',
      'Two biometric photos (50x60mm, white background)',
      'Proof of address abroad',
      'Application fee payment',
      'Completed application form (available at consulate)',
      'For minors: consent from both parents or court order'
    ],
    requirementsTr: [
      'Geçerli T.C. Kimlik Kartı',
      'Mevcut pasaport (yenileme veya referans için)',
      'İki adet biyometrik fotoğraf (50x60mm, beyaz arka plan)',
      'Yurt dışı adres belgesi',
      'Başvuru ücreti ödemesi',
      'Doldurulmuş başvuru formu (konsoloslukta mevcut)',
      'Küçükler için: her iki ebeveynin muvafakati veya mahkeme kararı'
    ],
    processingNotesEn: [
      'Appointments are made via konsolosluk.gov.tr — walk-ins are generally not accepted',
      'Standard processing: 4-6 weeks; expedited options may be available',
      'Lost passport requires a police report from local authorities',
      'Passport validity: 10 years for adults, varies for minors',
      'Fees are paid at the consulate; check current rates on official portal'
    ],
    processingNotesTr: [
      'Randevular konsolosluk.gov.tr üzerinden alınır — randevusuz başvuru genellikle kabul edilmez',
      'Standart işlem süresi: 4-6 hafta; hızlandırılmış seçenekler mevcut olabilir',
      'Kayıp pasaport için yerel makamlardan polis raporu gerekir',
      'Pasaport geçerliliği: yetişkinler için 10 yıl, küçükler için değişir',
      'Ücretler konsoloslukta ödenir; güncel ücretler için resmi portala bakın'
    ],
    checklistUrlEn: '/documents/checklists/Passport-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Pasaport-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['turkish-id', 'birth-registration'],
    relatedContracts: [
      { slug: 'nda', titleEn: 'Non-Disclosure Agreement', titleTr: 'Gizlilik Sözleşmesi' }
    ],
    metaTitleEn: 'Turkish Passport Application — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'Pasaport Başvurusu — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Turkish passport application checklist in English & Turkish. Requirements, appointment portal link, and step-by-step guidance for consular applications.',
    metaDescTr: 'Türk pasaportu başvuru kontrol listesi İngilizce & Türkçe. Gerekli belgeler, randevu portalı ve adım adım rehber.'
  },
  {
    slug: 'turkish-id',
    slugTr: 'kimlik',
    titleEn: 'Turkish ID Card (Kimlik)',
    titleTr: 'T.C. Kimlik Kartı',
    summaryEn: 'The Turkish ID card (Kimlik) is the primary identification document for Turkish citizens. Applications and renewals can be processed at consulates abroad with biometric data collection.',
    summaryTr: 'T.C. Kimlik Kartı, Türk vatandaşları için birincil kimlik belgesidir. Başvuru ve yenilemeler yurt dışındaki konsolosluklarda biyometrik veri toplama ile yapılabilir.',
    requirementsEn: [
      'Birth certificate or population registry extract',
      'Current ID card (if renewal)',
      'Two biometric photos (50x60mm, white background)',
      'Proof of Turkish citizenship',
      'Application fee payment',
      'For first-time applicants: additional documentation may be required'
    ],
    requirementsTr: [
      'Doğum belgesi veya nüfus kayıt örneği',
      'Mevcut kimlik kartı (yenileme için)',
      'İki adet biyometrik fotoğraf (50x60mm, beyaz arka plan)',
      'Türk vatandaşlığı belgesi',
      'Başvuru ücreti ödemesi',
      'İlk kez başvuranlar için: ek belgeler gerekebilir'
    ],
    processingNotesEn: [
      'Appointments required via konsolosluk.gov.tr',
      'In-person attendance mandatory for biometric collection',
      'Processing time: typically 2-4 weeks',
      'ID card is required for most other consular procedures',
      'Keep your ID number (T.C. Kimlik No) accessible for all applications'
    ],
    processingNotesTr: [
      'Randevu konsolosluk.gov.tr üzerinden zorunludur',
      'Biyometrik veri toplama için şahsen başvuru zorunlu',
      'İşlem süresi: genellikle 2-4 hafta',
      'Kimlik kartı diğer konsolosluk işlemleri için gereklidir',
      'T.C. Kimlik Numaranızı tüm başvurular için hazır bulundurun'
    ],
    checklistUrlEn: '/documents/checklists/Turkish-ID-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Kimlik-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['passport', 'population-registry'],
    relatedContracts: [
      { slug: 'service-agreement', titleEn: 'Service Agreement', titleTr: 'Hizmet Sözleşmesi' }
    ],
    metaTitleEn: 'Turkish ID Card (Kimlik) — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'T.C. Kimlik Kartı — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Turkish ID card application checklist in English & Turkish. Biometric requirements, appointment portal, and complete documentation guide.',
    metaDescTr: 'T.C. Kimlik Kartı başvuru kontrol listesi İngilizce & Türkçe. Biyometrik gereksinimler, randevu portalı ve belge rehberi.'
  },
  {
    slug: 'notary-services',
    slugTr: 'noterlik',
    titleEn: 'Notary Services (Vekaletname / Muvafakatname)',
    titleTr: 'Noterlik İşlemleri (Vekaletname / Muvafakatname)',
    summaryEn: 'Turkish consulates provide notary services including Power of Attorney (Vekaletname), revocation documents (Azilname), and consent letters (Muvafakatname). These are legally binding documents authenticated by consular officials.',
    summaryTr: 'Türk konsoloslukları Vekaletname, Azilname ve Muvafakatname dahil noter hizmetleri sunar. Bunlar konsolosluk yetkilileri tarafından tasdik edilen yasal olarak bağlayıcı belgelerdir.',
    requirementsEn: [
      'Valid Turkish ID card or passport',
      'Draft document or clear description of authorization needed',
      'Full name and ID number of the person receiving power',
      'For property transactions: property details (deed info)',
      'Two witnesses (may be required depending on document type)',
      'Notary fee payment'
    ],
    requirementsTr: [
      'Geçerli T.C. Kimlik Kartı veya pasaport',
      'Taslak belge veya gerekli yetkilendirmenin açık tanımı',
      'Vekalet verilen kişinin tam adı ve kimlik numarası',
      'Gayrimenkul işlemleri için: tapu bilgileri',
      'İki tanık (belge türüne göre gerekebilir)',
      'Noter ücreti ödemesi'
    ],
    processingNotesEn: [
      'Appointments required via konsolosluk.gov.tr',
      'Principal must appear in person — no remote notarization',
      'Bring a draft if you have specific language requirements',
      'Consulate staff can help draft standard documents',
      'Documents are valid in Turkey; may need apostille for use elsewhere',
      'Revocation (Azilname) cancels a previously issued power of attorney'
    ],
    processingNotesTr: [
      'Randevu konsolosluk.gov.tr üzerinden zorunludur',
      'Asıl kişi şahsen bulunmalıdır — uzaktan noter işlemi yapılmaz',
      'Belirli ifade gereksinimleri varsa taslak getirin',
      'Konsolosluk personeli standart belge hazırlamaya yardımcı olabilir',
      'Belgeler Türkiye\'de geçerlidir; başka yerlerde kullanım için apostil gerekebilir',
      'Azilname, daha önce verilen vekaletnameyi iptal eder'
    ],
    checklistUrlEn: '/documents/checklists/Notary-Services-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Noterlik-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['document-certification', 'passport'],
    relatedContracts: [
      { slug: 'service-agreement', titleEn: 'Service Agreement', titleTr: 'Hizmet Sözleşmesi' },
      { slug: 'independent-contractor', titleEn: 'Independent Contractor Agreement', titleTr: 'Bağımsız Yüklenici Sözleşmesi' }
    ],
    metaTitleEn: 'Notary Services (Vekaletname) — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'Noterlik İşlemleri (Vekaletname) — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Turkish consulate notary services checklist: Power of Attorney, consent letters. English & Turkish guide with appointment portal link.',
    metaDescTr: 'Konsolosluk noter hizmetleri kontrol listesi: Vekaletname, Muvafakatname. İngilizce & Türkçe rehber, randevu portalı linki.'
  },
  {
    slug: 'birth-registration',
    slugTr: 'dogum-tescili',
    titleEn: 'Birth Registration Abroad',
    titleTr: 'Yurt Dışında Doğum Tescili',
    summaryEn: 'Turkish citizens must register births occurring abroad with the Turkish consulate to obtain Turkish citizenship documentation for the child. This registration adds the child to the family\'s population registry.',
    summaryTr: 'Türk vatandaşları, çocuğun Türk vatandaşlık belgelerini alabilmesi için yurt dışında gerçekleşen doğumları Türk konsolosluğuna kaydettirmelidir. Bu kayıt, çocuğu ailenin nüfus kütüğüne ekler.',
    requirementsEn: [
      'Original birth certificate from local authorities (apostilled)',
      'Certified translation of birth certificate into Turkish',
      'Parents\' Turkish ID cards or passports',
      'Parents\' marriage certificate (if applicable)',
      'Hospital birth record (if available)',
      'Application form',
      'For unmarried parents: additional documentation required'
    ],
    requirementsTr: [
      'Yerel makamlardan orijinal doğum belgesi (apostilli)',
      'Doğum belgesinin Türkçe\'ye yeminli tercümesi',
      'Ebeveynlerin T.C. Kimlik Kartları veya pasaportları',
      'Ebeveynlerin evlilik cüzdanı (varsa)',
      'Hastane doğum kaydı (mevcutsa)',
      'Başvuru formu',
      'Evli olmayan ebeveynler için: ek belgeler gerekli'
    ],
    processingNotesEn: [
      'Register within 60 days of birth for streamlined processing',
      'Late registration is possible but may require additional steps',
      'Both parents should attend if possible',
      'Child receives Turkish citizenship through descent',
      'Appointment via konsolosluk.gov.tr',
      'Processing time: typically 2-4 weeks for registration confirmation'
    ],
    processingNotesTr: [
      'Kolaylaştırılmış işlem için doğumdan itibaren 60 gün içinde kayıt yaptırın',
      'Geç kayıt mümkündür ancak ek adımlar gerekebilir',
      'Mümkünse her iki ebeveyn de katılmalıdır',
      'Çocuk soy bağı yoluyla Türk vatandaşlığı kazanır',
      'Randevu konsolosluk.gov.tr üzerinden',
      'İşlem süresi: kayıt onayı için genellikle 2-4 hafta'
    ],
    checklistUrlEn: '/documents/checklists/Birth-Registration-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Dogum-Tescili-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['turkish-id', 'passport', 'population-registry'],
    relatedContracts: [
      { slug: 'nda', titleEn: 'Non-Disclosure Agreement', titleTr: 'Gizlilik Sözleşmesi' }
    ],
    metaTitleEn: 'Birth Registration Abroad — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'Yurt Dışında Doğum Tescili — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Register a birth at Turkish consulate: English & Turkish checklist. Required documents, apostille info, and appointment portal guide.',
    metaDescTr: 'Türk konsolosluğunda doğum kaydı: İngilizce & Türkçe kontrol listesi. Gerekli belgeler, apostil bilgisi ve randevu rehberi.'
  },
  {
    slug: 'marriage-registration',
    slugTr: 'evlilik-tescili',
    titleEn: 'Marriage Registration Abroad',
    titleTr: 'Yurt Dışında Evlilik Tescili',
    summaryEn: 'Marriages performed abroad must be registered with Turkish authorities to be recognized in Turkey. This is done through the consulate and updates the population registry.',
    summaryTr: 'Yurt dışında yapılan evliliklerin Türkiye\'de tanınması için Türk makamlarına tescil edilmesi gerekir. Bu işlem konsolosluk aracılığıyla yapılır ve nüfus kütüğünü günceller.',
    requirementsEn: [
      'Original marriage certificate (apostilled)',
      'Certified Turkish translation of marriage certificate',
      'Both spouses\' Turkish ID cards or passports',
      'Both spouses\' birth certificates (if not in Turkish system)',
      'Proof of termination of previous marriages (if applicable)',
      'Application form',
      'For religious marriages: civil marriage certificate required'
    ],
    requirementsTr: [
      'Orijinal evlilik belgesi (apostilli)',
      'Evlilik belgesinin yeminli Türkçe tercümesi',
      'Her iki eşin T.C. Kimlik Kartları veya pasaportları',
      'Her iki eşin doğum belgeleri (Türk sisteminde yoksa)',
      'Önceki evliliklerin sona erdiğine dair belge (varsa)',
      'Başvuru formu',
      'Dini nikah için: resmi nikah belgesi gerekli'
    ],
    processingNotesEn: [
      'Both spouses should attend the appointment',
      'If one spouse is not Turkish, additional documents may be needed',
      'Registration updates both spouses\' population records',
      'Appointment via konsolosluk.gov.tr',
      'Processing time: typically 2-4 weeks',
      'Marriage date in Turkish records will reflect the original ceremony date'
    ],
    processingNotesTr: [
      'Her iki eş de randevuya katılmalıdır',
      'Eşlerden biri Türk değilse ek belgeler gerekebilir',
      'Kayıt her iki eşin nüfus kaydını günceller',
      'Randevu konsolosluk.gov.tr üzerinden',
      'İşlem süresi: genellikle 2-4 hafta',
      'Türk kayıtlarındaki evlilik tarihi orijinal tören tarihini yansıtır'
    ],
    checklistUrlEn: '/documents/checklists/Marriage-Registration-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Evlilik-Tescili-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['population-registry', 'birth-registration'],
    relatedContracts: [
      { slug: 'nda', titleEn: 'Non-Disclosure Agreement', titleTr: 'Gizlilik Sözleşmesi' }
    ],
    metaTitleEn: 'Marriage Registration Abroad — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'Yurt Dışında Evlilik Tescili — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Register marriage at Turkish consulate: English & Turkish checklist. Apostille requirements, documents needed, appointment portal.',
    metaDescTr: 'Türk konsolosluğunda evlilik kaydı: İngilizce & Türkçe kontrol listesi. Apostil gereksinimleri, belgeler ve randevu portalı.'
  },
  {
    slug: 'population-registry',
    slugTr: 'nufus-kayit-ornegi',
    titleEn: 'Population Registry Extract (Nüfus Kayıt Örneği)',
    titleTr: 'Nüfus Kayıt Örneği',
    summaryEn: 'A Population Registry Extract is an official document showing your family registration details in Turkey. It\'s commonly needed for legal proceedings, inheritance matters, and official applications.',
    summaryTr: 'Nüfus Kayıt Örneği, Türkiye\'deki aile kayıt bilgilerinizi gösteren resmi bir belgedir. Yasal işlemler, miras konuları ve resmi başvurular için yaygın olarak gereklidir.',
    requirementsEn: [
      'Valid Turkish ID card or passport',
      'Turkish ID number (T.C. Kimlik No)',
      'Application form',
      'Fee payment (if applicable)',
      'Purpose statement (may be required for certain extract types)'
    ],
    requirementsTr: [
      'Geçerli T.C. Kimlik Kartı veya pasaport',
      'T.C. Kimlik Numarası',
      'Başvuru formu',
      'Ücret ödemesi (gerekiyorsa)',
      'Amaç beyanı (belirli örnek türleri için gerekebilir)'
    ],
    processingNotesEn: [
      'Available types: Individual, Family, Full Registry',
      'Some extracts can be obtained online via e-Devlet (turkiye.gov.tr)',
      'Consulate can issue official copies for those abroad',
      'Appointment via konsolosluk.gov.tr for in-person requests',
      'Processing time: same day to 1 week depending on type',
      'Document validity varies by receiving institution\'s requirements'
    ],
    processingNotesTr: [
      'Mevcut türler: Bireysel, Aile, Tam Kayıt',
      'Bazı örnekler e-Devlet (turkiye.gov.tr) üzerinden alınabilir',
      'Konsolosluk yurt dışındakiler için resmi kopya verebilir',
      'Şahsen talepler için konsolosluk.gov.tr üzerinden randevu',
      'İşlem süresi: türe göre aynı gün ile 1 hafta arası',
      'Belge geçerliliği alıcı kurumun gereksinimlerine göre değişir'
    ],
    checklistUrlEn: '/documents/checklists/Population-Registry-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Nufus-Kayit-Ornegi-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['turkish-id', 'birth-registration', 'marriage-registration'],
    relatedContracts: [
      { slug: 'service-agreement', titleEn: 'Service Agreement', titleTr: 'Hizmet Sözleşmesi' }
    ],
    metaTitleEn: 'Population Registry Extract — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'Nüfus Kayıt Örneği — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Get Turkish population registry extract: English & Turkish checklist. Document types, e-Devlet options, consulate appointment guide.',
    metaDescTr: 'Nüfus kayıt örneği alma: İngilizce & Türkçe kontrol listesi. Belge türleri, e-Devlet seçenekleri, konsolosluk randevu rehberi.'
  },
  {
    slug: 'death-registration',
    slugTr: 'olum-tescili',
    titleEn: 'Death Registration & Funeral Transport',
    titleTr: 'Ölüm Tescili & Cenaze Nakli',
    summaryEn: 'Deaths of Turkish citizens abroad must be registered with the consulate. The consulate also assists with funeral transport arrangements to Turkey if requested by the family.',
    summaryTr: 'Yurt dışında vefat eden Türk vatandaşlarının konsolosluğa kaydedilmesi gerekir. Konsolosluk ayrıca aile tarafından talep edilirse Türkiye\'ye cenaze nakli düzenlemelerine yardımcı olur.',
    requirementsEn: [
      'Original death certificate from local authorities',
      'Certified Turkish translation of death certificate',
      'Deceased\'s Turkish ID card or passport',
      'Applicant\'s ID and proof of relationship',
      'Medical examiner\'s report (if applicable)',
      'For transport: embalming certificate, transit permit'
    ],
    requirementsTr: [
      'Yerel makamlardan orijinal ölüm belgesi',
      'Ölüm belgesinin yeminli Türkçe tercümesi',
      'Merhum\'un T.C. Kimlik Kartı veya pasaportu',
      'Başvuranın kimliği ve yakınlık belgesi',
      'Adli tabip raporu (gerekiyorsa)',
      'Nakil için: tahnit belgesi, transit izni'
    ],
    processingNotesEn: [
      'Contact consulate immediately after death occurs',
      'Consulate can guide through local requirements',
      'Registration updates Turkish population registry',
      'Funeral transport companies specialize in international repatriation',
      'Turkish Airlines and other carriers have specific cargo procedures',
      'Some costs may be covered by travel insurance if applicable'
    ],
    processingNotesTr: [
      'Vefat gerçekleştikten hemen sonra konsoloslukla iletişime geçin',
      'Konsolosluk yerel gereksinimler konusunda rehberlik edebilir',
      'Kayıt Türk nüfus kütüğünü günceller',
      'Cenaze nakil şirketleri uluslararası nakilde uzmanlaşmıştır',
      'Türk Hava Yolları ve diğer taşıyıcıların özel kargo prosedürleri var',
      'Bazı masraflar varsa seyahat sigortası kapsamında olabilir'
    ],
    checklistUrlEn: '/documents/checklists/Death-Registration-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Olum-Tescili-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['population-registry', 'document-certification'],
    relatedContracts: [
      { slug: 'service-agreement', titleEn: 'Service Agreement', titleTr: 'Hizmet Sözleşmesi' }
    ],
    metaTitleEn: 'Death Registration Abroad — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'Yurt Dışında Ölüm Tescili — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Register death at Turkish consulate & funeral transport info: English & Turkish checklist. Documents needed, repatriation guidance.',
    metaDescTr: 'Türk konsolosluğunda ölüm kaydı & cenaze nakli bilgisi: İngilizce & Türkçe kontrol listesi. Gerekli belgeler ve nakil rehberi.'
  },
  {
    slug: 'document-certification',
    slugTr: 'belge-tasdiki',
    titleEn: 'Document Certification (Tasdik / Apostille)',
    titleTr: 'Belge Tasdiki (Tasdik / Apostil)',
    summaryEn: 'Turkish consulates can authenticate signatures, certify document copies, and verify translations. This is essential for documents to be legally recognized between countries.',
    summaryTr: 'Türk konsoloslukları imza tasdiki, belge kopyası onayı ve tercüme doğrulaması yapabilir. Bu, belgelerin ülkeler arasında yasal olarak tanınması için gereklidir.',
    requirementsEn: [
      'Original document to be certified',
      'Copy of the document (for copy certification)',
      'Turkish ID card or passport',
      'Translation by certified translator (for translation verification)',
      'Fee payment',
      'Application form (if required)'
    ],
    requirementsTr: [
      'Tasdik edilecek orijinal belge',
      'Belgenin kopyası (kopya tasdiki için)',
      'T.C. Kimlik Kartı veya pasaport',
      'Yeminli tercüman tarafından tercüme (tercüme doğrulaması için)',
      'Ücret ödemesi',
      'Başvuru formu (gerekiyorsa)'
    ],
    processingNotesEn: [
      'Appointment via konsolosluk.gov.tr',
      'Consulate certifies that copy matches original',
      'Translation certification confirms translator\'s signature',
      'For US documents to be used in Turkey: apostille from Secretary of State first',
      'For Turkish documents to be used in US: consulate certification may suffice',
      'Processing: often same-day for straightforward requests'
    ],
    processingNotesTr: [
      'Randevu konsolosluk.gov.tr üzerinden',
      'Konsolosluk kopyanın orijinalle eşleştiğini tasdik eder',
      'Tercüme tasdiki tercümanın imzasını doğrular',
      'Türkiye\'de kullanılacak ABD belgeleri için: önce Dışişleri Bakanlığı\'ndan apostil',
      'ABD\'de kullanılacak Türk belgeleri için: konsolosluk tasdiki yeterli olabilir',
      'İşlem süresi: basit talepler için genellikle aynı gün'
    ],
    checklistUrlEn: '/documents/checklists/Document-Certification-Checklist-EN.pdf',
    checklistUrlTr: '/documents/checklists/Belge-Tasdiki-Kontrol-Listesi-TR.pdf',
    relatedProcedures: ['notary-services', 'birth-registration', 'marriage-registration'],
    relatedContracts: [
      { slug: 'nda', titleEn: 'Non-Disclosure Agreement', titleTr: 'Gizlilik Sözleşmesi' },
      { slug: 'service-agreement', titleEn: 'Service Agreement', titleTr: 'Hizmet Sözleşmesi' }
    ],
    metaTitleEn: 'Document Certification (Tasdik) — Requirements & Checklist (EN/TR) | EchoLegal',
    metaTitleTr: 'Belge Tasdiki — Gerekli Belgeler & Kontrol Listesi (EN/TR) | EchoLegal',
    metaDescEn: 'Turkish consulate document certification: English & Turkish checklist. Apostille info, translation verification, signature authentication.',
    metaDescTr: 'Konsolosluk belge tasdiki: İngilizce & Türkçe kontrol listesi. Apostil bilgisi, tercüme doğrulama, imza tasdiki.'
  }
]

// Helper function to get procedure by slug (either EN or TR)
export function getProcedureBySlug(slug: string): ConsularProcedure | undefined {
  return consularProcedures.find(p => p.slug === slug || p.slugTr === slug)
}

// Helper to get slug for opposite language
export function getOppositeSlug(slug: string, currentLang: 'en' | 'tr'): string {
  const procedure = getProcedureBySlug(slug)
  if (!procedure) return slug
  return currentLang === 'en' ? procedure.slugTr : procedure.slug
}
