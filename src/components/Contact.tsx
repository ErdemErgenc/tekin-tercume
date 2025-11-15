import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>İletişim</h1>
          <p>Profesyonel Çeviri Hizmetleri İçin Bizimle İletişime Geçin</p>
        </div>

        {/* İletişim Bilgileri ve Çalışma Saatleri */}
        <div className="contact-main-grid">
          <div className="contact-info-card">
            <h3>İletişim Bilgileri</h3>
            <div className="info-items">
              <div className="info-item">
                <div className="icon">📱</div>
                <div className="info-content">
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/905447215315" target="_blank" rel="noopener noreferrer">
                    +90 544 721 53 15
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">📞</div>
                <div className="info-content">
                  <strong>Mobil Telefon</strong>
                  <a href="tel:+905447215315">+90 544 721 53 15</a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">☎️</div>
                <div className="info-content">
                  <strong>Ofis Telefonu</strong>
                  <a href="tel:+904242387254">+90 424 238 72 54</a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">✉️</div>
                <div className="info-content">
                  <strong>E-posta</strong>
                  <a href="mailto:infotekintercume@gmail.com">infotekintercume@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">📍</div>
                <div className="info-content">
                  <strong>Adres</strong>
                  <span>Nailbey Mah. Gazi Cad. 50'ler, Çarşı, Kat:5, 23100 Elazığ Merkez/Elazığ</span>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">📸</div>
                <div className="info-content">
                  <strong>Instagram</strong>
                  <a href="https://www.instagram.com/tekintercume/" target="_blank" rel="noopener noreferrer">
                    @tekintercume
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="working-hours-card">
            <h3>Çalışma Saatleri</h3>
            <div className="hours-list">
              <div className="hours-item">
                <span className="day">Pazartesi</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">Salı</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">Çarşamba</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">Perşembe</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">Cuma</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">Cumartesi</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">Pazar</span>
                <span className="time">08:00 - 18:30</span>
              </div>
            </div>
            <div className="hours-note">
              <p>⏰ WhatsApp 7/24 aktif - Acil durumlar için her zaman ulaşabilirsiniz.</p>
            </div>
          </div>
        </div>

        {/* Konum - Harita */}
        <div className="map-section">
          <h3>Konum</h3>
          <p className="map-description">Nailbey Mah. Gazi Cad. 50'ler, Çarşı, Kat:5, 23100 Elazığ Merkez/Elazığ</p>
          <div className="map-container">
            <iframe
              title="Tekin Tercüme Konum"
              className="map-iframe"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "Nailbey Mah. Gazi Cad. 50'ler, Çarşı, Kat:5, 23100 Elazığ Merkez/Elazığ"
              )}&output=embed`}
            />
          </div>
          <div className="map-actions">
            <a
              className="map-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                "Nailbey Mah. Gazi Cad. 50'ler, Çarşı, Kat:5, 23100 Elazığ Merkez/Elazığ"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 Google Haritalar'da Aç
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
