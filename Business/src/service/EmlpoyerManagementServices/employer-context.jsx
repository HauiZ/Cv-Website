import React, { createContext, useContext, useState, useEffect } from 'react';
import validationService from './validation';
import storageService from './storage';
import employerService from './employer';
import { mockAuthApi, mockEmployerApi, mockUploadApi, mockCommonApi } from './mock-api';
import { authApi, uploadApi, commonApi } from './api';
import { shouldUseMockApi } from './config';

// Determine whether to use real or mock API based on central config
const USE_MOCK_API = shouldUseMockApi();

// Select which API version to use - importing directly from api or mock-api
const api = {
  auth: USE_MOCK_API ? mockAuthApi : authApi,
  upload: USE_MOCK_API ? mockUploadApi : uploadApi,
  common: USE_MOCK_API ? mockCommonApi : commonApi
};

// Create context
const EmployerContext = createContext();

export const EmployerProvider = ({ children }) => {
  // Form data state
  const [formData, setFormData] = useState({});

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Error states
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Dropdown data
  const [industries, setIndustries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Success state
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize form data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Load form data (from draft or default)
        const data = await employerService.getFormData();
        setFormData(data);

        // Load dropdown data
        const dropdownData = await employerService.loadFormDropdownData();
        setIndustries(dropdownData.industries || []);
        setProvinces(dropdownData.provinces || []);

        // If province is set, load districts
        if (data.province) {
          const districtsList = await employerService.loadDistricts(data.province);
          setDistricts(districtsList || []);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        setApiError(error?.message || 'Failed to load initial data');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Watch for province changes to load districts
  useEffect(() => {
    const loadDistrictsForProvince = async () => {
      if (formData.province) {
        try {
          const districtsList = await employerService.loadDistricts(formData.province);
          setDistricts(districtsList || []);
        } catch (error) {
          console.error('Error loading districts:', error);
        }
      } else {
        setDistricts([]);
      }
    };

    loadDistrictsForProvince();
  }, [formData.province]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if any
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle file uploads
  const handleFileUpload = async (name, file) => {
    if (!file) return;

    setIsUploading(true);
    try {
      let uploadResult;
      let validationError = null;

      // Validate file based on type
      switch (name) {
        case 'logo':
          validationError = employerService.validateLogo(file);
          if (!validationError) {
            uploadResult = await api.upload.uploadLogo(file);
          }
          break;
        case 'businessLicense':
          validationError = employerService.validateDocument(file);
          if (!validationError) {
            uploadResult = await api.upload.uploadDocument(file);
          }
          break;
        case 'media':
          validationError = employerService.validateMedia(file);
          if (!validationError) {
            uploadResult = await api.upload.uploadMedia(file);
          }
          break;
        default:
          break;
      }

      if (validationError) {
        setErrors(prev => ({
          ...prev,
          [name]: validationError
        }));
        return;
      }

      if (uploadResult) {
        // Update form data with upload result
        setFormData(prev => ({
          ...prev,
          [name]: uploadResult.url || uploadResult.documentId || file
        }));

        // For business license, set verification status
        if (name === 'businessLicense') {
          setFormData(prev => ({
            ...prev,
            isBusinessLicenseVerified: false,
            businessLicenseDocumentId: uploadResult.documentId
          }));
        }
      }
    } catch (error) {
      console.error(`Error uploading ${name}:`, error);
      setErrors(prev => ({
        ...prev,
        [name]: error?.message || `Failed to upload ${name}`
      }));
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate form with complete validation (not draft)
    const validationErrors = validationService.validateEmployerForm(formData, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Save employer data
      await employerService.saveEmployer(formData);
      setSaveSuccess(true);

      // Clear errors
      setErrors({});
      setApiError(null);

      // Clear draft
      storageService.clearFormDraft();
    } catch (error) {
      console.error('Error saving employer:', error);
      setApiError(error?.message || 'Failed to save employer data');

      // If validation error, set validation errors
      if (error?.type === 'validation') {
        setErrors(error.errors || {});
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Save draft
  const saveDraft = async () => {
    try {
      // Use employerService to save draft with proper validation
      await employerService.saveEmployer(formData, true);
      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
      // If validation error, set validation errors
      if (error?.type === 'validation') {
        setErrors(error.errors || {});
      }
    }
  };

  // Verify business license
  const verifyBusinessLicense = async () => {
    if (!formData.businessLicenseDocumentId) return;

    setIsLoading(true);
    try {
      const result = await employerService.verifyBusinessLicense(formData.businessLicenseDocumentId);

      setFormData(prev => ({
        ...prev,
        isBusinessLicenseVerified: result.verified || false
      }));
    } catch (error) {
      console.error('Error verifying business license:', error);
      setApiError(error?.message || 'Failed to verify business license');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      email: '',
      password: '',
      companyName: '',
      directorName: '',
      phone: '',
      logo: null,
      status: 'active',
    });
    setErrors({});
    setApiError(null);
    setSaveSuccess(false);
    storageService.clearFormDraft();
  };

  // Context value
  const value = {
    // State
    formData,
    errors,
    apiError,
    isLoading,
    isSaving,
    isUploading,
    saveSuccess,

    // Dropdown data
    industries,
    provinces,
    districts,

    // Actions
    setFormData,
    handleChange,
    handleFileUpload,
    handleSubmit,
    saveDraft,
    verifyBusinessLicense,
    clearForm,

    // Error handling
    setErrors,
    setApiError
  };

  return (
    <EmployerContext.Provider value={value}>
      {children}
    </EmployerContext.Provider>
  );
};

// Custom hook to use the employer context
export const useEmployer = () => {
  const context = useContext(EmployerContext);
  if (!context) {
    throw new Error('useEmployer must be used within an EmployerProvider');
  }
  return context;
};

export default EmployerContext;
