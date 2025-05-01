import { lazy } from "react";
import AdminLayout from "../layouts/AdminLayout";
import RequireAuth from "../components/RequireAuth";

const AdminHome = lazy(() => import("../pages/Admin/DashBoard/AdminHome"));
const AdminProduct = lazy(() => import("../pages/Admin/Products/AdminProduct"));
const LoginAdmin = lazy(() => import("../pages/Login/LoginAdmin"));
const DetailRequest = lazy(() => import("../pages/Admin/DashBoard/Request/DetailRequest/DetailRequest"))
export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "/admin/products", element: <AdminProduct /> },
      { path: "/admin/job/:newsId", element: <DetailRequest /> },
    ],
  },
  {
    path: "/login/admin",
    element: <LoginAdmin />,
  },
];
