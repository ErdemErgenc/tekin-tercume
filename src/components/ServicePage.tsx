import React from 'react';
import './ServicePages.css';

interface ServicePageProps {
  onNavigate: (page: string) => void;
  serviceType: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ onNavigate, serviceType }) => {
  const getServiceContent = () => {
    switch (serviceType) {
      case 'translation-service':
        return {
          title: 'Tercüme Hizmeti',
          subtitle: 'Profesyonel ve Güvenilir Çeviri Hizmetleri',
          description: 'Yeminli tercümanlarımız ile 25+ dilde resmi belgelerinizin çevirisini yapıyoruz.',
          features: [
            {
              icon: '📄',
              title: 'Resmi Belge Çevirisi',
              description: 'Pasaport, nüfus cüzdanı, diplomas, transkriptler ve tüm resmi belgeleriniz'
            },
            {
              icon: '⚖️',
              title: 'Yeminli Tercüman',
              description: 'Adalet Bakanlığı onaylı yeminli tercümanlar tarafından çeviri'
            },
            {
              icon: '🌍',
              title: '25+ Dil Desteği',
              description: 'İngilizce, Almanca, Fransızca, İtalyanca ve daha fazlası'
            },
            {
              icon: '⚡',
              title: 'Hızlı Teslimat',
              description: '24 saat içinde acil çeviri hizmeti mevcuttur'
            }
          ],
          pricing: [
            { service: 'Standart Belge Çevirisi', price: '50 TL/sayfa' },
            { service: 'Acil Çeviri (24 saat)', price: '75 TL/sayfa' },
            { service: 'Noter Onaylı', price: '+25 TL' },
            { service: 'Apostil İşlemi', price: '+100 TL' }
          ]
        };

      case 'visa-services':
        return {
          title: 'Vize Hizmetleri',
          subtitle: 'Profesyonel Vize Danışmanlığı ve Başvuru Desteği',
          description: 'Yurt dışı seyahatleriniz için vize başvuru süreçlerinizde uzman kadromuzla yanınızdayız. Turistik, iş, öğrenci ve aile birleşimi vizesi için kapsamlı destek sunuyoruz.',
          features: [
            {
              icon: '✈️',
              title: 'Turistik Vize',
              description: 'Schengen, ABD, İngiltere, Kanada, Avustralya ve tüm ülkeler için turistik vize başvuru desteği'
            },
            {
              icon: '💼',
              title: 'Çalışma Vizesi',
              description: 'İş vizesi ve çalışma izni başvurularında tam süreç yönetimi ve evrak hazırlığı'
            },
            {
              icon: '👨‍👩‍👧‍👦',
              title: 'Aile Birleşimi Vizesi',
              description: 'Yurt dışındaki aile üyelerinizle birleşmek için gerekli tüm evrak ve başvuru süreçleri'
            },
            {
              icon: '🎓',
              title: 'Öğrenci Vizesi',
              description: 'Eğitim vizesi, dil okulu vizesi ve staj vizesi başvurularında profesyonel danışmanlık'
            },
            {
              icon: '📋',
              title: 'Evrak Hazırlama',
              description: 'Vize başvurusu için gerekli tüm belgelerin çevirisi, tasdiki ve düzenlenmesi'
            },
            {
              icon: '🗓️',
              title: 'Randevu Yönetimi',
              description: 'Konsolosluk ve vize merkezi randevularının alınması ve takibi'
            }
          ],
          pricing: []
        };

      case 'immigration-services':
        return {
          title: 'Göçmenlik Hizmetleri',
          subtitle: 'Yurt Dışı Yerleşim Süreçlerinizde Uzman Desteği',
          description: 'Kalıcı ikamet ve vatandaşlık süreçlerinizde profesyonel rehberlik.',
          features: [
            {
              icon: '🇹🇷',
              title: 'Türkiye İkamet İzni',
              description: 'Kısa/uzun dönem ikamet izni başvuruları'
            },
            {
              icon: '🇨🇦',
              title: 'Kanada İkamet',
              description: 'Express Entry ve Provincial Nominee programları'
            },
            {
              icon: '🏠',
              title: 'Yatırım Yoluyla İkamet',
              description: 'Yatırım programları ile ikamet hakkı'
            },
            {
              icon: '📋',
              title: 'Evrak Hazırlama',
              description: 'Tüm başvuru evraklarının eksiksiz hazırlanması'
            }
          ],
          pricing: [
            { service: 'Türkiye İkamet Başvurusu', price: '1.500 TL' },
            { service: 'Kanada Express Entry', price: '5.000 TL' },
            { service: 'Yatırım Danışmanlığı', price: '3.000 TL' },
            { service: 'Evrak İnceleme', price: '500 TL' }
          ]
        };

      case 'professional-info':
        return {
          title: 'Mesleki Bilgilendirme',
          subtitle: 'Sertifika ve Diploma Denklik İşlemleri',
          description: 'Yurt dışında çalışmak için gerekli belge onayları ve denklik işlemleri.',
          features: [
            {
              icon: '📜',
              title: 'E-Devlet Sertifikaları',
              description: 'Barkodlu e-devlet sertifikalarının çıkarılması'
            },
            {
              icon: '🌐',
              title: 'Uluslararası Sertifikalar',
              description: 'YÖK, ÖSYM ve diğer kurumlardan sertifikalar'
            },
            {
              icon: '🎯',
              title: 'Diploma Denkliği',
              description: 'Yurt dışı diplomalarının Türkiye\'de denkliği'
            },
            {
              icon: '✅',
              title: 'Belge Onayı',
              description: 'Apostil, konsolosluk onayı işlemleri'
            }
          ],
          pricing: [
            { service: 'E-Devlet Sertifikası', price: '100 TL' },
            { service: 'Diploma Denklik Başvurusu', price: '800 TL' },
            { service: 'Apostil İşlemi', price: '250 TL' },
            { service: 'Konsolosluk Onayı', price: '400 TL' }
          ]
        };

      default:
        return {
          title: 'Hizmetlerimiz',
          subtitle: 'Profesyonel Çeviri ve Danışmanlık',
          description: 'Size en uygun hizmeti seçin.',
          features: [],
          pricing: []
        };
    }
  };

  const content = getServiceContent();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="service-page">
      <div className="container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => onNavigate('home')}>
          ← Ana Sayfaya Dön
        </button>

        {/* Header */}
        <div className="service-header">
          <h1>{content.title}</h1>
          <p className="service-subtitle">{content.subtitle}</p>
          <p className="service-description">{content.description}</p>
        </div>

        {/* Features */}
        <div className="service-features">
          <h2>Neler Sunuyoruz?</h2>
          <div className="features-grid">
            {content.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="service-cta">
          <h3>Hemen Teklif Alın</h3>
          <p>Profesyonel hizmetimizden yararlanmak için bizimle iletişime geçin.</p>
          <button
            className="cta-btn"
            onClick={() => onNavigate('quick-quote')}
          >
            Hızlı Teklif Al
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
