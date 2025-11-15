import React, { useState } from 'react';
import './QuickQuote.css';
import { getEmailConfig } from '../config/emailConfig';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    setIsSubmitting(true);
    setSubmitStatus('idle');
    console.log('📤 Hızlı teklif talebi gönderiliyor:', formData);

    try {
      // Convert file to base64 if exists
      let fileBase64 = null;
      let fileName = null;
      let fileType = null;

      if (formData.document) {
        fileName = formData.document.name;
        fileType = formData.document.type;

        // Read file as base64
        const reader = new FileReader();
        fileBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result as string;
            // Remove data:image/png;base64, prefix
            const base64Data = base64.split(',')[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.document!);
        });
      }

      const config = getEmailConfig();
      const apiUrl = `${config.API_URL}/send-quote`;

      // Send email via Gmail SMTP backend
      const response = await fetch(apiUrl, {
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
          documentName: fileName,
          documentBase64: fileBase64,
          documentType: fileType
        })
      });

      console.log('📬 Response status:', response.status);
      console.log('📬 Response content-type:', response.headers.get('content-type'));

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text.substring(0, 200));
        throw new Error(`Server yanıt hatası (Status: ${response.status}). Backend çalışıyor mu?`);
      }

      const responseData = await response.json();
      console.log('📧 Response data:', responseData);

      if (response.ok && responseData.success) {
        setSubmitStatus('success');
        // 3 saniye sonra ana sayfaya dön
        setTimeout(() => {
          onNavigate('home');
        }, 3000);
      } else {
        throw new Error(responseData.message || `Email gönderimi başarısız (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('❌ Email send error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
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
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || submitStatus === 'success'}
            >
              {isSubmitting ? '⏳ Gönderiliyor...' :
                submitStatus === 'success' ? '✅ Gönderildi!' :
                  '🚀 Teklif Talep Et'}
            </button>

            {/* Loading & Status Messages */}
            {isSubmitting && (
              <div style={{
                marginTop: '20px',
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderTop: '4px solid white',
                  borderRadius: '50%',
                  margin: '0 auto 15px',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <h3 style={{ margin: '0 0 10px', fontSize: '20px' }}>📧 Talebiniz Gönderiliyor...</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>Lütfen bekleyin, dosyanız işleniyor</p>
              </div>
            )}

            {submitStatus === 'success' && (
              <div style={{
                marginTop: '20px',
                padding: '25px',
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center',
                animation: 'slideIn 0.5s ease-out'
              }}>
                <div style={{ fontSize: '60px', marginBottom: '15px' }}>✅</div>
                <h3 style={{ margin: '0 0 10px', fontSize: '24px' }}>Talebiniz Başarıyla Gönderildi!</h3>
                <p style={{ margin: 0, fontSize: '16px' }}>
                  <br />

                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{
                marginTop: '20px',
                padding: '20px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>❌</div>
                <h3 style={{ margin: '0 0 10px', fontSize: '20px' }}>Gönderim Başarısız</h3>
                <p style={{ margin: 0 }}>Lütfen tekrar deneyin veya bizi arayın</p>
              </div>
            )}

            <div className="form-note">
              <p>
                🔒 Bilgileriniz güvenli şekilde saklanır ve sadece teklif hazırlamak için kullanılır.
              </p>

            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QuickQuote;
