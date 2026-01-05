import React, { useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoReturnUpForwardOutline } from "react-icons/io5";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onClose,
  recentSearches,
  handleSearch,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col transition-all duration-300 animate-slideDown">
      {/* Search Bar */}
      <div className="w-full mt-6 px-3 sm:px-6 md:px-10">
        <div className="relative w-full bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center px-4 py-3 shadow-lg">
          <FaSearch className="text-zinc-400 mr-3" size={22} />
          <form onSubmit={handleSearch} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, shows, podcasts..."
              className="w-full bg-transparent outline-none text-white placeholder-zinc-500 text-lg"
            />
          </form>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-red-500 ml-3 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>
      </div>

      {/* Recent Searches - YouTube Style Vertical List */}
      <div className="mt-4 px-3 sm:px-10 max-h-[50vh] overflow-y-auto">
        {recentSearches?.length > 0 ? (
          <ul className="divide-y divide-zinc-800">
            {recentSearches.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between px-2 py-3 hover:bg-zinc-900 rounded-lg cursor-pointer transition"
                onClick={() => setSearchQuery(item)}
              >
                <div className="flex items-center gap-3">
                  <FaSearch className="text-zinc-500" size={15} />
                  <span className="text-white text-base">{item}</span>
                </div>
                <IoReturnUpForwardOutline
                  size={18}
                  className="text-zinc-500 hover:text-white transition"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-500 text-sm mt-4 text-center">
            No recent searches yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
