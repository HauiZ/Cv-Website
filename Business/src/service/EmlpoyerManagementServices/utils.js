/**
 * General utility functions
 */

/**
 * Adds artificial delay to async functions (for UI testing/mock API)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>} - Promise that resolves after delay
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Format date to local format
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale to use (default: 'vi-VN')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, locale = 'vi-VN') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format currency with VND
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale to use (default: 'vi-VN')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, locale = 'vi-VN') => {
  if (amount === null || amount === undefined) return '';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

/**
 * Truncate text to specific length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Max length (default: 100)
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Get initials from name for avatars
 * @param {string} name - Full name
 * @returns {string} - Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Test API connection to check if backend is accessible
 * @param {string} baseUrl - Base URL to test
 * @returns {Promise<{success: boolean, message: string}>} - Test result
 */
export const testApiConnection = async (baseUrl) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${baseUrl}/users/getInfoArea`, {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return {
        success: true,
        message: 'Kết nối API thành công'
      };
    } else {
      return {
        success: false,
        message: `Lỗi kết nối API: ${response.status} ${response.statusText}`
      };
    }
  } catch (error) {
    console.error('Error testing API connection:', error);
    return {
      success: false,
      message: error.name === 'AbortError'
        ? 'Kết nối API timeout, vui lòng kiểm tra lại server'
        : `Lỗi kết nối API: ${error.message}`
    };
  }
};

/**
 * Parse API error from backend or create standardized error object
 * @param {Error|Object} error - Error object
 * @returns {Object} - Standardized error object
 */
export const parseApiError = (error) => {
  // If it's already in our error format, return it
  if (error && error.status && error.message) {
    return error;
  }

  // Standard API error
  if (error && error.response) {
    try {
      const data = error.response.data;
      return {
        status: error.response.status,
        message: data.message || 'Có lỗi xảy ra từ server',
        errors: data.errors || {}
      };
    } catch (e) {
      console.error('Error parsing API error:', e);
    }
  }

  // Network error
  if (error && error.message && error.message.includes('Network Error')) {
    return {
      status: 0,
      message: 'Không thể kết nối đến máy chủ, vui lòng kiểm tra kết nối mạng',
      errors: {}
    };
  }

  // Default error
  return {
    status: 500,
    message: error?.message || 'Đã xảy ra lỗi không xác định',
    errors: {}
  };
};

/**
 * Utility functions as a single object
 */
const utils = {
  delay,
  formatDate,
  formatCurrency,
  truncateText,
  getInitials,
  testApiConnection,
  parseApiError
};

export default utils;
