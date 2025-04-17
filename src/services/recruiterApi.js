import axios from "../utils/axios.customize";

const fetchCompanyInfo = async (companyId) =>{
  const res = await axios.get(`/users/getInfoCompany/${companyId}`);
  // console.log(res.data)
  const data = res.data
  return data; 
}

const fetchCompanyJobs = async (companyId) => {
  const res = await axios.get(`/users/getJobs/${companyId}`);
  const data = res.data.jobs;
  return data; // chỉ lấy phần jobs
};

export default fetchCompanyInfo;