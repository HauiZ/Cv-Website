import { useState } from 'react';
import { Mail } from 'lucide-react';
import { EmailForm } from './EmailForm';
import { EmailManager } from './EmailManager';

export const MailButton = ({
  recipient = null,
  variant = 'primary',
  size = 'md',
  showManagement = false,
  onSend = () => {}
}) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showEmailManager, setShowEmailManager] = useState(false);

  // If recipient is null, show management interface only
  const handleClick = () => {
    if (showManagement || !recipient) {
      setShowEmailManager(true);
    } else {
      setShowEmailForm(true);
    }
  };

  const handleSend = (emailData) => {
    onSend(emailData);
    setShowEmailForm(false);
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-green-500 hover:bg-green-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    outline: 'border border-green-500 text-green-500 hover:bg-green-50',
    text: 'text-green-500 hover:text-green-600 hover:underline',
    icon: 'text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100',
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`rounded-md flex items-center justify-center transition-colors
          ${sizeClasses[size] || sizeClasses.md}
          ${variantClasses[variant] || variantClasses.primary}
        `}
      >
        <Mail className={size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-1'} />
        {variant !== 'icon' && (showManagement ? 'Quản lý email' : 'Gửi email')}
      </button>

      {/* Email Form Modal */}
      {showEmailForm && recipient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Gửi email tới {recipient.name}</h3>
            </div>
            <div className="p-6">
              <EmailForm
                candidate={recipient}
                onSend={handleSend}
                onCancel={() => setShowEmailForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Email Management Modal */}
      {showEmailManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Quản lý Email</h3>
              <button
                onClick={() => setShowEmailManager(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <EmailManager />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
