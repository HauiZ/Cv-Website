import React from "react";
import Section from "./Section";

export default function CVDisplay() {
  return (
    <div className="">
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mr-6" />
          <div className="flex-1">
            <input
              className="text-xl font-semibold w-full mb-2 border-b border-gray-300 focus:outline-none"
              placeholder="Vị trí ứng tuyển"
            />
            <textarea
              className="w-full text-sm text-gray-700 border border-gray-200 rounded-md p-2 resize-none"
              placeholder="Mục tiêu nghề nghiệp"
            />
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-4">
            <Section title="Thông tin cá nhân" lines={3} />
            <Section title="Kinh nghiệm làm việc" lines={3} />
            <Section title="Chứng chỉ" lines={2} />
            <Section title="Danh hiệu và giải thưởng" lines={2} />
            <Section title="Thông tin thêm" lines={2} />
          </div>

          <div className="space-y-4">
            <Section title="Học vấn" lines={2} />
            <Section title="Hoạt động" lines={2} />
            <Section title="Sở thích" lines={2} />
          </div>

          <div className="space-y-4">
            <Section title="Các kỹ năng" lines={2} />
            <Section title="Người giới thiệu" lines={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
