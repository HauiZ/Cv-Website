import React, { useState } from "react";
import logo_viettel from "/src/image/logo_viettel.png";
import { GoHeartFill } from "react-icons/go";


const Jobs = [
    {
        id: 1,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 2,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 3,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 1,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 2,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 3,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 1,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 2,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },
    {
        id: 3,
        title: "Job name",
        location: "Location",
        salary: "Salary",
        company: "Company name",
        hef: "#",
        logo: logo_viettel,
    },

];

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };

    return (
        <button
            onClick={handleClick}
            className={`rounded-full p-1 size-6 absolute right-0 mt-1 mr-2 border-1
                ${liked ? 'border-red-500' : 'border-[#0C8E5E]'}`
            }

        >
            <GoHeartFill className={`${liked ? 'text-red-500' : 'text-[#0C8E5E]'}`} />
        </button>
    );
};
const Listjobbox = () => {
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Jobs.map((Job) => (
            <div key={Job.id} className="group relative border-2 border-[#D9D9D9] rounded-md w-[350px] h-[120px] bg-white ">
                <div className="flex ml-3 mt-2">
                    <img src={Job.logo} alt="" className="size-18 border-2 border-[#D9D9D9] rounded-2xl" />
                    <div className="flex flex-col">
                        <a href={Job.hef} className="ml-5 text-1xl font-bold hover:text-[#0C8E5E] hover:underline">{Job.title}</a>
                        <a href={Job.hef} className="ml-5 text-1xl text-[#728A8B]">{Job.company}</a>
                    </div>
                </div>
                <div className="mt-1 ml-3 flex relative">
                    <span className="bg-[#EDEFF0] border-1 border-[#D9D9D9] rounded-2xl p-1 text-[13px] font-sans">
                        {Job.salary}
                    </span>
                    <span className="bg-[#EDEFF0] border-1 border-[#D9D9D9] rounded-2xl p-1 ml-3 text-[13px] font-sans">
                        {Job.location}
                    </span>
                    <LikeButton />
                </div>
            </div>
        ))}
    </div>

};

export default Listjobbox;