// Email API configuration: always use Vercel Functions under /api
export const PRODUCTION_EMAIL_CONFIG = { API_URL: '/api' };

export const getEmailConfig = () => {
  // Always use relative /api to avoid running any local server
  return PRODUCTION_EMAIL_CONFIG;
};

// EmailJS config (unused)
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  SERVICE_ID: 'YOUR_SERVICE_ID',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  TO_EMAIL: 'infotekintercume@gmail.com'
};
