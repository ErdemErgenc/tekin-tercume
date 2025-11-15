import React, { useState } from 'react';
import './QuickQuote.css';

interface QuickQuoteProps {
  initialFromLanguage?: string;
  initialToLanguage?: string;
  onNavigate: (page: string) => void;
}

const QuickQuote: React.FC<QuickQuoteProps> = ({
  initialFromLanguage = 'turkce',
  initialToLanguage = 'english',
  onNavigate
}) => {
  const [formData, setFormData] = useState({
    fromLang: initialFromLanguage,
    toLang: initialToLanguage,
    document: null as File | null,
    description: '',
    notaryApproval: '',
    multipleCopies: '1',
    urgency: '',
    name: '',
    phone: '',
    email: '',
    contactMethod: 'whatsapp'
  });

  const languages = [
    { value: 'turkce', label: 'Türkçe' },
    { value: 'english', label: 'English' },
    { value: 'deutsch', label: 'Deutsch' },
    { value: 'francais', label: 'Français' },
    { value: 'italiano', label: 'Italiano' },
    { value: 'русский', label: 'Русский' },
    { value: 'العربية', label: 'العربية' },
    { value: '中文', label: '中文' },
    { value: '日本語', label: '日本語' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, document: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📤 Hızlı teklif talebi gönderiliyor:', formData);

    try {
      // Send email via Gmail SMTP backend
      const response = await fetch('http://localhost:3001/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description: formData.description,
          notaryApproval: formData.notaryApproval,
          multipleCopies: formData.multipleCopies,
          contactMethod: formData.contactMethod,
          fromLang: formData.fromLang,
          toLang: formData.toLang,
          urgency: formData.urgency,
          documentName: formData.document?.name || null
        })
      });

      console.log('📬 Response status:', response.status);
      const responseData = await response.json();
      console.log('📧 Response data:', responseData);

      if (responseData.success) {
        alert('✅ Teklif talebiniz başarıyla gönderildi! Emailinizi kontrol edin.');
        onNavigate('home');
      } else {
        throw new Error(responseData.message || 'Email gönderimi başarısız');
      }
    } catch (error) {
      console.error('❌ Email send error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert('❌ Email gönderimi başarısız: ' + errorMessage);
    }
  };

  return (
    <section className="quick-quote">
      <div className="container">
        <div className="quote-header">
          <button className="back-btn" onClick={() => onNavigate('home')}>
            ← Ana Sayfa
          </button>
          <h1>Hızlı Teklif Talebi</h1>
          <p>Çeviri ihtiyaçlarınız için detaylı bilgi verin, size özel teklif hazırlayalım</p>
        </div>

        <form className="quote-form" onSubmit={handleSubmit}>
          <div className="form-sections">
            {/* Dil Bilgileri */}
            <div className="form-section">
              <h3>Çeviri Dilleri</h3>
              <div className="language-selection">
                <div className="form-group">
                  <label>Kaynak Dil</label>
                  <select
                    value={formData.fromLang}
                    onChange={(e) => handleInputChange('fromLang', e.target.value)}
                    required
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="arrow-between">→</div>

                <div className="form-group">
                  <label>Hedef Dil</label>
                  <select
                    value={formData.toLang}
                    onChange={(e) => handleInputChange('toLang', e.target.value)}
                    required
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Belge Bilgileri */}
            <div className="form-section">
              <h3>Belge Detayları</h3>

              <div className="form-group">
                <label>Belge Yükleme</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="document-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <label htmlFor="document-upload" className="file-upload-btn">
                    📎 Belge Seç (.pdf, .doc, .jpg)
                  </label>
                  {formData.document && (
                    <div className="file-info">
                      ✓ {formData.document.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Belge Açıklaması</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Belge türü, sayfa sayısı, özel talepleriniz..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Noter Onayı</label>
                  <select
                    value={formData.notaryApproval}
                    onChange={(e) => handleInputChange('notaryApproval', e.target.value)}
                  >
                    <option value="">Seçiniz</option>
                    <option value="yes">Evet, gerekli</option>
                    <option value="no">Hayır, gerekli değil</option>
                    <option value="unsure">Emin değilim</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Kopya Sayısı</label>
                  <select
                    value={formData.multipleCopies}
                    onChange={(e) => handleInputChange('multipleCopies', e.target.value)}
                  >
                    <option value="1">1 kopya</option>
                    <option value="2">2 kopya</option>
                    <option value="3">3 kopya</option>
                    <option value="more">Daha fazla</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Aciliyet</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                  >
                    <option value="">Normal</option>
                    <option value="urgent">Acil (24 saat)</option>
                    <option value="very-urgent">Çok Acil (12 saat)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div className="form-section">
              <h3>İletişim Bilgileri</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Ad Soyad *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Adınızı ve soyadınızı girin"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Telefon *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+90 5XX XXX XX XX"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>E-posta *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="ornek@email.com"
                  required
                />
              </div>


            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="submit-btn">
              🚀 Teklif Talep Et
            </button>

            <div className="form-note">
              <p>
                🔒 Bilgileriniz güvenli şekilde saklanır ve sadece teklif hazırlamak için kullanılır.
              </p>
              <p>
                ⏱️ Teklifimizi 2 saat içinde size ileteceğiz.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QuickQuote;
