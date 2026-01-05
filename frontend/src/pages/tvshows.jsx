import React from "react";
import MovieBox from "../components/moviebox";
import MoviesGrid from "../components/MoviesGrid";
import FAQ from "../components/FAQ";
import Container from "../components/banner";
import CategorySlider from "../components/CategorySlider"; // ✅ Make sure this is imported

// Featured Movies
const Movies = [
  {
    title: "Stranger Think  ",
    description:
      "In a small town, a group of kids discovers a secret world filled with supernatural dangers, testing their courage, friendship, and the bonds that hold them together.",
    image: "/images/show1.png",
  },
  {
    title: "Money Heist",
    description:
      "A group of unlikely heroes comes together to pull off the greatest heist in history, risking everything for freedom and revenge, challenging the system that tried to break them.",
    image: "/images/show2.jpg",
  },
  {
    title: "The Witcher",
    description:
      "In a land torn by war and dark magic, a monster hunter struggles to find his place in a world where the lines between good and evil are blurred.",
    image: "/images/show3.jpg",
  },
];

// Popular Shows
const popularShows = [
  { title: "Stranger Think", image: "/images/2.png" },
  { title: "Lucifer", image: "/images/4.png" },
  { title: "High Town", image: "/images/6.png" },
  { title: "Mirzapur", image: "/images/7.png" },
  { title: "Breathe Into The Shadows", image: "/images/9.png" },
  { title: "Money Heist", image: "/images/9-2.png" },
  { title: "Stranget Think: 3", image: "/images/9-4.png" },
];

// Trending Shows
const Toptrending = [
  {
    title: "High Town",
    image: "/images/1.png",
    duration: "1h 30min",
    views: "2K",
  },
  {
    title: "Stranger Think",
    image: "/images/2.png",
    duration: "1h 57min",
    views: "1.5K",
  },
  {
    title: "Money Heist",
    image: "/images/3.png",
    duration: "2h 10min",
    views: "1.8K",
  },
  {
    title: "Lucifer",
    image: "/images/4.png",
    duration: "2h 20min",
    views: "3K",
  },
  {
    title: "The Grey Man",
    image: "/images/5.png",
    duration: "1h 42min",
    views: "5K",
  },
  {
    title: "Iron Man",
    image: "/images/6.png",
    duration: "2h 6min",
    views: "4.2K",
  },
  {
    title: "The Dark Knight",
    image: "/images/7.jpg",
    duration: "2h 32min",
    views: "6K",
  },
];

// New Releases
const newReleases = [
  {
    title: "Peaky Blinders",
    image: "/images/8.png",
    releaseDate: "14 April 2026",
    progress: 0.5,
  },
  {
    title: "Breathe Into The Shadows",
    image: "/images/9.png",
    releaseDate: "01 Sept 2025",
    progress: 0.3,
  },
];

// Top Rated Movies
const topRatedshows = [
  {
    title: "Duranga",
    image: "/images/9-1.png",
    duration: "1h 57min",
    views: "20K",
    rating: 5,
  },
  {
    title: "Money Heist 3",
    image: "/images/9-2.png",
    duration: "1h 30min",
    views: "20K",
    rating: 4,
  },
  {
    title: "MAI",
    image: "/images/9-3.png",
    duration: "1h 42min",
    views: "20K",
    rating: 4,
  },
  {
    title: "Stranger Think",
    image: "/images/9-4.png",
    duration: "2h 10min",
    views: "20K",
    rating: 3,
  },
];

// Categories
const categoriesData = [
  {
    name: "Action",
    images: ["/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png"],
  },
  {
    name: "Adventure",
    images: ["/images/5.png", "/images/12.jpg", "/images/7.png", "/images/8.png"],
  },
  {
    name: "Comedy",
    images: ["/images/15.png", "/images/6.png", "/images/7.png", "/images/8.png"],
  },
  {
    name: "Drama",
    images: ["/images/9.png", "/images/13.jpg", "/images/9-1.png", "/images/9-2.png"],
  },
  {
    name: "Horror",
    images: ["/images/9-3.png", "/images/9-4.png", "/images/12.jpg", "/images/13.jpg"],
  },
  {
    name: "Sci-Fi",
    images: ["/images/homepic24.png", "/images/homepic25.png", "/images/homepic26.png", "/images/homepic27.png"],
  },
];

// horor zone
const hororzone = [
  { title: "Lucifer", image: "/images/4.png" },
  { title: "The Grey Man", image: "/images/5.png" },
  { title: "High Town", image: "/images/6.png" },
  { title: "Mirzapur", image: "/images/7.png" },
  { title: "Peaky Blender", image: "/images/8.png" },
  { title: "Breathe /into The Shadow", image: "/images/9.png" },
  { title: "Duranga", image: "/images/9-1.png" },
];

const TVSHOWSPAGE = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <section className="w-full overflow-hidden">
        <MovieBox
          movies={Movies}
          heading=""
          showArrows={false}
          showViewAllButton={false}
        />
      </section>

      <MoviesGrid
        title="Our Choice"
        movies={popularShows}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Trending Now"
        movies={Toptrending}
        showProgress={false}
        showViewAllButton={false}
      />

      <MoviesGrid
        title="New Releases"
        movies={newReleases}
        showProgress={false} // Enable progress bar if you want to show it
        showViewAllButton={false}
      />

      <MoviesGrid
        title="Most - Watch Shows"
        movies={topRatedshows}
        showViewAllButton={false}
      />

      <div className="mt-15 px-4 md:px-5 max-w-15xl mx-auto">
        <CategorySlider categories={categoriesData} />
      </div>

      <MoviesGrid
        title="Horor zone"
        movies={hororzone}
        showViewAllButton={false}
      />
      
      <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
        <Container />
      </div>

    </div>
  );
};

export default TVSHOWSPAGE;
