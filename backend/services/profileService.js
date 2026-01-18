import { HttpError } from "../exception/HttpError.js";
import { supabaseAdmin, supabase } from "../config/supabaseClient.js";
import {
  getProfileByUserId,
  updateProfileByUserId,
} from "../models/profile.model.js";

// Helper to extract first and last names from user metadata
const extractNamesFromMetadata = (metadata = {}) => {
  if (metadata.given_name || metadata.family_name) {
    return {
      firstName: metadata.given_name || null,
      lastName: metadata.family_name || null,
    };
  }

  if (metadata.full_name) {
    const parts = metadata.full_name.trim().split(" ");
    return {
      firstName: parts[0] || null,
      lastName: parts.length > 1 ? parts.slice(1).join(" ") : null,
    };
  }

  return { firstName: null, lastName: null };
};

// Helper to create a new profile
const createProfile = async ({ userId, email, firstName, lastName }) => {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .insert({
      user_id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
    })
    .select()
    .single();

  if (error) {
    throw new HttpError("Profile creation failed", 500);
  }

  return data;
};

// Helper to patch missing names in existing profile
const patchMissingNames = async (profile, userId, firstName, lastName) => {
  if (!profile.first_name && firstName) {
    await supabaseAdmin
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: profile.last_name || lastName,
      })
      .eq("user_id", userId);

    return {
      ...profile,
      first_name: firstName,
      last_name: profile.last_name || lastName,
    };
  }

  return profile;
};

// Service: get or create profile
export const getOrCreateProfile = async (user) => {
  if (!user) {
    throw new HttpError("Unauthorized", 401);
  }

  const userId = user.id;
  const { firstName, lastName } = extractNamesFromMetadata(
    user.user_metadata
  );

  let profile = await getProfileByUserId(userId);

  if (!profile) {
    profile = await createProfile({
      userId,
      email: user.email,
      firstName,
      lastName,
    });
  }

  profile = await patchMissingNames(
    profile,
    userId,
    firstName,
    lastName
  );

  return { user, profile };
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
  if (!email) throw new HttpError("Email is required", 400);

  const { error } = await supabase.auth.admin.updateUserById(userId, { email });
  if (error) throw new HttpError(error.message, 400);

  return true;
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
