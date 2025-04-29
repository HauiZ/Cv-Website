/**
 * Application configuration settings
 */
export const APP_CONFIG = {
  // API configuration
  MAX_REQUEST_TIMEOUT: 15000, // 15 seconds
  USE_MOCK_API: false, // Set to true to use mock API instead of real API

  // UI configuration
  FORM_AUTOSAVE_INTERVAL: 60000, // 1 minute
  MAX_FILE_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB

  // Feature flags
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
};

/**
 * Check if mock API should be used based on config and environment
 * @returns {boolean} Whether to use mock API
 */
export const shouldUseMockApi = () => {
  // Use environment variables if available
  if (import.meta.env?.VITE_USE_MOCK_API !== undefined) {
    return import.meta.env.VITE_USE_MOCK_API === 'true';
  }

  // Use localStorage setting if available (for development testing)
  const localStorageSetting = localStorage.getItem('use_mock_api');
  if (localStorageSetting !== null) {
    return localStorageSetting === 'true';
  }

  // Fall back to config setting
  return APP_CONFIG.USE_MOCK_API;
};

/**
 * Set mock API usage setting in localStorage (for development testing)
 * @param {boolean} useMock - Whether to use mock API
 */
export const setUseMockApi = (useMock) => {
  localStorage.setItem('use_mock_api', useMock ? 'true' : 'false');
};

export default {
  APP_CONFIG,
  shouldUseMockApi,
  setUseMockApi
};
