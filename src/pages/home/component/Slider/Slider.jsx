import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
    height: '240px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const Slider = () => (
    <Carousel
        autoplay={{
            dotDuration: true,
        }}
        autoplaySpeed={4000}
    >
        <div>
            <img src="/src/assets/image/tuyendung1.png" alt="" style={contentStyle} className="size-300 rounded-2xl"/>
        </div>
        <div>
            <img src="/src/assets/image/tuyendung2.png" alt="" style={contentStyle} className="size-300 rounded-2xl"/>
        </div>
        <div>
            <img src="/src/assets/image/tuyendung3.png" alt="" style={contentStyle} className="size-300 rounded-2xl"/>
        </div>
        <div>
            <img src="/src/assets/image/tuyendung4.png" alt="" style={contentStyle} className="size-300 rounded-2xl"/>
        </div>
    </Carousel>
);
export default Slider;