import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomeLayout from "../layouts/HomeLayout";

// Pages
import Home from "../pages/home/Home";
import JobDescription from "../pages/JobDescription/JobDescription";
import ProfileCompany from "../pages/profileCompany/ProfileCompany";
import CreateCvPage from "../pages/CreateCv/CreateCvPage";
import AuthSuccess from "./AuthSuccess";
import Page404 from "../pages/ErrorPages/Page404";
import Page500 from "../pages/ErrorPages/Page500";
import ChangePassPage from "../pages/InfomationPage/ChangePassPage";
import ChangeProfilePage from "../pages/InfomationPage/ChangeProfilePage";
import SearchPage from "../pages/Search/SearchPage";
import TemplateCV from "../pages/TemplateCV/TemplateCV";
import ToolFormat from "../pages/ToolsPage/ToolFormat";
import DashBoard from "../pages/DashBoardRecruiter/DashBoard";
import NewsManerment from "../pages/NewsManerment/NewsManerment";
import JobPostingForm from "../pages/JobPosting/JobPostingForm";
import EditJob from "../pages/NewsManerment/EditJob";
import ProfileSettingPage from "../pages/InfomationPage/BusinessInfomation/ProfileSettingPage";
import SecurityPage from "../pages/InfomationPage/BusinessInfomation/SecurityPage";
import ApplicantLayout from "../pages/CVManagement/ApplicantLayout";

// Route nhóm
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";

// ✅ RequireAuth
import RequireAuth from "../components/RequireAuth";
import ApplicationManerment from "../pages/ApplicationManerment/ApplicationManerment";
import BusinessLayout from "../layouts/BusinessLayout";
import { getApplicantApi } from "../services/recruiterApi";

// ✅ Các route cần đăng nhập trong HomeLayout
const protectedRoutes = [
  {
    path: "/job/:jobId",
    element: <JobDescription />,
  },
  {
    path: "/companyprofile/:companyId",
    element: <ProfileCompany />,
  },
  {
    path: "/createCV",
    element: <CreateCvPage />,
  },
  {
    path: "/change-Password",
    element: <ChangePassPage />,
  },
  {
    path: "/profile",
    element: <ChangeProfilePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/templateCV",
    element: <TemplateCV />,
  },
  { path: "/candidate-application", element: <ApplicationManerment /> },
  { path: "/tools", element: <ToolFormat /> }
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Page500 />,
    children: [
      ...authRoutes,
      ...adminRoutes,      {
        path: "/recruiter",
        element: (
          <RequireAuth>
            <BusinessLayout />
          </RequireAuth>
        ),        children: [
          { path: "bang-tin", element: <DashBoard /> },
          { 
            path: "tin-tuyen-dung",
            children: [
              { index: true, element: <NewsManerment /> },
              { path: "edit", element: <EditJob /> }
            ]
          },
          { path: "dang-tin", element: <JobPostingForm /> },
          { path: "cv-de-xuat", element: <div className='flex text-center text-green-400 justify-center font-bold text-4xl animate-pulse'>COMING SOON</div> },
          { path: "quan-ly-cv/:newsId", element: <ApplicantLayout funcApi={getApplicantApi} /> },
          { path: "profile", element: <ProfileSettingPage /> },
          { path: "security", element: <SecurityPage /> },
          { path: "", element: <DashBoard /> }, // Default route
        ],
      },

      { path: "/authsuccess", element: <AuthSuccess /> },
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          // ✅ Cho phép truy cập Home không cần đăng nhập
          { path: "/", element: <Home /> },

          // ✅ Các route cần đăng nhập
          ...protectedRoutes.map((route) => ({
            ...route,
            element: <RequireAuth>{route.element}</RequireAuth>,
          })),
        ],
      },

      { path: "*", element: <Page404 /> },
    ],
  },
]);

export default router;
