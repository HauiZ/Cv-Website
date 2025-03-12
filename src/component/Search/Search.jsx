import React from "react";
import { Select } from 'antd';
import { FaListUl } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { BiSolidShoppingBag } from "react-icons/bi";

const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const ListJob = () => (
    <Select
        defaultValue="Danh mục nghề"
        prefix={<FaListUl />}
        size="large"
        style={{
            width: 200,
        }}
        onChange={handleChange}
        options={[
            {
                label: <span>Công nghệ & Kỹ thuật</span>,
                title: 'Công nghệ & Kỹ thuật',
                options: [
                    {
                        value: 'Công nghệ thông tin',
                        label: <span>Công nghệ thông tin</span>,
                    },
                ]
            },
            {
                label: <span>Kinh doanh & Dịch vụ</span>,
                title: 'Kinh doanh & Dịch vụ',
                options: [
                    {
                        value: 'Kinh doanh/Bán hàng',
                        label: <span>Kinh doanh/Bán hàng</span>,
                    },
                    {
                        value: 'Chăm sóc khách hàng',
                        label: <span>Chăm sóc khách hàng</span>,
                    },
                    {
                        value: 'Marketing/Quảng cáo',
                        label: <span>Marketing/Quảng cáo</span>,
                    },
                ],
            },
            {
                label: <span>Tài chính & Quản lý</span>,
                title: 'Tài chính & Quản lý',
                options: [
                    {
                        value: 'Tài chính/Ngân hàng',
                        label: <span>Tài chính/Ngân hàng</span>,
                    },
                    {
                        value: 'Kế toán/Kiểm toán',
                        label: <span>Kế toán/Kiểm toán</span>,
                    },
                ],
            },
            {
                label: <span>Xây dựng & Bất động sản</span>,
                title: 'Xây dựng & Bất động sản',
                options: [
                    {
                        value: 'Bất động sản/Xây dựng',
                        label: <span>Bất động sản/Xây dựng</span>,
                    },
                ],
            },
        ]}
    />
);

const ListLocation = () => (
    <Select
        defaultValue="Địa điểm"
        prefix={<IoLocationSharp />}
        size="large"
        style={{
            width: 200,
        }}
        onChange={handleChange}
        options={[
            {
                label: <span>Miền Bắc</span>,
                title: 'Miền Bắc',
                options: [
                    {
                        value: 'bac_hanoi',
                        label: <span>Hà Nội</span>,
                    },
                    {
                        value: 'bac_haiphong',
                        label: <span>Hải Phòng</span>,
                    },
                    {
                        value: 'bac_quangninh',
                        label: <span>Quảng Ninh</span>,
                    },
                ]
            },
            {
                label: <span>Miền Trung</span>,
                title: 'Miền Trung',
                options: [
                    {
                        value: 'trung_danang',
                        label: <span>Đà Nẵng</span>,
                    },
                    {
                        value: 'trung_hue',
                        label: <span>Thừa Thiên Huế</span>,
                    },
                    {
                        value: 'trung_thanhhoa',
                        label: <span>Thanh Hóa</span>,
                    },
                ],
            },
            {
                label: <span>Miền Nam</span>,
                title: 'Miền Nam',
                options: [
                    {
                        value: 'nam_hcm',
                        label: <span>TP. Hồ Chí Minh</span>,
                    },
                    {
                        value: 'nam_binhduong',
                        label: <span>Bình Dương</span>,
                    },
                    {
                        value: 'nam_dongnai',
                        label: <span>Đồng Nai</span>,
                    },
                ],
            },
        ]}
    />
);

const Temp1 = () => (
    <Select
        showSearch
        prefix={<BsBox className="text-gray-500" />}
        style={{
            width: 200,
        }}
        placeholder="Lĩnh vực công ty"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
            {
                value: 'ai_robotics',
                label: 'Trí tuệ nhân tạo & Robotics',
            },
            {
                value: 'blockchain_crypto',
                label: 'Blockchain & Tiền mã hóa',
            },
            {
                value: 'green_energy',
                label: 'Năng lượng tái tạo',
            },
            {
                value: 'space_tech',
                label: 'Công nghệ vũ trụ',
            },
            {
                value: 'e_sports_gaming',
                label: 'Thể thao điện tử & Gaming',
            },
            {
                value: 'bio_tech',
                label: 'Công nghệ sinh học',
            },
            {
                value: 'metaverse_vr',
                label: 'Metaverse & Thực tế ảo',
            },
            {
                value: 'eco_sustainability',
                label: 'Phát triển bền vững & Môi trường',
            },
            {
                value: 'cybersecurity',
                label: 'An ninh mạng & Bảo mật dữ liệu',
            },
            {
                value: 'edtech',
                label: 'Công nghệ giáo dục',
            },
        ]}
    />
);

const Temp2 = () => (
    <Select
        showSearch
        prefix={<BiSolidShoppingBag className="text-gray-500" />}
        style={{
            width: 200,
        }}
        placeholder="Lĩnh vực công việc"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
            {
                value: 'ai_engineer',
                label: 'Kỹ sư Trí tuệ nhân tạo',
            },
            {
                value: 'blockchain_dev',
                label: 'Lập trình viên Blockchain',
            },
            {
                value: 'ux_researcher',
                label: 'Nhà nghiên cứu UX/UI',
            },
            {
                value: 'data_ethics_specialist',
                label: 'Chuyên gia đạo đức dữ liệu',
            },
            {
                value: 'growth_hacker',
                label: 'Chuyên gia Growth Hacking',
            },
            {
                value: 'iot_specialist',
                label: 'Chuyên gia Internet of Things (IoT)',
            },
            {
                value: 'cloud_security_analyst',
                label: 'Chuyên gia bảo mật đám mây',
            },
            {
                value: 'biotech_researcher',
                label: 'Nhà nghiên cứu Công nghệ sinh học',
            },
            {
                value: 'vr_game_designer',
                label: 'Nhà thiết kế game thực tế ảo',
            },
            {
                value: 'digital_twin_engineer',
                label: 'Kỹ sư Mô phỏng kỹ thuật số (Digital Twin)',
            },
        ]}
    />
);
const Sort = () => (
    <Select
        placeholder="Lương cao đến thấp"
        style={{
            flex: 1,
            width: 200,
        }}
        options={[
            {
                value: 'salary',
                label: 'Lương cao đến thấp',
            },
            {
                value: 'experience',
                label: 'Kinh nghiệm',
            },
            {
                value: 'date',
                label: 'Ngày đăng tuyển',
            },
            {
                value: 'date1',
                label: 'Hạn ứng tuyển',
            },
        ]}
    />
);

function Search() {
    return (
        <div className="w-[1100px] h-[60px] bg-white rounded-[100px] flex flex-row justify-center items-center gap-x-10">
            <div className="w-[200px] bg-white">  <ListJob /></div>
            <input type="text" placeholder="| Vị trí tuyển dụng & tên công ty" className="w-[330px] h-[50px]" />
            <div className="w-[250px] bg-white"> <ListLocation /> </div>
            <button className="w-[150px] h-[50px] px-4 py-2 ml-3 rounded-[20px] font-semibold items-center
            justify-between text-[white] bg-[#5DDA33] hover:bg-[white] hover:text-[#5DDA33]">Tìm kiếm</button>
        </div>
    )
};
export default Search;