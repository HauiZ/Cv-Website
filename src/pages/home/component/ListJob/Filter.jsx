import React from 'react';
import { Cascader } from 'antd';
import { IoFilterSharp } from "react-icons/io5";

const options = [
  {
    value: 'location',
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
      { value: '0-1', label: '0-1 năm' },
      { value: '1-3', label: '1-3 năm' },
      { value: '3-5', label: '3-5 năm' },
      { value: '5up', label: '5 năm trở lên' },
    ],
  },
];

const Filter = ({ onFilterChange }) => {
  const handleChange = (value) => {
    if (onFilterChange) {
      onFilterChange(value);
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
      />
    </div>
  );
};

export default Filter;
