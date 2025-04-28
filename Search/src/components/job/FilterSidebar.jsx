import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar = ({ onFilterChange, totalJobs }) => {
  const [filters, setFilters] = useState({
    categories: [],
    experience: '',
    jobLevel: '',
    salary: '',
    companyIndustry: '',
    jobField: '',
    workType: ''
  });

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    experience: true,
    jobLevel: true,
    salary: true,
    companyIndustry: true,
    jobField: true,
    workType: true
  });

  // Toggle category selection
  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];

    const updatedFilters = {
      ...filters,
      categories: updatedCategories
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle radio button selection
  const handleRadioChange = (filterName, value) => {
    const updatedFilters = {
      ...filters,
      [filterName]: value
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle dropdown selection
  const handleSelectChange = (filterName, value) => {
    const updatedFilters = {
      ...filters,
      [filterName]: value
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      experience: '',
      jobLevel: '',
      salary: '',
      companyIndustry: '',
      jobField: '',
      workType: ''
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Apply all filters
  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <Filter size={20} className="mr-2" />
          Lọc nâng cao
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-sm text-[#00875a] hover:underline"
        >
          Xóa bộ lọc
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-container">
        <button
          className="w-full flex items-center justify-between filter-heading"
          onClick={() => toggleSection('categories')}
        >
          <span>Theo danh mục nghề</span>
          {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expandedSections.categories && (
          <div className="space-y-1 mt-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.categories.includes('Marketing')}
                onChange={() => handleCategoryChange('Marketing')}
              />
              Marketing <span className="text-gray-400">(2080)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.categories.includes('Kế toán')}
                onChange={() => handleCategoryChange('Kế toán')}
              />
              Kế toán <span className="text-gray-400">(1021)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.categories.includes('Kinh doanh/ Bán hàng')}
                onChange={() => handleCategoryChange('Kinh doanh/ Bán hàng')}
              />
              Kinh doanh/ Bán hàng <span className="text-gray-400">(2080)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.categories.includes('Quản lý dự án xây dựng')}
                onChange={() => handleCategoryChange('Quản lý dự án xây dựng')}
              />
              Quản lý dự án xây dựng <span className="text-gray-400">(1180)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters.categories.includes('Sales Bán lẻ')}
                onChange={() => handleCategoryChange('Sales Bán lẻ')}
              />
              Sales Bán lẻ <span className="text-gray-400">(800)</span>
            </label>
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="filter-container">
        <button
          className="w-full flex items-center justify-between filter-heading"
          onClick={() => toggleSection('experience')}
        >
          <span>Kinh nghiệm</span>
          {expandedSections.experience ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expandedSections.experience && (
          <div className="space-y-1 mt-2">
            <label className="radio-label">
              <input
                type="radio"
                name="experience"
                className="mr-2"
                checked={filters.experience === ''}
                onChange={() => handleRadioChange('experience', '')}
              />
              Tất cả
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="experience"
                className="mr-2"
                checked={filters.experience === 'Không yêu cầu'}
                onChange={() => handleRadioChange('experience', 'Không yêu cầu')}
              />
              Không yêu cầu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="experience"
                className="mr-2"
                checked={filters.experience === '1 năm'}
                onChange={() => handleRadioChange('experience', '1 năm')}
              />
              1 năm
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="experience"
                className="mr-2"
                checked={filters.experience === '1-3 năm'}
                onChange={() => handleRadioChange('experience', '1-3 năm')}
              />
              1-3 năm
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="experience"
                className="mr-2"
                checked={filters.experience === '3-5 năm'}
                onChange={() => handleRadioChange('experience', '3-5 năm')}
              />
              3-5 năm
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="experience"
                className="mr-2"
                checked={filters.experience === 'Trên 5 năm'}
                onChange={() => handleRadioChange('experience', 'Trên 5 năm')}
              />
              Trên 5 năm
            </label>
          </div>
        )}
      </div>

      {/* Job Level Filter */}
      <div className="filter-container">
        <button
          className="w-full flex items-center justify-between filter-heading"
          onClick={() => toggleSection('jobLevel')}
        >
          <span>Cấp bậc</span>
          {expandedSections.jobLevel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expandedSections.jobLevel && (
          <div className="space-y-1 mt-2">
            <label className="radio-label">
              <input
                type="radio"
                name="jobLevel"
                className="mr-2"
                checked={filters.jobLevel === ''}
                onChange={() => handleRadioChange('jobLevel', '')}
              />
              Tất cả
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="jobLevel"
                className="mr-2"
                checked={filters.jobLevel === 'Nhân viên'}
                onChange={() => handleRadioChange('jobLevel', 'Nhân viên')}
              />
              Nhân viên
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="jobLevel"
                className="mr-2"
                checked={filters.jobLevel === 'Trưởng nhóm'}
                onChange={() => handleRadioChange('jobLevel', 'Trưởng nhóm')}
              />
              Trưởng nhóm
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="jobLevel"
                className="mr-2"
                checked={filters.jobLevel === 'Quản lý / Giám sát'}
                onChange={() => handleRadioChange('jobLevel', 'Quản lý / Giám sát')}
              />
              Quản lý / Giám sát
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="jobLevel"
                className="mr-2"
                checked={filters.jobLevel === 'Trưởng chi nhánh'}
                onChange={() => handleRadioChange('jobLevel', 'Trưởng chi nhánh')}
              />
              Trưởng chi nhánh
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="jobLevel"
                className="mr-2"
                checked={filters.jobLevel === 'Giám đốc / Phó giám đốc'}
                onChange={() => handleRadioChange('jobLevel', 'Giám đốc / Phó giám đốc')}
              />
              Giám đốc / Phó giám đốc
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="jobLevel"
                className="mr-2"
                checked={filters.jobLevel === 'Thực tập sinh'}
                onChange={() => handleRadioChange('jobLevel', 'Thực tập sinh')}
              />
              Thực tập sinh
            </label>
          </div>
        )}
      </div>

      {/* Salary Filter */}
      <div className="filter-container">
        <button
          className="w-full flex items-center justify-between filter-heading"
          onClick={() => toggleSection('salary')}
        >
          <span>Mức lương</span>
          {expandedSections.salary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expandedSections.salary && (
          <div className="space-y-1 mt-2">
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === ''}
                onChange={() => handleRadioChange('salary', '')}
              />
              Tất cả
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === 'Dưới 10 triệu'}
                onChange={() => handleRadioChange('salary', 'Dưới 10 triệu')}
              />
              Dưới 10 triệu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === '10-15 triệu'}
                onChange={() => handleRadioChange('salary', '10-15 triệu')}
              />
              10-15 triệu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === '15-20 triệu'}
                onChange={() => handleRadioChange('salary', '15-20 triệu')}
              />
              15-20 triệu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === '20-30 triệu'}
                onChange={() => handleRadioChange('salary', '20-30 triệu')}
              />
              20-30 triệu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === '30-50 triệu'}
                onChange={() => handleRadioChange('salary', '30-50 triệu')}
              />
              30-50 triệu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === 'Trên 50 triệu'}
                onChange={() => handleRadioChange('salary', 'Trên 50 triệu')}
              />
              Trên 50 triệu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="salary"
                className="mr-2"
                checked={filters.salary === 'Thỏa thuận'}
                onChange={() => handleRadioChange('salary', 'Thỏa thuận')}
              />
              Thỏa thuận
            </label>
          </div>
        )}
      </div>

      {/* Work Area Filter */}
      <div className="filter-container">
        <button
          className="w-full flex items-center justify-between filter-heading"
          onClick={() => toggleSection('companyIndustry')}
        >
          <span>Lĩnh vực công ty</span>
          {expandedSections.companyIndustry ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expandedSections.companyIndustry && (
          <select
            className="search-input mt-2"
            value={filters.companyIndustry}
            onChange={(e) => handleSelectChange('companyIndustry', e.target.value)}
          >
            <option value="">Tất cả lĩnh vực</option>
            <option value="IT">Công nghệ thông tin</option>
            <option value="Finance">Tài chính / Ngân hàng</option>
            <option value="Education">Giáo dục / Đào tạo</option>
            <option value="Retail">Bán lẻ / Bán buôn</option>
          </select>
        )}
      </div>

      {/* Work Type Filter */}
      <div className="filter-container">
        <button
          className="w-full flex items-center justify-between filter-heading"
          onClick={() => toggleSection('jobField')}
        >
          <span>Lĩnh vực công việc</span>
          {expandedSections.jobField ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expandedSections.jobField && (
          <select
            className="search-input mt-2"
            value={filters.jobField}
            onChange={(e) => handleSelectChange('jobField', e.target.value)}
          >
            <option value="">Tất cả lĩnh vực</option>
            <option value="Developer">Lập trình viên</option>
            <option value="Accounting">Kế toán / Kiểm toán</option>
            <option value="Marketing">Marketing / Truyền thông</option>
            <option value="CustomerService">Dịch vụ khách hàng</option>
          </select>
        )}
      </div>

      {/* Work Type Filter */}
      <div className="filter-container">
        <button
          className="w-full flex items-center justify-between filter-heading"
          onClick={() => toggleSection('workType')}
        >
          <span>Hình thức làm việc</span>
          {expandedSections.workType ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expandedSections.workType && (
          <div className="space-y-1 mt-2">
            <label className="radio-label">
              <input
                type="radio"
                name="workType"
                className="mr-2"
                checked={filters.workType === ''}
                onChange={() => handleRadioChange('workType', '')}
              />
              Tất cả
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="workType"
                className="mr-2"
                checked={filters.workType === 'Toàn thời gian'}
                onChange={() => handleRadioChange('workType', 'Toàn thời gian')}
              />
              Toàn thời gian
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="workType"
                className="mr-2"
                checked={filters.workType === 'Bán thời gian'}
                onChange={() => handleRadioChange('workType', 'Bán thời gian')}
              />
              Bán thời gian
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="workType"
                className="mr-2"
                checked={filters.workType === 'Thực tập'}
                onChange={() => handleRadioChange('workType', 'Thực tập')}
              />
              Thực tập
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="workType"
                className="mr-2"
                checked={filters.workType === 'Khác'}
                onChange={() => handleRadioChange('workType', 'Khác')}
              />
              Khác
            </label>
          </div>
        )}
      </div>

      <button className="btn-primary w-full mt-4" onClick={handleApplyFilters}>
        Áp dụng bộ lọc ({totalJobs})
      </button>
    </div>
  );
};

export default FilterSidebar;
