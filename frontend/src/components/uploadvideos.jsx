import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadVideos() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 250);
  };

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChosen = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log("Selected files:", files);
      startFakeUpload();
    }
  };

  // Simulate upload progress
  const startFakeUpload = () => {
    setUploading(true);
    setCompleted(false);
    setProgress(0);

    let percent = 0;
    const interval = setInterval(() => {
      percent += 5;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setUploading(false);
        setCompleted(true);
      }
    }, 150);
  };

  // ✅ Navigate to uploadvideos2.jsx after upload complete
  const handleNext = () => {
    setOpen(false);
    setTimeout(() => {
      navigate("/uploadvideos2");
    }, 250);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFilesChosen}
        accept="video/*"
        multiple
        className="hidden"
      />

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl bg-[#181818] text-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Upload videos</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-700 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Upload Area */}
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center min-h-[320px]">
                {uploading ? (
                  <div className="w-full max-w-md">
                    <div className="flex flex-col items-center">
                      <Upload
                        size={36}
                        className="text-gray-400 mb-4 animate-bounce"
                      />
                      <p className="font-medium mb-2">Uploading your video...</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Please wait while your video is being uploaded.
                      </p>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-red-600 h-2 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: "linear", duration: 0.1 }}
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-2">{progress}%</p>
                    </div>
                  </div>
                ) : completed ? (
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle
                      size={60}
                      className="text-green-500 mb-4 animate-pulse"
                    />
                    <h3 className="font-semibold text-lg mb-2">
                      Upload Complete!
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Your video has been successfully uploaded.
                    </p>
                    {/* ✅ NEXT Button */}
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  // Default view
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800 mb-6">
                      <Upload size={36} className="text-gray-300" />
                    </div>
                    <h3 className="font-medium mb-2">
                      Drag and drop video files to upload
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">
                      Your videos will be private until you publish them.
                    </p>
                    <button
                      onClick={handleSelectFiles}
                      className="px-5 py-2.5 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
                    >
                      Select files
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 text-xs text-gray-500 border-t border-gray-700">
                By submitting your videos to YouTube, you acknowledge that you
                agree to YouTube’s{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">
                  Community Guidelines
                </span>
                . Please make sure you do not violate others' copyright or
                privacy rights.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
