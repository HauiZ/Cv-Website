import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { User, Menu, X, LogOut, BookmarkIcon, FileEdit, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-[#00875a] font-medium">
            Việc làm
          </Link>
          <Link to="/cv" className="text-gray-700 hover:text-[#00875a] font-medium">
            Hồ sơ & CV
          </Link>
          <Link to="/tools" className="text-gray-700 hover:text-[#00875a] font-medium">
            Công cụ
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            <Link to="/employer" className="text-[#00875a]">Đăng tuyển ngay</Link> &raquo;
          </div>

          {user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-[#00875a] border border-[#00875a] rounded-full py-1 px-3 hover:bg-[#00875a]/5"
                onClick={toggleUserMenu}
              >
                <User size={18} />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                    Đăng nhập với {user.email}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Hồ sơ cá nhân
                  </Link>
                  <Link
                    to="/saved-jobs"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <BookmarkIcon size={16} className="mr-2" />
                    Việc làm đã lưu
                  </Link>
                  {user.role === 'jobseeker' ? (
                    <Link
                      to="/my-applications"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FileEdit size={16} className="mr-2" />
                      Đơn ứng tuyển
                    </Link>
                  ) : (
                    <Link
                      to="/employer-dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Building size={16} className="mr-2" />
                      Quản lý tuyển dụng
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut size={16} className="mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 text-[#00875a]">
              <User size={18} />
              <span>Đăng nhập</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 border-t border-gray-100">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className="text-gray-700 py-2 hover:text-[#00875a]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Việc làm
            </Link>
            <Link
              to="/cv"
              className="text-gray-700 py-2 hover:text-[#00875a]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hồ sơ & CV
            </Link>
            <Link
              to="/tools"
              className="text-gray-700 py-2 hover:text-[#00875a]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Công cụ
            </Link>
            <Link
              to="/employer"
              className="text-[#00875a] py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Đăng tuyển ngay
            </Link>

            <div className="border-t border-gray-100 pt-3">
              {user ? (
                <>
                  <div className="text-sm text-gray-500 mb-3">
                    Đăng nhập với {user.email}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Hồ sơ cá nhân
                  </Link>
                  <Link
                    to="/saved-jobs"
                    className="flex items-center py-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookmarkIcon size={16} className="mr-2" />
                    Việc làm đã lưu
                  </Link>
                  {user.role === 'jobseeker' ? (
                    <Link
                      to="/my-applications"
                      className="flex items-center py-2 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FileEdit size={16} className="mr-2" />
                      Đơn ứng tuyển
                    </Link>
                  ) : (
                    <Link
                      to="/employer-dashboard"
                      className="flex items-center py-2 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Building size={16} className="mr-2" />
                      Quản lý tuyển dụng
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center py-2 text-red-600 w-full text-left"
                  >
                    <LogOut size={16} className="mr-2" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-[#00875a]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} className="mr-1" />
                  <span>Đăng nhập</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
