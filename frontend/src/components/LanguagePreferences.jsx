import React, { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const LanguagePreferences = () => {
  const [translateVoice, setTranslateVoice] = useState(true);
  const [subtitles, setSubtitles] = useState(false);

  const [showLanguageList, setShowLanguageList] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const [showTranslateToList, setShowTranslateToList] = useState(false);
  const [selectedTranslateTo, setSelectedTranslateTo] = useState("English");

  const languages = [
    "English", "Urdu", "Hindi", "Spanish", "French", "German", "Arabic", "Chinese", "Japanese", "Korean",
  ];

  return (
    <div className="min-h-screen bg-black text-white px-5 pt-12 pb-6 text-sm space-y-6">

      {/* Main Heading */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-red-600">Language & Translation Settings</h1>
        <p className="text-xs text-gray-400">Manage how you experience language and translations across the app.</p>
      </div>

      {/* Instagram Language Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-400">language</h3>

        <div
          onClick={() => setShowLanguageList(!showLanguageList)}
          className="flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] px-3 py-2 rounded-md"
        >
          <span className="text-sm">Set language</span>
          {showLanguageList ? (
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
        </div>

        {showLanguageList && (
          <div className="bg-[#121212] rounded-md overflow-hidden">
            {languages.map((lang) => (
              <div
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageList(false); // Close dropdown
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#1f1f1f] ${
                  selectedLanguage === lang ? "bg-[#1f1f1f] text-blue-400" : "text-gray-300"
                }`}
              >
                {lang}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toggle Switches Section */}
      <div className="space-y-4 pt-1">

        {/* Translate Voice Toggle */}
        <div
          onClick={() => setTranslateVoice(!translateVoice)}
          className="flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] px-3 py-3 rounded-md"
        >
          <div className="pr-3">
            <p className="text-sm">Translate voice</p>
            <p className="text-xs text-gray-500">
              Hear audio translated into your default language in the speaker’s voice when available.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={translateVoice}
              onChange={(e) => {
                e.stopPropagation();
                setTranslateVoice(!translateVoice);
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-red-600 transition duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition duration-300"></div>
          </label>
        </div>

        {/* Subtitles Toggle */}
        <div
          onClick={() => setSubtitles(!subtitles)}
          className="flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] px-3 py-3 rounded-md"
        >
          <div className="pr-3">
            <p className="text-sm">Subtitles</p>
            <p className="text-xs text-gray-500">
              Display translated text on screen where available.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={subtitles}
              onChange={(e) => {
                e.stopPropagation();
                setSubtitles(!subtitles);
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-red-600 transition duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition duration-300"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LanguagePreferences;
