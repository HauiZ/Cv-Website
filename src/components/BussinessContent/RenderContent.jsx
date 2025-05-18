import { useState } from 'react';
import JobPostingForm from '../../pages/JobPosting/JobPostingForm';
import ProfileSettingPage from '../../pages/InfomationPage/BusinessInfomation/ProfileSettingPage';
import SecurityPage from '../../pages/InfomationPage/BusinessInfomation/SecurityPage';
import ApplicantLayout from '../../pages/CVManagement/ApplicantLayout';
import NewsManerment from "../../pages/NewsManerment/NewsManerment";
import { getApplicantApi, getApplicantForNewsApi } from "../../services/recruiterApi";
import DashBoard from "../../pages/DashBoardRecruiter/DashBoard"

export default function RenderContent({ contentKey }) {
    const [filterWithNews, setFilterWithNews] = useState(false);
    const [newsId, setNewsId] = useState(null);
    const funcApi = filterWithNews ? getApplicantForNewsApi : getApplicantApi;
    switch (contentKey) {
        case 'bang-tin':
            return (<DashBoard/>);
        case 'tin-tuyen-dung':
            return (<NewsManerment setFilterWithNews={setFilterWithNews} setNewsId={setNewsId}/>);
        case 'quan-ly-cv':
            return (<ApplicantLayout funcApi={funcApi} newsId={newsId}/>);
        case 'thong-bao':
            return (<div>Trang thông báo</div>);
        case 'trang-ca-nhan':
            return (<ProfileSettingPage />);
        default:
            return (<DashBoard />);
    }
};

