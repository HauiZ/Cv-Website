import React from "react";

export default function News() {
  const logo = "abc.png";
  return (
    <div className="flex">
      <div className="w-fit">
        <img src={logo} alt="" className="w-[15rem]" />
      </div>
      <div>
        <div className="flex justify-between">
          <div>Ten cong viec</div>
          <div>muc luong</div>
        </div>
        <div>
          <div>
            <div>dia diem</div>
            <div>time</div>
          </div>
          <div>unng tuyen</div>
        </div>
      </div>
    </div>
  );
}
