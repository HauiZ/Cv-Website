import axios from "../utils/axios.customize";

const fetchCompanyInfoApi = async (companyId) => {
  const res = await axios.get(`/users/getInfoCompany/${companyId}`);
  // console.log(res.data)
  const data = res.data;
  return data;
};
const fetchAllCompanyApi = async () => {
  const res = await axios.get("/users/getAllCompany");
  // console.log(res.data)
  const data = res.data;
  return data;
};

const postRecruitmentNewsApi = async ({
  jobTitle,
  profession,
  candidateNumber,
  jobLevel,
  workType,
  degree,
  province,
  district,
  jobAddress,
  salaryMin,
  salaryMax,
  salaryNegotiable,
  experience,
  workDateIn,
  workDetail,
  jobRequirements,
  benefits,
  applicationDeadline,
  contactInfo,
  contactAddress,
  contactPhone,
  contactEmail,
  videoUrl,
}) => {
  const URL_API = "recruiter/postRecruitmentNews";
  const data = {
    jobTitle,
    profession,
    candidateNumber,
    jobLevel,
    workType,
    degree,
    province,
    district,
    jobAddress,
    salaryMin,
    salaryMax,
    salaryNegotiable,
    experience,
    workDateIn,
    workDetail,
    jobRequirements,
    benefits,
    applicationDeadline,
    contactInfo,
    contactAddress,
    contactPhone,
    contactEmail,
    videoUrl,
  };
  return await axios.post(URL_API, data);
};

const changeLogo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  // console.log("formData>>>>>>:", formData);
  // console.log("formdata>>", formData.get("file"));
  return await axios.post(`/upload/upload-logoBusiness`, formData);
};

const changeProfileBusinessApi = async ({
  name,
  phone,
  province,
  district,
  domain,
  companyAddress,
  field,
  companySize,
  website,
  introduction,
}) => {
  const URL_API = "/users/changeProfile";
  const data = {
    name,
    phone,
    province,
    district,
    domain,
    companyAddress,
    field,
    companySize,
    website,
    introduction,
  };
  return await axios.patch(URL_API, data);
};

const fetchAllNewsApi = async () => {
  const URL_API = "/recruiter/getPostedRecruitmentNews";
  const res = await axios.get(URL_API);
  const data = res.data;
  return data;
};
const getNotificationApi = async () => {
  const URL_API = "recruiter/getNotification";
  const res = await axios.get(URL_API);
  return res.data;
};
const getApplicantApi = async () => {
  const URL_API = "/recruiter/getApplicant";
  const res = await axios(URL_API);
  return res.data;
};

const getApplicantForNewsApi = async (newsId) => {
  const res = await axios(`/recruiter/getApplicant/${newsId}`);
  return res.data;
};

const approveApplicationApi = async (id, data) => {
  return axios.post(`/recruiter/approvedApplication/${id}`, data);
};
const getDashBoardApi = async () => {
  const res = await axios.get("/recruiter/getDataDashBoard");
  return res.data;
};
const updateRecruitmentNewsApi = async ( {
  jobTitle,
  profession,
  candidateNumber,
  jobLevel,
  workType,
  degree,
  province,
  district,
  jobAddress,
  salaryMin,
  salaryMax,
  salaryNegotiable,
  experience,
  workDateIn,
  workDetail,
  jobRequirements,
  benefits,
  applicationDeadline,
  contactInfo,
  contactAddress,
  contactPhone,
  contactEmail,
  videoUrl
}, recruitmentNewsId) => {
  const data = {
    jobTitle,
    profession,
    candidateNumber,
    jobLevel,
    workType,
    degree,
    province,
    district,
    jobAddress,
    salaryMin,
    salaryMax,
    salaryNegotiable,
    experience,
    workDateIn,
    workDetail,
    jobRequirements,
    benefits,
    applicationDeadline,
    contactInfo,
    contactAddress,
    contactPhone,
    contactEmail,
    videoUrl
  };

  return await axios.post(`/recruiter/updateRecruitmentNews/${recruitmentNewsId}`, data);
}

const deleteRecruitmentNewsApi = async (recruitmentNewsId) => {
  return await axios.post(`/recruiter/deleteRecruitmentNews/${recruitmentNewsId}`);
};

export {
  fetchCompanyInfoApi,
  fetchAllCompanyApi,
  postRecruitmentNewsApi,
  changeLogo,
  changeProfileBusinessApi,
  getApplicantApi,
  approveApplicationApi,
  fetchAllNewsApi,
  getNotificationApi, getApplicantForNewsApi,
  getDashBoardApi,
  updateRecruitmentNewsApi,
  deleteRecruitmentNewsApi,
};
