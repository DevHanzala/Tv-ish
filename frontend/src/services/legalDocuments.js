import { supabase } from "../config/supabase.js";

export const fetchLegalDocByVideoId = async (videoId) => {
    const { data, error } = await supabase
        .from("legal_documents")
        .select("*")
        .eq("video_id", videoId)
        .maybeSingle();

    if (error) return null;
    return data;
};

// Service: insert or update legal checks into legal-docs bucket
export const insertOrUpdateLegalDoc = async (legalChecks, videoId) => {
    if (!videoId) {
        return { success: false, error: "videoId is required." };
    }

    // Upsert ensures it will insert if not exists, update if exists
    const { data, error } = await supabase
        .from("legal_documents")
        .upsert(
            {
                video_id: videoId,
                consent: legalChecks.consent,
                no_copyright: legalChecks.noCopyright,
                ownership: legalChecks.ownership
            }, // legalChecks should include ownership, noCopyright, consent
            { onConflict: "video_id" } // ensures it updates existing row with same video_id
        )
        .select()
        .single();

    if (error) {
        console.error("Upsert legal doc failed:", error);
        return {
            success: false,
            error: error.message || "Failed to upsert legal document.",
        };
    }

    return {
        success: true,
        legalId: data.id,
    };
};
