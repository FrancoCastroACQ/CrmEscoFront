// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000/api';
  }
  
  // For production, use the relative path since nginx is handling the proxy
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';