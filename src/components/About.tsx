import React from 'react';
import './About.css';

const About: React.FC = () => {
  const stats = [
    { number: '15+', label: 'Yıllık Tecrübe' },
    { number: '5000+', label: 'Memnun Müşteri' },
    { number: '25+', label: 'Dil Desteği' },
    { number: '%98', label: 'Müşteri Memnuniyeti' }
  ];

  const features = [
    {
      icon: '🏆',
      title: 'Uzman Kadro',
      description: 'Alanında uzman ve deneyimli yeminli tercümanlar ile akademik, teknik, hukuki ve ticari metinlerde profesyonel çeviri hizmeti sunuyoruz'
    },
    {
      icon: '⚡',
      title: 'Hızlı Teslimat',
      description: 'Acil işlerinizde 24 saat içinde çeviri hizmeti ile zamanında teslim garantisi ve öncelikli hizmet sunuyoruz'
    },
    {
      icon: '🔒',
      title: 'Güvenilir Hizmet',
      description: 'Tüm çevirileriniz gizlilik ilkesiyle korunur, müşteri verileri ve belgeleriniz üçüncü kişilerle kesinlikle paylaşılmaz'
    },
    {
      icon: '📋',
      title: 'Kalite Garantisi',
      description: 'Çift kontrol sistemi ile hatasız teslim, yeminli tercüman onaylı resmi belgeler ve profesyonel editör onayı ile kalite garantisi'
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <div className="section-badge">
            <span>Hakkımızda</span>
          </div>
          <h2 className="section-title">
            Türkiye'nin <span className="highlight-text">Güvenilir</span>
            <br />Çeviri Partneri
          </h2>
          <p className="section-subtitle">
            Tekin Tercüme olarak, Adalet Bakanlığı onaylı yeminli tercümanlarımızla profesyonel çeviri hizmetleri sunuyoruz. 
            Diyarbakır merkezli ofisimizden Türkiye geneline ve yurtdışına noter onaylı yeminli tercüme, vize danışmanlığı, 
            göçmenlik hizmetleri ve mesleki belgelendirme desteği sağlıyoruz. Müşteri memnuniyeti odaklı yaklaşımımızla, 
            güvenilir ve hızlı çözümler üretiyoruz.
          </p>
        </div>

        {/* Main Content */}
        <div className="about-main">
          {/* Left Content */}
          <div className="about-content">
            <div className="company-info">
              <h3>Neden Tekin Tercüme?</h3>
              <p>
                Yılların deneyimi ve sektördeki uzmanlığımızla, tüm çeviri ihtiyaçlarınıza en kaliteli çözümü sunuyoruz. 
                Yeminli tercümanlarımız, her dil ve belge türünde titizlikle çalışarak hatasız ve profesyonel sonuçlar üretir. 
                Hızlı teslimat, uygun fiyat ve kesintisiz müşteri desteği ile yanınızdayız. Resmi kurumlar tarafından 
                kabul edilen belgelerimizle vize, göçmenlik ve resmi başvuru süreçlerinizde güvenle ilerleyebilirsiniz.
              </p>

              <div className="feature-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="about-stats">
            <div className="stats-container">
              <div className="stats-header">
                <h3>Rakamlarla Tekin Tercüme</h3>
              </div>

              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="achievement-badge">
                <div className="badge-content">
                  <div className="badge-icon">🥇</div>
                  <div className="badge-text">
                    <strong>Sektör Lideri</strong>
                    <span>Türkiye'nin en güvenilir çeviri merkezi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <div className="benefits-header">
            <h3>Çeviri Ofisinin Faydaları</h3>
            <p>Profesyonel çeviri hizmetimizle neler kazanırsınız?</p>
          </div>

          <div className="benefits-container">
            <div className="benefit-box">
              <div className="benefit-box-icon">🎯</div>
              <h4>Doğruluk ve Güvenilirlik</h4>
              <p>Uzman tercümanlarımız sayesinde hatasız ve profesyonel çeviriler</p>
            </div>

            <div className="benefit-box">
              <div className="benefit-box-icon">⏱️</div>
              <h4>Zaman Tasarrufu</h4>
              <p>Acil işlerinizde 24 saat içinde teslimat garantisi</p>
            </div>

            <div className="benefit-box">
              <div className="benefit-box-icon">✅</div>
              <h4>Resmi Onay</h4>
              <p>Yeminli tercüman onaylı belgelerle tüm resmi işlemlerinizde geçerlilik</p>
            </div>

            <div className="benefit-box">
              <div className="benefit-box-icon">🌐</div>
              <h4>Geniş Dil Seçeneği</h4>
              <p>25+ dilde çeviri hizmeti ile tüm ihtiyaçlarınıza çözüm</p>
            </div>

            <div className="benefit-box">
              <div className="benefit-box-icon">💼</div>
              <h4>Profesyonel Destek</h4>
              <p>Süreç boyunca uzman ekibimizin tam desteği</p>
            </div>

            <div className="benefit-box">
              <div className="benefit-box-icon">🔐</div>
              <h4>Gizlilik Garantisi</h4>
              <p>Belgelerinizin güvenliği ve mahremiyeti bizim önceliğimiz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
