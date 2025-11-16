import React from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import './WhatsAppButton.css';

const WHATSAPP_URL = 'https://wa.me/905447215315';
const PHONE_NUMBER = '+905447215315';

const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-fab-group">
      <a
        className="phone-button"
        href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
        aria-label="Telefon ile ara"
      >
        <span className="phone-icon" aria-hidden="true">
          <FaPhone />
        </span>
        <span className="phone-glow" aria-hidden="true" />
      </a>

      <button
        className="whatsapp-button"
        onClick={handleWhatsAppClick}
        aria-label="WhatsApp ile iletişime geç"
      >
        <span className="whatsapp-icon" aria-hidden="true">
          <FaWhatsapp />
        </span>
        <span className="whatsapp-glow" aria-hidden="true" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
