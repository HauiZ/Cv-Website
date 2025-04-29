import { useState, useEffect, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

/**
 * Notification component for displaying success or error messages
 * @param {Object} props - Component props
 * @param {string} props.type - 'success' or 'error'
 * @param {string} props.message - Message to display
 * @param {Function} props.onClose - Function to call when notification is closed
 * @param {number} props.duration - Auto-close duration in milliseconds (0 for no auto-close)
 */
const Notification = ({ type = 'success', message, onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  // useCallback to memoize handleClose and avoid unnecessary re-renders or useEffect warnings
  const handleClose = useCallback(() => {
    setVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Allow animation to complete
    }
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const Icon = type === 'success' ? FaCheckCircle : FaTimesCircle;

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded-md border-l-4 shadow-md ${bgColor} transition-opacity duration-300`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${textColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={handleClose}
              className={`inline-flex rounded-md p-1.5 ${textColor} hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <span className="sr-only">Dismiss</span>
              <FaTimes className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
