import React, { useState, useRef, useEffect } from "react";
import {
  FaPlus,
  FaThumbsUp,
  FaVolumeUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const MovieBox = ({
  movies = [],
  heading = "Top Rated",
  showArrows = true,
  showTrailerButton = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const intervalRef = useRef(null);

  const animationDuration = 500;
  const totalSlides = movies.length;

  const handleNext = () => {
    setDirection("right");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const handlePrev = () => {
    setDirection("left");
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const handleDragStart = (e) => {
    if (isAnimating) return;
    isDragging.current = true;
    dragStartX.current =
      e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dragEndX =
      e.type === "touchend" && e.changedTouches
        ? e.changedTouches[0].clientX
        : e.clientX;
    const diff = dragStartX.current - dragEndX;

    const swipeThreshold = 50;
    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="w-full bg-black text-white select-none overflow-hidden py-6 md:py-10 px-0">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{heading}</h2>

        {/* Arrows & Dots */}
        {showArrows && (
          <div className="bg-gray-900 rounded-full px-3 py-1 flex items-center space-x-3">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className={`rounded-full p-2 md:p-3 text-sm md:text-base transition-transform duration-300 ${
                isAnimating
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-gray-800 hover:bg-gray-700 text-white active:scale-90"
              }`}
              aria-label="Previous Movie"
            >
              <FaChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex space-x-1 items-center">
              {movies.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-red-600 scale-125"
                      : "bg-gray-600 scale-100"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className={`rounded-full p-2 md:p-3 text-sm md:text-base transition-transform duration-300 ${
                isAnimating
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-gray-800 hover:bg-gray-700 text-white active:scale-90"
              }`}
              aria-label="Next Movie"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Movie Slide */}
      <div
        className="relative w-full h-[750px] overflow-hidden rounded-lg bg-black"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          key={currentIndex}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out flex items-center justify-center ${
            direction === "right"
              ? "animate-slide-in-right"
              : "animate-slide-in-left"
          }`}
        >
          <img
            src={movies[currentIndex].image}
            alt={movies[currentIndex].title}
            className="w-full h-full object-cover opacity-90 scale-100 transition-transform duration-700 ease-in-out rounded-lg"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Slide Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center text-center px-6 sm:px-8 md:px-12 pb-12 md:pb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 transition-all duration-500 ease-in-out">
            {movies[currentIndex].title}
          </h2>
          <p className="text-xs md:text-sm max-w-xl opacity-70 mb-6 transition-all duration-500 ease-in-out">
            {movies[currentIndex].description}
          </p>

          {/* Responsive Buttons Layout */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 w-full md:w-auto">
            {/* Top Buttons: Trailer & Play Now */}
            <div className="flex justify-center space-x-3 mb-3 md:mb-0">
              {showTrailerButton && (
                <button className="bg-white text-black px-4 py-2 rounded flex items-center hover:bg-gray-200 active:scale-95 transition-all duration-300">
                  <svg className="w-4 h-4 mr-2 fill-black" viewBox="0 0 20 20">
                    <path d="M4 3h1v14H4V3zm11 7l-6 4V6l6 4z" />
                  </svg>
                  Trailer
                </button>
              )}

              <button className="bg-blue-600 px-4 py-2 rounded flex items-center hover:bg-red-700 active:scale-95 transition-all duration-300">
                <svg className="w-4 h-4 mr-2 fill-white" viewBox="0 0 20 20">
                  <path d="M4 3h1v14H4V3zm11 7l-6 4V6l6 4z" />
                </svg>
                Play Now
              </button>
            </div>

            {/* Bottom Icon Buttons */}
            <div className="flex justify-center space-x-3">
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 active:scale-90 transition-all duration-300">
                <FaPlus />
              </button>
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 active:scale-90 transition-all duration-300">
                <FaThumbsUp />
              </button>
              <button className="bg-gray-700 p-2 rounded hover:bg-gray-600 active:scale-90 transition-all duration-300">
                <FaVolumeUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
