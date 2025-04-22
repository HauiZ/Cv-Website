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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Wrapper cho toàn bộ app (gồm loader + scroll)
    children: [
      ...authRoutes,
      ...adminRoutes,

      {
        path: "/login",
        element: <LoginPersonal />,
      },
      {
        path: "/SignUp",
        element: <SignUpPersonal />,
      },
      {
        path: "/ForgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/authsuccess",
        element: <AuthSuccess />,
      },
      {
        path: "/B",
        element: <LoginBusiness />,
      },
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/job/:jobId", element: <JobDescription /> },
          { path: "/companyprofile/:companyId", element: <ProfileCompany /> },
          { path: "/test", element: <CreateCvPage /> },
        ],
      },
      {
        path: "*",
        element:<Page404/>,
      },
    ],
  },
]);

export default router;
