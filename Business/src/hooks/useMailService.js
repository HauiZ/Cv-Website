import { useState } from 'react';
import { sendMail, sendTemplatedMail, EMAIL_TEMPLATES, validateEmail } from '../service/mailService';

/**
 * Custom hook để quản lý việc gửi email và các trạng thái liên quan
 * @returns {Object} - Các phương thức và trạng thái liên quan đến email
 */
const useMailService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /**
   * Gửi email thông thường
   * @param {Object} params - Tham số email
   * @returns {Promise} - Kết quả gửi email
   */
  const sendEmail = async (params) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await sendMail(params);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }

      return result;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi gửi email');
      return {
        success: false,
        message: err.message || 'Có lỗi xảy ra khi gửi email'
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Gửi email sử dụng template
   * @param {Object} params - Tham số email template
   * @returns {Promise} - Kết quả gửi email
   */
  const sendTemplateEmail = async (params) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await sendTemplatedMail(params);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }

      return result;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi gửi email template');
      return {
        success: false,
        message: err.message || 'Có lỗi xảy ra khi gửi email template'
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xóa thông báo lỗi và thành công
   */
  const clearStatus = () => {
    setError(null);
    setSuccess(false);
  };

  /**
   * Kiểm tra địa chỉ email hợp lệ
   * @param {string} email - Địa chỉ email cần kiểm tra
   * @returns {boolean} - Kết quả kiểm tra
   */
  const isValidEmail = (email) => {
    return validateEmail(email);
  };

  return {
    // Methods
    sendEmail,
    sendTemplateEmail,
    clearStatus,
    isValidEmail,

    // States
    loading,
    error,
    success,

    // Constants
    EMAIL_TEMPLATES,
  };
};

export default useMailService;
