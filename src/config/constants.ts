// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  // Check for environment variables from config.js
  if (typeof window !== 'undefined' && window._env_ && window._env_.API_BASE_URL) {
    console.log('Using API URL from config.js:', window._env_.API_BASE_URL);
    return window._env_.API_BASE_URL;
  }

  // Development fallback - use the backend service name from docker-compose
  const devUrl = 'http://backend:8000/api';
  const prodUrl = 'https://apicrm.davalores.com.ar/api';
  
  const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
  console.log('Using fallback API URL:', baseUrl);
  return baseUrl;
};

export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';