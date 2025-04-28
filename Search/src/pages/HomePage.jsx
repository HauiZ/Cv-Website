import { useState, useEffect } from 'react';
import JobCard from '../components/job/JobCard';
import FilterSidebar from '../components/job/FilterSidebar';
import SearchBar from '../components/job/SearchBar';
import Pagination from '../components/ui/Pagination';
import jobListings from '../data/jobListings';
import { ArrowDownUp } from 'lucide-react';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    experience: '',
    jobLevel: '',
    salary: '',
    companyIndustry: '',
    jobField: '',
    workType: ''
  });

  const [filteredJobs, setFilteredJobs] = useState(jobListings);
  const jobsPerPage = 5;

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = [...jobListings];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
    }

    // Apply category filters
    if (activeFilters.categories.length > 0) {
      result = result.filter(job => activeFilters.categories.includes(job.category));
    }

    // Apply experience filter
    if (activeFilters.experience) {
      result = result.filter(job => job.experience === activeFilters.experience);
    }

    // Apply job level filter
    if (activeFilters.jobLevel) {
      result = result.filter(job => job.jobLevel === activeFilters.jobLevel);
    }

    // Apply salary filter
    if (activeFilters.salary) {
      const getSalaryRange = (salaryStr) => {
        if (salaryStr.includes('-')) {
          const [min, max] = salaryStr.split('-').map(s => Number.parseInt(s.trim()));
          return { min, max };
        }
        return null;
      };

      result = result.filter(job => {
        if (activeFilters.salary === 'Thỏa thuận') {
          return job.salary.includes('Thỏa thuận');
        }

        if (activeFilters.salary === 'Dưới 10 triệu') {
          const match = job.salary.match(/(\d+)/g);
          if (match) {
            const jobMin = Number.parseInt(match[0]);
            return jobMin < 10;
          }
        }

        if (activeFilters.salary === 'Trên 50 triệu') {
          const match = job.salary.match(/(\d+)/g);
          if (match && match.length > 1) {
            const jobMax = Number.parseInt(match[1]);
            return jobMax > 50;
          }
          if (match) {
            const jobMin = Number.parseInt(match[0]);
            return jobMin > 50;
          }
        }

        const filterRange = getSalaryRange(activeFilters.salary);
        if (!filterRange) return true;

        const match = job.salary.match(/(\d+)/g);
        if (match && match.length > 1) {
          const [jobMin, jobMax] = [Number.parseInt(match[0]), Number.parseInt(match[1])];
          return (jobMin <= filterRange.max && jobMax >= filterRange.min);
        }

        return false;
      });
    }

    // Apply work type filter
    if (activeFilters.workType) {
      result = result.filter(job => job.workType === activeFilters.workType);
    }

    // Apply sorting
    if (sortBy === 'date') {
      // Assume lower ID means newer job for demo purposes
      result.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'salary') {
      result.sort((a, b) => {
        const getAvgSalary = (salary) => {
          const matches = salary.match(/(\d+)/g);
          if (matches && matches.length > 1) {
            return (Number.parseInt(matches[0]) + Number.parseInt(matches[1])) / 2;
          }
          if (matches) {
            return Number.parseInt(matches[0]);
          }
          return 0;
        };

        return getAvgSalary(b.salary) - getAvgSalary(a.salary);
      });
    }

    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, activeFilters, sortBy]);

  // Calculate jobs to display on current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4">
            <FilterSidebar onFilterChange={handleFilterChange} totalJobs={filteredJobs.length} />
          </div>

          {/* Job Listings */}
          <div className="w-full md:w-3/4">
            <div className="bg-white p-4 rounded-md mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">Tìm thấy {filteredJobs.length} việc làm</h2>
                <p className="text-gray-500">Sắp xếp theo: {sortBy === 'date' ? 'Mới nhất' : 'Mức lương'}</p>
              </div>

              <div className="flex space-x-2">
                <button
                  className={`px-3 py-2 rounded-md flex items-center text-sm ${
                    sortBy === 'date' ? 'bg-[#00875a] text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => setSortBy('date')}
                >
                  <ArrowDownUp size={14} className="mr-1" />
                  Mới nhất
                </button>
                <button
                  className={`px-3 py-2 rounded-md flex items-center text-sm ${
                    sortBy === 'salary' ? 'bg-[#00875a] text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => setSortBy('salary')}
                >
                  <ArrowDownUp size={14} className="mr-1" />
                  Mức lương
                </button>
              </div>
            </div>

            {currentJobs.length > 0 ? (
              <>
                <div className="space-y-4">
                  {currentJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      applicationDeadline={job.applicationDeadline}
                      logoUrl={job.logoUrl}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredJobs.length / jobsPerPage)}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="bg-white p-8 text-center rounded-md">
                <h3 className="text-xl font-medium mb-2">Không tìm thấy việc làm nào</h3>
                <p className="text-gray-500 mb-4">
                  Không có kết quả nào phù hợp với bộ lọc của bạn. Vui lòng thử lại với các tiêu chí khác.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setActiveFilters({
                    categories: [],
                    experience: '',
                    jobLevel: '',
                    salary: '',
                    companyIndustry: '',
                    jobField: '',
                    workType: ''
                  })}
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
