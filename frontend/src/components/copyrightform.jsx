import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CopyrightForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    affectedParty: "Myself",
    copyrightOwner: "",
    phone: "",
    primaryEmail: "",
    secondaryEmail: "",
    relationship: "",
    country: "",
    street: "",
    city: "",
    postcode: "",
    removalOption: "",
    preventCopies: false,
    agreement1: false,
    agreement2: false,
    agreement3: false,
    signature: "",
  });

  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoInput, setVideoInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const openModal = () => {
    setVideoInput("");
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setVideoInput("");
    setError("");
    setIsModalOpen(false);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addVideo = () => {
    if (!videoInput.trim()) {
      setError("Please enter a video URL.");
      return;
    }
    if (!isValidUrl(videoInput.trim())) {
      setError("Please enter a valid URL.");
      return;
    }
    setVideos([...videos, videoInput.trim()]);
    closeModal();
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (videos.length === 0) {
      alert("Please add at least one video.");
      return;
    }

    if (!(form.agreement1 && form.agreement2 && form.agreement3)) {
      alert("Please agree to all legal agreements.");
      return;
    }

    const newClaim = {
      ...form,
      videos,
      date: new Date().toISOString(),
    };

    const existingClaims = JSON.parse(localStorage.getItem("claims")) || [];
    const updatedClaims = [...existingClaims, newClaim];
    localStorage.setItem("claims", JSON.stringify(updatedClaims));

    navigate("/copyright");
  };

  return (
    <div className="bg-black text-white min-h-screen pt-14 px-6 sm:px-10">
      {/* Back Button */}
      <div className="mt-4 mb-6">
        <button
          type="button"
          onClick={() => navigate("/copyright")}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded flex items-center space-x-2 transition duration-200"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back</span>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-10 max-w-full sm:max-w-4xl mx-auto"
        style={{ maxWidth: "100%" }}
      >
        {/* 1. Videos Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Videos requested for removal
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Remember that not all copyrighted content is eligible for removal.
            Some videos are protected by fair use and similar laws.
          </p>

          {videos.length > 0 && (
            <ul className="mb-4 list-disc list-inside space-y-2 text-gray-300 max-w-xl">
              {videos.map((video, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center break-words"
                >
                  <a
                    href={video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 underline mr-4"
                  >
                    {video}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="text-gray-400 hover:text-red-600"
                    aria-label={`Remove video ${index + 1}`}
                  >
                    &#10005;
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={openModal}
            className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            + Add a video
          </button>
        </div>

        {/* 2. Copyright Owner */}
        <div>
          <h2 className="text-xl font-semibold mb-2">2. Copyright owner</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="affectedParty"
              value={form.affectedParty}
              onChange={handleChange}
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
            >
              <option value="Myself">Myself</option>
              <option value="Authorized">Authorized party</option>
            </select>

            <input
              type="text"
              name="copyrightOwner"
              value={form.copyrightOwner}
              onChange={handleChange}
              placeholder="e.g. YouTube channel name"
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
              required
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Include country code (e.g. +44)"
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
              required
            />

            <input
              type="email"
              name="primaryEmail"
              value={form.primaryEmail}
              onChange={handleChange}
              placeholder="Primary email"
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
              required
            />

            <input
              type="email"
              name="secondaryEmail"
              value={form.secondaryEmail}
              onChange={handleChange}
              placeholder="Secondary email"
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
            />

            <input
              type="text"
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
              placeholder="Relationship to copyrighted content"
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        {/* 3. Removal Options */}
        <div>
          <h2 className="text-xl font-semibold mb-2">3. Removal options</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="removalOption"
                value="Scheduled"
                onChange={handleChange}
                className="accent-red-600"
                required
              />
              <span>
                <strong>Scheduled:</strong> Send a 7-day notice
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="removalOption"
                value="Standard"
                onChange={handleChange}
                className="accent-red-600"
                required
              />
              <span>
                <strong>Standard:</strong> Request removal now
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="preventCopies"
                checked={form.preventCopies}
                onChange={handleChange}
                className="accent-red-600"
              />
              <span>
                Prevent future copies of this content from appearing on YouTube
              </span>
            </label>
          </div>
        </div>

        {/* 4. Legal Agreements */}
        <div>
          <h2 className="text-xl font-semibold mb-2">4. Legal agreements</h2>
          <div className="space-y-3 text-sm">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreement1"
                checked={form.agreement1}
                onChange={handleChange}
                className="mt-1 accent-red-600"
                required
              />
              <span>
                I have a good-faith belief that the use of the material is not
                authorized by the copyright owner, its agent, or the law.
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreement2"
                checked={form.agreement2}
                onChange={handleChange}
                className="mt-1 accent-red-600"
                required
              />
              <span>
                The information is accurate, and I am the owner or authorized to
                act on behalf of the owner.
              </span>
            </label>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreement3"
                checked={form.agreement3}
                onChange={handleChange}
                className="mt-1 accent-red-600"
                required
              />
              <span>
                I understand that submitting false information may result in legal
                penalties.
              </span>
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
          >
            Submit Form
          </button>
        </div>
      </form>

      {/* Modal for adding videos */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 relative">
            <h3 className="text-lg font-semibold mb-4">Add Video URL</h3>

            <input
              type="text"
              value={videoInput}
              onChange={(e) => {
                setVideoInput(e.target.value);
                setError("");
              }}
              placeholder="Enter video URL"
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white mb-2"
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addVideo}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Add
              </button>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyrightForm;
