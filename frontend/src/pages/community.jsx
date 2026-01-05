import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Dummy Video + Comments Data with uploadDate for sorting
const videoData = [
  {
    title: 'React Hooks Crash Course',
    thumbnail: 'https://via.placeholder.com/150x90.png?text=Video+1',
    channelName: 'Code With Me',
    uploadDate: '2025-09-28', // YYYY-MM-DD
    comments: [
      { text: 'This was awesome, thanks!', username: 'AliDev', time: '2 hours ago', responded: false },
      { text: 'Can you explain useEffect?', username: 'ReactFan', time: '4 hours ago', responded: true },
    ],
  },
  {
    title: 'TailwindCSS From Scratch',
    thumbnail: 'https://via.placeholder.com/150x90.png?text=Video+2',
    channelName: 'DesignGuru',
    uploadDate: '2025-09-29',
    comments: [
      { text: 'Nice layout!', username: 'Designer', time: '1 day ago', responded: false },
    ],
  },
];

const FILTER_OPTIONS = [
  { key: 'unresponded', label: 'Unresponded' },
  { key: 'responded', label: 'Responded' },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('Comments');
  const [expandedVideoIndex, setExpandedVideoIndex] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const applyFilters = (comments) => {
    return comments.filter((comment) => {
      if (activeFilters.includes('unresponded') && comment.responded) return false;
      if (activeFilters.includes('responded') && !comment.responded) return false;
      if (searchText && !comment.text.toLowerCase().includes(searchText.toLowerCase()))
        return false;
      return true;
    });
  };

  const handleVideoClick = (index) => {
    setExpandedVideoIndex((prev) => (prev === index ? null : index));
  };

  // Filter videos based on activeFilters: show videos that have comments matching the filter
  // If no filters active, show all videos sorted by uploadDate descending (newest first)
  const getFilteredVideos = () => {
    if (activeFilters.length === 0 && searchText.trim() === '') {
      // No filters: sort videos by uploadDate descending
      return [...videoData].sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      );
    }

    // Filters applied - only show videos with comments matching filters
    return videoData.filter((video) => {
      const filteredComments = applyFilters(video.comments);
      return filteredComments.length > 0;
    });
  };

  const filteredVideos = getFilteredVideos();

  return (
    <div className="w-full bg-black text-white min-h-screen pt-14 px-6 pb-10 font-sans">
      {/* Main Heading */}
      <h1 className="text-4xl font-extrabold mb-8">Community</h1>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-700 mb-6">
        <button
          key="Comments"
          onClick={() => setActiveTab('Comments')}
          className={`pb-3 text-base font-semibold transition-colors ${
            activeTab === 'Comments'
              ? 'border-b-4 border-white text-white'
              : 'text-gray-500 hover:text-white'
          }`}
        >
          Comments
        </button>

        {/* 
        <button
          key="Mentions"
          onClick={() => setActiveTab('Mentions')}
          className={`pb-3 text-base font-semibold transition-colors ${
            activeTab === 'Mentions'
              ? 'border-b-4 border-white text-white'
              : 'text-gray-500 hover:text-white'
          }`}
        >
          Mentions
        </button>
        */}
      </div>

      {/* Filter Row */}
      <div className="relative mb-6">
        {/* Row: Filter Button + Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 text-gray-300 hover:text-white px-4 py-2 bg-[#1e1e1e] rounded-md"
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Search Input with Filter Pills Inside */}
          <div className="flex flex-wrap items-center gap-2 bg-[#1c1c1c] text-white placeholder-gray-500 text-sm rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-purple-600 flex-1 min-w-[200px]">
            {/* Filter Pills inside input */}
            {activeFilters.map((key) => {
              const label = FILTER_OPTIONS.find((f) => f.key === key)?.label;
              return (
                <span
                  key={key}
                  className="bg-purple-700 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1"
                >
                  <span>{label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFilter(key);
                    }}
                    className="ml-1 text-sm hover:text-gray-200"
                  >
                    ✕
                  </button>
                </span>
              );
            })}

            {/* Actual search input */}
            <input
              type="text"
              placeholder=""
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent flex-1 min-w-[150px] outline-none text-white text-sm"
            />
          </div>
        </div>

        {/* Dropdown under entire row */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-2 w-full md:w-[300px] bg-[#1e1e1e] border border-gray-700 rounded-md shadow-xl p-4"
          >
            <p className="text-sm font-semibold mb-3 text-white">Filter by:</p>
            {FILTER_OPTIONS.map((filter) => (
              <label
                key={filter.key}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.includes(filter.key)}
                  onChange={() => toggleFilter(filter.key)}
                  className="accent-purple-600 w-4 h-4"
                />
                <span>{filter.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Top Checkbox */}
      {/* <div className="flex items-center px-3 py-3 border-y border-gray-800 mb-5">
        <input
          type="checkbox"
          className="accent-purple-600 w-5 h-5 cursor-pointer"
          aria-label="Select all comments"
        />
      </div> */}

      {/* Video List */}
      <div className="space-y-6">
        {filteredVideos.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No videos match your filters.</p>
        ) : (
          filteredVideos.map((video, index) => {
            // Only apply comment filters if video is expanded
            const filteredComments =
              expandedVideoIndex === index ? applyFilters(video.comments) : [];

            return (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-5 hover:bg-gray-800 transition cursor-pointer shadow-md"
                onClick={() => handleVideoClick(index)}
              >
                <div className="flex items-start space-x-5">
                  {/* <input
                    type="checkbox"
                    className="accent-purple-600 w-5 h-5 mt-1 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  /> */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-32 h-20 object-cover rounded-md shadow"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{video.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">{video.channelName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Uploaded on {new Date(video.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {expandedVideoIndex === index && (
                  <div className="mt-6 pl-14 border-l border-gray-700 space-y-4">
                    {filteredComments.length === 0 ? (
                      <p className="text-gray-400 text-sm italic">
                        No comments match your filters.
                      </p>
                    ) : (
                      filteredComments.map((comment, i) => (
                        <div
                          key={i}
                          className="border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between"
                        >
                          <div>
                            <p>{comment.text}</p>
                            <span className="text-xs text-gray-500">
                              {comment.username} • {comment.time}
                            </span>
                          </div>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="text-purple-500 text-sm mt-2 md:mt-0 hover:underline"
                          >
                            Reply
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Community;
