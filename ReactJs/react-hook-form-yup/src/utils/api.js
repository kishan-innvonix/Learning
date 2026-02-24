import axios from "axios";

// Create Axios instance with baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Unauthorized — redirect to login");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      if (status === 500) {
        console.error("Server error");
      }
    } else {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
