import axios from "../utils/axios.customize";
// SIGN UP
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
// SIGN IN
const loginCandidateApi = (email, password) => {
  const URL_API = "/auth/login/candidate";

  const data = {
    email,
    password,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};
const loginAdminApi = (email, password) => {
  const URL_API = "/auth/login/admin";

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
// forgot password
const forgotPasswordCandidateApi = (email) => {
  const URL_API = `/sendOTPCode/candidate`;

  const data = {
    email,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};
const forgotPasswordRecruiterApi = (email) => {
  const URL_API = `/sendOTPCode/recruiter`;

  const data = {
    email,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};

const inputNewPasswordApi = (
  email,
  role,
  otpCode,
  newPassword,
  confirmNewPassword
) => {
  const URL_API = `/forgot-password/${role}`;

  const data = {
    email,
    otpCode,
    newPassword,
    confirmNewPassword,
  };
  console.log("URL", URL_API);

  return axios.patch(URL_API, data);
};

// LOGOUT
const logoutApi = () => {
  console.log("Logout API called");
  const URL_API = "/auth/logout";

  return axios.post(URL_API,{
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export {
  loginCandidateApi,
  loginRecruiterApi,
  loginAdminApi,
  createCandidatesApi,
  createRecruterApi,
  forgotPasswordCandidateApi,
  forgotPasswordRecruiterApi,
  inputNewPasswordApi,
  logoutApi,
};
