import axios from "../utils/axios.customize";

const fetchRecruitmentNewsDetailApi = async (newsId) => {
  const res = await axios.get(
    `/recruitmentNews/getDetailRecruitmentNews/${newsId}`
  );
  const data = res.data;
  return data;
};
const fetchAllNewsApi = async () => {
  const res = await axios.get("/recruitmentNews/getRecruitmentNews");
  const data = res.data;
  return data;
};
const fetchAllNewsFilterApi = async (params) => {
  const res = await axios.get("/recruitmentNews/filterRecruitmentNews", {
    params: params,
  });

  const data = res.data;
  return data;
};

export {
  fetchRecruitmentNewsDetailApi,
  fetchAllNewsApi,
  fetchAllNewsFilterApi,
};