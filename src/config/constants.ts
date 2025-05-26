// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  if (window._env_?.API_BASE_URL) {
    return window._env_.API_BASE_URL;
  }
  // Development fallback
  return process.env.NODE_ENV === 'production' 
    ? 'https://apicrm.davalores.com.ar:8000/api'
    : 'http://127.0.0.1:8000/api';
};

export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = window._env_?.DATASCOPE_URL || '';