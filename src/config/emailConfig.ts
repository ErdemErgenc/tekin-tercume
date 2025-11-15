// Email Configuration for both local development and production

// For local development - Node.js server
export const LOCAL_EMAIL_CONFIG = {
  API_URL: 'http://localhost:3001/api'
};

// For production - Vercel Functions
export const PRODUCTION_EMAIL_CONFIG = {
  API_URL: '/api'
};

// Auto-detect environment and use appropriate config
export const getEmailConfig = () => {
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isDevelopment ? LOCAL_EMAIL_CONFIG : PRODUCTION_EMAIL_CONFIG;
};

// EmailJS Configuration (Alternative method - not currently used)
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  TO_EMAIL: 'infotekintercume@gmail.com'
};
