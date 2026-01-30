import axios from "axios";

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
});

// Add a request interceptor to set the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken")); 

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
