import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WHATSAPP_URL = 'https://wa.me/905447215315';

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      className="whatsapp-button"
      onClick={handleClick}
      aria-label="WhatsApp ile iletişime geç"
    >
      <span className="whatsapp-icon" aria-hidden="true">
        <FaWhatsapp />
      </span>
      <span className="whatsapp-glow" aria-hidden="true" />
    </button>
  );
};

export default WhatsAppButton;
