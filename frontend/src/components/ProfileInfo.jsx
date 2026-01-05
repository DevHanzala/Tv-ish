import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiCalendar } from "react-icons/fi";

const ProfileInfo = () => {
  const [dob, setDob] = useState("1999-10-17");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    inputRef.current?.showPicker(); // Open native date picker
  };

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-8 py-12">
      <div className="bg-[#1c1f24] p-6 rounded-xl shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Personal details</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-3xl">
            This information helps verify your identity and keep our community safe.
            You decide what personal details are visible to others.
          </p>
        </div>

        {/* Detail Box */}
        <div className="space-y-5 border border-gray-700 rounded-xl p-5 bg-[#101418]">
          {/* Name */}
          <div
            onClick={() => navigate("/nameedit")}
            className="flex items-center justify-between hover:bg-[#2a2e34] transition rounded-md px-4 py-4 cursor-pointer"
          >
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-base font-medium">Admin</p>
            </div>
            <FiChevronRight className="text-gray-400 text-xl" />
          </div>

          {/* Birthday */}
          <div className="hover:bg-[#2a2e34] transition rounded-md px-4 py-4">
            <p className="text-sm text-gray-400 mb-2">Birthday</p>
            <div className="relative w-full max-w-xs">
              <input
                type="date"
                ref={inputRef}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full appearance-none bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500
                [&::-webkit-calendar-picker-indicator]:opacity-0 
                [&::-webkit-calendar-picker-indicator]:absolute 
                [&::-webkit-calendar-picker-indicator]:right-0 
                [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <FiCalendar
                onClick={handleCalendarClick}
                className="absolute right-3 top-3 text-white text-lg cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected:{" "}
              <span className="text-white font-medium">{formatDate(dob)}</span>
            </p>
          </div>

          {/* Account Ownership */}
          <div
            onClick={() => navigate("/accountownership")}
            className="flex items-center justify-between hover:bg-[#2a2e34] transition rounded-md px-4 py-4 cursor-pointer"
          >
            <div>
              <p className="text-sm text-gray-400">Account ownership and control</p>
              <p className="text-sm text-gray-500 leading-snug max-w-xl">
                Manage your data, modify your legacy contact, deactivate or delete your accounts and profiles.
              </p>
            </div>
            <FiChevronRight className="text-gray-400 text-xl self-start mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
