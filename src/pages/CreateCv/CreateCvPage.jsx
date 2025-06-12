import React, { useState } from "react";
import FunctionTopBar from "./FunctionTopBar";
import FunctionLeftBar from "./FunctionLeftBar";
import CvDisplay from "./CvDisplay";

export default function CreateCvPage() {
  const [formData, setFormData] = useState({
    fullName: "Nguyễn Văn A",
    jobTitle: "Nhân viên tư vấn",
    motto: "02 năm kinh nghiệm tư vấn sản phẩm và khoá học tại các trung tâm tiếng Anh và cửa hàng công nghệ. Có thế mạnh trong việc tìm kiếm khách hàng mới, cung cấp thông tin và thuyết phục khách hàng. Là người nhanh nhạy, chịu áp lực tốt và thích làm việc trong môi trường áp lực cao. Hiện đang tìm kiếm công việc tư vấn khách hàng để giúp công ty tăng doanh thu và có thêm nhiều khách hàng mới.",
    email: "tencuaban@example.com",
    phone: "0123456789",
    website: "be.net/tencuaban",
    address: "Quận X, Thành phố Y",
    education: "Đại học TopCV (2016 - 2020)",
    major: "Quản trị kinh doanh",
    educationDetails: "Tốt nghiêp loại giỏi",
    skills: `Tìm kiếm thông tin
Chăm sóc khách hàng
Tư vấn thông tin sản phẩm
Tìm kiếm khách hàng tiềm năng
Giao tiếp, thuyết trình, đàm phán tốt`,
    certificates: `2022
Chương trình đào tạo: Kỹ Năng Bán Hàng Qua Điện Thoại`,

    experiences: [
      {
        period: "08/2020 - 08/2022",
        company: "Công ty ABC TopCV",
        details: `Tổng Đài Viên Chăm Sóc Khách Hàng

Tiếp nhận lắng nghe nhu cầu của 100 khách hàng mỗi ngày
Giới thiệu sản phẩm phù hợp đến với sở thích, nhu cầu của khách. Nêu rõ tính năng, lợi ích của sản phẩm và so sánh với sản phẩm cùng loại của hãng hàng khác để thấy được sự khác biệt.
Giới thiệu các chương trình khuyến mãi, ưu đãi riêng biệt dành cho khách để thúc đẩy nhu cầu mua hàng cao hơn. Đạt thành tích vượt 150% KPI được giao.
Thu thập những thông tin cần thiết dữ lượng data 5000 khách hàng tiềm năng để quảng bá sản phẩm, chăm sóc khách hàng.
Phối hợp với các phòng ban khác lập phương án tăng doanh thu. Doanh thu công ty tăng 200% trong 1 năm.`
      }
    ],

    activities: [
      {
        period: "06/2016 - 09/2020",
        project: "Câu lạc bộ Sự kiện, trường Đại học A Ban Sự Kiện",
        description: `Xây dựng 5 sự kiện chào đón tân sinh viên với 5000 sinh viên tham gia.
Hỗ trợ 500 tân sinh viên mỗi năm làm hồ sơ, tìm hiểu về nhà trường.
Giao tiếp và hỗ trợ thông tin cho phụ huynh.`
      }
    ],

    hobbies: "Teambuilding, tham gia các câu lạc bộ, ca hát, văn nghệ, chơi thể thao.",
    awards: `2020
Tư vấn viên xuất sắc nhất Quý 3/2020

2019
Giải nhất Cuộc thi Văn Nghệ X`,
    reference: `Ông Nguyễn Văn A
CEO công ty A
Email: abc@gmail.com
Điện thoại: 0123 456 789

Bà Lê Thị B
Trưởng phòng nhân sự công ty B
Email: xyz@gmail.com
Điện thoại: 0123 456 789`,
    additionalInfo: "(Điền các thông tin khác nếu có)."
  });
  const [primaryColor, setPrimaryColor] = useState("#007F00"); // Default color
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <FunctionTopBar formData={formData} setFormData={setFormData} color={primaryColor} setPrimaryColor={setPrimaryColor} />
      <div className="flex justify-between px-10 ">
        <div className="flex mt-14">
          <FunctionLeftBar onColorChange={setPrimaryColor} />
        </div>
        <div className="w-[54rem] h-fit">
          <CvDisplay
            formData={formData}
            setFormData={setFormData}
            primaryColor={primaryColor}
          />
        </div>
      </div>
    </div>
  );
}
