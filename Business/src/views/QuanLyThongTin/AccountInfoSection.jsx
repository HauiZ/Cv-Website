import React from 'react';
import FormHeader from './FormHeader';
import FormInput from './FormInput';
import { useEmployer } from '../../service/EmlpoyerManagementServices/employer-context';

const AccountInfoSection = () => {
  const { formData, handleChange, errors } = useEmployer();

  return (
    <div className="form-section mb-6">
      <div className="border-l-4 border-green-500 pl-3 mb-4">
        <FormHeader title="Thông tin tài khoản" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput
          id="email"
          label="Email hoặc số điện thoại đang đăng nhập"
          required
          value={formData.email || ''}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          id="password"
          label="Mật khẩu"
          type="password"
          required
          value={formData.password || ''}
          onChange={handleChange}
          error={errors.password}
        />
      </div>
    </div>
  );
};

export default AccountInfoSection;
