import { supabase } from "../config/supabase.js";

// Service: creating video draft
const createDraft = async () => {
    const { data, error } = await supabase
        .from("videos")
        .insert([{}])
        .select()
        .single();

    if (error) {
        throw new Error(error.message || "Error creating video draft");
    }

    return data.id; // return the new video id
};

// Service: upload video to bucket
export const uploadVideo = async (userId, file) => {

    // Ensure draft exists 
    const videoId = await createDraft();
    const filePath = `${videoId}/original.mp4`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
        .from("videos")
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false, // prevent overwriting
            contentType: file.type,
            metadata: {
                owner_id: userId, // RLS ownership
            },
        });

    if (error) {
        throw new Error(error.message || "Error uploading video");
    }

    // Update the video draft in the 'videos' table with the file path
    const { error: updateError } = await supabase
        .from("videos")
        .update({ video_path: filePath })
        .eq("id", videoId);

    if (updateError) {
        throw new Error(updateError.message || "Error updating video record with file path");
    }
    return videoId;
};
