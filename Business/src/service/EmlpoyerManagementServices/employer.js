import validationService from './validation';
import storageService from './storage';
import { VALIDATION_RULES } from './constants';
import { mockEmployerApi, mockUploadApi, mockCommonApi } from './mock-api';
import { employerApi, uploadApi, commonApi, authApi } from './api';
import { shouldUseMockApi } from './config';

// Determine whether to use real or mock API based on central config
const USE_MOCK_API = shouldUseMockApi();

// Select which API version to use
const api = {
  employer: USE_MOCK_API ? mockEmployerApi : employerApi,
  upload: USE_MOCK_API ? mockUploadApi : uploadApi,
  common: USE_MOCK_API ? mockCommonApi : commonApi,
  auth: USE_MOCK_API ? mockEmployerApi : authApi
};

/**
 * Employer service for managing employer operations
 */
const employerService = {
  /**
   * Get employer data for form (either from API or draft)
   * @param {string|number} [id] - Employer ID (optional)
   * @returns {Promise<Object>} - Employer data
   */
  getFormData: async (id) => {
    try {
      // If we have an ID, try to load from API
      if (id) {
        return await api.employer.getById(id);
      }

      // Try to get current user profile if logged in
      try {
        const profile = await api.auth.getProfile();
        if (profile) {
          return profile;
        }
      } catch (error) {
        console.log('User not logged in or error getting profile');
      }

      // Otherwise check for draft
      const draft = storageService.loadFormDraft();
      if (draft) {
        return draft;
      }

      // Return empty form data if no draft
      return {
        email: '',
        password: '',
        companyName: '',
        directorName: '',
        phone: '',
        logo: null,
        status: 'active',
      };
    } catch (error) {
      console.error('Error loading employer form data:', error);
      throw error;
    }
  },

  /**
   * Save employer data (create or update)
   * @param {Object} formData - Employer form data
   * @param {boolean} [isDraft=false] - If true, save as draft only (to localStorage)
   * @returns {Promise<Object>} - Saved employer data
   */
  saveEmployer: async (formData, isDraft = false) => {
    try {
      // Validate form data - for drafts, use less strict validation
      const errors = validationService.validateEmployerForm(formData, !isDraft);
      if (Object.keys(errors).length > 0) {
        throw { type: 'validation', errors };
      }

      if (isDraft) {
        // Save to localStorage as draft
        storageService.saveFormDraft(formData);
        return formData;
      }

      // Upload files if needed
      const uploadTasks = [];
      const uploadedData = { ...formData };

      // Upload logo if it's a File object (not a string URL)
      if (formData.logo instanceof File) {
        uploadTasks.push(
          api.upload.uploadImage(formData.logo).then(result => {
            uploadedData.logo = result.url;
          })
        );
      }

      // Upload business license if it's a File
      if (formData.businessLicense instanceof File) {
        uploadTasks.push(
          api.upload.uploadImage(formData.businessLicense).then(result => {
            uploadedData.businessLicense = result.documentId || result.url;
          })
        );
      }

      // Wait for all uploads to complete
      if (uploadTasks.length > 0) {
        await Promise.all(uploadTasks);
      }

      // Create or update employer profile
      let savedEmployer;
      if (formData.id) {
        // Use changeProfile instead of update for existing user
        savedEmployer = await api.auth.changeProfile(uploadedData);
      } else {
        // Register as new recruiter if no ID
        savedEmployer = await api.auth.registerRecruiter(uploadedData);
      }

      // Clear draft after successful save
      storageService.clearFormDraft();

      return savedEmployer;
    } catch (error) {
      console.error('Error saving employer:', error);
      throw error;
    }
  },

  /**
   * Validate logo file before upload
   * @param {File} file - Logo file
   * @returns {string|null} - Error message or null if valid
   */
  validateLogo: (file) => {
    if (!file) return null;

    const sizeError = validationService.fileSize(file);
    if (sizeError) return sizeError;

    const typeError = validationService.fileType(file, VALIDATION_RULES.ALLOWED_IMAGE_TYPES);
    if (typeError) return typeError;

    return null;
  },

  /**
   * Validate document file before upload
   * @param {File} file - Document file
   * @returns {string|null} - Error message or null if valid
   */
  validateDocument: (file) => {
    if (!file) return null;

    const sizeError = validationService.fileSize(file);
    if (sizeError) return sizeError;

    const typeError = validationService.fileType(file, VALIDATION_RULES.ALLOWED_DOCUMENT_TYPES);
    if (typeError) return typeError;

    return null;
  },

  /**
   * Validate media file before upload
   * @param {File} file - Media file (image/video)
   * @returns {string|null} - Error message or null if valid
   */
  validateMedia: (file) => {
    if (!file) return null;

    const sizeError = validationService.fileSize(file);
    if (sizeError) return sizeError;

    const typeError = validationService.fileType(file, VALIDATION_RULES.ALLOWED_MEDIA_TYPES);
    if (typeError) return typeError;

    return null;
  },

  /**
   * Load dropdown data for forms (industries, provinces, etc.)
   * @returns {Promise<Object>} - Object with all dropdown data
   */
  loadFormDropdownData: async () => {
    try {
      // Get area info which includes provinces
      const areaData = await api.common.getAreaInfo();

      // Extract provinces and industries from area data
      const provinces = areaData.provinces || [];
      const industries = areaData.industries || [];

      return {
        industries,
        provinces
      };
    } catch (error) {
      console.error('Error loading form dropdown data:', error);
      throw error;
    }
  },

  /**
   * Load districts for a province
   * @param {string|number} provinceId - Province ID
   * @returns {Promise<Array>} - Array of districts
   */
  loadDistricts: async (provinceId) => {
    if (!provinceId) return [];

    try {
      // Get area info and filter districts by province
      const areaData = await api.common.getAreaInfo();
      const districts = areaData.districts || [];

      // Filter districts by province ID
      return districts.filter(district => district.provinceId === provinceId);
    } catch (error) {
      console.error('Error loading districts:', error);
      throw error;
    }
  },

  /**
   * Get all companies
   * @returns {Promise<Array>} - Array of companies
   */
  getAllCompanies: async () => {
    try {
      return await api.common.getAllCompanies();
    } catch (error) {
      console.error('Error getting all companies:', error);
      throw error;
    }
  },

  /**
   * Get company details by ID
   * @param {string|number} id - Company ID
   * @returns {Promise<Object>} - Company details
   */
  getCompanyById: async (id) => {
    try {
      return await api.common.getCompanyById(id);
    } catch (error) {
      console.error(`Error getting company ${id}:`, error);
      throw error;
    }
  }
};

export default employerService;
