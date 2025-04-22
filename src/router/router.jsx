import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomeLayout from "../layouts/HomeLayout";

// Pages
import Home from "../pages/home/Home";
import JobDescription from "../pages/JobDescription/JobDescription";
import ProfileCompany from "../pages/profileCompany/ProfileCompany";
import LoginPersonal from "../pages/Login/LoginPersonal";
import LoginBusiness from "../pages/Login/LoginBusiness";
import SignUpPersonal from "../pages/SignUp/SignUpPersonal";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import CreateCvPage from "../pages/CreateCv/CreateCvPage";
import AuthSuccess from "./AuthSuccess";
import Page404 from "../pages/Page404";

// Route nhóm
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";

// ✅ RequireAuth
import RequireAuth from "../components/RequireAuth";

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
    path: "/test",
    element: <CreateCvPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      ...authRoutes,
      ...adminRoutes,

      { path: "/login", element: <LoginPersonal /> },
      { path: "/SignUp", element: <SignUpPersonal /> },
      { path: "/ForgotPassword", element: <ForgotPassword /> },
      { path: "/authsuccess", element: <AuthSuccess /> },
      { path: "/B", element: <LoginBusiness /> },

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
