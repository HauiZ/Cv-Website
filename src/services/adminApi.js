import axios from "../utils/axios.customize";

const fetchDataDashBoardApi = async () =>{
  const res = await axios.get("/admin/getDataDashBorad");
  const data = res.data
  return data; 
}
const fetchUserApi = async () =>{
  const res = await axios.get("/admin/getUsers");
  // console.log(res.data)
  const data = res.data
  return data; 
}


export {fetchUserApi, fetchDataDashBoardApi};