import React from "react";
import Topjobbox from "./Topjobbox";

const Topjob = () => {
    return <div className="flex justify-center mt-5">
        <div className="mt-5 space-y-5">
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-[#0C8E5E]">Top ngành nghề nổi bật</h1>
            </div>
            <Topjobbox />
        </div>

    </div>
};
export default Topjob;