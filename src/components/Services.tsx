import React, { useEffect, useRef } from 'react';
import './Services.css';
import { useI18n } from '../lib/i18n';

interface ServicesProps {
  onNavigate?: (page: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const { t } = useI18n();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elementsToAnimate = document.querySelectorAll('.service-card, .stats-card, .stat-item');
    elementsToAnimate.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const services = [
    {
      id: 1,
      icon: '🌐',
      title: t('services.cards.professional.title'),
      subtitle: t('services.cards.professional.subtitle'),
      features: t('services.cards.professional.features.0') !== 'services.cards.professional.features.0' ? [
        t('services.cards.professional.features.0'),
        t('services.cards.professional.features.1')
      ] : [],
      navigateTo: 'translation-service'
    },
    {
      id: 2,
      icon: '⚡',
      title: t('services.cards.fast.title'),
      subtitle: t('services.cards.fast.subtitle'),
      features: [t('services.cards.fast.features.0'), t('services.cards.fast.features.1')],
      navigateTo: 'translation-service'
    },
    {
      id: 3,
      icon: '👤',
      title: t('services.cards.privacy.title'),
      subtitle: t('services.cards.privacy.subtitle'),
      features: [t('services.cards.privacy.features.0'), t('services.cards.privacy.features.1')],
      navigateTo: 'translation-service'
    },
    {
      id: 4,
      icon: '🕒',
      title: t('services.cards.reachable.title'),
      subtitle: t('services.cards.reachable.subtitle'),
      features: [t('services.cards.reachable.features.0'), t('services.cards.reachable.features.1')],
      navigateTo: 'translation-service'
    },
    {
      id: 5,
      icon: '⭐',
      title: t('services.cards.quality.title'),
      subtitle: t('services.cards.quality.subtitle'),
      features: [t('services.cards.quality.features.0'), t('services.cards.quality.features.1')],
      navigateTo: 'translation-service'
    },
    {
      id: 6,
      icon: '💰',
      title: t('services.cards.price.title'),
      subtitle: t('services.cards.price.subtitle'),
      features: [t('services.cards.price.features.0'), t('services.cards.price.features.1')],
      navigateTo: 'translation-service'
    }
  ];

  const handleServiceClick = (navigateTo: string) => {
    if (onNavigate) {
      onNavigate(navigateTo);
    }
  };

  return (
    <section className="services">
      <div className="container">
        <div className="services-header">
          <h2 className="section-title">{t('services.sectionTitle')}</h2>
          <p className="section-subtitle">{t('services.sectionSubtitle')}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card card"
              onClick={() => handleServiceClick(service.navigateTo)}
              style={{ cursor: 'pointer' }}
            >
              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <div className="service-info">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                </div>
              </div>

              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index} className="service-feature">
                    <span className="feature-bullet">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        <div className="services-footer">
          <div className="success-rate">
            <div className="stats-card">
              <div className="stats-number">%100</div>
              <div className="stats-text">
                <h3>{t('services.stats.satisfaction.label')}</h3>
                <p>{t('services.stats.satisfaction.text')}</p>
              </div>
            </div>
            <div className="additional-stats">
              <div className="stat-item">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">{t('services.stats.years')}</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🌍</div>
                <div className="stat-info">
                  <span className="stat-number">128</span>
                  <span className="stat-label">{t('services.stats.languages')}</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">{t('services.stats.fast')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
