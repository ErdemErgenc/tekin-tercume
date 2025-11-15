import React, { useState, useEffect } from 'react';
import './Header.css';
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

interface HeaderProps {
  logo: string;
  onNavigate: (page: string) => void;
  onQuoteRequest: () => void;
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  onNavigate,
  currentLanguage = 'tr',
  onLanguageChange
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Ana Sayfa', id: 'home' },
    {
      name: 'Hizmetler',
      id: 'services',
      hasDropdown: true,
      subItems: [
        {
          name: 'Tercüme Hizmeti',
          id: 'translation-service',
          icon: '📄',
          description: 'Resmî belgelerinizin güvenilir çevirisi'
        },
        {
          name: 'Vize Hizmetleri',
          id: 'visa-services',
          icon: '✈️',
          description: 'Vize başvurularında profesyonel destek'
        },
        {
          name: 'Göçmenlik Hizmetleri',
          id: 'immigration-services',
          icon: '🌍',
          description: 'İkamet ve göçmenlik danışmanlığı'
        },
        {
          name: 'Mesleki Belgelendirme',
          id: 'professional-info',
          icon: '🎓',
          description: 'Diploma denklik ve sertifikalar'
        }
      ]
    },
    {
      name: 'Diller',
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
    { name: 'Hakkımızda', id: 'about' },
    { name: 'İletişim', id: 'contact' },
    { name: 'SSS', id: 'faq' }
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
            <div className="language-switcher">
              <button
                className="language-btn"
                onClick={() => onLanguageChange?.(currentLanguage === 'tr' ? 'en' : 'tr')}
              >
                <span className="flag">{currentLanguage === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
                <span className="lang-code">{currentLanguage === 'tr' ? 'TR' : 'EN'}</span>
              </button>
            </div>

            {/* Quote Button - Opens New Page */}
            <button
              className="quote-button"
              onClick={() => onNavigate('quick-quote')}
            >
              <span>Teklif Al</span>
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
