import React, { useState } from "react";

const Playlist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: "My Favorites",
      items: 10,
      description: "A collection of favorite picks",
      thumbnail: "/images/1.png",
    },
    {
      id: 2,
      title: "Action Thrillers",
      items: 5,
      description: "High-paced thrillers and action-packed hits",
      thumbnail: "/images/2.png",
    },
    {
      id: 3,
      title: "Comedy Classics",
      items: 8,
      description: "Laughter guaranteed with timeless comedy",
      thumbnail: "/images/3.png",
    },
  ]);

  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) return alert("Please enter a playlist name.");

    const newPlaylist = {
      id: playlists.length + 1,
      title: playlistName,
      items: 0,
      description: "This collection is empty. Start adding now!",
      thumbnail: "/images/placeholder.png",
    };

    setPlaylists([newPlaylist, ...playlists]);
    setPlaylistName("");
  };

  const handlePlaylistClick = (playlist) => {
    alert(`Opening playlist: ${playlist.title}\n\n${playlist.description}`);
    // Here you could navigate to a playlist detail page
  };

  return (
    <div className="bg-black text-white min-h-screen px-6 py-14">
      <h2 className="text-2xl font-bold mb-6">Create New Movie Playlist</h2>

      {/* Playlist creation input */}
      <div className="max-w-md space-y-3">
        <label className="block text-sm font-medium">Playlist Name</label>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter a name for this movie playlist"
          className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-md px-4 py-2 text-sm text-white placeholder-gray-500"
        />
        <p className="text-gray-400 text-xs">
          This movie playlist will be public. Anyone can search for it and see the contents.
        </p>
        <button
          onClick={handleCreatePlaylist}
          className="mt-2 bg-red-600 hover:bg-red-700 text-sm px-4 py-2 rounded text-white"
        >
          Create Playlist
        </button>
      </div>

      {/* Existing playlists */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Existing Movie Playlists</h3>
        <div className="bg-[#0E0E0E] rounded-md p-4 space-y-3">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => handlePlaylistClick(playlist)}
              className="flex items-center gap-4 bg-[#161616] hover:bg-[#222] p-3 rounded cursor-pointer transition-all"
            >
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold">{playlist.title}</h4>
                <p className="text-xs text-gray-400">{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
