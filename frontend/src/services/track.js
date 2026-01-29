import { supabase } from "../config/supabase";

//Service: create a new track for an album
export const createTrack = async (albumId, trackNumber, videoId) => {
    const { data, error } = await supabase
        .from("tracks")
        .insert([
            {
                album_id: albumId,
                track_number: trackNumber,
                video_id: videoId
            }
        ])
        .select()
        .single();

    if (error) {
        console.error("Error creating track:", error);
        return {
            success: false,
            error: error.message || "Failed to create track"
        };
    }
    return {
        success: true,
        data
    };
}

//Service: fetch track and album by video ID
export const fetchTrackAndAlbumByVideoId = async (videoId) => {
    const { data, error } = await supabase
        .from("tracks")
        .select(`
          id,
          track_number,
          album_id,
          albums (
            id,
            title,
            artist
          )
        `)
        .eq("video_id", videoId)
        .maybeSingle();

    if (error || !data) return null;

    return data;
}