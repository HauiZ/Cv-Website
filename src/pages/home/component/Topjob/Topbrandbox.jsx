import React, { useEffect, useState, useRef } from "react";
import { IoDiamond } from "react-icons/io5";
import useCustomFetch from "../../../../hooks/useCustomFetch";
import { fetchAllCompanyApi } from "../../../../services/recruiterApi";
import { useNavigate } from "react-router-dom";

const TopBrandbox = () => {
    const defaultLogo = "/src/assets/image/logoNoBg.png";
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    const {
        data,
        loading,
        error,
    } = useCustomFetch(fetchAllCompanyApi);

    // Đảm bảo companies luôn là một mảng
    const companies = Array.isArray(data) ? data : [];

    const [position, setPosition] = useState(0);
    const [itemWidth, setItemWidth] = useState(160); // Width + gap mặc định

    useEffect(() => {
        if (companies.length === 0) return;

        // Tính toán chiều rộng thực tế của một item
        if (trackRef.current && trackRef.current.children.length > 0) {
            const firstItem = trackRef.current.children[0];
            // Lấy chiều rộng thực tế của item + margin/gap
            const rect = firstItem.getBoundingClientRect();
            setItemWidth(rect.width + 40); // 40 là gap
        }
    }, [companies]);

    useEffect(() => {
        if (companies.length === 0 || !itemWidth) return;

        // Tốc độ di chuyển (giá trị càng nhỏ, di chuyển càng chậm)
        const speed = 0.4;
        let animationFrameId;
        let firstGroupWidth = companies.length * itemWidth;

        const animation = () => {
            setPosition((prevPos) => {
                // Khi đã cuộn hết nhóm đầu tiên, reset lại vị trí để tạo hiệu ứng cuộn vô hạn
                if (prevPos <= -firstGroupWidth) {
                    return 0;
                }
                return prevPos - speed;
            });
            animationFrameId = requestAnimationFrame(animation);
        };

        animationFrameId = requestAnimationFrame(animation);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [companies, itemWidth]);

    const getWaveY = (index, position) => {
        const amplitude = 12; // độ cao sóng
        const frequency = 0.06; // tần số dao động
        return Math.sin((position + index * 80) * frequency) * amplitude;
    };

    const handleCompanyClick = (companyId) => {
        navigate(`/companyProfile/${companyId}`);
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error || companies.length === 0) {
        return null; // Không hiển thị gì nếu có lỗi hoặc không có dữ liệu
    }

    // Tạo mảng kép để hiệu ứng cuộn vô hạn
    const duplicatedBrands = [...companies, ...companies];

    return (
        <div className="w-full overflow-hidden py-8" ref={containerRef}>
            <div className="relative">
                <div className="relative overflow-x-hidden" style={{ height: "200px" }}>
                    {/* Track di chuyển */}
                    <div
                        ref={trackRef}
                        className="flex gap-10 absolute"
                        style={{
                            transform: `translateX(${position}px)`,
                            willChange: "transform",
                            transition: "transform 0.05s linear"
                        }}
                    >
                        {duplicatedBrands.map((company, index) => (
                            <div
                                key={`${company.id}-${index}`}
                                className="border border-gray-200 w-[150px] min-w-[150px] h-[150px] relative rounded-full flex items-center justify-center 
                          hover:border-green-500 hover:bg-white hover:shadow-lg hover:shadow-green-200 transition-all duration-300 cursor-pointer"
                                onClick={() => handleCompanyClick(company.id)}
                                style={{
                                    transform: `translateY(${getWaveY(index, position)}px)`,
                                    transition: "transform 0.1s linear",
                                }}
                            >
                                <div className="z-10 absolute left-2 top-2">
                                    <IoDiamond className="text-green-500 size-6" />
                                </div>
                                <div className="z-10 absolute right-2 bottom-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    {company.name} 
                                </div>
                                <img
                                    src={company.logoUrl || defaultLogo}
                                    alt={company.name}
                                    className="w-[80%] h-[80%] object-contain rounded-lg"
                                    onError={(e) => { e.target.src = defaultLogo }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBrandbox;