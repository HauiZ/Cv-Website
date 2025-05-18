import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomeLayout from "../layouts/HomeLayout";
import BusinessLayout from "../layouts/BusinessLayOut";

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
import EditJob from "../pages/NewsManerment/EditJob";
import RenderContent from "../components/BussinessContent/RenderContent"; // Fixed import path

// Route nhóm
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";

// ✅ RequireAuth
import RequireAuth from "../components/RequireAuth";
import ApplicationManerment from "../pages/ApplicationManerment/ApplicationManerment";

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
        path: "recruiter",
        element: (
          <RequireAuth>
            <BusinessLayout />
          </RequireAuth>
        ),
        children: [
          { 
            index: true,  // This will match exact /recruiter path
            element: <RenderContent contentKey="bang-tin" /> 
          },
          { 
            path: "tin-tuyen-dung", 
            element: <RenderContent contentKey="tin-tuyen-dung" /> 
          },
          { 
            path: "quan-ly-cv", 
            element: <RenderContent contentKey="quan-ly-cv" /> 
          },
          { 
            path: "thong-bao", 
            element: <RenderContent contentKey="thong-bao" /> 
          },
          { 
            path: "trang-ca-nhan", 
            element: <RenderContent contentKey="trang-ca-nhan" /> 
          },
          { 
            path: "edit-job", 
            element: <EditJob /> 
          }
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
