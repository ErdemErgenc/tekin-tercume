import React from 'react';
import './About.css';
import { useI18n } from '../lib/i18n';

const About: React.FC = () => {
  const { t, get } = useI18n();
  const stats = (get('about.stats') as any[]) || [];
  const features = (get('about.features') as any[]) || [];

  return (
    <section className="about-section">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <div className="section-badge">
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="section-title">
            {t('about.title1')} <span className="highlight-text">{t('about.highlight')}</span>
            <br />{t('about.title2')}
          </h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </div>

        {/* Main Content */}
        <div className="about-main">
          {/* Left Content */}
          <div className="about-content">
            <div className="company-info">
              <h3>{t('about.whyTitle')}</h3>
              <p>{t('about.subtitle')}</p>

              <div className="feature-grid">
                {features.map((feature: any, index: number) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="about-stats">
            <div className="stats-container">
              <div className="stats-header">
                <h3>{t('about.statsTitle')}</h3>
              </div>

              <div className="stats-grid">
                {stats.map((stat: any, index: number) => (
                  <div key={index} className="stat-card">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="achievement-badge">
                <div className="badge-content">
                  <div className="badge-icon">🥇</div>
                  <div className="badge-text">
                    <strong>{t('about.highlight')}</strong>
                    <span>{t('about.title2')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <div className="benefits-header">
            <h3>{t('about.benefitsTitle')}</h3>
            <p>{t('about.benefitsSubtitle')}</p>
          </div>

          <div className="benefits-container">
            {(get('about.benefits') as any[]).map((b: any, i: number) => (
              <div className="benefit-box" key={i}>
                <div className="benefit-box-icon">{b.icon}</div>
                <h4>{b.title}</h4>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
