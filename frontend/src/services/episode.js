import { supabase } from "../config/supabase.js";;

//Service: Find episode by season ID and episode number
export const findEpisodeBySeasonAndNumber = async (seasonId, episodeNumber) => {
    const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("season_id", seasonId)
        .eq("episode_number", episodeNumber)
        .maybeSingle();

    if (error) {
        return null
    }

    return data;
};

//Service: create a new episode for a season
export const createEpisode = async (seasonId, episodenumber, videoId) => {
    //Verify that episode with particular number does not already exist for the season
    const existingEpisode = await findEpisodeBySeasonAndNumber(seasonId, episodenumber);
    if (existingEpisode) {
        return {
            success: false,
            error: "Episode already exists for this season",
        }
    }
    const { data, error } = await supabase
        .from("episodes")
        .insert([
            {
                season_id: seasonId,
                episode_number: episodenumber,
                video_id: videoId,
            }
        ])
        .select()
        .single();

    if (error) {
        return {
            success: false,
            error: error.message || "Failed to create episode"
        };
    }

    return {
        success: true,
        episodeId: data.id
    };
}
