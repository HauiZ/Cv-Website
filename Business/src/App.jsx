import { useState, useMemo, useEffect } from 'react';
import Sidebar from './views/QuanLyCV/Sidebar';
import BangTin from './views/BangTin';
import Insights from './views/Insights';
import TinTuyenDung from './views/TinTuyenDung';
import JobPostingForm from './views/Dangtin/JobPostingForm';
import CVDeXuat from './views/CVDeXuat';
import BaoCaoTuyenDung from './views/BaoCaoTuyenDung';
import CaiDatTaiKhoan from './views/CaiDatTaiKhoan';
import QuanLyThongTin from './views/QuanLyThongTin';
import Mail from './views/Mail';
import { candidates as initialCandidates } from './data/candidates';
import { CandidateCard } from './views/QuanLyCV/CandidateCard';
import { StatusFilter } from './views/QuanLyCV/StatusFilter';
import { Pagination } from './views/QuanLyCV/Pagination';
import { PaginationInfo } from './views/QuanLyCV/PaginationInfo';
import { MailButton } from './views/QuanLyCV/MailButton';
import { AlertCircle, XCircle, Mail as MailIcon, RefreshCw, Filter } from 'lucide-react';
import ApiTester from './service/ApiTester';

const statusOptions = [
  { value: 'all', label: 'Hiển thị tất cả CV' },
  { value: 'approved', label: 'CV Đã duyệt' },
  { value: 'pending', label: 'CV Chưa duyệt' },
  { value: 'rejected', label: 'CV Từ chối' },
];

const ITEMS_PER_PAGE = 5;

function App() {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState('bang-tin'); // Mặc định bắt đầu với Bảng tin
  const [settingsTab, setSettingsTab] = useState('profile');
  const [emailSent, setEmailSent] = useState(false);
  const [emailAlert, setEmailAlert] = useState({ show: false, message: '', type: '' });
  const [showApiTester, setShowApiTester] = useState(false);

  // Listen for the settings tab changes from the sidebar
  useEffect(() => {
    const handleSettingsTabChange = () => {
      if (window && window.settingsTab) {
        setSettingsTab(window.settingsTab);
      }
    };

    // Set up listener
    window.addEventListener('storage', handleSettingsTabChange);

    // Check if it's already set
    if (window && window.settingsTab) {
      setSettingsTab(window.settingsTab);
    }

    return () => {
      window.removeEventListener('storage', handleSettingsTabChange);
    };
  }, []);

  // Candidate management state
  const [candidates, setCandidates] = useState(initialCandidates);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Candidate actions
  const handleApprove = (id) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: 'approved' } : candidate
      )
    );
  };

  const handleReject = (id) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: 'rejected' } : candidate
      )
    );
  };

  const handleSendMail = (id, emailData) => {
    // Find the candidate that the email was sent to
    const candidate = candidates.find((c) => c.id === id);

    if (candidate) {
      // Show notification that email was sent
      setEmailAlert({
        show: true,
        message: `Email đã được gửi thành công tới ${candidate.name}`,
        type: 'success'
      });

      // Hide the notification after 5 seconds
      setTimeout(() => {
        setEmailAlert({ show: false, message: '', type: '' });
      }, 5000);

      console.log('Email sent:', emailData);
      setEmailSent(true);
    }
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  // Filter and paginate candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      if (statusFilter === 'all') return true;
      return candidate.status === statusFilter;
    });
  }, [candidates, statusFilter]);

  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);

  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCandidates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCandidates, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the list when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle API tester visibility
  const toggleApiTester = () => {
    setShowApiTester(prev => !prev);
  };

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'bang-tin':
        return (
          <div>
            <BangTin />
            <div className="mt-4">
              <button
                onClick={toggleApiTester}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                {showApiTester ? 'Ẩn công cụ kiểm tra API' : 'Hiển thị công cụ kiểm tra API'}
              </button>

              {showApiTester && <ApiTester />}
            </div>
          </div>
        );
      case 'insights':
        return <Insights />;
      case 'tin-tuyen-dung':
        return <TinTuyenDung />;
      case 'dang-tin':
        return <JobPostingForm />;
      case 'cv-de-xuat':
        return <CVDeXuat />;
      case 'quan-ly-thong-tin':
        return <QuanLyThongTin />;
      case 'cai-dat':
        return <CaiDatTaiKhoan activeSettingsTab={settingsTab} />;
      case 'mail':
        return <Mail />;
      case 'quan-ly-cv':
        return (
          <div className="container mx-auto py-8 px-4 max-w-5xl">
            {emailAlert.show && (
              <div className={`mb-4 p-3 rounded-md flex items-center ${
                emailAlert.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {emailAlert.type === 'success' ? (
                  <MailIcon className="mr-2 h-5 w-5" />
                ) : (
                  <AlertCircle className="mr-2 h-5 w-5" />
                )}
                <p>{emailAlert.message}</p>
                <button
                  onClick={() => setEmailAlert({ show: false, message: '', type: '' })}
                  className="ml-auto text-gray-500 hover:text-gray-700"
                >
                  <XCircle size={16} />
                </button>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="text-lg font-medium flex items-center">
                  <Filter size={18} className="mr-2 text-gray-500" />
                  Tìm thấy <span className="font-bold ml-1">{filteredCandidates.length}</span> CV
                </div>
                <div className="flex items-center gap-3">
                  <StatusFilter
                    options={statusOptions}
                    selectedValue={statusFilter}
                    onSelect={handleStatusChange}
                  />
                  <MailButton
                    showManagement={true}
                    variant="secondary"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {paginatedCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onSendMail={handleSendMail}
                  />
                ))}

                {filteredCandidates.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Không tìm thấy CV nào trong danh sách.
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center">
                <PaginationInfo
                  currentPage={currentPage}
                  totalItems={filteredCandidates.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        );
      case 'bao-cao':
        return <BaoCaoTuyenDung />;
      default:
        return <BangTin />;
    }
  };

  return (
    <div className="app">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-[200px] bg-white shadow">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
