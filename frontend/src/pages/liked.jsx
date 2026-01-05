// Liked.jsx
import React from "react";

const likedVideos = [
  {
    thumbnail: "/images/std1.png",
    title: "Exploring the Ancient Ruins of Machu Picchu",
    category: "Travel/Vloggers",
  },
  {
    thumbnail: "/images/std2.png",
    title: "A Day in the Life of a Wildlife Photographer",
    category: "Nature/Explorer",
  },
  {
    thumbnail: "/images/std3.png",
    title: "Cooking Authentic Italian Pasta from Scratch",
    category: "Culinary/Adventures",
  },
  {
    thumbnail: "/images/std4.png",
    title: "The Art of Japanese Calligraphy",
    category: "Culture/Arts",
  },
  {
    thumbnail: "/images/std5.png",
    title: "Behind the Scenes of a Broadway Musical",
    category: "Performing/Arts",
  },
  {
    thumbnail: "/images/std6.png",
    title: "A Journey Through the Amazon Rainforest",
    category: "Eco/Adventures",
  },
  {
    thumbnail: "/images/1.png",
    title: "Learning to Surf in Bali",
    category: "Surf/Life",
  },
  {
    thumbnail: "/images/2.png",
    title: "The Making of a Documentary Film",
    category: "Film/Craft",
  },
  {
    thumbnail: "/images/3.png",
    title: "A Guide to Urban Gardening",
    category: "Urban/Gardens",
  },
  {
    thumbnail: "/images/4.png",
    title: "Restoring a Vintage Car",
    category: "Classic/Cars",
  },
];

const Liked = () => {
  return (
    <div className="bg-black text-white pt-14 px-6 pb-10 min-h-screen">
      <h2 className="text-2xl font-semibold mb-8">Liked videos</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {likedVideos.map(({ thumbnail, title, category }, index) => (
          <div key={index} className="group cursor-pointer">
            {/* Fixed frame size with padding */}
            <div className="w-full h-[120px] bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={thumbnail}
                alt={title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-sm sm:text-base font-semibold mt-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Liked;
