import React, { useEffect, useState } from "react";

const podcasters = [
  {
    name: "CHARLIE KENTER",
    tag: "PODCASTMASTER",
    image: "/images/charlie.png",
    style: "translate-y-2 z-[10]",
    glowPosition: "left-[10%]",
    bottomColor: "bg-green-700",
  },
  {
    name: "TATIANA STANTON",
    tag: "GIRLSPODD",
    image: "/images/tatiana.png",
    style: "translate-y-7 z-[20]",
    glowPosition: "left-[35%]",
    bottomColor: "bg-purple-600",
  },
  {
    name: "ABRAM WORKMAN",
    tag: "AMERICANOPOD",
    image: "/images/abram.png",
    style: "translate-y-1 z-[15]",
    glowPosition: "left-[60%]",
    bottomColor: "bg-emerald-600",
  },
  {
    name: "BARBARAPOP",
    tag: "BARBARPOD",
    image: "/images/barbara.png",
    style: "translate-y-8 z-[30]",
    glowPosition: "left-[85%]",
    bottomColor: "bg-indigo-600",
  },
];

const FrontPodcast = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobileOrTablet(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const displayedPodcasters = isMobileOrTablet ? podcasters.slice(0, 3) : podcasters;

  return (
    <div className="relative text-white font-sans flex flex-col items-center overflow-visible">
      {/* Main black container with margin top only on desktop */}
      <div
        className="relative bg-black pt-16 pb-8 px-3 rounded-md border border-green-600 flex flex-col items-center min-h-[80vh]"
        style={{
          maxWidth: "1100px",
          width: "100%",
          marginTop: isMobileOrTablet ? "0" : "-2rem",
        }}
      >
        {/* Glow Lines */}
        {!isMobileOrTablet &&
          podcasters.map((p, i) => (
            <div
              key={i}
              className={`absolute top-0 h-full w-[2px] bg-green-400/10 blur-sm ${p.glowPosition} animate-slow-pulse`}
            />
          ))}

        {/* Radial BG */}
        <div className="absolute inset-0 bg-gradient-radial from-green-900/10 via-black/90 to-black z-0 pointer-events-none rounded-md" />

        {/* Content Wrapper with scaled height only on desktop */}
        <div
          className="relative z-10 w-full flex flex-col items-center justify-start"
          style={{
            height: "70vh",
            transform: isMobileOrTablet ? "none" : "scale(0.95)",
            transformOrigin: "top center",
            paddingTop: 50,
            marginTop: 0,
          }}
        >
          {/* Heading */}
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-center leading-tight mb-0 max-w-xl drop-shadow-xl">
            Best podcast’s publishing place for everyone
          </h1>

          {/* Cards */}
          <div
            className={`relative flex items-end ${
              isMobileOrTablet
                ? "flex-nowrap overflow-x-auto px-2 hide-scrollbar"
                : "flex-wrap justify-center"
            } max-w-full`}
            style={{
              perspective: "1000px",
              transformOrigin: "top center",
              marginTop: isMobileOrTablet ? "0" : "-9rem",
            }}
          >
            {displayedPodcasters.map((pc, idx) => (
              <div
                key={idx}
                className={`relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-[65%] rounded-xl overflow-hidden group shadow-2xl cursor-pointer transition-all duration-700 ease-in-out ${pc.style}`}
                style={{
                  marginLeft: idx === 0 ? "0" : isMobileOrTablet ? "-50px" : "-30px",
                }}
              >
                <div
                  className="relative w-full h-full rounded-xl overflow-hidden
                          animate-float
                          transition-transform duration-700 ease-in-out
                          group-hover:scale-[1.05] group-hover:shadow-glow group-hover:brightness-110"
                >
                  <img
                    src={pc.image}
                    alt={pc.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none" />
                  <div className={`absolute bottom-0 left-0 w-full h-[4px] ${pc.bottomColor} z-20 shadow-md`} />
                  <div className="absolute bottom-4 left-3 z-30 text-left pointer-events-none">
                    <h3 className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold tracking-wider text-white drop-shadow-lg whitespace-nowrap">
                      {pc.name}
                    </h3>
                    <p className="text-[6px] sm:text-[7px] md:text-[8px] text-gray-300 tracking-tight drop-shadow-md">
                      {pc.tag}
                    </p>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="shine-effect" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shimmer Text with bottom border line */}
          <div className="mt-6 w-full max-w-[1200px] text-center pointer-events-none overflow-visible relative">
            <h2
              className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] font-extrabold uppercase tracking-wider text-transparent select-none mx-auto shimmer-text"
              style={{
                WebkitTextStroke: "2px rgba(0,255,150,0.25)",
                textShadow: "0 12px 24px rgba(0,255,150,0.2)",
                userSelect: "none",
                margin: 0,
                paddingBottom: "0.5rem",
                borderBottom: "3px solid rgba(0, 255, 150, 0.7)",
                maxWidth: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              TOP PODCASTER
            </h2>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes slow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-slow-pulse {
          animation: slow-pulse 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        .shimmer-text {
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(0,255,150,0.3) 50%, rgba(255,255,255,0) 100%);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s infinite linear;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .shadow-glow {
          box-shadow:
            0 0 15px 4px rgba(0, 255, 150, 0.4),
            0 10px 20px -5px rgba(0, 255, 150, 0.3);
          transition: box-shadow 0.3s ease;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(25deg);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(200%) rotate(25deg);
            opacity: 0;
          }
        }
        .shine-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%) rotate(25deg);
          animation: shine 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FrontPodcast;
