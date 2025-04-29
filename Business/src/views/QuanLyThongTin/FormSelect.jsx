import React from 'react';

const FormSelect = ({
  id,
  label,
  options = [],
  required = false,
  value,
  onChange,
  error,
  className = '',
}) => {
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
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="form-select"
      >
        <option value="">Chọn...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormSelect;
