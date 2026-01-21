import { supabase } from "../config/supabaseClient.js";

// Create profile after successful signup
export const createProfile = async ({
  userId,
  email,
  firstName,
  lastName,
  phone = null,
}) => {
  return supabase.from("profiles").insert({
    user_id: userId,
    email,
    first_name: firstName,
    last_name: lastName,
    phone,              // optional
    role: "viewer",     // default role
  });
};


// Fetch profile for logged-in user
export const getProfileByUserId = async (userId) => {
  return supabase.from("profiles").select("*").eq("user_id", userId).single();
};

//
export const updateProfileByUserId = (userId, updates) => {
  return supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();
};
