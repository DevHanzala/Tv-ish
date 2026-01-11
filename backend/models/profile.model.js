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
    id: userId,
    email,
    first_name: firstName,
    last_name: lastName,
    phone,              // optional
    role: "viewer",     // default role
  });
};


// Fetch profile for logged-in user
export const getProfileByUserId = async (userId) => {
  return supabase.from("profiles").select("*").eq("id", userId).single();
};
