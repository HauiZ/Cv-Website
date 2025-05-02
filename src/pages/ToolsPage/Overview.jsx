import { ChevronDown, ChevronUp, CheckCircle, File, FileText, Briefcase, Award, Mail, Phone, User, Book, Clock, Target, Coffee, ArrowRight, Calendar, Download, MessageCircle, Clipboard, Star, BookOpen, Zap, Gift, PenTool } from 'lucide-react';
import { useState } from 'react';

export default function Overview() {
    const [showTip, setShowTip] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState('tim-viec');

    const toggleAccordion = (section) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Quy Trình Xin Việc Hiệu Quả</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                            <File className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Chuẩn Bị Hồ Sơ</h3>
                        <p className="text-gray-600">
                            Chuẩn bị CV, thư xin việc và các giấy tờ quan trọng khác một cách chuyên nghiệp.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                            <Briefcase className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Tìm Kiếm & Ứng Tuyển</h3>
                        <p className="text-gray-600">
                            Sử dụng các nền tảng tìm việc hiệu quả và ứng tuyển có chiến lược.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                            <User className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Phỏng Vấn & Thương Lượng</h3>
                        <p className="text-gray-600">
                            Chuẩn bị cho phỏng vấn và thương lượng lương một cách tự tin.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Tip Popup */}
            {showTip && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-xs z-20 animate-bounce">
                    <button onClick={() => setShowTip(false)} className="absolute top-2 right-2 text-white">✕</button>
                    <h4 className="font-bold mb-2">Mẹo Nhanh!</h4>
                    <p>Đừng quên cập nhật CV của bạn theo từng vị trí ứng tuyển để tăng cơ hội thành công!</p>
                </div>
            )}

            <div className="fixed bottom-0 left-4 z-10">
                <button
                    onClick={() => setShowTip(!showTip)}
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all"
                >
                    <Coffee size={24} />
                </button>
            </div>

            {/* Accordion Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-200">
                    <button
                        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-green-50 transition-colors"
                        onClick={() => toggleAccordion('tim-viec')}
                    >
                        <span className="font-medium text-lg">Cách Tìm Việc Làm Hiệu Quả</span>
                        {activeAccordion === 'tim-viec' ?
                            <ChevronUp className="text-green-600" size={20} /> :
                            <ChevronDown className="text-gray-400" size={20} />
                        }
                    </button>
                    {activeAccordion === 'tim-viec' && (
                        <div className="px-6 py-4 bg-green-50 animate-fadeIn">
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Sử dụng các trang web tìm việc uy tín như: VietnamWorks, TopCV, JobsGO</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Xây dựng hồ sơ LinkedIn chuyên nghiệp và kết nối với người trong ngành</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Tham gia các hội thảo, sự kiện tuyển dụng để mở rộng cơ hội</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Tận dụng mạng lưới quan hệ cá nhân cho giới thiệu việc làm</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="border-b border-gray-200">
                    <button
                        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-green-50 transition-colors"
                        onClick={() => toggleAccordion('ho-so')}
                    >
                        <span className="font-medium text-lg">Chuẩn Bị Hồ Sơ Xin Việc</span>
                        {activeAccordion === 'ho-so' ?
                            <ChevronUp className="text-green-600" size={20} /> :
                            <ChevronDown className="text-gray-400" size={20} />
                        }
                    </button>
                    {activeAccordion === 'ho-so' && (
                        <div className="px-6 py-4 bg-green-50 animate-fadeIn">
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>CV chuyên nghiệp, đầy đủ thông tin và phù hợp với vị trí ứng tuyển</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Thư xin việc nêu bật những điểm mạnh và sự phù hợp với công việc</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Bằng cấp, chứng chỉ và các giấy tờ liên quan đã được sắp xếp gọn gàng</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Portfolio hoặc tài liệu thể hiện năng lực chuyên môn (nếu có)</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-green-50 transition-colors"
                        onClick={() => toggleAccordion('phong-van')}
                    >
                        <span className="font-medium text-lg">Chuẩn Bị Cho Phỏng Vấn</span>
                        {activeAccordion === 'phong-van' ?
                            <ChevronUp className="text-green-600" size={20} /> :
                            <ChevronDown className="text-gray-400" size={20} />
                        }
                    </button>
                    {activeAccordion === 'phong-van' && (
                        <div className="px-6 py-4 bg-green-50 animate-fadeIn">
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Nghiên cứu kỹ về công ty và vị trí ứng tuyển</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Chuẩn bị câu trả lời cho các câu hỏi phỏng vấn phổ biến</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Chuẩn bị trang phục chỉn chu, phù hợp với văn hóa công ty</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span>Chuẩn bị câu hỏi thông minh để hỏi nhà tuyển dụng</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-green-600 mb-6">Lộ Trình Xin Việc</h2>
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 h-full w-1 bg-green-200"></div>

                    {/* Timeline Items */}
                    <div className="ml-20 space-y-10">
                        <div className="relative">
                            <div className="absolute -left-12 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">1</div>
                            <h3 className="text-lg font-bold text-green-700">Xác Định Mục Tiêu Nghề Nghiệp</h3>
                            <p className="text-gray-600 mt-1">Xác định rõ vị trí, ngành nghề và môi trường làm việc phù hợp với bản thân</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-12 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">2</div>
                            <h3 className="text-lg font-bold text-green-700">Chuẩn Bị Hồ Sơ Xin Việc</h3>
                            <p className="text-gray-600 mt-1">Xây dựng CV, thư xin việc và hồ sơ chuyên nghiệp phù hợp với từng vị trí</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-12 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">3</div>
                            <h3 className="text-lg font-bold text-green-700">Tìm Kiếm & Nộp Đơn Ứng Tuyển</h3>
                            <p className="text-gray-600 mt-1">Sử dụng đa dạng các kênh tìm việc và nộp đơn có chiến lược</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-12 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">4</div>
                            <h3 className="text-lg font-bold text-green-700">Chuẩn Bị & Tham Gia Phỏng Vấn</h3>
                            <p className="text-gray-600 mt-1">Nghiên cứu kỹ về công ty và chuẩn bị cho các vòng phỏng vấn</p>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-12 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">5</div>
                            <h3 className="text-lg font-bold text-green-700">Thương Lượng Điều Kiện Làm Việc</h3>
                            <p className="text-gray-600 mt-1">Đàm phán lương, phúc lợi và các điều kiện làm việc khác một cách chuyên nghiệp</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}