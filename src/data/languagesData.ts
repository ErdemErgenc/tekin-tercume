import React from 'react';
import GB from 'country-flag-icons/react/3x2/GB';
import DE from 'country-flag-icons/react/3x2/DE';
import FR from 'country-flag-icons/react/3x2/FR';
import IT from 'country-flag-icons/react/3x2/IT';
import RU from 'country-flag-icons/react/3x2/RU';
import SA from 'country-flag-icons/react/3x2/SA';
import IR from 'country-flag-icons/react/3x2/IR';
import CN from 'country-flag-icons/react/3x2/CN';
import JP from 'country-flag-icons/react/3x2/JP';
import GR from 'country-flag-icons/react/3x2/GR';
import NL from 'country-flag-icons/react/3x2/NL';
import BG from 'country-flag-icons/react/3x2/BG';
import RO from 'country-flag-icons/react/3x2/RO';
import UA from 'country-flag-icons/react/3x2/UA';

// Tüm dil verileri
export interface LanguageData {
  name: string;
  flag?: string;
  flagComponent?: React.ComponentType<{ className?: string }>;
  turkish: string;
  foreign: string;
  turkishServices: string[];
  foreignServices: string[];
}

const turkishServices = [
  'Kimlik, pasaport, nüfus kayıt örneği, doğum belgesi, evlilik cüzdanı ve benzeri kişisel belgeler',
  'Boşanma kararı, mahkeme ilamı, vekaletname, tapu, kira sözleşmesi gibi hukuki belgeler',
  'Diploma, transkript, öğrenci belgesi, sertifika, akademik makale, tez gibi eğitim/akademik belgeler',
  'Ticari sözleşmeler, şirket kuruluş belgeleri, vergi levhası, ticaret sicil gazetesi, fatura gibi ticari belgeler',
  'Vize ve göçmenlik başvuruları için gerekli tüm evraklar',
  'Sözlü tercüme hizmetleri (noter huzurunda, nikâh işlemlerinde, toplantılarda ve resmi görüşmelerde)',
  'Teknik ve medikal belgeler (kullanım kılavuzu, rapor, medikal sertifika vb.)'
];

export const languagesData: Record<string, LanguageData> = {
  ingilizce: {
    name: 'İngilizce',
    flagComponent: GB,
    turkish: 'İngilizce belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Your English documents are translated by our sworn translators and certified with notary approval to gain official validity.',
    turkishServices: turkishServices,
    foreignServices: [
      'Personal documents such as ID, passport, birth certificate, marriage certificate, and population registry extract',
      'Legal documents such as divorce decree, court decision, power of attorney, title deed, rental agreement',
      'Academic documents such as diploma, transcript, student certificate, thesis, dissertation, and academic articles',
      'Commercial documents such as contracts, company formation papers, tax certificate, trade registry, invoices',
      'All documents required for visa and immigration applications',
      'Interpretation services (before a notary public, at weddings, in meetings, and official proceedings)',
      'Technical and medical documents (manuals, reports, medical certificates, etc.)'
    ]
  },
  almanca: {
    name: 'Almanca',
    flagComponent: DE,
    turkish: 'Almanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Ihre deutschen Dokumente werden von unseren vereidigten Übersetzern übersetzt und mit notarieller Beglaubigung rechtskräftig gemacht.',
    turkishServices: turkishServices,
    foreignServices: [
      'Persönliche Dokumente wie Ausweis, Reisepass, Geburtsurkunde, Heiratsurkunde und Meldebescheinigung',
      'Rechtliche Dokumente wie Scheidungsurteil, Gerichtsbeschluss, Vollmacht, Grundbuch, Mietvertrag',
      'Akademische Dokumente wie Diplom, Zeugnis, Studienbescheinigung, Zertifikat, akademische Artikel, Dissertation',
      'Handelsdokumente wie Verträge, Unternehmensgründungsunterlagen, Steuerbescheinigung, Handelsregister, Rechnungen',
      'Alle Unterlagen für Visum- und Einwanderungsanträge',
      'Dolmetscherdienste (vor dem Notar, bei Eheschließungen, in Besprechungen und offiziellen Terminen)',
      'Technische und medizinische Dokumente (Bedienungsanleitungen, Berichte, medizinische Zertifikate usw.)'
    ]
  },
  fransizca: {
    name: 'Fransızca',
    flagComponent: FR,
    turkish: 'Fransızca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Vos documents en français sont traduits par nos traducteurs assermentés et validés officiellement par une certification notariale.',
    turkishServices: turkishServices,
    foreignServices: [
      'Documents personnels tels que carte d\'identité, passeport, acte de naissance, livret de famille, certificat de mariage',
      'Documents juridiques tels que jugement de divorce, décision de justice, procuration, titre de propriété, contrat de location',
      'Documents académiques tels que diplômes, relevés de notes, certificats, articles académiques, thèses',
      'Documents commerciaux tels que contrats, statuts de société, certificat fiscal, registre du commerce, factures',
      'Tous les documents nécessaires aux demandes de visa et d\'immigration',
      'Services d\'interprétation (chez le notaire, lors de mariages, de réunions et de rendez-vous officiels)',
      'Documents techniques et médicaux (manuels d\'utilisation, rapports, certificats médicaux, etc.)'
    ]
  },
  italyanca: {
    name: 'İtalyanca',
    flagComponent: IT,
    turkish: 'İtalyanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'I vostri documenti in italiano sono tradotti dai nostri traduttori giurati e certificati con approvazione notarile.',
    turkishServices: turkishServices,
    foreignServices: [
      'Documenti personali come carta d\'identità, passaporto, certificato di nascita, certificato di matrimonio',
      'Documenti legali come sentenza di divorzio, decreto del tribunale, procura, atto di proprietà, contratto di affitto',
      'Documenti accademici come diplomi, trascrizioni, certificati, articoli accademici, tesi',
      'Documenti commerciali come contratti, documenti di costituzione di società, certificato fiscale, registro commerciale, fatture',
      'Tutti i documenti necessari per domande di visto e immigrazione',
      'Servizi di interpretariato (presso il notaio, matrimoni, riunioni e incontri ufficiali)',
      'Documenti tecnici e medici (manuali, rapporti, certificati medici ecc.)'
    ]
  },
  rusca: {
    name: 'Rusça',
    flagComponent: RU,
    turkish: 'Rusça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Ваши русские документы переводятся нашими присяжными переводчиками и заверяются нотариально.',
    turkishServices: turkishServices,
    foreignServices: [
      'Личные документы: паспорт, удостоверение личности, свидетельство о рождении, свидетельство о браке',
      'Юридические документы: решение о разводе, судебное постановление, доверенность, договор аренды, свидетельство о праве собственности',
      'Академические документы: диплом, транскрипт, сертификаты, статьи, диссертации',
      'Коммерческие документы: контракты, учредительные документы, налоговые справки, торговый реестр, счета',
      'Все документы для визовых и иммиграционных заявлений',
      'Устный перевод (в присутствии нотариуса, на свадьбах, встречах и официальных переговорах)',
      'Технические и медицинские документы (инструкции, отчёты, медицинские справки и др.)'
    ]
  },
  arapca: {
    name: 'Arapça',
    flagComponent: SA,
    turkish: 'Arapça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'يتم ترجمة مستنداتك العربية من قبل مترجمينا المحلفين ويتم اعتمادها رسمياً بواسطة كاتب العدل.',
    turkishServices: turkishServices,
    foreignServices: [
      'المستندات الشخصية: الهوية، جواز السفر، شهادة الميلاد، شهادة الزواج',
      'المستندات القانونية: حكم الطلاق، قرار المحكمة، التوكيل، سند الملكية، عقد الإيجار',
      'المستندات الأكاديمية: الشهادات، السجلات الأكاديمية، المقالات العلمية، الأطروحات',
      'المستندات التجارية: العقود، مستندات تأسيس الشركات، شهادة الضرائب، سجل التجارة، الفواتير',
      'جميع الوثائق المطلوبة لطلبات التأشيرة والهجرة',
      'خدمات الترجمة الشفوية (أمام الكاتب العدل، في حفلات الزواج، الاجتماعات، والمراسلات الرسمية)',
      'المستندات التقنية والطبية (الأدلة، التقارير، الشهادات الطبية، إلخ)'
    ]
  },
  farsca: {
    name: 'Farsça',
    flagComponent: IR,
    turkish: 'Farsça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'اسناد فارسی شما توسط مترجمان رسمی ما ترجمه شده و با تأیید رسمی دفتر اسناد رسمی معتبر می‌شود.',
    turkishServices: turkishServices,
    foreignServices: [
      'اسناد شخصی: کارت شناسایی، گذرنامه، شناسنامه، سند ازدواج',
      'اسناد حقوقی: حکم طلاق، رای دادگاه، وکالتنامه، سند مالکیت، قرارداد اجاره',
      'اسناد تحصیلی: دیپلم، ریز نمرات، گواهی‌نامه‌ها، مقالات علمی، پایان‌نامه',
      'اسناد تجاری: قراردادها، مدارک تأسیس شرکت، گواهی مالیاتی، ثبت تجاری، فاکتورها',
      'تمام مدارک مورد نیاز برای ویزا و مهاجرت',
      'خدمات ترجمه شفاهی (در حضور دفترخانه، مراسم ازدواج، جلسات و ملاقات‌های رسمی)',
      'اسناد فنی و پزشکی (دفترچه راهنما، گزارش‌ها، گواهی‌های پزشکی و غیره)'
    ]
  },
  cince: {
    name: 'Çince',
    flagComponent: CN,
    turkish: 'Çince belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: '您的中文文件由我们的宣誓翻译员翻译，并经过公证认证以获得官方效力。',
    turkishServices: turkishServices,
    foreignServices: [
      '个人文件：身份证、护照、出生证明、结婚证',
      '法律文件：离婚判决、法院裁定、授权书、房产证、租赁合同',
      '学术文件：文凭、成绩单、学生证书、学术文章、论文',
      '商业文件：合同、公司注册文件、税务证明、商业登记、发票',
      '签证和移民申请所需的所有文件',
      '口译服务（公证处、婚礼、会议及官方事务）',
      '技术和医疗文件（使用手册、报告、医疗证书等）'
    ]
  },
  japonca: {
    name: 'Japonca',
    flagComponent: JP,
    turkish: 'Japonca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: '日本語の書類は、当社の公証翻訳者によって翻訳され、公証人による認証付きで正式な効力を持ちます。',
    turkishServices: turkishServices,
    foreignServices: [
      '個人書類：身分証明書、パスポート、出生証明書、婚姻証明書',
      '法的書類：離婚判決、裁判所命令、委任状、登記簿、賃貸契約',
      '学術書類：卒業証書、成績証明書、学生証明書、学術論文、論文',
      '商業書類：契約書、会社設立書類、税務証明書、商業登記簿、請求書',
      'ビザおよび移民申請に必要なすべての書類',
      '通訳サービス（公証人の前、結婚式、会議、公式手続き）',
      '技術・医療文書（マニュアル、報告書、医療証明書など）'
    ]
  },
  yunanca: {
    name: 'Yunanca',
    flagComponent: GR,
    turkish: 'Yunanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Τα ελληνικά σας έγγραφα μεταφράζονται από τους επίσημους μεταφραστές μας και επικυρώνονται με συμβολαιογραφική βεβαίωση.',
    turkishServices: turkishServices,
    foreignServices: [
      'Προσωπικά έγγραφα: ταυτότητα, διαβατήριο, πιστοποιητικό γέννησης, πιστοποιητικό γάμου',
      'Νομικά έγγραφα: απόφαση διαζυγίου, δικαστική απόφαση, εξουσιοδότηση, τίτλος ιδιοκτησίας, μισθωτήριο συμβόλαιο',
      'Ακαδημαϊκά έγγραφα: πτυχία, αναλυτικές βαθμολογίες, πιστοποιητικά, ακαδημαϊκά άρθρα, διπλωματικές εργασίες',
      'Εμπορικά έγγραφα: συμβάσεις, έγγραφα ίδρυσης εταιρείας, φορολογικά πιστοποιητικά, εμπορικό μητρώο, τιμολόγια',
      'Όλα τα έγγραφα που απαιτούνται για αιτήσεις βίζας και μετανάστευσης',
      'Υπηρεσίες προφορικής μετάφρασης (σε συμβολαιογράφο, γάμους, συναντήσεις και επίσημες διαδικασίες)',
      'Τεχνικά και ιατρικά έγγραφα (οδηγοί χρήσης, εκθέσεις, ιατρικά πιστοποιητικά κ.ά.)'
    ]
  },
  felemenkce: {
    name: 'Felemenkce',
    flagComponent: NL,
    turkish: 'Felemenkce belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Uw Nederlandse documenten worden vertaald door onze beëdigde vertalers en officieel gelegaliseerd met notariële goedkeuring.',
    turkishServices: turkishServices,
    foreignServices: [
      'Persoonlijke documenten: identiteitskaart, paspoort, geboorteakte, huwelijksakte',
      'Juridische documenten: echtscheidingsvonnis, gerechtelijk bevel, volmacht, eigendomsakte, huurovereenkomst',
      'Academische documenten: diploma\'s, transcripties, studentencertificaten, academische artikelen, scripties',
      'Commerciële documenten: contracten, oprichtingsdocumenten van bedrijven, belastingcertificaten, handelsregister, facturen',
      'Alle documenten die nodig zijn voor visum- en immigratieaanvragen',
      'Tolkdiensten (voor de notaris, bij huwelijken, vergaderingen en officiële procedures)',
      'Technische en medische documenten (handleidingen, rapporten, medische certificaten, enz.)'
    ]
  },
  bulgarca: {
    name: 'Bulgarca',
    flagComponent: BG,
    turkish: 'Bulgarca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Вашите български документи се превеждат от нашите заклети преводачи и се удостоверяват нотариално за официална валидност.',
    turkishServices: turkishServices,
    foreignServices: [
      'Лични документи: лична карта, паспорт, акт за раждане, брачен акт',
      'Юридически документи: решение за развод, съдебно решение, пълномощно, акт за собственост, наемен договор',
      'Академични документи: дипломи, преписи, студентски удостоверения, академични статии, дисертации',
      'Търговски документи: договори, документи за учредяване на фирма, данъчни сертификати, търговски регистър, фактури',
      'Всички документи за визови и имиграционни заявления',
      'Устни преводи (пред нотариус, на сватби, срещи и официални процедури)',
      'Технически и медицински документи (ръководства, отчети, медицински сертификати и др.)'
    ]
  },
  romence: {
    name: 'Romence',
    flagComponent: RO,
    turkish: 'Romence belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Documentele dvs. românești sunt traduse de traducătorii noștri autorizați și certificate prin notar pentru valabilitate oficială.',
    turkishServices: turkishServices,
    foreignServices: [
      'Documente personale: carte de identitate, pașaport, certificat de naștere, certificat de căsătorie',
      'Documente juridice: hotărâre de divorț, decizie judecătorească, procură, titlu de proprietate, contract de închiriere',
      'Documente academice: diplome, transcripturi, certificate de student, articole academice, teze',
      'Documente comerciale: contracte, acte de constituire a firmei, certificat fiscal, registru comercial, facturi',
      'Toate documentele necesare pentru cereri de viză și imigrare',
      'Servicii de interpretariat (în fața notarului, la nunți, întâlniri și proceduri oficiale)',
      'Documente tehnice și medicale (manuale, rapoarte, certificate medicale etc.)'
    ]
  },
  ukraynaca: {
    name: 'Ukraynaca',
    flagComponent: UA,
    turkish: 'Ukraynaca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'Ваші українські документи перекладаються нашими присяжними перекладачами та нотаріально завіряються для офіційної дійсності.',
    turkishServices: turkishServices,
    foreignServices: [
      'Особисті документи: паспорт, посвідчення особи, свідоцтво про народження, свідоцтво про шлюб',
      'Юридичні документи: рішення про розлучення, судове рішення, довіреність, договір оренди, свідоцтво про право власності',
      'Академічні документи: дипломи, транскрипти, студентські сертифікати, академічні статті, дисертації',
      'Комерційні документи: контракти, установчі документи компаній, податкові сертифікати, торговий реєстр, рахунки',
      'Усі документи, необхідні для заявок на візу та імміграцію',
      'Усні переклади (перед нотаріусом, на весіллях, зустрічах та офіційних процедурах)',
      'Технічні та медичні документи (інструкції, звіти, медичні сертифікати тощо)'
    ]
  },
  diger: {
    name: 'Diğer Diller',
    flag: '🌐',
    turkish: 'Yukarıda belirtilen dillerin dışında tüm dillerde belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
    foreign: 'For all other languages not listed above, your documents are translated by our sworn translators and certified with notary approval.',
    turkishServices: turkishServices,
    foreignServices: [
      'Personal documents such as ID, passport, birth certificate, marriage certificate, and population registry extract',
      'Legal documents such as divorce decree, court decision, power of attorney, title deed, rental agreement',
      'Academic documents such as diploma, transcript, student certificate, thesis, dissertation, and academic articles',
      'Commercial documents such as contracts, company formation papers, tax certificate, trade registry, invoices',
      'All documents required for visa and immigration applications',
      'Interpretation services (before a notary public, at weddings, in meetings, and official proceedings)',
      'Technical and medical documents (manuals, reports, medical certificates, etc.)'
    ]
  }
};
