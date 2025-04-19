import { lazy } from "react";

const LoginPersonal = lazy(() => import("../pages/Login/LoginPersonal"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const LoginBusiness = lazy(() => import("../pages/Login/LoginBusiness"));
const SignUpPersonal = lazy(() => import("../pages/SignUp/SignUpPersonal"));
const SignUpBusiness = lazy(() => import("../pages/SignUp/SignUpBusiness"));


export const authRoutes = [
  { path: "/loginPersonal", element: <LoginPersonal /> },
  { path: "/loginBusiness", element: <LoginBusiness /> },
  { path: "/signUpPersonal", element: <SignUpPersonal /> },
  { path: "/signUpBusiness", element: <SignUpBusiness /> },
  { path: "/forgotPassword", element: <ForgotPassword />},
  { path: "/signUpBusiness", element: <SignUpBusiness /> },
];
