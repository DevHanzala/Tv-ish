import React from 'react';

const videos = [
  {
    id: 1,
    thumbnail: 'https://i.ytimg.com/vi/ysz5S6PUM-U/hqdefault.jpg',
    title: 'Latest Tech News & Updates',
    channel: 'Tech Insider',
    views: '1.2M views',
    time: '2 days ago',
  },
  {
    id: 2,
    thumbnail: 'https://i.ytimg.com/vi/J---aiyznGQ/hqdefault.jpg',
    title: 'Breaking News: Market Crash',
    channel: 'World News',
    views: '900K views',
    time: '1 day ago',
  },
  {
    id: 3,
    thumbnail: 'https://i.ytimg.com/vi/tVj0ZTS4WF4/hqdefault.jpg',
    title: 'New Gadgets Unveiled 2025',
    channel: 'Gadget Guru',
    views: '500K views',
    time: '3 days ago',
  },
];

export default function News() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-12 pt-16 pb-10">
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold mb-12 border-b border-gray-700 pb-4 text-white">
        📰 Trending News
      </h1>

      {/* News Cards */}
      <div className="space-y-10">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group flex flex-col sm:flex-row gap-6 items-center bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 rounded-2xl shadow-xl overflow-hidden p-5 sm:p-6"
          >
            {/* Thumbnail Section */}
            <div className="relative w-full sm:w-60 h-36 sm:h-32 overflow-hidden rounded-xl shadow-lg">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold leading-tight mb-2 group-hover:text-red-500 transition">
                {video.title}
              </h2>
              <p className="text-gray-400 text-sm mb-1">{video.channel}</p>
              <p className="text-gray-500 text-sm">
                {video.views} • {video.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
