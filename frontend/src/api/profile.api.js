import api from "./api";

/* ===================== PROFILE ===================== */
export const getMyProfile = () =>
  api.get("/profile/me");

export const updateMyProfile = (payload) =>
  api.patch("/profile/update", payload);

/* ===================== SECURITY ===================== */

export const requestEmailChange = (email) =>
  api.post("/profile/email/request", { email });

export const updatePhone = (phone) =>
  api.patch("/profile/phone", { phone });

export const changePassword = (payload) =>
  api.post("/profile/password/change", payload);

