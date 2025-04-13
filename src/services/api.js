import axios from '../utils/axios.customize';


const createUsersApi = (username,email,password,confirmpassword)=>{
  const URL_API = "/users/registerCandidate";

  const data = {
    username,email,password,confirmpassword
  }
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);

}
const loginApi= (email,password)=>{
  const URL_API = "/auth/login/candidate";

  const data = {
    email, password
  }
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
}
const getAccountApi = () =>{
  const URL_API = "/auth/getAccount";
  const res = axios.get(URL_API);
  return res;
}

export{
  loginApi,
  createUsersApi
}