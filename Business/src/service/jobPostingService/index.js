/**
 * Export all job posting related services
 */
import jobPostingService, {
  submitJobPosting,
  getDraftJobPosting,
  saveDraftJobPosting,
  clearDraftJobPosting,
  getJobCategories
} from './jobPostingService';

import {
  APP_CONFIG,
  FEATURES,
  shouldUseMockApi
} from './config';

import quillHelper, {
  QUILL_FORMATS,
  QUILL_MODULES,
  quillImageUploadHandler,
  deltaToPlainText,
  isQuillEmpty,
  getWordCount,
  sanitizeQuillHtml
} from './quill-helper';

export {
  // Main service
  jobPostingService,
  submitJobPosting,
  getDraftJobPosting,
  saveDraftJobPosting,
  clearDraftJobPosting,
  getJobCategories,

  // Config
  APP_CONFIG,
  FEATURES,
  shouldUseMockApi,

  // Quill helper
  quillHelper,
  QUILL_FORMATS,
  QUILL_MODULES,
  quillImageUploadHandler,
  deltaToPlainText,
  isQuillEmpty,
  getWordCount,
  sanitizeQuillHtml
};

// Default export
export default jobPostingService;
