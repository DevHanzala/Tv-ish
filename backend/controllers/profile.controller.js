import { getProfileByUserId, updateProfileByUserId } from "../models/profile.model.js";
import { success, error } from "../utils/apiResponse.js";
import { supabaseAdmin, supabase } from "../config/supabaseClient.js";

export const getMyProfile = async (req, res) => {
  const user = req.user;
  console.log("👤 REQ.USER:", user);

  if (!user) {
    return error(res, "Unauthorized", 401);
  }

  const userId = user.id;

  let { data: profile, error: profileError } =
    await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
  console.log("🔍 PROFILE LOOKUP user_id:", userId);

  if (!profile) {
    console.log("➕ CREATING PROFILE FOR:", userId);

    const { data: newProfile, error: createError } =
      await supabaseAdmin
        .from("profiles")
        .insert({
          user_id: userId,
          email: user.email,
        })
        .select()
        .single();




    if (createError) {
      console.error("❌ PROFILE CREATE FAILED:", createError);
      return error(res, createError.message);
    }

    profile = newProfile;
  } else {
    console.log("✅ PROFILE FOUND:", profile.user_id);
    console.log("📦 getMe RESPONSE DATA:", {
      user,
      profile
    });
  }

  console.log("📦 getMe RESPONSE DATA:", { user, profile });

  return success(res, "Profile fetched", {
    user,
    profile,
  });

};



export const updateMyProfile = async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;

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

