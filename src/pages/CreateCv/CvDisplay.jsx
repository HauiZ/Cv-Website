import React, { useState, useRef } from "react";
import FileUploader from "./FileUploader";


export default function CvDisplay({ formData, setFormData, primaryColor = "#007F00" }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (avatarData) => {
    setFormData((prev) => ({ ...prev, avatar: avatarData }));
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded">
        {/* Header with profile image placeholder */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start">
            <div className="mr-6 flex flex-col items-center">
              {/* Avatar */}
              <div className="w-36 h-36 rounded-full overflow-hidden">
                <FileUploader 
                  onFileUploaded={handleAvatarChange} 
                  currentAvatar={formData.avatar} 
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Nhấp hoặc kéo thả ảnh</p>
            </div>
            <div className="flex-1">
              <textarea
                name="fullName"
                placeholder="Họ và tên"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border border-dashed border-red-300 rounded mb-2 text-xl font-bold"
                rows={1}
                style={{ borderColor: primaryColor }}
              />
              <textarea
                name="jobTitle"
                placeholder="Vị trí ứng tuyển"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border-b border-black mb-2"
                rows={1}
              ></textarea>
              <textarea
                name="motto"
                placeholder="Châm ngôn nghề nghiệp của bạn. Bạn giỏi nhất điều gì và có thể làm"
                value={formData.motto}
                onChange={handleChange}
                className="w-full p-2 text-gray-600 italic"
                rows={1}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div>
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{
                  color: primaryColor,
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 2,
                }}
              >
                THÔNG TIN CÁ NHÂN
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div
                    className="w-6 h-6 flex-shrink-0 text-white flex items-center justify-center rounded-full mt-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-xs">@</span>
                  </div>
                  <textarea
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300"
                    rows={1}
                  ></textarea>
                </div>
                <div className="flex items-start">
                  <div
                    className="w-6 h-6 flex-shrink-0 text-white flex items-center justify-center rounded-full mt-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-xs">☎</span>
                  </div>
                  <textarea
                    name="phone"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300"
                    rows={1}
                  ></textarea>
                </div>
                <div className="flex items-start">
                  <div
                    className="w-6 h-6 flex-shrink-0 text-white flex items-center justify-center rounded-full mt-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-xs">🌐</span>
                  </div>
                  <textarea
                    name="website"
                    placeholder="Website / Facebook"
                    value={formData.website}
                    onChange={handleChange}
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300"
                    rows={1}
                  ></textarea>
                </div>
                <div className="flex items-start">
                  <div
                    className="w-6 h-6 flex-shrink-0 text-white flex items-center justify-center rounded-full mt-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-xs">📍</span>
                  </div>
                  <textarea
                    name="address"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleChange}
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300"
                    rows={1}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                HỌC VẤN
              </div>
              <div className="space-y-3">
                <textarea
                  name="education"
                  placeholder="Tên trường"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-1 border border-dashed border-red-300"
                  rows={1}
                ></textarea>
                <textarea
                  name="major"
                  placeholder="Ngành học / Môn học"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full p-1 border border-dashed border-red-300"
                  rows={1}
                ></textarea>
                <textarea
                  name="educationDetails"
                  placeholder="Mô tả thành tích học tập hoặc thành tích nổi bật"
                  value={formData.educationDetails}
                  onChange={handleChange}
                  className="w-full p-1"
                  rows={2}
                ></textarea>
              </div>
            </div>

            {/* Skills */}
            <div>
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                CÁC KỸ NĂNG
              </div>
              <div className="space-y-3">
                <textarea
                  name="skills"
                  placeholder="Mô tả kỹ năng"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full p-1"
                  rows={6}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Experience */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                KINH NGHIỆM LÀM VIỆC
              </div>
              <div className="flex">
                <div className="mr-2 flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <div
                    className="w-0.5 h-16 mx-auto"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                </div>
                <div className="flex-1">
                  <textarea
                    name="experience"
                    placeholder="Bắt đầu — Kết thúc"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-1"
                    rows={1}
                  ></textarea>
                  <textarea
                    name="company"
                    placeholder="Tên công ty"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-1"
                    rows={1}
                  ></textarea>
                  <textarea
                    name="experienceDetails"
                    placeholder="Mô tả kinh nghiệm làm việc cụ thể"
                    value={formData.experienceDetails}
                    onChange={handleChange}
                    className="w-full p-1"
                    rows={2}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                CHỨNG CHỈ
              </div>
              <textarea
                name="certificates"
                placeholder="Các chứng chỉ"
                value={formData.certificates}
                onChange={handleChange}
                className="w-full p-1"
                rows={6}
              ></textarea>
            </div>

            {/* Activities */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                HOẠT ĐỘNG
              </div>
              <div className="flex">
                <div className="mr-2 flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <div
                    className="w-0.5 h-16 mx-auto"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                </div>
                <div className="flex-1">
                  <textarea
                    name="activities"
                    placeholder="Bắt đầu — Kết thúc"
                    value={formData.activities}
                    onChange={handleChange}
                    className="w-full p-1"
                    rows={1}
                  ></textarea>
                  <textarea
                    name="activityDetails"
                    placeholder="Tên dự án"
                    value={formData.activityDetails}
                    onChange={handleChange}
                    className="w-full p-1"
                    rows={1}
                  ></textarea>
                  <textarea
                    name="activityDesc"
                    placeholder="Mô tả hoạt động"
                    value={formData.activityDesc}
                    onChange={handleChange}
                    className="w-full p-1"
                    rows={2}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Third row */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Awards */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                DANH HIỆU VÀ GIẢI THƯỞNG
              </div>
              <textarea
                name="awards"
                placeholder="Các giải thưởng"
                value={formData.awards}
                onChange={handleChange}
                className="w-full p-1"
                rows={3}
              ></textarea>
            </div>

            {/* Hobbies */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                SỞ THÍCH
              </div>
              <textarea
                name="hobbies"
                placeholder="Sở thích cá nhân của bạn"
                value={formData.hobbies}
                onChange={handleChange}
                className="w-full p-1"
                rows={3}
              ></textarea>
            </div>

            {/* References */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4"
                style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
              >
                NGƯỜI GIỚI THIỆU
              </div>
              <textarea
                name="reference"
                placeholder="Thông tin người giới thiệu"
                value={formData.reference}
                onChange={handleChange}
                className="w-full p-1"
                rows={3}
              ></textarea>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <div
              className="uppercase font-bold text-sm pb-1 mb-4"
              style={{ color: primaryColor, borderBottomColor: primaryColor, borderBottomWidth: 2 }}
            >
              THÔNG TIN THÊM
            </div>
            <textarea
              name="additionalInfo"
              placeholder="Các thông tin bổ sung"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full p-1"
              rows={3}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}