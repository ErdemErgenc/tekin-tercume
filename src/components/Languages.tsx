import React, { useMemo, useState } from 'react';
import './Languages.css';
import GB from 'country-flag-icons/react/3x2/GB';
import DE from 'country-flag-icons/react/3x2/DE';
import FR from 'country-flag-icons/react/3x2/FR';
import IT from 'country-flag-icons/react/3x2/IT';
import RU from 'country-flag-icons/react/3x2/RU';
import SA from 'country-flag-icons/react/3x2/SA';
import IR from 'country-flag-icons/react/3x2/IR';
import CN from 'country-flag-icons/react/3x2/CN';
import JP from 'country-flag-icons/react/3x2/JP';
import GR from 'country-flag-icons/react/3x2/GR';
import NL from 'country-flag-icons/react/3x2/NL';
import BG from 'country-flag-icons/react/3x2/BG';
import RO from 'country-flag-icons/react/3x2/RO';
import UA from 'country-flag-icons/react/3x2/UA';
import { useI18n } from '../lib/i18n';

interface LanguagePageProps {
  language?: string;
}

interface LanguageData {
  key: string;
  name: string;
  flag: string;
  desc: string;
  foreign: string;
}

type FlagComponentType = React.ComponentType<{ className?: string }>;

const Languages: React.FC<LanguagePageProps> = () => {
  const { t, get } = useI18n();
  const [selectedLanguage, setSelectedLanguage] = useState<(LanguageData & { flagComponent?: FlagComponentType }) | null>(null);

  const flags: Record<string, FlagComponentType> = useMemo(() => ({
    GB, DE, FR, IT, RU, SA, IR, CN, JP, GR, NL, BG, RO, UA
  }), []);
  const dictLanguages = (get('languages.cards') as LanguageData[]) || [];
  const languages = dictLanguages.slice(0, 6).map((l) => ({
    ...l,
    flagComponent: flags[l.flag]
  }));

  const services = (get('languages.modal.services') as string[]) || [];

  return (
    <section className="languages">
      <div className="container">
        <div className="languages-header">
          <h2 className="section-title">{t('languages.sectionTitle')}</h2>
          <p className="section-subtitle">{t('languages.sectionSubtitle')}</p>
        </div>

        <div className="languages-grid">
          {languages.map((language, index) => {
            const FlagComponent = language.flagComponent;
            return (
              <div
                key={index}
                className="language-card card"
                onClick={() => setSelectedLanguage(language)}
              >
                <div className="language-header">
                  {FlagComponent ? (
                    <FlagComponent className="language-flag-svg" />
                  ) : (
                    <span className="language-flag">🌍</span>
                  )}
                  <h3 className="language-name">{language.name}</h3>
                </div>

                <div className="language-content">
                  <p className="language-description turkish">
                    {language.desc}
                  </p>

                  <div className="language-divider"></div>

                  <p className="language-description foreign">
                    {language.foreign}
                  </p>
                </div>

                <button className="details-btn">{t('languages.details')}</button>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {selectedLanguage && (
          <div className="language-modal" onClick={() => setSelectedLanguage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedLanguage(null)}>
                ✕
              </button>

              <div className="modal-header">
                {selectedLanguage.flagComponent ? (
                  <selectedLanguage.flagComponent className="modal-flag-svg" />
                ) : (
                  <span className="modal-flag">🌐</span>
                )}
                <h3 className="modal-title">{selectedLanguage.name} {t('languages.modal.titleSuffix')}</h3>
              </div>

              <div className="modal-body">
                <h4 className="modal-section-title">{t('languages.modal.servicesTitle')}</h4>
                <ul className="modal-services-list">
                  {services.map((service, index) => (
                    <li key={index} className="modal-service-item">
                      <span className="service-check">✓</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer">
                <button className="modal-cta-btn" onClick={() => setSelectedLanguage(null)}>{t('languages.modal.understood')}</button>
              </div>
            </div>
          </div>
        )}

        <div className="other-languages">
          <div className="card">
            <h3 className="other-title">{t('languages.other.title')}</h3>
            <p className="other-description">
              {t('languages.other.tr')}
            </p>
            <p className="other-description-en">
              {t('languages.other.en')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Languages;
