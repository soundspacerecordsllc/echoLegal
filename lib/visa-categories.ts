// lib/visa-categories.ts

export interface VisaCategory {
  slug: string
  code: string
  titleEn: string
  titleTr: string
  shortDescEn: string
  shortDescTr: string
  icon: string
  // Full content for individual pages
  whatIsEn: string
  whatIsTr: string
  suitableForEn: string[]
  suitableForTr: string[]
  doesNotAllowEn: string[]
  doesNotAllowTr: string[]
  commonMistakesEn: string[]
  commonMistakesTr: string[]
  greenCardPathEn: { answer: 'yes' | 'no' | 'indirect'; explanation: string }
  greenCardPathTr: { answer: 'evet' | 'hayır' | 'dolaylı'; explanation: string }
  strategicNotesEn: string
  strategicNotesTr: string
  uscisUrl: string
}

export const visaCategories: VisaCategory[] = [
  {
    slug: 'b1-b2',
    code: 'B-1/B-2',
    titleEn: 'Business & Tourist Visa',
    titleTr: 'İş ve Turist Vizesi',
    shortDescEn: 'Temporary entry for business meetings, tourism, or medical treatment.',
    shortDescTr: 'İş toplantıları, turizm veya tedavi amacıyla ABD\'ye geçici giriş imkanı tanır.',
    icon: '✈️',
    whatIsEn: 'The B-1/B-2 visa is the most common non-immigrant visa issued by the United States. B-1 covers temporary business activities such as attending meetings, conferences, or negotiating contracts. B-2 covers tourism, visiting family, or receiving medical treatment. These are often issued as a combined B-1/B-2 visa, giving holders flexibility for both purposes.',
    whatIsTr: 'B-1/B-2, ABD\'nin en yaygın göçmen olmayan (non-immigrant) vize kategorisidir. B-1 vizesi; iş toplantıları, konferanslar ve sözleşme müzakereleri gibi geçici ticari faaliyetlere yöneliktir. B-2 vizesi ise turizm, aile ziyareti ve tıbbi tedavi amaçlı girişleri kapsar. Uygulamada bu iki vize genellikle birleşik B-1/B-2 olarak düzenlenir; böylece hamili her iki amaçla da ABD\'ye girebilir.',
    suitableForEn: [
      'Attending business meetings, trade fairs, or conferences',
      'Negotiating contracts (but not executing work)',
      'Tourism and sightseeing',
      'Visiting family or friends',
      'Receiving medical treatment',
      'Participating in amateur sports or musical events (without pay)'
    ],
    suitableForTr: [
      'İş toplantıları, ticaret fuarları veya konferanslara katılım',
      'Sözleşme müzakereleri (fiili iş yürütme hariç)',
      'Turizm ve gezi amaçlı seyahat',
      'Aile veya arkadaş ziyareti',
      'Tıbbi tedavi amacıyla giriş',
      'Amatör spor veya müzik etkinliklerine katılım (ücret almaksızın)'
    ],
    doesNotAllowEn: [
      'Any form of employment or paid work in the US',
      'Enrolling in academic courses or degree programs',
      'Establishing permanent residence',
      'Operating or managing a US-based business day-to-day',
      'Receiving salary or compensation from US sources'
    ],
    doesNotAllowTr: [
      'ABD\'de her türlü istihdam veya ücretli çalışma',
      'Akademik ders veya diploma programlarına kayıt',
      'Kalıcı ikamet tesis etme',
      'ABD merkezli bir işletmenin günlük yönetimi',
      'ABD kaynaklarından maaş veya herhangi bir ücret tahsili'
    ],
    commonMistakesEn: [
      'Overstaying the authorized period (check your I-94, not the visa sticker)',
      'Working remotely for US clients while physically in the US on B-1/B-2',
      'Applying with unclear purpose or insufficient ties to home country',
      'Misrepresenting intent at the border or during interview',
      'Assuming the visa allows repeated long stays without genuine purpose'
    ],
    commonMistakesTr: [
      'Kalış süresinin aşılması (vize etiketine değil, I-94 kaydına bakılmalıdır)',
      'B-1/B-2 statüsüyle ABD\'de bulunurken ABD müşterilerine uzaktan çalışma yapılması',
      'Ziyaret amacının belirsiz bırakılması veya ülkeyle güçlü bağ gösterilememesi',
      'Sınır geçişinde ya da mülakatta gerçek niyetin gizlenmesi veya yanlış beyanı',
      'Vizenin somut bir gerekçe olmaksızın tekrarlayan uzun kalışlara imkan verdiğinin sanılması'
    ],
    greenCardPathEn: {
      answer: 'no',
      explanation: 'B-1/B-2 is strictly a non-immigrant visa with no direct path to permanent residence. Applying for a green card while on B status can raise concerns about original intent.'
    },
    greenCardPathTr: {
      answer: 'hayır',
      explanation: 'B-1/B-2 yalnızca geçici giriş amacıyla düzenlenen bir vizedir; kalıcı oturma iznine doğrudan bir geçiş yolu yoktur. B statüsündeyken yeşil kart başvurusu yapılması, ilk girişteki gerçek niyetin sorgulanmasına neden olabilir.'
    },
    strategicNotesEn: 'The B-1/B-2 visa is best viewed as a tool for short-term, specific purposes rather than a flexible long-term presence option. US Customs and Border Protection officers have wide discretion at ports of entry and may deny entry to frequent visitors who appear to be living in the US or working without authorization.',
    strategicNotesTr: 'B-1/B-2, uzun süreli veya esnek bir ABD varlığı aracı olarak değil, kısa süreli ve belirli bir amaca yönelik bir vize olarak değerlendirilmelidir. ABD Gümrük ve Sınır Koruma (CBP) yetkilileri giriş noktalarında geniş takdir yetkisine sahiptir. Sık seyahat eden ve ABD\'de fiilen ikamet ettiği veya izinsiz çalıştığı izlenimi veren ziyaretçilerin girişi reddedilebilir.',
    uscisUrl: 'https://www.uscis.gov/visit-the-united-states'
  },
  {
    slug: 'f1',
    code: 'F-1',
    titleEn: 'Student Visa',
    titleTr: 'Öğrenci Vizesi',
    shortDescEn: 'Full-time academic study at accredited US institutions.',
    shortDescTr: 'ABD\'deki akredite eğitim kurumlarında tam zamanlı akademik öğrenim.',
    icon: '🎓',
    whatIsEn: 'The F-1 visa allows foreign nationals to pursue full-time academic study at accredited US colleges, universities, seminaries, conservatories, high schools, language training programs, or other academic institutions. Students must be enrolled in a program that results in a degree, diploma, or certificate. The F-1 status includes provisions for limited on-campus employment and practical training opportunities.',
    whatIsTr: 'F-1 vizesi, yabancı uyruklu kişilerin ABD\'deki akredite kolejler, üniversiteler, konservatuarlar, liseler ve dil eğitim programları gibi akademik kurumlarda tam zamanlı öğrenim görmesine olanak tanır. Kayıtlı olunan programın derece, diploma veya sertifika ile sonuçlanması zorunludur. F-1 statüsü çerçevesinde sınırlı kampüs içi çalışma ve pratik eğitim (OPT/CPT) imkanları da mevcuttur.',
    suitableForEn: [
      'Pursuing a degree at a US university (bachelor\'s, master\'s, doctorate)',
      'Attending accredited language training programs',
      'High school students in exchange or private programs',
      'Those seeking OPT (Optional Practical Training) work experience after graduation',
      'Individuals committed to returning home after studies'
    ],
    suitableForTr: [
      'ABD üniversitesinde lisans, yüksek lisans veya doktora yapacak öğrenciler',
      'Akredite dil eğitim programlarına katılacak kişiler',
      'Değişim veya özel programlarla gelen lise öğrencileri',
      'Mezuniyet sonrası OPT kapsamında iş deneyimi edinmek isteyenler',
      'Eğitim tamamlandığında ülkesine dönme niyetinde olan kişiler'
    ],
    doesNotAllowEn: [
      'Working off-campus without specific authorization (CPT or OPT)',
      'Dropping below full-time enrollment without approval',
      'Remaining in the US indefinitely after program completion',
      'Transferring to a new school without proper SEVIS procedures',
      'Accepting employment unrelated to field of study during OPT'
    ],
    doesNotAllowTr: [
      'CPT veya OPT izni olmaksızın kampüs dışında çalışma',
      'Onay almadan tam zamanlı ders yükünün altına düşme',
      'Program sona erdikten sonra ABD\'de süresiz kalma',
      'SEVIS prosedürleri tamamlanmadan okul transferi',
      'OPT döneminde eğitim alanıyla ilgisiz bir işte çalışma'
    ],
    commonMistakesEn: [
      'Working more than 20 hours per week on-campus during school sessions',
      'Not maintaining full-time course load without DSO approval',
      'Failing to report address changes to the school within 10 days',
      'Starting unauthorized employment before OPT approval',
      'Not applying for OPT within the required timeframe'
    ],
    commonMistakesTr: [
      'Ders döneminde kampüs içinde haftalık 20 saati aşan çalışma',
      'DSO onayı alınmadan tam zamanlı ders yükünün korunamaması',
      'Adres değişikliğinin 10 gün içinde okula bildirilmemesi',
      'OPT onayı gelmeden çalışmaya başlanması',
      'OPT başvurusunun belirlenen süre içinde yapılmaması'
    ],
    greenCardPathEn: {
      answer: 'indirect',
      explanation: 'F-1 itself does not lead to a green card. However, OPT or STEM OPT can lead to H-1B sponsorship, which can then lead to employer-sponsored permanent residence. This is a common pathway but requires employer willingness and petition.'
    },
    greenCardPathTr: {
      answer: 'dolaylı',
      explanation: 'F-1 vizesi tek başına kalıcı oturma iznine yol açmaz. Ancak OPT veya STEM OPT aracılığıyla H-1B sponsorluğu elde edilebilir; bu da işveren destekli yeşil kart sürecini başlatabilir. Sık başvurulan bir yol olmakla birlikte işverenin sponsorluk iradesine ve dilekçe sürecine bağlıdır.'
    },
    strategicNotesEn: 'F-1 is often the entry point for those planning a longer-term US career path. The STEM OPT extension (up to 3 years total work authorization) provides valuable time for H-1B lottery attempts. However, the path from F-1 to permanent residence is neither guaranteed nor straightforward.',
    strategicNotesTr: 'F-1, ABD\'de uzun vadeli kariyer hedefleyenler için sıklıkla ilk adımdır. STEM OPT uzatması toplam üç yıla kadar çalışma izni sağladığından, H-1B çekilişlerine katılım için kritik bir zaman aralığı yaratır. Bununla birlikte F-1\'den kalıcı oturma iznine giden süreç ne garantili ne de doğrusaldır.',
    uscisUrl: 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/students-and-employment'
  },
  {
    slug: 'h1b',
    code: 'H-1B',
    titleEn: 'Specialty Occupation Visa',
    titleTr: 'Uzmanlık Meslek Vizesi',
    shortDescEn: 'Employment in specialty occupations requiring at least a bachelor\'s degree.',
    shortDescTr: 'Asgari lisans diploması gerektiren uzmanlık alanlarında çalışma izni.',
    icon: '💼',
    whatIsEn: 'The H-1B visa is a non-immigrant visa that allows US employers to temporarily employ foreign workers in specialty occupations. A specialty occupation requires theoretical and practical application of a body of highly specialized knowledge and at least a bachelor\'s degree (or equivalent) in the specific specialty. The H-1B is subject to an annual cap with a lottery system, though cap-exempt employers exist.',
    whatIsTr: 'H-1B, ABD işverenlerinin uzmanlık gerektiren pozisyonlarda yabancı uyruklu çalışanları geçici olarak istihdam etmesini sağlayan göçmen olmayan bir vizedir. Uzmanlık mesleği kavramı; ileri düzey teorik ve uygulamalı bilgi birikimi ile ilgili alanda en az lisans derecesi (veya dengi) şartını içerir. H-1B yıllık kontenjan sınırlamasına tabidir ve başvurular çekiliş (lottery) yoluyla değerlendirilir; ancak üniversiteler ve araştırma kuruluşları gibi bazı işverenler bu kotadan muaftır.',
    suitableForEn: [
      'Engineers, software developers, and IT professionals',
      'Scientists and researchers',
      'Accountants, financial analysts, and business specialists',
      'Architects and designers with specialized degrees',
      'Healthcare professionals (physicians, therapists with appropriate credentials)',
      'University professors and academic researchers'
    ],
    suitableForTr: [
      'Mühendisler, yazılım geliştiriciler ve bilgi teknolojileri uzmanları',
      'Bilim insanları ve araştırmacılar',
      'Muhasebeciler, finans analistleri ve iş dünyası uzmanları',
      'İlgili alanda uzmanlık derecesine sahip mimarlar ve tasarımcılar',
      'Gerekli mesleki yeterliliğe sahip doktorlar ve terapistler',
      'Üniversite öğretim üyeleri ve akademik araştırmacılar'
    ],
    doesNotAllowEn: [
      'Self-employment or freelance work without proper corporate structure',
      'Working for any employer other than the H-1B sponsor',
      'Changing employers without filing a new H-1B petition',
      'Working in a position that doesn\'t match the approved petition',
      'Remaining in the US without valid status after employment ends'
    ],
    doesNotAllowTr: [
      'Uygun şirket yapısı kurulmadan serbest meslek veya bağımsız çalışma',
      'H-1B sponsoru dışındaki bir işveren bünyesinde çalışma',
      'Yeni bir H-1B dilekçesi sunulmadan işveren değişikliği',
      'Onaylanan dilekçedeki pozisyondan farklı bir görevde çalışma',
      'İş ilişkisi sona erdikten sonra geçerli statü olmaksızın ABD\'de kalma'
    ],
    commonMistakesEn: [
      'Not understanding the H-1B lottery timeline and registration requirements',
      'Starting work before receiving approval notice (unless using cap-gap or portability)',
      'Failing to maintain specialty occupation requirements throughout employment',
      'Not timely filing extensions before current H-1B period expires',
      'Assuming H-1B automatically leads to permanent residence'
    ],
    commonMistakesTr: [
      'H-1B çekiliş takvimini ve kayıt koşullarını yeterince takip etmemek',
      'Onay bildirimi alınmadan işe başlamak (cap-gap veya portability istisnası yoksa)',
      'Çalışma süresince uzmanlık mesleği niteliklerinin korunmaması',
      'Mevcut H-1B süresinin bitiminden önce uzatma başvurusunun zamanında yapılmaması',
      'H-1B\'nin kendiliğinden kalıcı oturma iznine dönüşeceğinin varsayılması'
    ],
    greenCardPathEn: {
      answer: 'yes',
      explanation: 'H-1B holders are explicitly allowed "dual intent," meaning they can pursue permanent residence while maintaining H-1B status. Employer-sponsored green cards through PERM labor certification are the most common pathway. H-1B can be extended beyond 6 years while a green card is pending.'
    },
    greenCardPathTr: {
      answer: 'evet',
      explanation: 'H-1B sahipleri hukuken "çifte niyet" (dual intent) hakkına sahiptir; yani H-1B statüsünü sürdürürken aynı anda kalıcı oturum başvurusu yapabilirler. En yaygın yol, PERM iş gücü sertifikasyonu aracılığıyla işveren sponsorluğunda yeşil kart başvurusudur. Yeşil kart süreci devam ettiği sürece H-1B altı yıllık sürenin ötesine uzatılabilir.'
    },
    strategicNotesEn: 'The H-1B remains the primary work visa for professional occupations but faces significant demand exceeding supply. The lottery system means selection is not guaranteed regardless of qualifications. Multiple employers can register the same individual, and universities/research institutions are cap-exempt. Processing times and premium processing availability vary.',
    strategicNotesTr: 'H-1B, nitelikli profesyoneller için ABD\'nin temel çalışma vizesi olmaya devam etmektedir; ancak talep kontenjandan çok daha yüksektir. Çekiliş sistemi nedeniyle adayın nitelikleri ne olursa olsun seçilme garantisi yoktur. Aynı kişi birden fazla işveren tarafından sisteme kaydettirilebilir. Üniversiteler ve araştırma kuruluşları kontenjan dışı tutulmuştur. İşlem süreleri ve öncelikli (premium) işlem imkanı döneme göre değişkenlik gösterir.',
    uscisUrl: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations'
  },
  {
    slug: 'l1',
    code: 'L-1',
    titleEn: 'Intracompany Transfer Visa',
    titleTr: 'Şirket İçi Transfer Vizesi',
    shortDescEn: 'Transfer of executives, managers, or specialized knowledge employees within multinational companies.',
    shortDescTr: 'Çok uluslu şirketlerde üst düzey yönetici, müdür veya özel bilgiye sahip personelin ABD ofisine transferi.',
    icon: '🏢',
    whatIsEn: 'The L-1 visa enables multinational companies to transfer certain employees from foreign offices to US offices. L-1A is for executives and managers, while L-1B is for employees with specialized knowledge of the company\'s products, services, or procedures. The employee must have worked for the foreign company for at least one continuous year within the three years preceding the transfer.',
    whatIsTr: 'L-1 vizesi, çok uluslu kuruluşların belirli çalışanlarını yurt dışı ofislerinden ABD ofislerine nakletmesine imkan tanır. L-1A üst düzey yöneticiler ve müdürler için; L-1B ise şirketin ürün, hizmet veya iç süreçleri hakkında özel bilgi birikimine sahip çalışanlar için öngörülmüştür. Adayın, transfer tarihinden önceki üç yıl içinde en az bir yıl kesintisiz olarak ilgili yabancı şirkette çalışmış olması şarttır.',
    suitableForEn: [
      'Executives managing major functions or divisions',
      'Managers who supervise professional staff or manage essential functions',
      'Employees with proprietary knowledge of company systems or processes',
      'Companies establishing new US offices (with limitations)',
      'Multinational corporations with qualifying relationships between entities'
    ],
    suitableForTr: [
      'Şirketin temel işlev veya bölümlerini yöneten üst düzey yöneticiler',
      'Profesyonel kadroyu denetleyen ya da kritik fonksiyonları idare eden müdürler',
      'Şirketin sistem veya süreçleri hakkında kendine özgü bilgi birikimine sahip personel',
      'ABD\'de yeni ofis açmak isteyen şirketler (belirli sınırlamalar dahilinde)',
      'Birimler arasında hukuken geçerli bağlantılara sahip çok uluslu kuruluşlar'
    ],
    doesNotAllowEn: [
      'Working for companies outside the multinational organization',
      'Individuals who haven\'t completed one year with the foreign company',
      'Positions that don\'t genuinely qualify as executive, managerial, or specialized knowledge',
      'Using L-1 as a way to staff entry-level positions',
      'New office L-1s beyond initial limitations without demonstrating business growth'
    ],
    doesNotAllowTr: [
      'Çok uluslu yapı dışındaki şirketlerde çalışma',
      'Yurt dışı şirkette bir yıllık sürekli çalışma şartını karşılamayan adaylar',
      'Gerçek anlamda yönetici, müdür veya özel bilgi niteliği taşımayan pozisyonlar',
      'L-1\'in giriş seviyesi kadro ihtiyacını karşılamak amacıyla kullanılması',
      'Ticari büyüme kanıtlanmadan yeni ofis L-1 başvurusunun başlangıç koşullarının ötesine taşınması'
    ],
    commonMistakesEn: [
      'Overstating the managerial or executive nature of the position',
      'Insufficient documentation of the qualifying relationship between companies',
      'New office petitions without realistic business plans showing ability to support the position',
      'Not meeting the one-year foreign employment requirement',
      'Confusing specialized knowledge with general industry expertise'
    ],
    commonMistakesTr: [
      'Pozisyonun yöneticilik veya üst düzey niteliğinin olduğundan fazla gösterilmesi',
      'Şirketler arası hukuki ilişkinin yeterli belgeyle desteklenmemesi',
      'Pozisyonu sürdürebilecek kapasiteyi gösteren gerçekçi bir iş planı olmadan yeni ofis dilekçesi sunulması',
      'Bir yıllık yurt dışı çalışma koşulunun sağlanamaması',
      'Şirkete özgü bilgi (specialized knowledge) ile genel sektör deneyiminin birbirine karıştırılması'
    ],
    greenCardPathEn: {
      answer: 'yes',
      explanation: 'L-1A holders (executives and managers) may qualify for EB-1C green cards without labor certification, making this one of the faster paths to permanent residence. L-1B holders typically go through PERM labor certification like H-1B holders.'
    },
    greenCardPathTr: {
      answer: 'evet',
      explanation: 'L-1A sahipleri (üst düzey yöneticiler ve müdürler), iş gücü sertifikasyonuna gerek kalmaksızın EB-1C kategorisinde yeşil kart başvurusu yapabilir. Bu, kalıcı oturma iznine ulaşmanın en hızlı yollarından biridir. L-1B sahipleri ise genellikle H-1B sahipleri gibi PERM iş gücü sertifikasyonu sürecinden geçmek durumundadır.'
    },
    strategicNotesEn: 'L-1 is particularly valuable for multinational companies and their employees because it\'s not subject to annual caps like H-1B. The L-1A to EB-1C pathway is one of the most efficient routes to permanent residence for qualifying executives and managers. However, USCIS scrutiny of L-1B (specialized knowledge) petitions has increased significantly.',
    strategicNotesTr: 'L-1, çok uluslu şirketler ve çalışanları açısından stratejik öneme sahiptir; zira H-1B\'den farklı olarak yıllık kontenjan sınırlamasına tabi değildir. L-1A\'dan EB-1C\'ye uzanan süreç, uygun nitelikteki yöneticiler için kalıcı oturma iznine giden en etkin rotalardan biridir. Ancak USCIS\'in L-1B (özel bilgi) dilekçelerine yönelik denetimi son yıllarda belirgin biçimde sıkılaşmıştır.',
    uscisUrl: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1a-intracompany-transferee-executive-or-manager'
  },
  {
    slug: 'e2',
    code: 'E-2',
    titleEn: 'Treaty Investor Visa',
    titleTr: 'Anlaşmalı Ülke Yatırımcı Vizesi',
    shortDescEn: 'Investment in and direction of a US business by treaty country nationals.',
    shortDescTr: 'Anlaşmalı ülke vatandaşlarının ABD\'de işletme kurması, yatırım yapması ve yönetmesi.',
    icon: '💰',
    whatIsEn: 'The E-2 visa allows nationals of treaty countries to enter the United States to invest in and direct a US business. Turkey is a treaty country with the US, making Turkish citizens eligible. The investment must be "substantial" relative to the total cost of the business, and the investor must be coming to develop and direct the enterprise. The business must be real and operating, not marginal.',
    whatIsTr: 'E-2 vizesi, ABD ile yatırım anlaşması bulunan ülkelerin vatandaşlarına ABD\'de işletme kurup yönetme imkanı tanır. Türkiye bu anlaşmaya taraf olduğundan Türk vatandaşları E-2\'ye başvurabilir. Yatırımın, işletmenin niteliğine oranla "esaslı" (substantial) kabul edilecek düzeyde olması gerekir. Yatırımcının işletmeyi bizzat geliştirmek ve yönetmek amacıyla gelmesi şarttır. İşletme gerçek, faal ve yalnızca yatırımcının geçimini sağlamaktan öte bir ekonomik katkıya sahip olmalıdır.',
    suitableForEn: [
      'Entrepreneurs starting or acquiring a US business',
      'Turkish nationals with substantial capital to invest',
      'Business owners who will actively direct and develop the enterprise',
      'Investors whose business will generate more than enough income to support their family',
      'Those seeking renewable, long-term US presence tied to business operations'
    ],
    suitableForTr: [
      'ABD\'de işletme kurmayı veya mevcut bir işletmeyi devralmayı planlayan girişimciler',
      'Esaslı yatırım yapabilecek sermayeye sahip Türk vatandaşları',
      'İşletmeyi bizzat yönetecek ve geliştirecek işletme sahipleri',
      'İşletmesi ailesinin geçiminin ötesinde ekonomik değer yaratacak yatırımcılar',
      'İş faaliyetlerine bağlı olarak yenilenebilir ve uzun vadeli ABD ikameti arayanlar'
    ],
    doesNotAllowEn: [
      'Passive investment without active management role',
      'Investments in marginal enterprises (only enough to support investor)',
      'Citizens of countries without E-2 treaty with the US',
      'Speculative or uncommitted investments',
      'Working for an employer outside the E-2 enterprise'
    ],
    doesNotAllowTr: [
      'Aktif yönetim sorumluluğu üstlenilmeksizin yapılan pasif yatırım',
      'Yalnızca yatırımcının kendi geçimini karşılayacak düzeyde marjinal işletmeler',
      'ABD ile E-2 anlaşması bulunmayan ülkelerin vatandaşları',
      'Spekülatif nitelikte veya fiilen taahhüt edilmemiş yatırımlar',
      'E-2 kapsamındaki işletme dışında bir işveren adına çalışma'
    ],
    commonMistakesEn: [
      'Investing amounts too low to be considered "substantial" for the business type',
      'Not demonstrating the investment is "at risk" (e.g., keeping funds in escrow)',
      'Creating a business that can only marginally support the investor',
      'Failing to show active role in directing and developing the business',
      'Assuming E-2 automatically converts to permanent residence'
    ],
    commonMistakesTr: [
      'İşletmenin türüne göre "esaslı" kabul edilemeyecek düşük tutarlarda yatırım yapılması',
      'Yatırımın fiilen "risk altında" olduğunun kanıtlanamaması (ör. fonların emanet hesapta tutulması)',
      'Yalnızca yatırımcının kendi geçimini sağlayabilecek marjinal bir işletme kurulması',
      'İşletmenin yönetim ve geliştirilmesinde aktif rol üstlenildiğinin gösterilememesi',
      'E-2\'nin otomatik olarak kalıcı oturma iznine dönüşeceğinin varsayılması'
    ],
    greenCardPathEn: {
      answer: 'no',
      explanation: 'E-2 does not directly lead to a green card. It\'s a renewable visa that can be held indefinitely but doesn\'t have dual intent provisions. E-2 holders seeking permanent residence typically need to pursue separate pathways such as employer sponsorship (if eligible), EB-5 investment, or family-based immigration.'
    },
    greenCardPathTr: {
      answer: 'hayır',
      explanation: 'E-2 doğrudan yeşil karta geçiş imkanı sunmaz. İşletme faal kaldığı sürece süresiz yenilenebilen bir vize olmakla birlikte çifte niyet (dual intent) hükmü içermez. Kalıcı oturum hedefleyen E-2 sahiplerinin işveren sponsorluğu, EB-5 yatırımcı vizesi veya aile temelli göçmenlik gibi ayrı bir yol izlemesi gerekir.'
    },
    strategicNotesEn: 'E-2 is highly attractive for Turkish entrepreneurs because Turkey has a treaty with the US. The visa can be renewed indefinitely as long as the business remains viable. However, the lack of a direct green card path means long-term planning should consider other permanent residence options. The investment requirement varies by business type but generally starts around $100,000 for small businesses.',
    strategicNotesTr: 'Türkiye\'nin ABD ile E-2 anlaşmasına taraf olması, Türk girişimciler için bu vizeyi özellikle erişilebilir kılmaktadır. İşletme faaliyetini sürdürdükçe vize süresiz olarak yenilenebilir. Ancak doğrudan yeşil kart yolu bulunmadığından, uzun vadeli planlama yapılırken kalıcı oturum için alternatif stratejiler de göz önünde tutulmalıdır. Yatırım tutarı işletmenin niteliğine göre değişmekle birlikte küçük ölçekli işletmelerde yaklaşık 100.000 dolardan başlamaktadır.',
    uscisUrl: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/e-2-treaty-investors'
  },
  {
    slug: 'o1',
    code: 'O-1',
    titleEn: 'Extraordinary Ability Visa',
    titleTr: 'Olağanüstü Yetenek Vizesi',
    shortDescEn: 'Individuals with extraordinary ability or achievement in their field.',
    shortDescTr: 'Alanlarında olağanüstü yetenek veya başarıya sahip bireyler.',
    icon: '⭐',
    whatIsEn: 'The O-1 visa is for individuals who possess extraordinary ability in sciences, arts, education, business, or athletics (O-1A), or who have a demonstrated record of extraordinary achievement in the motion picture or television industry (O-1B). "Extraordinary ability" means a level of expertise indicating that the person is one of the small percentage who has risen to the very top of their field.',
    whatIsTr: 'O-1 vizesi, bilim, sanat, eğitim, iş veya spor alanlarında olağanüstü yeteneğe sahip bireyler (O-1A) veya sinema veya televizyon endüstrisinde olağanüstü başarı kaydı gösteren bireyler (O-1B) içindir. "Olağanüstü yetenek", kişinin alanının en tepesine yükselen küçük bir yüzdenin parçası olduğunu gösteren bir uzmanlık düzeyi anlamına gelir.',
    suitableForEn: [
      'Award-winning scientists, researchers, or academics',
      'Recognized artists, musicians, or performers',
      'Successful entrepreneurs with documented achievements',
      'Published authors and journalists with significant recognition',
      'Athletes with international competition records',
      'Professionals with patents, significant publications, or industry awards'
    ],
    suitableForTr: [
      'Ödüllü bilim insanları, araştırmacılar veya akademisyenler',
      'Tanınmış sanatçılar, müzisyenler veya performans sanatçıları',
      'Belgelenmiş başarılara sahip başarılı girişimciler',
      'Önemli tanınırlığa sahip yayınlanmış yazarlar ve gazeteciler',
      'Uluslararası yarışma kayıtlarına sahip sporcular',
      'Patentleri, önemli yayınları veya sektör ödülleri olan profesyoneller'
    ],
    doesNotAllowEn: [
      'Those who cannot demonstrate sustained national or international recognition',
      'Individuals at normal career stages without distinguishing achievements',
      'Working outside the area of extraordinary ability',
      'Self-petitioning (must have a US sponsor or agent)',
      'Using O-1 for ordinary skilled work positions'
    ],
    doesNotAllowTr: [
      'Sürekli ulusal veya uluslararası tanınırlık gösteremeyenler',
      'Ayırt edici başarılar olmadan normal kariyer aşamalarındaki bireyler',
      'Olağanüstü yetenek alanı dışında çalışma',
      'Kendi kendine dilekçe verme (ABD sponsoru veya temsilcisi olmalıdır)',
      'O-1\'i sıradan vasıflı iş pozisyonları için kullanma'
    ],
    commonMistakesEn: [
      'Underestimating the evidence required to prove extraordinary ability',
      'Not obtaining proper advisory opinion letters when required',
      'Confusing O-1 requirements with H-1B (O-1 has a higher standard)',
      'Failing to document achievements with third-party evidence',
      'Not explaining how evidence meets specific O-1 criteria'
    ],
    commonMistakesTr: [
      'Olağanüstü yeteneği kanıtlamak için gereken kanıtları hafife alma',
      'Gerektiğinde uygun danışma görüşü mektupları almama',
      'O-1 gereksinimlerini H-1B ile karıştırma (O-1 daha yüksek bir standarda sahiptir)',
      'Başarıları üçüncü taraf kanıtlarıyla belgelememe',
      'Kanıtların belirli O-1 kriterlerini nasıl karşıladığını açıklamama'
    ],
    greenCardPathEn: {
      answer: 'indirect',
      explanation: 'O-1 has dual intent, allowing holders to pursue permanent residence. Those who qualify for O-1A often qualify for EB-1A (extraordinary ability green card) which does not require employer sponsorship or labor certification. This can be one of the faster paths to permanent residence for qualifying individuals.'
    },
    greenCardPathTr: {
      answer: 'dolaylı',
      explanation: 'O-1 çifte niyete sahiptir ve sahiplerinin kalıcı oturum takip etmesine izin verir. O-1A\'ya hak kazananlar genellikle işveren sponsorluğu veya işgücü sertifikasyonu gerektirmeyen EB-1A\'ya (olağanüstü yetenek yeşil kartı) hak kazanır. Bu, uygun bireyler için kalıcı oturuma en hızlı yollardan biri olabilir.'
    },
    strategicNotesEn: 'O-1 is not subject to annual caps and can be processed more quickly than H-1B. The standard is high but the definition of "extraordinary" varies by field—business and entrepreneurship achievements are increasingly recognized. Strong documentation and a well-prepared petition are essential. O-1 is often underutilized by qualified individuals who assume they don\'t meet the standard.',
    strategicNotesTr: 'O-1 yıllık kotalara tabi değildir ve H-1B\'den daha hızlı işlenebilir. Standart yüksektir ancak "olağanüstü" tanımı alana göre değişir—iş ve girişimcilik başarıları giderek daha fazla tanınmaktadır. Güçlü belgeler ve iyi hazırlanmış bir dilekçe esastır. O-1, standardı karşılamadıklarını varsayan nitelikli bireyler tarafından genellikle yetersiz kullanılır.',
    uscisUrl: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement'
  }
]

export function getVisaBySlug(slug: string): VisaCategory | undefined {
  return visaCategories.find(v => v.slug === slug)
}
