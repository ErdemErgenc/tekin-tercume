import React from 'react';
import './Footer.css';
import logo from '../images/tlogo.svg';
import qrImage from '../images/qr.jpg';

const Footer: React.FC = () => {
  return (
    <footer className="footer gradient-bg">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+905424387254">+90 542 438 72 54</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+905447215315">+90 544 721 53 15</a>
              </div>
            </div>

            <div className="website-email">
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <a href="http://www.tekintercume.com.tr">www.tekintercume.com.tr</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href="mailto:info@tekintercume.com.tr">info@tekintercume.com.tr</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-center">
          <div className="footer-logo">
            <div className="logo-container">
              <img src={logo} alt="Tekin Tercüme" className="footer-logo-img" />
              <div className="logo-text">
                <span className="company-name">TEKİN</span>
                <span className="company-subtitle">TERCÜME BÜROSU</span>
              </div>
            </div>
          </div>

          <div className="qr-section">
            <h4 className="qr-title">Hızlı İletişim</h4>
            <div className="qr-image-container">
              <img src={qrImage} alt="WhatsApp QR Kodu" className="qr-image" />
            </div>
            <p className="qr-description">QR kodu okutarak WhatsApp'tan ulaşın</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
