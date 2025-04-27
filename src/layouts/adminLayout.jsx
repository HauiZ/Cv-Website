import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../pages/Admin/SideMenu";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}