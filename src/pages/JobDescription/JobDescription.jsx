import React from "react";
import Search from "../../components/Search/Search";
import background from "../../assets/image/background_ColorGreen.png";
import CompanyIntroduction from "./CompanyIntroduction";
import JobIntroduction from "./JobIntroduction";
import GeneralInformation from "./GeneralInformation";
import DetailJob from "./DetailJob";
import RelativeNews from "./RelativeNews";
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
  const filterParams = useMemo(() => ({}), []);
  const { data } = useCustomFetch(fetchRecruitmentNewsDetailApi, [jobId]);
  const { data: jobs } = useCustomFetch(fetchAllNewsFilterApi, [filterParams]);
  const { company, general, introduce, detailRecruitment } = data || {};
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
      <div className="flex justify-center bg-gray-300">
        <div className="w-[80vw]">
          <div className="flex justify-center gap-x-5 mt-10 mb-10">
            <div>
              <CompanyIntroduction data={company} />
            </div>
            <div>
              <JobIntroduction data={introduce}  />
            </div>
          </div>
          <div className="flex justify-center gap-x-5 mb-10">
            <div>
              <GeneralInformation data={general} degree={detailRecruitment?.degree || "Đại Học"}/>
            </div>
            <div>
              <DetailJob data={detailRecruitment} />
            </div>
          </div>
          <div className="max-w-[59rem] mx-auto">
            <RelativeNews data={jobs}/>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
