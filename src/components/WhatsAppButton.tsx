import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaCommentDots, FaTimes } from 'react-icons/fa';
import './WhatsAppButton.css';

const WHATSAPP_URL = 'https://wa.me/905447215315';
const PHONE_NUMBER = '+905447215315';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-fab-group">
      <div className={`fab-options ${isOpen ? 'open' : ''}`}>
        <a
          className="phone-button"
          href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
          aria-label="Telefon ile ara"
        >
          <span className="phone-icon" aria-hidden="true">
            <FaPhone />
          </span>
          <span className="tooltip">Ara</span>
        </a>

        <button
          className="whatsapp-button"
          onClick={handleWhatsAppClick}
          aria-label="WhatsApp ile iletişime geç"
        >
          <span className="whatsapp-icon" aria-hidden="true">
            <FaWhatsapp />
          </span>
          <span className="tooltip">WhatsApp</span>
        </button>
      </div>

      <button
        className={`fab-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="İletişim seçeneklerini göster"
      >
        <span className="toggle-icon">
          {isOpen ? <FaTimes /> : <FaCommentDots />}
        </span>
        <span className="toggle-glow" aria-hidden="true" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
