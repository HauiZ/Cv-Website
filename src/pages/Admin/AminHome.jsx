import { useState } from "react";
import Sidebar from "./SideMenu";
import Header from "./Header";
import OverViewContent from "./OverViewContent";
import RequestContent from "./RequestContent";
import MainContent from "./MainContent";
import HeaderProduct from "./HeaderProduct";

const AdminHome = () => {
  const [selectedPage, setSelectedPage] = useState("overview");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Truyền setSelectedPage để Header dùng */}
        <Header setSelectedPage={setSelectedPage} />
        {/* <HeaderProduct>
          
        </HeaderProduct> */}
        <main className="flex-1">
        <MainContent selectedPage={selectedPage} />
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
