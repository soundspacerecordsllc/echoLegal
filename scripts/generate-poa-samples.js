// scripts/generate-poa-samples.js
// Generates actual fillable Power of Attorney sample documents

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/documents');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to create a document
async function createDocument(title, children, filename) {
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

// Helper for fillable field
function fillableField(label) {
  return new Paragraph({
    children: [
      new TextRun({
        text: `[${label}]`,
        highlight: 'yellow',
      }),
    ],
    spacing: { after: 120 },
  });
}

function fieldLine(label) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: ` }),
      new TextRun({
        text: '_'.repeat(50),
        underline: {},
      }),
    ],
    spacing: { after: 200 },
  });
}

// English General Power of Attorney Sample
async function createPOA_EN() {
  const children = [
    new Paragraph({
      text: 'GENERAL POWER OF ATTORNEY',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'SAMPLE TEMPLATE - FOR REFERENCE ONLY',
          bold: true,
          color: 'FF0000',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '⚖️ This is a sample template for educational purposes. Consult an attorney before using for legal matters.',
          italics: true,
          size: 20,
        }),
      ],
      spacing: { after: 400 },
    }),

    // Know All Men section
    new Paragraph({
      text: 'KNOW ALL PERSONS BY THESE PRESENTS:',
      bold: true,
      spacing: { after: 300 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: 'I, ' }),
        new TextRun({ text: '[PRINCIPAL\'S FULL LEGAL NAME]', highlight: 'yellow' }),
        new TextRun({ text: ', of ' }),
        new TextRun({ text: '[PRINCIPAL\'S ADDRESS]', highlight: 'yellow' }),
        new TextRun({ text: ', do hereby appoint:' }),
      ],
      spacing: { after: 300 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '[AGENT\'S FULL LEGAL NAME]', highlight: 'yellow' }),
        new TextRun({ text: ', of ' }),
        new TextRun({ text: '[AGENT\'S ADDRESS]', highlight: 'yellow' }),
      ],
      spacing: { after: 300 },
    }),

    new Paragraph({
      text: 'as my true and lawful Attorney-in-Fact ("Agent") to act in my name, place, and stead in any and all matters set forth below:',
      spacing: { after: 400 },
    }),

    // Powers Granted
    new Paragraph({
      text: 'POWERS GRANTED',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      text: 'I grant my Agent full power and authority to act on my behalf in the following matters:',
      spacing: { after: 200 },
    }),

    new Paragraph({ text: '1. BANKING AND FINANCIAL TRANSACTIONS', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To conduct any and all banking transactions, including but not limited to opening, closing, and managing bank accounts; making deposits and withdrawals; signing checks; and accessing safe deposit boxes.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '2. REAL PROPERTY TRANSACTIONS', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To buy, sell, lease, mortgage, manage, and otherwise deal with real property on my behalf.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '3. PERSONAL PROPERTY TRANSACTIONS', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To buy, sell, lease, and otherwise deal with personal property, including vehicles, on my behalf.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '4. TAX MATTERS', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To prepare, sign, and file tax returns; to represent me before tax authorities; and to manage all tax-related matters.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '5. LEGAL PROCEEDINGS', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To commence, prosecute, discontinue, or defend any legal proceedings on my behalf; to sign legal documents; and to retain legal counsel.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '6. BUSINESS OPERATIONS', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To conduct, manage, and transact all business affairs on my behalf, including entering into contracts and agreements.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '7. GOVERNMENT BENEFITS', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To apply for and manage government benefits, including Social Security, Medicare, and other entitlements.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '8. INSURANCE', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'To obtain, manage, and make claims under insurance policies on my behalf.', spacing: { after: 400, indent: { left: 360 } } }),

    // Durability Clause
    new Paragraph({
      text: 'DURABILITY CLAUSE',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'DURABLE: ', bold: true }),
        new TextRun({ text: 'This Power of Attorney shall NOT be affected by my subsequent disability or incapacity.' }),
      ],
      spacing: { after: 150 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'NON-DURABLE: ', bold: true }),
        new TextRun({ text: 'This Power of Attorney shall terminate upon my disability or incapacity.' }),
      ],
      spacing: { after: 400 },
    }),

    // Effective Date
    new Paragraph({
      text: 'EFFECTIVE DATE',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'IMMEDIATE: ', bold: true }),
        new TextRun({ text: 'This Power of Attorney is effective immediately upon execution.' }),
      ],
      spacing: { after: 150 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'SPRINGING: ', bold: true }),
        new TextRun({ text: 'This Power of Attorney becomes effective upon: ' }),
        new TextRun({ text: '[SPECIFY TRIGGERING EVENT]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    // Termination
    new Paragraph({
      text: 'TERMINATION',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      text: 'This Power of Attorney shall remain in effect until:',
      spacing: { after: 150 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'Revoked by me in writing' }),
      ],
      spacing: { after: 100 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'My death' }),
      ],
      spacing: { after: 100 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'Specific date: ' }),
        new TextRun({ text: '[DATE]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    // Successor Agent
    new Paragraph({
      text: 'SUCCESSOR AGENT (Optional)',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: 'If my Agent is unable or unwilling to serve, I appoint ' }),
        new TextRun({ text: '[SUCCESSOR AGENT\'S NAME]', highlight: 'yellow' }),
        new TextRun({ text: ' of ' }),
        new TextRun({ text: '[SUCCESSOR AGENT\'S ADDRESS]', highlight: 'yellow' }),
        new TextRun({ text: ' as my successor Agent.' }),
      ],
      spacing: { after: 400 },
    }),

    // Signature Block
    new Paragraph({
      text: 'EXECUTION',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      text: 'IN WITNESS WHEREOF, I have executed this Power of Attorney on this',
      spacing: { after: 100 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '[DAY]', highlight: 'yellow' }),
        new TextRun({ text: ' day of ' }),
        new TextRun({ text: '[MONTH]', highlight: 'yellow' }),
        new TextRun({ text: ', ' }),
        new TextRun({ text: '[YEAR]', highlight: 'yellow' }),
        new TextRun({ text: '.' }),
      ],
      spacing: { after: 400 },
    }),

    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: '________________________________________', spacing: { after: 50 } }),
    new Paragraph({ text: 'Principal\'s Signature', spacing: { after: 50 } }),
    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Printed Name: ' }),
        new TextRun({ text: '[PRINCIPAL\'S NAME]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    // Witness Section
    new Paragraph({
      text: 'WITNESSES',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({ text: 'WITNESS 1:', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Signature: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Printed Name: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Address: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Date: ________________________________________', spacing: { after: 300 } }),

    new Paragraph({ text: 'WITNESS 2:', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Signature: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Printed Name: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Address: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Date: ________________________________________', spacing: { after: 400 } }),

    // Notary Section
    new Paragraph({
      text: 'NOTARY ACKNOWLEDGMENT',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({ text: 'State of: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'County of: ________________________________________', spacing: { after: 200 } }),

    new Paragraph({
      text: 'On this _____ day of _________________, 20____, before me, a Notary Public, personally appeared the above-named Principal, known to me (or proved to me on the basis of satisfactory evidence) to be the person whose name is subscribed to this instrument, and acknowledged that he/she executed the same.',
      spacing: { after: 300 },
    }),

    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: '________________________________________', spacing: { after: 50 } }),
    new Paragraph({ text: 'Notary Public Signature', spacing: { after: 100 } }),
    new Paragraph({ text: '', spacing: { after: 50 } }),
    new Paragraph({ text: 'My Commission Expires: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: '[NOTARY SEAL]', alignment: AlignmentType.CENTER, spacing: { after: 300 } }),

    // Agent Acceptance
    new Paragraph({
      text: 'AGENT\'S ACCEPTANCE (Optional but Recommended)',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 200 },
    }),

    new Paragraph({
      text: 'I, the undersigned Agent, hereby accept this appointment and agree to act in the best interests of the Principal.',
      spacing: { after: 300 },
    }),

    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: '________________________________________', spacing: { after: 50 } }),
    new Paragraph({ text: 'Agent\'s Signature', spacing: { after: 50 } }),
    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: 'Date: ________________________________________', spacing: { after: 100 } }),
  ];

  await createDocument('General Power of Attorney', children, 'PowerOfAttorney-Sample-EN.docx');
}

// Turkish Vekaletname Sample
async function createPOA_TR() {
  const children = [
    new Paragraph({
      text: 'GENEL VEKALETNAME',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'ÖRNEK ŞABLON - YALNIZCA REFERANS AMAÇLI',
          bold: true,
          color: 'FF0000',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '⚖️ Bu örnek şablon eğitim amaçlıdır. Hukuki konularda kullanmadan önce bir avukata danışın.',
          italics: true,
          size: 20,
        }),
      ],
      spacing: { after: 400 },
    }),

    // Introduction
    new Paragraph({
      text: 'VEKİL EDEN (MÜVEKKİL)',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: 'Ad Soyad: ' }),
        new TextRun({ text: '[VEKİL EDENİN TAM ADI SOYADI]', highlight: 'yellow' }),
      ],
      spacing: { after: 150 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'T.C. Kimlik No: ' }),
        new TextRun({ text: '[T.C. KİMLİK NUMARASI]', highlight: 'yellow' }),
      ],
      spacing: { after: 150 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Adres: ' }),
        new TextRun({ text: '[TAM ADRES]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    new Paragraph({
      text: 'VEKİL',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: 'Ad Soyad: ' }),
        new TextRun({ text: '[VEKİLİN TAM ADI SOYADI]', highlight: 'yellow' }),
      ],
      spacing: { after: 150 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'T.C. Kimlik No: ' }),
        new TextRun({ text: '[T.C. KİMLİK NUMARASI]', highlight: 'yellow' }),
      ],
      spacing: { after: 150 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Adres: ' }),
        new TextRun({ text: '[TAM ADRES]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    // Purpose
    new Paragraph({
      text: 'VEKALETNAME KONUSU',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      text: 'Yukarıda kimlik bilgileri yazılı vekilimi, aşağıda belirtilen işlemleri benim adıma ve hesabıma yapmak üzere yetkilendiriyorum:',
      spacing: { after: 300 },
    }),

    // Powers
    new Paragraph({ text: '1. BANKACILIK VE MALİ İŞLEMLER', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Banka hesabı açma, kapatma ve yönetme; para yatırma ve çekme; çek imzalama; kiralık kasa işlemleri yapma yetkisi.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '2. GAYRİMENKUL İŞLEMLERİ', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Taşınmaz mal alım, satım, kiralama, ipotek ve tapu işlemleri yapma yetkisi.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '3. TAŞINIR MAL İŞLEMLERİ', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Araç dahil her türlü taşınır mal alım, satım ve devir işlemleri yapma yetkisi.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '4. VERGİ İŞLEMLERİ', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Vergi beyannamesi düzenleme, imzalama ve vergi dairesi nezdinde işlem yapma yetkisi.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '5. HUKUKİ İŞLEMLER', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Dava açma, savunma yapma, her türlü mahkeme ve idari makamlar nezdinde temsil yetkisi.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '6. RESMİ KURUM İŞLEMLERİ', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Belediye, nüfus müdürlüğü, tapu müdürlüğü ve diğer resmi kurumlarda işlem yapma yetkisi.', spacing: { after: 200, indent: { left: 360 } } }),

    new Paragraph({ text: '7. KONSOLOSLUK/ELÇİLİK İŞLEMLERİ', bold: true, spacing: { after: 100 } }),
    new Paragraph({ text: 'Yurt dışındaki konsolosluk ve elçiliklerde benim adıma her türlü işlem yapma yetkisi.', spacing: { after: 400, indent: { left: 360 } } }),

    // Duration
    new Paragraph({
      text: 'VEKALETİN SÜRESİ',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'Süresiz: ', bold: true }),
        new TextRun({ text: 'Azil edilene kadar geçerlidir.' }),
      ],
      spacing: { after: 150 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '☐ ', size: 28 }),
        new TextRun({ text: 'Süreli: ', bold: true }),
        new TextRun({ text: '[BİTİŞ TARİHİ]', highlight: 'yellow' }),
        new TextRun({ text: ' tarihine kadar geçerlidir.' }),
      ],
      spacing: { after: 400 },
    }),

    // Special Conditions
    new Paragraph({
      text: 'ÖZEL ŞARTLAR (Varsa)',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: '[VARSA ÖZEL ŞARTLARI YAZINIZ]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    // Declaration
    new Paragraph({
      text: 'BEYAN',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      text: 'Yukarıda yazılı vekilime, belirtilen işlemleri yapması için gerekli her türlü yetkiyi verdiğimi, vekilemin bu işlemler nedeniyle yapacağı işlemlerin beni bağlayacağını kabul ve beyan ederim.',
      spacing: { after: 400 },
    }),

    // Signature Block
    new Paragraph({
      text: 'İMZA',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: 'Tarih: ' }),
        new TextRun({ text: '[GÜN/AY/YIL]', highlight: 'yellow' }),
      ],
      spacing: { after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({ text: 'Yer: ' }),
        new TextRun({ text: '[ŞEHİR]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: '________________________________________', spacing: { after: 50 } }),
    new Paragraph({ text: 'Vekil Edenin İmzası', spacing: { after: 50 } }),
    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Ad Soyad: ' }),
        new TextRun({ text: '[VEKİL EDENİN ADI SOYADI]', highlight: 'yellow' }),
      ],
      spacing: { after: 400 },
    }),

    // Notary Section
    new Paragraph({
      text: 'NOTERLİK ONAYI',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    }),

    new Paragraph({
      text: '(Bu bölüm noter tarafından doldurulacaktır)',
      italics: true,
      spacing: { after: 200 },
    }),

    new Paragraph({ text: 'Noterlik: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Yevmiye No: ________________________________________', spacing: { after: 100 } }),
    new Paragraph({ text: 'Tarih: ________________________________________', spacing: { after: 200 } }),

    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: '________________________________________', spacing: { after: 50 } }),
    new Paragraph({ text: 'Noter İmzası ve Mühür', spacing: { after: 100 } }),

    // Agent Acceptance
    new Paragraph({
      text: 'VEKİLİN KABULÜ (İsteğe Bağlı)',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 200 },
    }),

    new Paragraph({
      text: 'Bu vekaleti kabul ettiğimi ve vekil edenin çıkarları doğrultusunda hareket edeceğimi beyan ederim.',
      spacing: { after: 300 },
    }),

    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: '________________________________________', spacing: { after: 50 } }),
    new Paragraph({ text: 'Vekilin İmzası', spacing: { after: 50 } }),
    new Paragraph({ text: '', spacing: { after: 100 } }),
    new Paragraph({ text: 'Tarih: ________________________________________', spacing: { after: 100 } }),
  ];

  await createDocument('Genel Vekaletname', children, 'Vekaletname-Sample-TR.docx');
}

// Generate all documents
async function generateAll() {
  console.log('Generating Power of Attorney sample documents...\n');

  await createPOA_EN();
  await createPOA_TR();

  console.log('\nAll Power of Attorney sample documents generated successfully!');
}

generateAll().catch(console.error);
