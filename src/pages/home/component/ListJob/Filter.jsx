import React from 'react';
import { Cascader } from 'antd';
import { IoFilterSharp } from "react-icons/io5";

const options = [
  {
    value: 'area',
    label: 'Địa điểm',
    children: [
      { value: 'north', label: 'Miền Bắc' },
      { value: 'central', label: 'Miền Trung' },
      { value: 'southern', label: 'Miền Nam' },
    ],
  },
  {
    value: 'salary',
    label: 'Mức lương',
    children: [
      { value: '0-5', label: '0-5 triệu' },
      { value: '5-10', label: '5-10 triệu' },
      { value: '10up', label: '10 triệu trở lên' },
    ],
  },
  {
    value: 'experience',
    label: 'Kinh nghiệm',
    children: [
      { value: '0-1 năm', label: '0-1 năm' },
      { value: '1-3 năm', label: '1-3 năm' },
      { value: '3-5 năm', label: '3-5 năm' },
      { value: 'Trên 5 năm', label: '5 năm trở lên' },
    ],
  },
];

const Filter = ({ onFilterChange }) => {
  const handleChange = (value) => {
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  // Add this function to handle the clear event
  const handleClear = () => {
    if (onFilterChange) {
      onFilterChange(null); // Pass null to indicate filter has been cleared
    }
  };

  return (
    <div className="w-[300px]">
      <Cascader
        options={options}
        onChange={handleChange}
        placeholder="Lọc theo"
        prefix={<IoFilterSharp className="text-[#D9D9D9] pr-1" />}
        className="w-full"
        allowClear={true} // Make sure this is set to true
        onClear={handleClear} // Add the onClear handler
      />
    </div>
  );
};

export default Filter;