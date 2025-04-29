/**
 * Configuration settings for Job Posting Service
 */

// Environment variables with fallbacks
export const APP_CONFIG = {
  // API Configuration
  API_URL: 'https://mock-api.example.com/api/v1', // Base API URL
  MAX_REQUEST_TIMEOUT: 10000, // 10 seconds timeout for requests

  // Job Posting Configuration
  MAX_POSITIONS: 100, // Maximum number of positions allowed
  MAX_DESCRIPTION_LENGTH: 5000, // Maximum length for job description
  MAX_TITLE_LENGTH: 200, // Maximum length for job title
  DEFAULT_APPLICATION_DEADLINE: 7, // Default deadline in days

  // File Upload Configuration
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],

  // Validation Configuration
  VALIDATION_RULES: {
    PHONE_REGEX: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    URL_REGEX: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,
  }
};

// Feature flags
export const FEATURES = {
  ENABLE_RICH_TEXT: true,
  ENABLE_FILE_UPLOAD: true,
  ENABLE_VIDEO_EMBED: true,
  ENABLE_DRAFT_SAVING: true
};

// Mock data configuration (for development)
export const shouldUseMockApi = () => {
  // In a real app, we would check the environment
  // e.g., process.env.NODE_ENV === 'development' || process.env.REACT_APP_USE_MOCK_API === 'true'
  return true;
};

export default {
  APP_CONFIG,
  FEATURES,
  shouldUseMockApi
};
