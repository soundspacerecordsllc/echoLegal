// scripts/generate-business-templates.js
// Generates DOCX files for business document templates (invoice, receipt, etc.)

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/documents');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper: create a document from sections
async function createDocument(title, subtitle, sections, filename) {
  const children = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: subtitle,
      spacing: { after: 200 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: subtitle, italics: true, size: 22, color: '666666' }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '---',
          size: 20,
        }),
      ],
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
    if (section.bold) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.bold,
              bold: true,
              size: 22,
            }),
          ],
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
        new Table({
          rows: rows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        })
      );
      children.push(new Paragraph({ text: '', spacing: { after: 200 } }));
    }
  });

  // Disclaimer
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

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Created: ${filename}`);
}

// ===== INVOICE TEMPLATE (EN) =====
async function generateInvoiceEN() {
  await createDocument(
    'INVOICE',
    'EchoLegal Template — Professional Invoice',
    [
      { heading: 'From (Service Provider)' },
      { placeholder: '[Your Full Name or Business Name]' },
      { placeholder: '[Your Address]' },
      { placeholder: '[City, State, ZIP Code]' },
      { placeholder: '[Email Address]' },
      { placeholder: '[Phone Number]' },
      { placeholder: '[EIN or Tax ID (if applicable)]' },

      { heading: 'Bill To (Client)' },
      { placeholder: '[Client Name or Business Name]' },
      { placeholder: '[Client Address]' },
      { placeholder: '[City, State, ZIP Code]' },
      { placeholder: '[Client Email]' },

      { heading: 'Invoice Details' },
      { table: [
        ['Field', 'Value'],
        ['Invoice Number', '[INV-0001]'],
        ['Invoice Date', '[MM/DD/YYYY]'],
        ['Due Date', '[MM/DD/YYYY]'],
        ['Payment Terms', '[Net 30 / Due on Receipt / Other]'],
        ['Currency', '[USD]'],
      ]},

      { heading: 'Services / Items' },
      { table: [
        ['Description', 'Qty / Hours', 'Rate', 'Amount'],
        ['[Service description]', '[X]', '[$X.XX]', '[$X.XX]'],
        ['[Service description]', '[X]', '[$X.XX]', '[$X.XX]'],
        ['[Service description]', '[X]', '[$X.XX]', '[$X.XX]'],
      ]},

      { heading: 'Summary' },
      { table: [
        ['', 'Amount'],
        ['Subtotal', '[$X.XX]'],
        ['Tax (if applicable)', '[$X.XX]'],
        ['Discount (if applicable)', '[-$X.XX]'],
        ['Total Due', '[$X.XX]'],
      ]},

      { heading: 'Payment Instructions' },
      { bold: 'Accepted Payment Methods:' },
      { content: [
        'Bank Transfer (ACH/Wire):',
      ]},
      { placeholder: '[Bank Name]' },
      { placeholder: '[Routing Number]' },
      { placeholder: '[Account Number]' },
      { content: [''] },
      { content: [
        'Other accepted methods:',
      ]},
      { placeholder: '[PayPal, Stripe, Zelle, Check — include details as applicable]' },

      { heading: 'Notes' },
      { placeholder: '[Additional notes, late payment policy, or special instructions]' },
      { content: [
        '',
        'Late Payment Policy: Payments not received by the due date may be subject to a late fee of [X]% per month.',
      ]},

      { heading: 'Authorization' },
      { content: [
        '',
        'Issued by: ____________________________',
        'Name: [Your Name]',
        'Date: [Date]',
      ]},
    ],
    'InvoiceTemplate-EN.docx'
  );
}

// ===== INVOICE TEMPLATE (TR) =====
async function generateInvoiceTR() {
  await createDocument(
    'FATURA',
    'EchoLegal Şablonu — Profesyonel Fatura',
    [
      { heading: 'Gönderen (Hizmet Sağlayıcı)' },
      { placeholder: '[Ad Soyad veya İşletme Adı]' },
      { placeholder: '[Adres]' },
      { placeholder: '[Şehir, Eyalet, Posta Kodu]' },
      { placeholder: '[E-posta Adresi]' },
      { placeholder: '[Telefon Numarası]' },
      { placeholder: '[EIN veya Vergi Kimlik Numarası (varsa)]' },

      { heading: 'Fatura Edilen (Müşteri)' },
      { placeholder: '[Müşteri Adı veya İşletme Adı]' },
      { placeholder: '[Müşteri Adresi]' },
      { placeholder: '[Şehir, Eyalet, Posta Kodu]' },
      { placeholder: '[Müşteri E-postası]' },

      { heading: 'Fatura Bilgileri' },
      { table: [
        ['Alan', 'Değer'],
        ['Fatura Numarası', '[FTR-0001]'],
        ['Fatura Tarihi', '[GG/AA/YYYY]'],
        ['Son Ödeme Tarihi', '[GG/AA/YYYY]'],
        ['Ödeme Koşulları', '[30 Gün / Teslimde Ödeme / Diğer]'],
        ['Para Birimi', '[USD]'],
      ]},

      { heading: 'Hizmetler / Kalemler' },
      { table: [
        ['Açıklama', 'Miktar / Saat', 'Birim Fiyat', 'Tutar'],
        ['[Hizmet açıklaması]', '[X]', '[$X.XX]', '[$X.XX]'],
        ['[Hizmet açıklaması]', '[X]', '[$X.XX]', '[$X.XX]'],
        ['[Hizmet açıklaması]', '[X]', '[$X.XX]', '[$X.XX]'],
      ]},

      { heading: 'Özet' },
      { table: [
        ['', 'Tutar'],
        ['Ara Toplam', '[$X.XX]'],
        ['Vergi (varsa)', '[$X.XX]'],
        ['İndirim (varsa)', '[-$X.XX]'],
        ['Toplam Ödenecek', '[$X.XX]'],
      ]},

      { heading: 'Ödeme Talimatları' },
      { bold: 'Kabul Edilen Ödeme Yöntemleri:' },
      { content: [
        'Banka Havalesi (ACH/Wire):',
      ]},
      { placeholder: '[Banka Adı]' },
      { placeholder: '[Routing Number]' },
      { placeholder: '[Hesap Numarası]' },
      { content: [''] },
      { content: [
        'Diğer kabul edilen yöntemler:',
      ]},
      { placeholder: '[PayPal, Stripe, Zelle, Çek — ilgili bilgileri ekleyin]' },

      { heading: 'Notlar' },
      { placeholder: '[Ek notlar, gecikme politikası veya özel talimatlar]' },
      { content: [
        '',
        'Gecikme Politikası: Son ödeme tarihine kadar alınmayan ödemeler aylık %[X] gecikme ücretine tabi olabilir.',
      ]},

      { heading: 'Onay' },
      { content: [
        '',
        'Düzenleyen: ____________________________',
        'Ad Soyad: [Adınız]',
        'Tarih: [Tarih]',
      ]},
    ],
    'FaturaSablonu-TR.docx'
  );
}

// ===== RECEIPT TEMPLATE (EN) =====
async function generateReceiptEN() {
  await createDocument(
    'PAYMENT RECEIPT',
    'EchoLegal Template — Payment Confirmation',
    [
      { heading: 'Received From' },
      { placeholder: '[Payer Name or Business Name]' },
      { placeholder: '[Payer Address]' },

      { heading: 'Received By' },
      { placeholder: '[Your Name or Business Name]' },
      { placeholder: '[Your Address]' },

      { heading: 'Receipt Details' },
      { table: [
        ['Field', 'Value'],
        ['Receipt Number', '[REC-0001]'],
        ['Date Received', '[MM/DD/YYYY]'],
        ['Payment Method', '[Bank Transfer / Check / Cash / Credit Card / Other]'],
        ['Reference Number', '[Transaction or check number]'],
      ]},

      { heading: 'Payment Details' },
      { table: [
        ['Description', 'Amount'],
        ['[Service or product description]', '[$X.XX]'],
        ['[Additional item]', '[$X.XX]'],
        ['Total Received', '[$X.XX]'],
      ]},

      { heading: 'Payment Status' },
      { content: [
        'This receipt confirms payment in: [ ] Full  [ ] Partial',
        '',
        'Remaining balance (if partial): [$X.XX]',
      ]},

      { heading: 'Authorization' },
      { content: [
        '',
        'Received by: ____________________________',
        'Name: [Your Name]',
        'Date: [Date]',
      ]},
    ],
    'PaymentReceipt-EN.docx'
  );
}

// ===== RECEIPT TEMPLATE (TR) =====
async function generateReceiptTR() {
  await createDocument(
    'ÖDEME MAKBUZU',
    'EchoLegal Şablonu — Ödeme Onayı',
    [
      { heading: 'Ödemeyi Yapan' },
      { placeholder: '[Ödeme Yapan Kişi veya İşletme Adı]' },
      { placeholder: '[Adres]' },

      { heading: 'Ödemeyi Alan' },
      { placeholder: '[Ad Soyad veya İşletme Adı]' },
      { placeholder: '[Adres]' },

      { heading: 'Makbuz Bilgileri' },
      { table: [
        ['Alan', 'Değer'],
        ['Makbuz Numarası', '[MKB-0001]'],
        ['Alınma Tarihi', '[GG/AA/YYYY]'],
        ['Ödeme Yöntemi', '[Banka Havalesi / Çek / Nakit / Kredi Kartı / Diğer]'],
        ['Referans Numarası', '[İşlem veya çek numarası]'],
      ]},

      { heading: 'Ödeme Detayları' },
      { table: [
        ['Açıklama', 'Tutar'],
        ['[Hizmet veya ürün açıklaması]', '[$X.XX]'],
        ['[Ek kalem]', '[$X.XX]'],
        ['Toplam Alınan', '[$X.XX]'],
      ]},

      { heading: 'Ödeme Durumu' },
      { content: [
        'Bu makbuz şu ödemeyi onaylar: [ ] Tam  [ ] Kısmi',
        '',
        'Kalan bakiye (kısmi ise): [$X.XX]',
      ]},

      { heading: 'Onay' },
      { content: [
        '',
        'Alan: ____________________________',
        'Ad Soyad: [Adınız]',
        'Tarih: [Tarih]',
      ]},
    ],
    'OdemeMakbuzu-TR.docx'
  );
}

// ===== AUTHORIZATION LETTER (EN) =====
async function generateAuthorizationLetterEN() {
  await createDocument(
    'AUTHORIZATION LETTER',
    'EchoLegal Template — Third-Party Authorization',
    [
      { content: [
        '[Date]',
        '',
        'To Whom It May Concern:',
        '',
      ]},

      { heading: 'Authorizing Party' },
      { placeholder: '[Full Legal Name]' },
      { placeholder: '[Address]' },
      { placeholder: '[City, State, ZIP Code]' },
      { placeholder: '[Phone Number]' },
      { placeholder: '[Email Address]' },
      { placeholder: '[ID Number / Passport Number (if applicable)]' },

      { heading: 'Authorized Representative' },
      { placeholder: '[Full Legal Name of Representative]' },
      { placeholder: '[Address]' },
      { placeholder: '[Phone Number]' },
      { placeholder: '[Email Address]' },
      { placeholder: '[Relationship to Authorizing Party]' },

      { heading: 'Scope of Authorization' },
      { content: [
        'I, [Full Legal Name], hereby authorize [Representative Name] to act on my behalf for the following purpose(s):',
        '',
      ]},
      { placeholder: '[Describe the specific actions the representative is authorized to perform]' },
      { content: [
        '',
        'This authorization is effective from [Start Date] to [End Date / Until Revoked].',
        '',
        'The authorized representative is permitted to:',
      ]},
      { placeholder: '[List specific permitted actions, e.g., sign documents, collect information, make decisions]' },

      { heading: 'Limitations' },
      { content: [
        'This authorization does NOT extend to:',
      ]},
      { placeholder: '[List any specific exclusions or limitations]' },

      { heading: 'Signatures' },
      { content: [
        '',
        'Authorizing Party:',
        'Signature: ____________________________',
        'Printed Name: [Name]',
        'Date: [Date]',
        '',
        'Authorized Representative (Acknowledgment):',
        'Signature: ____________________________',
        'Printed Name: [Name]',
        'Date: [Date]',
        '',
        'Witness (if required):',
        'Signature: ____________________________',
        'Printed Name: [Name]',
        'Date: [Date]',
      ]},
    ],
    'AuthorizationLetter-EN.docx'
  );
}

// ===== AUTHORIZATION LETTER (TR) =====
async function generateAuthorizationLetterTR() {
  await createDocument(
    'YETKİ MEKTUBU',
    'EchoLegal Şablonu — Üçüncü Taraf Yetkilendirme',
    [
      { content: [
        '[Tarih]',
        '',
        'İlgili Makama,',
        '',
      ]},

      { heading: 'Yetki Veren' },
      { placeholder: '[Tam Yasal Ad]' },
      { placeholder: '[Adres]' },
      { placeholder: '[Şehir, Eyalet, Posta Kodu]' },
      { placeholder: '[Telefon Numarası]' },
      { placeholder: '[E-posta Adresi]' },
      { placeholder: '[TC Kimlik / Pasaport Numarası (varsa)]' },

      { heading: 'Yetkili Temsilci' },
      { placeholder: '[Temsilcinin Tam Yasal Adı]' },
      { placeholder: '[Adres]' },
      { placeholder: '[Telefon Numarası]' },
      { placeholder: '[E-posta Adresi]' },
      { placeholder: '[Yetki Verenle İlişkisi]' },

      { heading: 'Yetki Kapsamı' },
      { content: [
        'Ben, [Tam Yasal Ad], işbu belge ile [Temsilci Adı] adlı kişiyi aşağıdaki amaç(lar) doğrultusunda adıma hareket etmesi için yetkilendiriyorum:',
        '',
      ]},
      { placeholder: '[Temsilcinin gerçekleştirmeye yetkili olduğu işlemleri belirtin]' },
      { content: [
        '',
        'Bu yetki [Başlangıç Tarihi] ile [Bitiş Tarihi / İptal Edilene Kadar] arasında geçerlidir.',
        '',
        'Yetkili temsilci şu işlemleri yapabilir:',
      ]},
      { placeholder: '[İzin verilen belirli işlemleri listeleyin: belge imzalama, bilgi toplama, karar verme vb.]' },

      { heading: 'Sınırlamalar' },
      { content: [
        'Bu yetki aşağıdaki konulara uzanmaz:',
      ]},
      { placeholder: '[Belirli istisnaları veya sınırlamaları listeleyin]' },

      { heading: 'İmzalar' },
      { content: [
        '',
        'Yetki Veren:',
        'İmza: ____________________________',
        'Ad Soyad: [Ad]',
        'Tarih: [Tarih]',
        '',
        'Yetkili Temsilci (Kabul Beyanı):',
        'İmza: ____________________________',
        'Ad Soyad: [Ad]',
        'Tarih: [Tarih]',
        '',
        'Tanık (gerekli ise):',
        'İmza: ____________________________',
        'Ad Soyad: [Ad]',
        'Tarih: [Tarih]',
      ]},
    ],
    'YetkiMektubu-TR.docx'
  );
}

// ===== COMPANY POLICY NOTICE (EN) =====
async function generateCompanyPolicyEN() {
  await createDocument(
    'COMPANY POLICY NOTICE',
    'EchoLegal Template — Internal Policy Communication',
    [
      { heading: 'Company Information' },
      { placeholder: '[Company Name]' },
      { placeholder: '[Company Address]' },
      { content: ['Date of Notice: [MM/DD/YYYY]', ''] },

      { heading: 'Policy Details' },
      { table: [
        ['Field', 'Value'],
        ['Policy Title', '[Name of Policy]'],
        ['Effective Date', '[MM/DD/YYYY]'],
        ['Applies To', '[All Employees / Contractors / Specific Department]'],
        ['Replaces', '[Previous Policy Name/Date, if applicable]'],
      ]},

      { heading: 'Policy Statement' },
      { placeholder: '[Insert the full text of the policy or a summary of key provisions]' },

      { heading: 'Key Changes (if updating an existing policy)' },
      { content: [
        '1. [Description of change]',
        '2. [Description of change]',
        '3. [Description of change]',
      ]},

      { heading: 'Employee Responsibilities' },
      { placeholder: '[Describe what employees are expected to do in response to this policy]' },

      { heading: 'Questions' },
      { content: [
        'For questions regarding this policy, contact:',
      ]},
      { placeholder: '[Contact Name, Title, Email, Phone]' },

      { heading: 'Acknowledgment' },
      { content: [
        'I acknowledge that I have received and read this policy notice.',
        '',
        'Employee Name: ____________________________',
        'Signature: ____________________________',
        'Date: ____________________________',
      ]},
    ],
    'CompanyPolicyNotice-EN.docx'
  );
}

// ===== COMPANY POLICY NOTICE (TR) =====
async function generateCompanyPolicyTR() {
  await createDocument(
    'ŞİRKET POLİTİKASI BİLDİRİMİ',
    'EchoLegal Şablonu — İç Politika Bildirimi',
    [
      { heading: 'Şirket Bilgileri' },
      { placeholder: '[Şirket Adı]' },
      { placeholder: '[Şirket Adresi]' },
      { content: ['Bildirim Tarihi: [GG/AA/YYYY]', ''] },

      { heading: 'Politika Detayları' },
      { table: [
        ['Alan', 'Değer'],
        ['Politika Başlığı', '[Politika Adı]'],
        ['Yürürlük Tarihi', '[GG/AA/YYYY]'],
        ['Kapsam', '[Tüm Çalışanlar / Yükleniciler / Belirli Departman]'],
        ['Yerine Geçtiği', '[Önceki Politika Adı/Tarihi, varsa]'],
      ]},

      { heading: 'Politika Metni' },
      { placeholder: '[Politikanın tam metnini veya temel hükümlerin özetini ekleyin]' },

      { heading: 'Temel Değişiklikler (mevcut politika güncellemesi ise)' },
      { content: [
        '1. [Değişiklik açıklaması]',
        '2. [Değişiklik açıklaması]',
        '3. [Değişiklik açıklaması]',
      ]},

      { heading: 'Çalışan Sorumlulukları' },
      { placeholder: '[Bu politikaya karşılık çalışanlardan beklenen davranışları açıklayın]' },

      { heading: 'Sorular' },
      { content: [
        'Bu politikayla ilgili sorularınız için iletişime geçin:',
      ]},
      { placeholder: '[İletişim Adı, Unvan, E-posta, Telefon]' },

      { heading: 'Tebellüğ' },
      { content: [
        'Bu politika bildirimini aldığımı ve okuduğumu kabul ederim.',
        '',
        'Çalışan Adı: ____________________________',
        'İmza: ____________________________',
        'Tarih: ____________________________',
      ]},
    ],
    'SirketPolitikasiBildirimi-TR.docx'
  );
}

// ===== LLC OPERATING AGREEMENT OUTLINE (EN) =====
async function generateOperatingAgreementEN() {
  await createDocument(
    'LLC OPERATING AGREEMENT — OUTLINE',
    'EchoLegal Template — Key Sections for Single-Member LLC',
    [
      { content: [
        'This outline identifies the key sections and considerations for a single-member LLC operating agreement. It is not a complete agreement — consult an attorney to draft an agreement tailored to your specific situation.',
        '',
      ]},

      { heading: 'Article I — Organization' },
      { content: [
        '• LLC Name: [Name of LLC]',
        '• State of Formation: [State]',
        '• Date of Formation: [Date Articles of Organization were filed]',
        '• Principal Office Address: [Address]',
        '• Registered Agent: [Name and Address]',
        '• Purpose: [General business purpose or specific description]',
      ]},

      { heading: 'Article II — Member Information' },
      { content: [
        '• Sole Member Name: [Name]',
        '• Membership Interest: 100%',
        '• Initial Capital Contribution: [$Amount]',
        '• Additional Contributions: [Terms for future contributions, if any]',
      ]},

      { heading: 'Article III — Management' },
      { content: [
        '• Management Structure: Member-Managed',
        '• Decision-Making Authority: Sole member has full authority',
        '• Signing Authority: [Who can sign contracts and checks on behalf of the LLC]',
      ]},

      { heading: 'Article IV — Distributions & Allocations' },
      { content: [
        '• Profit/Loss Allocation: 100% to sole member',
        '• Distribution Schedule: [Monthly / Quarterly / As determined by member]',
        '• Tax Treatment: [Default single-member LLC = disregarded entity for tax purposes]',
      ]},

      { heading: 'Article V — Banking & Records' },
      { content: [
        '• Bank Account: [Bank name, separate from personal accounts]',
        '• Accounting Method: [Cash / Accrual]',
        '• Fiscal Year: [Calendar year / Other]',
        '• Record Keeping: Operating agreement, meeting minutes (if any), financial records',
      ]},

      { heading: 'Article VI — Transfer of Membership Interest' },
      { content: [
        '• Restrictions on transfer',
        '• Right of first refusal (if converting to multi-member)',
        '• Consent requirements',
      ]},

      { heading: 'Article VII — Dissolution' },
      { content: [
        '• Events triggering dissolution',
        '• Winding up procedure',
        '• Distribution of remaining assets',
        '• Filing requirements with the state',
      ]},

      { heading: 'Article VIII — Miscellaneous' },
      { content: [
        '• Governing Law: [State]',
        '• Amendment Procedure: Written amendment signed by the sole member',
        '• Severability Clause',
        '• Entire Agreement Clause',
      ]},

      { heading: 'Execution' },
      { content: [
        '',
        'Sole Member Signature: ____________________________',
        'Printed Name: [Name]',
        'Date: [Date]',
      ]},
    ],
    'OperatingAgreementOutline-EN.docx'
  );
}

// ===== LLC OPERATING AGREEMENT OUTLINE (TR) =====
async function generateOperatingAgreementTR() {
  await createDocument(
    'LLC OPERATING AGREEMENT — ANAHAT',
    'EchoLegal Şablonu — Tek Üyeli LLC İçin Temel Bölümler',
    [
      { content: [
        'Bu anahat, tek üyeli bir LLC operating agreement için temel bölümleri ve dikkat edilmesi gereken hususları belirler. Eksiksiz bir sözleşme değildir — durumunuza özel bir sözleşme hazırlamak için bir avukata danışın.',
        '',
      ]},

      { heading: 'Madde I — Kuruluş' },
      { content: [
        '• LLC Adı: [LLC Adı]',
        '• Kuruluş Eyaleti: [Eyalet]',
        '• Kuruluş Tarihi: [Articles of Organization dosyalama tarihi]',
        '• Merkez Ofis Adresi: [Adres]',
        '• Kayıtlı Temsilci (Registered Agent): [Ad ve Adres]',
        '• Amaç: [Genel iş amacı veya özel açıklama]',
      ]},

      { heading: 'Madde II — Üye Bilgileri' },
      { content: [
        '• Tek Üye Adı: [Ad]',
        '• Üyelik Payı: %100',
        '• İlk Sermaye Katkısı: [$Tutar]',
        '• Ek Katkılar: [Gelecekteki katkı koşulları, varsa]',
      ]},

      { heading: 'Madde III — Yönetim' },
      { content: [
        '• Yönetim Yapısı: Üye Yönetimli (Member-Managed)',
        '• Karar Alma Yetkisi: Tek üye tam yetkiye sahiptir',
        '• İmza Yetkisi: [LLC adına sözleşme ve çek imzalama yetkisi]',
      ]},

      { heading: 'Madde IV — Dağıtımlar ve Tahsisler' },
      { content: [
        '• Kâr/Zarar Tahsisi: %100 tek üyeye',
        '• Dağıtım Takvimi: [Aylık / Üç Aylık / Üye kararına göre]',
        '• Vergi Muamelesi: [Varsayılan tek üyeli LLC = vergi açısından dikkate alınmayan varlık (disregarded entity)]',
      ]},

      { heading: 'Madde V — Bankacılık ve Kayıtlar' },
      { content: [
        '• Banka Hesabı: [Banka adı, kişisel hesaplardan ayrı]',
        '• Muhasebe Yöntemi: [Nakit / Tahakkuk]',
        '• Mali Yıl: [Takvim yılı / Diğer]',
        '• Kayıt Tutma: Operating agreement, toplantı tutanakları (varsa), mali kayıtlar',
      ]},

      { heading: 'Madde VI — Üyelik Payının Devri' },
      { content: [
        '• Devir kısıtlamaları',
        '• Ön alım hakkı (çok üyeli yapıya geçiş durumunda)',
        '• Onay gereksinimleri',
      ]},

      { heading: 'Madde VII — Fesih ve Tasfiye' },
      { content: [
        '• Feshi tetikleyen durumlar',
        '• Tasfiye prosedürü',
        '• Kalan varlıkların dağıtımı',
        '• Eyalet nezdinde dosyalama gereksinimleri',
      ]},

      { heading: 'Madde VIII — Çeşitli Hükümler' },
      { content: [
        '• Uygulanacak Hukuk: [Eyalet]',
        '• Değişiklik Prosedürü: Tek üye tarafından imzalanan yazılı değişiklik',
        '• Bölünebilirlik Maddesi',
        '• Bütünlük Maddesi',
      ]},

      { heading: 'İmza' },
      { content: [
        '',
        'Tek Üye İmzası: ____________________________',
        'Ad Soyad: [Ad]',
        'Tarih: [Tarih]',
      ]},
    ],
    'OperatingAgreementAnahat-TR.docx'
  );
}

// Run all generators
async function main() {
  console.log('Generating business templates...\n');

  await generateInvoiceEN();
  await generateInvoiceTR();
  await generateReceiptEN();
  await generateReceiptTR();
  await generateAuthorizationLetterEN();
  await generateAuthorizationLetterTR();
  await generateCompanyPolicyEN();
  await generateCompanyPolicyTR();
  await generateOperatingAgreementEN();
  await generateOperatingAgreementTR();

  console.log('\nAll business templates generated successfully!');
}

main().catch(console.error);
