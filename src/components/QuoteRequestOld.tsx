import React, { useState } from 'react';
import './QuoteRequest.css';

interface QuoteRequestProps {
  onClose: () => void;
}

const QuoteRequest: React.FC<QuoteRequestProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    document: null as File | null,
    fromLanguage: '',
    toLanguage: '',
    notaryApproval: '',
    notaryByOffice: '',
    multipleCopies: '',
    name: '',
    phone: '',
    email: ''
  });

  const languages = [
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'İngilizce' },
    { value: 'de', label: 'Almanca' },
    { value: 'fr', label: 'Fransızca' },
    { value: 'it', label: 'İtalyanca' },
    { value: 'ru', label: 'Rusça' },
    { value: 'ar', label: 'Arapça' },
    { value: 'fa', label: 'Farsça' },
    { value: 'zh', label: 'Çince' },
    { value: 'ja', label: 'Japonca' },
    { value: 'el', label: 'Yunanca' },
    { value: 'nl', label: 'Felemenkçe' },
    { value: 'bg', label: 'Bulgarca' },
    { value: 'ro', label: 'Romence' },
    { value: 'uk', label: 'Ukraynaca' },
    { value: 'other', label: 'Diğer Diller' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, document: file }));
  };

  const handleNext = () => {
    if (step === 1 && formData.fromLanguage && formData.toLanguage) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    // Form submit logic here
    console.log('Form Data:', formData);

    // Simulate email sending
    alert('Teklif talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    onClose();
  };

  return (
    <div className="quote-request-overlay">
      <div className="quote-request-modal">
        <div className="modal-header">
          <h2>Teklif İste</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {step === 1 && (
            <div className="step-1">
              <h3>Çeviri Dilleri</h3>
              <p>Lütfen çeviri yapılacak dilleri seçiniz</p>

              <div className="language-selectors">
                <div className="language-group">
                  <label>Kaynak Dil</label>
                  <select
                    value={formData.fromLanguage}
                    onChange={(e) => handleInputChange('fromLanguage', e.target.value)}
                  >
                    <option value="">Dil Seçiniz</option>
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="arrow-between">→</div>

                <div className="language-group">
                  <label>Hedef Dil</label>
                  <select
                    value={formData.toLanguage}
                    onChange={(e) => handleInputChange('toLanguage', e.target.value)}
                  >
                    <option value="">Dil Seçiniz</option>
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="file-upload">
                <label>Belge Yükle (İsteğe bağlı)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
                {formData.document && (
                  <p className="file-info">
                    Seçilen dosya: {formData.document.name}
                  </p>
                )}
              </div>

              <button
                className="btn-primary next-btn"
                onClick={handleNext}
                disabled={!formData.fromLanguage || !formData.toLanguage}
              >
                Devam Et
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-2">
              <h3>Ek Bilgiler ve İletişim</h3>

              <div className="questions-section">
                <h4>Tercüme Detayları</h4>

                <div className="question-group">
                  <label>Tercümelerimi noterden tasdik edeceğim.</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="notaryApproval"
                        value="evet"
                        checked={formData.notaryApproval === 'evet'}
                        onChange={(e) => handleInputChange('notaryApproval', e.target.value)}
                      />
                      Evet
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="notaryApproval"
                        value="hayir"
                        checked={formData.notaryApproval === 'hayir'}
                        onChange={(e) => handleInputChange('notaryApproval', e.target.value)}
                      />
                      Hayır
                    </label>
                  </div>
                </div>

                <div className="question-group">
                  <label>Noter tasdiki çeviri bürosu tarafından yapılsın. (Noter ücreti ve hizmet bedeli peşin alınır.)</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="notaryByOffice"
                        value="evet"
                        checked={formData.notaryByOffice === 'evet'}
                        onChange={(e) => handleInputChange('notaryByOffice', e.target.value)}
                      />
                      Evet
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="notaryByOffice"
                        value="hayir"
                        checked={formData.notaryByOffice === 'hayir'}
                        onChange={(e) => handleInputChange('notaryByOffice', e.target.value)}
                      />
                      Hayır
                    </label>
                  </div>
                </div>

                <div className="question-group">
                  <label>Birden fazla nüsha istiyorum. (2'den fazla nüsha talebi ek ücrete tabidir)</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="multipleCopies"
                        value="evet"
                        checked={formData.multipleCopies === 'evet'}
                        onChange={(e) => handleInputChange('multipleCopies', e.target.value)}
                      />
                      Evet
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="multipleCopies"
                        value="hayir"
                        checked={formData.multipleCopies === 'hayir'}
                        onChange={(e) => handleInputChange('multipleCopies', e.target.value)}
                      />
                      Hayır
                    </label>
                  </div>
                </div>
              </div>

              <div className="contact-section">
                <h4>İletişim Bilgileri</h4>

                <div className="input-group">
                  <label>Ad Soyad</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Adınızı ve soyadınızı giriniz"
                  />
                </div>

                <div className="input-group">
                  <label>Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0555 555 55 55"
                  />
                </div>

                <div className="input-group">
                  <label>E-mail (İsteğe bağlı)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setStep(1)}>
                  Geri
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                >
                  Teklif İste
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
