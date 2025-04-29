import { VALIDATION_RULES } from './constants';

/**
 * Validation service for form validation
 */
const validationService = {
  /**
   * Validate required field
   * @param {*} value - Field value
   * @returns {string|null} - Error message or null if valid
   */
  required: (value) => {
    if (value === undefined || value === null || value === '') {
      return 'Trường này không được để trống';
    }
    return null;
  },

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {string|null} - Error message or null if valid
   */
  email: (email) => {
    if (!email) return null; // Skip if empty (required validation will catch if needed)

    if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
      return 'Email không hợp lệ';
    }
    return null;
  },

  /**
   * Validate phone number format
   * @param {string} phone - Phone to validate
   * @returns {string|null} - Error message or null if valid
   */
  phone: (phone) => {
    if (!phone) return null; // Skip if empty (required validation will catch if needed)

    if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) {
      return 'Số điện thoại không hợp lệ';
    }
    return null;
  },

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {string|null} - Error message or null if valid
   */
  url: (url) => {
    if (!url) return null; // Skip if empty (required validation will catch if needed)

    if (!VALIDATION_RULES.URL_REGEX.test(url)) {
      return 'URL không hợp lệ';
    }
    return null;
  },

  /**
   * Validate tax code format
   * @param {string} taxCode - Tax code to validate
   * @returns {string|null} - Error message or null if valid
   */
  taxCode: (taxCode) => {
    if (!taxCode) return null; // Skip if empty (required validation will catch if needed)

    if (!VALIDATION_RULES.TAX_CODE_REGEX.test(taxCode)) {
      return 'Mã số thuế không hợp lệ';
    }
    return null;
  },

  /**
   * Validate file size
   * @param {File} file - File to validate
   * @param {number} [maxSize=5242880] - Maximum size in bytes (default 5MB)
   * @returns {string|null} - Error message or null if valid
   */
  fileSize: (file, maxSize = VALIDATION_RULES.MAX_FILE_SIZE) => {
    if (!file) return null;

    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return `Tệp vượt quá kích thước tối đa (${maxSizeMB}MB)`;
    }
    return null;
  },

  /**
   * Validate file type
   * @param {File} file - File to validate
   * @param {string[]} allowedTypes - Array of allowed MIME types
   * @returns {string|null} - Error message or null if valid
   */
  fileType: (file, allowedTypes) => {
    if (!file) return null;

    if (!allowedTypes.includes(file.type)) {
      return 'Định dạng tệp không được hỗ trợ';
    }
    return null;
  },

  /**
   * Validate minimum password length
   * @param {string} password - Password to validate
   * @param {number} [minLength=8] - Minimum length
   * @returns {string|null} - Error message or null if valid
   */
  passwordLength: (password, minLength = VALIDATION_RULES.PASSWORD_MIN_LENGTH) => {
    if (!password) return null; // Skip if empty (required validation will catch if needed)

    if (password.length < minLength) {
      return `Mật khẩu phải có ít nhất ${minLength} ký tự`;
    }
    return null;
  },

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {string|null} - Error message or null if valid
   */
  passwordStrength: (password) => {
    if (!password) return null; // Skip if empty

    // Check for at least one uppercase, one lowercase, one number, and one special character
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
      return 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt';
    }
    return null;
  },

  /**
   * Validate password confirmation
   * @param {string} password - Password
   * @param {string} confirmPassword - Password confirmation
   * @returns {string|null} - Error message or null if valid
   */
  passwordMatch: (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Xác nhận mật khẩu không khớp';
    }
    return null;
  },

  /**
   * Validate date format and range
   * @param {string} date - Date to validate (YYYY-MM-DD)
   * @param {Object} options - Validation options
   * @returns {string|null} - Error message or null if valid
   */
  date: (date, options = {}) => {
    if (!date) return null; // Skip if empty

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Ngày không hợp lệ';
    }

    if (options.minDate && dateObj < new Date(options.minDate)) {
      return `Ngày phải sau ${options.minDate}`;
    }

    if (options.maxDate && dateObj > new Date(options.maxDate)) {
      return `Ngày phải trước ${options.maxDate}`;
    }

    return null;
  },

  /**
   * Validate employer form
   * @param {Object} formData - Form data
   * @param {boolean} [isSubmit=false] - Whether this is a submit validation (stricter) or draft
   * @returns {Object} - Object with validation errors (key: fieldName, value: errorMessage)
   */
  validateEmployerForm: (formData, isSubmit = false) => {
    const errors = {};

    // For drafts, we don't need to validate all fields
    // For submit, we validate all required fields

    // Email validation (always required)
    const emailError = validationService.required(formData.email) ||
                       validationService.email(formData.email);
    if (emailError) errors.email = emailError;

    // Password validation (required for new accounts, not for updates)
    if (!formData.id || formData.password) { // New account or password changed
      const passwordError = isSubmit ? validationService.required(formData.password) : null ||
                          validationService.passwordLength(formData.password);
      if (passwordError) errors.password = passwordError;
    }

    // Company name (required)
    if (isSubmit || formData.companyName) {
      const companyNameError = validationService.required(formData.companyName);
      if (companyNameError) errors.companyName = companyNameError;
    }

    // Director name (required)
    if (isSubmit || formData.directorName) {
      const directorNameError = validationService.required(formData.directorName);
      if (directorNameError) errors.directorName = directorNameError;
    }

    // Phone validation (required)
    if (isSubmit || formData.phone) {
      const phoneError = validationService.required(formData.phone) ||
                         validationService.phone(formData.phone);
      if (phoneError) errors.phone = phoneError;
    }

    // Company email validation (optional)
    const companyEmailError = validationService.email(formData.companyEmail);
    if (companyEmailError) errors.companyEmail = companyEmailError;

    // Website validation (optional)
    const websiteError = validationService.url(formData.website);
    if (websiteError) errors.website = websiteError;

    // Tax code validation (optional)
    const taxCodeError = validationService.taxCode(formData.taxCode);
    if (taxCodeError) errors.taxCode = taxCodeError;

    // Optional validations for other fields

    // Contact phone validation (required if isSubmit)
    if (isSubmit || formData.contactPhone) {
      const contactPhoneError = isSubmit ? validationService.required(formData.contactPhone) : null ||
                               validationService.phone(formData.contactPhone);
      if (contactPhoneError) errors.contactPhone = contactPhoneError;
    }

    // Contact email validation (optional)
    const contactEmailError = validationService.email(formData.contactEmail);
    if (contactEmailError) errors.contactEmail = contactEmailError;

    // Address validation (required if isSubmit)
    if (isSubmit || formData.address) {
      const addressError = isSubmit ? validationService.required(formData.address) : null;
      if (addressError) errors.address = addressError;
    }

    // Province validation (required if isSubmit)
    if (isSubmit || formData.province) {
      const provinceError = isSubmit ? validationService.required(formData.province) : null;
      if (provinceError) errors.province = provinceError;
    }

    // Founding date validation (optional)
    if (formData.foundingDate) {
      const today = new Date();
      const options = {
        maxDate: today.toISOString().split('T')[0] // Can't be in the future
      };
      const foundingDateError = validationService.date(formData.foundingDate, options);
      if (foundingDateError) errors.foundingDate = foundingDateError;
    }

    return errors;
  }
};

export default validationService;
