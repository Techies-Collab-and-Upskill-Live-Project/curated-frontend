import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/", // fallback for dev
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// You can add interceptors here if needed
export default api;
