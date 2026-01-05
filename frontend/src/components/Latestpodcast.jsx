import React from "react";

const episodes = [
  {
    id: 10,
    title: "How to build your personal resilience",
    duration: "46 min",
    image: "/images/podcast1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac neque sagittis, viverra ligula id, mattis ex. Sed sagittis ligula ac lacus auctor, quis blandit mi finibus.",
    stats: {
      plays: "8.9K",
      likes: "2.1K",
      views: "982K",
      comments: "284K",
    },
  },
  {
    id: 9,
    title: "Imperfect hands don't reduce creativity",
    duration: "34 min",
    image: "/images/podcast2.png",
    description:
      "Quisque sit amet lacus luctus, ultrices eros ac, laoreet sem. Aliquam erat volutpat. Donec lobortis ex lorem, id consequat lectus sodales sed.",
    stats: {
      plays: "24K",
      likes: "3.2K",
      views: "5.6K",
      comments: "1.9K",
    },
  },
  {
    id: 8,
    title: "How to build your personal resilience",
    duration: "46 min",
    image: "/images/podcast3.png",
    description:
      "Cras facilisis orci in arcu ullamcorper viverra. Maecenas vulputate risus augue, id suscipit nunc tincidunt sed. Quisque auctor scelerisque arcu.",
    stats: {
      plays: "42K",
      likes: "10K",
      views: "16K",
      comments: "5.1K",
    },
  },
];

const LatestPodcast = () => {
  return (
    <div className="bg-[#121212] min-h-screen py-16 px-4">
      {/* Podcast container */}
      <div className="max-w-6xl mx-auto bg-[#1A1A1A] p-8 rounded-xl shadow-lg">
        <h2 className="text-white text-3xl font-bold mb-10 border-b border-gray-700 pb-4">
          Latest Podcast Episodes
        </h2>

        <div className="space-y-10">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-4 md:space-y-0 bg-[#2a2a2a] p-4 rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={ep.image}
                alt={ep.title}
                className="w-full md:w-44 h-44 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
              />

              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">
                  PODCASTMASTER • {ep.duration} • EPISODE {ep.id}
                </p>
                <h3 className="text-white text-xl font-semibold mb-2 hover:text-red-500 transition-colors duration-300">
                  {ep.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{ep.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <span>🎧</span>
                    <span>{ep.stats.plays}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <span>❤️</span>
                    <span>{ep.stats.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <span>👁️</span>
                    <span>{ep.stats.views}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <span>💬</span>
                    <span>{ep.stats.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show More Button outside container */}
      <div className="text-center mt-8">
        <button className="bg-[#1E1E2F] text-white px-6 py-3 rounded-md hover:bg-[#2C2C3D] transition duration-300">
          Show More Episodes
        </button>
      </div>
    </div>
  );
};

export default LatestPodcast;
