import React from "react";
import Filter from "./Filter.jsx";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import Listjobbox from "./Listjobbox.jsx";

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
const Listjob = () => {
    return <div className="flex justify-center">
        <div className="">
            <h1 className="text-3xl font-bold text-[#0C8E5E] mb-3">Danh sách việc làm</h1>
            <div className="flex gap-x-10">
                <Filter />
                <button className="bg-[#E0E0E0] ml-30 p-2 rounded-2xl">TP Hồ Chí Minh</button>
                <button className="bg-[#E0E0E0] p-2 rounded-2xl">Hà Nội</button>
                <button className="bg-[#E0E0E0] p-2 rounded-2xl">Miền Nam</button>
                <button className="bg-[#E0E0E0] p-2 rounded-2xl">Miền Bắc</button>
            </div>
            <Listjobbox />
            
            <div className="flex items-center justify-center mt-5 gap-x-10">
                <button className="border-2 border-[#5DDA33] text-[#5DDA33] rounded-full">
                    <FaAngleLeft />
                </button>
                <p className="text-center text-gray-500">Page 1 of 10</p>
                <button className="border-2 border-[#5DDA33] text-[#5DDA33] rounded-full">
                    <FaAngleRight />
                </button>
            </div>
        </div>

    </div>
};

export default Listjob;