import axios from "../utils/axios.customize";

const fetchDataDashBoardApi = async () =>{
  const res = await axios.get("/admin/getDataDashBoard");
  const data = res.data
  return data; 
}
const fetchUserApi = async () =>{
  const res = await axios.get("/admin/getUsers");
  // console.log(res.data)
  const data = res.data
  return data; 
}
const deleteUserApi = async (id) =>{
  const res = await axios.delete(`/admin/deleteUser/${id}`);
  return res.data; 
}
const getRequestApi = async () =>{
  const res = await axios.get("/admin/getRequest");
  const data = res.data
  return data; 
}
const approveRequestApi = async (id,data) =>{
  return axios.patch(`admin/approveRecruitment/${id}`,data);
  
}
export {fetchUserApi, fetchDataDashBoardApi, deleteUserApi, getRequestApi, approveRequestApi};