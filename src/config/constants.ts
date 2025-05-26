// Ensure API_BASE_URL is always HTTPS in production
const getApiBaseUrl = () => {
  // For local development, use localStorage
  return '';  // Empty string since we're using localStorage
};

export const API_BASE_URL = getApiBaseUrl();
export const DATASCOPE_URL = typeof window !== 'undefined' && window._env_?.DATASCOPE_URL || '';