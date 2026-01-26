import axios from "axios";

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
});

// Add a request interceptor to set the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); 

    if (user?.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
