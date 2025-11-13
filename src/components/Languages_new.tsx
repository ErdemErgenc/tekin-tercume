import React from 'react';
import './Languages.css';

interface LanguagePageProps {
  language?: string;
}

const Languages: React.FC<LanguagePageProps> = ({ language }) => {
  const languages = [
    {
      name: 'İngilizce',
      flag: '🇬🇧',
      turkish: 'İngilizce belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Your English documents are translated by our sworn translators and certified with notary approval to gain official validity.'
    },
    {
      name: 'Almanca',
      flag: '🇩🇪',
      turkish: 'Almanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Ihre deutschen Dokumente werden von unseren vereidigten Übersetzern übersetzt und mit notarieller Beglaubigung rechtskräftig gemacht.'
    },
    {
      name: 'Fransızca',
      flag: '🇫🇷',
      turkish: 'Fransızca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Vos documents en français sont traduits par nos traducteurs assermentés et validés officiellement par une certification notariale.'
    },
    {
      name: 'İtalyanca',
      flag: '🇮🇹',
      turkish: 'İtalyanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'I vostri documenti in italiano sono tradotti dai nostri traduttori giurati e certificati con approvazione notarile.'
    },
    {
      name: 'Rusça',
      flag: '🇷🇺',
      turkish: 'Rusça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'Ваши русские документы переводятся нашими присяжными переводчиками и заверяются нотариально.'
    },
    {
      name: 'Arapça',
      flag: '🇸🇦',
      turkish: 'Arapça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.',
      foreign: 'يتم ترجمة مستنداتك العربية من قبل مترجمينا المحلفين ويتم اعتمادها رسمياً بواسطة كاتب العدل.'
    }
  ];

  const services = [
    'Kimlik, pasaport, nüfus kayıt örneği, doğum belgesi, evlilik cüzdanı ve benzeri kişisel belgeler',
    'Boşanma kararı, mahkeme ilamı, vekaletname, tapu, kira sözleşmesi gibi hukuki belgeler',
    'Diploma, transkript, öğrenci belgesi, sertifika, akademik makale, tez gibi eğitim/akademik belgeler',
    'Ticari sözleşmeler, şirket kuruluş belgeleri, vergi levhası, ticaret sicil gazetesi, fatura gibi ticari belgeler',
    'Vize ve göçmenlik başvuruları için gerekli tüm evraklar',
    'Sözlü tercüme hizmetleri (noter huzurunda, nikâh işlemlerinde, toplantılarda ve resmi görüşmelerde)',
    'Teknik ve medikal belgeler (kullanım kılavuzu, rapor, medikal sertifika vb.)'
  ];

  return (
    <section className="languages">
      <div className="container">
        <div className="languages-header">
          <h2 className="section-title">Dil Hizmetlerimiz</h2>
          <p className="section-subtitle">
            Birçok dilde profesyonel çeviri hizmetleri sunuyoruz
          </p>
        </div>

        <div className="languages-grid">
          {languages.map((language, index) => (
            <div key={index} className="language-card card">
              <div className="language-header">
                <span className="language-flag">{language.flag}</span>
                <h3 className="language-name">{language.name}</h3>
              </div>

              <div className="language-content">
                <p className="language-description turkish">
                  {language.turkish}
                </p>

                <div className="language-divider"></div>

                <p className="language-description foreign">
                  {language.foreign}
                </p>
              </div>

              <div className="services-section">
                <h4 className="services-title">📌 Hizmetlerimiz:</h4>
                <ul className="services-list">
                  {services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="service-item">
                      <span className="service-bullet">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="other-languages">
          <div className="card">
            <h3 className="other-title">Diğer Diller</h3>
            <p className="other-description">
              Yukarıda belirtilen dillerin dışında tüm dillerde belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.
            </p>
            <p className="other-description-en">
              For all other languages not listed above, your documents are translated by our sworn translators and certified with notary approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Languages;
