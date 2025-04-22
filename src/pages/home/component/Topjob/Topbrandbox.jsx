import React from "react";
import { IoDiamond } from "react-icons/io5";

const Branditem = [
    {
        id: 1,
        logo: "/src/image/logo_viettel.png",
    },
    {
        id: 2,
        logo: "/src/image/logo_viettel.png",
    },
    {
        id: 3,
        logo: "/src/image/logo_viettel.png",
    },
    {
        id: 4,
        logo: "/src/image/logo_viettel.png",
    },
    {
        id: 5,
        logo: "/src/image/logo_viettel.png",
    },
];
const Topbrandbox = () => {
    return <div>
        <a href="#" className="grid grid-cols-5 gap-x-10">
            {Branditem.map((brand) => (
                <div key={brand.id} className="border-1 border-[#D9D9D9] w-[150px] h-[120px] relative rounded-lg
                                hover:border-1 hover:border-[#00B14F] hover:bg-white hover:shadow-2xl hover:shadow-[#00B14F]">
                    <div className="z-10 absolute left-2 top-2 ">
                        <IoDiamond className="text-[#00B14F] size-6" />
                    </div>

                    <img src={brand.logo} alt="" className="w-[full] h-[full] rounded-lg" />
                </div>
            ))}
        </a>
    </div>
};
export default Topbrandbox;