import { supabase } from "../config/supabase";
import { useAuth } from "../hooks/useAuth";

const {user} = useAuth();

export const fetchUserAlbums = async () => {
    const session = await getAuthSession();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false }); // optional: latest first

  if (error) {
    console.error("Failed to fetch user albums:", error);
    return [];
  }

  return data || [];
};
