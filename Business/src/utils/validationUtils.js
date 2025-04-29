/**
 * Utility functions for form validation
 */

/**
 * Check if job posting data has all required fields
 * @param {Object} recruitmentNewsData - Job posting data
 * @returns {Array} - Array of missing field names, empty if all required fields are present
 */
export const checkRecruitmentNewsData = (recruitmentNewsData) => {
  const requiredFields = [
    'jobTitle',
    'profession',
    'candidateNumber',
    'jobLevel',
    'workType',
    'degree',
    'province',
    'district',
    'jobAddress',
    'workDetail',
    'benefits',
    'applicationDeadline',
    'contactInfo',
    'contactAddress',
    'contactPhone',
    'contactEmail'
  ];

  const missingFields = [];

  for (const field of requiredFields) {
    if (!recruitmentNewsData[field]) {
      missingFields.push(field);
    }
  }

  return missingFields;
};

/**
 * Validate Vietnamese phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidVietnamesePhone = (phone) => {
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return phoneRegex.test(phone);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Create a named validationUtils object
const validationUtils = {
  checkRecruitmentNewsData,
  isValidVietnamesePhone,
  isValidEmail
};

export default validationUtils;
