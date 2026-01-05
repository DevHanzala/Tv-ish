// context/UploadContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [uploadData, setUploadData] = useState(() => {
    return JSON.parse(localStorage.getItem("upload-temp-data")) || {
      title: "",
      description: "",
      uploadType: "Select type",
      season: "",
      episode: "",
      album: "",
      captionType: "",
      captionFileName: "",
      visibility: "private",
      rating: "",
      legalChecks: {
        ownership: false,
        noCopyright: false,
        consent: false,
      },
      legalDoc: null, // save metadata {name,type}
    };
  });

  // Auto-save on every change
  useEffect(() => {
    localStorage.setItem("upload-temp-data", JSON.stringify(uploadData));
  }, [uploadData]);

  const updateField = (field, value) => {
    if (field === "legalDoc" && value instanceof File) {
      const fileMeta = { name: value.name, type: value.type };
      setUploadData((prev) => ({ ...prev, [field]: fileMeta }));
    } else {
      setUploadData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const resetUploadData = () => {
    localStorage.removeItem("upload-temp-data");
    setUploadData({
      title: "",
      description: "",
      uploadType: "Select type",
      season: "",
      episode: "",
      album: "",
      captionType: "",
      captionFileName: "",
      visibility: "private",
      rating: "",
      legalChecks: {
        ownership: false,
        noCopyright: false,
        consent: false,
      },
      legalDoc: null,
    });
  };

  return (
    <UploadContext.Provider value={{ uploadData, updateField, resetUploadData }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
