import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Building, DollarSign, Clock, Briefcase, Users, Share2, BookmarkPlus, BookmarkCheck, ArrowLeft } from 'lucide-react';
import jobListings from '../data/jobListings';
import { useAuth } from '../context/AuthContext';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarJobs, setSimilarJobs] = useState([]);
  const { user, saveJob, applyToJob, isJobSaved, isJobApplied } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Find the job with the matching ID
    if (id) {
      const foundJob = jobListings.find(job => job.id === Number.parseInt(id));

      if (foundJob) {
        setJob(foundJob);

        // Find similar jobs based on category
        const similar = jobListings
          .filter(j => j.category === foundJob.category && j.id !== foundJob.id)
          .slice(0, 3);

        setSimilarJobs(similar);
      }
    }

    setLoading(false);
  }, [id]);

  const handleSaveJob = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (job) {
      saveJob(job.id);
    }
  };

  const handleApplyJob = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (job) {
      applyToJob(job.id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <div className="animate-pulse h-8 w-64 bg-gray-200 rounded-md mx-auto mb-6" />
          <div className="animate-pulse h-4 w-32 bg-gray-200 rounded-md mx-auto" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy công việc</h1>
          <p className="mb-6">Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/" className="btn-primary">
            Trở về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const jobIsSaved = isJobSaved(job.id);
  const jobIsApplied = isJobApplied(job.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="flex items-center text-gray-600 hover:text-[#00875a] mb-6">
        <ArrowLeft size={18} className="mr-2" />
        Trở về trang chủ
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                {job.logoUrl ? (
                  <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                ) : (
                  <Building size={36} className="text-gray-400" />
                )}
              </div>

              <div className="flex-grow">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h1>
                <Link to={`/company/${job.company.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#00875a] hover:underline text-lg mb-3 block">
                  {job.company}
                </Link>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1 text-gray-500" />
                    <span className="text-[#00875a] font-medium">{job.salary}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-gray-500" />
                    <span>Còn {job.applicationDeadline} ngày để ứng tuyển</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-1 text-gray-500" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1 text-gray-500" />
                    <span>{job.jobLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              {jobIsApplied ? (
                <div className="btn-secondary flex-grow md:flex-grow-0 flex items-center justify-center opacity-75 cursor-default">
                  <span>Đã ứng tuyển</span>
                </div>
              ) : (
                <button
                  className="btn-apply px-8 py-3 flex-grow md:flex-grow-0"
                  onClick={handleApplyJob}
                >
                  Ứng tuyển ngay
                </button>
              )}
              <button
                className="btn-secondary flex items-center"
                onClick={handleSaveJob}
                disabled={jobIsSaved}
              >
                {jobIsSaved ? (
                  <>
                    <BookmarkCheck size={18} className="mr-2 text-[#00875a]" />
                    <span className="text-[#00875a]">Đã lưu</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus size={18} className="mr-2" />
                    <span>Lưu</span>
                  </>
                )}
              </button>
              <button className="btn-secondary flex items-center">
                <Share2 size={18} className="mr-2" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Mô tả công việc</h2>
            <p className="text-gray-700 mb-6">{job.description}</p>

            <h3 className="text-lg font-semibold mb-3">Yêu cầu</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={`req-${req.substring(0, 10)}-${index}`} className="text-gray-700">{req}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Quyền lợi</h3>
            <ul className="list-disc pl-6 space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={`benefit-${benefit.substring(0, 10)}-${index}`} className="text-gray-700">{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Company Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Giới thiệu công ty</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {job.logoUrl ? (
                  <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                ) : (
                  <Building size={24} className="text-gray-400" />
                )}
              </div>
              <Link to={`/company/${job.company.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#00875a] hover:underline font-medium">
                {job.company}
              </Link>
            </div>
            <p className="text-gray-700 mb-4">
              {job.company} là công ty hàng đầu trong lĩnh vực {job.category.toLowerCase()}.
              Chúng tôi cung cấp môi trường làm việc chuyên nghiệp, năng động và nhiều cơ hội phát triển.
            </p>
            <Link to={`/company/${job.company.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#00875a] hover:underline">
              Xem thêm về {job.company}
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          {/* Apply Now Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold mb-4 text-center">Ứng tuyển ngay</h3>
            {jobIsApplied ? (
              <div className="btn-secondary w-full mb-4 flex justify-center items-center opacity-75 cursor-default">
                <span>Đã ứng tuyển</span>
              </div>
            ) : (
              <button className="btn-apply w-full mb-4" onClick={handleApplyJob}>
                Ứng tuyển ngay
              </button>
            )}
            <p className="text-center text-sm text-gray-500">
              Ứng tuyển trước: {new Date().toLocaleDateString('vi-VN')}
            </p>
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Việc làm tương tự</h3>
            {similarJobs.length > 0 ? (
              <div className="space-y-4">
                {similarJobs.map(job => (
                  <div key={job.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <Link to={`/job/${job.id}`} className="block">
                      <h4 className="font-medium text-[#00875a] hover:underline">{job.title}</h4>
                      <p className="text-gray-700 text-sm mb-1">{job.company}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <DollarSign size={14} className="mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">Không có việc làm tương tự</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
