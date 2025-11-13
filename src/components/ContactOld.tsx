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
    // Form submission logic here
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
        <div className="contact-hero">
          <div className="contact-hero-content">
            <h1 className="hero-title">İletişim</h1>
            <p className="hero-subtitle">
              Çeviri ihtiyaçlarınız için profesyonel destek almaya hazır mısınız?
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <span className="feature-icon">⚡</span>
                <span>Hızlı Yanıt</span>
              </div>
              <div className="hero-feature">
                <span className="feature-icon">💼</span>
                <span>Profesyonel Hizmet</span>
              </div>
              <div className="hero-feature">
                <span className="feature-icon">🌍</span>
                <span>25+ Dil Desteği</span>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="contact-methods">
            <div className="method-card primary-card">
              <div className="method-icon-wrapper">
                <div className="method-icon whatsapp-icon">�</div>
              </div>
              <div className="method-content">
                <h3>WhatsApp İletişim</h3>
                <p>Anında mesajlaşma ve hızlı destek</p>
                <a href="https://wa.me/905447215315" className="method-btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  <span className="btn-icon">📱</span>
                  WhatsApp'ta Yazın
                </a>
                <span className="method-number">+90 544 721 53 15</span>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon-wrapper">
                <div className="method-icon phone-icon">📞</div>
              </div>
              <div className="method-content">
                <h3>Telefon</h3>
                <p>Direkt görüşme ve danışmanlık</p>
                <a href="tel:+905447215315" className="method-btn phone-btn">
                  <span className="btn-icon">☎️</span>
                  Hemen Arayın
                </a>
                <div className="method-details">
                  <span className="method-number">+90 544 721 53 15</span>
                  <span className="working-hours">Pazartesi - Cuma: 09:00 - 18:00</span>
                </div>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon-wrapper">
                <div className="method-icon email-icon">✉️</div>
              </div>
              <div className="method-content">
                <h3>E-posta</h3>
                <p>Detaylı bilgi ve dosya paylaşımı</p>
                <a href="mailto:info@tekintercume.com.tr" className="method-btn email-btn">
                  <span className="btn-icon">📧</span>
                  E-posta Gönderin
                </a>
                <div className="method-details">
                  <span className="method-email">info@tekintercume.com.tr</span>
                  <span className="response-time">24 saat içinde yanıt</span>
                </div>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon-wrapper">
                <div className="method-icon social-icon">📱</div>
              </div>
              <div className="method-content">
                <h3>Sosyal Medya</h3>
                <p>Güncel haberler ve referanslar</p>
                <a href="https://www.instagram.com/tekintercume/" className="method-btn instagram-btn" target="_blank" rel="noopener noreferrer">
                  <span className="btn-icon">📸</span>
                  Instagram'da Takip Edin
                </a>
                <span className="social-handle">@tekintercume</span>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="form-card">
              <div className="form-header">
                <h3>Hızlı Teklif Alın</h3>
                <p>Çeviri ihtiyaçlarınızı bizimle paylaşın, size özel teklifimizi hazırlayalım</p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Ad Soyad</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Telefon</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-posta Adresi</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    placeholder="ornek@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Hizmet Türü</label>
                  <select 
                    id="service" 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Çeviri türünüzü seçin</option>
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
                  <label htmlFor="message">Çeviri Detayları</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    required
                    placeholder="Çevrilecek belge türü, kaynak ve hedef dil, sayfa sayısı gibi detayları belirtin..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  <span className="btn-icon">🚀</span>
                  Teklif Talep Et
                </button>
                
                <div className="form-note">
                  <p>
                    <span className="note-icon">🔒</span>
                    Bilgileriniz gizli tutulur ve sadece teklif hazırlamak için kullanılır.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="contact-cta">
          <div className="cta-card">
            <h3>Acil Çeviri İhtiyacınız mı Var?</h3>
            <p>7/24 WhatsApp hattımızdan bize ulaşabilirsiniz</p>
            <div className="cta-buttons">
              <a href="https://wa.me/905447215315" className="whatsapp-cta" target="_blank" rel="noopener noreferrer">
                WhatsApp ile Yaz
              </a>
              <a href="tel:+905447215315" className="call-cta">
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
