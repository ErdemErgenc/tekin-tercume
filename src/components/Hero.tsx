import React, { useState } from 'react';
import './Hero.css';

interface HeroProps {
  onQuoteRequest: () => void;
  onQuickQuote?: (fromLang: string, toLang: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onQuoteRequest, onQuickQuote }) => {
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
                <p className="card-subtitle">SIZI ARAYALIM!</p>
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
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#FFFFFF"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#FFFFFF"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#FFFFFF"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
