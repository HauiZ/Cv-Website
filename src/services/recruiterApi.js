import axios from "../utils/axios.customize";

const fetchCompanyInfoApi = async (companyId) => {
  const res = await axios.get(`/users/getInfoCompany/${companyId}`);
  // console.log(res.data)
  const data = res.data
  return data;
}
const fetchAllCompanyApi = async () => {
  const res = await axios.get("/users/getAllCompany");
  // console.log(res.data)
  const data = res.data
  return data;
}

const postRecruitmentNewsApi = async ({ jobTitle, profession, candidateNumber, jobLevel, workType, degree, province, district, jobAddress,
  salaryMin, salaryMax, salaryNegotiable, experience, workDateIn, workDetail, jobRequirements, benefits, applicationDeadline,
  contactInfo, contactAddress, contactPhone, contactEmail, videoUrl }) => {
  const URL_API = "recruiter/postRecruitmentNews"
  const data = {
    jobTitle, profession, candidateNumber, jobLevel, workType, degree, province, district, jobAddress,
    salaryMin, salaryMax, salaryNegotiable, experience, workDateIn, workDetail, jobRequirements, benefits, applicationDeadline,
    contactInfo, contactAddress, contactPhone, contactEmail, videoUrl
  };
  return await axios.post(URL_API, data);
}

export { fetchCompanyInfoApi, fetchAllCompanyApi, postRecruitmentNewsApi };