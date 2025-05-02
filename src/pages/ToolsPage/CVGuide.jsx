import { ChevronDown, ChevronUp, CheckCircle, File, FileText, Briefcase, Award, Mail, Phone, User, Book, Clock, Target, Coffee, ArrowRight, Calendar, Download, MessageCircle, Clipboard, Star, BookOpen, Zap, Gift, PenTool } from 'lucide-react';

export default function CVGuide () {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Cách Viết CV Chuyên Nghiệp</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center">
                            <FileText className="text-green-500 mr-2" size={20} />
                            Cấu Trúc CV Chuẩn
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</div>
                                <div>
                                    <span className="font-medium">Thông tin cá nhân</span>: Họ tên, số điện thoại, email, địa chỉ (tùy chọn), link LinkedIn
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</div>
                                <div>
                                    <span className="font-medium">Mục tiêu nghề nghiệp</span>: Ngắn gọn, cụ thể và phù hợp với vị trí ứng tuyển
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</div>
                                <div>
                                    <span className="font-medium">Kinh nghiệm làm việc</span>: Liệt kê theo thứ tự thời gian từ gần nhất, nêu rõ thành tựu
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">4</div>
                                <div>
                                    <span className="font-medium">Học vấn</span>: Trường, ngành học, thời gian, bằng cấp, thành tích học tập
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">5</div>
                                <div>
                                    <span className="font-medium">Kỹ năng</span>: Chuyên môn và kỹ năng mềm phù hợp với công việc
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">6</div>
                                <div>
                                    <span className="font-medium">Chứng chỉ & Giải thưởng</span>: Các chứng chỉ nghề nghiệp, thành tích nổi bật
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center">
                            <Award className="text-green-500 mr-2" size={20} />
                            Bí Quyết CV Nổi Bật
                        </h3>
                        <div className="bg-green-50 p-4 rounded-lg mb-4 transition-transform hover:scale-105 duration-300">
                            <h4 className="font-medium text-green-700 mb-2">1. Cá nhân hóa cho từng vị trí</h4>
                            <p className="text-gray-600">Điều chỉnh CV để phù hợp với yêu cầu công việc cụ thể. Nhấn mạnh những kỹ năng và kinh nghiệm liên quan.</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg mb-4 transition-transform hover:scale-105 duration-300">
                            <h4 className="font-medium text-green-700 mb-2">2. Sử dụng từ khóa đúng</h4>
                            <p className="text-gray-600">Đưa từ khóa quan trọng từ mô tả công việc vào CV để vượt qua hệ thống lọc hồ sơ tự động (ATS).</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg transition-transform hover:scale-105 duration-300">
                            <h4 className="font-medium text-green-700 mb-2">3. Định lượng thành tựu</h4>
                            <p className="text-gray-600">Sử dụng số liệu và con số cụ thể để thể hiện thành tựu (VD: "Tăng doanh số 30% trong 6 tháng").</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-3">Những lỗi cần tránh trong CV</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start bg-green-700 bg-opacity-30 p-3 rounded">
                            <span className="font-bold text-2xl mr-2">✗</span>
                            <p>Lỗi chính tả và ngữ pháp</p>
                        </div>
                        <div className="flex items-start bg-green-700 bg-opacity-30 p-3 rounded">
                            <span className="font-bold text-2xl mr-2">✗</span>
                            <p>CV quá dài (nên giới hạn 1-2 trang)</p>
                        </div>
                        <div className="flex items-start bg-green-700 bg-opacity-30 p-3 rounded">
                            <span className="font-bold text-2xl mr-2">✗</span>
                            <p>Thông tin không liên quan đến công việc</p>
                        </div>
                        <div className="flex items-start bg-green-700 bg-opacity-30 p-3 rounded">
                            <span className="font-bold text-2xl mr-2">✗</span>
                            <p>Sử dụng email không chuyên nghiệp</p>
                        </div>
                        <div className="flex items-start bg-green-700 bg-opacity-30 p-3 rounded">
                            <span className="font-bold text-2xl mr-2">✗</span>
                            <p>Thiếu thông tin liên hệ quan trọng</p>
                        </div>
                        <div className="flex items-start bg-green-700 bg-opacity-30 p-3 rounded">
                            <span className="font-bold text-2xl mr-2">✗</span>
                            <p>Định dạng không nhất quán</p>
                        </div>
                    </div>
                </div>

                {/* CV Templates */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                        <Download className="mr-2" size={20} />
                        Mẫu CV Chuyên Nghiệp
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow transition-transform hover:shadow-lg hover:scale-105">
                            <div className="h-48 bg-green-100 flex items-center justify-center">
                                <img src="/api/placeholder/210/297" alt="CV Template 1" className="h-full object-contain" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium">CV Cơ Bản</h4>
                                <p className="text-sm text-gray-500">Mẫu đơn giản, rõ ràng cho mọi vị trí</p>
                                <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                    Tải về
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow transition-transform hover:shadow-lg hover:scale-105">
                            <div className="h-48 bg-green-100 flex items-center justify-center">
                                <img src="/api/placeholder/210/297" alt="CV Template 2" className="h-full object-contain" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium">CV Sáng Tạo</h4>
                                <p className="text-sm text-gray-500">Phù hợp với ngành thiết kế, marketing</p>
                                <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                    Tải về
                                </button>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow transition-transform hover:shadow-lg hover:scale-105">
                            <div className="h-48 bg-green-100 flex items-center justify-center">
                                <img src="/api/placeholder/210/297" alt="CV Template 3" className="h-full object-contain" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium">CV Chuyên Nghiệp</h4>
                                <p className="text-sm text-gray-500">Dành cho vị trí quản lý, chuyên gia</p>
                                <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                    Tải về
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}