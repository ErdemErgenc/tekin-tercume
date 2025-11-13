import React from 'react';
import './LanguagePage.css';

interface LanguagePageProps {
  languageKey: string;
}

const LanguagePage: React.FC<LanguagePageProps> = ({ languageKey }) => {
  const languageData: { [key: string]: any } = {
    'ingilizce': {
      name: 'İngilizce',
      flag: '🇬🇧',
      turkish: 'İngilizce belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Your English documents are translated by our sworn translators and certified with notary approval to gain official validity.',
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
    'almanca': {
      name: 'Almanca',
      flag: '🇩🇪',
      turkish: 'Almanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Ihre deutschen Dokumente werden von unseren vereidigten Übersetzern übersetzt und mit notarieller Beglaubigung rechtskräftig gemacht.',
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
    'fransizca': {
      name: 'Fransızca',
      flag: '🇫🇷',
      turkish: 'Fransızca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Vos documents en français sont traduits par nos traducteurs assermentés et validés officiellement par une certification notariale.',
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
    'italyanca': {
      name: 'İtalyanca',
      flag: '🇮🇹',
      turkish: 'İtalyanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'I vostri documenti in italiano sono tradotti dai nostri traduttori giurati e certificati con approvazione notarile.',
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
    'rusca': {
      name: 'Rusça',
      flag: '🇷🇺',
      turkish: 'Rusça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Ваши русские документы переводятся нашими присяжными переводчиками и заверяются нотариально.',
      foreignServices: [
        'Личные документы: паспорт, удостоверение личности, свидетельство о рождении, свидетельство о браке',
        'Юридические документы: решение о разводе, судебное постановление, доверенность, договор аренды, свидетельство о праве собственности',
        'Академические документы: диплом, транскрипт, сертификаты, статьи, диссертации',
        'Коммерческие документы: контракты, учредительные документы, налоговые справки, торговый реестр, счета',
        'Все документы для визовых и иммиграционных заявлений',
        'Устный перевод (в присутствии нотариуса, на свадьбах, встречах и официальных переговорах)',
        'Технические и медицинские документы (инструкции, отчёты, медицинские справки и др.)'
      ]
    }
  };

  const turkishServices = [
    'Kimlik, pasaport, nüfus kayıt örneği, doğum belgesi, evlilik cüzdanı ve benzeri kişisel belgeler',
    'Boşanma kararı, mahkeme ilamı, vekaletname, tapu, kira sözleşmesi gibi hukuki belgeler',
    'Diploma, transkript, öğrenci belgesi, sertifika, akademik makale, tez gibi eğitim/akademik belgeler',
    'Ticari sözleşmeler, şirket kuruluş belgeleri, vergi levhası, ticaret sicil gazetesi, fatura gibi ticari belgeler',
    'Vize ve göçmenlik başvuruları için gerekli tüm evraklar',
    'Sözlü tercüme hizmetleri (noter huzurunda, nikâh işlemlerinde, toplantılarda ve resmi görüşmelerde)',
    'Teknik ve medikal belgeler (kullanım kılavuzu, rapor, medikal sertifika vb.)'
  ];

  const currentLanguage = languageData[languageKey];

  if (!currentLanguage) {
    return (
      <section className="language-page">
        <div className="container">
          <div className="error-message">
            <h2>Dil bulunamadı</h2>
            <p>Aradığınız dil sayfası mevcut değil.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="language-page">
      <div className="container">
        <div className="language-header">
          <div className="language-title">
            <span className="language-flag">{currentLanguage.flag}</span>
            <h1 className="section-title">{currentLanguage.name}</h1>
          </div>
        </div>

        <div className="language-content">
          <div className="language-description card">
            <p className="turkish-text">{currentLanguage.turkish}</p>

            <div className="divider"></div>

            <p className="foreign-text">{currentLanguage.foreign}</p>
          </div>

          <div className="services-section">
            <h2 className="services-title">📌 Hizmetlerimiz:</h2>

            <div className="services-grid">
              <div className="services-column">
                <h3>Türkçe Hizmetler</h3>
                <ul className="services-list">
                  {turkishServices.map((service, index) => (
                    <li key={index} className="service-item">
                      <span className="service-bullet">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {currentLanguage.foreignServices && (
                <div className="services-column">
                  <h3>{currentLanguage.name} Hizmetler</h3>
                  <ul className="services-list">
                    {currentLanguage.foreignServices.map((service: string, index: number) => (
                      <li key={index} className="service-item">
                        <span className="service-bullet">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagePage;
