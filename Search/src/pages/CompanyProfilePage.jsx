import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building, MapPin, Globe, Phone, Mail, ArrowLeft, Users } from 'lucide-react';
import jobListings from '../data/jobListings';

const CompanyProfilePage = () => {
  const { slug } = useParams();
  const [companyName, setCompanyName] = useState('');
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Convert the slug back to a company name (approximate)
      const nameFromSlug = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Find jobs from this company
      const jobs = jobListings.filter(
        job => job.company.toLowerCase().replace(/\s+/g, '-') === slug
      );

      if (jobs.length > 0) {
        setCompanyName(jobs[0].company);
        setCompanyJobs(jobs);
      } else {
        setCompanyName(nameFromSlug);
      }
    }
    setLoading(false);
  }, [slug]);

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

  if (companyJobs.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy thông tin công ty</h1>
          <p className="mb-6">Công ty bạn đang tìm kiếm không tồn tại hoặc chưa đăng tuyển công việc nào.</p>
          <Link to="/" className="btn-primary">
            Trở về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Use the first job to get company information
  const companyJob = companyJobs[0];
  const websiteUrl = `https://${companyName.toLowerCase().replace(/\s+/g, '')}.com`;

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="flex items-center text-gray-600 hover:text-[#00875a] mb-6">
        <ArrowLeft size={18} className="mr-2" />
        Trở về trang chủ
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
            {companyJob.logoUrl ? (
              <img src={companyJob.logoUrl} alt={`${companyName} logo`} className="w-full h-full object-cover" />
            ) : (
              <Building size={48} className="text-gray-400" />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{companyName}</h1>
            <p className="text-gray-600 mb-4">
              {companyJob.category} · {companyJob.location}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1 text-gray-500" />
                <span>{companyJob.location}</span>
              </div>
              <div className="flex items-center">
                <Globe size={16} className="mr-1 text-gray-500" />
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#00875a] hover:underline">
                  {companyName.toLowerCase().replace(/\s+/g, '')}.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-1 text-gray-500" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-1 text-gray-500" />
                <span>contact@{companyName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-1 text-gray-500" />
                <span>50-200 nhân viên</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Company Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Giới thiệu công ty</h2>
            <p className="text-gray-700 mb-4">
              {companyName} là công ty hàng đầu trong lĩnh vực {companyJob.category.toLowerCase()}.
              Với kinh nghiệm nhiều năm trong lĩnh vực, chúng tôi tự hào cung cấp các sản phẩm và dịch vụ
              chất lượng cao cho khách hàng trong và ngoài nước.
            </p>
            <p className="text-gray-700 mb-4">
              Sứ mệnh của chúng tôi là mang lại giá trị tối ưu cho khách hàng thông qua các giải pháp
              sáng tạo và hiệu quả. Chúng tôi luôn nỗ lực không ngừng để cải tiến và phát triển, đáp ứng
              ngày càng tốt hơn nhu cầu của thị trường.
            </p>
            <p className="text-gray-700 mb-4">
              Tại {companyName}, chúng tôi coi trọng nhân viên như tài sản quý giá nhất. Chúng tôi
              cung cấp môi trường làm việc chuyên nghiệp, năng động, nơi mọi người có thể phát huy tối đa
              tiềm năng và đóng góp vào sự phát triển chung của công ty.
            </p>
          </div>

          {/* Company Culture */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Văn hóa công ty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Đổi mới và Sáng tạo</h3>
                <p className="text-gray-700">
                  Chúng tôi khuyến khích mọi người đề xuất ý tưởng mới và liên tục cải tiến trong công việc.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Làm việc nhóm</h3>
                <p className="text-gray-700">
                  Chúng tôi tin vào sức mạnh của tinh thần đồng đội và hợp tác để đạt được mục tiêu chung.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Tôn trọng và Tin cậy</h3>
                <p className="text-gray-700">
                  Mọi ý kiến đều được lắng nghe và đánh giá cao, tạo nên môi trường làm việc tích cực.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Cân bằng công việc và cuộc sống</h3>
                <p className="text-gray-700">
                  Chúng tôi khuyến khích nhân viên duy trì lối sống lành mạnh và cân bằng.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Company Benefits */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Phúc lợi tại {companyName}</h3>
            <ul className="space-y-3">
              {companyJob.benefits.map((benefit, index) => (
                <li key={`benefit-${benefit.substring(0, 10)}-${index}`} className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-[#00875a]/20 flex items-center justify-center mr-2 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#00875a]" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Vị trí đang tuyển ({companyJobs.length})</h3>
            <div className="space-y-4">
              {companyJobs.map(job => (
                <div key={job.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <Link to={`/job/${job.id}`} className="block">
                    <h4 className="font-medium text-[#00875a] hover:underline">{job.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Building size={14} className="mr-1" />
                      <span>{job.salary}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
