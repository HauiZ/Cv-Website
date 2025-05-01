import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import MainContent from "./MainContent";

const AdminHome = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Read initial page from URL query parameter, default to "overview" if not present
  const initialPage = searchParams.get("page") || "overview";
  const [selectedPage, setSelectedPage] = useState(initialPage);
  
  // Update URL when selected page changes
  useEffect(() => {
    navigate(`/admin?page=${selectedPage}`, { replace: true });
  }, [selectedPage, navigate]);
  
  return (
    <div className="flex-1 flex flex-col">
      {/* Truyền setSelectedPage để Header dùng */}
      <Header setSelectedPage={setSelectedPage} />
      <main className="flex-1">
        <MainContent selectedPage={selectedPage} />
      </main>
    </div>
  );
};

export default AdminHome;