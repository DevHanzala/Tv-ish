import { supabase } from "../config/supabase.js";
import { useAuth } from "../hooks/useAuth";

const { user } = useAuth();

export const getShows = async () => {
  const { data, error } = await supabase
    .from("shows")
    .select("id, title")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch shows:", error);
    return;
  }
  return data;
};