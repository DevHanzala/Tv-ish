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
    //Verify that episode with particular number exists or not
    const existingEpisode = await findEpisodeBySeasonAndNumber(seasonId, episodenumber);

    // If episode exists and video ID is different, return error
    if (existingEpisode) {
        if (existingEpisode.video_id !== videoId) {
            return {
                success: false,
                error: "Episode already exists for this season",
            }
        }
        else {
            return {
                success: true,
                episodeId: existingEpisode.id,
            }
        }
    }

    // Create new episode if it doesn't exist
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

//Service: fetch episode and season by video ID
export const fetchEpisodeAndSeasonByVideoId = async (videoId) => {
        const { data, error } = await supabase
            .from("episodes")
            .select(`
          id,
          episode_number,
          season_id,
          seasons (
            id,
            season_number,
            show_id
          )
        `)
            .eq("video_id", videoId)
            .maybeSingle();

        if (error || !data) return;

        return data;

}
