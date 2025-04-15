import React, { useState } from "react";
import { GoHeartFill } from "react-icons/go";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="rounded-full p-1 size-6 absolute right-2 top-2 hover:bg-gray-100 hover:scale-110 transition-all duration-200 focus:outline-none"
    >
      <GoHeartFill 
        className={`${liked ? "text-red-500" : "text-[#0C8E5E]"} hover:opacity-80`} 
      />
    </button>
  );
};

export default LikeButton;