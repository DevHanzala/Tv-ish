import api from "./api";

/* ===================== PROFILE GET/CREATE ===================== */
export const getMyProfile = () =>
  api.get("/profile/me");

export const ensureProfile = () =>
  api.post("/profile/ensure");


/* ===================== PROFILE DATA EDIT ===================== */

export const updateMyProfile = (payload) =>
  api.patch("/profile/update", payload);


export const requestEmailChange = (email) =>
  api.post("/profile/email/request", { email });

export const syncEmail = () =>
  api.patch("/profile/sync-email");


export const updatePhone = (phone) =>
  api.patch("/profile/phone", { phone });

export const changePassword = (payload) =>
  api.post("/profile/password/change", payload);

