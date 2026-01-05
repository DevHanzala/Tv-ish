import React, { useState } from "react";

const AccountOwnership = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // Add API call logic here
    console.log(`${selectedOption} confirmed`);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setSelectedOption("");
    setShowConfirm(false);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-8 py-12">
      <div className="bg-[#1c1f24] p-6 rounded-xl shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Account ownership and control</h1>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-2xl">
            Manage your data, deactivate or delete your account.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-5 border border-gray-700 rounded-xl p-5 bg-[#101418]">
          <div
            onClick={() => handleSelect("Deactivate")}
            className="hover:bg-[#2a2e34] transition rounded-md px-4 py-4 cursor-pointer"
          >
            <p className="text-base font-semibold text-white">Deactivate Account</p>
            <p className="text-sm text-gray-400">
              Temporarily disable your account and come back anytime.
            </p>
          </div>

          <div
            onClick={() => handleSelect("Delete")}
            className="hover:bg-[#2a2e34] transition rounded-md px-4 py-4 cursor-pointer"
          >
            <p className="text-base font-semibold text-red-500">Delete Account</p>
            <p className="text-sm text-gray-400">
              Permanently remove your account and all data.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-[#1c1f24] border border-gray-700 p-6 rounded-xl w-[90%] max-w-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">Are you sure?</h2>
            <p className="text-gray-400 mb-6">
              Do you really want to <span className="font-semibold text-red-400">{selectedOption.toLowerCase()}</span> your account?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Yes, {selectedOption}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountOwnership;
