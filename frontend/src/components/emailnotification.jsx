import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailNotification = () => {
  const [emailPrefs, setEmailPrefs] = useState({
    feedback: false,
    reminder: false,
    product: false,
    news: false,
    support: false,
    promotional: false,
  });

  const navigate = useNavigate();

  const toggleSwitch = (type) => {
    setEmailPrefs((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSave = () => {
    // Placeholder for saving preferences (e.g. API call)
    console.log("Saved preferences:", emailPrefs);
    alert("Preferences saved successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-12">
      {/* Main heading (not indented) */}
      <h1 className="text-2xl font-bold text-red-600 mb-6">Email Notifications</h1>

      {/* All content indented */}
      <div className="ml-6 space-y-6">
        {/* Email options */}
        {[
          {
            key: "feedback",
            title: "Feedback emails",
            desc: "Give feedback on Instagram.",
          },
          {
            key: "reminder",
            title: "Reminder emails",
            desc: "Get notifications you may have missed.",
          },
          {
            key: "product",
            title: "Product emails",
            desc: "Get tips and resources about Instagram's tools.",
          },
          {
            key: "news",
            title: "News emails",
            desc: "Learn about new Instagram features.",
          },
          {
            key: "support",
            title: "Support emails",
            desc: "Get updates on reports and violations of our Community Standards.",
          },
          {
            key: "promotional",
            title: "Promotional emails",
            desc: "Learn more about offers and features for Instagram professional accounts.",
          },
        ].map(({ key, title, desc }) => (
          <div className="flex justify-between items-center" key={key}>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-gray-400 ml-3">{desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailPrefs[key]}
                onChange={() => toggleSwitch(key)}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-red-600 transition-all"></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  emailPrefs[key] ? "translate-x-5" : ""
                }`}
              ></div>
            </label>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="mt-10 flex gap-4">
          
          <button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;
