// src/layouts/adminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Header1 from "../components/Header/Header1";
import Footer from "../components/Footer/Footer";
import { useAuthContext } from "../contexts/AuthContext";

export default function AdminLayout() {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <div className="pt-[75px]">
      {/* Nếu đã đăng nhập (có user), dùng Header1 có avatar/menu, ngược lại dùng Header mặc định */}
      {isAuthenticated && user ? <Header1 /> : <Header />}

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
