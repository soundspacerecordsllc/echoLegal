// scripts/generate-business-templates.js
// Generates downloadable DOCX files for Business category templates

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/documents');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function createDoc(children, filename) {
  const doc = new Document({ sections: [{ properties: {}, children }] });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Created: ${filename}`);
}

function h1(text) { return new Paragraph({ text, heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, spacing: { after: 200 } }); }
function h2(text) { return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 200 } }); }
function p(text, opts = {}) { return new Paragraph({ text, spacing: { after: 120 }, ...opts }); }
function bold(text) { return new Paragraph({ children: [new TextRun({ text, bold: true })], spacing: { after: 120 } }); }
function field(label) { return new Paragraph({ children: [new TextRun({ text: `${label}: ` }), new TextRun({ text: '____________________________________', underline: {} })], spacing: { after: 200 } }); }
function yellow(text) { return new Paragraph({ children: [new TextRun({ text: `[${text}]`, highlight: 'yellow' })], spacing: { after: 120 } }); }
function disclaimer(isEN) {
  return new Paragraph({ children: [new TextRun({ text: isEN ? '⚖️ This template is for informational purposes only and does not constitute legal advice.' : '⚖️ Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez.', italics: true, size: 20 })], spacing: { after: 400 } });
}
function sampleBanner(isEN) {
  return new Paragraph({ children: [new TextRun({ text: isEN ? 'SAMPLE TEMPLATE - FOR REFERENCE ONLY' : 'ÖRNEK ŞABLON - YALNIZCA REFERANS AMAÇLI', bold: true, color: 'FF0000' })], alignment: AlignmentType.CENTER, spacing: { after: 200 } });
}
function sigBlock(label1, label2) {
  return [p(''), p('________________________________________'), p(label1), p(''), p(label2 || ''), p('Date / Tarih: ________________________________________')];
}

// ===== 1. INVOICE TEMPLATE =====
async function invoiceEN() {
  await createDoc([
    h1('INVOICE'),
    sampleBanner(true), disclaimer(true),
    h2('FROM (Sender)'),
    field('Company / Individual Name'), field('Address'), field('Phone'), field('Email'), field('Tax ID / EIN'),
    h2('TO (Client)'),
    field('Client Name'), field('Company'), field('Address'), field('Email'),
    h2('INVOICE DETAILS'),
    field('Invoice Number'), field('Invoice Date'), field('Due Date'), field('Payment Terms'),
    h2('SERVICES / ITEMS'),
    bold('Item 1:'),
    field('Description'), field('Quantity'), field('Unit Price'), field('Amount'),
    bold('Item 2:'),
    field('Description'), field('Quantity'), field('Unit Price'), field('Amount'),
    bold('Item 3:'),
    field('Description'), field('Quantity'), field('Unit Price'), field('Amount'),
    p(''),
    field('Subtotal'), field('Tax (if applicable)'), field('Discount (if applicable)'),
    new Paragraph({ children: [new TextRun({ text: 'TOTAL DUE: ', bold: true, size: 28 }), new TextRun({ text: '$______________', bold: true, size: 28 })], spacing: { before: 200, after: 300 } }),
    h2('PAYMENT INFORMATION'),
    field('Payment Method'), field('Bank Name'), field('Account Number / Routing'), field('Wire / ACH Details'), field('PayPal / Venmo / Zelle'),
    h2('NOTES'),
    p('• Late payments may incur a fee of ___% per month.'),
    p('• Please reference invoice number on all payments.'),
    p('• Payment is due within the terms specified above.'),
  ], 'InvoiceTemplate-EN.docx');
}

async function invoiceTR() {
  await createDoc([
    h1('FATURA'),
    sampleBanner(false), disclaimer(false),
    h2('KİMDEN (Gönderen)'),
    field('Şirket / Kişi Adı'), field('Adres'), field('Telefon'), field('E-posta'), field('Vergi No / EIN'),
    h2('KİME (Müşteri)'),
    field('Müşteri Adı'), field('Şirket'), field('Adres'), field('E-posta'),
    h2('FATURA BİLGİLERİ'),
    field('Fatura Numarası'), field('Fatura Tarihi'), field('Son Ödeme Tarihi'), field('Ödeme Koşulları'),
    h2('HİZMETLER / KALEMLER'),
    bold('Kalem 1:'),
    field('Açıklama'), field('Miktar'), field('Birim Fiyat'), field('Tutar'),
    bold('Kalem 2:'),
    field('Açıklama'), field('Miktar'), field('Birim Fiyat'), field('Tutar'),
    bold('Kalem 3:'),
    field('Açıklama'), field('Miktar'), field('Birim Fiyat'), field('Tutar'),
    p(''),
    field('Ara Toplam'), field('Vergi (varsa)'), field('İndirim (varsa)'),
    new Paragraph({ children: [new TextRun({ text: 'TOPLAM: ', bold: true, size: 28 }), new TextRun({ text: '$______________', bold: true, size: 28 })], spacing: { before: 200, after: 300 } }),
    h2('ÖDEME BİLGİLERİ'),
    field('Ödeme Yöntemi'), field('Banka Adı'), field('Hesap No / Şube'), field('Havale / EFT Bilgileri'), field('PayPal / Wise / Diğer'),
    h2('NOTLAR'),
    p('• Geç ödemeler için aylık %___ gecikme faizi uygulanabilir.'),
    p('• Lütfen ödemelerde fatura numarasını referans gösterin.'),
    p('• Ödeme yukarıda belirtilen koşullar dahilinde yapılmalıdır.'),
  ], 'FaturaSablonu-TR.docx');
}

// ===== 2. PAYMENT RECEIPT =====
async function receiptEN() {
  await createDoc([
    h1('PAYMENT RECEIPT'),
    sampleBanner(true), disclaimer(true),
    h2('RECEIPT DETAILS'),
    field('Receipt Number'), field('Date'), field('Payment Method'),
    h2('RECEIVED FROM'),
    field('Payer Name'), field('Company'), field('Address'), field('Email'),
    h2('RECEIVED BY'),
    field('Recipient Name'), field('Company'), field('Address'), field('Tax ID / EIN'),
    h2('PAYMENT DETAILS'),
    field('Description of Payment'), field('Invoice Number (if applicable)'), field('Amount Received'),
    new Paragraph({ children: [new TextRun({ text: 'TOTAL RECEIVED: ', bold: true, size: 28 }), new TextRun({ text: '$______________', bold: true, size: 28 })], spacing: { before: 200, after: 300 } }),
    h2('PAYMENT STATUS'),
    p('☐ Paid in Full'), p('☐ Partial Payment — Remaining Balance: $______________'), p('☐ Deposit / Advance Payment'),
    ...sigBlock('Authorized Signature', 'Printed Name'),
  ], 'PaymentReceipt-EN.docx');
}

async function receiptTR() {
  await createDoc([
    h1('ÖDEME MAKBUZU'),
    sampleBanner(false), disclaimer(false),
    h2('MAKBUZ BİLGİLERİ'),
    field('Makbuz Numarası'), field('Tarih'), field('Ödeme Yöntemi'),
    h2('KİMDEN ALINDI'),
    field('Ödeme Yapanın Adı'), field('Şirket'), field('Adres'), field('E-posta'),
    h2('KİME ALINDI'),
    field('Alıcı Adı'), field('Şirket'), field('Adres'), field('Vergi No'),
    h2('ÖDEME DETAYLARI'),
    field('Ödeme Açıklaması'), field('Fatura Numarası (varsa)'), field('Alınan Tutar'),
    new Paragraph({ children: [new TextRun({ text: 'TOPLAM ALINAN: ', bold: true, size: 28 }), new TextRun({ text: '$______________', bold: true, size: 28 })], spacing: { before: 200, after: 300 } }),
    h2('ÖDEME DURUMU'),
    p('☐ Tam Ödendi'), p('☐ Kısmi Ödeme — Kalan Bakiye: $______________'), p('☐ Depozito / Avans Ödemesi'),
    ...sigBlock('Yetkili İmzası', 'Ad Soyad'),
  ], 'OdemeMakbuzu-TR.docx');
}

// ===== 3. AUTHORIZATION LETTER =====
async function authLetterEN() {
  await createDoc([
    h1('AUTHORIZATION LETTER'),
    sampleBanner(true), disclaimer(true),
    p('Date: ____________________'),
    p(''),
    p('To Whom It May Concern,'),
    p(''),
    p('I, [YOUR FULL LEGAL NAME], hereby authorize the following individual to act on my behalf:'),
    p(''),
    h2('AUTHORIZED PERSON'),
    field('Full Name'), field('Relationship'), field('ID / Passport Number'), field('Phone'), field('Email'),
    h2('AUTHORIZER (Principal)'),
    field('Full Name'), field('Address'), field('Phone'), field('Email'), field('ID / Passport Number'),
    h2('SCOPE OF AUTHORIZATION'),
    p('I authorize the above-named individual to perform the following on my behalf:'),
    p(''),
    p('☐ Collect documents from: ________________________________________'),
    p('☐ Sign documents related to: ________________________________________'),
    p('☐ Represent me at: ________________________________________'),
    p('☐ Make payments on my behalf for: ________________________________________'),
    p('☐ Other: ________________________________________'),
    h2('DURATION'),
    p('This authorization is valid from _________________ to _________________.'),
    p('☐ OR: This authorization is valid for a single use only.'),
    h2('CONDITIONS'),
    p('• The authorized person must present this letter along with a valid government-issued ID.'),
    p('• This authorization may be revoked at any time with written notice.'),
    p('• The authorized person may not delegate this authority to another person.'),
    ...sigBlock('Authorizer\'s Signature', 'Printed Name'),
    p(''), p(''),
    h2('NOTARIZATION (if required)'),
    p('State/Country: _________________  County: _________________'),
    p('Subscribed and sworn before me this _____ day of _____________, 20____.'),
    p(''), p('________________________________________'), p('Notary Public'),
  ], 'AuthorizationLetter-EN.docx');
}

async function authLetterTR() {
  await createDoc([
    h1('YETKİ MEKTUBU'),
    sampleBanner(false), disclaimer(false),
    p('Tarih: ____________________'),
    p(''),
    p('İlgili Makama,'),
    p(''),
    p('Ben, [TAM YASAL ADINIZ], aşağıda bilgileri yazılı kişiyi benim adıma işlem yapmaya yetkilendiriyorum:'),
    p(''),
    h2('YETKİLENDİRİLEN KİŞİ'),
    field('Ad Soyad'), field('Yakınlık'), field('Kimlik / Pasaport No'), field('Telefon'), field('E-posta'),
    h2('YETKİ VEREN (Asıl)'),
    field('Ad Soyad'), field('Adres'), field('Telefon'), field('E-posta'), field('Kimlik / Pasaport No'),
    h2('YETKİ KAPSAMI'),
    p('Yukarıda adı geçen kişiyi aşağıdaki işlemleri benim adıma yapmaya yetkilendiriyorum:'),
    p(''),
    p('☐ Şu kurumdan belge almak: ________________________________________'),
    p('☐ Şu konuyla ilgili belge imzalamak: ________________________________________'),
    p('☐ Şu yerde beni temsil etmek: ________________________________________'),
    p('☐ Şu konuda benim adıma ödeme yapmak: ________________________________________'),
    p('☐ Diğer: ________________________________________'),
    h2('SÜRE'),
    p('Bu yetki _________________ tarihinden _________________ tarihine kadar geçerlidir.'),
    p('☐ VEYA: Bu yetki yalnızca tek kullanımlıktır.'),
    h2('KOŞULLAR'),
    p('• Yetkili kişi bu mektupla birlikte geçerli bir resmi kimlik ibraz etmelidir.'),
    p('• Bu yetki yazılı bildirimle her zaman iptal edilebilir.'),
    p('• Yetkili kişi bu yetkiyi başka birine devredemez.'),
    ...sigBlock('Yetki Verenin İmzası', 'Ad Soyad'),
    p(''), p(''),
    h2('NOTERLİK ONAYI (gerekirse)'),
    p('Ülke/Şehir: _________________  İlçe: _________________'),
    p('İşbu belge benim önümde _____ / _____________ / 20____ tarihinde imzalanmıştır.'),
    p(''), p('________________________________________'), p('Noter'),
  ], 'YetkiMektubu-TR.docx');
}

// ===== 4. COMPANY POLICY NOTICE =====
async function policyNoticeEN() {
  await createDoc([
    h1('COMPANY POLICY NOTICE'),
    sampleBanner(true), disclaimer(true),
    field('Company Name'), field('Date'), field('Policy Number / Reference'),
    p(''),
    h2('TO'),
    p('☐ All Employees    ☐ All Contractors    ☐ Specific Department: ________________'),
    h2('FROM'),
    field('Name / Title'), field('Department'),
    h2('SUBJECT'),
    yellow('POLICY TITLE / TOPIC'),
    h2('EFFECTIVE DATE'),
    field('This policy takes effect on'),
    h2('PURPOSE'),
    p('This notice is to inform you of the following policy update:'),
    yellow('Describe the purpose of this policy change'),
    h2('POLICY DETAILS'),
    p('1. ________________________________________'),
    p('2. ________________________________________'),
    p('3. ________________________________________'),
    p('4. ________________________________________'),
    h2('WHAT THIS MEANS FOR YOU'),
    yellow('Explain how this policy affects the recipient'),
    h2('ACTION REQUIRED'),
    p('☐ Review and acknowledge receipt of this notice by: ________________'),
    p('☐ Complete required training by: ________________'),
    p('☐ Update your records / information by: ________________'),
    p('☐ No action required — for informational purposes only'),
    h2('QUESTIONS'),
    p('If you have questions about this policy, please contact:'),
    field('Contact Name'), field('Email'), field('Phone'),
    h2('ACKNOWLEDGMENT'),
    p('I have read and understand the above policy notice.'),
    p(''), field('Employee / Contractor Name'), field('Signature'), field('Date'),
  ], 'CompanyPolicyNotice-EN.docx');
}

async function policyNoticeTR() {
  await createDoc([
    h1('ŞİRKET POLİTİKASI BİLDİRİMİ'),
    sampleBanner(false), disclaimer(false),
    field('Şirket Adı'), field('Tarih'), field('Politika Numarası / Referansı'),
    p(''),
    h2('KİME'),
    p('☐ Tüm Çalışanlar    ☐ Tüm Yükleniciler    ☐ Belirli Departman: ________________'),
    h2('KİMDEN'),
    field('Ad / Unvan'), field('Departman'),
    h2('KONU'),
    yellow('POLİTİKA BAŞLIĞI / KONUSU'),
    h2('YÜRÜRLÜK TARİHİ'),
    field('Bu politika şu tarihte yürürlüğe girer'),
    h2('AMAÇ'),
    p('Bu bildirim, aşağıdaki politika güncellemesi hakkında sizi bilgilendirmek içindir:'),
    yellow('Bu politika değişikliğinin amacını açıklayın'),
    h2('POLİTİKA DETAYLARI'),
    p('1. ________________________________________'),
    p('2. ________________________________________'),
    p('3. ________________________________________'),
    p('4. ________________________________________'),
    h2('SİZİN İÇİN NE ANLAMA GELİYOR'),
    yellow('Bu politikanın alıcıyı nasıl etkilediğini açıklayın'),
    h2('GEREKLİ İŞLEM'),
    p('☐ Bu bildirimi inceleyip alındığını şu tarihe kadar onaylayın: ________________'),
    p('☐ Gerekli eğitimi şu tarihe kadar tamamlayın: ________________'),
    p('☐ Kayıtlarınızı şu tarihe kadar güncelleyin: ________________'),
    p('☐ İşlem gerekmiyor — yalnızca bilgilendirme amaçlı'),
    h2('SORULAR'),
    p('Bu politikayla ilgili sorularınız için lütfen iletişime geçin:'),
    field('İletişim Adı'), field('E-posta'), field('Telefon'),
    h2('BİLGİLENDİRME ONAYI'),
    p('Yukarıdaki politika bildirimini okudum ve anladım.'),
    p(''), field('Çalışan / Yüklenici Adı'), field('İmza'), field('Tarih'),
  ], 'SirketPolitikasiBildirimi-TR.docx');
}

// ===== 5. LLC OPERATING AGREEMENT OUTLINE =====
async function operatingAgreementEN() {
  await createDoc([
    h1('LLC OPERATING AGREEMENT'),
    new Paragraph({ children: [new TextRun({ text: 'Single-Member Limited Liability Company', italics: true })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
    sampleBanner(true), disclaimer(true),
    h2('ARTICLE I — FORMATION'),
    field('LLC Name'), field('State of Formation'), field('Date of Formation'), field('EIN'), field('Principal Office Address'), field('Registered Agent Name & Address'),
    h2('ARTICLE II — PURPOSE'),
    p('The Company is formed for the purpose of:'),
    yellow('Describe the business purpose'),
    h2('ARTICLE III — MEMBER'),
    field('Member Name'), field('Member Address'), field('Ownership Percentage'), p('(For single-member LLC: 100%)'),
    h2('ARTICLE IV — CAPITAL CONTRIBUTIONS'),
    field('Initial Capital Contribution'), field('Form of Contribution (cash, property, services)'), p('Additional contributions may be made at the Member\'s discretion.'),
    h2('ARTICLE V — PROFITS AND LOSSES'),
    p('All profits and losses shall be allocated to the sole Member.'),
    p('The Member may take distributions at any time, subject to maintaining adequate reserves for business operations.'),
    h2('ARTICLE VI — MANAGEMENT'),
    p('The Company shall be managed by its sole Member.'),
    p('The Member shall have full authority to:'),
    p('• Enter into contracts and agreements'),
    p('• Open and manage bank accounts'),
    p('• Hire employees and contractors'),
    p('• Make all business decisions'),
    h2('ARTICLE VII — BANKING'),
    field('Bank Name'), field('Account Type'),
    p('The Member is authorized to sign checks and conduct banking transactions.'),
    h2('ARTICLE VIII — TAXES'),
    p('The Company shall be treated as a disregarded entity for federal tax purposes.'),
    p('All income shall be reported on the Member\'s personal tax return (Schedule C, Form 1040).'),
    h2('ARTICLE IX — LIABILITY PROTECTION'),
    p('The Member shall not be personally liable for debts, obligations, or liabilities of the Company.'),
    p('The Company shall maintain separation between personal and business finances.'),
    h2('ARTICLE X — DISSOLUTION'),
    p('The Company may be dissolved:'),
    p('• By written decision of the Member'),
    p('• By court order'),
    p('• By any event required under state law'),
    p('Upon dissolution, assets shall be distributed after paying all debts and obligations.'),
    h2('ARTICLE XI — AMENDMENTS'),
    p('This Agreement may be amended at any time by written instrument signed by the Member.'),
    h2('EXECUTION'),
    p(''),
    field('Member Signature'), field('Printed Name'), field('Date'),
  ], 'LLCOperatingAgreement-EN.docx');
}

async function operatingAgreementTR() {
  await createDoc([
    h1('LLC İŞLETME SÖZLEŞMESİ'),
    new Paragraph({ children: [new TextRun({ text: 'Tek Üyeli Limited Şirket (LLC)', italics: true })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
    sampleBanner(false), disclaimer(false),
    h2('MADDE I — KURULUŞ'),
    field('LLC Adı'), field('Kuruluş Eyaleti'), field('Kuruluş Tarihi'), field('EIN'), field('Ana Ofis Adresi'), field('Kayıtlı Temsilci Adı ve Adresi'),
    h2('MADDE II — AMAÇ'),
    p('Şirket aşağıdaki amaçla kurulmuştur:'),
    yellow('İş amacını açıklayın'),
    h2('MADDE III — ÜYE'),
    field('Üye Adı'), field('Üye Adresi'), field('Sahiplik Yüzdesi'), p('(Tek üyeli LLC için: %100)'),
    h2('MADDE IV — SERMAYE KATKILARI'),
    field('Başlangıç Sermaye Katkısı'), field('Katkı Şekli (nakit, mülk, hizmet)'), p('Ek katkılar Üyenin takdirine bağlı olarak yapılabilir.'),
    h2('MADDE V — KAR VE ZARAR'),
    p('Tüm kar ve zararlar tek Üyeye tahsis edilecektir.'),
    p('Üye, iş operasyonları için yeterli rezervi korumak kaydıyla istediği zaman dağıtım alabilir.'),
    h2('MADDE VI — YÖNETİM'),
    p('Şirket tek Üyesi tarafından yönetilecektir.'),
    p('Üye şu konularda tam yetkiye sahiptir:'),
    p('• Sözleşme ve anlaşma yapmak'),
    p('• Banka hesabı açmak ve yönetmek'),
    p('• Çalışan ve yüklenici istihdam etmek'),
    p('• Tüm iş kararlarını vermek'),
    h2('MADDE VII — BANKACILIK'),
    field('Banka Adı'), field('Hesap Türü'),
    p('Üye çek imzalama ve bankacılık işlemleri yapma yetkisine sahiptir.'),
    h2('MADDE VIII — VERGİLER'),
    p('Şirket, federal vergi amaçları açısından dikkate alınmayan bir kuruluş (disregarded entity) olarak işlem görecektir.'),
    p('Tüm gelir Üyenin kişisel vergi beyannamesi üzerinden bildirilecektir (Schedule C, Form 1040).'),
    h2('MADDE IX — SORUMLULUK KORUMASI'),
    p('Üye, Şirketin borçlarından, yükümlülüklerinden veya taahhütlerinden kişisel olarak sorumlu olmayacaktır.'),
    p('Şirket, kişisel ve ticari finanslar arasındaki ayrımı koruyacaktır.'),
    h2('MADDE X — FESİH'),
    p('Şirket şu durumlarda feshedilebilir:'),
    p('• Üyenin yazılı kararıyla'),
    p('• Mahkeme kararıyla'),
    p('• Eyalet yasalarının gerektirdiği herhangi bir olayla'),
    p('Fesih halinde, tüm borç ve yükümlülükler ödendikten sonra varlıklar dağıtılacaktır.'),
    h2('MADDE XI — DEĞİŞİKLİKLER'),
    p('Bu Sözleşme, Üye tarafından imzalanan yazılı bir belgeyle her zaman değiştirilebilir.'),
    h2('İMZA'),
    p(''),
    field('Üye İmzası'), field('Ad Soyad'), field('Tarih'),
  ], 'LLCIsletmeSozlesmesi-TR.docx');
}

async function generateAll() {
  console.log('Generating Business template documents...\n');
  await invoiceEN(); await invoiceTR();
  await receiptEN(); await receiptTR();
  await authLetterEN(); await authLetterTR();
  await policyNoticeEN(); await policyNoticeTR();
  await operatingAgreementEN(); await operatingAgreementTR();
  console.log('\nAll Business templates generated!');
}

generateAll().catch(console.error);
