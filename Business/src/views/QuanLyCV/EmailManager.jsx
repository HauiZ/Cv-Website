import { useState, useEffect } from 'react';
import { RefreshCw, Mail, Trash, Eye, Download, Plus, Check, X, Clipboard } from 'lucide-react';
import mailService, { EMAIL_TEMPLATES } from '../../service/mailService';
import axios from 'axios';

export const EmailManager = () => {
  const [emailLogs, setEmailLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [newTemplateData, setNewTemplateData] = useState({
    templateKey: '',
    subject: '',
    body: ''
  });
  const [actionStatus, setActionStatus] = useState({ type: '', message: '' });

  // Load email logs on component mount
  useEffect(() => {
    fetchEmailLogs();
  }, []);

  const fetchEmailLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/mail/logs');
      setEmailLogs(response.data.emails || []);
    } catch (error) {
      console.error('Error fetching email logs:', error);
      setActionStatus({
        type: 'error',
        message: 'Không thể tải nhật ký email'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewEmail = async (logFile) => {
    try {
      const response = await axios.get(`/api/mail/logs/${logFile}`);
      setSelectedEmail(response.data);
    } catch (error) {
      console.error('Error fetching email details:', error);
      setActionStatus({
        type: 'error',
        message: 'Không thể tải chi tiết email'
      });
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setActionStatus({
          type: 'success',
          message: 'Đã sao chép vào bộ nhớ đệm'
        });
        setTimeout(() => setActionStatus({ type: '', message: '' }), 2000);
      },
      (err) => {
        console.error('Không thể sao chép:', err);
        setActionStatus({
          type: 'error',
          message: 'Không thể sao chép vào bộ nhớ đệm'
        });
      }
    );
  };

  const handleCreateTemplate = () => {
    // Validate template data
    if (!newTemplateData.templateKey || !newTemplateData.subject || !newTemplateData.body) {
      setActionStatus({
        type: 'error',
        message: 'Vui lòng điền đầy đủ thông tin mẫu email'
      });
      return;
    }

    // Create the template
    const result = mailService.createCustomTemplate(newTemplateData);

    if (result.success) {
      setActionStatus({
        type: 'success',
        message: 'Đã tạo mẫu email mới thành công'
      });
      setNewTemplateData({
        templateKey: '',
        subject: '',
        body: ''
      });
      setShowNewTemplateForm(false);
    } else {
      setActionStatus({
        type: 'error',
        message: result.message || 'Không thể tạo mẫu email'
      });
    }
  };

  const handleNewTemplateChange = (e) => {
    const { name, value } = e.target;
    setNewTemplateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản Lý Email</h2>
        <div className="flex space-x-2">
          <button
            onClick={fetchEmailLogs}
            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center"
            disabled={loading}
          >
            <RefreshCw size={16} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </button>
          <button
            onClick={() => setShowNewTemplateForm(prev => !prev)}
            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
          >
            {showNewTemplateForm ? <X size={16} className="mr-1" /> : <Plus size={16} className="mr-1" />}
            {showNewTemplateForm ? 'Hủy' : 'Mẫu mới'}
          </button>
        </div>
      </div>

      {actionStatus.type && (
        <div className={`p-3 mb-4 rounded-md ${
          actionStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <div className="flex items-center">
            {actionStatus.type === 'success' ? (
              <Check size={16} className="mr-2" />
            ) : (
              <X size={16} className="mr-2" />
            )}
            <p className="text-sm">{actionStatus.message}</p>
          </div>
        </div>
      )}

      {showNewTemplateForm && (
        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-3">Tạo Mẫu Email Mới</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="templateKey" className="block text-sm font-medium text-gray-700 mb-1">
                Mã mẫu email
              </label>
              <input
                type="text"
                id="templateKey"
                name="templateKey"
                value={newTemplateData.templateKey}
                onChange={handleNewTemplateChange}
                placeholder="vd: welcome_new_employer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Sử dụng chữ thường và gạch dưới, không dấu và không khoảng trắng
              </p>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề mẫu
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={newTemplateData.subject}
                onChange={handleNewTemplateChange}
                placeholder="vd: Chào mừng đến với {{companyName}}"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                Nội dung mẫu
              </label>
              <textarea
                id="body"
                name="body"
                rows={5}
                value={newTemplateData.body}
                onChange={handleNewTemplateChange}
                placeholder="Sử dụng {{name}}, {{position}}, {{companyName}}, v.v. cho các biến động"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreateTemplate}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
              >
                <Check size={16} className="mr-1" />
                Lưu mẫu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Mẫu Email Có Sẵn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(EMAIL_TEMPLATES).map(([key, value]) => (
            <div key={key} className="border border-gray-200 p-3 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-gray-700">{key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</h4>
                <button
                  onClick={() => copyToClipboard(value)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Sao chép mã mẫu"
                >
                  <Clipboard size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-medium mb-3">Nhật Ký Email</h3>
      {loading ? (
        <div className="text-center py-8">
          <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Đang tải nhật ký email...</p>
        </div>
      ) : emailLogs.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
          <Mail size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Không có email nào được gửi gần đây</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người nhận
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emailLogs.map((email, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(email.timestamp)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {email.to}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium truncate max-w-xs">
                    {email.subject}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                    <button
                      onClick={() => setSelectedEmail(email)}
                      className="text-blue-500 hover:text-blue-700 mx-1"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Chi tiết email</h3>
              <button
                onClick={() => setSelectedEmail(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-7rem)]">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Thời gian gửi:</p>
                <p className="font-medium">{formatTimestamp(selectedEmail.timestamp)}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Người nhận:</p>
                <p className="font-medium">{selectedEmail.to}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Tiêu đề:</p>
                <p className="font-medium">{selectedEmail.subject}</p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">Nội dung:</p>
                  <button
                    onClick={() => copyToClipboard(selectedEmail.body)}
                    className="text-gray-500 hover:text-gray-700 flex items-center text-xs"
                  >
                    <Clipboard size={12} className="mr-1" />
                    Sao chép
                  </button>
                </div>
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50 whitespace-pre-wrap">
                  {selectedEmail.isHtml ? (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                    />
                  ) : (
                    <p className="text-gray-800">{selectedEmail.body}</p>
                  )}
                </div>
              </div>
              {selectedEmail.attachmentsCount > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tệp đính kèm:</p>
                  <p className="font-medium">{selectedEmail.attachmentsCount} tệp</p>
                </div>
              )}
            </div>
            <div className="px-6 py-3 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
