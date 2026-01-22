import * as profileService from "../services/profileService.js";
import { success } from "../utils/apiResponse.js";

// @route GET /api/profile/me
export const getMyProfile = async (req, res) => {
  const profile = await profileService.getMyProfile(req.user);
  return success(res, "Profile fetched", {
    user: req.user,
    profile,
  });
};


// @route POST /api/profile/ensure
export const ensureProfile = async (req, res) => {
  const data = await profileService.ensureProfile(req.user);
  return success(res, "Profile ensured", data);
};


//@route api/profile/update
export const updateMyProfile = async (req, res) => {
  const data = await profileService.updateProfile(req.user.id, req.body);
  return success(res, "Profile updated", data);
};

//@route api/profile/email/request
export const requestEmailChange = async (req, res) => {
  await profileService.requestEmailChange(req.user.id, req.body.email);
  return success(
    res,
    "Confirmation email sent. Please verify to complete email change."
  );
};


//@route api/profile/sync-email
export const syncEmail = async (req, res) => {
  const email = req.user.email;
  const data = await profileService.syncEmail(
    req.user.id,
    email
  );

  return success(res, "Email synced", data);
};


//@route api/profile/phone
export const updatePhone = async (req, res) => {
  const data = await profileService.updatePhone(req.user.id, req.body.phone);
  return success(res, "Phone number updated", data);
};

//@route api/profile/password/change
export const changePassword = async (req, res) => {
  await profileService.changePassword(
    req.user.id,
    req.body.newPassword,
    req.body.logoutOthers
  );
  console.log("Password change successful for user:", req.user.id);

  return success(res, "Password updated successfully");
};
