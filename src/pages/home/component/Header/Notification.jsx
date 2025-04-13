import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Space, Switch } from 'antd';
import { IoNotifications } from "react-icons/io5";
const App = () => {
    const [count, setCount] = useState(5);
    const [show, setShow] = useState(true);
    const increase = () => {
        setCount(count + 1);
    };
    const decline = () => {
        let newCount = count - 1;
        if (newCount < 0) {
            newCount = 0;
        }
        setCount(newCount);
    };
    const random = () => {
        const newCount = Math.floor(Math.random() * 100);
        setCount(newCount);
    };
    const onChange = (checked) => {
        setShow(checked);
    };
    return (<button onClick={increase} className=' relative'>
        <Space direction="vertical" >
            <Space size="large" >
                <Badge count={count}>
                    <Avatar shape="circle" size="large" style={{backgroundColor: '#D9D9D9'}}/>
                </Badge>
            </Space>
        </Space>
        <IoNotifications className='z-10 absolute top-2 left-2 size-6 text-[#0C8E5E]'/>
    </button>

    );
};
export default App;