import React from 'react';
import FormHeader from './FormHeader';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormFileUpload from './FormFileUpload';
import FormDatePicker from './FormDatePicker';
import { useEmployer } from '../../service/EmlpoyerManagementServices/employer-context';

const CompanyInfoSection = () => {
  const {
    formData,
    handleChange,
    handleFileUpload,
    errors,
    industries,
    provinces,
    districts,
    isUploading
  } = useEmployer();

  return (
    <div className="form-section mb-6">
      <div className="border-l-4 border-green-500 pl-3 mb-4">
        <FormHeader title="Thông tin nhà tuyển dụng" />
      </div>

      <div className="mb-4">
        <FormInput
          id="companyName"
          label="Tên công ty"
          required
          value={formData.companyName || ''}
          onChange={handleChange}
          error={errors.companyName}
        />

        <FormInput
          id="directorName"
          label="Giám đốc"
          required
          value={formData.directorName || ''}
          onChange={handleChange}
          error={errors.directorName}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormFileUpload
            id="businessLicense"
            label="Giấy phép kinh doanh / Giấy ủy quyền / Thẻ nhân viên"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload('businessLicense', e.target.files[0]);
              }
            }}
            isVerified={formData.isBusinessLicenseVerified}
            isLoading={isUploading}
            error={errors.businessLicense}
          />

          <FormSelect
            id="companyScale"
            label="Quy mô công ty"
            options={[
              { value: 'below_10', label: 'Dưới 10 người' },
              { value: '10_to_24', label: '10-24 người' },
              { value: '25_to_99', label: '25-99 người' },
              { value: '100_to_499', label: '100-499 người' },
              { value: '500_to_999', label: '500-999 người' },
              { value: '1000_to_4999', label: '1000-4999 người' },
              { value: 'above_5000', label: 'Trên 5000 người' },
            ]}
            value={formData.companyScale || ''}
            onChange={handleChange}
            error={errors.companyScale}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            id="taxCode"
            label="Mã số thuế"
            value={formData.taxCode || ''}
            onChange={handleChange}
            error={errors.taxCode}
          />

          <FormDatePicker
            id="foundingDate"
            label="Ngày thành lập"
            value={formData.foundingDate || ''}
            onChange={handleChange}
            error={errors.foundingDate}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            id="website"
            label="Website"
            value={formData.website || ''}
            onChange={handleChange}
            error={errors.website}
          />

          <FormInput
            id="zalo"
            label="Zalo"
            value={formData.zalo || ''}
            onChange={handleChange}
            error={errors.zalo}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            id="phone"
            label="Số điện thoại"
            required
            value={formData.phone || ''}
            onChange={handleChange}
            error={errors.phone}
          />

          <FormInput
            id="companyEmail"
            label="Email công ty"
            type="email"
            value={formData.companyEmail || ''}
            onChange={handleChange}
            error={errors.companyEmail}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            id="skype"
            label="Skype"
            value={formData.skype || ''}
            onChange={handleChange}
            error={errors.skype}
          />
        </div>

        <div className="mt-4">
          <h4 className="form-label mb-2">Trụ sở chính</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSelect
              id="province"
              label="Tỉnh/Thành phố"
              required
              options={provinces}
              value={formData.province || ''}
              onChange={handleChange}
              error={errors.province}
            />

            <FormSelect
              id="district"
              label="Quận/Huyện"
              options={districts}
              value={formData.district || ''}
              onChange={handleChange}
              error={errors.district}
            />
          </div>

          <FormInput
            id="address"
            label="Địa chỉ chi tiết"
            required
            value={formData.address || ''}
            onChange={handleChange}
            error={errors.address}
          />
        </div>
      </div>

      <div className="mt-4">
        <FormInput
          id="companyDescription"
          label="Giới thiệu về công ty"
          value={formData.companyDescription || ''}
          onChange={handleChange}
          error={errors.companyDescription}
        />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">Tài khoản được phân quyền (tối đa 5 tài khoản) <button type="button" className="text-green-500 hover:underline">Chi tiết</button></p>
        <button type="button" className="mt-2 flex items-center border border-gray-300 rounded px-3 py-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Thêm
        </button>
      </div>
    </div>
  );
};

export default CompanyInfoSection;
