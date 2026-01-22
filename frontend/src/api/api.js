import axios from "axios";
import { supabase } from "../config/supabase";

// Create Axios instance
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

// Attach auth token to requests
api.interceptors.request.use(async (config) => {
  const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/send-otp",
    "/auth/verify-otp",

    // Forgot Password
    "/auth/forgot-password/send-otp",
    "/auth/forgot-password/verify-otp",
    "/auth/forgot-password/reset",
  ];

  

  if (publicRoutes.some((route) => config.url?.startsWith(route))) {
    return config;
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Missing access token");
  }

  config.headers.Authorization = `Bearer ${session.access_token}`;
  return config;
});


export default api;
