import axios from "axios";

// Set config defaults when creating the instance

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Alter defaults after instance has been created

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Xóa token và gọi logOut nếu cần
      localStorage.removeItem("access_token");
      // Gọi hàm logOut từ context hoặc thực hiện điều hướng
    }
    return Promise.reject(error);
  }
);

export default instance;
