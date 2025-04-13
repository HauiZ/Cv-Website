import React from "react";
import { BiSolidShoppingBag } from "react-icons/bi";

const BrandItem = [
    {
        id: 1,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "10",
    },
    {
        id: 2,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "20",
    },
    {
        id: 3,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "30",
    },
    {
        id: 1,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "10",
    },
    {
        id: 2,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "20",
    },
    {
        id: 3,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "30",
    },
    {
        id: 1,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "10",
    },
    {
        id: 2,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "20",
    },
    {
        id: 3,
        name: "Viettel",
        logo: "/src/image/logo_viettel.png",
        filed: "IT",
        jobs: "30",
    },
];

const BrandListbox = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 space-y-5">
                {BrandItem.map((brand) => (
                    <div key={brand.id} className="flex gap-x-5 border-1 border-[#00B14F] rounded-2xl w-[280px] h-[110px] relative shadow-1xl">
                        <div className="flex mt-2 ml-2">
                            <img src={brand.logo} alt={brand.name} className="size-18 border-2 border-[#D9D9D9] rounded-2xl" />
                            <div className="flex flex-col">
                                <a href="#" className="ml-5 text-1xl font-bold hover:text-[#0C8E5E] hover:underline">{brand.name}</a>
                                <a href="#" className="ml-5 text-1xl text-[#728A8B]">{brand.filed}</a>
                            </div>
                        </div>
                        <div className="w-full h-[20px] bg-[#E3FAED] rounded-b-2xl absolute bottom-0 items-center">
                            <a href="#" className="text-[#00B15E] ml-3 mb-2"><BiSolidShoppingBag className="inline mb-1" /> {brand.jobs} việc làm</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default BrandListbox;