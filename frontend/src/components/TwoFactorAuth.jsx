import React, { useState } from "react";

const TwoFactorSetup = () => {
  const [selectedOption, setSelectedOption] = useState("auth");

  const handleSelection = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="w-full min-h-screen py-12 px-6 text-white">
      {/* Header and Info */}
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Help protect your account</h1>
        <p className="text-sm text-gray-400">
          Set up two-factor authentication and we'll send you a notification to
          check it's you if someone logs in from a device we don't recognize.{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Learn more
          </span>
        </p>

        <h2 className="text-sm font-medium mt-6">
          Choose how you want to receive your notification
        </h2>
      </div>

      {/* Options */}
      <div className="mt-4 border border-gray-700 rounded-lg divide-y divide-gray-700 max-w-md">
        {/* Option 1: Authentication App */}
        <label
          className="flex items-start px-4 py-4 space-x-3 cursor-pointer"
          onClick={() => handleSelection("auth")}
        >
          <input
            type="radio"
            name="method"
            checked={selectedOption === "auth"}
            onChange={() => handleSelection("auth")}
            className="mt-1 accent-blue-500"
          />
          <div className="text-sm">
            <p className="font-medium">Authentication app</p>
            <p className="text-green-500 font-medium">Recommended</p>
            <p className="text-gray-400">
              Get one-time codes from an app, such as Duo Mobile or Google
              Authenticator.
            </p>
          </div>
        </label>

        {/* Option 2: SMS or WhatsApp */}
        <label
          className="flex items-start px-4 py-4 space-x-3 cursor-pointer"
          onClick={() => handleSelection("sms")}
        >
          <input
            type="radio"
            name="method"
            checked={selectedOption === "sms"}
            onChange={() => handleSelection("sms")}
            className="mt-1 accent-blue-500"
          />
          <div className="text-sm">
            <p className="font-medium">SMS or WhatsApp</p>
            <p className="text-gray-400">
              We'll send a code to the mobile number you choose.
            </p>
          </div>
        </label>
      </div>

      {/* Next Button */}
      <button
        className="mt-10 w-full max-w-md bg-red-600 hover:bg-red-900 transition text-white font-medium py-3 rounded-full text-sm"
        onClick={() => alert(`Selected: ${selectedOption}`)}
      >
        Next
      </button>
    </div>
  );
};

export default TwoFactorSetup;
