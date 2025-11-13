import React, { useState } from 'react';
import './QuoteRequest.css';

interface QuoteRequestProps {
  onClose: () => void;
}

const QuoteRequest: React.FC<QuoteRequestProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    document: null as File | null,
    description: '',
    notaryApproval: '',
    notaryByOffice: '',
    multipleCopies: '',
    name: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, document: file }));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Form submission logic
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2>Hızlı Teklif Talebi</h2>
          <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>
        </div>

        <div className="modal-body">
          {step === 1 && (
            <div className="step-content">
              <h3>Belge ve Detaylar</h3>
              <p>Çeviri yapılacak belgeyi yükleyin ve detayları belirtin</p>

              <div className="form-group">
                <label>Belge Yükleme</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <label htmlFor="file-upload" className="file-upload-btn">
                    📎 Belge Seç
                  </label>
                  {formData.document && (
                    <div className="file-info">
                      <span className="file-icon">✓</span>
                      <span className="file-name">{formData.document.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Çeviri Detayları</label>
                <textarea
                  placeholder="• Belge türü (diploma, sözleşme, vs.)&#10;• Sayfa sayısı&#10;• Kaynak ve hedef dil&#10;• Aciliyet durumu&#10;• Özel talepleriniz"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="description-textarea"
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
                    <option value="">Seçiniz</option>
                    <option value="1">1 kopya</option>
                    <option value="2">2 kopya</option>
                    <option value="3">3 kopya</option>
                    <option value="more">Daha fazla</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>İletişim Bilgileri</h3>
              <p>Teklifimizi size ulaştırmak için bilgilerinizi girin</p>

              <div className="form-group">
                <label>Ad Soyad *</label>
                <input
                  type="text"
                  placeholder="Adınızı ve soyadınızı girin"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Telefon *</label>
                  <input
                    type="tel"
                    placeholder="+90 5XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>E-posta *</label>
                  <input
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="contact-preference">
                <h4>Nasıl iletişim kurmamızı tercih edersiniz?</h4>
                <div className="contact-options">
                  <label className="contact-option">
                    <input type="radio" name="contact" value="phone" />
                    <span className="option-text">📞 Telefon</span>
                  </label>
                  <label className="contact-option">
                    <input type="radio" name="contact" value="whatsapp" />
                    <span className="option-text">💬 WhatsApp</span>
                  </label>
                  <label className="contact-option">
                    <input type="radio" name="contact" value="email" />
                    <span className="option-text">📧 E-posta</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step > 1 && (
            <button className="btn-secondary" onClick={handlePrevious}>
              ← Geri
            </button>
          )}

          {step < 2 ? (
            <button className="btn-primary" onClick={handleNext}>
              Devam Et →
            </button>
          ) : (
            <button
              className="btn-primary submit-btn"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.phone || !formData.email}
            >
              🚀 Teklif Talep Et
            </button>
          )}
        </div>

        <div className="modal-note">
          <p>
            <span className="note-icon">🔒</span>
            Bilgileriniz gizli tutulur ve sadece teklif hazırlamak için kullanılır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
