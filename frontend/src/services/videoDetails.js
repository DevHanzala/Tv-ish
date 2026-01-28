// services/videoDetails.service.js
import { supabase } from "../config/supabase";

/**
 * Save Video 3 data: synopsis, genres, cast, crew
 * @param {string} videoId
 * @param {object} data - { synopsis, genres[], cast[], crew[] }
 */
export const saveVideoDetails = async (videoId, data) => {
  try {
    // 1️⃣ Update synopsis in videos table
    const { error: videoError } = await supabase
      .from("videos")
      .update({ synopsis: data.synopsis })
      .eq("id", videoId);

    if (videoError) throw videoError;

    // 2️⃣ Handle genres (many-to-many)
    // a) First fetch existing genre IDs
    const { data: existingGenres, error: genreFetchError } = await supabase
      .from("genres")
      .select("id, name")
      .in("name", data.genres);

    if (genreFetchError) throw genreFetchError;

    // b) Insert any new genres
    const existingNames = existingGenres.map((g) => g.name);
    const newGenres = data.genres.filter((g) => !existingNames.includes(g));

    let insertedGenres = [];
    if (newGenres.length > 0) {
      const { data: insertedData, error: insertError } = await supabase
        .from("genres")
        .insert(newGenres.map((name) => ({ name })))
        .select("*");

      if (insertError) throw insertError;
      insertedGenres = insertedData;
    }

    const allGenres = [...existingGenres, ...insertedGenres];

    // c) Clear existing links in video_genres
    const { error: deleteLinksError } = await supabase
      .from("video_genres")
      .delete()
      .eq("video_id", videoId);

    if (deleteLinksError) throw deleteLinksError;

    // d) Insert new links
    const { error: insertLinksError } = await supabase
      .from("video_genres")
      .insert(allGenres.map((g) => ({ video_id: videoId, genre_id: g.id })));

    if (insertLinksError) throw insertLinksError;

    // 3️⃣ Handle cast members
    // Clear existing cast
    const { error: deleteCastError } = await supabase
      .from("cast_members")
      .delete()
      .eq("video_id", videoId);
    if (deleteCastError) throw deleteCastError;

    // Insert new cast
    if (data.cast.length > 0) {
      const { error: insertCastError } = await supabase
        .from("cast_members")
        .insert(data.cast.map((name) => ({ video_id: videoId, name })));
      if (insertCastError) throw insertCastError;
    }

    // 4️⃣ Handle crew members
    // Clear existing crew
    const { error: deleteCrewError } = await supabase
      .from("crew_members")
      .delete()
      .eq("video_id", videoId);
    if (deleteCrewError) throw deleteCrewError;

    // For crew, we need role IDs
    const roleNames = data.crew.map((c) => c.role);
    const { data: existingRoles, error: roleFetchError } = await supabase
      .from("crew_roles")
      .select("id, name")
      .in("name", roleNames);
    if (roleFetchError) throw roleFetchError;

    const existingRoleNames = existingRoles.map((r) => r.name);
    const newRoles = roleNames.filter((r) => !existingRoleNames.includes(r));

    let insertedRoles = [];
    if (newRoles.length > 0) {
      const { data: insertedRoleData, error: insertRoleError } = await supabase
        .from("crew_roles")
        .insert(newRoles.map((name) => ({ name })))
        .select("*");
      if (insertRoleError) throw insertRoleError;
      insertedRoles = insertedRoleData;
    }

    const allRoles = [...existingRoles, ...insertedRoles];

    // Insert crew members
    if (data.crew.length > 0) {
      const { error: insertCrewError } = await supabase
        .from("crew_members")
        .insert(
          data.crew.map((c) => {
            const role = allRoles.find((r) => r.name === c.role);
            return { video_id: videoId, name: c.name, role_id: role.id };
          })
        );
      if (insertCrewError) throw insertCrewError;
    }

    return { success: true };
  } catch (error) {
    console.error("saveVideoDetails error:", error);
    return { success: false, error };
  }
};
