// scripts/generate-immigration-templates.js
// Generates DOCX files for immigration letter templates

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = require('docx');
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

// 1. Visa Appointment Cover Letter
const visaCoverLetterEN = {
  title: 'Visa Appointment Cover Letter',
  filename: 'VisaAppointmentCoverLetter-EN.docx',
  sections: [
    {
      content: [
        '[Your Full Name]',
        '[Your Address]',
        '[City, State/Province, Postal Code]',
        '[Country]',
        '[Your Phone Number]',
        '[Your Email]',
        '',
        '[Date]',
        '',
        'U.S. Embassy / Consulate General',
        '[Embassy/Consulate Address]',
        '[City, Country]',
        '',
        'Re: Nonimmigrant Visa Application – [Visa Category, e.g., B1/B2, F-1, etc.]',
        '',
        'Dear Visa Officer,',
      ],
    },
    {
      heading: 'Purpose of Visit',
      content: [
        'I am writing to respectfully submit my application for a [visa type] visa. The purpose of my intended visit to the United States is [briefly state purpose: business meetings, tourism, education, etc.].',
        '',
        '[CUSTOMIZE: Provide specific details about your trip purpose, dates, and activities]',
      ],
    },
    {
      heading: 'Travel Dates & Itinerary',
      content: [
        'Intended Departure Date: [Date]',
        'Intended Return Date: [Date]',
        'Duration of Stay: [Number] days',
        '',
        'During my stay, I plan to:',
        '• [Activity 1]',
        '• [Activity 2]',
        '• [Activity 3]',
      ],
    },
    {
      heading: 'Ties to Home Country',
      content: [
        'I am committed to returning to my home country upon completion of my visit. My strong ties include:',
        '',
        'Employment: [Your current job, position, employer]',
        'Family: [Spouse, children, or dependents remaining in home country]',
        'Property: [Real estate, business ownership, or other assets]',
        'Other Obligations: [Educational enrollment, community involvement, etc.]',
      ],
    },
    {
      heading: 'Financial Capability',
      content: [
        'I confirm that I have sufficient financial resources to cover all expenses during my stay, including:',
        '• Round-trip airfare',
        '• Accommodation',
        '• Daily living expenses',
        '• Emergency funds',
        '',
        '[If sponsored: I will be hosted/sponsored by [Name], who will provide accommodation and/or financial support during my visit.]',
      ],
    },
    {
      heading: 'Supporting Documents',
      content: [
        'I have enclosed the following documents in support of my application:',
        '• Completed DS-160 confirmation page',
        '• Valid passport',
        '• Passport-size photographs',
        '• Proof of financial means (bank statements)',
        '• Employment verification letter',
        '• Travel itinerary',
        '• [Other relevant documents]',
      ],
    },
    {
      heading: 'Closing',
      content: [
        'Thank you for considering my visa application. I am prepared to provide any additional documentation or information that may be required. I look forward to a favorable decision.',
        '',
        'Respectfully submitted,',
        '',
        '',
        '____________________________',
        '[Your Signature]',
        '',
        '[Your Printed Name]',
        '[Date]',
      ],
    },
  ],
};

const visaCoverLetterTR = {
  title: 'Vize Randevu Kapak Yazısı',
  filename: 'VizeRandevuKapakYazisi-TR.docx',
  sections: [
    {
      content: [
        '[Adınız Soyadınız]',
        '[Adresiniz]',
        '[Şehir, İlçe, Posta Kodu]',
        '[Ülke]',
        '[Telefon Numaranız]',
        '[E-posta Adresiniz]',
        '',
        '[Tarih]',
        '',
        'ABD Büyükelçiliği / Başkonsolosluğu',
        '[Elçilik/Konsolosluk Adresi]',
        '[Şehir, Ülke]',
        '',
        'Konu: Göçmen Olmayan Vize Başvurusu – [Vize Kategorisi, örn. B1/B2, F-1, vb.]',
        '',
        'Sayın Vize Yetkilisi,',
      ],
    },
    {
      heading: 'Ziyaret Amacı',
      content: [
        '[Vize türü] vizesi başvurumu saygılarımla sunmak üzere yazıyorum. Amerika Birleşik Devletleri\'ne planlanan ziyaretimin amacı [amacı kısaca belirtin: iş toplantıları, turizm, eğitim, vb.].',
        '',
        '[ÖZELLEŞTİRİN: Seyahat amacınız, tarihleri ve aktiviteler hakkında özel detaylar verin]',
      ],
    },
    {
      heading: 'Seyahat Tarihleri ve Güzergah',
      content: [
        'Planlanan Gidiş Tarihi: [Tarih]',
        'Planlanan Dönüş Tarihi: [Tarih]',
        'Kalış Süresi: [Sayı] gün',
        '',
        'Kalışım süresince planladıklarım:',
        '• [Aktivite 1]',
        '• [Aktivite 2]',
        '• [Aktivite 3]',
      ],
    },
    {
      heading: 'Ülkeme Bağlılıklarım',
      content: [
        'Ziyaretimin tamamlanmasının ardından ülkeme geri dönmeyi taahhüt ediyorum. Güçlü bağlarım şunlardır:',
        '',
        'İstihdam: [Mevcut işiniz, pozisyonunuz, işvereniniz]',
        'Aile: [Ülkede kalan eş, çocuk veya bakmakla yükümlü olduğunuz kişiler]',
        'Mülk: [Gayrimenkul, işletme sahipliği veya diğer varlıklar]',
        'Diğer Yükümlülükler: [Eğitim kaydı, topluluk katılımı, vb.]',
      ],
    },
    {
      heading: 'Finansal Yeterlilik',
      content: [
        'Kalışım süresince tüm masrafları karşılayacak yeterli finansal kaynaklara sahip olduğumu onaylıyorum:',
        '• Gidiş-dönüş uçak bileti',
        '• Konaklama',
        '• Günlük yaşam giderleri',
        '• Acil durum fonları',
        '',
        '[Sponsor varsa: Ziyaretim süresince [İsim] tarafından ağırlanacağım/destekleneceğim, konaklama ve/veya finansal destek sağlayacaklar.]',
      ],
    },
    {
      heading: 'Destekleyici Belgeler',
      content: [
        'Başvurumu desteklemek üzere aşağıdaki belgeleri ekliyorum:',
        '• Tamamlanmış DS-160 onay sayfası',
        '• Geçerli pasaport',
        '• Vesikalık fotoğraflar',
        '• Finansal yeterlilik belgesi (banka hesap özeti)',
        '• İşveren doğrulama mektubu',
        '• Seyahat güzergahı',
        '• [Diğer ilgili belgeler]',
      ],
    },
    {
      heading: 'Kapanış',
      content: [
        'Vize başvurumu değerlendirdiğiniz için teşekkür ederim. Gerekli olabilecek ek belge veya bilgileri sağlamaya hazırım. Olumlu bir karar bekliyorum.',
        '',
        'Saygılarımla,',
        '',
        '',
        '____________________________',
        '[İmzanız]',
        '',
        '[Adınız Soyadınız]',
        '[Tarih]',
      ],
    },
  ],
};

// 2. Sponsor Letter
const sponsorLetterEN = {
  title: 'Sponsor Letter / Invitation Letter for Visa',
  filename: 'SponsorLetter-EN.docx',
  sections: [
    {
      content: [
        '[Sponsor\'s Full Name]',
        '[Sponsor\'s Address]',
        '[City, State, ZIP Code]',
        '[Country: USA]',
        '[Phone Number]',
        '[Email Address]',
        '',
        '[Date]',
        '',
        'U.S. Embassy / Consulate General',
        '[Location]',
        '',
        'Re: Letter of Invitation and Financial Sponsorship for [Visitor\'s Full Name]',
        '',
        'Dear Visa Officer,',
      ],
    },
    {
      heading: 'Introduction',
      content: [
        'I, [Sponsor\'s Full Name], am writing to invite and sponsor [Visitor\'s Full Name] for a visit to the United States. I am a [U.S. Citizen / Permanent Resident] residing at the address above.',
      ],
    },
    {
      heading: 'Information About the Visitor',
      content: [
        'Full Name: [Visitor\'s Full Name]',
        'Date of Birth: [DOB]',
        'Passport Number: [Number]',
        'Current Address: [Visitor\'s Address in Home Country]',
        'Relationship to Sponsor: [e.g., Parent, Sibling, Friend, Business Associate]',
      ],
    },
    {
      heading: 'Purpose and Duration of Visit',
      content: [
        'The purpose of this visit is [tourism / family visit / business / attending an event / etc.].',
        '',
        'Intended Arrival Date: [Date]',
        'Intended Departure Date: [Date]',
        'Duration of Stay: Approximately [X] weeks/months',
        '',
        '[CUSTOMIZE: Describe specific activities, events, or reasons for the visit]',
      ],
    },
    {
      heading: 'Accommodation',
      content: [
        '[Visitor\'s Name] will be staying at my residence during their visit:',
        '',
        '[Your Full Address]',
        '',
        'I will provide comfortable accommodation and ensure their well-being during their stay in the United States.',
      ],
    },
    {
      heading: 'Financial Responsibility',
      content: [
        'I hereby confirm that I will be financially responsible for [Visitor\'s Name] during their stay in the United States. I will cover all expenses including:',
        '',
        '• Round-trip airfare (if applicable)',
        '• Accommodation',
        '• Food and daily expenses',
        '• Transportation within the U.S.',
        '• Medical emergencies (if any)',
        '• Any other incidental expenses',
        '',
        'I am employed as [Your Job Title] at [Company Name] with an annual income of $[Amount]. I have enclosed proof of my financial capability.',
      ],
    },
    {
      heading: 'Sponsor\'s Immigration Status',
      content: [
        'My immigration status in the United States:',
        '• Status: [U.S. Citizen / Permanent Resident / Visa Holder - specify type]',
        '• Status since: [Date]',
        '• [If applicable: Green Card Number / Naturalization Certificate Number]',
      ],
    },
    {
      heading: 'Supporting Documents Enclosed',
      content: [
        '• Copy of my U.S. Passport / Green Card / Immigration Documents',
        '• Recent bank statements',
        '• Employment verification letter',
        '• Recent tax returns (Form 1040)',
        '• Proof of residence (utility bill / lease agreement)',
      ],
    },
    {
      heading: 'Declaration',
      content: [
        'I declare that all information provided in this letter is true and accurate. I understand that providing false information may result in serious consequences.',
        '',
        'I am confident that [Visitor\'s Name] will comply with all U.S. immigration laws and will return to [their home country] before the expiration of their authorized stay.',
        '',
        'Please do not hesitate to contact me if you require any additional information.',
        '',
        'Sincerely,',
        '',
        '',
        '____________________________',
        '[Sponsor\'s Signature]',
        '',
        '[Sponsor\'s Printed Name]',
        '[Date]',
      ],
    },
  ],
};

const sponsorLetterTR = {
  title: 'Sponsor Mektubu / Vize Davet Mektubu',
  filename: 'SponsorMektubu-TR.docx',
  sections: [
    {
      content: [
        '[Sponsorun Adı Soyadı]',
        '[Sponsorun Adresi]',
        '[Şehir, Eyalet, Posta Kodu]',
        '[Ülke: ABD]',
        '[Telefon Numarası]',
        '[E-posta Adresi]',
        '',
        '[Tarih]',
        '',
        'ABD Büyükelçiliği / Başkonsolosluğu',
        '[Konum]',
        '',
        'Konu: [Ziyaretçinin Adı Soyadı] için Davet ve Mali Sponsorluk Mektubu',
        '',
        'Sayın Vize Yetkilisi,',
      ],
    },
    {
      heading: 'Giriş',
      content: [
        'Ben, [Sponsorun Adı Soyadı], [Ziyaretçinin Adı Soyadı]\'nı Amerika Birleşik Devletleri\'ne ziyaret için davet etmek ve sponsor olmak üzere yazıyorum. Yukarıdaki adreste ikamet eden bir [ABD Vatandaşı / Daimi İkamet Sahibi]yim.',
      ],
    },
    {
      heading: 'Ziyaretçi Hakkında Bilgiler',
      content: [
        'Ad Soyad: [Ziyaretçinin Adı Soyadı]',
        'Doğum Tarihi: [Doğum Tarihi]',
        'Pasaport Numarası: [Numara]',
        'Mevcut Adres: [Ziyaretçinin Ülkesindeki Adresi]',
        'Sponsor ile İlişkisi: [örn. Ebeveyn, Kardeş, Arkadaş, İş Ortağı]',
      ],
    },
    {
      heading: 'Ziyaretin Amacı ve Süresi',
      content: [
        'Bu ziyaretin amacı [turizm / aile ziyareti / iş / bir etkinliğe katılım / vb.].',
        '',
        'Planlanan Varış Tarihi: [Tarih]',
        'Planlanan Ayrılış Tarihi: [Tarih]',
        'Kalış Süresi: Yaklaşık [X] hafta/ay',
        '',
        '[ÖZELLEŞTİRİN: Ziyaretin özel aktivitelerini, etkinliklerini veya nedenlerini açıklayın]',
      ],
    },
    {
      heading: 'Konaklama',
      content: [
        '[Ziyaretçinin Adı] ziyareti süresince benim ikametgahımda kalacak:',
        '',
        '[Tam Adresiniz]',
        '',
        'Amerika Birleşik Devletleri\'ndeki kalışları süresince rahat bir konaklama sağlayacağım ve refahlarını güvence altına alacağım.',
      ],
    },
    {
      heading: 'Mali Sorumluluk',
      content: [
        'İşbu yazı ile [Ziyaretçinin Adı]\'nın Amerika Birleşik Devletleri\'ndeki kalışı süresince mali olarak sorumlu olacağımı teyit ederim. Aşağıdakiler dahil tüm masrafları karşılayacağım:',
        '',
        '• Gidiş-dönüş uçak bileti (varsa)',
        '• Konaklama',
        '• Yiyecek ve günlük giderler',
        '• ABD içi ulaşım',
        '• Tıbbi acil durumlar (varsa)',
        '• Diğer ek masraflar',
        '',
        '[Şirket Adı]\'nda [İş Unvanınız] olarak çalışmaktayım ve yıllık gelirim $[Miktar]\'dır. Mali yeterliliğimin kanıtını ekliyorum.',
      ],
    },
    {
      heading: 'Sponsorun Göçmenlik Durumu',
      content: [
        'Amerika Birleşik Devletleri\'ndeki göçmenlik durumum:',
        '• Durum: [ABD Vatandaşı / Daimi İkamet Sahibi / Vize Sahibi - türünü belirtin]',
        '• Bu durumda olduğum tarih: [Tarih]',
        '• [Varsa: Yeşil Kart Numarası / Vatandaşlık Sertifikası Numarası]',
      ],
    },
    {
      heading: 'Eklenen Destekleyici Belgeler',
      content: [
        '• ABD Pasaportumun / Yeşil Kartımın / Göçmenlik Belgelerimin kopyası',
        '• Güncel banka hesap özetleri',
        '• İşveren doğrulama mektubu',
        '• Güncel vergi beyannameleri (Form 1040)',
        '• İkamet kanıtı (fatura / kira sözleşmesi)',
      ],
    },
    {
      heading: 'Beyan',
      content: [
        'Bu mektupta verilen tüm bilgilerin doğru ve eksiksiz olduğunu beyan ederim. Yanlış bilgi vermenin ciddi sonuçlara yol açabileceğini anlıyorum.',
        '',
        '[Ziyaretçinin Adı]\'nın tüm ABD göçmenlik yasalarına uyacağından ve izin verilen kalış süresinin dolmasından önce [kendi ülkesine] döneceğinden eminim.',
        '',
        'Ek bilgi gerekirse lütfen benimle iletişime geçmekten çekinmeyin.',
        '',
        'Saygılarımla,',
        '',
        '',
        '____________________________',
        '[Sponsorun İmzası]',
        '',
        '[Sponsorun Adı Soyadı]',
        '[Tarih]',
      ],
    },
  ],
};

// 3. Affidavit of Support Outline
const affidavitSupportEN = {
  title: 'Affidavit of Support - Key Elements Guide',
  filename: 'AffidavitOfSupportOutline-EN.docx',
  sections: [
    {
      heading: 'What is an Affidavit of Support?',
      content: [
        'An Affidavit of Support is a sworn statement by a financial sponsor guaranteeing that they will provide financial support to a visa applicant or immigrant. This document demonstrates that the beneficiary will not become a public charge.',
        '',
        'For nonimmigrant visas (B1/B2, etc.), Form I-134 "Declaration of Financial Support" is typically used.',
        'For immigrant visas (green cards), Form I-864 "Affidavit of Support Under Section 213A of the INA" is required.',
      ],
    },
    {
      heading: 'Key Elements to Include',
      content: [
        '1. SPONSOR INFORMATION',
        '   • Full legal name',
        '   • Date of birth',
        '   • U.S. address',
        '   • Immigration status (U.S. citizen, permanent resident, etc.)',
        '   • Social Security Number',
        '   • Contact information',
        '',
        '2. BENEFICIARY INFORMATION',
        '   • Full legal name',
        '   • Date of birth',
        '   • Country of citizenship',
        '   • Relationship to sponsor',
        '   • Passport number',
        '',
        '3. FINANCIAL INFORMATION',
        '   • Annual income (must meet minimum requirements)',
        '   • Employment details',
        '   • Bank account balances',
        '   • Real estate holdings',
        '   • Other assets (investments, vehicles, etc.)',
        '   • Number of dependents',
        '',
        '4. SUPPORTING DOCUMENTS',
        '   • Most recent tax return (IRS Form 1040)',
        '   • W-2 forms or 1099s',
        '   • Letter from employer stating salary and position',
        '   • Bank statements (3-6 months)',
        '   • Proof of assets',
        '   • Copy of sponsor\'s immigration documents',
      ],
    },
    {
      heading: 'Income Requirements (I-864)',
      content: [
        'For I-864, the sponsor\'s income must be at least 125% of the Federal Poverty Guidelines (100% if sponsor is active duty military).',
        '',
        '2024 Federal Poverty Guidelines (48 contiguous states):',
        '• Household of 2: $24,650 (125% = $30,812)',
        '• Household of 3: $31,075 (125% = $38,844)',
        '• Household of 4: $37,500 (125% = $46,875)',
        '• Add $6,425 for each additional person',
        '',
        'Note: Check current guidelines at https://aspe.hhs.gov/poverty-guidelines',
      ],
    },
    {
      heading: 'Legal Obligations',
      content: [
        'By signing an Affidavit of Support (I-864), the sponsor agrees to:',
        '',
        '• Maintain the beneficiary at an income of at least 125% of the poverty line',
        '• Reimburse any government agency that provides means-tested public benefits',
        '• The obligation continues until the beneficiary becomes a U.S. citizen, earns 40 work quarters, departs the U.S. permanently, or dies',
        '',
        'WARNING: This is a legally enforceable contract. The government or the sponsored immigrant can sue to enforce it.',
      ],
    },
    {
      heading: 'Declaration Template',
      content: [
        'I, [Sponsor\'s Full Name], declare under penalty of perjury under the laws of the United States that:',
        '',
        '1. I am a [U.S. Citizen / Lawful Permanent Resident] of the United States.',
        '',
        '2. I am sponsoring [Beneficiary\'s Full Name] for [visa type / immigrant status].',
        '',
        '3. I have the financial means to support [him/her/them] and will provide financial support as needed to ensure [he/she/they] will not become a public charge.',
        '',
        '4. My annual income is $[Amount], which is [above/at] the required threshold.',
        '',
        '5. I understand that this obligation may be enforced by the sponsored immigrant or any federal, state, or local agency that provides public benefits.',
        '',
        '6. All information provided in this affidavit is true and correct to the best of my knowledge.',
        '',
        '',
        '____________________________',
        'Signature of Sponsor',
        '',
        '[Printed Name]',
        '[Date]',
        '',
        '[Notarization may be required - check specific form instructions]',
      ],
    },
  ],
};

const affidavitSupportTR = {
  title: 'Mali Destek Beyanı - Temel Bileşenler Rehberi',
  filename: 'MaliDestekBeyani-TR.docx',
  sections: [
    {
      heading: 'Mali Destek Beyanı Nedir?',
      content: [
        'Mali Destek Beyanı, finansal sponsorun bir vize başvuru sahibine veya göçmene mali destek sağlayacağını garanti eden yeminli bir beyandır. Bu belge, lehdarın kamu yardımına muhtaç olmayacağını gösterir.',
        '',
        'Göçmen olmayan vizeler (B1/B2, vb.) için genellikle I-134 "Mali Destek Beyanı" formu kullanılır.',
        'Göçmen vizeleri (yeşil kart) için I-864 "INA Bölüm 213A Kapsamında Mali Destek Beyanı" gereklidir.',
      ],
    },
    {
      heading: 'Dahil Edilmesi Gereken Temel Bileşenler',
      content: [
        '1. SPONSOR BİLGİLERİ',
        '   • Tam yasal adı',
        '   • Doğum tarihi',
        '   • ABD adresi',
        '   • Göçmenlik durumu (ABD vatandaşı, daimi ikamet sahibi, vb.)',
        '   • Sosyal Güvenlik Numarası',
        '   • İletişim bilgileri',
        '',
        '2. LEHDAR BİLGİLERİ',
        '   • Tam yasal adı',
        '   • Doğum tarihi',
        '   • Vatandaşlık ülkesi',
        '   • Sponsor ile ilişkisi',
        '   • Pasaport numarası',
        '',
        '3. MALİ BİLGİLER',
        '   • Yıllık gelir (minimum gereksinimleri karşılamalı)',
        '   • İstihdam detayları',
        '   • Banka hesap bakiyeleri',
        '   • Gayrimenkul varlıkları',
        '   • Diğer varlıklar (yatırımlar, araçlar, vb.)',
        '   • Bağımlı sayısı',
        '',
        '4. DESTEKLEYEN BELGELER',
        '   • En son vergi beyannamesi (IRS Form 1040)',
        '   • W-2 formları veya 1099\'lar',
        '   • İşverenden maaş ve pozisyon belirten mektup',
        '   • Banka hesap özetleri (3-6 aylık)',
        '   • Varlık kanıtı',
        '   • Sponsorun göçmenlik belgelerinin kopyası',
      ],
    },
    {
      heading: 'Gelir Gereksinimleri (I-864)',
      content: [
        'I-864 için, sponsorun geliri Federal Yoksulluk Sınırı\'nın en az %125\'i olmalıdır (sponsor aktif görevli asker ise %100).',
        '',
        '2024 Federal Yoksulluk Sınırı Rehberi (48 bitişik eyalet):',
        '• 2 kişilik hane: $24,650 (%125 = $30,812)',
        '• 3 kişilik hane: $31,075 (%125 = $38,844)',
        '• 4 kişilik hane: $37,500 (%125 = $46,875)',
        '• Her ek kişi için $6,425 ekleyin',
        '',
        'Not: Güncel rehber için https://aspe.hhs.gov/poverty-guidelines adresini kontrol edin',
      ],
    },
    {
      heading: 'Yasal Yükümlülükler',
      content: [
        'Mali Destek Beyanı (I-864) imzalayarak, sponsor şunları kabul eder:',
        '',
        '• Lehdarı yoksulluk sınırının en az %125\'i düzeyinde bir gelirle desteklemek',
        '• İhtiyaç testi yapılan kamu yardımları sağlayan herhangi bir devlet kurumuna geri ödeme yapmak',
        '• Yükümlülük, lehdar ABD vatandaşı olana, 40 çalışma çeyreği kazanana, ABD\'den kalıcı olarak ayrılana veya ölene kadar devam eder',
        '',
        'UYARI: Bu yasal olarak uygulanabilir bir sözleşmedir. Hükümet veya sponsor olunan göçmen bunu uygulamak için dava açabilir.',
      ],
    },
    {
      heading: 'Beyan Şablonu',
      content: [
        'Ben, [Sponsorun Adı Soyadı], Amerika Birleşik Devletleri yasaları kapsamında yalan yere yemin cezası altında beyan ederim ki:',
        '',
        '1. Amerika Birleşik Devletleri\'nin [ABD Vatandaşı / Yasal Daimi İkamet Sahibi]yim.',
        '',
        '2. [Lehdarın Adı Soyadı]\'nı [vize türü / göçmen statüsü] için sponsor oluyorum.',
        '',
        '3. [Onu/Onları] destekleyecek mali imkanlara sahibim ve kamu yardımına muhtaç olmamasını sağlamak için gerekli mali desteği sağlayacağım.',
        '',
        '4. Yıllık gelirim $[Miktar] olup, gerekli eşiğin [üzerinde/eşiğinde].',
        '',
        '5. Bu yükümlülüğün sponsor olunan göçmen veya kamu yardımı sağlayan herhangi bir federal, eyalet veya yerel kurum tarafından uygulanabileceğini anlıyorum.',
        '',
        '6. Bu beyanda verilen tüm bilgiler bilgim dahilinde doğru ve eksiksizdir.',
        '',
        '',
        '____________________________',
        'Sponsorun İmzası',
        '',
        '[Adı Soyadı]',
        '[Tarih]',
        '',
        '[Notere onaylatma gerekebilir - özel form talimatlarını kontrol edin]',
      ],
    },
  ],
};

// 4. Child Travel Consent Letter
const travelConsentEN = {
  title: 'Child Travel Consent Letter',
  filename: 'ChildTravelConsentLetter-EN.docx',
  sections: [
    {
      content: [
        'PARENTAL/GUARDIAN CONSENT FOR MINOR CHILD TO TRAVEL',
        '',
        'Date: [Date]',
      ],
    },
    {
      heading: 'Child Information',
      content: [
        'Full Name of Child: [Child\'s Full Legal Name]',
        'Date of Birth: [DOB]',
        'Passport Number: [Number]',
        'Nationality: [Country]',
      ],
    },
    {
      heading: 'Parent/Guardian Information',
      content: [
        'PARENT/GUARDIAN 1:',
        'Full Name: [Full Legal Name]',
        'Relationship to Child: [Mother/Father/Legal Guardian]',
        'Address: [Full Address]',
        'Phone: [Phone Number]',
        'Email: [Email]',
        'Passport/ID Number: [Number]',
        '',
        'PARENT/GUARDIAN 2 (if applicable):',
        'Full Name: [Full Legal Name]',
        'Relationship to Child: [Mother/Father/Legal Guardian]',
        'Address: [Full Address]',
        'Phone: [Phone Number]',
        'Email: [Email]',
        'Passport/ID Number: [Number]',
      ],
    },
    {
      heading: 'Accompanying Adult Information',
      content: [
        'The child will be traveling with:',
        '',
        'Full Name: [Accompanying Adult\'s Name]',
        'Relationship to Child: [e.g., Grandparent, Aunt, Family Friend, etc.]',
        'Address: [Full Address]',
        'Phone: [Phone Number]',
        'Email: [Email]',
        'Passport Number: [Number]',
      ],
    },
    {
      heading: 'Travel Details',
      content: [
        'Destination(s): [Country/Countries]',
        'Departure Date: [Date]',
        'Return Date: [Date]',
        'Purpose of Travel: [Tourism/Family Visit/Education/etc.]',
        '',
        'Flight Information (if known):',
        'Outbound: [Airline, Flight Number, Date]',
        'Return: [Airline, Flight Number, Date]',
        '',
        'Accommodation Address(es):',
        '[Address 1]',
        '[Address 2]',
      ],
    },
    {
      heading: 'Consent Statement',
      content: [
        'I/We, the undersigned parent(s)/legal guardian(s) of [Child\'s Name], hereby grant permission for our child to travel internationally as described above.',
        '',
        'I/We authorize [Accompanying Adult\'s Name] to:',
        '• Travel with and supervise [Child\'s Name] during the trip',
        '• Make decisions regarding the child\'s care during travel',
        '• Authorize emergency medical treatment if necessary and if I/we cannot be reached',
        '• Sign any documents necessary for travel or medical treatment',
        '',
        'This consent is valid from [Start Date] to [End Date].',
      ],
    },
    {
      heading: 'Emergency Contact Information',
      content: [
        'In case of emergency, contact:',
        '',
        'Name: [Emergency Contact Name]',
        'Relationship: [Relationship]',
        'Phone: [Phone Number]',
        'Email: [Email]',
        'Address: [Address]',
      ],
    },
    {
      heading: 'Medical Information',
      content: [
        'Allergies: [List any allergies or "None"]',
        'Current Medications: [List medications or "None"]',
        'Medical Conditions: [List conditions or "None"]',
        'Insurance Provider: [Insurance Company]',
        'Policy Number: [Number]',
        '',
        'Child\'s Physician:',
        'Name: [Doctor\'s Name]',
        'Phone: [Phone Number]',
      ],
    },
    {
      heading: 'Signatures',
      content: [
        'I/We declare that the information provided is true and accurate.',
        '',
        '',
        '____________________________          ____________________________',
        'Parent/Guardian 1 Signature            Parent/Guardian 2 Signature',
        '',
        '[Printed Name]                         [Printed Name]',
        '[Date]                                 [Date]',
        '',
        '',
        'NOTARIZATION (Recommended for international travel):',
        '',
        'State/Country of: _______________',
        'County of: _______________',
        '',
        'Subscribed and sworn before me this ___ day of _________, 20___.',
        '',
        '____________________________',
        'Notary Public',
        'My Commission Expires: _______________',
        '',
        '[NOTARY SEAL]',
      ],
    },
  ],
};

const travelConsentTR = {
  title: 'Çocuk Seyahat İzin Mektubu',
  filename: 'CocukSeyahatIzinMektubu-TR.docx',
  sections: [
    {
      content: [
        'KÜÇÜK ÇOCUĞUN SEYAHATİ İÇİN EBEVEYN/VASİ İZNİ',
        '',
        'Tarih: [Tarih]',
      ],
    },
    {
      heading: 'Çocuk Bilgileri',
      content: [
        'Çocuğun Tam Adı: [Çocuğun Tam Yasal Adı]',
        'Doğum Tarihi: [Doğum Tarihi]',
        'Pasaport Numarası: [Numara]',
        'Uyruk: [Ülke]',
      ],
    },
    {
      heading: 'Ebeveyn/Vasi Bilgileri',
      content: [
        'EBEVEYN/VASİ 1:',
        'Tam Adı: [Tam Yasal Adı]',
        'Çocukla İlişkisi: [Anne/Baba/Yasal Vasi]',
        'Adres: [Tam Adres]',
        'Telefon: [Telefon Numarası]',
        'E-posta: [E-posta]',
        'Pasaport/Kimlik Numarası: [Numara]',
        '',
        'EBEVEYN/VASİ 2 (varsa):',
        'Tam Adı: [Tam Yasal Adı]',
        'Çocukla İlişkisi: [Anne/Baba/Yasal Vasi]',
        'Adres: [Tam Adres]',
        'Telefon: [Telefon Numarası]',
        'E-posta: [E-posta]',
        'Pasaport/Kimlik Numarası: [Numara]',
      ],
    },
    {
      heading: 'Refakatçi Yetişkin Bilgileri',
      content: [
        'Çocuk şu kişiyle seyahat edecek:',
        '',
        'Tam Adı: [Refakatçi Yetişkinin Adı]',
        'Çocukla İlişkisi: [örn. Büyükanne/Büyükbaba, Teyze/Hala, Aile Dostu, vb.]',
        'Adres: [Tam Adres]',
        'Telefon: [Telefon Numarası]',
        'E-posta: [E-posta]',
        'Pasaport Numarası: [Numara]',
      ],
    },
    {
      heading: 'Seyahat Detayları',
      content: [
        'Varış Noktası/Noktaları: [Ülke/Ülkeler]',
        'Gidiş Tarihi: [Tarih]',
        'Dönüş Tarihi: [Tarih]',
        'Seyahat Amacı: [Turizm/Aile Ziyareti/Eğitim/vb.]',
        '',
        'Uçuş Bilgileri (biliniyorsa):',
        'Gidiş: [Havayolu, Uçuş Numarası, Tarih]',
        'Dönüş: [Havayolu, Uçuş Numarası, Tarih]',
        '',
        'Konaklama Adresi/Adresleri:',
        '[Adres 1]',
        '[Adres 2]',
      ],
    },
    {
      heading: 'İzin Beyanı',
      content: [
        'Ben/Biz, [Çocuğun Adı]\'nın aşağıda imzası bulunan ebeveyni/yasal vasisi olarak, çocuğumuzun yukarıda açıklandığı şekilde uluslararası seyahat etmesine izin veriyorum/veriyoruz.',
        '',
        '[Refakatçi Yetişkinin Adı]\'na aşağıdaki yetkileri veriyorum/veriyoruz:',
        '• Seyahat süresince [Çocuğun Adı] ile seyahat etmek ve gözetim altında tutmak',
        '• Seyahat sırasında çocuğun bakımına ilişkin kararlar almak',
        '• Gerekirse ve ben/biz ulaşılamazsa acil tıbbi tedavi yetkilendirmek',
        '• Seyahat veya tıbbi tedavi için gerekli belgeleri imzalamak',
        '',
        'Bu izin [Başlangıç Tarihi]\'nden [Bitiş Tarihi]\'ne kadar geçerlidir.',
      ],
    },
    {
      heading: 'Acil Durum İletişim Bilgileri',
      content: [
        'Acil durumda iletişim:',
        '',
        'Ad: [Acil Durum İletişim Kişisi Adı]',
        'İlişki: [İlişki]',
        'Telefon: [Telefon Numarası]',
        'E-posta: [E-posta]',
        'Adres: [Adres]',
      ],
    },
    {
      heading: 'Sağlık Bilgileri',
      content: [
        'Alerjiler: [Alerjileri listeleyin veya "Yok"]',
        'Mevcut İlaçlar: [İlaçları listeleyin veya "Yok"]',
        'Sağlık Durumları: [Durumları listeleyin veya "Yok"]',
        'Sigorta Şirketi: [Sigorta Şirketi]',
        'Poliçe Numarası: [Numara]',
        '',
        'Çocuğun Doktoru:',
        'Ad: [Doktorun Adı]',
        'Telefon: [Telefon Numarası]',
      ],
    },
    {
      heading: 'İmzalar',
      content: [
        'Verilen bilgilerin doğru ve eksiksiz olduğunu beyan ederim/ederiz.',
        '',
        '',
        '____________________________          ____________________________',
        'Ebeveyn/Vasi 1 İmzası                  Ebeveyn/Vasi 2 İmzası',
        '',
        '[Adı Soyadı]                           [Adı Soyadı]',
        '[Tarih]                                [Tarih]',
        '',
        '',
        'NOTERLİK ONAYI (Uluslararası seyahat için önerilir):',
        '',
        'Ülke/Şehir: _______________',
        'İlçe: _______________',
        '',
        'İşbu belge benim önümde ___ / _________ / 20___ tarihinde imzalanmış ve yeminle doğrulanmıştır.',
        '',
        '____________________________',
        'Noter',
        'Komisyonum Sona Eriyor: _______________',
        '',
        '[NOTER MÜHRİ]',
      ],
    },
  ],
};

// 5. Consulate Appointment Request
const consulateRequestEN = {
  title: 'Consulate Appointment Request Letter',
  filename: 'ConsulateAppointmentRequest-EN.docx',
  sections: [
    {
      content: [
        '[Your Full Name]',
        '[Your Address]',
        '[City, State, ZIP Code]',
        '[Phone Number]',
        '[Email Address]',
        '',
        '[Date]',
        '',
        'Consulate General of [Country]',
        '[Consulate Address]',
        '[City, State, ZIP Code]',
        '',
        'Subject: Request for Appointment – [Service Type]',
        '',
        'Dear Sir/Madam,',
      ],
    },
    {
      heading: 'Purpose of Request',
      content: [
        'I am writing to respectfully request an appointment at the Consulate General of [Country] in [City] for the following consular service:',
        '',
        '☐ Passport Application / Renewal',
        '☐ Visa Application',
        '☐ Civil Registration (Birth/Marriage/Death)',
        '☐ Document Legalization / Apostille',
        '☐ Power of Attorney (Vekaletname)',
        '☐ Notarial Services',
        '☐ Citizenship Services',
        '☐ Other: [Specify]',
      ],
    },
    {
      heading: 'Applicant Information',
      content: [
        'Full Name: [Your Full Legal Name]',
        'Date of Birth: [DOB]',
        'Place of Birth: [City, Country]',
        'Nationality: [Country]',
        'Passport Number: [Number]',
        'Passport Expiry Date: [Date]',
        'Current Address: [Full Address]',
        'Phone Number: [Number]',
        'Email: [Email]',
      ],
    },
    {
      heading: 'Service Details',
      content: [
        'Please provide details about the specific service you are requesting:',
        '',
        '[CUSTOMIZE: Describe the specific service needed, documents to be processed, or action required]',
        '',
        'Preferred Appointment Date(s):',
        '• First Choice: [Date and Time]',
        '• Second Choice: [Date and Time]',
        '• Third Choice: [Date and Time]',
      ],
    },
    {
      heading: 'Documents Prepared',
      content: [
        'I have prepared the following documents for my appointment:',
        '',
        '☐ Valid passport (original + copy)',
        '☐ National ID card (original + copy)',
        '☐ Passport-size photographs',
        '☐ Completed application form',
        '☐ Proof of address',
        '☐ [Other relevant documents]',
        '',
        '[List any additional documents specific to your request]',
      ],
    },
    {
      heading: 'Urgency (if applicable)',
      content: [
        '☐ This is a standard request',
        '☐ This is an urgent request due to: [Explain reason]',
        '',
        '[If urgent, provide documentation supporting the urgency, such as travel tickets, medical documents, or other relevant evidence]',
      ],
    },
    {
      heading: 'Contact Information',
      content: [
        'I can be reached at:',
        '',
        'Phone: [Your Phone Number]',
        'Email: [Your Email]',
        'Best time to contact: [Morning/Afternoon/Evening]',
        '',
        'Alternative Contact:',
        'Name: [Name]',
        'Phone: [Number]',
        'Relationship: [Relationship]',
      ],
    },
    {
      heading: 'Closing',
      content: [
        'Thank you for your attention to this request. I am prepared to provide any additional documentation or information that may be required. Please confirm my appointment at your earliest convenience.',
        '',
        'Respectfully,',
        '',
        '',
        '____________________________',
        '[Your Signature]',
        '',
        '[Your Printed Name]',
        '[Date]',
        '',
        '',
        'Enclosures:',
        '• [List any documents attached to this request]',
      ],
    },
  ],
};

const consulateRequestTR = {
  title: 'Konsolosluk Randevu Talep Mektubu',
  filename: 'KonsoloslukRandevuTalebi-TR.docx',
  sections: [
    {
      content: [
        '[Adınız Soyadınız]',
        '[Adresiniz]',
        '[Şehir, Eyalet, Posta Kodu]',
        '[Telefon Numarası]',
        '[E-posta Adresi]',
        '',
        '[Tarih]',
        '',
        '[Ülke] Başkonsolosluğu',
        '[Konsolosluk Adresi]',
        '[Şehir, Eyalet, Posta Kodu]',
        '',
        'Konu: Randevu Talebi – [Hizmet Türü]',
        '',
        'Sayın Yetkili,',
      ],
    },
    {
      heading: 'Talep Amacı',
      content: [
        '[Şehir]\'deki [Ülke] Başkonsolosluğu\'nda aşağıdaki konsolosluk hizmeti için saygılarımla randevu talep ediyorum:',
        '',
        '☐ Pasaport Başvurusu / Yenileme',
        '☐ Vize Başvurusu',
        '☐ Nüfus Kayıt İşlemleri (Doğum/Evlilik/Ölüm)',
        '☐ Belge Tasdiki / Apostil',
        '☐ Vekaletname',
        '☐ Noterlik Hizmetleri',
        '☐ Vatandaşlık İşlemleri',
        '☐ Diğer: [Belirtin]',
      ],
    },
    {
      heading: 'Başvuru Sahibi Bilgileri',
      content: [
        'Ad Soyad: [Tam Yasal Adınız]',
        'Doğum Tarihi: [Doğum Tarihi]',
        'Doğum Yeri: [Şehir, Ülke]',
        'Uyruk: [Ülke]',
        'Pasaport Numarası: [Numara]',
        'Pasaport Son Geçerlilik Tarihi: [Tarih]',
        'Mevcut Adres: [Tam Adres]',
        'Telefon Numarası: [Numara]',
        'E-posta: [E-posta]',
      ],
    },
    {
      heading: 'Hizmet Detayları',
      content: [
        'Talep ettiğiniz hizmetle ilgili detayları belirtin:',
        '',
        '[ÖZELLEŞTİRİN: İhtiyaç duyulan hizmeti, işlenecek belgeleri veya gerekli işlemi açıklayın]',
        '',
        'Tercih Edilen Randevu Tarihi/Tarihleri:',
        '• Birinci Tercih: [Tarih ve Saat]',
        '• İkinci Tercih: [Tarih ve Saat]',
        '• Üçüncü Tercih: [Tarih ve Saat]',
      ],
    },
    {
      heading: 'Hazırlanan Belgeler',
      content: [
        'Randevum için aşağıdaki belgeleri hazırladım:',
        '',
        '☐ Geçerli pasaport (asıl + kopya)',
        '☐ Nüfus cüzdanı (asıl + kopya)',
        '☐ Vesikalık fotoğraflar',
        '☐ Doldurulmuş başvuru formu',
        '☐ İkametgah belgesi',
        '☐ [Diğer ilgili belgeler]',
        '',
        '[Talebinize özel ek belgeleri listeleyin]',
      ],
    },
    {
      heading: 'Aciliyet (varsa)',
      content: [
        '☐ Bu standart bir taleptir',
        '☐ Bu acil bir taleptir, nedeni: [Nedenini açıklayın]',
        '',
        '[Acil ise, seyahat biletleri, tıbbi belgeler veya diğer ilgili kanıtlar gibi aciliyeti destekleyen belgeler sağlayın]',
      ],
    },
    {
      heading: 'İletişim Bilgileri',
      content: [
        'Bana aşağıdaki yollarla ulaşabilirsiniz:',
        '',
        'Telefon: [Telefon Numaranız]',
        'E-posta: [E-postanız]',
        'İletişim için en uygun zaman: [Sabah/Öğleden Sonra/Akşam]',
        '',
        'Alternatif İletişim:',
        'Ad: [Ad]',
        'Telefon: [Numara]',
        'İlişki: [İlişki]',
      ],
    },
    {
      heading: 'Kapanış',
      content: [
        'Bu talebe gösterdiğiniz ilgi için teşekkür ederim. Gerekli olabilecek ek belge veya bilgileri sağlamaya hazırım. Lütfen en kısa zamanda randevumu onaylayın.',
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
        'Ekler:',
        '• [Bu talebe eklenen belgeleri listeleyin]',
      ],
    },
  ],
};

// Generate all documents
async function generateAll() {
  console.log('Generating immigration letter templates...\n');

  await createDocument(visaCoverLetterEN.title, visaCoverLetterEN.sections, visaCoverLetterEN.filename);
  await createDocument(visaCoverLetterTR.title, visaCoverLetterTR.sections, visaCoverLetterTR.filename);

  await createDocument(sponsorLetterEN.title, sponsorLetterEN.sections, sponsorLetterEN.filename);
  await createDocument(sponsorLetterTR.title, sponsorLetterTR.sections, sponsorLetterTR.filename);

  await createDocument(affidavitSupportEN.title, affidavitSupportEN.sections, affidavitSupportEN.filename);
  await createDocument(affidavitSupportTR.title, affidavitSupportTR.sections, affidavitSupportTR.filename);

  await createDocument(travelConsentEN.title, travelConsentEN.sections, travelConsentEN.filename);
  await createDocument(travelConsentTR.title, travelConsentTR.sections, travelConsentTR.filename);

  await createDocument(consulateRequestEN.title, consulateRequestEN.sections, consulateRequestEN.filename);
  await createDocument(consulateRequestTR.title, consulateRequestTR.sections, consulateRequestTR.filename);

  console.log('\nAll templates generated successfully!');
}

generateAll().catch(console.error);
