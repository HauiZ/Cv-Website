
import CreateCvFrame from "./CreateCvFrame";
import SearchBar from "../SearchBar";
import { useState } from "react";
const Header = ({ setSelectedPage, refetch }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  return (
    <>
      <header className="bg-blue-500 text-white px-4 py-2 flex items-center justify-between shadow">
        {/* Create button */}
        <div>
          <button
            className="bg-[#281d1d] rounded-full w-[40px] h-[40px] text-3xl transition-all duration-300 hover:bg-[#343232] hover:scale-110"
            onClick={() => setSelectedRequest(true)}
          >
            +
          </button>
        </div>
        {/* Tìm kiếm + Thông báo */}
        <SearchBar></SearchBar>
      </header>
      {selectedRequest && (
        <CreateCvFrame
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default Header;
