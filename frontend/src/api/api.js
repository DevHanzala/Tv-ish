import axios from "axios";
import { supabase } from "../config/supabase";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional future interceptors
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
api.interceptors.request.use(async (config) => {
  if (config.url?.startsWith("/auth")) {
    return config;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(
    "🔑 AXIOS TOKEN:",
    session?.access_token ? "FOUND" : "MISSING",
    config.url
  );

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});



export default api;
