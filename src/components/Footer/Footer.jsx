import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <div className="w-full bg-gray-100 py-8 border-t">
            <div className="container mx-auto flex justify-between items-start px-12">
                <div className="flex flex-col items-center w-1/4">
                    <div className="w-40 h-40 bg-white rounded-lg flex justify-center items-center shadow-md">
                        <img src="/src/assets/image/logoNoBg.png" alt="logo" className="w-28" />
                    </div>
                    <div className="flex mt-4 space-x-4">
                        <a href="#" className="text-red-500 text-2xl"><FaInstagram /></a>
                        <a href="#" className="text-blue-600 text-2xl"><FaFacebookF /></a>
                        <a href="#" className="text-blue-400 text-2xl"><FaTwitter /></a>
                    </div>
                </div>

                <div className="w-1/4">
                    <h1 className="font-bold text-lg">Về chúng tôi</h1>
                    <ul className="space-y-2 mt-3 text-gray-700">
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/templateCV">Tạo CV</a></li>
                        <li><a href="/tools">Cẩm nang việc làm</a></li>
                        <li><a href="/profile">Hồ sơ cá nhân</a></li>
                        <li><a href="/search">Tìm kiếm việc làm</a></li>
                    </ul>
                </div>

                <div className="w-1/4">
                    <h1 className="font-bold text-lg">Liên hệ</h1>
                    <p className="mt-3 flex items-center text-gray-700"><span className="text-green-500 mr-2">📍</span>Địa điểm: 97 Đ. Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh 70000</p>
                    <p className="mt-2 flex items-center text-gray-700"><FiPhone className="text-green-500 mr-2" /> Hotline: 0123456789</p>
                    <p className="mt-2 flex items-center text-gray-700"><MdEmail className="text-green-500 mr-2" /> Email: cvwebsite0@gmail.com</p>
                </div>

                <div className="w-1/4 h-[280px] flex items-center justify-center rounded-md">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.520072541659!2d106.78408977427243!3d10.847992257871153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1740382526819!5m2!1svi!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <div className="text-center text-gray-600 text-sm mt-6 border-t pt-4">
                Copyright © 2023 CV Company. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;


