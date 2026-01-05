import React, { useState } from 'react';

const advisoryTags = ['Violence', 'Sex', 'Nudity', 'Drugs'];
const streamingPlatforms = ['Netflix', 'Amazon Prime', 'Hulu', 'Disney+', 'YouTube'];

const Listing = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [ageRating, setAgeRating] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [streamingStatus, setStreamingStatus] = useState('');
  const [contentType, setContentType] = useState('');

  // New states for Discovery / Video Upload section
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoTags, setVideoTags] = useState('');
  const [videoCategory, setVideoCategory] = useState('');
  const [videoPrivacy, setVideoPrivacy] = useState('public');

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleVideoUpload = (e) => {
    e.preventDefault();
    if (!videoTitle || !videoFile) {
      alert('Please provide both a video title and select a video file.');
      return;
    }
    // You can extend this function to actually upload video to backend/storage
    alert(`Uploading video: ${videoTitle}\nFile: ${videoFile.name}`);
  };

  return (
    <div className="pt-4 pl-2 pr-6 pb-6 bg-black text-sm text-white min-h-screen">

      {/* Content Advisory Section */}
      <section className="bg-gray-900 rounded-lg p-6 mb-8 shadow-md">
        <h2 className="font-semibold text-xl mb-4 border-b border-gray-700 pb-2">Content Advisory</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Age Group</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={ageRating}
            onChange={(e) => setAgeRating(e.target.value)}
          >
            <option value="">Select age rating...</option>
            <option value="all">All Ages</option>
            <option value="13+">13+</option>
            <option value="16+">16+</option>
            <option value="18+">18+</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Content Includes</label>
          <div className="flex flex-wrap gap-2">
            {advisoryTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded border ${
                  selectedTags.includes(tag)
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Section - Video Upload */}
      <section className="bg-gray-900 rounded-lg p-6 mb-8 shadow-md">
        <h2 className="font-semibold text-xl mb-4 border-b border-gray-700 pb-2">Upload Video</h2>
        <form onSubmit={handleVideoUpload}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Video Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              placeholder="Enter video title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              rows={3}
              placeholder="Write a description for your video"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
            />
          </div>


          <div className="mb-4">
            <label className="block mb-1 font-medium">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              placeholder="e.g. travel, vlog, tutorial"
              value={videoTags}
              onChange={(e) => setVideoTags(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={videoCategory}
              onChange={(e) => setVideoCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="music">Music</option>
              <option value="education">Education</option>
              <option value="gaming">Gaming</option>
              <option value="comedy">Comedy</option>
              <option value="sports">Sports</option>
              <option value="news">News</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Privacy</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={videoPrivacy}
              onChange={(e) => setVideoPrivacy(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="unlisted">Unlisted</option>
              <option value="private">Private</option>
            </select>
          </div>

          
        </form>
      </section>

      {/* Streaming Info Section (Netflix-Inspired) */}
      <section className="bg-gray-900 rounded-lg p-6 mb-8 shadow-md">
        <h2 className="font-semibold text-xl mb-4 border-b border-gray-700 pb-2">Streaming Info</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Streaming Status</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={streamingStatus}
            onChange={(e) => setStreamingStatus(e.target.value)}
          >
            <option value="">Select status...</option>
            <option value="available">Available</option>
            <option value="coming-soon">Coming Soon</option>
            <option value="not-released">Not Released</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Available On</label>
          <div className="flex flex-wrap gap-2">
            {streamingPlatforms.map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`px-3 py-1 rounded border ${
                  selectedPlatforms.includes(platform)
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section (Netflix/YouTube Inspired Dynamic Form) */}
      <section className="bg-gray-900 rounded-lg p-6 mb-8 shadow-md">
        <h2 className="font-semibold text-xl mb-4 border-b border-gray-700 pb-2">Catalog</h2>

        {/* Content Type Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Content Type</label>
          <div className="flex flex-wrap gap-2">
            {['Movie', 'Episode', 'Podcast', 'Education', 'AI', 'Sports', 'Snippet'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setContentType(type)}
                className={`px-4 py-2 rounded border ${
                  contentType === type
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Fields based on selected content type */}
        {contentType === 'Movie' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Movie Title</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Enter movie title"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Duration (minutes)</label>
              <input
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="e.g. 120"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Director</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Director name"
              />
            </div>
          </>
        )}

        {contentType === 'Episode' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Episode Title</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Enter episode title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Season</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="Season number"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Episode Number</label>
                <input
                  type="number"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="Episode number"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Show Name</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Name of the show"
              />
            </div>
          </>
        )}

        {contentType === 'Podcast' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Podcast Name</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Enter podcast name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Host</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Host name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Duration (minutes)</label>
              <input
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Duration"
              />
            </div>
          </>
        )}

        {contentType === 'Education' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Course / Topic</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Course or topic name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Instructor</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Instructor name"
              />
            </div>
          </>
        )}

        {contentType === 'AI' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Model / Tool Name</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="AI model or tool name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Use Case</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                rows={3}
                placeholder="Describe use case"
              />
            </div>
          </>
        )}

        {contentType === 'Sports' && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Sport Name</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Name of the sport"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Team / Player</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                placeholder="Team or player name"
              />
            </div>
          </>
        )}

        {contentType === 'Snippet' && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Snippet Description</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              rows={3}
              placeholder="Brief description of snippet"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Listing;
