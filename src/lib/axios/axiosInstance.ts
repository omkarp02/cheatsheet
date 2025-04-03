import { BACKEND_URL } from "@/constants/api";
import { getTokenFromAuthStore } from "@/store/authStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL, // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token = null) => {
//   failedQueue.forEach((promise) => {
//     if (token) {
//       promise.resolve(token);
//     } else {
//       promise.reject(error);
//     }
//   });

//   failedQueue = [];
// };

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = getTokenFromAuthStore();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    return res?.data;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
