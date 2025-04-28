import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [jobCategory, setJobCategory] = useState('');
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Combine search terms
    const searchTerms = [keyword];

    if (jobCategory) {
      searchTerms.push(jobCategory);
    }

    if (location) {
      searchTerms.push(location);
    }

    onSearch(searchTerms.join(' '));
  };

  return (
    <div className="bg-[#007a51] py-6">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <button
              type="button"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 px-2 py-1 rounded-md"
            >
              Danh mục nghề
            </button>
            <select
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              className="pl-[140px] pr-3 py-3 w-full rounded-md border-none focus:ring-2 focus:ring-[#00875a]"
            >
              <option value="">Tất cả danh mục</option>
              <option value="Marketing">Marketing (2080)</option>
              <option value="Kế toán">Kế toán (1021)</option>
              <option value="Kinh doanh/ Bán hàng">Kinh doanh/ Bán hàng (2080)</option>
              <option value="Quản lý dự án xây dựng">Quản lý dự án xây dựng (1180)</option>
              <option value="Sales Bán lẻ">Sales Bán lẻ (800)</option>
            </select>
          </div>

          <div className="relative flex-1">
            <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Địa điểm"
              className="pl-10 pr-3 py-3 w-full rounded-md border-none focus:ring-2 focus:ring-[#00875a]"
            />
          </div>

          <div className="relative flex-1 hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Từ khóa tìm kiếm (chức danh, kỹ năng...)"
              className="pl-10 pr-3 py-3 w-full rounded-md border-none focus:ring-2 focus:ring-[#00875a]"
            />
          </div>

          <button type="submit" className="bg-[#00c07f] text-white px-6 py-3 rounded-md hover:bg-[#00a86f] transition-colors flex items-center justify-center">
            <Search size={20} className="mr-2" />
            Tìm kiếm
          </button>
        </form>

        {/* Mobile keyword search */}
        <div className="relative mt-2 md:hidden">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Từ khóa tìm kiếm (chức danh, kỹ năng...)"
            className="pl-10 pr-3 py-3 w-full rounded-md border-none focus:ring-2 focus:ring-[#00875a]"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
