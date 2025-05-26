// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  // In development, use the backend service directly
  if (process.env.NODE_ENV === 'development') {
    // Use the same protocol as the current page to avoid mixed content issues
    return '/api';
  }
  
  // For production, use the absolute path
  return '/api';
};

// Export the base URL and ensure it's used consistently
export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';