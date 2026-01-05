import React from "react";

const watchLaterItems = [
  {
    category: "Movies",
    items: [
      {
        savedDate: "07/15/2024",
        publishedDate: "2023",
        duration: "2h 13m",
        title: "The Silent Echo",
        description:
          "A reclusive sound engineer stumbles upon a mysterious frequency that unlocks hidden memories and unravels a conspiracy.",
        image: "/images/12.jpg",
      },
      {
        savedDate: "06/22/2024",
        publishedDate: "2022",
        duration: "1h 48m",
        title: "Neon Dreams",
        description:
          "A struggling artist in Tokyo finds inspiration and love in the city's vibrant nightlife, but must confront her past to embrace her future.",
        image: "/images/13.jpg",
      },
    ],
  },
  {
    category: "Series",
    items: [
      {
        savedDate: "05/10/2024",
        publishedDate: "2021",
        seasons: 1,
        title: "The Crimson Trail",
        description:
          "A detective with a troubled past investigates a series of ritualistic murders in a small, isolated town, uncovering dark secrets and facing his own demons.",
        image: "/images/14.jpg",
      },
      {
        savedDate: "04/03/2024",
        publishedDate: "2023",
        seasons: 1,
        title: "Echoes of the Past",
        description:
          "A historian discovers a hidden chamber beneath an ancient castle, revealing a series of interconnected stories from different eras, each echoing the present.",
        image: "/images/15.jpg",
      },
    ],
  },
  {
    category: "Music",
    items: [
      {
        savedDate: "03/18/2024",
        publishedDate: "2023",
        tracks: 12,
        title: "Serene Escapes",
        description:
          "An album of ambient soundscapes designed to evoke feelings of peace and tranquility, perfect for meditation or unwinding after a long day.",
        image: "/images/login_img1.png",
      },
      {
        savedDate: "02/05/2024",
        publishedDate: "2022",
        tracks: 10,
        title: "City Rhythms",
        description:
          "A collection of energetic tracks capturing the vibrant pulse of urban life, blending electronic beats with soulful melodies.",
        image: "/images/login_img2.png",
      },
    ],
  },
  {
    category: "Podcasts",
    items: [
      {
        savedDate: "01/20/2024",
        publishedDate: "2024",
        episodes: 10,
        title: "Tech Frontiers",
        description:
          "A podcast exploring the latest advancements in technology, featuring interviews with industry leaders and discussions on emerging trends.",
        image: "/images/login_img3.png",
      },
    ],
  },
];

const WatchLater = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-14 p-6 md:p-10">
      <h1 className="text-2xl font-bold pt-14 mb-8">Watch Later</h1>

      {watchLaterItems.map(({ category, items }) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-6">{category}</h2>

          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 py-6"
            >
              <div className="md:max-w-xl flex-1">
                <p className="text-xs text-gray-400 mb-1">
                  Saved on: {item.savedDate} &bull; Published: {item.publishedDate}
                  {item.duration && <> &bull; {item.duration}</>}
                  {item.seasons && <> &bull; {item.seasons} Season{item.seasons > 1 ? "s" : ""}</>}
                  {item.tracks && <> &bull; {item.tracks} Track{item.tracks > 1 ? "s" : ""}</>}
                  {item.episodes && <> &bull; {item.episodes} Episode{item.episodes > 1 ? "s" : ""}</>}
                </p>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                <button className="bg-red-600 hover:bg-red-700 text-sm px-4 py-1 rounded flex items-center gap-2 w-max">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 22v-20l18 10-18 10z" />
                  </svg>
                  Play
                </button>
              </div>
              <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0 w-full max-w-xs rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-36 md:h-28 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WatchLater;
