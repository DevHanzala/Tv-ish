// context/UploadContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabase.js";
import { useParams } from "react-router-dom";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const { videoId } = useParams(); // get videoId from URL
  const [uploadData, setUploadData] = useState(null);

  const [loading, setLoading] = useState(true);

  // Load draft from Supabase
  useEffect(() => {
    
    if (!videoId) return;

    const fetchDraft = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("id", videoId)
        .single();

      if (data) {
        setUploadData(data);
        console.log("Video Draft: " , data);
        localStorage.setItem("upload-temp-data", JSON.stringify(data));
      }
      setLoading(false);

      if (error) console.error("Failed to fetch video draft:", error);
    };

    fetchDraft();
  }, [videoId]);

  // Auto-save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("upload-temp-data", JSON.stringify(uploadData));
  }, [uploadData]);

  // Update a single field in context
  const updateField = (field, value) => {
    if (field === "legalDoc" && value instanceof File) {
      const fileMeta = { name: value.name, type: value.type };
      setUploadData((prev) => ({ ...prev, [field]: fileMeta }));
    } else {
      setUploadData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Final save to Supabase and clear localStorage
  const finalizeUpload = async () => {
    if (!videoId) return;

    const { error } = await supabase
      .from("videos")
      .update(uploadData)
      .eq("id", videoId);

    if (error) {
      console.error("Failed to finalize upload:", error);
      return false;
    }

    localStorage.removeItem("upload-temp-data");
    return true;
  };

  const resetUploadData = () => {
    localStorage.removeItem("upload-temp-data");
  };

  return (
    <UploadContext.Provider
      value={{
        uploadData,
        updateField,
        resetUploadData,
        finalizeUpload,
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
