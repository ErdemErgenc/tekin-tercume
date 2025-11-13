import React, { useState, useEffect } from 'react';
import './Header.css';

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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
        { name: 'Tercüme Hizmeti', id: 'translation-service' },
        { name: 'Vize Hizmetleri', id: 'visa-services' },
        { name: 'Göçmenlik Hizmetleri', id: 'immigration-services' },
        { name: 'Mesleki Bilgilendirme', id: 'professional-info' }
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
                  onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsServicesOpen(false)}
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

                  {item.hasDropdown && isServicesOpen && (
                    <div className="dropdown-menu">
                      {item.subItems?.map((subItem) => (
                        <button
                          key={subItem.id}
                          className="dropdown-item"
                          onClick={() => {
                            onNavigate(subItem.id);
                            setIsServicesOpen(false);
                          }}
                        >
                          {subItem.name}
                        </button>
                      ))}
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
