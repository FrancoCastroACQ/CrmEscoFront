// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  // Check for environment variables from config.js
  if (typeof window !== 'undefined' && window._env_ && window._env_.API_BASE_URL) {
    return window._env_.API_BASE_URL;
  }

  // Development fallback
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const devUrl = 'http://localhost:8000/api';  // Changed to localhost for local development
  const prodUrl = 'https://apicrm.davalores.com.ar/api';
  
  const baseUrl = isDevelopment ? devUrl : prodUrl;
  console.log('Using API URL:', baseUrl);
  return baseUrl;
};

export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';