import React from "react";
import Search from "../../components/Search/Search";
import background from "../../assets/image/background_ColorGreen.png";
import CompanyIntroduction from "./CompanyIntroduction";
import JobIntroduction from "./JobIntroduction";
import GeneralInformation from "./GeneralInformation";
import DetailJob from "./DetailJob";
import { useMemo } from "react";
import useCustomFetch from "../../hooks/useCustomFetch";
import {
  fetchRecruitmentNewsDetailApi,
  fetchAllNewsFilterApi,
} from "../../services/recruitmentNewsApi";
import { useParams } from "react-router-dom";

export default function JobDescription() {
  const params = useParams();
  const { jobId } = params;
  const { data } = useCustomFetch(fetchRecruitmentNewsDetailApi, [jobId]);
  const { company, general, introduce, detailRecruitment } = data || {};
  const filterParams = useMemo(
    () => ({
      profession: detailRecruitment?.profession || "",
    }),
    [detailRecruitment]
  );
  return (
    <div>
      {/* Search bar */}
      <div
        className="flex justify-center items-center h-[10rem]"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <Search />
      </div>
      {/* main content */}
      <div className="flex justify-center bg-[#F5F5F5]">
        <div className="w-[80vw]">
          <div className="flex justify-center gap-x-5 mt-10 mb-10">
            <div>
              <CompanyIntroduction data={company} />
            </div>
            <div>
              <JobIntroduction data={introduce} jobId={jobId} />
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
