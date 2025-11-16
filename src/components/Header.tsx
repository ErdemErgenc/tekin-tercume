import React, { useState, useEffect } from 'react';
import './Header.css';
import GB from 'country-flag-icons/react/3x2/GB';
import TR from 'country-flag-icons/react/3x2/TR';
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

interface HeaderProps {
  logo: string;
  onNavigate: (page: string) => void;
  onQuoteRequest: () => void;
  onLanguageChange?: (language: 'tr' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  onNavigate,
  onLanguageChange
}) => {
  const { t, lang, setLang } = useI18n();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('header.nav.home'), id: 'home' },
    {
      name: t('header.nav.services'),
      id: 'services',
      hasDropdown: true,
      subItems: [
        {
          name: t('header.nav.items.translation.name'),
          id: 'translation-service',
          icon: '📄',
          description: t('header.nav.items.translation.desc')
        },
        {
          name: t('header.nav.items.visa.name'),
          id: 'visa-services',
          icon: '✈️',
          description: t('header.nav.items.visa.desc')
        },
        {
          name: t('header.nav.items.immigration.name'),
          id: 'immigration-services',
          icon: '🌍',
          description: t('header.nav.items.immigration.desc')
        },
        {
          name: t('header.nav.items.professional.name'),
          id: 'professional-info',
          icon: '🎓',
          description: t('header.nav.items.professional.desc')
        }
      ]
    },
    {
      name: t('header.nav.languages'),
      id: 'languages',
      hasDropdown: true,
      subItems: [
        { name: 'İngilizce', id: 'language-ingilizce', flagComponent: GB },
        { name: 'Almanca', id: 'language-almanca', flagComponent: DE },
        { name: 'Fransızca', id: 'language-fransizca', flagComponent: FR },
        { name: 'İtalyanca', id: 'language-italyanca', flagComponent: IT },
        { name: 'Rusça', id: 'language-rusca', flagComponent: RU },
        { name: 'Arapça', id: 'language-arapca', flagComponent: SA },
        { name: 'Farsça', id: 'language-farsca', flagComponent: IR },
        { name: 'Çince', id: 'language-cince', flagComponent: CN },
        { name: 'Japonca', id: 'language-japonca', flagComponent: JP },
        { name: 'Yunanca', id: 'language-yunanca', flagComponent: GR },
        { name: 'Felemenkçe', id: 'language-felemenkce', flagComponent: NL },
        { name: 'Bulgarca', id: 'language-bulgarca', flagComponent: BG },
        { name: 'Romence', id: 'language-romence', flagComponent: RO },
        { name: 'Ukraynaca', id: 'language-ukraynaca', flagComponent: UA },
        { name: 'Diğer Diller', id: 'language-diger', flag: '🌐' }
      ]
    },
    { name: t('header.nav.about'), id: 'about' },
    { name: t('header.nav.contact'), id: 'contact' },
    { name: t('header.nav.faq'), id: 'faq' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo Section */}
          <div className="logo-section" onClick={() => onNavigate('home')}>
            <img src={logo} alt="Tekin Tercüme" className="logo" />
            <span className="logo-text">Tekin</span>
          </div>

          {/* Navigation */}
          <nav className={`navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item ${item.hasDropdown ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
                >
                  <button
                    className="nav-link"
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="dropdown-icon">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                  {item.hasDropdown && openDropdown === item.id && (
                    <div className="dropdown-menu">
                      {item.subItems?.map((subItem: any) => {
                        // Hizmetler için service card
                        if (subItem.icon && subItem.description) {
                          return (
                            <div
                              key={subItem.id}
                              className="dropdown-service-card"
                              onClick={() => {
                                onNavigate(subItem.id);
                                setOpenDropdown(null);
                              }}
                            >
                              <div className="service-card-icon">{subItem.icon}</div>
                              <div className="service-card-content">
                                <h4 className="service-card-title">{subItem.name}</h4>
                                <p className="service-card-description">{subItem.description}</p>
                              </div>
                              <div className="service-card-arrow">→</div>
                            </div>
                          );
                        }
                        // Diller için dropdown item
                        const FlagComponent = subItem.flagComponent;
                        return (
                          <button
                            key={subItem.id}
                            className="dropdown-item"
                            onClick={() => {
                              onNavigate(subItem.id);
                              setOpenDropdown(null);
                            }}
                          >
                            {FlagComponent ? (
                              <FlagComponent className="item-flag-svg" />
                            ) : (
                              <span className="item-flag-emoji">{subItem.flag}</span>
                            )}
                            <span className="item-name">{subItem.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Language Switcher */}
            <div className={`language-switcher language-switch ${isLangOpen ? 'open' : ''}`}>
              <button
                className="language-btn"
                onClick={() => setIsLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                {lang === 'tr' ? (
                  <TR className="item-flag-svg" />
                ) : (
                  <GB className="item-flag-svg" />
                )}
                <span className="lang-code">{lang === 'tr' ? t('header.langCode.tr') : t('header.langCode.en')}</span>
                <span className="dropdown-arrow">▾</span>
              </button>
              {isLangOpen && (
                <div className="language-dropdown" role="listbox">
                  <button
                    className={`language-option ${lang === 'tr' ? 'active' : ''}`}
                    onClick={() => {
                      setLang?.('tr');
                      onLanguageChange?.('tr');
                      setIsLangOpen(false);
                    }}
                  >
                    <TR className="item-flag-svg" />
                    <span>TR — Türkçe</span>
                  </button>
                  <button
                    className={`language-option ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => {
                      setLang?.('en');
                      onLanguageChange?.('en');
                      setIsLangOpen(false);
                    }}
                  >
                    <GB className="item-flag-svg" />
                    <span>EN — English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quote Button - Opens New Page */}
            <button
              className="quote-button"
              onClick={() => onNavigate('quick-quote')}
            >
              <span>{t('header.quote')}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
