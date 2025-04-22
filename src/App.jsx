import { useState, useMemo  } from 'react';
import Sidebar from './components/Sidebar';
import BangTin from './pages/BangTin';
import Insights from './pages/Insights';
import TinTuyenDung from './pages/TinTuyenDung';
import JobPostingForm from './pages/JobPostingForm';
import CVDeXuat from './pages/CVDeXuat';
import QuanLyCV from './pages/QuanLyCV';
import BaoCaoTuyenDung from './pages/BaoCaoTuyenDung';
import CaiDatTaiKhoan from './pages/CaiDatTaiKhoan';
import { candidates as initialCandidates } from './data/candidates';
import { CandidateCard } from './components/CandidateCard';
import { StatusFilter } from './components/StatusFilter';
import { Pagination } from './components/Pagination';
import { PaginationInfo } from './components/PaginationInfo';

const statusOptions = [
  { value: 'all', label: 'Hiển thị tất cả CV' },
  { value: 'approved', label: 'CV Đã duyệt' },
  { value: 'pending', label: 'CV Chưa duyệt' },
  { value: 'rejected', label: 'CV Từ chối' },
];

const ITEMS_PER_PAGE = 5;


function App() {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState('dang-tin');
  
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

  const handleSendMail = (id) => {
    // Here you would add logic to send an email
    console.log(`Sending mail to candidate ${id}`);
    alert(`Mail would be sent to candidate ${id}`);
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

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'bang-tin':
        return <BangTin />;
      case 'insights':
        return <Insights />;
      case 'tin-tuyen-dung':
        return <TinTuyenDung />;
      case 'dang-tin':
        return <JobPostingForm />;
      case 'cv-de-xuat':
        return <CVDeXuat />;
      case 'quan-ly-cv':
        return (
          <div className="container mx-auto py-8 px-4 max-w-5xl">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-medium">
                  Tìm thấy <span className="font-bold">{filteredCandidates.length}</span> CV
                </div>
                <StatusFilter
                  options={statusOptions}
                  selectedValue={statusFilter}
                  onSelect={handleStatusChange}
                />
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

                {/* Only show pagination if there are multiple pages */}
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
      case 'cai-dat':
        return <CaiDatTaiKhoan />;
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
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
