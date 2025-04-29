import React, { useState } from 'react';
import FormHeader from './FormHeader';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { useEmployer } from '../../service/EmlpoyerManagementServices/employer-context';

const ContactAndLogoSection = () => {
  const [uploadMethod, setUploadMethod] = useState('upload');

  const {
    formData,
    handleChange,
    handleFileUpload,
    errors,
    industries,
    isUploading
  } = useEmployer();

  return (
    <div className="form-section">
      <div className="mb-8">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-700">Logo công ty</h3>
          <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            {formData.logo ? (
              <img
                src={typeof formData.logo === 'string' ? formData.logo : URL.createObjectURL(formData.logo)}
                alt="Company logo"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div>
            <input
              type="file"
              id="logo"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload('logo', e.target.files[0]);
                }
              }}
              disabled={isUploading}
            />
            <label
              htmlFor="logo"
              className={`rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isUploading ? 'Đang tải...' : 'Tải ảnh lên'}
            </label>
          </div>
          {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
        </div>
      </div>

      <FormSelect
        id="industry"
        label="Lĩnh vực hoạt động"
        options={industries}
        value={formData.industry || ''}
        onChange={handleChange}
        error={errors.industry}
      />

      <div className="border-l-4 border-green-500 pl-3 mt-6 mb-4">
        <FormHeader title="Người liên hệ" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormInput
          id="contactName"
          label="Họ tên người liên hệ"
          value={formData.contactName || ''}
          onChange={handleChange}
          error={errors.contactName}
        />

        <FormInput
          id="contactPhone"
          label="Số điện thoại liên hệ"
          required
          value={formData.contactPhone || ''}
          onChange={handleChange}
          error={errors.contactPhone}
        />

        <FormInput
          id="contactEmail"
          label="Email liên hệ"
          type="email"
          value={formData.contactEmail || ''}
          onChange={handleChange}
          error={errors.contactEmail}
        />

        <FormInput
          id="contactAddress"
          label="Địa chỉ liên hệ"
          required
          value={formData.contactAddress || ''}
          onChange={handleChange}
          error={errors.contactAddress}
        />
      </div>

      <div className="mt-6">
        <FormInput
          id="status"
          label="Trạng thái đăng tin"
          value="active"
          disabled
          onChange={handleChange}
          error={errors.status}
        />

        <FormInput
          id="isPublic"
          label="Đăng tin trạng cá nhân Truyền thông nội bộ"
          value={formData.isPublic || ''}
          onChange={handleChange}
          error={errors.isPublic}
        />
      </div>

      <div className="mt-6">
        <label className="form-label">Video/Ảnh giới thiệu</label>
        <div className="mb-3 flex items-center">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="upload-option"
              name="upload-method"
              value="upload"
              checked={uploadMethod === 'upload'}
              onChange={() => setUploadMethod('upload')}
              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="upload-option" className="text-sm text-gray-700">
              Tệp tải lên
            </label>
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <input
              type="radio"
              id="link-option"
              name="upload-method"
              value="link"
              checked={uploadMethod === 'link'}
              onChange={() => setUploadMethod('link')}
              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="link-option" className="text-sm text-gray-700">
              Link liên kết
            </label>
          </div>
        </div>

        {uploadMethod === 'upload' ? (
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-1 text-sm text-gray-500">
                Tải ảnh hoặc video (Tổng dung lượng tối đa 20MB)
              </p>
              <div className="mt-3">
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileUpload('media', e.target.files[0]);
                    }
                  }}
                  disabled={isUploading}
                />
                <label
                  htmlFor="file-upload"
                  className={`rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isUploading ? 'Đang tải...' : 'Tải file'}
                </label>
              </div>
            </div>
          </div>
        ) : (
          <FormInput
            id="videoLink"
            placeholder="Nhập đường dẫn video..."
            value={formData.videoLink || ''}
            onChange={handleChange}
            error={errors.videoLink}
          />
        )}
      </div>
    </div>
  );
};

export default ContactAndLogoSection;
