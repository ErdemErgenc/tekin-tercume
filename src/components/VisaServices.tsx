import React from 'react';
import './VisaServices.css';

interface VisaServiceProps {
  visaType: string;
  onNavigate: (page: string) => void;
}

const VisaServices: React.FC<VisaServiceProps> = ({ visaType, onNavigate }) => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [visaType]);

  const visaData: Record<string, any> = {
    'tourist': {
      title: 'Turistik Vize Hizmetleri',
      icon: '✈️',
      description: 'Tatil ve gezi planlarınız için profesyonel vize danışmanlığı ve belge hazırlama hizmetleri',
      benefits: [
        'Vize başvuru sürecinde tam destek',
        'Gerekli evrakların hazırlanması',
        'Başvuru formlarının doldurulması',
        'Randevu takibi ve koordinasyonu',
        'Vize onay sürecinin takibi'
      ],
      requirements: [
        'Geçerli pasaport (en az 6 ay geçerlilik)',
        'Vize başvuru formu',
        'Fotoğraflar (belirtilen standartlarda)',
        'Seyahat planı ve konaklama rezervasyonları',
        'Mali durum belgeleri',
        'Sigorta poliçesi'
      ],
      countries: [
        'Avrupa Birliği Ülkeleri (Schengen)',
        'Amerika Birleşik Devletleri',
        'İngiltere',
        'Kanada',
        'Avustralya',
        'Japonya',
        'Güney Kore'
      ]
    },
    'work': {
      title: 'Çalışma Vizesi Hizmetleri',
      icon: '💼',
      description: 'Yurtdışında çalışma fırsatları için vize başvuru sürecinizde profesyonel destek',
      benefits: [
        'İş teklifi değerlendirmesi',
        'Çalışma izni başvurusu',
        'Mesleki yeterlilik belgelerinin çevirisi',
        'İşveren koordinasyonu',
        'Uzun vadeli ikamet planlaması'
      ],
      requirements: [
        'İş teklifi mektubu',
        'Mesleki yeterlilik belgeleri',
        'Eğitim durumunu gösteren belgeler',
        'Deneyim belgeleri',
        'Sağlık raporu',
        'Sabıka kaydı'
      ],
      countries: [
        'Almanya',
        'Hollanda',
        'Kanada',
        'Avustralya',
        'İngiltere',
        'İsviçre',
        'Norveç'
      ]
    },
    'family': {
      title: 'Aile Birleşimi Vizesi',
      icon: '👨‍👩‍👧‍👦',
      description: 'Yurtdışında yaşayan aile üyelerinizle birleşmek için vize başvuru sürecinizde destek',
      benefits: [
        'Aile bağı belgelerinin hazırlanması',
        'Mali yeterlilik kanıtlaması',
        'Konaklama garantisi süreçleri',
        'Dil yeterlilik testleri bilgilendirmesi',
        'Entegrasyon programları hakkında danışmanlık'
      ],
      requirements: [
        'Akrabalık belgesi (evlilik cüzdanı, doğum belgesi)',
        'Davetiye mektubu',
        'Sponsor mali durumu belgeleri',
        'Konaklama garantisi',
        'Sağlık sigortası',
        'Dil yeterlilik belgesi (ülkeye göre)'
      ],
      countries: [
        'Almanya',
        'Fransa',
        'Hollanda',
        'İsveç',
        'Norveç',
        'Danimarka',
        'Belçika'
      ]
    }
  };

  const currentVisa = visaData[visaType];

  if (!currentVisa) {
    return (
      <section className="visa-services">
        <div className="container">
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <h2>Vize Hizmetleri</h2>
            <p>Profesyonel vize danışmanlığı için bizimle iletişime geçin.</p>
            <div className="error-actions">
              <button onClick={() => onNavigate('services')} className="back-btn primary-btn">
                Hizmetlere Dön
              </button>
              <button onClick={() => onNavigate('contact')} className="back-btn secondary-btn">
                İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="visa-services">
      <div className="container">
        <div className="visa-header">
          <div className="breadcrumb">
            <span onClick={() => onNavigate('home')}>Ana Sayfa</span> →
            <span onClick={() => onNavigate('services')}>Hizmetler</span> →
            <span>{currentVisa.title}</span>
          </div>

          <div className="visa-title-section">
            <div className="visa-icon">{currentVisa.icon}</div>
            <div>
              <h1 className="visa-title">{currentVisa.title}</h1>
              <p className="visa-description">{currentVisa.description}</p>
            </div>
          </div>
        </div>

        <div className="visa-content">
          <div className="main-content">
            <div className="benefits-section">
              <h2>Hizmetlerimiz</h2>
              <div className="benefits-grid">
                {currentVisa.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="requirements-section">
              <h2>Gerekli Belgeler</h2>
              <div className="requirements-list">
                {currentVisa.requirements.map((requirement: string, index: number) => (
                  <div key={index} className="requirement-item">
                    <span className="requirement-bullet">📄</span>
                    <span>{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="countries-section">
              <h2>Hizmet Verdiğimiz Ülkeler</h2>
              <div className="countries-grid">
                {currentVisa.countries.map((country: string, index: number) => (
                  <div key={index} className="country-item">
                    <span className="country-flag">🌍</span>
                    <span>{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="contact-card">
              <h3>Hemen Başvurun</h3>
              <p>Vize başvuru süreciniz için profesyonel destek alın</p>

              <div className="contact-methods">
                <a href="tel:+905447215315" className="contact-method">
                  <span className="method-icon">📱</span>
                  <span>+90 544 721 53 15</span>
                </a>

                <a href="mailto:info@tekintercume.com.tr" className="contact-method">
                  <span className="method-icon">✉️</span>
                  <span>info@tekintercume.com.tr</span>
                </a>

                <a href="https://wa.me/905447215315" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  WhatsApp ile İletişim
                </a>
              </div>
            </div>

            <div className="process-card">
              <h3>Başvuru Süreci</h3>
              <div className="process-steps">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-text">İlk Görüşme ve Değerlendirme</div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-text">Belge Hazırlama ve Çeviri</div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-text">Başvuru Formu Doldurma</div>
                </div>
                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-text">Randevu Alma ve Başvuru</div>
                </div>
                <div className="step-item">
                  <div className="step-number">5</div>
                  <div className="step-text">Takip ve Sonuç</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaServices;
