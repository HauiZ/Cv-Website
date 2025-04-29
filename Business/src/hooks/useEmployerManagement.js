import { useState, useEffect, useCallback } from 'react';
import employerService from '../service/EmlpoyerManagementServices/employer';
import validationService from '../service/EmlpoyerManagementServices/validation';
import storageService from '../service/EmlpoyerManagementServices/storage';
import { shouldUseMockApi } from '../service/EmlpoyerManagementServices/config';
import {
  mockAuthApi,
  mockEmployerApi,
  mockUploadApi,
  mockCommonApi
} from '../service/EmlpoyerManagementServices/mock-api';
import {
  authApi,
  uploadApi,
  commonApi
} from '../service/EmlpoyerManagementServices/api';

/**
 * Custom hook để quản lý các hoạt động liên quan đến thông tin nhà tuyển dụng
 * @returns {Object} - Các phương thức và trạng thái liên quan đến quản lý thông tin nhà tuyển dụng
 */
const useEmployerManagement = () => {
  // Xác định sử dụng API thật hay giả lập
  const USE_MOCK_API = shouldUseMockApi();

  // Chọn API version để sử dụng
  const api = {
    auth: USE_MOCK_API ? mockAuthApi : authApi,
    upload: USE_MOCK_API ? mockUploadApi : uploadApi,
    common: USE_MOCK_API ? mockCommonApi : commonApi
  };

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

  // Tải dữ liệu ban đầu
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Tải form data (từ bản nháp hoặc mặc định)
        const data = await employerService.getFormData();
        setFormData(data);

        // Tải dữ liệu dropdown
        const dropdownData = await employerService.loadFormDropdownData();
        setIndustries(dropdownData.industries || []);
        setProvinces(dropdownData.provinces || []);

        // Nếu đã có tỉnh/thành phố, tải quận/huyện
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

  // Theo dõi thay đổi tỉnh/thành phố để tải quận/huyện
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

  /**
   * Xử lý thay đổi input
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Xóa lỗi cho trường này nếu có
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Cập nhật trực tiếp form data
   * @param {Object} newData - Dữ liệu mới để cập nhật
   */
  const updateFormData = (newData) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));

    // Xóa lỗi cho các trường được cập nhật
    const updatedErrors = { ...errors };
    Object.keys(newData).forEach(key => {
      if (updatedErrors[key]) {
        delete updatedErrors[key];
      }
    });

    if (Object.keys(updatedErrors).length !== Object.keys(errors).length) {
      setErrors(updatedErrors);
    }
  };

  /**
   * Xử lý tải lên file
   * @param {string} name - Tên trường file
   * @param {File} file - File cần tải lên
   */
  const handleFileUpload = async (name, file) => {
    if (!file) return;

    setIsUploading(true);
    try {
      let uploadResult;
      let validationError = null;

      // Kiểm tra file dựa vào loại
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
        // Cập nhật form data với kết quả tải lên
        updateFormData({
          [name]: uploadResult.url || uploadResult.documentId || file
        });

        // Đối với giấy phép kinh doanh, cập nhật trạng thái xác thực
        if (name === 'businessLicense') {
          updateFormData({
            isBusinessLicenseVerified: false,
            businessLicenseDocumentId: uploadResult.documentId
          });
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

  /**
   * Xử lý gửi form
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Kiểm tra form với xác thực đầy đủ (không phải bản nháp)
    const validationErrors = validationService.validateEmployerForm(formData, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Lưu dữ liệu nhà tuyển dụng
      await employerService.saveEmployer(formData);
      setSaveSuccess(true);

      // Xóa lỗi
      setErrors({});
      setApiError(null);

      // Xóa bản nháp
      storageService.clearFormDraft();
    } catch (error) {
      console.error('Error saving employer:', error);
      setApiError(error?.message || 'Failed to save employer data');

      // Nếu lỗi xác thực, cập nhật trạng thái lỗi
      if (error?.type === 'validation') {
        setErrors(error.errors || {});
      }
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Lưu bản nháp
   */
  const saveDraft = async () => {
    try {
      // Sử dụng employerService để lưu bản nháp với xác thực phù hợp
      await employerService.saveEmployer(formData, true);
      setSaveSuccess(true);

      // Ẩn thông báo thành công sau 3 giây
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
      // Nếu lỗi xác thực, cập nhật trạng thái lỗi
      if (error?.type === 'validation') {
        setErrors(error.errors || {});
      }
    }
  };

  /**
   * Xác thực giấy phép kinh doanh
   */
  const verifyBusinessLicense = async () => {
    if (!formData.businessLicenseDocumentId) return;

    setIsLoading(true);
    try {
      const result = await employerService.verifyBusinessLicense(formData.businessLicenseDocumentId);

      updateFormData({
        isBusinessLicenseVerified: result.verified || false
      });
    } catch (error) {
      console.error('Error verifying business license:', error);
      setApiError(error?.message || 'Failed to verify business license');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Xóa trạng thái lỗi và thành công
   */
  const clearStatus = () => {
    setErrors({});
    setApiError(null);
    setSaveSuccess(false);
  };

  return {
    // Methods
    handleChange,
    updateFormData,
    handleFileUpload,
    handleSubmit,
    saveDraft,
    verifyBusinessLicense,
    clearStatus,

    // States
    formData,
    isLoading,
    isSaving,
    isUploading,
    errors,
    apiError,
    industries,
    provinces,
    districts,
    saveSuccess,

    // API access
    api
  };
};

export default useEmployerManagement;
