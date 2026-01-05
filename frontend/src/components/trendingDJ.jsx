import React, { useEffect, useRef } from 'react';

const artists = [
  { name: 'Eminiem', image: '/images/artist1.png' },
  { name: 'The Weekend', image: '/images/artist2.png' },
  { name: 'Adele', image: '/images/artist3.png' },
  { name: 'Lana Del Ray', image: '/images/artist4.png' },
  { name: 'Harry Styles', image: '/images/artist5.png' },
  { name: 'Billie Eilish', image: '/images/artist6.png' },
  { name: 'Eminiem', image: '/images/artist1.png' },
  { name: 'The Weekend', image: '/images/artist2.png' },
  { name: 'Adele', image: '/images/artist3.png' },
  { name: 'Lana Del Ray', image: '/images/artist4.png' },
  { name: 'Harry Styles', image: '/images/artist5.png' },
  { name: 'Billie Eilish', image: '/images/artist6.png' },
];

const TrendingDJ = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 1; // Pixels per frame
    const scrollDelay = 20; // Milliseconds per step

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollStep;
        scrollAmount += scrollStep;

        // If we reach the end, scroll back to start for infinite loop
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, scrollDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 sm:px-10 md:px-14 py-10 bg-[#121212]">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">
        Popular Artists
      </h2>

      {/* Scrollable container with auto-scroll */}
      <div
        ref={scrollRef}
        className="flex space-x-20 overflow-x-auto py-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {artists.map((artist, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-3 flex-shrink-0"
            style={{ width: '112px' }}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-white text-sm font-medium text-center">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingDJ;
