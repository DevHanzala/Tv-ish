import React from "react";

const Banner = () => {
  return (
    <div
      className="relative rounded-lg p-8 max-w-full mx-auto flex flex-col sm:flex-row items-center justify-between bg-black bg-opacity-90"
      style={{
        backgroundImage: "url('/images/Container1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "140px",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg pointer-events-none"></div>

      <div className="relative z-10 max-w-full sm:max-w-[70%] text-white text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
          Start Streaming for Free Today!
        </h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto sm:mx-0">
          Enjoy unlimited movies, shows, podcasts, and music—no subscription, no payment required.
        </p>
      </div>

      <button className="relative z-10 mt-4 sm:mt-0 bg-blue-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded transition whitespace-nowrap">
        Start Watching Now
      </button>
    </div>
  );
};

export default Banner;
