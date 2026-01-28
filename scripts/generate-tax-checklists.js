// scripts/generate-tax-checklists.js
// Generates Tax & IRS checklist documents

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/documents');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function createDocument(children, filename) {
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

function checkboxItem(text, checked = false) {
  return new Paragraph({
    children: [
      new TextRun({ text: checked ? '☑ ' : '☐ ', size: 24 }),
      new TextRun({ text: text }),
    ],
    spacing: { after: 150 },
    indent: { left: 360 },
  });
}

// Tax Treaty Benefits Claim Checklist - English
async function createTaxTreatyChecklist_EN() {
  const children = [
    new Paragraph({
      text: 'US-Turkey Tax Treaty Benefits Claim Checklist',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Documents & Information Needed to Claim Treaty Benefits',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '⚖️ This checklist is for informational purposes. Consult a tax professional for your specific situation.',
          italics: true,
          size: 20,
        }),
      ],
      spacing: { after: 400 },
    }),

    // Introduction
    new Paragraph({
      text: 'Overview',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({
      text: 'The US-Turkey Income Tax Treaty allows eligible Turkish residents to claim reduced withholding rates on certain US-source income. This checklist helps you gather the required documentation.',
      spacing: { after: 300 },
    }),

    // Section 1: Identity Documents
    new Paragraph({
      text: '1. IDENTITY & RESIDENCY DOCUMENTS',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('Valid passport (Turkish)'),
    checkboxItem('Turkish national ID card (Kimlik Kartı)'),
    checkboxItem('Proof of Turkish tax residency (from Turkish tax authority)'),
    checkboxItem('Certificate of residence for tax purposes (if available)'),
    checkboxItem('Current residential address documentation'),

    // Section 2: Tax Forms
    new Paragraph({
      text: '2. US TAX FORMS',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('Form W-8BEN (Certificate of Foreign Status) - REQUIRED'),
    checkboxItem('Complete Line 9: Claim treaty benefits with Turkey'),
    checkboxItem('Complete Line 10: Specify article and withholding rate'),
    checkboxItem('Form W-8BEN-E (for entities, if applicable)'),
    checkboxItem('ITIN (if you have one) or foreign TIN'),

    // Section 3: Income Documentation
    new Paragraph({
      text: '3. INCOME DOCUMENTATION',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('Contract or agreement with US payer'),
    checkboxItem('Invoice records for services rendered'),
    checkboxItem('Form 1099 (if received from prior years)'),
    checkboxItem('Bank statements showing US-source payments'),
    checkboxItem('Documentation of income type (services, royalties, dividends, etc.)'),

    // Section 4: Treaty-Specific Requirements
    new Paragraph({
      text: '4. TREATY ARTICLE REQUIREMENTS',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({
      text: 'Based on your income type, gather:',
      spacing: { after: 150 },
    }),
    new Paragraph({
      text: 'For Independent Personal Services (Article 14):',
      bold: true,
      spacing: { after: 100 },
    }),
    checkboxItem('Proof you don\'t have a fixed base in US'),
    checkboxItem('Documentation of services performed'),
    checkboxItem('Duration of US presence (less than 183 days)'),

    new Paragraph({
      text: 'For Royalties (Article 12):',
      bold: true,
      spacing: { before: 200, after: 100 },
    }),
    checkboxItem('Licensing agreement'),
    checkboxItem('Proof of copyright/patent ownership'),
    checkboxItem('Beneficial ownership documentation'),

    new Paragraph({
      text: 'For Dividends (Article 10):',
      bold: true,
      spacing: { before: 200, after: 100 },
    }),
    checkboxItem('Stock ownership documentation'),
    checkboxItem('Ownership percentage certification'),

    // Section 5: Submission Checklist
    new Paragraph({
      text: '5. SUBMISSION CHECKLIST',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('W-8BEN signed and dated'),
    checkboxItem('All required attachments prepared'),
    checkboxItem('Copy retained for your records'),
    checkboxItem('Sent to US withholding agent/payer'),
    checkboxItem('Calendar reminder for renewal (valid 3 years)'),

    // Key Treaty Rates
    new Paragraph({
      text: 'KEY TREATY WITHHOLDING RATES',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({ text: '• Dividends: 15% (or 5% for 10%+ corporate shareholders)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Interest: 0-15% (depending on type)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Royalties: 5-10% (depending on type)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Independent Services: Exempt (if no fixed base in US)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Without treaty: 30% default withholding', spacing: { after: 300 } }),

    // Important Notes
    new Paragraph({
      text: 'IMPORTANT NOTES',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '• W-8BEN must be renewed every 3 years', bold: true }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({ text: '• Keep copies of all submitted documents', spacing: { after: 100 } }),
    new Paragraph({ text: '• Report income on Turkish tax return as required', spacing: { after: 100 } }),
    new Paragraph({ text: '• Treaty benefits may require advance notification to payer', spacing: { after: 100 } }),
    new Paragraph({ text: '• Consult both US and Turkish tax advisors for complex situations', spacing: { after: 300 } }),

    // Signature
    new Paragraph({
      text: 'TRACKING',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({ text: 'Date Prepared: _______________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Date Submitted: _______________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Submitted to: _______________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Next Renewal Date: _______________________', spacing: { after: 100 } }),
  ];

  await createDocument(children, 'TaxTreatyChecklist-EN.docx');
}

// Tax Treaty Benefits Claim Checklist - Turkish
async function createTaxTreatyChecklist_TR() {
  const children = [
    new Paragraph({
      text: 'ABD-Türkiye Vergi Anlaşması Avantajları Kontrol Listesi',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Anlaşma Avantajlarından Yararlanmak İçin Gereken Belgeler ve Bilgiler',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '⚖️ Bu kontrol listesi bilgilendirme amaçlıdır. Özel durumunuz için bir vergi uzmanına danışın.',
          italics: true,
          size: 20,
        }),
      ],
      spacing: { after: 400 },
    }),

    // Introduction
    new Paragraph({
      text: 'Genel Bakış',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({
      text: 'ABD-Türkiye Gelir Vergisi Anlaşması, Türkiye mukimlerine belirli ABD kaynaklı gelirler üzerinde indirimli stopaj oranları talep etme imkanı tanır. Bu kontrol listesi gerekli belgeleri toplamanıza yardımcı olur.',
      spacing: { after: 300 },
    }),

    // Section 1: Identity Documents
    new Paragraph({
      text: '1. KİMLİK VE MUKİMİYET BELGELERİ',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('Geçerli pasaport (Türk)'),
    checkboxItem('T.C. Kimlik Kartı'),
    checkboxItem('Türkiye vergi mukimliği belgesi (vergi dairesinden)'),
    checkboxItem('Vergi amaçlı mukimlik sertifikası (varsa)'),
    checkboxItem('Güncel ikamet adresi belgeleri'),

    // Section 2: Tax Forms
    new Paragraph({
      text: '2. ABD VERGİ FORMLARI',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('Form W-8BEN (Yabancı Statü Belgesi) - ZORUNLU'),
    checkboxItem('Satır 9: Türkiye ile anlaşma avantajları talebi'),
    checkboxItem('Satır 10: Madde ve stopaj oranı belirtme'),
    checkboxItem('Form W-8BEN-E (tüzel kişiler için, gerekirse)'),
    checkboxItem('ITIN (varsa) veya yabancı vergi numarası'),

    // Section 3: Income Documentation
    new Paragraph({
      text: '3. GELİR BELGELERİ',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('ABD\'deki ödeme yapan ile sözleşme veya anlaşma'),
    checkboxItem('Verilen hizmetler için fatura kayıtları'),
    checkboxItem('Form 1099 (önceki yıllardan alındıysa)'),
    checkboxItem('ABD kaynaklı ödemeleri gösteren banka ekstreleri'),
    checkboxItem('Gelir türü belgeleri (hizmet, telif, temettü vb.)'),

    // Section 4: Treaty-Specific Requirements
    new Paragraph({
      text: '4. ANLAŞMA MADDESİ GEREKSİNİMLERİ',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({
      text: 'Gelir türünüze göre toplayın:',
      spacing: { after: 150 },
    }),
    new Paragraph({
      text: 'Bağımsız Kişisel Hizmetler (Madde 14):',
      bold: true,
      spacing: { after: 100 },
    }),
    checkboxItem('ABD\'de sabit iş yeri olmadığının kanıtı'),
    checkboxItem('Verilen hizmetlerin belgelenmesi'),
    checkboxItem('ABD\'de bulunma süresi (183 günden az)'),

    new Paragraph({
      text: 'Telif Hakları (Madde 12):',
      bold: true,
      spacing: { before: 200, after: 100 },
    }),
    checkboxItem('Lisans sözleşmesi'),
    checkboxItem('Telif hakkı/patent sahipliği kanıtı'),
    checkboxItem('Gerçek hak sahipliği belgeleri'),

    new Paragraph({
      text: 'Temettüler (Madde 10):',
      bold: true,
      spacing: { before: 200, after: 100 },
    }),
    checkboxItem('Hisse senedi sahipliği belgeleri'),
    checkboxItem('Sahiplik yüzdesi sertifikası'),

    // Section 5: Submission Checklist
    new Paragraph({
      text: '5. GÖNDERİM KONTROL LİSTESİ',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    checkboxItem('W-8BEN imzalanmış ve tarihlenmiş'),
    checkboxItem('Tüm gerekli ekler hazırlanmış'),
    checkboxItem('Kayıtlarınız için kopya alınmış'),
    checkboxItem('ABD stopaj acentesine/ödeme yapana gönderilmiş'),
    checkboxItem('Yenileme için takvim hatırlatıcısı (3 yıl geçerli)'),

    // Key Treaty Rates
    new Paragraph({
      text: 'TEMEL ANLAŞMA STOPAJ ORANLARI',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({ text: '• Temettüler: %15 (veya %10+ kurumsal hissedarlar için %5)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Faiz: %0-15 (türüne bağlı)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Telif Hakları: %5-10 (türüne bağlı)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Bağımsız Hizmetler: Muaf (ABD\'de sabit iş yeri yoksa)', spacing: { after: 100 } }),
    new Paragraph({ text: '• Anlaşma olmadan: %30 varsayılan stopaj', spacing: { after: 300 } }),

    // Important Notes
    new Paragraph({
      text: 'ÖNEMLİ NOTLAR',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '• W-8BEN her 3 yılda bir yenilenmelidir', bold: true }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({ text: '• Sunulan tüm belgelerin kopyalarını saklayın', spacing: { after: 100 } }),
    new Paragraph({ text: '• Geliri Türkiye vergi beyannamesinde gerektiği şekilde bildirin', spacing: { after: 100 } }),
    new Paragraph({ text: '• Anlaşma avantajları ödeme yapana önceden bildirim gerektirebilir', spacing: { after: 100 } }),
    new Paragraph({ text: '• Karmaşık durumlar için hem ABD hem de Türk vergi danışmanlarına başvurun', spacing: { after: 300 } }),

    // Tracking
    new Paragraph({
      text: 'TAKİP',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),
    new Paragraph({ text: 'Hazırlama Tarihi: _______________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Gönderme Tarihi: _______________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Gönderilen Yer: _______________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Sonraki Yenileme Tarihi: _______________________', spacing: { after: 100 } }),
  ];

  await createDocument(children, 'VergiAnlasmasiKontrolListesi-TR.docx');
}

// Generate all documents
async function generateAll() {
  console.log('Generating Tax checklist documents...\n');

  await createTaxTreatyChecklist_EN();
  await createTaxTreatyChecklist_TR();

  console.log('\nAll Tax checklist documents generated successfully!');
}

generateAll().catch(console.error);
