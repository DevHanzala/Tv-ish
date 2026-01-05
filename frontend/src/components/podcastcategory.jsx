import React from "react";

const WeeklyTopCategory = () => {
  return (
    <div className="bg-black text-white py-10 px-4">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Weekly Top Category
      </h2>

      {/* Grid layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 h-[520px]">
        {/* Comedy - left column, spans 2 rows */}
        <div className="row-span-2 relative rounded overflow-hidden 
                        transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <img
            src="/images/Rectangle 537.png"
            alt="Comedy"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-yellow-200 bg-opacity-70 p-4">
            <h3 className="text-lg font-bold text-black">Comedy</h3>
            <p className="text-sm text-black">65 CHANNELS</p>
          </div>
        </div>

        {/* Romance - top middle */}
        <div className="relative rounded overflow-hidden border-2 border-blue-400
                        transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <img
            src="/images/Rectangle 541.png"
            alt="Romance"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-pink-200 bg-opacity-80 p-4">
            <h3 className="text-lg font-bold text-black">Romance</h3>
            <p className="text-sm text-black">55 CHANNELS</p>
          </div>
        </div>

        {/* Music - right column, spans 2 rows */}
        <div className="row-span-2 relative rounded overflow-hidden
                        transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <img
            src="/images/Rectangle 538.png"
            alt="Music"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-white bg-opacity-80 p-4">
            <h3 className="text-lg font-bold text-black">Music</h3>
            <p className="text-sm text-black">70 CHANNELS</p>
          </div>
        </div>

        {/* Bottom middle: Story Life + Covid (side by side) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Story Life */}
          <div className="relative rounded overflow-hidden border-2 border-blue-400
                          transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img
              src="/images/Rectangle 542.png"
              alt="Story Life"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full bg-teal-700 bg-opacity-60 p-4">
              <h3 className="text-lg font-bold">Story Life</h3>
              <p className="text-sm">24 CHANNELS</p>
            </div>
          </div>

          {/* Covid */}
          <div className="relative rounded overflow-hidden
                          transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img
              src="/images/Rectangle 539.png"
              alt="Covid"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full bg-gray-400 bg-opacity-70 p-4">
              <h3 className="text-lg font-bold">Covid</h3>
              <p className="text-sm">14 CHANNELS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show More Category Button */}
      <div className="text-center mt-8">
        <button className="bg-[#1E1E2F] text-white px-6 py-3 rounded-md
                           hover:bg-[#2C2C3D] transition duration-300
                           transform hover:scale-105 shadow-md hover:shadow-lg">
          Show More Category
        </button>
      </div>
    </div>
  );
};

export default WeeklyTopCategory;
