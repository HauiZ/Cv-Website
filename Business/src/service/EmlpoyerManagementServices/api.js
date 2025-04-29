import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from './constants';
import { APP_CONFIG } from './config';

/**
 * Base API setup with error handling and authentication
 */
const fetchWithAuth = async (url, options = {}) => {
  try {
    // Get auth token from local storage
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    // If body is FormData, delete Content-Type header so browser sets it correctly
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    // Setup timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.MAX_REQUEST_TIMEOUT || 10000);

    // Make request with timeout
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // For 204 No Content, return empty success response
    if (response.status === 204) {
      return { success: true };
    }

    // Parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (e) {
      // If server didn't return JSON, create a basic response object
      data = { success: response.ok, status: response.status };
    }

    // Handle API errors
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Đã xảy ra lỗi',
        errors: data.errors || {}
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);

    // Handle aborted request (timeout)
    if (error.name === 'AbortError') {
      throw {
        status: 408,
        message: 'Yêu cầu đã hết thời gian, vui lòng thử lại',
        errors: {}
      };
    }

    // Handle network errors
    if (error.message === 'Failed to fetch' || error.message?.includes('NetworkError')) {
      throw {
        status: 0,
        message: 'Không thể kết nối đến máy chủ, vui lòng kiểm tra kết nối mạng',
        errors: {}
      };
    }

    throw error;
  }
};

/**
 * API service for authentication
 */
export const authApi = {
  /**
   * Login with email and password for a specific role
   * @param {string} email - Email address
   * @param {string} password - Password
   * @param {string} roleName - Role name (candidate, recruiter, admin)
   * @returns {Promise} - Auth data with token
   */
  login: async (email, password, roleName) => {
    const url = API_ENDPOINTS.LOGIN.replace(':roleName', roleName);
    const data = await fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    // Save auth token
    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(data.user || {}));
    }

    return data;
  },

  /**
   * Logout current user
   */
  logout: async () => {
    await fetchWithAuth(API_ENDPOINTS.LOGOUT, { method: 'POST' });
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  },

  /**
   * Register a new candidate
   * @param {Object} userData - User registration data
   * @returns {Promise} - Registration result
   */
  registerCandidate: async (userData) => {
    return fetchWithAuth(API_ENDPOINTS.REGISTER_CANDIDATE, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  /**
   * Register a new recruiter
   * @param {Object} userData - User registration data
   * @returns {Promise} - Registration result
   */
  registerRecruiter: async (userData) => {
    return fetchWithAuth(API_ENDPOINTS.REGISTER_RECRUITER, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  /**
   * Get user profile
   * @returns {Promise} - User profile data
   */
  getProfile: async () => {
    return fetchWithAuth(API_ENDPOINTS.GET_PROFILE);
  },

  /**
   * Change user password
   * @param {Object} passwordData - Password change data
   * @returns {Promise} - Change result
   */
  changePassword: async (passwordData) => {
    return fetchWithAuth(API_ENDPOINTS.CHANGE_PASSWORD, {
      method: 'PATCH',
      body: JSON.stringify(passwordData)
    });
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} - Update result
   */
  changeProfile: async (profileData) => {
    return fetchWithAuth(API_ENDPOINTS.CHANGE_PROFILE, {
      method: 'PATCH',
      body: JSON.stringify(profileData)
    });
  }
};

/**
 * API service for employer (recruiter) management
 */
export const employerApi = {
  /**
   * Get all employers
   * @param {Object} params - Query parameters (pagination, search, etc.)
   * @returns {Promise} - List of employers
   */
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_ENDPOINTS.EMPLOYER}${queryParams ? `?${queryParams}` : ''}`;
    return fetchWithAuth(url);
  },

  /**
   * Get employer by ID
   * @param {string|number} id - Employer ID
   * @returns {Promise} - Employer data
   */
  getById: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.EMPLOYER_DETAIL(id));
  },

  /**
   * Create new employer
   * @param {Object} employerData - Employer data
   * @returns {Promise} - Created employer
   */
  create: async (employerData) => {
    return fetchWithAuth(API_ENDPOINTS.EMPLOYER, {
      method: 'POST',
      body: JSON.stringify(employerData)
    });
  },

  /**
   * Update employer
   * @param {string|number} id - Employer ID
   * @param {Object} employerData - Employer data to update
   * @returns {Promise} - Updated employer
   */
  update: async (id, employerData) => {
    return fetchWithAuth(API_ENDPOINTS.EMPLOYER_DETAIL(id), {
      method: 'PUT',
      body: JSON.stringify(employerData)
    });
  },

  /**
   * Delete employer
   * @param {string|number} id - Employer ID
   * @returns {Promise} - Delete result
   */
  delete: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.EMPLOYER_DETAIL(id), {
      method: 'DELETE'
    });
  }
};

/**
 * API service for file uploads
 */
export const uploadApi = {
  /**
   * Upload file with proper content type header
   * @param {string} url - API endpoint
   * @param {File} file - File to upload
   * @returns {Promise} - Upload result
   */
  uploadFile: async (url, file) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetchWithAuth(url, {
      method: 'POST',
      // Do not set Content-Type header here; browser will set it automatically with boundary
      body: formData
    });
  },

  /**
   * Upload CV document
   * @param {File} file - CV file
   * @param {number|string} jobId - Job ID to apply to
   * @returns {Promise} - Upload result
   */
  uploadCV: async (file, jobId) => {
    return uploadApi.uploadFile(API_ENDPOINTS.APPLY_JOB(jobId), file);
  },

  /**
   * Upload image (logo, profile, etc.)
   * @param {File} file - Image file
   * @returns {Promise} - Upload result with image URL
   */
  uploadImage: async (file) => {
    return uploadApi.uploadFile(API_ENDPOINTS.UPLOAD_IMAGE, file);
  }
};

/**
 * API service for recruitment news
 */
export const recruitmentNewsApi = {
  /**
   * Get all recruitment news
   * @param {Object} params - Query parameters (pagination, search, etc.)
   * @returns {Promise} - List of recruitment news
   */
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_ENDPOINTS.RECRUITMENT_NEWS}${queryParams ? `?${queryParams}` : ''}`;
    return fetchWithAuth(url);
  },

  /**
   * Get recruitment news by ID
   * @param {string|number} id - News ID
   * @returns {Promise} - News data
   */
  getById: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.RECRUITMENT_NEWS_DETAIL(id));
  },

  /**
   * Create new recruitment news
   * @param {Object} newsData - News data
   * @returns {Promise} - Created news
   */
  create: async (newsData) => {
    return fetchWithAuth(API_ENDPOINTS.RECRUITMENT_NEWS, {
      method: 'POST',
      body: JSON.stringify(newsData)
    });
  },

  /**
   * Update recruitment news
   * @param {string|number} id - News ID
   * @param {Object} newsData - News data to update
   * @returns {Promise} - Updated news
   */
  update: async (id, newsData) => {
    return fetchWithAuth(API_ENDPOINTS.RECRUITMENT_NEWS_DETAIL(id), {
      method: 'PUT',
      body: JSON.stringify(newsData)
    });
  }
};

/**
 * API service for getting common data (area, companies, etc.)
 */
export const commonApi = {
  /**
   * Get all area info (provinces, districts)
   * @returns {Promise} - Area data
   */
  getAreaInfo: async () => {
    return fetchWithAuth(API_ENDPOINTS.INFO_AREA);
  },

  /**
   * Get all companies
   * @returns {Promise} - List of companies
   */
  getAllCompanies: async () => {
    return fetchWithAuth(API_ENDPOINTS.ALL_COMPANIES);
  },

  /**
   * Get company details by ID
   * @param {string|number} id - Company ID
   * @returns {Promise} - Company data
   */
  getCompanyById: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.COMPANY_DETAIL(id));
  },

  /**
   * Get user's applications
   * @returns {Promise} - List of user's applications
   */
  getUserApplications: async () => {
    return fetchWithAuth(API_ENDPOINTS.GET_APPLICATIONS);
  },

  /**
   * Get all CV templates
   * @returns {Promise} - List of CV templates
   */
  getCVTemplates: async () => {
    return fetchWithAuth(API_ENDPOINTS.GET_TEMPLATES);
  },

  /**
   * Get CV template by ID
   * @param {string|number} id - Template ID
   * @returns {Promise} - Template data
   */
  getCVTemplateById: async (id) => {
    return fetchWithAuth(API_ENDPOINTS.TEMPLATE_DETAIL(id));
  },

  /**
   * Get user notifications
   * @returns {Promise} - List of notifications
   */
  getNotifications: async () => {
    return fetchWithAuth(API_ENDPOINTS.NOTIFICATIONS);
  }
};
