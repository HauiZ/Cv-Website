import SearchBar from "../SearchBar";
import Dropdown from "./OverViewContent/DropdownLayout/DropDown";
const Header = ({ setSelectedPage }) => {
  const layoutDropdown = <Dropdown></Dropdown>
  return (
    <header className="bg-blue-500 text-white px-4 py-2 flex items-center justify-between shadow">
      {/* Nút điều hướng */}
      <div className="flex space-x-2">
        <button
          className="bg-white text-black rounded-full px-4 py-1 transition-all duration-300 hover:bg-blue-100 hover:scale-105"
          onClick={() => setSelectedPage("overview")}
        >
          Overview
        </button>
        <button
          className="relative bg-white text-black rounded-full px-4 py-1 transition-all duration-300 hover:bg-blue-100 hover:scale-105"
          onClick={() => setSelectedPage("request")}
        >
          Request
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            2
          </span>
        </button>
      </div>

      {/* Tìm kiếm + Thông báo */}
      <SearchBar contentDropdown={layoutDropdown}></SearchBar>
    </header>
  );
};

export default Header;
