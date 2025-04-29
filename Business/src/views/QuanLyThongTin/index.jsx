import React from 'react';
import EmployerForm from './EmployerForm';
import { EmployerProvider } from '../../service/EmlpoyerManagementServices/employer-context';

const QuanLyThongTin = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-xl font-semibold text-green-500 mb-4">Quản lý thông tin tài khoản</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <EmployerProvider>
          <EmployerForm />
        </EmployerProvider>
      </div>
    </div>
  );
};

export default QuanLyThongTin;
