import { useState, useMemo, useEffect } from 'react';
import JobPostingForm from '../../pages/JobPosting/JobPostingForm';

export default function RenderContent({activeTab}) {
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
            return (<div>bang tin 6</div>);
        case 'mail':
            return (<div>bang tin 7</div>);
        case 'quan-ly-cv':
            return (<div>bang tin 8</div>);
        case 'bao-cao':
            return (<div>bang tin 9</div>);
        case 'security':
            return (<div>bang tin 10</div>);
        default:
            return <div>None</div>;
    }
};