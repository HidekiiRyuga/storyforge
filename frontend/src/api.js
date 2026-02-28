import axios from "axios";

const API = axios.create({
  baseURL: "https://storyforge-idls.onrender.com/",
});

// Attach token dynamically for EVERY request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // always fresh
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auto logout on token expiry
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
