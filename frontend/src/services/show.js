import { supabase } from "../config/supabase.js";;

//Service: Fetch all shows for a user
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

// Service: Create a new show
export const createShow = async (showTitle, showDescription, userId) => {
  const { data, error } = await supabase
    .from("shows")
    .insert([
      {
        title: showTitle,
        description: showDescription ?? null,
        owner_id: userId,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Failed to create show:", error);
    return {
      success: false,
      error: error.message || "Failed to create show",
    };
  }

  return {
    success: true,
    showId: data.id,
  };
};
