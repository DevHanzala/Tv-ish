import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "parentalControlSettings";

const ParentalControls = () => {
  const [settings, setSettings] = useState({
    kidsOnly: false,
    block18: true,
    blockViolence: false,
    disableChat: false,
  });

  const [isOpen, setIsOpen] = useState(true);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // Load saved settings on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setSettings(JSON.parse(saved));
    setIsLoading(false); // Once settings are loaded, stop loading state
  }, []);

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 2000);
  };

  if (isLoading || !isOpen) return null; // Don't render until settings are loaded

  return (
    <div className="bg-[#0d0d0d] text-white w-[600px] p-8 rounded-lg relative font-sans">
      {/* Close Button - moved slightly lower and left */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-6 text-white text-3xl leading-none hover:text-red-600 transition-colors"
        aria-label="Close parental controls"
      >
        ×
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-6">
        {/* Left: Image + Title */}
        <div className="flex items-center space-x-4">
          <img
            src="/images/Old Man.png"
            alt="Icon"
            className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
          />
          <h2 className="text-2xl font-semibold">Parental Controls</h2>
        </div>

        {/* Right: Save Button */}
        <button
          onClick={handleSave}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded font-medium transition-colors"
        >
          Save changes
        </button>
      </div>

      {/* Saved confirmation */}
      {showSavedMessage && (
        <div className="text-green-400 text-sm mb-4">✔ Settings saved successfully.</div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-400 mb-6">
        Manage what your child can watch and do on this platform.
      </p>

      {/* Content Restriction */}
      <div className="border-t border-red-900 pt-4 mb-4">
        <h3 className="text-sm font-semibold mb-3">Content Restriction</h3>
        <ToggleSwitch
          label="Allow Kids Content Only"
          enabled={settings.kidsOnly}
          onToggle={() => toggle("kidsOnly")}
        />
        <ToggleSwitch
          label="Block 18+ Movies"
          enabled={settings.block18}
          onToggle={() => toggle("block18")}
        />
        <ToggleSwitch
          label="Block Horror/ Violent Content"
          enabled={settings.blockViolence}
          onToggle={() => toggle("blockViolence")}
        />
      </div>

      {/* Time Limit */}
      <div className="border-t border-red-900 pt-4 mb-4">
        <h3 className="text-sm font-semibold mb-1">
          Time <span className="font-normal">Limit</span>
        </h3>
        <p className="text-sm text-white">Set Watch Time Limit Per Day:</p>
      </div>

      {/* Communication Setting */}
      <div className="border-t border-red-900 pt-4">
        <h3 className="text-sm font-semibold mb-3">Communication Setting</h3>
        <ToggleSwitch
          label="Disable Chats/comments"
          enabled={settings.disableChat}
          onToggle={() => toggle("disableChat")}
        />
      </div>
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ label, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          enabled ? "bg-red-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ParentalControls;
