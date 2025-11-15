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
  // Always use production API for Vercel domains
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If on Vercel domain, ALWAYS use production API
    if (hostname.includes('vercel.app') || hostname.includes('tekintercume.com')) {
      console.log('🌐 PRODUCTION MODE - Using /api endpoint');
      return PRODUCTION_EMAIL_CONFIG;
    }
    
    // Only use localhost API if explicitly on localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      console.log('🌐 DEVELOPMENT MODE - Using localhost:3001/api endpoint');
      return LOCAL_EMAIL_CONFIG;
    }
  }
  
  // Default to production for safety
  console.log('🌐 DEFAULT TO PRODUCTION - Using /api endpoint');
  return PRODUCTION_EMAIL_CONFIG;
};

// EmailJS Configuration (Alternative method - not currently used)
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  TO_EMAIL: 'infotekintercume@gmail.com'
};
