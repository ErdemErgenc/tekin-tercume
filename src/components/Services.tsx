import React from 'react';
import './Services.css';

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      icon: '🌐',
      title: 'Profesyonel Çeviri',
      subtitle: 'Her dilde uzman çevirmenler',
      features: [
        'Akademik, teknik, hukuki ve ticari metinlerde profesyonellik',
        'Doğru, güvenilir ve terminolojiye uygun çeviri'
      ]
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Hızlı Teslimat',
      subtitle: 'Zamanında teslim garantisi',
      features: [
        'Acil işlerinizde öncelikli hizmet',
        'Süreye uygun planlama ve hızlı sonuç'
      ]
    },
    {
      id: 3,
      icon: '👤',
      title: 'Gizlilik ve Güvenlik',
      subtitle: 'Belgeleriniz güvende',
      features: [
        'Tüm çeviriler gizlilik ilkesiyle korunur',
        'Müşteri verileri üçüncü kişilerle paylaşılmaz'
      ]
    },
    {
      id: 4,
      icon: '🕒',
      title: '7/24 Ulaşılabilirlik',
      subtitle: 'Her zaman yanınızdayız',
      features: [
        'Online destek ve iletişim',
        'Esnek çalışma saatleri'
      ]
    },
    {
      id: 5,
      icon: '⭐',
      title: 'Kalite Garantisi',
      subtitle: 'Kontrollü ve onaylı çeviri',
      features: [
        'Çift kontrol sistemi ile hatasız teslim',
        'Profesyonel editör onayı'
      ]
    },
    {
      id: 6,
      icon: '💰',
      title: 'Uygun Fiyat Politikası',
      subtitle: 'Kaliteyi uygun fiyata alın',
      features: [
        'Şeffaf ve sürprizsiz fiyatlandırma',
        'Uzun vadeli iş birliklerinde özel indirimler'
      ]
    }
  ];

  return (
    <section className="services">
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">Çeviri Ofisinin Faydaları</h2>
          <p className="section-subtitle">
            Profesyonel çeviri hizmetlerimizle güvenilir çözümler sunuyoruz
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card card">
              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <div className="service-info">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                </div>
              </div>

              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index} className="service-feature">
                    <span className="feature-bullet">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        <div className="services-footer">
          <div className="success-rate">
            <div className="stats-card">
              <div className="stats-number">%98</div>
              <div className="stats-text">
                <h3>Müşteri Memnuniyeti</h3>
                <p>Çeviri hizmeti arayan müşterilerin büyük çoğunluğu bizi tercih ediyor ve tavsiye ediyor.</p>
              </div>
            </div>
            <div className="additional-stats">
              <div className="stat-item">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Yıl Tecrübe</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🌍</div>
                <div className="stat-info">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Dil Desteği</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Hızlı Hizmet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
