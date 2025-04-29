import React, { useEffect } from 'react';
import AccountInfoSection from './AccountInfoSection';
import CompanyInfoSection from './CompanyInfoSection';
import ContactAndLogoSection from './ContactAndLogoSection';
import { useEmployer } from '../../service/EmlpoyerManagementServices/employer-context';

const EmployerForm = () => {
  const {
    formData,
    handleSubmit,
    isLoading,
    saveSuccess,
    apiError,
    saveDraft
  } = useEmployer();

  // Show success message
  useEffect(() => {
    if (saveSuccess) {
      // Could be replaced with a toast notification
      alert('Thông tin nhà tuyển dụng đã được lưu!');
    }
  }, [saveSuccess]);

  // Show error message
  useEffect(() => {
    if (apiError) {
      // Could be replaced with a toast notification
      alert(`Lỗi: ${apiError}`);
    }
  }, [apiError]);

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <svg className="h-8 w-8 animate-spin text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-800">Đang xử lý...</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-8/12">
          <AccountInfoSection />
          <CompanyInfoSection />
        </div>
        <div className="lg:w-4/12">
          <ContactAndLogoSection />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={saveDraft}
        >
          Lưu nháp
        </button>
        <button
          type="submit"
          className="rounded-md px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Lưu và cập nhật
        </button>
      </div>
    </form>
  );
};

export default EmployerForm;
