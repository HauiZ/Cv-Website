import axios from "../utils/axios.customize";

const fetchRecruitmentNewsDetail = async (companyId) =>{
  const res = await axios.get(`/users/getInfoCompany/${companyId}`);
  // console.log(res.data)
  const data = res.data
  return data; 
}



export default fetchCompanyInfo;