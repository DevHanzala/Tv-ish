import React, { useState } from "react";
// Suppose you have a JSON file `languages.json` with this structure:
// [
//   { "code": "en", "name": "English" },
//   { "code": "es", "name": "Spanish" },
//   { "code": "fr", "name": "French" },
//   // ... many more
// ]
import allLanguages from "./languages.json"; // you need to create this file

// Dummy initial videos data
const initialVideos = [
  {
    title: "casting the summersable parts",
    description: "For more information contact us",
    languages: 0,
    languageList: [],
    modified: "1 Mar 2021",
    thumbnail: "https://i.imgur.com/h9oIDzK.png",
    status: "draft",
    publishDate: null,
  },
  {
    title: "another video example",
    description: "Video description here",
    languages: 2,
    languageList: ["English", "Spanish"],
    modified: "15 Apr 2023",
    thumbnail: "https://via.placeholder.com/128x64",
    status: "published",
    publishDate: "12 Apr 2023",
  },
];

const Subtitles = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [filter, setFilter] = useState("all");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("");

  const openLanguageModal = (index) => {
    setSelectedVideoIndex(index);
    setSelectedLanguageCode("");
  };

  const closeLanguageModal = () => {
    setSelectedVideoIndex(null);
    setSelectedLanguageCode("");
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguageCode(e.target.value);
  };

  const handleAddLanguage = () => {
    if (!selectedLanguageCode) {
      alert("Please select a language.");
      return;
    }
    const langObj = allLanguages.find((l) => l.code === selectedLanguageCode);
    if (!langObj) {
      alert("Language not found.");
      return;
    }

    setVideos((prevVideos) => {
      const updated = [...prevVideos];
      const video = updated[selectedVideoIndex];

      if (video.languageList.includes(langObj.name)) {
        alert(`"${langObj.name}" already added to "${video.title}".`);
        return updated;
      }

      video.languageList.push(langObj.name);
      video.languages = video.languageList.length;
      return updated;
    });

    closeLanguageModal();
  };

  const filteredVideos =
    filter === "all"
      ? videos
      : videos.filter((video) => video.status === filter);

  return (
    <div className="bg-black min-h-screen pt-20 px-8 text-white font-sans relative">
      <h1 className="text-3xl font-bold mb-8">Channel subtitles</h1>

      <div className="flex space-x-12 border-b border-gray-700 mb-6">
        {["all", "draft", "published"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 font-semibold capitalize ${
              filter === tab
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setFilter(tab)}
          >
            {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[3fr_2fr_2fr_1fr_2fr] gap-4 text-gray-400 text-sm mb-2 px-4">
        <div>Video</div>
        <div className="text-left">Languages</div>
        <div className="text-right">Modified on</div>
        <div className="text-center">Status</div>
        <div className="text-right">Date of Publish</div>
      </div>

      {filteredVideos.length > 0 ? (
        filteredVideos.map((video, idx) => (
          <div
            key={idx}
            onClick={() => openLanguageModal(idx)}
            className="grid grid-cols-[3fr_2fr_2fr_1fr_2fr] gap-4 items-center px-4 py-3 bg-gray-900 rounded-md mb-2 cursor-pointer hover:bg-gray-800 transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-32 h-16 object-cover rounded-sm"
              />
              <div className="flex flex-col">
                <span className="text-white text-sm font-semibold">
                  {video.title}
                </span>
                <span className="text-gray-400 text-xs">
                  {video.description}
                </span>
              </div>
            </div>

            <div className="text-sm text-white flex flex-wrap gap-2">
              {video.languageList.length > 0
                ? video.languageList.map((lang, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 px-2 py-0.5 rounded text-xs"
                    >
                      {lang}
                    </span>
                  ))
                : <span className="text-gray-400">No languages</span>}
            </div>

            <div className="text-right text-white text-sm font-semibold">
              {video.modified}
            </div>

            <div className="text-center">
              {video.status === "published" ? (
                <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">
                  Published
                </span>
              ) : (
                <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wide">
                  Draft
                </span>
              )}
            </div>

            <div className="text-right text-gray-400 text-sm">
              {video.status === "published" && video.publishDate
                ? video.publishDate
                : "—"}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 px-4">No videos available.</p>
      )}

      <div className="text-gray-400 text-xs text-right mt-8 px-4">
        1–{filteredVideos.length} of {filteredVideos.length}
      </div>

      {selectedVideoIndex !== null && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-8 relative">
            <button
              className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-400"
              onClick={closeLanguageModal}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Add Subtitle Language</h2>

            <div className="flex items-center space-x-4 mb-4">
              <img
                src={videos[selectedVideoIndex].thumbnail}
                alt={videos[selectedVideoIndex].title}
                className="w-28 h-16 object-cover rounded"
              />
              <div>
                <p className="text-white text-lg font-semibold">
                  {videos[selectedVideoIndex].title}
                </p>
                <p className="text-gray-400 text-sm">
                  {videos[selectedVideoIndex].description}
                </p>
              </div>
            </div>

            <label className="block text-sm mb-2 font-semibold">
              Which language do you want to add?
            </label>
            <select
              value={selectedLanguageCode}
              onChange={handleLanguageChange}
              className="w-full p-2 rounded bg-black text-white border border-gray-600 mb-4"
            >
              <option value="">Select a language</option>
              {allLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddLanguage}
              className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold transition"
            >
              Add Language
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subtitles;
