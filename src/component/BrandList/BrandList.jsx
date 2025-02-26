import React from "react";
import BrandListbox from "./BrandListbox";

const BrandList = () => {
    return (
        <div className="flex justify-center mt-10">
            <div className="w-[980px] h-[600px] rounded-2xl shadow-2xl">
                <img src="/src/image/image_ThuongHieuTieuBieu.png" alt="" />
                <div className="mt-10 ml-2">
                    <BrandListbox />
                </div>
            </div>
        </div>
    );
};
export default BrandList;