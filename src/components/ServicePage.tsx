import React, { useState } from 'react';
import CA from 'country-flag-icons/react/3x2/CA';
import TR from 'country-flag-icons/react/3x2/TR';
import './ServicePages.css';
import { useI18n } from '../lib/i18n';

interface ServicePageProps {
  onNavigate: (page: string) => void;
  serviceType: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ onNavigate, serviceType }) => {
  const { serviceContent, t } = useI18n();
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const renderIcon = (icon: string, title?: string) => {
    const t = (title || '').toLowerCase();
    const isCA = icon === '🇨🇦' || t.includes('kanada') || t.includes('canada');
    const isTR = icon === '🇹🇷' || t.includes('türkiye') || t.includes('turkiye') || t.includes('turkey');
    if (isCA) return <CA className="flag-svg" title="Canada" />;
    if (isTR) return <TR className="flag-svg" title="Türkiye" />;
    return icon;
  };
  const content = serviceContent(serviceType);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="service-page">
      <div className="container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => onNavigate('home')}>
          {t(`servicePages.${serviceType}.back`, '← Ana Sayfaya Dön')}
        </button>

        {/* Header */}
        <div className="service-header">
          <h1>{content.title}</h1>
          <p className="service-subtitle">{content.subtitle}</p>
          <p className="service-description">{content.description}</p>
        </div>

        {/* Features */}
        <div className="service-features">
          <h2>{t('servicePages._common.featuresTitle')}</h2>
          <div className="features-grid">
            {(content.features as any[]).map((feature: any, index: number) => (
              <div
                key={index}
                className="feature-item"
                onClick={() => setSelectedFeature(feature)}
                style={{ cursor: 'pointer' }}
              >
                <div className="feature-icon">{renderIcon(feature.icon, feature.title)}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <button className="details-btn">{t(`servicePages.${serviceType}.modal.details`)}</button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="service-cta">
          <h3>{content.cta?.title}</h3>
          <p>{content.cta?.text}</p>
          <button
            className="cta-btn"
            onClick={() => onNavigate('quick-quote')}
          >
            {content.cta?.button}
          </button>
        </div>

        {/* Modal */}
        {selectedFeature && (
          <div className="service-modal" onClick={() => setSelectedFeature(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedFeature(null)}>
                ✕
              </button>

              <div className="modal-header">
                <span className="modal-icon">{selectedFeature.icon}</span>
                <h3 className="modal-title">{selectedFeature.title}</h3>
              </div>

              <div className="modal-body">
                <p className="modal-description">{selectedFeature.detail}</p>
              </div>

              <div className="modal-footer">
                <button className="modal-cta-btn" onClick={() => setSelectedFeature(null)}>{t(`servicePages.${serviceType}.modal.close`)}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
