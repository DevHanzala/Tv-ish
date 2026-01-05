import React from "react";
import { motion, useAnimation } from "framer-motion";

// Custom InView Hook (inline)
function useInView(threshold = 0.1) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return [ref, inView];
}

// Float animation for card
const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Animated Card Component
const AnimatedCard = ({ bgColor, imgSrc, altText, height = "h-52", delay = 0 }) => {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("animate");
    } else {
      controls.stop();
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ delay: delay / 1000, duration: 0.8, ease: "easeOut" }}
      style={{ animationDelay: `${delay}ms` }}
      className={`relative w-28 ${height} cursor-pointer select-none`}
    >
      {/* Outer Glow */}
      <motion.div
        className={`absolute -top-5 -left-5 w-[150%] h-[150%] rounded-[60px] ${bgColor} opacity-20 blur-3xl z-0`}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Card with floating animation */}
      <motion.div
        className={`relative p-[3px] w-full h-full rounded-[50px] ${bgColor} shadow-xl overflow-hidden z-10`}
        variants={floatAnimation}
        animate={controls}
        whileHover={{ scale: 1.15, rotate: 3, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.95 }}
        style={{ perspective: 600 }}
      >
        {/* Shine Swipe */}
        <motion.div className="absolute inset-0 z-20 overflow-hidden rounded-[50px] pointer-events-none">
          <motion.div
            className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-[50px]"
            variants={{
              animate: {
                x: ["-100%", "100%"],
                transition: {
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.5,
                },
              },
            }}
            animate="animate"
          />
        </motion.div>

        <img
          src={imgSrc}
          alt={altText}
          className="w-full h-full object-cover rounded-[50px] shadow-inner"
          draggable={false}
          loading="lazy"
          style={{ userSelect: "none" }}
        />
      </motion.div>
    </motion.div>
  );
};

// Main Component with all cards and layout
const EducationFront = () => {
  return (
    <>
      <style>
        {`
          /* Scrollbar hide but scrolling allowed */
          ::-webkit-scrollbar {
            display: none;
          }

          html, body {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;     /* Firefox */
          }

          /* Mobile only: Remove horizontal scrollbar but keep vertical scroll */
          @media (max-width: 768px) {
            html, body, #root {
              overflow-x: hidden !important;
            }
            body > div, #root > div {
              max-width: 100vw !important;
              overflow-x: hidden !important;
            }
          }
        `}
      </style>

      <div className="h-auto md:h-[65vh] pt-12 bg-gradient-to-r from-black to-gray-900 flex items-center justify-center px-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl">
          {/* Heading */}
          <div className="text-white w-full md:w-auto mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fadeZoomSlow drop-shadow-lg max-w-xl mx-auto md:mx-0">
              Your Modern <br className="hidden md:block" /> Online School
            </h1>
          </div>

          {/* Grid of Cards */}
          <div className="relative grid grid-cols-3 gap-6 md:gap-4 mt-0 md:mt-16">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 md:gap-4 pt-14 md:pt-10">
              <AnimatedCard bgColor="bg-purple-600" imgSrc="/images/std1.png" altText="Student 1" delay={200} />
              <AnimatedCard bgColor="bg-neutral-200" imgSrc="/images/std4.png" altText="Student 4" delay={500} />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 md:gap-4 items-center">
              <AnimatedCard bgColor="bg-orange-500" imgSrc="/images/std2.png" altText="Student 2" height="h-60" delay={800} />
              <AnimatedCard bgColor="bg-pink-600" imgSrc="/images/std5.png" altText="Student 5" height="h-44" delay={1100} />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 md:gap-4 pt-14 md:pt-10">
              <AnimatedCard bgColor="bg-yellow-400" imgSrc="/images/std3.png" altText="Student 3" delay={1400} />
              <AnimatedCard bgColor="bg-green-400" imgSrc="/images/std6.png" altText="Student 6" delay={1700} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationFront;
