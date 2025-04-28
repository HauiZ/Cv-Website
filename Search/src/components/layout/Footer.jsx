import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-wrap mb-8">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="mb-4">
              <Logo size="lg" />
            </div>
            <div className="flex">
              <div className="mr-2 rounded-full p-2 bg-[#00875a]/10">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzcuOTAyIDcyLjAwM0M0OS4zOCA3Mi4wMDMgNjcgNjUuNSA2Ny4wMDIgNDMuODc1QzY3LjAwMyAzMC4yNSA1Ni44MDMgMTkgNDMuOTUyIDE5QzMxLjEgMTkgMTkgMzEuNDk2IDE5IDQ3Ljc0OEMxOSA2My45OTkgMjYuNDI0IDcyLjAwMyAzNy45MDIgNzIuMDAzWiIgZmlsbD0iIzAwODc1YSIvPjxwYXRoIGQ9Ik04MS4wNTEgNzJDNzYuMzYgNzIgNjguMTEzIDcwLjA2MSA2Ni4wOTkgNTkuNDk5QzY0LjA4NSA0OC45MzYgNzQuMTE2IDQyLjE4NSA4MS4wNTEgNDIuMTg1Qzg3Ljk4NSA0Mi4xODUgOTYgNDcuODc2IDk2IDU3LjYyNEM5NiA2Ny4zNzIgODguODY4IDcyIDgxLjA1MSA3MloiIGZpbGw9IiMwMDg3NWEiLz48L3N2Zz4="
                  alt="CV Website Penguin Logo"
                  className="w-16 h-16"
                />
              </div>
              <div className="text-gray-700 text-sm flex flex-col justify-center">
                <p>CV Website</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-gray-900 font-medium mb-4">Về chúng tôi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#00875a]">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#00875a]">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-[#00875a]">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#00875a]">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-gray-900 font-medium mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-[#00875a] flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Địa điểm: 97 D. Mẵn Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh 70000
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-[#00875a] flex-shrink-0" />
                <span className="text-gray-600">Hotline: 0123456789</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-[#00875a] flex-shrink-0" />
                <span className="text-gray-600">Email: abc123@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <h4 className="text-gray-900 font-medium mb-4">Map</h4>
            <div className="bg-gray-100 h-32 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Map</span>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#00875a] hover:text-[#006d48]">
                <FaInstagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#00875a] hover:text-[#006d48]">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#00875a] hover:text-[#006d48]">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
          <p>Copyright © 2023 CV Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
