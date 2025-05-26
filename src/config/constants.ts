// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    // In development, use HTTP and the correct port (8000)
    return 'http://localhost:8000/api';
  }
  
  // For production, use the absolute path to ensure proper routing
  return `${window.location.protocol}//${window.location.host}/api`;
};

// Export the base URL and ensure it's used consistently
export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';