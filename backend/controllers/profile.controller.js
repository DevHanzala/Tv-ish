import { getProfileByUserId, updateProfileByUserId } from "../models/profile.model.js";
import { success, error } from "../utils/apiResponse.js";
import { supabaseAdmin, supabase } from "../config/supabaseClient.js";

export const getMyProfile = async (req, res) => {
  const user = req.user;

  // Extract name from OAuth metadata (safe)
  const metadata = user.user_metadata || {};

  let firstName = null;
  let lastName = null;

  // Prefer explicit fields
  if (metadata.given_name || metadata.family_name) {
    firstName = metadata.given_name || null;
    lastName = metadata.family_name || null;
  }

  // Fallback: split full name
  if (!firstName && metadata.full_name) {
    const parts = metadata.full_name.trim().split(" ");
    firstName = parts[0] || null;
    lastName = parts.length > 1 ? parts.slice(1).join(" ") : null;
  }


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
          first_name: firstName,
          last_name: lastName,
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

  // Patch missing names for social users (do NOT overwrite)
  if (!profile.first_name && firstName) {
    await supabaseAdmin
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: profile.last_name || lastName,
      })
      .eq("user_id", userId);

    profile.first_name = firstName;
    profile.last_name = profile.last_name || lastName;
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

