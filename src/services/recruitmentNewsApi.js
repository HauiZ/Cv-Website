import axios from "../utils/axios.customize";

const fetchRecruitmentNewsDetailApi = async (newsId) =>{
  const res = await axios.get(`/recruitmentNews/getDetailRecruitmentNews/${newsId}`);
  // console.log(res.data)
  const data = res.data
  return data; 
}
const fetchAllNewsApi = async () =>{
  const res = await axios.get("/recruitmentNews/getRecruitmentNews");
  // console.log(res.data)
  const data = res.data
  return data; 
}
const fetchAllNewsFilterApi = async (params) =>{
  console.log("params filter>>>>>>>>.", params)
  const res = await axios.get("/recruitmentNews/filterRecruitmentNews", {params: params});
  // console.log(res.data)
  
  const data = res.data
  return data; 
}



export {fetchRecruitmentNewsDetailApi, fetchAllNewsApi, fetchAllNewsFilterApi};