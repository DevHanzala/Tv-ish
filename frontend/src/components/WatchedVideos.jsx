import React from "react";

const WatchedVideos = ({ videos }) => {
  return (
    <div className="w-full">
      {/* Header with "View All" button */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold">MY LAST ACTIVITY</h2>
        <button className="text-sm text-blue-400 hover:underline">
          View All
        </button>
      </div>

      {/* Videos list */}
      <div
        className="flex space-x-4 overflow-x-auto pb-2 px-4 md:px-0 scroll-smooth"
        style={{
          /* Hide scrollbar for WebKit browsers */
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none" // IE 10+
        }}
      >
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari and Opera */
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {videos.map((video, index) => (
          <div
            key={index}
            className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] bg-gray-900 rounded-lg shadow-md overflow-hidden flex-shrink-0"
          >
            <div className="relative aspect-[16/9]">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-2">
              <h3 className="text-sm truncate">{video.title}</h3>
              <p className="text-xs text-gray-400">by {video.nickname}</p>
              <p className="text-xs text-gray-500">{video.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchedVideos;
