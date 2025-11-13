import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>İletişim</h1>
          <p>Profesyonel çeviri hizmetleri için bizimle iletişime geçin</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>İletişim Bilgileri</h3>

              <div className="contact-item">
                <strong>Telefon:</strong>
                <a href="tel:+905447215315">+90 544 721 53 15</a>
              </div>

              <div className="contact-item">
                <strong>WhatsApp:</strong>
                <a href="https://wa.me/905447215315" target="_blank" rel="noopener noreferrer">
                  +90 544 721 53 15
                </a>
              </div>

              <div className="contact-item">
                <strong>E-posta:</strong>
                <a href="mailto:info@tekintercume.com.tr">info@tekintercume.com.tr</a>
              </div>

              <div className="contact-item">
                <strong>Web:</strong>
                <a href="https://www.tekintercume.com.tr" target="_blank" rel="noopener noreferrer">
                  www.tekintercume.com.tr
                </a>
              </div>

              <div className="contact-item">
                <strong>Instagram:</strong>
                <a href="https://www.instagram.com/tekintercume/" target="_blank" rel="noopener noreferrer">
                  @tekintercume
                </a>
              </div>
            </div>

            <div className="hours-card">
              <h3>Çalışma Saatleri</h3>
              <p>Pazartesi - Cuma: 09:00 - 18:00</p>
              <p>Cumartesi: 09:00 - 13:00</p>
              <p>Pazar: Kapalı</p>
              <p><small>WhatsApp 7/24 aktif</small></p>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="form-card">
              <h3>Mesaj Gönder</h3>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-posta</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Hizmet Türü</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Seçiniz</option>
                    <option value="document">Belge Çevirisi</option>
                    <option value="notary">Noter Onaylı Çeviri</option>
                    <option value="interpretation">Sözlü Tercüme</option>
                    <option value="visa">Vize Başvuru Çevirisi</option>
                    <option value="technical">Teknik Çeviri</option>
                    <option value="urgent">Acil Çeviri</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mesajınız</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    placeholder="Çeviri ihtiyacınızı detaylı olarak açıklayın..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="quick-contact">
          <div className="quick-contact-card">
            <h3>Hızlı İletişim</h3>
            <p>Acil çeviri ihtiyacınız için</p>
            <div className="quick-buttons">
              <a href="https://wa.me/905447215315" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href="tel:+905447215315" className="call-btn">
                Ara
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
