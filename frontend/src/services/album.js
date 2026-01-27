import { supabase } from "../config/supabase";

export const getAlbums = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch user albums:", error);
    return [];
  }

  return data || [];
};
