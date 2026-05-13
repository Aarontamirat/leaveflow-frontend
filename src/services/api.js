import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response);

    return Promise.reject(error);
  },
);

export default api;
