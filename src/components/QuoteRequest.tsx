import React, { useState } from 'react';
import './QuoteRequest.css';

interface QuoteRequestProps {
  onClose: () => void;
}

const QuoteRequest: React.FC<QuoteRequestProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    document: null as File | null,
    description: '',
    notaryApproval: '',
    notaryByOffice: '',
    multipleCopies: '',
    name: '',
    phone: '',
    email: '',
    contactPreference: ''
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email via our backend API (Gmail SMTP)
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
          notaryByOffice: formData.notaryByOffice,
          multipleCopies: formData.multipleCopies,
          contactPreference: formData.contactPreference,
          documentName: formData.document?.name || null
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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

              <div className="form-group radio-group">
                <label className="radio-group-label">Tercümelerimi noterden tasdik edeceğim</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="notaryApproval"
                      value="yes"
                      checked={formData.notaryApproval === 'yes'}
                      onChange={(e) => handleInputChange('notaryApproval', e.target.value)}
                    />
                    <span className="radio-text">Evet</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="notaryApproval"
                      value="no"
                      checked={formData.notaryApproval === 'no'}
                      onChange={(e) => handleInputChange('notaryApproval', e.target.value)}
                    />
                    <span className="radio-text">Hayır</span>
                  </label>
                </div>
              </div>

              <div className="form-group radio-group">
                <label className="radio-group-label">Noter tasdiki çeviri bürosu tarafından yapılsın</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="notaryByOffice"
                      value="yes"
                      checked={formData.notaryByOffice === 'yes'}
                      onChange={(e) => handleInputChange('notaryByOffice', e.target.value)}
                    />
                    <span className="radio-text">Evet</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="notaryByOffice"
                      value="no"
                      checked={formData.notaryByOffice === 'no'}
                      onChange={(e) => handleInputChange('notaryByOffice', e.target.value)}
                    />
                    <span className="radio-text">Hayır</span>
                  </label>
                </div>
              </div>

              <div className="form-group radio-group">
                <label className="radio-group-label">Birden fazla nüsha istiyorum</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="multipleCopies"
                      value="yes"
                      checked={formData.multipleCopies === 'yes'}
                      onChange={(e) => handleInputChange('multipleCopies', e.target.value)}
                    />
                    <span className="radio-text">Evet</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="multipleCopies"
                      value="no"
                      checked={formData.multipleCopies === 'no'}
                      onChange={(e) => handleInputChange('multipleCopies', e.target.value)}
                    />
                    <span className="radio-text">Hayır</span>
                  </label>
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
                    <input
                      type="radio"
                      name="contact"
                      value="phone"
                      checked={formData.contactPreference === 'phone'}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    />
                    <span className="option-text">📞 Telefon</span>
                  </label>
                  <label className="contact-option">
                    <input
                      type="radio"
                      name="contact"
                      value="whatsapp"
                      checked={formData.contactPreference === 'whatsapp'}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    />
                    <span className="option-text">💬 WhatsApp</span>
                  </label>
                  <label className="contact-option">
                    <input
                      type="radio"
                      name="contact"
                      value="email"
                      checked={formData.contactPreference === 'email'}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    />
                    <span className="option-text">📧 E-posta</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="status-message error">
              <div className="status-icon">❌</div>
              <div className="status-content">
                <h4>Gönderim Başarısız</h4>
                <p>Bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.</p>
              </div>
            </div>
          )}

          {submitStatus === 'success' && (
            <div className="status-message success">
              <div className="status-icon">✅</div>
              <div className="status-content">
                <h4>Talebiniz Alındı!</h4>
                <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
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
              disabled={!formData.name || !formData.phone || !formData.email || isSubmitting}
            >
              {isSubmitting ? '� Gönderiliyor...' : submitStatus === 'success' ? '✅ Gönderildi!' : '�🚀 Teklif Talep Et'}
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
