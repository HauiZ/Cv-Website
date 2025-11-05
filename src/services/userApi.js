import axios from "../utils/axios.customize";



const fetchUserApi = async () => {
  const res = await axios.get("/users/getProfile");
  const data = res.data.user;
  return data; // chỉ lấy phần user
};
const fetchAreaApi = async () => {
  const res = await axios.get("/users/getInfoArea");
  const data = res.data
  return data; // chỉ lấy phần user
};

const applyJobApi = async (jobId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  // console.log("formData>>>>>>:", formData);
  // console.log("formdata>>", formData.get("file"));
  const res = await axios.post(`/users/applyJob/${jobId}`, formData
  );
  return res.data;
}

const changeAvatar = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  // console.log("formData>>>>>>:", formData);
  // console.log("formdata>>", formData.get("file"));
  return await axios.post(`/upload/upload-avatar`, formData
  );
}

const changePassword = async ({ oldPassword, newPassword, confirmNewPassword }) => {
  const URL_API = "/users/changePassword";
  const data = { oldPassword, newPassword, confirmNewPassword };
  return await axios.patch(URL_API, data);
}

const changeProfileCandidate = async ({ name, phone, desiredJob, skills, expectedSalary, yearsExperience, currentLevel, about, location }) => {
  const URL_API = "/users/changeProfile";
  const data = { name, phone, desiredJob, skills, expectedSalary, yearsExperience, currentLevel, about, location };
  return await axios.patch(URL_API, data);
}
const getNotificationApi = async() =>{
  const URL_API = "users/getNotification"
  const res = await axios(URL_API);
  return res.data;
}
const getInfoApplicationApi = async() =>{
  const URL_API = "users/getInfoApplication"
  const res = await axios(URL_API);
  return res.data;
}

const saveNews = async (jobId) => {
  const res = await axios.post(`/users/saveNews/${jobId}`);
  return res.data;
}

const fetchSavedNewsApi = async () => {
  const res = await axios.get("/users/getAllNewsSaved");
  const data = res.data;
  return data;
}
export { fetchUserApi, fetchAreaApi, applyJobApi, changeAvatar, changePassword, changeProfileCandidate, getNotificationApi, getInfoApplicationApi, saveNews, fetchSavedNewsApi };

