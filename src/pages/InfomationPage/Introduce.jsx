import React, { useState } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoCamera } from "react-icons/io5";
import { changeAvatar } from '../../services/userApi';
import ChangeAvatarModal from "./ChangeImageModal";

export default function Introduce() {
    const { user } = useAuthContext();
    const [modalVisible, setModalVisible] = useState(false);
    const avatar = user?.avatarUrl;
    const displayName = user?.userName;

    return (
        <div className="w-[30rem] p-6 bg-white shadow-md rounded-md">
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
                    <div className="bg-green-500 text-white text-xs py-1 px-2 rounded mb-1 self-start ">
                        EDUCATION
                    </div>

                    <p className="text-gray-700 text-sm">Chào bạn trở lại,</p>
                    <h3 className="text-lg font-bold text-green-600">{displayName}</h3>

                    <div className="mt-1">
                        <div className="bg-green-500 text-white text-xs py-1 px-2 rounded inline-block">
                            Tài khoản Education
                        </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-2">
                        Ngày hết hạn: <span className="font-semibold">không thời hạn</span>
                    </p>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="mt-6 pt-4 border-t">
                <h2 className="text-xl font-bold mb-4">Giới thiệu chung</h2>

                <p className="text-gray-700 text-sm mb-4">
                    Chào mừng bạn đến với nền tảng của chúng tôi. Đây là nơi bạn có thể chia sẻ thông tin về bản thân và kết nối với cộng đồng.
                </p>

                <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-700 mb-2">Chính sách bảo mật</h3>
                    <p className="text-gray-700 text-sm">
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Thông tin được cung cấp trên hồ sơ của bạn sẽ chỉ được
                        chia sẻ với các đơn vị tuyển dụng mà bạn chọn ứng tuyển. Bạn luôn có quyền kiểm soát và chỉnh sửa thông tin cá nhân
                        của mình bất cứ lúc nào.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-700 mb-2">Hướng dẫn sử dụng</h3>
                    <ul className="list-disc pl-5 text-gray-700 text-sm">
                        <li>Cập nhật thông tin hồ sơ đầy đủ để tăng cơ hội được tuyển dụng</li>
                        <li>Thay đổi mật khẩu định kỳ để bảo vệ tài khoản</li>
                        <li>Kiểm tra thông báo thường xuyên để không bỏ lỡ cơ hội việc làm</li>
                        <li>Tham gia các khóa học trực tuyến để nâng cao kỹ năng</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-2">Quyền lợi thành viên</h3>
                    <p className="text-gray-700 text-sm">
                        Với tài khoản Education, bạn được hưởng nhiều đặc quyền như: tiếp cận khóa học miễn phí,
                        ưu tiên xem xét hồ sơ, tham gia các sự kiện trực tuyến dành riêng cho thành viên.
                    </p>
                </div>
            </div>
            <ChangeAvatarModal visible={modalVisible} onClose={() => setModalVisible(false)} funcApi={changeAvatar}/>
        </div>
    );
}