import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/home/component/Header/Header";
import Header1 from "../pages/home/component/Header/Header1";
import Footer from "../pages/home/component/Footer/Footer";
export default function adminLayout() {
  return (
    <div className="pt-[75px]">
        <Header />
      <div className="">
        <Outlet />
      </div>
        <Footer />
    </div>
  );
}
