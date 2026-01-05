import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Image list
const backgroundImages = Array.from({ length: 35 }, (_, i) => `homepic${i + 1}.png`);

const Blob = ({ top, left, size, color }) => (
  <motion.div
    className="absolute rounded-full blur-3xl opacity-20 pointer-events-none z-0"
    style={{ top, left, width: size, height: size, background: color }}
    animate={{
      x: [0, 35, -35, 0],
      y: [0, -25, 25, 0],
      rotate: [0, 15, -15, 0],
      scale: [1, 1.08, 1],
    }}
    transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
  />
);

const PremiumImage = ({ src, idx, isMobile }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 20, stiffness: 200 });
  const smoothY = useSpring(y, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(smoothY, [-150, 150], [20, -20]);
  const rotateY = useTransform(smoothX, [-150, 150], [-20, 20]);
  const glow = useTransform(smoothX, [-150, 150], [0.2, 0.6]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        className="relative overflow-hidden rounded-xl bg-[#0a0a0a] cursor-pointer group transform-style-preserve-3d"
        style={{
          rotateX,
          rotateY,
          boxShadow: glow.onChange
            ? glow.onChange(
                (g) =>
                  `0 25px 45px rgba(255, 0, 20, ${g}), 0 0 20px rgba(255, 0, 20, ${
                    g / 2
                  })`
              )
            : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isMobile ? 1 : [1, 1.05, 1],
          y: isMobile ? 0 : [0, -10, 0],
        }}
        transition={{
          duration: 8 + idx * 0.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: isMobile ? 1.05 : 1.15,
          transition: { type: "spring", stiffness: 400 },
        }}
      >
        <img
          src={`/images/${src}`}
          alt={`Image ${idx}`}
          draggable={false}
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
          onError={(e) => (e.target.style.display = "none")}
        />

        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="absolute w-1/2 h-full bg-white/10 rotate-12 -translate-x-full rounded-xl pointer-events-none z-20"
          animate={{ x: ["-100%", "130%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 rounded-xl bg-red-600 opacity-10 blur-2xl z-0 scale-110" />
      </motion.div>
    </div>
  );
};

const HomeFront = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedImages = isMobile
    ? backgroundImages.slice(0, 9)
    : isTablet
    ? backgroundImages.slice(0, 8)
    : backgroundImages;

  return (
    <div className="relative w-full h-[800px] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#1a0000] to-[#0f0f0f] z-[-2]" />

      <Blob top="10%" left="10%" size="320px" color="rgba(255, 0, 20, 0.25)" />
      <Blob top="60%" left="70%" size="360px" color="rgba(180, 20, 20, 0.25)" />
      <Blob top="40%" left="50%" size="250px" color="rgba(255, 50, 50, 0.2)" />

      <div
        className={`absolute inset-0 z-0 grid ${
          isMobile
            ? "grid-cols-3 grid-rows-5 gap-0.5 px-1 pt-0 pb-0"
            : isTablet
            ? "grid-cols-4 grid-rows-5 gap-1.5 px-2 pt-2"
            : "grid-cols-7 gap-4 px-6 pt-6"
        }`}
      >
        {displayedImages.map((img, idx) => (
          <PremiumImage key={idx} src={img} idx={idx} isMobile={isMobile} />
        ))}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 to-transparent px-4 pt-20 pb-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-5 text-white tracking-wide drop-shadow-[0_4px_20px_rgba(255,0,0,0.7)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          The Ultimate Entertainment Hub
        </motion.h1>

        <motion.p
          className="text-sm md:text-lg text-red-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Dive into premium movies, trending series, exclusive podcasts, and non-stop entertainment.
        </motion.p>

        
      </motion.div>
    </div>
  );
};

export default HomeFront;
