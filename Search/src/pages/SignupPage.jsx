import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Check, AlertCircle, Briefcase, UserCircle } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    try {
      setLoading(true);
      await signup(name, email, password, role);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 flex items-center">
            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Họ và tên
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00875a]"
                placeholder="Nhập họ và tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00875a]"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00875a]"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00875a]"
                placeholder="Nhập lại mật khẩu của bạn"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Bạn là
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`flex items-center justify-center gap-2 p-3 border rounded-md ${
                  role === 'jobseeker'
                    ? 'border-[#00875a] bg-[#00875a]/5 text-[#00875a]'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setRole('jobseeker')}
                disabled={loading}
              >
                <UserCircle size={20} />
                <span>Người tìm việc</span>
                {role === 'jobseeker' && <Check size={16} className="ml-1" />}
              </button>
              <button
                type="button"
                className={`flex items-center justify-center gap-2 p-3 border rounded-md ${
                  role === 'employer'
                    ? 'border-[#00875a] bg-[#00875a]/5 text-[#00875a]'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setRole('employer')}
                disabled={loading}
              >
                <Briefcase size={20} />
                <span>Nhà tuyển dụng</span>
                {role === 'employer' && <Check size={16} className="ml-1" />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-[#00875a] focus:ring-[#00875a] border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Tôi đồng ý với{' '}
                <Link to="/terms" className="text-[#00875a] hover:underline">
                  Điều khoản
                </Link>{' '}
                và{' '}
                <Link to="/privacy" className="text-[#00875a] hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00875a] text-white py-2 px-4 rounded-md hover:bg-[#006d48] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00875a] focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-[#00875a] hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
