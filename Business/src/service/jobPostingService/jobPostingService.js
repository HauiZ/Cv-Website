import axios from 'axios';
import { checkRecruitmentNewsData, isValidEmail, isValidVietnamesePhone } from '../../utils/validationUtils';
import { APP_CONFIG, FEATURES, shouldUseMockApi } from './config';

/**
 * Service for job posting operations
 */
const API_URL = APP_CONFIG.API_URL || 'https://mock-api.example.com/api';

/**
 * Get draft job posting from localStorage
 * @returns {Object|null} - Draft job posting or null if no draft
 */
export const getDraftJobPosting = () => {
  if (!FEATURES.ENABLE_DRAFT_SAVING) return null;

  try {
    const draftJson = localStorage.getItem('job_posting_draft');
    if (!draftJson) return null;

    return JSON.parse(draftJson);
  } catch (error) {
    console.error('Failed to load draft job posting:', error);
    return null;
  }
};

/**
 * Save job posting draft to localStorage
 * @param {Object} formData - The job posting form data
 * @returns {boolean} - Success status
 */
export const saveDraftJobPosting = (formData) => {
  if (!FEATURES.ENABLE_DRAFT_SAVING) return false;

  try {
    localStorage.setItem('job_posting_draft', JSON.stringify(formData));
    return true;
  } catch (error) {
    console.error('Failed to save draft job posting:', error);
    return false;
  }
};

/**
 * Clear job posting draft from localStorage
 * @returns {boolean} - Success status
 */
export const clearDraftJobPosting = () => {
  try {
    localStorage.removeItem('job_posting_draft');
    return true;
  } catch (error) {
    console.error('Failed to clear draft job posting:', error);
    return false;
  }
};

/**
 * Submit a job posting form
 * @param {Object} formData - The job posting form data
 * @returns {Promise} - Response from the API
 */
export const submitJobPosting = async (formData) => {
  try {
    // Transform formData to match backend expectations
    const transformedData = transformFormData(formData);

    // Validate transformed data using backend validation logic
    const missingFields = checkRecruitmentNewsData(transformedData);
    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Thiếu các trường bắt buộc: ${missingFields.join(', ')}`
      };
    }

    // Validate email and phone
    if (!isValidEmail(transformedData.contactEmail)) {
      return {
        success: false,
        message: 'Email liên hệ không hợp lệ'
      };
    }

    if (!isValidVietnamesePhone(transformedData.contactPhone)) {
      return {
        success: false,
        message: 'Số điện thoại liên hệ không hợp lệ'
      };
    }

    // Get the company ID from localStorage or context
    const companyId = localStorage.getItem('companyId') || '1'; // Default for testing

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.MAX_REQUEST_TIMEOUT);

    const response = await axios.post(`${API_URL}/recruitments`, {
      ...transformedData,
      companyId
    }, {
      signal: controller.signal
    });

    // Clear timeout
    clearTimeout(timeoutId);

    // Clear draft on successful submit
    if (response.data.success) {
      clearDraftJobPosting();
    }

    return {
      success: true,
      message: response.data.message || 'Đăng tin tuyển dụng thành công',
      data: response.data
    };
  } catch (error) {
    console.error('Error submitting job posting:', error);

    // Handle abort (timeout)
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'Yêu cầu đã hết thời gian, vui lòng thử lại',
      };
    }

    // Handle specific API error responses
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Đã xảy ra lỗi khi đăng tin tuyển dụng. Vui lòng thử lại sau.',
        error: error.response.data
      };
    }

    // Handle network errors
    return {
      success: false,
      message: 'Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối internet của bạn.',
      error
    };
  }
};

/**
 * Transform the form data to match backend API expectations
 * @param {Object} formData - Original form data from the UI
 * @returns {Object} - Transformed data for the API
 */
const transformFormData = (formData) => {
  // Extract salary information
  let salaryMin = 0;
  let salaryMax = 0;

  if (formData.salary.currency === '1trto3trVND') {
    salaryMin = 1000000;
    salaryMax = 3000000;
  } else if (formData.salary.currency === '5trto8trVND') {
    salaryMin = 5000000;
    salaryMax = 8000000;
  } else if (formData.salary.currency === '10tr+VND') {
    salaryMin = 10000000;
    salaryMax = 15000000;
  }

  // Map deadline to days
  let applicationDeadline;
  switch (formData.deadline) {
    case '3days':
      applicationDeadline = 3;
      break;
    case '7days':
      applicationDeadline = 7;
      break;
    case '14days':
      applicationDeadline = 14;
      break;
    case '30days':
      applicationDeadline = 30;
      break;
    default:
      applicationDeadline = APP_CONFIG.DEFAULT_APPLICATION_DEADLINE; // Default from config
  }

  // Prepare video URL if available
  let videoUrl = '';
  if (formData.uploadMethod === 'link' && formData.videoUrl) {
    videoUrl = formData.videoUrl;
  }

  return {
    jobTitle: formData.jobTitle,
    profession: formData.industry,
    candidateNumber: formData.numPositions,
    jobLevel: formData.level,
    workType: formData.workType,
    degree: formData.education,
    province: formData.province,
    district: formData.district,
    jobAddress: formData.workLocation,
    salaryMin,
    salaryMax,
    salaryNegotiable: formData.salary.negotiable,
    experience: formData.experience,
    workDateIn: formData.workingTime,
    workDetail: formData.jobDescription,
    jobRequirements: formData.otherRequirements,
    benefits: formData.benefits,
    applicationDeadline,
    contactInfo: formData.contactInfo.name,
    contactAddress: formData.contactInfo.address,
    contactPhone: formData.contactInfo.phone,
    contactEmail: formData.contactInfo.email,
    videoUrl,
  };
};

/**
 * Get available job categories
 * @returns {Promise<Array>} - List of job categories
 */
export const getJobCategories = async () => {
  try {
    if (shouldUseMockApi()) {
      // Return mock data after short delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return [
        { value: 'it', label: 'Công nghệ thông tin' },
        { value: 'finance', label: 'Tài chính - Ngân hàng' },
        { value: 'education', label: 'Giáo dục - Đào tạo' },
        { value: 'manufacturing', label: 'Sản xuất' },
        { value: 'retail', label: 'Bán lẻ' },
        { value: 'healthcare', label: 'Y tế - Dược phẩm' },
        { value: 'construction', label: 'Xây dựng' },
        { value: 'tourism', label: 'Du lịch - Khách sạn' }
      ];
    }

    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job categories:', error);
    throw error;
  }
};

// Create a named jobPostingService object
const jobPostingService = {
  submitJobPosting,
  getDraftJobPosting,
  saveDraftJobPosting,
  clearDraftJobPosting,
  getJobCategories
};

export default jobPostingService;
