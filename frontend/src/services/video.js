import { supabase } from "../config/supabase.js";
import * as tus from "tus-js-client";

// Service: Create empty video draft row and return its ID
const createDraft = async () => {
    const { data, error } = await supabase
        .from("videos")
        .insert([{}])
        .select()
        .single();

    if (error) {
        throw new Error(error.message || "Error creating video draft");
    }

    return data.id;
};

// Service: Update video_path in DB after upload completes
const updateVideoPath = async (videoId, filePath) => {
    const { error } = await supabase
        .from("videos")
        .update({ video_path: filePath })
        .eq("id", videoId);

    if (error) {
        throw new Error(error.message || "Error updating video path");
    }
};

// Service: Get current authenticated session
const getAuthSession = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        throw new Error("User not authenticated");
    }
    return session;
};


/**  Service: Upload video with resumable TUS + progress tracking
 Flow:
 1. Create DB draft
 2. Get auth session
 3. Upload file to Supabase Storage via TUS
 4. Update DB with final file path
 5. Resolve with videoId */

export const uploadVideo = async (userId, file, onProgress) => {

    // 1. Create draft and prepare storage path
    const videoId = await createDraft();
    const filePath = `${videoId}/original.mp4`;
    const bucketName = "videos";

    // 2. Get authenticated session for upload headers
    const session = await getAuthSession();

    // 3. Start resumable upload using tus-js-client
    return new Promise((resolve, reject) => {
        const upload = new tus.Upload(file, {

            // Supabase resumable upload endpoint
            endpoint: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/upload/resumable`,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            headers: {
                authorization: `Bearer ${session.access_token}`,
                apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
                "x-upsert": "false",
            },
            uploadDataDuringCreation: true,
            removeFingerprintOnSuccess: true,

            metadata: {
                bucketName,
                objectName: filePath,
                contentType: file.type,
                cacheControl: "3600",

                // This goes into storage.objects.user_metadata
                metadata: JSON.stringify({
                    owner_id: userId,   // used in RLS policies
                }),
            },

            // Supabase currently REQUIRES 6MB chunks for TUS
            chunkSize: 6 * 1024 * 1024,

            // Called on any upload failure
            onError: function (error) {
                console.error("Upload failed:", error);
                reject(error);
            },

            // Progress callback (bytes -> percentage)
            onProgress: function (bytesUploaded, bytesTotal) {
                const percent = Math.round(
                    (bytesUploaded / bytesTotal) * 100
                );

                // Send progress back to React UI
                if (onProgress) {
                    onProgress(percent);
                }
            },

            onSuccess: async function () {
                try {
                    // 4. Save file path in DB after successful upload
                    await updateVideoPath(videoId, filePath);

                    // 5. Resolve with videoId for navigation
                    resolve(videoId);
                } catch (err) {
                    reject(err);
                }
            },
        });

        /**  Resume previous unfinished upload if it exists
         This allows crash-safe / network-safe uploads. */

        upload.findPreviousUploads().then((previousUploads) => {
            if (previousUploads.length) {
                // Resume from last uploaded byte
                upload.resumeFromPreviousUpload(previousUploads[0]);
            }

            // Start (or resume) the upload
            upload.start();
        });
    });
};

// Service: Upload basic video details
export const uploadVideoDetails = async (videoId, title, description, category) => {
    
    const { error } = await supabase
        .from("videos")
        .update({
            title: title ?? null,
            description: description ?? null,
            category: category ?? null,
        })
        .eq("id", videoId);
    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
    };
};

// Service: Update video visibility and audience settings
export const updateVisibilityAndAudience = async (videoId, visibility, is_18_plus) => {
    const { error } = await supabase
        .from("videos")
        .update({
            visibility: visibility,
            is_18_plus: is_18_plus,
        })
        .eq("id", videoId);

    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
    };
};