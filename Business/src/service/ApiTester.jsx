import React, { useState, useEffect } from 'react';
import { testApiConnection } from './EmlpoyerManagementServices/utils';
import { API_BASE_URL } from './EmlpoyerManagementServices/constants';
import { setUseMockApi, shouldUseMockApi } from './EmlpoyerManagementServices/config';

/**
 * Component to test API connection and toggle between mock and real API
 */
const ApiTester = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [useMock, setUseMock] = useState(shouldUseMockApi());

  useEffect(() => {
    // Test connection on initial load
    testConnection();
  }, []);

  const testConnection = async () => {
    setIsTesting(true);
    setConnectionStatus(null);

    try {
      const result = await testApiConnection(API_BASE_URL);
      setConnectionStatus(result);
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: `Lỗi kiểm tra kết nối: ${error.message}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  const toggleMockApi = () => {
    const newValue = !useMock;
    setUseMockApi(newValue);
    setUseMock(newValue);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <h2 className="text-xl font-bold mb-4">Kiểm tra kết nối API</h2>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="mr-2 font-medium">Trạng thái API:</span>

          {isTesting && (
            <div className="flex items-center">
              <svg className="animate-spin h-4 w-4 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang kiểm tra...</span>
            </div>
          )}

          {!isTesting && connectionStatus && (
            <span className={`px-2 py-1 rounded text-sm font-medium ${connectionStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {connectionStatus.message}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <div>URL API: <span className="font-mono bg-gray-100 px-1 rounded">{API_BASE_URL}</span></div>
          <div>Kiểu kết nối: <span className="font-medium">{useMock ? 'Mock API (dữ liệu giả)' : 'Real API (API thật)'}</span></div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={testConnection}
          disabled={isTesting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          Kiểm tra kết nối
        </button>

        <button
          onClick={toggleMockApi}
          className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            useMock
              ? 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500'
              : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
          }`}
        >
          {useMock ? 'Chuyển sang API thật' : 'Chuyển sang Mock API'}
        </button>
      </div>
    </div>
  );
};

export default ApiTester;
