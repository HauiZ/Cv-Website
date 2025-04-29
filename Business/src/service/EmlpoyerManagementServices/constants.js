// API Configuration
export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login/:roleName',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/refresh-token',

  // User endpoints
  REGISTER_CANDIDATE: '/users/registerCandidate',
  REGISTER_RECRUITER: '/users/registerRecruiter',
  GET_PROFILE: '/users/getProfile',
  CHANGE_PASSWORD: '/users/changePassword',
  CHANGE_PROFILE: '/users/changeProfile',

  // Employer endpoints (mapped to recruiter routes)
  EMPLOYER: '/recruiter',
  EMPLOYER_DETAIL: (id) => `/recruiter/${id}`,

  // Upload endpoints
  UPLOAD_CV: '/upload/cv',
  UPLOAD_IMAGE: '/upload/image',

  // Recruitment news endpoints
  RECRUITMENT_NEWS: '/recruitmentNews',
  RECRUITMENT_NEWS_DETAIL: (id) => `/recruitmentNews/${id}`,

  // Common data endpoints (area info)
  INFO_AREA: '/users/getInfoArea',
  ALL_COMPANIES: '/users/getAllCompany',
  COMPANY_DETAIL: (id) => `/users/getInfoCompany/${id}`,

  // Application endpoints
  APPLY_JOB: (id) => `/users/applyJob/${id}`,
  GET_APPLICATIONS: '/users/getInfoApplication',

  // Template endpoints
  GET_TEMPLATES: '/users/getTemplateCV',
  TEMPLATE_DETAIL: (id) => `/users/getDetailTemplateCV/${id}`,

  // Notification endpoints
  NOTIFICATIONS: '/users/getNotification',
};

// Storage keys for localStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_INFO: 'user_info',
  FORM_DRAFT: 'employer_form_draft',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
};

// Validation rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_MEDIA_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'],
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_REGEX: /^(0|\+84)([0-9]{9,10})$/,
  URL_REGEX: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,
  TAX_CODE_REGEX: /^[0-9]{10,13}$/,
};

// Status constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// Message constants
export const MESSAGES = {
  VALIDATION_ERROR: 'Vui lòng kiểm tra lại thông tin.',
  SERVER_ERROR: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
  UNAUTHORIZED: 'Bạn cần đăng nhập để thực hiện chức năng này.',
  FORBIDDEN: 'Bạn không có quyền thực hiện chức năng này.',
  NOT_FOUND: 'Không tìm thấy thông tin yêu cầu.',
  SAVE_SUCCESS: 'Lưu thông tin thành công.',
  DELETE_SUCCESS: 'Xóa thành công.',
};
