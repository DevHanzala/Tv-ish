import { supabase } from "../config/supabase";

//Service: Get all albums for a user
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

//Service: Create a new album
export const createAlbum = async (userId, title, artist, description) => {
  const { data, error } = await supabase
    .from("albums")
    .insert([
      {
        owner_id: userId,
        title,
        artist,
        description: description ?? null,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Failed to create album:", error);
    return {
      success: false,
      error: error.message || "Failed to create album"
    };
  }

  return {
    success: true,
    albumId: data.id
  };
};