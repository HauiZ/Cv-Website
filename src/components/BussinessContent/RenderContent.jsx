import { useState } from 'react';
import JobPostingForm from '../../pages/JobPosting/JobPostingForm';
import ProfileSettingPage from '../../pages/InfomationPage/BusinessInfomation/ProfileSettingPage';
import SecurityPage from '../../pages/InfomationPage/BusinessInfomation/SecurityPage';
import ApplicantLayout from '../../pages/CVManagement/ApplicantLayout';
import NewsManerment from "../../pages/NewsManerment/NewsManerment";
import { getApplicantApi, getApplicantForNewsApi } from "../../services/recruiterApi";
import DashBoard from "../../pages/DashBoardRecruiter/DashBoard"

export default function RenderContent({ activeTab }) {
    const [filterWithNews, setFilterWithNews] = useState(false);
    const [newsId, setNewsId] = useState(null);
    const funcApi = filterWithNews ? getApplicantForNewsApi : getApplicantApi;
    
    switch (activeTab) {
        case 'bang-tin':
            return <DashBoard />;
        case 'tin-tuyen-dung':
            return (
                <NewsManerment 
                    setFilterWithNews={setFilterWithNews} 
                    setNewsId={setNewsId}
                />
            );
        case 'dang-tin':
            return <JobPostingForm />;
        case 'cv-de-xuat':
            return (
                <div className='flex text-center text-green-400 justify-center font-bold text-4xl animate-pulse'>
                    COMING SOON
                </div>
            );
        case 'profile':
            return <ProfileSettingPage />;
        case 'quan-ly-cv':
            return <ApplicantLayout funcApi={funcApi} newsId={newsId}/>;
        case 'security':
            return <SecurityPage />;
        default:
            return <DashBoard />; // Default to dashboard instead of profile
    }
};

