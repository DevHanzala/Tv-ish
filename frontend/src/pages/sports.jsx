// src/pages/sports.jsx
import React from 'react';
import SportsFront from '../components/sportsfront';
import MoviesGrid from "../components/MoviesGrid";
import Container from "../components/banner";
import CategorySlider from "../components/CategorySlider";

// Sample data
const movieData = [
  { title: "Aguas con los Descuentos", image: "/images/f1.png" },
  { title: "Combos de Coca-Cola", image: "/images/f2.png" },
  { title: "Galletas Marías", image: "/images/f3.png" },
  { title: "Energéticos Volt & Vive", image: "/images/f4.png" },
  { title: "Galletas Marías", image: "/images/f5.png" },
  { title: "Energéticos Volt & Vive", image: "/images/f6.png" },
];

// Categories
const categoriesData = [
  {
    name: "Funny",
    images: ["/images/rambo.png", "/images/captain america.png", "/images/gold.png", "/images/homepic4.png"],
  },
  {
    name: "Current Events",
    images: ["/images/homepic5.png", "/images/12.jpg", "/images/homepic7.png", "/images/homepic8.png"],
  },
  {
    name: "News",
    images: ["/images/login_img15.png", "/images/login_img13.png", "/images/homepic9.png", "/images/homepic10.png"],
  },
  {
    name: "Fashion",
    images: ["/images/homepic11.png", "/images/13.jpg", "/images/homepic12.png", "/images/homepic13.png"],
  },
  {
    name: "Tech",
    images: ["/images/homepic20.png", "/images/homepic21.png", "/images/homepic22.png", "/images/homepic23.png"],
  },
  {
    name: "Life",
    images: ["/images/homepic24.png", "/images/homepic25.png", "/images/homepic26.png", "/images/homepic27.png"],
  },
];

const Sports = () => {
  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* ✅ Hero Section */}
      <div style={{ height: 'calc(75vh - 100px)' }}>
        <SportsFront />
      </div>

      {/* ✅ Sports Sections */}
      <div className="w-full px-4 md:px-8">
        <div className="mt-12">
          <MoviesGrid
            title="Popular Activity"
            movies={movieData}
            showProgress={false}
            showViewAllButton={false}
          />
        </div>

        <MoviesGrid
          title="Feature Event"
          movies={movieData}
          showProgress={false}
          showViewAllButton={false}
        />

        <MoviesGrid
          title="Trending Sports Topic"
          movies={movieData}
          showProgress={false}
          showViewAllButton={false}
        />

        <MoviesGrid
          title="Popular Sports Channel"
          movies={movieData}
          showProgress={false}
          showViewAllButton={false}
        />
      </div>

      {/* ✅ Categories Slider */}
      <div className="mt-16 w-full px-4 md:px-8 bg-black">
        <CategorySlider
          categories={categoriesData}
          mainHeading="Categories"
          subHeading=""
        />
      </div>

      {/* ✅ Bottom Banner */}
      <div className="mt-10 px-10 md:px-70 max-w-6xl mx-auto pb-10">
        <Container />
      </div>
    </div>
  );
};

export default Sports;
