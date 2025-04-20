import axios from "../utils/axios.customize";

const fetchCompanyInfoApi = async (companyId) =>{
  const res = await axios.get(`/users/getInfoCompany/${companyId}`);
  // console.log(res.data)
  const data = res.data
  return data; 
}
const fetchAllCompanyApi = async () =>{
  const res = await axios.get("/users/getAllCompany");
  // console.log(res.data)
  const data = res.data
  return data; 
}


export {fetchCompanyInfoApi, fetchAllCompanyApi};