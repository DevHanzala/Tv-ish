import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    synopsis: '',
    salesPitch: '',
    genres: '',
    keywords: '',
    countriesOfProduction: '',
    originalReleaseDate: '',
    filmingLocations: '',
    cast: [],
    directors: '',
    writers: '',
    producers: '',
    composers: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddCast = () => {
    setFormData((prevData) => ({
      ...prevData,
      cast: [...prevData.cast, { actor: '', character: '' }]
    }));
  };

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...formData.cast];
    updatedCast[index][field] = value;
    setFormData({ ...formData, cast: updatedCast });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="bg-black text-white min-h-screen py-6 px-4 text-left">
      <h1 className="text-3xl font-bold mb-6">Video Info</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-full">

        {/* Section: Basic Info */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 block">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 block">Sales Pitch</label>
              <textarea
                name="salesPitch"
                value={formData.salesPitch}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                maxLength={300}
                rows="3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-sm text-gray-300 block">Synopsis *</label>
              <textarea
                name="synopsis"
                value={formData.synopsis}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                required
                rows="3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 block">Genres *</label>
              <select
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                required
              >
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-sm text-gray-300 block">Original Release Date *</label>
              <input
                type="date"
                name="originalReleaseDate"
                value={formData.originalReleaseDate}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 block">Countries of Production *</label>
              <input
                type="text"
                name="countriesOfProduction"
                value={formData.countriesOfProduction}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm text-gray-300 block">Filming Locations</label>
            <input
              type="text"
              name="filmingLocations"
              value={formData.filmingLocations}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
            />
          </div>
        </div>

        {/* Section: Cast & Crew */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Cast & Crew</h3>

          {formData.cast.map((castMember, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-1/2">
                <label className="text-sm text-gray-300 block">Actor</label>
                <input
                  type="text"
                  value={castMember.actor}
                  onChange={(e) => handleCastChange(index, 'actor', e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-sm text-gray-300 block">Character</label>
                <input
                  type="text"
                  value={castMember.character}
                  onChange={(e) => handleCastChange(index, 'character', e.target.value)}
                  className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddCast}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4"
          >
            + Add Cast
          </button>
        </div>

        {/* Section: Crew Info */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-300 block">Directors</label>
              <input
                type="text"
                name="directors"
                value={formData.directors}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 block">Writers</label>
              <input
                type="text"
                name="writers"
                value={formData.writers}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 block">Producers</label>
              <input
                type="text"
                name="producers"
                value={formData.producers}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 block">Composers</label>
              <input
                type="text"
                name="composers"
                value={formData.composers}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        
      </form>
    </div>
  );
};

export default Profile;
