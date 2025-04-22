import React from "react";
import { BiSolidShoppingBag } from "react-icons/bi";
import useCustomFetch from "../../../../hooks/useCustomFetch";
import  {fetchAllCompanyApi}  from "../../../../services/recruiterApi"; 
const defaultLogo = "/src/image/logo_viettel.png";

const BrandListbox = () => {
    const {
        data: companies,
        loading,
        error,
    } = useCustomFetch(fetchAllCompanyApi);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {companies.map((company) => (
                <div
                    key={company.id}
                    className="flex gap-x-5 border-1 border-[#00B14F] rounded-2xl w-[16rem] h-[7rem] relative shadow-1xl hover:shadow-[0_0_10px_rgba(12,142,94,0.5)] hover:border-[#0C8E5E] hover:border-2 transition-all duration-300 cursor-pointer group"
                >
                    <div className="flex mt-2 ml-2">
                        <img
                            src={company.logoUrl || defaultLogo}
                            alt={company.name}
                            className="size-18 border-2 border-[#D9D9D9] rounded-2xl object-cover"
                        />
                        <div className="flex flex-col">
                            <a
                                href="#"
                                className="ml-5 text-1xl font-bold group-hover:text-[#0C8E5E] hover:"
                            >
                                {company.name}
                            </a>
                            <span className="ml-5 text-1xl text-[#728A8B]">
                                {company.field}
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-[20px] bg-[#E3FAED] rounded-b-2xl absolute bottom-0 items-center">
                        <a href="#" className="text-[#00B15E] ml-3 mb-2">
                            <BiSolidShoppingBag className="inline mb-1" />{" "}
                            {company.jobNumber || 0} việc làm
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BrandListbox;
