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
          title: 'Noter Onaylı Yeminli Tercüme Hizmeti',
          subtitle: 'Adalet Bakanlığı Onaylı Profesyonel Çeviri Hizmetleri',
          description: 'Tekin Tercüme olarak, Adalet Bakanlığı tarafından yetkilendirilmiş yeminli tercümanlarımız aracılığıyla 128+ dilde resmi belge çevirisi sunuyoruz. Tüm çevirilerimiz noter onaylı olup, ulusal ve uluslararası resmi kurumlarda geçerlidir. Diploma, pasaport, mahkeme kararları, ticari sözleşmeler ve daha birçok belgede güvenilir ve hızlı çözümler üretiyoruz.',
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
              title: '128 Dil Desteği',
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
          title: 'Vize Danışmanlık ve Başvuru Hizmetleri',
          subtitle: 'Turistik, Çalışma ve Aile Birleşimi Vizelerinde Profesyonel Destek',
          description: 'Yurt dışına çıkmak isteyenler için her türlü vize başvurusunda A\'dan Z\'ye danışmanlık ve evrak hazırlama hizmeti sunuyoruz. Schengen ülkeleri, ABD, Kanada, İngiltere, Avustralya başta olmak üzere tüm ülkelere turistik, iş, öğrenci ve aile birleşimi vizelerinde uzman kadromuzla yanınızdayız. Vize başvurunuz için gerekli tüm belgelerin çevirisi, noter tasdiki, randevu yönetimi ve başvuru sonrası takip hizmetleri ile vize alma sürecinizi kolaylaştırıyoruz.',
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
          title: 'Göçmenlik ve İkamet Danışmanlık Hizmetleri',
          subtitle: 'Türkiye, Kanada ve Diğer Ülkelere Kalıcı İkamet Süreçleri',
          description: 'Yurt dışına yerleşmek veya Türkiye\'de ikamet izni almak isteyenler için kapsamlı göçmenlik danışmanlığı sunuyoruz. Türkiye\'ye gelen yabancılar için kısa/uzun dönem ikamet izni, çalışma izni ve vatandaşlık başvurularında; yurt dışına yerleşmek isteyenler için ise Kanada Express Entry, Provincial Nominee Program (PNP), Avustralya, ABD ve Avrupa ülkelerinin göçmenlik programlarında A\'dan Z\'ye destek sağlıyoruz. Evrak hazırlama, denklik işlemleri, dil sınavı bilgilendirmesi ve başvuru sonrası takip hizmetleri ile göçmenlik sürecinizi sorunsuz tamamlamanıza yardımcı oluyoruz.',
          features: [
            {
              icon: '🇹🇷',
              title: 'Türkiye İkamet İzni',
              description: 'Yabancılar için kısa/uzun dönem ikamet, çalışma izni ve vatandaşlık başvuruları'
            },
            {
              icon: '🇨🇦',
              title: 'Kanada Express Entry',
              description: 'Federal Skilled Worker, Canadian Experience Class ve Federal Skilled Trades programları'
            },
            {
              icon: '�🇦',
              title: 'Provincial Nominee Program',
              description: 'Kanada eyalet bazlı göçmenlik programları (Ontario, British Columbia, Alberta vb.)'
            },
            {
              icon: '🌍',
              title: 'Diğer Ülkeler',
              description: 'ABD Green Card, Avustralya Skilled Migration, Avrupa Golden Visa programları'
            },
            {
              icon: '📋',
              title: 'Evrak Yönetimi',
              description: 'Tüm belgelerin çevirisi, tasdiki, apostil ve konsolosluk onayı işlemleri'
            },
            {
              icon: '🎯',
              title: 'Puan Hesaplama',
              description: 'Express Entry CRS puanı ve eyalet programları uygunluk değerlendirmesi'
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
          title: 'Mesleki Belgelendirme ve Denklik Hizmetleri',
          subtitle: 'WES, ICAS, CES ve Uluslararası Diploma Denklik İşlemleri',
          description: 'Yurt dışında çalışmak, eğitim görmek veya göçmenlik başvurusu yapmak isteyenler için diploma ve sertifikaların uluslararası kuruluşlarca değerlendirilmesi gereklidir. Kanada için WES (World Education Services), ICAS (International Credential Assessment Service), CES (Comparative Education Service); ABD, İngiltere, Avustralya ve diğer ülkeler için diploma denklik başvurularınızı profesyonelce yönetiyoruz. E-Devlet üzerinden barkodlu belge çıkarma, YÖK onaylı diploma sureti alma, noter tasdiki, apostil işlemleri ve konsolosluk onayı gibi tüm adımlarda size rehberlik ediyoruz.',
          features: [
            {
              icon: '🇨🇦',
              title: 'WES (World Education Services)',
              description: 'Kanada için en yaygın diploma denklik kuruluşu - transkript ve diploma değerlendirmesi'
            },
            {
              icon: '🇨🇦',
              title: 'ICAS (International Credential Assessment)',
              description: 'Kanada için diploma denklik değerlendirmesi - akademik ve mesleki sertifikalar'
            },
            {
              icon: '🎓',
              title: 'CES (Comparative Education Service)',
              description: 'Toronto Üniversitesi destekli denklik hizmeti - lisans ve lisansüstü değerlendirme'
            },
            {
              icon: '📜',
              title: 'E-Devlet ve YÖK Belgeleri',
              description: 'Barkodlu transkript, diploma tasdik belgesi, YÖK onaylı tercüme ve apostil işlemleri'
            },
            {
              icon: '✅',
              title: 'Apostil ve Konsolosluk Onayı',
              description: 'Belgelerin uluslararası geçerliliği için Dışişleri Bakanlığı apostil ve konsolosluk tasdiki'
            },
            {
              icon: '🌍',
              title: 'Diğer Ülkeler',
              description: 'ABD, İngiltere, Avustralya, Almanya için diploma denklik başvuru danışmanlığı'
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
