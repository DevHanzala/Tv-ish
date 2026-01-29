import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useUpload } from "../context/UploadContext";
import { getShows } from "../services/show";
import { getAlbums } from "../services/album";
import { useAuth } from "../hooks/useAuth";
import { uploadVideoDetails } from "../services/video";
import { createSeason } from "../services/season";
import { createEpisode } from "../services/episode";
import { createTrack } from "../services/track";
import { createShow } from "../services/show";
import { createAlbum } from "../services/album";

export default function UploadVideos2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { videoId } = useParams();

  // Get Context Fields
  const { uploadData, updateField, loading } = useUpload();

  const [shows, setShows] = useState([]);
  const [creatingNewShow, setCreatingNewShow] = useState(false);

  const [albums, setAlbums] = useState([]);
  const [creatingNewAlbum, setCreatingNewAlbum] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("und");

  // OPEN MODAL
  const [open, setOpen] = useState(true);

  // Captions UI state (local mirrors context.captions which is an array)
  const [captions, setCaptions] = useState(uploadData.captions || []);
  const fileInputRef = useRef(null);

  // Fetch shows from Supabase
  useEffect(() => {
    fetchShows();
  }, []);

  // Fetch albums from Supabase
  useEffect(() => {
    fetchAlbums();
  }, []);

  // Fetch all shows
  const fetchShows = async () => {
    const shows = await getShows(user.id);
    setShows(shows);
  }

  // Fetch all albums
  const fetchAlbums = async () => {
    const albums = await getAlbums(user.id);
    setAlbums(albums);
  };

  // Add caption file to state
  const addCaptionFiles = (fileList, language = "und") => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0]; // only take first file per language
    const newCaption = {
      language,              // KEY
      fileName: file.name,  // DB field
      filePath: "",         // fill after upload
      fileObject: file,    // temporary, frontend only
    };

    setCaptions((prev) => {
      // remove existing caption for same language
      const filtered = prev.filter((c) => c.language !== language);
      return [...filtered, newCaption];
    });
  };

  // Remove caption by ID
  const removeCaption = (language) => {
    setCaptions((prev) => prev.filter((c) => c.language !== language));
  };

  // Handle file input
  const handleFileInputChange = (e) => {
    addCaptionFiles(e.target.files, selectedLanguage, "");
    e.target.value = "";
  };

  // update data to supabase as well as in context
  const handleUpload = async () => {
    // 1. Update video basic details
    const res = await uploadVideoDetails(
      videoId,
      uploadData.title,
      uploadData.description,
      uploadData.category
    );

    if (!res.success) {
      console.error("❌ Video details save failed:", res.error);
      return;
    }

    // 2. Handle Shows / Seasons / Episodes if category is shows
    if (uploadData.category === "shows") {
      // Determine showId
      let showId = uploadData.show_id || null;

      // CREATE SHOW (if needed)
      if (!showId && uploadData.showMode === "create") {
        const showRes = await createShow(
          uploadData.newShowTitle || null,
          uploadData.newShowDescription || null,
          user.id
        );

        if (!showRes.success) {
          console.log("Failed to create show", showRes.error);
          return;
        }

        showId = showRes.showId;
        updateField("show_id", showId);
      }

      // CREATE SEASON (if needed)
      let seasonId = uploadData.season_id || null;
      if (!seasonId) {
        const seasonRes = await createSeason(showId, uploadData.season);
        if (!seasonRes.success) {
          console.log("Failed to create/find season", seasonRes.error);
          return;
        }
        seasonId = seasonRes.seasonId;
        updateField("season_id", seasonId);
      }

      // CREATE EPISODE (if needed)
      if (!uploadData.episode_id) {
        const episodeRes = await createEpisode(seasonId, uploadData.episode, videoId);
        if (!episodeRes.success) {
          console.log("Failed to create/find episode", episodeRes.error);
          return;
        }
        updateField("episode_id", episodeRes.episodeId);
      }
    }

    // 3. Handle Music / Albums / Tracks
    else if (uploadData.category === "music") {
      // Determine albumId
      let albumId = uploadData.album_id || null;

      // CREATE ALBUM (if needed)
      if (!albumId && uploadData.albumMode === "create") {
        const albumRes = await createAlbum(
          user.id,
          uploadData.newAlbumTitle,
          uploadData.newAlbumArtist,
          uploadData.newAlbumDescription || null,
          user.id
        );

        if (!albumRes.success) {
          console.log("Failed to create album", albumRes.error);
          return;
        }

        albumId = albumRes.albumId;
        updateField("album_id", albumId);
      }

      // CREATE TRACK (if needed)
      if (!uploadData.track_id) {
        const trackRes = await createTrack(albumId, uploadData.trackNumber, videoId);
        if (!trackRes.success) {
          console.log("Failed to create track", trackRes.error);
          return;
        }
        updateField("track_id", trackRes.data.id);
      }
    }

    // TODO: handle Captions later
  };

  // update the data in supabase when modal is closed
  const handleClose = async () => {
    await handleUpload();
    setOpen(false);
    navigate("/dashboard");
  };



  // Progress Bar Steps
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

  // TODO: to update the data to supabase
  const handleStepClick = async (step) => {
    await handleUpload();

    if (step === 1) navigate(`/uploadvideos2/${videoId}`);
    else if (step === 2) navigate(`/uploadvideos3/${videoId}`);
    else if (step === 3) navigate(`/uploadvideos4/${videoId}`);
    else if (step === 4) navigate(`/uploadvideos5/${videoId}`);
    else if (step === 5) navigate(`/monetization/${videoId}`);
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
                        className={`relative z-10 flex flex-col items-center cursor-pointer transition hover:scale-105 ${step.id > currentStep ? "opacity-60" : ""
                          }`}
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${isCompleted
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
                              className={`w-3 h-3 rounded-full ${isActive ? "bg-white" : "bg-gray-400"
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
                    onChange={(e) => {
                      updateField("title", e.target.value);
                    }}

                    className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-300">Description</label>
                  <textarea
                    placeholder="Provide a brief description of your project"
                    value={uploadData.description || ""}
                    onChange={(e) => {
                      updateField("description", e.target.value);
                    }}

                    className="w-full h-24 bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm resize-none mt-1"
                  />
                </div>

                {/* Upload Type */}
                <div>
                  <label className="text-sm text-gray-300">What’s being uploaded?</label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => {
                      updateField("category", e.target.value);
                      setCreatingNewAlbum(false);
                      setCreatingNewShow(false);
                    }}
                    className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                  >
                    <option value={""}>Select type</option>
                    <option value={"movies"}>Movies</option>
                    <option value={"shows"}>Shows</option>
                    <option value={"podcast"}>Podcast</option>
                    <option value={"snips"}>Snips</option>
                    <option value={"music"}>Music</option>
                    <option value={"education"}>Education</option>
                    <option value={"sports"}>Sports</option>
                    <option value={"AI"}>AI</option>
                  </select>
                </div>

                {/* Shows → Season/Episode */}
                {uploadData.category === "shows" && (
                  <div className="space-y-6 border-t border-gray-700 pt-4">

                    {/* Show Selection */}
                    <div>
                      <label className="text-sm text-gray-300">Select Show</label>
                      <select
                        value={uploadData.show_id || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "__new__") {
                            setCreatingNewShow(true);
                            updateField("show_id", "");
                            updateField("showMode", "create");
                          } else {
                            setCreatingNewShow(false);
                            updateField("show_id", val);
                            updateField("showMode", "select");
                          }
                        }}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                      >
                        <option value=""> Select a show </option>
                        {shows.map((show) => (
                          <option key={show.id} value={show.id}>
                            {show.title}
                          </option>
                        ))}
                        <option value="__new__">+ Create new show</option>
                      </select>
                    </div>

                    {/* Create New Show */}
                    {creatingNewShow && (
                      <div className="space-y-3 mt-3">
                        <div>
                          <label className="text-sm text-gray-300">New Show Title</label>
                          <input
                            type="text"
                            value={uploadData.newShowTitle || ""}
                            onChange={(e) => updateField("newShowTitle", e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-300">New Show Description</label>
                          <textarea
                            value={uploadData.newShowDescription || ""}
                            onChange={(e) => updateField("newShowDescription", e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm resize-none mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* SEASON / EPISODE */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-300">Season</label>
                        <input
                          type="number"
                          value={uploadData.season || ""}
                          onChange={(e) => updateField("season", e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300">Episode</label>
                        <input
                          type="number"
                          value={uploadData.episode || ""}
                          onChange={(e) => updateField("episode", e.target.value)}
                          className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* Music → Album */}
                {uploadData.category === "music" && (
                  <div className="space-y-6 border-t border-gray-700 pt-4">

                    {/* Album Selection */}
                    <div>
                      <label className="text-sm text-gray-300">Select Album</label>
                      <select
                        value={uploadData.album_id || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "__new__") {
                            setCreatingNewAlbum(true);
                            updateField("album_id", ""); // reset selected album
                            updateField("albumMode", "create");
                          } else {
                            setCreatingNewAlbum(false);
                            updateField("album_id", val);
                            updateField("albumMode", "select");
                          }
                        }}
                        className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                      >
                        <option value=""> Select an album </option>
                        {albums.map((alb) => (
                          <option key={alb.id} value={alb.id}>
                            {alb.title}
                          </option>
                        ))}
                        <option value="__new__">+ Create new album</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Track Number"
                      value={uploadData.trackNumber || ""}
                      onChange={(e) => updateField("trackNumber", e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                    />

                    {/* Create New Album */}
                    {creatingNewAlbum && (
                      <div className="space-y-3 mt-3">
                        <div>
                          <label className="text-sm text-gray-300">New Album Title</label>
                          <input
                            type="text"
                            placeholder="Enter album title"
                            value={uploadData.newAlbumTitle || ""}
                            onChange={(e) => updateField("newAlbumTitle", e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-300">Artist Name</label>
                          <input
                            type="text"
                            placeholder="Enter artist name"
                            value={uploadData.newAlbumArtist || ""}
                            onChange={(e) => updateField("newAlbumArtist", e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-300">New Album Description</label>
                          <textarea
                            placeholder="Enter album description"
                            value={uploadData.newAlbumDescription || ""}
                            onChange={(e) => updateField("newAlbumDescription", e.target.value)}
                            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm resize-none mt-1"
                          />
                        </div>
                      </div>
                    )}
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
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="bg-[#0f0f0f] border border-gray-700 rounded-md p-2 text-sm"
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
                            onClick={() => fileInputRef.current.click()}
                            className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-sm"
                          >
                            Add captions file
                          </button>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".srt,.vtt,.txt"
                            onChange={handleFileInputChange}
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
                              key={c.language}
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
