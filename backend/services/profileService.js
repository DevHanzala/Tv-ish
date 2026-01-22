import { HttpError } from "../exception/HttpError.js";
import { supabaseAdmin, supabase } from "../config/supabaseClient.js";
import {
  getProfileByUserId,
  updateProfileByUserId,
} from "../models/profile.model.js";

// Service: ensure profile exists
export const ensureProfile = async (user) => {
  if (!user) {
    throw new HttpError("Unauthorized", 401);
  }

  const userId = user.id;

  // 1️⃣ Try to read profile
  const { data, error } = await getProfileByUserId(userId);

  if (data) {
    return data;
  }

  // ❗ If error but not "row not found", throw
  if (error && error.code !== "PGRST116") {
    throw new HttpError("Error checking existing profile", 500);
  }

  // 2️⃣ Extract names from metadata
  const metadata = user.user_metadata || {};

  const firstName =
    metadata.given_name ||
    metadata.first_name ||
    metadata.full_name?.split(" ")[0] ||
    null;

  const lastName =
    metadata.family_name ||
    metadata.last_name ||
    (metadata.full_name
      ? metadata.full_name.split(" ").slice(1).join(" ")
      : null);

  // 3️⃣ Create profile
  const { data: created, error: createError } = await supabaseAdmin
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
    throw new HttpError("Profile creation failed", 500);
  }

  return created;
};


// Service: get my profile
export const getMyProfile = async (user) => {
  if (!user) {
    throw new HttpError("Unauthorized", 401);
  }

  const { data, error } = await getProfileByUserId(user.id);

  if (error) {
    return {
      user,
      profile: null,
    };
  }

  return {
    user,
    profile: data,
  };
};


// Service: update profile
export const updateProfile = async (userId, payload) => {
  if (!userId) throw new HttpError("Unauthorized", 401);

  const { data, error } = await updateProfileByUserId(userId, payload);
  if (error) throw new HttpError(error.message, 400);

  return data;
};

// Service: request email change
export const requestEmailChange = async (userId, email) => {
  if (!email) {
    throw new HttpError("Email is required", 400);
  }

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    email,
  });

  if (error) {
    throw new HttpError(error.message, 400);
  }

  // 🔑 SYNC PROFILE EMAIL IMMEDIATELY
  await updateProfileByUserId(userId, { email });
};


// Service: sync email
export const syncEmail = async (userId, email) => {
  if (!email) {
    throw new HttpError("Email missing", 400);
  }

  const { data, error } = await updateProfileByUserId(userId, { email });
  if (error) {
    throw new HttpError(error.message, 400);
  }

  return data;
};



// Service: update phone number
export const updatePhone = async (userId, phone) => {
  if (!phone) throw new HttpError("Phone is required", 400);
  const { data, error } = await updateProfileByUserId(userId, { phone });
  if (error) throw new HttpError(error.message, 400);

  return data;
};


// Service: change password
export const changePassword = async (userId, newPassword, logoutOthers) => {
  if (!newPassword) {
    throw new HttpError("New password required", 400);
  }

  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) throw new HttpError(error.message, 400);

  if (logoutOthers) {
    await supabase.auth.admin.signOut(userId);
  }

  return true;
};
