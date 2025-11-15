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
  // Check if we're in development (localhost or 127.0.0.1)
  const isDevelopment =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('192.168')); // Local network

  // In production (Vercel), always use relative path
  const isProduction =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('vercel.app') ||
      window.location.hostname.includes('tekintercume.com'));

  console.log('🌐 Environment detection:', {
    hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
    isDevelopment,
    isProduction,
    apiUrl: isProduction || (!isDevelopment) ? '/api' : 'http://localhost:3001/api'
  });

  return (isProduction || (!isDevelopment)) ? PRODUCTION_EMAIL_CONFIG : LOCAL_EMAIL_CONFIG;
};

// EmailJS Configuration (Alternative method - not currently used)
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  TO_EMAIL: 'infotekintercume@gmail.com'
};
