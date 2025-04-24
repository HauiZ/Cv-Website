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
  console.log("formData>>>>>>:", formData);
  console.log("formdata>>", formData.get("file"));
  const res = await axios.post(`/users/applyJob/${jobId}`, formData
  );
  return res.data;
}
export { fetchUserApi, fetchAreaApi, applyJobApi };