import React from 'react';

const FormDatePicker = ({
  id,
  label,
  required = false,
  value,
  onChange,
  error,
  className = '',
}) => {
  const handleChange = (e) => {
    onChange(e);
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
      <div className="relative">
        <input
          id={id}
          name={id}
          type="date"
          value={value}
          onChange={handleChange}
          required={required}
          className="form-input"
          placeholder="mm/dd/yyyy"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormDatePicker;
