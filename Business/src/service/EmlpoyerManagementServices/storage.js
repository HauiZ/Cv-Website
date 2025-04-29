import { STORAGE_KEYS } from './constants';

/**
 * Utility for managing localStorage data with better error handling
 */
const storageService = {
  /**
   * Get item from localStorage with JSON parsing and error handling
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist or parsing fails
   * @returns {*} - Parsed value or default value
   */
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error getting item from localStorage [${key}]:`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage with JSON serialization and error handling
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be serialized)
   * @returns {boolean} - Whether operation was successful
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item in localStorage [${key}]:`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage with error handling
   * @param {string} key - Storage key
   * @returns {boolean} - Whether operation was successful
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item from localStorage [${key}]:`, error);
      return false;
    }
  },

  /**
   * Clear all localStorage with error handling
   * @returns {boolean} - Whether operation was successful
   */
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Specific application storage methods

  /**
   * Save employer form draft to localStorage
   * @param {Object} formData - Form data to save as draft
   * @returns {boolean} - Whether operation was successful
   */
  saveFormDraft: (formData) => {
    // Add timestamp to draft
    const draft = {
      ...formData,
      _lastSaved: new Date().toISOString()
    };
    return storageService.set(STORAGE_KEYS.FORM_DRAFT, draft);
  },

  /**
   * Load employer form draft from localStorage
   * @returns {Object|null} - Form draft data or null if no draft exists
   */
  loadFormDraft: () => {
    return storageService.get(STORAGE_KEYS.FORM_DRAFT, null);
  },

  /**
   * Clear employer form draft from localStorage
   * @returns {boolean} - Whether operation was successful
   */
  clearFormDraft: () => {
    return storageService.remove(STORAGE_KEYS.FORM_DRAFT);
  },

  /**
   * Get authentication token from localStorage
   * @returns {string|null} - Auth token or null if not exists
   */
  getAuthToken: () => {
    // Direct access for token as it doesn't need parsing
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  /**
   * Set authentication token and user info in localStorage
   * @param {string} token - Auth token
   * @param {Object} user - User info object
   * @returns {boolean} - Whether operation was successful
   */
  setAuth: (token, user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error setting auth data:', error);
      return false;
    }
  },

  /**
   * Clear authentication data from localStorage
   * @returns {boolean} - Whether operation was successful
   */
  clearAuth: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_INFO);
      return true;
    } catch (error) {
      console.error('Error clearing auth data:', error);
      return false;
    }
  },

  /**
   * Get user info from localStorage
   * @returns {Object|null} - User info or null if not exists
   */
  getUserInfo: () => {
    return storageService.get(STORAGE_KEYS.USER_INFO, null);
  }
};

export default storageService;
