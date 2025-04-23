import axios from "../utils/axios.customize";

const createCandidatesApi = (userName, email, password, confirmPassword) => {
  const URL_API = "/users/registerCandidate";

  const data = {
    userName,
    email,
    password,
    confirmPassword,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};
const createRecruterApi = (
  email,
  password,
  confirmPassword,
  businessName,
  phone,
  province,
  district
) => {
  const URL_API = "/users/registerRecruiter";

  const data = {
    email,
    password,
    confirmPassword,
    businessName,
    phone,
    province,
    district,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};
const loginCandidateApi = (email, password) => {
  const URL_API = "/auth/login/candidate";

  const data = {
    email,
    password,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};
const loginRecruiterApi = (email, password) => {
  const URL_API = "/auth/login/recruiter";

  const data = {
    email,
    password,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};

export {
  loginCandidateApi,
  loginRecruiterApi,
  createCandidatesApi,
  createRecruterApi,
};
