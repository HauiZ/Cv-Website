import { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';

const FilterSidebar = ({ onFilterChange, totalJobs, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    keyword: initialFilters.keyword || '',
    profession: initialFilters.profession || [],
    area: initialFilters.area || '',
    experience: initialFilters.experience || '',
    jobLevel: initialFilters.jobLevel || '',
    salaryMin: initialFilters.salaryMin || null,
    salaryMax: initialFilters.salaryMax || null,
    salaryRange: initialFilters.salaryRange || '',
    workType: initialFilters.workType || '',
    sortBy: initialFilters.sortBy || 'datePosted',
    order: initialFilters.order || 'DESC'
  });

  // Sync with parent component when initialFilters change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      keyword: initialFilters.keyword || prev.keyword ,
      profession: initialFilters.profession || prev.profession ,
      area: initialFilters.area || prev.area ,
      experience: initialFilters.experience || prev.experience ,
      jobLevel: initialFilters.jobLevel || prev.jobLevel ,
      salaryMin: initialFilters.salaryMin || prev.salaryMin ,
      salaryMax: initialFilters.salaryMax || prev.salaryMax ,
      salaryRange: initialFilters.salaryRange || prev.salaryRange ,
      workType: initialFilters.workType || prev.workType ,
      sortBy: initialFilters.sortBy || prev.sortBy,
      order: initialFilters.order || prev.order 
    }));
  }, [initialFilters]);

  const [expandedSections, setExpandedSections] = useState({
    profession: true,
    experience: true,
    jobLevel: true,
    salary: true,
    companyIndustry: true,
    workType: true
  });

  const handleProfessionChange = (profession) => {
    const updatedProfessions = filters.profession.includes(profession)
      ? filters.profession.filter(p => p !== profession)
      : [...filters.profession, profession];

    setFilters(prev => ({
      ...prev,
      profession: updatedProfessions
    }));
  };

  const handleRadioChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSalaryChange = (value) => {
    // Parse salary range and set salaryMin and salaryMax
    let salaryMin = null;
    let salaryMax = null;

    if (value === 'Dưới 10 triệu') {
      salaryMax = 10000000;
    } else if (value === '10-15 triệu') {
      salaryMin = 10000000;
      salaryMax = 15000000;
    } else if (value === '15-20 triệu') {
      salaryMin = 15000000;
      salaryMax = 20000000;
    } else if (value === '20-30 triệu') {
      salaryMin = 20000000;
      salaryMax = 30000000;
    } else if (value === '30-50 triệu') {
      salaryMin = 30000000;
      salaryMax = 50000000;
    } else if (value === 'Trên 50 triệu') {
      salaryMin = 50000000;
    }

    setFilters(prev => ({
      ...prev,
      salaryMin,
      salaryMax,
      salaryRange: value
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleResetFilters = () => {
    const resetFilters = {
      keyword: '',
      profession: [],
      area: '',
      experience: '',
      jobLevel: '',
      salaryMin: null,
      salaryMax: null,
      salaryRange: '',
      workType: '',
      companyIndustry: '',
      sortBy: 'datePosted',
      order: 'DESC'
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleApplyFilters = () => {
    // Preserve sort settings from the parent component
    const apiFilters = {
      ...filters,
      sortBy: initialFilters.sortBy || filters.sortBy,
      order: initialFilters.order || filters.order
    };

    // don't need to send salaryRange to the API
    if (apiFilters.salaryRange) {
      delete apiFilters.salaryRange;
    }

    onFilterChange(apiFilters);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg  border-gray-100 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium flex items-center text-gray-800">
          <Filter size={20} className="mr-1 text-green-600" />
          Lọc nâng cao
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-md text-green-600 hover:text-green-700 hover:underline transition-colors duration-200"
        >
          Xóa bộ lọc
        </button>
      </div>
      <div className="w-full bg-white p-4 rounded-lg shadow-md border border-gray-100 max-h-[80vh] overflow-y-auto">
        {/* Profession Filter */}
        <div className="filter-container mb-3">
          <button
            className="w-full flex items-center justify-between filter-heading p-2 bg-gray-50 rounded-md hover:bg-green-50 transition-colors duration-200 hover:text-green-700"
            onClick={() => toggleSection('profession')}
          >
            <span className="text-sm text-gray-700">Theo danh mục nghề</span>
            {expandedSections.profession ?
              <ChevronUp size={16} className="text-green-600" /> :
              <ChevronDown size={16} className="text-gray-500" />
            }
          </button>

          {expandedSections.profession && (
            <div className="mt-1 ml-1 h-fit pr-1">
              {[
                { title: "Công nghệ thông tin", keyword: "Công nghệ thông tin" },
                { title: "Kinh doanh - Bán hàng", keyword: "Thương mại điện tử, Kinh doanh, Sales" },
                { title: "Truyền hình - Viễn Thông", keyword: "Viễn thông, Ngân hàng" },
                { title: "Tài chính - Ngân hàng", keyword: "Ngân hàng" },
                { title: "Marketing - Quảng cáo", keyword: "Marketing, Quảng cáo" },
                { title: "Nhân sự - Hành chính", keyword: "Đầu tư đa ngành, hành chính, nhân sự" }
              ].map((itmes, index) => (
                <label key={index} className="flex items-center py-1 px-2 text-sm rounded hover:bg-green-50 cursor-pointer">
                  <div className="flex items-center">
                    {filters.profession.includes(itmes.keyword) ? (
                      <CheckCircle size={14} className="text-green-600" />
                    ) : (
                      <Circle size={14} className="text-gray-400" />
                    )}
                    <input
                      type="checkbox"
                      className="absolute opacity-0 w-0 h-0"
                      checked={filters.profession.includes(itmes.keyword)}
                      onChange={() => handleProfessionChange(itmes.keyword)}
                    />
                  </div>
                  <span className="ml-2 text-gray-700 hover:text-green-700">
                    {itmes.title} <span className="text-gray-400 text-xs">(50)</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Experience Filter */}
        <div className="filter-container mb-3">
          <button
            className="w-full flex items-center justify-between filter-heading p-2 bg-gray-50 rounded-md hover:bg-green-50 transition-colors duration-200 hover:text-green-700"
            onClick={() => toggleSection('experience')}
          >
            <span className="text-sm text-gray-700">Kinh nghiệm</span>
            {expandedSections.experience ?
              <ChevronUp size={16} className="text-green-600" /> :
              <ChevronDown size={16} className="text-gray-500" />
            }
          </button>

          {expandedSections.experience && (
            <div className="mt-1 ml-1">
              {['Tất cả', 'Không yêu cầu', '1 năm', '1-3 năm', '3-5 năm', 'Trên 5 năm'].map((exp) => (
                <label key={exp} className="flex items-center py-1 px-2 text-sm rounded hover:bg-green-50 cursor-pointer">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${filters.experience === exp ? 'border border-green-600 p-0.5' : 'border border-gray-300'}`}>
                      {filters.experience === exp && <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>}
                    </div>
                    <input
                      type="radio"
                      name="experience"
                      className="absolute opacity-0 w-0 h-0"
                      checked={filters.experience === exp}
                      onChange={() => handleRadioChange('experience', exp)}
                    />
                  </div>
                  <span className="ml-2 text-gray-700">{exp}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Job Level Filter */}
        <div className="filter-container mb-3">
          <button
            className="w-full flex items-center justify-between filter-heading p-2 bg-gray-50 rounded-md hover:bg-green-50 transition-colors duration-200 hover:text-green-700"
            onClick={() => toggleSection('jobLevel')}
          >
            <span className="text-sm text-gray-700">Cấp bậc</span>
            {expandedSections.jobLevel ?
              <ChevronUp size={16} className="text-green-600" /> :
              <ChevronDown size={16} className="text-gray-500" />
            }
          </button>

          {expandedSections.jobLevel && (
            <div className="mt-1 ml-1">
              {['Tất cả', 'Nhân viên', 'Trưởng nhóm', 'Quản lý / Giám sát', 'Trưởng chi nhánh', 'Giám đốc / Phó giám đốc', 'Thực tập sinh'].map((level) => (
                <label key={level} className="flex items-center py-1 px-2 text-sm rounded hover:bg-green-50 cursor-pointer">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${filters.jobLevel === level ? 'border border-green-600 p-0.5' : 'border border-gray-300'}`}>
                      {filters.jobLevel === level && <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>}
                    </div>
                    <input
                      type="radio"
                      name="jobLevel"
                      className="absolute opacity-0 w-0 h-0"
                      checked={filters.jobLevel === level}
                      onChange={() => handleRadioChange('jobLevel', level)}
                    />
                  </div>
                  <span className="ml-2 text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Salary Filter */}
        <div className="filter-container mb-3">
          <button
            className="w-full flex items-center justify-between filter-heading p-2 bg-gray-50 rounded-md hover:bg-green-50 transition-colors duration-200 hover:text-green-700"
            onClick={() => toggleSection('salary')}
          >
            <span className="text-sm text-gray-700">Mức lương</span>
            {expandedSections.salary ?
              <ChevronUp size={16} className="text-green-600" /> :
              <ChevronDown size={16} className="text-gray-500" />
            }
          </button>

          {expandedSections.salary && (
            <div className="mt-1 ml-1">
              {['Tất cả', 'Dưới 10 triệu', '10-15 triệu', '15-20 triệu', '20-30 triệu', '30-50 triệu', 'Trên 50 triệu', 'Thỏa thuận'].map((range) => (
                <label key={range} className="flex items-center py-1 px-2 text-sm rounded hover:bg-green-50 cursor-pointer">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${filters.salaryRange === range ? 'border border-green-600 p-0.5' : 'border border-gray-300'}`}>
                      {filters.salaryRange === range && <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>}
                    </div>
                    <input
                      type="radio"
                      name="salary"
                      className="absolute opacity-0 w-0 h-0"
                      checked={filters.salaryRange === range}
                      onChange={() => handleSalaryChange(range)}
                    />
                  </div>
                  <span className="ml-2 text-gray-700">{range}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Work Type Filter */}
        <div className="filter-container mb-3">
          <button
            className="w-full flex items-center justify-between filter-heading p-2 bg-gray-50 rounded-md hover:bg-green-50 transition-colors duration-200 hover:text-green-700"
            onClick={() => toggleSection('workType')}
          >
            <span className="text-sm text-gray-700">Hình thức làm việc</span>
            {expandedSections.workType ?
              <ChevronUp size={16} className="text-green-600" /> :
              <ChevronDown size={16} className="text-gray-500" />
            }
          </button>

          {expandedSections.workType && (
            <div className="mt-1 ml-1">
              {['Tất cả', 'Toàn thời gian', 'Bán thời gian', 'Thực tập', 'Khác'].map((type) => (
                <label key={type} className="flex items-center py-1 px-2 text-sm rounded hover:bg-green-50 cursor-pointer">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${filters.workType === type ? 'border border-green-600 p-0.5' : 'border border-gray-300'}`}>
                      {filters.workType === type && <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>}
                    </div>
                    <input
                      type="radio"
                      name="workType"
                      className="absolute opacity-0 w-0 h-0"
                      checked={filters.workType === type}
                      onChange={() => handleRadioChange('workType', type)}
                    />
                  </div>
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        className="w-full mt-4 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm shadow-sm flex items-center justify-center"
        onClick={handleApplyFilters}
      >
        Áp dụng bộ lọc
        <span className="inline-flex items-center justify-center bg-white text-green-700 rounded-full h-5 w-auto px-2 ml-2 text-xs font-medium">
          {totalJobs || 0}
        </span>
      </button>
    </div>
  );
};

export default FilterSidebar;