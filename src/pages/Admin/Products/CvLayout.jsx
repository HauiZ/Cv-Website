import React from "react";
import TemplateCv from "./TemplateCv"; // Hoặc CvCard nếu bạn dùng cái mới
import useCustomFetch from "../../../hooks/useCustomFetch";
import { fetchTemplateApi } from "../../../services/CvApi";

export default function CvLayout() {
  const { data } = useCustomFetch(fetchTemplateApi);

  console.log("data>>>>>>>>>", data);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 w-fit">
        {data?.map((cv) => (
          <TemplateCv key={cv.id} data={cv} />
        ))}
      </div>
    </div>
  );
}
