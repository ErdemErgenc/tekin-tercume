import React from 'react';
import './LanguageDetail.css';
import { languagesData } from '../data/languagesData';
import { useI18n } from '../lib/i18n';

interface LanguageDetailProps {
  languageId: string;
  onNavigate: (page: string) => void;
}

const LanguageDetail: React.FC<LanguageDetailProps> = ({ languageId, onNavigate }) => {
  const { t } = useI18n();
  const langKey = languageId.replace('language-', '');
  const currentLanguage = languagesData[langKey];

  if (!currentLanguage) {
    return (
      <section className="language-detail">
        <div className="container">
          <button className="back-btn" onClick={() => onNavigate('home')}>
            {t('common.backHome')}
          </button>
          <div className="error-message">
            <h2>{t('languages.error.title')}</h2>
            <p>{t('languages.error.description')}</p>
          </div>
        </div>
      </section>
    );
  }

  const getServicesTitleInForeignLanguage = () => {
    const titles: Record<string, string> = {
      diger: 'Our Services:',
      ingilizce: 'Our Services:',
      almanca: 'Unsere Dienstleistungen:',
      fransizca: 'Nos services :',
      italyanca: 'I nostri servizi:',
      rusca: 'Наши услуги:',
      arapca: 'خدماتنا:',
      farsca: 'خدمات ما:',
      cince: '我们的服务：',
      japonca: '私たちのサービス：',
      yunanca: 'Οι υπηρεσίες μας:',
      felemenkce: 'Onze diensten:',
      bulgarca: 'Нашите услуги:',
      romence: 'Serviciile noastre:',
      ukraynaca: 'Наші послуги:',
      arnavutca: 'Shërbimet tona:',
      ispanyolca: 'Nuestros servicios:',
      lehce: 'Nasze usługi:',
      portekizce: 'Nossos serviços:',
      cekce: 'Naše služby:',
      ozbekce: 'Xizmatlarimiz:',
      turkmence: 'Hyzmatlarymyz:',
      kirgizca: 'Кызматтарыбыз:',
      azerice: 'Xidmətlərimiz:',
      endonezce: 'Layanan kami:',
      gurcuce: 'ჩვენი მომსახურებები:',
      makedonca: 'Нашите услуги:'
    };
    return titles[langKey] || 'Our Services:';
  };

  return (
    <section className="language-detail">
      <div className="container">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          {t('common.backHome')}
        </button>

        <div className="language-header">
          <div className="language-title-section">
            {currentLanguage.flagComponent ? (
              <currentLanguage.flagComponent className="language-flag-svg-large" />
            ) : (
              <span className="language-flag-large">{currentLanguage.flag}</span>
            )}
            <h1 className="language-title">{currentLanguage.name}</h1>
          </div>
        </div>

        <div className="language-content">
          <div className="description-card">
            <div className="description-content">
              <p className="description-text">{currentLanguage.turkish}</p>
            </div>
          </div>

          <div className="services-section">
            <h2 className="services-title">{t('languages.modal.servicesTitle')}</h2>
            <ul className="services-list">
              {currentLanguage.turkishServices.map((service, index) => (
                <li key={index} className="service-item">
                  <span className="service-bullet">•</span>
                  <span className="service-text">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="content-divider" />

          <div className="description-card foreign">
            <div className="description-content">
              <p className="description-text foreign-text">{currentLanguage.foreign}</p>
            </div>
          </div>

          <div className="services-section">
            <h2 className="services-title">{getServicesTitleInForeignLanguage()}</h2>
            <ul className="services-list foreign-list">
              {currentLanguage.foreignServices.map((service, index) => (
                <li key={index} className="service-item">
                  <span className="service-bullet">•</span>
                  <span className="service-text">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="language-cta">
            <div className="cta-card">
              <h3>{t('languages.cta.title')}</h3>
              <p>
                {t('languages.cta.descriptionPrefix')} {currentLanguage.name}{' '}
                {t('languages.cta.descriptionSuffix')}
              </p>
              <div className="cta-buttons">
                <button
                  className="cta-btn primary"
                  onClick={() => onNavigate('quick-quote')}
                >
                  {t('common.requestQuote')}
                </button>
                <button
                  className="cta-btn secondary"
                  onClick={() => onNavigate('contact')}
                >
                  {t('common.contact')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageDetail;

