import React, { useState } from 'react';
import './Hero.css';

interface HeroProps {
  onQuoteRequest: () => void;
  onQuickQuote?: (fromLang: string, toLang: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onQuickQuote }) => {
  const [fromLanguage, setFromLanguage] = useState('turkce');
  const [toLanguage, setToLanguage] = useState('english');

  const languages = [
    { value: 'turkce', label: 'Türkçe' },
    { value: 'english', label: 'English' },
    { value: 'deutsch', label: 'Deutsch' },
    { value: 'francais', label: 'Français' },
    { value: 'italiano', label: 'Italiano' },
    { value: 'русский', label: 'Русский' },
    { value: 'العربية', label: 'العربية' },
    { value: '中文', label: '中文' },
    { value: '日本語', label: '日本語' },
  ];

  const handleQuickQuote = () => {
    if (onQuickQuote) {
      onQuickQuote(fromLanguage, toLanguage);
    }
  };

  return (
    <section className="hero gradient-bg">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Güvenle Çevir, Özgürce Seyahat Et!
            </h1>
            <p className="hero-subtitle">
              Dil farklı olabilir, güven ortaktır.
            </p>
          </div>

          <div className="hero-feature-card">
            <div className="feature-card">
              <div className="card-header">
                <h3 className="card-title">HEMEN TEKLİF İSTEYİN</h3>
                <p className="card-subtitle">SİZİ ARAYALIM!</p>
              </div>

              <div className="language-selection-area">
                <div className="language-row">
                  <div className="language-input">
                    <label>Kaynak Dil</label>
                    <select
                      value={fromLanguage}
                      onChange={(e) => setFromLanguage(e.target.value)}
                      className="modern-select"
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="arrow-divider">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="language-input">
                    <label>Hedef Dil</label>
                    <select
                      value={toLanguage}
                      onChange={(e) => setToLanguage(e.target.value)}
                      className="modern-select"
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                className="feature-btn"
                onClick={handleQuickQuote}
              >
                <span>Devam Et</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>



      <div className="hero-wave">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,96C672,107,768,117,864,112C960,107,1056,85,1152,80C1248,75,1344,85,1392,90.7L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z" fill="rgba(255,255,255,0.15)"></path>
          <path d="M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,138.7C672,139,768,117,864,101.3C960,85,1056,75,1152,80C1248,85,1344,107,1392,117.3L1440,128L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z" fill="rgba(255,255,255,0.4)"></path>
          <path d="M0,96L48,101.3C96,107,192,117,288,122.7C384,128,480,128,576,117.3C672,107,768,85,864,85.3C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z" fill="#FFFFFF"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
