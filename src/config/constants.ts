// Ensure API_BASE_URL is always correctly configured
const getApiBaseUrl = () => {
  // For both development and production, use relative path
  return '/api';
};

// Export the base URL and ensure it's used consistently
export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';