import React from "react";
import { FaLock, FaEye } from "react-icons/fa";
import { MdPlaylistPlay } from "react-icons/md";

const PlaylistSection = ({ playlists }) => {
  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-md space-y-6">
      {/* Header with "View All" button */}
      <div className="flex items-center justify-between mb-4 px-2 sm:px-0">
        <h2 className="text-sm font-semibold text-gray-300 uppercase">
          My Playlist
        </h2>
        <button className="text-sm text-blue-400 hover:underline">View All</button>
      </div>

      {/* Scrollable Playlists List */}
      <div
        className="flex space-x-4 overflow-x-auto pb-2 scroll-smooth px-2 sm:px-0"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
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

        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] bg-gray-900 rounded-md overflow-hidden flex flex-col border border-gray-800 flex-shrink-0"
          >
            {/* Thumbnail Area (no background color or overlay) */}
            <div className="relative w-full aspect-[16/9]">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 text-xs rounded text-white">
                {playlist.videoCount}
              </div>
              <div className="absolute bottom-2 right-2 text-white">
                <MdPlaylistPlay size={20} />
              </div>
            </div>

            {/* Playlist Info */}
            <div className="p-3 space-y-1 flex-1 bg-gray-900">
              <h3 className="text-sm font-semibold line-clamp-1">
                {playlist.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2">
                {playlist.description || "No description available"}
              </p>
              <div className="flex items-center text-xs mt-2 space-x-1 text-gray-300">
                {playlist.privacy === "public" ? (
                  <>
                    <FaEye className="text-green-500" />
                    <span className="text-green-500">Public</span>
                  </>
                ) : (
                  <>
                    <FaLock className="text-gray-400" />
                    <span className="text-gray-400">Private</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSection;
