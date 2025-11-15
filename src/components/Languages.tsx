import React, { useState } from 'react';
import './Languages.css';
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

interface LanguagePageProps {
  language?: string;
}

interface LanguageData {
  name: string;
  flag?: string;
  flagComponent?: React.ComponentType<{ className?: string }>;
  turkish: string;
  foreign: string;
}

const Languages: React.FC<LanguagePageProps> = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageData | null>(null);

  const allLanguages = [
    { name: 'İngilizce', flagComponent: GB, turkish: 'İngilizce belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Your English documents are translated by our sworn translators and certified with notary approval to gain official validity.' },
    { name: 'Almanca', flagComponent: DE, turkish: 'Almanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Ihre deutschen Dokumente werden von unseren vereidigten Übersetzern übersetzt und mit notarieller Beglaubigung rechtskräftig gemacht.' },
    { name: 'Fransızca', flagComponent: FR, turkish: 'Fransızca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Vos documents en français sont traduits par nos traducteurs assermentés et validés officiellement par une certification notariale.' },
    { name: 'İtalyanca', flagComponent: IT, turkish: 'İtalyanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'I vostri documenti in italiano sono tradotti dai nostri traduttori giurati e certificati con approvazione notarile.' },
    { name: 'Rusça', flagComponent: RU, turkish: 'Rusça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Ваши русские документы переводятся нашими присяжными переводчиками и заверяются нотариально.' },
    { name: 'Arapça', flagComponent: SA, turkish: 'Arapça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'يتم ترجمة مستنداتك العربية من قبل مترجمينا المحلفين ويتم اعتمادها رسمياً بواسطة كاتب العدل.' },
    { name: 'Farsça', flagComponent: IR, turkish: 'Farsça belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'اسناد فارسی شما توسط مترجمان رسمی ما ترجمه شده و با تأیید رسمی دفتر اسناد رسمی معتبر می‌شود.' },
    { name: 'Çince', flagComponent: CN, turkish: 'Çince belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: '您的中文文件由我们的宣誓翻译员翻译，并经过公证认证以获得官方效力。' },
    { name: 'Japonca', flagComponent: JP, turkish: 'Japonca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: '日本語の書類は、当社の公証翻訳者によって翻訳され、公証人による認証付きで正式な効力を持ちます。' },
    { name: 'Yunanca', flagComponent: GR, turkish: 'Yunanca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Τα ελληνικά σας έγγραφα μεταφράζονται από τους επίσημους μεταφραστές μας και επικυρώνονται με συμβολαιογραφική βεβαίωση.' },
    { name: 'Felemenkçe', flagComponent: NL, turkish: 'Felemenkçe belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Uw Nederlandse documenten worden vertaald door onze beëdigde vertalers en officieel gelegaliseerd met notariële goedkeuring.' },
    { name: 'Bulgarca', flagComponent: BG, turkish: 'Bulgarca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Вашите български документи се превеждат от нашите заклети преводачи и се удостоверяват нотариално за официална валидност.' },
    { name: 'Romence', flagComponent: RO, turkish: 'Romence belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Documentele dvs. românești sunt traduse de traducătorii noștri autorizați și certificate prin notar pentru valabilitate oficială.' },
    { name: 'Ukraynaca', flagComponent: UA, turkish: 'Ukraynaca belgeleriniz yeminli tercümanlarımız tarafından çevrilmekte ve noter onayıyla resmiyet kazanmaktadır.', foreign: 'Ваші українські документи перекладаються нашими присяжними перекладачами та нотаріально завіряються для офіційної дійсності.' }
  ];

  const languages = allLanguages.slice(0, 6);

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
          {languages.map((language, index) => {
            const FlagComponent = language.flagComponent;
            return (
              <div
                key={index}
                className="language-card card"
                onClick={() => setSelectedLanguage(language)}
              >
                <div className="language-header">
                  {FlagComponent ? (
                    <FlagComponent className="language-flag-svg" />
                  ) : (
                    <span className="language-flag">🌍</span>
                  )}
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

                <button className="details-btn">
                  Detaylı Bilgi →
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selectedLanguage && (
          <div className="language-modal" onClick={() => setSelectedLanguage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedLanguage(null)}>
                ✕
              </button>

              <div className="modal-header">
                {selectedLanguage.flagComponent ? (
                  <selectedLanguage.flagComponent className="modal-flag-svg" />
                ) : (
                  <span className="modal-flag">{selectedLanguage.flag}</span>
                )}
                <h3 className="modal-title">{selectedLanguage.name} Çeviri Hizmetleri</h3>
              </div>

              <div className="modal-body">
                <h4 className="modal-section-title">📌 Hizmetlerimiz:</h4>
                <ul className="modal-services-list">
                  {services.map((service, index) => (
                    <li key={index} className="modal-service-item">
                      <span className="service-check">✓</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer">
                <button className="modal-cta-btn" onClick={() => setSelectedLanguage(null)}>
                  Anladım
                </button>
              </div>
            </div>
          </div>
        )}

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
