import * as profileService from "../services/profileService.js";
import { success } from "../utils/apiResponse.js";

//get my profile
export const getMyProfile = async (req, res) => {
  const data = await profileService.getOrCreateProfile(req.user);
  return success(res, "Profile fetched", data);
};

//update my profile
export const updateMyProfile = async (req, res) => {
  const data = await profileService.updateProfile(req.user.id, req.body);
  return success(res, "Profile updated", data);
};

//request email change
export const requestEmailChange = async (req, res) => {
  await profileService.requestEmailChange(req.user.id, req.body.email);
  return success(
    res,
    "Confirmation email sent. Please verify to complete email change."
  );
};

// update phone number
export const updatePhone = async (req, res) => {
  const data = await profileService.updatePhone(req.user.id, req.body.phone);
  return success(res, "Phone number updated", data);
};

// change password
export const changePassword = async (req, res) => {
  await profileService.changePassword(
    req.user.id,
    req.body.newPassword,
    req.body.logoutOthers
  );

  return success(res, "Password updated successfully");
};
