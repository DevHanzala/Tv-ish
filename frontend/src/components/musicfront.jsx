import React from "react";

const MusicFront = () => {
  return (
    <div className="relative w-full h-[60vh] pt-10 flex items-center justify-center bg-black overflow-hidden">
      {/* Full-width stretched container */}
      <div className="relative w-full h-full overflow-hidden bg-black/20 backdrop-blur-md group transition-all duration-1000 ease-in-out border-y-2 border-yellow-500/40">

        {/* Background Image - stretched for more width */}
        <img
          src="/images/concert.png"
          alt="Music Event"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5] scale-125 blur-[1.5px] group-hover:scale-150 transition-transform duration-[2000ms] ease-out"
        />

        {/* Radial Glow Center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12)_0%,_transparent_75%)] z-10 pointer-events-none" />

        {/* Top Glow */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-yellow-400 opacity-15 blur-4xl rounded-full z-10 animate-pulse pointer-events-none" />

        {/* Bottom Glow */}
        <div className="absolute bottom-5 right-10 w-44 h-44 bg-yellow-400 opacity-10 blur-3xl rounded-full animate-pulse-slow z-10 pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

        {/* Text Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 animate-fadeInZoom">
          <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-yellow-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tracking-wide leading-tight animate-shine bg-[length:200%]">
            ALL ABOUT MUSIC — IT’S ALL HERE
          </h1>
          <p className="mt-4 text-white/95 text-sm sm:text-base font-medium max-w-2xl drop-shadow-md">
            Turn on the feeling with every beat. Dive into the rhythm of the most electrifying music experiences.
          </p>
        </div>

        {/* Floating Lights */}
        <div className="absolute bottom-6 left-[20%] w-24 h-24 bg-yellow-400 opacity-40 blur-4xl rounded-full animate-floatUp pointer-events-none"></div>
        <div className="absolute bottom-6 right-[20%] w-20 h-20 bg-yellow-300 opacity-30 blur-3xl rounded-full animate-floatUp pointer-events-none"></div>
      </div>
    </div>
  );
};

export default MusicFront;
