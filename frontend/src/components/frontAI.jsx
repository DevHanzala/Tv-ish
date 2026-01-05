import React, { useState, useEffect, useRef } from "react";

const cardData = [
  {
    src: "/images/AI1.png",
    border: "#7a3cff",
    shadow: "rgba(122,56,255,0.9)",
    translateZ: 100,
    translateX: 0,
    zIndex: 30,
    brightness: 1.15,
    contrast: 1.1,
  },
  {
    src: "/images/AI2.png",
    border: "#914dff",
    shadow: "rgba(145,77,255,0.7)",
    translateZ: 50,
    translateX: 18,
    zIndex: 20,
    brightness: 1.05,
    contrast: 1.05,
  },
  {
    src: "/images/AI3.png",
    border: "#b088ff",
    shadow: "rgba(176,136,255,0.5)",
    translateZ: 0,
    translateX: 36,
    zIndex: 10,
    brightness: 1,
    contrast: 1,
  },
];

const FrontAI = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [autoTilt, setAutoTilt] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const animationFrame = useRef();
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      const x = 5 * Math.sin(elapsed / 4000);
      const y = 5 * Math.cos(elapsed / 3500);

      if (!isHover) setAutoTilt({ x, y });
      animationFrame.current = requestAnimationFrame(animate);
    }

    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [isHover]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setTilt({ x, y });
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHover(false);
  };

  const handleButtonClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
    setTimeout(() => setRipple({ x: 0, y: 0, show: false }), 500);
  };

  const currentTilt = isHover ? tilt : autoTilt;

  return (
    <div
      className={`relative w-full min-h-[50vh] bg-[#0f0124] overflow-hidden select-none transition-opacity duration-1500 ease-in-out ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{ perspective: "1000px", paddingTop: "2rem" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0124] to-[#43187c]" />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => {
          const style = {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 1 + 0.4}px`,
            height: `${Math.random() * 1 + 0.4}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
            opacity: 0.25,
          };
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={style}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-8 lg:py-14">
        <div className="text-center lg:text-left lg:w-1/2 ml-0 lg:ml-6 animate-slideUpFade max-w-lg mx-auto lg:mx-0">
          <h1 className="mt-1 text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight font-['Orbitron'] tracking-wide relative inline-block glow-text flicker">
            AI Revolution: Smart Videos, Smarter Minds
            <br />
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 opacity-30 blur-[12px] animate-glowPulse rounded-md pointer-events-none" />
          </h1>
        </div>

        <div
          className="relative mt-10 lg:mt-0 lg:w-1/2 flex justify-center items-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Responsive card container */}
          <div className="relative w-[180px] sm:w-[220px] md:w-[260px] h-[260px] sm:h-[320px] md:h-[380px]">
            {cardData.map(
              (
                {
                  src,
                  border,
                  shadow,
                  translateZ,
                  translateX,
                  zIndex,
                  brightness,
                  contrast,
                },
                i
              ) => (
                <div
                  key={i}
                  className="absolute top-0 w-full h-full rounded-2xl border shadow-lg overflow-hidden cursor-pointer transition-transform duration-400 hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(122,34,255,0.85)]"
                  style={{
                    left: translateX,
                    zIndex,
                    filter: `brightness(${brightness}) contrast(${contrast}) drop-shadow(0 8px 8px ${shadow})`,
                    border: `3px solid ${border}`,
                    transform: `
                      rotateY(-20deg)
                      rotateX(2deg)
                      translateZ(${translateZ}px)
                      translateX(${translateX}px)
                      rotateX(${currentTilt.y}deg)
                      rotateY(${currentTilt.x}deg)
                      translateX(${currentTilt.x * 1}px)
                      translateY(${currentTilt.y * 0.8}px)
                      scale(${1 + Math.abs(currentTilt.x + currentTilt.y) * 0.012})
                    `,
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  title={`AI Card ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`AI Card ${i + 1}`}
                    className="w-full h-full object-cover rounded-2xl relative z-10"
                    draggable={false}
                  />

                  <div className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none overflow-hidden">
                    <div className="shine" />
                  </div>

                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: `0 0 12px 2px ${border}`,
                      animation: `pulseGlow 3s ease-in-out infinite alternate`,
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.7; }
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            text-shadow:
              0 0 4px #a855f7,
              0 0 10px #7c3aed,
              0 0 18px #7c3aed,
              0 0 30px #8b5cf6,
              0 0 45px #a855f7;
          }
          20%, 22%, 24%, 55% {
            opacity: 0.7;
            text-shadow: none;
          }
        }
        .flicker {
          animation: flicker 3s linear infinite;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .glow-text {
          position: relative;
          z-index: 5;
        }
        .glowPulse {
          animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUpFade {
          animation: slideUpFade 1.2s ease forwards;
        }

        @keyframes shineMove {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }
        .shine {
          position: absolute;
          top: 0;
          left: -50%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          filter: blur(8px);
          animation: shineMove 3.5s linear infinite;
          pointer-events: none;
          border-radius: 12px;
          z-index: 15;
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 8px 2px rgba(122, 34, 255, 0.5);
          }
          100% {
            box-shadow: 0 0 16px 5px rgba(122, 34, 255, 0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default FrontAI;
