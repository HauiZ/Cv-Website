import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMap } from "@fortawesome/free-solid-svg-icons";
export default function ContractInfo() {
  const address = "dong da hn hai phong binh duong";
  return (
    <div className="w-[22rem] h-fit mt-5 rounded-[1em] bg-white">
      {/* banner */}
      <div className="h-15 rounded-t-[1em] bg-gradient-to-r from-[#213E42] to-[#5DCC7C] flex items-center p-5">
        <h1
          className="text-white text-2xl
        "
        >
          Thông tin liên lạc
        </h1>
      </div>
      <div className="content content p-5 text-[0.95rem] space-y-3 leading-relaxed">
        <div className="flex gap-x-3">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-green-500 cursor-pointer text-2xl"
          />
          <h1 className="">Địa chỉ công ty</h1>
        </div>
        <div>
          <p>{address}</p>
        </div>
        <hr className="my-4 border-2 border-t border-gray-300" />
        <div>
          <div className="my-1.5">
            <FontAwesomeIcon
              icon={faMap}
              className="text-green-500 cursor-pointer text-2xl"
            />
          </div>
          <div className="h-[18em] w-[18em] m-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.520072541659!2d106.78408977427243!3d10.847992257871153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1740382526819!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
