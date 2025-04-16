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
const getAccountApi = () => {
  const URL_API = "/auth/getAccount";
  const res = axios.get(URL_API);
  return res.data;
};

// src/api/jobApi.js

// src/api/jobApi.js

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

// const fetchUserProfile = async (token) => {
//   try {
//     const response = await axios.get(
//       "/users/getProfile" /*{
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }*/
//     );
//     const userData = response.data.user;
//     setUser(userData);
//     setRole(userData.roles);

//     if (userData.roles?.includes("candidate") && userData.personalUser) {
//       setCandidateInfo(userData.personalUser);
//     } else {
//       setCandidateInfo(null);
//     }

//     if (userData.roles?.includes("recruiter") && userData.companyUser) {
//       setRecruiterInfo(userData.companyUser);
//     } else {
//       setRecruiterInfo(null);
//     }

//     setIsAdmin(userData.roles?.includes("admin"));
//   } catch (error) {
//     console.error("Lỗi khi lấy thông tin profile:", error);
//     setUser(null);
//     setRole(null);
//     setCandidateInfo(null);
//     setRecruiterInfo(null);
//     setIsAdmin(false);
//     localStorage.removeItem("access_token");
//   } finally {
//     setLoading(false);
//   }
// };

const testApi = async () => {
  const res = await axios.get("/users/getProfile");
  const data = res.data.user;
  return data; // chỉ lấy phần user
};


export { loginApi, createUsersApi, fetchJobs,testApi };
