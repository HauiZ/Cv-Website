import axios from "../utils/axios.customize";

const createUsersApi = (userName, email, password, confirmPassword) => {
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
const loginApi = (email, password) => {
  const URL_API = "/auth/login/candidate";

  const data = {
    email,
    password,
  };
  console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

  return axios.post(URL_API, data);
};


const fetchJobs = async () => {
  const res = await fetch("/test.json"); // hoặc API thật
  const allJobs = await res.json();
  return allJobs.map((job) => ({
    title: job.title,
    company: job.company,
    salary: job.salary,
    location: job.location,
    logo: job.logo,
  }));
};

const fetchUser = async () => {
  const res = await axios.get("/users/getProfile");
  const data = res.data.user;
  return data; // chỉ lấy phần user
};  

const testApi = async () => {
  const res = await axios.get("/users/getProfile");
  const data = res.data.user;
  return data; // chỉ lấy phần user
};


export { loginApi, createUsersApi, fetchJobs,testApi,fetchUser };
