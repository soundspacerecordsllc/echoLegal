// scripts/generate-tax-letter-templates.js
// Generates DOCX files for tax/IRS templates and letter/notice templates

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/documents');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function createDocument(title, subtitle, sections, filename) {
  const children = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: '',
      spacing: { after: 200 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: subtitle, italics: true, size: 22, color: '666666' }),
      ],
    }),
    new Paragraph({
      children: [new TextRun({ text: '---', size: 20 })],
      spacing: { after: 300 },
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
        children.push(new Paragraph({ text: line, spacing: { after: 120 } }));
      });
    }
    if (section.placeholder) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: section.placeholder, highlight: 'yellow' })],
          spacing: { after: 120 },
        })
      );
    }
    if (section.bold) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: section.bold, bold: true, size: 22 })],
          spacing: { after: 120 },
        })
      );
    }
    if (section.table) {
      const rows = section.table.map((row, rowIndex) =>
        new TableRow({
          children: row.map((cell) =>
            new TableCell({
              children: [new Paragraph({ text: cell, spacing: { after: 60 } })],
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: rowIndex === 0 ? { fill: 'F2F2F2' } : undefined,
            })
          ),
        })
      );
      children.push(
        new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } })
      );
      children.push(new Paragraph({ text: '', spacing: { after: 200 } }));
    }
  });

  children.push(
    new Paragraph({ text: '', spacing: { before: 400 } }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'This template is provided by EchoLegal (echo-legal.com) for informational purposes only and does not constitute legal advice. Consult a licensed attorney before use.',
          italics: true,
          size: 18,
          color: '999999',
        }),
      ],
    })
  );

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Created: ${filename}`);
}

// ============================================================
// TAX / IRS TEMPLATES
// ============================================================

// W-8BEN Attachment Checklist (EN)
async function generateW8ChecklistEN() {
  await createDocument(
    'W-8BEN ATTACHMENT CHECKLIST',
    'EchoLegal Template — W-8BEN Supporting Documents',
    [
      { heading: 'Purpose', content: [
        'Use this checklist to ensure you have all required attachments when submitting Form W-8BEN (Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting).',
      ]},
      { heading: 'Taxpayer Information', table: [
        ['Field', 'Your Entry'],
        ['Full Legal Name', ''],
        ['Country of Citizenship', ''],
        ['Foreign Tax Identification Number', ''],
        ['Date of Birth', ''],
        ['Permanent Residence Address', ''],
      ]},
      { heading: 'Required Attachments Checklist', content: [
        '☐ Completed Form W-8BEN (all parts filled in)',
        '☐ Copy of passport (identity page)',
        '☐ Proof of foreign tax residency (if claiming treaty benefits)',
        '☐ Foreign Tax Identification Number documentation',
        '☐ Letter of tax residency from home country tax authority (if available)',
      ]},
      { heading: 'Treaty Benefit Claims (Part II)', content: [
        '☐ Identify the treaty country (e.g., Turkey — TIAS 10205)',
        '☐ Specify the article and paragraph of the treaty',
        '☐ State the rate of withholding claimed',
        '☐ Describe the type of income (dividends, interest, royalties, services)',
        '☐ Attach explanation of eligibility for treaty benefits',
      ]},
      { heading: 'Submission Notes', content: [
        '• W-8BEN is valid for 3 calendar years from the date of signing.',
        '• A new form is required if any information changes.',
        '• The withholding agent (payer) retains the form — do not send to IRS directly.',
        '• For entities, use Form W-8BEN-E instead.',
      ]},
      { placeholder: '[Signature] _________________________ Date: ___/___/______' },
    ],
    'W8BEN-AttachmentChecklist-EN.docx'
  );
}

// W-8BEN Ekleri Kontrol Listesi (TR)
async function generateW8ChecklistTR() {
  await createDocument(
    'W-8BEN EKLERİ KONTROL LİSTESİ',
    'EchoLegal Şablon — W-8BEN Destekleyici Belgeler',
    [
      { heading: 'Amaç', content: [
        'Bu kontrol listesini, Form W-8BEN (ABD Vergi Stopajı ve Raporlaması İçin Yararlanıcı Mal Sahibinin Yabancı Statü Belgesi) gönderirken gerekli tüm eklere sahip olduğunuzdan emin olmak için kullanın.',
      ]},
      { heading: 'Mükellef Bilgileri', table: [
        ['Alan', 'Bilgileriniz'],
        ['Tam Yasal Ad', ''],
        ['Vatandaşlık Ülkesi', ''],
        ['Yabancı Vergi Kimlik Numarası', ''],
        ['Doğum Tarihi', ''],
        ['Daimi İkamet Adresi', ''],
      ]},
      { heading: 'Gerekli Ek Belgeler', content: [
        '☐ Doldurulmuş Form W-8BEN (tüm bölümler eksiksiz)',
        '☐ Pasaport kopyası (kimlik sayfası)',
        '☐ Yabancı vergi mukimliği belgesi (anlaşma avantajı talep ediliyorsa)',
        '☐ Yabancı Vergi Kimlik Numarası belgesi',
        '☐ Ülke vergi dairesinden vergi mukimliği yazısı (varsa)',
      ]},
      { heading: 'Anlaşma Avantajı Talepleri (Bölüm II)', content: [
        '☐ Anlaşma ülkesini belirtin (ör. Türkiye — TIAS 10205)',
        '☐ Anlaşmanın ilgili madde ve paragrafını belirtin',
        '☐ Talep edilen stopaj oranını yazın',
        '☐ Gelir türünü açıklayın (temettü, faiz, telif, hizmet)',
        '☐ Anlaşma avantajı uygunluk açıklamasını ekleyin',
      ]},
      { heading: 'Gönderim Notları', content: [
        '• W-8BEN imza tarihinden itibaren 3 takvim yılı geçerlidir.',
        '• Bilgilerde değişiklik olması halinde yeni form gerekir.',
        '• Stopaj sorumlusu (ödeyici) formu saklar — doğrudan IRS\'e gönderilmez.',
        '• Tüzel kişiler için Form W-8BEN-E kullanılır.',
      ]},
      { placeholder: '[İmza] _________________________ Tarih: ___/___/______' },
    ],
    'W8BEN-EkleriKontrolListesi-TR.docx'
  );
}

// EIN Request Cover Letter (EN)
async function generateEINLetterEN() {
  await createDocument(
    'EIN REQUEST COVER LETTER',
    'EchoLegal Template — SS-4 / Fax Cover Letter for EIN Application',
    [
      { placeholder: '[Date: ___/___/______]' },
      { content: [
        'Internal Revenue Service',
        'Attn: EIN Operation',
        'Cincinnati, OH 45999',
        'Fax: (855) 641-6935',
      ]},
      { heading: 'RE: Request for Employer Identification Number (EIN)', content: [] },
      { content: [
        'Dear Sir/Madam,',
        '',
        'I am writing to request an Employer Identification Number (EIN) for the entity described below. Please find the completed Form SS-4 (Application for Employer Identification Number) attached to this letter.',
      ]},
      { heading: 'Entity Information', table: [
        ['Field', 'Details'],
        ['Legal Name of Entity', ''],
        ['Entity Type', 'Limited Liability Company (LLC)'],
        ['State of Formation', ''],
        ['Date of Formation', ''],
        ['Responsible Party Name', ''],
        ['Responsible Party SSN/ITIN', ''],
        ['Principal Business Activity', ''],
        ['Mailing Address', ''],
      ]},
      { heading: 'Reason for Applying', content: [
        '☐ Started new business',
        '☐ Banking purposes',
        '☐ Compliance / hired employees',
        '☐ Other: ________________________________',
      ]},
      { content: [
        'Please issue the EIN and fax the confirmation to the number below at your earliest convenience.',
        '',
        'Thank you for your assistance.',
      ]},
      { placeholder: '[Applicant Name] _________________________' },
      { placeholder: '[Title/Role] _________________________' },
      { placeholder: '[Return Fax Number] _________________________' },
      { placeholder: '[Phone Number] _________________________' },
    ],
    'EIN-RequestCoverLetter-EN.docx'
  );
}

// EIN Başvuru Kapak Yazısı (TR)
async function generateEINLetterTR() {
  await createDocument(
    'EIN BAŞVURU KAPAK YAZISI',
    'EchoLegal Şablon — SS-4 / EIN Başvurusu İçin Faks Kapak Yazısı',
    [
      { placeholder: '[Tarih: ___/___/______]' },
      { content: [
        'Internal Revenue Service',
        'Attn: EIN Operation',
        'Cincinnati, OH 45999',
        'Faks: (855) 641-6935',
      ]},
      { heading: 'KONU: İşveren Kimlik Numarası (EIN) Talebi', content: [] },
      { content: [
        'Sayın Yetkili,',
        '',
        'Aşağıda bilgileri verilen tüzel kişilik için İşveren Kimlik Numarası (EIN) talep etmek amacıyla yazıyorum. Doldurulmuş Form SS-4 (İşveren Kimlik Numarası Başvurusu) bu yazıya eklenmiştir.',
      ]},
      { heading: 'Kuruluş Bilgileri', table: [
        ['Alan', 'Detaylar'],
        ['Tüzel Kişilik Adı', ''],
        ['Kuruluş Türü', 'Limited Liability Company (LLC)'],
        ['Kuruluş Eyaleti', ''],
        ['Kuruluş Tarihi', ''],
        ['Sorumlu Kişi Adı', ''],
        ['Sorumlu Kişi SSN/ITIN', ''],
        ['Ana Faaliyet Alanı', ''],
        ['Posta Adresi', ''],
      ]},
      { heading: 'Başvuru Nedeni', content: [
        '☐ Yeni iş kurulumu',
        '☐ Banka hesabı açılması',
        '☐ Uyum / çalışan istihdamı',
        '☐ Diğer: ________________________________',
      ]},
      { content: [
        'EIN\'in düzenlenerek aşağıdaki numaraya fakslanmasını rica ederim.',
        '',
        'İlginiz için teşekkür ederim.',
      ]},
      { placeholder: '[Başvuran Adı] _________________________' },
      { placeholder: '[Unvan/Rol] _________________________' },
      { placeholder: '[Dönüş Faks Numarası] _________________________' },
      { placeholder: '[Telefon Numarası] _________________________' },
    ],
    'EIN-BasvuruKapakYazisi-TR.docx'
  );
}

// Vendor Onboarding Form (EN)
async function generateVendorFormEN() {
  await createDocument(
    'VENDOR ONBOARDING FORM',
    'EchoLegal Template — Vendor / Supplier Tax & Payment Setup',
    [
      { heading: 'Vendor Information', table: [
        ['Field', 'Details'],
        ['Legal Business Name', ''],
        ['DBA (Doing Business As)', ''],
        ['Business Address', ''],
        ['City, State, ZIP', ''],
        ['Country', ''],
        ['Phone', ''],
        ['Email', ''],
        ['Website', ''],
      ]},
      { heading: 'Business Type', content: [
        '☐ Sole Proprietor / Individual',
        '☐ LLC (Single-Member)',
        '☐ LLC (Multi-Member)',
        '☐ C Corporation',
        '☐ S Corporation',
        '☐ Partnership',
        '☐ Foreign Entity',
        '☐ Other: ________________________________',
      ]},
      { heading: 'Tax Information', table: [
        ['Field', 'Details'],
        ['EIN (Employer Identification Number)', ''],
        ['SSN (if sole proprietor, US person)', ''],
        ['Foreign Tax ID (if non-US)', ''],
        ['Tax Classification', ''],
      ]},
      { heading: 'Tax Forms Attached', content: [
        '☐ Form W-9 (US persons/entities)',
        '☐ Form W-8BEN (foreign individuals)',
        '☐ Form W-8BEN-E (foreign entities)',
        '☐ Form W-8ECI (income effectively connected with US trade)',
      ]},
      { heading: 'Payment Information', table: [
        ['Field', 'Details'],
        ['Bank Name', ''],
        ['Account Holder Name', ''],
        ['Routing Number (ACH)', ''],
        ['Account Number', ''],
        ['SWIFT/BIC (international)', ''],
        ['IBAN (international)', ''],
        ['Preferred Payment Method', '☐ ACH  ☐ Wire  ☐ Check  ☐ Other'],
      ]},
      { heading: 'Certification', content: [
        'I certify that the information provided is accurate and complete. I agree to notify the company of any changes to the above information.',
      ]},
      { placeholder: '[Authorized Signature] _________________________ Date: ___/___/______' },
      { placeholder: '[Printed Name & Title] _________________________' },
    ],
    'VendorOnboardingForm-EN.docx'
  );
}

// Tedarikçi Kayıt Formu (TR)
async function generateVendorFormTR() {
  await createDocument(
    'TEDARİKÇİ KAYIT FORMU',
    'EchoLegal Şablon — Tedarikçi Vergi ve Ödeme Bilgileri',
    [
      { heading: 'Tedarikçi Bilgileri', table: [
        ['Alan', 'Detaylar'],
        ['Yasal Ticaret Unvanı', ''],
        ['Ticari İsim (DBA)', ''],
        ['İş Adresi', ''],
        ['Şehir, Eyalet, Posta Kodu', ''],
        ['Ülke', ''],
        ['Telefon', ''],
        ['E-posta', ''],
        ['Web Sitesi', ''],
      ]},
      { heading: 'İşletme Türü', content: [
        '☐ Şahıs İşletmesi',
        '☐ LLC (Tek Üyeli)',
        '☐ LLC (Çok Üyeli)',
        '☐ C Corporation',
        '☐ S Corporation',
        '☐ Ortaklık (Partnership)',
        '☐ Yabancı Tüzel Kişi',
        '☐ Diğer: ________________________________',
      ]},
      { heading: 'Vergi Bilgileri', table: [
        ['Alan', 'Detaylar'],
        ['EIN (İşveren Kimlik Numarası)', ''],
        ['SSN (ABD mukimi şahıs ise)', ''],
        ['Yabancı Vergi Kimlik No (ABD dışı)', ''],
        ['Vergi Sınıflandırması', ''],
      ]},
      { heading: 'Eklenen Vergi Formları', content: [
        '☐ Form W-9 (ABD kişi/kurumları)',
        '☐ Form W-8BEN (yabancı bireyler)',
        '☐ Form W-8BEN-E (yabancı tüzel kişiler)',
        '☐ Form W-8ECI (ABD ticareti ile bağlantılı gelir)',
      ]},
      { heading: 'Ödeme Bilgileri', table: [
        ['Alan', 'Detaylar'],
        ['Banka Adı', ''],
        ['Hesap Sahibi Adı', ''],
        ['Routing Numarası (ACH)', ''],
        ['Hesap Numarası', ''],
        ['SWIFT/BIC (uluslararası)', ''],
        ['IBAN (uluslararası)', ''],
        ['Tercih Edilen Ödeme Yöntemi', '☐ ACH  ☐ Havale  ☐ Çek  ☐ Diğer'],
      ]},
      { heading: 'Beyan', content: [
        'Verilen bilgilerin doğru ve eksiksiz olduğunu beyan ederim. Yukarıdaki bilgilerde değişiklik olması halinde şirketi bilgilendirmeyi kabul ederim.',
      ]},
      { placeholder: '[Yetkili İmzası] _________________________ Tarih: ___/___/______' },
      { placeholder: '[Ad Soyad ve Unvan] _________________________' },
    ],
    'TedarikciKayitFormu-TR.docx'
  );
}

// ITIN Application Preparation Guide (EN)
async function generateITINGuideEN() {
  await createDocument(
    'ITIN APPLICATION PREPARATION GUIDE',
    'EchoLegal Template — Form W-7 Preparation Checklist',
    [
      { heading: 'Overview', content: [
        'An Individual Taxpayer Identification Number (ITIN) is a tax processing number issued by the IRS for individuals who are required to have a US taxpayer identification number but are not eligible for a Social Security Number (SSN).',
      ]},
      { heading: 'Eligibility', content: [
        'You may need an ITIN if you are:',
        '• A nonresident alien filing a US tax return',
        '• A US resident alien (based on days present) filing a US tax return',
        '• A dependent or spouse of a US citizen/resident alien',
        '• A dependent or spouse of a nonresident alien visa holder',
        '• A nonresident alien claiming a tax treaty benefit',
      ]},
      { heading: 'Required Documents', content: [
        '☐ Completed Form W-7 (Application for IRS Individual Taxpayer Identification Number)',
        '☐ Original or certified copy of passport (preferred primary ID)',
        '☐ Federal tax return (attached to W-7 unless exception applies)',
        '☐ Supporting documentation proving foreign/alien status and identity',
      ]},
      { heading: 'Acceptable Identification Documents (at least 2 if no passport)', content: [
        '• Passport (standalone — proves both identity and foreign status)',
        '• National identification card (with photo, name, address, DOB)',
        '• US or foreign driver\'s license',
        '• Birth certificate (required for dependents under 18)',
        '• Foreign voter registration card',
        '• US visa issued by Department of State',
        '• US military identification card',
        '• Foreign military identification card',
      ]},
      { heading: 'Submission Methods', content: [
        '1. Mail: Internal Revenue Service, ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342',
        '2. IRS Taxpayer Assistance Center: In-person verification (no need to mail original documents)',
        '3. Certified Acceptance Agent (CAA): Can verify documents on your behalf',
      ]},
      { heading: 'Important Notes', content: [
        '• ITIN does not provide work authorization.',
        '• ITIN does not establish eligibility for Social Security benefits.',
        '• ITINs expire if not used on a federal tax return for 3 consecutive years.',
        '• Processing typically takes 7-11 weeks.',
      ]},
      { placeholder: '[Applicant Notes] _________________________' },
    ],
    'ITIN-ApplicationGuide-EN.docx'
  );
}

// ITIN Başvuru Hazırlık Rehberi (TR)
async function generateITINGuideTR() {
  await createDocument(
    'ITIN BAŞVURU HAZIRLIK REHBERİ',
    'EchoLegal Şablon — Form W-7 Hazırlık Kontrol Listesi',
    [
      { heading: 'Genel Bakış', content: [
        'Bireysel Vergi Kimlik Numarası (ITIN), ABD vergi mükellefi kimlik numarasına sahip olması gereken ancak Sosyal Güvenlik Numarası (SSN) almaya uygun olmayan bireyler için IRS tarafından verilen bir vergi işlem numarasıdır.',
      ]},
      { heading: 'Uygunluk', content: [
        'Aşağıdaki durumlarda ITIN gerekebilir:',
        '• ABD vergi beyannamesi veren mukim olmayan yabancı (nonresident alien)',
        '• ABD vergi beyannamesi veren mukim yabancı (günlere dayalı)',
        '• ABD vatandaşı/mukim yabancının bağımlısı veya eşi',
        '• Mukim olmayan yabancı vize sahibinin bağımlısı veya eşi',
        '• Vergi anlaşması avantajı talep eden mukim olmayan yabancı',
      ]},
      { heading: 'Gerekli Belgeler', content: [
        '☐ Doldurulmuş Form W-7 (IRS Bireysel Vergi Kimlik Numarası Başvurusu)',
        '☐ Pasaportun aslı veya onaylı kopyası (tercih edilen birincil kimlik)',
        '☐ Federal vergi beyannamesi (istisna uygulanmadıkça W-7\'ye eklenir)',
        '☐ Yabancı/alien statüsünü ve kimliğini kanıtlayan destekleyici belgeler',
      ]},
      { heading: 'Kabul Edilen Kimlik Belgeleri (pasaport yoksa en az 2 adet)', content: [
        '• Pasaport (tek başına yeterli — hem kimlik hem yabancı statüsünü kanıtlar)',
        '• Ulusal kimlik kartı (fotoğraflı, ad, adres, doğum tarihi içeren)',
        '• ABD veya yabancı sürücü belgesi',
        '• Doğum belgesi (18 yaş altı bağımlılar için zorunlu)',
        '• Yabancı seçmen kartı',
        '• ABD Dışişleri Bakanlığı tarafından verilen vize',
        '• ABD askeri kimlik kartı',
        '• Yabancı askeri kimlik kartı',
      ]},
      { heading: 'Gönderim Yöntemleri', content: [
        '1. Posta: Internal Revenue Service, ITIN Operation, P.O. Box 149342, Austin, TX 78714-9342',
        '2. IRS Mükellef Yardım Merkezi: Yüz yüze doğrulama (belge aslı gönderilmez)',
        '3. Yetkili Kabul Temsilcisi (CAA): Belgelerinizi sizin adınıza doğrulayabilir',
      ]},
      { heading: 'Önemli Notlar', content: [
        '• ITIN çalışma izni sağlamaz.',
        '• ITIN, Sosyal Güvenlik haklarına uygunluk oluşturmaz.',
        '• Ardışık 3 yıl federal vergi beyannamesinde kullanılmayan ITIN\'ler geçerliliğini yitirir.',
        '• İşlem süresi genellikle 7-11 haftadır.',
      ]},
      { placeholder: '[Başvuran Notları] _________________________' },
    ],
    'ITIN-BasvuruRehberi-TR.docx'
  );
}

// 1099 Inquiry Response Letter (EN)
async function generate1099ResponseEN() {
  await createDocument(
    '1099 INQUIRY RESPONSE LETTER',
    'EchoLegal Template — Response to 1099 Notice or Discrepancy',
    [
      { placeholder: '[Date: ___/___/______]' },
      { placeholder: '[Your Name / Business Name]' },
      { placeholder: '[Your Address]' },
      { placeholder: '[City, State, ZIP]' },
      { content: [''] },
      { content: [
        'Internal Revenue Service',
        '[IRS Office Address from Notice]',
      ]},
      { heading: 'RE: Response to 1099 Information Return Inquiry', content: [] },
      { placeholder: '[Notice Number: _______________]' },
      { placeholder: '[Tax Year: ______]' },
      { placeholder: '[Taxpayer Identification Number: ___-__-____]' },
      { content: [
        'Dear Sir/Madam,',
        '',
        'I am writing in response to the above-referenced notice regarding a discrepancy between the income reported on my tax return and the information reported on Form 1099.',
      ]},
      { heading: 'Explanation', content: [
        'Please select the applicable situation:',
        '',
        '☐ The income was reported on my return under a different category.',
        '  Explanation: _______________________________________________',
        '',
        '☐ The 1099 amount is incorrect. The correct amount is $_________.',
        '  I have contacted the issuer to request a corrected 1099.',
        '',
        '☐ The 1099 was issued in error. I did not receive this income.',
        '  Explanation: _______________________________________________',
        '',
        '☐ The income is not taxable under the US-[Country] tax treaty.',
        '  Treaty Article: _____________ Provision: _____________',
        '',
        '☐ Other: _______________________________________________',
      ]},
      { heading: 'Supporting Documentation Enclosed', content: [
        '☐ Copy of relevant tax return pages',
        '☐ Corrected 1099 (if received)',
        '☐ Correspondence with 1099 issuer',
        '☐ Treaty residency certification',
        '☐ Other: ________________________________',
      ]},
      { content: [
        'Please do not hesitate to contact me if you require additional information.',
        '',
        'Respectfully,',
      ]},
      { placeholder: '[Signature] _________________________' },
      { placeholder: '[Printed Name] _________________________' },
      { placeholder: '[Phone] _________________________' },
    ],
    '1099-ResponseLetter-EN.docx'
  );
}

// 1099 Sorgu Yanıt Mektubu (TR)
async function generate1099ResponseTR() {
  await createDocument(
    '1099 SORGU YANIT MEKTUBU',
    'EchoLegal Şablon — 1099 Bildirimi veya Tutarsızlığa Yanıt',
    [
      { placeholder: '[Tarih: ___/___/______]' },
      { placeholder: '[Ad Soyad / İşletme Adı]' },
      { placeholder: '[Adres]' },
      { placeholder: '[Şehir, Eyalet, Posta Kodu]' },
      { content: [''] },
      { content: [
        'Internal Revenue Service',
        '[Bildirimde Belirtilen IRS Ofis Adresi]',
      ]},
      { heading: 'KONU: 1099 Bilgi Beyannamesi Sorusuna Yanıt', content: [] },
      { placeholder: '[Bildirim Numarası: _______________]' },
      { placeholder: '[Vergi Yılı: ______]' },
      { placeholder: '[Mükellef Kimlik Numarası: ___-__-____]' },
      { content: [
        'Sayın Yetkili,',
        '',
        'Vergi beyannamemde bildirilen gelir ile Form 1099 üzerinde raporlanan bilgiler arasındaki tutarsızlıkla ilgili yukarıda referans verilen bildirime yanıt olarak yazıyorum.',
      ]},
      { heading: 'Açıklama', content: [
        'Lütfen geçerli durumu seçin:',
        '',
        '☐ Gelir beyannamemde farklı bir kategori altında bildirilmiştir.',
        '  Açıklama: _______________________________________________',
        '',
        '☐ 1099 tutarı hatalıdır. Doğru tutar $_________.',
        '  Düzeltilmiş 1099 talebi için düzenleyici ile iletişime geçtim.',
        '',
        '☐ 1099 sehven düzenlenmiştir. Bu geliri almadım.',
        '  Açıklama: _______________________________________________',
        '',
        '☐ Gelir, ABD-[Ülke] vergi anlaşması kapsamında vergiye tâbi değildir.',
        '  Anlaşma Maddesi: _____________ Hüküm: _____________',
        '',
        '☐ Diğer: _______________________________________________',
      ]},
      { heading: 'Eklenen Destekleyici Belgeler', content: [
        '☐ İlgili vergi beyannamesi sayfalarının kopyası',
        '☐ Düzeltilmiş 1099 (alındıysa)',
        '☐ 1099 düzenleyicisi ile yazışmalar',
        '☐ Anlaşma mukimliği belgesi',
        '☐ Diğer: ________________________________',
      ]},
      { content: [
        'Ek bilgi gerektiğinde benimle iletişime geçmekten çekinmeyiniz.',
        '',
        'Saygılarımla,',
      ]},
      { placeholder: '[İmza] _________________________' },
      { placeholder: '[Ad Soyad] _________________________' },
      { placeholder: '[Telefon] _________________________' },
    ],
    '1099-SorguYanitMektubu-TR.docx'
  );
}

// ============================================================
// LETTERS & NOTICES TEMPLATES
// ============================================================

// Demand Letter (EN)
async function generateDemandLetterEN() {
  await createDocument(
    'DEMAND LETTER',
    'EchoLegal Template — Formal Demand for Payment or Performance',
    [
      { placeholder: '[Date: ___/___/______]' },
      { content: ['VIA CERTIFIED MAIL / EMAIL', ''] },
      { placeholder: '[Recipient Name]' },
      { placeholder: '[Recipient Address]' },
      { placeholder: '[City, State, ZIP]' },
      { heading: 'RE: Demand for [Payment / Performance / Compliance]', content: [] },
      { content: [
        'Dear [Recipient Name],',
        '',
        'This letter serves as a formal demand regarding [brief description of the matter]. Despite [previous attempts at resolution / prior communications dated ___], the matter remains unresolved.',
      ]},
      { heading: 'Background', content: [
        '[Describe the relevant facts, agreement, or relationship. Include dates, amounts, and key events.]',
      ]},
      { heading: 'Demand', content: [
        'I hereby demand that you:',
        '',
        '1. [Specific demand — e.g., Pay the outstanding amount of $_____ ]',
        '2. [Additional demand — e.g., Provide documentation of _____ ]',
        '3. [Further demand — e.g., Cease the conduct described above ]',
        '',
        'This demand must be satisfied within [number] days of your receipt of this letter, i.e., no later than [deadline date].',
      ]},
      { heading: 'Consequences of Non-Compliance', content: [
        'If you fail to comply with this demand within the stated timeframe, I will be compelled to [pursue all available legal remedies / file a complaint with _____ / initiate litigation], without further notice. You may be held responsible for all costs, including attorney\'s fees, court costs, and interest.',
      ]},
      { heading: 'Reservation of Rights', content: [
        'Nothing in this letter shall be construed as a waiver of any rights or remedies available to me under applicable law. All rights are expressly reserved.',
      ]},
      { content: [
        'I trust that this matter can be resolved without further escalation.',
        '',
        'Sincerely,',
      ]},
      { placeholder: '[Your Name] _________________________' },
      { placeholder: '[Your Address] _________________________' },
      { placeholder: '[Phone / Email] _________________________' },
    ],
    'DemandLetter-EN.docx'
  );
}

// İhtar Mektubu (TR)
async function generateDemandLetterTR() {
  await createDocument(
    'İHTAR MEKTUBU',
    'EchoLegal Şablon — Resmi Ödeme veya İfa Talebi',
    [
      { placeholder: '[Tarih: ___/___/______]' },
      { content: ['İADELİ TAAHHÜTLÜ / E-POSTA İLE', ''] },
      { placeholder: '[Muhatap Adı]' },
      { placeholder: '[Muhatap Adresi]' },
      { placeholder: '[Şehir, Eyalet/İl, Posta Kodu]' },
      { heading: 'KONU: [Ödeme / İfa / Uyum] Talebi', content: [] },
      { content: [
        'Sayın [Muhatap Adı],',
        '',
        'Bu mektup, [konunun kısa açıklaması] hakkında resmi bir ihtar niteliğindedir. [Önceki çözüm girişimlerine / ___ tarihli yazışmalara] rağmen konu hâlâ çözüme kavuşmamıştır.',
      ]},
      { heading: 'Arka Plan', content: [
        '[İlgili olguları, sözleşmeyi veya ilişkiyi açıklayın. Tarihleri, tutarları ve önemli olayları belirtin.]',
      ]},
      { heading: 'Talep', content: [
        'İşbu mektupla aşağıdakileri talep ederim:',
        '',
        '1. [Belirli talep — ör. $_____ tutarındaki ödenmemiş borcun ödenmesi]',
        '2. [Ek talep — ör. _____ belgelerinin sağlanması]',
        '3. [İlave talep — ör. Yukarıda açıklanan davranışın durdurulması]',
        '',
        'Bu talebin, mektubun tarafınıza ulaşmasından itibaren [sayı] gün içinde, yani en geç [son tarih] tarihine kadar yerine getirilmesi gerekmektedir.',
      ]},
      { heading: 'Uyumsuzluğun Sonuçları', content: [
        'Belirtilen süre içinde bu talebe uymamanız halinde, başkaca bir bildirime gerek kalmaksızın [mevcut tüm yasal yollara başvurmak / _____ nezdinde şikayette bulunmak / dava açmak] zorunda kalacağım. Avukatlık ücretleri, mahkeme masrafları ve faiz dahil tüm masraflardan sorumlu tutulabilirsiniz.',
      ]},
      { heading: 'Hakların Saklı Tutulması', content: [
        'Bu mektupta yer alan hiçbir ifade, yürürlükteki mevzuat kapsamında sahip olduğum hak ve başvuru yollarından feragat olarak yorumlanamaz. Tüm haklar açıkça saklıdır.',
      ]},
      { content: [
        'Bu konunun daha fazla tırmandırılmadan çözülebileceğini ümit ederim.',
        '',
        'Saygılarımla,',
      ]},
      { placeholder: '[Adınız] _________________________' },
      { placeholder: '[Adresiniz] _________________________' },
      { placeholder: '[Telefon / E-posta] _________________________' },
    ],
    'IhtarMektubu-TR.docx'
  );
}

// Contract Termination Notice (EN)
async function generateTerminationEN() {
  await createDocument(
    'CONTRACT TERMINATION NOTICE',
    'EchoLegal Template — Formal Notice of Contract Termination',
    [
      { placeholder: '[Date: ___/___/______]' },
      { content: ['VIA CERTIFIED MAIL / EMAIL', ''] },
      { placeholder: '[Recipient Name / Company]' },
      { placeholder: '[Recipient Address]' },
      { placeholder: '[City, State, ZIP]' },
      { heading: 'RE: Notice of Termination of [Agreement Name]', content: [] },
      { placeholder: '[Agreement Date: ___/___/______]' },
      { placeholder: '[Agreement Reference Number (if any): _______________]' },
      { content: [
        'Dear [Recipient Name],',
        '',
        'This letter serves as formal notice that [Your Name / Company] is terminating the above-referenced agreement, effective as of [termination effective date].',
      ]},
      { heading: 'Basis for Termination', content: [
        'Please select the applicable basis:',
        '',
        '☐ Termination for convenience pursuant to Section [___] of the Agreement.',
        '☐ Termination for cause due to material breach, specifically: [describe breach].',
        '☐ Termination upon expiration of the notice period required by Section [___].',
        '☐ Termination by mutual agreement.',
        '☐ Other: _______________________________________________',
      ]},
      { heading: 'Required Actions', content: [
        'Upon termination, the following actions are required:',
        '',
        '1. [Return of confidential information / materials]',
        '2. [Payment of outstanding invoices / fees through termination date]',
        '3. [Transition of services / deliverables]',
        '4. [Other obligations: _______________________________________________]',
      ]},
      { heading: 'Surviving Provisions', content: [
        'The following provisions of the Agreement shall survive termination: [list surviving sections, e.g., confidentiality, indemnification, governing law, dispute resolution].',
      ]},
      { content: [
        'Please confirm receipt of this notice and your compliance with the above requirements.',
        '',
        'Sincerely,',
      ]},
      { placeholder: '[Your Name / Company] _________________________' },
      { placeholder: '[Title] _________________________' },
      { placeholder: '[Phone / Email] _________________________' },
    ],
    'TerminationNotice-EN.docx'
  );
}

// Sözleşme Fesih Bildirimi (TR)
async function generateTerminationTR() {
  await createDocument(
    'SÖZLEŞME FESİH BİLDİRİMİ',
    'EchoLegal Şablon — Resmi Sözleşme Fesih İhbarı',
    [
      { placeholder: '[Tarih: ___/___/______]' },
      { content: ['İADELİ TAAHHÜTLÜ / E-POSTA İLE', ''] },
      { placeholder: '[Muhatap Adı / Şirket]' },
      { placeholder: '[Muhatap Adresi]' },
      { placeholder: '[Şehir, Eyalet/İl, Posta Kodu]' },
      { heading: 'KONU: [Sözleşme Adı] Fesih Bildirimi', content: [] },
      { placeholder: '[Sözleşme Tarihi: ___/___/______]' },
      { placeholder: '[Sözleşme Referans Numarası (varsa): _______________]' },
      { content: [
        'Sayın [Muhatap Adı],',
        '',
        'İşbu mektup, [Adınız / Şirket] tarafından yukarıda referans verilen sözleşmenin [fesih geçerlilik tarihi] itibarıyla feshedildiğine dair resmi bildirim niteliğindedir.',
      ]},
      { heading: 'Fesih Gerekçesi', content: [
        'Lütfen uygulanabilir gerekçeyi seçin:',
        '',
        '☐ Sözleşmenin [___] Maddesi uyarınca kolaylık feshi.',
        '☐ Esaslı ihlal nedeniyle haklı fesih: [ihlali açıklayın].',
        '☐ Sözleşmenin [___] Maddesinde belirtilen ihbar süresinin dolması üzerine fesih.',
        '☐ Karşılıklı anlaşma ile fesih.',
        '☐ Diğer: _______________________________________________',
      ]},
      { heading: 'Gerekli İşlemler', content: [
        'Fesih üzerine aşağıdaki işlemlerin yapılması gerekmektedir:',
        '',
        '1. [Gizli bilgi / materyallerin iadesi]',
        '2. [Fesih tarihine kadar olan ödenmemiş faturaların / ücretlerin ödenmesi]',
        '3. [Hizmetlerin / teslimatların devri]',
        '4. [Diğer yükümlülükler: _______________________________________________]',
      ]},
      { heading: 'Yürürlükte Kalan Hükümler', content: [
        'Sözleşmenin aşağıdaki hükümleri fesihten sonra da yürürlükte kalacaktır: [gizlilik, tazminat, uygulanacak hukuk, uyuşmazlık çözümü vb. bölümleri listeleyin].',
      ]},
      { content: [
        'Bu bildirimin alındığını ve yukarıdaki gerekliliklere uyum sağlayacağınızı teyit etmenizi rica ederim.',
        '',
        'Saygılarımla,',
      ]},
      { placeholder: '[Adınız / Şirket] _________________________' },
      { placeholder: '[Unvan] _________________________' },
      { placeholder: '[Telefon / E-posta] _________________________' },
    ],
    'FesihBildirimi-TR.docx'
  );
}

// Cease and Desist Letter Outline (EN)
async function generateCeaseDesistEN() {
  await createDocument(
    'CEASE AND DESIST LETTER',
    'EchoLegal Template — Demand to Stop Unauthorized Activity',
    [
      { placeholder: '[Date: ___/___/______]' },
      { content: ['VIA CERTIFIED MAIL / EMAIL', ''] },
      { placeholder: '[Recipient Name / Company]' },
      { placeholder: '[Recipient Address]' },
      { placeholder: '[City, State, ZIP]' },
      { heading: 'RE: Cease and Desist — [Brief Description of Violation]', content: [] },
      { content: [
        'Dear [Recipient Name],',
        '',
        'I am writing on behalf of [Your Name / Company] to demand that you immediately cease and desist the following activity:',
      ]},
      { heading: 'Unauthorized Activity', content: [
        '[Describe the specific unauthorized activity in detail. Include:',
        '• What is being done',
        '• When it started / was discovered',
        '• Where the activity is occurring (e.g., website, business premises)',
        '• How it violates your rights]',
      ]},
      { heading: 'Legal Basis', content: [
        'The above activity constitutes a violation of [select applicable]:',
        '',
        '☐ Trademark infringement (Lanham Act, 15 U.S.C. § 1051 et seq.)',
        '☐ Copyright infringement (17 U.S.C. § 101 et seq.)',
        '☐ Breach of contract (Agreement dated ___)',
        '☐ Breach of non-disclosure/confidentiality agreement',
        '☐ Unfair competition',
        '☐ Defamation / disparagement',
        '☐ Other: _______________________________________________',
      ]},
      { heading: 'Demand', content: [
        'You are hereby demanded to:',
        '',
        '1. Immediately cease and desist all [described activity].',
        '2. [Remove / destroy all infringing materials by (date)].',
        '3. [Provide written confirmation of compliance within (number) days].',
        '4. [Additional demands: _______________________________________________]',
      ]},
      { heading: 'Consequences', content: [
        'If you fail to comply with these demands within [number] days, we will pursue all available legal remedies, including but not limited to seeking injunctive relief, statutory and actual damages, and attorney\'s fees.',
      ]},
      { content: [
        'This letter is written without prejudice to any rights and remedies, all of which are expressly reserved.',
        '',
        'Govern yourself accordingly.',
      ]},
      { placeholder: '[Your Name / Company] _________________________' },
      { placeholder: '[Title] _________________________' },
      { placeholder: '[Phone / Email] _________________________' },
    ],
    'CeaseDesist-EN.docx'
  );
}

// İhlali Durdurma Mektubu (TR)
async function generateCeaseDesistTR() {
  await createDocument(
    'İHLALİ DURDURMA MEKTUBU',
    'EchoLegal Şablon — Yetkisiz Faaliyetin Durdurulması Talebi',
    [
      { placeholder: '[Tarih: ___/___/______]' },
      { content: ['İADELİ TAAHHÜTLÜ / E-POSTA İLE', ''] },
      { placeholder: '[Muhatap Adı / Şirket]' },
      { placeholder: '[Muhatap Adresi]' },
      { placeholder: '[Şehir, Eyalet/İl, Posta Kodu]' },
      { heading: 'KONU: İhlali Durdurma ve Kaçınma Talebi — [İhlal Açıklaması]', content: [] },
      { content: [
        'Sayın [Muhatap Adı],',
        '',
        '[Adınız / Şirket] adına, aşağıdaki faaliyeti derhal durdurmanızı ve bu faaliyetten kaçınmanızı talep ederim:',
      ]},
      { heading: 'Yetkisiz Faaliyet', content: [
        '[Yetkisiz faaliyeti ayrıntılı olarak açıklayın:',
        '• Ne yapılıyor',
        '• Ne zaman başladı / keşfedildi',
        '• Faaliyetin nerede gerçekleştiği (ör. web sitesi, iş yeri)',
        '• Haklarınızı nasıl ihlal ettiği]',
      ]},
      { heading: 'Hukuki Dayanak', content: [
        'Yukarıdaki faaliyet aşağıdakilerin ihlalini teşkil etmektedir:',
        '',
        '☐ Marka ihlali',
        '☐ Telif hakkı ihlali',
        '☐ Sözleşme ihlali (Sözleşme tarihi: ___)',
        '☐ Gizlilik sözleşmesi ihlali',
        '☐ Haksız rekabet',
        '☐ Karalama / itibar zedeleme',
        '☐ Diğer: _______________________________________________',
      ]},
      { heading: 'Talep', content: [
        'İşbu mektupla aşağıdakileri talep ederim:',
        '',
        '1. [Açıklanan faaliyetin] derhal durdurulması.',
        '2. [Tüm ihlal edici materyallerin (tarih) itibarıyla kaldırılması / imha edilmesi].',
        '3. [(Sayı) gün içinde yazılı uyum teyidi sağlanması].',
        '4. [Ek talepler: _______________________________________________]',
      ]},
      { heading: 'Sonuçlar', content: [
        'Bu taleplere [sayı] gün içinde uymamanız halinde, ihtiyati tedbir, yasal ve fiili tazminat ile avukatlık ücretleri dahil ancak bunlarla sınırlı olmaksızın mevcut tüm yasal yollara başvurulacaktır.',
      ]},
      { content: [
        'Bu mektup, tümü açıkça saklı tutulan hak ve başvuru yollarına halel getirmeksizin yazılmıştır.',
        '',
        'Gereğini bilgilerinize sunarım.',
      ]},
      { placeholder: '[Adınız / Şirket] _________________________' },
      { placeholder: '[Unvan] _________________________' },
      { placeholder: '[Telefon / E-posta] _________________________' },
    ],
    'IhliDurdurmaMektubu-TR.docx'
  );
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('Generating tax/IRS and letter/notice templates...\n');

  // Tax/IRS templates
  await generateW8ChecklistEN();
  await generateW8ChecklistTR();
  await generateEINLetterEN();
  await generateEINLetterTR();
  await generateVendorFormEN();
  await generateVendorFormTR();
  await generateITINGuideEN();
  await generateITINGuideTR();
  await generate1099ResponseEN();
  await generate1099ResponseTR();

  // Letters & Notices
  await generateDemandLetterEN();
  await generateDemandLetterTR();
  await generateTerminationEN();
  await generateTerminationTR();
  await generateCeaseDesistEN();
  await generateCeaseDesistTR();

  console.log('\nAll 16 templates generated successfully!');
}

main().catch(console.error);
