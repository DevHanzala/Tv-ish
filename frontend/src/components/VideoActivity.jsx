//Fail code 
// remove before finalizoation

import React, { useState } from 'react';

const VideoActivity = ({
  title = "My Last Activity",
  tabs = [],
  videos = [],
  initialTab = "",
  onTabChange = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 text-white w-full">
      {/* Section Title */}
      {title && (
        <h2 className="text-base sm:text-lg font-semibold mb-4 uppercase">
          {title}
        </h2>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`pb-2 transition-all text-sm sm:text-base whitespace-nowrap
              ${activeTab === tab
                ? 'border-b-2 border-red-500 text-white'
                : 'text-gray-400 hover:text-white'}
              min-w-[80px] flex-shrink-0
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-36 sm:h-44 object-cover"
              />
              {video.duration && (
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-xs px-2 py-0.5 rounded text-white select-none">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm sm:text-base font-medium mb-1 truncate" title={video.title}>
                {video.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 truncate" title={`By ${video.author}`}>
                by {video.author}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">{video.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoActivity;
