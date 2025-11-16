import React from 'react';
import './Contact.css';
import { useI18n } from '../lib/i18n';

const Contact: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>

        {/* İletişim Bilgileri ve Çalışma Saatleri */}
        <div className="contact-main-grid">
          <div className="contact-info-card">
            <h3>{t('contact.info')}</h3>
            <div className="info-items">
              <div className="info-item">
                <div className="icon">📱</div>
                <div className="info-content">
                  <strong>{t('contact.labels.whatsapp')}</strong>
                  <a href="https://wa.me/905447215315" target="_blank" rel="noopener noreferrer">
                    +90 544 721 53 15
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">📞</div>
                <div className="info-content">
                  <strong>{t('contact.labels.mobile')}</strong>
                  <a href="tel:+905447215315">+90 544 721 53 15</a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">☎️</div>
                <div className="info-content">
                  <strong>{t('contact.labels.office')}</strong>
                  <a href="tel:+904242387254">+90 424 238 72 54</a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">✉️</div>
                <div className="info-content">
                  <strong>{t('contact.labels.email')}</strong>
                  <a href="mailto:infotekintercume@gmail.com">info@tekintercume.com.tr</a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">📍</div>
                <div className="info-content">
                  <strong>{t('contact.labels.address')}</strong>
                  <span>Nailbey Mah. Gazi Cad. 50'ler, Çarşı, Kat:5, 23100 Elazığ Merkez/Elazığ</span>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">📸</div>
                <div className="info-content">
                  <strong>{t('contact.labels.instagram')}</strong>
                  <a href="https://www.instagram.com/tekintercume/" target="_blank" rel="noopener noreferrer">
                    @tekintercume
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="working-hours-card">
            <h3>{t('contact.hours.title')}</h3>
            <div className="hours-list">
              <div className="hours-item">
                <span className="day">{t('contact.hours.mon')}</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">{t('contact.hours.tue')}</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">{t('contact.hours.wed')}</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">{t('contact.hours.thu')}</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">{t('contact.hours.fri')}</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">{t('contact.hours.sat')}</span>
                <span className="time">08:00 - 18:30</span>
              </div>
              <div className="hours-item">
                <span className="day">{t('contact.hours.sun')}</span>
                <span className="time">08:00 - 18:30</span>
              </div>
            </div>
            <div className="hours-note">
              <p>{t('contact.hours.note')}</p>
            </div>
          </div>
        </div>

        {/* Konum - Harita */}
        <div className="map-section">
          <h3>{t('contact.location.title')}</h3>
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
              {t('contact.location.openInMaps')}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
