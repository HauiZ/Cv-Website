import React from "react";

export default function CvSuggestion() {
  return (
    <div>
      <h2 className="text-green-600 font-semibold mb-2">Gợi ý viết CV</h2>
      <p className="text-gray-600 text-sm mb-2">
        Để xem gợi ý cho mục khác, vui lòng click vào mục tương ứng trong CV
      </p>
      <div className="text-sm text-gray-700 bg-white p-3 rounded-md border">
        <h3 className="font-semibold mb-1">Cách viết</h3>
        <p className="mb-2">
          CV cơ bản cần có thông tin cá nhân, kỹ năng, học vấn và kinh nghiệm
          làm việc. Lưu ý ghi rõ tên bạn vào tiêu đề khi bấm Lưu hoặc Tải CV về
          máy.
        </p>
        <h4 className="font-semibold mb-1">Một số lỗi sai thường gặp:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mục tiêu nghề nghiệp chung chung</li>
          <li>Thiếu thông tin kỹ năng</li>
          <li>Thiếu thông tin kinh nghiệm</li>
          <li>Kinh nghiệm làm việc chưa sắp xếp</li>
        </ul>
      </div>
    </div>
  );
}
