import { getProfileByUserId, updateProfileByUserId } from "../models/profile.model.js";
import { success, error } from "../utils/apiResponse.js";

export const getMyProfile = async (req, res) => {
  const userId = req.user.id;

  const { data, error: profileError } =
    await getProfileByUserId(userId);

  if (profileError) return error(res, profileError.message);

  return success(res, "Profile fetched", data);
};


export const updateMyProfile = async (req, res) => {
  const userId = req.user.id;
  const payload = req.body; // { first_name?, last_name?, dob?, phone? }

  const { data, error: updateError } =
    await updateProfileByUserId(userId, payload);

  if (updateError) return error(res, updateError.message);

  return success(res, "Profile updated", data);
};


export const requestEmailChange = async (req, res) => {
  const userId = req.user.id;
  const { email } = req.body;

  if (!email) return error(res, "Email is required");

  const { error: authError } =
    await supabase.auth.admin.updateUserById(userId, {
      email,
    });

  if (authError) return error(res, authError.message);

  return success(
    res,
    "Confirmation email sent. Please verify to complete email change."
  );
};

export const updatePhone = async (req, res) => {
  const userId = req.user.id;
  const { phone } = req.body;

  if (!phone) return error(res, "Phone is required");

  const { data, error: updateError } =
    await updateProfileByUserId(userId, { phone });

  if (updateError) return error(res, updateError.message);

  return success(res, "Phone number updated", data);
};

export const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword, logoutOthers } = req.body;

  if (!newPassword) {
    return error(res, "New password required");
  }

  const { error: updateError } =
    await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

  if (updateError) return error(res, updateError.message);

  if (logoutOthers) {
    await supabase.auth.admin.signOut(userId);
  }

  return success(res, "Password updated successfully");
};

