import { lazy } from "react";

const LoginPersonal = lazy(() => import("../pages/Login/LoginPersonal"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const InputNewPassword = lazy(() => import("../pages/ForgotPassword/InputNewPassword"));
const LoginBusiness = lazy(() => import("../pages/Login/LoginBusiness"));
const SignUpPersonal = lazy(() => import("../pages/SignUp/SignUpPersonal"));
const SignUpBusiness = lazy(() => import("../pages/SignUp/SignUpBusiness"));


export const authRoutes = [
  { path: "/login/candidate", element: <LoginPersonal /> },
  { path: "/login/recruiter", element: <LoginBusiness /> },
  { path: "/signup/candidate", element: <SignUpPersonal /> },
  { path: "/signup/recruiter", element: <SignUpBusiness /> },
  { path: "/forgotPassword/:role", element: <ForgotPassword />},
  { path: "/InputNewPassword/:role", element: <InputNewPassword />},
  { path: "/signup/recruiter", element: <SignUpBusiness /> },
];
