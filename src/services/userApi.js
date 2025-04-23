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
export { fetchUserApi, fetchAreaApi };