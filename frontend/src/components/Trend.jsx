import React, { useState } from "react";

// You can replace this with dynamic ideas later
const ideas = [
  "The history of architecture in New York",
  "Easy and fast fluffy pancakes recipe",
  "Best budget noise-cancelling headphones",
  "How to make a paper dragon",
  "Top 10 AI tools for productivity",
  "How to train for a marathon as a beginner",
  "The psychology of colors in marketing",
  "React vs Vue: Which is better in 2025?",
  "Beginner's guide to investing",
  "Make your own board game at home"
];

const Trend = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedIdeas, setSavedIdeas] = useState([]);

  // Filtering ideas based on search input
  const filteredIdeas = ideas.filter((idea) =>
    idea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle save/unsave
  const toggleSave = (idea) => {
    if (savedIdeas.includes(idea)) {
      setSavedIdeas(savedIdeas.filter((i) => i !== idea));
    } else {
      setSavedIdeas([...savedIdeas, idea]);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-6 pt-14">
      {/* Header with Saved Count */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Get ideas for your next video</h1>
        <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-700">
          <span>❤️</span>
          <span>Saved ({savedIdeas.length})</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>

      {/* Idea Grid */}
      <h2 className="text-lg font-semibold mb-4">Ideas to get started</h2>

      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredIdeas.map((idea, index) => {
            const isSaved = savedIdeas.includes(idea);
            return (
              <div
                key={index}
                onClick={() => toggleSave(idea)}
                className={`p-4 rounded-lg cursor-pointer transition border ${
                  isSaved
                    ? "bg-purple-700 border-purple-500"
                    : "bg-gray-800 hover:bg-gray-700 border-transparent"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium">{idea}</p>
                  <span className={`text-lg ${isSaved ? "text-red-400" : "text-gray-500"}`}>
                    {isSaved ? "❤️" : "🤍"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">No ideas match your search.</p>
      )}
    </div>
  );
};

export default Trend;
