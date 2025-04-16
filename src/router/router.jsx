import SignUpPersonal from "../pages/SignUp/SignUpPersonal";
import LoginPersonal from "../pages/Login/LoginPersonal";
import LoginBusiness from "../pages/Login/LoginBusiness";
import SignUpBusiness from "../pages/SignUp/SignUpBusiness";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import InputNewPassword from "../pages/ForgotPassword/InputNewPassword";
import AdminHome from "../pages/Admin/DashBoard/AdminHome";
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout";
import { adminRoutes } from "./adminRoutes";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import ProfileCompany from "../pages/profileCompany/ProfileCompany";
import Test from "../pages/Test";

const router = createBrowserRouter([
  ...adminRoutes,
  {
    path: "/login",
    element: <LoginPersonal />,
    errorElement: <div>404 ERROR</div>,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profilecompany", element: <ProfileCompany /> },
      { path: "/Test1", element: <Test/> },
    ],
  },
  {
    path: "/B",
    element: <LoginBusiness />,
  },
  {
    path: "/Home",
    element: <Home />,
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
    path: "/test",
    element: <HomeLayout />,
    children: [
      {
        path: "/test",
        element: <ProfileCompany />,
      },
    ],
  },
]);

export default router;
