import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategorySlider = ({
  categories = [],
  mainHeading = "Explore our wide variety of categories",
  subHeading = "Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new.",
}) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const itemsPerSlide = 5; // Customize this for responsiveness
  const scrollAmount = 300; // Adjust as needed
  const totalDots = Math.ceil(categories.length / itemsPerSlide);

  // Scroll function for arrows
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setActiveDot((prev) => Math.max(0, prev - 1));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setActiveDot((prev) => Math.min(totalDots - 1, prev + 1));
    }
  };

  // Scroll to specific dot/page
  const scrollToPage = (index) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: scrollAmount * index, behavior: "smooth" });
    setActiveDot(index);
  };

  // Update dot on manual scroll (drag, wheel, etc.)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const newIndex = Math.round(scrollRef.current.scrollLeft / scrollAmount);
    setActiveDot(newIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white px-4 md:px-10 mt-20 select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {mainHeading}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {subHeading}
          </p>
        </div>

        {/* Arrows & Dots */}
        <div className="bg-gray-900 rounded-full px-3 py-1 flex items-center space-x-3">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={activeDot === 0}
            className={`rounded-full p-2 md:p-3 transition-colors ${
              activeDot === 0
                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            aria-label="Scroll Left"
          >
            <FaChevronLeft />
          </button>

          {/* Dots */}
          <div className="flex space-x-1 items-center">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  index === activeDot
                    ? "bg-red-600 scale-110"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={activeDot === totalDots - 1}
            className={`rounded-full p-2 md:p-3 transition-colors ${
              activeDot === totalDots - 1
                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
            aria-label="Scroll Right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Category Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide scroll-smooth"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-xl p-4 min-w-[220px] sm:min-w-[250px] shadow-md flex-shrink-0 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2 mb-3">
              {category.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${category.name} ${idx}`}
                  className="w-full h-24 sm:h-28 object-cover rounded-[12px]"
                />
              ))}
            </div>
            <p className="text-white font-semibold text-sm sm:text-base text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
