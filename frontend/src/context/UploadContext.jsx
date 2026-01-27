// context/UploadContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabase.js";
import { useParams } from "react-router-dom";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const { videoId } = useParams(); // get videoId from URL
  const [uploadData, setUploadData] = useState({
    videoId: "",
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
        .select("title, description, category, id")
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
        videoId: videoData.id,
        title: videoData.title || "",
        description: videoData.description || "",
        category: videoData.category || "",
        captions: captionsData || [], // store captions array
      });

      setLoading(false);
    };
    fetchVideoDetails();
  }, [videoId]);

  // Log uploadData changes for debugging
  useEffect(() => {
    console.log("Updated uploadData:", uploadData);
  }, [uploadData]);


  // Update a single field in context
  const updateField = (field, value) => {
    setUploadData((prev) => ({
      ...prev,        // copy previous fields
      [field]: value, // update this one
    }));
  };

  return (
    <UploadContext.Provider
      value={{
        uploadData,
        updateField,
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
