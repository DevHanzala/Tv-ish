import React, { useState } from 'react';

const SportsFront = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setOffset({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full bg-black flex items-center justify-center overflow-hidden relative"
      style={{ height: '70vh', paddingBottom: 0 }} // height 65% viewport height, no bottom padding
    >
      {/* Overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 z-10"></div>

      <div
        className="relative w-full h-full cursor-pointer group overflow-hidden"
        style={{ paddingTop: '20px' }} // Padding from the top to adjust image position
      >
        {/* Dynamic Background Image with parallax effect */}
        <img
          src="/images/sports1.png"
          alt="Skier"
          className="transition-transform duration-300 ease-out"
          style={{
            width: '100%',        // Full width
            height: 'auto',       // Maintain aspect ratio
            transform: `scale(1.05) translate(${offset.x}px, ${offset.y}px) skewX(${offset.x * 0.05}deg)`,
            filter: 'brightness(0.85) contrast(1.1)',
            display: 'block',     // Removes any extra space below the image
          }}
        />

        {/* Glow behind text */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse z-20 pointer-events-none"></div>

        {/* Text content */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white z-30 max-w-lg">
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-snug opacity-0 animate-fadeInUp delay-200
            group-hover:tracking-widest group-hover:text-red-400
            transition-all duration-700 ease-in-out drop-shadow-lg"
          >
            Outstanding Range
            <br />
            of <span className="text-red-500">activities</span> to enjoy
          </h1>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default SportsFront;
