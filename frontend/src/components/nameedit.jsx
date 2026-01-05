import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NameEdit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Admin");

  const handleSave = () => {
    // Normally: send updated name to backend
    console.log("Saved name:", name);
    navigate(-1); // go back
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-8 py-12">
      <div className="bg-[#1c1f24] p-6 rounded-xl shadow-sm">
        {/* Back Button */}
        <div
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition"
        >
          <FiArrowLeft className="text-lg" />
          <span className="text-sm">Back</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit name</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-2xl">
            Enter your real name so people can recognize you.
          </p>
        </div>

        {/* Input box */}
        <div className="space-y-5 border border-gray-700 rounded-xl p-5 bg-[#101418]">
          <label className="text-sm text-gray-400">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Save button */}
        <div className="pt-6">
          <button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-md text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameEdit;
