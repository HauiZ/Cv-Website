import { lazy } from "react";
import AdminLayout from "../layouts/AdminLayout";

const AdminHome = lazy(() => import("../pages/Admin/DashBoard/AdminHome"));
const AdminProduct = lazy(() => import("../pages/Admin/Products/AdminProduct"));
const LoginAdmin = lazy(() => import("../pages/Login/LoginAdmin"));

export const adminRoutes = [{
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminHome /> },
    { path: "/admin/products", element: <AdminProduct /> },
  ],
},
{
  path: "/login/admin",
  element: <LoginAdmin />,
}
];
