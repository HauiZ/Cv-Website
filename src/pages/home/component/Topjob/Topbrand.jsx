import React from "react";
import Topbrandbox from "./Topbrandbox";

const Topbrand = () => {
    return <div className=" w-full flex justify-center">
        <div className="w-full mt-5 space-y-5">
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-[#0C8E5E]">Nhà tuyển dụng nổi bật</h1>
            </div>

            <Topbrandbox />
        </div>

    </div>

};

export default Topbrand;