import React from 'react';
import './VisaServices.css';
import { useI18n } from '../lib/i18n';

interface VisaServiceProps {
  visaType: string;
  onNavigate: (page: string) => void;
}

const VisaServices: React.FC<VisaServiceProps> = ({ visaType, onNavigate }) => {
  const { t, get } = useI18n();
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [visaType]);

  const currentVisa = get(`visa.content.${visaType}`);

  if (!currentVisa) {
    return (
      <section className="visa-services">
        <div className="container">
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <h2>{t('visa.sidebar.errorTitle')}</h2>
            <p>{t('visa.sidebar.errorText')}</p>
            <div className="error-actions">
              <button onClick={() => onNavigate('services')} className="back-btn primary-btn">
                {t('visa.sidebar.backServices')}
              </button>
              <button onClick={() => onNavigate('contact')} className="back-btn secondary-btn">
                {t('visa.sidebar.contact')}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="visa-services">
      <div className="container">
        <div className="visa-header">
          <div className="breadcrumb">
            <span onClick={() => onNavigate('home')}>{t('visa.breadcrumb.home')}</span> →
            <span onClick={() => onNavigate('services')}>{t('visa.breadcrumb.services')}</span> →
            <span>{currentVisa.title}</span>
          </div>

          <div className="visa-title-section">
            <div className="visa-icon">{currentVisa.icon}</div>
            <div>
              <h1 className="visa-title">{currentVisa.title}</h1>
              <p className="visa-description">{currentVisa.description}</p>
            </div>
          </div>
        </div>

        <div className="visa-content">
          <div className="main-content">
            <div className="benefits-section">
              <h2>{t('visa.servicesTitle')}</h2>
              <div className="benefits-grid">
                {currentVisa.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="requirements-section">
              <h2>{t('visa.requirementsTitle')}</h2>
              <div className="requirements-list">
                {currentVisa.requirements.map((requirement: string, index: number) => (
                  <div key={index} className="requirement-item">
                    <span className="requirement-bullet">📄</span>
                    <span>{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="countries-section">
              <h2>{t('visa.countriesTitle')}</h2>
              <div className="countries-grid">
                {currentVisa.countries.map((country: string, index: number) => (
                  <div key={index} className="country-item">
                    <span className="country-flag">🌍</span>
                    <span>{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="contact-card">
              <h3>{t('visa.sidebar.applyNow')}</h3>
              <p>{t('visa.sidebar.applyDesc')}</p>

              <div className="contact-methods">
                <a href="tel:+905447215315" className="contact-method">
                  <span className="method-icon">📱</span>
                  <span>+90 544 721 53 15</span>
                </a>

                <a href="mailto:info@tekintercume.com.tr" className="contact-method">
                  <span className="method-icon">✉️</span>
                  <span>info@tekintercume.com.tr</span>
                </a>

                <a href="https://wa.me/905447215315" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  {t('visa.sidebar.whatsapp')}
                </a>
              </div>
            </div>

            <div className="process-card">
              <h3>{t('visa.sidebar.process')}</h3>
              <div className="process-steps">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <div className="step-text">{t('visa.sidebar.steps.0')}</div>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <div className="step-text">{t('visa.sidebar.steps.1')}</div>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <div className="step-text">{t('visa.sidebar.steps.2')}</div>
                </div>
                <div className="step-item">
                  <div className="step-number">4</div>
                  <div className="step-text">{t('visa.sidebar.steps.3')}</div>
                </div>
                <div className="step-item">
                  <div className="step-number">5</div>
                  <div className="step-text">{t('visa.sidebar.steps.4')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaServices;
