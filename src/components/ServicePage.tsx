import React, { useState } from 'react';
import CA from 'country-flag-icons/react/3x2/CA';
import TR from 'country-flag-icons/react/3x2/TR';
import './ServicePages.css';

interface ServicePageProps {
  onNavigate: (page: string) => void;
  serviceType: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ onNavigate, serviceType }) => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const renderIcon = (icon: string, title?: string) => {
    const t = (title || '').toLowerCase();
    const isCA = icon === '🇨🇦' || t.includes('kanada') || t.includes('canada');
    const isTR = icon === '🇹🇷' || t.includes('türkiye') || t.includes('turkiye') || t.includes('turkey');
    if (isCA) return <CA className="flag-svg" title="Canada" />;
    if (isTR) return <TR className="flag-svg" title="Türkiye" />;
    return icon;
  };
  const getServiceContent = () => {
    switch (serviceType) {
      case 'translation-service':
        return {
          title: 'Tercüme Hizmeti',
          subtitle: 'Profesyonel Çeviri Hizmetleri',
          description: 'Resmî belgelerinizin, akademik çalışmalarınızın ve iş evraklarınızın güvenilir ve doğru çevirisini sunuyoruz. Deneyimli tercüman ekibimiz; Türkçe, Almanca, İngilizce ve diğer birçok dilde profesyonel hizmet vermektedir. Apostil, noter onayı ve yeminli tercüme gibi ihtiyaçlarınıza uygun çözümlerle belgelerinizin uluslararası geçerliliğini sağlıyoruz.',
          features: [
            {
              icon: '📄',
              title: 'Resmi Belge Çevirisi',
              description: 'Pasaport, nüfus cüzdanı, diploması, transkriptler ve tüm resmi belgeleriniz',
              detail: 'Resmî belgelerinizin, akademik çalışmalarınızın ve iş evraklarınızın güvenilir ve doğru çevirisini sunuyoruz. Deneyimli tercüman ekibimiz; Türkçe, Almanca, İngilizce ve diğer birçok dilde profesyonel hizmet vermektedir. Apostil, noter onayı ve yeminli tercüme gibi ihtiyaçlarınıza uygun çözümlerle belgelerinizin uluslararası geçerliliğini sağlıyoruz.'
            },
            {
              icon: '⚖️',
              title: 'Yeminli Tercüman',
              description: 'Adalet Bakanlığı onaylı yeminli tercümanlar tarafından çeviri',
              detail: 'Resmî belgelerinizin, akademik çalışmalarınızın ve iş evraklarınızın güvenilir ve doğru çevirisini sunuyoruz. Deneyimli tercüman ekibimiz; Türkçe, Almanca, İngilizce ve diğer birçok dilde profesyonel hizmet vermektedir. Apostil, noter onayı ve yeminli tercüme gibi ihtiyaçlarınıza uygun çözümlerle belgelerinizin uluslararası geçerliliğini sağlıyoruz.'
            },
            {
              icon: '🌍',
              title: '128 Dil Desteği',
              description: 'İngilizce, Almanca, Fransızca, İtalyanca ve daha fazlası',
              detail: 'Resmî belgelerinizin, akademik çalışmalarınızın ve iş evraklarınızın güvenilir ve doğru çevirisini sunuyoruz. Deneyimli tercüman ekibimiz; Türkçe, Almanca, İngilizce ve diğer birçok dilde profesyonel hizmet vermektedir. Apostil, noter onayı ve yeminli tercüme gibi ihtiyaçlarınıza uygun çözümlerle belgelerinizin uluslararası geçerliliğini sağlıyoruz.'
            },
            {
              icon: '⚡',
              title: 'Hızlı Teslimat',
              description: '24 saat içinde acil çeviri hizmeti mevcuttur',
              detail: 'Resmî belgelerinizin, akademik çalışmalarınızın ve iş evraklarınızın güvenilir ve doğru çevirisini sunuyoruz. Deneyimli tercüman ekibimiz; Türkçe, Almanca, İngilizce ve diğer birçok dilde profesyonel hizmet vermektedir. Apostil, noter onayı ve yeminli tercüme gibi ihtiyaçlarınıza uygun çözümlerle belgelerinizin uluslararası geçerliliğini sağlıyoruz.'
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
          subtitle: 'Turistik, Çalışma ve Aile Birleşimi Vizelerinde Profesyonel Destek',
          description: 'Yurt dışına seyahat planınızda en önemli adımlardan biri olan vize sürecinde yanınızdayız. Belgelerinizin hazırlanmasından başvuru formlarının doldurulmasına, randevu alımından takip sürecine kadar her aşamada danışmanlık hizmeti sunuyoruz. Profesyonel ekibimiz sayesinde vize başvurularınız hızlı, eksiksiz ve güvenli bir şekilde ilerler.',
          features: [
            {
              icon: '✈️',
              title: 'Turistik Vizesi',
              description: 'Seyahat etmek istediğiniz ülkenin turistik vize başvurusunda gerekli tüm belgeleri hazırlamanıza yardımcı oluyoruz',
              detail: 'Seyahat etmek istediğiniz ülkenin turistik vize başvurusunda gerekli tüm belgeleri hazırlamanıza yardımcı oluyoruz. Uçuş ve konaklama belgelerinden seyahat sigortasına kadar süreci şeffaf şekilde yönetiyor, sorunsuz bir vize onayı için size rehberlik ediyoruz.'
            },
            {
              icon: '💼',
              title: 'Çalışma Vizesi',
              description: 'Yurt dışında kariyer yapmak isteyenler için çalışma vizesi danışmanlığı sunuyoruz',
              detail: 'Yurt dışında kariyer yapmak isteyenler için çalışma vizesi danışmanlığı sunuyoruz. İş sözleşmelerinizin ve gerekli belgelerin hazırlanmasında profesyonel destek veriyor, ülkeye göre değişen prosedürlerde en güncel bilgileri sağlıyoruz.'
            },
            {
              icon: '👨‍👩‍👧‍👦',
              title: 'Aile Birleşimi Vizesi',
              description: 'Ailenize kavuşmanız için tüm resmi süreçlerde yanınızdayız',
              detail: 'Ailenize kavuşmanız için tüm resmi süreçlerde yanınızdayız. Evlilik ve doğum belgelerinin tercümesi, başvuru dosyasının hazırlanması ve konsolosluk görüşmesi için rehberlik hizmeti sunuyoruz. Aile birleşimi sürecinizi en hızlı ve sorunsuz şekilde tamamlamanıza yardımcı oluyoruz.'
            },
            {
              icon: '🎓',
              title: 'Öğrenci Vizesi',
              description: 'Yurt dışına seyahat planınızda en önemli adımlardan biri olan vize sürecinde yanınızdayız',
              detail: 'Yurt dışına seyahat planınızda en önemli adımlardan biri olan vize sürecinde yanınızdayız. Belgelerinizin hazırlanmasından başvuru formlarının doldurulmasına, randevu alımından takip sürecine kadar her aşamada danışmanlık hizmeti sunuyoruz. Profesyonel ekibimiz sayesinde vize başvurularınız hızlı, eksiksiz ve güvenli bir şekilde ilerler.'
            },
            {
              icon: '📋',
              title: 'Evrak Hazırlama',
              description: 'Vize başvurusu için gerekli tüm belgelerin çevirisi, tasdiki ve düzenlenmesi',
              detail: 'Yurt dışına seyahat planınızda en önemli adımlardan biri olan vize sürecinde yanınızdayız. Belgelerinizin hazırlanmasından başvuru formlarının doldurulmasına, randevu alımından takip sürecine kadar her aşamada danışmanlık hizmeti sunuyoruz. Profesyonel ekibimiz sayesinde vize başvurularınız hızlı, eksiksiz ve güvenli bir şekilde ilerler.'
            },
            {
              icon: '🗓️',
              title: 'Randevu Yönetimi',
              description: 'Konsolosluk ve vize merkezi randevularının alınması ve takibi',
              detail: 'Yurt dışına seyahat planınızda en önemli adımlardan biri olan vize sürecinde yanınızdayız. Belgelerinizin hazırlanmasından başvuru formlarının doldurulmasına, randevu alımından takip sürecine kadar her aşamada danışmanlık hizmeti sunuyoruz. Profesyonel ekibimiz sayesinde vize başvurularınız hızlı, eksiksiz ve güvenli bir şekilde ilerler.'
            }
          ],
          pricing: []
        };

      case 'immigration-services':
        return {
          title: 'Göçmenlik Hizmetleri',
          subtitle: 'Türkiye, Kanada ve Diğer Ülkelere Kalıcı İkamet Süreçleri',
          description: 'Yeni bir ülkeye yerleşme süreci ciddi hazırlık ve doğru adımlar gerektirir. Alanında uzman danışmanlarımızla göçmenlik başvurularınızda güvenilir destek sağlıyoruz. Belgelerinizin eksiksiz hazırlanmasını, başvurularınızın güncel mevzuata uygun olmasını garanti ediyoruz.',
          features: [
            {
              icon: '🇹🇷',
              title: 'Türkiye İkamet İzni',
              description: 'Türkiye\'de uzun süre kalmak isteyen yabancılar için ikamet izni başvurularında profesyonel danışmanlık sunuyoruz',
              detail: 'Türkiye\'de uzun süre kalmak isteyen yabancılar için ikamet izni başvurularında profesyonel danışmanlık sunuyoruz. Gerekli belgelerin hazırlanmasından online başvurunun yapılmasına kadar tüm süreçte sizinle birlikteyiz.'
            },
            {
              icon: '🇨🇦',
              title: 'Kanada İkamet İzni',
              description: 'Kanada\'da eğitim, çalışma veya aile birleşimi yoluyla oturum almak isteyenlere özel danışmanlık sağlıyoruz',
              detail: 'Kanada\'da eğitim, çalışma veya aile birleşimi yoluyla oturum almak isteyenlere özel danışmanlık sağlıyoruz. Başvurularınızın Kanada göçmenlik yasalarına uygun yapılması için profesyonel destek sunarak süreci güvenle tamamlamanızı sağlıyoruz.'
            },
            {
              icon: '🇨🇦',
              title: 'Kanada Express Entry',
              description: 'Kanada\'da kalıcı oturum hakkı elde etmenin en hızlı ve en popüler yollarından biri Express Entry sistemidir',
              detail: 'Kanada\'da kalıcı oturum hakkı elde etmenin en hızlı ve en popüler yollarından biri Express Entry sistemidir. Bu sistem, nitelikli iş gücünü Kanada\'ya çekmek için puan esaslı bir göçmenlik programıdır. Eğitim durumu, iş deneyimi, dil yeterliliği (İngilizce/Fransızca) ve yaş gibi kriterlere göre değerlendirilen başvuru sahipleri arasından en yüksek puanı alan adaylar davet edilmektedir. Biz, başvuru sürecinizde doğru stratejiyle ilerlemenizi sağlıyoruz. Profil oluşturma, gerekli belgelerin hazırlanması, dil sınavı yönlendirmesi, iş deneyimi ve eğitim belgelerinizin resmi denklik süreci (ECA) gibi tüm aşamalarda profesyonel danışmanlık sunuyoruz. Hedefiniz Kanada\'da yeni bir yaşam kurmaksa, Express Entry başvurunuzu eksiksiz ve güçlü bir dosya ile hazırlamanız için yanınızdayız.'
            },
            {
              icon: '🇨🇦',
              title: 'Provincial Nominee Program',
              description: 'Kanada eyalet bazlı göçmenlik programları (Ontario, British Columbia, Alberta vb.)',
              detail: 'Yeni bir ülkeye yerleşme süreci ciddi hazırlık ve doğru adımlar gerektirir. Alanında uzman danışmanlarımızla göçmenlik başvurularınızda güvenilir destek sağlıyoruz. Belgelerinizin eksiksiz hazırlanmasını, başvurularınızın güncel mevzuata uygun olmasını garanti ediyoruz.'
            },
            {
              icon: '🌍',
              title: 'Diğer Ülkeler',
              description: 'ABD Green Card, Avustralya Skilled Migration, Avrupa Golden Visa programları',
              detail: 'Yeni bir ülkeye yerleşme süreci ciddi hazırlık ve doğru adımlar gerektirir. Alanında uzman danışmanlarımızla göçmenlik başvurularınızda güvenilir destek sağlıyoruz. Belgelerinizin eksiksiz hazırlanmasını, başvurularınızın güncel mevzuata uygun olmasını garanti ediyoruz.'
            },
            {
              icon: '📋',
              title: 'Evrak Yönetimi',
              description: 'Tüm belgelerin çevirisi, tasdiki, apostil ve konsolosluk onayı işlemleri',
              detail: 'Yeni bir ülkeye yerleşme süreci ciddi hazırlık ve doğru adımlar gerektirir. Alanında uzman danışmanlarımızla göçmenlik başvurularınızda güvenilir destek sağlıyoruz. Belgelerinizin eksiksiz hazırlanmasını, başvurularınızın güncel mevzuata uygun olmasını garanti ediyoruz.'
            },
            {
              icon: '🎯',
              title: 'Puan Hesaplama',
              description: 'Express Entry CRS puanı ve eyalet programları uygunluk değerlendirmesi',
              detail: 'Yeni bir ülkeye yerleşme süreci ciddi hazırlık ve doğru adımlar gerektirir. Alanında uzman danışmanlarımızla göçmenlik başvurularınızda güvenilir destek sağlıyoruz. Belgelerinizin eksiksiz hazırlanmasını, başvurularınızın güncel mevzuata uygun olmasını garanti ediyoruz.'
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
          title: 'Mesleki Belgelendirme Hizmetleri',
          subtitle: 'WES, ICAS, CES ve Uluslararası Diploma Denklik İşlemleri',
          description: 'Kariyerinizde fark yaratacak belgelerinizin doğruluğunu ve uluslararası geçerliliğini sağlıyoruz. Eğitim ve mesleki yeterlilik belgelerinizin resmi geçerliliğe uygun hazırlanması için profesyonel destek sunuyoruz.',
          features: [
            {
              icon: '🇨🇦',
              title: 'WES (World Education Services)',
              description: 'Kanada için en yaygın diploma denklik kuruluşu - transkript ve diploma değerlendirmesi',
              detail: 'Kariyerinizde fark yaratacak belgelerinizin doğruluğunu ve uluslararası geçerliliğini sağlıyoruz. Eğitim ve mesleki yeterlilik belgelerinizin resmi geçerliliğe uygun hazırlanması için profesyonel destek sunuyoruz.'
            },
            {
              icon: '🇨🇦',
              title: 'ICAS (International Credential Assessment)',
              description: 'Kanada için diploma denklik değerlendirmesi - akademik ve mesleki sertifikalar',
              detail: 'Kariyerinizde fark yaratacak belgelerinizin doğruluğunu ve uluslararası geçerliliğini sağlıyoruz. Eğitim ve mesleki yeterlilik belgelerinizin resmi geçerliliğe uygun hazırlanması için profesyonel destek sunuyoruz.'
            },
            {
              icon: '🎓',
              title: 'CES (Comparative Education Service)',
              description: 'Toronto Üniversitesi destekli denklik hizmeti - lisans ve lisansüstü değerlendirme',
              detail: 'Kariyerinizde fark yaratacak belgelerinizin doğruluğunu ve uluslararası geçerliliğini sağlıyoruz. Eğitim ve mesleki yeterlilik belgelerinizin resmi geçerliliğe uygun hazırlanması için profesyonel destek sunuyoruz.'
            },
            {
              icon: '📜',
              title: 'Barkodlu E-Devlet Eğitim Sertifikaları',
              description: 'Türkiye\'de alınan resmi eğitim sertifikalarının barkodlu doğrulama sistemleri üzerinden geçerlilikleri',
              detail: 'Türkiye\'de alınan resmi eğitim sertifikalarının barkodlu doğrulama sistemleri üzerinden geçerliliklerini sağlıyor, yurtdışı kurum ve kuruluşlarda kabul edilebilirliğini artırıyoruz.'
            },
            {
              icon: '✅',
              title: 'Uluslararası Sertifikalar',
              description: 'Eğitim, mesleki yeterlilik ve uzmanlık alanlarında aldığınız uluslararası sertifikaların geçerliliği',
              detail: 'Eğitim, mesleki yeterlilik ve uzmanlık alanlarında aldığınız uluslararası sertifikaların geçerliliğini sağlamak için danışmanlık hizmeti sunuyoruz. Belgelerinizin resmi kurumlarda tanınması için gerekli adımları profesyonelce yönetiyoruz.'
            },
            {
              icon: '🌍',
              title: 'Diğer Ülkeler',
              description: 'ABD, İngiltere, Avustralya, Almanya için diploma denklik başvuru danışmanlığı',
              detail: 'Kariyerinizde fark yaratacak belgelerinizin doğruluğunu ve uluslararası geçerliliğini sağlıyoruz. Eğitim ve mesleki yeterlilik belgelerinizin resmi geçerliliğe uygun hazırlanması için profesyonel destek sunuyoruz.'
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
              <div
                key={index}
                className="feature-item"
                onClick={() => setSelectedFeature(feature)}
                style={{ cursor: 'pointer' }}
              >
                <div className="feature-icon">{renderIcon(feature.icon, feature.title)}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <button className="details-btn">
                  Detaylı Bilgi →
                </button>
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

        {/* Modal */}
        {selectedFeature && (
          <div className="service-modal" onClick={() => setSelectedFeature(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedFeature(null)}>
                ✕
              </button>

              <div className="modal-header">
                <span className="modal-icon">{selectedFeature.icon}</span>
                <h3 className="modal-title">{selectedFeature.title}</h3>
              </div>

              <div className="modal-body">
                <p className="modal-description">{selectedFeature.detail}</p>
              </div>

              <div className="modal-footer">
                <button className="modal-cta-btn" onClick={() => setSelectedFeature(null)}>
                  Anladım
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
