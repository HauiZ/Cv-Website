import { useState, useMemo, useEffect } from 'react';
import JobPostingForm from '../../pages/JobPosting/JobPostingForm';
import ProfileSettingPage from '../../pages/InfomationPage/BusinessInfomation/ProfileSettingPage';
import SecurityPage from '../../pages/InfomationPage/BusinessInfomation/SecurityPage';
import ApplicantLayout from '../../pages/CVManagement/ApplicantLayout';

export default function RenderContent({ activeTab }) {
    switch (activeTab) {
        case 'bang-tin':
            return (<div>bang tin 0</div>);
        case 'insights':
            return (<div>bang tin 1</div>);
        case 'tin-tuyen-dung':
            return (<div>bang tin 2</div>);
        case 'dang-tin':
            return (<JobPostingForm />);
        case 'cv-de-xuat':
            return (<div>bang tin 4</div>);
        case 'profile':
            return (<ProfileSettingPage />);
        case 'mail':
            return (<div>bang tin 7</div>);
        case 'quan-ly-cv':
            return (<ApplicantLayout />);
        case 'bao-cao':
            return (<div>bang tin 9</div>);
        case 'security':
            return (<SecurityPage />);
        default:
            return (<ProfileSettingPage />);
    }
};