const createCandidatesApi = (username,email,password,confirmpassword)=>{
  const URL_API = "/users/registerCandidate";

  const data = {
    username,email,password,confirmpassword
  }
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);

}
const createRecruterApi = (username,email,password,confirmpassword)=>{
  const URL_API = "/users/registerCandidate";

  const data = {
    username,email,password,confirmpassword
  }
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);

}
const loginCandidateApi= (email,password)=>{
  const URL_API = "/auth/login/candidate";

  const data = {
    email, password
  }
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
}
const loginRecruiterApi= (email,password)=>{
  const URL_API = "/auth/login/candidate";

  const data = {
    email, password
  }
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
}

export {
  loginCandidateApi,
  loginRecruiterApi,
  createCandidatesApi,
  createRecruterApi
}