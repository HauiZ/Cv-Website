import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import CreateCvFrame from "./CreateCvFrame";

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
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Comming Soon"
              className="pl-10 pr-3 py-1 bg-[#c5c7cb] [#7c7878] rounded border focus:outline-none text-black transition-all duration-200 hover:ring-2 hover:ring-blue-300 hover:bg-white focus:bg-white"
              disabled
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-2 text-gray-500"
            />
          </div>
          <FontAwesomeIcon
            icon={faBell}
            className="text-white text-xl cursor-pointer hover:text-yellow-300 transition-all duration-200"
          />
        </div>
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
