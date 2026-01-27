import { supabase } from "../config/supabase.js";;

export const getShows = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("shows")
    .select("id, title")
    .eq("owner_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch shows:", error);
    return;
  }
  return data;
};