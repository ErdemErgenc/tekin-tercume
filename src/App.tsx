import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './images/tlogo.svg';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Languages from './components/Languages';
import LanguageDetail from './components/LanguageDetail';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import VisaServices from './components/VisaServices';
import QuickQuote from './components/QuickQuote';
import ServicePage from './components/ServicePage';
import WhatsAppButton from './components/WhatsAppButton';
import { LanguageProvider, type Lang } from './lib/i18n';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('lang');
      return (stored === 'tr' || stored === 'en') ? (stored as Lang) : 'tr';
    } catch {
      return 'tr';
    }
  });
  const [quoteLanguages, setQuoteLanguages] = useState({ from: '', to: '' });

  const handleQuoteRequest = () => {
    // Modal yerine QuickQuote sayfasına yönlendir
    setCurrentPage('quick-quote');
  };

  const handleQuickQuote = (fromLanguage: string, toLanguage: string) => {
    setQuoteLanguages({ from: fromLanguage, to: toLanguage });
    setCurrentPage('quick-quote');
  };

  useEffect(() => {
    try {
      localStorage.setItem('lang', currentLanguage);
    } catch {
      // ignore storage errors
    }
  }, [currentLanguage]);

  const renderPage = () => {
    // Language detail pages
    if (currentPage.startsWith('language-')) {
      const languageId = currentPage.replace('language-', '');
      return <LanguageDetail languageId={languageId} onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'languages':
        return <Languages />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      case 'quick-quote':
        return (
          <QuickQuote
            onNavigate={setCurrentPage}
            initialFromLanguage={quoteLanguages.from}
            initialToLanguage={quoteLanguages.to}
          />
        );
      case 'translation-service':
        return <ServicePage onNavigate={setCurrentPage} serviceType="translation-service" />;
      case 'visa-services':
        return <ServicePage onNavigate={setCurrentPage} serviceType="visa-services" />;
      case 'immigration-services':
        return <ServicePage onNavigate={setCurrentPage} serviceType="immigration-services" />;
      case 'professional-info':
        return <ServicePage onNavigate={setCurrentPage} serviceType="professional-info" />;
      default:
        // Visa detail pages (visa-tourist, visa-work, visa-family)
        if (currentPage.startsWith('visa-')) {
          const visaType = currentPage.replace('visa-', '');
          return <VisaServices visaType={visaType} onNavigate={setCurrentPage} />;
        }

        return (
          <>
            <Hero
              onQuoteRequest={handleQuoteRequest}
              onQuickQuote={handleQuickQuote}
            />
            <Services onNavigate={setCurrentPage} />
            <About />
          </>
        );
    }
  };

  return (
    <LanguageProvider lang={currentLanguage} setLang={setCurrentLanguage}>
      <div className="App">
        <Header
          logo={logo}
          onNavigate={setCurrentPage}
          onQuoteRequest={handleQuoteRequest}
          onLanguageChange={setCurrentLanguage}
        />

        <main>
          {renderPage()}
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default App;
