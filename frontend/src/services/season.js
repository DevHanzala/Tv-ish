import { supabase } from "../config/supabase.js";;

//Service: Find season by show ID and season number
export const findSeasonByShowAndNumber = async (showId, seasonNumber) => {
    const { data, error } = await supabase
        .from("seasons")
        .select("id")
        .eq("show_id", showId)
        .eq("season_number", seasonNumber)
        .maybeSingle();

    if (error) {
        console.error("Failed to find season:", error);
        return null;
    }

    return data;
};

//Service: create a new season for a show
export const createSeason = async (showId, seasonNumber) => {
    // Verify that season with particular number exists for the show
    const existingSeason = await findSeasonByShowAndNumber(showId, seasonNumber);
    if (existingSeason) {
        return {
            success: true, seasonId: existingSeason.id,
        };
    }

    // Create new season if not found
    const { data, error } = await supabase
        .from("seasons")
        .insert([
            {
                show_id: showId,
                season_number: seasonNumber,
            }
        ])
        .select()
        .single();

    if (error) {
        console.error("Failed to create season:", error);
        return {
            success: false,
            error: error.message || "Failed to create season",
        };
    }

    return {
        success: true,
        seasonId: data.id,
    };
};