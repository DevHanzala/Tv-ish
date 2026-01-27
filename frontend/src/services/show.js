import { supabase } from "../config/supabase.js";

export const getShows = async () => {
  const { data, error } = await supabase
    .from("shows")
    .select("id, title")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch shows:", error);
    return;
  }
    return data;
};