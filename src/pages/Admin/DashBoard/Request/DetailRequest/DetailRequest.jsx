import React from "react";
import CompanyIntroduction from "./CompanyIntroduction";
import JobIntroduction from "./JobIntroduction";
import GeneralInformation from "./GeneralInformation";
import DetailJob from "./DetailJob";
import useCustomFetch from "../../../../../hooks/useCustomFetch";
import {
  fetchRecruitmentNewsDetailApi,
} from "../../../../../services/recruitmentNewsApi";
import { useParams } from "react-router-dom";

export default function JobDescription() {
  const params = useParams();
  console.log(params)
  const { newsId } = params;
  const { data } = useCustomFetch(fetchRecruitmentNewsDetailApi, [newsId]);
  const { company, general, introduce, detailRecruitment } = data || {};
  return (
    <div>
      {/* main content */}
      <div className="flex justify-center bg-[#F5F5F5]">
        <div className="w-[80vw]">
          <div className="flex justify-center gap-x-5 mt-10 mb-10">
            <div>
              <CompanyIntroduction data={company} />
            </div>
            <div>
              <JobIntroduction data={introduce} newsId={newsId} />
            </div>
          </div>
          <div className="flex justify-center gap-x-5 mb-10">
            <div>
              <GeneralInformation
                data={general}
                degree={detailRecruitment?.degree || "Đại Học"}
              />
            </div>
            <div>
              <DetailJob data={detailRecruitment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
