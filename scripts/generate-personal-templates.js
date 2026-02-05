// scripts/generate-personal-templates.js
// Generates DOCX files for personal document templates

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/documents');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to create a document
async function createDocument(title, sections, filename) {
  const children = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: 'EchoLegal Template',
      spacing: { after: 200 },
      style: 'Subtitle',
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '⚖️ This template is for informational purposes only and does not constitute legal advice.',
          italics: true,
          size: 20,
        }),
      ],
      spacing: { after: 400 },
    }),
  ];

  sections.forEach((section) => {
    if (section.heading) {
      children.push(
        new Paragraph({
          text: section.heading,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 },
        })
      );
    }
    if (section.content) {
      section.content.forEach((line) => {
        children.push(
          new Paragraph({
            text: line,
            spacing: { after: 120 },
          })
        );
      });
    }
    if (section.placeholder) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.placeholder,
              highlight: 'yellow',
            }),
          ],
          spacing: { after: 120 },
        })
      );
    }
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`Created: ${filename}`);
}

// 1. Turkish ID Card Example Guide
const turkishIdEN = {
  title: 'Turkish ID Card (Nüfus Cüzdanı) - Example Guide',
  filename: 'TurkishIDCard-ExampleGuide-EN.docx',
  sections: [
    {
      heading: 'What is a Nüfus Cüzdanı?',
      content: [
        'The Nüfus Cüzdanı (Turkish National ID Card) is the official identity document issued to Turkish citizens. Since 2017, Turkey has transitioned to a chip-enabled smart ID card (Türkiye Cumhuriyeti Kimlik Kartı).',
        '',
        'This guide explains the fields and format of the Turkish ID card for translation, verification, and official use purposes.',
      ],
    },
    {
      heading: 'Front Side Fields (Ön Yüz)',
      content: [
        '• T.C. KİMLİK NO - Turkish ID Number (11-digit unique identifier)',
        '• SOYADI - Surname/Family Name',
        '• ADI - First Name(s)',
        '• DOĞUM TARİHİ - Date of Birth (DD.MM.YYYY format)',
        '• CİNSİYETİ - Gender (E = Erkek/Male, K = Kadın/Female)',
        '• UYRUĞU - Nationality (TUR for Turkish)',
        '• SERİ NO - Card Serial Number',
        '• GEÇERLİLİK TARİHİ - Expiry Date',
        '• Photo and signature of the cardholder',
      ],
    },
    {
      heading: 'Back Side Fields (Arka Yüz)',
      content: [
        '• BABA ADI - Father\'s Name',
        '• ANNE ADI - Mother\'s Name',
        '• DOĞUM YERİ - Place of Birth',
        '• MEDENİ HALİ - Marital Status',
        '  - Bekâr = Single',
        '  - Evli = Married',
        '  - Boşanmış = Divorced',
        '  - Dul = Widowed',
        '• DİN - Religion (optional field)',
        '• NÜFUSA KAYITLI OLDUĞU YER - Place of Civil Registration',
        '  - İL = Province',
        '  - İLÇE = District',
        '  - MAHALLE/KÖY = Neighborhood/Village',
        '  - CİLT NO = Volume Number',
        '  - AİLE SIRA NO = Family Sequence Number',
        '  - SIRA NO = Individual Sequence Number',
        '• VERİLİŞ TARİHİ - Issue Date',
        '• VERİLDİĞİ YER - Place of Issue',
        '• Machine Readable Zone (MRZ)',
      ],
    },
    {
      heading: 'Old vs. New Format',
      content: [
        'OLD FORMAT (Blue booklet - Nüfus Cüzdanı):',
        '• Paper-based booklet format',
        '• No chip or biometric data',
        '• Still valid but being phased out',
        '',
        'NEW FORMAT (Smart Card - Kimlik Kartı):',
        '• Credit card-sized plastic card',
        '• Contains NFC chip with biometric data',
        '• Machine-readable (MRZ)',
        '• Valid for 10 years (adults) or until age 18 (minors)',
        '• Issued since 2017',
      ],
    },
    {
      heading: 'Common Uses',
      content: [
        '• Identity verification for official purposes',
        '• Travel within Turkey',
        '• Banking and financial transactions',
        '• Healthcare access',
        '• Voting in elections',
        '• Employment documentation',
        '• Real estate transactions',
        '',
        'Note: For international travel, a passport is required.',
      ],
    },
    {
      heading: 'Translation Notes',
      content: [
        'When translating Turkish ID documents:',
        '',
        '• Preserve all original data exactly as written',
        '• Include both Turkish and English/target language',
        '• Note the format of dates (DD.MM.YYYY)',
        '• Explain abbreviations (E/K for gender, etc.)',
        '• Include a certification statement from the translator',
        '• Notarization may be required for official use',
      ],
    },
  ],
};

const turkishIdTR = {
  title: 'Nüfus Cüzdanı Örneği - Rehber',
  filename: 'NufusCuzdani-OrnekRehber-TR.docx',
  sections: [
    {
      heading: 'Nüfus Cüzdanı Nedir?',
      content: [
        'Nüfus Cüzdanı, Türk vatandaşlarına verilen resmi kimlik belgesidir. 2017 yılından itibaren Türkiye, çipli akıllı kimlik kartına (Türkiye Cumhuriyeti Kimlik Kartı) geçiş yapmıştır.',
        '',
        'Bu rehber, tercüme, doğrulama ve resmi kullanım amaçları için Türk kimlik kartının alanlarını ve formatını açıklamaktadır.',
      ],
    },
    {
      heading: 'Ön Yüz Alanları',
      content: [
        '• T.C. KİMLİK NO - Türkiye Cumhuriyeti Kimlik Numarası (11 haneli benzersiz numara)',
        '• SOYADI - Aile Adı',
        '• ADI - Ad/Adlar',
        '• DOĞUM TARİHİ - Doğum Tarihi (GG.AA.YYYY formatında)',
        '• CİNSİYETİ - Cinsiyet (E = Erkek, K = Kadın)',
        '• UYRUĞU - Uyruk (TUR = Türkiye)',
        '• SERİ NO - Kart Seri Numarası',
        '• GEÇERLİLİK TARİHİ - Son Geçerlilik Tarihi',
        '• Kart sahibinin fotoğrafı ve imzası',
      ],
    },
    {
      heading: 'Arka Yüz Alanları',
      content: [
        '• BABA ADI - Babanın Adı',
        '• ANNE ADI - Annenin Adı',
        '• DOĞUM YERİ - Doğum Yeri',
        '• MEDENİ HALİ - Medeni Durum',
        '  - Bekâr',
        '  - Evli',
        '  - Boşanmış',
        '  - Dul',
        '• DİN - Din (isteğe bağlı alan)',
        '• NÜFUSA KAYITLI OLDUĞU YER - Nüfus Kayıt Yeri',
        '  - İL',
        '  - İLÇE',
        '  - MAHALLE/KÖY',
        '  - CİLT NO',
        '  - AİLE SIRA NO',
        '  - SIRA NO',
        '• VERİLİŞ TARİHİ - Verilme Tarihi',
        '• VERİLDİĞİ YER - Verildiği Yer',
        '• Makine Tarafından Okunabilir Bölge (MRZ)',
      ],
    },
    {
      heading: 'Eski ve Yeni Format',
      content: [
        'ESKİ FORMAT (Mavi cüzdan):',
        '• Kağıt cüzdan formatı',
        '• Çip veya biyometrik veri yok',
        '• Hâlâ geçerli ancak aşamalı olarak kaldırılıyor',
        '',
        'YENİ FORMAT (Akıllı Kart - Kimlik Kartı):',
        '• Kredi kartı boyutunda plastik kart',
        '• Biyometrik verili NFC çip içerir',
        '• Makine tarafından okunabilir (MRZ)',
        '• 10 yıl geçerli (yetişkinler) veya 18 yaşına kadar (küçükler)',
        '• 2017\'den beri veriliyor',
      ],
    },
    {
      heading: 'Yaygın Kullanım Alanları',
      content: [
        '• Resmi işlemler için kimlik doğrulama',
        '• Türkiye içi seyahat',
        '• Bankacılık ve finansal işlemler',
        '• Sağlık hizmetlerine erişim',
        '• Seçimlerde oy kullanma',
        '• İstihdam belgeleri',
        '• Gayrimenkul işlemleri',
        '',
        'Not: Uluslararası seyahat için pasaport gereklidir.',
      ],
    },
  ],
};

// 2. Power of Attorney Outline
const poaEN = {
  title: 'Power of Attorney - Key Elements Outline',
  filename: 'PowerOfAttorney-Outline-EN.docx',
  sections: [
    {
      heading: 'What is a Power of Attorney?',
      content: [
        'A Power of Attorney (POA) is a legal document that grants one person (the "agent" or "attorney-in-fact") the authority to act on behalf of another person (the "principal") in legal, financial, or personal matters.',
        '',
        'This outline covers the key elements to consider when drafting or reviewing a power of attorney document.',
      ],
    },
    {
      heading: 'Types of Power of Attorney',
      content: [
        '1. GENERAL POWER OF ATTORNEY',
        '   • Broad authority over financial and legal matters',
        '   • Typically ends if principal becomes incapacitated',
        '',
        '2. DURABLE POWER OF ATTORNEY',
        '   • Remains effective if principal becomes incapacitated',
        '   • Must explicitly state durability',
        '',
        '3. LIMITED/SPECIAL POWER OF ATTORNEY',
        '   • Authority for specific transactions or time periods',
        '   • Example: Selling a specific property',
        '',
        '4. HEALTHCARE POWER OF ATTORNEY',
        '   • Authority for medical decisions',
        '   • Also called "Healthcare Proxy"',
        '',
        '5. SPRINGING POWER OF ATTORNEY',
        '   • Becomes effective upon a specific event',
        '   • Often triggered by incapacity',
      ],
    },
    {
      heading: 'Essential Elements',
      content: [
        '1. IDENTIFICATION OF PARTIES',
        '   • Principal\'s full legal name and address',
        '   • Agent\'s full legal name and address',
        '   • Successor agent(s) if applicable',
        '',
        '2. GRANT OF AUTHORITY',
        '   • Specific powers being granted',
        '   • Limitations on authority',
        '   • Whether agent can delegate powers',
        '',
        '3. EFFECTIVE DATE',
        '   • When the POA becomes effective',
        '   • Triggering events (for springing POA)',
        '',
        '4. DURATION/TERMINATION',
        '   • Expiration date (if any)',
        '   • Conditions for termination',
        '   • Death of principal automatically terminates',
        '',
        '5. SIGNATURE AND NOTARIZATION',
        '   • Principal\'s signature',
        '   • Witness signatures (requirements vary by state)',
        '   • Notary acknowledgment',
        '',
        '6. DURABILITY CLAUSE (if applicable)',
        '   • "This power of attorney shall not be affected by the subsequent disability or incapacity of the principal"',
      ],
    },
    {
      heading: 'Common Powers Granted',
      content: [
        '• Banking and financial transactions',
        '• Real estate transactions',
        '• Tax matters and filings',
        '• Business operations',
        '• Insurance claims',
        '• Government benefits',
        '• Legal claims and litigation',
        '• Gift-giving (requires explicit authorization)',
        '• Digital assets management',
      ],
    },
    {
      heading: 'Important Considerations',
      content: [
        '• Choose a trustworthy agent',
        '• Consider naming successor agents',
        '• Be specific about powers and limitations',
        '• Keep the original document secure',
        '• Provide copies to relevant institutions',
        '• Review and update periodically',
        '• Understand state-specific requirements',
        '• Consider consulting an attorney',
      ],
    },
    {
      heading: 'Revocation',
      content: [
        'A Power of Attorney can typically be revoked by:',
        '',
        '• Written revocation signed by the principal',
        '• Destroying all copies of the POA',
        '• Creating a new POA that revokes prior ones',
        '• Death of the principal',
        '• Incapacity of the principal (unless durable)',
        '',
        'Important: Notify the agent and all third parties who received copies.',
      ],
    },
  ],
};

const poaTR = {
  title: 'Vekaletname - Temel Unsurlar Anahat',
  filename: 'Vekaletname-Anahat-TR.docx',
  sections: [
    {
      heading: 'Vekaletname Nedir?',
      content: [
        'Vekaletname, bir kişiye (vekil) başka bir kişi (asıl/müvekkil) adına hukuki, mali veya kişisel konularda işlem yapma yetkisi veren yasal bir belgedir.',
        '',
        'Bu anahat, vekaletname düzenlerken veya incelerken dikkate alınması gereken temel unsurları kapsamaktadır.',
      ],
    },
    {
      heading: 'Vekaletname Türleri',
      content: [
        '1. GENEL VEKALETNAME',
        '   • Mali ve hukuki konularda geniş yetki',
        '   • Genellikle asıl ehliyetini kaybederse sona erer',
        '',
        '2. SÜREGELEN VEKALETNAME',
        '   • Asıl ehliyetini kaybetse bile geçerli kalır',
        '   • Süreklilik açıkça belirtilmelidir',
        '',
        '3. SINIRLI/ÖZEL VEKALETNAME',
        '   • Belirli işlemler veya süreler için yetki',
        '   • Örnek: Belirli bir mülkün satışı',
        '',
        '4. SAĞLIK VEKALETNAMESİ',
        '   • Tıbbi kararlar için yetki',
        '   • "Sağlık Temsilcisi" olarak da bilinir',
        '',
        '5. ŞARTA BAĞLI VEKALETNAME',
        '   • Belirli bir olayın gerçekleşmesiyle yürürlüğe girer',
        '   • Genellikle ehliyetsizlikle tetiklenir',
      ],
    },
    {
      heading: 'Temel Unsurlar',
      content: [
        '1. TARAFLARIN KİMLİĞİ',
        '   • Müvekkilin tam yasal adı ve adresi',
        '   • Vekilin tam yasal adı ve adresi',
        '   • Yedek vekil(ler) (varsa)',
        '',
        '2. YETKİ DEVRİ',
        '   • Verilen özel yetkiler',
        '   • Yetki sınırlamaları',
        '   • Vekilin yetki devredip edemeyeceği',
        '',
        '3. YÜRÜRLÜK TARİHİ',
        '   • Vekaletnamenin ne zaman yürürlüğe gireceği',
        '   • Tetikleyici olaylar (şarta bağlı vekaletname için)',
        '',
        '4. SÜRE/SONA ERME',
        '   • Bitiş tarihi (varsa)',
        '   • Sona erme koşulları',
        '   • Müvekkilin ölümü otomatik olarak sona erdirir',
        '',
        '5. İMZA VE NOTERLİK',
        '   • Müvekkilin imzası',
        '   • Tanık imzaları (gereksinimler yargı yetkisine göre değişir)',
        '   • Noter onayı',
        '',
        '6. SÜREKLİLİK KAYDI (varsa)',
        '   • "Bu vekaletname, müvekkilin sonradan ehliyetsiz hale gelmesinden etkilenmeyecektir"',
      ],
    },
    {
      heading: 'Verilen Yaygın Yetkiler',
      content: [
        '• Bankacılık ve mali işlemler',
        '• Gayrimenkul işlemleri',
        '• Vergi işleri ve beyannameleri',
        '• İşletme operasyonları',
        '• Sigorta talepleri',
        '• Devlet yardımları',
        '• Hukuki talepler ve davalar',
        '• Bağış yapma (açık yetki gerektirir)',
        '• Dijital varlık yönetimi',
      ],
    },
    {
      heading: 'Önemli Hususlar',
      content: [
        '• Güvenilir bir vekil seçin',
        '• Yedek vekiller belirlemeyi düşünün',
        '• Yetkiler ve sınırlamalar konusunda net olun',
        '• Orijinal belgeyi güvenli bir yerde saklayın',
        '• İlgili kurumlara kopya sağlayın',
        '• Periyodik olarak gözden geçirin ve güncelleyin',
        '• Yargı yetkisine özgü gereksinimleri anlayın',
        '• Bir avukata danışmayı düşünün',
      ],
    },
    {
      heading: 'İptal',
      content: [
        'Vekaletname genellikle şu yollarla iptal edilebilir:',
        '',
        '• Müvekkil tarafından imzalanan yazılı iptal',
        '• Vekaletnamenin tüm kopyalarının imha edilmesi',
        '• Öncekini iptal eden yeni bir vekaletname oluşturma',
        '• Müvekkilin ölümü',
        '• Müvekkilin ehliyetsizliği (süregelen değilse)',
        '',
        'Önemli: Vekili ve kopya alan tüm üçüncü tarafları bilgilendirin.',
      ],
    },
  ],
};

// 3. Proof of Residency Letter
const residencyEN = {
  title: 'Proof of Residency Letter Template',
  filename: 'ProofOfResidencyLetter-EN.docx',
  sections: [
    {
      content: [
        '[Date]',
        '',
        'To Whom It May Concern,',
      ],
    },
    {
      heading: 'Subject: Proof of Residency',
      content: [
        'I, [Your Full Legal Name], hereby confirm that [Resident\'s Full Legal Name] currently resides at the following address:',
        '',
        '[Full Street Address]',
        '[City, State/Province, ZIP/Postal Code]',
        '[Country]',
        '',
        '[Resident\'s Name] has been residing at this address since [Date - Month/Year].',
      ],
    },
    {
      heading: 'Relationship and Confirmation',
      content: [
        'I am the [relationship - e.g., property owner, landlord, parent, spouse, roommate] and can confirm that [Resident\'s Name] lives at the above address.',
        '',
        'This letter is being provided for [purpose - e.g., school enrollment, driver\'s license application, bank account opening, government services, employment verification].',
      ],
    },
    {
      heading: 'My Information (Letter Writer)',
      content: [
        'Full Name: [Your Full Legal Name]',
        'Address: [Your Address if different]',
        'Phone: [Your Phone Number]',
        'Email: [Your Email Address]',
        'Relationship to Resident: [Relationship]',
      ],
    },
    {
      heading: 'Resident Information',
      content: [
        'Full Name: [Resident\'s Full Legal Name]',
        'Date of Birth: [DOB - if required]',
        'Duration at Address: [Start Date] to Present',
      ],
    },
    {
      heading: 'Declaration',
      content: [
        'I declare under penalty of perjury that the information provided in this letter is true and accurate to the best of my knowledge.',
        '',
        'I am willing to provide additional documentation or verification if required.',
        '',
        '',
        'Sincerely,',
        '',
        '',
        '____________________________',
        '[Your Signature]',
        '',
        '[Your Printed Name]',
        '[Date]',
        '',
        '',
        '[NOTARIZATION - if required]',
        '',
        'State/Country of: _______________',
        'County of: _______________',
        '',
        'Subscribed and sworn before me this ___ day of _________, 20___.',
        '',
        '____________________________',
        'Notary Public',
        'My Commission Expires: _______________',
      ],
    },
    {
      heading: 'Attachments (if applicable)',
      content: [
        '☐ Copy of government-issued ID',
        '☐ Copy of lease agreement or deed',
        '☐ Recent utility bill showing address',
        '☐ Other supporting documentation',
      ],
    },
  ],
};

const residencyTR = {
  title: 'İkametgah Belgesi Mektubu Şablonu',
  filename: 'IkametgahBelgesi-Mektup-TR.docx',
  sections: [
    {
      content: [
        '[Tarih]',
        '',
        'İlgili Makama,',
      ],
    },
    {
      heading: 'Konu: İkametgah Belgesi',
      content: [
        'Ben, [Tam Yasal Adınız], [İkamet Edenin Tam Yasal Adı]\'nın şu anda aşağıdaki adreste ikamet ettiğini onaylıyorum:',
        '',
        '[Tam Sokak Adresi]',
        '[Şehir, İlçe, Posta Kodu]',
        '[Ülke]',
        '',
        '[İkamet Edenin Adı] bu adreste [Tarih - Ay/Yıl] tarihinden beri ikamet etmektedir.',
      ],
    },
    {
      heading: 'İlişki ve Onay',
      content: [
        'Ben [ilişki - örn. mülk sahibi, ev sahibi, ebeveyn, eş, ev arkadaşı] olarak [İkamet Edenin Adı]\'nın yukarıdaki adreste yaşadığını onaylayabilirim.',
        '',
        'Bu mektup [amaç - örn. okul kaydı, ehliyet başvurusu, banka hesabı açma, devlet hizmetleri, istihdam doğrulaması] amacıyla sağlanmaktadır.',
      ],
    },
    {
      heading: 'Mektup Yazanın Bilgileri',
      content: [
        'Ad Soyad: [Tam Yasal Adınız]',
        'Adres: [Farklıysa Adresiniz]',
        'Telefon: [Telefon Numaranız]',
        'E-posta: [E-posta Adresiniz]',
        'İkamet Edenle İlişki: [İlişki]',
      ],
    },
    {
      heading: 'İkamet Eden Bilgileri',
      content: [
        'Ad Soyad: [İkamet Edenin Tam Yasal Adı]',
        'Doğum Tarihi: [Doğum Tarihi - gerekirse]',
        'Adreste Kalış Süresi: [Başlangıç Tarihi] - Günümüz',
      ],
    },
    {
      heading: 'Beyan',
      content: [
        'Bu mektupta verilen bilgilerin bilgim dahilinde doğru ve eksiksiz olduğunu yalan yere yemin cezası altında beyan ederim.',
        '',
        'Gerekirse ek belge veya doğrulama sağlamaya hazırım.',
        '',
        '',
        'Saygılarımla,',
        '',
        '',
        '____________________________',
        '[İmzanız]',
        '',
        '[Adınız Soyadınız]',
        '[Tarih]',
        '',
        '',
        '[NOTERLİK ONAYI - gerekirse]',
        '',
        'Ülke/Şehir: _______________',
        'İlçe: _______________',
        '',
        'İşbu belge benim önümde ___ / _________ / 20___ tarihinde imzalanmış ve yeminle doğrulanmıştır.',
        '',
        '____________________________',
        'Noter',
        'Komisyonum Sona Eriyor: _______________',
      ],
    },
    {
      heading: 'Ekler (varsa)',
      content: [
        '☐ Devlet tarafından verilmiş kimlik belgesi kopyası',
        '☐ Kira sözleşmesi veya tapu kopyası',
        '☐ Adresi gösteren güncel fatura',
        '☐ Diğer destekleyici belgeler',
      ],
    },
  ],
};

// 4. Translation Certification Statement
const translationEN = {
  title: 'Translation Certification Statement',
  filename: 'TranslationCertification-EN.docx',
  sections: [
    {
      heading: 'Certification of Translation Accuracy',
      content: [
        'I, [Translator\'s Full Legal Name], certify the following:',
      ],
    },
    {
      heading: 'Translator Information',
      content: [
        'Full Name: [Translator\'s Full Legal Name]',
        'Address: [Full Address]',
        'Phone: [Phone Number]',
        'Email: [Email Address]',
        'Languages: [Source Language] to [Target Language]',
        '',
        'Professional Qualifications (if applicable):',
        '• [Certification/Credential Name and Number]',
        '• [Membership in Professional Organizations]',
        '• [Years of Experience]',
      ],
    },
    {
      heading: 'Document Information',
      content: [
        'Original Document Title: [Title of Document]',
        'Document Type: [e.g., Birth Certificate, Diploma, Contract]',
        'Original Language: [Source Language]',
        'Translated to: [Target Language]',
        'Number of Pages: [X] pages',
        'Date of Original Document: [Date]',
        'Issuing Authority/Country: [Authority/Country]',
      ],
    },
    {
      heading: 'Certification Statement',
      content: [
        'I hereby certify that:',
        '',
        '1. I am fluent in both [Source Language] and [Target Language] and competent to translate between these languages.',
        '',
        '2. The attached translation is a true, accurate, and complete translation of the original document identified above.',
        '',
        '3. I have translated the document to the best of my ability, preserving the meaning and intent of the original.',
        '',
        '4. I am not a relative of the person(s) named in the document, nor do I have any personal or financial interest in the matter.',
        '',
        '5. I understand that this certification may be used for official purposes and that any misrepresentation may result in legal consequences.',
      ],
    },
    {
      heading: 'Signature Block',
      content: [
        '',
        '____________________________',
        'Translator\'s Signature',
        '',
        '[Translator\'s Printed Name]',
        '',
        'Date: [Date]',
        '',
        '[City, State/Province, Country]',
      ],
    },
    {
      heading: 'Notarization (if required)',
      content: [
        'State/Country of: _______________',
        'County of: _______________',
        '',
        'On this ___ day of _________, 20___, before me personally appeared [Translator\'s Name], known to me (or proved to me on the basis of satisfactory evidence) to be the person whose name is subscribed to this instrument, and acknowledged that [he/she] executed the same.',
        '',
        '',
        '____________________________',
        'Notary Public',
        '',
        'My Commission Expires: _______________',
        '',
        '[NOTARY SEAL]',
      ],
    },
  ],
};

const translationTR = {
  title: 'Tercüme Sertifikası Beyanı',
  filename: 'TercumeSertifikasi-Beyan-TR.docx',
  sections: [
    {
      heading: 'Tercüme Doğruluğu Sertifikası',
      content: [
        'Ben, [Tercümanın Tam Yasal Adı], aşağıdakileri onaylıyorum:',
      ],
    },
    {
      heading: 'Tercüman Bilgileri',
      content: [
        'Ad Soyad: [Tercümanın Tam Yasal Adı]',
        'Adres: [Tam Adres]',
        'Telefon: [Telefon Numarası]',
        'E-posta: [E-posta Adresi]',
        'Diller: [Kaynak Dil] - [Hedef Dil]',
        '',
        'Mesleki Nitelikler (varsa):',
        '• [Sertifika/Yetki Belgesi Adı ve Numarası]',
        '• [Meslek Kuruluşları Üyeliği]',
        '• [Deneyim Yılı]',
      ],
    },
    {
      heading: 'Belge Bilgileri',
      content: [
        'Orijinal Belge Başlığı: [Belge Başlığı]',
        'Belge Türü: [örn. Doğum Belgesi, Diploma, Sözleşme]',
        'Orijinal Dil: [Kaynak Dil]',
        'Tercüme Edilen Dil: [Hedef Dil]',
        'Sayfa Sayısı: [X] sayfa',
        'Orijinal Belge Tarihi: [Tarih]',
        'Düzenleyen Makam/Ülke: [Makam/Ülke]',
      ],
    },
    {
      heading: 'Sertifika Beyanı',
      content: [
        'İşbu belge ile şunları onaylıyorum:',
        '',
        '1. Hem [Kaynak Dil] hem de [Hedef Dil] dillerinde akıcıyım ve bu diller arasında tercüme yapmaya yetkinim.',
        '',
        '2. Ekteki tercüme, yukarıda belirtilen orijinal belgenin doğru, tam ve eksiksiz tercümesidir.',
        '',
        '3. Belgeyi en iyi yeteneğimle tercüme ettim, orijinalin anlam ve amacını koruyarak.',
        '',
        '4. Belgede adı geçen kişi(ler)in akrabası değilim ve bu konuda kişisel veya mali çıkarım bulunmamaktadır.',
        '',
        '5. Bu sertifikanın resmi amaçlar için kullanılabileceğini ve herhangi bir yanlış beyanın yasal sonuçlara yol açabileceğini anlıyorum.',
      ],
    },
    {
      heading: 'İmza Bölümü',
      content: [
        '',
        '____________________________',
        'Tercümanın İmzası',
        '',
        '[Tercümanın Adı Soyadı]',
        '',
        'Tarih: [Tarih]',
        '',
        '[Şehir, İl, Ülke]',
      ],
    },
    {
      heading: 'Noterlik Onayı (gerekirse)',
      content: [
        'Ülke/Şehir: _______________',
        'İlçe: _______________',
        '',
        'İşbu ___ / _________ / 20___ tarihinde, benim önümde [Tercümanın Adı] şahsen bulunmuş olup, bana bilinen (veya yeterli delil temelinde bana kanıtlanan) bu belgeye adı yazılmış kişi olduğunu ve aynısını imzaladığını ikrar etmiştir.',
        '',
        '',
        '____________________________',
        'Noter',
        '',
        'Komisyonum Sona Eriyor: _______________',
        '',
        '[NOTER MÜHRİ]',
      ],
    },
  ],
};

// 5. Apostille Request Guide
const apostilleEN = {
  title: 'Apostille Request - Reference Guide',
  filename: 'ApostilleRequest-Guide-EN.docx',
  sections: [
    {
      heading: 'What is an Apostille?',
      content: [
        'An Apostille is a form of authentication issued to documents for use in countries that participate in the Hague Convention of 1961. It certifies that a document is genuine and can be recognized in another member country.',
        '',
        'The Apostille itself is a certificate attached to your document, typically with a standardized format containing numbered fields.',
      ],
    },
    {
      heading: 'When Do You Need an Apostille?',
      content: [
        'You need an Apostille when presenting documents in a foreign country that is a member of the Hague Convention. Common documents include:',
        '',
        '• Birth certificates',
        '• Marriage certificates',
        '• Death certificates',
        '• Divorce decrees',
        '• Diplomas and transcripts',
        '• Court documents',
        '• Powers of attorney',
        '• Corporate documents',
        '• Adoption papers',
        '• Background checks',
      ],
    },
    {
      heading: 'Hague Convention Countries',
      content: [
        'Over 120 countries are members of the Hague Convention, including:',
        '• United States',
        '• Turkey',
        '• All EU member states',
        '• United Kingdom',
        '• Australia',
        '• Canada (varies by province)',
        '• Japan',
        '• Mexico',
        '• And many more...',
        '',
        'For a complete list, visit: https://www.hcch.net/en/instruments/conventions/status-table',
      ],
    },
    {
      heading: 'How to Obtain an Apostille in the United States',
      content: [
        '1. IDENTIFY THE ISSUING AUTHORITY',
        '   • Federal documents: U.S. Department of State',
        '   • State documents: Secretary of State office',
        '   • The Apostille must come from the state that issued the document',
        '',
        '2. PREPARE YOUR DOCUMENT',
        '   • Original document or certified copy',
        '   • Some states require notarization first',
        '   • Check specific state requirements',
        '',
        '3. SUBMIT YOUR REQUEST',
        '   • In person, by mail, or online (varies by state)',
        '   • Include completed application form',
        '   • Pay required fees',
        '',
        '4. PROCESSING TIME',
        '   • Standard: 5-10 business days',
        '   • Expedited options available in some states',
      ],
    },
    {
      heading: 'Required Information for Application',
      content: [
        '• Your full name and contact information',
        '• Document type being apostilled',
        '• Destination country',
        '• Number of copies needed',
        '• Original signature on document (if applicable)',
        '• Payment for fees',
      ],
    },
    {
      heading: 'Fees (Approximate - Check Current Rates)',
      content: [
        'U.S. Department of State: ~$20 per document',
        'State Secretary of State: $5-$25 per document (varies by state)',
        '',
        'Additional fees may apply for:',
        '• Expedited processing',
        '• Shipping/return delivery',
        '• Authentication services',
      ],
    },
    {
      heading: 'Apostille Format',
      content: [
        'The Apostille certificate includes these numbered fields:',
        '',
        '1. Country of origin',
        '2. Name of document signer',
        '3. Capacity of signer',
        '4. Seal/stamp information',
        '5. Place of certification',
        '6. Date of certification',
        '7. Certifying authority',
        '8. Certificate number',
        '9. Seal of certifying authority',
        '10. Signature of certifying official',
      ],
    },
    {
      heading: 'Important Notes',
      content: [
        '• Apostilles do NOT certify the content of a document is true',
        '• They only verify the signature, seal, or stamp is genuine',
        '• Documents may still need translation in the destination country',
        '• Some countries have additional requirements beyond the Apostille',
        '• Non-Hague countries require embassy/consulate legalization instead',
      ],
    },
  ],
};

const apostilleTR = {
  title: 'Apostil Talebi - Referans Rehberi',
  filename: 'ApostilTalebi-Rehber-TR.docx',
  sections: [
    {
      heading: 'Apostil Nedir?',
      content: [
        'Apostil, 1961 Lahey Sözleşmesi\'ne taraf ülkelerde kullanılmak üzere belgelere verilen bir onay şeklidir. Bir belgenin gerçek olduğunu ve başka bir üye ülkede tanınabileceğini onaylar.',
        '',
        'Apostil, belgenize eklenen ve genellikle numaralı alanlar içeren standartlaştırılmış bir formata sahip bir sertifikadır.',
      ],
    },
    {
      heading: 'Apostile Ne Zaman İhtiyacınız Var?',
      content: [
        'Lahey Sözleşmesi\'ne üye bir yabancı ülkede belge sunmanız gerektiğinde Apostile ihtiyacınız vardır. Yaygın belgeler şunlardır:',
        '',
        '• Doğum belgeleri',
        '• Evlilik cüzdanları',
        '• Ölüm belgeleri',
        '• Boşanma kararları',
        '• Diplomalar ve transkriptler',
        '• Mahkeme belgeleri',
        '• Vekaletnameler',
        '• Şirket belgeleri',
        '• Evlat edinme belgeleri',
        '• Adli sicil kayıtları',
      ],
    },
    {
      heading: 'Lahey Sözleşmesi Ülkeleri',
      content: [
        'Lahey Sözleşmesi\'ne 120\'den fazla ülke üyedir:',
        '• Amerika Birleşik Devletleri',
        '• Türkiye',
        '• Tüm AB üye devletleri',
        '• Birleşik Krallık',
        '• Avustralya',
        '• Kanada (eyalete göre değişir)',
        '• Japonya',
        '• Meksika',
        '• Ve daha fazlası...',
        '',
        'Tam liste için: https://www.hcch.net/en/instruments/conventions/status-table',
      ],
    },
    {
      heading: 'Türkiye\'de Apostil Nasıl Alınır?',
      content: [
        '1. YETKİLİ MAKAMI BELİRLEYİN',
        '   • Noterlik belgeleri: Kaymakamlık veya Valilik',
        '   • Adli belgeler: Adli makamlar',
        '   • Nüfus belgeleri: Kaymakamlık veya Valilik',
        '',
        '2. BELGENİZİ HAZIRLAYIN',
        '   • Orijinal belge veya onaylı kopya',
        '   • Gerekirse noter onayı',
        '   • Belirli gereksinimleri kontrol edin',
        '',
        '3. BAŞVURUNUZU SUNUN',
        '   • Şahsen veya posta yoluyla',
        '   • Doldurulmuş başvuru formunu ekleyin',
        '   • Gerekli ücretleri ödeyin',
        '',
        '4. İŞLEM SÜRESİ',
        '   • Standart: 3-5 iş günü',
        '   • Acil seçenekler mevcut olabilir',
      ],
    },
    {
      heading: 'Başvuru için Gerekli Bilgiler',
      content: [
        '• Tam adınız ve iletişim bilgileriniz',
        '• Apostillenecek belge türü',
        '• Hedef ülke',
        '• Gereken kopya sayısı',
        '• Belgede orijinal imza (varsa)',
        '• Ücret ödemesi',
      ],
    },
    {
      heading: 'Ücretler (Tahmini - Güncel Oranları Kontrol Edin)',
      content: [
        'Türkiye\'de apostil ücreti belge türüne ve makama göre değişir.',
        '',
        'Ek ücretler şunlar için geçerli olabilir:',
        '• Hızlandırılmış işlem',
        '• Kargo/iade teslimatı',
        '• Onay hizmetleri',
      ],
    },
    {
      heading: 'Apostil Formatı',
      content: [
        'Apostil sertifikası şu numaralı alanları içerir:',
        '',
        '1. Menşe ülke',
        '2. Belgeyi imzalayanın adı',
        '3. İmzalayanın sıfatı',
        '4. Mühür/damga bilgisi',
        '5. Onay yeri',
        '6. Onay tarihi',
        '7. Onaylayan makam',
        '8. Sertifika numarası',
        '9. Onaylayan makamın mührü',
        '10. Onaylayan yetkilinin imzası',
      ],
    },
    {
      heading: 'Önemli Notlar',
      content: [
        '• Apostiller belge içeriğinin doğru olduğunu onaylaMAZ',
        '• Yalnızca imza, mühür veya damganın gerçek olduğunu doğrularlar',
        '• Belgeler hedef ülkede hâlâ tercüme gerektirebilir',
        '• Bazı ülkelerin Apostil dışında ek gereksinimleri vardır',
        '• Lahey dışı ülkeler bunun yerine elçilik/konsolosluk tasdiki gerektirir',
      ],
    },
  ],
};

// 6. Name Change Affidavit Outline
const nameChangeEN = {
  title: 'Name Change Affidavit - Key Elements Outline',
  filename: 'NameChangeAffidavit-Outline-EN.docx',
  sections: [
    {
      heading: 'What is a Name Change Affidavit?',
      content: [
        'A Name Change Affidavit is a sworn statement used to officially document a change of name. It may be used as part of a court petition for name change or to provide evidence of a name change that occurred through marriage, divorce, or other legal means.',
        '',
        'This outline covers the key elements typically included in a name change affidavit.',
      ],
    },
    {
      heading: 'When Might You Need One?',
      content: [
        '• Legal name change through court petition',
        '• Correcting errors in official records',
        '• Documenting name change after marriage',
        '• Reverting to maiden name after divorce',
        '• Gender transition name change',
        '• Religious or cultural name adoption',
        '• Updating immigration or citizenship records',
      ],
    },
    {
      heading: 'Key Elements',
      content: [
        '1. PERSONAL INFORMATION',
        '   • Current legal name',
        '   • Desired new name',
        '   • Date of birth',
        '   • Place of birth',
        '   • Current address',
        '   • Social Security Number (U.S.)',
        '',
        '2. REASON FOR NAME CHANGE',
        '   • Marriage',
        '   • Divorce',
        '   • Personal preference',
        '   • Religious/cultural reasons',
        '   • Gender identity',
        '   • Other (specify)',
        '',
        '3. HISTORY OF NAME USE',
        '   • Previous names used',
        '   • Duration of use for each name',
        '   • Documents issued under each name',
        '',
        '4. DECLARATION STATEMENTS',
        '   • Not changing name to defraud creditors',
        '   • Not a fugitive from justice',
        '   • Not changing name for illegal purposes',
        '   • Will notify relevant parties of name change',
        '',
        '5. SUPPORTING DOCUMENTATION',
        '   • Birth certificate',
        '   • Marriage certificate (if applicable)',
        '   • Divorce decree (if applicable)',
        '   • Current government ID',
        '   • Court order (if already obtained)',
      ],
    },
    {
      heading: 'Sample Affidavit Language',
      content: [
        'AFFIDAVIT OF NAME CHANGE',
        '',
        'State of [State]',
        'County of [County]',
        '',
        'I, [Current Legal Name], being duly sworn, depose and state as follows:',
        '',
        '1. I am over 18 years of age and competent to make this affidavit.',
        '',
        '2. My current legal name is [Current Full Legal Name].',
        '',
        '3. My date of birth is [Date of Birth].',
        '',
        '4. My place of birth is [City, State/Country].',
        '',
        '5. I reside at [Current Address].',
        '',
        '6. I wish to change my name to [Desired New Name].',
        '',
        '7. The reason for this name change is [Reason].',
        '',
        '8. I am not seeking this name change for any fraudulent purpose or to evade any legal obligation.',
        '',
        '9. I am not a fugitive from justice and have no criminal charges pending against me.',
        '',
        '10. I understand that once my name is legally changed, I must update my identification documents, financial accounts, and other records accordingly.',
        '',
        '',
        '____________________________',
        'Signature (Current Legal Name)',
        '',
        '[Printed Name]',
        'Date: [Date]',
      ],
    },
    {
      heading: 'Notarization',
      content: [
        'State of _______________',
        'County of _______________',
        '',
        'Subscribed and sworn to before me this ___ day of _________, 20___.',
        '',
        '',
        '____________________________',
        'Notary Public',
        '',
        'My Commission Expires: _______________',
        '',
        '[NOTARY SEAL]',
      ],
    },
    {
      heading: 'After the Name Change',
      content: [
        'Documents to update after legal name change:',
        '',
        '• Social Security card',
        '• Driver\'s license or state ID',
        '• Passport',
        '• Birth certificate (in some cases)',
        '• Bank accounts',
        '• Credit cards',
        '• Employment records',
        '• School/university records',
        '• Professional licenses',
        '• Insurance policies',
        '• Property deeds',
        '• Vehicle registration',
        '• Voter registration',
      ],
    },
  ],
};

const nameChangeTR = {
  title: 'İsim Değişikliği Beyanı - Temel Unsurlar Anahat',
  filename: 'IsimDegisikligiBeyanı-Anahat-TR.docx',
  sections: [
    {
      heading: 'İsim Değişikliği Beyanı Nedir?',
      content: [
        'İsim Değişikliği Beyanı, bir isim değişikliğini resmi olarak belgelemek için kullanılan yeminli bir ifadedir. Mahkemeye isim değişikliği dilekçesinin bir parçası olarak veya evlilik, boşanma veya diğer yasal yollarla gerçekleşen bir isim değişikliğinin kanıtı olarak kullanılabilir.',
        '',
        'Bu anahat, bir isim değişikliği beyanında tipik olarak yer alan temel unsurları kapsamaktadır.',
      ],
    },
    {
      heading: 'Ne Zaman İhtiyacınız Olabilir?',
      content: [
        '• Mahkeme dilekçesiyle yasal isim değişikliği',
        '• Resmi kayıtlardaki hataların düzeltilmesi',
        '• Evlilik sonrası isim değişikliğinin belgelenmesi',
        '• Boşanma sonrası kızlık soyadına dönüş',
        '• Cinsiyet geçişi isim değişikliği',
        '• Dini veya kültürel isim benimseme',
        '• Göçmenlik veya vatandaşlık kayıtlarının güncellenmesi',
      ],
    },
    {
      heading: 'Temel Unsurlar',
      content: [
        '1. KİŞİSEL BİLGİLER',
        '   • Mevcut yasal ad',
        '   • İstenen yeni ad',
        '   • Doğum tarihi',
        '   • Doğum yeri',
        '   • Mevcut adres',
        '   • T.C. Kimlik Numarası',
        '',
        '2. İSİM DEĞİŞİKLİĞİ NEDENİ',
        '   • Evlilik',
        '   • Boşanma',
        '   • Kişisel tercih',
        '   • Dini/kültürel nedenler',
        '   • Cinsiyet kimliği',
        '   • Diğer (belirtin)',
        '',
        '3. İSİM KULLANIM GEÇMİŞİ',
        '   • Daha önce kullanılan isimler',
        '   • Her ismin kullanım süresi',
        '   • Her isim altında düzenlenen belgeler',
        '',
        '4. BEYAN İFADELERİ',
        '   • Alacaklıları dolandırmak için isim değiştirmiyorum',
        '   • Adaletten kaçak değilim',
        '   • Yasadışı amaçlarla isim değiştirmiyorum',
        '   • İlgili tarafları isim değişikliğinden haberdar edeceğim',
        '',
        '5. DESTEKLEYEN BELGELER',
        '   • Doğum belgesi',
        '   • Evlilik cüzdanı (varsa)',
        '   • Boşanma kararı (varsa)',
        '   • Mevcut devlet kimliği',
        '   • Mahkeme kararı (zaten alınmışsa)',
      ],
    },
    {
      heading: 'Örnek Beyan Dili',
      content: [
        'İSİM DEĞİŞİKLİĞİ BEYANI',
        '',
        '[Şehir]',
        '[İlçe]',
        '',
        'Ben, [Mevcut Yasal Adı], usulüne uygun olarak yemin ederek aşağıdakileri beyan ederim:',
        '',
        '1. 18 yaşından büyüğüm ve bu beyanı yapmaya yetkinim.',
        '',
        '2. Mevcut yasal adım [Mevcut Tam Yasal Adı]\'dır.',
        '',
        '3. Doğum tarihim [Doğum Tarihi]\'dir.',
        '',
        '4. Doğum yerim [Şehir, İl/Ülke]\'dir.',
        '',
        '5. [Mevcut Adres] adresinde ikamet ediyorum.',
        '',
        '6. Adımı [İstenen Yeni Ad] olarak değiştirmek istiyorum.',
        '',
        '7. Bu isim değişikliğinin nedeni [Neden]\'dir.',
        '',
        '8. Bu isim değişikliğini herhangi bir dolandırıcılık amacıyla veya herhangi bir yasal yükümlülükten kaçınmak için istemiyorum.',
        '',
        '9. Adaletten kaçak değilim ve aleyhime bekleyen cezai suçlama yoktur.',
        '',
        '10. Adım yasal olarak değiştirildikten sonra kimlik belgelerimi, mali hesaplarımı ve diğer kayıtlarımı buna göre güncellemem gerektiğini anlıyorum.',
        '',
        '',
        '____________________________',
        'İmza (Mevcut Yasal Ad)',
        '',
        '[Adı Soyadı]',
        'Tarih: [Tarih]',
      ],
    },
    {
      heading: 'Noterlik Onayı',
      content: [
        'Ülke/Şehir: _______________',
        'İlçe: _______________',
        '',
        'İşbu belge benim önümde ___ / _________ / 20___ tarihinde imzalanmış ve yeminle doğrulanmıştır.',
        '',
        '',
        '____________________________',
        'Noter',
        '',
        'Komisyonum Sona Eriyor: _______________',
        '',
        '[NOTER MÜHRİ]',
      ],
    },
    {
      heading: 'İsim Değişikliğinden Sonra',
      content: [
        'Yasal isim değişikliğinden sonra güncellenecek belgeler:',
        '',
        '• Nüfus cüzdanı / Kimlik kartı',
        '• Ehliyet',
        '• Pasaport',
        '• Banka hesapları',
        '• Kredi kartları',
        '• İstihdam kayıtları',
        '• Okul/üniversite kayıtları',
        '• Mesleki lisanslar',
        '• Sigorta poliçeleri',
        '• Tapu kayıtları',
        '• Araç tescili',
        '• Seçmen kaydı',
      ],
    },
  ],
};

// Generate all documents
async function generateAll() {
  console.log('Generating personal document templates...\n');

  await createDocument(turkishIdEN.title, turkishIdEN.sections, turkishIdEN.filename);
  await createDocument(turkishIdTR.title, turkishIdTR.sections, turkishIdTR.filename);

  await createDocument(poaEN.title, poaEN.sections, poaEN.filename);
  await createDocument(poaTR.title, poaTR.sections, poaTR.filename);

  await createDocument(residencyEN.title, residencyEN.sections, residencyEN.filename);
  await createDocument(residencyTR.title, residencyTR.sections, residencyTR.filename);

  await createDocument(translationEN.title, translationEN.sections, translationEN.filename);
  await createDocument(translationTR.title, translationTR.sections, translationTR.filename);

  await createDocument(apostilleEN.title, apostilleEN.sections, apostilleEN.filename);
  await createDocument(apostilleTR.title, apostilleTR.sections, apostilleTR.filename);

  await createDocument(nameChangeEN.title, nameChangeEN.sections, nameChangeEN.filename);
  await createDocument(nameChangeTR.title, nameChangeTR.sections, nameChangeTR.filename);

  console.log('\nAll personal document templates generated successfully!');
}

generateAll().catch(console.error);
