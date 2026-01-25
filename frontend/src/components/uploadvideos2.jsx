import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// ⬅️ CONTEXT IMPORT
import { useUpload } from "../context/UploadContext";

export default function UploadVideos2() {
  const navigate = useNavigate();
  const location = useLocation();

  // ⬅️ GET CONTEXT FIELDS
  const { uploadData, updateField, finalizeUpload, resetUploadData, loading } = useUpload();

  // OPEN MODAL
  const [open, setOpen] = useState(false);

  // Load albums separately (NOT inside context)
  const [albumsList, setAlbumsList] = useState([]);

  // Captions UI state (local mirrors context.captions which is an array)
  const [captions, setCaptions] = useState(uploadData?.captions || []);
  const fileInputRef = useRef(null);

  useEffect(() => {
  if (uploadData?.captions) {
    setCaptions(uploadData.captions);
  }
}, [uploadData]);


  useEffect(() => {
    setOpen(true);
    const storedAlbums = JSON.parse(localStorage.getItem("albumsList") || "[]");
    setAlbumsList(storedAlbums);
  }, []);

  // Keep context in sync (auto-save)
  useEffect(() => {
    updateField("captions", captions);
  }, [captions]);

  // Helper to generate simple IDs for captions
  const genId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  // Add captions from FileList (supports multiple)
  const addCaptionFiles = (fileList, language = "und", label = "") => {
    if (!fileList || fileList.length === 0) return;

    const filesArray = Array.from(fileList);
    const newCaptions = filesArray.map((file) => ({
      id: genId(),
      language: language, // language code or label
      label: label || file.name.split(".").slice(0, -1).join(".") || file.name,
      fileName: file.name,
      size: file.size,
      type: file.type,
      fileObject: file,
      uploadedAt: new Date().toISOString(),
    }));

    // Append and save
    setCaptions((prev) => [...prev, ...newCaptions]);
  };

  const removeCaption = (id) => {
    setCaptions((prev) => prev.filter((c) => c.id !== id));
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // If user selected multiple files, treat them as individual captions with default language 'und'
    addCaptionFiles(files, "und", "");

    // reset input so same file can be re-picked if needed
    e.target.value = "";
  };

  // UI flow helpers — open file picker with a selected language & optional label prefilled
  const openFilePickerForLanguage = (language, label = "") => {
    // store a temporary attribute on the input element so we know which language to apply
    if (!fileInputRef.current) return;
    fileInputRef.current.dataset.lang = language;
    fileInputRef.current.dataset.lbl = label;
    fileInputRef.current.click();
  };

  // Enhanced handler that reads dataset to attach language/label to each file
  const handleFileInputChangeWithMeta = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const lang = e.target.dataset.lang || "und";
    const lbl = e.target.dataset.lbl || "";

    addCaptionFiles(files, lang, lbl);
    e.target.value = "";
    delete e.target.dataset.lang;
    delete e.target.dataset.lbl;
  };

  // HANDLE CLOSE (SAVE DRAFT + RESET CONTEXT)
  const handleClose = async () => {
    const dataToSave = { ...uploadData}
    delete dataToSave.captions; 
    const updateData = await finalizeUpload();
    // const draftData = {
    //   ...uploadData,
    //   captions,
    //   savedAt: new Date().toISOString(),
    //   status: "draft",
    // };

    // localStorage.setItem("videoDraft", JSON.stringify(draftData));

    // Save album if new
    // if (
    //   uploadData.uploadType === "Music" &&
    //   uploadData.album &&
    //   !albumsList.includes(uploadData.album)
    // ) {
    //   const updatedAlbums = [...albumsList, uploadData.album];
    //   setAlbumsList(updatedAlbums);
    //   localStorage.setItem("albumsList", JSON.stringify(updatedAlbums));
    // 
    if(updateData){
      console.log("data updated");
      
 // RESET context when modal closes
    resetUploadData();
    }
    navigate("/");
    setOpen(false);
  };

  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "Profile" },
    { id: 3, label: "Media" },
    { id: 4, label: "Listing" },
    { id: 5, label: "Monetization" },
  ];

  const getCurrentStep = () => {
    if (location.pathname.includes("uploadvideos5")) return 4;
    if (location.pathname.includes("Monetization")) return 5;
    if (location.pathname.includes("uploadvideos4")) return 3;
    if (location.pathname.includes("uploadvideos3")) return 2;
    return 1;
  };

  const currentStep = getCurrentStep();

  const handleStepClick = (step) => {
    if (step === 1) navigate("/uploadvideos2");
    else if (step === 2) navigate("/uploadvideos3");
    else if (step === 3) navigate("/uploadvideos4");
    else if (step === 4) navigate("/uploadvideos5");
    else if (step === 5) navigate("/monetization");
  };

  if (loading) {
    return <>Loading...</>
  }


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-[#181818] text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleClose}
                  className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Left Section */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[85vh]">
                <div>
                  <h1 className="text-xl font-semibold">Upload Project – Step 1: Basic Details</h1>
                  <p className="text-sm text-gray-400 mt-1">Saved as private</p>
                </div>

                {/* Progress Bar */}
                <div className="relative flex items-center justify-between w-full mt-6 mb-10 px-8">
                  <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-600 -translate-y-1/2 z-0" />
                  {steps.map((step) => {
                    const isCompleted = step.id < currentStep;
                    const isActive = step.id === currentStep;

                    return (
                      <div
                        key={step.id}
                        onClick={() => handleStepClick(step.id)}
                        className={`relative z-10 flex flex-col items-center cursor-pointer transition hover:scale-105 ${
                          step.id > currentStep ? "opacity-60" : ""
                        }`}
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                            isCompleted
                              ? "bg-white border-white text-black"
                              : isActive
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "bg-black border-gray-400"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle size={18} className="text-black" />
                          ) : (
                            <div
                              className={`w-3 h-3 rounded-full ${
                                isActive ? "bg-white" : "bg-gray-400"
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-xs text-gray-300 mt-2">{step.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* --- ALL YOUR ORIGINAL FIELDS (UNCHANGED) */}
                {/* Only onChange updated to use updateField() */}

                {/* Title */}
                <div>
                  <label className="text-sm text-gray-300">Title (required)</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    value={uploadData.title || ""}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-300">Description</label>
                  <textarea
                    placeholder="Provide a brief description of your project"
                    value={uploadData.description || ""}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="w-full h-24 bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm resize-none mt-1"
                  />
                </div>

                {/* Upload Type */}
                <div>
                  <label className="text-sm text-gray-300">What’s being uploaded?</label>
                  <select
                    value={uploadData.uploadType}
                    onChange={(e) => updateField("uploadType", e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                  >
                    <option>Select type</option>
                    <option>Movies</option>
                    <option>Shows</option>
                    <option>Podcast</option>
                    <option>Snips</option>
                    <option>Music</option>
                    <option>Education</option>
                    <option>Sports</option>
                    <option>AI</option>
                  </select>
                </div>

                {/* Shows → Season/Episode */}
                {uploadData.uploadType === "Shows" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-300">Season</label>
                      <input
                        type="text"
                        placeholder="Enter season number"
                        value={uploadData.season}
                        onChange={(e) => updateField("season", e.target.value)}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">Episode</label>
                      <input
                        type="text"
                        placeholder="Enter episode number"
                        value={uploadData.episode}
                        onChange={(e) => updateField("episode", e.target.value)}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Music → Album */}
                {uploadData.uploadType === "Music" && (
                  <div>
                    <label className="text-sm text-gray-300">Album</label>
                    <select
                      value={uploadData.album}
                      onChange={(e) => updateField("album", e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                    >
                      <option value="">Select or type album</option>
                      {albumsList.map((alb, idx) => (
                        <option key={idx} value={alb}>
                          {alb}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Or type new album"
                      value={uploadData.album}
                      onChange={(e) => updateField("album", e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                    />
                  </div>
                )}

                {/* Caption — UPDATED to multi-caption (Option A) */}
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-sm font-semibold mb-3">Captions</h3>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="captions"
                        value="upload-own"
                        checked={uploadData.captionType === "upload-own"}
                        onChange={(e) => updateField("captionType", e.target.value)}
                        className="accent-blue-600"
                      />
                      <span>Upload your own (multiple)</span>
                    </label>

                    {uploadData.captionType === "upload-own" && (
                      <div className="ml-6 mt-2 space-y-4">
                        {/* Quick add: pick language then open file picker */}
                        <div className="flex gap-2 items-center">
                          <select
                            id="captionLanguageSelect"
                            className="bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm"
                            defaultValue="und"
                          >
                            <option value="und">Select language</option>
                            <option value="en">English</option>
                            <option value="ur">Urdu</option>
                            <option value="hi">Hindi</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="ar">Arabic</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              const lang = document.getElementById("captionLanguageSelect").value || "und";
                              openFilePickerForLanguage(lang, "");
                            }}
                            className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-sm"
                          >
                            Add captions file
                          </button>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".srt,.vtt,.txt"
                            multiple
                            onChange={handleFileInputChangeWithMeta}
                            className="hidden"
                          />
                        </div>

                        {/* Captions List */}
                        <div className="grid gap-2">
                          {captions.length === 0 && (
                            <p className="text-xs text-gray-400">No captions added yet.</p>
                          )}

                          {captions.map((c) => (
                            <div
                              key={c.id}
                              className="flex items-center justify-between bg-[#0f0f0f] border border-gray-700 rounded-md p-2"
                            >
                              <div>
                                <div className="flex items-center gap-3">
                                  <strong className="text-sm">{c.label}</strong>
                                  <span className="text-xs text-gray-400">{c.fileName}</span>
                                  <span className="text-xs text-gray-400">• {c.language}</span>
                                </div>
                                <div className="text-xs text-gray-500">Added {new Date(c.uploadedAt).toLocaleString()}</div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                                  onClick={() => {
                                    // convert fileObject to downloadable blob URL for preview/download
                                    if (!c.fileObject) return;
                                    const url = URL.createObjectURL(c.fileObject);
                                    window.open(url, "_blank");
                                  }}
                                >
                                  Preview
                                </button>

                                <button
                                  className="text-xs px-3 py-1 rounded bg-red-600 hover:bg-red-700"
                                  onClick={() => removeCaption(c.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Save to context button (optional - auto-saved already) */}
                        <div>
                          <p className="text-xs text-gray-400">Captions are auto-saved to the upload context.</p>
                        </div>
                      </div>
                    )}

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="captions"
                        value="ai-generated"
                        checked={uploadData.captionType === "ai-generated"}
                        onChange={(e) => updateField("captionType", e.target.value)}
                        className="accent-blue-600"
                      />
                      <span>AI generated (coming soon)</span>
                    </label>
                  </div>
                </div>

                {/* Audience */}
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-sm font-semibold mb-2">Audience</h3>
                  <p className="text-xs text-gray-400 mb-3">Set whether your video is made for kids.</p>
                </div>
              </div>

              {/* Right side unchanged */}
              <div className="w-full md:w-80 bg-[#1f1f1f] border-l border-gray-800 p-4 flex flex-col items-center">
                <div className="w-56 h-32 bg-[#0f0f0f] rounded-md overflow-hidden">
                  <img
                    src="https://i.ytimg.com/vi_webp/5qap5aO4i9A/mqdefault.webp"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">0:00 / 0:25</p>
              </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              className="fixed bottom-0 left-0 w-full bg-[#181818] border-t border-gray-800 flex items-center justify-between px-6 py-3"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-green-500" />
                All fields auto-saved.
              </div>

              <button
                onClick={() => handleStepClick(currentStep + 1)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-sm font-medium"
              >
                Next
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
