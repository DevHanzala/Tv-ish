// context/UploadContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabase.js";
import { useParams } from "react-router-dom";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const { videoId } = useParams(); // get videoId from URL
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch minimal video details (title, description, category) and user captions
  useEffect(() => {
    if (!videoId) return;

    const fetchVideoDetails = async () => {
      setLoading(true);

      // Fetch video details
      const { data: videoData, error: videoError } = await supabase
        .from("videos")
        .select("title, description, category")
        .eq("id", videoId)
        .single();

      if (videoError) {
        console.error("Failed to fetch video details:", videoError);
        setLoading(false);
        return;
      }

      // Fetch captions for this video
      const { data: captionsData, error: captionsError } = await supabase
        .from("captions")
        .select("id, filename")
        .eq("video_id", videoId);

      if (captionsError) {
        console.error("Failed to fetch captions:", captionsError);
      }

      // Set uploadData state including captions
      setUploadData({
        title: videoData.title || "",
        description: videoData.description || "",
        category: videoData.category || "",
        captions: captionsData || [], // store captions array
      });

      setLoading(false);
    };
    console.log(uploadData);
    fetchVideoDetails();
  }, [videoId]);


  // Update a single field in context
  const updateField = (field, value) => {
    if (!["title", "description", "category"].includes(field)) return;
    setUploadData((prev) => ({ ...prev, [field]: value }));
  };

  // Update video details in Supabase
  const updateVideoDetails = async () => {
    if (!videoId) return false;

    // Extract only the fields we want to update
    const { title, description, category } = uploadData;
    const updatePayload = { title, description, category };

    const { error } = await supabase
      .from("videos")
      .update(updatePayload)
      .eq("id", videoId);

    if (error) {
      console.error("Failed to update video details:", error);
      return false;
    }

    return true;
  };

  return (
    <UploadContext.Provider
      value={{
        uploadData,
        updateField,
        updateVideoDetails,
        loading,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

// Hook to access UploadContext
export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) throw new Error("useUpload must be used within an UploadProvider");
  return context;
};
