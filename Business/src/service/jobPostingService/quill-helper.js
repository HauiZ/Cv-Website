/**
 * Helper functions for ReactQuill rich text editor
 */

/**
 * Formats for Quill editor
 */
export const QUILL_FORMATS = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'link', 'image',
  'color', 'background',
  'align',
  'clean'
];

/**
 * Default Quill editor modules configuration
 */
export const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean']
  ],
  clipboard: {
    // Toggle to add custom semantic sanitizing logic
    matchVisual: false
  },
  history: {
    delay: 1000,
    maxStack: 50,
    userOnly: true
  }
};

/**
 * Custom image upload handler for Quill
 * @param {File} file - The image file
 * @returns {Promise<string>} - URL of the uploaded image
 */
export const quillImageUploadHandler = async (file) => {
  try {
    // In production, upload to your server or a cloud storage service
    // For demo purposes, we'll create an object URL
    const url = URL.createObjectURL(file);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return url;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
};

/**
 * Convert Quill Delta to plain text
 * @param {Object} delta - Quill Delta object
 * @returns {string} - Plain text
 */
export const deltaToPlainText = (delta) => {
  if (!delta || !delta.ops) {
    return '';
  }

  return delta.ops
    .map(op => typeof op.insert === 'string' ? op.insert : '')
    .join('')
    .trim();
};

/**
 * Check if Quill content is empty
 * @param {string} html - HTML content from Quill
 * @returns {boolean} - True if empty
 */
export const isQuillEmpty = (html) => {
  if (!html) return true;

  // Remove <p><br></p> which Quill adds by default
  const normalized = html.replace(/<p><br><\/p>/g, '').trim();

  // Check if there's any content left
  return normalized === '' || normalized === '<p></p>';
};

/**
 * Get word count from Quill content
 * @param {string} html - HTML content from Quill
 * @returns {number} - Word count
 */
export const getWordCount = (html) => {
  if (!html) return 0;

  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, ' ');

  // Count words (non-whitespace sequences)
  const words = text.trim().split(/\s+/).filter(word => word !== '');

  return words.length;
};

/**
 * Sanitize Quill HTML content
 * @param {string} html - HTML content from Quill
 * @returns {string} - Sanitized HTML
 */
export const sanitizeQuillHtml = (html) => {
  if (!html) return '';

  // Simple sanitization (more comprehensive libraries like DOMPurify should be used in production)
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframes
    .replace(/on\w+="[^"]*"/g, ''); // Remove event handlers
};

export default {
  QUILL_FORMATS,
  QUILL_MODULES,
  quillImageUploadHandler,
  deltaToPlainText,
  isQuillEmpty,
  getWordCount,
  sanitizeQuillHtml
};
