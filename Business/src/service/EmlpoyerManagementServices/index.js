import { authApi, employerApi, uploadApi, commonApi } from './api';
import validationService from './validation';
import storageService from './storage';
import employerService from './employer';
import * as constants from './constants';
import mockApi, { mockAuthApi, mockEmployerApi, mockUploadApi, mockCommonApi } from './mock-api';
import utils from './utils';
import { USE_MOCK_API, APP_CONFIG, shouldUseMockApi } from './config';

// EmployerContext imports are removed to prevent circular dependency
// The context will be imported directly in components that need it

// Select which API version to use based on central config
const api = {
  auth: shouldUseMockApi() ? mockAuthApi : authApi,
  employer: shouldUseMockApi() ? mockEmployerApi : employerApi,
  upload: shouldUseMockApi() ? mockUploadApi : uploadApi,
  common: shouldUseMockApi() ? mockCommonApi : commonApi,
};

// Export all services and constants
export {
  // API Services (use the selected API)
  api,

  // Original API Services
  authApi,
  employerApi,
  uploadApi,
  commonApi,

  // Mock API Services
  mockApi,
  mockAuthApi,
  mockEmployerApi,
  mockUploadApi,
  mockCommonApi,

  // Logic Services
  validationService,
  storageService,
  employerService,

  // Utility functions
  utils,

  // Constants and Config
  constants,
  USE_MOCK_API,
  APP_CONFIG
};

// Default export with selected API
export default {
  api,
  auth: api.auth,
  employer: employerService,
  validation: validationService,
  storage: storageService,
  upload: api.upload,
  common: api.common,
  utils,
  constants,
  config: { USE_MOCK_API, APP_CONFIG }
};
