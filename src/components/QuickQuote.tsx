import React, { useState } from 'react';
import './QuickQuote.css';
import { getEmailConfig } from '../config/emailConfig';
import { useI18n } from '../lib/i18n';
import { languageOptions } from '../data/languageOptions';

interface QuickQuoteProps {
  initialFromLanguage?: string;
  initialToLanguage?: string;
  onNavigate: (page: string) => void;
}

const QuickQuote: React.FC<QuickQuoteProps> = ({
  initialFromLanguage = 'turkish',
  initialToLanguage = 'english',
  onNavigate
}) => {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileError, setFileError] = useState<string | null>(null);

  // Check if initial languages are in the options list
  const isFromLangInOptions = languageOptions.some(lang => lang.value === initialFromLanguage);
  const isToLangInOptions = languageOptions.some(lang => lang.value === initialToLanguage);

  const [formData, setFormData] = useState({
    fromLang: isFromLangInOptions ? initialFromLanguage : 'other',
    toLang: isToLangInOptions ? initialToLanguage : 'other',
    fromLangOther: !isFromLangInOptions ? initialFromLanguage : '',
    toLangOther: !isToLangInOptions ? initialToLanguage : '',
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError(null); // Reset error on new file selection

    if (file && file.size > 10 * 1024 * 1024) { // 10 MB limit
      setFileError(t('quickQuote.file.limitError'));
      setFormData(prev => ({ ...prev, document: null }));
      e.target.value = ''; // Clear the file input
      return;
    }

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
      const apiUrl = `${config.API_URL}/contact`;

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
          fromLang: formData.fromLang === 'other' ? formData.fromLangOther : formData.fromLang,
          toLang: formData.toLang === 'other' ? formData.toLangOther : formData.toLang,
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
        throw new Error(t('quickQuote.errors.serverResponse'));
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
        throw new Error(responseData.message || t('quickQuote.errors.emailFailed'));
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
          <button className="back-btn" onClick={() => onNavigate('home')}>{t('quickQuote.back')}</button>
          <h1>{t('quickQuote.title')}</h1>
          <p>{t('quickQuote.subtitle')}</p>
        </div>

        <form className="quote-form" onSubmit={handleSubmit}>
          <div className="form-sections">
            {/* Dil Bilgileri */}
            <div className="form-section">
              <h3>{t('quickQuote.sections.langs')}</h3>
              <div className="language-selection">
                <div className="form-group">
                  <label>{t('quickQuote.sections.from')}</label>
                  <select
                    value={formData.fromLang}
                    onChange={(e) => handleInputChange('fromLang', e.target.value)}
                    required
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {t(lang.labelKey)}
                      </option>
                    ))}
                  </select>
                  {formData.fromLang === 'other' && (
                    <input
                      type="text"
                      value={formData.fromLangOther}
                      onChange={(e) => handleInputChange('fromLangOther', e.target.value)}
                      placeholder={t('quickQuote.sections.otherLangPlaceholder')}
                      required
                      className="other-language-input"
                      style={{ marginTop: '0.5rem' }}
                    />
                  )}
                </div>

                <div className="arrow-between">→</div>

                <div className="form-group">
                  <label>{t('quickQuote.sections.to')}</label>
                  <select
                    value={formData.toLang}
                    onChange={(e) => handleInputChange('toLang', e.target.value)}
                    required
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {t(lang.labelKey)}
                      </option>
                    ))}
                  </select>
                  {formData.toLang === 'other' && (
                    <input
                      type="text"
                      value={formData.toLangOther}
                      onChange={(e) => handleInputChange('toLangOther', e.target.value)}
                      placeholder={t('quickQuote.sections.otherLangPlaceholder')}
                      required
                      className="other-language-input"
                      style={{ marginTop: '0.5rem' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Belge Bilgileri */}
            <div className="form-section">
              <h3>{t('quickQuote.sections.details')}</h3>

              <div className="form-group">
                <label>{t('quickQuote.sections.upload')}</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="document-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <label htmlFor="document-upload" className="file-upload-btn">{t('quickQuote.sections.pick')}</label>
                  {formData.document && (
                    <div className="file-info">
                      ✓ {formData.document.name}
                    </div>
                  )}
                  {fileError && (
                    <div className="file-error-message">
                      {fileError}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>{t('quickQuote.sections.description')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={t('quickQuote.sections.descriptionPlaceholder')}
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('quickQuote.sections.notary')}</label>
                  <select
                    value={formData.notaryApproval}
                    onChange={(e) => handleInputChange('notaryApproval', e.target.value)}
                  >
                    <option value="">{t('quickQuote.options.select')}</option>
                    <option value="yes">{t('quickQuote.options.yes')}</option>
                    <option value="no">{t('quickQuote.options.no')}</option>
                    <option value="unsure">{t('quickQuote.options.unsure')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('quickQuote.sections.copies')}</label>
                  <select
                    value={formData.multipleCopies}
                    onChange={(e) => handleInputChange('multipleCopies', e.target.value)}
                  >
                    <option value="1">{t('quickQuote.options.copies.one')}</option>
                    <option value="2">{t('quickQuote.options.copies.two')}</option>
                    <option value="3">{t('quickQuote.options.copies.three')}</option>
                    <option value="more">{t('quickQuote.options.copies.more')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('quickQuote.sections.urgency')}</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                  >
                    <option value="">{t('quickQuote.options.urgency.normal')}</option>
                    <option value="urgent">{t('quickQuote.options.urgency.urgent')}</option>
                    <option value="very-urgent">{t('quickQuote.options.urgency.very')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div className="form-section">
              <h3>{t('quickQuote.sections.contact')}</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('quickQuote.sections.name')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={t('quickQuote.placeholders.name')}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t('quickQuote.sections.phone')}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={t('quickQuote.placeholders.phone')}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t('quickQuote.sections.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('quickQuote.placeholders.email')}
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
              {isSubmitting ? t('quickQuote.sections.sending') :
                submitStatus === 'success' ? t('quickQuote.sections.sent') :
                  t('quickQuote.sections.submit')}
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
                <h3 style={{ margin: '0 0 10px', fontSize: '20px' }}>{t('quickQuote.sections.loadingTitle')}</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>{t('quickQuote.sections.loadingText')}</p>
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
                <h3 style={{ margin: '0 0 10px', fontSize: '24px' }}>{t('quickQuote.sections.sent')}</h3>
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
                <h3 style={{ margin: '0 0 10px', fontSize: '20px' }}>{t('quickQuote.sections.errorTitle')}</h3>
                <p style={{ margin: 0 }}>{t('quickQuote.sections.errorText')}</p>
              </div>
            )}

            <div className="form-note">
              <p>{t('quickQuote.sections.privacy')}</p>

            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QuickQuote;
