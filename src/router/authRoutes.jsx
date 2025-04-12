import { lazy } from "react";

const LoginPersonal = lazy(() => import("../pages/Login/LoginPersonal"));
const LoginBusiness = lazy(() => import("../pages/Login/LoginBusiness"));
const SignUpPersonal = lazy(() => import("../pages/SignUp/SignUpPersonal"));
const SignUpBusiness = lazy(() => import("../pages/SignUp/SignUpBusiness"));


export const authRoutes = [
  { path: "/loginPersonal", element: <LoginPersonal /> },
  { path: "/loginBusiness", element: <LoginBusiness /> },
  { path: "/signUpPersonal", element: <SignUpPersonal /> },
  { path: "/signUpBusiness", element: <SignUpBusiness /> },
];
