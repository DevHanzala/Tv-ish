import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Upload, Image, FileVideo } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useUpload } from "../context/UploadContext.jsx";
import { uploadMediaFile, deleteMediaFile } from "../services/mediaUpload.js";
import { useAuth } from "../hooks/useAuth.js";


export default function UploadVideos4() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { videoId } = useParams();
  const { media } = useUpload();
  const { user } = useAuth();

  const [localTrailer, setLocalTrailer] = useState(media.trailer);
  const [localArtworks, setLocalArtworks] = useState(media.artworks);
  const [showDimensionPopup, setShowDimensionPopup] = useState(false);
  const [showTrailerWarning, setShowTrailerWarning] = useState(false);
  const [artworkProgress, setArtworkProgress] = useState({});
  const [trailerProgress, setTrailerProgress] = useState(null);


  useEffect(() => {
    setLocalTrailer(media.trailer);
    setLocalArtworks(media.artworks);
  }, [media]);


  const dimensionOptions = [
    { label: "1920x1080", width: 1920, height: 1080 },
    { label: "1080x1080", width: 1080, height: 1080 },
    { label: "1280x720", width: 1280, height: 720 },
    { label: "720x720", width: 720, height: 720 },
  ];

  const trailerRequired = false;

  useEffect(() => setOpen(true), []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 250);
  };

  const getCurrentStep = () => {
    if (location.pathname.includes("Monetization")) return 5;
    if (location.pathname.includes("uploadvideos5")) return 4;
    if (location.pathname.includes("uploadvideos4")) return 3;
    if (location.pathname.includes("uploadvideos3")) return 2;
    return 1;
  };

  const currentStep = getCurrentStep();
  const allArtworksUploaded = Object.values(localArtworks).every(Boolean);

  const handleStepClick = (step) => {
    if (step === 1) navigate(`/uploadvideos2/${videoId}`);
    else if (step === 2) navigate(`/uploadvideos3/${videoId}`);
    else if (step === 3) navigate(`/uploadvideos4/${videoId}`);
    else if (step === 4) navigate(`/uploadvideos5/${videoId}`);
    else if (step === 5) navigate(`/Monetization/${videoId}`);
  };

  const handleTrailerDelete = async () => {
    await deleteMediaFile({
      bucket: "trailers",
      objectPath: localTrailer.path,
      type: "trailer",
      videoId,
    });

    setLocalTrailer(null);
    setTrailerProgress(null);
  };

  const handleArtworkDelete = async (size) => {
    const artwork = localArtworks[size];
    if (!artwork) return;

    await deleteMediaFile({
      bucket: "artworks",
      objectPath: artwork.path,
      type: "artwork",
      videoId,
      size,
    });

    setLocalArtworks((prev) => {
      const updated = { ...prev };
      delete updated[size];
      return updated;
    });

    setArtworkProgress((prev) => ({
      ...prev,
      [size]: null,
    }));
  };


  const handleArtworkUpload = async (file, size) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const path = `${videoId}/artworks/${size}.${ext}`;

    // reset progress on new upload / replace
    setArtworkProgress((prev) => ({
      ...prev,
      [size]: 0,
    }));

    await uploadMediaFile({
      user,
      videoId,
      file,
      bucket: "artworks",
      objectPath: path,
      type: "artwork",
      size,
      onProgress: (percent) => {
        setArtworkProgress((prev) => ({
          ...prev,
          [size]: percent,
        }));
      },
    });

    setLocalArtworks((prev) => ({
      ...prev,
      [size]: {
        path,
        name: file.name,
      },
    }));

    // clear progress after success
    setArtworkProgress((prev) => ({
      ...prev,
      [size]: null,
    }));
  };


  const handleTrailerUpload = async (file) => {

    const ext = file.name.split(".").pop().toLowerCase();
    const path = `${videoId}/trailer.${ext}`;


    await uploadMediaFile({
      user,
      videoId,
      file,
      bucket: "trailers",
      objectPath: path,
      type: "trailer",
      onProgress: (percent) => {
        setTrailerProgress(percent);
      },
    });


    setLocalTrailer({ path, name: file.name });
    setTrailerProgress(null)
  };




  const handleNextStep = () => {
    setShowTrailerWarning(false);
    handleStepClick(currentStep + 1);
  };



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
              <div className="flex-1 p-8 space-y-6 overflow-y-auto max-h-[85vh]">
                <div>
                  <h1 className="text-xl font-semibold">Media Upload — Trailer & Artwork</h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Upload additional media to enhance your video presentation.
                  </p>

                  {showTrailerWarning && (
                    <p className="text-red-500 font-medium mt-2">
                      Please upload the trailer and all artwork sizes before proceeding.
                    </p>
                  )}
                </div>

                {/* Progress Steps */}
                <div className="relative flex items-center justify-between w-full mt-6 mb-10 px-8">
                  <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-600 -translate-y-1/2 z-0" />
                  {[1, 2, 3, 4, 5].map((step) => {
                    const isCompleted = step < currentStep;
                    const isActive = step === currentStep;
                    return (
                      <div
                        key={step}
                        onClick={() => handleStepClick(step)}
                        className={`relative z-10 flex flex-col items-center cursor-pointer transition hover:scale-105 ${step > currentStep ? "opacity-60" : ""}`}
                      >
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${isCompleted ? "bg-white border-white text-black" : isActive ? "bg-blue-600 border-blue-600 text-white" : "bg-black border-gray-400"}`}>
                          {isCompleted ? <CheckCircle size={18} className="text-black" /> : <div className={`w-3 h-3 rounded-full ${isActive ? "bg-white" : "bg-gray-400"}`} />}
                        </div>
                        <span className="text-xs text-gray-300 mt-2">Step {step}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Trailer Upload */}
                <div className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <FileVideo size={20} className="text-blue-400" />
                    <h3 className="text-md font-medium">
                      {localTrailer ? "Added" : "Upload Trailer"}
                    </h3>
                  </div>

                  {!localTrailer ? (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg py-8 cursor-pointer hover:border-blue-500 transition">
                      <Upload size={30} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-300">
                        Click to upload trailer
                      </span>

                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleTrailerUpload(file);
                        }}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between bg-black/40 rounded-lg p-4">
                      <p className="text-sm text-gray-300">{localTrailer.name}</p>

                      {trailerProgress !== null && trailerProgress < 100 && (
                        <p className="text-xs text-gray-400 mt-1">
                          Uploading… {trailerProgress}%
                        </p>
                      )}


                      <label className="text-sm text-blue-400 cursor-pointer hover:underline">
                        Replace
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleTrailerUpload(file);
                          }}
                        />
                      </label>
                      <button
                        onClick={handleTrailerDelete}
                        className="text-sm text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Artwork Upload */}
                <div className="bg-[#0f0f0f] border border-gray-700 rounded-lg p-5 hover:border-gray-500 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <Image size={20} className="text-pink-400" />
                    <h3 className="text-md font-medium">Upload Artwork</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    Upload artwork for all sizes: 1920x1080, 1080x1080, 1280x720, 720x720.
                  </p>

                  <button
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg py-8 cursor-pointer hover:border-blue-500 transition w-full"
                    onClick={() => setShowDimensionPopup(true)}
                  >
                    <Upload size={30} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-300">Click to select artwork sizes and upload</span>
                  </button>

                  <div className="mt-5 space-y-4">
                    {Object.entries(localArtworks)
                      .filter(([, file]) => file)
                      .map(([label, file]) => (
                        <div key={label} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-300">{file.name}</p>

                            <label
                              htmlFor={`artworkFileInput-${label}`}
                              className="text-sm text-blue-400 cursor-pointer hover:underline"
                            >
                              Replace
                            </label>
                            <button
                              onClick={() => handleArtworkDelete(label)}
                              className="text-xs text-red-400 hover:underline"
                            >
                              Delete
                            </button>

                          </div>

                          {/* ✅ ADD THIS RIGHT HERE */}
                          {artworkProgress[label] && artworkProgress[label] < 100 && (
                            <p className="text-xs text-gray-400">
                              Uploading… {artworkProgress[label]}%
                            </p>
                          )}
                        </div>
                      ))}
                  </div>

                  {dimensionOptions.map((option) => (
                    <input
                      key={option.label}
                      type="file"
                      accept="image/*"
                      id={`artworkFileInput-${option.label}`}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleArtworkUpload(file, option.label);
                        }
                      }}

                      className="hidden"
                    />
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-80 bg-[#1f1f1f] border-l border-gray-800 p-4 flex flex-col items-center justify-start">
                <div className="w-56 h-32 bg-[#0f0f0f] rounded-md overflow-hidden">
                  <img src="https://i.ytimg.com/vi_webp/5qap5aO4i9A/mqdefault.webp" alt="Video thumbnail" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-gray-400 mt-2">0:00 / 0:25</p>
              </div>
            </motion.div>

            {/* Bottom Navigation */}
            <motion.div
              className="fixed bottom-0 left-0 w-full bg-[#181818] border-t border-gray-800 flex items-center justify-between px-6 py-3"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-green-500" />
                {localTrailer && Object.values(localArtworks).every((f) => f)
                  ? "All media uploaded successfully."
                  : "Waiting for uploads..."}

              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStepClick(currentStep - 1)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-sm font-medium"
                >
                  Back
                </button>

                <button
                  onClick={handleNextStep}
                  className={`px-6 py-2 rounded text-sm font-medium ${trailerRequired && (!localTrailer || !allArtworksUploaded)
                    ? "bg-gray-700 cursor-not-allowed text-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artwork Dimension Popup */}
      <AnimatePresence>
        {showDimensionPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setShowDimensionPopup(false)}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#1c1c1c] rounded-3xl p-6 w-96 flex flex-col gap-6 shadow-2xl"


              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >

              <button
                onClick={() => setShowDimensionPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-white text-2xl font-bold mb-4 text-center">Select Artwork Size</h2>
              <div className="grid grid-cols-2 gap-5">
                {dimensionOptions.map((option) => (
                  <motion.button
                    key={option.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      console.log("[Artwork] size selected:", option.label);
                      setShowDimensionPopup(false);
                      document
                        .getElementById(`artworkFileInput-${option.label}`)
                        .click();
                    }}
                  >

                    <div
                      className="w-28 rounded-lg border border-gray-500 overflow-hidden bg-black flex items-center justify-center"
                      style={{ height: `${(option.height / option.width) * 112}px` }}
                    >
                      <img src="/images/8.png" alt="Poster preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white font-semibold">{option.label}</span>
                    <span className="text-gray-300 text-xs">{`${option.width} x ${option.height}`}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
