import React, { useState } from 'react';
import { useAuthContext } from "../../../contexts/AuthContext";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoCamera } from "react-icons/io5";
import ChangeImageModal from "../ChangeImageModal";
import { changeLogo } from "../../../services/recruiterApi";

export default function IntroduceBusiness() {
    const { user } = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);
    const avatar = user?.logoUrl;
    const displayName = user?.businessName;

    return (
        <div className="w-auto p-6 bg-white shadow-md rounded-md">
            {/* Profile Header Section */}
            <div className="flex items-start gap-4">
                {/* Avatar Section */}
                <div className="relative">
                    <div className="bg-gray-200 rounded-full overflow-hidden">
                        <Avatar size={90} src={avatar} icon={!avatar && <UserOutlined />} />
                    </div>
                    <button
                        className="absolute bottom-0 left-0 bg-green-500 text-white p-1 rounded-full shadow-md hover:bg-green-600 transition"
                        onClick={() => setModalVisible(true)}
                    >
                        <IoCamera size={16} />
                    </button>
                </div>

                {/* Text section */}
                <div className="flex flex-col">
                    <div className="bg-[#212F3F] text-white text-xs py-1 px-2 rounded mb-1 self-start ">
                        BUSINESS
                    </div>

                    <p className="text-gray-700 text-sm">Chào bạn trở lại,</p>
                    <h3 className="text-lg font-bold text-[#212F3F]">{displayName}</h3>

                    <div className="mt-1">
                        <div className="bg-[#212F3F] text-white text-xs py-1 px-2 rounded inline-block">
                            Tài khoản BUSINESS
                        </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-2">
                        Ngày hết hạn: <span className="font-semibold">không thời hạn</span>
                    </p>
                </div>
            </div>

            {/* Introduction Section for Recruiters */}
            <div className="mt-6 pt-4 border-t">
                <h2 className="text-xl font-bold mb-4">Giới thiệu dành cho Nhà tuyển dụng</h2>

                <p className="text-gray-700 text-sm mb-4">
                    Chào mừng bạn đến với nền tảng tuyển dụng thông minh của chúng tôi – nơi giúp doanh nghiệp kết nối nhanh chóng với các ứng viên tiềm năng và phù hợp.
                </p>

                <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-700 mb-2">Chính sách bảo mật</h3>
                    <p className="text-gray-700 text-sm">
                        Chúng tôi cam kết bảo mật tuyệt đối thông tin của cả nhà tuyển dụng và ứng viên. Dữ liệu hồ sơ chỉ được truy cập khi có sự đồng thuận từ hai phía,
                        đảm bảo quá trình tuyển dụng minh bạch và đáng tin cậy.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-700 mb-2">Hướng dẫn sử dụng</h3>
                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                        <li>Tạo và xác minh tài khoản nhà tuyển dụng để bắt đầu đăng tin tuyển dụng</li>
                        <li>Sử dụng bộ lọc nâng cao để tìm kiếm ứng viên theo kỹ năng, vị trí, kinh nghiệm</li>
                        <li>Gửi lời mời phỏng vấn hoặc đánh dấu ứng viên tiềm năng chỉ với một cú nhấp chuột</li>
                        <li>Quản lý và theo dõi tiến trình tuyển dụng dễ dàng qua dashboard riêng</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-2">Quyền lợi của Nhà tuyển dụng</h3>
                    <p className="text-gray-700 text-sm">
                        Với tài khoản Doanh nghiệp, bạn được tiếp cận hàng nghìn hồ sơ chất lượng,
                        đăng tin tuyển dụng không giới hạn, ưu tiên hiển thị trong kết quả tìm kiếm,
                        và nhận hỗ trợ trực tiếp từ đội ngũ chăm sóc khách hàng của chúng tôi.
                    </p>
                </div>
            </div>

            <ChangeImageModal visible={modalVisible} onClose={() => setModalVisible(false)} funcApi={changeLogo} />
        </div>
    );
}