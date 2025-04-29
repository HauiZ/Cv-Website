import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserSettings, saveUserSettings, changePassword, setupTwoFactor, verifyOTP } from './accountSettings';

// Create context
const AccountSettingsContext = createContext();

export const AccountSettingsProvider = ({ children }) => {
  // Settings state
  const [settings, setSettings] = useState(null);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getUserSettings();
        setSettings(data);
        setError(null);
      } catch (err) {
        setError('Không thể tải cài đặt tài khoản. Vui lòng thử lại sau.');
        console.error('Error fetching settings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Save settings
  const handleSaveSettings = async (newSettings) => {
    setIsLoading(true);
    try {
      await saveUserSettings(newSettings);
      setSettings(newSettings);
      setSuccessMessage('Cài đặt đã được lưu thành công');
      setError(null);
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Không thể lưu cài đặt. Vui lòng thử lại sau.');
      console.error('Error saving settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Change password
  const handleChangePassword = async (passwordData) => {
    setIsLoading(true);
    try {
      const result = await changePassword(passwordData);
      setSuccessMessage(result.message);
      setError(null);
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return result;
    } catch (err) {
      setError(err.message || 'Không thể thay đổi mật khẩu. Vui lòng thử lại sau.');
      console.error('Error changing password:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Setup two-factor authentication
  const handleSetupTwoFactor = async (phone) => {
    setIsLoading(true);
    try {
      const result = await setupTwoFactor(phone);
      return result;
    } catch (err) {
      setError('Không thể thiết lập xác thực hai yếu tố. Vui lòng thử lại sau.');
      console.error('Error setting up 2FA:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (code) => {
    setIsLoading(true);
    try {
      const result = await verifyOTP(code);
      setSettings({
        ...settings,
        security: {
          ...settings.security,
          twoFactorAuth: true
        }
      });
      setSuccessMessage('Xác thực hai yếu tố đã được bật');
      return result;
    } catch (err) {
      setError(err.message || 'Mã xác thực không hợp lệ. Vui lòng thử lại.');
      console.error('Error verifying OTP:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update a specific setting
  const updateSetting = (category, key, value) => {
    if (!settings) return;

    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };

    setSettings(newSettings);
  };

  // Context value
  const value = {
    settings,
    isLoading,
    error,
    successMessage,
    updateSetting,
    saveSettings: handleSaveSettings,
    changePassword: handleChangePassword,
    setupTwoFactor: handleSetupTwoFactor,
    verifyOTP: handleVerifyOTP
  };

  return (
    <AccountSettingsContext.Provider value={value}>
      {children}
    </AccountSettingsContext.Provider>
  );
};

// Custom hook to use the account settings context
export const useAccountSettings = () => {
  const context = useContext(AccountSettingsContext);
  if (!context) {
    throw new Error('useAccountSettings must be used within an AccountSettingsProvider');
  }
  return context;
};

export default AccountSettingsContext;
