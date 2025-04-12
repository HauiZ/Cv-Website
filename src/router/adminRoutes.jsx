import { lazy } from "react";
import AdminLayout from "../layouts/adminLayout";

const AdminHome = lazy(() => import("../pages/Admin/DashBoard/AdminHome"));
const AdminProduct = lazy(() => import("../pages/Admin/Products/AdminProduct"));

export const adminRoutes = [{
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminHome /> },
    { path: "/admin/products", element: <AdminProduct /> },
  ],
},
];
