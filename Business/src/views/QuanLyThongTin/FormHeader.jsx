import React from 'react';

const FormHeader = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};

export default FormHeader;
