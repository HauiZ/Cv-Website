import { useState, useMemo, useEffect } from "react";
import JobPostingForm from "../../pages/JobPosting/JobPostingForm";
import ProfileSettingPage from "../../pages/InfomationPage/BusinessInfomation/ProfileSettingPage";
import NewsManerment from "../../pages/NewsManerment/NewsManerment";

export default function RenderContent({ activeTab }) {
  switch (activeTab) {
    case "bang-tin":
      return <div>bang tin 0</div>;
    case "insights":
      return <div>bang tin 1</div>;
    case "tin-tuyen-dung":
      return <NewsManerment />;
    case "dang-tin":
      return <JobPostingForm />;
    case "cv-de-xuat":
      return <div>bang tin 4</div>;
    case "profile":
      return <ProfileSettingPage />;
    case "mail":
      return <div>bang tin 7</div>;
    case "quan-ly-cv":
      return <div>bang tin 8</div>;
    case "bao-cao":
      return <div>bang tin 9</div>;
    case "security":
      return <div>bang tin 10</div>;
    default:
      return <ProfileSettingPage />;
  }
}
