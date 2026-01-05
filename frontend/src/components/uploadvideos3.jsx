import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpload } from "../context/UploadContext"; // ✅ Context Import

export default function UploadVideos3() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Use Upload Context
  const { uploadData, updateField } = useUpload();

  // 🔥 Local States
  const [genres, setGenres] = useState(uploadData.genres || []);
  const [cast, setCast] = useState(uploadData.cast || []);
  const [crew, setCrew] = useState(uploadData.crew || []);
  const [synopsis, setSynopsis] = useState(uploadData.synopsis || "");

  const [genreInput, setGenreInput] = useState("");
  const [castInput, setCastInput] = useState("");
  const [crewInput, setCrewInput] = useState({ name: "", role: "" });

  // 🔥 Auto-save to Context
  useEffect(() => updateField("genres", genres), [genres]);
  useEffect(() => updateField("cast", cast), [cast]);
  useEffect(() => updateField("crew", crew), [crew]);
  useEffect(() => updateField("synopsis", synopsis), [synopsis]);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate(-1), 250);
  };

  // Step logic
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
    else if (step === 5) navigate("/Monetization");
  };

  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "Video elements" },
    { id: 3, label: "Checks" },
    { id: 4, label: "Visibility" },
    { id: 5, label: "Monetization" },
  ];

  // ✅ FIXED TAG INPUT
  const handleTagInput = (e, value, setValue, setList, listArray) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed && !listArray.includes(trimmed)) {
        setList((prev) => [...prev, trimmed]);
      }
      setValue("");
    }
  };

  const removeTag = (index, setList) => {
    setList((prev) => prev.filter((_, i) => i !== index));
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
                  <h1 className="text-xl font-semibold">
                    My Store · Themes · Shopify Google Chrome 2025 02 06 00 30 16
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">Saved as private</p>
                </div>

                {/* Progress Steps */}
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
                        <span className="text-xs text-gray-300 mt-2">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Project Profile Section */}
                <div className="space-y-6 mt-10">
                  <h2 className="text-lg font-semibold">Project Profile</h2>
                  <p className="text-sm text-gray-400">
                    Provide basic information about your video project including synopsis, genre, cast, and crew.
                  </p>

                  {/* Synopsis (Moved to top) */}
                  <div className="flex flex-col bg-[#0f0f0f] border border-gray-700 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-200 mb-2">
                      Synopsis
                    </label>

                    <textarea
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                      placeholder="Write a short summary of your video or story..."
                      rows="4"
                      className="bg-black border border-gray-700 text-sm px-3 py-2 rounded resize-none focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Genre */}
                  <div className="flex flex-col bg-[#0f0f0f] border border-gray-700 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-200 mb-2">
                      Genre
                    </label>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {genres.map((item, index) => (
                        <span
                          key={index}
                          className="bg-blue-600/20 border border-blue-500 text-blue-400 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          {item}
                          <button onClick={() => removeTag(index, setGenres)}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <input
                      type="text"
                      value={genreInput}
                      onChange={(e) => setGenreInput(e.target.value)}
                      onKeyDown={(e) =>
                        handleTagInput(e, genreInput, setGenreInput, setGenres, genres)
                      }
                      placeholder="Type and press Enter..."
                      className="bg-black border border-gray-700 text-sm px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Cast */}
                  <div className="flex flex-col bg-[#0f0f0f] border border-gray-700 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-200 mb-2">
                      Cast
                    </label>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {cast.map((person, index) => (
                        <span
                          key={index}
                          className="bg-purple-600/20 border border-purple-500 text-purple-400 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          {person}
                          <button onClick={() => removeTag(index, setCast)}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <input
                      type="text"
                      value={castInput}
                      onChange={(e) => setCastInput(e.target.value)}
                      onKeyDown={(e) =>
                        handleTagInput(e, castInput, setCastInput, setCast, cast)
                      }
                      placeholder="Type actor name & press Enter..."
                      className="bg-black border border-gray-700 text-sm px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Crew */}
                  <div className="flex flex-col bg-[#0f0f0f] border border-gray-700 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-200 mb-2">
                      Crew
                    </label>

                    <p className="text-xs text-gray-400 mb-3">
                      Add each crew member with their role (e.g. Director, Writer, Editor)
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {crew.map((member, index) => (
                        <span
                          key={index}
                          className="bg-green-600/20 border border-green-500 text-green-400 text-xs px-3 py-1.5 rounded-full flex items-center gap-1"
                        >
                          <span className="font-medium">{member.name}</span>
                          <span className="text-gray-400">({member.role})</span>
                          <button onClick={() => removeTag(index, setCrew)}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={crewInput.name || ""}
                        onChange={(e) =>
                          setCrewInput((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Crew member name..."
                        className="flex-1 bg-black border border-gray-700 text-sm px-3 py-2 rounded focus:outline-none focus:border-green-500"
                      />

                      <select
                        value={crewInput.role || ""}
                        onChange={(e) =>
                          setCrewInput((prev) => ({ ...prev, role: e.target.value }))
                        }
                        className="w-40 bg-black border border-gray-700 text-sm px-3 py-2 rounded focus:outline-none focus:border-green-500"
                      >
                        <option value="">Select role</option>
                        <option value="Director">Director</option>
                        <option value="Writer">Writer</option>
                        <option value="Producer">Producer</option>
                        <option value="Editor">Editor</option>
                        <option value="Cinematographer">Cinematographer</option>
                        <option value="Composer">Composer</option>
                        <option value="Sound Designer">Sound Designer</option>
                        <option value="VFX Artist">VFX Artist</option>
                        <option value="Other">Other</option>
                      </select>

                      <button
                        onClick={() => {
                          if (crewInput.name && crewInput.role) {
                            setCrew((prev) => [...prev, crewInput]);
                            setCrewInput({ name: "", role: "" });
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Elements Section */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold">Video elements</h2>
                  <p className="text-sm text-gray-400">
                    Use cards and an end screen to show viewers related videos,
                    websites and calls to action.{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Learn more
                    </a>
                  </p>

                  {/* Subtitles */}
                  <div className="flex items-center justify-between bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 hover:border-gray-500 transition">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Add subtitles
                      </h3>
                      <p className="text-xs text-gray-400">
                        Reach a broader audience by adding subtitles to your video
                      </p>
                    </div>

                    <button className="bg-gray-700 hover:bg-gray-600 text-sm px-4 py-1.5 rounded">
                      Add
                    </button>
                  </div>

                  {/* End Screen */}
                  <div className="flex items-center justify-between bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 hover:border-gray-500 transition opacity-60 cursor-not-allowed">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Add an end screen
                      </h3>
                      <p className="text-xs text-gray-400">
                        Promote related content at the end of your video
                      </p>
                    </div>

                    <button
                      disabled
                      className="bg-gray-800 text-gray-500 text-sm px-4 py-1.5 rounded"
                    >
                      Add
                    </button>
                  </div>

                  {/* Cards */}
                  <div className="flex items-center justify-between bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 hover:border-gray-500 transition">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        Add cards
                      </h3>
                      <p className="text-xs text-gray-400">
                        Promote related content during your video
                      </p>
                    </div>

                    <button className="bg-gray-700 hover:bg-gray-600 text-sm px-4 py-1.5 rounded">
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-80 bg-[#1f1f1f] border-l border-gray-800 p-4 flex flex-col items-center justify-start">
                <div className="w-56 h-32 bg-[#0f0f0f] rounded-md overflow-hidden">
                  <img
                    src="https://i.ytimg.com/vi_webp/5qap5aO4i9A/mqdefault.webp"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">0:00 / 0:25</p>

                <div className="text-sm mt-3 w-full">
                  <p className="text-gray-300 truncate">Video link</p>
                  <a href="#" className="text-blue-500 text-xs break-all">
                    https://youtu.be/C6yMDE6gxzU
                  </a>

                  <p className="text-gray-400 text-xs mt-2">Filename</p>
                  <p className="text-xs text-gray-300 truncate">
                    My Store · Themes · Shopify - Google Chrome.mp4
                  </p>
                </div>
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
                Checks complete. No issues found.
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleStepClick(currentStep - 1)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-sm font-medium"
                >
                  Back
                </button>

                <button
                  onClick={() => handleStepClick(currentStep + 1)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-sm font-medium"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
