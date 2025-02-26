import React from 'react';
import { Cascader } from 'antd';
import { IoFilterSharp } from "react-icons/io5";
const options = [
    {
        value: 'location',
        label: 'Địa điểm',
        children: [
            {
                value: 'north',
                label: 'Miền Bắc',
            },
            {
                value: 'central',
                label: 'Miền Trung',
            },
            {
                value: 'southern',
                label: 'Miền Nam',
            },
        ],
    },
    {
        value: 'salary',
        label: 'Mức lương',
        children: [
            {
                value: '0-5',
                label: '0-5 triệu',
            },
            {
                value: '5-10',
                label: '5-10 triệu',
            },
            {
                value: '10up',
                label: '10 triệu trở lên',
            },
        ],
    },
    {
        value: 'experiene',
        label: 'Kinh nghiệm',
        children: [
            {
                value: '0-1',
                label: '0-1 năm',
            },
            {
                value: '1-3',
                label: '1-3 năm',
            },
            {
                value: '3-5',
                label: '3-5 năm',
            },
            {
                value: '5up',
                label: '5 năm trở lên',
            },
        ],
    },
];
const onChange = (value) => {
    console.log(value);
};
const Filter = () => {
    return <div className='flex'>
        <IoFilterSharp className='size-7 text-[#D9D9D9] pr-1'/> <Cascader options={options} onChange={onChange} placeholder="Lọc theo"
            style={{
                width: '300px',
            }} />
    </div>

};
export default Filter;