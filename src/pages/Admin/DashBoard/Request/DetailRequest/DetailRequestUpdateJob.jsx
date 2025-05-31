import React, { useState } from "react";
import CompanyIntroduction from "./CompanyIntroduction";
import JobIntroduction from "./JobIntroduction";
import GeneralInformation from "./GeneralInformation";
import DetailJob from "./DetailJob";
import useCustomFetch from "../../../../../hooks/useCustomFetch";
import {
    fetchRecruitmentNewsDetailApi,
} from "../../../../../services/recruitmentNewsApi";
import { useParams } from "react-router-dom";

const isDifferent = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

// Hàm để tìm ra các thay đổi chi tiết
const getDetailedChanges = (newData, oldData) => {
    const changes = [];
    
    if (!newData || !oldData) return changes;
    
    // So sánh từng field
    Object.keys(newData).forEach(key => {
        if (JSON.stringify(newData[key]) !== JSON.stringify(oldData[key])) {
            // Nếu là object, so sánh chi tiết hơn
            if (typeof newData[key] === 'object' && newData[key] !== null && oldData[key] !== null) {
                Object.keys(newData[key]).forEach(subKey => {
                    if (JSON.stringify(newData[key][subKey]) !== JSON.stringify(oldData[key][subKey])) {
                        changes.push({
                            field: `${key}.${subKey}`,
                            oldValue: oldData[key][subKey],
                            newValue: newData[key][subKey]
                        });
                    }
                });
            } else {
                changes.push({
                    field: key,
                    oldValue: oldData[key],
                    newValue: newData[key]
                });
            }
        }
    });
    
    return changes;
};

// Component hiển thị tooltip với thay đổi chi tiết
const ChangeTooltip = ({ changes, visible, onMouseEnter, onMouseLeave }) => {
    if (!visible || !changes || changes.length === 0) return null;
    
    return (
        <div 
            className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-64 max-w-96 -top-2 right-full mr-2"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="font-semibold text-sm mb-2 text-gray-800">Chi tiết thay đổi:</div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {changes.map((change, index) => (
                    <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0">
                        <div className="font-medium text-xs text-gray-600 mb-1">
                            {change.field}
                        </div>
                        <div className="text-xs">
                            <div className="bg-red-50 p-1 rounded mb-1">
                                <span className="text-red-600 font-medium">Cũ: </span>
                                <span className="text-gray-700">
                                    {typeof change.oldValue === 'object' 
                                        ? JSON.stringify(change.oldValue, null, 2)
                                        : String(change.oldValue || 'Không có')}
                                </span>
                            </div>
                            <div className="bg-green-50 p-1 rounded">
                                <span className="text-green-600 font-medium">Mới: </span>
                                <span className="text-gray-700">
                                    {typeof change.newValue === 'object'
                                        ? JSON.stringify(change.newValue, null, 2)
                                        : String(change.newValue || 'Không có')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Highlight = ({ children, changed, newData = null, oldData = null }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const changes = changed && newData && oldData ? getDetailedChanges(newData, oldData) : [];

    const handleMouseEnter = () => {
        // Clear timeout nếu có
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        // Delay 1 giây trước khi ẩn tooltip
        const id = setTimeout(() => {
            setShowTooltip(false);
            setTimeoutId(null);
        }, 500);
        setTimeoutId(id);
    };

    return (
        <div className={`relative ${changed ? 'border-2 border-red-500 bg-red-50 rounded-lg p-2' : ''}`}>
            {children}
            {changed && (
                <div 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Thay đổi
                    <ChangeTooltip 
                        changes={changes} 
                        visible={showTooltip}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            )}
        </div>
    );
};

const JobSection = ({ data, title, compareWith = null }) => {
    const { company, general, introduce, detailRecruitment } = data;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
            <div className="flex justify-center bg-[#F5F5F5]">
                <div className="w-[80vw]">
                    <div className="flex justify-center gap-x-5 mt-10 mb-10">
                        <Highlight 
                            changed={compareWith && isDifferent(company, compareWith.company)}
                            newData={company}
                            oldData={compareWith?.company}
                        >
                            <CompanyIntroduction data={company} />
                        </Highlight>
                        <Highlight 
                            changed={compareWith && isDifferent(introduce, compareWith.introduce)}
                            newData={introduce}
                            oldData={compareWith?.introduce}
                        >
                            <JobIntroduction data={introduce} newsId={data.id} />
                        </Highlight>
                    </div>
                    <div className="flex justify-center gap-x-5 mb-10">
                        <div className="h-auto">
                            <Highlight 
                                changed={compareWith && isDifferent(general, compareWith.general)}
                                newData={general}
                                oldData={compareWith?.general}
                            >
                                <GeneralInformation
                                    data={general}
                                    degree={detailRecruitment?.degree || "Đại Học"}
                                />
                            </Highlight>
                        </div>
                        <Highlight 
                            changed={compareWith && isDifferent(detailRecruitment, compareWith.detailRecruitment)}
                            newData={detailRecruitment}
                            oldData={compareWith?.detailRecruitment}
                        >
                            <DetailJob data={detailRecruitment} />
                        </Highlight>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OldJobSection = ({ parentId, currentData }) => {
    const { data: oldData, loading } = useCustomFetch(
        fetchRecruitmentNewsDetailApi,
        [parentId]
    );

    if (loading) {
        return <div className="text-center py-4 text-gray-500">Đang tải phiên bản cũ...</div>;
    }

    if (!oldData) {
        return null;
    }

    return (
        <>
            <JobSection data={oldData} title="📄 Phiên bản cũ" />
            <div className="border-b-2 border-gray-300 mb-8"></div>
            <JobSection
                data={currentData}
                title="📄 Phiên bản mới (có thay đổi)"
                compareWith={oldData}
            />
            <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-lg">
                    <div className="w-4 h-4 border-2 border-red-500 bg-red-50 rounded"></div>
                    <span className="text-sm font-medium">Phần có thay đổi - Hover để xem chi tiết</span>
                </div>
            </div>
        </>
    );
};

export default function JobDescription() {
    const { newsId } = useParams();

    const { data: currentData, loading, error } = useCustomFetch(
        fetchRecruitmentNewsDetailApi,
        [newsId]
    );

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2">Đang tải...</p>
            </div>
        );
    }

    if (error || !currentData) {
        return (
            <div className="text-center py-8 text-red-500">
                Không thể tải thông tin việc làm
            </div>
        );
    }

    return (
        <div>
            {currentData.parentId ? (
                // Có parent ID -> show comparison
                <OldJobSection parentId={currentData.parentId} currentData={currentData} />
            ) : (
                // Không có parent ID -> show normal
                <JobSection data={currentData} title="📄 Thông tin việc làm" />
            )}
        </div>
    );
}