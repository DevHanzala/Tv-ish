import { supabase } from "../config/supabase";

export const saveVideoDetails = async (videoId, data) => {
  try {
    /* =========================
       1️⃣ UPDATE VIDEO (no dependency)
    ========================== */
    const updateVideoPromise = supabase
      .from("videos")
      .update({ synopsis: data.synopsis })
      .eq("id", videoId);

    /* =========================
       2️⃣ GENRES (dependency chain stays sequential)
    ========================== */
    const { data: existingGenres, error: genreFetchError } = await supabase
      .from("genres")
      .select("id, name")
      .in("name", data.genres);

    if (genreFetchError) throw genreFetchError;

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

    const clearGenresPromise = supabase
      .from("video_genres")
      .delete()
      .eq("video_id", videoId);

    /* =========================
       3️⃣ CAST DELETE (independent)
    ========================== */
    const clearCastPromise = supabase
      .from("cast_members")
      .delete()
      .eq("video_id", videoId);

    /* =========================
       4️⃣ CREW DELETE (independent)
    ========================== */
    const clearCrewPromise = supabase
      .from("crew_members")
      .delete()
      .eq("video_id", videoId);

    /* =========================
       5️⃣ RUN ALL CLEARS + UPDATE IN PARALLEL
    ========================== */
    const results = await Promise.all([
      updateVideoPromise,
      clearGenresPromise,
      clearCastPromise,
      clearCrewPromise,
    ]);

    results.forEach((r) => {
      if (r?.error) throw r.error;
    });

    /* =========================
       6️⃣ INSERT GENRE LINKS
    ========================== */
    if (allGenres.length > 0) {
      const { error } = await supabase
        .from("video_genres")
        .insert(allGenres.map((g) => ({
          video_id: videoId,
          genre_id: g.id,
        })));

      if (error) throw error;
    }

    /* =========================
       7️⃣ INSERT CAST
    ========================== */
    if (data.cast.length > 0) {
      const { error } = await supabase
        .from("cast_members")
        .insert(
          data.cast.map((name) => ({
            video_id: videoId,
            name,
          }))
        );

      if (error) throw error;
    }

    /* =========================
       8️⃣ CREW ROLES (dependency chain stays sequential)
    ========================== */
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
      const { data: insertedRoleData, error } = await supabase
        .from("crew_roles")
        .insert(newRoles.map((name) => ({ name })))
        .select("*");

      if (error) throw error;
      insertedRoles = insertedRoleData;
    }

    const allRoles = [...existingRoles, ...insertedRoles];

    /* =========================
       9️⃣ INSERT CREW
    ========================== */
    if (data.crew.length > 0) {
      const { error } = await supabase
        .from("crew_members")
        .insert(
          data.crew.map((c) => {
            const role = allRoles.find((r) => r.name === c.role);
            return {
              video_id: videoId,
              name: c.name,
              role_id: role.id,
            };
          })
        );

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("saveVideoDetails error:", error);
    return { success: false, error };
  }
};
