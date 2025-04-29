import { useState, useEffect } from 'react';
import {
  getDraftJobPosting,
  saveDraftJobPosting,
  clearDraftJobPosting,
  submitJobPosting,
  getJobCategories
} from '../service/jobPostingService/jobPostingService';

/**
 * Custom hook để quản lý các hoạt động liên quan đến đăng tin tuyển dụng
 * @returns {Object} - Các phương thức và trạng thái liên quan đến đăng tin tuyển dụng
 */
const useJobPostingService = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Tải bản nháp khi khởi tạo hook
  useEffect(() => {
    const loadDraft = () => {
      const draft = getDraftJobPosting();
      if (draft) {
        setFormData(draft);
      }
    };

    loadDraft();
  }, []);

  // Tải danh mục nghề nghiệp
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const result = await getJobCategories();
        setCategories(result);
      } catch (err) {
        console.error('Error loading job categories:', err);
        setError('Không thể tải danh mục nghề nghiệp');
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  /**
   * Cập nhật form data
   * @param {Object} newData - Dữ liệu mới để cập nhật
   */
  const updateFormData = (newData) => {
    const updatedData = { ...(formData || {}), ...newData };
    setFormData(updatedData);
    saveDraftJobPosting(updatedData);
  };

  /**
   * Lưu bản nháp tin tuyển dụng
   * @returns {boolean} - Trạng thái thành công
   */
  const saveDraft = () => {
    if (!formData) return false;

    const success = saveDraftJobPosting(formData);
    setSuccess(success);

    // Tự động ẩn thông báo thành công sau 3 giây
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }

    return success;
  };

  /**
   * Gửi form đăng tin tuyển dụng
   * @returns {Promise} - Kết quả gửi form
   */
  const submitForm = async () => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      const result = await submitJobPosting(formData);

      if (result.success) {
        setSuccess(true);
        // Xóa bản nháp khi gửi thành công
        clearDraftJobPosting();
        setFormData(null);
      } else {
        setError(result.message);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi gửi tin tuyển dụng';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Xóa bản nháp tin tuyển dụng
   */
  const clearDraft = () => {
    clearDraftJobPosting();
    setFormData(null);
  };

  /**
   * Xóa trạng thái lỗi và thành công
   */
  const clearStatus = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    // Methods
    updateFormData,
    saveDraft,
    submitForm,
    clearDraft,
    clearStatus,

    // States
    formData,
    loading,
    submitting,
    error,
    success,
    categories,
    categoriesLoading,
  };
};

export default useJobPostingService;
