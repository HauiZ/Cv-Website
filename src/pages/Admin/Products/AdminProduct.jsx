import { useState } from "react";
import HeaderProduct from "./HeaderProduct";
import CvLayout from "./CvLayout";
import useCustomFetch from "../../../hooks/useCustomFetch";
import { fetchTemplateAdminApi } from "../../../services/CvApi";

const AdminHome = () => {
  const [selectedPage, setSelectedPage] = useState("overview");
  const { data, refetch } = useCustomFetch(fetchTemplateAdminApi);

  return (
    // <div className="">
    <div className="flex-1 flex flex-col">
      {/* Truyền setSelectedPage để Header dùng */}
      <HeaderProduct setSelectedPage={setSelectedPage} refetch = {refetch} />
      {/* <HeaderProduct>
          
        </HeaderProduct> */}
      <main className="flex justify-center my-20">
        <CvLayout data={data || []}></CvLayout>
        {/* <MainContent selectedPage={selectedPage} /> */}
      </main>
    </div>
    // </div>
  );
};

export default AdminHome;
