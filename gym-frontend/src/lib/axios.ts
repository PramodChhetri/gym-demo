import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel API base URL
  withCredentials: true, // Include cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
