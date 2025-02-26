import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

function Footer() {
    return <div>
        <div className="w-full h-[390px] bg-[#F5F5F5] relative">
            <div className="w-[700px] flex pl-10">
                <div className="pl-10 pt-3 flex-col">
                    <div className="flex gap-x-35">
                        <div className="w-[180px] h-[150px] bg-white rounded-2xl">
                            <img src="/src/image/logo.png" alt="logo" className="object-contain" />
                        </div>
                        <div className="w-[500px] flex gap-x-20 ">
                            <div>
                                <h1 className="font-bold text-1xl">Về chúng tôi</h1>
                                <ul className="space-y-2">
                                    <li className="pt-3"><a href="#">Giới thiệu</a></li>
                                    <li><a href="#">Tuyển dụng</a></li>
                                    <li><a href="#">Liên hệ</a></li>
                                    <li><a href="#">Hỏi đáp</a></li>
                                </ul>
                            </div>
                            <div>
                                <h1 className="font-bold text-1xl">Hồ sơ & CV</h1>
                                <ul className="space-y-2">
                                    <li className="pt-3"><a href="#">Giới thiệu</a></li>
                                    <li><a href="#">Tuyển dụng</a></li>
                                    <li><a href="#">Liên hệ</a></li>
                                    <li><a href="#">Hỏi đáp</a></li>
                                </ul>
                            </div>
                            <div>
                                <h1 className="font-bold text-1xl">Tin tức & sự kiện</h1>
                                <ul className="space-y-2">
                                    <li className="pt-3"><a href="#">Giới thiệu</a></li>
                                    <li><a href="#">Tuyển dụng</a></li>
                                    <li><a href="#">Liên hệ</a></li>
                                    <li><a href="#">Hỏi đáp</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold">Liên hệ</h3>
                    <FiPhone className="inline border-1 rounded-full p-[3px] m-1 text-2xl" /><span className="text-[#5DDA33]">Phone:</span><span>0123456789</span><br />
                    <MdEmail className="inline border-1 rounded-full p-[3px] m-1 text-2xl" /><span className="text-[#5DDA33]">Email:</span><span>info@example.com</span>
                    <h1 className="text-2xl font-bold">Công ty cổ phần CV </h1>
                    <h2 className="">Giấy phép kinh doanh số: 349287583245    Giấy phép hoạt động dịch vụ làm việc số: 093284238 <br />
                        Trụ sở HN:  96A Đ. Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội <br />
                        Trụ sở HCM:  97 Đ. Man Thiện, Hiệp Phú, Quận 9, Hồ Chí Minh 70000
                    </h2>
                </div>

                <div className="w-[500px] h-[350px] flex-col mr-10 absolute right-0 top-5 pt-10">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.520072541659!2d106.78408977427243!3d10.847992257871153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1740382526819!5m2!1svi!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            <div className="w-[full] h-[40px] bg-[#F5F5F5] flex justify-center items-center relative">
                <p className="text-center text-xs">Copyright © 2023 CV Company. All rights reserved.</p>
            </div>
        </div>
    </div>
};

export default Footer;