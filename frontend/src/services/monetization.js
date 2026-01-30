import { supabase } from "../config/supabase";

//Service: fetch monetization data 
export const monetizationData = async (monetization_id) => {
    const { data, error } = await supabase
        .from("monetizations")
        .select("*")
        .eq("id", monetization_id)
        .maybeSingle();
    if (error) {
        return {
            success: false,
            error: error.message || "Failed to fetch monetization data"
        }
    }
    return {
        success: true,
        data
    }
}

//Service: create/update monetization 
export const upsertMonetization = async (
    monetizationId,
    type,
    localAdsConfig
) => {
    const payload = {
        type,
        ad_type: localAdsConfig.adType || null,
        ad_duration: localAdsConfig.duration || null,
        subscription_type: localAdsConfig.subscriptionType || null,
    };

    // if monetizationId exists → update
    // else → insert
    const { data, error } = await supabase
        .from("monetizations")
        .upsert(
            monetizationId
                ? { id: monetizationId, ...payload }
                : payload
        )
        .select()
        .single();
        
    if (error) {
        console.error("Upsert monetization failed:", error);
        return {
            success: false,
            error: error.message,
        };
    } 
    return {
        success: true,
        monetizationId: data.id,
    };
};
