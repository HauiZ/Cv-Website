import { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  AlertCircle, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Send, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';

// Modal Component
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} animate-fadeIn`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// CandidateCard Component
export const CandidateCard = ({
  candidate,
  onApprove,
  onReject,
  onSendMail,
}) => {
  const getStatusComponent = () => {
    switch (candidate.status) {
      case 'pending':
        return (
          <div className="flex items-center text-amber-500 gap-1">
            <AlertCircle size={18} />
            <span>Chờ xử lý</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center text-green-500 gap-1">
            <CheckCircle size={18} />
            <span>Đồng ý</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-500 gap-1">
            <XCircle size={18} />
            <span>Từ chối</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 flex items-center bg-white">
      <div className="flex-shrink-0 mr-4">
        <img
          src={candidate.avatarUrl}
          alt={candidate.name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="mb-1">
          <h3 className="font-medium text-lg">{candidate.position}</h3>
          <h4 className="text-green-500 font-medium">{candidate.name}</h4>
        </div>

        <div className="flex gap-6 mt-2">
          <div className="flex items-center text-gray-600 gap-1">
            <MapPin size={16} />
            <span className="text-sm">{candidate.location}</span>
          </div>

          <div className="flex items-center text-gray-600 gap-1">
            <Clock size={16} />
            <span className="text-sm">{candidate.experience}</span>
          </div>

          {getStatusComponent()}
        </div>
      </div>

      {candidate.jobCode && (
        <div className="text-xs text-gray-500 self-start bg-gray-50 px-2 py-1 rounded">
          Bài đăng: {candidate.jobCode}
        </div>
      )}

      <div className="flex gap-2 items-center ml-4">
        {candidate.status === 'pending' && (
          <>
            <button
              onClick={() => onApprove(candidate.id)}
              className="rounded-full bg-green-500 text-white flex items-center justify-center w-8 h-8"
              title="Duyệt"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => onReject(candidate.id)}
              className="rounded-full border border-red-500 text-red-500 flex items-center justify-center w-8 h-8"
              title="Từ chối"
            >
              <XCircle size={16} />
            </button>
          </>
        )}

        {(candidate.status === 'approved' || candidate.status === 'rejected') && (
          <button
            onClick={() => onSendMail(candidate.id)}
            className="rounded-md bg-green-100 text-green-600 py-1 px-3 flex items-center gap-1 text-sm"
          >
            <Mail size={14} />
            <span>Mail</span>
          </button>
        )}
      </div>
    </div>
  );
};

// EmailForm Component
export const EmailForm = ({ candidate, onSend, onCancel }) => {
  // Prepare default subject and message based on candidate status
  const getDefaultSubject = () => {
    return candidate.status === 'approved'
      ? `Thông báo kết quả ứng tuyển - ${candidate.position}`
      : `Thông báo về đơn ứng tuyển - ${candidate.position}`;
  };

  const getDefaultMessage = () => {
    if (candidate.status === 'approved') {
      return `Kính gửi ${candidate.name},

Chúng tôi vui mừng thông báo rằng hồ sơ ứng tuyển vị trí ${candidate.position} của bạn đã được chấp nhận. Chúng tôi rất ấn tượng với kinh nghiệm và kỹ năng của bạn.

Bước tiếp theo, chúng tôi sẽ liên hệ để sắp xếp buổi phỏng vấn. Vui lòng giữ liên lạc.

Trân trọng,
Phòng Nhân sự`;
    }

    return `Kính gửi ${candidate.name},

Cảm ơn bạn đã quan tâm và nộp hồ sơ ứng tuyển vị trí ${candidate.position} tại công ty chúng tôi.

Sau khi xem xét kỹ lưỡng, chúng tôi rất tiếc phải thông báo rằng hồ sơ của bạn chưa đáp ứng được yêu cầu cho vị trí này. Chúng tôi sẽ lưu hồ sơ của bạn và liên hệ khi có vị trí phù hợp.

Chúc bạn tìm được công việc phù hợp.

Trân trọng,
Phòng Nhân sự`;
  };

  // State for form data and validation
  const [formData, setFormData] = useState({
    to: `${candidate.name} <candidate@example.com>`,
    subject: getDefaultSubject(),
    message: getDefaultMessage(),
  });

  const [errors, setErrors] = useState({});

  const [isSending, setIsSending] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const extractEmail = (fullAddress) => {
    const match = fullAddress.match(/<([^>]+)>/) || fullAddress.match(/([^\s]+@[^\s]+\.[^\s]+)/);
    return match ? match[1] : fullAddress;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate email
    const email = extractEmail(formData.to);
    if (!formData.to.trim()) {
      newErrors.to = 'Vui lòng nhập địa chỉ email';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.to = 'Địa chỉ email không hợp lệ';
      isValid = false;
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập tiêu đề email';
      isValid = false;
    } else if (formData.subject.length > 100) {
      newErrors.subject = 'Tiêu đề không được quá 100 ký tự';
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSending(true);

      // Simulate sending email
      setTimeout(() => {
        onSend(formData);
        setIsSending(false);
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
          Người nhận
        </label>
        <input
          type="text"
          id="to"
          name="to"
          value={formData.to}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.to ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-green-500`}
        />
        {errors.to && <p className="mt-1 text-sm text-red-500">{errors.to}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Tiêu đề
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-green-500`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Nội dung
        </label>
        <textarea
          id="message"
          name="message"
          rows={8}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-green-500`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
          disabled={isSending}
        >
          <X size={16} className="mr-1" />
          Hủy
        </button>
        <button
          type="submit"
          className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center ${
            isSending ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSending}
        >
          <Send size={16} className="mr-1" />
          {isSending ? 'Đang gửi...' : 'Gửi email'}
        </button>
      </div>
    </form>
  );
};

// StatusFilter Component
export const StatusFilter = ({ options, onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const selected = options.find(option => option.value === selectedValue);
    return selected ? selected.label : options[0].label;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-64 bg-white border border-gray-300 rounded-md p-2 px-4 text-gray-800"
        onClick={handleToggle}
      >
        <span>{getSelectedLabel()}</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Pagination Component
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    // Always show first page
    pageNumbers.push('1');

    // Calculate start and end of pagination range
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Ensure we display up to maxPagesToShow pages
    if (endPage - startPage < maxPagesToShow - 3) {
      endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);
    }
    if (endPage - startPage < maxPagesToShow - 3) {
      startPage = Math.max(2, endPage - (maxPagesToShow - 3));
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('ellipsis1');
    }

    // Add middle page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i.toString());
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('ellipsis2');
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages.toString());
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const renderPageButton = (page) => {
    const isEllipsis = page === 'ellipsis1' || page === 'ellipsis2';
    const pageNum = isEllipsis ? '...' : page;
    const isCurrentPage = Number.parseInt(page) === currentPage;

    return (
      <button
        key={page}
        onClick={() => !isEllipsis && onPageChange(Number.parseInt(page))}
        disabled={isEllipsis}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          isCurrentPage
            ? 'bg-green-500 text-white font-medium'
            : isEllipsis
            ? 'text-gray-500 cursor-default'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label={!isEllipsis ? `Page ${page}` : 'More pages'}
      >
        {pageNum}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-4 md:mt-0">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pageNumbers.map(renderPageButton)}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

// PaginationInfo Component
export const PaginationInfo = ({
  currentPage,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="text-sm text-gray-500 mb-4 md:mb-0">
      {totalItems > 0 ? (
        <p>
          Hiển thị <span className="font-medium text-gray-700">{startItem}</span> đến{' '}
          <span className="font-medium text-gray-700">{endItem}</span> trong tổng số{' '}
          <span className="font-medium text-gray-700">{totalItems}</span> CV
        </p>
      ) : (
        <p>Không có CV nào</p>
      )}
    </div>
  );
};
