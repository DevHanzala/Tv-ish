import api from "./api";

/* ===================== SIGNUP ===================== */
export const signupSendOtp = ({ email, password }) =>
  api.post("/auth/signup/send-otp", { email, password });

export const signupVerifyOtp = (payload) =>
  api.post("/auth/signup/verify-otp", payload);

/* ===================== LOGIN ===================== */
export const login = (payload) =>
  api.post("/auth/login", payload);

/* ===================== FORGOT PASSWORD ===================== */
export const forgotPasswordSendOtp = (email) =>
  api.post("/auth/forgot-password/send-otp", { email });

export const forgotPasswordVerifyOtp = (payload) =>
  api.post("/auth/forgot-password/verify-otp", payload);

export const resetPassword = (payload) =>
  api.post("/auth/forgot-password/reset", payload);

/* ===================== SESSION ===================== */
export const getMe = () =>
  api.get("/profile/me");

export const logout = () =>
  api.post("/auth/logout");
