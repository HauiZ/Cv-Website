import { useState } from "react";
import MainContent from "../DashBoard/MainContent";
import HeaderProduct from "./HeaderProduct";

const AdminHome = () => {
  const [selectedPage, setSelectedPage] = useState("overview");

  return (
    // <div className="">
      <div className="flex-1 flex flex-col">
        {/* Truyền setSelectedPage để Header dùng */}
        <HeaderProduct setSelectedPage={setSelectedPage} />
        {/* <HeaderProduct>
          
        </HeaderProduct> */}
        <main className="flex-1">
        <MainContent selectedPage={selectedPage} />
        </main>
      </div>
    // </div>
  );
};

export default AdminHome;
