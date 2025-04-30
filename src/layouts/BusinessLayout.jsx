// src/layouts/adminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Header1 from "../components/Header/Header1";
import Footer from "../components/Footer/Footer";
import { useAuthContext } from "../contexts/AuthContext";

export default function BusinessLayout() {
  return (
    <div className="pt-[75px]">
      <Header></Header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
