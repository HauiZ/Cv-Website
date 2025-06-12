import React, { useState, useRef } from "react";
import FileUploader from "./FileUploader";

export default function CvDisplay({ formData, setFormData, primaryColor = "#007F00" }) {
  // tự động cắt chuỗi dài liên tục (không có khoảng trắng)
  function breakLongWords(text, maxLength = 28) {
    return text.replace(new RegExp(`(\\S{${maxLength}})(?=\\S)`, 'g'), '$1 ');
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Chỉ break những từ quá dài, không làm gián đoạn việc gõ bình thường
    let processedValue = breakLongWords(value)
    switch (name) {
      case 'email':
      case 'phone':
      case 'website':
      case 'address':
        processedValue = breakLongWords(value, 24);
        break;
      case 'fullName':
        processedValue = breakLongWords(value, 50);
        break;
      case 'jobTitle':
      case 'motto':
        processedValue = breakLongWords(value, 70);
        break;
      case 'activities':
        processedValue = breakLongWords(value, 26);
        break;
      case 'additionalInfo':
      case 'experience':
        processedValue = breakLongWords(value, 90);
        break;
      default:
        processedValue = breakLongWords(value);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  // Xử lý thay đổi cho kinh nghiệm
  const handleExperienceChange = (index, field, value) => {
    const experiences = formData.experiences || [{ period: '', company: '', details: '' }];
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setFormData((prev) => ({ ...prev, experiences: updatedExperiences }));
  };

  // Thêm kinh nghiệm mới
  const addExperience = () => {
    const experiences = formData.experiences || [];
    setFormData((prev) => ({ 
      ...prev, 
      experiences: [...experiences, { period: '', company: '', details: '' }] 
    }));
  };

  // Xóa kinh nghiệm
  const removeExperience = (index) => {
    const experiences = formData.experiences || [];
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, experiences: updatedExperiences }));
  };

  // Xử lý thay đổi cho hoạt động
  const handleActivityChange = (index, field, value) => {
    const activities = formData.activities || [{ period: '', project: '', description: '' }];
    const updatedActivities = [...activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setFormData((prev) => ({ ...prev, activities: updatedActivities }));
  };

  // Thêm hoạt động mới
  const addActivity = () => {
    const activities = formData.activities || [];
    setFormData((prev) => ({ 
      ...prev, 
      activities: [...activities, { period: '', project: '', description: '' }] 
    }));
  };

  // Xóa hoạt động
  const removeActivity = (index) => {
    const activities = formData.activities || [];
    const updatedActivities = activities.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, activities: updatedActivities }));
  };

  const handleAvatarChange = (avatarData) => {
    setFormData((prev) => ({ ...prev, avatar: avatarData }));
  };

  // Khởi tạo mảng nếu chưa có
  const experiences = formData.experiences || [{ period: '', company: '', details: '' }];
  const activities = formData.activities || [{ period: '', project: '', description: '' }];

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
                className="w-full p-2 border border-dashed border-red-300 rounded mb-2 text-xl font-bold resize-none overflow-hidden whitespace-pre-wrap break-words"
                rows={1}
                style={{ borderColor: primaryColor }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
              <textarea
                name="jobTitle"
                placeholder="Vị trí ứng tuyển"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border-b border-black mb-2 resize-none overflow-hidden whitespace-pre-wrap break-words"
                rows={1}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
              <textarea
                name="motto"
                placeholder="Châm ngôn nghề nghiệp của bạn. Bạn giỏi nhất điều gì và có thể làm"
                value={formData.motto}
                onChange={handleChange}
                className="w-full p-2 text-gray-600 italic resize-none overflow-hidden whitespace-pre-wrap break-words"
                rows={2}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
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
                className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
                style={{
                  color: 'black',
                  borderBottomColor: primaryColor,
                  borderBottomWidth: 2,
                  borderTopColor: primaryColor,
                  borderTopWidth: 2
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
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300 resize-none overflow-hidden whitespace-pre-wrap break-words"
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
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
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300 resize-none overflow-hidden whitespace-pre-wrap break-words"
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
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
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300 resize-none overflow-hidden whitespace-pre-wrap break-words"
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
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
                    className="flex-1 p-1 ml-2 border border-dashed border-red-300 resize-none overflow-hidden whitespace-pre-wrap break-words"
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div
                className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
                style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
              >
                HỌC VẤN
              </div>
              <div className="space-y-3">
                <textarea
                  name="education"
                  placeholder="Tên trường"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-1 border border-dashed border-red-300 resize-none overflow-hidden whitespace-pre-wrap break-words"
                  rows={1}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <textarea
                  name="major"
                  placeholder="Ngành học / Môn học"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full p-1 border border-dashed border-red-300 resize-none overflow-hidden whitespace-pre-wrap break-words"
                  rows={1}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <textarea
                  name="educationDetails"
                  placeholder="Mô tả thành tích học tập hoặc thành tích nổi bật"
                  value={formData.educationDetails}
                  onChange={handleChange}
                  className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                  rows={2}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <div
                className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
                style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
              >
                CÁC KỸ NĂNG
              </div>
              <div className="space-y-3">
                <textarea
                  name="skills"
                  placeholder="Mô tả kỹ năng"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                  rows={6}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="uppercase font-bold text-sm pb-1 pt-1 flex justify-between w-full"
                  style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
                >
                  KINH NGHIỆM LÀM VIỆC
                  <button
                  onClick={addExperience}
                  className="text-white px-3 py-1 rounded text-sm hover:opacity-80"
                  style={{ backgroundColor: primaryColor }}
                >
                  +
                </button>
                </div>
              </div>
              
              {experiences.map((exp, index) => (
                <div key={index} className="flex mb-4">
                  <div className="mr-2 flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    {index < experiences.length && (
                      <div
                        className="w-0.5 h-16 mx-auto"
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1 gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 flex flex-col gap-1">
                        <textarea
                          placeholder="Bắt đầu — Kết thúc"
                          value={exp.period || ''}
                          onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                          className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                          rows={1}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                        <textarea
                          placeholder="Tên công ty"
                          value={exp.company || ''}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                          rows={1}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                        <textarea
                          placeholder="Mô tả kinh nghiệm làm việc cụ thể"
                          value={exp.details || ''}
                          onChange={(e) => handleExperienceChange(index, 'details', e.target.value)}
                          className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                          rows={2}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                      </div>
                      {experiences.length > 1 && (
                        <button
                          onClick={() => removeExperience(index)}
                          className="ml-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Activities */}
            <div className="md:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="uppercase font-bold text-sm pb-1 pt-1 flex justify-between w-full"
                  style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
                >
                  HOẠT ĐỘNG
                  <button
                  onClick={addActivity}
                  className="text-white px-3 py-1 rounded text-sm hover:opacity-80"
                  style={{ backgroundColor: primaryColor }}
                >
                  +
                </button>
                </div>
              </div>
              
              {activities.map((activity, index) => (
                <div key={index} className="flex mb-4">
                  <div className="mr-2 flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    {index < activities.length  && (
                      <div
                        className="w-0.5 h-16 mx-auto"
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <textarea
                          placeholder="Bắt đầu — Kết thúc"
                          value={activity.period || ''}
                          onChange={(e) => handleActivityChange(index, 'period', e.target.value)}
                          className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                          rows={1}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                        <textarea
                          placeholder="Tên dự án"
                          value={activity.project || ''}
                          onChange={(e) => handleActivityChange(index, 'project', e.target.value)}
                          className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                          rows={1}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                        <textarea
                          placeholder="Mô tả hoạt động"
                          value={activity.description || ''}
                          onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                          className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                          rows={2}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                        />
                      </div>
                      {activities.length > 1 && (
                        <button
                          onClick={() => removeActivity(index)}
                          className="ml-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
                style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
              >
                CHỨNG CHỈ
              </div>
              <textarea
                name="certificates"
                placeholder="Các chứng chỉ"
                value={formData.certificates}
                onChange={handleChange}
                className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                rows={6}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
          </div>

          {/* Third row */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Awards */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
                style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
              >
                DANH HIỆU VÀ GIẢI THƯỞNG
              </div>
              <textarea
                name="awards"
                placeholder="Các giải thưởng"
                value={formData.awards}
                onChange={handleChange}
                className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                rows={3}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>

            {/* Hobbies */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
                style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
              >
                SỞ THÍCH
              </div>
              <textarea
                name="hobbies"
                placeholder="Sở thích cá nhân của bạn"
                value={formData.hobbies}
                onChange={handleChange}
                className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                rows={3}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>

            {/* References */}
            <div className="md:col-span-1">
              <div
                className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
                style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
              >
                NGƯỜI GIỚI THIỆU
              </div>
              <textarea
                name="reference"
                placeholder="Thông tin người giới thiệu"
                value={formData.reference}
                onChange={handleChange}
                className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
                rows={3}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <div
              className="uppercase font-bold text-sm pb-1 mb-4 pt-1"
              style={{ color: 'black', borderBottomColor: primaryColor, borderBottomWidth: 2 , borderTopColor: primaryColor, borderTopWidth: 2}}
            >
              THÔNG TIN THÊM
            </div>
            <textarea
              name="additionalInfo"
              placeholder="Các thông tin bổ sung"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full p-1 resize-none overflow-hidden whitespace-pre-wrap break-words"
              rows={3}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}