import React, { useState } from 'react';

const FormFileUpload = ({
  id,
  label,
  accept,
  required = false,
  onChange,
  error,
  isVerified = false,
  isLoading = false,
  className = '',
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(e);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`form-label ${required ? 'required-field' : ''}`}
        >
          {label}
        </label>
      )}
      <div className="flex items-center">
        <label className={`flex w-full cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm ${isLoading ? 'opacity-50' : ''}`}>
          <span className="mr-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </span>
          <span className="text-sm text-gray-500 truncate">
            {fileName || 'Chọn hoặc kéo file vào đây'}
          </span>
          <input
            id={id}
            name={id}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            required={required}
            disabled={isLoading}
            className="hidden"
          />
        </label>

        {isLoading && (
          <div className="ml-3 flex items-center text-sm text-gray-600">
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-1">Đang tải...</span>
          </div>
        )}

        {isVerified && !isLoading && (
          <div className="ml-3 flex items-center text-sm text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="ml-1">Đã xác thực</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormFileUpload;
