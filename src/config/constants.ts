// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  // In development, use the backend service directly
  if (process.env.NODE_ENV === 'development') {
    return 'https://localhost/api';
  }
  
  // For production, use the absolute path
  return `${window.location.protocol}//${window.location.host}/api`;
};

// Export the base URL and ensure it's used consistently
export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';